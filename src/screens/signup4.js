import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Context from "../Context/context";

import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from "react-native-responsive-dimensions";

const HideKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

import AsyncStorage from "@react-native-async-storage/async-storage";
export default class siginup4 extends Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      user_sex: 1,
      user_id: "",
      usingid: false,
      user_pw: "",
      user_name: "",
      user_telphone: "",
      user_age: "",
      user_rank: 1,
      text: "",
      empty_check_id: 0,
      user_gender: "여",
    };
  }

  onPress_age1 = () => {
    if (this.state.user_sex !== 1) {
      this.setState({ user_sex: 1 });
      console.log(this.state.user_sex);
    }
  };

  onPress_age2 = () => {
    if (this.state.user_sex !== 2) {
      this.setState({ user_sex: 2 });
      console.log(this.state.user_sex);
    }
  };
  onPress_rank1 = () => {
    if (this.state.user_rank !== 1) {
      this.setState({ user_rank: 1 });
      console.log(this.state.user_rank);
    }
  };

  onPress_rank2 = () => {
    if (this.state.user_rank !== 0) {
      this.setState({ user_rank: 0 });
      console.log(this.state.user_rank);
    }
  };

  login_input = () => {
    fetch(
      "http://hccparkinson.duckdns.org:19737/chamsignup/id/" +
        this.state.user_id,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => {
        console.log(response.status);
        if (response.status === 400) {
          console.log("로그인 불가능");
          Alert.alert("존재하는 아이디입니다.\n다른 아이디를 입력하세요.");
        } else if (response.status === 200) {
          console.log("로그인 가능");
          Alert.alert("사용 가능한 아이디입니다."); //알람!
          this.setState({
            usingid: true,
          });
        } else {
          throw new Error("Unexpected Http Status Code");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  empty_check = () => {
    if (
      // 모두 공백이 아니면
      this.state.user_id !== "" &&
      this.state.user_pw !== "" &&
      this.state.user_name !== "" &&
      this.state.user_telphone !== "" &&
      this.state.user_age !== ""
    ) {
      this.setState({ empty_check_id: 1 });
    } else this.setState({ empty_check_id: 0 });
  };

  signup = () => {
    fetch("http://hccparkinson.duckdns.org:19737/chamsignup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        uid: this.state.user_id,
        password: this.state.user_pw,
        uname: this.state.user_name,
        gender: this.state.user_gender,
        phone: "010" + this.state.user_telphone,
        birthday: this.state.user_age,
        ranking: this.state.user_rank,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        AsyncStorage.setItem(
          "user_info",
          JSON.stringify({
            u_id: this.state.user_id,
            u_pw: this.state.user_pw,
            u_name: this.state.user_name,
          }),
          () => {
            console.log("유저정보 저장 완료");
          }
        );

        console.log("회원가입 성공!");
        Alert.alert("회원가입이 정상적으로 완료되었습니다.");

        this.props.navigation.navigate("login");
      });
  };

  signup_check = () => {
    if (this.state.usingid === true) {
      if (
        // 모두 공백이 아니면
        this.state.user_id !== "" &&
        this.state.user_pw !== "" &&
        this.state.user_name !== "" &&
        this.state.user_telphone !== "" &&
        this.state.user_age !== ""
      ) {
        if (this.state.user_sex === 1) {
          this.setState({ user_gender: "M" });
        } else {
          this.setState({ user_gender: "F" });
        }

        // 모든 정보가 다 기입되면
        fetch(
          "http://hccparkinson.duckdns.org:19737/chamsignup/phone/010" +
            this.state.user_telphone,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        )
          .then((response) => {
            console.log(response.status);
            if (response.status === 200) {
              console.log("사용 가능");
              this.signup();
            } else if (response.status === 400) {
              console.log("사용 불가능");
              Alert.alert("존재하는 사용자입니다.");
            } else {
              throw new Error("Unexpected Http Status Code");
            }
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        Alert.alert(
          // 모든 정보가 다 기입되지 않았을 때
          "모든 정보를 올바르게 입력했는지 확인한 후 다시 시도하십시오."
        );
      }
    } else {
      Alert.alert(
        // 아이디 중복 확인 안 했을 때
        "아이디 중복 확인을 해주세요!"
      );
    }
  };

  render() {
    return (
      <HideKeyboard>
        <View style={styles.finalView}>
          <View style={styles.settingView}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                this.props.navigation.navigate("signup1");
              }}
            >
              <View>
                <AntDesign
                  name="left"
                  style={{ fontSize: responsiveScreenFontSize(3) }}
                  color="#808080"
                />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.firstView}>
            <ScrollView>
              <View style={styles.secondView}>
                <Text style={styles.titleText}>아이디 / 비밀번호 설정</Text>
                <View style={styles.buttonwhite1}>
                  <TextInput
                    style={styles.textInput1}
                    secureTextEntry={false}
                    placeholder="아이디 입력"
                    onChangeText={(text) => {
                      this.setState({ user_id: text });
                    }}
                  />
                  <View style={styles.clickbtn}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={this.login_input}
                    >
                      <View style={styles.margin}></View>
                      <View style={styles.user_id_click}>
                        <Text style={styles.ttext}>중복 확인</Text>
                      </View>
                      <View style={styles.margin}></View>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.button1}>
                  <TextInput
                    style={styles.textInput}
                    secureTextEntry={true}
                    placeholder="비밀번호 입력"
                    onChangeText={(pw) => {
                      this.setState({ user_pw: pw });
                    }}
                  />
                </View>
              </View>

              <View style={styles.secondView}>
                <View style={styles.checkView}>
                  <Text style={styles.titleText}>성명 / 전화번호</Text>
                  <Text style={styles.check}>*</Text>
                </View>
                <View style={styles.buttonwhite}>
                  <TextInput
                    style={styles.textInput}
                    secureTextEntry={false}
                    placeholder="이름"
                    onChangeText={(name) => {
                      this.setState({ user_name: name });
                    }}
                    maxLength={4}
                  />
                </View>

                <View style={styles.numberbutton}>
                  <View style={styles.number1}>
                    <Text style={styles.MMText}>010</Text>
                  </View>
                  <View style={styles.number2}>
                    <TextInput
                      style={styles.textInput}
                      secureTextEntry={false}
                      placeholder="휴대전화번호"
                      onChangeText={(tel) => {
                        this.setState({ user_telphone: tel });
                      }}
                      keyboardType="number-pad"
                      maxLength={8}
                    />
                  </View>
                </View>
              </View>

              <View style={styles.secondView}>
                <View style={styles.checkView}>
                  <Text style={styles.titleText}>생년월일</Text>
                  <Text style={styles.check}>*</Text>
                </View>
                <View style={styles.buttonwhite}>
                  <TextInput
                    style={styles.textInput}
                    secureTextEntry={false}
                    placeholder="'-' 제외 8자리를 입력해주세요 ex) 19001010"
                    onChangeText={(age) => {
                      this.setState({ user_age: age });
                    }}
                    keyboardType="number-pad"
                    maxLength={8}
                  />
                </View>
              </View>

              <View style={styles.secondView}>
                <View style={styles.checkView}>
                  <Text style={styles.titleText}>성별</Text>
                  <Text style={styles.check}>*</Text>
                </View>

                <View style={styles.numberbutton}>
                  <TouchableOpacity
                    style={
                      this.state.user_sex === 1
                        ? styles.genderB2 //클릭됨
                        : styles.genderB1
                    }
                    activeOpacity={0.8}
                    onPress={this.onPress_age1}
                  >
                    <Text
                      style={
                        this.state.user_sex === 1
                          ? styles.gendertext1
                          : styles.gendertext
                      }
                    >
                      남자
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={
                      this.state.user_sex === 2
                        ? styles.genderB2
                        : styles.genderB11
                    }
                    activeOpacity={0.8}
                    onPress={this.onPress_age2}
                    onChangeText={this.onPress_age2}
                  >
                    <Text
                      style={
                        this.state.user_sex === 2
                          ? styles.gendertext1
                          : styles.gendertext
                      }
                    >
                      {" "}
                      여자{" "}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.secondView}>
                <View style={styles.checkView}>
                  <Text style={styles.titleText}>랭킹참여</Text>
                  <Text style={styles.check}>*</Text>
                </View>
                <View style={{ marginBottom: 3 }}></View>
                <View style={styles.numberbutton}>
                  <TouchableOpacity
                    style={
                      this.state.user_rank === 1
                        ? styles.genderB2 //클릭됨
                        : styles.genderB1
                    }
                    activeOpacity={0.8}
                    onPress={this.onPress_rank1}
                  >
                    <Text
                      style={
                        this.state.user_rank === 1
                          ? styles.gendertext1
                          : styles.gendertext
                      }
                    >
                      한다
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={
                      this.state.user_rank === 0
                        ? styles.genderB2
                        : styles.genderB11
                    }
                    activeOpacity={0.8}
                    onPress={this.onPress_rank2}
                    onChangeText={this.onPress_rank2}
                  >
                    <Text
                      style={
                        this.state.user_rank === 0
                          ? styles.gendertext1
                          : styles.gendertext
                      }
                    >
                      안한다
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.chatControl}>
                <TouchableOpacity
                  style={
                    this.state.usingid === true
                      ? styles.sendButton
                      : styles.sendButton1
                  }
                  activeOpacity={0.8}
                  onPress={this.signup_check}
                >
                  <Text
                    style={
                      this.state.usingid === true ? styles.white : styles.white1
                    }
                  >
                    회 원 가 입
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </HideKeyboard>
    );
  }
}

