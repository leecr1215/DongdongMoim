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
          </View>
          <View style={styles.back}>
            <AntDesign name="left" size={20} color="black" />
            <TouchableOpacity onPress={() => navigation.navigate("???")}>
              <Text style={styles.backText}>활동 내역 확인</Text>
            </TouchableOpacity>
          </View>
                <View style={styles.circle}>
                  <Image style={styles.profileImage} source={require("../icon/red_logo.png")} />
                </View>
                <Text style={styles.username}>님 안녕하세요</Text>
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
        flex: 0.5,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#D3EEFF",
        width: SCREEN_WIDTH,
    },
    circle : {
        //position: "relative",
        width : SCREEN_WIDTH * 0.3,
        borderRadius: 60,
        borderColor: "black",
        borderWidth:2,
        alignItems: "center",
        alignContent: "center",
        left: -SCREEN_WIDTH*0.23, 
        top: SCREEN_HEIGHT*0.06
    },
    profileImage: {
      resizeMode: "contain",
      width: SCREEN_WIDTH * 0.2,
      height: SCREEN_HEIGHT * 0.13
    },
    username:{
        left: SCREEN_WIDTH*0.33,
        fontSize: 18,
        bottom: SCREEN_HEIGHT/40
    },
    friendIcon: {
        marginTop: SCREEN_HEIGHT*0.05,
        marginLeft : SCREEN_WIDTH*0.65,
        width:70,
        height:70,
        borderRadius:50,
        backgroundColor:"#D3EEFF",
        alignContent:"center",
        alignItems:"center",
        display: "flex",
        justifyContent: "center"
      },
      back : {
        flexDirection : "row",
        marginRight : SCREEN_WIDTH*0.6,
        marginTop : SCREEN_HEIGHT*0.02,
      },
      backText: {
        fontSize:20
      }
  });
  