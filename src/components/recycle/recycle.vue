/**
  回收站组件
 */
<template>
  <div class="recycle" v-drag :class="themeColorName">
    <boxTools class="theme-color moveBox" :style="themeColorStyle" :info="info" @windowsTools="windowsTools" :title="componentTitle"></boxTools>
  </div>
</template>
 
<script>
import tools from  "@/assets/js/utils/tools.js";
import boxTools from "@/views/boxTools";
export default {
  name: 'recycle',
  components:{
    boxTools
  },
  data() {
    return {
      info:{ className:'.recycle',name:'recycle',icon:'icon-recycle' },
      themeColorName:'',
      themeColorStyle: {},
      componentTitle:'回收站',
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
    this.minWidth = document.querySelector('.recycle').offsetWidth;
    this.minHeight = document.querySelector('.recycle').offsetHeight;
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
  .recycle {
    height: 50%;
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