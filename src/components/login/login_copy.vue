<template>
    <div class="login">
        <div class="formBox">
            <div class="rightTopIcon">
                <el-button  v-if="isPwd" size="mini" plain @click="changeLoginStyle"><i class="el-icon-mobile-phone"></i> 手机登录</el-button>
                <el-button  v-else size="mini" plain @click="changeLoginStyle"><i class="el-icon-user"></i> 用户登录</el-button>
            </div>
            <div>
                <img src="@/assets/image/log_copy.png" class="imgIcon">
                <span class="imgFont" style="color:#fff;font-size:40px;padding-left:3px;">挚友ICloud</span>
            </div>
            <el-form ref="pwdform"  size="medium" v-if="isPwd" label-width="20px">
                <el-form-item label="">
                    <el-input prefix-icon="el-icon-user"  v-model="userName" clearable placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input type="password" prefix-icon="el-icon-lock" v-model="pwd" placeholder="请输入密码">
                         <i slot="suffix" class="el-input__icon el-icon-circle-check"  style="cursor:pointer" title="登录"></i>
                    </el-input>
                    <i class="el-icon-question" style="margin-top:5px;color:#fff"></i><span style="font-size:12px;color:#fff">忘记密码</span>
                </el-form-item>
            </el-form>
            <el-form ref="phoneform"  size="medium" v-else label-width="20px">
                <el-form-item label="">
                    <el-input  prefix-icon="el-icon-mobile-phone"  v-model="userPhone" clearable placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input prefix-icon="el-icon-lock" v-model="pwd" placeholder='请输入验证码'>
                        <i slot="suffix" class="el-input__icon el-icon-mobile-phone" title="发送验证码" style="cursor:pointer"></i>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button  type="primary" style="width:100%">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
        <canvas id="c"></canvas>
    </div>
</template>
<script>
import "@/assets/js/canvas.js";
export default {
    name: 'login_copy',
    data(){
        return {
            userName:'',
            pwd:'',
            userPhone:'',
            code:'',
            isPwd: true,
        }
    },
    methods:{
        changeLoginStyle(){
            this.isPwd = !this.isPwd;
        }
    },
    mounted(){
        
    }
}
</script>
<style lang="less">
    @baseColor: #c4bfc2;
    .login{
        height: 100vh;
        background: #000;
    }
    .formBox {
        z-index: 99999;
        width: 500px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
       /*  border: 1px solid @baseColor; */
        padding: 50px;
        /* border-radius: 5px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); */
    }
    .formBox>div:first-child {
        margin-bottom: 30px;
    }
    .imgIcon {
        vertical-align: middle;
    }
    .imgFont {
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
        font-size: 20px;
    }
    .rightTopIcon {
        position: absolute;
        right: 53px;
        top: 90px;;
        font-size: 12px;
        color: #409EFF;
    }
    .el-input__inner{
        border-radius: 30px;
        background: #000!important;
        color:#fff
    }
    .el-button {
        background: #000;
        color: #fff;
        border-color: #fff;
    }
    .el-button:hover{
        background-color: #000!important;
        border-color: #fff!important;  
        color:#fff!important;
    }
    .el-button:focus{
        background-color: #000!important;
        border-color: #fff!important; 
        color:#fff!important; 
    }
</style>
