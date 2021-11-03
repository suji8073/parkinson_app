import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

function signup4({ navigation }) {
  return (
    <View style={styles.finalView}>
      <View style={styles.settingView}>
        <View style={styles.margin}></View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            navigation.navigate("signup1");
          }}
        >
          <AntDesign name="left" size={24} color="#808080" />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <ScrollView style={styles.scroll}>
          <View style={styles.secondView}>
            <Text style={styles.titleText}>아이디/비밀번호 설정</Text>
            <View style={styles.numberbutton}>
              <TouchableOpacity style={styles.number3}>
                <TextInput
                  style={styles.MText}
                  onChangeText={(text) => {
                    this.setState({ inputText: text });
                  }}
                  placeholder="아이디 입력"
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.button1}>
              <TextInput
                style={styles.textInput}
                onChangeText={(text) => {
                  this.setState({ inputText: text });
                }}
                placeholder="비밀번호 입력"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.secondView}>
            <View style={styles.checkView}>
              <Text style={styles.titleText}>성명/전화번호</Text>
              <Text style={styles.check}>*</Text>
            </View>
            <TouchableOpacity style={styles.buttonwhite}>
              <TextInput
                style={styles.textInput}
                onChangeText={(text) => {
                  this.setState({ inputText: text });
                }}
                placeholder="이름"
              />
            </TouchableOpacity>

            <View style={styles.numberbutton}>
              <TouchableOpacity style={styles.number1}>
                <Text style={styles.MMText}>010</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.number2}>
                <TextInput
                  style={styles.textInput}
                  onChangeText={(text) => {
                    this.setState({ inputText: text });
                  }}
                  placeholder="휴대전화번호"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.secondView}>
            <View style={styles.checkView}>
              <Text style={styles.titleText}>생년월일</Text>
              <Text style={styles.check}>*</Text>
            </View>
            <TouchableOpacity style={styles.buttonwhite}>
              <TextInput
                style={styles.textInput}
                onChangeText={(text) => {
                  this.setState({ inputText: text });
                }}
                placeholder="'-' 제외 8자리를 입력해주세요"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.secondView}>
            <View style={styles.checkView}>
              <Text style={styles.titleText}>성별</Text>
              <Text style={styles.check}>*</Text>
            </View>
            <View style={styles.numberbutton}>
              <TouchableOpacity
                style={styles.genderB1}
                activeOpacity={0.8}
                //onPress={()=>}
              >
                <Text style={styles.gendertext}> 남자 </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.genderB2}
                activeOpacity={0.8}
                onPress={() => {
                  navigation.navigate("signup4");
                }}
              >
                <Text style={styles.gendertext}> 여자 </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.chatControl}>
            <TouchableOpacity
              style={styles.sendButton}
              activeOpacity={0.8}
              onPress={() => {
                Alert.alert("회원가입이 정상적으로 완료되었습니다.");
                navigation.navigate("login");
              }}
            >
              <Text style={styles.white}> 회 원 가 입 </Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </View>
    </View>
  );
}
export default signup4;

const styles = StyleSheet.create({
  finalView: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFFFFF",
  },

  container: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },

  settingView: {
    alignItems: "flex-start",
  },
  margin: {
    height: 40,
  },

  scroll: {
    marginTop: 30,
  },

  secondView: {
    alignItems: "flex-start",
    marginBottom: 20,
    marginTop: 10,
  },

  checkView: {
    flexDirection: "row",
  },

  textInput: {
    fontSize: 14,
    color: "#AFAFAF",
    marginLeft: 10,
  },

  MText: {
    fontSize: 14,
    color: "#000000",
    marginLeft: 10,
  },

  MMText: {
    fontSize: 14,
    color: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonwhite: {
    justifyContent: "center",
    marginLeft: 3,
    marginRight: 3,
    width: "98%",
    height: 45,
    borderWidth: 2,
    borderColor: "#E5E5E5",
  },

  button1: {
    justifyContent: "center",
    marginLeft: 3,
    marginRight: 3,
    width: "98%",
    height: 45,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderColor: "#E5E5E5",
  },

  numberbutton: {
    marginLeft: 3,
    marginRight: 3,
    width: "98%",
    height: 45,
    borderColor: "#E5E5E5",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    
  },

  number1: {
    width: "15%",
    height: 45,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderColor: "#E5E5E5",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  number2: {
    width: "85%",
    height: 45,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderColor: "#E5E5E5",
    flexDirection: "row",
  },

  number3: {
    width: "100%",
    height: 45,
    borderWidth: 2,
    marginRight: 5,
    borderColor: "#E5E5E5",
    flexDirection: "row",
  },
  number4: {
    width: "25%",
    height: 45,
    borderWidth: 2,
    borderColor: "#E5E5E5",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  settingView: {
    flex: 3,
    alignItems: "flex-start",
    justifyContent: "center",
    marginBottom: 10,
  },

  titleText: {
    alignItems: "flex-start",
    fontSize: 17,
    padding: 3,
    fontWeight: "bold",
    color: "#000000",
  },

  check: {
    alignItems: "flex-start",
    fontSize: 17,
    padding: 3,
    fontWeight: "bold",
    color: "#C20000",
  },

  gendertext: {
    fontSize: 14,
    color: "#AFAFAF",
    alignItems: "center",
    justifyContent: "center",
  },

  white: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  white1: {
    fontSize: 15,
    color: "#AFAFAF",
    alignItems: "center",
    justifyContent: "center",
  },

  genderB1: {
    backgroundColor: "#F5F5F5",
    width: "50%",
    height: 45,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#E1E1E1",
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderLeftWidth: 2,
  },

  genderB2: {
    backgroundColor: "#F5F5F5",
    width: "50%",
    height: 45,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#E1E1E1",
    borderWidth: 2,
  },

  sendButton: {
    flex: 2,
    backgroundColor: "#7AC819",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 50,
    marginTop:5,
    marginBottom:7,
  },

  chatControl: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
