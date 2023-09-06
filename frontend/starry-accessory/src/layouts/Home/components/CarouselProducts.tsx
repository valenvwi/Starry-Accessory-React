import React from "react";
import ProductModel from "../../../models/Product";
import { Link } from "react-router-dom";

export const CarouselProducts: React.FC<{ product: ProductModel }> = (
  props
) => {
  return (
    <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3 mx-5">
      <div className="text-center">
        {props.product.imageUrl ? (
          <img
            src={props.product.imageUrl}
            width="300"
            height="300"
            alt={props.product.name}
          />
        ) : (
          <img
            src={require("./../../../images/earrings/pinky-pearl.jpg")}
            width="300"
            height="300"
            alt="Candy Pop"
          />
        )}
        <h6 className="mt-2">{props.product.name}</h6>
        <p>CHF {props.product.unitPrice}</p>
        <Link
          className="btn main-color text-white"
          to={`/product/${props.product.id}`}
        >
          Reserve
        </Link>
      </div>
    </div>
  );
};
