import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import * as Font from "expo-font";
import { AntDesign } from "@expo/vector-icons";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Header = () => {
  useEffect(async () => {
    await Font.loadAsync({
      Nanum: require("../assets/fonts/Nanum.ttf"),
    });
    setIsReady(true);
  }, []);

  return (
    <View style={styles.head}>
      <View style={styles.homeIcons}>
        <Image style={styles.homeLogo} source={require("../icon/home.png")} />
        <View style={styles.homeLogo2}></View>
      </View>
      <View>
        <Text style={styles.title}> 동동모임 </Text>
      </View>
      <View style={styles.icons}>
        <Image style={styles.bellLogo} source={require("../icon/bell.png")} />
        <Image
          style={styles.myPageLogo}
          source={require("../icon/mypage.png")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  head: {
    flex: 0.13,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#D3EEFF",
    width: SCREEN_WIDTH,
    flexDirection: "row",
  },
  homeIcons: {
    justifyContent: "flex",
    flexDirection: "row",
    marginTop: SCREEN_HEIGHT * 0.04,
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    marginTop: SCREEN_HEIGHT * 0.04,
    alignContent: "center",
    marginLeft: SCREEN_WIDTH * 0.05,
    marginRight: SCREEN_WIDTH * 0.05,
  },
  homeLogo: {
    resizeMode: "contain",
    width: SCREEN_WIDTH * 0.07,
    height: SCREEN_HEIGHT * 0.13,
  },
  homeLogo2: {
    resizeMode: "contain",
    width: SCREEN_WIDTH * 0.07,
    height: SCREEN_HEIGHT * 0.13,
  },
  bellLogo: {
    resizeMode: "contain",
    width: SCREEN_WIDTH * 0.07,
    height: SCREEN_HEIGHT * 0.13,
    marginRight: 10,
  },
  icons: {
    justifyContent: "flex",
    flexDirection: "row",
    marginTop: SCREEN_HEIGHT * 0.04,
  },
  myPageLogo: {
    resizeMode: "contain",
    width: SCREEN_WIDTH * 0.07,
    height: SCREEN_HEIGHT * 0.13,
  },
});

export default Header;
