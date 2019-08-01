<template>
    <el-row>
        <el-col :span="1">
            <div class="grid-content1">
                <el-popover placement="top" width="600" trigger="click" transition="fade-in-linear" popper-class="alertLeftSideBar">
                    <siderBar  @openChild="open"></siderBar>
                    <el-image slot="reference" :src="url" fit="cover"></el-image>
                </el-popover>
            </div>
        </el-col>
        <el-col :span='4'>
            <div class="grid-content2">
                <el-tooltip class="item" effect="light" content="请输入搜索关键词" placement="top-start">
                   <el-input placeholder="搜索" v-model="searchText">
                      <i slot="suffix" @click="search" class="el-input__icon el-icon-search" style="cursor:pointer"></i> 
                   </el-input>
                </el-tooltip>
            </div>    
        </el-col>  
        <el-col :span='15'>
            <div class="grid-content3" @contextmenu.prevent.stop="taskBarMenus" ref="taskBar">
                <i class="el-icon-location-outline"></i>
                <el-tag v-for="(tab,index) in tabsFilter" :key="index" closable effect="plain" type="info" @close="closeTab(index)" @click="showTab(index)">{{tab.name}}</el-tag>
                <taskBarMenus v-if="isTaskBarClick" :position="position"></taskBarMenus>
            </div>    
        </el-col>  
        <el-col :span='3'>
            <div class="grid-content4">
                {{ localTime }}
            </div>    
        </el-col> 
        <el-col :span='1'>
            <div class="grid-content5">
                <el-popover placement="top" width="200" trigger="click" transition="fade-in-linear" popper-class="alertLeftSideBar">
                    <rightSiderBar></rightSiderBar>
                    <i slot="reference" class="el-icon-s-promotion"></i>
                </el-popover>
            </div>    
        </el-col>
    </el-row> 
</template>
<script>
import tools from  "@/assets/js/utils/tools.js";
import siderBar from "@/components/siderBar/siderBar.vue"
import rightSiderBar from "@/components/siderBar/rightSiderBar.vue";
import taskBarMenus from "@/components/bottomBar/taskBarMenus";
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
            url: require('@/assets/image/icons/icon_cloudAdmin.png'),
            searchText: '',
            localTime:'',
            isTaskBarClick:false,
            position:{},
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
            this.$emit('closeTab',tab);
        },
        showTab( tab ){
            this.$emit('showTab',tab)
        },
        taskBarMenus( e ){
            Object.assign(this.position,{
                left: e.clientX,
                top: e.clientY
            });
            this.isTaskBarClick = true;
        },
    },
    computed:{
        tabsFilter(){
            let tabs = {};
            for( let key in this.tabs ){
                if( this.tabs[key].show){
                 tabs[key] = this.tabs[key]
                }
            }
            return tabs;
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
        background:hsla(0,0%,100%,.25) border-box!important;
        overflow:hidden!important;
        box-shadow:0 0 0 1px hsla(0,0%,100%,.3) inset,0 .5em 1em rgba(0,0,0,0.6)!important;
        text-shadow:0 1px 1px hsla(0,0%,100%,.3)!important;
        color:#fff!important;
        border-color:transparent!important;
        margin-bottom: 15px!important;
    }
</style>
