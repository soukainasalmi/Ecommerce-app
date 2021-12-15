import React, { useReducer } from "react";
import { Box, Button, Text } from "../../components";
import TextInput from "../../components/Form/TextInput";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Background from "./Background";
import { addPaymentCard } from "../../redux/actions/userActions";

const CardDetail = (props) => {
  const dispatch = useDispatch();
  const paymentCards = useSelector((state) => state.userReducer.paymentCards);
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      cardHolderName: "",
      expiryDate: "",
      cvv: "",
      cardNumber: "",
    }
  );

  const handleOnAddPaymentCard = () => {
    const { cardHolderName, expiryDate, cvv, cardNumber } = state;

    const isCardExist = paymentCards?.includes(
      (item) => item.cardNumber === cardNumber
    );

    if (isCardExist) {
      alert("This card is aready exist");
      return;
    }

    dispatch(
      addPaymentCard(
        {
          cardHolderName,
          expiryDate,
          cvv,
          cardNumber,
        },
        () => {
          setState({
            cardHolderName: "",
            expiryDate: "",
            cvv: "",
            cardNumber: "",
          });
          props.navigation.navigate("Cart");
        }
      )
    );
  };

  return (
    <Background navigation={props.navigation}>
      <View style={styles.contentContainer}>
        <Box width="100%" justifyContent="center" alignItems="center">
          <Box width="80%">
            <Text variant="title3" marginBottom="l">
              Please Enter your Card Details below :
            </Text>
          </Box>
          <Box marginBottom="m" width="80%">
            <TextInput
              icon="user"
              placeholder="Card Holder Name"
              onChangeText={(text) =>
                setState({
                  cardHolderName: text,
                })
              }
              autoCapitalize="none"
              returnKeyType="next"
              returnKeyLabel="next"
            />
          </Box>
          <Box marginBottom="m" width="80%">
            <TextInput
              icon="credit-card"
              mask={[
                /\d/,
                /\d/,
                /\d/,
                /\d/,
                "-",
                /\d/,
                /\d/,
                /\d/,
                /\d/,
                "-",
                /\d/,
                /\d/,
                /\d/,
                /\d/,
                "-",
                /\d/,
                /\d/,
                /\d/,
                /\d/,
              ]}
              keyboardType="number-pad"
              placeholder="Card Number"
              value={state.cardNumber}
              onChangeText={(masked) => {
                setState({
                  cardNumber: masked,
                });
              }}
              autoCapitalize="none"
              returnKeyType="next"
              returnKeyLabel="next"
            />
          </Box>

          <Box
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            marginVertical="s"
            width="80%"
          >
            <Box width="45%">
              <TextInput
                placeholder="MM/DD"
                keyboardType="number-pad"
                value={state.expiryDate}
                onChangeText={(masked) => {
                  setState({
                    expiryDate: masked,
                  });
                }}
                mask={[/\d/, /\d/, "/", /\d/, /\d/]}
                autoCapitalize="none"
                returnKeyType="go"
                returnKeyLabel="go"
                style={styles.rowInputField}
              />
            </Box>

            <Box width="45%">
              <TextInput
                placeholder="CVV"
                maxLength={16}
                keyboardType="number-pad"
                value={state.cvv}
                onChangeText={(masked) => {
                  setState({
                    cvv: masked,
                  });
                }}
                mask={[/\d/, /\d/, /\d/, /\d/]}
                autoCapitalize="none"
                returnKeyType="go"
                returnKeyLabel="go"
                style={styles.rowInputField}
              />
            </Box>
          </Box>
          <Box alignItems="center" marginTop="l">
            <Button
              variant="primary"
              label="Add Card"
              onPress={handleOnAddPaymentCard}
            />
          </Box>
        </Box>
      </View>
    </Background>
  );
};

export default CardDetail;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  rowInputField: {
    // width: "30%",
  },
});
