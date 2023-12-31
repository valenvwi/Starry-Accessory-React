import React from "react";
import "./App.css";
import { Navbar } from "./layouts/Home/components/NavBar";
import { HomePage } from "./layouts/Home/HomePage";
import { Footer } from "./layouts/Home/components/Footer";
import { SearchPage } from "./layouts/SearchPage/SearchPage";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ProductDetailPage } from "./layouts/ProductDetail/ProductDetailPage";
import { oktaConfig } from "./lib/oktaConfig";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { LoginCallback, Security } from "@okta/okta-react";
import LoginWidget from "./Auth/LoginWidget";
import { ShoppingCart } from "./layouts/ShoppingCart/ShoppingCart";
import { Checkout } from "./layouts/CheckoutPage/Checkout";
import { OrderHistoryPage } from "./layouts/OrderHistory/OrderHistoryPage";

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
            <Route path="/shoppingcart" element={<ShoppingCart />}></Route>
            <Route path="/checkout" element={<Checkout />}></Route>
            <Route path="/orderhistory" element={<OrderHistoryPage />}></Route>
            <Route
              path="/product/:productId"
              element={<ProductDetailPage />}
            ></Route>
            <Route path="/" element={<HomePage />}></Route>
          </Routes>
        </div>
        <Footer />
      </Security>
    </div>
  );
};
