import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
  ScrollView
} from "react-native";
import { Image } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from '@expo/vector-icons'; 
import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-datepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import {Picker} from '@react-native-picker/picker';
import Header from "../contents/Header";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function Post({ navigation }) {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [requiredNum, setRequiredNum] = useState("");

  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [openTime, setOpenTime] = useState(false);
  const [openGender, setOpenGender] = useState(false);
  const [openExerciseSkill, setOpenExerciseSkill] = useState(false);
  const [openExerciseType, setOpenExerciseType] = useState(false);

  const [genderValue, setGenderValue] = useState("");
  const [morningOrEveningValue, setMorningOrEveningValue] = useState("");
  const [exerciseSkillValue, setExerciseSkillValue] = useState("");
  const [exerciseTypeValue, setExerciseTypeValue] = useState("");

  const [morningOrEvening, setMorningOrEvening] = useState([
    {label: 'AM', value: 'am'},
    {label: 'PM', value: 'pm'}
  ]);

  const [manOrWomen, setManOrWomen ] = useState([
    {label: '여성', value: 'F'},
    {label: '남성', value: 'M'}
  ])

  const [exerciseTypes, setExerciseTypes ] = useState([
    {label: '축구', value: 'soccer'},
    {label: '야구', value: 'baseball'},
    {label: '농구', value: 'basketball'}

  ])
  
  const [exerciseSkills, setExerciseSkills ] = useState([
    {label: '발바닥', value: 'sole'},
    {label: '양말', value: 'sock'},
    {label: '슬리퍼', value: 'slipper'},
    {label: '운동화', value: 'sneaker'}


  ])

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

    return (
      <View style={styles.container}>
        <Header navigation={navigation}></Header>
        <View style={styles.body}>
          <View style={styles.postContainer}>
            <View style={styles.postHeader}>
                <Text style={styles.postHeaderText}> 게시물 등록 </Text>
            </View>
            <Image
                    style={styles.x}
                    source={require("../icon/x.png")}
            />  
            <ScrollView style={styles.scrollView}>

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
                date={date} //initial date from state
                mode="date" //The enum of date, datetime and time
                placeholder="select date"
                format="DD-MM-YYYY"
                minDate="01-01-2016"
                maxDate="01-01-2019"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                dateIcon: {
                  //display: 'none',
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0,
                },
                dateInput: {
                  marginLeft: 36,
                },
              }}
              onDateChange={(date) => {
                setDate(date);
              }}
            />
            </View>
            <View style= {styles.timeContainer}>
              <Text style={styles.timeLabel}>모임시간</Text>
              <DropDownPicker style={styles.timePicker}
                  placeholder="AM"
                  open={openTime}
                  value={morningOrEveningValue}
                  containerStyle={{ width: SCREEN_WIDTH/6, alignSelf:'center' }}
                  dropDownStyle={{ width: 2, backgroundColor: '#FFFFFF'}}
                  items={morningOrEvening}
                  setOpen={setOpenTime}
                  setValue={setMorningOrEveningValue}
                  setItems={setMorningOrEvening}
                  
                />
              <View style={styles.timeHourMinuteContainer}>
                <TextInput
                style={styles.timeInput}
                onChangeText={setHour}
                value={hour}
                placeholder="00"
                keyboardType="numeric"
                maxLength={3}
              />
              <Text>시</Text>
              <TextInput
                style={styles.timeInput}
                onChangeText={setMinute}
                value={minute}
                placeholder="00"
                keyboardType="numeric"
                maxLength={3}
              />
              <Text>분</Text>
              </View>
            </View>
            <View style = {styles.requiredNumContainer}>
            <Text style={styles.requredNumLabel}>필요인원</Text>
              <TextInput
                style={styles.requiredNumInput}
                onChangeText={setRequiredNum}
                placeholder="00"
                keyboardType="numeric"
                maxLength={3}
              />
            <Text> 명</Text>
            </View>
            <View style = {styles.genderContainer}>
                <Text style = {styles.genderLabel}>성별     </Text>
                <DropDownPicker style={styles.genderPicker}
                  placeholder = "여"
                  open={openGender}
                  value={genderValue}
                  items={manOrWomen}
                  setOpen={setOpenGender}
                  setValue={setGenderValue}
                  setItems={setManOrWomen}

                />
            </View>
            <View style = {styles.exerciseTypeContainer}>
                <Text style = {styles.exerciseTypeLabel}>운동종류</Text>
                <DropDownPicker style={styles.exerciseTypePicker}
                  placeholder="축구"
                  open={openExerciseType}
                  value={exerciseTypeValue}
                  items={exerciseTypes}
                  setOpen={setOpenExerciseType}
                  setValue={setExerciseTypeValue}
                  setItems={setExerciseTypes}
                />
               
            </View>
            <View style = {styles.exerciseSkillContainer}>
                <Text style = {styles.exerciseSkillLabel}>운동능력</Text>
                <DropDownPicker style ={styles.exerciseSkillPicker}
                  placeholder="발바닥"
                  open={openExerciseSkill}
                  value={exerciseSkillValue}
                  items={exerciseSkills}
                  setOpen={setOpenExerciseSkill}
                  setValue={setExerciseSkillValue}
                  setItems={setExerciseSkills}
                />
            </View>
            <View style = {styles.line}></View>
            <Text style={styles.content}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
              minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
              pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
              culpa qui officia deserunt mollit anim id est laborum.
            </Text>
            </View>
            </ScrollView>
          </View>
          <TouchableOpacity onPress={() => onPress()} underlayColor="white">
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
        width: SCREEN_WIDTH*0.8,
        height: SCREEN_HEIGHT*0.7,
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
        marginLeft: SCREEN_WIDTH*0.6,
        marginTop: -SCREEN_HEIGHT*0.05
    },
    postInfo : {
      marginTop: SCREEN_HEIGHT*0.05,
      marginLeft: SCREEN_WIDTH*0.05,
      justifyContent: "center",
      width : SCREEN_WIDTH/1.7
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
      marginBottom : SCREEN_HEIGHT*0.01
    },
    dateContainer : {
      flexDirection:"row",
      marginRight: SCREEN_WIDTH*0.1,
      marginBottom : SCREEN_HEIGHT*0.01
    },
    dateLabel : {
      fontSize : 16,
      marginRight:10,
      marginTop : SCREEN_HEIGHT*0.01
    },
    timeContainer : {
      flexDirection:"row",
      marginRight: SCREEN_WIDTH*0.1,
      marginBottom : SCREEN_HEIGHT*0.01

    },
    timePicker : {
      width :  SCREEN_WIDTH/5,
      marginLeft : SCREEN_WIDTH*0.01
    },
    genderPicker: {
      width :  SCREEN_WIDTH/5,
      marginLeft : SCREEN_WIDTH*0.01,
      marginTop : -SCREEN_HEIGHT*0.01
    },
    timeLabel : {
      fontSize : 16,
      marginRight:10,
      marginTop : SCREEN_HEIGHT*0.05
    },
    hourInput : {
      marginLeft : -SCREEN_WIDTH*0.4
    },
    timeInput : {
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderTopWidth: 0,
      borderBottomWidth: 1,
      marginBottom: SCREEN_HEIGHT * 0.05,
      width: SCREEN_WIDTH * 0.05,
    },
    minuteInput : {
      marginLeft : SCREEN_WIDTH*0.1
    },
    timeHourMinuteContainer : {
      flexDirection:"row",
      marginLeft : SCREEN_WIDTH*0.08,
      marginTop : SCREEN_HEIGHT*0.05
    },
    genderContainer : {
      flexDirection:"row",
      marginRight: SCREEN_WIDTH*0.1,
      marginBottom : SCREEN_HEIGHT*0.02

    },
    genderLabel : {
      fontSize : 16,
      marginRight:10,
      marginTop : SCREEN_HEIGHT*0.01,
    },
    exerciseTypeContainer : {
      flexDirection:"row",
      marginRight: SCREEN_WIDTH*0.1,
      marginBottom : SCREEN_HEIGHT*0.02

    },
    exerciseTypeLabel : {
      fontSize : 16,
      marginRight:10,
      marginBottom : SCREEN_HEIGHT*0.05

    },
    exerciseSkillContainer : {
      flexDirection:"row",
      marginRight: SCREEN_WIDTH*0.1,
      marginBottom : SCREEN_HEIGHT*0.03
    },
    exerciseSkillLabel : {
      fontSize : 16,
      marginRight:10
    },
    requiredNumContainer: {
      flexDirection:"row",
      marginRight: SCREEN_WIDTH*0.1,
      marginBottom : SCREEN_HEIGHT*0.01
    },
    requredNumLabel: {
      fontSize : 16,
      marginRight:10
    },
    requiredNumInput: {
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderTopWidth: 0,
      borderBottomWidth: 1,
      marginBottom: SCREEN_HEIGHT * 0.05,
      width: SCREEN_WIDTH * 0.05,
    },
    exerciseSkillItem: {
      width : SCREEN_WIDTH/2
    },
    exerciseTypeLabel:{
      fontSize : 16,
      marginTop : SCREEN_HEIGHT*0.02,
      marginRight : 10
    },
    exerciseSkillLabel: {
      fontSize : 16,
      marginTop : SCREEN_HEIGHT*0.02,
      marginRight : 10
    },
    exerciseTypePicker: {
      width :  SCREEN_WIDTH/5,      
    },
    exerciseSkillPicker : {
      width :  SCREEN_WIDTH/4,
    },
    scrollView: {
      backgroundColor: '#FFFFFF',
      marginVertical: 20,
    },
  line : {
    width:SCREEN_WIDTH*0.55,
    height:1,
    backgroundColor: "black",
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
  
  }
});
  