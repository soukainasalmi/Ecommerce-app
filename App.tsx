import * as React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeNavigator, assets as homeAssets } from "./src/Home";
import {
  assets as authenticationAssets,
  AuthenticationNavigator,
} from "./src/Authentication";
import { LoadAssets } from "./src/components";
import { ThemeProvider } from "./src/components/Theme";
import { AppRoutes } from "./src/components/Navigation";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { View, LogBox } from "react-native";

import { persister, store } from "./src/redux/store";
const assets = [...authenticationAssets, ...homeAssets];
const fonts = {
  "SFProDisplay-Bold": require("./assets/fonts/SF-Pro-Display-Bold.otf"),
  "SFProDisplay-Semibold": require("./assets/fonts/SF-Pro-Display-Semibold.otf"),
  "SFProDisplay-Regular": require("./assets/fonts/SF-Pro-Display-Regular.otf"),
  "SFProDisplay-Medium": require("./assets/fonts/SF-Pro-Display-Medium.otf"),
};

const AppStack = createStackNavigator<AppRoutes>();

LogBox.ignoreAllLogs();

function MainStack(props) {
  const user = useSelector((state) => state.userReducer?.user);

  return (
    <ThemeProvider>
      <LoadAssets {...{ fonts, assets }}>
        <SafeAreaProvider>
          <AppStack.Navigator>
            {user?.uid ? (
              <AppStack.Screen
                options={{ headerShown: false }}
                name="Home"
                component={HomeNavigator}
              />
            ) : (
              <AppStack.Screen
                options={{ headerShown: false }}
                name="Authentication"
                component={AuthenticationNavigator}
              />
            )}
          </AppStack.Navigator>
        </SafeAreaProvider>
      </LoadAssets>
    </ThemeProvider>
  );
}

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persister}>
        <View style={{ flex: 1 }}>
          <MainStack />
        </View>
      </PersistGate>
    </Provider>
  );
};

export default App;
