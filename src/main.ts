import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import { getAuth } from "firebase/auth";
import type { User } from "firebase/auth";
import router from "./router";
import "./index.css";
import "./assets/main.css";
import { initializeFirebase, setUser } from "./lib";
async function bootstrap() {
  await initializeFirebase();
  getAuth().onAuthStateChanged(async (googleUser: User) => {
    if (googleUser) {
      await setUser(googleUser);
    }
    const app = createApp(App);
    app.use(createPinia());
    app.use(router);
    app.mount("#app");
  });
}

bootstrap();
