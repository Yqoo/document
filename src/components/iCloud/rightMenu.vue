<!-- 我的云端： 右键菜单-->
<template>
  <ul class='rightMenu' :style='position' @mouseleave="hideRightMenu">
      <li v-for="(item, index) in lists" :key="index" @click="rightMenuClick(item)">
          <img :src="item.iconImg">
          <span>{{item.iconTitle}}</span>
          <ul class="threeMenu" v-if="item.children">
            <li v-for="l in item.children" :key="l.iconTitle" @click.stop="rightMenuClick(l)">
                <img :src="l.iconImg" :alt="l.iconTitle">
                <span>{{l.iconTitle}}</span>
                <span class="tip">{{l.tip}}</span>
            </li>
        </ul>
      </li>
  </ul>
</template>

<script>
export default {
  props:['position', 'lists'],
  computed: {
  },
  data () {
    return {
        showMenu: false,
    };
  },
  methods: {
      hideRightMenu(){ //隐藏右键菜单
          this.$emit('hideRightMenu');
      },
      rightMenuClick( item ) { // 选中
          this.$emit('rightMenuClick', item);
      }
  }
}

</script>
<style lang='less' scoped>
.rightMenu{
    position: fixed;
    z-index: 100000;
    background: #fff;
    border: 1px solid #DCDFE6;
    font-size: 12px;
    width: 130px;
    & img{
        display: inline-block;
        width: 16px;
        vertical-align: middle;
        margin:0 10px 0 5px;
    }
    & li{
        position: relative;
        line-height: 30px;
        &:hover{
            background: #eee;
            cursor: default;
        }
        &:hover ul{
            display: block;
        }
        & ul{
            position: absolute;
            top: 0;
            left: 100%;
            width: 100%;
            border: 1px solid #DCDFE6;
            display: none;
        }
        & .tip{
            position: absolute;
            right: 5px;
        }
    }
}
</style>