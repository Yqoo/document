<!--
 * @Date: 2019-08-08 09:41:34
 * @LastEditors: Yqoo
 * @LastEditTime: 2019-08-21 15:32:28
 * @Desc: 
 -->
<!-- 回收站组件 -->
<template>
  <div class="recycle" v-drag :class="themeColorName">
    <boxTools class="theme-color moveBox" :style="themeColorStyle" :info="info" @windowsTools="windowsTools" :title="componentTitle"></boxTools>
    <div class="recyclBody">
      <div class="utilLists">
          <topUtil @utilClick="utilClick" :lists="recycleTools"></topUtil>
      </div>
      <div class="cards flipInX animated" :class="displayName==='行展示'?'row':'col'">
          <el-card v-for="(c,index) in dataList" :class="c.active?'addBorder':''" :key="index" shadow="hover">
              <div @click="activeCard(c, dataList)" @dblclick.stop="openFolder" :title="c.name">
                <img :src="c.imgurl" :style="displayName==='行展示'&&size"/>
                <div class="bottom">{{c.name}}</div>
                <img :src="c.icon" class="fileIcon">
              </div>
          </el-card>
      </div>
    </div>
  </div>
</template>
 
<script>
import tools from  "@/assets/js/utils/tools.js";
import boxTools from "@/views/boxTools";
import topUtil from "@/components/iCloud/topUtil";
import { themeMixin } from '@/assets/js/themeMixin.js'
export default {
  mixins: [themeMixin],
  name: 'recycle',
  components:{
    boxTools,
    topUtil
  },
  data() {
    let recycleTools = [
      { name:'restore',iconTitle:'还原',iconImg:require('@/assets/image/icons/fileIcons/restore.png') },
      { name:'empty',iconTitle:'清空',iconImg:require('@/assets/image/icons/fileIcons/recycle.png') },
      { name:'cut',iconTitle:'剪切',iconImg:require('@/assets/image/icons/fileIcons/cut.png') },
      { name:'copy',iconTitle:'复制',iconImg:require('@/assets/image/icons/fileIcons/copy.png') },
      { name:'del',iconTitle:'删除',iconImg:require('@/assets/image/icons/fileIcons/pardelete.png') },
      { name:'preview',iconTitle:'在线预览',iconImg:require('@/assets/image/icons/fileIcons/preview.png') },
      { name:'examine',iconTitle:'查看',iconImg:require('@/assets/image/icons/fileIcons/check.png'),flag: false,children:[
        { name:'mini',iconTitle:'小图标',iconImg:require('@/assets/image/icons/fileIcons/little.png')},
        { name:'medium',iconTitle:'中图标',iconImg:require('@/assets/image/icons/fileIcons/middle.png')},
        { name:'big',iconTitle:'大图标',iconImg:require('@/assets/image/icons/fileIcons/big.png')},
      ] },
      { name:'arrange',iconTitle:'排列',iconImg:require('@/assets/image/icons/fileIcons/array.png'),flag: false,children:[
        { name:'row',iconTitle:'行展示',iconImg:require('@/assets/image/icons/fileIcons/row.png')},
        { name:'column',iconTitle:'列展示',iconImg:require('@/assets/image/icons/fileIcons/col.png')},
      ] },
      { name:'refresh',iconTitle:'刷新',iconImg:require('@/assets/image/icons/fileIcons/refresh.png') },
      { name:'help',iconTitle:'帮助',iconImg:require('@/assets/image/icons/deskIcons/icon-help.png') },
    ];
    return {
      info:{ className:'.recycle',name:'recycle',icon:'icon-recycle' },
      componentTitle:'回收站',
      minWidth:'',
      minHeight:'',
      recycleTools:recycleTools,
      displayName:'行展示', //行列展示
      size: 'middle', //图标大小
      dataList: [
        {name:'文件夹1',imgurl:require('@/assets/image/icons/deskIcons/tree-disk3.png'),active:false},
        {name:'文件夹2',imgurl:require('@/assets/image/icons/deskIcons/tree-folder.png'),active:false},
      ],
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
    utilClick(item){
      console.log(item)
    }
  },
  mounted(){
    this.minWidth = document.querySelector('.recycle').offsetWidth;
    this.minHeight = document.querySelector('.recycle').offsetHeight;
  },
};
</script>
<style lang='less' scoped>
@import '../../assets/css/myCloud.less';
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
    & .recyclBody{
      height: calc(100% - 35px);
      box-sizing: border-box;
      border: 10px solid #c5c5c5;
      border-radius: 0 0 5px 5px;
    }
    & .utilLists{
      height: 50px;
      padding: 10px;
      border-bottom: 10px solid #c5c5c5;
    }
  }
</style>