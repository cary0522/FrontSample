<script setup>
const props = defineProps(["Loading"]);
</script>

<template>
  <!-- 讀取畫面 開始 -->
  <div
    class="w-full h-full fixed top-0 left-0 z-[100] flex flex-wrap justify-center items-center bg-white bg-opacity-90 text-2xl text-gray-700 font-bold transition-all"
    v-if="props.Loading">
    <div>
      <img src="/images/loading.gif" alt="">
      <div class="w-full text-center text-default">Loading ...</div>
    </div>
  </div>
  <!-- 讀取畫面 結束 -->
</template>
