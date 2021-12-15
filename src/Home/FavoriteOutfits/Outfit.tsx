import React from "react";
import { ImageBackground } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";
import { RoundedIcon } from "../../components";

interface OutfitProps {
  outfit: {
    aspectRatio: number;
    isSelected: boolean;
    data: { image: string };
  };
  handleOnSelect: Function;
  width: number;
  index: number;
}

const Outfit = ({ outfit, width, handleOnSelect, index }: OutfitProps) => {
  return (
    <BorderlessButton onPress={() => handleOnSelect(index, outfit?.isSelected)}>
      <ImageBackground
        source={{ uri: outfit?.data?.image }}
        loadingIndicatorSource={require("../../Authentication/assets/1.png")}
        resizeMode="cover"
        style={{
          width,
          height: width * outfit.aspectRatio,
          alignItems: "flex-end",
          borderRadius: 16,
          marginBottom: 16,
          padding: 16,
          overflow: "hidden",
        }}
      >
        {outfit?.isSelected && (
          <RoundedIcon
            name="check"
            backgroundColor="primary"
            color="background"
            size={24}
          />
        )}
      </ImageBackground>
    </BorderlessButton>
  );
};

export default Outfit;
