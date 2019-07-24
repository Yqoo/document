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
      component: Home
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./components/login/login.vue")
    },
    {
      path: "/login_copy",
      name: "login_copy",
      component: () => import("./components/login/login_copy.vue")
    }
  ]
});
