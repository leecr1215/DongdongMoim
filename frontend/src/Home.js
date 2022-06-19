import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
  ScrollView,
  StatusBar,
  Platform,
  Image,
  SafeAreaView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import Header from "../contents/Header";
import axios from "axios";
import { Dropdown } from "react-native-element-dropdown";
import Constants from "expo-constants";
import { useIsFocused } from "@react-navigation/native";
import * as Location from "expo-location";
const { manifest } = Constants;

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function Home({ navigation }) {
  const [username, setUsername] = useState();
  const [idNum, setIdNum] = useState();
  const [city, setCity] = useState("Loading...");
  const [permission, setPermission] = useState(true);

  const [selectedAge, setSelectedAge] = useState("0");
  const [selectedGender, setSelectedGender] = useState("I");
  const [selectedSkill, setSelectedSkill] = useState("0");
  const [selectedExercise, setSelectedExercise] = useState("0");

  const [postData, setPostData] = useState(null);
  const [postCheck, setPostCheck] = useState(false);

  const focus = useIsFocused();

  // 사용자 위치 가져오는 부분
  const getLocation = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setPermission(false);
    }
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });

    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );
    const sum =
      location[0].region + " " + location[0].city + " " + location[0].street;
    const a = await AsyncStorage.setItem("@location", JSON.stringify(sum));
    setCity(location[0].region);
    //console.log(location[0]);
  };

  const setData = async (data) => {
    try {
      await setPostData(data);
      await setPostCheck(true);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    async function getData() {
      try {
        if (typeof idNum === "undefined") {
          return;
        }
        const response = await axios
          .get(
            `http://${manifest.debuggerHost
              .split(":")
              .shift()}:8080/api/v1/posts/all?id=${idNum}&age=${selectedAge}&gender=${selectedGender}&exercise=${selectedExercise}`
          )
          .then((response) => {
            if (response.data["success"] == true) {
              const data = response.data["data"];
              setData(data);
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
    getLocation();
  }, [
    focus,
    selectedAge,
    selectedExercise,
    selectedGender,
    selectedExercise,
    idNum,
  ]);

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
    { label: "무관", value: "0" },
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

  const imgPath = {
    soccer: require("../icon/soccer.png"),
    baseball: require("../icon/baseball.png"),
    basketball: require("../icon/basketball.png"),
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <StatusBar backgroundColor={"#D3EEFF"} translucent={false} />
      <View style={styles.body}>
        <View style={styles.search}>
          <View style={styles.searchContainer}>
            <Text style={styles.searchText}>연령</Text>
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
              autoScroll
              renderItem={(item) => _renderItem(item)}
              textError="Error"
              placeholderStyle={styles.selectedText}
              selectedTextStyle={styles.selectedText}
            />
          </View>
          <View style={styles.searchContainer}>
            <Text style={styles.searchText}>성별</Text>
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
              placeholderStyle={styles.selectedText}
              selectedTextStyle={styles.selectedText}
            />
          </View>
          <View style={styles.searchContainer}>
            <Text style={styles.searchText}>능력</Text>
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
              placeholderStyle={styles.selectedText}
              selectedTextStyle={styles.selectedText}
            />
          </View>
          <View style={styles.searchContainer}>
            <Text style={styles.searchText}>운동</Text>
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
              placeholderStyle={styles.selectedText}
              selectedTextStyle={styles.selectedText}
            />
          </View>

          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate("PostWriting")}
            >
              <Image
                style={styles.postWriteLogo}
                source={require("../icon/post_write.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.postContainer}>
          <ScrollView style={styles.scrollView} persistentScrollbar={true}>
            {postCheck ? (
              postData.map((post, index) => (
                <TouchableOpacity
                  key={post["post_id"] + "post"}
                  onPress={() =>
                    navigation.navigate("Post", { postId: post["post_id"] })
                  }
                >
                  <View style={styles.scrollChild}>
                    <View style={styles.leftContainer}>
                      <Image
                        style={styles.exerciseLogo}
                        source={imgPath[post["exercise"]]}
                      />
                    </View>
                    <View style={styles.rightContainer}>
                      <View style={styles.postIdDate}>
                        <Text style={styles.postUsername}>
                          작성자 {post["username"]}
                        </Text>
                        <Text style={styles.postDate}>
                          {post["post_date"].split("T")[0] +
                            " " +
                            post["post_date"].split("T")[1].slice(0, 5)}
                        </Text>
                      </View>
                      <View style={styles.postTitleNumber}>
                        <Text style={styles.postTitle}>{post["title"]}</Text>
                        <View style={styles.postApplyNumber}>
                          {post["isApply"] ? (
                            <Text style={styles.applyStyle}>신청완료</Text>
                          ) : (
                            <Text></Text>
                          )}
                          <Text style={styles.applicantsNum}>
                            {post["applicantsNum"] +
                              "/" +
                              post["required_number"]}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <Text>포스트 가져오는 중...</Text>
            )}
          </ScrollView>
        </View>
        {/* <View>
          <Text>{city}</Text>
        </View> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F3F3",
  },
  body: { flex: 0.9 },
  search: {
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_HEIGHT * 0.05,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
    marginTop: SCREEN_WIDTH * 0.05,
    marginLeft: SCREEN_WIDTH * 0.05,
    marginRight: SCREEN_WIDTH * 0.05,
  },
  searchContainer: {
    alignItems: "center",
  },
  searchText: {
    marginBottom: SCREEN_WIDTH * 0.01,
    fontWeight: "500",
    color: "#898989",
  },
  /*드롭다운 css 시작*/
  dropdown: {
    backgroundColor: "white",
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
    width: SCREEN_WIDTH * 0.15,
  },

  item: {
    paddingVertical: 17,
    paddingHorizontal: 7,
    //flexDirection: "row",
    //justifyContent: "center",
    alignItems: "center",
    fontSize: 14,
  },
  textItem: {
    flex: 1,
    fontSize: 14,
  },
  shadow: {
    margin: 0,
    maxHeight: 100,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1.41,
    elevation: 4,
  },
  selectedText: {
    fontSize: 14,
    textAlign: "center",
  },
  /*드롭다운 css 끝*/
  postWriteLogo: {
    resizeMode: "contain",
    width: SCREEN_WIDTH * 0.06,
    height: SCREEN_WIDTH * 0.08,
  },
  postContainer: {
    backgroundColor: "white",
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_HEIGHT * 0.7,
    //borderRadius: 20,
    marginBottom: "auto",
    marginTop: "auto",
    marginRight: "auto",
    marginLeft: "auto",
  },
  scrollView: {
    width: SCREEN_WIDTH * 0.9,
    //height: SCREEN_HEIGHT * 0.74,
  },
  scrollChild: {
    borderBottomColor: "#dcdcdc",
    borderBottomWidth: 1,
    flexDirection: "row",
    width: SCREEN_WIDTH * 0.9,
  },
  leftContainer: {
    width: SCREEN_WIDTH * 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  rightContainer: {
    width: SCREEN_WIDTH * 0.7,
  },
  exerciseLogo: {
    resizeMode: "contain",
    width: SCREEN_WIDTH * 0.1,
    height: SCREEN_HEIGHT * 0.1,
  },
  /* 불러온 게시글 */
  postIdDate: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 13,
  },
  postId: { color: "#898989", fontSize: 13 },
  postUsername: {
    color: "gray",
    marginLeft: SCREEN_WIDTH * 0.02,
    marginTop: SCREEN_WIDTH * 0.02,
  },
  postDate: { color: "#898989", fontSize: 13 },
  postTitleNumber: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
    alignContent: "center",
    alignItems: "center",
    paddingTop: 3,
  },

  postTitle: { fontWeight: "500" },
  postApplyNumber: {
    alignItems: "center",
  },
  applyStyle: { color: "red", fontSize: 12, paddingBottom: 5 },
  applicantsNum: { color: "#0500FF", fontSize: 12, paddingBottom: 10 },
});
