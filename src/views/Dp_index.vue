<script setup>
import { ref, onMounted } from 'vue';
import Admin from '@/components/BaseComponents/Admin.vue';
import Loading from '@/components/BaseComponents/Loading.vue';

const LoadingValue = ref(true);

onMounted(() => {
    LoadingValue.value = false;
})
</script>

<template>
    <Admin></Admin>
    <Loading :-loading="LoadingValue"></Loading>
</template>