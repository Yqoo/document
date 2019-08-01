<template>
  <div class='taskBarMenus'>
    <ul :style="position">
      <li v-for="(menu,index) in menus" :key="index">
        {{menu.name}}
      </li>
    </ul>
  </div>
</template>

<script>

export default {
    name:'taskBarMenus',
    props:{
      position:Object,
    },
    data() {
        return {
          menus:[
            { name:'显示桌面',callback:''},
            { name:'锁屏设置',callback:''},
            { name:'锁定任务栏',callback:''},
            { name:'任务栏设置',callback:''},
            { name:'固定到任务栏',callback:''},
            { name:'从任务栏取消固定',callback:''},
            { name:'关闭窗口',callback:''},
          ],
        };
    },
}
</script>
<style lang='less' scoped>

</style>