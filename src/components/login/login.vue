<template>
    <div class="formBox">
        <el-dropdown class="rightTopIcon"  @command="handleCommand">
            <el-button size="mini" type="primary" plain>
                <img src="@/assets/image/loginStyle.png" style="width: 17px;vertical-align: sub;"> 登录方式
            </el-button>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-lock" command="pwd" style="font-size:12px;">密码登录</el-dropdown-item>
                <el-dropdown-item icon="el-icon-mobile-phone" command="phone" style="font-size:12px;">手机登录</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <div>
            <img src="@/assets/image/clound.png" class="imgIcon">
            <span class="imgFont" style="color:#409EFF">挚友IClound</span>
        </div>
        <el-form ref="pwdform"  size="medium" v-if="isPwd">
            <el-form-item label="">
                <el-input  prefix-icon="el-icon-user"  v-model="userName" clearable>
                    <template slot="prepend">用户</template>  
                </el-input>
            </el-form-item>
            <el-form-item label="">
                <el-input prefix-icon="el-icon-lock" v-model="pwd">
                    <template slot="prepend">密码</template>  
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button  type="primary">登录</el-button>
                <el-button type="success">取消</el-button>
            </el-form-item>
        </el-form>
        <el-form ref="phoneform"  size="medium" v-else>
             <el-form-item label="">
                <el-input  prefix-icon="el-icon-mobile-phone"  v-model="userPhone" clearable>
                    <template slot="prepend">手机号</template>  
                </el-input>
            </el-form-item>
            <el-form-item label="">
                <el-input prefix-icon="el-icon-lock" v-model="pwd">
                    <template slot="prepend">验证码</template>
                    <el-button slot="append" >发送验证码</el-button>  
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button  type="primary">登录</el-button>
                <el-button type="success">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    name: 'login',
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
        handleCommand(command){
            this.isPwd = command == 'pwd'?true:false;
        }
    }
}
</script>
<style lang="less">
    @baseColor: #c4bfc2;
    .formBox {
        width: 500px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        border: 1px solid @baseColor;
        padding: 50px;
        border-radius: 5px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
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
        top: 40px;
        font-size: 12px;
        color: #409EFF;
    }

</style>
