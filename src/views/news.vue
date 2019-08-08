/**
  新闻
 */
<template>
  <div class="news" v-drag :class="themeColorName">
    <boxTools class="theme-color moveBox" :style="themeColorStyle" :info="info" @windowsTools="windowsTools" :title="componentTitle"></boxTools>
    <iframe src="https://www.toutiao.com/" frameborder="0" height="100%" width="100%"></iframe>
  </div>
</template>
 
<script>
import tools from  "@/assets/js/utils/tools.js";
import boxTools from "@/views/boxTools";
export default {
  name: 'news',
  components:{
    boxTools
  },
  data() {
    return {
      info:{ className:'.news',name:'news',icon:'icon-news' },
      themeColorName:'',
      themeColorStyle: {},
      componentTitle:'新闻',
      minWidth:'',
      minHeight:'',
    };
  },
  methods:{
     windowsTools( obj ){  
      let _s = {
        minSize:   ( param ) => this.$emit( 'minSize',param ),
        maxSize:   ( param ) => {tools._maxSize(document.querySelector( param ))},
        restore:   ( param ) => tools._restore( document.querySelector( param ),this.minHeight,this.minWidth),
        closeItem: ( param ) => this.$emit( 'closeItem',param )
      };
      _s[obj.type](obj.param);
    },
  },
  mounted(){
    this.minWidth = document.querySelector('.news').offsetWidth;
    this.minHeight = document.querySelector('.news').offsetHeight;
  },
  created(){
    this.themeColorName = this._getThemeColor(this, this.themeColorName, this.themeColorStyle).className;
    this.themeColorStyle = this._getThemeColor(this, this.themeColorName, this.themeColorStyle).style;
  },
  watch:{
    storeChange( val ){
      this.themeColorName = this._getThemeColor(this, val.themeColorName, val.themeColorStyle).className;
      this.themeColorStyle = this._getThemeColor(this, val.themeColorName, val.themeColorStyle).style;
    }
  },
  computed:{
    storeChange(){
      return this.$store.state.themeColor;
    }
  },
};
</script>
<style lang='less' scoped>
  .news {
    height: 70%;
    width: 60%;
    position: absolute;
    top: 10%;
    left: 20%;
    border-radius: 4px;
    box-shadow: 0px 0px 50px 10px rgba(0, 0, 0, .3);
    transition: box-shadow 0.5s, transform 0.5s;
    text-align: left;
    background: #fff;
  }
</style>