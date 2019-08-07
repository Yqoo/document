<template>
  <div class='themeBox bounceInDown animated' v-drag:themeBox>
    <div class="fadeInLeftBig animated" :class="themeColorName">
      <boxTools class="theme-color moveBox"  :style="themeColorStyle" :info="info" @windowsTools="windowsTools" :title="componentName"></boxTools>
      <el-row>
        <el-col :span="6">
          <el-menu class="el-menu-vertical-demo" :default-active="defaultActive"  @select="selectNav">
            <el-menu-item index='config'>
              <i class="el-icon-setting"></i>
              <span slot="title">系统设置</span>
            </el-menu-item>
            <el-menu-item index='organization'>
              <i class="el-icon-s-custom"></i>
              <span slot="title">组织与用户</span>
            </el-menu-item>
            <el-menu-item index='personal'>
              <i class="el-icon-user"></i>
              <span slot="title">个人中心</span>
            </el-menu-item>
            <el-menu-item index='theme'>
              <i class="el-icon-eleme"></i>
              <span slot="title">主题设置</span>
            </el-menu-item>
            <el-menu-item index='wallpaper'>
              <i class="el-icon-picture"></i>
              <span slot="title">更换壁纸</span>
            </el-menu-item>
            <el-menu-item index='help'>
              <i class="el-icon-question"></i>
              <span slot="title">使用帮助</span>
            </el-menu-item>
            <el-menu-item index='about'>
              <i class="el-icon-info"></i>
              <span slot="title">关于作品</span>
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="18" ref="rightContent">
          <component :is="current" ></component>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import tools from  "@/assets/js/utils/tools.js";
import { themeMixin}  from '@/assets/js/themeMixin.js';
import theme from "@/views/theme";
import config from "@/views/config";
import wallpaper from "@/views/wallpaper";
import personal from "@/views/personal";
import boxTools from "@/views/boxTools";
import organization from "@/components/organization/organization";
import help from "@/views/help";
import about from "@/views/about";
export default {
    mixins: [themeMixin],
    name: 'system',
    props:['index'],
    components:{
      theme,
      personal,
      boxTools,
      wallpaper,
      config,
      organization,
      help,
      about
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
        };
    },
    methods:{
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
    }
}
</script>
<style lang='less' scoped>
  .themeBox {
    width: 60%;
    min-height: 50%;
    
    position: absolute;
    top:10%;
    left: 20%;
    transform: translate(-50%,-50%);
    border-radius: 5px;
    box-shadow: 0px 0px 50px 10px rgba(0, 0, 0, .3);
    transition: box-shadow 0.5s, transform 0.5s;
    background-color: #fff;
    text-align: left;
    & .el-col-6{
      border-right: 1px solid #e6e6e6;
      & .el-menu{
        border-right: none; 
      }
    }
    & .el-menu-item:hover{
      background: rgba(0,0,0,.09);
    }
    & .el-menu-item:focus{
      background: rgba(0,0,0,.09);
    }
  }
</style>