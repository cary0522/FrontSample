<script setup>
import { onMounted, ref } from 'vue';
import User from '@/components/BaseComponents/User.vue';
import Loading from '@/components/BaseComponents/Loading.vue';
import Search from '@/components/BaseComponents/Search.vue';
const LoadingValue = ref(true);

onMounted(() => {
  LoadingValue.value = false;
})
</script>

<template>
  <Loading :-loading="LoadingValue"></Loading>
  <User>
    <div class="text-default">
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      lfkpoergojbpgjbpg
      <Search></Search>
    </div>
  </User>
</template>
