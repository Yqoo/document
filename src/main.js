import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI, { TabPane } from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import axios from "axios";
Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.axios = axios;
router.beforeEach((to,from,next) => {
  if( to.meta.requireAuth ){
    next({
      path: '/login'
    })
  } else {
    next()
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
