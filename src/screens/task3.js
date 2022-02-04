import React, { Component } from "react";

import { TouchableOpacity, StyleSheet, View, Text, Alert } from "react-native";

import silverstarsvg from "../icon/silverstar.svg";
import greenstarsvg from "../icon/greenstar.svg";
import PercentageBar from "./progressbar";
import airplane from "../icon/airplane.svg";
import greenairplane from "../icon/greenairplane.svg";

import { WithLocalSvg } from "react-native-svg";
const year = 2021 + 1;
var myHeaders = new Headers();
myHeaders.append(
  "Authorization",
  "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0IiwiUm9sZXMiOlsiUk9MRV9NQU5BR0VSIl0sImlzcyI6IkhDQyBMYWIiLCJpYXQiOjE2NDMyOTEwOTIsImV4cCI6MTY0Mzg5NTg5Mn0.AVyd0JcjLrPVeqfXUsBcOxkvxvgQOkWz4DHl-BCwzOgE5m2UqW31c7l8XiXLVTJo58YthtQ07BAl_zD465KVAQ"
);
myHeaders.append("Content-Type", "application/json");
export default class task3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alarm: greenairplane,
      date: new Date(),
      nowtimestamp: 0,
      sendtimestamp: 0,
    };
  }

  sendtimes = () => {
    this.setState(
      {
        sendtimestamp:
          this.state.date.getFullYear() * 100000000 +
          (this.state.date.getMonth() + 1) * 1000000 +
          this.state.date.getDate() * 10000 +
          (this.state.date.getHours() + 9) * 100 +
          this.state.date.getMinutes(),
      },
      () => {
        console.log(this.state.sendtimestamp);
        console.log(typeof this.state.sendtimestamp);
      }
    );
  };
  nowtimes = () => {
    this.setState(
      {
        nowtimestamp:
          this.state.date.getFullYear() * 100000000 +
          (this.state.date.getMonth() + 1) * 1000000 +
          this.state.date.getDate() * 10000 +
          (this.state.date.getHours() + 9) * 100 +
          this.state.date.getMinutes(),
      },
      () => {
        console.log(this.state.nowtimestamp);
        console.log(typeof this.state.nowtimestamp);
      }
    );
  };
  handleClick = () => {
    if (this.state.alarm === greenairplane) {
      Alert.alert("알림을 전송합니다.");

      this.setState({
        alarm: airplane,
        // 보낸시각
      });

      this.setState({ date: new Date() }, () => {
        this.nowtimes();
        this.sendtimes();
      });
      var refreshIntervalId = setInterval(() => {
        this.setState({ date: new Date() }, () => {
          this.nowtimes();
        });

        if (
          this.state.sendtimestamp !== 0 &&
          this.state.nowtimestamp - this.state.sendtimestamp >= 15
        ) {
          this.setState({
            alarm: greenairplane,
            sendtimestamp: 0,
            nowtimestamp: 0,
          });
          clearInterval(refreshIntervalId);
        }
      }, 60000);
      // 알림 누른 시각과 환자 db로 보냄
    }
  };
  // componentDidMount() {
  //   this.setState({nowtimestamp: this.set.date.ge})
  // }
  render() {
    return (
      //  전체 뷰
      <View
        style={{
          borderRadius: 15,
          borderColor: "#EBEBEB",
          borderWidth: 2,
          margin: "3%",
          height: 100,
          width: "94%",
          flexDirection: "row",
          paddingRight: "5%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* 사용자와 그래프 뷰 , 숫자*/}
        <View
          style={{
            width: "90%",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            flex: 1,
            margin: "5%",
          }}
        >
          <Text style={{ fontSize: 17 }}>
            {this.props.user} / {year - parseInt(this.props.age / 10000)} /{" "}
            {this.props.sex == "M" ? "남" : "여"}성
          </Text>

          {/* 그래프와 숫자 뷰 */}
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: "3%",
            }}
          >
            <View
              style={{
                width: "80%",
                justifyContent: "center",
              }}
            >
              <PercentageBar
                height={20}
                backgroundColor={"#E5E5E5"}
                completedColor={"#7AC819"}
                percentage={Math.ceil(this.props.progress * 100)}
              />
            </View>

            <Text
              style={{
                color: "#484848",
                fontSize: 16,
                marginLeft: "5%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {Math.ceil(this.props.progress * 100)}%
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={this.handleClick} activeOpacity={1}>
          <WithLocalSvg
            style={{ marginTop: "20%" }}
            width={40}
            height={40}
            asset={this.state.alarm}
          />
          <Text
            style={
              this.state.alarm == airplane
                ? styles.timetextgreen
                : styles.timetextsilver
            }
          >
            {this.state.nowtimestamp - this.state.sendtimestamp}분 전
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

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
  full: {
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
  timetextgreen: {
    color: "#000000",
    marginTop: "2%",
  },
  timetextsilver: {
    color: "#FFFFFF",
    marginTop: "2%",
  },
});
