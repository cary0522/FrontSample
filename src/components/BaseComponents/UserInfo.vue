<script setup>
import { onMounted, reactive, ref, watch, watchEffect } from "vue";
import SelectSearch from "./SelectSearch.vue";
import ApiHelper from "@/helpers/ApiHelper";
import Swal from "sweetalert2";
import { useUserStore } from "@/stores/useUserStore";
const UserStore = useUserStore();

import { useRouter } from "vue-router";
const router = useRouter();

import { useForm, useField } from "vee-validate";
const { handleSubmit } = useForm({
  // 初始預設值
  initialValues: {
    Name: UserStore.UserData.Name ? UserStore.UserData.Name : "",
    Seat: UserStore.UserData.Seat ? UserStore.UserData.Seat : "",
    Class: UserStore.UserData.Class ? UserStore.UserData.Class : "",
  },
  // 設定驗證規則
  validationSchema: {
    Name(value) {
      if (value) {
        return true;
      }
      return "必填";
    },
    Seat(value) {
      if (value) {
        return true;
      }
      return "必填";
    },
    Class(value) {
      if (value) {
        return true;
      }
      return "必填";
    },
  },
});

const Name = useField("Name");
const Seat = useField("Seat");
const Class = useField("Class");

// 送出表單
const submit = handleSubmit((val) => {
  if (TargetArea.value.Area !== '其他' && !StudentData.SchoolData.ID) {
    Swal.fire({
      icon: "warning",
      title: "請選擇學校",
    });
    return;
  } else if (TargetArea.value.Area === '其他' && !StudentData.SchoolData) {
    Swal.fire({
      icon: "warning",
      title: "請輸入學校名稱",
    });
    return;
  } else if (!StudentData.Grade) {
    Swal.fire({
      icon: "warning",
      title: "請選擇年級",
    });
    return;
  } else {
    const Req = {
      SchoolID: TargetArea.value.Area === '其他' ? 0 : StudentData.SchoolData.ID,
      Name: val.Name,
      Class: val.Class,
      Seat: val.Seat,
      Grade: StudentData.Grade,
    };
    console.log({ Req });
    UserStore.UserData.SchoolData = StudentData.SchoolData;
    UserStore.UserData.Name = val.Name;
    UserStore.UserData.Class = val.Class;
    UserStore.UserData.Seat = val.Seat;
    UserStore.UserData.Grade = StudentData.Grade;
    ApiHelper.Axios(
      "api/User/SaveProfile",
      "POST",
      Req,
      (res) => {
        if (res.status === 200 && res.data.ID) {
          UserStore.UserData.ID = res.data.ID;
          Swal.fire({
            icon: "success",
            title: "登入成功",
            text: "歡迎使用數位闖關卡，同一手機可多人登入使用，並可隨時切換使用者。",
            confirmButtonText: `<span class='text-white'>開始闖關</span>`,
            confirmButtonColor: "#72A69C",
          }).then((res) => {
            if (res.isConfirmed) {
              router.push("/game");
            }
          });
        }
      },
      (err) => {
        ApiHelper.ProcessErrMsg(err);
      }
    );
    // router.push("/game");
  }
});
// 所有行政區列表
const AreaData = [
  {
    ID: 1,
    Area: "桃園市桃園區",
  },
  {
    ID: 2,
    Area: "桃園市中壢區",
  },
  {
    ID: 3,
    Area: "桃園市平鎮區",
  },
  {
    ID: 4,
    Area: "桃園市八德區",
  },
  {
    ID: 5,
    Area: "桃園市楊梅區",
  },
  {
    ID: 6,
    Area: "桃園市蘆竹區",
  },
  {
    ID: 7,
    Area: "桃園市龜山區",
  },
  {
    ID: 8,
    Area: "桃園市龍潭區",
  },
  {
    ID: 9,
    Area: "桃園市大溪區",
  },
  {
    ID: 10,
    Area: "桃園市大園區",
  },
  {
    ID: 11,
    Area: "桃園市觀音區",
  },
  {
    ID: 12,
    Area: "桃園市新屋區",
  },
  {
    ID: 13,
    Area: "桃園市復興區",
  },
  {
    ID: 14,
    Area: "其他",
  },
];

// 所有學校列表
const SchoolData = ref([]);
function GetSchoolData() {
  ApiHelper.Axios(
    "api/Base/SchoolList",
    "GET",
    null,
    (res) => {
      SchoolData.value = res.data;
    },
    (err) => {
      ApiHelper.ProcessErrMsg(err);
    }
  );
}

// 選擇的行政區
const TargetArea = ref(
  UserStore.UserData.SchoolData.Area
    ? {
      ID: UserStore.UserData.SchoolData.ID,
      Area: UserStore.UserData.SchoolData.Area,
    }
    : ""
);
// 選擇行政區的學校清單
const TargetSchoolList = ref([]);

