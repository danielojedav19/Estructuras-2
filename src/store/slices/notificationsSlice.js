import { createSlice } from "@reduxjs/toolkit";

const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    stack: [],   // pila de notificaciones
    loading: false,
    error: null,
  },
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    setNotifications: (state, action) => {
      state.stack = action.payload;
      state.loading = false;
    },
    addNotification: (state, action) => {
      // agregar al inicio → LIFO
      state.stack.unshift(action.payload);
      state.loading = false;
    },
    removeNotification: (state) => {
      if (state.stack.length > 0) state.stack.shift(); // eliminar la más reciente
      state.loading = false;
    },
    clearNotifications: (state) => {
      state.stack = [];
      state.loading = false;
    },
    notificationsError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  startLoading,
  setNotifications,
  addNotification,
  removeNotification,
  clearNotifications,
  notificationsError,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
