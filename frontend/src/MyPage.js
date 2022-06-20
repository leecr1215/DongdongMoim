import { StatusBar } from "expo-status-bar";
import { cloneElement, useEffect, useState } from "react";
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
import axios from "axios";

const { manifest } = Constants;
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function Profile({ navigation }) {
  const isFocused = useIsFocused();
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [postData, setPostData] = useState(null);
  const [postCheck, setPostCheck] = useState(false);
  const [exerciseData, setExerciseData] = useState(null);
  const [exerciseCheck, setExerciseCheck] = useState(false);
  const [friendsData, setFriendsData] = useState(null);
  const [friendsCheck, setFriendsCheck] = useState(false);

  const onPressCancelBtn = async (post_id) => {
    try {
      const response = await axios
        .delete(
          `http://${manifest.debuggerHost
            .split(":")
            .shift()}:8080/api/v1/posts/${post_id}/applicants/${id}`
        )
        .then((response) => {
          if (response.data["success"] == true) {
            alert("신청취소되었습니다.");
            navigation.replace("MyPage");
          } else {
            alert("신청 취소 안됨");
          }
        })
        .catch(function (error) {
          throw error;
        });
    } catch (error) {
      throw error;
    }
  };

  const onPressConfirmBtn = async (your_id) => {
    try {
      const response = await axios
        .put(
          `http://${manifest.debuggerHost
            .split(":")
            .shift()}:8080/api/v1/friends/${id}/${your_id}`
        )
        .then(function (response) {
          if (response.data["success"] == true) {
            alert("친구가 되었습니다.");
            navigation.replace("MyPage");
          } else {
            alert("친구 실패");
          }
        })
        .catch(function (error) {
          throw error;
        });
    } catch (error) {
      throw error;
    }
  };

  const onPressDeleteBtn = async (your_id) => {
    try {
      const response = await axios
        .delete(
          `http://${manifest.debuggerHost
            .split(":")
            .shift()}:8080/api/v1/friends/${id}/${your_id}`
        )
        .then(function (response) {
          //alert("lego");
          if (response.data["success"] == true) {
            alert("친구가 삭제되었습니다.");
            navigation.replace("MyPage");
          } else {
            alert("친구 삭제 실패");
          }
        })
        .catch(function (error) {
          throw error;
        });
    } catch (error) {
      throw error;
    }
  };

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
  }, []);

  useEffect(() => {
    async function getPost() {
      try {
        const response = await axios
          .get(
            `http://${manifest.debuggerHost
              .split(":")
              .shift()}:8080/api/v2/posts/${id}`
          )
          .then((response) => {
            if (response.data["success"] == true) {
              const data = response.data["data"];
              setPostData(data);
              setPostCheck(true);
            }
          })
          .catch(function (error) {
            //alert("게시물을 가져오지 못 했습니다.");
            //throw error;
          });
      } catch (error) {
        throw error;
      }
    }
    getPost();
  }, [id, setPostData]);

  useEffect(() => {
    async function getExercise() {
      try {
        const response = await axios
          .get(
            `http://${manifest.debuggerHost
              .split(":")
              .shift()}:8080/api/v1/posts/applicants/${id}`
          )
          .then((response) => {
            if (response.data["success"] == true) {
              const data = response.data["result"];
              console.log(data);
              setExerciseData(data);
              setExerciseCheck(true);
            }
          })
          .catch(function (error) {
            //alert("게시물을 가져오지 못 했습니다.");
            //throw error;
          });
      } catch (error) {
        throw error;
      }
    }
    getExercise();
  }, [id, setExerciseData]);

  useEffect(() => {
    async function getFriends() {
      try {
        const response = await axios
          .get(
            `http://${manifest.debuggerHost
              .split(":")
              .shift()}:8080/api/v1/friends/application/${id}`
          )
          .then((response) => {
            if (response.data["success"] == true) {
              const data = response.data["result"];
              console.log(data);
              setFriendsData(data);
              setFriendsCheck(true);
            }
          })
          .catch(function (error) {
            //alert("게시물을 가져오지 못 했습니다.");
            //throw error;
          });
      } catch (error) {
        throw error;
      }
    }
    getFriends();
  }, [id, setFriendsData]);

  return (
    <View style={styles.container}>
      <Header navigation={navigation}></Header>
      <View style={styles.body}>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <View style={styles.back}>
            <AntDesign name="left" size={18} color="black" />
            <Text style={styles.backText}>활동 내역 확인</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.contentContainer}>
          <Text style={styles.subject}>내가 올린 게시글</Text>
          <View style={styles.listContainer}>
            <View style={styles.listHeader}>
              <Text>글 번호</Text>
              <Text>제목</Text>
              <Text>신청인원</Text>
            </View>
            <View style={styles.smallLine}></View>
            <ScrollView style={styles.scrollView} persistentScrollbar={true}>
              <View style={styles.uploadPostList}>
                {postCheck ? (
                  postData.map((post, index) => (
                    <TouchableOpacity
                      key={post["post_id"]}
                      onPress={() =>
                        navigation.navigate("Post", { postId: post["post_id"] })
                      }
                    >
                      <View style={styles.post}>
                        <Text>{post["post_id"]}</Text>
                        <Text>{post["title"]}</Text>
                        <Text>
                          {post["applicantsNum"] +
                            "/" +
                            post["required_number"]}
                        </Text>
                      </View>
                      <View style={styles.smallLine}></View>
                    </TouchableOpacity>
                  ))
                ) : (
                  <Text>포스트 가져오는 중...</Text>
                )}
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
                {exerciseCheck ? (
                  exerciseData.map((post, index) => (
                    <View>
                      <View style={styles.post}>
                        <Text>{post["post_id"]}</Text>
                        <TouchableOpacity
                          key={post["post_id"]}
                          onPress={() =>
                            navigation.navigate("Post", {
                              postId: post["post_id"],
                            })
                          }
                        >
                          <Text>{post["title"]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          key={post["post_id"] + "btn"}
                          onPress={() => onPressCancelBtn(post["post_id"])}
                        >
                          <View style={styles.btn}>
                            <Text>취소</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                      <View style={styles.smallLine}></View>
                    </View>
                  ))
                ) : (
                  <Text>포스트 가져오는 중...</Text>
                )}
              </View>
            </ScrollView>
          </View>
        </View>
        <View style={styles.bigLine}></View>
        <View style={styles.contentContainer}>
          <Text style={styles.subject}>요청 받은 친구 내역</Text>
          <View style={styles.listContainer}>
            <View style={styles.listHeader}>
              <Text>닉네임</Text>
            </View>
            <View style={styles.smallLine}></View>
            <ScrollView style={styles.scrollView}>
              <View style={styles.friendsList}>
                {friendsCheck ? (
                  friendsData.map((friend, index) => (
                    <View>
                      <View style={styles.post}>
                        <Text>{friend["friend_username"]}</Text>
                        <View style={styles.btnContainer}>
                          <TouchableOpacity
                            key={friend["your_id"] + "ok"}
                            onPress={() => onPressConfirmBtn(friend["your_id"])}
                          >
                            <View style={styles.btn}>
                              <Text>수락</Text>
                            </View>
                          </TouchableOpacity>
                          <TouchableOpacity
                            key={friend["your_id"] + "no"}
                            onPress={() => onPressDeleteBtn(friend["your_id"])}
                          >
                            <View style={styles.btn}>
                              <Text>취소</Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      </View>
                      <View style={styles.smallLine}></View>
                    </View>
                  ))
                ) : (
                  <Text>친구들 가져오는 중...</Text>
                )}
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
    marginRight: SCREEN_WIDTH * 0.6,
    marginTop: SCREEN_HEIGHT * 0.03,
    alignItems: "center",
  },
  backText: {
    fontSize: 18,
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
  contentContainer: {
    marginTop: SCREEN_HEIGHT * 0.03,
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
    marginBottom: SCREEN_HEIGHT * 0.03,
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
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: SCREEN_WIDTH * 0.2,
  },
});
