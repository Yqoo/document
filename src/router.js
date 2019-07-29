import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import system from "./components/system/system"
Vue.use(Router);


export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      children:[
        {path:'/system',name:'system',component:system}
      ]
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
    },
    {
      path: '/theme',
      name: 'theme',
      component: () => import("./views/theme")
    },
  ]
});
