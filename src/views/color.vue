<template>
  <div class='' >
    <el-input v-model="startColor">
      <template slot="prepend">开始颜色</template>
      <colorPicker slot="append" v-model="startColor" style="cursor:pointer"></colorPicker>
    </el-input>
    <el-input  v-model="endColor">
      <template slot="prepend">结束颜色</template>
      <colorPicker slot="append" v-model="endColor" style="cursor:pointer"></colorPicker>
    </el-input>
    <el-row>
      <el-col :span="3">
        <span>渐变角度</span>
      </el-col>
      <el-col :span="21">
        <el-slider v-model="edg" :min="min" :max="max"></el-slider>
      </el-col>
    </el-row>
    <el-button>保存</el-button>
  </div>
</template>

<script>

export default {
    name:'color',
    data() {
        return {
          startColor:'red',
          endColor:'black',
          edg:80,
          min:0,
          max:360,
        };
    },
   
}
</script>
<style lang='less'>
  @import '../style/theme.less';
  .el-input{
    padding: 10px 0px;
  }
  .el-slider {
    margin-top: -5px;
  }
</style>