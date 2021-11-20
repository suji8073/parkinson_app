// progress.js에 들어갈 리스트뷰 모양
import React from "react";
// import PropTypes from "prop-types";
import { Ionicons } from "@expo/vector-icons";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  ScrollView,
} from "react-native";
import { WithLocalSvg } from "react-native-svg";

const task_patient = ({ image, text1, text2 }) => {
  return (
    //  전체 뷰
    <View
      style={{
        alignItems: "center",
        flexDirection: "row",
        height: 100,
        width: "90%",
        borderBottomWidth: 1,
        borderColor: "#E0E0E0",
        justifyContent: "center",
        marginLeft: "5%",
        marginRight: "5%",
      }}
    >
      <View style={styles.imageView}>
        <WithLocalSvg width={140} height={70} asset={image} />
      </View>

      <View style={styles.textView}>
        <Text style={styles.text1}>{text1}</Text>
        <Text style={styles.text2}>{text2}</Text>
      </View>
    </View>
  );
};

export default task_patient;
const styles = StyleSheet.create({
  text1: {
    fontSize: 17,
    alignItems: "center",
    color: "#000000",
    justifyContent: "center",
    fontWeight: "bold",
  },
  text2: {
    fontSize: 16,
    alignItems: "center",
    color: "#000000",
    justifyContent: "center",
    marginTop:10,
  },
  imageView: {
    flex:2.5,
    margin: "2%",
    alignItems: "center",
    justifyContent: "center",
  },
  textView:{
    margin: "2%",
    flex:3,
    flexDirection: "column",
  }
});