import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("UserStore", () => {
  const UserData = ref({
    ID: "123",
    Account: "",
    Name: "孫美珍",
    SchoolData: {
      ID: 1,
      Code: "030305",
      City: "桃園市",
      Area: "中壢區",
      Name: "國立中央大學附屬中壢高中",
    },
    Class: "四",
    Seat: "18",
    Grade: 9,
    Identify: "",
    Email: "",
    GameStatus: [],
    Status: false,
    Times: 3,
  });
  return {
    UserData,
  };
});
