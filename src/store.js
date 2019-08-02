import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: localStorage.getItem('loginToken') ? localStorage.getItem('loginToken') : '',
    themeColor: localStorage.getItem('themeColor') ? JSON.parse(localStorage.getItem('themeColor')) : 'themea',
    zIndex:99,
    chooseTabName:'',
    fixTabs:localStorage.getItem('fixTabs')?JSON.parse(localStorage.getItem('fixTabs')) : [],
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
    addFixTabs( state,tab ){
      this.state.fixTabs.push( tab );
    },
    reduceFixTabs( state,tab ){
      let index = this.state.fixTabs.indexOf( tab );
      if( index > -1 ) this.state.fixTabs.splice( index,1 );
    }
  },
  actions: {},
  getters:{},
});
