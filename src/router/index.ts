import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import StaffDatabase from "../views/StaffDatabase.vue";
import Profile from "../views/Profile.vue";
import BreakRequest from "../views/internal_services/BreakRequest.vue";
import InternalServices from "../views/InternalServices.vue";
import { isGoogleAuthed, profileCompleted } from "@/lib/firebase";
import Login from "@/views/Login.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        auth: "USER",
      },
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/db",
      name: "Staff Database",
      component: StaffDatabase,
      meta: {
        auth: "ADMIN",
      },
    },
    {
      path: "/profile",
      name: "Profile",
      component: Profile,
      meta: {
        auth: "USER",
      },
    },
    {
      path: "/services",
      name: "Internal Services",
      component: InternalServices,
      meta: {
        auth: "USER",
      },
      children: [
        {
          path: "break",
          name: "Request a break",
          component: BreakRequest,
        },
      ],
    },
  ],
});
router.beforeEach(async (to, from, next) => {
  if (!isGoogleAuthed() && to.path != "/login") {
    router.push("/login");
    next();
  } else if (!profileCompleted() && to.path != "/profile") {
    router.push("/profile");
    next();
  } else {
    next();
  }
});
export default router;
