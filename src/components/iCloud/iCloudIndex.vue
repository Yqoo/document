<!--
 * @Date: 2019-08-09 09:31:46
 * @LastEditors: Yqoo
 * @LastEditTime: 2019-08-10 09:42:53
 * @desc: 我的云端初始进入右侧界面
 -->
<template>
  <div class='iCloudIndex'>
    <mineCloud @changeUtils='changeUtils' @someMethods="someMethods" :attrs='attrs'></mineCloud>
    <shareCloud @changeUtils='changeUtils' @someMethods="someMethods" :attrs='attrs'></shareCloud>
    <organizationCloud @changeUtils='changeUtils' @someMethods="someMethods" :attrs='attrs'></organizationCloud>
  </div>
</template>

<script>
import mineCloud from '@/components/iCloud/mineCloud.vue';
import organizationCloud from '@/components/iCloud/organizationCloud.vue';
import shareCloud from '@/components/iCloud/shareCloud.vue';
import capacity from '@/components/iCloud/capacity.vue';
import { debuglog } from 'util';
export default {
  name: 'iCloudIndex',
  components: {
    mineCloud,
    organizationCloud,
    shareCloud,
    capacity
  },
  props:['attrs'],
  // created(){
  //   this.mine = this.attrs.mineCloud;
  //   this.share = this.attrs.shareCloud;
  //   this.organization = this.attrs.organizationCloud;
  //   delete this.attrs['mineCloud'];
  //   delete this.attrs['shareCloud'];
  //   delete this.attrs['organizationCloud'];
  // },
  computed:{
    // mineCloud(){
    //   return {...this.attrs, ...this.mine}
    // },
    // shareCloud(){
    //   return {...this.attrs, ...this.share}
    // },
    // organizationCloud(){
    //   return {...this.attrs, ...this.organization}
    // },
  },
  data() {
    return {
      mine: '',
      share: '',
      organization: '',
    };
  },
  methods: {
    changeUtils( tag ) {
      this.$emit('changeUtils', tag);
    },
    someMethods( msg ){ // 触发父组件中的方法
      this.$emit('someMethods', msg);
    }
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
