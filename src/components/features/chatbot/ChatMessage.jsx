// ChatMessage.jsx
import React, { forwardRef } from "react";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";
import styles from "./chatbot.module.css";
// Optional loading animation component
function ChatbotLoadingAnimation() {
  return (
    <div className={styles.loadingDots}>
      <span>.</span>
      <span>.</span>
      <span>.</span>
    </div>
  );
}
// I'm using forwardRef here, but it's purely optional.
// If you don't need refs for scrolling or transitions, a normal component is fine.
const ChatMessage = forwardRef(({ message, role, loading }, ref) => {
  // This is a simple check for an error style (e.g., if the text contains some warning emoji).
  // It's optional-omit if you don't need special styling for errors.
  const isError = role === "bot" && message && message.includes("⚠️");
  return (
    <motion.div
      ref={ref}
      className={`${styles.messageWrapper} ${styles[role]} ${isError ? styles.error : ""}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* A small avatar (optional) if the role is "bot" */}
      {role === "bot" && (
        <div className={styles.messageAvatar}>
          <MessageSquare className="w-4 h-4 text-white" />
        </div>
      )}
      <div className={styles.messageBubble}>
        {/* If we're still loading, show an animation. Otherwise, render the actual text. */}
        {loading ? (
          <ChatbotLoadingAnimation />
        ) : (
          <ReactMarkdown>{message}</ReactMarkdown>
        )}
      </div>
    </motion.div>
  );
});
export default ChatMessage;