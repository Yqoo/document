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
Vue.use(vcolorpicker);
Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.axios = axios;
Vue.prototype._ = _;
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
    let self = this;
    op.onmousedown = function( e ){
      let disX = e.clientX - op.offsetLeft;
      let disY = e.clientY - op.offsetTop;
      document.onmousemove = function( e ){
        let l = e.clientX - disX;
        let t = e.clientY - disY;
        op.style.left = l + 'px';
        op.style.top = t + 'px';
        try {
          bilding.value({ x:e.pageX,y:e.pageY });
        } catch (error) {
            
        }
        document.onmouseup = function (e) {
          document.onmousemove = null;
          document.onmouseup = null;
        };
      }
    }
  }
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
