<template>
  <el-container :style="bg">
    <el-main>
      body
    </el-main>
    <el-footer :style="groundGlass">
      <bottomBar></bottomBar>
    </el-footer>
  </el-container>
</template>

<script>
// @ is an alias to /src
import bg from "@/assets/image/bg/window10.jpg";
import bottomBar from '@/components/bottomBar/bottomBar.vue'
export default {
  name: "home",
  components:{
    bottomBar,
  },
  data(){
    return {
      bg:{
        background: `url(${bg}) center center no-repeat`
      },
      groundGlass:{
        background:`hsla(0,0%,100%,.25) border-box`,
        overflow:`hidden`,
        boxShadow:`0 0 0 1px hsla(0,0%,100%,.3) inset,0 .5em 1em rgba(0,0,0,0.6)`,
        textShadow:`0 1px 1px hsla(0,0%,100%,.3)`,
        color:`#fff`,
      }
    }
  }
};
</script>
<style lang="less">
  html,body,#app,.el-container{
    padding: 0px;
    margin: 0px;
    height: 100%;
    background: #000;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    background: transparent;
  }
  .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    height: 40px!important;
    line-height: 40px;
    background: transparent;
  }
</style>

