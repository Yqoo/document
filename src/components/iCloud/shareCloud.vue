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
                  <el-card v-for="(c,index) in shareCloud" :class="c.active?'addBorder':''" :key="index" shadow="hover" class="hvr-sink">
                      <div @click="activeCard(c, shareCloud)">
                        <img :src="c.imgurl"/>
                        <div class="bottom1">{{c.name}}</div>
                      </div>
                  </el-card>
              </div>
          </el-collapse-item>
        </div>
      </el-collapse>
  </div>
</template>

<script>
import { myCloudMixin } from '@/assets/js/myCloudMixin.js'
export default {
  mixins: [myCloudMixin],
  data () {
    return {
        activeNames: ['1'],
        shareCloud:[
            {name:'开发部',imgurl:require('@/assets/image/icons/deskIcons/tree-disk4.png'),active:false},
            {name:'学习区',imgurl:require('@/assets/image/icons/deskIcons/tree-disk4.png'),active:false},
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