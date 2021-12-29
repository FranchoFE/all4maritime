import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Players from "@/views/Players";
import Teams from "@/views/Teams";

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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Conversions.vue"),
  },
  {
    path: "/players",
    name: "Players",
    component: Players,
  },
  {
    path: "/teams",
    name: "Teams",
    component: Teams,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
