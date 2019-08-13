<!-- 内存空间比例   进度条 -->
<template>
  <div class='spaceProgress clearfix'>
    <span>已用空间：</span>
    <el-progress :stroke-width="10" :percentage="percentage"></el-progress>
    <span>总空间：{{totalSpace}}G</span>
    <span>可用空间：{{avaliableSpace}}G</span>
  </div>
</template>

<script>
export default {
  props: ['avaliableSpace', 'totalSpace'],
  computed: {
    percentage() {
      return (this.avaliableSpace * 1 / this.totalSpace * 100).toFixed(0) * 1;
    }
  },
  data () {
    return {
    };
  },
  methods: {}
}

</script>
<style lang='less' scoped>
.spaceProgress{
  font-size: 12px;
  & span{
    float: left;
  }
  & span:nth-of-type(1){
    width: 15%;
  }
  & span:nth-of-type(2){
    margin-right: 2%;
    width: 20%;
  }
  & span:nth-of-type(3){
    width: 23%;
  }
  & .el-progress{
    float: left;
    width: 40%;
    top: 3px;
  }
  & /deep/ .el-progress-bar__outer, & /deep/ .el-progress-bar__inner{
    border-radius: 0;
  }
  & /deep/ .el-progress__text{
    font-size: 12px !important;
  }
}
</style>