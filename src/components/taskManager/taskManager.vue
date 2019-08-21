<!--
 * @Date: 2019-08-20 17:37:24
 * @LastEditors: Yqoo
 * @LastEditTime: 2019-08-21 17:29:45
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
            <el-table
              :data="course"
              stripe
              style="width: 100%"
              size="mini"
              >
              <el-table-column prop="name" label='名称' :show-overflow-tooltip="true">
                <template slot-scope="scope">
                  <img :src="scope.row.icon">
                  <span>{{scope.row.name}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="show" label='状态' :formatter="formatterTable"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <i class="el-icon-full-screen" v-if="!scope.row.display " @click="expand(scope.row)" title="展开"></i>
                  <i class="el-icon-remove-outline" v-else @click="expand(scope.row)" title="缩小"></i>
                  <i class="el-icon-circle-close" @click="close(scope.row)" title="关闭"></i>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane name="start">
          <span slot="label"><img :src="require('@/assets/image/icons/deskIcons/icon-taskStart.png')">启用</span>  
          <div class="main">
            <el-table
              :data="start"
              stripe
              style="width: 100%"
              size="mini"
              height="400"
              >
              <el-table-column prop="name" label='名称' :show-overflow-tooltip="true">
                <template slot-scope="scope">
                  <img :src="scope.row.icon">
                  <span>{{scope.row.name}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="show" label='状态' :formatter="formatterStart"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <i class="el-icon-video-pause" v-if="scope.row.show" @click="handon(scope.row)" title="停止"></i>
                  <i class="el-icon-video-play" v-else @click="handon(scope.row)" title="启用"></i>                  
                </template>
              </el-table-column>
            </el-table>
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
  props:['isShowBox'],
  data() {
    return {
      info:{ className:'.taskManager',name:'taskManager',icon:'icon-taskManager' },
      themeColorName:'',
      themeColorStyle: {},
      componentTitle:'任务管理器',
      minWidth:'',
      minHeight:'',
      active:'course',//初始激活的tab
      courselist:[this.isShowBox],
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
    formatterTable(row, column, cellValue, index){//数据格式化
      if( cellValue ) return '正在运行';
    },
    expand( row ){//展开
      this.$emit( 'showTab',row.sign );
    },
    close( row ){//关闭
      this.$emit( 'closeTab',row.sign );
    },
    formatterStart(row, column, cellValue, index){
      let msg = '';
      cellValue && ( msg = '已启用') || ( msg = '未启用' );
      return msg;
    },
    handon( row ){
      this.$emit('start',row.sign)
    }
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
    },
  },
  computed:{
    storeChange(){
      return this.$store.state.themeColor;
    },
    course(){
      let list = this.courselist[0];
      let arr = [];
      for( let key in list ){
        if( list[key].show ){
          arr.push(Object.assign({},list[key]))
        }
      };
      return arr;
    },
    start(){
      let list = this.courselist[0];
      let arr = [];
      for( let key in list ){
        arr.push(Object.assign({},list[key]))
      };
      return arr;
    }
  },
};
</script>
<style lang='less' scoped>
  .taskManager {
    min-height: 70%;
    width: 35%;
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
          padding-right: 5px;
        }
      }
      & .main {
        padding: 5px;
        & /deep/.cell{
          & img {
            vertical-align: top;
          }
          & i {
            font-size: 16px;
            padding-right: 10px;
            color:#00b8a9;
            cursor: pointer;
          }
        }
      }
    }
  }
</style>