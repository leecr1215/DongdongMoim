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
} from "react-native";
import { Image } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";
import Header from "../contents/Header";
import Constants from "expo-constants";

const { manifest } = Constants;

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function Userinfo({ navigation }) {
  const [id, setId] = useState();
  const [name, setName] = useState("");
  const [gender, setGender] = useState([]);
  const [phoneNum, setPhoneNum] = useState([]);
  const [age, setAge] = useState([]);
  const [soccer, setSoccer] = useState(1);
  const [baseball, setBaseball] = useState(1);
  const [basketball, setBasketball] = useState(1);

  AsyncStorage.getItem("@id").then((userid) => setId(userid.slice(1, -1)));

  AsyncStorage.getItem("@username").then((name) => setName(name.slice(1, -1)));
  useEffect(() => {
    async function getUserInfo() {
      try {
        const response = await axios
          .get(
            `http://${manifest.debuggerHost
              .split(":")
              .shift()}:8080/api/v1/users/2`
          )
          .then((response) => {
            console.log(response.data);
            if (response.data["success"] == true) {
              alert("회원 정보 조회됨");
              setName(response.data["result"]["username"]);
              setAge(response.data["result"]["age"]);
              setGender(response.data["result"]["gender"]);
              setPhoneNum(response.data["result"]["phone_num"]);
              setSoccer(response.data["result"]["soccer_skill"]);
              setBaseball(response.data["result"]["baseball_skill"]);
              setBasketball(response.data["result"]["basketball_skill"]);
            }
          })
          .catch(function (error) {
            alert("회원정보 조회 오류입니다.");
            //console.log(error.response.data);
            //console.log(error);
            throw error;
          });
      } catch (error) {
        console.log(error);
        //throw error;
      }
    }
    getUserInfo();
  }, []);

  return (
    <View style={styles.container}>
      <Header navigation={navigation}></Header>
      <View style={styles.body}>
        <View style={styles.back}>
          <TouchableOpacity>
            <AntDesign name="left" size={20} color="black" />
          </TouchableOpacity>
          <Text style={styles.backText}>회원정보 보기</Text>
        </View>
        <View style={styles.introContainer}>
          <Text style={styles.username}>{name}님의 회원정보</Text>
          <View style={styles.modifyinfo}>
            <Image
              style={styles.pencil}
              source={require("../icon/pencil.png")}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate("WriteUserinfo")}
            >
              <Text style={styles.modifyinfoText}>수정</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.info}>
          <View style={styles.genderContainer}>
            <Text style={styles.subject}> 성별 </Text>
            <Text style={styles.genderText}> {gender} </Text>
          </View>

          <View style={styles.ageContainer}>
            <Text style={styles.subject}> 나이 </Text>
            <Text style={styles.ageText}> {age} </Text>
          </View>

          <View style={styles.phoneNumContainer}>
            <Text style={styles.subject}> 전화번호 </Text>
            <Text style={styles.phoneNumText}> {phoneNum} </Text>
          </View>

          {/* 운동 능력 부분 */}
          <View style={styles.exerciseContainer}>
            <View style={styles.exerciseTextContainer}>
              <Text style={styles.subject}>운동능력</Text>
            </View>
            {/* 축구 부분 */}
            <View style={styles.exercises}>
              <Text style={styles.soccer}>축구</Text>
              <View style={styles.imageStyle}>
                <TouchableOpacity onPress={() => onPressSoccer("sole")}>
                  <Image
                    style={styles.logo}
                    source={require("../icon/sole.png")}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.imageStyle}>
                <TouchableOpacity onPress={() => onPressSoccer("sock")}>
                  <Image
                    style={styles.logo}
                    source={require("../icon/sock.png")}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.imageStyle}>
                <TouchableOpacity onPress={() => onPressSoccer("slipper")}>
                  <Image
                    style={styles.logo}
                    source={require("../icon/slipper.png")}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.imageStyle}>
                <TouchableOpacity onPress={() => onPressSoccer("sneaker")}>
                  <Image
                    style={styles.logo}
                    source={require("../icon/sneaker.png")}
                  />
                </TouchableOpacity>
              </View>
            </View>
            {/* 야구 부분 */}
            <View style={styles.exercises}>
              <Text style={styles.baseball}>야구</Text>
              <View style={styles.imageStyle}>
                <Image
                  style={styles.logo}
                  source={require("../icon/sole.png")}
                />
              </View>
              <View style={styles.imageStyle}>
                <Image
                  style={styles.logo}
                  source={require("../icon/sock.png")}
                />
              </View>
              <View style={styles.imageStyle}>
                <Image
                  style={styles.logo}
                  source={require("../icon/slipper.png")}
                />
              </View>
              <View style={styles.imageStyle}>
                <Image
                  style={styles.logo}
                  source={require("../icon/sneaker.png")}
                />
              </View>
            </View>

            {/* 배드민턴 부분 */}
            <View style={styles.exercises}>
              <Text style={styles.basketball}>농구</Text>
              <View style={styles.imageStyle}>
                <Image
                  style={styles.logo}
                  source={require("../icon/sole.png")}
                />
              </View>
              <View style={styles.imageStyle}>
                <Image
                  style={styles.logo}
                  source={require("../icon/sock.png")}
                />
              </View>
              <View style={styles.imageStyle}>
                <Image
                  style={styles.logo}
                  source={require("../icon/slipper.png")}
                />
              </View>
              <View style={styles.imageStyle}>
                <Image
                  style={styles.logo}
                  source={require("../icon/sneaker.png")}
                />
              </View>
            </View>
          </View>
        </View>
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
  body: {
    flex: 0.87,
    alignItems: "center",
    backgroundColor: "#E5E5E5",
    width: SCREEN_WIDTH,
  },
  back: {
    flexDirection: "row",
    marginRight: SCREEN_WIDTH * 0.6,
  },
  backText: {
    fontSize: 20,
  },
  introContainer: {
    width: SCREEN_WIDTH * 0.75,
    marginTop: SCREEN_HEIGHT * 0.04,
    justifyContent: "space-between",
  },
  username: {
    fontSize: 23,
    fontWeight: "700",
  },
  modifyinfo: {
    marginTop: SCREEN_HEIGHT * 0.03,
    marginBottom: SCREEN_HEIGHT * 0.02,
    justifyContent: "flex-end",
    flexDirection: "row",
  },
  pencil: {
    resizeMode: "contain",
    height: SCREEN_HEIGHT * 0.02,
    width: SCREEN_WIDTH * 0.085,
    alignContent: "center",
  },
  modifyinfoText: {
    textDecorationLine: "underline",
  },
  info: {
    backgroundColor: "white",
    width: SCREEN_WIDTH * 0.8,
    height: SCREEN_HEIGHT * 0.6,
    borderRadius: 30,
    //paddingLeft: SCREEN_WIDTH*0.05,
    //paddingTop: SCREEN_HEIGHT*0.03,
    //paddingBottom: SCREEN_HEIGHT*0.05,
    alignItems: "center",
  },
  subject: {
    fontSize: 20,
    lineHeight: 70,
    fontWeight: "700",
    width: 80,
  },
  genderContainer: {
    width: SCREEN_WIDTH * 0.65,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  genderText: {
    fontSize: 20,
    lineHeight: 70,
  },
  ageContainer: {
    width: SCREEN_WIDTH * 0.65,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  ageText: {
    fontSize: 20,
    lineHeight: 70,
  },
  phoneNumContainer: {
    width: SCREEN_WIDTH * 0.65,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  phoneNumText: {
    fontSize: 20,
    lineHeight: 70,
  },
  exerciseContainer: {
    width: SCREEN_WIDTH * 0.65,
  },
  exerciseTextContainer: {
    width: SCREEN_WIDTH * 0.65,
    justifyContent: "space-between",
    flexDirection: "row",
    fontWeight: "700",
  },
  exerciseText: {
    fontSize: 20,
    //marginTop:SCREEN_HEIGHT*0.03,
    //marginBottom:SCREEN_HEIGHT*0.05
  },
  imageStyle: {
    borderColor: "#898989",
    borderWidth: 1,
    alignContent: "center",
    marginLeft: SCREEN_WIDTH * 0.01,
  },
  logo: {
    resizeMode: "contain",
    height: SCREEN_HEIGHT * 0.025,
    width: SCREEN_WIDTH * 0.08,
    alignContent: "center",
  },
  exercises: {
    width: SCREEN_WIDTH * 0.55,
    justifyContent: "space-between",
    flexDirection: "row",
    lineHeight: 20,
  },
  soccer: {
    fontSize: 13,
    color: "#898989",
    marginRight: SCREEN_WIDTH * 0.09,
  },
  baseball: {
    fontSize: 13,
    color: "#898989",
    marginRight: SCREEN_WIDTH * 0.09,
  },
  basketball: {
    fontSize: 13,
    color: "#898989",
    marginRight: SCREEN_WIDTH * 0.09,
  },
});
