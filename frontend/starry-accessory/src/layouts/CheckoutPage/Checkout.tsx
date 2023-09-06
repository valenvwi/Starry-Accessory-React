import { Link } from "react-router-dom";
import { useLocalShoppingCart } from "../Utils/useLocalShoppingCart";
import { Customer } from "../../models/Customer";
import { useOktaAuth } from "@okta/okta-react";
import { AddressForm } from "./component/AddressForm";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { ReviewForm } from "./component/ReviewForm";
import { PaymentForm } from "./component/PaymentForm";
import { Address } from "../../models/Address";
import { PaymentDetail } from "../../models/PaymentDetail";
import { Order } from "../../models/Order";
import { OrderItem } from "../../models/OrderItem";
import { Purchase } from "../../models/Purchase";
import { Container } from "@mui/material";
import { useFetchUserEmail } from "../Utils/useFetchUserEmail";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" to="https://www.google.com">
        Starry Accessory
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const steps = ["Info & Address", "Payment details", "Review your order"];

export const Checkout: React.FC = () => {
  const [customer, setCustomer] = useState<Customer>();
  const [shippingAddress, setShippingAddress] = useState<Address>();
  const [billingAddress, setbillingAddress] = useState<Address>();
  const [payment, setPayment] = useState<PaymentDetail>();
  const [trackingNumber, setTrackingNumber] = useState(String);
  const userEmail = useFetchUserEmail();

  const handleSubmitFromAddressForm = (
    customer: Customer,
    shippingAddress: Address,
    billingAddress: Address
  ) => {
    console.log(customer);
    setCustomer(customer);
    console.log(shippingAddress);
    setShippingAddress(shippingAddress);
    setbillingAddress(billingAddress);
    console.log(billingAddress);
    handleNext();
  };

  const handleSubmitFromPaymentForm = (payment: PaymentDetail) => {
    console.log(payment);
    setPayment(payment);
    handleNext();
  };

  function submitOrder() {
    let order = new Order();
    order.totalPrice = totalPrice;
    order.totalQuantity = totalQuantity;

    let orderItems: OrderItem[] = cartItems.map(
      (cartItem) => new OrderItem(cartItem)
    );

    let purchase = new Purchase();
    purchase.customer = customer!;
    purchase.shippingAddress = shippingAddress!;
    purchase.billingAddress = billingAddress!;
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
          resetCartAndGoHome();
        } else {
          // Handle errors here, e.g., response.status
        }
      } catch (error) {
        // Handle network or other errors
      }
    }
  };

  const resetCartAndGoHome = () => {
    resetCart();
    handleNext();
    fetchTrackingNumnber();
  };

  function getStepContent(step: number) {
    switch (step) {
      case 0:
        if (userEmail) {
          return (
            <AddressForm
              customer={customer}
              shippingAddress={shippingAddress}
              billingAddress={billingAddress}
              userEmail={userEmail}
              onsubmit={(customer, shippingAddress, billingAddress) =>
                handleSubmitFromAddressForm(
                  customer,
                  shippingAddress,
                  billingAddress
                )
              }
            />
          );
        } else {
          return null;
        }
      case 1:
        return (
          <PaymentForm
            handleBack={handleBack}
            payment={payment}
            onsubmit={(payment) => handleSubmitFromPaymentForm(payment)}
          />
        );
      case 2:
        return (
          <ReviewForm
            customer={customer}
            shippingAddress={shippingAddress}
            billingAddress={billingAddress}
            payment={payment}
            handleBack={handleBack}
            onsubmit={submitOrder}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  }

  const { oktaAuth, authState } = useOktaAuth();
  const { cartItems, totalPrice, totalQuantity, resetCart } =
    useLocalShoppingCart();
  console.log(cartItems);

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const fetchTrackingNumnber = async () => {
    console.log("fetchUserEmail", authState);
    if (authState && authState.isAuthenticated) {
      const url = `http://localhost:8080/orderHistory/getTrackingNumber`;
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
      setTrackingNumber(responseText);
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: "relative",
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap></Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #{trackingNumber}. We have emailed your
                order confirmation, and will send you an update when your order
                has shipped.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>{getStepContent(activeStep)}</React.Fragment>
          )}
        </Paper>
        <Copyright />
      </Container>
    </React.Fragment>
  );
};
