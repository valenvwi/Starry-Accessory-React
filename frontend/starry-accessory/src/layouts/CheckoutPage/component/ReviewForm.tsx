import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useOktaAuth } from "@okta/okta-react";
import { useLocalShoppingCart } from "../../Utils/useLocalShoppingCart";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import { Address } from "../../../models/Address";
import { Customer } from "../../../models/Customer";
import { PaymentDetail } from "../../../models/PaymentDetail";

type Props = {
  handleBack: () => void;
  customer: Customer;
  shippingAddress: Address;
  payment: PaymentDetail;
};

export const ReviewForm: any = (props: Props) => {
  const { oktaAuth, authState } = useOktaAuth();
  const { cartItems, totalPrice, totalQuantity, resetCart } =
    useLocalShoppingCart();
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {cartItems.map((item) => (
          <ListItem key={item.name} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={item.name} secondary={item.quantity} />
            <Typography variant="body2">{item.unitPrice}</Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {totalPrice}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>
            {props.customer?.firstName} {props.customer?.lastName}
          </Typography>
          <Typography gutterBottom>
            {props.shippingAddress.street}, {props.shippingAddress.city} ,
            {props.shippingAddress.zipCode}, {props.shippingAddress.country}
          </Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            <React.Fragment key={props.payment.nameOnCard}>
              <Grid item xs={12}>
                <Typography gutterBottom>
                  Card type: {props.payment.cardType}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography gutterBottom>
                  Cardholder: {props.payment.nameOnCard}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography gutterBottom>
                  {/* Card Number: {props.payment.cardNumber} need to change later */}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography gutterBottom>
                  Expiry date: {props.payment.expirationMonth} /{" "}
                  {props.payment.expirationYear}
                </Typography>
              </Grid>
            </React.Fragment>
          </Grid>
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
          // onClick={submitForm}
          sx={{ mt: 3, ml: 1 }}
        >
          Submit
        </Button>
      </Box>
    </React.Fragment>
  );
};
