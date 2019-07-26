<template>
    <el-row class="fadeInLeftBig animated">
        <el-col :span="4">
            <el-menu :collapse="isCollapse" background-color="transparent">
                <el-menu-item>
                    <i class="el-icon-s-operation"></i>
                    <span slot="title">开始</span>
                </el-menu-item>
                <el-menu-item>
                    <i class="el-icon-eleme"></i>
                    <span slot="title">我的桌面</span>
                </el-menu-item>
                <el-menu-item>
                    <i class="el-icon-cloudy"></i>
                    <span slot="title">我的云端</span>
                </el-menu-item>
                <el-menu-item>
                    <i class="el-icon-share"></i>
                    <span slot="title">共享云端</span>
                </el-menu-item>
                <el-menu-item>
                    <i class="el-icon-user-solid"></i>
                    <span slot="title">我的设置</span>
                </el-menu-item>
                <el-menu-item>
                    <i class="el-icon-switch-button"></i>
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
        height: 100px;
        margin: 7px;
        width: 100px;
        line-height: 100px;
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
        height: 400px;
        background: transparent;
    }
    .el-menu-item i {
        color:#fff;
    }
    .el-menu--collapse li:nth-child(2){
        margin-top:150px;
    }
</style>
