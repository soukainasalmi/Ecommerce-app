import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";
import { Box, Header, Text } from "../../components";
import { ScrollView } from "react-native-gesture-handler";
import { HomeNavigationProps } from "../../components/Navigation";
import { aspectRatio, useTheme } from "../../components/Theme";
import CartContainer from "./CartContainer";
import { useDispatch, useSelector } from "react-redux";
import Checkout from "./Checkout";
import Item from "./Item";
import {
  productRemoveFromCart,
  updateProductCart,
} from "../../redux/actions/productActions";

const height = 100 * aspectRatio;
const d = "M 0 0 A 50 50 0 0 0 50 50 H 325 A 50 50 0 0 1 375 100 V 0 Z";

const Cart = ({ navigation }: HomeNavigationProps<"Cart">) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.productReducer.cartItems);
  const isLoading = useSelector((state) => state.commonReducer.isLoading);
  const [itmes, setItmes] = useState([]);
  const theme = useTheme();

  // console.log(cartItems);
  

  useEffect(() => {
    setItmes(cartItems);
  }, [cartItems, isLoading]);

  const handleOnRemoveItem = (productId) => {
    dispatch(productRemoveFromCart(productId));
  };

  const handleOnUpdateCart = (index, quantity) => {
    dispatch(updateProductCart(index, quantity));
  };

  return (
    <CartContainer CheckoutComponent={Checkout}>
      <Box>
        <Box backgroundColor="primary">
          <Header
            dark
            left={{ icon: "arrow-left", onPress: () => navigation.goBack() }}
            title="Shopping Cart"
          />
        </Box>
      </Box>
      <Box flex={1}>
        <ScrollView
          style={{
            borderBottomLeftRadius: theme.borderRadii.xl,
            borderBottomRightRadius: theme.borderRadii.xl,
          }}
          contentContainerStyle={{ paddingVertical: 50 * aspectRatio }}
          showsVerticalScrollIndicator={false}
        >
          {itmes?.map((item, index) => (
            <Item
              key={item?.product_id}
              item={item}
              onDelete={() => handleOnRemoveItem(item?.product_id)}
              onUpate={(quantity) => handleOnUpdateCart(index, quantity)}
            />
          ))}
        </ScrollView>
        <Box
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height,
          }}
        >
          <Svg style={StyleSheet.absoluteFill} viewBox="0 0 375 100">
            <Path d={d} fill={theme.colors.primary} />
          </Svg>
          <Text variant="title2" textAlign="center" color="background">
            {cartItems?.length
              ? `${cartItems?.length} Item${
                  cartItems?.length > 1 ? "s" : ""
                } Added`
              : ""}
          </Text>
        </Box>
      </Box>
    </CartContainer>
  );
};

export default Cart;
