// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Providers from "./app/providers";
import Router from "./app/router/router";
import "./assets/styles/globals.css";
import Header from "./widgets/header/Header";
import Footer from "./widgets/footer/Footer";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Providers>
      <BrowserRouter>
        <Header />
        <Router />
        <Footer/>
      </BrowserRouter>
    </Providers>
  </React.StrictMode>,
);
