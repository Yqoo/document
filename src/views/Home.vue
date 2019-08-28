<!--
 * @Date: 2019-07-23 17:42:48
 * @LastEditors: Yqoo
 * @LastEditTime: 2019-08-23 09:02:43
 -->
<template>
  <el-container :style="bg" class="container">
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
      <vue-drawer-layout v-if="defaultApps!=[]"  ref="drawerLayout" :drawer-width="400" :reverse="true" :enable="isMoveDrawer" :backdrop="false">       
        <div slot="content" @contextmenu.prevent.stop="rightMouse($event)" @click="hideRightMenus" class="desktop">
          <div class="appList">
            <div class="defaultApp">
              <!-- 
                auto-size: 表示容器高度是否应增大并收缩以适应内容
                col-num：网格有多少列
                row-height：单个行的高度（像素）
                is-draggable： 表示网格是否可以拖动
                is-resizable：表示网格的项是否可以调整大小
                vertical-compact：布局为垂直布局
                use-css-transforms： 表示是否应使用 CSS transition-property: transform,否则是postion定位
               -->
              <grid-layout
                :layout.sync="defaultApps"
                :auto-size="false"
                :col-num="colNumber"
                :row-height='rowHeight'   
                :is-draggable="true"
                :is-resizable="true"
                :vertical-compact="true"
                :use-css-transforms="true" 
                @layout-updated="layoutUpdatedEvent"
              >
                <grid-item v-for="item in defaultApps"
                  ref="gridItem"
                  :key="item.i"
                  :i='item.i'
                  :x='item.x'
                  :y='item.y'
                  :w='item.w'
                  :h='item.h'
                  @moved="movedEvent"
                >
                <div @click="clickIcon($event,item)" @contextmenu.prevent.stop="rightMouse($event, item)" @dblclick="applicationHandle(item.title)" :title="item.name">
                  <img :src="item.img!=null&&require(`@/assets/image/icons/${item.img}`)" :alt="item.title" :style="iconStyle">
                  <p>{{item.name}}</p>
                </div>
                </grid-item>
              </grid-layout>
            </div>
          </div>
          <div v-if='newFile.show' class="newFileBox" :style="newFile.position">
            <img :src="newFile.icon"/>
            <el-input v-model="newFile.name" size='mini' autofocus @blur="createNewfile"></el-input>
          </div>
          <rightMenus v-if="isRightMouseClick" :rules="rules" :position="position" @closeMenus="closeMenus" @rightMouseClick="rightMouseClick"></rightMenus>
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
      <system 
        @closeItem="closeItem" 
        @minSize="minSize" 
        v-if="isShowBox.system.show" 
        :index="index" 
        v-show="isShowBox.system.display" 
        @applications="applications"></system>
      <myCloud 
        v-if='isShowBox.myCloud.show' 
        @closeItem="closeItem" 
        @minSize="minSize" 
        v-show="isShowBox.myCloud.display"></myCloud>
      <recycle 
        v-if='isShowBox.recycle.show' 
        @closeItem="closeItem" 
        @minSize="minSize" 
        v-show="isShowBox.recycle.display"></recycle>
      <browser 
        v-if='isShowBox.browser.show' 
        @closeItem="closeItem" 
        @minSize="minSize" 
        v-show="isShowBox.browser.display"></browser>
      <news 
        v-if='isShowBox.news.show' 
        @closeItem="closeItem"
        @minSize="minSize" 
        v-show="isShowBox.news.display"></news>
      <systemProperties 
        v-if='isShowBox.systemProperties.show' 
        @closeItem="closeItem" 
        @minSize="minSize" 
        v-show="isShowBox.systemProperties.display"></systemProperties>
      <iCloudConsole 
        v-if='isShowBox.iCloudConsole.show' 
        @closeItem="closeItem" 
        @minSize="minSize" 
        v-show="isShowBox.iCloudConsole.display"></iCloudConsole>
      <organization 
        v-if='isShowBox.organization.show' 
        @closeItem="closeItem" 
        @minSize="minSize" 
        v-show="isShowBox.organization.display"></organization>
      <account 
        v-if='isShowBox.account.show' 
        @closeItem="closeItem" 
        @minSize="minSize" 
        v-show="isShowBox.account.display"></account>
      <taskManager 
        v-if='isShowBox.taskManager.show' 
        @closeItem="closeItem" 
        @minSize="minSize" 
        v-show="isShowBox.taskManager.display" 
        :isShowBox="isShowBox" 
        @showTab="showChild"
        @closeTab="closeChild"
        @start="openChild"></taskManager>
      <domainConsole 
        v-if='isShowBox.domainConsole.show' 
        @closeItem="closeItem" 
        @minSize="minSize" 
        v-show="isShowBox.domainConsole.display"></domainConsole>
      <note 
        v-if='isShowBox.note.show' 
        @closeItem="closeItem" 
        @minSize="minSize" 
        v-show="isShowBox.note.display"></note>
    </el-main>
    <el-footer :class="footerClass" :style="groundGlass">
      <bottomBar 
        :tabs="isShowBox" 
        @open="openChild" 
        @closeTab="closeChild"
        @showTab="showChild" 
        @barChangePosition="barChangePosition" 
        @lockScreen="lockScreen"></bottomBar>
    </el-footer>
    <!-- 上传组件 -->
    <el-upload
      ref='upload'
      class="deskUpload"
      v-show="uploadShow"
      drag
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-success='uploadSuccess'
      :on-error="uploadErr"
      :auto-upload="true"
      :show-file-list="false"
      multiple>
    </el-upload>
    <!-- 图标翻页 -->
    <div v-if="pageNumber > 1" class="pageBtn clearfix">
      <el-button type="info" icon="el-icon-caret-top" class="hvr-bob" @click="pageTurning('prev')" circle title="上一页"></el-button>
      <el-button type="info" icon="el-icon-caret-bottom" class='hvr-hang' @click="pageTurning('next')" circle title="下一页"></el-button>
    </div>
    <createShare v-if="showShare" :show='showShare' :info='clickItem' @closeDialog="closeDialog"></createShare>
    <createEnjoy v-if="showEnjoy" :show="showEnjoy" :info='clickItem' @closeDialog="closeDialog"></createEnjoy>
  </el-container>
