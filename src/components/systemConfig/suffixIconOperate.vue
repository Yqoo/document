<!-- 后缀图标：操作菜单 -->
<template>
  <div class='suffixOperate' @contextmenu.stop.prevent @click.stop>
      <ul class="menu pulse animated" :style="position">
          <li v-for="item in list" :key="item.title" @click="item.fn">
              <i :class="item.icon"></i>
              <span>{{item.title}}</span>
          </li>
      </ul>
  </div>
</template>

<script>
export default {
  props: {
      position: Object
  },
  data () {
    return {
        list: [ 
            {icon: 'el-icon-edit', title: '修改图标', fn: ()=>console.log('修改')},
            {icon: 'el-icon-scissors', title: '删除', fn: ()=>console.log('删除')}
        ],
    };
  },
  methods: {}
}

</script>
<style lang='less' scoped>
.menu{
    position: fixed;
    background: #fff;
    border: 1px solid #eee;
    float: left;
    border-radius: 5px;
    text-align: left;
    font-size: 12px;
    width: 105px;
    & li {
      padding: 5px 20px;
      cursor: pointer;
      & i{
          margin-right: 5px;
      }
    };
    & li:hover {
      background: rgb(30, 191, 231);
      color: #fff;
      transition: all .4s linear;
    }
}
</style>