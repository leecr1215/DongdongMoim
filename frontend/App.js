import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import StartScreen from "./src/Start";
import LoginScreen from "./src/Login";
import HomeScreen from "./src/Home";
import SignupScreen from "./src/Signup";
import ProfileScreen from "./src/Profile";
import UserinfoScreen from "./src/Userinfo";
import MyPageScreen from "./src/MyPage";
import WriteUserinfoScreen from "./src/WriteUserinfo";
import AlarmPageScreen from "./src/AlarmPage";
import PostScreen from "./src/Post";

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
        <Stack.Screen
          options={{ headerShown: false }}
          name="Profile"
          component={ProfileScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Userinfo"
          component={UserinfoScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="MyPage"
          component={MyPageScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="WriteUserinfo"
          component={WriteUserinfoScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="AlarmPage"
          component={AlarmPageScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Post"
          component={PostScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
