import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import StartScreen from "./src/Start";
import LoginScreen from "./src/Login";
import HomeScreen from "./src/Home";
import SignupScreen from "./src/Signup";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Start"
          component={StartScreen}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Signup"
          component={SignupScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
