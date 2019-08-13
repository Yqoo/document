<!--
 * @Date: 2019-07-30 09:10:35
 * @LastEditors: Yqoo
 * @LastEditTime: 2019-08-09 18:04:44
 -->
<template>
  <div class='myCloud' v-drag :class="themeColorName">
    <boxTools class="theme-color moveBox" :style="themeColorStyle" :info="info" @windowsTools="windowsTools" :title="componentTitle"></boxTools>
    <div class="topContent">
        <i class="el-icon-arrow-down" v-show="isShowUtils" @click="utilCollapse" title="收起工具栏"></i>
        <utilLists :utilName="utilName" :class="hideUtil"></utilLists>
        <el-row class="searchContent">
          <el-col :span="2">
            <img class="addressImg" src="@/assets/image/icons/deskIcons/address.png"/>
            <span>当前位置</span>
          </el-col>
          <el-col :span="17"  class="path">
            <div>
              <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>首页</el-breadcrumb-item>
                <el-breadcrumb-item>活动管理</el-breadcrumb-item>
              </el-breadcrumb>
            </div>
          </el-col>
          <el-col :span="5" class="search">
            <el-input
              placeholder="搜索"
              size="mini">
              <i slot="suffix" class="el-input__icon el-icon-search"></i>
            </el-input>
            <i class="el-icon-arrow-up" v-show="!isShowUtils" @click="utilCollapse" title="展开工具栏"></i>
          </el-col>
        </el-row>
    </div>
    <section class="clearfix">
      <aside>
        <div>
          <el-tree :data="treeData" @node-click="handleNodeClick">
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>
                <img :src="data.icon">{{ data.label }}
              </span>
            </span>
          </el-tree>
        </div>
      </aside>
      <div class="rightContent">
        <component :is="current" @changeUtils="changeUtils"></component>
      </div>
    </section>
  </div>
</template>

