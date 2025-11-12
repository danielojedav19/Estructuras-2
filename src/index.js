import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/main.scss";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { AppRouter } from "./routes/AppRouter";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
