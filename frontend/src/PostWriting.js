import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
  ScrollView,
  FlatList
} from "react-native";
import { Image } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DatePicker from 'react-native-modern-datepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import Header from "../contents/Header";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const { height: SCREEN_HEIGHT } = Dimensions.get("window");
import Constants from "expo-constants";

const { manifest } = Constants;

export default function PostWriting({ navigation }) {
  const [userId,setUserId] = useState(0);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [meetingDate, setMeetingDate] = useState(new Date());
  const [postDate, setPostDate] = useState(new Date());
  const [requiredNum, setRequiredNum] = useState(0);
  const [genderValue, setGenderValue] = useState("I");
  const [exerciseSkillValue, setExerciseSkillValue] = useState("0");
  const [exerciseTypeValue, setExerciseTypeValue] = useState("soccer");
  const [content, setContent] = useState("");
  const [age,setAge] = useState(0);

  const [openGender, setOpenGender] = useState(false);
  const [openExerciseSkill, setOpenExerciseSkill] = useState(false);
  const [openExerciseType, setOpenExerciseType] = useState(false);
  const [openAge, setOpenAge] = useState(false);


  const [manOrWomen, setManOrWomen ] = useState([
    { label: "무관", value: "I" },
    { label: "여자", value: "F" },
    { label: "남자", value: "M" },
  ])

  const [exerciseTypes, setExerciseTypes ] = useState([
    {label: '축구', value: 'soccer'},
    {label: '야구', value: 'baseball'},
    {label: '농구', value: 'basketball'}
  ])
  
  const [exerciseSkills, setExerciseSkills ] = useState([
    { label: "무관", value: "0" },
    { label: "발바닥", value: "1" },
    { label: "양말", value: "2" },
    { label: "슬리퍼", value: "3" },
    { label: "운동화", value: "4" },
  ])

  const [ages, setAges ] = useState([
    { label: "무관", value: "0" },
    { label: "10대", value: "10" },
    { label: "20대", value: "20" },
    { label: "30대", value: "30" },
    { label: "40대", value: "40" },
    { label: "50대", value: "50" },
    { label: "60대\n이상", value: "60" },
  ])

AsyncStorage.getItem('@id').then((userid) =>
    setUserId(userid.slice(1, -1))
    );

  const opPressCreatePost = async () => {
    if (title == "" || location== "" || requiredNum == 0 || content == "") {
      alert("빈칸을 채워주세요!");
    }
    else {
      var data = {
        "user_id": userId,
        "title": title,
        "content": content,
        "location": location,
        "meeting_date": timestamp(meetingDate),
        "post_date": timestamp(postDate),
        "required_number": requiredNum,
        "age": age,
        "gender": genderValue,
        "exercise": exerciseTypeValue,
        "exercise_skill": exerciseSkillValue
      };
      try {
        console.log(data);
        const response = await axios
          .post(
            `http://${manifest.debuggerHost
              .split(":")
              .shift()}:8080/api/v1/posts`,
            data
          )
          .then(function async(response) {
            if (response.data["success"] == true) {
              alert("게시물이 등록되었습니다.");
              navigation.navigate("Post");
            }
          })
          .catch(function (error) {
            alert("게시물 작성 오류입니다.");
            //console.log(error.response.data);
            console.log(error);
            throw error;
          });
      } catch (error) {
        console.log(error);
        throw error;
      }
    }

    function timestamp(){
    var source = new Date();
    var date = source.getFullYear() + "-" + ((source.getMonth() + 1) > 9 ? (source.getMonth() + 1).toString() : "0" + (source.getMonth() + 1)) + "-" + (source.getDate() > 9 ? source.getDate().toString() : "0" + source.getDate().toString());

    var hours = ('0' + source.getHours()).slice(-2); 
    var minutes = ('0' + source.getMinutes()).slice(-2);

    var time = hours + ':' + minutes

    return date+" "+time;
    }

  }
    return (
      <View style={styles.container}>
        <Header navigation={navigation}></Header>
        <View style={styles.body}>
          <View style={styles.postContainer}>
            <View style={styles.postHeader}>
                <Text style={styles.postHeaderText}> 게시물 등록 </Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Image
                    style={styles.x}
                    source={require("../icon/x.png")}
            />  
            </TouchableOpacity>
            <ScrollView nestedScrollEnabled={true} style={styles.scrollView}>
            <View style={styles.postInfo}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleLabel}>제목</Text>
              <TextInput
                style={styles.titleInput}
                onChangeText={setTitle}
                value={title}
                maxLength={50}
                />
            </View>
            <View style={styles.locationContainer}>
              <Text style={styles.locationLabel}>운동장소</Text>
              <TextInput
                style={styles.locationInput}
                onChangeText={setLocation}
                value={location}
                maxLength={50}
              />
              </View>
            <View style= {styles.dateContainer}>
            <Text style={styles.dateLabel}>모임날짜</Text>
             <DatePicker
              style={styles.datePickerStyle}
              onSelectedChange={setMeetingDate}
              />
            </View>
            <View style = {styles.requiredNumContainer}>
            <Text style={styles.requiredNumLabel}>필요인원</Text>
              <TextInput
                style={styles.requiredNumInput}
                onChangeText={setRequiredNum}
                placeholder="00"
                keyboardType="numeric"
                maxLength={3}
              />
            <Text style={{ zIndex: 800 }}> 명</Text>
            </View>
            <View style = {styles.exerciseTypeContainer}>
                <Text style = {styles.exerciseTypeLabel}>운동종류</Text>
                <DropDownPicker style={styles.exerciseTypePicker}
                  placeholder="축구"
                  open={openExerciseType}
                  containerStyle={styles.dropDownContainer}
                  value={"soccer"}
                  items={exerciseTypes}
                  setOpen={setOpenExerciseType}
                  setValue={setExerciseTypeValue}
                  setItems={setExerciseTypes}
                  onChangeValue = {setExerciseTypeValue}
                  listMode="SCROLLVIEW"
                />
            </View>
            <View style = {styles.exerciseSkillContainer}>
                <Text style = {styles.exerciseSkillLabel}>운동능력</Text>
                <DropDownPicker style ={styles.exerciseSkillPicker}
                  placeholder="무관"
                  open={openExerciseSkill}
                  containerStyle={{width: SCREEN_WIDTH/4, alignSelf:'center', backgroundColor : 'white'}}
                  items={exerciseSkills}
                  setOpen={setOpenExerciseSkill}
                  setValue={setExerciseSkillValue}
                  setItems={setExerciseSkills}
                  onChangeValue= {setExerciseSkillValue}
                  listMode="SCROLLVIEW"
                />
            </View>
            <View style = {styles.ageContainer}>
                <Text style = {styles.ageLabel}>나이     </Text>
                <DropDownPicker style={styles.agePicker}
                  placeholder = "무관"
                  open={openAge}
                  containerStyle={styles.dropDownContainer}
                  items={ages}
                  setOpen={setOpenAge}
                  setValue={setAge}
                  setItems={setAges}
                  onChangeValue= {setAge}
                  listMode="SCROLLVIEW"
                />
            </View>
            <View style = {styles.genderContainer}>
                <Text style = {styles.genderLabel}>성별     </Text>
                <DropDownPicker style={styles.genderPicker}
                  placeholder = "무관"
                  open={openGender}
                  containerStyle={styles.dropDownContainer}
                  items={manOrWomen}
                  setOpen={setOpenGender}
                  setValue={setGenderValue}
                  setItems={setManOrWomen}
                  onChangeValue= {setGenderValue}
                  listMode="SCROLLVIEW"
                />
            </View>
            <View style = {styles.line}></View>
            <TextInput
                style={styles.content}
                value={content}
                onChangeText={setContent}
                maxLength={500}
                placeholder = "운동 모임에 필요한 내용을 적어주세요!"
                placeholderTextColor="#E5E5E5"
              />
            </View>
            </ScrollView>
          </View>
          <TouchableOpacity onPress={() => {
            opPressCreatePost();
          }} underlayColor="white">
          <Text style={styles.postBtn}>확인</Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
      alignItems: "center",
    },
    body: {
        flex: 0.87,
        alignItems: "center",
        backgroundColor: "#E5E5E5",
        width: SCREEN_WIDTH
    },
    back:{
        flexDirection:"row",
        marginRight: SCREEN_WIDTH*0.6,
    },
    backText:{
        fontSize: 20,
    },
    postContainer :{
        backgroundColor: "white",
        width: SCREEN_WIDTH*0.9,
        height: SCREEN_HEIGHT*0.72,
        borderRadius: 30,
        //paddingLeft: SCREEN_WIDTH*0.05,
        //paddingTop: SCREEN_HEIGHT*0.03,
        //paddingBottom: SCREEN_HEIGHT*0.05,
        alignItems: "center",
        marginTop: SCREEN_HEIGHT * 0.02
    },
    subject:{
        fontSize:20,
        lineHeight:70,
        fontWeight: "700"
    },
    postHeader:{
        flexDirection:"row",
        padding:20
    },
    postHeaderText:{
        fontSize:20,
    },
    x: {
        resizeMode: "contain",
        height: SCREEN_HEIGHT * 0.025,
        width: SCREEN_WIDTH * 0.08,
        marginLeft: SCREEN_WIDTH*0.7,
        marginTop: -SCREEN_HEIGHT*0.05
    },
    postInfo : {
      marginTop: SCREEN_HEIGHT*0.03,
      marginLeft: SCREEN_WIDTH*0.15,
      justifyContent: "center",
      width : SCREEN_WIDTH*0.75
    },
    titleContainer : {
      flexDirection:"row",
      marginRight: SCREEN_WIDTH*0.1,
    },
    titleLabel : {
      fontSize:16,
      marginRight:10
    },
    titleInput: {
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderTopWidth: 0,
      borderBottomWidth: 1,
      marginBottom: SCREEN_HEIGHT * 0.05,
      width: SCREEN_WIDTH * 0.3,
      borderColor: "#9C9C9C",
    },
    locationInput : {
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderTopWidth: 0,
      borderBottomWidth: 1,
      marginBottom: SCREEN_HEIGHT * 0.05,
      width: SCREEN_WIDTH * 0.3,
      borderColor: "#9C9C9C",
    },
    locationLabel :{
      fontSize : 16,
      marginRight:10
    },
    locationContainer:{
      flexDirection:"row",
      marginRight: SCREEN_WIDTH*0.1,
    },
    dateContainer : {
      justifyContent : "center",
    },
    dateIcon : {
      display: 'None',
      position: 'absolute',
      left: 0,
      top: 4
    },
    dateLabel : {
      fontSize : 16,
      marginRight:10,
      marginBottom : SCREEN_HEIGHT*0.01
    },
    
    exerciseTypeContainer : {
      flexDirection:"row",
      marginRight: SCREEN_WIDTH*0.1,
      marginBottom : SCREEN_HEIGHT*0.02,
      zIndex:700
    },
    exerciseTypeLabel : {
      fontSize : 16,
      marginRight:10,
      marginBottom : SCREEN_HEIGHT*0.05,
      zIndex:700

    },
    exerciseSkillContainer : {
      flexDirection:"row",
      marginRight: SCREEN_WIDTH*0.1,
      marginBottom : SCREEN_HEIGHT*0.03,
      zIndex:600
    },
    exerciseSkillLabel : {
      fontSize : 16,
      marginRight:10,
      zIndex:600

    },
    requiredNumContainer: {
      flexDirection:"row",
      marginRight: SCREEN_WIDTH*0.1,
      zIndex: 800
    },
    requiredNumLabel: {
      fontSize : 16,
      marginRight:10,
      zIndex: 800
    },
    requiredNumInput: {
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderTopWidth: 0,
      borderBottomWidth: 1,
      marginBottom: SCREEN_HEIGHT * 0.03,
      width: SCREEN_WIDTH * 0.05,
      zIndex: 800,
      marginLeft: 10,
      marginRight:5
    },
    exerciseTypeLabel:{
      fontSize : 16,
      marginTop : SCREEN_HEIGHT*0.02,
      marginRight : 10,
      zIndex:700

    },
    exerciseTypePicker: {
      width :  SCREEN_WIDTH/5,    
      zIndex: 700
    },
    exerciseSkillItem: {
      width : SCREEN_WIDTH/2,
      zIndex:600

    },
    exerciseSkillLabel: {
      fontSize : 16,
      marginTop : SCREEN_HEIGHT*0.02,
      marginRight : 10,
      zIndex:600

    },
    exerciseSkillPicker : {
      width :  SCREEN_WIDTH/4,
      zIndex:2000

    },
    ageContainer : {
      flexDirection:"row",
      marginRight: SCREEN_WIDTH*0.1,
      marginBottom : SCREEN_HEIGHT*0.02,
      zIndex:500
    },
    ageLabel:{
      fontSize : 16,
      marginRight:10,
      marginTop : SCREEN_HEIGHT*0.01,
      zIndex:500
    },
    agePicker : {
      width :  SCREEN_WIDTH/5,
      marginLeft : SCREEN_WIDTH*0.01,
      marginTop : -SCREEN_HEIGHT*0.01,
      zIndex:500
    },

    genderContainer : {
      flexDirection:"row",
      marginRight: SCREEN_WIDTH*0.1,
      marginBottom : SCREEN_HEIGHT*0.02,
      zIndex:400
    },
    genderPicker: {
      width :  SCREEN_WIDTH/5,
      marginLeft : SCREEN_WIDTH*0.01,
      marginTop : SCREEN_HEIGHT*0.002,
      zIndex:500
    },
    genderLabel : {
      fontSize : 16,
      marginRight:10,
      marginTop : SCREEN_HEIGHT*0.02,
      zIndex:500
    },

    scrollView: {
      backgroundColor: '#FFFFFF',
      marginVertical: 20,
    },
  line : {
    width:SCREEN_WIDTH*0.6,
    height:1,
    backgroundColor: "black",
    marginTop: SCREEN_HEIGHT*0.03,
    marginBottom:SCREEN_HEIGHT*0.03
  },
  postBtn: {
    backgroundColor: "#D3EEFF",
    fontSize: 17,
    alignItems: "center",
    textAlign: "center",
    paddingBottom: 8,
    paddingTop: 8,
    borderRadius: 50,
    width: SCREEN_WIDTH * 0.55,
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 2 },
    elevation: 3,
    marginTop: SCREEN_HEIGHT*0.03,
  },
  dropDownContainer : {
    width: SCREEN_WIDTH/5, 
    alignSelf:'center' ,
    backgroundColor : 'white'
  },
  datePickerStyle : {
    zIndex : 1000,
    marginLeft : -SCREEN_WIDTH*0.08
  },
  content : {
    width:SCREEN_WIDTH*0.6,
    marginBottom:SCREEN_HEIGHT*0.1
  }
});
  