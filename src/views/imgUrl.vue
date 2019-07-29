<template>
  <div class=''>
    <el-input v-model="imgSrc" placeholder="请选择图片">
      <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input>
  </div>
</template>

<script>

export default {
    name: 'imgUrl',
    data() {
        return {
          imgSrc:'',
        };
    },
}
</script>
<style lang='less' scoped>

</style>