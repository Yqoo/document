<!-- 我的云端：单个工具操作 -->
<template>
  <div class='topUtil'>
      <div class="block" v-for="(item,index) in lists" @click="showMenu(item)" :key="index" :style="item.isRightBorder?{borderRight: '1px solid #DCDFE6'}:''">
          <el-image :src="item.iconImg"></el-image>
          <p>{{item.iconTitle}}</p>
          <i v-if="item.secondMenu" class="el-icon-caret-bottom"></i>
          <ul class="childMenu" v-if="item.flag" @mouseleave="hideMenu">
              <li v-for="list in item.secondMenu" @click.stop="utilClick(list)" :key="list.iconTitle">
                  <img :src="list.iconImg" :alt="list.iconTitle">
                  <span>{{list.iconTitle}}</span>
              </li>
          </ul>
      </div>
  </div>
</template>

<script>
export default {
  props: {
      lists: {
          type: Array,
      }
  },
  data () {
    return {
        arr: this.lists,
    };
  },
  methods: {
      showMenu( item ) {  // 展开二级菜单
          if(item.secondMenu == null){ // 没有子菜单
            this.utilClick(item);
              return false;
          }
          //有子菜单
          if(item.flag){
              item.flag = false;
          } else {
              for(let i=0; i< this.arr.length; i++){
                  this.arr[i].flag = false;
              }
              item.flag = true;
          }
      },
      hideMenu() {  //隐藏二级菜单
        for(let i=0; i< this.arr.length; i++){
            this.arr[i].flag = false;
        }
      },
      utilClick( item ){
          this.hideMenu();
          this.$emit('utilClick', item.iconTitle);
      }
  }
}

</script>
<style lang='less' scoped>
.topUtil:after{
    content: '';
    display: block;
    clear: both;
}
.block{
    position: relative;
    width: 55px;
    float: left;
    text-align: center;
    cursor: pointer;
    & .el-image {
        width: 50%;
        height: 28px;
    }
    & p{
        position: relative;
        top: -5px;
        text-align: center;
        font-size: 12px;
    }
    & > i{
        position: absolute;
        font-size: 12px;
        bottom: -4px;
        left: calc(50% - 6px);
    }
    & .childMenu{
        position: absolute;
        background: #fff;
        z-index: 99;
        border: 1px solid #DCDFE6;
        width: 180%;
        top: 115%;
        left: 0;
        & li{
            line-height: 30px;
            text-align: left;
            padding: 0 5%;
            &:hover{
                cursor: pointer;
                background: #eee;
            }
        }
        & img{
            display: inline-block;
            width: 16px;
            vertical-align: sub;
        }
        & span{
            font-size: 12px;
            margin-left: 5px;
        }
    }
}
</style>