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
            <TouchableOpacity onPress={() => navigation.navigate("???")}>
              <Text style={styles.backText}>활동 내역 확인</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.introContainer}>
            <View style={styles.circle}>
              <Image
                style={styles.profileImage}
                source={require("../icon/red_logo.png")}
              />
            </View>
            <Text style={styles.username}>님 안녕하세요</Text>
          </View>
          <View style={styles.bigLine}></View>
          <View style={styles.contentContainer}>
            <Text style={styles.subject}>내가 올린 게시글</Text>
            <View style={styles.listContainer}>
              <View style={styles.listHeader}>
                <Text>글 번호</Text>
                <Text>제목</Text>
                <Text>신청인원</Text>
              </View>
              <View style={styles.smallLine}></View>
              <View style={styles.uploadPostList}>
                <View style={styles.post}>
                  <Text>349</Text>
                  <Text>배드민턴어쩌구</Text>
                  <Text>1/5</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.bigLine}></View>
          <View style={styles.contentContainer}>
            <Text style={styles.subject}>신청한 운동내역</Text>
            <View style={styles.listContainer}>
              <View style={styles.listHeader}>
                <Text>글 번호</Text>
                <Text>제목</Text>
                <Text>취소</Text>
              </View>
              <View style={styles.smallLine}></View>
              <View style={styles.applyExerciseList}>
                <View style={styles.post}>
                  <Text>349</Text>
                  <Text>배드민턴 어쩌구</Text>
                  <View style={styles.btn}>
                    <Text>취소</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.bigLine}></View>
          <View style={styles.contentContainer}>
            <Text style={styles.subject}>친구 요청 내역</Text>
            <View style={styles.listContainer}>
              <View style={styles.listHeader}>
                <Text>닉네임</Text>
              </View>
              <View style={styles.smallLine}></View>
              <View style={styles.friendsList}>
              <View style={styles.post}>
                  <Text>jupyter</Text>
                  <View style={styles.btn}>
                    <Text>수락</Text>
                  </View>
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
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: "white",
      width: SCREEN_WIDTH,
    },
    introContainer: {
      width: SCREEN_WIDTH * 0.8,
      justifyContent: "space-between",
      flexDirection: "row",
      marginTop: SCREEN_HEIGHT * 0.03,
      marginBottom: SCREEN_HEIGHT * 0.03
    },
    circle: {
      //position: "relative",
      width: SCREEN_WIDTH * 0.3,
      borderRadius: 60,
      borderColor: "black",
      borderWidth: 2,
      alignItems: "center",
      alignContent: "center",
      //left: -SCREEN_WIDTH * 0.23,
      //top: SCREEN_HEIGHT * 0.06,
    },
    profileImage: {
      resizeMode: "contain",
      width: SCREEN_WIDTH * 0.2,
      height: SCREEN_HEIGHT * 0.13,
    },
    username: {
      //left: SCREEN_WIDTH * 0.33,
      fontSize: 18,
      marginTop: SCREEN_HEIGHT * 0.05
      //bottom: SCREEN_HEIGHT / 40,
    },
    friendIcon: {
      marginTop: SCREEN_HEIGHT * 0.05,
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
    back: {
      flexDirection: "row",
      marginRight: SCREEN_WIDTH * 0.6,
      marginTop: SCREEN_HEIGHT * 0.02,
    },
    backText: {
      fontSize: 20,
    },
    bigLine: {
      width: SCREEN_WIDTH * 0.9,
      height: 2,
      backgroundColor: "#E5E5E5"
    },
    smallLine: {
      width: SCREEN_WIDTH * 0.7,
      height: 1,
      backgroundColor: "#E5E5E5"
    },
    subject:{
      fontSize:20,
      lineHeight:70,
      fontWeight: "700",
      justifyContent: "flex-start",
      width: SCREEN_WIDTH*0.9,
    },
    listHeader: {
      width: SCREEN_WIDTH * 0.7,
      justifyContent: "space-between",
      flexDirection: "row"
    },
    listContainer: {
      alignItems: "center",
      justifyContent: "center",
      marginBottom: SCREEN_HEIGHT * 0.03
    },
    uploadPostList: {
      width: SCREEN_WIDTH * 0.7,
      justifyContent: "space-between",
      flexDirection: "row"
    },
    applyExerciseList: {
      width: SCREEN_WIDTH * 0.7,
      justifyContent: "space-between",
      flexDirection: "row"
    },
    friendsList: {
      width: SCREEN_WIDTH * 0.7,
      justifyContent: "space-between",
      flexDirection: "row"
    },
    post:{
      width: SCREEN_WIDTH * 0.7,
      justifyContent: "space-between",
      flexDirection: "row"
    },
    btn: {
      backgroundColor: "#D3EEFF",
      fontSize: 10,
      textAlign: "center",
      alignItems: "center",
      borderRadius: 100,
      width: 40,
      shadowColor: "#000000",
      shadowOpacity: 0.3,
      shadowOffset: { width: 2, height: 2 },
      elevation: 3,
    }
  });
  