<script setup>
import { ref, onMounted, reactive } from "vue";
import UserInfo from "./UserInfo.vue";
import SelectSearch from "./SelectSearch.vue";
import { useUserStore } from "@/stores/useUserStore";
const UserStore = useUserStore();

const LottieScr = "src/assets/images/UpArrow.gif";
function ToTheTop() {
  document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
}

const UserSelect = ref(false);

const UserData = [
  {
    SchoolData: {
      ID: 5,
      Code: "031310",
      City: "桃園市",
      Area: "平鎮區",
      Name: "私立六和高中",
    },
    Name: "王小名",
    Class: "九",
    Seat: "15",
    Grade: 7,
  },
  {
    SchoolData: {
      ID: 3,
      Code: "031301",
      City: "桃園市",
      Area: "龍潭區",
      Name: "懷恩高中",
    },
    Name: "張小花",
    Class: "三",
    Seat: "10",
    Grade: 8,
  },
];
const UserInfoList = ref();
const SelectUser = ref();
function changeUser() {
  UserStore.UserData.SchoolData = SelectUser.value.SchoolData;
  UserStore.UserData.Class = SelectUser.value.Class;
  UserStore.UserData.Name = SelectUser.value.Name;
  UserStore.UserData.Seat = SelectUser.value.Seat;
  UserStore.UserData.Grade = SelectUser.value.Grade;
}
onMounted(() => {
  // localStorage.setItem("UserData", JSON.stringify(UserData));
  // UserInfoList.value = JSON.parse(localStorage.getItem("UserData"));
});
</script>

<template>
  <div class="fixed bottom-0 right-0" id="ToTheTopDiv">
    <div @click="
      () => {
        UserSelect = !UserSelect;
      }
    " class="w-[60px] text-[30px] flex justify-center items-center text-[#023859] z-20">
      <v-icon icon="mdi-account-circle"></v-icon>
    </div>
    <img src="/images/UpArrow.gif" alt="" style="width: 60px" class="cursor-pointer" @click="ToTheTop" />
  </div>
  <div v-if="UserSelect"
    class="w-[300px] my-4 rounded-lg overflow-y-auto shadow-lg bg-white/95 border fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50">
    <div class="flex w-full justify-between my-2">
      <h1 class="text-center w-[270px] ps-[30px] text-lg font-black">
        請選擇想要闖關的使用者
      </h1>
      <p class="w-[30px] text-lg font-black" @click="
        () => {
          UserSelect = false;
        }
      ">
        <v-icon icon="mdi-alpha-x"></v-icon>
      </p>
    </div>
    <div v-if="UserData">
      <SelectSearch v-model:OptionsList="UserData" v-model:SelectedFunction="changeUser" v-model:ModelValue="SelectUser"
        :Label="'Name'" :Placeholder="'請選擇想要闖關的使用者'" class="w-4/5 mx-auto"></SelectSearch>
    </div>
    <div class="w-full mx-auto">
      <UserInfo></UserInfo>
    </div>
  </div>
</template>
<style>
#ToTheTopDiv {
  animation: fadIn 3s;
}

@keyframes fadIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>
