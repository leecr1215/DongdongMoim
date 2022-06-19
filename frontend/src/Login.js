import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from "react-native";
import { Image } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

const { manifest } = Constants;
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function Login({ navigation }) {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [exist, setExist] = useState(false);

  const storeData = async (username, idNum) => {
    try {
      await AsyncStorage.setItem("@username", JSON.stringify(username));
      await AsyncStorage.setItem("@id", JSON.stringify(idNum));
    } catch (e) {
      console.log(e);
    }
  };

  const onPressLogin = async () => {
    if (id == "" || pw == "") {
      alert("아이디와 비밀번호를 입력해 주세요");
    } else {
      const data = {
        username: id,
        password: pw,
      };
      console.log(data);
      console.log(manifest.debuggerHost.split(":").shift());

      try {
        const response = await axios
          .post(
            `http://${manifest.debuggerHost
              .split(":")
              .shift()}:8080/api/v1/token`,
            data
          )
          .then(function async(response) {
            if (response.data["success"] == true) {
              alert("로그인되었습니다.");
              console.log("id는 " + response.data["id"].toString());
              storeData(id, response.data["id"].toString());
              navigation.navigate("Home");
              setId("");
              setPw("");
            }
          })
          .catch(function (error) {
            alert("로그인 오류입니다.");
            //console.log(error.response.data);
            console.log(error);
            throw error;
          });
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <KeyboardAvoidingView style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.head}>
          <Image style={styles.logo} source={require("../icon/red_logo.png")} />
          <Text style={styles.appText}>"I" CAN BE HEALTHY</Text>
        </View>
        <View style={styles.login}>
          <TextInput
            style={styles.input}
            value={id}
            onChangeText={setId}
            placeholder="아이디(닉네임)"
            placeholderTextColor="#898989"
          />
          <TextInput
            style={styles.input}
            value={pw}
            onChangeText={setPw}
            secureTextEntry={true}
            placeholder="비밀번호"
            placeholderTextColor="#898989"
          />
          <View style={styles.loginBtn}>
            <TouchableOpacity
              onPress={() => {
                onPressLogin();
              }}
            >
              <Text style={styles.loginText}>로그인</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={styles.signupBtn}>회원가입</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  head: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D3EEFF",
    width: SCREEN_WIDTH,
  },
  logo: {
    resizeMode: "contain",
    width: SCREEN_WIDTH * 0.3,
    height: SCREEN_HEIGHT * 0.13,
  },
  appText: {
    fontSize: 20,
    fontWeight: "700",
  },
  login: {
    flex: 3,
    width: SCREEN_WIDTH,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 1,
    marginBottom: SCREEN_HEIGHT * 0.08,
    width: SCREEN_WIDTH * 0.55,
    borderColor: "#9C9C9C",
    fontSize: 15,
  },
  loginBtn: {
    backgroundColor: "#D3EEFF",
    alignItems: "center",
    textAlign: "center",
    paddingBottom: 8,
    paddingTop: 8,
    borderRadius: 50,
    width: SCREEN_WIDTH * 0.55,
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 2 },
    elevation: 3,
    marginBottom: SCREEN_HEIGHT * 0.08,
  },
  loginText: { fontSize: 17 },
  signupBtn: {
    borderBottomWidth: 1,
    alignItems: "center",
    textAlign: "center",
  },
  loginLogo: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: SCREEN_WIDTH,
  },
});
