import { useOktaAuth } from "@okta/okta-react";
import { useEffect, useState } from "react";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { OrderHistory } from "../../models/OrderHistory";
import { useFetchUserEmail } from "../Utils/useFetchUserEmail";
import { Link } from "react-router-dom";
import { OrderHistoryBox } from "./OrderHistoryBox";

export const OrderHistoryPage = () => {
  const { authState } = useOktaAuth();
  const [orders, setOrders] = useState<OrderHistory[]>();
  const [totalAmountOfProducts, setTotalAmountOfProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const userEmail = useFetchUserEmail();

  useEffect(() => {
    const fetchOrders = async () => {
      console.log("fetchOrders", authState?.isAuthenticated);
      if (authState && authState.isAuthenticated && userEmail) {
        // const userEmail = await fetchUserEmail();
        const url = `http://localhost:8080/orders/search/findByCustomerEmailOrderByDateCreatedDesc?email=${userEmail}`;
        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authState.accessToken?.accessToken}`,
            "Content-Type": "application/json",
          },
        };
        const response = await fetch(url, requestOptions);
        console.log(response);

        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const responseJson = await response.json();
        const responseData = responseJson._embedded.orders;

        setTotalAmountOfProducts(responseJson.page.totalElements);
        setTotalPages(responseJson.page.totalPages);

        const loadedOrders: OrderHistory[] = responseData.map((order: any) => ({
          id: order.id,
          orderTrackingNumber: order.orderTrackingNumber,
          totalPrice: order.totalPrice,
          totalQuantity: order.totalQuantity,
          status: order.status,
          dateCreated: order.dateCreated,
          orderItems: order.orderItems,
        }));
        setOrders(loadedOrders);
        setIsLoading(false);
      }
    };
    fetchOrders().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, [authState, authState?.isAuthenticated, userEmail]);

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
    <div className="container">
      {orders && orders.length > 0 ? (
        <div>
          <h3 className="pt-4 px-3 pb-4">Your Orders</h3>
          {orders.map((order) => (
            <OrderHistoryBox order={order} key={order.id} />
          ))}
        </div>
      ) : (
        <div className="container d-flex justify-content-center flex-column align-items-center">
          <h3 className="my-5 pt-5 ">Place your first order now!</h3>
          <Link
            type="button"
            className="btn main-color btn-md p-3 fw-bold text-white"
            to="/search"
          >
            Shop now
          </Link>
        </div>
      )}
    </div>
  );
};
