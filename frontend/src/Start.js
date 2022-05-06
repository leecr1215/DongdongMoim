import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Image } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function Start({ navigation }) {
  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.logo} source={require("../icon/red_logo.png")} />
      </View>
      <Text style={styles.appText}>동동모임</Text>
      <StatusBar style="auto" />
      <View style={styles.startBtn}>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.startText}>시작하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D8E1FF",
    alignItems: "center",
    justifyContent: "center",
  },
  appText: {
    fontSize: 20,
    fontWeight: "700",
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
    marginTop: SCREEN_WIDTH * 0.2,
  },
  startText: { fontSize: 16, fontWeight: "700" },
  logo: {
    resizeMode: "contain",
    width: SCREEN_WIDTH * 0.4,
    height: SCREEN_WIDTH * 0.5,
  },
});
