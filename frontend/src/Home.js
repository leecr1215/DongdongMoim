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
import { useEffect, useState } from "react";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function Home({ navigation }) {
  const [username, setUsername] = useState();
  const [idNum, setIdNum] = useState();

  const storage1 = AsyncStorage.getItem("@username").then((name) =>
    setUsername(name.slice(1, -1))
  );
  const storage2 = AsyncStorage.getItem("@id").then((userid) =>
    setIdNum(userid.slice(1, -1))
  );

  return (
    <View style={styles.container}>
      <Text>{`안녕하세요 님`}</Text>
      <Text>{`id번호는 ${idNum}이다`}</Text>
      <TextInput value={username} placeholder={username} />
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
