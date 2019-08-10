<!-- 我的云端：组织云端 -->
<template>
  <div class='organizationCloud'>
      <el-collapse v-model="activeNames">
        <el-collapse-item  name='1' :disabled='true'>
            <template slot="title">
                <img src='@/assets/image/icons/deskIcons/tree-org.png'/>组织云端
            </template>
            <div class="cards slideInUp animated">
                <el-card v-for="(c,index) in organizationCloud" :key="index" shadow="hover" class="hvr-forward">
                    <i :class="c.imgurl"></i>
                    <div class="bottom1">{{c.name}}</div>
                </el-card>
            </div>
        </el-collapse-item>
      </el-collapse>
  </div>
</template>

<script>
export default {
  data () {
    return {
        activeNames: ['1'],
        organizationCloud:[
            {name:'挚友',imgurl:'el-icon-office-building'}
      ],
    };
  },
  methods: {
  }
}

</script>
<style lang='less' scoped>
@import '../../assets/css/myCloud.less';
</style>