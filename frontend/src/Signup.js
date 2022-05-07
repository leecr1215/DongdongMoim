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

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function Home({ navigation }) {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [age, setAge] = useState("");
  const [soccer, setSoccer] = useState("");
  const [baseball, setBaseball] = useState("");
  const [badminton, setBadminton] = useState("");

  const onPress = async () => {
    //navigation.navigate("Home");
    const data = {
      username: id, // 아이디
      password: pw, // 비밀번호
      gender: gender,
      phone_number: phoneNum,
      age: age,
      soccer_skill: soccer,
      baseball_skill: baseball,
      badminton_skill: badminton,
    };

    try {
      const response = await axios
        .post(`http://192.168.0.12:8080/api/v1/members`, data)
        .then(function (response) {
          if (response.data["success"] == true) {
            alert("회원가입되었습니다.");
            navigation.navigate("Login");
          }
        })
        .catch(function (error) {
          alert(error.response.data);
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.head}>
        <Text style={styles.appText}>회원가입</Text>
      </View>
      <View style={styles.signUp}>
        <TextInput
          style={styles.input}
          onChangeText={setId}
          value={id}
          placeholder="아이디"
        />
        <TextInput
          style={styles.input}
          onChangeText={setPw}
          value={pw}
          placeholder="비밀번호"
        />

        <TouchableOpacity onPress={() => onPress()}>
          <Text style={styles.signUpBtn}>확인</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    backgroundColor: "#D8E1FF",
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
  signUp: {
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
    marginBottom: SCREEN_HEIGHT * 0.05,
    width: SCREEN_WIDTH * 0.55,
    borderColor: "#9C9C9C",
  },
  signUpBtn: {
    backgroundColor: "#D8E1FF",
    fontSize: 17,
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
  },
});
