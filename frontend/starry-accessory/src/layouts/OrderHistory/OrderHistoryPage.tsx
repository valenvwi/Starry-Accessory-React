import { useOktaAuth } from "@okta/okta-react";
import { useEffect, useState } from "react";
import { Order } from "../../models/Order";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { OrderHistory } from "../../models/OrderHistory";
import { OrderHistoryTable } from "./OrderHistoryTable";

export const OrderHistoryPage = () => {
  const [userEmail, setUserEmail] = useState();
  const { oktaAuth, authState } = useOktaAuth();
  const [orders, setOrders] = useState<OrderHistory[]>();
  const [totalAmountOfProducts, setTotalAmountOfProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    console.log("useeffect");
    const fetchUserEmail = async () => {
      console.log("fetchUserEmail", authState);
      if (authState && authState.isAuthenticated) {
        const url = `http://localhost:8080/checkout/getEmail`;
        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authState.accessToken?.accessToken}`,
            "Content-Type": "application/json",
          },
        };
        const response = await fetch(url, requestOptions);

        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const responseText = await response.text();
        console.log(`useremail: ${responseText}`);
        return responseText;
      }
    };

    const fetchOrders = async () => {
      console.log("fetchOrders", authState?.isAuthenticated);
      if (authState && authState.isAuthenticated) {
        const userEmail = await fetchUserEmail();
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
        }));
        setOrders(loadedOrders);
        console.log(loadedOrders);
        console.log(orders);
        setIsLoading(false);
      }
    };

    fetchOrders().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, [authState]);

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
      <h3 className="my-3">Order history</h3>
      {orders && orders.length > 0 ? (
        <div>
          <table className="table table-striped">
            <thead className="thead-dark">
              <tr>
              <th scope="col"> </th>
                <th scope="col"> Date</th>
                <th scope="col"> Total Price</th>
                <th scope="col"> Total Quantity</th>
                <th scope="col"> Tracking Number</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <OrderHistoryTable order={order} key={order.id} />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="alert alert-warning col-md-12" role="alert">
          No orders found.
        </div>
      )}
    </div>
  );
};
