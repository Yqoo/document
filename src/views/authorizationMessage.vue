<!--
 * @Date: 2019-08-10 11:12:36
 * @LastEditors: Yqoo
 * @LastEditTime: 2019-08-10 14:14:46
 * @Desc: 授权信息组件
 -->
<template>
  <div class='authorizationMessage'>
    这是授权信息
  </div>
</template>

<script>

export default {
  name: 'authorizationMessage',
  components: {},
  data() {
    return {

    };
  },
}
</script>
<style lang='less' scoped>
  .authorizationMessage {
    height: 550px;
    overflow-y:auto;
    overflow-x: hidden;
  }
</style>