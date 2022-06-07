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
  ScrollView,
} from "react-native";
import { Image } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";
import Header from "../contents/Header";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function Post({ navigation }) {
  const [comments, setComments] = useState("");
  return (
    <View style={styles.container}>
      <Header navigation={navigation}></Header>
      <View style={styles.body}>
        <View style={styles.back}>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <AntDesign name="left" size={20} color="black" />
          </TouchableOpacity>
          <Text style={styles.backText}>게시물</Text>
        </View>
        <View style={styles.info}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>배드민턴 같이 치실분 구해요</Text>
            <View style={styles.peopleContainer}>
              <Image
                style={styles.post_peopleLogo}
                source={require("../icon/post_people.png")}
              />
              <Text style={styles.peopleText}>1/5</Text>
            </View>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.subject}>운동</Text>
            <Text style={styles.content}>배드민턴</Text>
          </View>
          <View style={styles.smallLine}></View>
          <View style={styles.contentContainer}>
            <Text style={styles.subject}>능력</Text>
            <Text style={styles.content}>능력무관</Text>
          </View>
          <View style={styles.smallLine}></View>
          <View style={styles.contentContainer}>
            <Text style={styles.subject}> 성별 </Text>
            <Text style={styles.content}> 여자 </Text>
          </View>
          <View style={styles.smallLine}></View>
          <View style={styles.contentContainer}>
            <Text style={styles.subject}> 장소 </Text>
            <Text style={styles.content}> 대전광역시 유성구 </Text>
          </View>
          <View style={styles.smallLine}></View>
          <View style={styles.contentContainer}>
            <Text style={styles.subject}> 일시 </Text>
            <Text style={styles.content}> 2022/04/15 18:00:00 </Text>
          </View>
          <View style={styles.smallLine}></View>
          <View style={styles.writing}>
            <Text style={styles.content}>
              {" "}
              같이 배드민턴 쳐주실 분 구해요! 배드민턴 못치셔도 괜찮아요!{" "}
            </Text>
          </View>
        </View>
        <View style={styles.applyBtn}>
          <Text style={styles.btnText}>신청</Text>
        </View>
        <View style={styles.bigLine}></View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={setComments}
            value={comments}
            placeholder="댓글을 입력하세요"
          />
          <View style={styles.confirmBtn}>
            <Text style={styles.confirmBtnText}>등록</Text>
          </View>
        </View>
        <ScrollView style={styles.scrollView}>
          <View style={styles.commentsListContainer}>
            <View style={styles.commentsContainer}>
              <Text style={styles.commentsName}>song2</Text>
              <Text style={styles.commentsContent}>같이 치고싶어요~</Text>
              <View style={styles.smallLine}></View>
            </View>
            <View style={styles.commentsContainer}>
              <Text style={styles.commentsName}>chem</Text>
              <Text style={styles.commentsContent}>저두요</Text>
              <View style={styles.smallLine}></View>
            </View>
            <View style={styles.commentsContainer}>
              <Text style={styles.commentsName}>future</Text>
              <Text style={styles.commentsContent}>저두요</Text>
              <View style={styles.smallLine}></View>
            </View>
          </View>
        </ScrollView>
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
    flex: 0.87,
    alignItems: "center",
    backgroundColor: "#E5E5E5",
    width: SCREEN_WIDTH,
  },
  back: {
    flexDirection: "row",
    marginRight: SCREEN_WIDTH * 0.7,
  },
  backText: {
    fontSize: 18,
  },
  info: {
    backgroundColor: "white",
    width: SCREEN_WIDTH * 0.9,
    paddingBottom: SCREEN_HEIGHT * 0.03,
    borderRadius: 20,
    alignItems: "center",
    marginTop: SCREEN_HEIGHT * 0.03,
    marginBottom: SCREEN_HEIGHT * 0.01,
  },
  titleContainer: {
    width: SCREEN_WIDTH * 0.7,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginTop: SCREEN_HEIGHT * 0.01,
    marginBottom: SCREEN_HEIGHT * 0.01,
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
  },
  peopleContainer: {
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  post_peopleLogo: {
    resizeMode: "contain",
    width: SCREEN_WIDTH * 0.05,
    height: SCREEN_HEIGHT * 0.02,
  },
  peopleText: {
    fontSize: 10,
  },
  contentContainer: {
    width: SCREEN_WIDTH * 0.65,
    flexDirection: "row",
    alignItems: "center",
  },
  subject: {
    fontSize: 15,
    lineHeight: 30,
    fontWeight: "700",
    width: 80,
  },
  writing: {
    width: SCREEN_WIDTH * 0.5,
    alignItems: "center",
    marginTop: SCREEN_HEIGHT * 0.03,
  },
  bigLine: {
    width: SCREEN_WIDTH,
    height: 3,
    backgroundColor: "#DFDFDF",
  },
  smallLine: {
    width: SCREEN_WIDTH * 0.9,
    height: 1,
    backgroundColor: "#E5E5E5",
    marginBottom: SCREEN_HEIGHT * 0.01,
    marginTop: SCREEN_HEIGHT * 0.01,
  },
  applyBtn: {
    backgroundColor: "#D3EEFF",
    textAlign: "center",
    alignItems: "center",
    borderRadius: 100,
    width: 90,
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 2 },
    elevation: 3,
    marginBottom: SCREEN_HEIGHT * 0.01,
  },
  btnText: {
    fontSize: 18,
    lineHeight: 40,
  },
  inputContainer: {
    width: SCREEN_WIDTH * 0.9,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    marginTop: SCREEN_HEIGHT * 0.01,
    marginBottom: SCREEN_HEIGHT * 0.01,
    width: SCREEN_WIDTH * 0.65,
    height: SCREEN_HEIGHT * 0.03,
    borderColor: "#9C9C9C",
    fontSize: 15,
    backgroundColor: "white",
  },
  confirmBtn: {
    backgroundColor: "#D3EEFF",
    textAlign: "center",
    alignItems: "center",
    borderRadius: 10,
    width: 60,
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 2 },
    elevation: 3,
    marginTop: SCREEN_HEIGHT * 0.01,
    marginBottom: SCREEN_HEIGHT * 0.01,
  },
  confirmBtnText: {
    fontSize: 15,
    lineHeight: 30,
  },
  commentsListContainer: {
    width: SCREEN_WIDTH * 0.9,
    //borderWidth: 3,
    //borderColor: "#DFDFDF",
    backgroundColor: "white",
    //height: SCREEN_HEIGHT * 0.18,
    alignItems: "center",
  },
  commentsContainer: {
    flexDirection: "column",
    width: SCREEN_WIDTH * 0.88,
    marginTop: SCREEN_HEIGHT * 0.01,
  },
  commentsName: {
    fontSize: 13,
    fontWeight: "700",
    color: "#ABA8A8",
  },
  commentsContent: {
    fontSize: 15,
    fontWeight: "500",
  },
  scrollView: {
    backgroundColor: "#FFFFFF",
    marginVertical: 20,
  },
});
