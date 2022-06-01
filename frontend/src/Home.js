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
import DropDownPicker from "react-native-dropdown-picker";
import { Picker } from "@react-native-picker/picker";
import ModalDropdown from "react-native-modal-dropdown";
import { Dropdown } from "react-native-material-dropdown-v2";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function Home({ navigation }) {
  const [username, setUsername] = useState();
  const [idNum, setIdNum] = useState();

  const [selectedAge, setSelectedAge] = useState();
  const [selectedGender, setSelectedGender] = useState();
  const [selectedSkill, setSelectedSkill] = useState();
  const [selectedExercise, setSelectedExercise] = useState();

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
    { label: "연령무관", value: "0" },
    { label: "10대", value: "10" },
    { label: "20대", value: "20" },
    { label: "30대", value: "30" },
    { label: "40대", value: "40" },
    { label: "50대", value: "50" },
    { label: "60대이상", value: "60" },
  ];

  const genderItems = [
    { label: "성별무관", value: "I" },
    { label: "여자", value: "F" },
    { label: "남자", value: "M" },
  ];

  const skillItems = [
    { label: "능력무관", value: "0" },
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
  const data = [
    {
      value: "Banana",
    },
    {
      value: "Mango",
    },
    {
      value: "Pear",
    },
  ];
  return (
    <View style={styles.container}>
      <Header navigation={navigation}></Header>
      <View style={styles.body}>
        <View style={styles.search}>
          <Picker
            mode="dropdown"
            style={styles.dropdown}
            selectedValue={selectedAge}
            onValueChange={(itemValue, itemIndex) => setSelectedAge(itemValue)}
          >
            {ageItems.map((item, index) => (
              <Picker.Item
                key={item.label}
                label={item.label}
                value={item.value}
              />
            ))}
          </Picker>
          <Picker
            mode="dropdown"
            style={styles.dropdown}
            selectedValue={selectedGender}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedGender(itemValue)
            }
          >
            {genderItems.map((item, index) => (
              <Picker.Item
                key={item.label}
                label={item.label}
                value={item.value}
              />
            ))}
          </Picker>
          <Picker
            mode="dropdown"
            style={styles.dropdown}
            selectedValue={selectedSkill}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedSkill(itemValue)
            }
          >
            {skillItems.map((item, index) => (
              <Picker.Item
                key={item.label}
                label={item.label}
                value={item.value}
              />
            ))}
          </Picker>
          <Picker
            mode="dropdown"
            style={styles.dropdown}
            selectedValue={selectedExercise}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedExercise(itemValue)
            }
          >
            {exerItems.map((item, index) => (
              <Picker.Item
                key={item.label}
                label={item.label}
                value={item.value}
              />
            ))}
          </Picker>
          <Dropdown label="Favorite Fruit" data={data} />
        </View>
        <View style={styles.post}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F3F3",
  },
  body: {},
  search: {
    //flexDirection: "row"
  },
  dropdown: {
    width: SCREEN_WIDTH * 0.38,
    fontSize: 12,
  },
});
