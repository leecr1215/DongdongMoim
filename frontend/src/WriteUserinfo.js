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
  Button
} from "react-native";
import { Image } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from '@expo/vector-icons'; 

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function WriteUserinfo({ navigation }) {
  const [gender, setGender] = useState("M");
  const [phoneNum, setPhoneNum] = useState("");
  const [age, setAge] = useState("");
  const [soccer, setSoccer] = useState(1);
  const [baseball, setBaseball] = useState(1);
  const [basketball, setBasketball] = useState(1);

  const [isGenderSelect, setGenderSelect] = useState([true, false]);

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

  const onPressGender = async (gender) => {
    if (gender === "남") {
      setGender("M");
      setGenderSelect([true, false]);
    } else if (gender === "여") {
      setGender("F");
      setGenderSelect([false, true]);
    }
  };

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
    return (
      <View style={styles.container}>
        <View style={styles.head}>
          <View style={styles.homeIcons}>
            <Image
              style={styles.homeLogo}
              source={require("../icon/home.png")}
            />
            <View style={styles.homeLogo2}></View>
          </View>
          <View>
            <Text style={styles.title}> 동동모임 </Text>
          </View>
          <View style={styles.icons}>
            <Image
              style={styles.bellLogo}
              source={require("../icon/bell.png")}
            />
            <Image
              style={styles.myPageLogo}
              source={require("../icon/mypage.png")}
            />
          </View>
        </View>
        <View style={styles.body}>
          <View style={styles.back}>
            <TouchableOpacity>
              <AntDesign name="left" size={20} color="black" />
            </TouchableOpacity>
            <Text style={styles.backText}>회원정보 수정</Text>
          </View>
          <View style={styles.introContainer}>
            <Text style={styles.username}>님의 회원정보</Text>
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
                placeholder="00"
                keyboardType="numeric"
                maxLength={3}
              />
              <Text>세</Text>
            </View>

            <View style={styles.phoneContainer}>
              <Text style={styles.phoneText}>전화번호</Text>
              <TextInput
                style={styles.phoneInput}
                onChangeText={setPhoneNum}
                value={phoneNum}
                placeholder="010-0000-0000"
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
        flex: 0.13,
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#D3EEFF",
        width: SCREEN_WIDTH,
        flexDirection: "row"
    },
    homeIcons : {
        justifyContent:"flex",
        flexDirection:"row",
        marginTop : SCREEN_HEIGHT*0.04,
        marginRight : 10
  
      },
      title: {
        fontSize:20,
        marginTop : SCREEN_HEIGHT*0.04,
        alignContent : "center",
        marginLeft: SCREEN_WIDTH*0.05,
        marginRight: SCREEN_WIDTH*0.05,
      },
      homeLogo : {
        resizeMode: "contain",
        width: SCREEN_WIDTH * 0.07,
        height: SCREEN_HEIGHT * 0.13,
      },
      homeLogo2 : {
        resizeMode: "contain",
        width: SCREEN_WIDTH * 0.07,
        height: SCREEN_HEIGHT * 0.13,
  
      },
      bellLogo : {
        resizeMode: "contain",
        width: SCREEN_WIDTH * 0.07,
        height: SCREEN_HEIGHT * 0.13,
        marginRight : 10
      },
      icons : {
        justifyContent:"flex",
        flexDirection:"row",
        marginTop : SCREEN_HEIGHT*0.04,
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
        width: SCREEN_WIDTH
    },
    back:{
        flexDirection:"row",
        marginRight: SCREEN_WIDTH*0.6,
    },
    backText:{
        fontSize: 20,
    },
    introContainer: {
        width: SCREEN_WIDTH*0.75,
        marginTop: SCREEN_HEIGHT*0.04,
        justifyContent: "space-between"
    },
    username:{
        fontSize: 23,
        fontWeight: "700",
        marginBottom: SCREEN_HEIGHT*0.03
    },
    info :{
        backgroundColor: "white",
        width: SCREEN_WIDTH*0.8,
        height: SCREEN_HEIGHT*0.55,
        borderRadius: 30,
        //paddingLeft: SCREEN_WIDTH*0.05,
        //paddingTop: SCREEN_HEIGHT*0.03,
        //paddingBottom: SCREEN_HEIGHT*0.05,
        alignItems: "center",
        marginBottom: SCREEN_HEIGHT*0.05
    },
    subject:{
        fontSize:20,
        lineHeight:70,
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
      width: SCREEN_WIDTH * 0.3,
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
  
    signUpBtn: {
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
      marginBottom: SCREEN_HEIGHT*0.05
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
  