// ChatMessage.jsx
import React, { forwardRef } from "react";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import { Bot } from "lucide-react"; // Use Bot icon for consistency
import styles from "./chatbot.module.css";

// Updated loading animation component
function ChatbotLoadingAnimation() {
  return <div className={styles.loadingSpinner}></div>; // Use the new spinner style
}

const ChatMessage = forwardRef(({ message, role, loading }, ref) => {
  const isError = role === "bot" && message && message.includes("⚠️");

  // Animation variants for messages
  const messageVariants = {
    hidden: {
      opacity: 0,
      y: 20, // Start slightly lower
      scale: 0.95, // Start slightly smaller
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring", // Use spring animation
        stiffness: 200,
        damping: 20,
        duration: 0.4, // Duration hint (spring calculates actual)
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
      layout // Helps animate position changes smoothly if messages reorder (optional)
    >
      {/* Bot Avatar */}
      {role === "bot" && !loading && ( // Show avatar only for non-loading bot messages
        <div className={styles.messageAvatar}>
          <Bot className="w-4 h-4 text-white" /> {/* Consistent Bot icon */}
        </div>
      )}

      {/* Message Bubble */}
      <div className={styles.messageBubble}>
        {loading ? (
          <ChatbotLoadingAnimation />
        ) : (
          // Render markdown, customize components if needed (e.g., links)
          <ReactMarkdown
            components={{
              a: ({ node, ...props }) => <a {...props} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}/>,
              // Add more customizations here if needed (e.g., code blocks)
            }}
          >
            {message}
          </ReactMarkdown>
        )}
      </div>
    </motion.div>
  );
});

// Add display name for better debugging
ChatMessage.displayName = "ChatMessage";

export default ChatMessage;