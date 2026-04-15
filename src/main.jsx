// main.jsx
import { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Providers from "./app/providers";
import Router from "./app/router/router";
import "./assets/styles/globals.css";
import "./assets/styles/safe-area.css";
import { initNativeUI } from "./app/native/initNativeUI.js";

function AppBootstrap() {
  useEffect(() => {
    initNativeUI();
  }, []);

  return (
    <Providers>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </Providers>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<AppBootstrap />);