import { createApp } from "vue";
import ArcoVue from "@arco-design/web-vue";
import App from "./App.vue";
import "@arco-design/web-vue/dist/arco.css";
import { router } from "./router";

const app = createApp(App).use(ArcoVue).use(router);

app.mount("#app");
