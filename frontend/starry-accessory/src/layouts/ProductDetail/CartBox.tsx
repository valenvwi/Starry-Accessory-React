import { Link } from "react-router-dom";
import ProductModel from "../../models/Product";
import { useOktaAuth } from "@okta/okta-react";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { CartItem } from "../../models/CartItem";

export const CartBox: React.FC<{
  product: ProductModel | undefined;
  mobile: boolean;
  totalQuantity: number;
  isAuthenticated: any;
  cartItems: CartItem[];
  addToCart: (product: ProductModel) => void;
}> = (props) => {
  const { oktaAuth, authState } = useOktaAuth();

  if (!authState) {
    return <SpinnerLoading />;
  }

  function buttonRender() {
    if (props.isAuthenticated) {
      const productIsInCart = props.cartItems.some(
        (item) => item.id === props.product?.id
      );
      if (!productIsInCart) {
        return (
          <button
            onClick={() => {
              if (props.product) {
                props.addToCart(props.product);
              }
            }}
            className="btn btn-success btn-lg mt-2 mb-5"
          >
            Add to cart
          </button>
        );
      } else {
        return (
          <p className=" mt-2 mb-5">
            <b>Item already added to your cart</b>
          </p>
        );
      }
    }
    return (
      <Link to="/login" className="btn btn-success btn-lg my-2">
        Log in
      </Link>
    );
  }

  return (
    <div
      className={props.mobile ? "card d-flex my-4 text-center" : "card col-3 d-flex mb-5"}
    >
      <div className="card-body container">
        <div className="mt-2">
          {props.product && props.product.availableStock > 0 ? (
            <h4 className={props.mobile ? "text-success mt-0" :"text-success py-3"}>Available</h4>
          ) : (
            <h4 className="text-danger py-3">Sold out</h4>
          )}
        </div>
        {buttonRender()}

        {!authState.isAuthenticated ? (
          <p className={props.mobile ? "mb-2" :"mt-3"}>Log in to be able to add this into the cart.</p>
        ) : (
          <>
            <hr />
            <p className={props.mobile ? "mb-2" :"mt-4"}>
              <b>{props.totalQuantity} </b>
              items in your shopping cart
            </p>
          </>
        )}
      </div>
    </div>
  );
};
