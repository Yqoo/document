import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);


export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      meta: { requireAuth: true },
      component: Home
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./components/login/login.vue")
    }
  ]
});
