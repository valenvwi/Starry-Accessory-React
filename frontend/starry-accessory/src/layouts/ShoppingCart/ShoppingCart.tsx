import { useEffect, useState } from "react";
import ProductModel from "../../models/Product";
import { useOktaAuth } from "@okta/okta-react";
import { Link } from "react-router-dom";
import { ShoppingCartItems } from "./components/ShoppingCartItems";
import { OrderSummaryBox } from "./components/OrderSummaryBox";
import { useFetchShoppingCartCount } from "../Utils/useFetchShoppingCartCount";
import { useLocalShoppingCart } from "../Utils/useLocalShoppingCart";

export const ShoppingCart = () => {
  const { authState } = useOktaAuth();
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const [totalAmountOfProducts, setTotalAmountOfProducts] = useState(1);
  //   const [shoppingCartCount, setShoppingCartCount] = useState(0);
  const [isLoadingShoppingCart, setIsLoadingShoppingCart] = useState(true);
  const [shoppingCartTotal, setShoppingCartTotal] = useState(0);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const {
    cartItems,
    totalPrice,
    totalQuantity,
    increaseProductFromCart,
    removeProductFromCart,
  } = useLocalShoppingCart();

  return (
    <>
      {totalAmountOfProducts > 0 ? (
        <>
          <div className="container">
            <div className="row">
              <div className="col-sm-12 col-md-8">
                <h5 className="px-3"> Shopping cart:</h5>
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
        <div className="container">
          <h3>Your shopping cart is empty</h3>
          <Link
            type="button"
            className="btn main-color btn-md px-4 me-md-2 fw-bold text-white"
            to="/search"
          >
            Shop now
          </Link>
        </div>
      )}
    </>
  );
};
