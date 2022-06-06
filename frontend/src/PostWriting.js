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
import { AntDesign } from '@expo/vector-icons'; 
// import DatePicker from 'react-native-datepicker'
import DatePicker from 'react-native-modern-datepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import Header from "../contents/Header";
import Icon from 'react-native-vector-icons/MaterialIcons'

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function PostWriting({ navigation }) {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState('',"YYYY/MM/DD h:m");

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
  const [content, setContent] = useState("");

  const [morningOrEvening, setMorningOrEvening] = useState([
    {label: 'AM', value: 'am'},
    {label: 'PM', value: 'pm'}
  ]);

  const [manOrWomen, setManOrWomen ] = useState([
    {label: '남', value: 'M'},
    {label: '여', value: 'F'}
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
              onSelectedChange={date => setSelectedDate(date)}
              />
            </View>
            <View style= {styles.timeContainer}>
              <Text style={styles.timeLabel}>모임시간</Text>
              <DropDownPicker style={styles.timePicker}
                  placeholder="AM"
                  open={openTime}
                  value={morningOrEveningValue}
                  containerStyle={styles.dropDownContainer}
                  dropDownStyle={{ width: 100, backgroundColor: '#FFFFFF'}}
                  items={morningOrEvening}
                  setOpen={setOpenTime}
                  setValue={setMorningOrEveningValue}
                  setItems={setMorningOrEvening}
                  listMode="SCROLLVIEW"
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
              <Text style={{ zIndex: 900 }}>시  </Text>
              <TextInput
                style={styles.timeInput}
                onChangeText={setMinute}
                value={minute}
                placeholder="00"
                keyboardType="numeric"
                maxLength={3}
              />
              <Text style={{ zIndex: 900 }}>분</Text>
              </View>
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
                  value={exerciseTypeValue}
                  items={exerciseTypes}
                  setOpen={setOpenExerciseType}
                  setValue={setExerciseTypeValue}
                  setItems={setExerciseTypes}
                  listMode="SCROLLVIEW"
                />
            </View>
            <View style = {styles.exerciseSkillContainer}>
                <Text style = {styles.exerciseSkillLabel}>운동능력</Text>
                <DropDownPicker style ={styles.exerciseSkillPicker}
                  placeholder="발바닥"
                  open={openExerciseSkill}
                  containerStyle={styles.dropDownContainer}
                  value={exerciseSkillValue}
                  items={exerciseSkills}
                  setOpen={setOpenExerciseSkill}
                  setValue={setExerciseSkillValue}
                  setItems={setExerciseSkills}
                  listMode="SCROLLVIEW"
                />
            </View>
            <View style = {styles.genderContainer}>
                <Text style = {styles.genderLabel}>성별     </Text>
                <DropDownPicker style={styles.genderPicker}
                  placeholder = "남"
                  open={openGender}
                  containerStyle={styles.dropDownContainer}
                  value={genderValue}
                  items={manOrWomen}
                  setOpen={setOpenGender}
                  setValue={setGenderValue}
                  setItems={setManOrWomen}
                  listMode="SCROLLVIEW"
                />
            </View>
            <View style = {styles.line}></View>
            <TextInput
                style={styles.content}
                value={content}
                maxLength={500}
                placeholder = "운동 모임에 필요한 내용을 적어주세요!"
                placeholderTextColor="#E5E5E5"
              />
        
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
        marginLeft: SCREEN_WIDTH*0.6,
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
    timeContainer : {
      flexDirection:"row",
      width: SCREEN_WIDTH*0.7,
      marginTop : -SCREEN_HEIGHT*0.05,
      marginBottom : SCREEN_HEIGHT*0.01,
      zIndex : 900
    },
    timePicker : {
      width :  SCREEN_WIDTH/5,  
      marginTop: SCREEN_HEIGHT*0.01,
      zIndex : 900
    },
    timeLabel : {
      fontSize : 16,
      marginRight:10,
      marginTop : SCREEN_HEIGHT*0.05,
      zIndex : 900
    },
    hourInput : {
      marginLeft : -SCREEN_WIDTH*0.4,
      zIndex : 900
    },
    timeInput : {
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderTopWidth: 0,
      borderBottomWidth: 1,
      marginBottom: SCREEN_HEIGHT * 0.05,
      marginLeft:10,
      width: SCREEN_WIDTH * 0.05,
      zIndex : 900
    },
    minuteInput : {
      marginLeft : SCREEN_WIDTH*0.1,
      zIndex : 900
    },
    timeHourMinuteContainer : {
      zIndex : 900,
      flexDirection:"row",
      height: "auto",
      marginTop : SCREEN_HEIGHT*0.05,
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
    genderContainer : {
      flexDirection:"row",
      marginRight: SCREEN_WIDTH*0.1,
      marginBottom : SCREEN_HEIGHT*0.02,
      zIndex:500
    },
    genderPicker: {
      width :  SCREEN_WIDTH/5,
      marginLeft : SCREEN_WIDTH*0.01,
      marginTop : -SCREEN_HEIGHT*0.01,
      zIndex:500
    },
    genderLabel : {
      fontSize : 16,
      marginRight:10,
      marginTop : SCREEN_HEIGHT*0.01,
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
    marginBottom:SCREEN_HEIGHT*0.05
  }
});
  