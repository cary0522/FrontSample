<script setup>
import "../../assets/style/Multiselect.css";
import Multiselect from "vue-multiselect";

const props = defineProps([
  "Placeholder",
  "noResultText",
  "noOptionsText",
  "Label",
  "GroupValues",
  "GroupLabel",
  "CustomLabel",
  "DisableValue",
  "Multiple",
  "CloseOnSelect",
]);
const OptionsList = defineModel("OptionsList");
const SelectedFunction = defineModel("SelectedFunction");
const ModelValue = defineModel("ModelValue");
</script>
<template>
  <div class="flex">
    <Multiselect v-model="ModelValue" :options="OptionsList" :placeholder="props.Placeholder" :label="props.Label"
      v-on:select="SelectedFunction" :group-values="GroupValues" :group-label="GroupLabel" :group-select="false"
      :custom-label="props.CustomLabel" :disabled="DisableValue" :allow-empty="false" :multiple="Multiple"
      :close-on-select="CloseOnSelect">
      <template #noResult>{{ props.noResultText }}</template>
      <template #noOptions>{{ props.noOptionsText }}</template>
    </Multiselect>
  </div>
</template>
<style>
.multiselect__single {
  font-size: medium;
  margin-bottom: 0;

  @media screen and (min-width: 768px) {
    font-size: large;
  }
}
</style>
