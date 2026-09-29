import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";


import { setMessages, setSessionId } from "../store/slices/chatSlice";

import "../assets/styles/ChatArea.css";

function ChatArea({ onMenuClick }) {

  const dispatch = useDispatch();

  // Redux se messages
  const messages = useSelector(
    (state) => state.chat?.messages || []
  );

  // Redux se loading
  const loading = useSelector(
    (state) => state.chat?.loading || false
  );

  // Current session
  const currentSessionId = useSelector(
    (state) => state.chat?.currentSessionId || null
  );

  // Selected old chat
  const handleChatSelect = (chat) => {
    if (!chat) {
      return;
    }

    dispatch(
      setSessionId(chat.session_id)
    );

    dispatch(
      setMessages(chat.messages || [])
    );
  };

  return (
    <section className="chat-area-container">

      {/* HEADER */}
      <header className="chat-header">

        <button
          className="mobile-menu-btn"
          onClick={onMenuClick}
          type="button"
        >
          ☰
        </button>

        <div className="chat-title">
          <h2>My AI</h2>
          <span>AI Assistant</span>
        </div>

      </header>


      


      {/* MESSAGES */}
      <div className="messages-container">

        {messages.length === 0 ? (

          <div className="empty-chat">

            <div className="empty-icon">
              ✨
            </div>

            <h1>
              How can I help you?
            </h1>

            <p>
              Ask me anything and I'll try to help.
            </p>

          </div>

        ) : (

          messages.map((message, index) => (

            <ChatMessage
              key={message.id || index}
              message={message}
            />

          ))

        )}


        {/* LOADING */}

        {loading && (

          <div className="typing-indicator">

            <span></span>
            <span></span>
            <span></span>

            <span className="thinking-text">
              AI is thinking...
            </span>

          </div>

        )}

      </div>


      {/* INPUT */}

      <div className="chat-input-container">

        <ChatInput />

        <p className="input-hint">
          Press Enter to send
        </p>

      </div>

    </section>
  );
}

export default ChatArea;