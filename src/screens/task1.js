import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import PropTypes from "prop-types";
import { Ionicons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { WithLocalSvg } from "react-native-svg";

import nocheck from "../icon/radio_btn_nocheck.svg";
import check from "../icon/radio_button_check.svg";
function Task({ text1, text2, text3 }) {
  return (
    <View style={styles.Container}>
      <Ionicons name="person-circle-sharp" size={50} color="lightblue" justifyContent="center" alignItems="center"/>
      <View style={styles.textgroup}>
        <Text style={styles.titleText}> {text1}</Text>
        <View style={styles.textgroup1}>
          <Text style={styles.subtext}> {text2}세 /</Text>
          <Text style={styles.subtext}> {text3}성</Text>
        </View>
      </View>
      <View style={styles.margin}></View>
      <EvilIcons
        name="star"
        size={40}
        color="green"
        //type={images.update}
      />
    </View>
  );
}

Task.propTypes = {
  text1: PropTypes.string.isRequired,
  text2: PropTypes.string.isRequired,
  text3: PropTypes.string.isRequired,
};

export default Task;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#ebebeb",
    alignItems: "center",
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 10,
    height: 90,
    borderRadius: 10,
    flexDirection: "row",
  },

  textgroup: {
    alignItems: "flex-start",
    marginLeft: 15,
    justifyContent: "center",
    flexDirection: "column",
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  textgroup1: {
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    marginTop: 5,
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  titleText: {
    alignItems: "flex-start",
    fontSize: 17,
    alignItems: "center",
    color: "#484848",
    justifyContent: "center",
    fontWeight: "bold",
  },

  subtext: {
    alignItems: "flex-start",
    fontSize: 14,
    alignItems: "center",
    color: "#747474",
    justifyContent: "center",
  },

  margin: {
    // padding:30,
    alignItems: "flex-start",
    justifyContent: "center",
    flex: 1,
  },
});