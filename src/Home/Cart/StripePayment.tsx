import React, { useState} from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert, Dimensions } from "react-native";
import { CardField, PaymentIntents, useConfirmPayment } from "@stripe/stripe-react-native";
import { StripeProvider } from "@stripe/stripe-react-native";
import { AddPayment } from "../../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import { Box, Header, makeStyles } from "../../components";
import Footer from "../ProductDetails/Footer";


const footerHeight = Dimensions.get("window").width / 3;

const useStyles = makeStyles((theme: Theme) => ({
  footer: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
    borderTopLeftRadius: theme.borderRadii.xl,
  },
  scrollView: {
    paddingBottom: footerHeight,
  },
}));

//ADD localhost address of your server
const API_URL = "http://92.168.0.105:3000";

const StripeApp = props => {
  let navigation = useNavigation();

  const [email, setEmail] = useState();
  const [cardDetails, setCardDetails] = useState();
  const { confirmPayment, loading } = useConfirmPayment();
  const isLoading = useSelector((state) => state.commonReducer.isLoading);


  const fetchPaymentIntentClientSecret = async () => {
    const response = await fetch(`${API_URL}/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { clientSecret, error } = await response.json();
    return { clientSecret, error };
  };
  const dispatch = useDispatch();

  const handleOnAddPayment = (date, total) => {
      dispatch(
        AddPayment(
          {
            date,
            total,
          },
          () => {
            console.log("Payment added to Firebase");
          },
      )
      );
  };
  const handlePayPress = async () => {
    //1.Gather the customer's billing information (e.g., email)
    if (!cardDetails?.complete || !email) {
      Alert.alert("Please enter Complete card details and Email");
      return;
    }
    const billingDetails = {
      email: email,
    };
    //2.Fetch the intent client secret from the backend
    try {
      const { clientSecret, error } = await fetchPaymentIntentClientSecret();
      //2. confirm the payment
      if (error) {
        console.log("Unable to process payment");
      } else {
        const { paymentIntent, error } = await confirmPayment(clientSecret, {
          type: "Card",
          billingDetails: billingDetails,
        });
        if (error) {
          alert(`Payment Confirmation Error ${error.message}`);
        } else if (paymentIntent) {
          alert("Payment Successful");
          handleOnAddPayment(parseInt(paymentIntent.created),120);
          //navigation.navigate("SuccessfulPayment");
        }
      }
    } catch (e) {
      console.log(e);
    }
    //3.Confirm the payment with the card details
  };



  return (
    <Box flex={2} backgroundColor="background">
      <Header
        left={{ icon: "menu", onPress: () => navigation.openDrawer() }}
        title="Card Details"
      />
      {!isLoading && (
        <Box padding="m" flex={0}>
          <Box
            flexDirection="row"
            justifyContent="space-between"
            alignItems="flex-end"
          >
            <Box>
            </Box>
          </Box>
        </Box>
      )}
    <StripeProvider publishableKey="pk_test_51K3rLhHLYbxdeMU9CzRqBIRjceSvibRxBVmR4Q1A1uWZpSDJCzN8RH0zOylPKXkYO2uFUaQaowWLdj9RN4OVuOV300ahRVMIbV">
    <View style={styles.container}>
      <TextInput
        autoCapitalize="none"
        placeholder="E-mail"
        keyboardType="email-address"
        onChange={value => setEmail(value.nativeEvent.text)}
        style={styles.input}
      />
      <CardField
        postalCodeEnabled={true}
        placeholder={{
          number: "4242 4242 4242 4242",
        }}
        cardStyle={styles.card}
        style={styles.cardContainer}
        onCardChange={cardDetails => {
          setCardDetails(cardDetails);
        }}
      />
      {/* <Button onPress={handlePayPress} title="Pay" disabled={loading} /> */}
    </View>
    <Footer
            label="Pay"
            onPress={handlePayPress}
            disabled={loading}
          />
    </StripeProvider>
    </Box>
    
  );
};
export default StripeApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    margin: 20,
  },
  input: {
    backgroundColor: "#efefefef",

    borderRadius: 8,
    fontSize: 20,
    height: 50,
    padding: 10,
  },
  card: {
    backgroundColor: "#efefefef",
  },
  cardContainer: {
    height: 50,
    marginVertical: 30,
  },
});


