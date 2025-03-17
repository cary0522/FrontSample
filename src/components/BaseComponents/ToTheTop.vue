<script setup>

function ToTheTop() {
  document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
}

</script>

<template>
  <div class="fixed bottom-0 right-0" id="ToTheTopDiv">
    <img src="/images/UpArrow.gif" alt="" style="width: 60px" class="cursor-pointer" @click="ToTheTop" />
  </div>
</template>
<style>
#ToTheTopDiv {
  animation: fadIn 3s;
}

@keyframes fadIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>
