import React, { Component } from "react";
import {
  Button,
  StatusBar,
  TouchableOpacity,
  Text,
  FlatList,
  View,
  StyleSheet,
  Touchable,
} from "react-native";
import Context from "../Context/context";
import { ScrollView } from "react-native-gesture-handler";
import ActionButton from "react-native-action-button";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import action_icon from "../icon/action_icon.svg";
import { WithLocalSvg } from "react-native-svg";
import Task from "./task_progress";
import SimplePopupMenu from "react-native-simple-popup-menu";
import { Entypo } from "@expo/vector-icons";
import PercentageBar from "../screens/progressbar";
import movelist from "./movelist";
import AsyncStorage from "@react-native-async-storage/async-storage";

const items = [
  { id: 1, label: "신장 운동" },
  { id: 2, label: "근력 운동" },
  { id: 3, label: "균형 및 협응 운동" },
  { id: 4, label: "구강 및 발성 운동" },
  { id: 5, label: "유산소 운동" },
];
var now = new Date();
export default class progress extends Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      birth: 19431218,
      gender: "",
      memo: "",
      team: "",
      name: "",
      progress: 0,
      done: [],
      ing: [],
      no: [],
      today: "",
      man_token: "",
      year: parseInt(now.getFullYear()),
      year1: "2022",
      month: parseInt(now.getMonth() + 1),
      month1: "01",
      day1: "01",
      day: parseInt(now.getDate()),
      enamenow: "신장 운동",
      m1: [],
      m2: [],
      m3: [],
      m4: [],
      m5: [],

      data: [],
    };
  }

  async componentDidMount() {
    const manager_token = await AsyncStorage.getItem("@manager_token");

    this.setState({
      man_token: manager_token,
      progress: this.props.route.params.paramName2,
    });
    fetch(
      "http://hccparkinson.duckdns.org:19737/onlymanager/progress/detail/" +
        this.props.route.params.paramName1,
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
        this.setState(
          {
            m1: json.data.filter((it) => 1 <= it.eid && it.eid <= 12),
            m2: json.data.filter((it) => 13 <= it.eid && it.eid <= 26),
            m3: json.data.filter((it) => 27 <= it.eid && it.eid <= 31),
            m4: json.data.filter((it) => 32 <= it.eid && it.eid <= 45),
            m5: json.data.filter((it) => 46 <= it.eid && it.eid <= 47),
          },
          () => {
            this.setState({ data: this.state.m1 }, () => {
              let base = this.state.data.filter((it) => it.setcnt !== 0);
              // 진행중
              let ing1 = base.filter((it) => it.donecnt !== 0);
              let ing2 = ing1.filter((it) => it.setcnt > it.donecnt);
              // 기준 다시!!
              this.setState({ ing: ing2 });
              // 미실시
              let no1 = base.filter((it) => it.donecnt == 0);
              this.setState({ no: no1 });
              // 완료
              let doen1 = base.filter((it) => it.setcnt <= it.donecnt);
              this.setState({ done: doen1 });
            });
          }
        );
      });

    fetch(
      "http://hccparkinson.duckdns.org:19737/onlymanager/uid/" +
        this.props.route.params.paramName1,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + this.state.man_token.slice(1, -1),
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          birth: json.data[0].birthday,
          gender: json.data[0].gender == "F" ? "여" : "남",
          memo: json.data[0].memo,
          team: json.data[0].team,
          name: json.data[0].uname,
          UID: json.data[0].uid,
        });
      });

    this.setState(
      {
        year1: String(this.state.year),
        month1:
          String(this.state.month).length == 1
            ? "0" + String(this.state.month)
            : String(this.state.month),
        day1:
          String(this.state.day).length == 1
            ? "0" + String(this.state.day)
            : String(this.state.day),
      },
      () => {
        this.setState({
          today:
            this.state.year1 +
            "년 " +
            this.state.month1 +
            "월 " +
            this.state.day1 +
            "일",
        });
      }
    );
  }
  movecheck = (id) => {
    if (id === 1) {
      this.setState({ data: this.state.m1 });
    } else if (id == 2) {
      this.setState({ data: this.state.m2 });
    } else if (id === 3) {
      this.setState({ data: this.state.m3 });
    } else if (id === 4) {
      this.setState({ data: this.state.m4 });
    } else if (id === 5) {
      this.setState({ data: this.state.m5 });
    }
  };

  render() {
    return (
      <View style={styles.finalView}>
        {/* 상단바 */}
        <View style={styles.menuView}>
          <AntDesign
            name="left"
            size={24}
            color="#808080"
            onPress={() => {
              this.props.navigation.pop();
            }}
          />
          <View style={styles.margin}></View>
          <Text style={styles.titleText}>
            '{this.state.name}'님의 운동 진도율
          </Text>
          <View style={styles.margin}></View>
        </View>
        {/* 본문 전체 뷰 */}
        <View style={{ margin: "5%" }}>
          {/* 뷰1/3 */}
          <View style={{ flexDirection: "row" }}>
            <View style={{ justifyContent: "center" }}>
              <Ionicons
                name="person-circle-sharp"
                size={90}
                color="lightblue"
              />
              {/* 전체 진도율 뷰 */}
            </View>
            <View
              style={{
                marginLeft: "4%",
                marginTop: "3%",
                flexDirection: "column",
                flex: 1,
                alignItems: "flex-start",
                justifyContent: "center",
              }}
            >
              <Text
                style={{ marginBottom: 10, fontSize: 23, fontWeight: "bold" }}
              >
                {this.state.name} /{" "}
                {this.state.year - parseInt(this.state.birth / 10000)} /{" "}
                {this.state.gender}
              </Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ marginBottom: "1%", fontSize: 15 }}>
                  오늘 전체 진도율
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "bold",
                    marginLeft: "3%",
                  }}
                >
                  {this.state.progress}%
                </Text>
              </View>
              <View style={styles.per}>
                <View
                  style={{
                    width: 100 * 2,
                    height: 10,
                    marginVertical: 5,
                    borderRadius: 7,
                    borderColor: "#E5E5E5",
                    backgroundColor: "#E5E5E5",
                    borderWidth: 1,
                  }}
                />
                <View
                  style={{
                    width:
                      this.state.progress * 2 ? this.state.progress * 2 : 0,
                    height: 10,
                    marginVertical: 5,
                    borderRadius: 7,
                    backgroundColor: "#7AC819",
                    position: "absolute",
                  }}
                />
              </View>
            </View>
          </View>
          {/* 여기까지 view 1/3 */}
          {/* 여기부터 view 2/3 */}
          <View
            style={{
              marginTop: "5%",
              marginBottom: "3%",
              flexDirection: "column",
              // padding: "5%",
              borderWidth: 2,
              borderRadius: 7,
              borderColor: "#D6D6D6",
            }}
          >
            {/* 위에꺼 전체 */}
            <View style={{ flexDirection: "row", padding: "5%" }}>
              {/* 햄버거아이콘 빼고*/}
              <View style={{ flex: 9, flexDirection: "column" }}>
                <Text>{this.state.today}</Text>
                <Text
                  style={{ fontSize: 19, fontWeight: "bold", paddingTop: "1%" }}
                >
                  {this.state.enamenow}
                </Text>
              </View>
              <SimplePopupMenu
                style={styles.margin}
                items={items}
                cancelLabel={"취소"}
                onSelect={(items) => {
                  this.setState({
                    enamenow: items.label,
                  });
                  this.movecheck(items.id);
                  // 할당된거만 추출
                  let base = this.state.data.filter((it) => it.setcnt !== 0);
                  // 진행중

                  let ing1 = base.filter((it) => it.donecnt !== 0);
                  let ing2 = ing1.filter((it) => it.setcnt > it.donecnt);
                  // 기준 다시!!
                  this.setState({ ing: ing2 });
                  // 미실시
                  let no1 = base.filter((it) => it.donecnt == 0);
                  this.setState({ no: no1 });
                  // 완료
                  let doen1 = base.filter((it) => it.setcnt <= it.donecnt);
                  this.setState({ done: doen1 });
                }}
                onCancel={() => console.log("onCancel")}
              >
                <Entypo name="dots-three-vertical" size={24} color="#595959" />
              </SimplePopupMenu>
              {/* </TouchableOpacity>
              </View> */}
            </View>
            {/* 여기부터 아래 */}
            <View style={{ flexDirection: "row", paddingBottom: "5%" }}>
              <View style={styles.bordertext}>
                <Text style={styles.successtext}>완료</Text>
                <View style={styles.numView}>
                  <Text style={styles.numtext}>{this.state.done.length}</Text>
                  <Text style={styles.gaetext}>개</Text>
                </View>
              </View>
              <View style={styles.bordertext}>
                <Text style={styles.successtext}>진행 중</Text>
                <View style={styles.numView}>
                  <Text style={styles.numtext}>{this.state.ing.length}</Text>
                  <Text style={styles.gaetext}>개</Text>
                </View>
              </View>
              <View
                style={{
                  flex: 2,
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Text style={styles.successtext}>미실시</Text>
                <View style={styles.numView}>
                  <Text style={styles.numtext}>{this.state.no.length}</Text>
                  <Text style={styles.gaetext}>개</Text>
                </View>
              </View>
            </View>
          </View>
          {/* 여기까지 view2/3 */}
          {/* 여기부터 view3/3 */}

          <View styel={styles.threeView}>
            {/* ScrollView */}
            <ScrollView
              contentContainerStyle={{
                paddingTop: "3%",
                flexGrow: 1,
                flexDirection: "column",
                justifyContent: "space-between",
                paddingBottom: "5%",
                paddingHorizontal: "2%",
              }}
            >
              <View style={{ marginBottom: "3%" }}>
                <Text style={styles.movetitletext}>진행중</Text>
                <FlatList
                  data={this.state.ing}
                  renderItem={({ item }) => {
                    return <Task ename={item.ename}></Task>;
                  }}
                />
              </View>
              <View>
                <Text style={styles.movetitletext}>미실시 운동</Text>
                <FlatList
                  data={this.state.no}
                  renderItem={({ item }) => {
                    return <Task ename={item.ename}></Task>;
                  }}
                />
              </View>

              {/* ScrollView */}
            </ScrollView>
          </View>
        </View>

        <ActionButton
          buttonColor="#577F67"
          style={styles.plusbtn}
          renderIcon={() => (
            <WithLocalSvg
              width={80}
              height={80}
              asset={action_icon}
              onPress={() => {
                this.props.navigation.navigate("moveedit", {
                  paramName1: this.state.name,
                  paramName2: this.state.UID,
                });
              }}
            />
          )}
        ></ActionButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  finalView: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  menuView: {
    backgroundColor: "#FFFFFF",
    height: 58,
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 20,
    paddingLeft: 20,
    marginTop: "3%",
    justifyContent: "flex-start",
    borderBottomWidth: 1.8,
    borderColor: "#E5E5E5",
  },

  titleText: {
    alignItems: "flex-start",
    fontSize: 20,
    alignItems: "center",
    color: "#000000",
    justifyContent: "center",
    fontWeight: "bold",
  },
  per: {
    width: "90%",
  },

  firstView: {
    // padding:30,
    alignItems: "center",
    justifyContent: "flex-start",
    marginLeft: 20,
    marginRight: 20,
    flexDirection: "row",
    flex: 1,
    marginTop: 15,
    marginBottom: 15,
    backgroundColor: "#FFFFFF",
  },
  margin: {
    // padding:30,
    alignItems: "flex-start",
    justifyContent: "center",
    flex: 1,
  },
  plusbtn: {
    position: "absolute",
    left: "80%",
    bottom: "8%",
  },
  threeView: {
    // padding:30,
    marginTop: 10,
    marginBottom: 230,
    alignItems: "flex-start",
    justifyContent: "center",
    flexDirection: "row",
  },

  bordertext: {
    borderRightWidth: 1,
    flex: 2,
    flexDirection: "column",
    alignItems: "center",
    borderColor: "#EAEAEA",
  },
  movetext: {
    fontSize: 17,
    marginBottom: "5%",
    color: "#484848",
  },
  movetitletext: { fontSize: 17, fontWeight: "bold", marginBottom: "5%" },
  successtext: {
    fontSize: 17,
  },
  numtext: {
    fontSize: 21,
    fontWeight: "bold",
    alignItems: "center",
  },
  gaetext: {
    fontSize: 16,
    marginLeft: "2%",
    alignItems: "flex-end",
  },

  numView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "7%",
  },
});
