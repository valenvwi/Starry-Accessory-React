import { useNavigate } from "react-router-dom";
import { useLocalShoppingCart } from "../Utils/useLocalShoppingCart";
import { Customer } from "../../models/Customer";
import { useOktaAuth } from "@okta/okta-react";
import { Formik, Field, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { AddressForm } from "./component/AddressForm";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { ReviewForm } from "./component/ReviewForm";
import { PaymentForm } from "./component/PaymentForm";
import { Address } from "../../models/Address";
import { PaymentDetail } from "../../models/PaymentDetail";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Starry Accessory
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const steps = ["Shipping address", "Payment details", "Review your order"];

export const Checkout2: React.FC = () => {
  const [customer, setCustomer] = useState<Customer>();
  const [shippingAddress, setShippingAddress] = useState<Address>();
  const [payment, setPayment] = useState<PaymentDetail>();

  const handleSubmitFromAddressForm = (
    customer: Customer,
    shippingAddress: Address
  ) => {
    console.log(customer);
    setCustomer(customer);
    console.log(shippingAddress);
    setShippingAddress(shippingAddress);
    handleNext();
  };

  const handleSubmitFromPaymentForm = (payment: PaymentDetail) => {
    console.log(payment);
    setPayment(payment);
    handleNext();
  };

  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return (
          <AddressForm
            customer={customer}
            shippingAddress={shippingAddress}
            onsubmit={(customer, shippingAddress) =>
              handleSubmitFromAddressForm(customer, shippingAddress)
            }
          />
        );
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
            payment={payment}
            handleBack={handleBack}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  }

  const { oktaAuth, authState } = useOktaAuth();
  const { cartItems, totalPrice, totalQuantity, resetCart } =
    useLocalShoppingCart();
  const navigate = useNavigate();

  function submitOrder(data: {
    firstName: string;
    lastName: string;
    email: string;
  }) {
    let customer = new Customer();
    customer.firstName = data.firstName;
    customer.lastName = data.lastName;
    customer.email = data.email;

    console.log(customer);
  }

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
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
                Your order number is #2001539. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
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
