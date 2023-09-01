import ProductModel from "../../models/ProductModel";
import { useEffect, useState } from "react";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { CartBox } from "./CartBox";
import { useOktaAuth } from "@okta/okta-react";

export const ProductDetailPage = () => {
  const { authState } = useOktaAuth();
  const [product, setProduct] = useState<ProductModel>();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  const productId = window.location.pathname.split("/")[2];
  // check the product id from localhost:3000/checkout/<productId>

  const [shoppingCartCount, setShoppingCartCount] = useState(0);
  const [isLoadingShoppingCart, setIsLoadingShoppingCart] = useState(true);

  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isLoadingAddedToCart, setIsLoadingAddedToCart] = useState(true);

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
  }, [isAddedToCart]);

  useEffect(() => {
    const fetchUserShoppingCartCount = async () => {
      if (authState && authState.isAuthenticated) {
        const url = `http://localhost:8080/products/secure/shoppingcart/count`;
        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authState.accessToken?.accessToken}`,
            "Content-Type": "application/json",
          },
        };
        const shoppingCartCountResponse = await fetch(url, requestOptions);
        if (!shoppingCartCountResponse.ok) {
          throw new Error("Something is wrong");
        }
        const shoppingCartCountResponseJson =
          await shoppingCartCountResponse.json();
        setShoppingCartCount(shoppingCartCountResponseJson);
      }
      setIsLoadingShoppingCart(false);
    };
    fetchUserShoppingCartCount().catch((error: any) => {
      setIsLoadingShoppingCart(false);
      setHttpError(error.message);
    });
  }, [authState, isAddedToCart]);

  useEffect(() => {
    const fetchUserCheckedOutProduct = async () => {
      if (authState && authState.isAuthenticated) {
        const url = `http://localhost:8080/products/secure/isaddedtocart/byuser?productId=${productId}`;
        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authState.accessToken?.accessToken}`,
            "Content-Type": "application/json",
          },
        };
        const productCheckedOut = await fetch(url, requestOptions);

        // if (productCheckedOut.ok) {
        //     throw new Error('Something went wrong!');
        // }

        const productCheckedOutResponseJson = await productCheckedOut.json();
        console.log(productCheckedOutResponseJson);
        setIsAddedToCart(productCheckedOutResponseJson);

        console.log(isAddedToCart);
      }
      setIsLoadingAddedToCart(false);
    };
    fetchUserCheckedOutProduct().catch((error: any) => {
      setIsLoadingAddedToCart(false);
      setHttpError(error.message);
    });
  }, [authState]);

  if (isLoading || isLoadingShoppingCart || isLoadingAddedToCart) {
    return <SpinnerLoading />;
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  async function addToCart() {
    const url = `http://localhost:8080/products/secure/addtocart?productId=${product?.id}`;
    const requestOptions = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
        "Content-Type": "application/json",
      },
    };
    const cartResponse = await fetch(url, requestOptions);
    if (!cartResponse.ok) {
      throw new Error("something is wong");
    }
    setIsAddedToCart(true);
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
          <CartBox
            product={product}
            mobile={false}
            shoppingCartCount={shoppingCartCount}
            isAuthenticated={authState?.isAuthenticated}
            isAddedToCart={isAddedToCart}
            addToCart={addToCart}
          />
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
        <CartBox
          product={product}
          mobile={true}
          shoppingCartCount={shoppingCartCount}
          isAuthenticated={authState?.isAuthenticated}
          isAddedToCart={isAddedToCart}
          addToCart={addToCart}
        />
      </div>
    </div>
  );
};
