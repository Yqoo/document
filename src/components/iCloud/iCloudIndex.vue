<!--
 * @Date: 2019-08-09 09:31:46
 * @LastEditors: Yqoo
 * @LastEditTime: 2019-08-10 09:42:53
 * @desc: 我的云端初始进入右侧界面
 -->
<template>
  <div class='iCloudIndex'>
    <mineCloud @changeUtils='changeUtils' @openFolder="openFolder" :attrs="mineCloud"  @showRightMenu="showRightMenu"></mineCloud>
    <shareCloud @changeUtils='changeUtils' @openFolder="openFolder" :attrs="shareCloud" @showRightMenu="showRightMenu"></shareCloud>
    <organizationCloud @changeUtils='changeUtils' @openFolder="openFolder" :attrs="organizationCloud" @showRightMenu="showRightMenu"></organizationCloud>
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
  created(){
    this.mine = this.attrs.mineCloud;
    this.share = this.attrs.shareCloud;
    this.organization = this.attrs.organizationCloud;
    delete this.attrs['mineCloud'];
    delete this.attrs['shareCloud'];
    delete this.attrs['organizationCloud'];
  },
  computed:{
    mineCloud(){
      return {...this.attrs, ...this.mine}
    },
    shareCloud(){
      return {...this.attrs, ...this.share}
    },
    organizationCloud(){
      return {...this.attrs, ...this.organization}
    }
  },
  data() {
    return {
      mine: '',
      share: '',
      organization: ''
    };
  },
  methods: {
    changeUtils( tag ) {
      this.$emit('changeUtils', tag);
    },
    openFolder( name ){ // 双击文件夹
      this.$emit('openFolder', name);
    },
    showRightMenu(data) { // 显示右键菜单
        this.$emit('showRightMenu', data);
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
