import { CartBox } from "./CartBox";
import { useOktaAuth } from "@okta/okta-react";
import { useFetchProduct } from "../Utils/useFetchProduct";
import { useLocalShoppingCart } from "../Utils/useLocalShoppingCart";
import { SpinnerLoading } from "../Utils/SpinnerLoading";

export const ProductDetailPage = () => {
  const { authState } = useOktaAuth();
  const productId = window.location.pathname.split("/")[2];

  const { product, isLoading } = useFetchProduct(productId);
  const { cartItems, totalQuantity, addProductToCart } = useLocalShoppingCart();

  if (isLoading) {
    return <SpinnerLoading />;
  }

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
            <div className="">
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
          <div className="mx-3">
            <h2> {product?.name}</h2>
            <h5 className="text-primary"> CHF {product?.unitPrice}</h5>
            <p className="lead"> {product?.description}</p>
          </div>
        </div>
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
