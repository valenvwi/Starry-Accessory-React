import { useEffect, useState } from "react";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { CartBox } from "./CartBox";
import { useOktaAuth } from "@okta/okta-react";
import { useFetchProduct } from "../Utils/useFetchProduct";
import { useLocalShoppingCart } from "../Utils/useLocalShoppingCart";

export const ProductDetailPage = () => {
  const { authState } = useOktaAuth();
  const [httpError, setHttpError] = useState(null);

  const productId = window.location.pathname.split("/")[2];
  // check the product id from localhost:3000/checkout/<productId>

  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isLoadingAddedToCart, setIsLoadingAddedToCart] = useState(true);


  const {
    product,
    isLoading: isProductLoading,
    httpError: productHttpError,
  } = useFetchProduct(productId);

  const {
    cartItems,
    totalPrice,
    totalQuantity,
    addProductToCart,
    removeProductFromCart,
  } = useLocalShoppingCart()



  return (
    <div>
      <div className="container d-none d-lg-block">
        <div className="row mt-5">
          <div className="col-4">
            {product?.imageUrl ? (
              <img
                src={product?.imageUrl}
                width="300"
                height="300"
                alt="product"
              />
            ) : (
              <img
                src={require("./../../images/earrings/pinky-pearl.jpg")}
                width="300"
                height="300"
                alt="Candy Pop"
              />
            )}
          </div>
          <div className="col-5 container">
            <div className="ml-2">
              <h2>{product?.name}</h2>
              <h5 className="text-primary">CHF {product?.unitPrice} </h5>
              <p className="lead"> {product?.description}</p>
            </div>
          </div>
          <CartBox
            product={product}
            mobile={false}
            totalQuantity={totalQuantity}
            isAuthenticated={authState?.isAuthenticated}
            cartItems={cartItems}
            addToCart={addProductToCart}
          />
        </div>
      </div>
      <div className="container d-lg-none mt-5">
        <div className="d-flex justify-content-center align-items-center">
          {product?.imageUrl ? (
            <img
              src={product?.imageUrl}
              width="300"
              height="300"
              alt="product"
            />
          ) : (
            <img
              src={require("./../../images/earrings/pinky-pearl.jpg")}
              width="300"
              height="300"
              alt="Candy Pop"
            />
          )}
        </div>
        <div className="mt-4">
          <div className="ml-2">
            <h2> {product?.name}</h2>
            <h5 className="text-primary"> CHF {product?.unitPrice}</h5>
            <p className="lead"> {product?.description}</p>
          </div>
        </div>
        <hr />
        <CartBox
          product={product}
          mobile={true}
          totalQuantity={totalQuantity}
          isAuthenticated={authState?.isAuthenticated}
          cartItems={cartItems}
          addToCart={addProductToCart}
        />
      </div>
    </div>
  );
};
