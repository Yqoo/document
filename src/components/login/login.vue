<template>
    <div class="formBox">
        <el-form ref="form" label-width="80px" size="medium">
            <el-form-item label="用户名">
                <el-input  prefix-icon="el-icon-user"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input prefix-icon="el-icon-lock"></el-input>
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
    name: 'login'    
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
    }
</style>
