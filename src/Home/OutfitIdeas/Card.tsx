import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import { mix, mixColor, snapPoint } from "react-native-redash";
import { backgroundColor } from "@shopify/restyle";

import { Box } from "../../components";

const { width: wWidth } = Dimensions.get("window");
const width = wWidth * 0.75;
const height = width * (425 / 294);
const borderRadius = 24;
const snapPoints = [-wWidth, 0, wWidth];

interface CardProps {
  source: object;
}

const Card = ({ source }: CardProps) => {
  // console.log(index, "fjndjndjn", step, aIndex.value);
  const translateY = useSharedValue(0);
  const translateX = useSharedValue(0);
  const position = useDerivedValue(() => 12);

  // const imageStyle = useAnimatedStyle(() => ({
  //   transform: [
  //     {
  //       scale: interpolate(
  //         position.value,
  //         [0, step],
  //         [1.2, 1],
  //         Extrapolate.CLAMP
  //       ),
  //     },
  //   ],
  // }));

  // const cardStyle = useAnimatedStyle(() => {
  //   const scale = mix(position.value, 1, 0.9);
  //   return {
  //     transform: [
  //       { translateY: translateY.value },
  //       { translateX: translateX.value },
  //       { scale },
  //     ],
  //     backgroundColor: mixColor(position.value, "#C9E9E7", "#74BCB8"),
  //   };
  // });

  return (
    <Box
      style={[
        StyleSheet.absoluteFill,
        {
          overflow: "hidden",
          zIndex: -1,
        },
      ]}
      justifyContent="space-between"
      alignItems="center"
    >
      <PanGestureHandler>
        <View
          style={[
            {
              width,
              height,
              borderRadius,
              overflow: "hidden",
            },
          ]}
        >
          <Image
            source={source}
            style={[
              {
                ...StyleSheet.absoluteFillObject,
                width: undefined,
                height: undefined,
              },
            ]}
          />
        </View>
      </PanGestureHandler>
    </Box>
  );
};

export default Card;
