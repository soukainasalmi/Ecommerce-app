import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";

import { Text, Box } from "../../components";

const INNER_RADIUS = 30;
const OUTER_RADIUS = 34;

interface CategoryProps {
  category: {
    id: string;
    color: string;
    title: string;
    selected: boolean;
  };
  setSelected: Function;
  index: number;
}

const Category = ({
  category: { color: backgroundColor, title, selected },
  index,
  setSelected,
}: CategoryProps) => {
  return (
    <BorderlessButton onPress={() => setSelected(index)}>
      <Box marginLeft="m" marginTop="s" alignItems="center">
        <Box
          width={OUTER_RADIUS * 2}
          height={OUTER_RADIUS * 2}
          justifyContent="center"
          alignItems="center"
        >
          {selected && (
            <View
              style={{
                ...StyleSheet.absoluteFillObject,
                borderRadius: OUTER_RADIUS,
                borderColor: backgroundColor,
                borderWidth: 1,
              }}
            />
          )}
          <View
            style={{
              width: INNER_RADIUS * 2,
              height: INNER_RADIUS * 2,
              borderRadius: INNER_RADIUS,
              backgroundColor,
            }}
          />
        </Box>
        <Text textAlign="center" marginTop="s">
          {title}
        </Text>
      </Box>
    </BorderlessButton>
  );
};

export default Category;
