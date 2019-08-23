<!-- 我的云端：组织云端 -->
<template>
  <div class='organizationCloud'>
      <el-collapse v-model="activeNames">
        <div @click="clickBlock({e: $event,clickTag:'organizationCloud',list:blankRight})" @contextmenu.prevent="showRightMenu({e:$event,clickTag: 'organizationCloud',dataArr:organizationCloud,list:blankRight})">
            <el-collapse-item  name='1' :disabled='true'>
              <template slot="title">
                  <img src='@/assets/image/icons/deskIcons/tree-org2.png'/>组织云端
              </template>
              <div class="cards slideInUp animated" :class="displayName==='行展示'?'row':'col'">
                  <el-card v-for="(c,index) in organizationCloud" :class="_isClick.organizationCloud&&c.active?'addBorder':''" :key="index" shadow="hover">
                      <div @click.stop="activeCard({e:$event,item:c,i:index,clickTag:'organizationCloud',dataArr:organizationCloud})" @contextmenu.stop.prevent="fileRightMenu({e:$event,item:c,dataArr:organizationCloud,clickTag: 'organizationCloud'})" @dblclick.stop="openFolder(c.component)" :title="c.name">
                        <img :src="c.imgurl" :style="size"/>
                        <div class="bottom1">{{c.name}}</div>
                      </div>
                  </el-card>
              </div>
          </el-collapse-item>
        </div>
      </el-collapse>
      <capacity 
        v-if="capacityVisible&&capacityData.clickTag==='organizationCloud'" 
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
  data () {
    return {
        activeNames: ['1'],
        organizationCloud:this.attrs.data,
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