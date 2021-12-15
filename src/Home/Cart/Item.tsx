import React from "react";
import { Image, View, StyleSheet } from "react-native";
import { Box, Text, useTheme } from "../../components";
import SwipeableRow from "./SwipeableRow";

interface ItemProps {
  onDelete: Function;
  onUpate: Function;
  item: {
    color: string;
    image: string;
    name: string;
    price: string;
    product_id: string;
    quantity: number;
    size: string;
  };
}

const Item = ({ onDelete, item, onUpate }: ItemProps) => {
  const theme = useTheme();
  const height = 120 + theme.spacing.m * 2;

  return (
    <SwipeableRow
      item={item}
      onDelete={onDelete}
      onUpate={onUpate}
      height={height}
    >
      <Box padding="m" flexDirection="row">
        <Image
          source={{ uri: item.image }}
          style={{
            width: 120,
            height: 120,
            borderRadius: 16,
            backgroundColor: "#BFEAF5",
          }}
        />
        <Box padding="m" flex={1} justifyContent="center">
          <View style={styles.itemHeader}>
            <Text variant="header">Size {item?.size}</Text>
            <View style={styles.itemColorContainer}>
              <Text variant="header">Color</Text>
              <View
                style={[styles.colorContainer, { backgroundColor: item.color }]}
              />
            </View>
          </View>
          <Text variant="title3" marginBottom="s">
            {item?.name}
          </Text>
          <Text variant="title3" color="primary">
            ${item?.price}
          </Text>
        </Box>
        <Box justifyContent="center">
          <Box
            backgroundColor="secondary"
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: 24,
              height: 24,
              borderRadius: 12,
            }}
          >
            <Text variant="header" color="background">
              x{item?.quantity}
            </Text>
          </Box>
        </Box>
      </Box>
    </SwipeableRow>
  );
};

export default Item;

const styles = StyleSheet.create({
  itemHeader: {
    width: 120,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemColorContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  colorContainer: {
    width: 15,
    height: 15,
    borderRadius: 15 / 2,
    backgroundColor: "red",
    marginLeft: 10,
  },
});
