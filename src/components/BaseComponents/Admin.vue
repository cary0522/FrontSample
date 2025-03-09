<script setup>
import { reactive, ref } from "vue";
import ToTheTop from "./ToTheTop.vue";
import Swal from "sweetalert2";
import ApiHelper from "@/helpers/ApiHelper";
import { useRouter } from "vue-router";
const router = useRouter();

import { useAdminStore } from "@/stores/useAdminStore";
const AdminStore = useAdminStore();

import "animate.css";

const MenuBar = ref(false);
const MenuShow = ref(false);
const MenuList = [
  {
    Title: "學生管理",
    Path: "/StudentSetting",
  },
  {
    Title: "攤位管理",
    Path: "/StallSetting",
  },
  {
    Title: "抽獎管理",
    Path: "/LotterySetting",
  },
  {
    Title: "抽獎",
    Path: "/Lottery",
  },
  {
    Title: "抽獎結果",
    Path: "/LotteryResult",
  },
];
// 監聽當頁面大小改變時，關閉選單
window.addEventListener("resize", () => {
  if (window.innerWidth <= 768) {
    MenuBar.value = true;
  } else if (window.innerWidth >= 1024) {
    MenuBar.value = false;
  } else {
    MenuBar.value = false;
  }
});
// 頁面載入完成後判斷要不要關閉選單
window.addEventListener("load", () => {
  if (window.innerWidth <= 768) {
    MenuBar.value = true;
  } else if (window.innerWidth >= 1024) {
    MenuBar.value = false;
  } else {
    MenuBar.value = false;
  }
});

const LoginShow = ref(false);
const LoginData = reactive({
  Account: "",
  Password: "",
});

import { useForm, useField } from "vee-validate";
const { handleSubmit } = useForm({
  initialValues: {
    Account: "",
    Password: "",
  },
  validationSchema: {
    Account(value) {
      if (value) {
        return true;
      }
      return "必填";
    },
    Password(value) {
      if (value) {
        return true;
      }
      return "必填";
    },
  },
});
const LoginSubmit = handleSubmit((val) => {
  LoginData.Account = val.Account;
  LoginData.Password = val.Password;
  ApiHelper.Axios(
    "api/Admin/Login",
    "POST",
    LoginData,
    (res) => {
      if (res.status == 200) {
        AdminStore.AdminData.ID = res.data.ID;
        AdminStore.AdminData.Account = res.data.Account;
        LoginShow.value = false;
        Swal.fire({
          icon: "success",
          title: "登入成功",
          confirmButtonText: `<span class='text-white'>確認</span>`,
          confirmButtonColor: "#72A69C",
        });
      }
    },
    (err) => {
      ApiHelper.ProcessErrMsg(err);
    }
  );
});

const Account = useField("Account");
const Password = useField("Password");

function ClickLogin() {
  if (AdminStore.AdminData.ID) {
    AdminStore.AdminData.ID = "";
    LoginShow.value = false;
    router.push("/Dp_index");
  } else {
    LoginShow.value = true;
  }
}
</script>
<template>
  <header class="animate__flipInX animate__animated">
    <div class="w-full m-0 h-[100px] bg-white fixed top-0 flex justify-between items-center z-20">
      <div class="ms-2 w-1/12">
        <v-icon icon="mdi-menu" @click="MenuShow = !MenuShow" v-if="MenuBar"></v-icon>
      </div>
      <div v-if="MenuShow" class="h-screen w-[200px] mt-[100px] absolute left-0 top-0 bg-white/95 z-50">
        <ul>
          <li v-for="link in MenuList" class="hover:scale-105">
            <a :href="link.Path">{{ link.Title }}</a>
          </li>
        </ul>
      </div>
      <a href="/" class="flex justify-center items-center">
        <img src="/images/logo.jpg" alt="logo" class="h-[100px] rounded-full mx-2" />
      </a>
      <div class="w-9/12" v-if="!MenuBar">
        <ul class="flex w-full justify-around text-sm lg:text-lg">
          <li v-for="link in MenuList" class="hover:scale-105">
            <a :href="link.Path">{{ link.Title }}</a>
          </li>
        </ul>
      </div>
      <p @click="ClickLogin" class="me-2 w-1/12 cursor-pointer">
        {{ AdminStore.AdminData.ID ? "登出" : "登入" }}
      </p>
    </div>
  </header>
  <main>
    <div class="pt-[120px]">
      <slot></slot>
    </div>
    <div v-if="LoginShow"
      class="w-[310px] mt-4 bg-white/95 fixed translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] z-50 shadow-lg border rounded-lg">
      <div class="flex flex-wrap w-full justify-between my-2">
        <h1 class="text-center w-[270px] ps-[30px] text-lg font-black">登入</h1>
        <p class="w-[30px] text-lg font-black cursor-pointer" @click="
          () => {
            LoginShow = false;
          }
        ">
          <v-icon icon="mdi-alpha-x"></v-icon>
        </p>
        <div class="w-full mx-auto">
          <v-text-field prepend-inner-icon="mdi-account" :placeholder="'帳號'" v-model="Account.value.value"
            :error-messages="Account.errorMessage.value" class="rounded-lg text-xs md:text-base m-4"></v-text-field>
          <v-text-field prepend-inner-icon="mdi-lock-outline" :placeholder="'密碼'" v-model="Password.value.value"
            :error-messages="Password.errorMessage.value" class="rounded-lg text-xs md:text-base m-4"></v-text-field>
          <v-btn @click="LoginSubmit">登入</v-btn>
        </div>
      </div>
    </div>
    <footer>
      <div
        class="w-full m-0 h-[140px] text-xs text-white font-bold bottom-0 py-4 ps-2 pe-14 flex flex-wrap text-center items-center">
        <p class="w-full text-center">CopyRight@2025</p>
      </div>
    </footer>
  </main>
</template>
<style>
li {
  margin: 15px;
  font-weight: 600;
  cursor: pointer;
}

footer>div {
  background-image: linear-gradient(to right,
      rgba(30, 5, 69, 0.9),
      rgba(30, 78, 135, 0.9));
}
</style>
