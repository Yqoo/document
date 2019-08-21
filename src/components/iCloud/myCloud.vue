<!--
 * @Date: 2019-07-30 09:10:35
 * @LastEditors: Yqoo
 * @LastEditTime: 2019-08-09 18:04:44
 -->
<template>
  <div class='myCloud' v-drag @contextmenu.prevent :class="themeColorName" ref="myCloud">
    <boxTools class="theme-color moveBox" :style="themeColorStyle" :info="info" @windowsTools="windowsTools" :title="componentTitle"></boxTools>
    <div class="topContent">
        <i class="el-icon-arrow-down" v-show="isShowUtils" @click="utilCollapse" title="收起工具栏"></i>
        <div class="utilLists" :class="hideUtil">
          <topUtil @utilClick="utilClick" :lists="lists"></topUtil>
        </div>
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
          <el-tree :data="treeData" 
          @node-click="handleNodeClick"
          @node-contextmenu="rightNodeClick"
          >
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>
                <img :src="data.icon">{{ data.label }}
              </span>
            </span>
          </el-tree>
        </div>
      </aside>
      <div class="rightContent">
        <component v-if="refreshContent && rightContentData!=''" :is="current" @changeUtils="changeUtils" @openFolder="openFolder" @showRightMenu="showRightMenu" :attrs="attrs" :current="current" ref="rightComponent"></component>
      </div>
    </section>
    <rightMenu v-if="isShowRight" :position="menuPosition" :lists="menuList" @rightMenuClick="rightMenuClick" @hideRightMenu="hideRightMenu"></rightMenu>
  </div>
</template>

<script>
import { themeMixin } from '@/assets/js/themeMixin.js'
import tools from  "@/assets/js/utils/tools.js";
import boxTools from "@/views/boxTools";
import iCloudIndex from "@/components/iCloud/iCloudIndex";
import topUtil from "@/components/iCloud/topUtil";
import mineCloud from '@/components/iCloud/mineCloud';
import shareCloud from '@/components/iCloud/shareCloud';
import organizationCloud from '@/components/iCloud/organizationCloud';
import fileContent from '@/components/iCloud/fileContent';
import shareContent from "@/components/iCloud/shareContent.vue";
import rightMenu from '@/components/iCloud/rightMenu.vue';
var rightData = {
            mineCloud:{
              fileRight:[],
              folderRight:[],
              blankRightZy:[],
              blankRightMine:[
                {iconImg:require('@/assets/image/icons/fileIcons/partition.png'),iconTitle:'创建云端',children:[{iconImg:require('@/assets/image/icons/deskIcons/tree-disk3.png'),iconTitle:'子菜单',tip:'Ctrl+x'}]},
                {iconImg:require('@/assets/image/icons/fileIcons/format.png'),iconTitle:'格式云端'}
              ],
              data:[
                {name:'我的桌面',type:0,component:'fileContent',imgurl:require('@/assets/image/icons/deskIcons/desk.png'),icon:'',active:false},
                {name:'我的文档',type:0,component:'fileContent',imgurl:require('@/assets/image/icons/deskIcons/tree-folder.png'),icon: '',active:false},
                {name:'私密空间',type:0,component:'fileContent',imgurl:require('@/assets/image/icons/deskIcons/tree-folder.png'),icon:require('@/assets/image/icons/fileIcons/dsi.png'),active:false},
                {name:'我的共享',type:0,component:'shareContent',imgurl:require('@/assets/image/icons/deskIcons/tree-folder.png'),icon:require('@/assets/image/icons/fileIcons/user.png'),active:false},
                {name:'接收共享',type:0,component:'shareContent',imgurl:require('@/assets/image/icons/deskIcons/tree-folder.png'),icon:require('@/assets/image/icons/fileIcons/person.png'),active:false},
                {name:'我的分享',type:0,component:'shareContent',imgurl:require('@/assets/image/icons/deskIcons/tree-folder.png'),icon:require('@/assets/image/icons/fileIcons/myshare.png'),active:false},
                {name:'接收分享',type:0,component:'shareContent',imgurl:require('@/assets/image/icons/deskIcons/tree-folder.png'),icon:require('@/assets/image/icons/fileIcons/recept.png'),active:false},
                {name:'备份中心',type:0,component:'fileContent',imgurl:require('@/assets/image/icons/deskIcons/tree-folder.png'),icon:require('@/assets/image/icons/fileIcons/backups.png'),active:false},
                {name:'软件区',type:1,component:'fileContent',imgurl:require('@/assets/image/icons/deskIcons/tree-disk3.png'),active:false},
                {name:'文档区',type:1,component:'fileContent',imgurl:require('@/assets/image/icons/deskIcons/tree-disk3.png'),active:false},
                {name:'娱乐区',type:1,component:'fileContent',imgurl:require('@/assets/image/icons/deskIcons/tree-disk3.png'),active:false},
            ],
            },
            shareCloud:{
              fileRight:[],
              folderRight:[],
              blankRight:[],
              data:[
                {name:'开发部',component:'fileContent',imgurl:require('@/assets/image/icons/deskIcons/tree-disk4.png'),active:false},
                {name:'学习区',component:'fileContent',imgurl:require('@/assets/image/icons/deskIcons/tree-disk4.png'),active:false},
              ]
            },
          organizationCloud:{
              fileRight:[],
              folderRight:[],
              blankRight:[],
              data:[
                  {name:'四川挚友软件有限公司',component:'fileContent',imgurl:require('@/assets/image/icons/fileIcons/company.png'),active:false}
                ]
            },
          };