// 選擇行政區
function SelectArea() {
  if (TargetArea.value.Area === '其他') {
    StudentData.SchoolData = "";
  }
  TargetSchoolList.value = SchoolData.value.filter(
    (item) => item.Area === TargetArea.value.Area.slice(3, 6)
  );
}
// 選擇學校
function SelectSchool(value) {
  StudentData.SchoolData = value;
}
// 年級列表
const GradeData = [7, 8, 9];

// 暫存學生資料
const StudentData = reactive({
  SchoolData: UserStore.UserData.SchoolData
    ? UserStore.UserData.SchoolData
    : "",
  Grade: UserStore.UserData.Grade ? UserStore.UserData.Grade : 9,
});

// 偵測使用者資料變動
watch(UserStore.UserData, () => {
  StudentData.SchoolData = UserStore.UserData.SchoolData
    ? UserStore.UserData.SchoolData
    : "";
  StudentData.Name = UserStore.UserData.Name ? UserStore.UserData.Name : "";
  StudentData.Class = UserStore.UserData.Class ? UserStore.UserData.Class : "";
  StudentData.Seat = UserStore.UserData.Seat ? UserStore.UserData.Seat : "";
  StudentData.Grade = UserStore.UserData.Grade ? UserStore.UserData.Grade : "";
  TargetArea.value = UserStore.UserData.SchoolData.Area
    ? {
      ID: UserStore.UserData.SchoolData.ID,
      Area: UserStore.UserData.SchoolData.Area,
    }
    : "";
});

// 填入學校、班級、座號後搜尋姓名自動代入
function SearchName() {
  if (
    !StudentData.SchoolData ||
    !StudentData.Grade ||
    !Class.value.value ||
    !Seat.value.value
  ) {
    return;
  } else if (
    StudentData.SchoolData &&
    StudentData.Grade &&
    Class.value.value &&
    Seat.value.value
  ) {
    ApiHelper.Axios(
      "api/User/SearchName",
      "POST",
      {
        SchoolID: StudentData.SchoolData.ID,
        Grade: StudentData.Grade,
        Class: Class.value.value,
        Seat: Seat.value.value,
      },
      (res) => {
        if (res.status == 200) {
          Name.value.value = res.data.Name;
        } else {
          Name.value.value = "";
        }
      },
      (err) => {
        ApiHelper.ProcessErrMsg(err);
      }
    );
  }
}

// 監控學校、班級、座號變動，有變動就呼叫API搜尋姓名
watch([StudentData, Class.value, Seat.value], () => {
  SearchName();
});

watchEffect(() => {
  Name.value.value = UserStore.UserData.Name;
  Class.value.value = UserStore.UserData.Class;
  Seat.value.value = UserStore.UserData.Seat;
});

onMounted(() => {
  GetSchoolData();
});
</script>

<template>
  <form action="" class="m-4 text-center animate__animated animate__fadeIn">
    <p class="w-full text-start ms-4 font-black text-lg">就讀學校：</p>
    <div class="flex justify-around items-center">
    </div>
    <div id="targetArea">
      <SelectSearch :-placeholder="'請選擇行政區'" v-model:OptionsList="AreaData" :-label="'Area'"
        v-model:ModelValue="TargetArea" v-model:SelectedFunction="SelectArea" :no-result-text="'請輸入行政區進行搜尋'">
      </SelectSearch>
    </div>
    <v-text-field v-if="TargetArea.Area === '其他'" label="請輸入就讀學校" v-model="StudentData.SchoolData" required
      hide-details="true" class="mt-4 text-start"></v-text-field>
    <SelectSearch v-else :-placeholder="'請選擇學校'" v-model:OptionsList="TargetSchoolList" :-label="'Name'"
      v-model:ModelValue="StudentData.SchoolData" v-model:SelectedFunction="SelectSchool" :no-options-text="'請先選擇行政區'"
      :no-result-text="'請輸入校名進行搜尋'"></SelectSearch>
    <div class="flex justify-center items-center">
      <SelectSearch class="w-4/5" :-placeholder="'請選擇年級'" v-model:OptionsList="GradeData"
        v-model:ModelValue="StudentData.Grade"></SelectSearch>
      <p class="w-1/5 text-start mx-4 mt-4">年級</p>
    </div>
    <div class="flex justify-center items-center my-4">
      <v-text-field label="班級" v-model="Class.value.value" required :error-messages="Class.errorMessage.value"
        class="text-start"></v-text-field>
      <p class="w-1/4 text-center">班</p>
      <v-text-field label="座號" v-model="Seat.value.value" required :error-messages="Seat.errorMessage.value"
        class="text-start"></v-text-field>
      <p class="w-1/4 text-center">號</p>
    </div>
    <v-text-field label="學生姓名" v-model="Name.value.value" required class="mt-4 text-start"
      :error-messages="Name.errorMessage.value"></v-text-field>
    <v-btn class="mx-auto" color="#72A69C" @click.prevent="submit">立即開始闖關</v-btn>
  </form>
</template>
