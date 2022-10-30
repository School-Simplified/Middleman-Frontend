import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import router from "./router";
import "./index.css";
import "./assets/main.css";
import { initializeFirebase } from "./lib/firebase";
async function bootstrap() {
  await initializeFirebase();
  getAuth().onAuthStateChanged((user) => {
    if (!user) {
      router.push("/login");
    }
    const app = createApp(App);
    app.use(createPinia());
    app.use(router);
    app.mount("#app");
  });
}

bootstrap();
