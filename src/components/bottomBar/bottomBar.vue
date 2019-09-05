<!--
 * @Date: 2019-07-24 11:37:02
 * @LastEditors: Yqoo
 * @LastEditTime: 2019-08-30 09:14:13
 -->
<template>
    <el-row>
        <el-col :span="2">
            <div class="grid-content1">
                <el-popover placement="top" width="700" trigger="click" transition="fade-in-linear" popper-class="alertLeftSideBar">
                    <siderBar  @openChild="open"></siderBar>
                    <div slot="reference" class="imgDiv">
                        <el-image :src="require('@/assets/image/icons/deskIcons/icon-admin.png')" fit="cover"></el-image>
                    </div>
                </el-popover>
            </div>
            <span style="position: absolute;top: 0px;font-size: 12px;left: 40px;">挚友ICloud</span>
        </el-col>
        <el-col :span='1' style="text-align:left">
            <el-tooltip class="item" effect="light" content="在这里输入您要搜索的内容" placement="top-start">
                <i class="el-icon-search" style="font-size:20px;"  @click="searchDrawer = true"></i>
            </el-tooltip>
            <el-drawer
                :visible.sync="searchDrawer"
                :direction="searchDirection"
                size="25%"
                custom-class="searchDrawer"
                :show-close="false"
                :modal="false">
                <el-row>
                    <el-col :span="6">
                        <el-menu :collapse="false">
                            <el-menu-item>
                                <i class="el-icon-s-operation" style="color:#fff"></i>
                                <span slot="title">开始</span>
                            </el-menu-item>
                            <el-menu-item @click="innerDrawer = false">
                                <i class="el-icon-s-home" style="color:#fff"></i>
                                <span slot="title">主页</span>
                            </el-menu-item>
                            <el-menu-item @click="open('system')">
                                <i class="el-icon-s-tools" style="color:#fff"></i>
                                <span slot="title">设置</span>
                            </el-menu-item>
                        </el-menu>
                    </el-col>
                    <el-col :span="18">
                        <div class="searchTxt fadeInUp animated" v-show="innerDrawer">
                            <el-tabs v-model="searchType">
                                <el-tab-pane name="application">
                                    <span slot="label"><i class="el-icon-film" style="font-size:20px;"></i></span>
                                    <div class="searchTxt_title">应用</div>
                                    <div class="searchTxt_desc">
                                        <i class="el-icon-film"></i>
                                        <span>输入关键字以搜索应用</span>
                                    </div>
                                    <div class="searchTxt_list"></div>
                                    <div class="searchTxt_input">
                                        <el-input placeholder="应用：请输入内容">
                                            <i slot="prefix" class="el-input__icon el-icon-film"></i>
                                            <el-button slot="append" icon="el-icon-search"></el-button>
                                        </el-input>
                                    </div>
                                </el-tab-pane>
                                <el-tab-pane name="file">
                                    <span slot="label"><i class="el-icon-document" style="font-size:20px;"></i></span>
                                    <div class="searchTxt_title">文件</div>
                                    <div class="searchTxt_desc">
                                        <i class="el-icon-document"></i>
                                        <span>输入关键字以搜索文件</span>
                                    </div>
                                    <div class="searchTxt_list"></div>
                                    <div class="searchTxt_input">
                                        <el-input placeholder="文件：请输入内容">
                                            <i slot="prefix" class="el-input__icon el-icon-document"></i>
                                            <el-button slot="append" icon="el-icon-search"></el-button>
                                        </el-input>
                                    </div>
                                </el-tab-pane>
                                <el-tab-pane name="web">
                                    <span slot="label"><i class="el-icon-basketball" style="font-size:20px;"></i></span>
                                    <div class="searchTxt_title">网页</div>
                                    <div class="searchTxt_desc">
                                        <i class="el-icon-basketball"></i>
                                        <span>输入关键字以搜索网页</span>
                                    </div>
                                    <div class="searchTxt_list"></div>
                                    <div class="searchTxt_input">
                                        <el-input placeholder="网页：请输入内容">
                                            <i slot="prefix" class="el-input__icon el-icon-basketball"></i>
                                            <el-button slot="append" icon="el-icon-search"></el-button>
                                        </el-input>
                                    </div>
                                </el-tab-pane>
                            </el-tabs>
                        </div>
                        <div class="searchMain fadeInDown animated" v-show="!innerDrawer">
                           <div class="searchTop">
                               <img :src="require('@/assets/image/icons/deskIcons/icon-ad.png')">
                               <span>挚友iCloud</span>
                           </div>
                           <el-row class="searchMiddle">
                               <el-col :span="8" class="hvr-float" >
                                   <i class="el-icon-film" @click="searchTypeOpen('application')"></i>
                                   <p>应用</p>
                               </el-col>
                               <el-col :span="8" class="hvr-float">
                                   <i class="el-icon-document" @click="searchTypeOpen('file')"></i>
                                   <p>文件</p>
                               </el-col>
                               <el-col :span="8" class="hvr-float">
                                   <i class="el-icon-basketball" @click="searchTypeOpen('web')"></i>
                                   <p>网页</p>
                               </el-col>
                           </el-row>
                           <div class="searchBottom">
                               <div>
                                   你要挚友iCloud做些什么呢？
                               </div>
                               <el-input placeholder="在这里输入要搜索的内容" suffix-icon="el-icon-search" @focus="innerDrawer = true"></el-input>
                           </div>
                       </div>
                    </el-col>
                </el-row>
            </el-drawer>
        </el-col>  
        <el-col :span='17'>
            <div class="grid-content3" @contextmenu.prevent.stop="taskBarMenus($event)" style="position:relation">
                <span style="opacity:0">.</span>
                <el-tag v-for="(tab,index) in tabsFilter" :key="index" :class="index"  effect="plain" type="info" @close="closeTab(index)" @click="showTab(index,tab.isLocal)"> <img :src="tab.icon" style="vertical-align:middle;position:relative;top:-2px;width:23px;">{{tab.name}}</el-tag>
                <el-popover placement="top-start" width="100" trigger="click" popper-class="taskMenuPop" @hide="hideTask">
                    <taskBarMenus 
                        @close="closeTab" 
                        @showDesk="open" 
                        v-if="isShowTask" 
                        :isFix="isFix" 
                        @barChangePosition="barChangePosition" 
                        @lockScreen="lockScreen"
                        @reloadTabs='isReloadTabs'
                        ></taskBarMenus>
                    <i slot="reference" class="el-icon-location-outline taskBarPosition" style="position:absolute;opacity:0;"></i>
                </el-popover>
            </div>    
        </el-col>  
        <el-col :span='3'>
            <div class="grid-content4">
                {{ localTime }}
            </div>    
        </el-col> 
        <el-col :span='1'>
            <div class="grid-content5">
                <i class="el-icon-chat-dot-square hvr-buzz" @click="drawer = true "></i>
            </div>  
            <el-drawer :visible.sync="drawer" :direction="direction" size="400px" custom-class="rightMessageBox">
                <div slot="title">
                    <span class="myFont">信息服务</span>
                </div>
                <div class="messageBoxTitle">
                    <div>学习中心</div>
                    <div>查看更多<i class="el-icon-more"></i> </div>
                </div>
                <div class="messageBoxMain">
                    <div v-for=" (video,index) in videos" :key='index' class="slideInRight animated">
                        <p>{{ video.title }}</p>
                        <video :src="video.src" style="width:320px;height:130px;margin-top:10px;" controls="controls">
                            您的浏览器不支持播放此视频。
                        </video>
                    </div>
                </div>
                <div class="messageBoxBottom">
                    <div class="bottomHeader">
                        <div @click="isCollapse = !isCollapse" style="cursor:pointer;color:#3fc1c9">{{ collapse }}</div>
                        <div>清楚所有通知</div>
                    </div>
                    <div class="bottomBody slideInUp animated">
                        <div v-for="(b,i) in fns" :key='i' @click="clickIcons(b)">
                            <i :class="b.icon"></i>
                            <p>{{b.title}}</p>
                        </div>
                    </div>
                </div>
            </el-drawer>  
        </el-col>
        <layIM :show="showIM"></layIM>
    </el-row> 
