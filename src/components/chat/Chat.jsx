import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectChatHistory, sendMessage } from "../../store/slices/chatSlice";
import styles from "./styles.module.css";

const Chat = ({ sender }) => {
  const chatHistory = useSelector(selectChatHistory);
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");

  const getTimeString = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const handleSendMessage = () => {
    const currentTime = getTimeString();
    dispatch(sendMessage({ sender, message, time: currentTime }));
    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className={styles["chat"]}>
      <div className={styles["chat-history"]}>
        {chatHistory.map((msg, index) => (
          <div
            key={index}
            className={`${
              msg.sender === sender
                ? sender.toLowerCase() + "-message"
                : "opposite"
            }`}
          >
            <span>{msg.message}</span>
            <span className={styles["message-time"]}>{msg.time}</span>
          </div>
        ))}
      </div>
      <div className={`chat-input ${sender.toLowerCase()}-input`}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message"
        />
        <button onClick={handleSendMessage}></button>
      </div>
    </div>
  );
};

export default Chat;
