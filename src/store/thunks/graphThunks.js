import { setAll } from "../slices/graphSlice";

const KEY = "graph16";

export const hydrateGraph = () => (dispatch) => {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      dispatch(setAll(JSON.parse(raw)));
      return;
    }
  } catch (_) {}
  // Seed por defecto si no hay datos
  const seed = {
    cities: [{ id: "c1", name: "Cali" }, { id: "c2", name: "Palmira" }],
    persons: [
      { id: "p1", name: "Alice", age: 22, cityId: "c1" },
      { id: "p2", name: "Bob", age: 24, cityId: "c2" },
    ],
    friends: [{ a: "p1", b: "p2" }],
  };
  localStorage.setItem(KEY, JSON.stringify(seed));
  dispatch(setAll(seed));
};

export const persistGraph = () => (_dispatch, getState) => {
  const { graph } = getState();
  try { localStorage.setItem(KEY, JSON.stringify(graph)); } catch (_) {}
};
