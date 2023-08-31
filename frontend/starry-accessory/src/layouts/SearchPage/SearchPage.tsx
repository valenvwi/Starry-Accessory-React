import ProductModel from "../../models/ProductModel";
import { useEffect, useState } from "react";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { SearchProduct } from "./components/SearchProduct";
import { Pagination } from "../Utils/Pagination";

export const SearchPage = () => {
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);
  const [totalAmountOfProducts, setTotalAmountOfProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");
  const [searchUrl, setSearchUrl] = useState("");
  const [categorySelection, setCategorySelection] =
    useState("Product category");

  useEffect(() => {
    const fetchProducts = async () => {
      const baseUrl: string = "http://localhost:8080/products";
      let url: string = "";

      if (searchUrl === "") {
        url = `${baseUrl}?page=${currentPage - 1}&size=${productsPerPage}`;
      } else {
        let searchWithPage = searchUrl.replace(
          "<pageNumber>",
          `${currentPage - 1}`
        );
        url = baseUrl + searchWithPage;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const responseJson = await response.json();
      const responseData = responseJson._embedded.products;

      setTotalAmountOfProducts(responseJson.page.totalElements);
      setTotalPages(responseJson.page.totalPages);

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
    };

    fetchProducts().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
    window.scrollTo(0, 0);
  }, [currentPage, searchUrl]);

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

  const searchHandleChange = () => {
    setCurrentPage(1);

    if (search === "") {
      setSearchUrl("");
    } else {
      setSearchUrl(
        `/search/findByNameContaining?name=${search}&page=<pageNumber>&size=${productsPerPage}`
      );
    }
    setCategorySelection("Product category");
  };

  console.log(searchUrl);
  const categoryField = (value: string) => {
    setCurrentPage(1);
    if (
      value.toLowerCase() === "new arrivals" ||
      value.toLowerCase() === "best sellers" ||
      value.toLowerCase() === "now trending"
    ) {
      setCategorySelection(value);
      setSearchUrl(
        `/search/findByCategory?category=${value}&page=<pageNumber>&size=${productsPerPage}`
      );
    } else {
      setCategorySelection("All");
      setSearchUrl(`?page=<pageNumber>&size=${productsPerPage}`);
    }
  };

  const indexOfLastProduct: number = currentPage * productsPerPage;
  const indexOfFirstProduct: number = indexOfLastProduct - productsPerPage;
  let lastItem =
    productsPerPage * currentPage <= totalAmountOfProducts
      ? productsPerPage * currentPage
      : totalAmountOfProducts;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="container">
        <div>
          <div className="row mt-2">
            <div className="col-sm-12 col-md-8 col-lg-10 mt-3">
              <div className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-labelledby="Search"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button
                  className="btn btn-outline-success"
                  onClick={() => searchHandleChange()}
                >
                  Search
                </button>
              </div>
            </div>
            <div className="col-sm-6 col-md-4 col-lg-2 mt-3">
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {categorySelection}
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li onClick={() => categoryField("New Arrivals")}>
                    <a className="dropdown-item" href="#">
                      New Arrivals
                    </a>
                  </li>
                  <li onClick={() => categoryField("Best Sellers")}>
                    <a className="dropdown-item" href="#">
                      Best Sellers
                    </a>
                  </li>
                  <li onClick={() => categoryField("Now Trending")}>
                    <a className="dropdown-item" href="#">
                      Now Trending
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {totalAmountOfProducts > 0 ? (
            <>
              <div className="mt-3">
                <h5> Number of results: {totalAmountOfProducts}</h5>
              </div>
              <p>
                {indexOfFirstProduct + 1} to {lastItem} of{" "}
                {totalAmountOfProducts} items:
              </p>
              {products.map((product) => (
                <SearchProduct product={product} key={product.id} />
              ))}
            </>
          ) : (
            <div className="m-5">
              <h3>Can't find what your are looking for?</h3>
              <a
                type="button"
                className="btn main-color btn-md px-4 me-md-2 fw-bold text-white"
                href="#"
              >
                Contact us
              </a>
            </div>
          )}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              paginate={paginate}
            />
          )}
        </div>
      </div>
    </div>
  );
};
