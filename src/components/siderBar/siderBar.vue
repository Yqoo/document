<!--
 * @Date: 2019-07-25 15:53:39
 * @LastEditors: OBKoro1
 * @LastEditTime: 2019-08-09 09:08:18
 -->
<template>
    <el-row class="fadeInLeftBig animated">
        <el-col :span="4">
            <el-menu :collapse="isCollapse" background-color="transparent" router >
                <el-menu-item class="hvr-wobble-horizontal" @click="expanded">
                    <i class="el-icon-s-operation" style="color:#fff"></i>
                    <span slot="title">开始</span>
                </el-menu-item>
                <el-menu-item @click="openChild('hidden')" class="hvr-wobble-horizontal">
                    <img :src="require('@/assets/image/icons/deskIcons/icon-desktop.png')">
                    <span slot="title">我的桌面</span>
                </el-menu-item>
                <el-menu-item class="hvr-wobble-horizontal">
                    <img :src="require('@/assets/image/icons/deskIcons/icon-user.png')">
                    <span slot="title">我的账户</span>
                </el-menu-item>
                <el-menu-item @click="openChild('myCloud')" class="hvr-wobble-horizontal">
                    <img :src="require('@/assets/image/icons/deskIcons/icon-cloud.png')">
                    <span slot="title">我的云端</span>
                </el-menu-item>
                <el-menu-item class="hvr-wobble-horizontal">
                    <i class="el-icon-share" style="color:#fff"></i>
                    <span slot="title">共享云端</span>
                </el-menu-item>
                <el-menu-item @click="openChild('system')" class="hvr-wobble-horizontal">
                    <i class="el-icon-setting" style="color:#fff"></i>
                    <span slot="title">我的设置</span>  
                </el-menu-item>
                <el-menu-item class="hvr-wobble-horizontal">
                    <i class="el-icon-switch-button" style="color:#fff"></i>
                    <span slot="title">退出云端</span>
                </el-menu-item>
            </el-menu>
        </el-col>
        <el-col :span="6">2</el-col>
        <el-col :span="14">
            <div class="container">
            <div class="card">
                <div class="tile">1</div>
                <div class="tile">2</div>
                <div class="tile">3</div>
                <div class="tile">4</div>
                <div class="tile">5</div>
                <div class="tile">6</div>
                <div class="tile">7</div>
                <div class="tile">8</div>
                <div class="tile">9</div>
            </div>
            </div>
        </el-col>
    </el-row>
</template>
<script>
export default {
    name: 'siderBar',
    data(){
        return {
           isCollapse:true,
        }
    },
    methods:{
        openChild( p ){
            this.$emit( 'openChild',p );
        },
        expanded(){
            this.isCollapse = !this.isCollapse;
        }
    },
    mounted(){
        let card = document.querySelector(".card");
        let tiles = ["red", "orange","blue", "brown", "yellow", "orange","yellow",'red',];
        card.childNodes.forEach(function (child, i) {
            if (child.style) {
                child.className += " " + tiles.shift();
                tileFlow(child, i);
            }
        });
        function tileFlow(node, time) {
            let tilesContract = setTimeout(function () {
                contract(node);
            }, time * 100);
            let tilesExpand = setTimeout(function () {
                expand(node);
            }, time * 100 + 1000);
            let repeatTileFlow = setTimeout(function () {
                tileFlow(node, time);
            }, time * 100 + 2000);
        }
        let contract = function contract(node) {
            node.className = node.className.replace(" expand", " contract");
            node.className += " contract";
        };
        let expand = function expand(node) {
            node.className = node.className.replace(" contract", " expand");
        };
    }
}
</script>
<style lang="less" scoped>
    .container {
        align-items: center;
        display: flex;
        justify-content: center;
    }
    .card {
        align-content: flex-start;
        background:transparent;
        box-shadow: 0px 0px 100px 10px rgba(0,0,0,.3);
        display: flex;
        flex-wrap: wrap;
        height: 100%;
    }
    .tile {
        height: 80px;
        margin: 7px;
        width: 80px;
        line-height: 80px;
        text-align: center;
        cursor: pointer;
        &:hover{
            border: 1px solid #eee;
            border-radius: 5px;
            box-sizing: border-box;
        }
    }
    .contract {
        box-shadow: inset 0px 0px 0px 20px rgba(0,0,0,.5);
        transition: box-shadow 1s ease;
    }
    .expand {
        box-shadow: none;
        transition: box-shadow 1s ease;
    }
    @keyframes sonar {
        80% {
            text-shadow:0px 0px #ffaa01;
        }
        100% {
            text-shadow:5px 5px black,-5px 5px black,
                -5px -5px black,5px -5px black;
        }
    }
    .el-row {
        height: 475px;
        background: transparent;
    }
    .el-menu-item:hover{
        background: transparent!important;
    }
    .el-menu-item i,.el-menu-item span {
        color:#fff;
    }
    .el-menu-item span {
        color:#fff;
        font-size: 12px;
        padding-left: 5px;
    }
    .el-menu--collapse li:nth-child(2){
        margin-top:150px;
    }
</style>
