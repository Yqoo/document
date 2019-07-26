import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: localStorage.getItem('loginToken')?localStorage.getItem('loginToken'):'',
    menus:false,
  },
  mutations: {
    showMenus( state ){
      state.menus = true;
    },
    closeMenus( state ){
      state.menus = false;
    }
  },
  actions: {}
});
