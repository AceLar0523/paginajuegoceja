import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { MotionPlugin } from "@vueuse/motion"; // 1. Importar

const app = createApp(App);

app.use(MotionPlugin); // 2. Usar el plugin
app.mount("#app");
