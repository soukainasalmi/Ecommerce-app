import React, { ReactNode, useCallback } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { snapPoint } from "react-native-redash";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme, Box, RoundedIconButton, Text } from "../../components";
import { aspectRatio } from "../../components/Theme";

interface SwipeableRowProps {
  children: ReactNode;
  onDelete: Function;
  onUpate: Function;
  height: number;
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

const { width } = Dimensions.get("window");
const finalDestination = width - 50;
const editWidth = 85 * aspectRatio;
const snapPoints = [-editWidth, 0, finalDestination];

const SwipeableRow = ({
  item,
  children,
  onDelete,
  onUpate,
  height: defaultHeight,
}: SwipeableRowProps) => {
  const theme = useTheme();
  const height = useSharedValue(defaultHeight);
  const translateX = useSharedValue(0);

  const onGestureEvent = useAnimatedGestureHandler<{ x: number }>({
    onStart: (_, ctx) => {
      ctx.x = translateX.value;
    },

    onActive: ({ translationX }, ctx) => {
      translateX.value = ctx.x + translationX;
    },

    onEnd: ({ velocityX }) => {
      const dest = snapPoint(translateX.value, velocityX, snapPoints);
      translateX.value = withSpring(
        dest,
        {
          overshootClamping: true,
        },
        () => {
          if (dest === finalDestination) {
            height.value = withTiming(0, { duration: 250 });
          }
        }
      );

      if (dest === finalDestination) {
        // onDelete();
      }
    },
  });

  const style = useAnimatedStyle(() => ({
    height: height.value,
    backgroundColor: theme.colors.background,
    transform: [{ translateX: translateX.value }],
  }));

  const deleteStyle = useAnimatedStyle(() => ({
    opacity: translateX.value > 0 ? 1 : 0,
  }));

  const editStyle = useAnimatedStyle(() => ({
    opacity: translateX.value < 0 ? 1 : 0,
  }));

  return (
    <View>
      <Animated.View style={[StyleSheet.absoluteFill, deleteStyle]}>
        <LinearGradient
          style={StyleSheet.absoluteFill}
          colors={[theme.colors.danger, theme.colors.background]}
          start={[0, 0.5]}
          end={[1, 0.5]}
        />

        <Box
          justifyContent="space-evenly"
          width={editWidth}
          alignItems="center"
          flex={1}
        >
          <Text color="background" variant="header">
            Delete
          </Text>
        </Box>
      </Animated.View>
      <Animated.View style={[StyleSheet.absoluteFill, editStyle]}>
        <LinearGradient
          style={StyleSheet.absoluteFill}
          colors={[theme.colors.edit, theme.colors.background]}
          start={[1, 0.5]}
          end={[0.7, 0.5]}
        />
        <Box
          justifyContent="space-evenly"
          width={editWidth}
          alignSelf="flex-end"
          alignItems="center"
          flex={1}
        >
          <RoundedIconButton
            onPress={() => onUpate(item.quantity + 1)}
            // onPress={() => alert("Plus")}
            name="plus"
            size={24}
            color="background"
            backgroundColor="primary"
          />
          <RoundedIconButton
            onPress={() => onUpate(item.quantity - 1)}
            // onPress={() => alert("minus")}
            name="minus"
            size={24}
            color="background"
            backgroundColor="danger"
          />
        </Box>
      </Animated.View>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={style}>{children}</Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default SwipeableRow;
