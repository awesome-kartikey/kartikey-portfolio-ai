// ChatMessage.jsx
import React, { forwardRef } from "react";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import { Bot } from "lucide-react";
import styles from "./chatbot.module.css";

// Updated loading animation component
function ChatbotLoadingAnimation() {
  return (
    <div className={styles.loadingSpinner}>
      <div className={styles.loadingDot}></div>
      <div className={styles.loadingDot}></div>
      <div className={styles.loadingDot}></div>
    </div>
  );
}

const ChatMessage = forwardRef(({ message, role, loading }, ref) => {
  const isError = role === "bot" && message && message.includes("⚠️");

  // Animation variants for messages
  const messageVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 0.4,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={`${styles.messageWrapper} ${styles[role]} ${isError ? styles.error : ""}`}
      variants={messageVariants}
      initial="hidden"
      animate="visible"
      layout
    >
      {/* Bot Avatar */}
      {role === "bot" && !loading && (
        <div className={styles.messageAvatar}>
          <Bot className="w-4 h-4 text-white" />
        </div>
      )}

      {/* Message Bubble */}
      <div className={styles.messageBubble}>
        {loading ? (
          <ChatbotLoadingAnimation />
        ) : (
          <ReactMarkdown
            components={{
              a: ({ node, ...props }) => <a {...props} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }} />,
            }}
          >
            {message}
          </ReactMarkdown>
        )}
      </div>
    </motion.div>
  );
});

ChatMessage.displayName = "ChatMessage";

export default ChatMessage;