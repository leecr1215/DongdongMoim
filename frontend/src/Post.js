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

export default function Post({ navigation }) {
  
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
          
          <View style={styles.postContainer}>
            <View style={styles.postHeader}>
                <Text style={styles.postHeaderText}> 게시물 등록 </Text>
            </View>
            <Image
                    style={styles.x}
                    source={require("../icon/x.png")}
            />  
            <View style={styles.postContent}></View>
     
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
        justifyContent: "center",
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
    postContainer :{
        backgroundColor: "white",
        width: SCREEN_WIDTH*0.8,
        height: SCREEN_HEIGHT*0.8,
        borderRadius: 30,
        //paddingLeft: SCREEN_WIDTH*0.05,
        //paddingTop: SCREEN_HEIGHT*0.03,
        //paddingBottom: SCREEN_HEIGHT*0.05,
        alignItems: "center"
    },
    subject:{
        fontSize:20,
        lineHeight:70,
        fontWeight: "700"
    },
    postHeader:{
        flexDirection:"row",
        padding:20
    },
    postHeaderText:{
        fontSize:20,
    },
   
    x: {
        resizeMode: "contain",
        height: SCREEN_HEIGHT * 0.025,
        width: SCREEN_WIDTH * 0.08,
        marginLeft: SCREEN_WIDTH*0.6,
        marginTop: -SCREEN_HEIGHT*0.05
    },
    postContent : {
        
    }
    
  });
  