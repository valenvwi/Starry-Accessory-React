import { Link } from "react-router-dom";
import ProductModel from "../../models/ProductModel";

export const CheckoutBox: React.FC<{
  product: ProductModel | undefined;
  mobile: boolean;
}> = (props) => {
  return (
    <div
      className={props.mobile ? "card d-flex mt-5" : "card col-3 d-flex mb-5"}
    >
      <div className="card-body container">
        <div className="mt-3">
          <p>
            <b>0/5 </b>
            items checked out
          </p>
          <hr />
          {props.product && props.product.availableStock > 0 ? (
            <h4 className="text-success">Available</h4>
          ) : (
            <h4 className="text-danger">Wait List</h4>
          )}
          <div className="row">
            <p className="lead">
              Stock:
              <b> {props.product?.stock}</b>
            </p>
            <p className="col-6-lead">
              <b>{props.product?.availableStock} </b>
              available
            </p>
          </div>
        </div>
        <Link to="/" className="bun bun-success btn-lg">
          Sign in
        </Link>

        <hr />
        <p className="mt-3">
          This number can change until placing order has been completed.
        </p>
        <p>Sign in to be able to add this into the cart.</p>
      </div>
    </div>
  );
};
