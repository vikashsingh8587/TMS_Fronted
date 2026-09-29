import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // ==========================================================
  // EXISTING
  // ==========================================================

  messages: [],
  loading: false,

  // ==========================================================
  // CHAT HISTORY
  // ==========================================================

  currentSessionId: null,

  chatHistory: [],

  historyLoading: false,

  error: null,
};


const chatSlice = createSlice({

  name: "chat",

  initialState,

  reducers: {

    // ========================================================
    // EXISTING: ADD MESSAGE
    // ========================================================

    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },


    // ========================================================
    // EXISTING: SET LOADING
    // ========================================================

    setLoading: (state, action) => {
      state.loading = action.payload;
    },


    // ========================================================
    // EXISTING: CLEAR MESSAGES
    // ========================================================

    clearMessages: (state) => {
      state.messages = [];
    },


    // ========================================================
    // NEW: SET SESSION ID
    // ========================================================

    setSessionId: (state, action) => {
      state.currentSessionId = action.payload;
    },


    // ========================================================
    // NEW: SET CHAT HISTORY
    // ========================================================

    setChatHistory: (state, action) => {
      state.chatHistory = action.payload;
    },


    // ========================================================
    // NEW: SET HISTORY LOADING
    // ========================================================

    setHistoryLoading: (state, action) => {
      state.historyLoading = action.payload;
    },


    // ========================================================
    // NEW: LOAD OLD CHAT MESSAGES
    // ========================================================

    setMessages: (state, action) => {
      state.messages = action.payload;
    },


    // ========================================================
    // NEW: START NEW CHAT
    // ========================================================

    startNewChat: (state, action) => {

      state.currentSessionId =
        action.payload;

      state.messages = [];

      state.error = null;
    },


    // ========================================================
    // NEW: SET ERROR
    // ========================================================

    setError: (state, action) => {
      state.error = action.payload;
    },


    // ========================================================
    // NEW: CLEAR ERROR
    // ========================================================

    clearError: (state) => {
      state.error = null;
    },

  },
});


export const {
  // Existing
  addMessage,
  setLoading,
  clearMessages,

  // New
  setSessionId,
  setChatHistory,
  setHistoryLoading,
  setMessages,
  startNewChat,
  setError,
  clearError,

} = chatSlice.actions;


export default chatSlice.reducer;