<!--
 * @Date: 2019-08-27 14:02:19
 * @LastEditors: Yqoo
 * @LastEditTime: 2019-08-27 15:38:01
 * @Desc: 图标库
 -->
<template>
<div class='icons'>
  <ul>
    <li v-for="( icon,index) in icons" :key='index' class="hvr-float-shadow" @click="choose(icon,index)" :class="{isClick:icon.class}">
      <img :src="icon.img" :alt="icon.desc">
      <p>{{icon.desc}}</p>
    </li>
  </ul>
</div>
</template>

<script>

export default {
  name: 'icons',
  components: {},
  data() {
    return {
      icons:[
        { img:require('@/assets/image/icons/fileIcons/rename.png'),desc:'rename',class:false},
        { img:require('@/assets/image/icons/fileIcons/col.png'),desc:'col',class:false},
        { img:require('@/assets/image/icons/fileIcons/copy.png'),desc:'copy',class:false},
        { img:require('@/assets/image/icons/fileIcons/cut.png'),desc:'cut',class:false},
        { img:require('@/assets/image/icons/fileIcons/desk.png'),desc:'desk',class:false},
        { img:require('@/assets/image/icons/fileIcons/doc.png'),desc:'doc',class:false},
        { img:require('@/assets/image/icons/fileIcons/down.png'),desc:'down',class:false},
        { img:require('@/assets/image/icons/fileIcons/dsi.png'),desc:'dsi',class:false},
        { img:require('@/assets/image/icons/fileIcons/edit.png'),desc:'edit',class:false},
        { img:require('@/assets/image/icons/fileIcons/excel.png'),desc:'excel',class:false},
        { img:require('@/assets/image/icons/fileIcons/export.png'),desc:'export',class:false},
        { img:require('@/assets/image/icons/fileIcons/dailyO.png'),desc:'dailyO',class:false},
      ],
    };
  },
  methods:{
    choose( icon,index ){
      this.icons.map( (item,v) => {
        if( v === index ) item.class = true
        else  item.class = false;
      });
      this.$emit('chooseIcon',icon );
    }
  },
}
</script>
<style lang='less' scoped>
  .icons {
    & ul {
      display: flex;
      flex-flow: row wrap;
      & li {
        border: 1px solid #ddd;
        border-radius: 4px;
        padding: 5px;
        margin: 3px;
        text-align: center;
        width: 50px;
        height: 50px;
        cursor: pointer;
        & img {
          width: 30px;
        }
        & p {
          font-size: 12px; 
        }
      }
    }
  }
  .isClick {
    border-color: #409EFF!important;
  }
</style>