import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareMinus } from "@fortawesome/free-solid-svg-icons";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { CartItem } from "../../../models/CartItem";

export const ShoppingCartItems: React.FC<{
  cartItem: CartItem;
  cartItems: CartItem[];
  removeProductFromCart: (cartItem: { id: number }) => void;
  increaseProductFromCart: (cartItem: { id: number }) => void;
}> = (props) => {
  return (
    <div>
      <div className="container d-none d-md-block">
        <div className="row mt-5">
          <div className="col-3">
            <Link to={`/checkout/${props.cartItem.id}`}>
              {props.cartItem.imageUrl ? (
                <img
                  src={props.cartItem.imageUrl}
                  width="200"
                  height="200"
                  alt="product"
                />
              ) : (
                <img
                  src={require("./../../../images/earrings/pinky-pearl.jpg")}
                  width="200"
                  height="200"
                  alt="Candy Pop"
                />
              )}
            </Link>
          </div>
          <div className="col-4 container">
            <div className="ml-2">
              <h4>{props.cartItem.name}</h4>
              <h5>CHF {props.cartItem.unitPrice} </h5>
            </div>
            <div className="d-flex align-text-center pt-4">
              <button
                className="btn icon icon-minus-margin"
                onClick={() => props.removeProductFromCart(props.cartItem)}
              >
                {/* @ts-ignore */}
                <FontAwesomeIcon icon={faSquareMinus} />
              </button>
              <h5 className="mt-3 mx-5">Qty: {props.cartItem.quantity}</h5>
              <button
                className="btn icon"
                onClick={() => props.increaseProductFromCart(props.cartItem)}
              >
                {/* @ts-ignore */}
                <FontAwesomeIcon icon={faSquarePlus} />
              </button>
            </div>
          </div>
        </div>
        {props.cartItems.indexOf(props.cartItem) !==
          props.cartItems.length - 1 && <hr />}
      </div>
      <div className="container d-md-none mt-5 text-center">
        <div className="d-flex justify-content-center align-items-center">
          <Link to={`/checkout/${props.cartItem.id}`}>
            {props.cartItem.imageUrl ? (
              <img
                src={props.cartItem.imageUrl}
                width="200"
                height="200"
                alt="product"
              />
            ) : (
              <img
                src={require("./../../../images/earrings/pinky-pearl.jpg")}
                width="200"
                height="200"
                alt="Candy Pop"
              />
            )}
          </Link>
        </div>
        <div className="mt-4">
          <div className="ml-2">
            <h4> {props.cartItem.name}</h4>
            <h5 className="text-primary"> CHF {props.cartItem.unitPrice}</h5>
          </div>
          <div className="d-flex justify-content-center pt-4">
            <button
              className="btn icon"
              onClick={() => props.removeProductFromCart(props.cartItem)}
            >
              {/* @ts-ignore */}
              <FontAwesomeIcon icon={faSquareMinus} />
            </button>
            <h5 className="mt-3 mx-4">Qty: {props.cartItem.quantity}</h5>
            <button
              className="btn icon"
              onClick={() => props.increaseProductFromCart(props.cartItem)}
            >
              {/* @ts-ignore */}
              <FontAwesomeIcon icon={faSquarePlus} />
            </button>
          </div>
        </div>
        {props.cartItems.indexOf(props.cartItem) !==
          props.cartItems.length - 1 && <hr />}
      </div>
    </div>
  );
};
