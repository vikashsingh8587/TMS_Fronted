import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});


// ============================================================
// SEND QUESTION
// ============================================================
// Existing functionality preserved.
//
// Old usage:
// sendQuestion(question)
//
// New usage:
// sendQuestion(question, sessionId)
// ============================================================

export const sendQuestion = async (
  question,
  sessionId = null
) => {
  try {

    const requestData = {
      question: question,
    };

    // Session ID sirf tab bhejna hai
    // jab available ho
    if (sessionId) {
      requestData.session_id = sessionId;
    }

    const response = await api.post(
      "/chat",
      requestData
    );

    return response.data;

  } catch (error) {

    console.error(
      "Error sending question:",
      error
    );

    throw error;
  }
};


// ============================================================
// CREATE NEW CHAT SESSION
// ============================================================

export const createChatSession = async () => {
  try {

    const response = await api.post(
      "/chat/new"
    );

    return response.data;

  } catch (error) {

    console.error(
      "Error creating chat session:",
      error
    );

    throw error;
  }
};


// ============================================================
// GET ALL CHAT HISTORY
// ============================================================

export const getChatHistory = async () => {
  try {

    const response = await api.get(
      "/chat/history"
    );

    return response.data;

  } catch (error) {

    console.error(
      "Error fetching chat history:",
      error
    );

    throw error;
  }
};


// ============================================================
// GET PARTICULAR CHAT
// ============================================================

export const getChatBySession = async (
  sessionId
) => {
  try {

    const response = await api.get(
      `/chat/${sessionId}`
    );

    return response.data;

  } catch (error) {

    console.error(
      "Error fetching chat:",
      error
    );

    throw error;
  }
};


export default api;