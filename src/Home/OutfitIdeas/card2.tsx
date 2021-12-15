"use strict";

import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

import { Box } from "../../components";

import Card from "./Card";

class Card2 extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ zIndex: 1, height: 500 }}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("ProductDetails", {
              productDetail: this.props,
            });
          }}
          style={{ backgroundColor: "white", width: 300, height: 500 }}
        >
          <Card source={{ uri: this.props.data.image }} />
          <Box alignSelf={"center"} alignItems={"center"}>
            <Text>{this.props.data?.name}</Text>
            <Text>{this.props.data?.price}</Text>
          </Box>
        </TouchableOpacity>
        {/* </Box> */}
      </View>
    );
  }
}

export default Card2;
const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    borderRadius: 5,
    overflow: "hidden",
    borderColor: "grey",
    backgroundColor: "white",
    borderWidth: 1,
    elevation: 1,
  },
  thumbnail: {
    width: 300,
    height: 300,
  },
  text: {
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  noMoreCards: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
