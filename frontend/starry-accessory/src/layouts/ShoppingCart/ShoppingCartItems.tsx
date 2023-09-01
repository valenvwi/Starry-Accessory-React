import ProductModel from "../../models/ProductModel";
import { Link } from "react-router-dom";

export const ShoppingCartItems: React.FC<{ product: ProductModel }> = (
  props
) => {
  return (
    <div>
      <div className="container d-none d-lg-block">
        <div className="row mt-5">
          <div className="col-3">
            <Link to={`/checkout/${props.product.id}`}>
              {props.product.imageUrl ? (
                <img
                  src={props.product.imageUrl}
                  width="200"
                  height="200"
                  alt="product"
                />
              ) : (
                <img
                  src={require("./../../images/earrings/pinky-pearl.jpg")}
                  width="200"
                  height="200"
                  alt="Candy Pop"
                />
              )}
            </Link>
          </div>
          <div className="col-4 container">
            <div className="ml-2">
              <h4>{props.product.name}</h4>
              <h5 className="text-primary">CHF {props.product.unitPrice} </h5>
              <p className="lead"> Qty: 1</p>
            </div>
          </div>
        </div>
        <hr />
      </div>
      <div className="container d-lg-none mt-5">
        <div className="d-flex justify-content-center align-items-center">
          <Link to={`/checkout/${props.product.id}`}>
            {props.product.imageUrl ? (
              <img
                src={props.product.imageUrl}
                width="200"
                height="200"
                alt="product"
              />
            ) : (
              <img
                src={require("./../../images/earrings/pinky-pearl.jpg")}
                width="200"
                height="200"
                alt="Candy Pop"
              />
            )}
          </Link>
        </div>
        <div className="mt-4">
          <div className="ml-2">
            <h4> {props.product.name}</h4>
            <h5 className="text-primary"> CHF {props.product.unitPrice}</h5>
            <p className="lead"> Qty: 1</p>
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
};
