import { StatusBar } from "expo-status-bar";
import { useState } from "react";
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

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function Profile({ navigation }) {
  const [userId, setUserId] = useState(0);

  AsyncStorage.getItem("@id").then((userid) => setUserId(userid.slice(1, -1)));

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

  const opPressCreateFriend = async () => {
    var data = {
      user1_id: userId,
      user2_id: title,
    };
    try {
      console.log(data);
      const response = await axios
        .post(
          `http://${manifest.debuggerHost
            .split(":")
            .shift()}:8080/api/v1/friends`,
          data
        )
        .then(function async(response) {
          if (response.data["success"] == true) {
            alert("친구 신청이 완료되었습니다.");
            navigation.navigate("Profile");
          }
        })
        .catch(function (error) {
          alert("친구 신청 오류입니다.");
          //console.log(error.response.data);
          console.log(error);
          throw error;
        });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation}></Header>
      <View style={styles.body}>
        <View style={styles.back}>
          <AntDesign name="left" size={18} color="black" />
          <Text style={styles.backText}>프로필</Text>
        </View>
        <View style={styles.introContainer}>
          <View style={styles.circle}>
            <Image
              style={styles.profileImage}
              source={require("../icon/red_logo.png")}
            />
          </View>
          <View style={styles.idSideProfile}>
            <Text style={styles.username}>님의 프로필</Text>
            <View style={styles.sideProfile}>
              <TouchableOpacity onPress={() => navigation.navigate("Userinfo")}>
                <Text style={styles.sideProfileText}>회원정보보기</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("MyPage")}>
                <Text style={styles.sideProfileText}>활동내역확인</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <TouchableOpacity
          oonPress={() => {
            opPressCreateFriend();
          }}
        >
          <View style={styles.friendBtn}>
            <Text> 친구 신청 </Text>
          </View>
        </TouchableOpacity>
        <View style={styles.bigLine}></View>
        <View style={styles.genderContainer}>
          <Text style={styles.subject}> 성별 </Text>
          <Text style={styles.genderText}> 여자 </Text>
        </View>
        <View style={styles.bigLine}></View>
        <View style={styles.ageContainer}>
          <Text style={styles.subject}> 나이 </Text>
          <Text style={styles.ageText}> 23 </Text>
        </View>
        <View style={styles.bigLine}></View>
        {/* 운동 능력 부분 */}

        <View style={styles.exerciseContainer}>
          <View style={styles.exerciseTextContainer}>
            <Text style={styles.subject}>운동능력</Text>
          </View>
          {/* 축구 부분 */}
          <View style={styles.exercises}>
            <Text style={styles.soccer}>축구</Text>
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
          {/* 야구 부분 */}
          <View style={styles.exercises}>
            <Text style={styles.baseball}>야구</Text>
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
          {/* 배드민턴 부분 */}
          <View style={styles.exercises}>
            <Text style={styles.basketball}>농구</Text>
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
        <View style={styles.friendIcon}>
          <Image
            style={styles.friendLogo}
            source={require("../icon/friends.png")}
            width={40}
            height={40}
          />
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
  },
  back: {
    flexDirection: "row",
    marginRight: SCREEN_WIDTH * 0.7,
    marginTop: SCREEN_HEIGHT * 0.03,
    alignItems: "center",
  },
  backText: {
    fontSize: 18,
  },
  /* 프로필 친구 신청 버튼 윗부분 시작 */
  introContainer: {
    width: SCREEN_WIDTH * 0.8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    marginTop: SCREEN_HEIGHT * 0.03,
  },
  circle: {
    width: SCREEN_WIDTH * 0.25,
    height: SCREEN_WIDTH * 0.25,
    borderRadius: (SCREEN_WIDTH * 0.25) / 2,
    borderColor: "black",
    borderWidth: 2,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },
  profileImage: {
    resizeMode: "contain",
    width: SCREEN_WIDTH * 0.17,
    height: SCREEN_HEIGHT * 0.14,
  },
  idSideProfile: {
    width: SCREEN_WIDTH * 0.45,
    justifyContent: "space-around",
  },
  username: {
    fontSize: 18,
    alignSelf: "flex-end",
  },
  sideProfile: {
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  sideProfileText: {
    textDecorationLine: "underline",
    textDecorationColor: "black",
    fontSize: 12,
    fontWeight: "600",
  },
  /* 프로필 친구 신청 버튼 윗부분 끝 */
  friendBtn: {
    marginTop: SCREEN_HEIGHT * 0.03,
    marginBottom: SCREEN_HEIGHT * 0.03,
    backgroundColor: "#D3EEFF",
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
    alignItems: "center",
    paddingBottom: 8,
    paddingTop: 8,
    borderRadius: 100,
    width: SCREEN_WIDTH * 0.6,
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 2 },
    elevation: 3,
  },
  subject: {
    fontSize: 18,
    marginRight: SCREEN_WIDTH / 20,
    fontWeight: "700",
    width: 80,
  },
  genderContainer: {
    width: SCREEN_WIDTH * 0.66,
    flexDirection: "row",
    alignItems: "center",
    marginTop: SCREEN_HEIGHT * 0.03,
    marginBottom: SCREEN_HEIGHT * 0.03,
  },
  genderText: {
    fontSize: 18,
  },
  ageContainer: {
    width: SCREEN_WIDTH * 0.66,
    flexDirection: "row",
    alignItems: "center",
    marginTop: SCREEN_HEIGHT * 0.03,
    marginBottom: SCREEN_HEIGHT * 0.03,
  },
  ageText: {
    fontSize: 18,
  },
  exerciseContainer: {
    width: SCREEN_WIDTH * 0.66,
    marginTop: SCREEN_HEIGHT * 0.03,
  },
  exerciseTextContainer: {
    flexDirection: "row",
    fontWeight: "700",
    justifyContent: "space-between",

    marginBottom: SCREEN_HEIGHT * 0.03,
  },
  skillContainer: {
    justifyContent: "flex-end",
    flexDirection: "row",
    width: SCREEN_WIDTH * 0.5,
  },
  imageStyle: {
    alignContent: "center",
    justifyContent: "space-between",
    width: SCREEN_WIDTH * 0.1,
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
  exercises: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 10,
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
  friendIcon: {
    marginTop: SCREEN_HEIGHT * 0.01,
    marginBottom: SCREEN_HEIGHT * 0.03,
    marginLeft: SCREEN_WIDTH * 0.7,
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: "#D3EEFF",
    alignContent: "center",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
  },
  friendLogo: {
    resizeMode: "contain",
    height: SCREEN_HEIGHT * 0.025,
    width: SCREEN_WIDTH * 0.08,
    alignContent: "center",
  },
  bigLine: {
    width: SCREEN_WIDTH,
    height: 5,
    backgroundColor: "#E5E5E5",
  },
});
