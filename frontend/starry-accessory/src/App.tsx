import React from "react";
import "./App.css";
import { Navbar } from "./layouts/Home/components/NavBar";
import { HomePage } from "./layouts/Home/HomePage";
import { Footer } from "./layouts/Home/components/Footer";
import { SearchPage } from "./layouts/SearchPage/SearchPage";
import { Route, Routes } from "react-router-dom";

export const App = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="flex-grow-1">
        <Routes>
          <Route path="/search" element={<SearchPage />} />
          <Route path="/" element={<HomePage />}></Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
};
