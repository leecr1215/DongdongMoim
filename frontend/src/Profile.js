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

export default function Profile({ navigation }) {
  
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
            <AntDesign name="left" size={20} color="black" />
            <Text style={styles.backText}>프로필</Text>
          </View>
          <View style={styles.introContainer}>
            <View style={styles.circle}>
              <Image
                style={styles.profileImage}
                source={require("../icon/red_logo.png")}
              />
            </View>
            <Text style={styles.username}>님의 프로필</Text>

            <View style={styles.sideProfile}>
              <TouchableOpacity onPress={() => navigation.navigate("???")}>
                <Text style={styles.sideProfileText}>회원정보보기</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("???")}>
                <Text style={styles.sideProfileText}>활동내역확인</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.friendBtn}>
            <Text> 친구 신청 </Text>
          </View>
          <View style={styles.genderContainer}>
            <Text style={styles.subject}> 성별 </Text>
            <Text style={styles.genderText}> 여자 </Text>
          </View>

          <View style={styles.ageContainer}>
            <Text style={styles.subject}> 나이 </Text>
            <Text style={styles.ageText}> 23 </Text>
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
              <View style={styles.pressBtn}>
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
                <TouchableOpacity onPress={() => onPressSoccer("sole")}>
                  <Image
                    style={styles.logo}
                    source={require("../icon/sole.png")}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.pressBtn}>
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
            {/* 농구 부분 */}
            <View style={styles.exercises}>
              <Text style={styles.basketball}>농구</Text>
              <View style={styles.imageStyle}>
                <TouchableOpacity onPress={() => onPressSoccer("sole")}>
                  <Image
                    style={styles.logo}
                    source={require("../icon/sole.png")}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.pressBtn}>
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
          </View>
          <View style={styles.friendIcon}>
            <Image
              style={styles.logo}
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
      justifyContent: "center",
    },
    back: {
      flexDirection: "row",
      marginRight: SCREEN_WIDTH * 0.6,
      marginTop: SCREEN_HEIGHT*0.01,
    },
    backText: {
      fontSize: 20,
    },
    introContainer: {
      width: SCREEN_WIDTH * 0.8,
      flexDirection: "row",
      alignItems: "center",
    },
    circle: {
      width: SCREEN_WIDTH * 0.3,
      height: SCREEN_WIDTH * 0.3,
      marginTop: 10,
      borderRadius: (SCREEN_WIDTH * 0.3) / 2,
      borderColor: "black",
      borderWidth: 2,
      alignItems: "center",
      alignContent: "center",
      justifyContent: "center",
    },
    profileImage: {
      resizeMode: "contain",
      width: SCREEN_WIDTH * 0.2,
      height: SCREEN_HEIGHT * 0.13,
    },
    username: {
      left: SCREEN_WIDTH * 0.33,
      fontSize: 18,
      marginTop: 30,
      bottom: SCREEN_HEIGHT / 40,
    },
    sideProfile: {
      marginTop: 30,
      marginRight: SCREEN_WIDTH * 0.45,
      justifyContent: "flex-end",
      flexDirection: "row",
    },
    sideProfileText: {
      textDecorationLine: "underline",
      marginRight: 15,
      marginTop: 10,
    },
    friendBtn: {
      marginTop: 50,
      backgroundColor: "#D3EEFF",
      fontSize: 17,
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
      marginBottom: SCREEN_HEIGHT * 0.05,
    },
    subject: {
      fontSize: 20,
      marginRight: SCREEN_WIDTH / 20,
      lineHeight: 70,
      fontWeight: "700",
      width: 80,
    },
    genderContainer: {
      width: SCREEN_WIDTH * 0.55,
      justifyContent: "space-between",
      flexDirection: "row",
      alignItems: "center",
    },
    genderText: {
      fontSize: 20,
      lineHeight: 70,
    },
    ageContainer: {
      width: SCREEN_WIDTH * 0.55,
      justifyContent: "space-between",
      flexDirection: "row",
      alignItems: "center",
    },
    ageText: {
      fontSize: 20,
      lineHeight: 70,
    },
    exerciseContainer: { 
      width: SCREEN_WIDTH * 0.55 
    },
    exerciseTextContainer: {
      flexDirection: "row",
      fontWeight: "700",
      justifyContent: "space-between",
    },
    exerciseText: {
      fontSize: 20,
      marginRight: SCREEN_WIDTH / 6,
      marginTop: SCREEN_HEIGHT * 0.03,
      marginBottom: SCREEN_HEIGHT * 0.05,
    },

    skillContainer: {
      justifyContent: "flex-end",
      flexDirection: "row",
    },
    skillText: {
      fontSize: 20,
      marginRight: SCREEN_WIDTH / 3,
      lineHeight: 70,
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
    pressBtn: {
      borderColor: "#FBE573",
      borderWidth: 1,
      height: SCREEN_HEIGHT * 0.03,
      width: SCREEN_WIDTH * 0.08,
      marginLeft: SCREEN_WIDTH * 0.01,
    },
    exercises: { flexDirection: "row" },
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
      marginTop: SCREEN_HEIGHT * 0.03,
      marginBottom: SCREEN_HEIGHT * 0.03,
      marginLeft: SCREEN_WIDTH * 0.65,
      width: 70,
      height: 70,
      borderRadius: 50,
      backgroundColor: "#D3EEFF",
      alignContent: "center",
      alignItems: "center",
      display: "flex",
      justifyContent: "center",
    },
  });
  