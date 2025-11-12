import { createSlice } from "@reduxjs/toolkit";

const directMessagesSlice = createSlice({
  name: "directMessages",
  initialState: {
    queue: [],      
    loading: false,
    error: null,
  },
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    setMessages: (state, action) => {
      state.queue = action.payload;
      state.loading = false;
    },
    addMessage: (state, action) => {
      state.queue.push(action.payload); 
      state.loading = false;
    },
    dequeueMessage: (state) => {
      state.queue.shift();
      state.loading = false;
    },
    clearQueue: (state) => {
      state.queue = [];
      state.loading = false;
    },
    messagesError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  startLoading,
  setMessages,
  addMessage,
  dequeueMessage,
  clearQueue,
  messagesError,
} = directMessagesSlice.actions;

export default directMessagesSlice.reducer;
