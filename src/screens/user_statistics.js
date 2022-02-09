import React, { Component } from "react";
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Dimensions } from "react-native";
import Task from "../screens1/task_record_day";
import Task1 from "../screens1/task_week1";
import Taskm from "../screens1/task_week1_m";

import Context from "../Context/context";
import { WithLocalSvg } from "react-native-svg";
import { AntDesign } from "@expo/vector-icons";

import page_here from "../icon/page_here.svg";
import page_no from "../icon/page_no.svg";

import DateTimePickerModal from "react-native-modal-datetime-picker";
import { MaterialIcons } from "@expo/vector-icons";

import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from "react-native-responsive-dimensions";

var sum_progress = 0;
var sum_progress_m = 0;
const { width, height } = Dimensions.get("screen");

export default class user_statistics extends Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      data: [], // 일주일 치 막대그래프
      first_date: "",
      late_date: "",
      sum_p: 0,
      sum_m: 0,
      page_l: true,
      birth: 0,
      gender: "",
      name: "",
      isDatePickerVisible: false,
      setDatePickerVisibility: false,
      setShow: false,
      data_: [], // 하루 당 꺾은선 그래프
      data2: [], // 하루 당 꺾은선 그래프
    };
  }

  handleScroll = (e) => {
    if (e.nativeEvent.contentOffset.x < 130) {
      this.setState({ page_l: true });
    } else if (e.nativeEvent.contentOffset.x > 130) {
      this.setState({ page_l: false });
    }
  };

  ///onlymanager/progress/cat/user/{유저아이디}?date=YYYY-MM-DD&&day=조
  user_cat_day = (manager_token, date) => {
    fetch(
      "http://hccparkinson.duckdns.org:19737/onlymanager/progress/cat/user/" +
        this.props.route.params.id +
        "?date=" +
        date +
        "&day=7",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + manager_token.slice(1, -1),
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((json) => {
        var cat_change_array = json.data;
        var cat_put_array = {};
        var change_put_array = [];

        cat_change_array.map((x) => {
          cat_put_array = {};
          for (let i = 0; i < x.progress.length; i++) {
            var cat_name = "CAT" + (i + 1);
            var cat_day = x.progress[i].day;
            cat_put_array[cat_name] = x.progress[i].percent * 100;
          }
          cat_put_array["R_date"] =
            String(cat_day).substring(5, 7) + String(cat_day).substring(8, 10);
          change_put_array.push(cat_put_array);
        });
        this.setState({ data2: change_put_array });
      });
  };

  //유저 일주일치 그래프 정보 불러오기
  ///onlymanager/progress/user/{유저아이디}?date=YYYY-MM-DD&&day=조회할기간
  user_week_day = (manager_token, date) => {
    var data_array = [];
    fetch(
      "http://hccparkinson.duckdns.org:19737/onlymanager/progress/user/" +
        this.props.route.params.id +
        "?date=" +
        date +
        "&day=7",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + String(manager_token).slice(1, -1),
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        console.log(json.data.length);

        if (json.data.length === 0) {
          for (let j = 0; j < 7 - json.data.length; j++) {
            var now = new Date(date);
            var yesterday = new Date(now.setDate(now.getDate() - j)); // 어제
            console.log(yesterday);
            var date2 = this.date_change(yesterday);

            var add_data = {
              day: date2,
              cat: "null",
              percent: 0,
            };
            data_array.push(add_data);
          }
        } else {
          for (let i = 0; i < json.data.length; i++) {
            data_array.push(json.data[i]);
          }

          for (let j = 0; j < 7 - json.data.length; j++) {
            var now = new Date(data_array[json.data.length - 1].day);
            var yesterday = new Date(now.setDate(now.getDate() - (j + 1))); // 어제
            var date2 = this.date_change(yesterday);

            var add_data = {
              day: date2,
              cat: "null",
              percent: 0,
            };
            data_array.push(add_data);
          }
        }

        this.setState({ data: data_array.reverse() });

        this.setState({ sum_p: 0 });
        sum_progress = 0;

        var day_count_progress = this.state.data;

        day_count_progress.map((x) => {
          sum_progress += x.percent * 100;
          this.setState({
            sum_p: json.data.length === 0 ? 0 : sum_progress / json.data.length,
          });
        });

        day_count_progress.filter((x, y) => {
          if (y === 0)
            this.setState({
              first_date:
                String(x.day).substring(0, 4) +
                String(x.day).substring(5, 7) +
                String(x.day).substring(8, 10),
            });
          if (y === 6)
            this.setState({
              late_date:
                String(x.day).substring(0, 4) +
                String(x.day).substring(5, 7) +
                String(x.day).substring(8, 10),
            });
        });
      });
  };

  //http://hccparkinson.duckdns.org:19737/onlymanager/progress/user/period/2021-01-12?uid=suji&day=30
  user_month = (manager_token, date) => {
    var data_array = [];
    var lastDate = "";
    if (date == this.date_change(new Date())) lastDate = date.substring(8, 10);
    else
      var lastDate = new Date(
        date.substring(0, 4),
        date.substring(5, 7),
        0
      ).getDate();
    fetch(
      "http://hccparkinson.duckdns.org:19737/onlymanager/progress/user/period/" +
        date +
        "?uid=" +
        this.props.route.params.id +
        "&day=" +
        lastDate,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + manager_token.slice(1, -1),
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((json) => {
        for (let i = 0; i < json.data.length; i++) {
          data_array.push(json.data[i]);
        }

        for (let j = 0; j < lastDate - 1; j++) {
          var now = new Date(date);
          var yesterday = new Date(now.setDate(now.getDate() - j)); // 어제
          var date2 = this.date_change(yesterday);

          var add_data = {
            day: date2,
            cat: "null",
            percent: 0,
          };
          data_array.push(add_data);
        }

        this.setState({ data_: data_array.reverse() }, () => {
          return this.state.data_;
        });

        this.setState({ sum_m: 0 });
        sum_progress_m = 0;

        var day_count_progress = this.state.data_;

        day_count_progress.map((x) => {
          sum_progress_m += x.percent * 100;
          this.setState({
            sum_m:
              json.data.length === 0 ? 0 : sum_progress_m / json.data.length,
          });
        });
      });
  };

  async componentDidMount() {
    const manager_token = await AsyncStorage.getItem("@manager_token");

    var today = this.date_change(new Date());
    this.user_info(manager_token);

    console.log(today);
    this.user_week_day(manager_token, today);
    console.log(manager_token);
    this.user_cat_day(manager_token, today);
    this.user_month(manager_token, today);
  }

  //환자 정보 가져오는 엔드포인트
  user_info = (manager_token) => {
    fetch(
      "http://hccparkinson.duckdns.org:19737/onlymanager/uid/" +
        this.props.route.params.id,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + manager_token.slice(1, -1),
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          birth: json.data[0].birthday,
          gender: json.data[0].gender,
          name: json.data[0].uname,
        });
      });
  };

  age_count = () => {
    var today_year = new Date().getFullYear();
    var birth_year = String(this.state.birth).substring(0, 4);
    return today_year - birth_year + 1;
  };

  gender_change = () => {
    return this.state.gender === "F" ? "여" : "남";
  };

  showDatePicker = () => {
    this.setState({ setDatePickerVisibility: true, isDatePickerVisible: true });
  };

  hideDatePicker = () => {
    this.setState({
      setDatePickerVisibility: false,
      isDatePickerVisible: false,
    });
  };

  handleConfirm = (date) => {
    const manager_token = AsyncStorage.getItem("@manager_token");
    console.warn("A date has been picked: ", date);
    this.hideDatePicker();
    var today = this.date_change(date);

    this.user_week_day(manager_token, today);
    this.user_cat_day(manager_token, today);
    this.user_month(manager_token, today);
  };

  date_change = (date) => {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();

    var today =
      year +
      "-" +
      ("00" + month.toString()).slice(-2) +
      "-" +
      ("00" + day.toString()).slice(-2);

    return today;
  };

  onValueChange = () => {
    var newDate = new Date();
    const selectedDate = newDate || date;
    this.setState({ setDate: selectedDate, setShow: false });
  };

  onMenuPress = (id) => {
    if (id.length === 1) var click_date = "20220" + id + "00";
    else var click_date = "2022" + id + "00";
    this.setState({ late_date: click_date });
  };

  render() {
    return (
      <View style={styles.finalView}>
        <View style={styles.menuView}>
          <View style={styles.margin}>
            <AntDesign
              name="left"
              size={24}
              color="#808080"
              onPress={() => {
                this.props.navigation.pop();
              }}
            />
          </View>
          <Text style={styles.titleText}>
            '{this.state.name}'님 의 운동 통계
          </Text>
          <View style={styles.margin}></View>
        </View>

        <View style={styles.mainView}>
          <ScrollView
            contentContainerStyle={{
              justifyContent: "space-between",
            }}
          >
            <View style={styles.firstView}>
              <Text style={styles.user_name}>{this.state.name}</Text>
              <Text style={styles.user_age}> / {this.age_count()}세</Text>
              <Text style={styles.user_sex}> / {this.gender_change()}</Text>
              <View style={styles.margin}></View>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={this.showDatePicker}
              >
                <MaterialIcons name="date-range" size={30} color="#316200" />
              </TouchableOpacity>
            </View>

            <DateTimePickerModal
              isVisible={this.state.isDatePickerVisible}
              mode="date"
              onConfirm={this.handleConfirm}
              onCancel={this.hideDatePicker}
            />
            <ScrollView
              horizontal
              contentContainerStyle={{ width: width * 2 }}
              showsHorizontalScrollIndicator={false}
              pagingEnabled={true}
              onScroll={this.handleScroll}
            >
              <View style={styles.secondView}>
                <View style={styles.textview}>
                  <Text style={styles.text2}>{"최근 7일 평균 "}</Text>
                  <Text style={styles.text22}>
                    {this.state.sum_p.toFixed(1)}%
                  </Text>
                  <View style={styles.margin}></View>

                  <Text style={styles.text1}>
                    {String(this.state.first_date).substring(0, 4) +
                      "." +
                      String(this.state.first_date).substring(4, 6) +
                      "." +
                      +String(this.state.first_date).substring(6, 8) +
                      " ~ " +
                      String(this.state.late_date).substring(4, 6) +
                      "." +
                      +String(this.state.late_date).substring(6, 8)}
                  </Text>
                </View>

                <SafeAreaView style={{ flex: 2, width: "100%" }}>
                  <FlatList
                    keyExtractor={(item, index) => index}
                    data={this.state.data}
                    renderItem={({ item, index }) => {
                      return (
                        <Task1
                          id={index}
                          put_date={item.day}
                          progress={item.percent}
                        ></Task1>
                      );
                    }}
                    horizontal={true}
                  ></FlatList>
                </SafeAreaView>
              </View>
              <View style={styles.secondView}>
                <View style={styles.textview}>
                  <Text style={styles.text2}>{"월 평균 "}</Text>
                  <Text style={styles.text22}>
                    {this.state.sum_m.toFixed(1)}%
                  </Text>
                  <View style={styles.margin}></View>

                  <Text style={styles.text1}>
                    {"~ " +
                      String(this.state.late_date).substring(0, 4) +
                      "." +
                      String(this.state.late_date).substring(4, 6)}
                  </Text>
                </View>

                <SafeAreaView style={{ flex: 2, width: "100%" }}>
                  <FlatList
                    keyExtractor={(item, index) => index}
                    data={this.state.data_}
                    renderItem={({ item, index }) => {
                      return (
                        <Taskm
                          id={index}
                          put_date={item.day}
                          progress={item.percent}
                        ></Taskm>
                      );
                    }}
                    horizontal={true}
                  ></FlatList>
                </SafeAreaView>
              </View>
            </ScrollView>
            <View style={styles.page_location}>
              <View style={styles.p_margin}></View>
              <WithLocalSvg
                width={10}
                height={10}
                asset={this.state.page_l == true ? page_here : page_no}
              />
              <View style={styles.pp_margin}></View>
              <WithLocalSvg
                width={10}
                height={10}
                asset={this.state.page_l == false ? page_here : page_no}
              />
              <View style={styles.p_margin}></View>
            </View>

            <View style={styles.threeView}>
              <SafeAreaView style={{ width: "100%" }}>
                <FlatList
                  keyExtractor={(item, index) => index}
                  data={this.state.data2}
                  renderItem={({ item }) => {
                    return (
                      <Task
                        CAT1={item.CAT1}
                        CAT2={item.CAT2}
                        CAT3={item.CAT3}
                        CAT4={item.CAT4}
                        CAT5={item.CAT5}
                        R_date={item.R_date}
                      ></Task>
                    );
                  }}
                />
              </SafeAreaView>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  finalView: {
    height: responsiveScreenHeight(100),
    width: responsiveScreenWidth(100),
    backgroundColor: "#F8F8F8",
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

  page_location: { flexDirection: "row" },
  chart: {
    flex: 0.8,
    backgroundColor: "#5CB405",
  },

  text11: {
    fontSize: 14,
    color: "#484848",
    justifyContent: "center",
    alignItems: "center",
  },
  margin: {
    // padding:30,
    alignItems: "flex-start",
    justifyContent: "center",
    flex: 1,
  },
  p_margin: {
    flex: 5,
  },
  pp_margin: {
    flex: 0.5,
  },

  user_name: {
    alignItems: "flex-start",
    justifyContent: "center",
    color: "#484848",
    fontSize: 18,
    fontWeight: "bold",
  },

  user_age: {
    // padding:30,
    alignItems: "flex-start",
    justifyContent: "center",
    fontSize: 17,
    color: "#484848",
  },

  user_sex: {
    // padding:30,
    alignItems: "flex-start",
    justifyContent: "center",
    fontSize: 17,
    color: "#484848",
  },

  firstView: {
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 10,
    backgroundColor: "#F8F8F8",
  },
  mainView: {
    backgroundColor: "#F8F8F8",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 70,
  },
  secondView: {
    marginTop: "2%",
    marginLeft: "3%",
    marginRight: "3%",
    marginBottom: "1%",
    paddingLeft: "2%",
    paddingRight: "2%",
    paddingBottom: "1%",
    height: 180,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    width: width - 40,
  },
  threeView: {
    marginTop: 10,
    marginLeft: responsiveScreenWidth(4.7),
    marginRight: responsiveScreenWidth(4.7),
    marginBottom: "2%",
    paddingTop: "3.1%",
    borderWidth: 1,
    backgroundColor: "#FFFFFF",
    borderColor: "#E0E0E0",
  },
  moveView: {
    backgroundColor: "#FFFFFF",
    height: 90,
    width: "92%",
    marginLeft: "4%",
    marginRight: "4%",
    marginTop: "3%",
    marginBottom: "3%",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 5,
  },

  graphview: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  text1: {
    fontSize: 13,
    color: "#000000",
  },
  text2: {
    fontSize: 16,
    color: "#000000",
    fontWeight: "bold",
  },
  text22: {
    fontSize: 19,
    color: "#000000",
    fontWeight: "bold",
  },
  textview: {
    marginTop: 10,
    marginBottom: 3,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  oneview: {
    flex: 1,
    marginBottom: 5,
  },
});
