import { useEffect, useState } from "react";
import { useOktaAuth } from "@okta/okta-react";
import { Link } from "react-router-dom";
import { ShoppingCartItems } from "./components/ShoppingCartItems";
import { OrderSummaryBox } from "./components/OrderSummaryBox";
import { useLocalShoppingCart } from "../Utils/useLocalShoppingCart";

export const ShoppingCart = () => {
  const { authState } = useOktaAuth();

  const {
    cartItems,
    totalPrice,
    totalQuantity,
    increaseProductFromCart,
    removeProductFromCart,
  } = useLocalShoppingCart();

  return (
    <>
      {cartItems.length > 0 ? (
        <>
          <div className="container">
            <div className="row">
              <div className="col-sm-12 col-md-8">
                <h3 className="pt-4 px-3"> Shopping cart</h3>
                {cartItems.map((item) => (
                  <ShoppingCartItems
                    cartItem={item}
                    key={item.id}
                    removeProductFromCart={removeProductFromCart}
                    increaseProductFromCart={increaseProductFromCart}
                  />
                ))}
              </div>
              <div className="col-sm-12 col-md-4">
                <OrderSummaryBox
                  mobile={false}
                  shoppingCartCount={totalQuantity}
                  shoppingCartTotal={totalPrice}
                  isAuthenticated={authState?.isAuthenticated}
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="container d-flex justify-content-center flex-column align-items-center">
          <h3 className="my-5 pt-5 ">Your shopping cart is empty</h3>
          <Link
            type="button"
            className="btn main-color btn-md p-3 fw-bold text-white"
            to="/search"
          >
            Shop now
          </Link>
        </div>
      )}
    </>
  );
};
