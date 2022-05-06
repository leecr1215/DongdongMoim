import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from "react-native";
import { Image } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function Login({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>여긴 로그인</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
});
