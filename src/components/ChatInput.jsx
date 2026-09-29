import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addMessage,
  setLoading,
  setSessionId,
} from "../store/slices/chatSlice";

import {
  sendQuestion,
  createChatSession,
} from "../services/api";

import "../assets/styles/ChatInput.css";


function ChatInput() {

  const [input, setInput] = useState("");

  const dispatch = useDispatch();

  const loading = useSelector(
    (state) => state.chat?.loading || false
  );

  // Current chat session
  const currentSessionId = useSelector(
    (state) => state.chat?.currentSessionId || null
  );


  const handleSend = async () => {

    const question = input.trim();

    if (!question || loading) {
      return;
    }


    try {

      dispatch(setLoading(true));


      // ==========================================
      // CREATE SESSION IF THIS IS A NEW CHAT
      // ==========================================

      let sessionId = currentSessionId;

      if (!sessionId) {

        const sessionData =
          await createChatSession();

        sessionId =
          sessionData.session_id ||
          sessionData.data?.session_id;

        if (!sessionId) {
          throw new Error(
            "Session ID was not received from backend."
          );
        }

        // Redux me session ID save karo
        dispatch(setSessionId(sessionId));
      }


      // ==========================================
      // USER MESSAGE
      // ==========================================

      dispatch(
        addMessage({
          role: "user",
          content: question,
        })
      );

      setInput("");


      // ==========================================
      // BACKEND
      // ==========================================

      const data = await sendQuestion(
        question,
        sessionId
      );

      console.log(
        "Backend response:",
        data
      );


      // ==========================================
      // EXTRACT TEXT
      // ==========================================

      let answer =
        "Sorry, I could not understand the response.";

      let responseType = "text";

      let responseData = null;


      if (
        data &&
        Array.isArray(data.response) &&
        data.response.length > 0
      ) {

        const firstResponse =
          data.response[0];

        if (
          firstResponse &&
          typeof firstResponse === "object"
        ) {

          answer =
            firstResponse.text ||
            "No response text received.";

          responseType =
            firstResponse.type ||
            "text";

          responseData =
            firstResponse.extras ||
            null;

        } else if (
          typeof firstResponse === "string"
        ) {

          answer = firstResponse;

        }

      }


      // ==========================================
      // ASSISTANT MESSAGE
      // ==========================================

      dispatch(
        addMessage({
          role: "assistant",
          content: answer,
          type: responseType,
          data: responseData,
        })
      );


    } catch (error) {

      console.error(
        "FULL BACKEND ERROR:",
        error.response?.data
      );

      console.error(
        "ERROR STATUS:",
        error.response?.status
      );

      console.error(
        "ERROR DETAIL:",
        error.response?.data?.detail
      );

      dispatch(
        addMessage({
          role: "assistant",
          content:
            "Sorry, something went wrong. Please try again.",
        })
      );

    } finally {

      dispatch(setLoading(false));

    }
  };


  // ==========================================
  // KEYBOARD
  // ==========================================

  const handleKeyDown = (e) => {

    if (
      e.key === "Enter" &&
      !e.shiftKey
    ) {

      e.preventDefault();

      handleSend();
    }
  };


  return (
    <div className="chat-input">

      <textarea
        value={input}
        onChange={(e) =>
          setInput(e.target.value)
        }
        onKeyDown={handleKeyDown}
        placeholder="Ask your question..."
        disabled={loading}
        rows={1}
      />


      <button
        type="button"
        className="send-button"
        onClick={handleSend}
        disabled={
          loading ||
          !input.trim()
        }
      >

        {loading ? "..." : "➤"}

      </button>

    </div>
  );
}


export default ChatInput;