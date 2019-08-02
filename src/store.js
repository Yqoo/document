import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: localStorage.getItem('loginToken') ? localStorage.getItem('loginToken') : '',
    themeColor: localStorage.getItem('themeColor') ? JSON.parse(localStorage.getItem('themeColor')) : 'themea',
    zIndex:99,
    chooseTabName:'',
    fixTabs:localStorage.getItem('fixTabs')?JSON.parse(localStorage.getItem('fixTabs')) : {},
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
    getTabName( state,name ){
      this.state.chooseTabName = name;
    },
    addFixTabs( state ){
      this.state.fixTabs = {...this.state.fixTabs,...this.state.chooseTabName};
    },
    reduceFixTabs( state,tab ){
      let _tab = JSON.parse(tab)
      delete this.state.fixTabs[Object.keys(_tab)];
      localStorage.setItem('fixTabs',JSON.stringify(this.state.fixTabs))
    },
    changeDesktopImg ( state, curImg) {
      this.state.desktopImg = curImg;
      localStorage.setItem('desktopImg', curImg);
    }
  },
  actions: {},
  getters:{},
});
