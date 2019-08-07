<template>
    <el-row>
        <el-col :span="2">
            <div class="grid-content1">
                <el-popover placement="top" width="600" trigger="click" transition="fade-in-linear" popper-class="alertLeftSideBar">
                    <siderBar  @openChild="open"></siderBar>
                    <div slot="reference" class="imgDiv">
                        <el-image :src="require('@/assets/image/icons/deskIcons/icon-admin.png')" fit="cover"></el-image>
                    </div>
                </el-popover>
            </div>
            <span style="position: absolute;top: 0px;font-size: 12px;left: 40px;">挚友ICloud</span>
        </el-col>
        <el-col :span='4'>
            <div class="grid-content2">
                <el-input placeholder="请输入内容" v-model="searchText" class="input-with-select">
                    <el-select v-model="select" slot="prepend" placeholder="请选择">
                        <el-option label="功能" value="action">
                            <span style="float: left; font-size: 13px"><i class="el-icon-position"></i></span>
                            <span style="float: right;font-size: 13px">功能</span>
                        </el-option>
                        <el-option label='文件' value="floder">
                            <span style="float: left; font-size: 13px"><i class="el-icon-folder"></i></span>
                            <span style="float: right;font-size: 13px">文件</span>
                        </el-option>
                        <el-option label='浏览器' value="web">
                            <span style="float: left; font-size: 13px"><i class="el-icon-eleme"></i></span>
                            <span style="float: right;font-size: 13px">浏览器</span>
                        </el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </div>    
        </el-col>  
        <el-col :span='14'>
            <div class="grid-content3" @contextmenu.prevent.stop="taskBarMenus($event)" style="position:relation">
                <span style="opacity:0">.</span>
                <el-tag v-for="(tab,index) in tabsFilter" :key="index" :class="index"  effect="plain" type="info" @close="closeTab(index)" @click="showTab(index,tab.isLocal)"> <img :src="tab.icon" style="vertical-align:middle;position:relative;top:-2px;">{{tab.name}}</el-tag>
                <el-popover placement="top-start" width="100" trigger="click" popper-class="taskMenuPop" @hide="hideTask">
                    <taskBarMenus @close="closeTab" v-if="isShowTask" :isFix="isFix" @barChangePosition="barChangePosition" @lockScreen="lockScreen"></taskBarMenus>
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
            <el-drawer title='messageBox' :visible.sync="drawer" :direction="direction" size="400px"></el-drawer>  
        </el-col>
    </el-row> 
</template>
<script>
import tools from  "@/assets/js/utils/tools.js";
import siderBar from "@/components/siderBar/siderBar.vue"
import rightSiderBar from "@/components/siderBar/rightSiderBar.vue";
import taskBarMenus from "@/components/bottomBar/taskBarMenus";
import { setTimeout } from 'timers';
export default {
    name:'bottomBar',
    components:{
        siderBar,
        rightSiderBar,
        taskBarMenus
    },
    props:{
        tabs:Object,
    },
    data(){
        return {
            searchText: '',
            localTime:'',
            isFix:false,
            isShowTask:false,
            drawer:false,
            direction:'rtl',
            select:'',
        }
    },
    created(){
        let time = null;
        time = setInterval(() => {
            this.localTime = tools._time();
        }, 1000);
    },
    methods:{
        search(){
            this.$alert(this.searchText,'搜索内容',{
                confirmButtonText:'close',
                callback:action => {
                    this.$message({
                        type:'info',
                        message:action
                    })
                }
            })
        },
        open( params ){
            this.$emit( 'open',params );
        },
        closeTab( tab ){//控制弹出层某一项的关闭
            if( tab ) this.$emit('closeTab',tab);
        },
        showTab( tab,type ){
            if( type ) this.$emit('showTab',tab,type);//历史固定任务栏
            else this.$emit('showTab',tab)
            
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
            let keys = Object.keys(this.$store.state.fixTabs);
            if( keys.indexOf( name ) > -1 ){
                this.isFix = true
            } else {
                if( name ) this.isFix = false;
                else this.isFix = null;
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
            this.isShowTask = true;
            document.querySelector('.el-icon-location-outline').click();
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
        }
    },
    computed:{
        tabsFilter(){
            let fixTabs = this.$store.state.fixTabs;
            let tabs = {};
            for( let key in this.tabs ){
                if( this.tabs[key].show  ){
                    tabs[key] = this.tabs[key]
                }
            };
            if( JSON.stringify(fixTabs) === "{}"  ){
                return tabs;
            } else {
                for( let key in fixTabs ){
                    tabs[key] = fixTabs[key]
                }
                return tabs
            }
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
        border: 1px solid #fff;
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
</style>
