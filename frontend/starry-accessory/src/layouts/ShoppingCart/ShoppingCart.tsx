import { useEffect, useState } from "react";
import ProductModel from "../../models/ProductModel";
import { useOktaAuth } from "@okta/okta-react";
import { Link } from "react-router-dom";
import { ShoppingCartItems } from "./ShoppingCartItems";
import { OrderSummaryBox } from "./OrderSummaryBox";
import { useFetchShoppingCartCount } from "../Utils/useFetchShoppingCartCount";

export const ShoppingCart = () => {
  const { authState } = useOktaAuth();
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const [totalAmountOfProducts, setTotalAmountOfProducts] = useState(1);
//   const [shoppingCartCount, setShoppingCartCount] = useState(0);
  const [isLoadingShoppingCart, setIsLoadingShoppingCart] = useState(true);
  const [shoppingCartTotal, setShoppingCartTotal] = useState(0);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      if (authState && authState.isAuthenticated) {
        const shoppingCartUrl: string = `http://localhost:8080/products/secure/viewshoppingcart`;
        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
            "Content-Type": "application/json",
          },
        };
        const response = await fetch(shoppingCartUrl, requestOptions);
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const responseData = await response.json();
        console.log(responseData);
        //   setTotalAmountOfProducts(responseData.page.totalElements);

        const loadedProducts: ProductModel[] = [];

        for (const key in responseData) {
          loadedProducts.push({
            id: responseData[key].id,
            name: responseData[key].name,
            description: responseData[key].description,
            unitPrice: responseData[key].unitPrice,
            stock: responseData[key].stock,
            availableStock: responseData[key].availableStock,
            imageUrl: responseData[key].imageUrl,
            category: responseData[key].category,
            dateCreated: responseData[key].dateCreated,
          });
        }
        setProducts(loadedProducts);
        setIsLoading(false);
      }

    };
    fetchProducts().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);


const {shoppingCartCount,
    isLoadingShoppingCart: isLoadingShoppingCartCount,
    httpError: shoppingCartCountHttpError,
  } = useFetchShoppingCartCount(isAddedToCart);

  useEffect(() => {
    const fetchUserShoppingCartTotal = async () => {
      if (authState && authState.isAuthenticated) {
        const url = `http://localhost:8080/products/secure/shoppingcarttotal`;
        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authState.accessToken?.accessToken}`,
            "Content-Type": "application/json",
          },
        };
        const shoppingCartTotalResponse = await fetch(url, requestOptions);
        if (!shoppingCartTotalResponse.ok) {
          throw new Error("Something is wrong");
        }
        const shoppingCartTotalResponseJson =
          await shoppingCartTotalResponse.json();
        setShoppingCartTotal(shoppingCartTotalResponseJson);
      }
      setIsLoadingShoppingCart(false);
    };
    fetchUserShoppingCartTotal().catch((error: any) => {
      setIsLoadingShoppingCart(false);
      setHttpError(error.message);
    });
  }, [authState]);

  return (
    <>
      {totalAmountOfProducts > 0 ? (
        <>
          <div className="container">
            <div className="row">
              <div className="col-8">
                <h5> Shopping cart:</h5>
                {products.map((product) => (
                  <ShoppingCartItems product={product} key={product.id} />
                ))}
              </div>
              <div className="col-4">
                <OrderSummaryBox
                  mobile={false}
                  shoppingCartCount={shoppingCartCount}
                  shoppingCartTotal={shoppingCartTotal}
                  isAuthenticated={authState?.isAuthenticated}
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="container">
          <h3>Your shopping cart is empty</h3>
          <Link
            type="button"
            className="btn main-color btn-md px-4 me-md-2 fw-bold text-white"
            to="/search"
          >
            Shop now
          </Link>
        </div>
      )}
    </>
  );
};
