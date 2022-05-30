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


export default function AlarmPage({ navigation }) {
  
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
          <View style={styles.post}>
            <Text style={styles.date}>22/05/30</Text>
            <Text style={styles.title}>"같이 배드민턴 치실 분" 게시글에 대한 인원이 모두 모집되었어요!</Text>
            <View style={styles.bigLine}></View>
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
      backgroundColor: "white",
      width: SCREEN_WIDTH * 0.8
    },
    post:{
      width: SCREEN_WIDTH * 0.8,
      flexDirection: "column",
      marginTop: SCREEN_HEIGHT * 0.02
    },
    date: {
      fontSize:14,
      lineHeight: 15,
      marginLeft: SCREEN_WIDTH * 0.6
    },
    title:{
      fontSize:16,
      lineHeight:25,
      fontWeight: "700",
      width: SCREEN_WIDTH*0.8,
    },
    bigLine: {
      width: SCREEN_WIDTH * 0.8,
      height: 2,
      backgroundColor: "#E5E5E5",
      marginTop: SCREEN_HEIGHT*0.01
    },
  });
  