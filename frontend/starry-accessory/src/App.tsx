import React from "react";
import "./App.css";
import { Navbar } from "./layouts/Home/components/NavBar";
import { HomePage } from "./layouts/Home/HomePage";
import { Footer } from "./layouts/Home/components/Footer";
import { SearchPage } from "./layouts/SearchPage/SearchPage";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ProductCheckoutPage } from "./layouts/CheckoutPage/ProductCheckoutPage";
import { oktaConfig } from "./lib/oktaConfig";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { LoginCallback, Security } from "@okta/okta-react";
import LoginWidget from "./Auth/LoginWidget";

const oktaAuth = new OktaAuth(oktaConfig);

export const App = () => {
  const navigate = useNavigate();

  const authHandler = () => {
    navigate("/login");
  };

  const restoreOriginalUri = async (_oktaAuth: any, originalUrl: any) => {
    navigate(toRelativeUrl(originalUrl || "/", window.location.origin), {
      replace: true,
    });
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Security
        oktaAuth={oktaAuth}
        restoreOriginalUri={restoreOriginalUri}
        onAuthRequired={authHandler}
      >
        <Navbar />
        <div className="flex-grow-1">
          <Routes>
            <Route
              path="/login"
              element={<LoginWidget config={oktaConfig} />}
            />
            <Route path="/login/callback" element={<LoginCallback />} />
            <Route path="/search" element={<SearchPage />} />
            <Route
              path="/checkout/:productId"
              element={<ProductCheckoutPage />}
            ></Route>
            <Route path="/" element={<HomePage />}></Route>
          </Routes>
        </div>
        <Footer />
      </Security>
    </div>
  );
};
