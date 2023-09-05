import { CarouselProducts } from "./CarouselProducts";
import { useEffect, useState } from "react";
import ProductModel from "../../../models/Product";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import { Link } from "react-router-dom";

export const Carousel = () => {
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const baseUrl: string = "http://localhost:8080/products";
      const url: string = `${baseUrl}?page=0&size=6`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const responseJson = await response.json();
      const responseData = responseJson._embedded.products;
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
          dateCreated: responseData[key].dateCreated,
          category: responseData[key].category,
        });
      }
      setProducts(loadedProducts);
      setIsLoading(false);
    };

    fetchProducts().catch((error: any) => {
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
    <div className="container mt-5" style={{ height: 550 }}>
      <div className="homepage-carousel-title">
        <h3>Bestsellers</h3>
      </div>
      <div
        id="carouselExampleControls"
        className="carousel carousel-dark slide mt-5 d-none d-lg-block"
        data-bs-interval="false"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="row d-flex justify-content-center align-items-center">
              {products.slice(0, 2).map((product) => (
                <CarouselProducts product={product} key={product.id} />
              ))}
            </div>
          </div>
          <div className="carousel-item">
            <div className="row d-flex justify-content-center align-items-center">
              {products.slice(2, 4).map((product) => (
                <CarouselProducts product={product} key={product.id} />
              ))}
            </div>
          </div>
          <div className="carousel-item">
            <div className="row d-flex justify-content-center align-items-center">
              {products.slice(4, 6).map((product) => (
                <CarouselProducts product={product} key={product.id} />
              ))}
            </div>
          </div>
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className="d-lg-none mt-3">
        <div className="row d-flex justify-content-center align-items-center">
          <CarouselProducts product={products[1]} key={products[1].id} />
        </div>
      </div>

      <div className="homepage-carousel-title mb-2">
        <Link className="btn btn-outline-secondary btn-lg" to="/search">
          View More
        </Link>
      </div>
    </div>
  );
};
