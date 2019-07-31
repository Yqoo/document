<template>
  <div class='themeBox bounceInDown animated' v-drag>
    <div class="fadeInLeftBig animated" :class="themeColorName">
      <boxTools class="theme-color"  :style="themeColorStyle" :info="info" @windowsTools="windowsTools" :title="componentName"></boxTools>
      <el-row>
        <el-col :span="6" :class="themeColorName">
          <el-menu class="el-menu-vertical-demo theme-color" :default-active="defaultActive"  @select="selectNav" :style="themeColorStyle">
            <el-menu-item index='sysem'>
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
          <component :is="current"></component>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import tools from  "@/assets/js/utils/tools.js";
import theme from "@/views/theme";
import personal from "@/views/personal";
import boxTools from "@/views/boxTools";
export default {
    name: 'system',
    props:['index'],
    components:{
      theme,
      personal,
      boxTools,
    },
    data() {
        return {
          defaultActive:this.$route.params.index,
          isRouter:true,
          current:this.index,
          minWidth:'',
          minHeight:'',
          themeColorName: '',
          themeColorStyle: {},
          zIndex:this.$store.state.zIndex,
          info:{className:'.themeBox',name:'system'},
          componentName:'系统设置',
          rightContentHeight: 0,
        };
    },
    computed: {
      storeChange() {
        return this.$store.state.themeColor;
      }
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
        if(obj.type === 'maxSize' || obj.type === 'restore') {
          let titleHeight = document.querySelector('.boxTools').offsetHeight;
          this.setLeftHeight( titleHeight );
        }
      },
      setLeftHeight( diffVal ) {
        let rightContentHeight = this.$refs.rightContent.$el.offsetHeight - diffVal;
        document.querySelector('.el-menu').style.height = rightContentHeight +'px';
      }
    },
    watch: {
      storeChange( val ) {
        this.themeColorName = this._getThemeColor(this, val.themeColorName, val.themeColorStyle).className;
        this.themeColorStyle = this._getThemeColor(this, val.themeColorName, val.themeColorStyle).style;
      }
    },
    created(){
      this.themeColorName = this._getThemeColor(this, this.themeColorName, this.themeColorStyle).className;
      this.themeColorStyle = this._getThemeColor(this, this.themeColorName, this.themeColorStyle).style;
    },
    mounted(){
      this.minWidth = document.querySelector('.themeBox').offsetWidth;
      this.minHeight = document.querySelector('.themeBox').offsetHeight;
      this.setLeftHeight( 0 );
    }
}
</script>
<style lang='less' scoped>
  .themeBox {
    width: 60%;
    position: absolute;
    top:10%;
    left: 20%;
    transform: translate(-50%,-50%);
    border-radius: 5px;
    box-shadow: 0px 0px 50px 10px rgba(0, 0, 0, .3);
    transition: box-shadow 0.5s, transform 0.5s;
    background-color: #fff;
    text-align: left;
    & > div, & .el-row, & .el-col, & .el-menu{
      height: 100%;
    }
    & .el-menu-item:hover{
      background: rgba(0,0,0,.09);
    }
    & .el-menu-item:focus{
      background: rgba(0,0,0,.09);
    }
  }
</style>