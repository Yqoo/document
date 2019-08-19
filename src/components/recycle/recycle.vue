<!--
 * @Date: 2019-08-08 09:41:34
 * @LastEditors: Yqoo
 * @LastEditTime: 2019-08-19 11:37:25
 * @Desc: 
 -->
/**
  回收站组件
 */
<template>
  <div class="recycle" v-drag :class="themeColorName">
    <boxTools class="theme-color moveBox" :style="themeColorStyle" :info="info" @windowsTools="windowsTools" :title="componentTitle"></boxTools>
    <div class="recyclBody">
      <div class="recycleTools">
        <ul>
          <li v-for="(item,index) in recycleTools" :key="index">
            <img :src="item.img">
            <span>{{item.title}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
 
<script>
import tools from  "@/assets/js/utils/tools.js";
import boxTools from "@/views/boxTools";
export default {
  name: 'recycle',
  components:{
    boxTools,
  },
  data() {
    let recycleTools = [
      { name:'restore',title:'还原',img:require('@/assets/image/icons/fileIcons/restore.png') },
      { name:'empty',title:'清空',img:require('@/assets/image/icons/fileIcons/recycle.png') },
      { name:'cut',title:'剪切',img:require('@/assets/image/icons/fileIcons/cut.png') },
      { name:'copy',title:'复制',img:require('@/assets/image/icons/fileIcons/copy.png') },
      { name:'del',title:'删除',img:require('@/assets/image/icons/fileIcons/pardelete.png') },
      { name:'preview',title:'在线预览',img:require('@/assets/image/icons/fileIcons/preview.png') },
      { name:'examine',title:'查看',img:require('@/assets/image/icons/fileIcons/check.png'),children:[
        { name:'mini',title:'小图标',img:''},
        { name:'medium',title:'中图标',img:''},
        { name:'big',title:'大图标',img:''},
      ] },
      { name:'arrange',title:'排列',img:require('@/assets/image/icons/fileIcons/array.png'),children:[
        { name:'row',title:'行展示',img:''},
        { name:'column',title:'列展示',img:''},
      ] },
      { name:'refresh',title:'刷新',img:require('@/assets/image/icons/fileIcons/refresh.png') },
      { name:'help',title:'帮助',img:require('@/assets/image/icons/deskIcons/icon-help.png') },
    ];
    return {
      info:{ className:'.recycle',name:'recycle',icon:'icon-recycle' },
      themeColorName:'',
      themeColorStyle: {},
      componentTitle:'回收站',
      minWidth:'',
      minHeight:'',
      recycleTools:recycleTools,
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
    margin:0px;
    padding: 0px;
  }
  .recycleTools{
    & ul{
      display: flex;
      flex-flow: row wrap;
      padding: 0px 5px;
      & li {
        display: flex;
        flex-flow: column;
        font-size: 12px;
        text-align: center;
        padding: 5px;
        cursor: pointer;
      }
      & img {
        width:30px;
      }
    }
   
  }
</style>