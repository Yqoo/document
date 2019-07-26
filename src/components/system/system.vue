<template>
  <div class='themeBox bounceInDown animated'>
    <div class="fadeInLeftBig animated">
      <div>系统设置</div>
    </div>
  </div>
</template>

<script>

export default {
    name: 'system',
    data() {
        return {

        };
    },
}
</script>
<style lang='less' scoped>
  .themeBox {
    height: 60%;
    width: 60%;
    border: 1px solid #ddd;
    position: absolute;
    top:20%;
    left: 20%;
    transform: translate(-50%,-50%);
    border-radius: 5px;
    box-shadow: 0px 0px 50px 10px rgba(0, 0, 0, .3);
    transition: box-shadow 0.5s, transform 0.5s;
    background-color: #ddd;
    text-align: left;
  }
</style>