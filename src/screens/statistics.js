import React, { Component } from "react";
import {
  TextInput,
  StatusBar,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import Task from "./task2";
import SimplePopupMenu from "react-native-simple-popup-menu";
import Context from "../Context/context";

import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from "react-native-responsive-dimensions";

import AsyncStorage from "@react-native-async-storage/async-storage";
const items = [
  { id: "abc", label: "가나다순" },
  { id: "age", label: "나이순" },
  { id: "star", label: "즐겨찾기순" },
];

export default class statistics extends Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      text: "",
      manager_token: "",
    };
    this.arrayholder = [];
  }

  async componentDidMount() {
    const manager_token = await AsyncStorage.getItem("@manager_token");
    this.setState({ manager_token: manager_token });
    this.userfunc();
  }

  userfunc = () => {
    fetch("http://hccparkinson.duckdns.org:19737/onlymanager/userlist?sort=0", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + this.state.manager_token.slice(1, -1),
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        this.setState({ data: json.data }, () => {
          this.arrayholder = json.data;
        });
      });
  };

  searchData(text) {
    const newData = this.arrayholder.filter((item) => {
      const itemData = item.uname.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    this.setState({
      data: newData,
      text: text,
    });
  }

  onMenuPress = (id) => {
    if (id === "age") {
      fetch(
        "http://hccparkinson.duckdns.org:19737/onlymanager/userlist?sort=4",
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + this.state.manager_token.slice(1, -1),
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          this.setState({ data: json.data }, () => {
            this.arrayholder = json.data;
          });
        });
    } else if (id === "abc") {
      // 가나다순
      fetch(
        "http://hccparkinson.duckdns.org:19737/onlymanager/userlist?sort=0",
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + this.state.manager_token.slice(1, -1),
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          this.setState({ data: json.data }, () => {
            this.arrayholder = json.data;
          });
        });
    } else if (id === "star") {
      let data_cp = this.state.data;
      let sortedData = data_cp.slice().sort((a, b) => b.bookmark - a.bookmark);
      console.log(sortedData);

      this.setState({ data: sortedData });
    }
  };

  render() {
    return (
      <View style={styles.finalView}>
        <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

        <View style={styles.menuView}>
          <View style={styles.margin}></View>
          <Text style={styles.titleText}>환자 통계 관리</Text>

          <SimplePopupMenu
            style={styles.margin}
            items={items}
            cancelLabel={"취소"}
            onSelect={(items) => {
              this.onMenuPress(items.id);
            }}
            onCancel={() => console.log("onCancel")}
          >
            <Entypo
              name="dots-three-vertical"
              style={{ fontSize: responsiveScreenFontSize(3) }}
              color="#595959"
            />
          </SimplePopupMenu>
        </View>

        <View style={styles.secondView}>
          <View style={styles.SearchBarWrapper}>
            <TextInput
              style={styles.SearchInput}
              onChangeText={(text) => this.searchData(text)}
              value={this.state.text}
              underlineColorAndroid="transparent"
              placeholder="환자 이름을 입력하세요."
            />
            <Ionicons
              name="search"
              style={{
                fontSize: responsiveScreenFontSize(2.5),
                marginRight: "5%",
              }}
              color="#595959"
            />
          </View>
        </View>

        <View style={styles.threeView}>
          <FlatList
            style={styles.FlatList}
            data={this.state.data}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate("user_statistics", {
                      id: item.uid,
                    });
                  }}
                >
                  <Task
                    user={item.uname}
                    birthday={item.birthday}
                    sex={item.gender}
                    profilepic={item.profilepic}
                  ></Task>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  finalView: {
    height: responsiveScreenHeight(88),
    width: responsiveScreenWidth(100),
    backgroundColor: "#FFFFFF",
  },
  menuView: {
    backgroundColor: "#FFFFFF",
    height: "8.5%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    borderBottomWidth: 1.8,
    borderColor: "#E5E5E5",
    paddingRight: "5%",
    paddingLeft: "5%",
  },

  titleText: {
    alignItems: "flex-start",
    fontSize: responsiveScreenFontSize(2.48),
    alignItems: "center",
    color: "#000000",
    justifyContent: "center",
    fontWeight: "bold",
  },

  margin: {
    alignItems: "flex-end",
    justifyContent: "center",
    flex: 1,
  },
  secondView: {
    alignItems: "flex-start",
    justifyContent: "center",
    marginTop: responsiveScreenHeight(2.6),
    flexDirection: "row",
    height: responsiveScreenHeight(5.4),
    width: "100%",
    backgroundColor: "#FFFFFF",
  },
  threeView: {
    marginTop: responsiveScreenHeight(2.6),
    alignItems: "flex-start",
    justifyContent: "center",
    flexDirection: "row",
    height: responsiveScreenHeight(62.6),
  },
  FlatList: {
    marginBottom: responsiveScreenHeight(5),
  },

  SearchBarWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    paddingLeft: 10,
    width: responsiveScreenWidth(90),
    height: responsiveScreenHeight(5.4),
    borderRadius: 10,
  },

  SearchInput: {
    marginLeft: responsiveScreenWidth(2.5),
    flex: 3,
    fontSize: responsiveScreenFontSize(1.5),
  },
});
