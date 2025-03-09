<script setup>
// 指定現在頁碼
const CurrentPage = defineModel();

// 總共頁數
const props = defineProps(["TotalPage", "GetPageData"]);

function PrevPage() {
  if (CurrentPage.value > 1) {
    CurrentPage.value = CurrentPage.value - 1;
    props.GetPageData();
  }
}
function NextPage() {
  if (CurrentPage.value < props.TotalPage) {
    CurrentPage.value = CurrentPage.value + 1;
    props.GetPageData();
  }
}
</script>
<template>
  <div
    class="w-auto max-w-full flex justify-center my-4 mx-auto text-base text-gray-500"
  >
    <v-Pagination
      v-model="CurrentPage"
      :length="props.TotalPage"
      color="black"
      rounded="circle"
      @update:model-value="props.GetPageData"
    >
      <template v-slot:prev>
        <v-icon icon="mdi-menu-left" @click="PrevPage"></v-icon>
      </template>
      <template v-slot:next>
        <v-icon icon="mdi-menu-right" @click="NextPage"></v-icon>
      </template>
    </v-Pagination>
  </div>
</template>
<style>
.v-pagination__list {
  align-items: center;
}
</style>
