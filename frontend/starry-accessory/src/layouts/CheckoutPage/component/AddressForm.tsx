import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Formik, Form, useFormik } from "formik";
import { Customer } from "../../../models/Customer";
import { useOktaAuth } from "@okta/okta-react";
import { useLocalShoppingCart } from "../../Utils/useLocalShoppingCart";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Address } from "../../../models/Address";
import { ChangeEvent, useRef, useState } from "react";
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
  shippingStreet: Yup.string()
    .min(2, "Street is too short!")
    .max(20, "Street is too long!")
    .required("Street is required"),
  shippingCity: Yup.string()
    .min(2, "City is too short!")
    .max(15, "City is too long!")
    .required("City is required"),
  shippingCountry: Yup.string()
    .min(2, "Country is too short!")
    .max(20, "Country is too long!")
    .required("Country is required"),
  shippingZipCode: Yup.string()
    .min(2, "Zip Code is too short!")
    .max(16, "Zip Code is too long!")
    .required("Zip Code is required"),
  billingStreet: Yup.string()
    .min(2, "Street is too short!")
    .max(20, "Street is too long!")
    .required("Street is required"),
  billingCity: Yup.string()
    .min(2, "City is too short!")
    .max(15, "City is too long!")
    .required("City is required"),
  billingCountry: Yup.string()
    .min(2, "Country is too short!")
    .max(20, "Country is too long!")
    .required("Country is required"),
  billingZipCode: Yup.string()
    .min(2, "Zip Code is too short!")
    .max(16, "Zip Code is too long!")
    .required("Zip Code is required"),
});

type Props = {
  customer?: Customer;
  shippingAddress?: Address;
  billingAddress?: Address;
  userEmail: string;
  onsubmit: (
    customer: Customer,
    shippAddress: Address,
    billingAddress: Address
  ) => void;
};

export const AddressForm = (props: Props) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const { oktaAuth, authState } = useOktaAuth();
  const { cartItems, totalPrice, totalQuantity, resetCart } =
    useLocalShoppingCart();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<Customer>();
  const [shippingAddress, setShippingAddress] = useState<Address>();
  const [billingAddress, setbillingAddress] = useState<Address>();

  const formik = useFormik({
    initialValues: {
      firstName: props.customer?.firstName || "",
      lastName: props.customer?.lastName || "",
      shippingStreet: props.shippingAddress?.street || "",
      shippingCity: props.shippingAddress?.city || "",
      shippingCountry: props.shippingAddress?.country || "",
      shippingZipCode: props.shippingAddress?.zipCode || "",
      billingStreet: props.billingAddress?.street || "",
      billingCity: props.billingAddress?.city || "",
      billingCountry: props.billingAddress?.country || "",
      billingZipCode: props.billingAddress?.zipCode || "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      let customer = new Customer();
      customer.firstName = values.firstName;
      customer.lastName = values.lastName;
      customer.email = props.userEmail;

      let shippingAddress = new Address();
      shippingAddress.street = values.shippingStreet;
      shippingAddress.city = values.shippingCity;
      shippingAddress.country = values.shippingCountry;
      shippingAddress.zipCode = values.shippingZipCode;

      let billingAddress = new Address();
      billingAddress.street = values.billingStreet;
      billingAddress.city = values.billingCity;
      billingAddress.country = values.billingCountry;
      billingAddress.zipCode = values.billingZipCode;
      console.log("Address form on submit");
      props.onsubmit(customer, shippingAddress, billingAddress);
    },
  });

  function setBillingAsShipping(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) {
      formik.setFieldValue("billingStreet", formik.values.shippingStreet);
      formik.setFieldValue("billingCity", formik.values.shippingCity);
      formik.setFieldValue("billingCountry", formik.values.shippingCountry);
      formik.setFieldValue("billingZipCode", formik.values.shippingZipCode);
      console.log("checked");
    } else {
      formik.setFieldValue("billingStreet", "");
      formik.setFieldValue("billingCity", "");
      formik.setFieldValue("billingCountry", "");
      formik.setFieldValue("billingZipCode", "");
      console.log("not checked");
    }
  }

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Personal Information
      </Typography>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          shippingStreet: "",
          shippingCity: "",
          shippingCountry: "",
          shippingZipCode: "",
          billingStreet: "",
          billingCity: "",
          billingCountry: "",
          billingZipCode: "",
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

              <h5 className="mx-4 pt-5">Shipping Address</h5>

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
                      onChange={(e) => {
                        setBillingAsShipping(e);
                      }}
                    />
                  }
                  label="Use this address for payment details"
                />
              </Grid>

              <h5 className="mx-4 pt-5">Billing Address</h5>

              <Grid item xs={12}>
                <TextField
                  required
                  id="billingStreet"
                  name="billingStreet"
                  label="Street"
                  fullWidth
                  autoComplete="billing address-line1"
                  variant="standard"
                  value={formik.values.billingStreet}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.billingStreet &&
                    Boolean(formik.errors.billingStreet)
                  }
                  helperText={
                    formik.touched.billingStreet && formik.errors.billingStreet
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  id="billingCity"
                  name="billingCity"
                  label="City"
                  fullWidth
                  autoComplete="billing address-line1"
                  variant="standard"
                  value={formik.values.billingCity}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.billingCity &&
                    Boolean(formik.errors.billingCity)
                  }
                  helperText={
                    formik.touched.billingCity && formik.errors.billingCity
                  }
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="billingCountry"
                  name="billingCountry"
                  label="Country"
                  fullWidth
                  autoComplete="billing address-line1"
                  variant="standard"
                  value={formik.values.billingCountry}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.billingCountry &&
                    Boolean(formik.errors.billingCountry)
                  }
                  helperText={
                    formik.touched.billingCountry &&
                    formik.errors.billingCountry
                  }
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="billingZipCode"
                  name="billingZipCode"
                  label="Zip Code"
                  fullWidth
                  autoComplete="billing address-line1"
                  variant="standard"
                  value={formik.values.billingZipCode}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.billingZipCode &&
                    Boolean(formik.errors.billingZipCode)
                  }
                  helperText={
                    formik.touched.billingZipCode &&
                    formik.errors.billingZipCode
                  }
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
