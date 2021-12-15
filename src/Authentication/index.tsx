import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { AuthenticationRoutes } from "../components/Navigation";

import Onboarding, { assets as onBoardingAssets } from "./Onboarding";
import Welcome, { assets as welcomeAssets } from "./Welcome";
import Login from "./Login";
import SignUp from "./SignUp";
import ForgotPassword from "./ForgotPassword";
import PasswordChanged from "./PasswordChanged";
import SuccessfulSignUp from "./SuccessfullSignUp";
export const assets = [...onBoardingAssets, ...welcomeAssets];

const AuthenticationStack = createStackNavigator<AuthenticationRoutes>();
export const AuthenticationNavigator = () => {
  return (
    <AuthenticationStack.Navigator>
      <AuthenticationStack.Screen options={{ headerShown: false }} name="Onboarding" component={Onboarding} />
      <AuthenticationStack.Screen options={{ headerShown: false }} name="Welcome" component={Welcome} />
      <AuthenticationStack.Screen options={{ headerShown: false }} name="Login" component={Login} />
      <AuthenticationStack.Screen options={{ headerShown: false }} name="SignUp" component={SignUp} />
      <AuthenticationStack.Screen
        options={{ headerShown: false }}
        name="ForgotPassword"
        component={ForgotPassword}
      />
      <AuthenticationStack.Screen
        options={{ headerShown: false }}
        name="PasswordChanged"
        component={PasswordChanged}
      />
      <AuthenticationStack.Screen
        options={{ headerShown: false }}
        name="SuccessfullSignUp"
        component={SuccessfulSignUp}
      />
    </AuthenticationStack.Navigator>
  );
};
