import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { Provider } from "react-redux";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import "./firebase";
import { store } from "./redux/store";
import NContextProvider from "providers/NContextProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <NContextProvider>
        <App />
      </NContextProvider>
    </Provider>
  </BrowserRouter>
);

reportWebVitals();
