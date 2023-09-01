import { useOktaAuth } from "@okta/okta-react";
import { useEffect, useState } from "react";

export const useFetchShoppingCartCount = (isAddedToCart: boolean) => {
  const { authState } = useOktaAuth();
  const [httpError, setHttpError] = useState(null);

  const [shoppingCartCount, setShoppingCartCount] = useState(0);
  const [isLoadingShoppingCart, setIsLoadingShoppingCart] = useState(true);

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

  return {
    shoppingCartCount,
    isLoadingShoppingCart,
    httpError,
  };
};
