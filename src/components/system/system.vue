<template>
  <div class='themeBox bounceInDown animated'>
    <div class="fadeInLeftBig animated">
      <el-row>
        <el-col :span="6" :class="themeColorName" >
          <el-menu class="el-menu-vertical-demo" :default-active="defaultActive"  @select="selectNav" :style="themeColorStyle">
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
            <i class="el-icon-minus"></i>
            <i class="el-icon-copy-document"></i>
            <i class="el-icon-close" @click="closeSystem"></i>
          </div>
          <component :is="current"></component>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import theme from "@/views/theme";
import personal from "@/views/personal";

export default {
    name: 'system',
    components:{
      theme,
      personal
    },
    data() {
        return {
          defaultActive:this.$route.params.index,
          isRouter:true,
          current:this.$route.params.index,
          themeColorName: '',
          themeColorStyle: {},
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
      closeSystem(){
        this.$router.push('/')
      }
    },
    watch: {
      storeChange( val ) {
        let themeColor = this.$store.state.themeColor;
        if( typeof themeColor == 'string' && (themeColor.constructor == String) ){
          this.themeColorName = themeColor;
        } else {
          this.themeColorName = '';
          this.themeColorStyle = {
            background: `-webkit-linear-gradient(${themeColor.edg}deg, ${themeColor.startColor}, ${themeColor.endColor})`,
            background: `-o-linear-gradient(${themeColor.edg}deg, ${themeColor.startColor}, ${themeColor.endColor})`,
            background: `-moz-linear-gradient(${themeColor.edg}deg, ${themeColor.startColor}, ${themeColor.endColor})`,
            background: `linear-gradient(${themeColor.edg}deg, ${themeColor.startColor}, ${themeColor.endColor})`,
            color: themeColor.fontColor
          }
        }
      }
    },
    created(){
      let themeColor = this.$store.state.themeColor;
      if( typeof themeColor == 'string' && (themeColor.constructor == String) ){
        this.themeColorName = themeColor;
      } else {
        this.themeColorName = '';
        this.themeColorStyle = {
          background: `-webkit-linear-gradient(${themeColor.edg}deg, ${themeColor.startColor}, ${themeColor.endColor})`,
          background: `-o-linear-gradient(${themeColor.edg}deg, ${themeColor.startColor}, ${themeColor.endColor})`,
          background: `-moz-linear-gradient(${themeColor.edg}deg, ${themeColor.startColor}, ${themeColor.endColor})`,
          background: `linear-gradient(${themeColor.edg}deg, ${themeColor.startColor}, ${themeColor.endColor})`,
          color: themeColor.fontColor
        }
      }
    }
}
</script>
<style lang='less' scoped>
  @import url('../../style/theme.less');
  @import url('../../style/defaultColor.less');
  .themeBox {
    height: 60%;
    width: 60%;
    min-height: 480px;
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
  }
  .boxTools{
    text-align: right;
    border-bottom:1px solid #ddd;
    & i{
      padding:0px 10px;
      cursor:pointer;
    }
  }
</style>