<script>
import { themeMixin } from '@/assets/js/themeMixin.js'
import tools from  "@/assets/js/utils/tools.js";
import boxTools from "@/views/boxTools";
import iCloudIndex from "@/components/iCloud/iCloudIndex";
import utilLists from "@/components/iCloud/utilLists";
import mineCloud from '@/components/iCloud/mineCloud';
import shareCloud from '@/components/iCloud/shareCloud';
import organizationCloud from '@/components/iCloud/organizationCloud';
import myCloudContent from '@/components/iCloud/myCloudContent';
import shareCloudContent from '@/components/iCloud/shareCloudContent';
import organizationContent from '@/components/iCloud/organizationContent';
export default {
    mixins: [themeMixin],
    name:'myCloud',
    components:{
      boxTools,
      iCloudIndex,
      utilLists,
      mineCloud,
      shareCloud,
      organizationCloud,
      myCloudContent,
      shareCloudContent,
      organizationContent
    },
    data() {
        return {
          info:{ className:'.myCloud',name:'myCloud',icon:'icon-myCloud' },
          minWidth:'',
          minHeight:'',
          themeColorName:'',
          themeColorStyle: {},
          componentTitle:'我的云端',
          treeData:[
            {
              label:'我的云端',
              name: 'mineCloud',
              icon:require('@/assets/image/icons/deskIcons/icon-computer.png'),
              children:[
                {label:'桌面',name: 'desk',icon:require('@/assets/image/icons/deskIcons/tree-computer.png')},
                {label:'我的文档',name:'myCloudContent',icon:require('@/assets/image/icons/deskIcons/tree-folder.png')},
                {label:'软件区',name:'myCloudContent',icon:require('@/assets/image/icons/deskIcons/tree-disk.png')},
                {label:'文档区',name:'myCloudContent',icon:require('@/assets/image/icons/deskIcons/tree-disk.png')},
                {label:'娱乐区',name:'myCloudContent',icon:require('@/assets/image/icons/deskIcons/tree-disk.png')},
              ],
            },
            {
              label:'共享云端',
              name: 'shareCloud',
              icon:require('@/assets/image/icons/deskIcons/tree-share.png'),
              children:[
                {label:'开发部',name:'shareCloudContent',icon:require('@/assets/image/icons/deskIcons/tree-disk2.png')},
                {label:'学习区',name:'shareCloudContent',icon:require('@/assets/image/icons/deskIcons/tree-disk2.png')}
              ],
            },
            {
              label:'组织云端',
              name: 'organizationCloud',
              icon:require('@/assets/image/icons/deskIcons/tree-org.png'),
              children:[
                {
                  label:'四川挚友软件有限公司',
                  icon:require('@/assets/image/icons/deskIcons/tree-disk.png'),
                  name:'organizationContent',
                  children:[
                    {label:'前端学习区',name:'organizationContent',icon:require('@/assets/image/icons/deskIcons/tree-disk2.png')},
                    {label:'后端学习区',name:'organizationContent',icon:require('@/assets/image/icons/deskIcons/tree-disk2.png')}
                  ]
                }
              ],
            }
          ],
          current:'iCloudIndex',//初始进入myCloud 默认右侧显示
          utilName: 'unit',  //选中的模块名称
          isShowUtils: true,  // 展开工具栏
          hideUtil: '',  // 隐藏工具栏类名
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
      utilCollapse() { //收缩工具栏
        this.isShowUtils = !this.isShowUtils;
        this.hideUtil = this.isShowUtils === true ? '' : 'hide';
      },
      handleNodeClick(data, node, el) {  //节点被选中，切换模块和工具栏
        console.log(data)
        // console.log(node)
        // console.log(el)
        //判断出现的内容模块
        if(data.name === 'desk'){ // 如果点击的是桌面，则小化弹框
          this.windowsTools({param: 'myCloud', type:'minSize'});
        } else {
          this.current = data.name;
        }
        //判断出现的工具栏
        if(data.name === 'organizationCloud'){
          this.utilName = 'organizationCloud';
        } else if(data.name === 'mineCloud' || data.name === 'shareCloud') {
          this.utilName = 'unit';
        }
      },
      changeUtils( tag ){  // 点击右侧内容模块，切换工具栏
        this.utilName = tag;
      }
    },
    mounted(){
      this.minWidth = document.querySelector('.myCloud').offsetWidth;
      this.minHeight = document.querySelector('.myCloud').offsetHeight;
    },
}
</script>
<style lang='less' scoped>
  .myCloud {
    // min-height: 60%;  
    width: 80%;
    position: absolute;
    top: 10%;
    left: 10%;
    border-radius: 8px;
    box-shadow: 0px 0px 50px 10px rgba(0, 0, 0, .3);
    transition: box-shadow 0.5s, transform 0.5s;
    text-align: left;
    //border: 3px double #d1d0d0;
    background: transparent;
    & .topContent{
      position: relative;
      background: #fff;
      box-sizing: border-box;
      border: 10px solid #c5c5c5;
      border-bottom: none;
      padding: 10px;
      & > .utilLists{
        height: 50px;
        // transition: height 0.6s;
        margin-bottom: 10px;
      }
      & > .utilLists.hide {
        height: 0;
        overflow: hidden;
        transition: height 0.6s;
      }
      & > i.el-icon-arrow-down{
        position: absolute;
        top: 0;
        right: 3px;
        cursor: pointer;
      }
      & .searchContent{
        font-size: 12px;
        line-height: 28px;
        // height: 28px;
        & .addressImg{
          display: inline-block;
          width: 20px;
          vertical-align: top;
          margin-right: 2%;
          position: relative;
          top: 3px;
        }
        & .path {
          & > div{
            border: 1px solid #DCDFE6;
            height: 26px;
            line-height: 26px;
            width: 97%;
            & .el-breadcrumb{
              line-height: 26px;
              padding-left: 5px;
            }
          }
        }
        & .search{
          position: relative;
          & .el-input{
            width: 95%;
          }
          & > i{
            position: absolute;
            height: 28px;
            display: inline-block;
            line-height: 28px;
            right: -8px;
            cursor: pointer;
          }
          & /deep/ input{
            border-radius: 0;
          }
        }
      }
    }
    & section{
      position: relative;
      width: 100%;
      box-sizing: border-box;
      border-radius: 0 0 5px 5px;
      background: #fff;
      border: 10px solid #c5c5c5;
      & aside{
        position: absolute;
        top: 0px;
        left: 0px;
        width: calc(25% - 10px);
        height: 100%;
        background: #fff;
        overflow: auto;
        border-right: 10px solid #c5c5c5;
        padding: 10px;
        box-sizing: border-box;
      }
      & > div.rightContent {
        float: left;
        height: 500px;
        width: 100%;
        padding-left: 25%;
        box-sizing: border-box;
        overflow: auto;
      }
    }
  }
  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  .clearfix:after {
    clear: both
  }
  .custom-tree-node {
    font-size: 12px;
    & img {
      padding-right: 3px;
      width: 18px;
      vertical-align: sub;
    }
  }
</style>