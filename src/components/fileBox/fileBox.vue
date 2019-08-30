<!-- 桌面：打开文件 -->
<template>
  <div class='fileBox'>
      <boxTools class="theme-color moveBox" :style="themeColorStyle" :info="info" @windowsTools="windowsTools" :title="componentTitle"></boxTools>
      <div class="filBoxBody"></div>
  </div>
</template>

<script>
import tools from  "@/assets/js/utils/tools.js";
import boxTools from "@/views/boxTools";
import topUtil from "@/components/iCloud/topUtil";
import { themeMixin } from '@/assets/js/themeMixin.js'
export default {
    mixins: [themeMixin],
    components:{
        boxTools,
        topUtil
    },
    data () {
        return {
            info:{ className:'.fileBox',name:'fileBox',icon:'icon-fileCheck' },
            componentTitle:'查看',
            minWidth:'',
            minHeight:'',
        };
    },
    methods: {
        windowsTools( obj ){  
            let _s = {
                minSize:   ( param ) => this.$emit( 'minSize',param ),
                maxSize:   ( param ) => {tools._maxSize(document.querySelector( param ))},
                restore:   ( param ) => tools._restore( document.querySelector( param ),this.minHeight,this.minWidth),
                closeItem: ( param ) => this.$emit( 'closeItem',param )
            };
            _s[obj.type](obj.param);
        },
    },
    mounted(){
        this.minWidth = document.querySelector('.recycle').offsetWidth;
        this.minHeight = document.querySelector('.recycle').offsetHeight;
    },
}

</script>
<style lang='less' scoped>

</style>