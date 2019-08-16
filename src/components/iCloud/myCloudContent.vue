<!-- 我的云端：内容 -->
<template>
  <div class='myCloudContent'>
      <div class="cards flipInX animated" :class="displayName==='行展示'?'row':'col'">
          <el-card v-for="(c,index) in dataList" :class="c.active?'addBorder':''" :key="index" shadow="hover">
              <div @click="activeCard(c, dataList)" @dblclick.stop="openFolder" :title="c.name">
                <img :src="c.imgurl" :style="displayName==='行展示'&&size"/>
                <div class="bottom">{{c.name}}</div>
                <img :src="c.icon" class="fileIcon">
              </div>
          </el-card>
      </div>
  </div>
</template>

<script>
import { myCloudUtilMixin } from '@/assets/js/myCloudUtilMixins.js';
export default {
  extends: myCloudUtilMixin,
  data () {
    return {
      dataList: [
        {name:'文件夹1',imgurl:require('@/assets/image/icons/deskIcons/tree-disk3.png'),active:false},
        {name:'文件夹2',imgurl:require('@/assets/image/icons/deskIcons/tree-folder.png'),active:false},
      ],
    };
  },
  methods: {}
}

</script>
<style lang='less' scoped>
@import '../../assets/css/myCloud.less';
</style>