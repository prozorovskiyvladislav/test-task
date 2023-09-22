import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./components/app.component";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import ErrorBoundary from "./components/error-boundary/error-boundary.component";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </Provider>
  </BrowserRouter>,
);
