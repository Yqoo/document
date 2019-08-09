<!--
 * @Date: 2019-07-30 09:10:35
 * @LastEditors: OBKoro1
 * @LastEditTime: 2019-08-09 09:51:56
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
            <div>这里是路径</div>
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
          <el-tree :data="treeData">
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>
                <img :src="data.icon">{{ data.label }}
              </span>
            </span>
          </el-tree>
        </div>
      </aside>
      <div class="rightContent">
        <component :is="current"></component>
      </div>
    </section>
  </div>
</template>

<script>
import tools from  "@/assets/js/utils/tools.js";
import boxTools from "@/views/boxTools";
import iCloudIndex from "@/components/iCloud/iCloudIndex";
import utilLists from "@/components/iCloud/utilLists"
export default {
    name:'myCloud',
    components:{
      boxTools,
      iCloudIndex,
      utilLists,
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
              icon:require('@/assets/image/icons/deskIcons/icon-myCloud.png'),
              children:[
                {label:'桌面',icon:require('@/assets/image/icons/deskIcons/tree-computer.png')},
                {label:'我的文档',icon:require('@/assets/image/icons/deskIcons/tree-folder.png')},
                {label:'软件区',icon:require('@/assets/image/icons/deskIcons/tree-disk.png')},
                {label:'文档区',icon:require('@/assets/image/icons/deskIcons/tree-disk.png')},
                {label:'娱乐区',icon:require('@/assets/image/icons/deskIcons/tree-disk.png')},
              ],
            },
            {
              label:'共享云端',
              icon:require('@/assets/image/icons/deskIcons/tree-share.png'),
              children:[
                {label:'开发部',icon:require('@/assets/image/icons/deskIcons/tree-disk2.png')},
                {label:'学习区',icon:require('@/assets/image/icons/deskIcons/tree-disk2.png')}
              ],
            },
            {
              label:'组织云端',
              icon:require('@/assets/image/icons/deskIcons/tree-org.png'),
              children:[
                {
                  label:'四川挚友软件有限公司',
                  icon:require('@/assets/image/icons/deskIcons/tree-disk.png'),
                  children:[
                    {label:'前端学习区',icon:require('@/assets/image/icons/deskIcons/tree-disk2.png')},
                    {label:'后端学习区',icon:require('@/assets/image/icons/deskIcons/tree-disk2.png')}
                  ]
                }
              ],
            }
          ],
          current:'iCloudIndex',//初始进入myCloud 默认右侧显示
          utilName: 'myCloud',  //选中的模块名称
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
      }
    },
    mounted(){
      this.minWidth = document.querySelector('.myCloud').offsetWidth;
      this.minHeight = document.querySelector('.myCloud').offsetHeight;
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
}
</script>
<style lang='less' scoped>
  .myCloud {
    // min-height: 60%;  
    width: 60%;
    position: absolute;
    top: 10%;
    left: 20%;
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
      border: 10px solid #f1f1f1;
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
        height: 28px;
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
      border: 10px solid #f1f1f1;
      & aside{
        position: absolute;
        top: 0px;
        left: 0px;
        width: calc(25% - 10px);
        height: 100%;
        background: #fff;
        overflow: auto;
        border-right: 10px solid #f1f1f1;
      }
      & > div.rightContent {
        float: left;
        height: 100%;
        width: 100%;
        padding-left: 25%;
        box-sizing: border-box;
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