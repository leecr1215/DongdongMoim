import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from "react-native";
import { Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function Home({ navigation }) {
  //   const [id, setId] = useState();
  //   const storage = AsyncStorage.getItem("@id").then((userid) =>
  //     setId(userid.slice(1, -1))
  //   );

  return (
    <View style={styles.container}>
      <Text>{`안녕하세요 님`}</Text>
      <TextInput value={id} placeholder={id} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D8E1FF",
    alignItems: "center",
    justifyContent: "center",
  },
});
