<!-- 我的云端： 共享云端 -->
<template>
  <div class='shareCloud'>
      <el-collapse v-model="activeNames">
        <div @click="clickBlock('unit')">
          <el-collapse-item  name='1' :disabled='true'>
              <template slot="title">
                  <img src='@/assets/image/icons/deskIcons/tree-share.png'/>共享云端
              </template>
              <div class="cards slideInDown animated">
                  <el-card v-for="(c,index) in shareCloud" :key="index" shadow="hover" class="hvr-sink">
                      <img :src="c.imgurl"/>
                      <div class="bottom1">{{c.name}}</div>
                  </el-card>
              </div>
          </el-collapse-item>
        </div>
      </el-collapse>
  </div>
</template>

<script>
export default {
  data () {
    return {
        activeNames: ['1'],
        shareCloud:[
            {name:'开发部',imgurl:require('@/assets/image/icons/deskIcons/tree-disk4.png')},
            {name:'学习区',imgurl:require('@/assets/image/icons/deskIcons/tree-disk4.png')},
      ],
    };
  },
  methods: {
    clickBlock(tag){
      this.$emit('changeUtils', tag);
    }
  }
}

</script>
<style lang='less' scoped>
@import '../../assets/css/myCloud.less';
</style>