<script setup>
import { onMounted, ref } from "vue";
import ToTheTop from "./ToTheTop.vue";
import "animate.css";
</script>
<template>
  <header>
    <div
      class="w-full m-0 h-[100px] bg-white fixed top-0 flex justify-center items-center z-20 animate__animated animate__flipInX">
      <a href="/" class="flex justify-center items-center cursor-pointer">
        <img src="/images/logo.jpg" alt="logo" class="h-[100px] rounded-full mx-2" />
      </a>
    </div>
  </header>
  <main>
    <div class="py-[120px] overflow-x-hidden overflow-y-auto relative">
      <slot></slot>
      <ToTheTop></ToTheTop>
    </div>
    <footer>
      <div
        class="w- text-center m-0 h-[140px] bg-[#72A69C] text-xs text-white font-bold bottom-0 py-4 ps-2 pe-14 flex flex-wrap items-center">
        <p class="w-full text-center">Copy Right@2025</p>
      </div>
    </footer>
  </main>
</template>
