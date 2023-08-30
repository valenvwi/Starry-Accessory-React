import ProductModel from "../../models/ProductModel";
import { useEffect, useState } from "react";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { CheckoutBox } from "./CheckoutBox";

export const ProductCheckoutPage = () => {
  const [product, setProduct] = useState<ProductModel>();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  const productId = window.location.pathname.split("/")[2];
  // check the product id from localhost:3000/checkout/<productId>

  useEffect(() => {
    const fetchProduct = async () => {
      const baseUrl: string = `http://localhost:8080/products/${productId}`;
      const response = await fetch(baseUrl);
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const responseJson = await response.json();
      const loadedProduct: ProductModel = {
        id: responseJson.id,
        name: responseJson.name,
        description: responseJson.description,
        unitPrice: responseJson.unitPrice,
        stock: responseJson.stock,
        availableStock: responseJson.availableStock,
        imageUrl: responseJson.imageUrl,
        dateCreated: responseJson.dateCreated,
        category: responseJson.category,
      };

      setProduct(loadedProduct);
      setIsLoading(false);
    };

    fetchProduct().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return <SpinnerLoading />;
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
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
            <div className="ml-2">
              <h2>{product?.name}</h2>
              <h5 className="text-primary">CHF {product?.unitPrice} </h5>
              <p className="lead"> {product?.description}</p>
            </div>
          </div>
          <CheckoutBox product={product} mobile={false} />
        </div>
        <hr />
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
        <CheckoutBox product={product} mobile={true} />
      </div>
    </div>
  );
};
