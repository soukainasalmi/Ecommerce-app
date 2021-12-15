import React from "react";

import { AuthNavigationProps, HomeNavigationProps } from "../../components/Navigation";
import {
  Container,
  Box,
  Text,
  Button,
  RoundedIconButton,
  RoundedIcon,
} from "../../components";

const SIZE = 80;
const SuccessfulPayment = ({
  navigation,
}: HomeNavigationProps<"SuccessfulPayment">) => {
  return (
    <Container
      pattern={0}
      footer={
        <Box flexDirection="row" justifyContent="center">
          {/* <RoundedIconButton
            backgroundColor="background"
            color="secondary"
            name="x"
            size={60}
            onPress={() => navigation.pop()}
          /> */}
        </Box>
      }
    >
      <Box alignSelf="center">
        <RoundedIcon
          name="check"
          size={SIZE}
          backgroundColor="primaryLight"
          color="primary"
        />
      </Box>
      <Text variant="title1" textAlign="center" marginVertical="l">
      Congrats! Order successfully placed
      </Text>
      <Text variant="body" textAlign="center" marginBottom="l">
      Order should arrive within 4 working days.
      </Text>
      <Box alignItems="center" marginTop="m">
        <Button
          variant="primary"
          onPress={() => navigation.navigate("TransactionHistory")}
          label="Transaction History"
        />
      </Box>
    </Container>
  );
};

export default SuccessfulPayment;
