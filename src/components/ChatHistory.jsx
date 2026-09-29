import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  setChatHistory,
  setHistoryLoading,
  setMessages,
  setSessionId,
  setError,
} from "../store/slices/chatSlice";

import {
  getChatHistory,
  getChatBySession,
} from "../services/api";

import "../assets/styles/ChatHistory.css";


function ChatHistory({ onChatSelect }) {

  const dispatch = useDispatch();


  // ============================================================
  // REDUX STATE
  // ============================================================

  const {
    chatHistory,
    historyLoading,
    currentSessionId,
  } = useSelector(
    (state) => state.chat
  );


  // ============================================================
  // LOAD CHAT HISTORY
  // ============================================================

  useEffect(() => {

    const loadChatHistory = async () => {

      try {

        dispatch(
          setHistoryLoading(true)
        );

        dispatch(
          setError(null)
        );


        const data =
          await getChatHistory();


        dispatch(
          setChatHistory(
            data.data || []
          )
        );

      } catch (error) {

        console.error(
          "Error loading chat history:",
          error
        );


        dispatch(
          setError(
            "Unable to load chat history."
          )
        );

      } finally {

        dispatch(
          setHistoryLoading(false)
        );

      }

    };


    loadChatHistory();

  }, [dispatch]);


  // ============================================================
  // REMOVE EMPTY / NEW CHAT SESSIONS
  // ============================================================

  const visibleChats =
    chatHistory.filter(
      (chat) =>
        chat.title &&
        chat.title.trim() !== "" &&
        chat.title !== "New Chat"
    );


  // ============================================================
  // OPEN OLD CHAT
  // ============================================================

  const handleChatClick = async (
    sessionId
  ) => {

    try {

      dispatch(
        setError(null)
      );


      const data =
        await getChatBySession(
          sessionId
        );


      const chat = data.data;


      if (!chat) {
        return;
      }


      // Save session ID
      dispatch(
        setSessionId(
          chat.session_id
        )
      );


      // Load previous messages
      dispatch(
        setMessages(
          chat.messages || []
        )
      );


      // Parent component ko selected chat do
      if (onChatSelect) {

        onChatSelect(
          chat
        );

      }

    } catch (error) {

      console.error(
        "Error opening chat:",
        error
      );


      dispatch(
        setError(
          "Unable to open this chat."
        )
      );

    }

  };


  // ============================================================
  // LOADING
  // ============================================================

  if (historyLoading) {

    return (

      <div className="chat-history">

        <div className="chat-history-title">
          Recent Chats
        </div>

        <div className="chat-history-loading">
          Loading chats...
        </div>

      </div>

    );

  }


  // ============================================================
  // UI
  // ============================================================

  return (

    <div className="chat-history">

      {/* TITLE */}

      <div className="chat-history-title">
        Recent Chats
      </div>


      {/* NO CHATS */}

      {visibleChats.length === 0 ? (

        <div className="chat-history-empty">
          No previous chats
        </div>

      ) : (

        <div className="chat-history-list">

          {visibleChats.map(
            (chat) => (

              <button
                key={chat.session_id}
                type="button"
                className={`chat-history-item ${
                  currentSessionId ===
                  chat.session_id
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  handleChatClick(
                    chat.session_id
                  )
                }
              >

                <span className="chat-history-icon">
                  💬
                </span>


                <span className="chat-history-text">
                  {chat.title}
                </span>

              </button>

            )
          )}

        </div>

      )}

    </div>

  );
}


export default ChatHistory;