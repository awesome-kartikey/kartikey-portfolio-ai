// Chatbot.jsx
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import resumeContext from "./resumeContext";
// ^ This is the file we created in Part 2 with chatbot instructions or resume info
import { supabase } from "../../../supabaseClient.js";
// ^ Replace with your Supabase client configuration or remove if you prefer another data store
import ChatMessage from "./ChatMessage";
import styles from "./chatbot.module.css";
import { MessageSquare, X, Send } from "lucide-react";
export default function Chatbot() {
  // ----------- 1) State Variables -----------
  // open: toggles chatbot open/close
  // messages: stores the conversation history
  // input: tracks what's typed in the text field
  // loading: true while we wait for a bot response
  // sessionId: identifies each user session
  // showFloating: toggles the "floating bubble" text
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [showFloating, setShowFloating] = useState(true);
  // We'll use these references for scroll effects
  const messagesContainerRef = useRef(null);
  const headerRef = useRef(null);
  // ----------- 2) Hide Floating Bubble After Delay -----------
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFloating(false);
    }, 5000); // 5 seconds
    return () => clearTimeout(timer);
  }, []);
  // ----------- 3) Generate or Retrieve Session ID -----------
  useEffect(() => {
    const existingSession = localStorage.getItem("chat_session_id");
    if (existingSession) {
      setSessionId(existingSession);
    } else {
      createNewSession();
    }
  }, []);
  // ----------- 4) Fetch Chat Messages Once SessionID is Known -----------
  useEffect(() => {
    if (sessionId) {
      fetchSessionMessages();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);
  // Helper function to create a new session in Supabase
  const createNewSession = async () => {
    const newSessionId = crypto.randomUUID();
    localStorage.setItem("chat_session_id", newSessionId);
    setSessionId(newSessionId);
    // Add a new record in our "chat_sessions" table (dummy name)
    await supabase.from("chat_sessions").insert([
      {
        session_id: newSessionId,
        messages: [],
        resume_context: resumeContext,
        // You can store the context in the DB if you want to reference it
      },
    ]);
  };
  // Helper function to fetch existing messages for the current session
  const fetchSessionMessages = async () => {
    const response = await fetch(
      `https://mmdgfucciskngqikxowk.supabase.co/rest/v1/chat_sessions?select=messages&session_id=eq.${sessionId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "apikey": import.meta.env.VITE_SUPABASE_ANON_KEY, // ✅ Required for authentication
          "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}` // ✅ Some endpoints require this
        }
      }
    );
  
    if (!response.ok) {
      console.error("Error fetching messages:", response.statusText);
      setMessages([
        { role: "bot", text: "⚠️ Error fetching previous messages. Please try again later." }
      ]);
      return;
    }
  
    const data = await response.json();
    setMessages(data.length > 0 ? data[0].messages : []);
  };
  
  // Updates messages array in Supabase whenever a new message is added
  const updateSessionMessages = async (updatedMessages) => {
    await supabase
      .from("chat_sessions")
      .update({ messages: updatedMessages })
      .eq("session_id", sessionId);
  };
  // ----------- 5) Toggling the Chat Window -----------
  const toggleChat = () => {
    setOpen((prev) => !prev);
    // If the chat is being opened for the first time, add a welcome message
    if (!open && messages.length === 0) {
      const welcomeMessage = {
        role: "bot",
        text: "👋 Hi! Ask me anything about my projects or background.",
      };
      setMessages([welcomeMessage]);
      if (sessionId) updateSessionMessages([welcomeMessage]);
    }
  };
  // ----------- 6) Sending a Message -----------
  const sendMessage = async () => {
    if (!input.trim()) return;
  
    // 1️⃣ Add user's message to local state
    const userMessage = { role: "user", text: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setLoading(true);
  
    // 2️⃣ Update database with user's message
    if (sessionId) {
      await updateSessionMessages(updatedMessages);
    }
  
    try {
      // 3️⃣ Call Supabase Edge Function
      const { data, error } = await supabase.functions.invoke("chatbot", {
        body: { message: input, context: resumeContext },
      });
  
      if (error || !data?.reply) {
        throw new Error(error?.message || "Invalid response from chatbot.");
      }
  
      // 4️⃣ Add bot's response to state
      const botMessage = { role: "bot", text: data.reply };
      const finalMessages = [...updatedMessages, botMessage];
      setMessages(finalMessages);
  
      // 5️⃣ Update session messages in Supabase
      if (sessionId) {
        await updateSessionMessages(finalMessages);
      }
  
      // Clear input field
      setInput("");
    } catch (err) {
      console.error("Chatbot API Error:", err);
  
      // 6️⃣ Handle errors gracefully
      const errorMessage = {
        role: "bot",
        text: "⚠️ Error fetching response. Please try again later.",
      };
      setMessages((prev) => [...prev, errorMessage]);
  
      if (sessionId) {
        await updateSessionMessages([...updatedMessages, errorMessage]);
      }
    }
  
    setLoading(false);
  };
  
  // ----------- 7) Auto-Scrolling to the Latest Message -----------
  useEffect(() => {
    if (!messagesContainerRef.current || !headerRef.current) return;
    if (open) {
      // We wait a bit so the new message has time to render
      setTimeout(() => {
        const container = messagesContainerRef.current;
        const headerHeight = headerRef.current.offsetHeight;
        container.scrollTo({
          top: container.scrollHeight - headerHeight,
          behavior: "smooth",
        });
      }, 100);
    }
  }, [messages, loading, open]);
  // ----------- 8) Rendering the Chat Interface -----------
  return (
    <>
      {/* Minimized Chat Bubble */}
      <AnimatePresence>
        {!open && (
          <motion.div
            className={styles.wrapper}
            onClick={toggleChat}
            drag
            dragMomentum={false}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
          >
            {showFloating && (
              <motion.div
                className={styles.floating}
                whileHover={{ scale: 1.05 }}
              >
                <span>Ask me about my projects!</span>
              </motion.div>
            )}
            <div className={styles.avatar}>
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Expanded Chat Interface */}
      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.container}
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ duration: 0.5 }}
          >
            {/* Chat Header */}
            <div className={styles.header} ref={headerRef}>
              <h3>Chat with me</h3>
              <button className={styles.button} onClick={() => setOpen(false)}>
                <X className="w-4 h-4" />
              </button>
            </div>
            {/* Messages Section */}
            <div className={styles.messages} ref={messagesContainerRef}>
              {messages.map((msg, index) => (
                <ChatMessage key={index} message={msg.text} role={msg.role} />
              ))}
              {loading && (
                <ChatMessage key="loading" role="bot" loading={true} />
              )}
            </div>
            {/* Input Section */}
            <div className={styles.inputArea}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendMessage();
                }}
                placeholder="Type your question..."
              />
              <button
                className={styles.button}
                onClick={sendMessage}
                disabled={loading}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}