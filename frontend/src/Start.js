import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "react-native";
import * as Font from "expo-font";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function Start({ navigation }) {
  const [isReady, setIsReady] = useState(false);
  const [exist, setExist] = useState(false);

  useEffect(() => {
    async function getFont() {
      const response = await Font.loadAsync({
        Nanum: require("../assets/fonts/Nanum.ttf"),
      });
      setIsReady(true);
      loginUser();
    }
    getFont();
  }, []);

  const loginUser = async () => {
    const user = await AsyncStorage.getItem("@username");
    if (user != null) {
      setExist(true);
    }
  };

  const onPress = () => {
    if (exist) {
      // 로그아웃 구현하면 이걸로 바꾸기
      //navigation.navigate("Home");
      navigation.navigate("Login");
    } else {
      navigation.navigate("Login");
    }
  };

  return isReady ? (
    <View style={styles.container}>
      <View>
        <Image style={styles.logo} source={require("../icon/red_logo.png")} />
      </View>
      <Text style={styles.appName}>동동모임</Text>
      <Text style={styles.appText}>동네운동 모임</Text>
      <StatusBar style="auto" />
      <View style={styles.startBtn}>
        <TouchableOpacity onPress={() => onPress()}>
          <Text style={styles.startText}>시작하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  ) : (
    <View>
      <Text>로딩중..</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D3EEFF",
    alignItems: "center",
    justifyContent: "center",
  },
  appName: {
    fontSize: 40,
    fontFamily: "Nanum",
  },
  appText: {
    fontSize: 20,
    paddingTop: 10,
    color: "grey",
  },
  startBtn: {
    backgroundColor: "white",
    alignItems: "center",
    paddingBottom: 8,
    paddingTop: 8,
    borderRadius: 50,
    width: SCREEN_WIDTH * 0.4,
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 2 },
    elevation: 3,
    marginTop: SCREEN_WIDTH * 0.3,
  },
  startText: { fontSize: 16, fontWeight: "700" },
  logo: {
    resizeMode: "contain",
    width: SCREEN_WIDTH * 0.4,
    height: SCREEN_WIDTH * 0.5,
  },
});
