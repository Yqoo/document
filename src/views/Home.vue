<template>
  <el-container :style="bg">
    <el-main ref="main">
      <div class="screenImg"  :style="isOpenScreenLock">
        <img :src="userSettingImg" alt="" class="fadeInDown animated">
        <div class="lockDate_screen">
          <div>{{lock_time}}</div>
          <div>{{lock_date}}</div>
        </div>
        <div class="unlockPwd">
          <el-input show-password placeholder="默认为用户登录密码" @keyup.enter.native="unlocking" v-model="lPwd" size="small">
            <template slot="prepend"><i slot="prefix" class="el-icon-lock"></i></template>
            <el-button slot="append" icon="el-icon-right" @click="unlocking"></el-button> 
          </el-input>
          <span style="font-size:12px;color:red">{{lockTips}}</span>
        </div>
      </div>
      <vue-drawer-layout  ref="drawerLayout" :drawer-width="400" :reverse="true" :enable="isMoveDrawer" :backdrop="false">       
        <div slot="content" @contextmenu.prevent.stop="rightMouse($event)" @click="hideRightMenus" class="desktop">
          <div class="appList">
            <div class="defaultApp">
              <div v-for="(item,index) in defaultAppStyle" :key="index" :style="item.style"  v-drag class="myApp app hvr-grow" @dblclick="applicationHandle(item.title)">
                <img :src="item.img" :style="iconSize" class="moveBox app">
                <p class="app">{{item.name}}</p>
              </div>
            </div>
          </div>
          <rightMenus v-if="isRightMouseClick" :rules="rules" :position="position" @closeMenus="closeMenus"></rightMenus>
        </div>
        <div class="drawer-content lockSystem" slot="drawer">
          <span class="myFont"><i class="el-icon-view"></i> 预览</span>
          <div style="position:relative">
            <img :src="checkLockImg" alt="" style="width:400px">
            <div class="lockDate">
              <div>{{lock_time}}</div>
              <div>{{lock_date}}</div>
            </div>
          </div>
          <span class="myFont"><i class="el-icon-picture"></i> 选择图片</span>
          <div style="display:flex;flex-flow:row wrap;">
            <el-card v-for="(img,index) in defaultLockWallpaper" :key="index" shadow="hover">
              <img :src="img" alt="" style="width:150px;cursor:pointer;" @click="getShowimg(index,img)">
            </el-card>
          </div>
          <span class="myFont"><i class="el-icon-upload2"></i> 浏览</span>
          <el-upload action="#" list-type="picture-card" :auto-upload="false">
            <i slot="default" class="el-icon-plus"></i>
          </el-upload>
          <div style="border:1px solid #ddd;padding:10px;margin:20px auto;border-radius:5px;">
            <span class="myFont"><i class="el-icon-s-opportunity"></i> 是否开启锁屏</span>
            <template>
              <el-radio-group v-model="isOpenLockScreen" size="mini" style="margin-left:20px;" @change="openLockScreen">
                <el-radio-button label="true">开启</el-radio-button>
                <el-radio-button label="false">关闭</el-radio-button>
              </el-radio-group>
            </template>
            <div style="margin-top:10px;border-top:1px solid #ddd;padding-top:5px">
              <span class="myFont"><i class="el-icon-alarm-clock"></i> 锁屏时间（分）</span>
              <template >
                <el-input-number style="margin-left:10px;" size="mini"  :min="1" v-model="userSettingLockTime"></el-input-number>
              </template>
            </div>
          </div>
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
import tools from  "@/assets/js/utils/tools.js";
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
        system: { show:false,name:'系统设置',display:false,icon:require('@/assets/image/icons/deskIcons/icon-system.png') },
        myCloud: { show:false,name:'我的云端',display:false,icon:require('@/assets/image/icons/deskIcons/icon-cloud.png') },
      },
      index:'theme',
      isMoveDrawer:false,
      footerClass: 'bottom',  // 底部类名
      defaultLockWallpaper:[//默认锁屏界面壁纸
        require('@/assets/image/bg/defaultLockScreen/defaultLockScreen_1.jpg'),
        require('@/assets/image/bg/defaultLockScreen/defaultLockScreen_2.jpg'),
        require('@/assets/image/bg/defaultLockScreen/defaultLockScreen_3.jpg'),
        require('@/assets/image/bg/defaultLockScreen/defaultLockScreen_4.jpg'),
      ],
      checkLockImg:null,//默认放在预览位置的img
      lock_time:null,//预览位置上的时间显示
      lock_date:null,
      isOpenLockScreen:localStorage.getItem('lockScreen') || 'false',
      timer:null,//定时器触发锁屏
      isOpenScreenLock:{
        display:'none',
        position:'absolute',
        zIndex:'10000009',
        width:'100%',
        height:'100%',
      },
      lPwd:'',//锁屏密码
      lockTips:'',//解锁密码错误时的提醒信息
      userSettingLockTime:this.$store.state.lockTime,//锁屏时间
      defaultAppStyle:[//桌面默认展示的list
        { name:'浏览器',title:'browser',img:require('../assets/image/icons/deskIcons/icon-geogle.png'),style:{width:`80px`,position:`absolute`,top:`10px`,left:`10px`} },
        { name:'百度',title:'baidu',img:require('../assets/image/icons/deskIcons/icon-baidu.png'),style:{width:`80px`,position:`absolute`,top:`100px`,left:`10px`} },
        { name:'微信',title:'wx',img:require('../assets/image/icons/deskIcons/icon-wx.png'),style:{width:`80px`,position:`absolute`,top:`190px`,left:`10px`} },
        { name:'新闻',title:'news',img:require('../assets/image/icons/deskIcons/icon-news.png'),style:{width:`80px`,position:`absolute`,top:`280px`,left:`10px`} },
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
    },
    userSettingImg(){//获取缓存中的定义的锁屏壁纸
      return this.$store.state.lockImg
    },
  },
  methods: {
    rightMouse( e ) {
      //右键事件
      this.isRightMouseClick = true;
      let className = e.target.getAttribute('class');
      //桌面下右键弹出层 desktop 应用下右键弹出层 app  设置|| 我的电脑等下弹出层 protogenesis 回收站下弹出层 recycle
      if( className.indexOf('app') > -1){
        this.rules = 'app';
      } else if( className.indexOf('desktop') > -1 ){
        this.rules = 'desktop';
      };
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
      if( payload === 'hidden'){//我的桌面 其余弹出层组件均隐藏
        for( let key in this.isShowBox){
          this.isShowBox[key].display = false;
        }
      } else {
        this.isShowBox[payload].show = !this.isShowBox[payload].show;
        this.isShowBox[payload].display = !this.isShowBox[payload].display;
      }   
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
    barChangePosition( position ) { //改变底部菜单的位置
      let active = {
        top: () => {
          this.footerClass = 'top';
          let width = document.body.offsetWidth;
          this.groundGlass.width = width + 'px';
        },
        bottom: () => {
          this.footerClass = 'bottom';
          let width = document.body.offsetWidth;
          this.groundGlass.width = width + 'px';
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
    },
    applicationHandle( title ){//桌面应用
      let active = {
        browser: () =>  window.open("http://www.baidu.com"),
        baidu: () =>  window.open("http://www.baidu.com"),
        wx: () => window.open("https://wx.qq.com/"),
        news: () => window.open("https://www.toutiao.com/"),
      };
      active[title]();
    },
    getShowimg( index,img ){//切换锁屏壁纸
       this.checkLockImg = this.defaultLockWallpaper[index];
       localStorage.setItem('lockImg',this.checkLockImg);//缓存壁纸
       this.$store.commit('changelockImg',this.checkLockImg)
    },
    openLockScreen( val ){//是否开启锁屏
      localStorage.setItem('lockScreen',val);
      this.$store.commit('lockScreen',val);
      if( val === 'true' ){
        document.onmouseup = () => this.countTime(this.alertLockScreen,this.userSettingLockTime);//开启锁屏
      } else {
        document.onmouseup = () => clearTimeout( this.timer );//关闭锁屏 清除定时器
      }
    },
    countTime( fn,wait ) {
      if( this.timer ) clearTimeout( this.timer );
      this.timer = setTimeout(() => {
        fn()
      }, wait*60*1000);
    },
    alertLockScreen(){//弹出锁屏
      this.isOpenScreenLock.display = 'block';
    },
    unlocking(){
      if( this.lPwd === '123' ){
        this.isOpenScreenLock.display = 'none';
         this.lockTips = '';
      } else {
        this.lockTips = '密码错误，请重新输入'
      }
    },
  },
  mounted(){
    this.footerClass = this.$store.state.footerPosition;
    this.checkLockImg = this.defaultLockWallpaper[0];
    let a = tools._time();
    this.lock_date = a.split(' ')[0] + ',星期' + "一二三四五六七".charAt( new Date().getDay()-1 );
    this.lock_time = a.split(' ')[1];
    setInterval(() => {
      this.lock_time = tools._time().split(' ')[1];
    }, 1000);
    if( this.$store.state.isLockScreen === 'true') document.onmouseup = () => this.countTime(this.alertLockScreen,this.userSettingLockTime);
  },
  watch:{
    userSettingLockTime( val,oldval ){//监听锁屏时间的改变
      localStorage.setItem( 'lockTime',val );
      this.$store.commit( 'settingLockTime',val )
    }
  },
};
</script>
<style lang="less">
html,body,#app,.el-container {
  padding: 0px;
  margin: 0px;
  height: 100%;
  background-size: cover;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  //text-align: center;
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
.lockSystem {
  background:#fff;
  height:100%;
  padding: 0px 0px 0px 10px;
  overflow-y: scroll;
  overflow-x: hidden;
  & i {
    font-size: 18px;
    vertical-align: sub;
  }
}
.lockDate {
  position:absolute;
  bottom:40px;
  left:10px;
  font-size: 20px;
  font-family: cursive;
  color:#fff;
}
.lockDate_screen {
  position:absolute;
  bottom:40px;
  left:10px;
  font-size: 40px;
  font-family: cursive;
  color:#fff;
}
.myFont {
  font-size: 12px;
}
.el-upload--picture-card {
  width: 100px!important;
  height: 100px!important;
  line-height: 100px!important;
}
.el-upload-list--picture-card .el-upload-list__item{
  width: 100px!important;
  height: 100px!important;
}
.unlockPwd{
  position: absolute;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
}
.myApp{
  box-sizing: border-box;
  &:hover{
    cursor: pointer;
  }
}
</style>

