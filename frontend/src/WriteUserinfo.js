import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  Button,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Image } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";
import Header from "../contents/Header";
import Constants from "expo-constants";
import { useIsFocused } from "@react-navigation/native";
import ExerciseModal from "../contents/ExerciseModal";

const { manifest } = Constants;
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function WriteUserinfo({ navigation }) {
  const isFocused = useIsFocused();
  const [id, setId] = useState("");
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("M");
  const [phoneNum, setPhoneNum] = useState("");
  const [age, setAge] = useState("");
  const [soccer, setSoccer] = useState(1);
  const [baseball, setBaseball] = useState(1);
  const [basketball, setBasketball] = useState(1);

  const [isGenderSelect, setGenderSelect] = useState([true, false]);
  const [isModalClick, setModalClick] = useState(false);
  const [isSoccerSelect, setSoccerSelect] = useState([
    true,
    false,
    false,
    false,
  ]);
  const [isBaseballSelect, setBaseballSelect] = useState([
    true,
    false,
    false,
    false,
  ]);
  const [isBasketballSelect, setBasketballSelect] = useState([
    true,
    false,
    false,
    false,
  ]);

  // const [userData, setUserData] = useState("");

  // const setData = async (data) => {
  //   try {
  //     await setUserData(data);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  const onPressQuestion = async () => {
    setModalClick(true);
  };

  const onPressModalClose = async () => {
    setModalClick(false);
  };

  // 사용자 운동 능력 가져오기
  function getSoccerSkill(idx) {
    if (idx == 1) {
      setSoccerSelect([true, false, false, false]);
    } else if (idx == 2) {
      setSoccerSelect([false, true, false, false]);
    } else if (idx == 3) {
      setSoccerSelect([false, false, true, false]);
    } else if (idx == 4) {
      setSoccerSelect([false, false, false, true]);
    }
  }
  function getBaseballSkill(idx) {
    if (idx == 1) {
      setBaseballSelect([true, false, false, false]);
    } else if (idx == 2) {
      setBaseballSelect([false, true, false, false]);
    } else if (idx == 3) {
      setBaseballSelect([false, false, true, false]);
    } else if (idx == 4) {
      setBaseballSelect([false, false, false, true]);
    }
  }

  function getBasketballSkill(idx) {
    if (idx == 1) {
      setBasketballSelect([true, false, false, false]);
    } else if (idx == 2) {
      setBasketballSelect([false, true, false, false]);
    } else if (idx == 3) {
      setBasketballSelect([false, false, true, false]);
    } else if (idx == 4) {
      setBasketballSelect([false, false, false, true]);
    }
  }

  // 사용자 성별 가져오기
  function getGender(gender) {
    if (gender == "M") {
      setGenderSelect([true, false]);
    } else {
      setGenderSelect([false, true]);
    }
  }

  // 성별 변경 시 css
  const onPressGender = async (gender) => {
    if (gender === "남") {
      setGender("M");
      setGenderSelect([true, false]);
    } else if (gender === "여") {
      setGender("F");
      setGenderSelect([false, true]);
    }
  };

  //운동 능력 변경 시 css
  const onPressSoccer = async (name) => {
    if (name === "sole") {
      setSoccer(1);
      setSoccerSelect([true, false, false, false]);
    } else if (name === "sock") {
      setSoccer(2);
      setSoccerSelect([false, true, false, false]);
    } else if (name === "slipper") {
      setSoccer(3);
      setSoccerSelect([false, false, true, false]);
    } else if (name === "sneaker") {
      setSoccer(4);
      setSoccerSelect([false, false, false, true]);
    }
  };

  const onPressBaseball = async (name) => {
    if (name === "sole") {
      setBaseball(1);
      setBaseballSelect([true, false, false, false]);
    } else if (name === "sock") {
      setBaseball(2);
      setBaseballSelect([false, true, false, false]);
    } else if (name === "slipper") {
      setBaseball(3);
      setBaseballSelect([false, false, true, false]);
    } else if (name === "sneaker") {
      setBaseball(4);
      setBaseballSelect([false, false, false, true]);
    }
  };

  const onPressBasket = async (name) => {
    if (name === "sole") {
      setBasketball(1);
      setBasketballSelect([true, false, false, false]);
    } else if (name === "sock") {
      setBasketball(2);
      setBasketballSelect([false, true, false, false]);
    } else if (name === "slipper") {
      setBasketball(3);
      setBasketballSelect([false, false, true, false]);
    } else if (name === "sneaker") {
      setBasketball(4);
      setBasketballSelect([false, false, false, true]);
    }
  };

  const onPress = async () => {
    //navigation.navigate("Home");
    if (username == "" || phoneNum == "" || age == "") {
      alert("빈칸없이 다 입력해주세요😊");
    } else {
      const data = {
        username: username, // 아이디
        gender: gender,
        phone_number: phoneNum,
        age: age,
        soccer_skill: soccer,
        baseball_skill: baseball,
        basketball_skill: basketball,
      };

      try {
        const response = await axios
          .put(
            `http://${manifest.debuggerHost
              .split(":")
              .shift()}:8080/api/v1/users/${id}`,
            data
          )
          .then(function (response) {
            if (response.data["success"] == true) {
              alert("회원정보가 변경되었습니다.");
              navigation.navigate("Userinfo");
            } else {
              alert("회원정보 변경에 실패했습니다.");
            }
          })
          .catch(function (error) {
            //alert(error.response.data);
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  // 사용자 id 가져오기
  useEffect(() => {
    try {
      async function getUsers() {
        await AsyncStorage.getItem("@id").then((userid) => {
          setId(userid.slice(1, -1));
        });
      }
      getUsers();
    } catch (e) {
      throw e;
    }
  }, []);

  // 사용자 정보 가져오기
  useEffect(() => {
    async function getUserinfo() {
      try {
        const response = await axios
          .get(
            `http://${manifest.debuggerHost
              .split(":")
              .shift()}:8080/api/v1/users/${id}`
          )
          .then((response) => {
            console.log(response.data);
            if (response.data["success"] == true) {
              const data = response.data["result"];
              // setData(data);
              setUsername(data["username"]);
              setAge(String(data["age"]));
              setGender(data["gender"]);
              setPhoneNum(String(data["phone_number"]));
              // user 정보 불러오기
              getSoccerSkill(data["soccer_skill"]);
              getBaseballSkill(data["baseball_skill"]);
              getBasketballSkill(data["basketball_skill"]);
              getGender(data["gender"]);
            }
          })
          .catch(function (error) {
            throw error;
          });
      } catch (e) {
        // throw e;
      }
    }
    getUserinfo();
  }, [id]);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>
        <ExerciseModal isVisible={isModalClick} isClose={onPressModalClose} />
        <Header navigation={navigation}></Header>
        <View style={styles.body}>
          <TouchableOpacity onPress={() => navigation.navigate("Userinfo")}>
            <View style={styles.back}>
              <AntDesign name="left" size={20} color="black" />
              <Text style={styles.backText}>회원정보 수정</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.introContainer}>
            <Text style={styles.username}>{username}님의 회원정보</Text>
          </View>
          <View style={styles.info}>
            <View>
              <Text style={styles.genderText}>성별</Text>
              <View style={styles.genderContainer}>
                <TouchableOpacity onPress={() => onPressGender("남")}>
                  <Text
                    style={
                      isGenderSelect[0]
                        ? styles.genderPressBtn
                        : styles.genderBtn
                    }
                  >
                    남
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onPressGender("여")}>
                  <Text
                    style={
                      isGenderSelect[1]
                        ? styles.genderPressBtn
                        : styles.genderBtn
                    }
                  >
                    여
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.ageContainer}>
              <Text style={styles.ageText}>나이</Text>
              <TextInput
                style={styles.ageInput}
                onChangeText={setAge}
                value={age}
                placeholder={age}
                keyboardType="numeric"
                maxLength={3}
              />
              <Text>세</Text>
            </View>

            <View style={styles.phoneContainer}>
              <Text style={styles.phoneText}>인스타그램 ID</Text>
              <TextInput
                style={styles.phoneInput}
                onChangeText={setPhoneNum}
                value={phoneNum}
                placeholder={phoneNum}
                maxLength={13}
              />
            </View>

            <View style={styles.exerciseContainer}>
              <View style={styles.exerciseTextContainer}>
                <Text style={styles.exerciseText}>운동능력</Text>
                <TouchableOpacity onPress={() => onPressQuestion()}>
                  <Text style={styles.question}>?</Text>
                </TouchableOpacity>
              </View>
              {/* 축구 부분 */}
              <View style={styles.exercises}>
                <Text style={styles.soccer}>축구</Text>
                <View style={styles.imageStyle}>
                  <TouchableOpacity onPress={() => onPressSoccer("sole")}>
                    <Image
                      style={isSoccerSelect[0] ? styles.pressBtn : styles.logo}
                      source={require("../icon/sole.png")}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.imageStyle}>
                  <TouchableOpacity onPress={() => onPressSoccer("sock")}>
                    <Image
                      style={isSoccerSelect[1] ? styles.pressBtn : styles.logo}
                      source={require("../icon/sock.png")}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.imageStyle}>
                  <TouchableOpacity onPress={() => onPressSoccer("slipper")}>
                    <Image
                      style={isSoccerSelect[2] ? styles.pressBtn : styles.logo}
                      source={require("../icon/slipper.png")}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.imageStyle}>
                  <TouchableOpacity onPress={() => onPressSoccer("sneaker")}>
                    <Image
                      style={isSoccerSelect[3] ? styles.pressBtn : styles.logo}
                      source={require("../icon/sneaker.png")}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              {/* 야구 부분 */}
              <View style={styles.exercises}>
                <Text style={styles.baseball}>야구</Text>
                <View style={styles.imageStyle}>
                  <TouchableOpacity onPress={() => onPressBaseball("sole")}>
                    <Image
                      style={
                        isBaseballSelect[0] ? styles.pressBtn : styles.logo
                      }
                      source={require("../icon/sole.png")}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.imageStyle}>
                  <TouchableOpacity onPress={() => onPressBaseball("sock")}>
                    <Image
                      style={
                        isBaseballSelect[1] ? styles.pressBtn : styles.logo
                      }
                      source={require("../icon/sock.png")}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.imageStyle}>
                  <TouchableOpacity onPress={() => onPressBaseball("slipper")}>
                    <Image
                      style={
                        isBaseballSelect[2] ? styles.pressBtn : styles.logo
                      }
                      source={require("../icon/slipper.png")}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.imageStyle}>
                  <TouchableOpacity onPress={() => onPressBaseball("sneaker")}>
                    <Image
                      style={
                        isBaseballSelect[3] ? styles.pressBtn : styles.logo
                      }
                      source={require("../icon/sneaker.png")}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              {/* 배드민턴 부분 */}
              <View style={styles.exercises}>
                <Text style={styles.basketball}>농구</Text>
                <View style={styles.imageStyle}>
                  <TouchableOpacity onPress={() => onPressBasket("sole")}>
                    <Image
                      style={
                        isBasketballSelect[0] ? styles.pressBtn : styles.logo
                      }
                      source={require("../icon/sole.png")}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.imageStyle}>
                  <TouchableOpacity onPress={() => onPressBasket("sock")}>
                    <Image
                      style={
                        isBasketballSelect[1] ? styles.pressBtn : styles.logo
                      }
                      source={require("../icon/sock.png")}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.imageStyle}>
                  <TouchableOpacity onPress={() => onPressBasket("slipper")}>
                    <Image
                      style={
                        isBasketballSelect[2] ? styles.pressBtn : styles.logo
                      }
                      source={require("../icon/slipper.png")}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.imageStyle}>
                  <TouchableOpacity onPress={() => onPressBasket("sneaker")}>
                    <Image
                      style={
                        isBasketballSelect[3] ? styles.pressBtn : styles.logo
                      }
                      source={require("../icon/sneaker.png")}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <TouchableOpacity onPress={() => onPress()} underlayColor="white">
            <Text style={styles.saveBtn}>확인</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
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
  body: {
    flex: 0.9,
    alignItems: "center",
    backgroundColor: "#E5E5E5",
    width: SCREEN_WIDTH,
  },
  back: {
    flexDirection: "row",
    marginRight: SCREEN_WIDTH * 0.6,
    marginTop: SCREEN_HEIGHT * 0.03,
    alignItems: "center",
  },
  backText: {
    fontSize: 18,
  },
  introContainer: {
    width: SCREEN_WIDTH * 0.75,
    marginTop: SCREEN_HEIGHT * 0.04,
    justifyContent: "space-between",
  },
  username: {
    fontSize: 23,
    fontWeight: "700",
    marginBottom: SCREEN_HEIGHT * 0.03,
  },
  info: {
    backgroundColor: "white",
    width: SCREEN_WIDTH * 0.8,
    height: SCREEN_HEIGHT * 0.55,
    borderRadius: 20,
    //paddingLeft: SCREEN_WIDTH*0.05,
    //paddingTop: SCREEN_HEIGHT*0.03,
    //paddingBottom: SCREEN_HEIGHT*0.05,
    alignItems: "center",
    marginBottom: SCREEN_HEIGHT * 0.05,
  },
  subject: {
    fontSize: 20,
    lineHeight: 70,
    fontWeight: "700",
    width: 80,
  },
  genderContainer: {
    flexDirection: "row",
    width: SCREEN_WIDTH * 0.55,
    justifyContent: "space-between",
  },
  genderText: {
    fontSize: 15,
    fontWeight: "700",
    marginTop: SCREEN_HEIGHT * 0.02,
    marginBottom: SCREEN_HEIGHT * 0.02,
  },
  genderBtn: {
    backgroundColor: "#F3F3F3",
    fontSize: 15,
    textAlign: "center",
    paddingBottom: 8,
    paddingTop: 8,
    width: SCREEN_WIDTH * 0.25,
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 2 },
    elevation: 3,
    marginBottom: SCREEN_HEIGHT * 0.05,
  },
  ageContainer: {
    flexDirection: "row",
    width: SCREEN_WIDTH * 0.55,
    justifyContent: "space-between",
  },
  ageText: { fontSize: 15, fontWeight: "700" },
  ageInput: {
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 1,
    width: SCREEN_WIDTH * 0.3,
    borderColor: "#9C9C9C",
    marginBottom: SCREEN_HEIGHT * 0.05,
  },
  phoneContainer: {
    flexDirection: "row",
    width: SCREEN_WIDTH * 0.55,
    justifyContent: "space-between",
  },
  phoneText: { fontSize: 15, fontWeight: "700" },
  phoneInput: {
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 1,
    marginBottom: SCREEN_HEIGHT * 0.05,
    width: SCREEN_WIDTH * 0.25,
    borderColor: "#9C9C9C",
  },
  exerciseContainer: { width: SCREEN_WIDTH * 0.55 },
  exerciseTextContainer: {
    flexDirection: "row",
    fontWeight: "700",
    justifyContent: "space-between",
    marginBottom: SCREEN_HEIGHT * 0.02,
  },
  exerciseText: { fontSize: 15, fontWeight: "700" },
  question: {
    textAlign: "center",
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 20 / 2,
    backgroundColor: "black",
    color: "white",
    borderColor: "black",
  },
  exercises: { flexDirection: "row", marginBottom: SCREEN_HEIGHT * 0.02 },
  soccer: {
    fontSize: 12,
    color: "#898989",
    marginRight: SCREEN_WIDTH * 0.08,
  },
  baseball: {
    fontSize: 12,
    color: "#898989",
    marginRight: SCREEN_WIDTH * 0.08,
  },
  basketball: {
    fontSize: 12,
    color: "#898989",
    marginRight: SCREEN_WIDTH * 0.08,
    marginBottom: SCREEN_HEIGHT * 0.05,
  },
  logo: {
    resizeMode: "contain",
    height: SCREEN_HEIGHT * 0.025,
    width: SCREEN_WIDTH * 0.08,
    alignContent: "center",
    borderColor: "#898989",
    borderWidth: 1,
  },
  pressBtn: {
    resizeMode: "contain",
    height: SCREEN_HEIGHT * 0.025,
    width: SCREEN_WIDTH * 0.08,
    alignContent: "center",
    borderColor: "#ffd700",
    borderWidth: 1.6,
  },
  imageStyle: {
    //borderColor: "#898989",
    //borderWidth: 1,
    alignContent: "center",
    justifyContent: "space-between",
    width: SCREEN_WIDTH * 0.1,
    //height: SCREEN_HEIGHT * 0.03,
    //width: SCREEN_WIDTH * 0.085,
    // height: SCREEN_HEIGHT * 0.028,
    // width: SCREEN_WIDTH * 0.085,
    //marginLeft: SCREEN_WIDTH * 0.01,
  },

  saveBtn: {
    backgroundColor: "#D3EEFF",
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
    marginBottom: SCREEN_HEIGHT * 0.05,
  },
  genderPressBtn: {
    backgroundColor: "#ffd700",
    fontSize: 15,
    textAlign: "center",
    paddingBottom: 8,
    paddingTop: 8,
    width: SCREEN_WIDTH * 0.25,
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 2 },
    elevation: 3,
    color: "black",
    borderColor: "#ffd700",
    borderWidth: 1,
    marginBottom: SCREEN_HEIGHT * 0.05,
  },
});
