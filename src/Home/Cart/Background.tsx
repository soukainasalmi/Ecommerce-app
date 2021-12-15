import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Box, RoundedIconButton, useTheme } from "../../components";

interface BackgroundProps {
  children: React.ReactNode;
}

const Background = ({ children, navigation }: BackgroundProps) => {
  const theme = useTheme();

  return (
    <View style={StyleSheet.absoluteFill}>
      <Box flex={1 / 2} backgroundColor="background">
        <Image
          source={require("./assets/background.png")}
          style={{
            ...StyleSheet.absoluteFillObject,
            width: undefined,
            height: undefined,
            borderBottomLeftRadius: theme.borderRadii.xl,
          }}
        />
      </Box>
      <Box flex={1} style={{ backgroundColor: theme.colors.secondary }}>
        <Box
          flex={1}
          backgroundColor="background"
          borderBottomLeftRadius="xl"
          borderBottomRightRadius="xl"
        >
          {children}
        </Box>
      </Box>
      <Box flex={1 / 5} style={{ backgroundColor: theme.colors.secondary }}>
        <Box justifyContent="center" alignItems="center" marginTop="m">
          <RoundedIconButton
            backgroundColor="background"
            color="secondary"
            name="x"
            size={60}
            onPress={() => navigation.navigate("Cart")}
          />
        </Box>
      </Box>
    </View>
  );
};

export default Background;
