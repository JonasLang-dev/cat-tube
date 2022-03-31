import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container as Element | DocumentFragment);

root.render(
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </I18nextProvider>
  </Provider>
);
