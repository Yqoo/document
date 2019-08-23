<!-- 我的云端： 共享云端 -->
<template>
  <div class='shareCloud'>
      <el-collapse v-model="activeNames">
        <div @click="clickBlock({e: $event,clickTag:'shareCloud',list:blankRight})" @contextmenu.prevent="showRightMenu({e:$event,clickTag: 'shareCloud',dataArr:shareCloud,list:blankRight})">
          <el-collapse-item  name='1' :disabled='true'>
              <template slot="title">
                  <img src='@/assets/image/icons/deskIcons/tree-share2.png'/>共享云端
              </template>
              <div class="cards slideInDown animated" :class="displayName==='行展示'?'row':'col'">
                  <el-card v-for="(c,index) in shareCloud" :class="_isClick.shareCloud&&c.active?'addBorder':''" :key="index" shadow="hover">
                      <div @click.stop="activeCard({e:$event,item:c,i:index,clickTag:'shareCloud',dataArr:shareCloud})" @contextmenu.stop.prevent="fileRightMenu({e:$event,item:c,dataArr:shareCloud,clickTag:'shareCloud'})" @dblclick.stop="openFolder(c.component)" :title="c.name">
                        <img :src="c.imgurl" :style="size"/>
                        <div class="bottom1">{{c.name}}</div>
                      </div>
                  </el-card>
              </div>
          </el-collapse-item>
        </div>
      </el-collapse>
      <capacity 
        v-if="capacityVisible&&capacityData.clickTag==='shareCloud'" 
        :capacityVisible="capacityVisible" 
        :info="capacityData"
        @closeCapacityForm="closeCapacityForm">
      </capacity>
  </div>
</template>

<script>
import { myCloudMixin } from '@/assets/js/myCloudMixin.js';
import { myCloudUtilMixin } from '@/assets/js/myCloudUtilMixins.js';
export default {
  mixins: [myCloudMixin],
  extends: myCloudUtilMixin,
  created(){
    // console.log(this.attrs)
  },
  data () {
    return {
        activeNames: ['1'],
        shareCloud: this.attrs.data,
    };
  },
  methods: {
  }
}

</script>
<style lang='less' scoped>
@import '../../assets/css/myCloud.less';
.el-collapse{
  border: none;
  & /deep/ .el-collapse-item__wrap{
    border: none;
  }
}
</style>