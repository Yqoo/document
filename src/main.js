import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI, { TabPane } from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import axios from "axios";
import _ from "lodash";
import "@/assets/css/common.css";
import "@/assets/css/animate.css";
import vcolorpicker from 'vcolorpicker';
import tools from '@/assets/js/utils/tools.js';
Vue.use(vcolorpicker);
Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.axios = axios;
Vue.prototype._ = _;
Vue.prototype._getThemeColor = tools.getThemeColor;
/* router.beforeEach((to,from,next) => {
  if(to.path === '/login'){
    next()
  } else {
    let token = localStorage.getItem('loginToken');
    if( token === null || token === ''){
      next({path: '/login'})
    } else{
      next();
    }
  }
}) */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
