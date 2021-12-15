import React from "react";

import { AuthNavigationProps } from "../components/Navigation";
import {
  Container,
  Box,
  Text,
  Button,
  RoundedIconButton,
  RoundedIcon,
} from "../components";
const SIZE = 80;
const SuccessfullSignUp = ({
  navigation,
}: AuthNavigationProps<"SuccessfullSignUp">) => {
  return (
    <Container
      pattern={0}
      footer={
        <Box flexDirection="row" justifyContent="center">
          <RoundedIconButton
            backgroundColor="background"
            color="secondary"
            name="x"
            size={60}
            onPress={() => navigation.pop()}
          />
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
        You are Successfully Signed up
      </Text>
      <Text variant="body" textAlign="center" marginBottom="l">
        Close this window and login again
      </Text>
      <Box alignItems="center" marginTop="m">
        <Button
          variant="primary"
          onPress={() => navigation.navigate("Login")}
          label="Login"
        />
      </Box>
    </Container>
  );
};

export default SuccessfullSignUp;
