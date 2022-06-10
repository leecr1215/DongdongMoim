import React, { useState, useEffect, useId } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
} from "react-native";
import Modal from "react-native-modal";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";
import Constants from "expo-constants";
import { useIsFocused } from "@react-navigation/native";

const { manifest } = Constants;
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const FriendModal = ({ isVisible, isClose, userId }) => {
  //const [userId, setUserId] = useState("");
  const [friends, setFriends] = useState(null);
  //   const s = AsyncStorage.getItem("@id").then((userid) =>
  //     setUserId(userid.slice(1, -1))
  //   );
  const focus = useIsFocused();

  const loadAsync = async () => {
    // const s = await AsyncStorage.getItem("@id").then((userid) =>
    //   setUserId(userid.slice(1, -1))
    // );
    s !== null ? setUserId(s) : null;
  };

  //   useEffect(() => {
  //     async function loadAsync() {
  //       const s = await AsyncStorage.getItem("@id").then((userid) =>
  //         setUserId(userid.slice(1, -1))
  //       );
  //     }
  //     loadAsync();
  //   }, [setUserId]);

  const setData = async (data) => {
    try {
      setFriends(data);
    } catch (e) {
      console.log(e);
    }
  };
  function isNetworkError(err) {
    return !!err.isAxiosError && !err.response;
  }
  useEffect(() => {
    async function getFriends() {
      //   const s = AsyncStorage.getItem("@id").then((userid) =>
      //     setUserId(userid.slice(1, -1))
      //   );
      try {
        console.log("유저 아이디는 : " + userId);

        const response = await axios
          .get(
            `http://${manifest.debuggerHost
              .split(":")
              .shift()}:8080/api/v2/friends/2`
          )
          .then((response) => {
            // // const data = response.data["result"];
            //   setData(response.data);
              console.log("난 친구 리스트 데이터" + response.data);
              console.log(response)
            if (response.data["success"] == true) {
              const data = response.data["result"];
              setData(data);
              console.log("난 데이터" + data);
              console.log("난 friends" + friends);
            }
          })
          .catch(function (error) {
            if (isNetworkError(error)) {
              console.log("check your connection");
            }
            //throw err;
            console.log(friends);
            isNetworkError(error);
            if (!error.status) {
              // network error
              console.log("네트워크 에러");
              console.log(error);
            } else {
              // http status code
              const code = error.response.status;
              console.log(code);
              // response data
              const response = error.response.data;
              console.log(response);
            }
            //alert("친구 목록을 가져오지 못했습니다.");
            //console.log(error);
            throw error;
          });
      } catch (error) {
        //alert("친구 목록 에러");
        console.log(error);
        //throw error;
      }
    }
    getFriends();
  }, [userId]);

  return (
    <View style={styles.container}>
      <Modal visible={isVisible}>
        <View style={styles.modal}>
          <View style={styles.modalcon}>
            <View style={styles.head}>
              <Text style={styles.headText}>내 친구들</Text>
              <TouchableOpacity onPress={isClose}>
                <AntDesign
                  style={styles.icon}
                  name="close"
                  size={20}
                  color="black"
                />
              </TouchableOpacity>
            </View>
            <View style={styles.content}>
              <ScrollView
                style={styles.scrollview}
                showsVerticalScrollIndicator={false}
              >
                {friends == null ? (
                  <></>
                ) : (
                  friends.map((friend, index) => (
                    <View style={styles.friend}>
                      <Text style={styles.name}>
                        {friend["friend_username"]}
                      </Text>
                      <Text style={styles.phoneNum}>
                        {friend["phone_number"]}
                      </Text>
                    </View>
                  ))
                )}
                {/* <View style={styles.friend}>
                  <Text style={styles.name}>마라</Text>
                  <Text style={styles.phoneNum}>010-0000-0000</Text>
                </View>
                <View style={styles.friend}>
                  <Text style={styles.name}>마라</Text>
                  <Text style={styles.phoneNum}>010-0000-0000</Text>
                </View>
                <View style={styles.friend}>
                  <Text style={styles.name}>마라</Text>
                  <Text style={styles.phoneNum}>010-0000-0000</Text>
                </View>
                <View style={styles.friend}>
                  <Text style={styles.name}>마라</Text>
                  <Text style={styles.phoneNum}>010-0000-0000</Text>
                </View>
                <View style={styles.friend}>
                  <Text style={styles.name}>마라</Text>
                  <Text style={styles.phoneNum}>010-0000-0000</Text>
                </View>
                <View style={styles.friend}>
                  <Text style={styles.name}>마라</Text>
                  <Text style={styles.phoneNum}>010-0000-0000</Text>
                </View>
                <View style={styles.friend}>
                  <Text style={styles.name}>마라</Text>
                  <Text style={styles.phoneNum}>010-0000-0000</Text>
                </View>

                <View style={styles.friend}>
                  <Text style={styles.name}>마라</Text>
                  <Text style={styles.phoneNum}>010-0000-0000</Text>
                </View>
                <View style={styles.friend}>
                  <Text style={styles.name}>마라</Text>
                  <Text style={styles.phoneNum}>010-0000-0000</Text>
                </View> */}
              </ScrollView>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //justifyContent: "center",
    //alignContent: "center",
    //alignItems: "center",
  },
  modal: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    //backgroundColor: "white",
    justifyContent: "flex-end",
    // alignContent: "center",
    // alignItems: "flex-start",
  },
  modalcon: {
    backgroundColor: "#F3F3F3",
    width: SCREEN_WIDTH * 0.7,
    //height: SCREEN_HEIGHT * 0.7,
    maxHeight: SCREEN_HEIGHT * 0.5,
    marginBottom: 30,
    alignItems: "center",
    borderRadius: 20,
  },
  head: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "space-between",
    width: SCREEN_WIDTH * 0.6,
    height: SCREEN_HEIGHT * 0.05,
    marginBottom: SCREEN_HEIGHT * 0.01,
    marginTop: SCREEN_HEIGHT * 0.01,
  },
  headText: {
    fontSize: 20,
    fontWeight: "700",
  },
  scrollView: {
    width: SCREEN_WIDTH * 0.6,
  },
  content: {
    width: SCREEN_WIDTH * 0.6,
    paddingBottom: SCREEN_HEIGHT * 0.01,
    maxHeight: SCREEN_HEIGHT * 0.43,
  },
  friend: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    //justifyContent: "space-evenly",
    //marginLeft: SCREEN_WIDTH * 0.05,
    borderRadius: 20,
    width: SCREEN_WIDTH * 0.6,
    height: SCREEN_HEIGHT * 0.05,
    marginBottom: SCREEN_HEIGHT * 0.01,
  },
  name: {
    fontSize: 15,
    width: SCREEN_WIDTH * 0.2,
    textAlign: "center",
  },
  phoneNum: {
    fontSize: 15,
    width: SCREEN_WIDTH * 0.4,
    textAlign: "center",
  },
});

export default FriendModal;
