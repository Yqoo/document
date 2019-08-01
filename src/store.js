import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: localStorage.getItem('loginToken') ? localStorage.getItem('loginToken') : '',
    themeColor: localStorage.getItem('themeColor') ? JSON.parse(localStorage.getItem('themeColor')) : 'themea',
    zIndex:99,
    desktopImg: localStorage.getItem('desktopImg')? localStorage.getItem('desktopImg'):'',
  },
  mutations: {
    changeThemeColor( state, curColor) {
      this.state.themeColor = curColor;
      localStorage.setItem('themeColor', JSON.stringify(curColor));
    },
    addzIndex( state ){
      this.state.zIndex++;
    },
    changeDesktopImg ( state, curImg) {
      this.state.desktopImg = curImg;
      localStorage.setItem('desktopImg', curImg);
    }
  },
  actions: {},
  getters:{},
});
