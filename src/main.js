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
import "@/style/defaultColor.less";
import "@/style/theme.less";
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
Vue.directive('drag',{
  inserted:function( el,bilding ){
    let op = el;
    op.style.zIndex = store.state.zIndex;
    store.commit('addzIndex');//弹出或点击时容器变为最顶层
    op.onmousedown = function( e ){
      let target = e.target.getAttribute('class');
      op.style.zIndex = store.state.zIndex;
      store.commit('addzIndex');
      let reg = /moveBox/gi;
      if( reg.test( target ) ){
        let disX = e.clientX - op.offsetLeft;
        let disY = e.clientY - op.offsetTop;
        document.onmousemove = function( e ){
          let l = e.clientX - disX;
          let t = e.clientY - disY;
          op.style.left = l + 'px';
          op.style.top = t + 'px';
          if( bilding.value ) bilding.value({ x:e.pageX,y:e.pageY });
          document.onmouseup = function (e) {
            document.onmousemove = null;
            document.onmouseup = null;
          };
        }
      }
    };
    op.onmouseup = function (e) {
      document.onmousemove = null;
      document.onmouseup = null;
    };
  }
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
