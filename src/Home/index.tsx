import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { HomeRoutes } from "../components/Navigation";
import DrawerContent, { DRAWER_WIDTH } from "./Drawer";
import OutfitIdeas from "./OutfitIdeas";
import FavoriteOutfits from "./FavoriteOutfits";
import TransactionHistory from "./TransactionHistory";
import SuccessfulPayment from "./Cart/SuccessfulPayment";
import EditProfile from "./EditProfile";
import Settings from "./Settings";
import Cart from "./Cart";
import ProductDetails from "./ProductDetails";
import CardDetail from "./Cart/CardDetail";
import ChangeAddress from "./Cart/ChageAddress";
import StripePayment from "./Cart/StripePayment";
export { assets } from "./Drawer";

const Drawer = createDrawerNavigator<HomeRoutes>();
export const HomeNavigator = () => (
  <Drawer.Navigator
    drawerContent={() => <DrawerContent />}
    drawerStyle={{
      width: DRAWER_WIDTH,
    }}
  >
    <Drawer.Screen
      options={{ headerShown: false }}
      name="OutfitIdeas"
      component={OutfitIdeas}
    />
    <Drawer.Screen
      options={{ headerShown: false }}
      name="FavoriteOutfits"
      component={FavoriteOutfits}
    />
    <Drawer.Screen
      options={{ headerShown: false }}
      name="TransactionHistory"
      component={TransactionHistory}
    />
    <Drawer.Screen
      options={{ headerShown: false }}
      name="EditProfile"
      component={EditProfile}
    />
    <Drawer.Screen
      options={{ headerShown: false }}
      name="Settings"
      component={Settings}
    />
    <Drawer.Screen
      options={{ headerShown: false }}
      name="Cart"
      component={Cart}
    />
    <Drawer.Screen
      options={{ headerShown: false }}
      name="ProductDetails"
      component={ProductDetails}
    />
    <Drawer.Screen
      name="CardDetail"
      component={CardDetail}
      options={{ headerShown: false }}
    />
    <Drawer.Screen
      name="ChangeAddress"
      component={ChangeAddress}
      options={{ headerShown: false }}
    />
        <Drawer.Screen
      name="StripePayment"
      component={StripePayment}
      options={{ headerShown: false }}
    />
        <Drawer.Screen
      options={{ headerShown: false }}
      name="SuccessfulPayment"
      component={SuccessfulPayment}
    />
  </Drawer.Navigator>
);
