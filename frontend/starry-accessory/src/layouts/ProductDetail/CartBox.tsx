import { Link } from "react-router-dom";
import ProductModel from "../../models/ProductModel";
import { useOktaAuth } from "@okta/okta-react";
import { SpinnerLoading } from "../Utils/SpinnerLoading";

export const CartBox: React.FC<{
  product: ProductModel | undefined,
  mobile: boolean,
  shoppingCartCount: number,
  isAuthenticated: any,
  isAddedToCart:boolean,
  addToCart: any
}> = (props) => {
  const { oktaAuth, authState } = useOktaAuth();

  if (!authState) {
    return <SpinnerLoading />;
  }

  function buttonRender(){
    if (props.isAuthenticated){
      if (!props.isAddedToCart){
        return (<button onClick={() => props.addToCart()} className="btn btn-success btn-lg">Add to cart</button>)
      } else {
        return (<p><b>Item already added to your cart</b></p>)
      }
    }
    return (<Link to="/login" className="btn btn-success btn-lg">Log in</Link>)
  }

  return (
    <div
      className={props.mobile ? "card d-flex mt-5" : "card col-3 d-flex mb-5"}
    >
      <div className="card-body container">
        <div className="mt-3">
          <p>
            <b>{props.shoppingCartCount} </b>
            items in your shopping cart
          </p>
          <hr />
          {props.product && props.product.availableStock > 0 ? (
            <h4 className="text-success">Available</h4>
          ) : (
            <h4 className="text-danger">Wait List</h4>
          )}
          <div className="row">
            <p className="col-6-lead">
              Only
              <b> {props.product?.availableStock} </b>
              in stock
            </p>
          </div>
        </div>
        {buttonRender()}

        <hr />
        {!authState.isAuthenticated ? (
          <p className="mt-3">Log in to be able to add this into the cart.</p>
        ) : (
          <p className="mt-3">❤️❤️❤️❤️❤️</p>
        )}
      </div>
    </div>
  );
};
