<template>
    <el-row>
        <el-col :span="1">
            <div class="grid-content1">
                <el-tooltip class="item" effect="light" content="设置中心" placement="top-start">
                    <el-image :src="url" fit="cover"></el-image>
                </el-tooltip>
            </div>
        </el-col>
        <el-col :span='4'>
            <div class="grid-content2">
                <el-tooltip class="item" effect="light" content="请输入搜索关键词" placement="top-start">
                   <el-input placeholder="搜索">
                      <i slot="suffix" class="el-input__icon el-icon-search" style="cursor:pointer"></i> 
                   </el-input>
                </el-tooltip>
            </div>    
        </el-col>  
        <el-col :span='15'>
            <div class="grid-content3">
                3
            </div>    
        </el-col>  
        <el-col :span='3'>
            <div class="grid-content4">
                4
            </div>    
        </el-col> 
        <el-col :span='1'>
            <div class="grid-content5">
                5
            </div>    
        </el-col>
    </el-row> 
</template>
<script>
export default {
    name:'bottomBar',
    data(){
        return {
            url:require('@/assets/image/icons/icon_cloudAdmin.png'),
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
        }
    }
</style>