</template>
<script>
import tools from  "@/assets/js/utils/tools.js";
import siderBar from "@/components/siderBar/siderBar.vue"
import rightSiderBar from "@/components/siderBar/rightSiderBar.vue";
import taskBarMenus from "@/components/bottomBar/taskBarMenus";
import layIM from '@/components/bottomBar/layIM.vue'
import { setTimeout } from 'timers';
export default {
    name:'bottomBar',
    components:{
        siderBar,
        rightSiderBar,
        taskBarMenus,
        layIM
    },
    props:{
        tabs:Object,
    },
    data(){
        return {
            showIM:false, //即时通讯弹框显示隐藏
            searchText: '',
            localTime:'',
            isFix:false,
            isShowTask:false,
            drawer:false,
            direction:'rtl',//抽屉出现位置
            select:'',
            searchDrawer: false,
            searchDirection:'ltr',
            innerDrawer:false,
            searchType:'web',//默认绑定显示的search tabs标签
            videos:[
                {
                    title:'如何轻松分发资料？',
                    src:require('@/assets/video/a.mp4'),
                },
                {
                    title:'如何便捷共享文件？',
                    src:require('@/assets/video/a.mp4'),
                },
                /* {
                    title:'如何编辑文件？',
                    src:require('@/assets/video/a.mp4'),
                }, */
            ],
            bottomFns:[
                {
                    icon:'el-icon-phone',
                    title:'即时通讯',
                    type:'im'
                },
                {
                    icon:'el-icon-info',
                    title:'代办通知',
                    type:'inform'
                },
                {
                    icon:'el-icon-chat-dot-round',
                    title:'消息中心',
                    type:'message'
                },
                {
                    icon:'el-icon-message',
                    title:'邮件消息',
                    type:'email'
                },
                {
                    icon:'el-icon-edit-outline',
                    title:'学习中心',
                    type:'laearn'
                },
                {
                    icon:'el-icon-service',
                    title:'我要服务',
                    type:'server'
                },
                {
                    icon:'el-icon-question',
                    title:'需求建议',
                    type:'advise'
                },
                {
                    icon:'el-icon-phone-outline',
                    title:'我要投诉',
                    type:'complain'

                },
            ],
            isCollapse:false,
            taskBarList:[],
        }
    },
    created(){
        let time = null;
        time = setInterval(() => {
            this.localTime = tools._time();
        }, 1000);
        this.axios.get('/userDesktop/getUserTaskbar').then( res => {
            if( res.data.code === 200 ){
                this.taskBarList = res.data.obj.map( item => item.functionalTypes );
            }
        })
    },
    methods:{
        searchTypeOpen( type ){//动态显示选择要搜索的tabs
            this.searchType = type;
            this.innerDrawer = true;
        },
        open( params ){
            this.$emit( 'open',params );
        },
        closeTab( tab ){//控制弹出层某一项的关闭
            if( tab ) this.$emit('closeTab',tab);
        },
        showTab( tab,type ){
            if( type ) this.$emit('showTab',tab,type);//历史固定任务栏
            else this.$emit('showTab',tab);
        },
        taskBarMenus( e ){
            let name = e.target.classList[e.target.classList.length-1];//获取点击的tabs的name
            if( name.indexOf('-') > -1 ) name = null;
            let obj = {};
            if( name ){
                let icon = require('@/assets/image/icons/deskIcons/icon-'+name+'.png');//固定到任务栏时回显的tab里的图标
                obj[name] = {show:false,name:e.target.innerText,display:true,isLocal:true,icon:icon}; 
                this.$store.commit('getTabName',obj);
            }
            
            let footerPostion = this.$store.state.footerPosition;
            let left = 0;
            if(footerPostion === 'left') {
                left = e.clientY;
            }else if(footerPostion === 'right'){
                left = document.body.clientHeight - e.clientY;
            }else{
                left = e.clientX;
            }
            document.querySelector('.taskBarPosition').style.left = left - 25 + 'px';
            this.axios.get('/userDesktop/getUserTaskbar').then( res => {
                if( res.data.code === 200 ){
                    let keys = res.data.obj.map( item => item.functionalTypes );
                    keys.indexOf( name ) !== -1 ?this.isFix = true:( name?this.isFix = false:this.isFix = null );
                }
                this.isShowTask = true;
                document.querySelector('.el-icon-location-outline').click();
            })
        },
        hideTask(){//重新渲染taskBarMenus组件 计算下一个tab点击时时显示固定到任务栏还是取消固定
            this.isShowTask = false;
        },
        lockScreen(){
            this.$emit('lockScreen');
        },
        barChangePosition( position ){  //记录底部菜单的位置
            this.$emit('barChangePosition', position);
            this.$store.commit('changeFooterPosition', position);
        },
        isReloadTabs(){//重新渲染tabs
            this.axios.get('/userDesktop/getUserTaskbar').then( res => {
                if( res.data.code === 200 ){
                    this.taskBarList = res.data.obj.map( item => item.functionalTypes );
                }
            })
        },
        clickIcons( item ){ //点击抽屉底部的按钮
            console.log(item);
            switch(item.title){
                case '即时通讯':
                    this.showIM = true;
                    break;
            }
        }
    },
    computed:{
        tabsFilter(){
            let fix = this.taskBarList;
            let tabs = {};
            for( let key in this.tabs ){
                if( this.tabs[key].show  ){
                    tabs[key] = this.tabs[key]
                }
            };
            if( Array.isArray( fix ) ){//组件加载时从后端获得的历史存储tabs
                if( fix.length === 0 ){
                    return tabs;
                } else {
                    let obj = {};
                    fix.forEach( item => {
                        obj[item] = {
                            show:false,
                            name:this.tabs[item].name,
                            display:false,
                            isLocal:true,
                            icon:this.tabs[item].icon
                        }
                    });
                    for( let key in obj ){
                        tabs[key] = obj[key]
                    }
                    return tabs
                }
            }
           
        },
        collapse(){
            let msg = ''
            this.isCollapse && ( msg  = '展开') || ( msg  = '折叠')
            return msg
        },
        fns(){
            if( this.isCollapse ) return this.bottomFns.slice(0,4);
            else return this.bottomFns;
        }
    },
}
</script>

