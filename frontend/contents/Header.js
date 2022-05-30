import React, { useState, useEffect } from "react";
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
  const [isReady, setIsReady] = useState(false);

  return (
    <View style={styles.container}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.13,
    backgroundColor: "white",
    alignItems: "center",
  },
  head: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#D3EEFF",
    width: SCREEN_WIDTH,
    flexDirection: "row",
  },
  homeIcons: {
    flexDirection: "row",
    marginTop: SCREEN_HEIGHT * 0.04,
    marginRight: 10,
  },
  title: {
    fontSize: 25,
    fontFamily: "Nanum",
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
