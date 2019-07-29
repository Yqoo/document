<template>
  <el-container :style="bg">
    <el-main ref="main">
      <div @contextmenu.prevent.stop="rightMouse($event)" @click="hideRightMenus" class="desktop">
        <rightMenus v-if="isRightMouseClick" :rules="rules" :position="position" @closeMenus="closeMenus"></rightMenus>
      </div>
      <router-view></router-view>
    </el-main>
    <el-footer :style="groundGlass">
      <bottomBar></bottomBar>
    </el-footer>
  </el-container>
</template>

<script>
import bg from "@/assets/image/bg/window10.jpg";
import bottomBar from "@/components/bottomBar/bottomBar.vue";
import rightMenus from "@/views/rightMouse"
export default {
  name: "home",
  components: {
    bottomBar,
    rightMenus
  },
  data() {
    return {
      bg: {
        background: `url(${bg}) center center no-repeat`
      },
      groundGlass: {
        background: `hsla(0,0%,100%,.25) border-box`,
        overflow: `hidden`,
        boxShadow: `0 0 0 1px hsla(0,0%,100%,.3) inset,0 .5em 1em rgba(0,0,0,0.6)`,
        textShadow: `0 1px 1px hsla(0,0%,100%,.3)`,
        color: `#fff`
      },
      isRightMouseClick:false,
      rules:'',//右键菜单规则
      position:{
        left: '',  //鼠标点击的位置
        right: '',
        mainHeight: '',  //主页面的宽高
        mainWidth: '',
      },
    };
  },
  methods: {
    rightMouse( e ) {
      //右键事件
      this.isRightMouseClick = true;
      this.rules = 'desktop';//桌面下右键弹出层 desktop 应用下右键弹出层 app  设置|| 我的电脑等下弹出层 protogenesis 回收站下弹出层 recycle
      this.position = Object.assign({
        mainHeight: this.$refs.main.$el.clientHeight,
        mainWidth: this.$refs.main.$el.clientWidth,
        left: e.clientX,
        top: e.clientY
      });
    },
    hideRightMenus(){
      this.isRightMouseClick = false;
    },
    closeMenus( params){
      this.isRightMouseClick = !params;
    }
  },
  watch:{
   
  },
  mounted(){
    
  }
};
</script>
<style lang="less">
html,
body,
#app,
.el-container {
  padding: 0px;
  margin: 0px;
  height: 100%;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  background: transparent;
  padding: 0 !important;
  & .desktop{
    height: 100%;
    width: 100%;
  }
}
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  height: 40px !important;
  line-height: 40px;
  background: transparent;
}
</style>

