import { useEffect, useState } from "react";
import ProductModel from "../../models/Product";

export const useFetchProduct = (productId: string) => {
  const [product, setProduct] = useState<ProductModel>();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

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
  }, [productId]);

  return {
    product,
    isLoading,
    httpError,
  };
};
