<template>
  <div class='myCloud' v-drag>
    mycloud
  </div>
</template>

<script>

export default {
    name:'myCloud',
    data() {
        return {

        };
    },
}
</script>
<style lang='less' scoped>
  .myCloud {
    height: 60%;
    width: 60%;
    border: 1px solid #ddd;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background: #fff;
  }
</style>