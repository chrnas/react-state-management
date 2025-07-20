// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import {UserStoreProvider } from "./stores/userStore";
import { AuthStoreProvider } from "./stores/authStore";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthStoreProvider>
      <UserStoreProvider>
        <App />
      </UserStoreProvider>
    </AuthStoreProvider>
  </React.StrictMode>
);
