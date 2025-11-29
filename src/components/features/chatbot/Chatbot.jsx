// Chatbot.jsx
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import resumeContext from "./resumeContext";
import { supabase } from "../../../supabaseClient.js";
import ChatMessage from "./ChatMessage";
import styles from "./chatbot.module.css";
import { MessageSquare, X, Send } from "lucide-react";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [showFloating, setShowFloating] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);
  const messagesContainerRef = useRef(null);

  // --- Effects ---

  // Show Floating Bubble After Delay (Fade in)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFloating(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Auto-Scrolling to the Latest Message
  useEffect(() => {
    if (messagesContainerRef.current && open) {
      const timer = setTimeout(() => {
        if (messagesContainerRef.current) {
          messagesContainerRef.current.scrollTo({
            top: messagesContainerRef.current.scrollHeight,
            behavior: "smooth",
          });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [messages, loading, open]);

  // --- API/Data Functions ---

  const createNewSession = async () => {
    try {
      const newSessionId = crypto.randomUUID();
      localStorage.setItem("chat_session_id", newSessionId);
      localStorage.setItem("chat_session_timestamp", Date.now().toString());
      setSessionId(newSessionId);

      if (supabase && supabase.from) {
        await supabase.from("chat_sessions").insert([
          {
            session_id: newSessionId,
            messages: [],
            resume_context: resumeContext,
            created_at: new Date().toISOString(),
          },
        ]);
        addWelcomeMessage(newSessionId, []);
      } else {
        addWelcomeMessage(null, []);
      }
    } catch (error) {
      console.error("Error creating new session:", error);
      setMessages([
        { role: "bot", text: "⚠️ Could not start a new chat session. Please refresh." }
      ]);
    }
  };

  const addWelcomeMessage = async (currentSessionId, existingMessages) => {
    if (existingMessages.length === 0) {
      const welcomeMessage = {
        role: "bot",
        text: "👋 Hello! How can I help you today? Feel free to ask about my experience.",
      };
      setMessages([welcomeMessage]);
      if (currentSessionId && supabase && supabase.from) {
        await updateSessionMessages([welcomeMessage], currentSessionId);
      }
    }
  }

  const fetchSessionMessages = async () => {
    if (!supabase || !supabase.from) {
      addWelcomeMessage(null, messages);
      return;
    }
    try {
      const { data, error } = await supabase
        .from("chat_sessions")
        .select("messages")
        .eq("session_id", sessionId)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      const fetchedMessages = data?.messages || [];
      setMessages(fetchedMessages);
      addWelcomeMessage(sessionId, fetchedMessages);

    } catch (err) {
      console.error("Error fetching messages:", err);
      setMessages([
        { role: "bot", text: "⚠️ Error loading previous messages. Starting fresh." }
      ]);
      setTimeout(() => addWelcomeMessage(sessionId, [{ role: 'bot', text: 'error' }]), 50);
    }
  };

  const updateSessionMessages = async (updatedMessages, currentSessionId = sessionId) => {
    if (!currentSessionId || !supabase || !supabase.from) return;

    try {
      await supabase
        .from("chat_sessions")
        .update({ messages: updatedMessages })
        .eq("session_id", currentSessionId);
    } catch (error) {
      console.error("Error updating session messages:", error);
    }
  };

  // Function to update or insert session
  const saveChatHistory = async (currentMessages) => {
    if (!sessionId || !supabase) return;

    try {
      // Try to update first
      const { error: updateError } = await supabase
        .from("chat_sessions")
        .update({ messages: currentMessages })
        .eq("session_id", sessionId);

      // If update fails (or no rows affected), it might be a new session, so insert
      if (updateError || true) {
        // Actually, 'upsert' is safer. Let's use upsert.
        const { error: upsertError } = await supabase
          .from("chat_sessions")
          .upsert(
            {
              session_id: sessionId,
              messages: currentMessages
            },
            { onConflict: 'session_id' }
          );

        if (upsertError) console.error("Error saving chat:", upsertError);
      }
    } catch (err) {
      console.error("Save chat error:", err);
    }
  };

  // Fetch Chat Messages Once SessionID is Known
  useEffect(() => {
    if (sessionId && hasInitialized) {
      fetchSessionMessages();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId, hasInitialized]);

  // --- Event Handlers ---

  const toggleChat = () => {
    if (!open && !hasInitialized) {
      // Check for existing session in localStorage
      let storedSessionId = localStorage.getItem("chat_session_id");
      let sessionTimestamp = localStorage.getItem("chat_session_timestamp");
      const oneDay = 24 * 60 * 60 * 1000;
      
      const isSessionValid = storedSessionId && 
                             sessionTimestamp && 
                             (Date.now() - parseInt(sessionTimestamp, 10) < oneDay);
      if (isSessionValid) {
          setSessionId(storedSessionId);
      } else {
        localStorage.removeItem("chat_session_id");
        localStorage.removeItem("chat_session_timestamp");
        createNewSession();
      }
      setHasInitialized(true);
    }
    setOpen((prev) => !prev);
  };

  const sendMessage = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput || loading) return;

    // 1. Add User Message
    const userMessage = { role: "user", text: trimmedInput };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      // 2. Call Edge Function
      const { data, error } = await supabase.functions.invoke("chatbot", {
        body: JSON.stringify({
          message: trimmedInput,
          history: messages.slice(-4).map(msg => ({
            role: msg.role,
            content: msg.text
          })),
          context: resumeContext,
          sessionId: sessionId
        }),
      });

      if (error) throw error;

      // 3. Add Bot Message
      const botMessage = { role: "bot", text: data.reply };
      const finalMessages = [...updatedMessages, botMessage];

      setMessages(finalMessages);
      setLoading(false);

      // 4. SAVE TO DB (The Critical Step)
      await saveChatHistory(finalMessages);

    } catch (err) {
      console.error("Chat Error:", err);
      const errorMessage = { role: "bot", text: "⚠️ Error connecting to AI." };
      setMessages((prev) => [...prev, errorMessage]);
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // --- Animation Variants ---

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        mass: 0.5,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: 20,
      transition: { duration: 0.2 },
    },
  };

  const bubbleVariants = {
    hidden: { opacity: 0, scale: 0.5, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { delay: 0.2, duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.5, y: 20, transition: { duration: 0.2, ease: "easeIn" } },
  };

  const floatingTextVariants = {
    hidden: { opacity: 0, x: 10, scale: 0.9 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { delay: 0.5, duration: 0.4, ease: "easeOut" }
    },
  };

  // --- Render ---
  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.button
            aria-label="Open Chat"
            className={styles.wrapper}
            onClick={toggleChat}
            variants={bubbleVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            whileHover={{ scale: 1.1, transition: { type: 'spring', stiffness: 300 } }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence>
              {showFloating && (
                <motion.div
                  className={styles.floating}
                  variants={floatingTextVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, x: 10, scale: 0.9, transition: { duration: 0.2 } }}
                  style={{ pointerEvents: 'none' }}
                >
                  <span>Recruiting? Ask me anything!</span>
                </motion.div>
              )}
            </AnimatePresence>

            <div className={styles.avatar}>
              <MessageSquare />
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.container}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-labelledby="chatbot-heading"
          >
            <header className={styles.header}>
              <div className={styles.headerTitleGroup}>
                <div className={styles.statusDot}></div>
                <h3 id="chatbot-heading">Kartikey AI</h3>
              </div>
              <motion.button
                aria-label="Close Chat"
                className={styles.closeButton}
                onClick={toggleChat}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={20} />
              </motion.button>
            </header>

            <div className={styles.messages} ref={messagesContainerRef} aria-live="polite">
              <AnimatePresence initial={false}>
                {messages.map((msg, index) => (
                  <ChatMessage
                    key={`${msg.role}-${index}-${msg.text.slice(0, 10)}`}
                    message={msg.text}
                    role={msg.role}
                  />
                ))}
                {loading && (
                  <ChatMessage key="loading-indicator" role="bot" loading={true} />
                )}
              </AnimatePresence>
            </div>

            <footer className={styles.inputArea}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                aria-label="Chat input"
                disabled={loading}
              />
              <motion.button
                className={styles.sendButton}
                onClick={sendMessage}
                disabled={loading}
                aria-label="Send message"
                whileHover={!loading ? { scale: 1.1, transition: { type: 'spring', stiffness: 400, damping: 15 } } : {}}
                whileTap={!loading ? { scale: 0.9 } : {}}
              >
                <Send />
              </motion.button>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}