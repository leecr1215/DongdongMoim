import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
  ScrollView,
} from "react-native";
import { Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import Header from "../contents/Header";
//import DropDownPicker from "react-native-dropdown-picker";
import { Picker } from "@react-native-picker/picker";
import { Dropdown } from "react-native-element-dropdown";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function Home({ navigation }) {
  const [username, setUsername] = useState();
  const [idNum, setIdNum] = useState();

  const [selectedAge, setSelectedAge] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null);

  const [dropdown, setDropdown] = useState(null);

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
  const storage2 = AsyncStorage.getItem("@id").then((userid) =>
    setIdNum(userid.slice(1, -1))
  );

  const ageItems = [
    { label: "무관", value: "0" },
    { label: "10대", value: "10" },
    { label: "20대", value: "20" },
    { label: "30대", value: "30" },
    { label: "40대", value: "40" },
    { label: "50대", value: "50" },
    { label: "60대\n이상", value: "60" },
  ];

  const genderItems = [
    { label: "무관", value: "I" },
    { label: "여자", value: "F" },
    { label: "남자", value: "M" },
  ];

  const skillItems = [
    { label: "무관", value: "0" },
    { label: "발바닥", value: "1" },
    { label: "양말", value: "2" },
    { label: "슬리퍼", value: "3" },
    { label: "운동화", value: "4" },
  ];

  const exerItems = [
    { label: "야구", value: "baseball" },
    { label: "축구", value: "soccer" },
    { label: "농구", value: "basketball" },
  ];

  const _renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Header navigation={navigation}></Header>
      <View style={styles.body}>
        <View style={styles.search}>
          <Dropdown
            style={styles.dropdown}
            containerStyle={styles.shadow}
            data={ageItems}
            labelField="label"
            valueField="value"
            label="Dropdown"
            placeholder="연령"
            value={selectedAge}
            onChange={(item) => {
              setSelectedAge(item.value);
              console.log("selected", item);
            }}
            renderItem={(item) => _renderItem(item)}
            textError="Error"
          />
          <Dropdown
            style={styles.dropdown}
            containerStyle={styles.shadow}
            data={genderItems}
            labelField="label"
            valueField="value"
            label="Dropdown"
            placeholder="성별"
            value={selectedGender}
            onChange={(item) => {
              setSelectedGender(item.value);
              console.log("selected", item);
            }}
            renderItem={(item) => _renderItem(item)}
            textError="Error"
          />
          <Dropdown
            style={styles.dropdown}
            containerStyle={styles.shadow}
            data={skillItems}
            labelField="label"
            valueField="value"
            label="Dropdown"
            placeholder="능력"
            value={selectedSkill}
            onChange={(item) => {
              setSelectedSkill(item.value);
              console.log("selected", item);
            }}
            renderItem={(item) => _renderItem(item)}
            textError="Error"
          />
          <Dropdown
            style={styles.dropdown}
            containerStyle={styles.shadow}
            data={exerItems}
            labelField="label"
            valueField="value"
            label="Dropdown"
            placeholder="운동"
            value={selectedExercise}
            autoScroll
            onChange={(item) => {
              setSelectedExercise(item.value);
              console.log("selected", item);
            }}
            renderItem={(item) => _renderItem(item)}
            textError="Error"
          />
          <TouchableOpacity onPress={() => navigation.navigate("PostWriting")}>
            <Image
              style={styles.postWriteLogo}
              source={require("../icon/post_write.png")}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.postContainer}>
          <ScrollView></ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F3F3",
  },
  body: { flex: 0.87 },
  search: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.05,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: SCREEN_WIDTH * 0.05,
    borderColor: "black",
    borderWidth: 3,
  },
  /*드롭다운 css 시작*/
  dropdown: {
    //backgroundColor: "white",
    //borderBottomColor: "gray",
    //borderBottomWidth: 0.5,
    //marginTop: 20,
    width: SCREEN_WIDTH * 0.15,
  },

  item: {
    paddingVertical: 17,
    paddingHorizontal: 7,
    //flexDirection: "row",
    //justifyContent: "center",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 15,
  },
  shadow: {
    margin: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  /*드롭다운 css 끝*/
  postWriteLogo: { resizeMode: "contain", width: SCREEN_WIDTH * 0.06 },
  postContainer: {
    backgroundColor: "white",
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_HEIGHT * 0.74,
    //borderRadius: 20,
    marginBottom: "auto",
    marginTop: "auto",
    marginRight: "auto",
    marginLeft: "auto",
  },
});
