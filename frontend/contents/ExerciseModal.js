import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";
import { AntDesign } from "@expo/vector-icons";

const ExerciseModal = ({ isVisible, isClose }) => {
  return (
    <Modal visible={isVisible} avoidKeyboard style={styles.modal}>
      <View style={styles.modalcon}>
        <View style={styles.container}>
          <TouchableOpacity onPress={isClose}>
            <AntDesign name="close" size={24} color="black" />
          </TouchableOpacity>
          <Text>안녕 난 모달창</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: { flex: 1 },
  modalcon: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "#fff",
    padding: 40,
  },
});

export default ExerciseModal;
