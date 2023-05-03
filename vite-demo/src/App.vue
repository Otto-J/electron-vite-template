<script setup lang="ts">
import fs from "fs";
import { ipcRenderer } from "electron";
import { onMounted } from "vue";
onMounted(() => {
  console.log(fs.writeFileSync);
  console.log(ipcRenderer);
});
console.log("ok");
</script>

<template>
  <a-button type="primary">button</a-button>
</template>
