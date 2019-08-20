<!--
 * @Date: 2019-08-20 17:37:24
 * @LastEditors: Yqoo
 * @LastEditTime: 2019-08-20 18:19:35
 * @Desc: 任务管理器组件
 -->  
<template>
  <div class="taskManager" v-drag :class="themeColorName">
    <boxTools class="theme-color moveBox" :style="themeColorStyle" :info="info" @windowsTools="windowsTools" :title="componentTitle"></boxTools>
    <div class="taskManagerBody">
      <el-tabs v-model="active">
        <el-tab-pane name="course">
          <span slot="label"><img :src="require('@/assets/image/icons/deskIcons/icon-taskCourse.png')"> 进程</span>
          <div class="main">
            进程
          </div>
        </el-tab-pane>
        <el-tab-pane name="start">
          <span slot="label"><img :src="require('@/assets/image/icons/deskIcons/icon-taskStart.png')">启用</span>  
          <div class="main">
            启用
          </div>
        </el-tab-pane>
        <el-tab-pane label="服务" name="serve">
          <span slot="label"><img :src="require('@/assets/image/icons/deskIcons/icon-taskServe.png')">服务</span>
          <div class="main">
            服务
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import tools from  "@/assets/js/utils/tools.js";
import boxTools from "@/views/boxTools";
export default {
  name: 'taskManager',
  components: {
    boxTools,
  },
  data() {
    return {
      info:{ className:'.taskManager',name:'taskManager',icon:'icon-taskManager' },
      themeColorName:'',
      themeColorStyle: {},
      componentTitle:'任务管理器',
      minWidth:'',
      minHeight:'',
      active:'serve',//初始激活的tab
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
    this.minWidth = document.querySelector('.taskManager').offsetWidth;
    this.minHeight = document.querySelector('.taskManager').offsetHeight;
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
  .taskManager {
    height: 70%;
    width: 40%;
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
    font-size: 12px;
    & .taskManagerBody {
      padding: 10px 20px;
      & .el-tabs{
        & /deep/ img {
          width: 20px;
          vertical-align: sub;
        }
      }
      & .main {
        padding: 5px;
      }
    }
  }
</style>