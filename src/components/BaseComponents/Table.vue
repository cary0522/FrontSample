<script setup>
import { ref } from "vue";
import Qrcode from "qrcode.vue";
// 接收參數
const props = defineProps([
  "TableHeader",
  "DetailFunction",
  "GetPageData",
  "Sort",
  "Setting",
  "Pointer",
]);
// 雙向綁定資料
const SearchData = defineModel("SearchData");
const TableData = defineModel("TableData");

const SelectValue = ref(false);
// 點擊查看詳細內容
function ClickFunction(data) {
  if (props.Pointer) {
    props.DetailFunction(data);
  } else {
    return;
  }
}
// 表格排序
function ToggleSort(method, column) {
  SearchData.value.SortMethod = method;
  SearchData.value.SortColumn = column;
  props.GetPageData();
}

// 全選或全消
const SelectAll = function (event) {
  for (let i = 0; i < TableData.value.length; i++) {
    TableData.value[i].Selected = event.target.checked;
  }
};
</script>

<template>
  <!-- 公告總表 開始 -->
  <v-table class="my-4 w-11/12 mx-auto overflow-x-auto rounded border animate__animated animate__fadeIn">
    <thead style="background-color: #f2f2f2">
      <tr>
        <th class="text-center leading-3 lg:leading-8" style="font-size: medium" v-if="Setting">
          <input type="checkbox" @change="SelectAll($event)" />
        </th>
        <th class="text-center leading-3 lg:leading-8" style="font-size: medium">
          #
        </th>
        <th v-for="(head, index) in props.TableHeader" class="text-start leading-3 lg:leading-8"
          style="font-size: medium">
          {{ head.Value }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="TableData.length == 0">
        <td colspan="999" style="text-align: center" class="text-xs lg:text-base text-black">
          "查無內容"
        </td>
      </tr>
      <tr v-else v-for="(item, index) in TableData" :class="props.Pointer ? 'cursor-pointer' : 'default'">
        <td style="text-align: center; padding: 0.5rem" v-if="Setting">
          <input type="checkbox" v-model="item.Selected" />
        </td>
        <td style="text-align: center; padding: 0.5rem" @click="ClickFunction(item)">
          {{ index + 1 }}
        </td>
        <template v-for="head in props.TableHeader">
          <td v-if="head.Key == 'Category'" style="text-align: start; min-width: 140px; padding: 0.5rem"
            @click="ClickFunction(item)">
            <span class="rounded-full border p-2 text-xs" v-if="head.Key == 'Category'">
              {{ item[head.Key] }}
            </span>
          </td>
          <td v-else-if="head.Key == 'Top'" style="text-align: center; width: 95px; padding: 0.5rem"
            @click="ClickFunction(item)">
            <v-icon icon="mdi-start" v-if="item.Top"></v-icon>
          </td>
          <td v-else-if="head.Key == 'AwardImg'" style="text-align: start; padding: 0.5rem"
            @click="ClickFunction(item)">
            <img :src="item[head.Key]" alt="" class="w-[100px]" />
          </td>
          <td v-else-if="head.Key == 'SchoolQrCode'" style="text-align: start; padding: 0.5rem"
            @click="ClickFunction(item)">
            <Qrcode :value="item.RandomNum" :size="100"></Qrcode>
          </td>
          <td v-else-if="head.Key == 'WinnerList'" style="text-align: start; padding: 0.5rem"
            @click="ClickFunction(item)">
            <ol>
              <li v-for="(winner, index) in item.WinnerList" class="cursor-default">
                {{ winner.School }} {{ winner.Class }} {{ winner.Name }}
              </li>
            </ol>
          </td>
          <td v-else-if="head.Key == 'GameStatus'" style="text-align: start; padding: 0.5rem"
            @click="ClickFunction(item)">
            <p>已完成{{ item.GameStatus.length }}關</p>
          </td>
          <td v-else-if="head.Key == 'Feedback'" style="text-align: start; padding: 0.5rem"
            @click="ClickFunction(item)">
            <p v-if="item.Feedback.length > 0">已完成問卷填寫</p>
            <p v-else>尚未完成問卷填寫</p>
          </td>
          <td v-else-if="head.Key == 'FilesList'" style="text-align: start; padding: 0.5rem"
            @click="ClickFunction(item)">
            <template v-for="(file, index) in item.FilesList">
              {{ file.Name }}
              <span v-if="index < item.FilesList.length - 1">,</span>
            </template>
          </td>
          <td v-else style="text-align: start; min-width: 120px; padding: 0.5rem" @click="ClickFunction(item)"
            class="text-xs lg:text-base">
            {{ item[head.Key] }}
          </td>
        </template>
      </tr>
    </tbody>
  </v-table>
  <!-- 公告總表 結束 -->
</template>
<style>
ol {
  list-style-type: decimal;
  /* 數字有序列表 */
  padding-left: 25px;
  margin-left: 10px;
}
</style>
