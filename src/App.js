import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Challenge10Page from "./pages/Challenge10Page";

export default function App() {
  return (
    <Provider store={store}>
      <div className="app-container">
        <Challenge10Page />
      </div>
    </Provider>
  );
}
