import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Players from "@/views/Players";
import Teams from "@/views/Teams";
import Visits from "@/views/Visits";
import Conversions from "@/views/Conversions";
import SignUp from "@/views/SignUp";
import SignIn from "@/views/SignIn";
import LogOut from "@/views/LogOut";

import store from "@/store/index.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/conversions",
    name: "Conversions",
    component: Conversions,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/players",
    name: "Players",
    component: Players,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/teams",
    name: "Teams",
    component: Teams,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/visits",
    name: "Visits",
    component: Visits,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/signUp",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/signIn",
    name: "SignIn",
    component: SignIn,
  },
  {
    path: "/logOut",
    name: "LogOut",
    component: LogOut,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);
  if (requiresAuth) {
    console.log("Esta página requiere auth");
    const user = store.getters.user;
    if (user.loggedIn) {
      console.log("Autenticado");
      next();
    } else {
      console.log("NO Autenticado");
      next("/");
    }
  } else {
    next();
  }
});

export default router;