export default {
    mixins: [themeMixin],
    name:'myCloud',
    components:{
      boxTools,
      iCloudIndex,
      topUtil,
      mineCloud,
      shareCloud,
      organizationCloud,
      fileContent,
      shareContent,
      rightMenu
    },
    data() {
        return {
          info:{ className:'.myCloud',name:'myCloud',icon:'icon-myCloud' },
          minWidth:'',
          minHeight:'',
          componentTitle:'我的云端',
          treeData:[
            {
              label:'我的云端',
              name: 'mineCloud',
              icon:require('@/assets/image/icons/deskIcons/icon-computer.png'),
              children:[
                {
                  label:'桌面',
                  name: 'fileContent',
                  icon:require('@/assets/image/icons/deskIcons/desk.png'),
                  },
                {label:'我的文档',name:'fileContent',icon:require('@/assets/image/icons/deskIcons/tree-folder.png')},
                {label:'软件区',name:'fileContent',icon:require('@/assets/image/icons/deskIcons/tree-disk.png')},
                {label:'文档区',name:'fileContent',icon:require('@/assets/image/icons/deskIcons/tree-disk.png')},
                {label:'娱乐区',name:'fileContent',icon:require('@/assets/image/icons/deskIcons/tree-disk.png')},
              ],
              left: [
                {
                  iconImg: require('@/assets/image/icons/fileIcons/fileO.png'),
                  iconTitle: '文件操作',
                  isRightBorder: false,
                  flag: false,
                  children: [
                      {
                          iconImg: require('@/assets/image/icons/fileIcons/dailyO.png'),
                          iconTitle: '日常操作',
                          children: [
                              {iconImg: require('@/assets/image/icons/fileIcons/cut.png'),iconTitle: '剪切',tip:'Ctrl+x'},
                              {iconImg: require('@/assets/image/icons/fileIcons/copy.png'),iconTitle: '复制',tip:'Ctrl+c'},
                              {iconImg: require('@/assets/image/icons/fileIcons/paste.png'),iconTitle: '粘贴',tip:'Ctrl+v'},
                              {iconImg: require('@/assets/image/icons/fileIcons/rename.png'),iconTitle: '重命名',tip:'F2'},
                              {iconImg: require('@/assets/image/icons/fileIcons/pardelete.png'),iconTitle: '删除',tip:'del'}
                          ],
                      },
                      {
                          iconImg: require('@/assets/image/icons/fileIcons/check.png'),
                          iconTitle: '在线操作',
                          children: [
                              {iconImg: require('@/assets/image/icons/fileIcons/preview.png'),iconTitle: '在线预览'},
                              {iconImg: require('@/assets/image/icons/fileIcons/edit.png'),iconTitle: '在线编辑'},
                              {iconImg: require('@/assets/image/icons/fileIcons/coordination.png'),iconTitle: '协同编辑'},
                              {iconImg: require('@/assets/image/icons/fileIcons/compress.png'),iconTitle: '在线压缩'},
                              {iconImg: require('@/assets/image/icons/fileIcons/decompression.png'),iconTitle: '在线解压'}, 
                              {iconImg: require('@/assets/image/icons/fileIcons/encryption.png'),iconTitle: '文件加密'}, 
                              {iconImg: require('@/assets/image/icons/fileIcons/dsi.png'),iconTitle: '文件解密'}       
                          ]
                      },
                  ],
                },
                {
                    iconImg: require('@/assets/image/icons/fileIcons/recycle.png'),
                    iconTitle: '回收站',
                    isRightBorder: true
                },
                {
                    iconImg: require('@/assets/image/icons/fileIcons/addC.png'),
                    iconTitle: '申请增容',
                    isRightBorder: false
                },
                {
                    iconImg: require('@/assets/image/icons/fileIcons/reduceC.png'),
                    iconTitle: '申请减容',
                    isRightBorder: true
                },
                {
                  iconImg: require('@/assets/image/icons/fileIcons/check.png'),
                  iconTitle: '查看',
                  isRightBorder: false,
                  flag: false,  //用于判断二级菜单是否显示
                  children: [
                      {iconImg: require('@/assets/image/icons/fileIcons/little.png'),iconTitle: '小图标'},
                      {iconImg: require('@/assets/image/icons/fileIcons/middle.png'),iconTitle: '中图标'},
                      {iconImg: require('@/assets/image/icons/fileIcons/big.png'),iconTitle: '大图标'},
                  ]
                },
                {
                  iconImg: require('@/assets/image/icons/fileIcons/array.png'),
                  iconTitle: '排列',
                  isRightBorder: true,
                  flag: false,
                  children: [
                      {iconImg: require('@/assets/image/icons/fileIcons/row.png'),iconTitle: '行展示'},
                      {iconImg: require('@/assets/image/icons/fileIcons/col.png'),iconTitle: '列展示'}
                  ]
                },
                {
                  iconImg: require('@/assets/image/icons/fileIcons/sendmsg.png'),
                  iconTitle: '发送',
                  isRightBorder: true,
                  flag: false,
                  children: [
                      {iconImg: require('@/assets/image/icons/fileIcons/desk.png'),iconTitle: '发送桌面'},
                      {iconImg: require('@/assets/image/icons/fileIcons/msg.png'),iconTitle: '即时通讯'},
                      {iconImg: require('@/assets/image/icons/fileIcons/mail.png'),iconTitle: '发送邮件'},
                      {iconImg: require('@/assets/image/icons/fileIcons/phone.png'),iconTitle: '发送短信'},
                      {iconImg: require('@/assets/image/icons/fileIcons/message.png'),iconTitle: '发送消息'},
                  ]
                },
                {
                  iconImg: require('@/assets/image/icons/fileIcons/refresh.png'),
                  iconTitle: '刷新',
                  isRightBorder: false
                },
                {
                  iconImg: require('@/assets/image/icons/fileIcons/help.png'),
                  iconTitle: '帮助',
                  isRightBorder: false
                }
              ],
              right:[
                {iconImg:require('@/assets/image/icons/fileIcons/attribute.png'),iconTitle:'属性'}
              ]
            },
            {
              label:'共享云端',
              name: 'shareCloud',
              icon:require('@/assets/image/icons/deskIcons/tree-share2.png'),
              children:[
                {label:'开发部',name:'fileContent',icon:require('@/assets/image/icons/deskIcons/tree-disk2.png')},
                {label:'学习区',name:'fileContent',icon:require('@/assets/image/icons/deskIcons/tree-disk2.png')}
              ],
            },
            {
              label:'组织云端',
              name: 'organizationCloud',
              icon:require('@/assets/image/icons/deskIcons/tree-org2.png'),
              children:[
                {
                  label:'四川挚友软件有限公司',
                  icon:require('@/assets/image/icons/deskIcons/tree-disk.png'),
                  name:'fileContent',
                  children:[
                    {label:'前端学习区',name:'fileContent',icon:require('@/assets/image/icons/deskIcons/tree-disk2.png')},
                    {label:'后端学习区',name:'fileContent',icon:require('@/assets/image/icons/deskIcons/tree-disk2.png')}
                  ]
                }
              ],
            }
          ],
          rightContentData:'', //右侧内容数据
          current: 'iCloudIndex',//初始进入myCloud 默认右侧显示
          isShowUtils: true,  // 展开工具栏
          lists: [], // 工具栏中的数据
          hideUtil: '',  // 隐藏工具栏类名
          attrs: { //用来判断组件中所传属性
            isClick: {// 用于判断点击的哪一块内容(点击其他模块时，边框消失)
              mineCloud: {zhiyou: false, mine: false},
              shareCloud: false,
              organizationCloud: false,
            }
          }, 
          refreshContent: true, // 刷新
          isShowRight: false,  //是否显示右键菜单（点击树节点使用）
          menuPosition: {top: 0, left: 0},  //右键菜单的位置
          menuList: [],  // 右键菜单的内容
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
      handleNodeClick(data, node, el) {  //左侧树节点左键选中，切换模块和工具栏
        console.log(data)
        this.current = data.name; // 切换显示组件
        //展示对应组件的数据
        this.attrs={
          ...this.attrs,
          ...rightData[data.name]
        };
        this.lists = data.left;  // 切换工具栏
        //点击节点切换弹框标题
        let iconArr = data.icon.split('/');
        let icon = iconArr[iconArr.length - 1].split('.')[0];
        Object.assign(this.info, {
          icon: icon
        });
        this.componentTitle = data.label;
      },
      rightNodeClick(e, data){  //树节点右键选中
        this.showRightMenu({e, list:data.right});
      }, 
      showRightMenu( data ){ // 右键菜单显示数据展示和位置展示
        this.isShowRight = true;
        let e = data.e;
        let top = e.clientY - (document.querySelector('.myCloud').offsetTop - document.querySelector('.myCloud').offsetHeight / 2);
        let left = e.clientX - document.querySelector('.myCloud').offsetLeft;
        Object.assign(this.menuPosition, {
          top: top + 'px',
          left: left + 'px'
        });
        this.menuList = data.list;
      },
      changeUtils( tag ){  // 点击右侧内容模块，切换工具栏
        this.lists = tag.list; //切换工具栏
        //给点击的内容加上边框,切换模块时，清除其他模块点中的文件
        Object.assign(this.attrs.isClick, {
          mineCloud: {zhiyou: false, mine: false},
          shareCloud: false,
          organizationCloud: false,
        });
        if(tag.clickTag === 'zhiyou' || tag.clickTag === 'mine'){
          this.attrs.isClick.mineCloud[tag.clickTag] = true;
        } else {
          this.attrs.isClick[tag.clickTag] = true;
        }
      },
      utilClick( name ){ // 工具栏中点击的名字
        //点击的是刷新
        if(name === '刷新'){
          this.refreshContent = false;
          this.$nextTick(() => {
            this.refreshContent = true;
          });
        }else if(name === '回收站'){
          this.$parent.$parent.$parent.applicationHandle('recycle');
          return false;
        }
        this.attrs = {
          ...this.attrs,
          name,
          current: this.current
        };
      },
      openFolder( component ){ //双击文件夹
        if(component == null){
          return false;
        }
        this.current = component;
      },
      hideRightMenu(){ //隐藏右键菜单
          this.isShowRight = false;
      },
      rightMenuClick(item){ // 树节点右键菜单选中
        console.log(item)
        // console.log(this.$refs.rightComponent);
      }
    },
    mounted(){
      this.minWidth = document.querySelector('.myCloud').offsetWidth;
      this.minHeight = document.querySelector('.myCloud').offsetHeight;
      //工具栏初始化
      this.lists = this.treeData[0].left;
      //初始化右侧内容
      this.rightContentData = rightData;
      this.attrs = {
        ...this.attrs,
        ...this.rightContentData,
      }
    },
}
</script>
<style lang='less' scoped>
  .myCloud { 
    width: 80%;
    position: absolute;
    top: 50%;
    left: 10%;
    transform: translate(0, -50%);
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
        // transition: height 0.3s;
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
        max-height: 500px;
        min-height: 400px;
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