<style lang="less">
    .el-row{
        .el-col{
            .grid-content1,.grid-content2,.grid-content3{
                text-align: left;
                .el-image{
                    cursor: pointer;
                }
            }
            .grid-content1 .el-image__inner{
                vertical-align: middle!important;
            }
            .grid-content2  .el-input__inner{
                border-radius: 0px!important;
                &:focus{
                    border-color:transparent;
                }
            }
            .grid-content4,.grid-content5{
                text-align: right;
            }
            .grid-content4{
                font-size:12px;
            }
            .grid-content5{
                cursor:pointer;
            }
            .grid-content3{
                & .el-tag{
                    margin-left:3px;
                }
            }
        }
    }
    .el-tag {
        cursor: pointer;
    }
    .alertLeftSideBar{
        background:rgba(24, 21, 21, 0.25) border-box!important;
        overflow:hidden!important;
        border: 1px solid #eee;
        box-shadow:0 0 0 1px hsla(0,0%,100%,.3) inset,0 .5em 1em rgba(0,0,0,0.6)!important;
        text-shadow:0 1px 1px hsla(0,0%,100%,.3)!important;
        color:#fff!important;
        //border-color:transparent!important;
        margin-bottom: 7px!important;
    }
    .imgDiv {
        border-radius: 50%;
        border: 2px solid #ddd;
        height: 30px;
        width: 30px;
        line-height: 30px;
        text-align: center;
        margin-top: 4px;
    }
    .input-with-select .el-input-group__prepend {
        background-color: #fff;
    }
    .el-select .el-input {
        width: 90px;
    }
    .rightMessageBox {
        background:rgba(10, 8, 8, 0.45) border-box!important;
        overflow:hidden!important;
        box-shadow:0 0 0 1px hsla(0,0%,100%,.3) inset,0 .5em 1em rgba(0,0,0,0.6)!important;
        text-shadow:0 1px 1px hsla(0,0%,100%,.3)!important;
        color:#fff!important;
        position: relative;
        & .myFont {
            font-size: 13px;
            color: #fff;
        }
        & .el-drawer__header{
            margin-bottom: 10px;
            border-bottom: 1px solid #ddd;
            padding-bottom: 10px;
            & .el-dialog__close{
                font-size: 13px;
                color:#fff;
            }
        }
        & .messageBoxTitle {
            display: flex;
            flex-flow: row wrap;
            font-size: 12px;
            color: #fff;
            justify-content: space-around;
            & div:nth-child(2){
                cursor: pointer;
            }
        }
        & .messageBoxMain {
            padding: 0px 30px;
            font-size: 12px;
            display: flex;
            flex-flow: column;
            & div {
                border: 1px solid #ddd;
                border-radius: 4px;
                margin-top: 10px;
                padding: 3px;
            }
        }
        & .messageBoxBottom{
            font-size: 12px;
            position: absolute;
            bottom: 40px;
            width: 100%;
            & .bottomHeader {
                display: flex;
                flex-flow: row wrap;
                justify-content: space-around;
            }
            & .bottomBody {
                display: flex;
                flex-flow: row wrap;
                padding: 10px 10px 0px 30px;
                & div {
                    width: 80px;
                    height: 50px;
                    margin: 3px;
                    background-color:rgba(0,0,0,0.7);
                    border-radius: 5px;
                    cursor: pointer;
                    text-align: center;
                    & i {
                        font-size: 20px;
                        padding-top: 5px;
                    }
                    & p {
                        font-size: 10px;
                    }
                }
            }
        }
    }
    .searchDrawer {
        height: 500px!important;
        background: rgba(0,0,0,0.6)!important;
        & .el-drawer__header {
            display: none!important;
        }
         & .el-menu {
            background: rgba(0,0,0,0.6)!important;
            & .el-menu-item:hover{
                background: rgb(114, 111, 111)!important
            }
            & .el-menu-item:active{
                color: #000!important
            }
            & .el-menu-item span {
                color: #fff;
                font-size: 12px;
            }
        }
    }
    .el-drawer.ltr{
        top: auto!important;
        bottom:40px!important;
    }
    .el-drawer__body .el-menu>li:nth-child(3){
        margin-top:360px;
    }
    .searchTxt {
        height: 500px;
        background:#fff;
        & .searchTxt_title{
            font-size: 12px;
            font-weight: bold;
        }
        & .searchTxt_desc {
            & i {
                font-size: 25px;
                vertical-align: middle;
                padding: 5px 10px;
            }
            & span {
                font-size: 12px;
            }
        }
        & .searchTxt_list {
            height: 350px;
            //overflow-y: scroll;
        }
        & .el-input__inner{
            border-radius: 0px;
        }
    }
    .searchMain {
        display:flex;
        flex-flow: column;
        text-align: center;
        & .searchTop {
            & img {
                width: 180px;
                margin-top: 50px;
            }
            & span {
                font-size: 35px;
                color:#409EFF;
                position: absolute;
                top: 200px;
                left: 0px;
                width: 100%;
            }
        }
        & .searchMiddle {
            margin-top: 100px;
            & .el-col  {
                padding: 5px;
                cursor: pointer;
                color: #fff;
                & i {
                    font-size: 25px;
                }
                & p {
                    font-size: 12px;
                }
            }
        }
        & .searchBottom {
            & div{
                color: #fff;
                height: 50px;
                text-align: center;
                font-size: 12px;
                line-height: 50px;
                & .el-input__inner {
                    border-radius: 0px!important;
                }
            }
            & .el-input {
                width: 90%!important;
            }
        }
    }
    .videoPlay{
        width: 320px;
    }
</style>
