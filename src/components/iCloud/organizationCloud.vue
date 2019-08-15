<!-- 我的云端：组织云端 -->
<template>
  <div class='organizationCloud'>
      <el-collapse v-model="activeNames">
        <div @click="clickBlock({utilTag:'organizationCloud',clickTag:'organizationCloud'})">
            <el-collapse-item  name='1' :disabled='true'>
              <template slot="title">
                  <img src='@/assets/image/icons/deskIcons/tree-org.png'/>组织云端
              </template>
              <div class="cards slideInUp animated">
                  <el-card v-for="(c,index) in organizationCloud" :class="_isClick.organizationCloud&&c.active?'addBorder':''" :key="index" shadow="hover" class="hvr-forward">
                      <div @click="activeCard(c, organizationCloud)" :title="c.name">
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
export default {
  mixins: [myCloudMixin],
  extends: myCloudUtilMixin,
  data () {
    return {
        activeNames: ['1'],
        organizationCloud:[
            {name:'四川挚友软件有限公司',imgurl:require('@/assets/image/icons/fileIcons/company.png'),active:false}
      ],
    };
  },
  methods: {
  }
}

</script>
<style lang='less' scoped>
@import '../../assets/css/myCloud.less';
</style>