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
import { useIsFocused } from "@react-navigation/native";

const { manifest } = Constants;

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function Userinfo({ navigation }) {
  const isFocused = useIsFocused();
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [soccer, setSoccer] = useState(1);
  const [baseball, setBaseball] = useState(1);
  const [basketball, setBasketball] = useState(1);
  const [isSoccerSelect, setSoccerSelect] = useState([
    false,
    false,
    false,
    false,
  ]);
  const [isBaseballSelect, setBaseballSelect] = useState([
    false,
    false,
    false,
    false,
  ]);
  const [isBasketballSelect, setBasketballSelect] = useState([
    false,
    false,
    false,
    false,
  ]);
  const [userData, setUserData] = useState("");

  const setData = async (data) => {
    try {
      await setUserData(data);
    } catch (e) {
      console.log(e);
    }
  };

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
  }, [isFocused]);

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
              setData(data);
              getSoccerSkill(data["soccer_skill"]);
              getBaseballSkill(data["baseball_skill"]);
              getBasketballSkill(data["basketball_skill"]);
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
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <Header navigation={navigation}></Header>
      <View style={styles.body}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Profile", {
              userId: id,
            })
          }
        >
          <View style={styles.back}>
            <AntDesign name="left" size={20} color="black" />
            <Text style={styles.backText}>???????????? ??????</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.introContainer}>
          <Text style={styles.username}>
            {userData["username"]}?????? ????????????
          </Text>
          <View style={styles.modifyinfo}>
            <Image
              style={styles.pencil}
              source={require("../icon/pencil.png")}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate("WriteUserinfo")}
            >
              <Text style={styles.modifyinfoText}>??????</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.info}>
          <View style={styles.genderContainer}>
            <Text style={styles.subject}> ?????? </Text>
            <Text style={styles.genderText}>
              {" "}
              {userData["gender"] == "F"
                ? "??????"
                : userData["gender"] == "M"
                ? "??????"
                : "??????"}{" "}
            </Text>
          </View>

          <View style={styles.ageContainer}>
            <Text style={styles.subject}> ?????? </Text>
            <Text style={styles.ageText}> {userData["age"]} </Text>
          </View>

          <View style={styles.phoneNumContainer}>
            <Text style={styles.subject}> ??????????????? ID </Text>
            <Text style={styles.phoneNumText}>{userData["phone_number"]}</Text>
          </View>

          {/* ?????? ?????? ?????? */}
          <View style={styles.exerciseTextContainer}>
            <Text style={styles.subject}>????????????</Text>
            <Text style={styles.phoneNumText}></Text>
          </View>
          <View style={styles.exerciseContainer}>
            {/* ?????? ?????? */}
            <View style={styles.exercises}>
              <Text style={styles.soccer}>??????</Text>
              <View style={styles.imageStyle}>
                <Image
                  style={isSoccerSelect[0] ? styles.pressBtn : styles.logo}
                  source={require("../icon/sole.png")}
                />
              </View>
              <View style={styles.imageStyle}>
                <Image
                  style={isSoccerSelect[1] ? styles.pressBtn : styles.logo}
                  source={require("../icon/sock.png")}
                />
              </View>
              <View style={styles.imageStyle}>
                <Image
                  style={isSoccerSelect[2] ? styles.pressBtn : styles.logo}
                  source={require("../icon/slipper.png")}
                />
              </View>
              <View style={styles.imageStyle}>
                <Image
                  style={isSoccerSelect[3] ? styles.pressBtn : styles.logo}
                  source={require("../icon/sneaker.png")}
                />
              </View>
            </View>
            {/* ?????? ?????? */}
            <View style={styles.exercises}>
              <Text style={styles.baseball}>??????</Text>
              <View style={styles.imageStyle}>
                <Image
                  style={isBaseballSelect[0] ? styles.pressBtn : styles.logo}
                  source={require("../icon/sole.png")}
                />
              </View>
              <View style={styles.imageStyle}>
                <Image
                  style={isBaseballSelect[1] ? styles.pressBtn : styles.logo}
                  source={require("../icon/sock.png")}
                />
              </View>
              <View style={styles.imageStyle}>
                <Image
                  style={isBaseballSelect[2] ? styles.pressBtn : styles.logo}
                  source={require("../icon/slipper.png")}
                />
              </View>
              <View style={styles.imageStyle}>
                <Image
                  style={isBaseballSelect[3] ? styles.pressBtn : styles.logo}
                  source={require("../icon/sneaker.png")}
                />
              </View>
            </View>

            {/* ???????????? ?????? */}
            <View style={styles.exercises}>
              <Text style={styles.basketball}>??????</Text>
              <View style={styles.imageStyle}>
                <Image
                  style={isBasketballSelect[0] ? styles.pressBtn : styles.logo}
                  source={require("../icon/sole.png")}
                />
              </View>
              <View style={styles.imageStyle}>
                <Image
                  style={isBasketballSelect[1] ? styles.pressBtn : styles.logo}
                  source={require("../icon/sock.png")}
                />
              </View>
              <View style={styles.imageStyle}>
                <Image
                  style={isBasketballSelect[2] ? styles.pressBtn : styles.logo}
                  source={require("../icon/slipper.png")}
                />
              </View>
              <View style={styles.imageStyle}>
                <Image
                  style={isBasketballSelect[3] ? styles.pressBtn : styles.logo}
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
    marginTop: SCREEN_HEIGHT * 0.03,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
  },
  username: {
    fontSize: 22,
    fontWeight: "700",
    alignSelf: "center",
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
    marginTop: SCREEN_HEIGHT * 0.03,
    //paddingLeft: SCREEN_WIDTH*0.05,
    paddingTop: SCREEN_HEIGHT * 0.03,
    //paddingBottom: SCREEN_HEIGHT*0.05,
    alignItems: "center",
  },
  subject: {
    fontSize: 18,
    lineHeight: 70,
    fontWeight: "700",
    width: "auto",
  },
  genderContainer: {
    width: SCREEN_WIDTH * 0.65,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  genderText: {
    fontSize: 18,
    lineHeight: 70,
  },
  ageContainer: {
    width: SCREEN_WIDTH * 0.65,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  ageText: {
    fontSize: 18,
    lineHeight: 70,
  },
  phoneNumContainer: {
    width: SCREEN_WIDTH * 0.65,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  phoneNumText: {
    fontSize: 18,
    lineHeight: 70,
  },
  exerciseContainer: {
    width: SCREEN_WIDTH * 0.65,
    alignItems: "center",
  },
  exerciseTextContainer: {
    width: SCREEN_WIDTH * 0.65,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 5,
  },
  exerciseText: {
    fontSize: 18,
    //marginTop:SCREEN_HEIGHT*0.03,
    //marginBottom:SCREEN_HEIGHT*0.05
  },
  imageStyle: {
    alignContent: "center",
    marginLeft: SCREEN_WIDTH * 0.01,
  },
  pressBtn: {
    resizeMode: "contain",
    height: SCREEN_HEIGHT * 0.025,
    width: SCREEN_WIDTH * 0.08,
    alignContent: "center",
    borderColor: "#ffd700",
    borderWidth: 1.6,
  },
  logo: {
    resizeMode: "contain",
    height: SCREEN_HEIGHT * 0.025,
    width: SCREEN_WIDTH * 0.08,
    alignContent: "center",
    borderColor: "#898989",
    borderWidth: 1,
  },
  exercises: {
    width: SCREEN_WIDTH * 0.55,
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: SCREEN_HEIGHT * 0.02,
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
