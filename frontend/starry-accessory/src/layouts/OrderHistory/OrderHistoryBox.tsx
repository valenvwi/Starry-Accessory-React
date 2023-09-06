import { Link } from "react-router-dom";
import { OrderHistory } from "../../models/OrderHistory";

export const OrderHistoryBox: React.FC<{ order: OrderHistory }> = (props) => {
  return (
    <>
      <div className="mb-5 px-3">
        <h5>Order from {props.order.dateCreated}</h5>
        <div className="d-none d-md-block">
          <div className="d-flex py-2">
            <p>Total amount CHF {props.order.totalPrice}</p>
            <p className="mx-5 px-5">Status: Submitted</p>
          </div>
          {props.order.orderItems.map((item) => (
            <>
              <div className="d-flex py-2">
                <div>
                  {item.imageUrl ? (
                    <img src={item.imageUrl} width="80" height="80" />
                  ) : (
                    <img
                      src={require("./../../images/earrings/pinky-pearl.jpg")}
                      width="80"
                      height="80"
                      alt="Candy Pop"
                    />
                  )}
                </div>

                <div className="d-flex align-items-center p-3">
                  {item.quantity} x {item.name}{" "}
                </div>
                <div className="d-flex align-items-center justify-content-end flex-grow-1 p-3">
                  <Link
                    className="btn btn-md main-color text-white"
                    to={`/product/${item.productId}`}
                  >
                    View product
                  </Link>
                </div>
              </div>

              {props.order.orderItems.indexOf(item) !==
                props.order.orderItems.length - 1 && <hr />}
            </>
          ))}
        </div>

        <div className="d-md-none">
          <div className="py-2 custom-text">
            Total amount CHF {props.order.totalPrice}
            <br />
            Status: Submitted
          </div>
          {props.order.orderItems.map((item) => (
            <>
              <div className="d-flex py-2">
                <div>
                  {item.imageUrl ? (
                    <img src={item.imageUrl} width="100" height="100" />
                  ) : (
                    <img
                      src={require("./../../images/earrings/pinky-pearl.jpg")}
                      width="100"
                      height="100"
                      alt="Candy Pop"
                    />
                  )}
                </div>

                <div className="d-flex align-items-center p-3">
                  <h5>
                    {item.quantity} x {item.name}
                  </h5>
                </div>
              </div>

              {props.order.orderItems.indexOf(item) !==
                props.order.orderItems.length - 1 && <hr />}
            </>
          ))}
        </div>
      </div>
    </>
  );
};
