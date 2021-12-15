import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Box, Button, Text } from "../../components";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/core";
interface CheckoutProps {
  minHeight: number;
}

interface LineItemProps {
  label: string;
  value: number;
}

const LineItem = ({ label, value }: LineItemProps) => {
  return (
    <Box flexDirection="row" paddingVertical="s">
      <Box flex={1}>
        <Text color="background" variant="title3">
          {label}
        </Text>
      </Box>
      <Box>
        <Text color="primary" variant="title3">
          ${value}
        </Text>
      </Box>
    </Box>
  );
};

const Checkout = ({ minHeight }: CheckoutProps) => {
  let navigation = useNavigation();
  const [showStripe, setShowStripe] = useState(false);
  const [selectedCard, setSelectedCard] = useState(0);
  const [itmes, setItmes] = useState([]);
  const cartItems = useSelector((state) => state.productReducer.cartItems);
  const isLoading = useSelector((state) => state.commonReducer.isLoading);
  const { deliveryAddress } = useSelector(
    (state) => state.userReducer
  );

  useEffect(() => {
    setItmes(cartItems);
  }, [cartItems, isLoading]);

  const getPrices = () => {
    let subTotal = 0;
    let delivery = 12;
    let total = 0;

    itmes?.forEach((item) => {
      subTotal += item.quantity * item?.price;
    });

    total = subTotal + delivery;

    return {
      subTotal: subTotal.toFixed(2),
      delivery,
      total: total.toFixed(2),
    };
  };

  let prices = getPrices();

  const handleOnChangeAddress = () => {
    navigation.navigate("ChangeAddress");
  };

  const handleOnCheckout = () => {
     navigation.navigate("StripePayment");
  };

  return (
    <Box flex={1} backgroundColor="secondary" style={{ paddingTop: minHeight }}>
      <Box flex={1} padding="m">
          <ScrollView horizontal>
          </ScrollView>
        <Box marginTop="xl">
          <Text color="background" variant="title3">
            Delivery address
          </Text>
          <Box flexDirection="row" opacity={0.5} paddingVertical="m">
            <Box flex={1}>
              <Text color="background">{deliveryAddress}</Text>
            </Box>
            <TouchableOpacity onPress={handleOnChangeAddress}>
              <Box justifyContent="center" alignItems="center">
                <Text color="background">Change</Text>
              </Box>
            </TouchableOpacity>
          </Box>
          <LineItem
            label={`Total Items (${itmes?.length})`}
            value={prices.subTotal}
          />
          <LineItem label="Standard Delivery" value={prices.delivery} />
          <LineItem label="Total Payment" value={prices.total} />
        </Box>
        <Box
          paddingVertical="l"
          alignItems="center"
          flex={1}
          justifyContent="flex-end"
          // marginTop="l"
          marginBottom="l"
        >
          <Button
            label={`Click to Pay ${prices.total}`}
            variant="primary"
            onPress={handleOnCheckout}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Checkout;
