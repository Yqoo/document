<!-- 我的云端： 挚友云&&我的云端 -->
<template>
  <div class='mineCloud'>
    <el-collapse v-model="activeNames">
        <div @click="clickBlock({clickTag: 'zhiyou'})" style='border-bottom:1px solid #ebeef5'>
          <el-collapse-item name="1" :disabled='true'>
              <template slot="title">
                  <img src='@/assets/image/icons/deskIcons/icon-myCloud.png'/>挚友云
              </template>
              <div class="cards slideInRight animated" :class="displayName==='行展示'?'row':'col'">
                  <el-card v-for="(c,index) in zyCloud" :class="_isClick.mineCloud.zhiyou&&c.active?'addBorder':''" :key="index" shadow="hover">
                      <div @mousedown="activeCard($event, c, index, zyCloud)" @dblclick.stop="openFolder(c.component)" :title="c.name">
                        <img :src="c.imgurl" :style="displayName==='行展示'&&size"/>
                        <div class="bottom">{{c.name}}</div>
                        <img :src="c.icon" class="fileIcon">
                      </div>
                  </el-card>
              </div>
          </el-collapse-item>
        </div>
        <div @click="clickBlock({clickTag:'mine'})" @contextmenu.prevent="showRightMenu" >
          <space-progress :avaliableSpace='avaliableSpace' :totalSpace='totalSpace'></space-progress>
          <el-collapse-item name="2" :disabled='true'>
              <template slot="title">
                  <img src='@/assets/image/icons/deskIcons/icon-computer.png'/>我的云端
              </template>
              <div class="cards slideInLeft animated" :class="displayName==='行展示'?'row':'col'">
                  <el-card v-for="(c,index) in myCloud" :class="_isClick.mineCloud.mine&&c.active?'addBorder':''" :key="index" shadow="hover">
                      <div @mousedown="activeCard($event, c, index, myCloud)" @dblclick.stop="openFolder(c.component)" :title="c.name">
                        <img :src="c.imgurl" :style="displayName==='行展示'&&size"/>
                        <div class="bottom1">{{c.name}}</div>
                      </div>
                  </el-card>
              </div>
          </el-collapse-item>
        </div>
    </el-collapse>
  </div>
</template>

<script>
import { myCloudMixin } from '@/assets/js/myCloudMixin.js';
import { myCloudUtilMixin } from '@/assets/js/myCloudUtilMixins.js';
import SpaceProgress from '@/views/spaceProgress.vue';
import { constants } from 'crypto';
import rightMenu from '@/components/iCloud/rightMenu.vue'
export default {
  mixins: [myCloudMixin],
  extends: myCloudUtilMixin,
  props:['attrs'],
  components: {
    SpaceProgress,
    rightMenu,
  },
  computed:{
    zyCloud(){
      let data = this.attrs.mineCloud.data.filter((i) => {
        return i.type === 0;
      });
      return data;
    },
    myCloud(){
      return this.attrs.mineCloud.data.filter((i) => {
        return i.type === 1;
      });
    }
  },
  data () {
    return {
        activeNames: ['1', '2'],
        mineCloud: this.attrs.mineCloud,
        avaliableSpace: 18.6,  //可用空间
        totalSpace: 30.2,  //总空间
    };
  },
  methods: {
  },
}

</script>
<style lang='less' scoped>
@import '../../assets/css/myCloud.less';

.spaceProgress{
  position: absolute;
  width: 47%;
  right: 5px;
  top: 4%;
}
</style>