<template>
  <el-container :style="bg">
    <el-main ref="main">
      <div @contextmenu.prevent.stop="rightMouse($event)" @click="hideRightMenus" class="desktop">
        <rightMenus v-if="isRightMouseClick" :rules="rules" :position="position" @closeMenus="closeMenus"></rightMenus>
      </div>
      <system @closeItem="closeItem" @minSize="minSize" v-if="isShowBox.system.show" :index="index" v-show="isShowBox.system.display"></system>
      <myCloud v-if='isShowBox.myCloud.show' @closeItem="closeItem" @minSize="minSize" v-show="isShowBox.myCloud.display"></myCloud>
    </el-main>
    <el-footer :class="footerClass" :style="groundGlass" ref="footer">
      <bottomBar :tabs="isShowBox" @open="openChild" @closeTab="closeChild" @showTab="showChild" @barChangePosition="barChangePosition"></bottomBar>
    </el-footer>
  </el-container>
</template>

<script>
import bg from "@/assets/image/bg/window10.jpg";
import bottomBar from "@/components/bottomBar/bottomBar.vue";
import rightMenus from "@/views/rightMouse";
import system from "@/components/system/system";
import myCloud from "@/components/leftMenus/myCloud";
export default {
  name: "home",
  components: {
    bottomBar,
    rightMenus,
    system,
    myCloud
  },
  data() {
    return {
      groundGlass: {
        background: `hsla(0,0%,100%,.25) border-box`,
        overflow: `hidden`,
        boxShadow: `0 0 0 1px hsla(0,0%,100%,.3) inset,0 .5em 1em rgba(0,0,0,0.6)`,
        textShadow: `0 1px 1px hsla(0,0%,100%,.3)`,
        color: `#fff`,
        width:`100%`,
      },
      isRightMouseClick:false,
      rules:'',//右键菜单规则
      position:{
        left: '',  //鼠标点击的位置
        right: '',
        mainHeight: '',  //主页面的宽高
        mainWidth: '',
      },
      isShowBox:{
        system: { show:false,name:'系统设置',display:false },
        myCloud: { show:false,name:'我的云端',display:false },
      },
      index:'theme',
      footerClass: 'bottom',  // 底部类名
    };
  },
  computed:{
    bg() {
      let store = this.$store.state.desktopImg;
      // console.log(store)
      if(store === '') {
        return {background: `url(${bg}) center center no-repeat`}
      } else {
        return {background: `url(${store}) 0% 0% /cover no-repeat`}
      }
    }
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
    closeMenus( params ){
      this.isRightMouseClick = false;//关闭右键菜单
      if( params.index){
        this.isShowBox[params.path].show = true;//开启系统设置
        this.isShowBox[params.path].display = true;//最小化状态下为隐藏，还原显示
        this.index = params.index;//选中系统设置具体项
      }
    },
    closeItem( param ){//右上角工具栏关闭弹出层组件
      this.isShowBox[param].show = false;
      this.isShowBox[param].display = false;
    },
    minSize( param ){
      this.isShowBox[param].display = false;
    },
    openChild( payload ){//左下侧菜单点击打开具体某一项
      this.isShowBox[payload].show = !this.isShowBox[payload].show;
      this.isShowBox[payload].display = !this.isShowBox[payload].display;
    },
    closeChild( tab ){//关闭tab项
      this.isShowBox[tab].show = false;
      this.isShowBox[tab].display = false;
    },
    showChild( tab,type ){
      if( type ){//如果是历史固定的任务栏应先加载注册组件
        this.isShowBox[tab].show = true;
      }
      this.isShowBox[tab].display = !this.isShowBox[tab].display;
    },
    barChangePosition( position ) {
      console.log(position)
      let active = {
        top: () => {
          console.log(this.$refs.footer);
          this.footerClass = 'top';
        },
        bottom: () => {
          this.footerClass = 'bottom';
        },
        left: () => {
          this.footerClass = 'left';
        },
        right: () => {
          this.footerClass = 'right';
        }
      };
      active[position]();
    }
  },
  watch:{
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
  background-size: cover;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  background: transparent;
  height: 100%;
  width: 100%;
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
  position: absolute;
  width: 100%;
}
.el-footer.bottom{
  bottom: 0;
  left:0;
}
.el-footer.top{
  top: 0;
  left: 0;
}
.el-footer.left{
  transform: rotate(90deg);
  left: -49%;
}
.el-footer.right{
  transform: rotate(90deg);
  right: -49%;
}
</style>

