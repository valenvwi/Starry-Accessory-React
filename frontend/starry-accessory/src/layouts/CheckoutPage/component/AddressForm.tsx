import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Formik, Field, Form, FormikHelpers, useFormik } from "formik";
import { Customer } from "../../../models/Customer";
import { useOktaAuth } from "@okta/okta-react";
import { useLocalShoppingCart } from "../../Utils/useLocalShoppingCart";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Address } from "../../../models/Address";
import { useState } from "react";
import { Box, Button } from "@mui/material";

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "First name is too short!")
    .max(20, "First name is too long!")
    .required("First name is required"),
  lastName: Yup.string()
    .min(2, "Last name is too short!")
    .max(20, "Last name is too long!")
    .required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  shippingStreet: Yup.string()
    .min(2, "Street is too short!")
    .max(20, "Street is too long!")
    .required("Street is required"),
  shippingCity: Yup.string()
    .min(2, "City is too short!")
    .max(20, "City is too long!")
    .required("City is required"),
  shippingCountry: Yup.string()
    .min(2, "Country is too short!")
    .max(20, "Country is too long!")
    .required("Country is required"),
  shippingZipCode: Yup.string()
    .min(2, "Zip Code is too short!")
    .max(20, "Zip Code is too long!")
    .required("Zip Code is required"),
});

type Props = {
  customer?: Customer;
  shippingAddress?: Address;
  onsubmit: (customer: Customer, shippAddress: Address) => void;
};

export const AddressForm = (props: Props) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const { oktaAuth, authState } = useOktaAuth();
  const { cartItems, totalPrice, totalQuantity, resetCart } =
    useLocalShoppingCart();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<Customer>();
  const [shippingAddress, setShippingAddress] = useState<Address>();

  const formik = useFormik({
    initialValues: {
      firstName: props.customer?.firstName || "",
      lastName: props.customer?.lastName || "",
      email: props.customer?.email || "",
      shippingStreet: props.shippingAddress?.street || "",
      shippingCity: props.shippingAddress?.city || "",
      shippingCountry: props.shippingAddress?.country || "",
      shippingZipCode: props.shippingAddress?.zipCode || "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      let customer = new Customer();
      customer.firstName = values.firstName;
      customer.lastName = values.lastName;
      customer.email = values.email;

      let shippingAddress = new Address();
      shippingAddress.street = values.shippingStreet;
      shippingAddress.city = values.shippingCity;
      shippingAddress.country = values.shippingCountry;
      shippingAddress.zipCode = values.shippingZipCode;
      props.onsubmit(customer, shippingAddress);
    },
  });

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          shippingStreet: "",
          shippingCity: "",
          shippingCountry: "",
          shippingZipCode: "",
        }}
        validationSchema={validationSchema}
        onSubmit={formik.submitForm}
      >
        {({ errors, touched }) => (
          <Form>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="firstName"
                  name="firstName"
                  label="First name"
                  fullWidth
                  autoComplete="given-name"
                  variant="standard"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.firstName && Boolean(formik.errors.firstName)
                  }
                  helperText={
                    formik.touched.firstName && formik.errors.firstName
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="lastName"
                  name="lastName"
                  label="Last name"
                  fullWidth
                  autoComplete="family-name"
                  variant="standard"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.lastName && Boolean(formik.errors.lastName)
                  }
                  helperText={formik.touched.lastName && formik.errors.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="email"
                  name="email"
                  label="Email"
                  fullWidth
                  autoComplete="shipping address-line1"
                  variant="standard"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  id="shippingStreet"
                  name="shippingStreet"
                  label="Street"
                  fullWidth
                  autoComplete="shipping address-line1"
                  variant="standard"
                  value={formik.values.shippingStreet}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.shippingStreet &&
                    Boolean(formik.errors.shippingStreet)
                  }
                  helperText={
                    formik.touched.shippingStreet &&
                    formik.errors.shippingStreet
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  id="shippingCity"
                  name="shippingCity"
                  label="City"
                  fullWidth
                  autoComplete="shipping address-line1"
                  variant="standard"
                  value={formik.values.shippingCity}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.shippingCity &&
                    Boolean(formik.errors.shippingCity)
                  }
                  helperText={
                    formik.touched.shippingCity && formik.errors.shippingCity
                  }
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="shippingCountry"
                  name="shippingCountry"
                  label="Country"
                  fullWidth
                  autoComplete="shipping address-line1"
                  variant="standard"
                  value={formik.values.shippingCountry}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.shippingCountry &&
                    Boolean(formik.errors.shippingCountry)
                  }
                  helperText={
                    formik.touched.shippingCountry &&
                    formik.errors.shippingCountry
                  }
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="shippingZipCode"
                  name="shippingZipCode"
                  label="Zip Code"
                  fullWidth
                  autoComplete="shipping address-line1"
                  variant="standard"
                  value={formik.values.shippingZipCode}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.shippingZipCode &&
                    Boolean(formik.errors.shippingZipCode)
                  }
                  helperText={
                    formik.touched.shippingZipCode &&
                    formik.errors.shippingZipCode
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="secondary"
                      name="saveAddress"
                      value="yes"
                    />
                  }
                  label="Use this address for payment details"
                />
              </Grid>
            </Grid>

            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                type="button"
                onClick={formik.submitForm}
                sx={{ mt: 3, ml: 1 }}
              >
                Next
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
};