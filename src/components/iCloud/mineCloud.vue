<!-- 我的云端： 挚友云&&我的云端 -->
<template>
  <div class='mineCloud'>
    <el-collapse v-model="activeNames">
        <div @click="clickBlock({utilTag:'unit',clickTag: 'zhiyou'})" style='border-bottom:1px solid #ebeef5'>
          <el-collapse-item name="1" :disabled='true'>
              <template slot="title">
                  <img src='@/assets/image/icons/deskIcons/icon-myCloud.png'/>挚友云
              </template>
              <div class="cards slideInRight animated">
                  <el-card v-for="(c,index) in zyCloud" :class="_isClick.mineCloud.zhiyou&&c.active?'addBorder':''" :key="index" shadow="hover" class="hvr-backward">
                      <div @click="activeCard(c, zyCloud)" :title="c.name">
                        <img :src="c.imgurl" :style="size"/>
                        <div class="bottom">{{c.name}}</div>
                        <img :src="c.icon" class="fileIcon">
                      </div>
                  </el-card>
              </div>
          </el-collapse-item>
        </div>
        <div @click="clickBlock({utilTag:'mineCloud',clickTag:'mine'})">
          <space-progress :avaliableSpace='avaliableSpace' :totalSpace='totalSpace'></space-progress>
          <el-collapse-item name="2" :disabled='true'>
              <template slot="title">
                  <img src='@/assets/image/icons/deskIcons/icon-computer.png'/>我的云端
              </template>
              <div class="cards slideInLeft animated">
                  <el-card v-for="(c,index) in myCloud" :class="_isClick.mineCloud.mine&&c.active?'addBorder':''" :key="index" shadow="hover" class="hvr-float">
                      <div @click="activeCard(c, myCloud)" :title="c.name">
                        <img :src="c.imgurl" :style="size"/>
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
export default {
  mixins: [myCloudMixin],
  extends: myCloudUtilMixin,
  components: {
    SpaceProgress,
  },
  data () {
    return {
        activeNames: ['1', '2'],
        zyCloud:[
        {name:'我的桌面',imgurl:require('@/assets/image/icons/fileIcons/desk.png'),icon:'',active:false},
        {name:'我的文档',imgurl:require('@/assets/image/icons/deskIcons/tree-folder.png'),icon: '',active:false},
        {name:'加密空间',imgurl:require('@/assets/image/icons/deskIcons/tree-folder.png'),icon:require('@/assets/image/icons/fileIcons/dsi.png'),active:false},
        {name:'我的共享',imgurl:require('@/assets/image/icons/deskIcons/tree-folder.png'),icon:require('@/assets/image/icons/fileIcons/user.png'),active:false},
        {name:'接收共享',imgurl:require('@/assets/image/icons/deskIcons/tree-folder.png'),icon:require('@/assets/image/icons/fileIcons/person.png'),active:false},
        {name:'我的分享',imgurl:require('@/assets/image/icons/deskIcons/tree-folder.png'),icon:require('@/assets/image/icons/fileIcons/myshare.png'),active:false},
        {name:'接收分享',imgurl:require('@/assets/image/icons/deskIcons/tree-folder.png'),icon:require('@/assets/image/icons/fileIcons/recept.png'),active:false},
        {name:'备份中心',imgurl:require('@/assets/image/icons/deskIcons/tree-folder.png'),icon:require('@/assets/image/icons/fileIcons/backups.png'),active:false},
      ],
      myCloud:[
        {name:'软件区',imgurl:require('@/assets/image/icons/deskIcons/tree-disk3.png'),active:false},
        {name:'文档区',imgurl:require('@/assets/image/icons/deskIcons/tree-disk3.png'),active:false},
        {name:'娱乐区',imgurl:require('@/assets/image/icons/deskIcons/tree-disk3.png'),active:false},
      ],
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