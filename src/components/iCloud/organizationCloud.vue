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
                  <el-card v-for="(c,index) in organizationCloud" :class="_isClick&&c.active?'addBorder':''" :key="index" shadow="hover" class="hvr-forward">
                      <div @click="activeCard(c, organizationCloud)">
                        <i :class="c.imgurl"></i>
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
import { myCloudMixin } from '@/assets/js/myCloudMixin.js'
export default {
  mixins: [myCloudMixin],
  data () {
    return {
        activeNames: ['1'],
        organizationCloud:[
            {name:'挚友',imgurl:'el-icon-office-building',active:false}
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