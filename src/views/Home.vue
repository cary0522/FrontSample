<script setup>
import { onMounted, ref } from 'vue';
import User from '@/components/BaseComponents/User.vue';
import Loading from '@/components/BaseComponents/Loading.vue';
const LoadingValue = ref(true);

onMounted(() => {
  LoadingValue.value = false;
})
</script>

<template>
  <Loading :-loading="LoadingValue"></Loading>
  <User>
  </User>
</template>
