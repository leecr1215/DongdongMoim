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
              <View style={styles.friend}>
                <Text style={styles.name}>마라</Text>
                <Text style={styles.phoneNum}>010-0000-0000</Text>
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
    height: SCREEN_HEIGHT * 0.7,
    maxHeight: SCREEN_HEIGHT * 0.4,
    alignItems: "center",
  },
  head: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "space-between",
    width: SCREEN_WIDTH * 0.6,
    height: SCREEN_HEIGHT * 0.05,
    borderColor: "black",
    borderWidth: 1,
  },
  headText: {
    fontSize: 17,
    fontWeight: "700",
  },
  content: { width: SCREEN_WIDTH * 0.6 },
  friend: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    //marginLeft: SCREEN_WIDTH * 0.05,
    borderRadius: 20,
    width: SCREEN_WIDTH * 0.6,
  },
  name: { fontSize: 15, width: SCREEN_WIDTH * 0.2 },
  phoneNum: {
    fontSize: 15,
    width: SCREEN_WIDTH * 0.4,
  },
});

export default FriendModal;
