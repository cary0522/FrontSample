<script setup>
const props = defineProps(["HiddenSize", "TextContent"]);
</script>

<template>
  <div
    :class="[
      'w-11/12 flex flex-wrap justify-center mx-auto my-4',
      `${props.HiddenSize}:hidden`,
    ]"
  >
    <p class="w-full text-center text-black my-2">{{ props.TextContent }}</p>
    <div>
      <v-icon icon="mdi-arrow-left-bold" class="mx-4 text-[#4a83c8a9]"></v-icon>
    </div>
    <div>
      <v-icon
        icon="mdi-cursor-pointer"
        class="mx-4 text-[#4a83c8a9] handPointer"
      ></v-icon>
    </div>
    <div>
      <v-icon
        icon="mdi-arrow-right-bold"
        class="mx-4 text-[#4a83c8a9]"
      ></v-icon>
    </div>
  </div>
</template>
