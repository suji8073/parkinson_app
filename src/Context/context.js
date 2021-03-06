import React from "react";
//import update from "react-addons-update";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default React.createContext({

  user_id: "test",
  user_pw: "test",

  num: 0,
  user_token: "",
  
  patient_token: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjaGFtIiwiUm9sZXMiOlsiUk9MRV9VU0VSIl0sImlzcyI6IkhDQyBMYWIiLCJpYXQiOjE2NDQzMDA3ODUsImV4cCI6MTY0NDkwNTU4NX0.tn_SztAIy7z1kYcOgUlMO41Ir-QJ317aBvqQFBbD9-AY0dZyw8MkG-zOSMS-QsZNcOVxmyCL4pkRihrQ6hytyA",
  user_name: "관리자",
  manager_token:
    "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0IiwiUm9sZXMiOlsiUk9MRV9NQU5BR0VSIl0sImlzcyI6IkhDQyBMYWIiLCJpYXQiOjE2NDQyNDkyNDYsImV4cCI6MTY0NDg1NDA0Nn0.SdE2Y2lG0qv1VZXZ36DLBmHm8Xxkty7Fuiv9B5JrCERAPd7aoLkXFVYncPQI9ZBR_2jdBHV8KArAQ3sWH-AuqQ",
  patient_token:
    "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjaGFtIiwiUm9sZXMiOlsiUk9MRV9VU0VSIl0sImlzcyI6IkhDQyBMYWIiLCJpYXQiOjE2NDQyNDkyODgsImV4cCI6MTY0NDg1NDA4OH0.omw1cfwvLXv3L4hCFr8V1TFvA4gV675PQ9xgouGFJzxS8nFRh2j4sW80OKPN4AkZ3am1Sj1JRE9paOpQzzl-dQ",
  user_exercise: [
    { id: "1-1", name: "목 앞 근육 스트레칭", set: 0 },
    { id: "1-2", name: "날개뼈 모으기", set: 6 },
    { id: "1-3", name: "손목 및 팔꿈치 주변 근육 스트레칭", set: 10 },
    { id: "2-1", name: "엉덩s이 들기", set: 2 },
    { id: "2-2", name: "엎드려 누운 상태에서 다리들기", set: 6 },
    { id: "2-3", name: "엉덩이 옆 근육 운동", set: 10 },
    { id: "2-4", name: "무릎 벌리기", set: 20 },
    { id: "2-5", name: "무릎 펴기", set: 40 },
    { id: "3-1", name: "한발 서기", set: 2 },
    { id: "3-2", name: "버드독 1단계", set: 0 },
    { id: "3-3", name: "버드독 2단계", set: 0 },
    { id: "3-4", name: "앉은 상태에서 제자리 걷기", set: 10 },
    { id: "3-5", name: "움직이는 런지", set: 10 },
    { id: "4-1", name: "아에이오우 소리내기", set: 10 },

    { id: "4-2", name: "파파파파파 소리내기", set: 12 },
    { id: "4-3", name: "쪽 소리내기", set: 5 },
    { id: "4-4", name: "혀로 볼 밀기", set: 5 },
    { id: "4-5", name: "혀로 입천장 밀기", set: 3 },
    { id: "4-6", name: "똑딱 소리내기", set: 2 },
    { id: "4-7", name: "혀 물고 침 삼키기", set: 2 },
    { id: "4-8", name: "아 짧게 소리내기", set: 20 },
    { id: "4-9", name: "아 길게 소리내기", set: 2 },
    { id: "4-10", name: "고음 가성으로 소리내기", set: 2 },
    { id: "4-11", name: "도레미파솔라시도", set: 2 },
    { id: "4-12", name: "큰 소리로 음절 읽기", set: 2 },
  ],
  changeTOKEN: (token) => {},
  changePW: (pw) => {},
  changeID: (id) => {},
  changeNAME: (name) => {},
  changeEXERCISE: (index, task) => {},
});
