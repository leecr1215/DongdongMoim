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
import Header from "../contents/Header";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function Home({ navigation }) {
  const [username, setUsername] = useState();
  const [idNum, setIdNum] = useState();

  // useEffect(() => {
  //   async function Data() {
  //     const storage1 = await AsyncStorage.getItem("@username").then((name) =>
  //       setUsername(name.slice(1, -1))
  //     );
  //     const storage2 = await AsyncStorage.getItem("@id").then(
  //       (userid) => setIdNum(userid.slice(1, -1)),
  //       console.log(idNum + " 님 하이")
  //     );
  //   }
  // }, []);

  const storage1 = AsyncStorage.getItem("@username").then((name) =>
    setUsername(name.slice(1, -1))
  );
  const storage2 = AsyncStorage.getItem("@id").then(
    (userid) => setIdNum(userid.slice(1, -1)),
    console.log(idNum + " 님 하이")
  );

  return (
    <View style={styles.container}>
      <Header />
      <Text></Text>
      <Text>{`안녕하세요 ${username} 님`}</Text>
      <Text>{`id번호는 ${idNum}이다`}</Text>
      <TextInput value={idNum} placeholder={idNum} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F3F3",
    alignItems: "center",
    justifyContent: "center",
  },
});
