import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chatHistory: [],
  },
  reducers: {
    sendMessage: (state, action) => {
      state.chatHistory.push(action.payload);
    },
  },
});

export const { sendMessage } = chatSlice.actions;
export const selectChatHistory = (state) => state.chat.chatHistory;
export default chatSlice.reducer;
