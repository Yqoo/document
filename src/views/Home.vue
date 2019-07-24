<template>
  <el-container>
    <el-main>
      body
    </el-main>
    <el-footer>
      <bottomBar></bottomBar>
    </el-footer>
  </el-container>
</template>

<script>
// @ is an alias to /src
import bottomBar from '@/components/bottomBar/bottomBar.vue'
export default {
  name: "home",
  components:{
    bottomBar,
  }
};
</script>
<style lang="less">
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    height: 93vh;
  }
  .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    height: ~"calc(100% - 93vh)";
  }
</style>

