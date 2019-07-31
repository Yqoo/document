<template>
  <div class='themeBox bounceInDown animated' v-drag>
    <div class="fadeInLeftBig animated">
      <el-row>
        <el-col :span="6" :class="themeColorName" >
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
        <el-col :span="18">
          <div class="boxTools">
            <el-tooltip class="item" effect="light" content="最小化" placement="bottom">
              <i class="el-icon-minus" @click="minSize"></i>
            </el-tooltip>
            <el-tooltip v-if="max" class="item" effect="light" content="最大化" placement="bottom">
              <i class="el-icon-full-screen" @click="maxSize" ></i>             
            </el-tooltip>
            <el-tooltip v-else class="item" effect="light" content="还原" placement="bottom">
              <i class="el-icon-copy-document" @click="restore"></i>             
            </el-tooltip>
            <el-tooltip class="item" effect="light" content="关闭" placement="bottom">
              <i class="el-icon-close" @click="closeSystem"></i>
            </el-tooltip>
          </div>
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

export default {
    name: 'system',
    props:['index'],
    components:{
      theme,
      personal
    },
    data() {
        return {
          defaultActive:this.$route.params.index,
          isRouter:true,
          current:this.index,
          max:true,
          minWidth:'',
          minHeight:'',
          themeColorName: '',
          themeColorStyle: {},
          zIndex:this.$store.state.zIndex,
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
      closeSystem(){//关闭system
        this.$emit('closeSystem',true);
      },
      minSize(){//最小化
        this.$emit('displaySystem',false)
      },
      maxSize(){//最大化
        tools._maxSize(document.querySelector('.themeBox'))
        this.max = false;
      },
      restore(){//还原
        tools._restore( document.querySelector('.themeBox'),this.minHeight,this.minWidth)
        this.max = true;
      },
      
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

    }
}
</script>
<style lang='less' scoped>
  .themeBox {
    height: 60%;
    width: 60%;
    //min-height: 480px;
    border: 1px solid #ddd;
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
  }
  .boxTools{
    text-align: right;
    float: right;
    margin-right: 15px;
    & i{
      padding:0px 5px;
      cursor:pointer;
    }
  }
</style>