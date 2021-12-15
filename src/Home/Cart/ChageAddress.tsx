import React, { useReducer } from "react";
import { Box, Button, Text } from "../../components";
import TextInput from "../../components/Form/TextInput";
import { changeDeliveryAddress } from "../../redux/actions/userActions";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Background from "./Background";
import { NavigationContainer } from "@react-navigation/native";

const ChangeAddress = (props) => {
  const dispatch = useDispatch();
  const deliveryAddress = useSelector(
    (state) => state.userReducer.deliveryAddress
  );
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      deliveryAddress: "",
    }
  );

  const handleOnUpdateAddress = () => {
    const { deliveryAddress } = state;

    dispatch(
      changeDeliveryAddress(deliveryAddress, () => {
        props.navigation.navigate("Cart");
      })
    );
  };

  return (
    <Background navigation={props.navigation}>
      <View style={styles.contentContainer}>
        <Box width="100%" justifyContent="center" alignItems="center">
          <Box width="80%">
            <Text variant="title3" marginBottom="l">
              Enter your Address below :
            </Text>
          </Box>
          <Box marginBottom="m" width="80%">
            <TextInput
              icon="map-pin"
              defaultValue={deliveryAddress ? deliveryAddress : ""}
              placeholder="Address"
              onChangeText={(text) =>
                setState({
                  deliveryAddress: text,
                })
              }
              autoCapitalize="none"
              returnKeyType="next"
              returnKeyLabel="next"
            />
          </Box>

          <Box alignItems="center" marginTop="l">
            <Button
              variant="primary"
              label="Update Address"
              onPress={handleOnUpdateAddress}
            />
          </Box>
        </Box>
      </View>
    </Background>
  );
};

export default ChangeAddress;

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
