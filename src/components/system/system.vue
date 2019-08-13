<!--
 * @Date: 2019-07-26 17:20:46
 * @LastEditors: Yqoo
 * @LastEditTime: 2019-08-13 15:31:09
 -->
<template>
  <div class='themeBox' v-drag:themeBox>
    <div class="fadeInLeftBig animated" :class="themeColorName">
      <boxTools class="theme-color moveBox"  :style="themeColorStyle" :info="info" @windowsTools="windowsTools" :title="componentName"></boxTools>
      <el-tooltip class="item" effect="light" content="返回" placement="bottom">
        <i class="el-icon-back backBtn" v-if="leftSize == 24?false:true" @click="leftSize = 24"></i>
      </el-tooltip>
        <el-row>
          <el-col :span="leftSize" >
            <div class="leftSystemLogo" >
              <div><img :src="require('@/assets/image/icons/deskIcons/icon-bigSetting.png')" ></div>
              <span>系统设置</span>
            </div>
            <div class="searchInput">
              <el-input  suffix-icon="el-icon-search" placeholder="查找设置"></el-input>
            </div>
            <ul class="menus">
              <li v-for="(menu,key) in menus" :key="key" class="hvr-float-shadow" @click='chooseMenus(menu.name)'>
                <img :src="menu.img">
                <div>
                  <span>{{menu.title}}</span>
                  <p>{{menu.desc}}</p>
                </div>
              </li>
            </ul>
            </el-col>
            <el-col :span="24-leftSize">
            <div class="rightContent zoomIn animated">            
              <component :is="current" ></component>
            </div>
          </el-col>
        </el-row>
    </div>
  </div>
</template>

<script>
import tools from  "@/assets/js/utils/tools.js";
import { themeMixin}  from '@/assets/js/themeMixin.js';
import theme from "@/views/theme";
import wallpaper from "@/views/wallpaper";
import boxTools from "@/views/boxTools";
import help from "@/views/help";
import about from "@/views/about";
import applications from "@/components/applications/applications";
import logManage from "@/components/logManage/logManage";
import backupAndRecovery from "@/components/backupAndRecovery/backupAndRecovery";
import authorizationMessage from "@/views/authorizationMessage";
import organization from "@/components/organization/organization";
import dc from "@/components/dataCenter/dc";
export default {
    mixins: [themeMixin],
    name: 'system',
    props:['index'],
    components:{
      theme,
      boxTools,
      wallpaper,
      help,
      about,
      applications,
      logManage,
      backupAndRecovery,
      authorizationMessage,
      organization,
      dc
    },
    data() {
        return {
          defaultActive:this.$route.params.index,
          isRouter:true,
          current:this.index,
          minWidth:'',
          minHeight:'',
          zIndex:this.$store.state.zIndex,
          info:{className:'.themeBox',name:'system',icon:'icon-system'},//boxTools组件所需参数
          componentName:'系统设置',
          leftSize:24,
          menus:[//菜单
            { name:'dc',title:'数据中心',img:require('@/assets/image/icons/deskIcons/icon-datas.png'),desc:'数据库建立、维护、链接、合并与分离'},
            { name:'applications',title:'程序应用',img:require('@/assets/image/icons/deskIcons/icon-applications.png'),desc:'云商城、程序下载、安装、启用、设置与控制台'},
            { name:'organization',title:'组织与账户',img:require('@/assets/image/icons/deskIcons/icon-adiminster.png'),desc:'组织、等级、用户、岗位、角色、上下级与用户组'},
            { name:'wallpaper',title:'壁纸设置',img:require('@/assets/image/icons/deskIcons/icon-wallpaper.png'),desc:'为桌面更换个性化壁纸'},
            { name:'theme',title:'主题设置',img:require('@/assets/image/icons/deskIcons/icon-theme.png'),desc:'为系统更换显示风格、包括颜色、图标与效果'},
            { name:'logManage',title:'日志管理',img:require('@/assets/image/icons/deskIcons/icon-log.png'),desc:'日志的管理'},
            { name:'backupAndRecovery',title:'备份恢复',img:require('@/assets/image/icons/deskIcons/icon-backupArecy.png'),desc:'备份的恢复'},
            { name:'authorizationMessage',title:'授权信息',img:require('@/assets/image/icons/deskIcons/icon-authorizationMessage.png'),desc:'授权的信息'},
            { name:'help',title:'使用帮助',img:require('@/assets/image/icons/deskIcons/icon-help.png'),desc:'使用帮助'},
            { name:'about',title:'关于我们',img:require('@/assets/image/icons/deskIcons/icon-about.png'),desc:'关于我们的详细信息'},
          ],
        };
    },
    methods:{
      chooseMenus( name ){
        this.current = name;
        this.leftSize = 0;
      },
      selectNav( index ){
        this.current = index;
      },
      windowsTools( obj ){
        let _s = {
          minSize:   ( param ) => this.$emit( 'minSize',param ),
          maxSize:   ( param ) => tools._maxSize(document.querySelector( param )),
          restore:   ( param ) => tools._restore( document.querySelector(param),this.minHeight,this.minWidth),
          closeItem: ( param ) => this.$emit( 'closeItem',param )
        };
        _s[obj.type](obj.param);
      },
    },
    mounted(){
      this.minWidth = document.querySelector('.themeBox').offsetWidth;
      this.minHeight = document.querySelector('.themeBox').offsetHeight;
    },
    watch:{
      
    },
}
</script>
<style lang='less' scoped>
  section{
    position: relative;
    width: 100%;
    box-sizing: border-box;
    border: 10px solid #eee;
    border-radius: 0 0 5px 5px;
    background: #fff;
    &:after {
      content: '';
      display: block;
      clear: both;
    }
    & aside{
      position: absolute;
      top: 0px;
      left: 0px;
      width: 25%;
      height: 100%;
      border-right: 10px solid #eee;
      & .el-menu{
        border-right: none;
        background: transparent;
      }
    }
    & > div{
      width: 100%;
      height: 100%;
      float: left;
      & > div{
        margin-left: calc(25% + 10px);
      }
    }
  }
  .el-row {
    background: #fff;
  }
  .themeBox {
    width: 60%;
    height: 70%;
    background: #fff;
    //border: 3px double #b1b0b0;
    position: absolute;
    top:10%;
    left: 20%;
    border-radius: 8px;
    box-shadow: 0px 0px 50px 10px rgba(0, 0, 0, .3);
    transition: box-shadow 0.5s, transform 0.5s;
    text-align: left;
  }
  .leftSystemLogo{
    height: 150px;
    display: flex;
    flex-flow: column;
    text-align: center;
    & div {
      padding: 20px 0px;
      & img {
        width: 100px;
      }
    }
    & span {
      font-size: 12px;
      margin-top: -20px;
    }
  }
  .el-icon-s-operation {
    padding-left: 23px;
    cursor: pointer;
    color: #3d84a8;
    font-size: 18px;
  }
  .searchInput {
    width: 40%;
    margin: 10px auto 25px;
  }
  .menus {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    padding: 20px;
    & li {
      margin:20px 5px;
      cursor: pointer;
      & img {
        width:30px;
      }
      & div {
        float: right;
        width: 150px;
        padding-left: 10px;
        & span {
          font-size: 14px;
        }
        & p {
          font-size: 10px;
        }
      }
    }   
  }
  .backBtn {
    position: absolute;
    left:100px;
    top: 9px;
    cursor: pointer;
  }
</style>