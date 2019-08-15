<!--
 * @Date: 2019-08-14 14:47:00
 * @LastEditors: Yqoo
 * @LastEditTime: 2019-08-14 17:40:58
 * @Desc: iCloud管理控制台
 -->
<template>
  <div class='iCloudConsole' v-drag>
    <div :class="themeColorName">
      <boxTools class="theme-color moveBox"  :style="themeColorStyle" :info="info" @windowsTools="windowsTools" :title="componentName"></boxTools>
      <el-row>
        <el-col :span="3">
          <div class="leftImgBox">
            <img :src="require('@/assets/image/icons/appIcons/appIcons-console.png')" >
            <p >iCloud控制台</p>
          </div>
          <el-menu @select="selecetNav" default-active="iCloudDisk">
            <el-menu-item index="iCloudDesc">
              <img :src="require('@/assets/image/icons/appIcons/appIcons-desc.png')">
              <span slot="title">云端概述</span>
            </el-menu-item>
            <el-menu-item index="iCloudDisk">
              <img :src="require('@/assets/image/icons/appIcons/appIcons-cloudDisk.png')">
              <span slot="title">存储中心</span>
            </el-menu-item>
            <el-menu-item index="iCloudDC">
              <img :src="require('@/assets/image/icons/appIcons/appIcons-dc.png')">
              <span slot="title">数据中心</span>
            </el-menu-item>
            <el-menu-item index='iCloudTask'>
              <img :src="require('@/assets/image/icons/appIcons/appIcons-task.png')">
              <span slot="title">任务管理</span>
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="21">
          <component :is="current"></component>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import tools from  "@/assets/js/utils/tools.js";
import { themeMixin}  from '@/assets/js/themeMixin.js';
import boxTools from "@/views/boxTools";
import iCloudDisk from "@/components/supervisorConsole/iCloudDisk";
import iCloudDC from "@/components/supervisorConsole/iCloudDC";
import iCloudDesc from "@/components/supervisorConsole/iCloudDesc";
import iCloudTask from "@/components/supervisorConsole/iCloudTask";
export default {
  name: 'iCloudConsole',
  mixins: [themeMixin],
  components: {
    boxTools,
    iCloudDisk,
    iCloudDC,
    iCloudTask,
    iCloudDesc
  },
  data() {
    return {
      minHeight:'',
      minWidth:'',
      info:{className:'.iCloudConsole',name:'iCloudConsole',icon:'icon-iCloudConsole'},
      componentName:'iCloud控制台',
      current:'iCloudDisk'
    };
  },
  methods:{
    windowsTools( obj ){
      let _s = {
        minSize:   ( param ) => this.$emit( 'minSize',param ),
        maxSize:   ( param ) => tools._maxSize(document.querySelector( param )),
        restore:   ( param ) => tools._restore( document.querySelector(param),this.minHeight,this.minWidth),
        closeItem: ( param ) => this.$emit( 'closeItem',param )
      };
      _s[obj.type](obj.param);
    },
    selecetNav( index ){
      this.current = index;
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    }
  },
  mounted(){
    this.minWidth = document.querySelector('.iCloudConsole').offsetWidth;
    this.minHeight = document.querySelector('.iCloudConsole').offsetHeight;
  },
  watch:{

  },
}
</script>
<style lang='less' scoped>
  .iCloudConsole {
    width: 70%;
    height: 65%;
    background: #fff;
    position: absolute;
    top: 10%;
    left: 20%;
    border-radius: 5px;
    box-shadow: 0px 0px 50px 10px rgba(0, 0, 0, .3);
    font-size: 12px;
  }
  .leftImgBox {
    text-align: center;
    padding: 20px 0px;
    min-height: 100px;
    & img {
      width: 80px;
    }
  }
  .el-menu {
    & .el-menu-item:nth-child(1){
      border-top: 1px solid #ddd;
    }
    & .el-menu-item{
      & img {
        width: 25px;
      }
      & span {
        font-size: 10px;
        padding-left: 3px;
      }
    }
  }
  .el-icon-s-operation{
    font-size: 20px;
    position: absolute;
    top: 5px;
    left: 20px;
    color: #00b8a9;
    cursor: pointer;
  }
</style>
