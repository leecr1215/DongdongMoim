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
  ScrollView,
} from "react-native";
import { Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Header from "../contents/Header";
import Constants from "expo-constants";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { manifest } = Constants;
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function Profile({ navigation }) {
  const isFocused = useIsFocused();
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [postData, setPostData] = useState(null);
  useEffect(() => {
    try {
      async function getUsers() {
        await AsyncStorage.getItem("@id").then((userid) => {
          setId(userid.slice(1, -1));
        });
        await AsyncStorage.getItem("@username").then((username) => {
          setName(username.slice(1, -1));
        });
      }
      getUsers();
    } catch (e) {
      throw e;
    }
  }, [isFocused]);

  useEffect(() => {
    try{
      const response = await axios
          .get(
            `http://${manifest.debuggerHost
              .split(":")
              .shift()}:8080/api/v1/posts/all`
          )
          .then((response) => {
            if (response.data["success"] == true) {
              const data = response.data["data"];
              setData(data);
            }
          })
          .catch(function (error) {
            alert("게시물을 가져오지 못 했습니다.");
            console.log(error);
            throw error;
          });
    } catch (error) {
      throw error;
    }
  }, []);

  return (
    <View style={styles.container}>
      <Header navigation={navigation}></Header>
      <View style={styles.body}>
        <View style={styles.back}>
          <TouchableOpacity onPress={() => navigation.pop()}>
            <AntDesign name="left" size={18} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.pop()}>
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
          <Text style={styles.username}>{name}님 안녕하세요</Text>
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
            <ScrollView style={styles.scrollView}>
              <View style={styles.uploadPostList}>
                <View style={styles.post}>
                  <Text>349</Text>
                  <Text>배드민턴어쩌구</Text>
                  <Text>1/5</Text>
                </View>
                <View style={styles.smallLine}></View>
                <View style={styles.post}>
                  <Text>350</Text>
                  <Text>어쩌구</Text>
                  <Text>1/5</Text>
                </View>
                <View style={styles.smallLine}></View>
                <View style={styles.post}>
                  <Text>351</Text>
                  <Text>어쩌구</Text>
                  <Text>1/5</Text>
                </View>
                <View style={styles.smallLine}></View>
                <View style={styles.post}>
                  <Text>352</Text>
                  <Text>어쩌구</Text>
                  <Text>1/5</Text>
                </View>
                <View style={styles.smallLine}></View>
              </View>
            </ScrollView>
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
            <ScrollView style={styles.scrollView}>
              <View style={styles.applyExerciseList}>
                <View style={styles.post}>
                  <Text>349</Text>
                  <Text>배드민턴 어쩌구</Text>
                  <View style={styles.btn}>
                    <Text>취소</Text>
                  </View>
                </View>
                <View style={styles.smallLine}></View>
                <View style={styles.post}>
                  <Text>350</Text>
                  <Text>농구 어쩌구</Text>
                  <View style={styles.btn}>
                    <Text>취소</Text>
                  </View>
                </View>
                <View style={styles.smallLine}></View>
              </View>
            </ScrollView>
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
            <ScrollView style={styles.scrollView}>
              <View style={styles.friendsList}>
                <View style={styles.post}>
                  <Text>jupyter</Text>
                  <View style={styles.btn}>
                    <Text>수락</Text>
                  </View>
                </View>
                <View style={styles.smallLine}></View>
                <View style={styles.post}>
                  <Text>hub</Text>
                  <View style={styles.btn}>
                    <Text>수락</Text>
                  </View>
                </View>
                <View style={styles.smallLine}></View>
              </View>
            </ScrollView>
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
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    width: SCREEN_WIDTH,
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
  introContainer: {
    width: SCREEN_WIDTH * 0.8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    marginTop: SCREEN_HEIGHT * 0.03,
    marginBottom: SCREEN_WIDTH * 0.03,
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
  username: {
    //left: SCREEN_WIDTH * 0.33,
    fontSize: 18,
    marginTop: SCREEN_HEIGHT * 0.05,
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
  bigLine: {
    width: SCREEN_WIDTH * 0.9,
    height: 2,
    backgroundColor: "#E5E5E5",
  },
  smallLine: {
    width: SCREEN_WIDTH * 0.7,
    height: 1,
    backgroundColor: "#E5E5E5",
  },
  subject: {
    fontSize: 20,
    lineHeight: 50,
    fontWeight: "700",
    justifyContent: "flex-start",
    width: SCREEN_WIDTH * 0.9,
  },
  listHeader: {
    width: SCREEN_WIDTH * 0.7,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  listContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SCREEN_HEIGHT * 0.01,
    height: SCREEN_HEIGHT * 0.13,
  },
  uploadPostList: {
    width: SCREEN_WIDTH * 0.7,
    justifyContent: "space-between",
  },
  applyExerciseList: {
    width: SCREEN_WIDTH * 0.7,
    justifyContent: "space-between",
  },
  friendsList: {
    width: SCREEN_WIDTH * 0.7,
    justifyContent: "space-between",
  },
  post: {
    width: SCREEN_WIDTH * 0.7,
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: SCREEN_HEIGHT * 0.005,
    marginBottom: SCREEN_HEIGHT * 0.005,
  },
  btn: {
    backgroundColor: "#D3EEFF",
    fontSize: 9,
    textAlign: "center",
    alignItems: "center",
    borderRadius: 100,
    width: 35,
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 1, height: 1 },
    elevation: 3,
    marginRight: 3,
  },
  scrollView: {
    backgroundColor: "#FFFFFF",
    marginVertical: 2,
  },
});
