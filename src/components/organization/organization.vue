<!--
 * @Date: 2019-08-06 10:40:02
 * @LastEditors: Yqoo
 * @LastEditTime: 2019-08-15 18:13:51
 * @Desc: 组织与用户组件外部容器
 -->
/** 
组织与用户组件

*/
<template>
  <div class="organization" v-drag>
    <div :class="themeColorName">
      <boxTools class="theme-color moveBox"  :style="themeColorStyle" :info="info" @windowsTools="windowsTools" :title="componentName"></boxTools>
      <orgIndex class="fadeIn animated"></orgIndex>
    </div>
  </div>
</template>

<script>
import tools from  "@/assets/js/utils/tools.js";
import { themeMixin}  from '@/assets/js/themeMixin.js';
import boxTools from "@/views/boxTools";
import orgIndex from "@/components/organization/orgIndex.vue";
export default {
  mixins: [themeMixin],
  name: "organization",
  components: {
    boxTools,
    orgIndex
  },
  data() {
    return {
      info:{className:'.organization',name:'organization',icon:'icon-organization'},
      componentName:'组织与用户',
      minWidth:'',
      minHeight:'',
    };
  },
  methods:{
    windowsTools( obj ){
      let _s = {
        minSize:   ( param ) => this.$emit( 'minSize',param ),
        maxSize:   ( param ) => tools._maxSize(document.querySelector( param )),
        restore:   ( param ) => tools._restore( document.querySelector(param),this.minHeight,this.minWidth),
        closeItem: ( param ) => this.$emit( 'closeItem',param )
      };
      _s[obj.type](obj.param);
    },
  },
  mounted(){
    this.minWidth = document.querySelector('.organization').offsetWidth;
    this.minHeight = document.querySelector('.organization').offsetHeight;
  },
};
</script>
<style lang='less' scoped>
  .organization {
    background: #fff;
    width: 60%;
    height: 70%;
    position: absolute;
    top: 10%;
    left:20%;
    border-radius: 5px;
  }
</style>