import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stack: [],
};

const stackSlice = createSlice({
  name: "stack",
  initialState,
  reducers: {
    push: (state, action) => {
      state.stack.push(action.payload);
    },
    pop: (state) => {
      if (state.stack.length > 0) {
        state.stack.pop();
      }
    },
    peek: (state) => {
      return state.stack[state.stack.length - 1];
    },
  },
});

export const { push, pop, peek } = stackSlice.actions;
export default stackSlice.reducer;
