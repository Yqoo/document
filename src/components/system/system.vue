<!--
 * @Date: 2019-07-26 17:20:46
 * @LastEditors: Yqoo
 * @LastEditTime: 2019-08-10 16:49:40
 -->
<template>
  <div class='themeBox' v-drag:themeBox>
    <div class="fadeInLeftBig animated" :class="themeColorName">
      <boxTools class="theme-color moveBox"  :style="themeColorStyle" :info="info" @windowsTools="windowsTools" :title="componentName"></boxTools>
        <el-row>
          <el-col :span="leftSize">
            <el-tooltip class="item" effect="dark" :content="tips" placement="right-start">
               <i class="el-icon-s-operation" @click="expand"></i>
            </el-tooltip>
            <div class="leftSystemLogo" >
              <div><img :src="require('@/assets/image/icons/deskIcons/icon-bigSetting.png')" v-show="!isCollapse"></div>
              <span v-show="!isCollapse">系统设置</span>
            </div>
            <el-menu class="el-menu-vertical-demo" :default-active="defaultActive"  @select="selectNav" :collapse="isCollapse">
              <el-menu-item index='applications'>
                <img :src="require('@/assets/image/icons/deskIcons/icon-applications.png')">
                <span slot="title">程序应用</span>
              </el-menu-item>
              <el-menu-item index='wallpaper'>
                <i class="el-icon-picture" style="color:#6c7b95"></i>
                <span slot="title">更换壁纸</span>
              </el-menu-item>
              <el-menu-item index='theme'>
                <i class="el-icon-menu" style="color:#a0cc78"></i>
                <span slot="title">主题设置</span>
              </el-menu-item>
              <el-menu-item index='logManage'>
                <img :src="require('@/assets/image/icons/deskIcons/icon-log.png')">
                <span slot="title">日志管理</span>
              </el-menu-item>
              <el-menu-item index='backupAndRecovery'>
                <i class="el-icon-refresh" style="color:#cca8e9"></i>
                <span slot="title">备份恢复</span>
              </el-menu-item>
              <el-menu-item index='authorizationMessage'>
                <img :src="require('@/assets/image/icons/deskIcons/icon-authorizationMessage.png')">
                <span slot="title">授权信息</span>
              </el-menu-item>
              <el-menu-item index='help'>
                <i class="el-icon-question" style="color:#ffd692"></i>
                <span slot="title">使用帮助</span>
              </el-menu-item>
              <el-menu-item index='about'>
                <i class="el-icon-info" style="color:#e15249"></i>
                <span slot="title">关于作品</span>
              </el-menu-item>
            </el-menu>
            </el-col>
            <el-col :span="24-leftSize">
            <div class="rightContent">
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
      authorizationMessage
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
          isCollapse:false,//是否收缩菜单栏
          leftSize:4,
          tips:'收缩',
        };
    },
    methods:{
      expand(){
        this.isCollapse = !this.isCollapse
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
      isCollapse( val ){
        val && (this.leftSize = 2,this.tips = '展开') || ( this.leftSize = 4,this.tips = '收缩' );
      }
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
    background: transparent;
    //border: 3px double #b1b0b0;
    position: absolute;
    top:50%;
    left: 50%;
    transform: translate(-50%,-50%);
    border-radius: 8px;
    box-shadow: 0px 0px 50px 10px rgba(0, 0, 0, .3);
    transition: box-shadow 0.5s, transform 0.5s;
    text-align: left;
    & .el-menu-item:hover{
      background: rgba(0,0,0,.09);
    }
    & .el-menu-item:focus{
      background: rgba(0,0,0,.09);
    }
    & .el-menu-item span {
      font-size: 13px;
    }
    & .el-menu-item img {
      width: 18px;
      padding: 0px 7px 0px 3px;
    }
    & .el-menu-item:nth-child(1){
      border-top:1px solid #ddd;
    }
     
  }
  .leftSystemLogo{
    height: 150px;
    display: flex;
    flex-flow: column;
    text-align: center;
    line-height: 30px;
    & div {
      padding-top: 10px;
      & img {
        width: 100px;
      }
    }
    & span {
      font-size: 12px;
    }
  }
  .el-icon-s-operation {
    padding-left: 23px;
    cursor: pointer;
    color: #3d84a8;
    font-size: 18px;
  }
</style>