import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import type { User } from "firebase/auth";
import router from "./router";
import "./index.css";
import "./assets/main.css";
import FloatingVue from "floating-vue";
import { getFirstName, initializeFirebase, setUser } from "./lib";
import "floating-vue/dist/style.css";

async function bootstrap() {
  await initializeFirebase();
  getAuth().onAuthStateChanged(async (googleUser: User | null) => {
    if (googleUser) {
      await setUser(googleUser);
    } else {
    }
    // connectAuthEmulator(getAuth(), "http://localhost:5173"); // This for some reason lets me login when removed from dev build
    const app = createApp(App);
    app.use(createPinia());
    app.use(router);
    app.use(FloatingVue);
    app.mount("#app");
  });
}

bootstrap();
