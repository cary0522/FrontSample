<script setup>
const props = defineProps([
  "PlaceHolder",
  "SearchFunction",
  "ClearFunction",
  "InputType",
]);
const ModelValue = defineModel();
</script>

<template>
  <div class="flex justify-center items-center my-4 mx-auto w-4/5">
    <v-text-field prepend-inner-icon="mdi-magnify" :hide-details="true" v-model="ModelValue"
      :placeholder="props.PlaceHolder" :type="props.InputType" class="rounded-lg text-xs md:text-base"
      style="background-color: #fff; border: 1px solid #cbd5e1" v-on:keyup.enter="props.SearchFunction"></v-text-field>
    <v-btn v-on:click="props.SearchFunction">搜尋</v-btn>
    <v-btn v-on:click="props.ClearFunction">清除</v-btn>
  </div>
</template>
