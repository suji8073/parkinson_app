import React, { Component } from "react";
import { StyleSheet, View, Text, SafeAreaView } from "react-native";

import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from "react-native-responsive-dimensions";

const task_week = ({ id, put_date, progress }) => {
  const dateToStr = () => {
    var day = String(put_date).substring(8, 10);
    if (parseInt(day) === 5) return "5";
    else if (parseInt(day) === 10) return day;
    else if (parseInt(day) === 15) return day;
    else if (parseInt(day) === 20) return day;
    else if (parseInt(day) === 25) return day;
  };
  return (
    //  전체 뷰
    <View
      style={{
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        width: 5,
        marginRight: 3,
        marginLeft: 3,
        marginBottom: 2,
      }}
    >
      <SafeAreaView style={{ flex: 2, width: "100%" }}>
        <View style={styles.graphView}>
          <View
            style={progress <= 50 ? styles.chart1 : styles.chart}
            height={progress * 100}
          ></View>
        </View>
        <View style={styles.textView}>
          <Text style={styles.text11}>{dateToStr()}</Text>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default task_week;
const styles = StyleSheet.create({
  graphView: {
    flexDirection: "row",
    flex: 2.6,
    alignItems: "flex-end",
    justifyContent: "center",
  },

  textView: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  chart: {
    flex: 1,
    backgroundColor: "#5CB405",
  },
  chart1: {
    flex: 1,
    backgroundColor: "#C4C4C4",
  },

  text11: {
    fontSize: 10,
    width: 20,
    color: "#484848",
  },
});
