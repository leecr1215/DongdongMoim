import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import Modal from "react-native-modal";
import { AntDesign } from "@expo/vector-icons";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const FriendModal = ({ isVisible, isClose }) => {
  return (
    <View style={styles.container}>
      <Modal visible={isVisible}>
        <View style={styles.modal}>
          <View style={styles.modalcon}>
            <View style={styles.head}>
              <TouchableOpacity>
                <AntDesign name="close" size={20} color="#D3EEFF" />
              </TouchableOpacity>
              <Text style={styles.headText}>운동 능력</Text>
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
              {/* 왼쪽 그림과 이름 */}
              <View style={styles.left}>
                <View style={styles.exercise}>
                  <Image
                    style={styles.img}
                    source={require("../icon/sole.png")}
                  />
                  <Text style={styles.exerText}>발바닥</Text>
                </View>
                <View style={styles.exercise}>
                  <Image
                    style={styles.img}
                    source={require("../icon/sock.png")}
                  />
                  <Text style={styles.exerText}>양말</Text>
                </View>
                <View style={styles.exercise}>
                  <Image
                    style={styles.img}
                    source={require("../icon/slipper.png")}
                  />
                  <Text style={styles.exerText}>슬리퍼</Text>
                </View>
                <View style={styles.exercise}>
                  <Image
                    style={styles.img}
                    source={require("../icon/sneaker.png")}
                  />
                  <Text style={styles.exerText}>운동화</Text>
                </View>
              </View>
              <View style={styles.right}>
                <Text style={styles.explain}>해당 운동을 처음해본다.</Text>
                <Text style={styles.explain}>운동 경험이 있다.</Text>
                <Text style={styles.explain}>1인분을 해낼 수 있다.</Text>
                <Text style={styles.explain}>1.5인분을 해낼 수 있다.</Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //height: SCREEN_HEIGHT,
    // flex: 1,
    // backgroundColor: "black",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  modal: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    marginLeft: 0,
    //marginRight: 300,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  modalcon: {
    backgroundColor: "#fff",
    width: SCREEN_WIDTH * 0.75,
  },

  head: {
    backgroundColor: "#D3EEFF",
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "space-around",
    height: SCREEN_HEIGHT * 0.06,
    marginBottom: SCREEN_HEIGHT * 0.03,
  },
  headText: {
    fontSize: 15,
    fontWeight: "700",
  },
  content: { flexDirection: "row", justifyContent: "space-around" },
  exercise: { flexDirection: "row" },
  exerText: {
    fontSize: 13,
    fontWeight: "700",
    marginBottom: SCREEN_HEIGHT * 0.03,
  },
  img: {
    resizeMode: "contain",
    height: SCREEN_HEIGHT * 0.025,
    width: SCREEN_WIDTH * 0.08,
  },
  explain: { fontSize: 13, marginBottom: SCREEN_HEIGHT * 0.03 },
});

export default FriendModal;
