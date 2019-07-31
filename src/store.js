import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: localStorage.getItem('loginToken') ? localStorage.getItem('loginToken') : '',
    themeColor: localStorage.getItem('themeColor') ? JSON.parse(localStorage.getItem('themeColor')) : 'themea',
    zIndex:99,
  },
  mutations: {
    changeThemeColor( state, curColor) {
      this.state.themeColor = curColor;
      localStorage.setItem('themeColor', JSON.stringify(curColor));
    },
    addzIndex( state ){
      this.state.zIndex++;
    },
  },
  actions: {},
  getters:{},
});