</template>

<script>
import bg from "@/assets/image/bg/window10.jpg";
import bottomBar from "@/components/bottomBar/bottomBar.vue";
import rightMenus from "@/views/rightMouse";
import system from "@/components/system/system";
import myCloud from "@/components/iCloud/myCloud";
import recycle from "@/components/recycle/recycle";
import browser from "@/views/browser";
import news from "@/views/news";
import systemProperties from "@/components/systemProperties/systemProperties";
import iCloudConsole from "@/components/supervisorConsole/iCloudConsole.vue";
import organization from "@/components/organization/organization";
import account from "@/components/account/account.vue";
import taskManager from "@/components/taskManager/taskManager.vue";
import domainConsole from "@/components/domainConsole/domainConsole.vue";
import note from "@/components/note/note.vue";
import tools from  "@/assets/js/utils/tools.js";
import createEnjoy from '@/components/share/createEnjoy.vue'; //创建共享
import createShare from '@/components/share/createShare.vue'; //创建分享
import { GridLayout, GridItem } from 'vue-grid-layout';
import qs from 'qs';
export default {
  name: "home",
  components: {
    bottomBar,
    rightMenus,
    system,
    myCloud,
    recycle,
    GridLayout,
    GridItem,
    browser,
    news,
    systemProperties,
    iCloudConsole,
    organization,
    account,
    taskManager,
    domainConsole,
    note,
    createEnjoy,
    createShare
  },
  data() {
    return {
      uploadShow:false,
      showShare: false, // 控制创建分享弹框显示隐藏
      showEnjoy:false,  //  控制创建共享弹框显示隐藏
      clickItem:{}, //桌面点中的图标数据
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
        system: { show:false,name:'系统设置',sign:'system',display:false,icon:require('@/assets/image/icons/deskIcons/icon-system.png') },
        myCloud: { show:false,name:'我的云端',sign:'myCloud',display:false,icon:require('@/assets/image/icons/deskIcons/icon-myCloud.png') },
        recycle: { show:false,name:'回收站',sign:'recycle',display:false,icon:require('../assets/image/icons/deskIcons/icon-recycle.png') },
        browser: { show:false,name:'浏览器',sign:'browser',display:false,icon:require('../assets/image/icons/deskIcons/icon-browser.png') },
        news: { show:false,name:'新闻',sign:'news',display:false,icon:require('../assets/image/icons/deskIcons/icon-news.png') },
        systemProperties: { show:false,name:'系统属性',sign:'systemProperties',display:false,icon:require('../assets/image/icons/deskIcons/icon-systemProperties.png') },
        iCloudConsole: { show:false,name:'iCloud控制台',sign:'iCloudConsole',display:false,icon:require('../assets/image/icons/deskIcons/icon-ad.png') },
        organization: { show:false,name:'组织与用户',sign:'organization',display:false,icon:require('../assets/image/icons/deskIcons/icon-organization.png') },
        account: { show:false,name:'我的账户',sign:'account',display:false,icon:require('../assets/image/icons/deskIcons/icon-account.png') },
        taskManager: { show:false,name:'任务管理器',sign:'taskManager',display:false,icon:require('../assets/image/icons/deskIcons/icon-taskManager.png') },
        domainConsole: { show:false,name:'域名服务管理控制台',sign:'domainConsole',display:false,icon:require('../assets/image/icons/deskIcons/icon-domainConsole.png') },
        note: { show:false,name:'手机短信管理控制台',sign:'note',display:false,icon:require('../assets/image/icons/deskIcons/icon-note.png') },
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
      gridItemDatas:[], //桌面图标的所有数据（过滤前总数据）
      defaultApps:[], // 桌面默认展示的list（过滤后）
      rowHeight: 80,  //图标的高度
      newFile:{ //新建文件夹、新建文件盒子
        show:false,
        position: {top: 0, left: 0},
        icon: '',
        name: ''
      },
      pageNumber: 1, //桌面图标总页数
      pageIndex:1, //桌面图标点击的页数
      clientWidth: '', //屏幕的宽度
      clientHeight: '', //屏幕的高度
      row: 0,  //桌面图标的行数
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
    iconStyle() { // 图标的宽度
      let iconSize = this.$store.state.iconSize;
      let size = iconSize === 'small' ? '30%':(iconSize === 'normal'?'50%':'80%');
      return {width: size};
    },
    userSettingImg(){//获取缓存中的定义的锁屏壁纸
      return this.$store.state.lockImg
    },
    colNumber() { // 图标展示的列数
      return Math.floor( this.clientWidth / this.rowHeight );
    },
    gridItems(){  // 桌面图标：根据页数，确定每页的图标（数组）
      let gridItemsList = {};
      for(let i=1; i<=this.pageNumber; i++){
        var list = 'list'+i;
        gridItemsList[list] = this.gridItemDatas.filter((e)=>{
          return e.pagerNumber === i;
        });
      }
      return gridItemsList;
    },
    existingIcons:{ // 桌面已有图标
      // get: ()=>{},
      // return this.gridItemDatas.filter((e) => {
      //   return e.name != null;
      // });
    },
  },
  methods: {
    rightMouse( e, item ) {  //桌面图标右键
      this.isRightMouseClick = true;
      //右键事件
      if(item){
        let type = item.type;
        this.clickItem = item;
        //桌面下右键弹出层 desktop 应用下右键弹出层 app  设置|| 我的电脑等下弹出层 recycle 回收站下弹出层 recycle
        switch ( type ) {
          case '1':
            this.rules = 'app';//应用
            break;
          case 'iCloud':
            this.rules = 'iCloud';//我的云端
            break;
          case 'recycle':
            this.rules = 'recycle';//回收站
            break;
          case 'system':
            this.rules = 'system'; //系统设置
            break;
          case 'file':
            this.rules = 'file'; //文件
            break;
          case 'folder':
            this.rules = 'folder'; //文件夹
            break;
          case 'zip':
            this.rules = 'zip'; //压缩文件
            break;
          default:
            this.rules = 'desktop';//桌面
            break;
        }
      } else{
        this.rules = 'desktop';
      }
      this.position = Object.assign({
        mainHeight: this.$refs.main.$el.clientHeight,
        mainWidth: this.$refs.main.$el.clientWidth,
        left: e.clientX,
        top: e.clientY
      });
    },
    clickIcon(e, item) {  //桌面图标左键
      //
    },
    rightMouseClick({ name }){//非desktop下右键菜单点击回调
      this.isShowBox[name].show = true;
      this.isShowBox[name].display = true;
    },
    hideRightMenus(){
      this.isRightMouseClick = false;
      this.clickItem = {};
    },
    closeMenus( params ){
      this.isRightMouseClick = false;//关闭右键菜单
      if( params.index){
        this.isShowBox[params.path].show = true;//开启系统设置
        this.isShowBox[params.path].display = true;//最小化状态下为隐藏，还原显示
        this.index = params.index;//选中系统设置具体项
      }
      //新建文件夹、新建文件
      if( params.new ){
        let gridWidth = this.$refs.gridItem[0].$el.clientWidth + 'px';
        let p = this.position;
        Object.assign(this.newFile, {
          show: true,
          position: {top: p.top+'px',  left: p.left+'px', width: gridWidth},
          icon: require('@/assets/image/icons/deskIcons/'+params.icon),
          name: params.name
        });
      }
      //上传
      if(params.name === 'upload'){
        this.uploadShow = true;
        document.querySelector('.deskUpload').querySelector('.el-upload').click();
      }
      //创建分享
      if(params.name === 'share'){
        this.showShare = true;
      }
      //创建共享
      if(params.name === 'enjoy'){
        this.showEnjoy = true;
      }
    },
    createNewfile( ){ // 新建文件夹（新建文件）：失去焦点时创建
      let p = this.newFile.position;
      let x = (p.left.slice(0,p.left.length-2)*1 / p.width.slice(0, p.width.length-2)*1).toFixed(0);
      let y = (p.top.slice(0,p.top.length-2)*1 / 80).toFixed(0);
      Object.assign(this.newFile, {
        show: false,
        position: {top:0,left:0,width:0},
        icon: '',
        name:''
      });
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
      this.isShowBox[title].show = true;
      this.isShowBox[title].display = true;
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
    movedEvent(i, newX, newY, e) {  // 移动图标成功
      // console.log(i, newX, newY, e)
    },
    layoutUpdatedEvent( newLayout ){  // 移动成功后获取新的图标信息，更新图标位置
      let URLSearchParams = require('url-search-params');//URLSearchParams的兼容性
      let layout = newLayout.filter((e) => {
        return e.name != null
      });
      this.existingIcons = layout;
      let params = new URLSearchParams();
      params.append('layouts', JSON.stringify(layout));
      params.set('clientWidth',this.clientWidth);
      params.set('clientHeight',this.clientHeight);
      params.set('row',this.row);
      params.set('col',this.colNumber);
      this.axios.post('/userDesktop/updateUserDesktop',params);
    },
    applications({component,open}){//system组件下的程序应用下的menus菜单的操作集合
      this.isShowBox[component].show = open;
      this.isShowBox[component].display = open;
    },
    uploadSuccess(res, file, fileList){ //拖拽、右键点击上传文件成功
      console.log(fileList);
      this.$refs.upload.clearFiles();
      document.querySelector('.deskUpload').style='display:none';
    },
    uploadErr(err, file, fileList){ //拖拽、右键点击上传文件失败
      this.$message('上传失败！');
      this.$refs.upload.clearFiles();
      document.querySelector('.deskUpload').style='display:none';
    },
    closeDialog( tag ){ //关闭 创建分享，创建共享弹框
      this[tag] = false;
    },
    pageTurning( tag ){ //桌面图标翻页
      switch(tag){
        case 'prev':
          if(this.pageIndex === 1){
            this.defaultApps = this.gridItems['list1'];
            return false;
          }
          this.pageIndex--;
          this.defaultApps = this.gridItems['list'+this.pageIndex];
          break;
        case 'next':
          if(this.pageIndex === this.pageNumber){
            this.defaultApps = this.gridItems['list'+this.pageNumber];
            return false;
          }
          this.pageIndex++;
          this.defaultApps = this.gridItems['list'+this.pageIndex];
          break;
      }
    }
  },
  created(){
    // 获取桌面图标
    this.clientWidth = Math.floor(document.body.clientWidth);
    this.clientHeight = Math.floor(document.body.clientHeight);
    this.row = Math.floor((this.clientWidth - 80) / this.rowHeight);
    this.axios.get(`/userDesktop/getUserDesktop?row=${this.row}&col=${this.colNumber}&clientWidth=${this.clientWidth}&clientHeight=${this.clientHeight}`)
      .then((res)=>{
        this.gridItemDatas = res.data.obj.layout;
        this.pageNumber = res.data.obj.pagerNumber;
        this.defaultApps = this.gridItems['list1'];
      });
    // this.gridItemDatas = [ {"x":0,'y':0,'w':1,'h':1,'i':'1',pagerNumber:1,type: 'iCloud',name:'我的云端',title:'myCloud',img:'deskIcons/icon-computer.png'},
    //     {"x":0,'y':1,'w':1,'h':1,'i':'2',type: '1',pagerNumber:1,name:'浏览器',title:'browser',img:'deskIcons/icon-geogle.png'},
    //     {"x":0,'y':2,'w':1,'h':1,'i':'3',type: 'system',pagerNumber:1,name:'系统设置',title:'system',img:'deskIcons/icon-setting.png'},
    //     {"x":0,'y':4,'w':1,'h':1,'i':'5',type: '1',pagerNumber:1,name:'新闻',title:'news',img:'deskIcons/icon-news.png'},
    //     {"x":1,'y':0,'w':1,'h':1,'i':'6',type: 'recycle',pagerNumber:1,name:'回收站',title:'recycle',img:'deskIcons/icon-recycle.png'},
    //     {"x":1,'y':1,'w':1,'h':1,'i':'7',type: 'file',pagerNumber:1,name:'文件夹',title:'folder',img:'deskIcons/tree-folder.png'},
    //     {"x":1,'y':2,'w':1,'h':1,'i':'8',type: 'file',pagerNumber:1,name:'word文档',title:'file',img:'deskIcons/icon-word.png'},
    //     {"x":1,'y':3,'w':1,'h':1,'i':'9',type: 'zip',pagerNumber:2,name:'压缩文件',title:'zip',img:'deskIcons/zip.png'},
    //     {"x":1,'y':4,'w':1,'h':1,'i':'10',type: '0',pagerNumber:1,},
    //     {"x":1,'y':5,'w':1,'h':1,'i':'11',type: '0',pagerNumber:1,}];
    // this.pageNumber = 2;
    // this.defaultApps = this.gridItems['list1'];
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
  
    //====  拖拽文件到桌面  上传文件  ====
    var dropbox = document.querySelector('.container');
      dropbox.addEventListener("drop",(e)=>{
        e.preventDefault();
        this.$forceUpdate();
      },false);
      dropbox.addEventListener("dragleave",function (e) {
        e.stopPropagation();
        e.preventDefault();
      })
      dropbox.addEventListener("dragenter",function (e) {
        e.stopPropagation();
        e.preventDefault();debugger
        document.querySelector('.deskUpload').style='display:block';
      })
      dropbox.addEventListener("dragover",function (e) {
        e.stopPropagation();
        e.preventDefault();
      });
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
  padding: 0px 10px!important;
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
.vue-grid-layout{
  width: 100%;
  & .vue-grid-item{
    text-align: center;
    cursor: default;
    & img{
      display: inline-block;
    }
    & p{
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    & .vue-resizable-handle{
      display: none;
    }
  }
}
.deskUpload .el-upload{
  position: fixed;
  top: 0;
  left:0;
  width: 100%;
  height: 100%;
  display: none;
  opacity: 0;
  & .el-upload-dragger{
    width: 100%;
    height: 100%;
  }
}
.newFileBox{
  position: fixed;
  text-align: center;
  & img{
    display: inline-block;
    width: 60%;
  }
  & input{
    font-size: 12px;
    padding: 0;
    text-align: center;
  }
}
.pageBtn{
  position: fixed;
  right: 0;
  width: 40px;
  overflow: visible !important;
  right: 1%;
  bottom: 5%;
  & button{
    float: left;
    margin-left: 0px !important;
    margin-top: 10%;
    opacity: 0.6;
  }
}
</style>

