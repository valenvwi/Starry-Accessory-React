import { OrderHistory } from "../../models/OrderHistory";

export const OrderHistoryTable: React.FC<{ order: OrderHistory }> = (props) => {
  return (
    <tr>
      <th scope="row">{props.order.id}</th>
      <td>{props.order.dateCreated}</td>
      <td>{props.order.totalPrice}</td>
      <td>{props.order.totalQuantity}</td>
      <td>{props.order.orderTrackingNumber}</td>
    </tr>
  );
};
