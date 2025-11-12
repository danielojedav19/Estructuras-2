import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    setPosts: (state, action) => {
      state.list = action.payload;
      state.loading = false;
    },
    addPost: (state, action) => {
      // Cada publicación incluye texto, autor y fecha
      const newPost = {
        id: Date.now(),
        text: action.payload.text,
        userName: action.payload.userName,
        date: new Date().toLocaleString(),
      };
      state.list.push(newPost);
      state.loading = false;
    },
    postsError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearPosts: (state) => {
      state.list = [];
    },
  },
});

export const { startLoading, setPosts, addPost, postsError, clearPosts } =
  postsSlice.actions;

export default postsSlice.reducer;
