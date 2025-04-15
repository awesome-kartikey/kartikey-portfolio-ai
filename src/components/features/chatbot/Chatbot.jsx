// Chatbot.jsx
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import resumeContext from "./resumeContext";
import { supabase } from "../../../supabaseClient.js";
import ChatMessage from "./ChatMessage";
import styles from "./chatbot.module.css";
import { MessageSquare, X, Send, Bot } from "lucide-react"; // Added Bot icon

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [showFloating, setShowFloating] = useState(false); // Start hidden, fade in
  const messagesContainerRef = useRef(null);
  // No need for headerRef anymore with sticky header/footer

  // --- Effects ---

  // Show Floating Bubble After Delay (Fade in)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFloating(true);
    }, 1500); // Show after 1.5 seconds
    return () => clearTimeout(timer);
  }, []);

  // Generate or Retrieve Session ID
  useEffect(() => {
    let storedSessionId = localStorage.getItem("chat_session_id");
    let sessionTimestamp = localStorage.getItem("chat_session_timestamp");
    const oneDay = 24 * 60 * 60 * 1000; // Milliseconds in a day

    // Check if session exists and is less than a day old
    if (storedSessionId && sessionTimestamp && (Date.now() - parseInt(sessionTimestamp, 10) < oneDay)) {
      setSessionId(storedSessionId);
    } else {
      // Clear old session data and create a new one
      localStorage.removeItem("chat_session_id");
      localStorage.removeItem("chat_session_timestamp");
      createNewSession();
    }
  }, []);

  // Fetch Chat Messages Once SessionID is Known
  useEffect(() => {
    if (sessionId) {
      fetchSessionMessages();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  // Auto-Scrolling to the Latest Message
  useEffect(() => {
    if (messagesContainerRef.current && open) {
      // Scroll happens more naturally due to flex layout now
      // Add a small delay to ensure rendering is complete, especially after loading
       const timer = setTimeout(() => {
         if(messagesContainerRef.current) {
            messagesContainerRef.current.scrollTo({
              top: messagesContainerRef.current.scrollHeight,
              behavior: "smooth",
            });
         }
       }, 100); // Short delay
       return () => clearTimeout(timer);
    }
  }, [messages, loading, open]); // Trigger on messages, loading state change, and open state


  // --- API/Data Functions ---

  // Create New Session
  const createNewSession = async () => {
    try {
      const newSessionId = crypto.randomUUID();
      localStorage.setItem("chat_session_id", newSessionId);
      localStorage.setItem("chat_session_timestamp", Date.now().toString()); // Store timestamp
      setSessionId(newSessionId);

      // Only insert if using Supabase sessions table
      if (supabase && supabase.from) { // Check if supabase client is configured
        await supabase.from("chat_sessions").insert([
          {
            session_id: newSessionId,
            messages: [], // Start with empty messages in DB
            resume_context: resumeContext, // Store context if desired
            created_at: new Date().toISOString(), // Add timestamp
          },
        ]);
         // Add initial welcome message after session creation
        addWelcomeMessage(newSessionId, []); // Pass new session ID and empty initial messages
      } else {
         addWelcomeMessage(null, []); // Add welcome message locally if no DB
      }

    } catch (error) {
      console.error("Error creating new session:", error);
      // Handle error appropriately, maybe show a message to the user
       setMessages([
        { role: "bot", text: "⚠️ Could not start a new chat session. Please refresh." }
      ]);
    }
  };

   // Add Welcome Message (factored out)
  const addWelcomeMessage = async (currentSessionId, existingMessages) => {
     if (existingMessages.length === 0) {
        const welcomeMessage = {
            role: "bot",
            text: "👋 Hello! How can I help you today? Feel free to ask about my experience.",
        };
        setMessages([welcomeMessage]);
        // Update DB only if session exists and DB is used
        if (currentSessionId && supabase && supabase.from) {
            await updateSessionMessages([welcomeMessage], currentSessionId);
        }
    }
  }

  // Fetch Session Messages
  const fetchSessionMessages = async () => {
    if (!supabase || !supabase.from) {
      // If not using Supabase or it's not configured, just add welcome message if needed
       addWelcomeMessage(null, messages);
      return;
    }
    try {
      const { data, error } = await supabase
        .from("chat_sessions")
        .select("messages")
        .eq("session_id", sessionId)
        .single(); // Expect only one row

      if (error && error.code !== 'PGRST116') { // Ignore 'PGRST116' (No rows found)
        throw error;
      }

      const fetchedMessages = data?.messages || [];
      setMessages(fetchedMessages);

      // Add welcome message if chat history is empty after fetch
      addWelcomeMessage(sessionId, fetchedMessages);

    } catch (err) {
      console.error("Error fetching messages:", err);
      setMessages([
        { role: "bot", text: "⚠️ Error loading previous messages. Starting fresh." }
      ]);
       // Add welcome message even if fetch failed, but after the error message
       setTimeout(() => addWelcomeMessage(sessionId, [{role: 'bot', text:'error'}]), 50); // Add slight delay
    }
  };

  // Update Session Messages in DB
  const updateSessionMessages = async (updatedMessages, currentSessionId = sessionId) => {
    if (!currentSessionId || !supabase || !supabase.from) return; // No session or DB configured

    try {
      await supabase
        .from("chat_sessions")
        .update({ messages: updatedMessages }) // Add updated timestamp
        .eq("session_id", currentSessionId);
    } catch (error) {
      console.error("Error updating session messages:", error);
      // Optional: Notify user or retry logic
    }
  };

  // --- Event Handlers ---

  // Toggle Chat Window
  const toggleChat = () => {
    setOpen((prev) => !prev);
     // Welcome message logic is now handled by fetchSessionMessages/createNewSession
  };

  // Send Message
  const sendMessage = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput || loading) return; // Prevent sending empty or while loading

    const userMessage = { role: "user", text: trimmedInput };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages); // Show user message immediately
    setInput(""); // Clear input immediately
    setLoading(true);

    // Update database optimistically (optional, can be moved after API call)
    updateSessionMessages(updatedMessages);

    try {
       // Ensure Supabase functions client is available
      if (!supabase || !supabase.functions) {
         throw new Error("Supabase functions client is not configured.");
      }

      // Call Supabase Edge Function
      const { data, error } = await supabase.functions.invoke("chatbot", {
        body: JSON.stringify({ // Ensure body is stringified if needed by your function
           message: trimmedInput,
           context: resumeContext,
           sessionId: sessionId // Optionally pass session ID to function
        }),
      });

      if (error || !data?.reply) {
        console.error("Chatbot function error:", error);
        throw new Error(error?.message || "Invalid response from chatbot function.");
      }

      // Add bot's response
      const botMessage = { role: "bot", text: data.reply };
      const finalMessages = [...updatedMessages, botMessage];
      setMessages(finalMessages);

      // Update session messages in Supabase with the final conversation
      updateSessionMessages(finalMessages);

    } catch (err) {
      console.error("Chatbot Send Error:", err);
      const errorMessage = {
        role: "bot",
        text: "⚠️ Sorry, I encountered an issue. Please try asking again.", // More user-friendly error
      };
       // Add error message to the *current* set of messages in state
      setMessages((prev) => [...prev, errorMessage]);

      // Update session in DB including the error message shown to the user
      updateSessionMessages([...updatedMessages, errorMessage]);
    } finally {
      setLoading(false); // Ensure loading is set to false in all cases
    }
  };

  // Handle Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { // Allow Shift+Enter for new lines if needed in future
      e.preventDefault(); // Prevent default form submission/newline
      sendMessage();
    }
  };


  // --- Animation Variants ---

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 20,
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: { duration: 0.3, ease: "easeIn" },
    },
  };

  const bubbleVariants = {
    hidden: { opacity: 0, scale: 0.5, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { delay: 0.2, duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.5, y: 20, transition: { duration: 0.2, ease: "easeIn" } },
  };

 const floatingTextVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { delay: 0.5, duration: 0.4, ease: "easeOut" } }, // Delay matches parent bubble entry
  };

  // --- Render ---
  return (
    <>
      {/* Minimized Chat Bubble */}
      <AnimatePresence>
        {!open && (
          <motion.button // Use button for accessibility
            aria-label="Open Chat"
            className={styles.wrapper}
            onClick={toggleChat}
            variants={bubbleVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            whileHover={{ scale: 1.1, transition: { type: 'spring', stiffness: 300 } }} // Button hover effect
            whileTap={{ scale: 0.95 }} // Button tap effect
          >
            {/* Floating Text Bubble */}
            <AnimatePresence>
              {showFloating && (
                <motion.div
                  className={styles.floating}
                  variants={floatingTextVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, x: 20, transition: { duration: 0.2 } }} // Fade out text first
                  // Prevent hover effect on text triggering button hover
                  style={{ pointerEvents: 'none' }}
                >
                  <span>Ask me anything!</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* The Main Bubble Icon */}
            <div className={styles.avatar}>
              <MessageSquare /> {/* Icon size controlled by CSS */}
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Expanded Chat Interface */}
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
            {/* Chat Header */}
            <header className={styles.header}>
              <h3 id="chatbot-heading"><Bot /> Chat with Me</h3> {/* Added icon & ID */}
              <motion.button
                aria-label="Close Chat"
                className={styles.closeButton} // Use specific class
                onClick={toggleChat}
                 whileHover={{ scale: 1.15, rotate: 90, transition: { type: 'spring', stiffness: 400, damping: 15 } }}
                 whileTap={{ scale: 0.9 }}
              >
                <X /> {/* Size controlled by CSS */}
              </motion.button>
            </header>

            {/* Messages Section - AnimatePresence handles message animations */}
            <div className={styles.messages} ref={messagesContainerRef} aria-live="polite">
               <AnimatePresence initial={false}>
                {messages.map((msg, index) => (
                  <ChatMessage
                    key={`${msg.role}-${index}-${msg.text.slice(0, 10)}`} // More robust key
                    message={msg.text}
                    role={msg.role}
                  />
                ))}
                {/* Show loading indicator *within* the messages flow */}
                {loading && (
                   <ChatMessage key="loading-indicator" role="bot" loading={true} />
                )}
                </AnimatePresence>
            </div>

            {/* Input Section */}
            <footer className={styles.inputArea}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown} // Use keydown handler
                placeholder="Type your message..."
                aria-label="Chat input"
                disabled={loading} // Disable input while loading
              />
              <motion.button
                className={styles.sendButton} // Use specific class
                onClick={sendMessage}
                disabled={loading}
                aria-label="Send message"
                whileHover={!loading ? { scale: 1.1, transition: { type: 'spring', stiffness: 400, damping: 15 } } : {}}
                whileTap={!loading ? { scale: 0.9 } : {}}
              >
                <Send /> {/* Size controlled by CSS */}
              </motion.button>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}