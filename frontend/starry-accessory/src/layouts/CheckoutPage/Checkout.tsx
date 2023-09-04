import { Link } from "react-router-dom";
import { useLocalShoppingCart } from "../Utils/useLocalShoppingCart";
import { ChangeEvent, useRef } from "react";
import { OrderHistory } from "../../models/OrderHistory";
import { OrderItem } from "../../models/OrderItem";
import { Order } from "../../models/Order";
import { Purchase } from "../../models/Purchase";
import { Customer } from "../../models/Customer";
import { Address } from "../../models/Address";
import { useOktaAuth } from "@okta/okta-react";


export const Checkout = () => {
const { oktaAuth, authState } = useOktaAuth();
  const shippingStreetInputRef = useRef<HTMLInputElement>(null);
  const billingStreetInputRef = useRef<HTMLInputElement>(null);
  const shippingCityInputRef = useRef<HTMLInputElement>(null);
  const billingCityInputRef = useRef<HTMLInputElement>(null);
  const shippingCountryInputRef = useRef<HTMLInputElement>(null);
  const billingCountryInputRef = useRef<HTMLInputElement>(null);
  const shippingZipCodeInputRef = useRef<HTMLInputElement>(null);
  const billingZipCodeInputRef = useRef<HTMLInputElement>(null);

  const { cartItems, totalPrice, totalQuantity } = useLocalShoppingCart();

  function submitOrder(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(e);
    const formData = new FormData(e.target as HTMLFormElement);

    const data = Object.fromEntries(formData) as { [key: string]: string };
    console.log(data.billingCity);
    console.log(data.firstName);

    let customer = new Customer();
    customer.firstName = data.firstName;
    customer.lastName = data.lastName;
    customer.email = data.email;

    let shippingAddress = new Address();
    shippingAddress.street = data.shippingStreet;
    shippingAddress.city = data.shippingCity;
    shippingAddress.country = data.shippingCountry;
    shippingAddress.zipCode = data.shippingZipCode;

    let billingAddress = new Address();
    billingAddress.street = data.billingStreet;
    billingAddress.city = data.billingCity;
    billingAddress.country = data.billingCountry;
    billingAddress.zipCode = data.billingZipCode;

    let order = new Order();
    order.totalPrice = totalPrice;
    order.totalQuantity = totalQuantity;

    let orderItems: OrderItem[] = cartItems.map(
      (cartItem) => new OrderItem(cartItem)
    );

    let purchase = new Purchase();
    purchase.customer = customer;
    purchase.shippingAddress = shippingAddress;
    purchase.billingAddress = billingAddress;
    purchase.order = order;
    purchase.orderItems = orderItems;

    console.log(purchase);

    savePurchase(purchase);
  }

  const savePurchase = async (purchase: Purchase) => {
    if (authState && authState.isAuthenticated) {
      const url = `http://localhost:8080/checkout/purchase`;
      const requestOptions = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authState.accessToken?.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(purchase),
      };

      try {
        const response = await fetch(url, requestOptions);

        if (response.ok) {
          // Handle a successful response here
        } else {
          // Handle errors here, e.g., response.status
        }
      } catch (error) {
        // Handle network or other errors
      }
    }
  };

  function setBillingAddress(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) {
      billingStreetInputRef.current!.value =
        shippingStreetInputRef.current!.value;
      billingCityInputRef.current!.value = shippingCityInputRef.current!.value;
      billingCountryInputRef.current!.value =
        shippingCountryInputRef.current!.value;
      billingZipCodeInputRef.current!.value =
        shippingZipCodeInputRef.current!.value;
      console.log("checked");
    } else {
      billingStreetInputRef.current!.value = "";
      billingCityInputRef.current!.value = "";
      billingCountryInputRef.current!.value = "";
      billingZipCodeInputRef.current!.value = "";
      console.log("not checked");
    }
  }

  return (
    <div className="container">
      <h2>Checkout </h2>
      <hr />
      <form onSubmit={submitOrder}>
        <div className="form-area">
          <h4 className="mb-4">Customer informatiom</h4>

          <div className="row my-2">
            <div className="col-3">
              <label>First Name</label>
            </div>
            <div className="col-9">
              <input type="text" name="firstName" />
            </div>
          </div>

          <div className="row my-2">
            <div className="col-3">
              <label>Last Name</label>
            </div>
            <div className="col-9">
              <input type="text" name="lastName" />
            </div>
          </div>

          <div className="row my-2">
            <div className="col-3">
              <label>Email</label>
            </div>
            <div className="col-9">
              <div className="input-space">
                <input type="text" name="email" />
              </div>
            </div>
          </div>
        </div>

        <br />
        <br />

        <div className="form-area">
          <h4 className="mb-4">Shipping Address</h4>

          <div className="row my-2">
            <div className="col-3">
              <label>Street</label>
            </div>
            <div className="col-9">
              <input
                type="text"
                name="shippingStreet"
                ref={shippingStreetInputRef}
              />
            </div>
          </div>

          <div className="row my-2">
            <div className="col-3">
              <label>City</label>
            </div>
            <div className="col-9">
              <input
                type="text"
                name="shippingCity"
                ref={shippingCityInputRef}
              />
            </div>
          </div>

          <div className="row my-2">
            <div className="col-3">
              <label>Country</label>
            </div>
            <div className="col-9">
              <div className="input-space">
                <input
                  type="text"
                  name="shippingCountry"
                  ref={shippingCountryInputRef}
                />
              </div>
            </div>
          </div>

          <div className="row my-2">
            <div className="col-3">
              <label>Zip code</label>
            </div>
            <div className="col-9">
              <div className="input-space">
                <input
                  type="text"
                  name="shippingZipCode"
                  ref={shippingZipCodeInputRef}
                />
              </div>
            </div>
          </div>
        </div>

        <br />

        <div className="input-space">
          <label className="au-checkbox">
            <input
              type="checkbox"
              onChange={(e) => {
                setBillingAddress(e);
              }}
            />
            <span className="au-checkmark"></span>Billing Address same as
            Shipping Address
          </label>
        </div>

        <br />
        <br />

        <div className="form-area">
          <h4 className="mb-4">Billing Address</h4>

          <div className="row my-2">
            <div className="col-3">
              <label>Street</label>
            </div>
            <div className="col-9">
              <input
                type="text"
                name="billingStreet"
                ref={billingStreetInputRef}
              />
            </div>
          </div>

          <div className="row my-2">
            <div className="col-3">
              <label>City</label>
            </div>
            <div className="col-9">
              <input type="text" name="billingCity" ref={billingCityInputRef} />
            </div>
          </div>

          <div className="row my-2">
            <div className="col-3">
              <label>Country</label>
            </div>
            <div className="col-9">
              <div className="input-space">
                <input
                  type="text"
                  name="billingCountry"
                  ref={billingCountryInputRef}
                />
              </div>
            </div>
          </div>

          <div className="row my-2">
            <div className="col-3">
              <label>Zip Code</label>
            </div>
            <div className="col-9">
              <div className="input-space">
                <input
                  type="text"
                  name="billingZipCode"
                  ref={billingZipCodeInputRef}
                />
              </div>
            </div>
          </div>
        </div>

        <br />
        <br />

        <div className="form-area">
          <h4 className="mb-4">Payment Informatiom</h4>

          <div className="row my-2">
            <div className="col-3">
              <label>Card Type</label>
            </div>
            <div className="col-9">
              <select name="cardType">
                <option value="Visa">Visa</option>
                <option value="Mastercard">Mastercard</option>
              </select>
            </div>
          </div>

          <div className="row my-2">
            <div className="col-3">
              <label>Name on Card</label>
            </div>
            <div className="col-9">
              <input type="text" name="nameOnCard" />
            </div>
          </div>

          <div className="row my-2">
            <div className="col-3">
              <label>Card Number</label>
            </div>
            <div className="col-9">
              <div className="input-space">
                <input type="text" name="cardNumber" />
              </div>
            </div>
          </div>

          <div className="row my-2">
            <div className="col-3">
              <label>Security Code</label>
            </div>
            <div className="col-9">
              <div className="input-space">
                <input type="text" name="securityCode" />
              </div>
            </div>
          </div>

          <div className="row my-2">
            <div className="col-3">
              <label>Expiration Month</label>
            </div>
            <div className="col-9">
              <div className="input-space">
                <input type="text" name="expirationMonth" />
              </div>
            </div>
          </div>

          <div className="row my-2">
            <div className="col-3">
              <label>Expiration Year</label>
            </div>
            <div className="col-9">
              <div className="input-space">
                <input type="text" name="expirationYear" />
              </div>
            </div>
          </div>

          <br />
          <br />
        </div>

        <div className="form-area">
          <h4 className="mb-4">Review Your Order</h4>

          <p>Total Quantity: {totalQuantity}</p>
          <p>Shipping: free</p>
          <p>Total Price: CHF {totalPrice}</p>
        </div>

        <div className="text-center m-5">
          <button type="submit" className="btn btn-success">
            Purchase
          </button>
        </div>
      </form>
    </div>
  );
};
