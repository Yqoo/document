<template>
  <el-container :style="bg">
    <el-main ref="main">
      <vue-drawer-layout  ref="drawerLayout" :drawer-width="400" :reverse="true" :enable="isMoveDrawer" @slide-end="drawerEnd" :backdrop="false">       
        <div slot="content" @contextmenu.prevent.stop="rightMouse($event)" @click="hideRightMenus" class="desktop">
          <div class="appList">
            <div class="defaultApp">
              <div v-for="(item,index) in defaultAppStyle" :key="index" :style="item.style"  v-drag >
                <img :src="item.img" :style="iconSize" class="moveBox">
                <div>{{item.name}}</div>
              </div>
            </div>
          </div>
          <rightMenus v-if="isRightMouseClick" :rules="rules" :position="position" @closeMenus="closeMenus"></rightMenus>
        </div>
        <div class="drawer-content" slot="drawer"  style="background:#fff;height:100%">
          锁屏设置（左滑开启 右滑关闭）
        </div>
      </vue-drawer-layout>
      <system @closeItem="closeItem" @minSize="minSize" v-if="isShowBox.system.show" :index="index" v-show="isShowBox.system.display"></system>
      <myCloud v-if='isShowBox.myCloud.show' @closeItem="closeItem" @minSize="minSize" v-show="isShowBox.myCloud.display"></myCloud>
    </el-main>
    <el-footer :class="footerClass" :style="groundGlass">
      <bottomBar :tabs="isShowBox" @open="openChild" @closeTab="closeChild" @showTab="showChild" @barChangePosition="barChangePosition" @lockScreen="lockScreen"></bottomBar>
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
      isMoveDrawer:false,
      footerClass: 'bottom',  // 底部类名
      defaultAppStyle:[
        { name:'浏览器',img:require('../assets/image/icons/icon-geogle.png'),style:{height:`80px`,width:`80px`,position:`absolute`,top:`10px`,left:`10px`} },
        { name:'百度',img:require('../assets/image/icons/icon-baidu.png'),style:{height:`80px`,width:`80px`,position:`absolute`,top:`100px`,left:`10px`} },
        { name:'微信',img:require('../assets/image/icons/icon-wx.png'),style:{height:`80px`,width:`80px`,position:`absolute`,top:`190px`,left:`10px`} },
        { name:'新闻',img:require('../assets/image/icons/icon-news.png'),style:{height:`80px`,width:`80px`,position:`absolute`,top:`280px`,left:`10px`} },
      ],
    };
  },
  computed:{
    bg() {
      let store = this.$store.state.desktopImg;
      if(store === '') {
        return {background: `url(${bg}) center center no-repeat`}
      } else {
        return {background: `url(${store}) 0% 0% /cover no-repeat`}
      }
    },
    iconSize(){//读取图标大小
      let size = this.$store.state.iconSize;
      let style = {};
      switch (size) {
        case 'small':
          Object.assign( style,{ width:`30px` } );
          break;
        case 'big':
          Object.assign( style,{ width:`70px` } );
          break
        default:
          Object.assign( style,{ width:`50px` } );
          break;
      };
      return style;
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
    lockScreen(){
      this.isMoveDrawer = true;
      this.$refs.drawerLayout.toggle();
    },
    drawerEnd(){
      console.log( 'end' );
    },
    barChangePosition( position ) {
      let active = {
        top: () => {
          this.footerClass = 'top';
        },
        bottom: () => {
          this.footerClass = 'bottom';
        },
        left: () => {
          let height = document.body.offsetHeight;
          this.footerClass = 'left';
          this.groundGlass.width = height + 'px';
        },
        right: () => {
          this.footerClass = 'right';
          let height = document.body.offsetHeight;
          this.groundGlass.width = height + 'px';
        }
      };
      active[position]();
    }
  },
  mounted() {
    this.footerClass = this.$store.state.footerPosition;
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
    text-align: left;
    & .appList {
       color:#fff;
    }
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
  transform-origin: left bottom;
  left: 0;
  top: -40px;
}
.el-footer.right{
  transform: rotate(-90deg);
  transform-origin: right bottom;
  right: 0;
  top:-40px;
}
.defaultApp{
  display: flex;
  flex-flow: row wrap;
  position: relative;
  & div {
    font-size: 10px;
    text-align: center;
  }
  & img {
    cursor: pointer;
  }
}
</style>

