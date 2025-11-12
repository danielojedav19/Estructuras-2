import { createSlice, nanoid } from "@reduxjs/toolkit";

const makeId = () => nanoid();

const initialState = {
  cities: [],     // {id, name}
  persons: [],    // {id, name, age, cityId}
  friends: [],    // {a, b} (ids de personas)
};

const graphSlice = createSlice({
  name: "graph",
  initialState,
  reducers: {
    setAll: (state, { payload }) => {
      state.cities = payload?.cities ?? [];
      state.persons = payload?.persons ?? [];
      state.friends = payload?.friends ?? [];
    },
    addCity: {
      reducer: (state, { payload }) => { state.cities.push(payload); },
      prepare: (name) => ({ payload: { id: makeId(), name } }),
    },
    addPerson: {
      reducer: (state, { payload }) => { state.persons.push(payload); },
      prepare: ({ name, age, cityId }) => ({
        payload: { id: makeId(), name, age, cityId },
      }),
    },
    addFriend: (state, { payload }) => {
      const exists = state.friends.some(
        f => (f.a === payload.a && f.b === payload.b) || (f.a === payload.b && f.b === payload.a)
      );
      if (!exists) state.friends.push(payload);
    },
    clearAll: (state) => { state.cities = []; state.persons = []; state.friends = []; },
  },
});

export const { setAll, addCity, addPerson, addFriend, clearAll } = graphSlice.actions;
export default graphSlice.reducer;
