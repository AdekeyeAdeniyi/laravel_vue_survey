import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Surveys from "../views/Surveys.vue";
import HeaderLayout from "../components/HeaderLayout.vue";
import AuthLayout from "../components/AuthLayout.vue";
import store from "../store";

const routes = [
  {
    path: "/",
    redirect: "/dashboard",
    component: HeaderLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
      },
      {
        path: "/surveys",
        name: "Surveys",
        component: Surveys,
      },
    ],
  },
  {
    path: "/auth",
    name: "Auth",
    redirect: "auth/login",
    component: AuthLayout,
    meta: { isGuest: true },
    children: [
      {
        path: "/login",
        name: "Login",
        component: Login,
      },
      {
        path: "/register",
        name: "Register",
        component: Register,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  const token = store.state.UserStore.user.token;
  if (to.meta.requiresAuth && !token) {
    return {
      name: "Login",
    };
  }

  if (token && to.meta.isGuest) {
    return {
      name: "Dashboard",
    };
  }
});

export default router;
