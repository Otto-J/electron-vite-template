<script setup lang="ts">
import fs from "fs";
import { ipcRenderer } from "electron";
import { onMounted } from "vue";
import { RouterView, RouterLink } from "vue-router";
onMounted(() => {
  console.log(fs.writeFileSync);
  console.log(ipcRenderer);
});
onMounted(() => {
  // ipcRenderer.invoke("showWindow");
});
console.log("ok");
</script>

<template>
  <a-space>
    <a-button type="primary">button</a-button>

    <RouterLink to="/WindowSetting">/WindowSetting</RouterLink>
    <RouterLink to="/windowMain/chat">windowmain</RouterLink>
  </a-space>
  <router-view />
</template>
