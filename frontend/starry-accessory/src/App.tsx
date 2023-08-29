import React from "react";
import "./App.css";
import { Navbar } from "./layouts/Home/components/NavBar";
import { HomePage } from "./layouts/Home/HomePage";
import { Footer } from "./layouts/Home/components/Footer";

export const App = () => {
  return (
    <div className="main-container">
      <Navbar />
      <HomePage />
      <Footer />
    </div>
  );
};
