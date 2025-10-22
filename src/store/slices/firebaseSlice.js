import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const firebaseSlice = createSlice({
  name: "firebase",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setItems: (state, action) => {
      state.items = action.payload;
      state.loading = false;
    },
    addItem: (state, action) => {
      state.items.push(action.payload);
      state.loading = false;
    },
    updateItem: (state, action) => {
      const index = state.items.findIndex((i) => i.id === action.payload.id);
      if (index !== -1) state.items[index] = action.payload;
      state.loading = false;
    },
    deleteItem: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
      state.loading = false;
    },
    firebaseError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {startLoading, setItems, addItem, updateItem, deleteItem, firebaseError,} = firebaseSlice.actions;
export default firebaseSlice.reducer;
