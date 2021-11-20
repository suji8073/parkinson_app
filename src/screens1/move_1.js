import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Body,
  TextInput,
} from "react-native";
import Task from "./task_move";

import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";

import Svg from "../icon/noimage.svg";

function move_1({ navigation }) {
  return (
    <View style={styles.finalView}>
      <View style={styles.menuView}>
        <AntDesign
          name="left"
          size={24}
          color="#808080"
          onPress={() => {
            navigation.navigate("TabNavigation1");
          }}
        />
        <View style={styles.margin}></View>
        <Text style={styles.titleText}>신장운동</Text>
        <View style={styles.margin}></View>
        <EvilIcons name="star" size={30} color="#ffffff" />
      </View>

      <View style={styles.secondView}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("move_play");
            }}
          >
            <Task image={Svg} text1="목 앞 근육 스트레칭" text2="1 / 5"></Task>
          </TouchableOpacity>

          <Task image={Svg} text1="목 좌우 근육 스트레칭" text2="1 / 5"></Task>
          <Task
            image={Svg}
            text1="목통 앞쪽 근육 스트레칭"
            text2="1 / 5"
          ></Task>
          <Task
            image={Svg}
            text1="목통 옆쪽 근육 스트레칭"
            text2="1 / 5"
          ></Task>
          <Task
            image={Svg}
            text1="목통 회전 근육 스트레칭"
            text2="1 / 5"
          ></Task>
          <Task image={Svg} text1="목통 스트레칭 1단계" text2="1 / 5"></Task>
          <Task image={Svg} text1="목통 스트레칭 2단계" text2="1 / 5"></Task>
          <Task image={Svg} text1="목통 스트레칭 3단계" text2="1 / 5"></Task>
        </ScrollView>
      </View>
    </View>
  );
}

export default move_1;

const styles = StyleSheet.create({
  finalView: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  menuView: {
    marginTop: "10%",
    backgroundColor: "#FFFFFF",
    height: 58,
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 20,
    paddingLeft: 20,
    justifyContent: "flex-start",
    borderBottomWidth: 1.8,
    borderColor: "#E5E5E5",
  },

  titleText: {
    alignItems: "flex-start",
    fontSize: 21,
    alignItems: "center",
    color: "#000000",
    justifyContent: "center",
    fontWeight: "bold",
  },

  firstView: {
    // padding:30,
    alignItems: "center",
    justifyContent: "center",
    flex: 2,
    margin: 15,
    backgroundColor: "#FFFFFF",
  },

  secondView: {
    alignItems: "flex-start",
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: "30%",
  },

  margin: {
    // padding:30,
    alignItems: "flex-start",
    justifyContent: "center",
    flex: 1,
  },
});