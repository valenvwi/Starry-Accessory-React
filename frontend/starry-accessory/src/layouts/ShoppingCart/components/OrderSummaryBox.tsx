import { Link } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";

export const OrderSummaryBox: React.FC<{
  mobile: boolean;
  shoppingCartCount: number;
  isAuthenticated: any;
  shoppingCartTotal: number;
}> = (props) => {
  const { authState } = useOktaAuth();

  if (!authState) {
    return <SpinnerLoading />;
  }

  return (
    <div className={props.mobile ? "card d-flex mt-5" : "card d-flex my-5"}>
      <div className="card-body container">
        <div className="mt-3 p-2">
          <p>
            <b>Order Summary </b>
            <br />
          </p>
          <div className="d-flex justify-content-between py-2">
            <div>Total Qty:</div>
            <div>{props.shoppingCartCount} </div>
          </div>
          <div className="d-flex justify-content-between py-2">
            <div>Subtotal: </div>
            <div>CHF {props.shoppingCartTotal}</div>
          </div>
          <div className="d-flex justify-content-between py-2">
            <div>Shipping: </div>
            <div>Free</div>
          </div>
          <hr />
          <div className="d-flex justify-content-between py-2">
            <div>Total: </div>
            <div>CHF {props.shoppingCartTotal}</div>
          </div>
        </div>

        <Link
          to="/checkout"
          className="btn btn-success btn-lg d-flex justify-content-center align-items-center"
        >
          Check out
        </Link>
      </div>
    </div>
  );
};
