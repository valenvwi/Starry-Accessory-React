import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Formik, Form, useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { PaymentDetail } from "../../../models/PaymentDetail";

const validationSchema = Yup.object().shape({
  nameOnCard: Yup.string()
    .min(2, "Name on card is too short!")
    .max(20, "Name on card is too long!")
    .required("Name on card is required"),
  cardType: Yup.string().required("Card type is required"),
  cardNumber: Yup.string()
    .min(16, "Card number is too short!")
    .max(20, "Card number is too long!")
    .required("Card number is required"),
  expirationMonth: Yup.number()
    .min(1, "Expiration month is not valid!")
    .max(12, "Expiration month is not valid!")
    .required("Expiration month is required"),
  expirationYear: Yup.number()
    .min(2023, "Expiration year is not valid")
    .required("Year is required"),
  securityCode: Yup.number().required("Code is required"),
});

type Props = {
  handleBack: () => void;
  payment?: PaymentDetail;
  onsubmit: (payment: PaymentDetail) => void;
};

export const PaymentForm = (props: Props) => {

  let payment = new PaymentDetail();

  const formik = useFormik({
    initialValues: {
      nameOnCard: props.payment?.nameOnCard || "",
      cardType: props.payment?.cardType || "",
      cardNumber: props.payment?.cardNumber || "",
      expirationMonth: props.payment?.expirationMonth || "",
      expirationYear: props.payment?.expirationYear || "",
      securityCode: props.payment?.securityCode || "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      payment.nameOnCard = values.nameOnCard;
      payment.cardType = values.cardType;
      payment.cardNumber = values.cardNumber;
      payment.expirationMonth = values.expirationMonth;
      payment.expirationYear = values.expirationYear;
      payment.securityCode = values.securityCode;
      props.onsubmit(payment);
    },
  });

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Formik
        initialValues={{
          nameOnCard: "",
          cardType: "",
          cardNumber: "",
          expirationMonth: "",
          expirationYear: "",
          securityCode: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  id="nameOnCard"
                  name="nameOnCard"
                  label="Cardholder"
                  fullWidth
                  autoComplete="given-name"
                  variant="standard"
                  value={formik.values.nameOnCard}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.nameOnCard &&
                    Boolean(formik.errors.nameOnCard)
                  }
                  helperText={
                    formik.touched.nameOnCard && formik.errors.nameOnCard
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  error={
                    formik.touched.cardType && Boolean(formik.errors.cardType)
                  }
                >
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Card Type
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="cardType"
                    value={formik.values.cardType}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <FormControlLabel
                      value="Visa"
                      control={<Radio />}
                      label="Visa"
                    />
                    <FormControlLabel
                      value="Mastercard"
                      control={<Radio />}
                      label="Mastercard"
                    />
                    <FormControlLabel
                      value="American Express"
                      control={<Radio />}
                      label="American Express"
                    />
                  </RadioGroup>
                  <FormHelperText>
                    {formik.touched.cardType && formik.errors.cardType}
                  </FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  id="cardNumber"
                  name="cardNumber"
                  label="Card Number"
                  fullWidth
                  autoComplete="family-name"
                  variant="standard"
                  value={formik.values.cardNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.cardNumber &&
                    Boolean(formik.errors.cardNumber)
                  }
                  helperText={
                    formik.touched.cardNumber && formik.errors.cardNumber
                  }
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  required
                  id="expirationMonth"
                  name="expirationMonth"
                  label="Month"
                  fullWidth
                  autoComplete="shipping address-line1"
                  variant="standard"
                  value={formik.values.expirationMonth}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.expirationMonth &&
                    Boolean(formik.errors.expirationMonth)
                  }
                  helperText={
                    formik.touched.expirationMonth &&
                    formik.errors.expirationMonth
                  }
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  required
                  id="expirationYear"
                  name="expirationYear"
                  label="Year"
                  fullWidth
                  autoComplete="shipping address-line1"
                  variant="standard"
                  value={formik.values.expirationYear}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.expirationYear &&
                    Boolean(formik.errors.expirationYear)
                  }
                  helperText={
                    formik.touched.expirationYear &&
                    formik.errors.expirationYear
                  }
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  required
                  id="securityCode"
                  name="securityCode"
                  label="Security Code"
                  fullWidth
                  autoComplete="shipping address-line1"
                  variant="standard"
                  value={formik.values.securityCode}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.securityCode &&
                    Boolean(formik.errors.securityCode)
                  }
                  helperText={
                    formik.touched.securityCode && formik.errors.securityCode
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox color="secondary" name="saveCard" value="yes" />
                  }
                  label="Remember credit card details for next time"
                />
              </Grid>
            </Grid>

            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                type="button"
                onClick={props.handleBack}
                sx={{ mt: 3, ml: 1 }}
              >
                Back
              </Button>
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
    </React.Fragment>
  );
};
