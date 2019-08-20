<!--
 * @Date: 2019-08-09 09:31:46
 * @LastEditors: Yqoo
 * @LastEditTime: 2019-08-10 09:42:53
 * @desc: 我的云端初始进入右侧界面
 -->
<template>
  <div class='iCloudIndex'>
    <mineCloud @changeUtils='changeUtils' @openFolder="openFolder" :attrs="attrs" @hideRightMenu="hideRightMenu" @showRightMenu="showRightMenu"></mineCloud>
    <shareCloud @changeUtils='changeUtils' @openFolder="openFolder" :attrs="attrs" @hideRightMenu="hideRightMenu" @showRightMenu="showRightMenu"></shareCloud>
    <organizationCloud @changeUtils='changeUtils' @openFolder="openFolder" :attrs="attrs" @hideRightMenu="hideRightMenu" @showRightMenu="showRightMenu"></organizationCloud>
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
  props:['attrs'],
  data() {
    return { 
    };
  },
  methods: {
    changeUtils( tag ) {
      this.$emit('changeUtils', tag);
    },
    openFolder( name ){ // 双击文件夹
      this.$emit('openFolder', name);
    },
    hideRightMenu(){ //隐藏右键菜单
        this.$emit('hideRightMenu');
    },
    showRightMenu(e) { // 显示右键菜单
        this.$emit('showRightMenu', e);
    },
  },
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