const styles = StyleSheet.create({
  finalView: {
    height: responsiveScreenHeight(100),
    width: responsiveScreenWidth(100),
    backgroundColor: "#FFFFFF",
  },

  settingView: {
    justifyContent: "center",
    alignItems: "flex-start",
    marginLeft: "4.7%",
    marginTop: "5.3%",
  },

  firstView: {
    marginLeft: "4.7%",
    marginRight: "4.7%",
    marginTop: "5.1%",
    height: responsiveScreenHeight(78),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  secondView: {
    alignItems: "flex-start",
    marginBottom: "6.1%",
  },

  checkView: {
    flexDirection: "row",
  },

  textInput: {
    fontSize: responsiveScreenFontSize(1.5),
    color: "#000000",
    marginLeft: "5.8%",
  },

  textInput1: {
    fontSize: responsiveScreenFontSize(1.5),
    color: "#000000",
    marginLeft: "5.8%",
  },

  clickbtn: {
    fontSize: responsiveScreenFontSize(2),
    color: "#000000",
    marginRight: "3%",
    marginLeft: "48%",
    height: "100%",
    flexDirection: "row",
  },

  user_id_click: {
    backgroundColor: "#5CB405",
    alignItems: "center",
    justifyContent: "center",
    flex: 4,
    width: 60,
    borderColor: "#5CB405",
    borderWidth: 1,
  },

  margin: {
    flex: 1,
    width: "100%",
  },

  MText: {
    fontSize: responsiveScreenFontSize(2),
    color: "#000000",
    marginLeft: "5%",
  },

  MMText: {
    fontSize: responsiveScreenFontSize(2),
    color: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonwhite: {
    justifyContent: "center",
    marginLeft: "1%",
    marginRight: "1%",
    width: "98%",
    height: responsiveScreenHeight(6.7),
    borderWidth: 2,
    borderColor: "#E5E5E5",
  },

  buttonwhite1: {
    marginLeft: "1%",
    marginRight: "1%",
    width: "98%",
    height: responsiveScreenHeight(6.7),
    borderWidth: 2,
    borderColor: "#E5E5E5",
    flexDirection: "row",
  },

  button1: {
    marginLeft: "1%",
    marginRight: "1%",
    width: "98%",
    height: responsiveScreenHeight(6.7),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderColor: "#E5E5E5",
  },

  numberbutton: {
    marginLeft: "1%",
    marginRight: "1%",
    width: "98%",
    height: responsiveScreenHeight(6.7),
    borderColor: "#E5E5E5",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  number1: {
    width: "15%",
    height: responsiveScreenHeight(6.7),
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderColor: "#E5E5E5",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  number2: {
    width: "85%",
    height: responsiveScreenHeight(6.7),
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderColor: "#E5E5E5",
    flexDirection: "row",
  },

  titleText: {
    alignItems: "flex-start",
    fontSize: responsiveScreenFontSize(2),
    marginTop: "1%",
    marginRight: "1%",
    marginLeft: "1%",
    marginBottom: "2%",
    fontWeight: "bold",
    color: "#000000",
  },

  check: {
    alignItems: "flex-start",
    fontSize: responsiveScreenFontSize(2),
    margin: "1%",
    fontWeight: "bold",
    color: "#C20000",
  },

  gendertext: {
    fontSize: responsiveScreenFontSize(1.8),
    color: "#AFAFAF",
    alignItems: "center",
    justifyContent: "center",
  },

  gendertext1: {
    fontSize: responsiveScreenFontSize(1.8),
    color: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  ttext: {
    fontSize: responsiveScreenFontSize(1.52),
    color: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  white: {
    fontSize: responsiveScreenFontSize(2),
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  white1: {
    fontSize: responsiveScreenFontSize(2),
    fontWeight: "bold",
    color: "#AFAFAF",
  },

  genderB1: {
    backgroundColor: "#F5F5F5",
    width: "49%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#E1E1E1",
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 1,
  },
  genderB11: {
    backgroundColor: "#F5F5F5",
    width: "49%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#E1E1E1",
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderLeftWidth: 1,
    borderRightWidth: 2,
  },

  genderB2: {
    backgroundColor: "#7AC819",
    width: "49%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#59A60B",
    borderWidth: 2,
  },

  sendButton: {
    backgroundColor: "#7AC819",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },

  sendButton1: {
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },

  chatControl: {
    height: responsiveScreenHeight(6.8),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "2%",
    marginBottom: "4%",
  },
});
