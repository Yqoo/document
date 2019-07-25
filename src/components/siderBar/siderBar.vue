<template>
    <el-row>
        <el-col :span="4">
            <el-menu :collapse="isCollapse" background-color="transparent">
                <el-menu-item>
                    <i class="el-icon-menu"></i>
                    <span slot="title">菜单</span>
                </el-menu-item>
                <el-menu-item>
                    <i class="el-icon-folder"></i>
                    <span slot="title">文件</span>
                </el-menu-item>
                <el-menu-item>
                    <i class="el-icon-s-tools"></i>
                    <span slot="title">设置</span>
                </el-menu-item>
                <el-menu-item>
                    <i class="el-icon-user-solid"></i>
                    <span slot="title">个人中心</span>
                </el-menu-item>
            </el-menu>
        </el-col>
        <el-col :span="8">2</el-col>
        <el-col :span="12">3</el-col>
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
}
</script>
<style lang="less">
    .el-row {
        height: 400px;
        background: transparent;
    }
</style>
