<!--系统设置： 后缀图标 -->
<template>
  <div class="suffixIcon">
      <el-col :span="2" v-for="(item, index) in iconList" :key="item.suffix" :offset="1">
          <el-card :body-style="{ padding: '2px 0 0 0',textAlign: 'center',cursor:'pointer' }">
              <img :src="item.iconImg" :alt="item.suffix">
              <div style="padding:2px;text-align:center;">
                  <span>{{item.suffix}}</span>
              </div>
          </el-card>
      </el-col>
    <el-button class="addIcon" icon="el-icon-plus" circle></el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
        iconList: [//默认文件及图标
            {iconImg:require('@/assets/image/icons/fileIcons/doc.png'), suffix: '.doc'},
            {iconImg:require('@/assets/image/icons/fileIcons/ppt.png'), suffix: '.pptx'},
            {iconImg:require('@/assets/image/icons/fileIcons/excel.png'), suffix: '.xlsx'},
        ],  
    };
  },
  methods: {}
}

</script>
<style lang='less' scoped>
.suffixIcon /deep/ .el-card{
    margin-bottom: 5px;
    & img{
        width: 32px;
        height:32px;
    }
}
.addClass{
    margin: 2% 0 0 3%;
}
</style>