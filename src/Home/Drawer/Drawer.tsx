import React from "react";
import { Dimensions, Image } from "react-native";
import {
  DrawerActions,
  useNavigation,
  CommonActions,
} from "@react-navigation/native";
import { Box, useTheme, Text, Header } from "../../components";
import DrawerItem, { DrawerItemProps } from "./DrawerItem";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../redux/actions/authActions";
export const assets = [require("./assets/drawer.png")];
const { width } = Dimensions.get("window");
export const DRAWER_WIDTH = width * 0.8;

const aspectRatio = 750 / 1125;
const height = DRAWER_WIDTH * aspectRatio;

const items: DrawerItemProps[] = [
  {
    icon: "zap",
    label: "Outfit Ideas",
    screen: "OutfitIdeas",
    color: "primary",
  },
  {
    icon: "heart",
    label: "Favorites Outfits",
    screen: "FavoriteOutfits",
    color: "drawer1",
  },
  {
    icon: "user",
    label: "Edit Profile",
    screen: "EditProfile",
    color: "drawer2",
  },
  {
    icon: "clock",
    label: "Transaction History",
    screen: "TransactionHistory",
    color: "drawer3",
  },
  // {
  //   icon: "settings",
  //   label: "Notifications Settings",
  //   screen: "Settings",
  //   color: "drawer4",
  // },
];

const Drawer = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const theme = useTheme();
  const user = useSelector((state) => state.userReducer.user);

  const handleOnLogout = () => {
    dispatch(userLogout());
  };

  return (
    <Box flex={1}>
      <Box flex={0.2} backgroundColor="background">
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          borderBottomRightRadius="xl"
          backgroundColor="secondary"
        >
          <Header
            title="Menu"
            left={{
              icon: "x",
              onPress: () => navigation.dispatch(DrawerActions.closeDrawer()),
            }}
            right={{
              icon: "shopping-bag",
              onPress: () => navigation.navigate("Cart"),
            }}
            dark
          />
        </Box>
      </Box>
      <Box flex={0.8}>
        <Box flex={1} backgroundColor="secondary" />
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          backgroundColor="background"
          borderTopLeftRadius="xl"
          borderBottomRightRadius="xl"
          justifyContent="center"
          padding="xl"
        >
          <Box
            position="absolute"
            left={DRAWER_WIDTH / 2 - 50}
            top={-50}
            backgroundColor="primary"
            width={100}
            height={100}
            style={{ borderRadius: 50 }}
          />
          <Box marginBottom="s" style={{ marginTop: 60 }}>
            <Text
              fontSize={25}
              variant="title1"
              textAlign="center"
              numberOfLines={1}
            >
              {user?.name}
            </Text>
            <Text variant="body" textAlign="center" fontSize={15}>
              {user?.email}
            </Text>
          </Box>
          {items.map((item) => (
            <DrawerItem key={item.icon} {...item} />
          ))}
          <DrawerItem
            icon="log-out"
            label="Logout"
            onPress={handleOnLogout}
            color="secondary"
          />
        </Box>
      </Box>
      <Box
        backgroundColor="background"
        width={DRAWER_WIDTH - 51}
        overflow="hidden"
        height={height * 0.61}
      >
        <Image
          source={assets[0]}
          style={{
            width: DRAWER_WIDTH - 51,
            height,
            borderTopLeftRadius: theme.borderRadii.xl,
          }}
        />
      </Box>
    </Box>
  );
};

export default Drawer;
