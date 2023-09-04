import { Link } from "react-router-dom";
import ProductModel from "../../../models/Product";

export const SearchProduct: React.FC<{ product: ProductModel }> = (props) => {
  return (
    <div className="card my-2 shadow p-5 py-3 bg-body rounded">
      <div className="row">
        <div className="col-md-4">
          <div className="d-none d-lg-block mt-2">
            {props.product.imageUrl ? (
              <img
                src={props.product.imageUrl}
                width="250"
                height="250"
                alt="Earrings"
              />
            ) : (
              <img
                src={require("../../../images/earrings/key-to-soul.jpg")}
                width="300"
                height="300"
                alt="Earrings"
              />
            )}
          </div>
          <div className="d-lg-none d-flex justify-content-center align-items-center mt-2">
            {props.product.imageUrl ? (
              <img
                src={props.product.imageUrl}
                width="250"
                height="250"
                alt="Earrings"
              />
            ) : (
              <img
                src={require("../../../images/earrings/key-to-soul.jpg")}
                width="300"
                height="300"
                alt="Earrings"
              />
            )}
          </div>
        </div>
        <div className="col-md-5 gx-5">
          <div className="card-body">
            <h5 className="card-title">{props.product.name}</h5>
            <h4>
              {props.product.availableStock} out of {props.product.stock}
            </h4>
            <p className="card-text">{props.product.description}</p>
          </div>
        </div>
        <div className="col-md-2 d-flex justify-content-center align-items-center">
          <Link
            className="btn btn-md main-color text-white"
            to={`/checkout/${props.product.id}`}
          >
            View details
          </Link>
        </div>
      </div>
    </div>
  );
};
