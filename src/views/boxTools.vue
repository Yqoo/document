<template>
  <div class='boxTools'>
    <img :src="src" class="boxIcon">
    <span class="title">{{title}}</span>
    <el-tooltip class="item" effect="light" content="最小化" placement="bottom">
      <i class="el-icon-minus"  @click="windowsTools('minSize')"></i>
    </el-tooltip>
    <el-tooltip v-if="max" class="item" effect="light" content="最大化" placement="bottom">
      <i class="el-icon-full-screen"  @click="windowsTools('maxSize')"></i>             
    </el-tooltip>
    <el-tooltip v-else class="item" effect="light" content="还原" placement="bottom">
      <i class="el-icon-copy-document" @click="windowsTools('restore')"></i>             
    </el-tooltip>
    <el-tooltip class="item" effect="light" content="关闭" placement="bottom">
      <i class="el-icon-close" @click="windowsTools('closeItem')"></i>
    </el-tooltip>
  </div>
</template>
<script>

import { themeMixin}  from '@/assets/js/themeMixin.js';
export default {
    mixins: [themeMixin],
    name:'boxTools',
    props:['info','title'],
    data() {
        return {
          msg:Object.assign({},this.info),
          max:true,
          src:require('@/assets/image/icons/deskIcons/'+this.info.icon+'.png'),
          tools:{
            minSize: () => this.$emit('windowsTools',{param:this.msg.name,type:'minSize'}),//最小化
            maxSize: () =>{ this.$emit( 'windowsTools',{param:this.msg.className,type:'maxSize'} );this.max = false; },//最大化
            restore: () => { this.$emit( 'windowsTools',{param:this.msg.className,type:'restore'} );this.max = true; },//还原
            closeItem: () =>  this.$emit('windowsTools',{param:this.msg.name,type:'closeItem'})//关闭弹出组件
          },
        };
    },
    methods:{
      windowsTools( fn ){
        this.tools[fn]();
      },
    }
}
</script>
<style lang='less' scoped>
  .boxTools{
    height: 35px;
    line-height: 35px;
    cursor: move;
    text-align: right;
    border-radius: 5px 5px 0px 0px;
    width: 100%;
    z-index: 10001;
    border-bottom: 3px double #d1d0d0;
    & i{
      padding:0px 5px;
      cursor:pointer;
    }
  }
  .title{
    position: absolute;
    left:40px;
    font-size: 14px;
  }
  .boxIcon{
    position: absolute;
    left:10px;
    top: 4px;
    width:23px;
  }
</style>