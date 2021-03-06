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
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Image } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";
import Header from "../contents/Header";
import Constants from "expo-constants";
import { useIsFocused } from "@react-navigation/native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const { manifest } = Constants;

export default function Post({ route, navigation }) {
  const [userId, setUserId] = useState(0);
  const { postId } = route.params;
  const [postData, setPostData] = useState("");
  const [comment, setComment] = useState("");
  const [age, setAge] = useState("");
  const [commentData, setCommentData] = useState("");
  const [createdDate, setCreatedDate] = useState(new Date());
  const [commentCheck, setCommentCheck] = useState(false);
  const [isApply, setIsApply] = useState(false);
  const [isOverApply, setIsOverApply] = useState(false);
  const [isMyPost, setIsMyPost] = useState(false);

  const skillList = ["무관", "발바닥", "양말", "슬리퍼", "운동화"];

  AsyncStorage.getItem("@id").then((userid) => setUserId(userid.slice(1, -1)));
  const setData = async (data) => {
    try {
      await setPostData(data);
    } catch (e) {
      console.log(e);
    }
  };

  //게시물 조회
  useEffect(() => {
    async function getData() {
      try {
        const response = await axios
          .get(
            `http://${manifest.debuggerHost
              .split(":")
              .shift()}:8080/api/v1/posts/${postId}`
          )
          .then((response) => {
            console.log("난 게시물 data");
            console.log(response);
            if (response.data["success"] == true) {
              const data = response.data["data"];
              setData(data);
              const changeAge = data["age"] - (data["age"] % 10);
              setAge(changeAge);
              console.log("난 data");
              console.log(data);

              console.log("!!!!" + data["applicantsNum"]);
              console.log(data["required_number"]);
              console.log(data);
              if (data["applicantsNum"] >= data["required_number"]) {
                setIsOverApply(true);
              }
              if (userId == data["user_id_id"]) {
                setIsMyPost(true);
              }
            }
          })
          .catch(function (error) {
            alert("게시물을 가져오지 못 했습니다.");
            console.log(error);
            throw error;
          });
      } catch (error) {
        alert("게시물을 가져오지 못 했습니다.");
        console.log(error);
        throw error;
      }
    }
    getData();
  }, [setPostData, userId]);

  // 댓글 조회
  useEffect(() => {
    async function getData() {
      try {
        const response = await axios
          .get(
            `http://${manifest.debuggerHost
              .split(":")
              .shift()}:8080/api/v1/posts/${postId}/comments`
          )
          .then((response) => {
            if (response.data["success"] == true) {
              const data = response.data["result"];
              setCommentData(data);
              setCommentCheck(true);
              console.log("난 댓글 data");
              console.log(data);
            }
          })
          .catch(function (error) {
            alert("댓글을 가져오지 못 했습니다.");
            console.log(error);
            //throw error;
          });
      } catch (error) {
        alert("댓글을 가져오지 못 했습니다.");
        console.log(error);
        //throw error;
      }
    }
    getData();
  }, [setCommentData, userId]);

  // 신청 여부 조회
  useEffect(() => {
    async function getData() {
      try {
        const response = await axios
          .get(
            `http://${manifest.debuggerHost
              .split(":")
              .shift()}:8080/api/v1/posts/${postId}/applicants/${userId}`
          )
          .then((response) => {
            if (response.data["success"] == true) {
              const data = response.data["result"];
              console.log(data);
              console.log("난 신청 data");

              // 이미 신청
              if (data["application"] == true) {
                setIsApply(true);
              } else {
                setIsApply(false);
              }
            }
          })
          .catch(function (error) {
            alert("신청 여부 조회에 실패하였습니다.");
            console.log(error);
            throw error;
          });
      } catch (error) {
        alert("신청 여부 조회에 실패하였습니다.");
        console.log(error);
        throw error;
      }
    }
    getData();
  }, [userId, setIsOverApply]);

  // 댓글 작성 버튼 누른 경우
  const opPressCreateComment = async () => {
    if (comment == "") {
      alert("빈칸을 채워주세요!");
    } else {
      var data = {
        user_id: userId,
        post_id: postId,
        text: comment,
        created_date: timestamp(createdDate),
      };
      try {
        console.log(data);
        const response = await axios
          .post(
            `http://${manifest.debuggerHost
              .split(":")
              .shift()}:8080/api/v1/comments`,
            data
          )
          .then(function async(response) {
            if (response.data["success"] == true) {
              alert("댓글이 등록되었습니다.");
              // const commentData = response.data["result"];
              // navigation.navigate("Post",{"postId":postId});
              navigation.replace("Post", { postId: postId });
            }
          })
          .catch(function (error) {
            alert("댓글 작성 오류입니다.");
            //console.log(error.response.data);
            console.log(error);
            throw error;
          });
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  };
  // 게시물 삭제
  const onPressDeletePost = async () => {
    try {
      const response = await axios
        .delete(
          `http://${manifest.debuggerHost
            .split(":")
            .shift()}:8080/api/v1/posts/${postId}`
        )
        .then(function async(response) {
          if (response.data["success"] == true) {
            alert("삭제가 완료되었습니다.");
            navigation.navigate("Home");
          }
        })
        .catch(function (error) {
          alert("삭제 오류입니다.");
          console.log(error);
          throw error;
        });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  // 신청 버튼 누른 경우
  const opPressCreateApplication = async () => {
    try {
      const response = await axios
        .post(
          `http://${manifest.debuggerHost
            .split(":")
            .shift()}:8080/api/v1/posts/${postId}/applicants/${userId}`
        )
        .then(function async(response) {
          if (response.data["success"] == true) {
            alert("신청이 완료되었습니다.");
            navigation.navigate("Home");
          }
        })
        .catch(function (error) {
          alert("신청 오류입니다.");
          console.log(error);
          throw error;
        });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  // 신청 취소 버튼 누를 경우
  const opPressDeleteApplication = async () => {
    try {
      const response = await axios
        .delete(
          `http://${manifest.debuggerHost
            .split(":")
            .shift()}:8080/api/v1/posts/${postId}/applicants/${userId}`
        )
        .then(function async(response) {
          alert("신청이 취소되었습니다.");
          navigation.navigate("Home");
        })
        .catch(function (error) {
          alert("취소 오류입니다.");
          throw error;
        });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  function timestamp() {
    var source = new Date();
    var date =
      source.getFullYear() +
      "-" +
      (source.getMonth() + 1 > 9
        ? (source.getMonth() + 1).toString()
        : "0" + (source.getMonth() + 1)) +
      "-" +
      (source.getDate() > 9
        ? source.getDate().toString()
        : "0" + source.getDate().toString());

    var hours = ("0" + source.getHours()).slice(-2);
    var minutes = ("0" + source.getMinutes()).slice(-2);

    var time = hours + ":" + minutes;

    return date + " " + time;
  }

  return (
    <View style={styles.container}>
      <Header navigation={navigation}></Header>
      <View style={styles.body}>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <View style={styles.back}>
            <AntDesign name="left" size={18} color="black" />
            <Text style={styles.backText}>게시물</Text>
          </View>
        </TouchableOpacity>
        <ScrollView style={styles.scrollView}>
          <View style={styles.info}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{postData["title"]}</Text>
              <View style={styles.peopleContainer}>
                <Image
                  style={styles.post_peopleLogo}
                  source={require("../icon/post_people.png")}
                />
                <Text style={styles.peopleText}>
                  {postData["applicantsNum"]}/{postData["required_number"]}
                </Text>
              </View>
            </View>
            <View style={styles.contentContainer}>
              <Text style={styles.subject}>작성자</Text>
              <Text style={styles.content}>{postData["username"]}</Text>
            </View>
            <View style={styles.smallLine}></View>
            <View style={styles.contentContainer}>
              <Text style={styles.subject}>운동</Text>
              <Text style={styles.content}>
                {postData["exercise"] == "baseball"
                  ? "야구"
                  : postData["exercise"] == "soccer"
                  ? "축구"
                  : "농구"}
              </Text>
            </View>
            <View style={styles.smallLine}></View>
            <View style={styles.contentContainer}>
              <Text style={styles.subject}>능력</Text>
              <Text style={styles.content}>
                {skillList[postData["exercise_skill"]]}
              </Text>
            </View>
            <View style={styles.smallLine}></View>
            <View style={styles.contentContainer}>
              <Text style={styles.subject}>성별</Text>
              <Text style={styles.content}>
                {postData["gender"] == "F"
                  ? "여자"
                  : postData["gender"] == "M"
                  ? "남자"
                  : "무관"}
              </Text>
            </View>
            <View style={styles.smallLine}></View>
            <View style={styles.contentContainer}>
              <Text style={styles.subject}>나이</Text>
              <Text style={styles.content}>{age}대</Text>
            </View>
            <View style={styles.smallLine}></View>
            <View style={styles.contentContainer}>
              <Text style={styles.subject}>장소</Text>
              <Text style={styles.content}>{postData["location"]}</Text>
            </View>
            <View style={styles.smallLine}></View>
            <View style={styles.contentContainer}>
              <Text style={styles.subject}>일시</Text>
              <Text style={styles.content}>
                {postData["meeting_date"] == undefined ? (
                  <></>
                ) : (
                  postData["meeting_date"].split("T")[0] +
                  " " +
                  postData["meeting_date"].split("T")[1].slice(0, 5)
                )}
              </Text>
            </View>
            <View style={styles.smallLine}></View>
            <View style={styles.writing}>
              <Text style={styles.content}>{postData["content"]}</Text>
            </View>
          </View>
        </ScrollView>

        {isMyPost == true ? (
          <TouchableOpacity
            onPress={() => {
              onPressDeletePost();
            }}
            underlayColor="white"
          >
            <View style={styles.applyBtn}>
              <Text style={styles.btnText}>게시물 삭제</Text>
            </View>
          </TouchableOpacity>
        ) : isOverApply == true ? (
          <View style={styles.noApplyBtn}>
            <Text style={styles.btnText}>신청 불가</Text>
          </View>
        ) : isApply ? (
          <TouchableOpacity
            onPress={() => {
              opPressDeleteApplication();
            }}
            underlayColor="white"
          >
            <View style={styles.applyBtn}>
              <Text style={styles.btnText}>신청 취소</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              opPressCreateApplication();
            }}
            underlayColor="white"
          >
            <View style={styles.applyBtn}>
              <Text style={styles.btnText}>신청</Text>
            </View>
          </TouchableOpacity>
        )}

        <View style={styles.bigLine}></View>
        <View style={styles.inputContainer}>
          <TouchableWithoutFeedback
            onPress={() => {
              Keyboard.dismiss();
            }}
          >
            <TextInput
              style={styles.input}
              onChangeText={setComment}
              value={comment}
              placeholder="댓글을 입력하세요"
            />
          </TouchableWithoutFeedback>
          <TouchableOpacity
            onPress={() => {
              opPressCreateComment();
            }}
            underlayColor="white"
          >
            <View style={styles.confirmBtn}>
              <Text style={styles.confirmBtnText}>등록</Text>
            </View>
          </TouchableOpacity>
        </View>

        {commentCheck ? (
          <View style={styles.commentsListContainer}>
            <ScrollView style={styles.scrollView}>
              {/* {console.log(comment)} */}
              {commentData.map((comment, index) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Profile", {
                      userId: comment["user_id"],
                    })
                  }
                  key={comment["comment_id"]}
                >
                  <View style={styles.commentsContainer}>
                    <Text style={styles.commentsName}>
                      {comment["username"]}
                    </Text>
                    <Text style={styles.commentDate}>
                      {comment["created_date"].split("T")[0]} |{" "}
                      {comment["created_date"].split("T")[1].split("Z")[0]}
                    </Text>
                    <Text style={styles.commentsContent}>
                      {comment["text"]}
                    </Text>
                    <View style={styles.smallLine}></View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        ) : (
          <Text>댓글 가져오는 중...</Text>
        )}
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
    backgroundColor: "#E5E5E5",
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
  // firstContainer: {
  //   width: SCREEN_WIDTH * 0.9,
  //   height: SCREEN_HEIGHT * 0.4,
  // },
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
  content: { fontSize: 13.5 },
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
  noApplyBtn: {
    backgroundColor: "gray",
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
    fontSize: 14,
    lineHeight: 30,
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
    height: SCREEN_HEIGHT * 0.28,
    //borderWidth: 3,
    //borderColor: "#DFDFDF",
    backgroundColor: "white",
    alignItems: "center",
    marginBottom: SCREEN_WIDTH * 0.05,
  },
  commentsContainer: {
    flexDirection: "column",
    width: SCREEN_WIDTH * 0.88,
    marginTop: SCREEN_HEIGHT * 0.007,
  },
  commentsName: {
    fontSize: 13,
    fontWeight: "700",
    color: "#ABA8A8",
    width: SCREEN_WIDTH,
  },
  commentsContent: {
    fontSize: 15,
    fontWeight: "500",
    width: SCREEN_WIDTH,
  },
  commentDate: {
    fontSize: 12,
    marginLeft: SCREEN_WIDTH * 0.5,
    color: "#ABA8A8",
  },
  infoScrollView: {
    backgroundColor: "#FFFFFF",
    marginVertical: 20,
  },
  scrollView: {
    backgroundColor: "#FFFFFF",
    marginVertical: 20,
  },
  postUser: {},
});
