<!--
 * @Date: 2019-08-09 09:31:46
 * @LastEditors: Yqoo
 * @LastEditTime: 2019-08-10 09:42:53
 * @desc: 我的云端初始进入右侧界面
 -->
<template>
  <div class='iCloudIndex'>
    <mineCloud @changeUtils='changeUtils' :isClick="isClick.mineCloud"></mineCloud>
    <shareCloud @changeUtils='changeUtils' :isClick="isClick.shareCloud"></shareCloud>
    <organizationCloud @changeUtils='changeUtils' :isClick="isClick.organizationCloud"></organizationCloud>
  </div>
</template>

<script>
import mineCloud from '@/components/iCloud/mineCloud.vue';
import organizationCloud from '@/components/iCloud/organizationCloud.vue';
import shareCloud from '@/components/iCloud/shareCloud.vue';
import { debuglog } from 'util';
export default {
  name: 'iCloudIndex',
  components: {
    mineCloud,
    organizationCloud,
    shareCloud
  },
  data() {
    return {
      isClick: {// 用于判断点击的哪一块内容(点击其他模块时，边框消失)
        mineCloud: {zhiyou: false, mine: false},
        shareCloud: false,
        organizationCloud: false,
      },  
    };
  },
  methods: {
    changeUtils( tag ) {
      Object.assign(this.isClick, {
        mineCloud: {zhiyou: false, mine: false},
        shareCloud: false,
        organizationCloud: false,
      });
      if(tag.clickTag === 'zhiyou' || tag.clickTag === 'mine'){
        this.isClick.mineCloud[tag.clickTag] = true;
      } else {
        this.isClick[tag.clickTag] = true;
      }
      this.$emit('changeUtils', tag.utilTag);
    }
  }
}
</script>
<style lang='less' scoped>
  .bottom {
    font-size: 10px;
    width: 50px;
    text-align: left;
  }
  .bottom1 {
    font-size:10px;
    text-align:center
  }
</style>
