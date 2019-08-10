<!-- 我的云端： 挚友云&&我的云端 -->
<template>
  <div class='mineCloud'>
    <el-collapse v-model="activeNames">
        <el-collapse-item name="1" :disabled='true'>
            <template slot="title">
                <img src='@/assets/image/icons/deskIcons/icon-computer.png'/>挚友云
            </template>
            <div class="cards slideInRight animated">
                <el-card v-for="(c,index) in zyCloud" :key="index" shadow="hover" class="hvr-backward">
                    <img :src="c.imgurl"/>
                    <div class="bottom">{{c.name}}</div>
                    <img :src="c.icon" class="fileIcon">
                </el-card>
            </div>
        </el-collapse-item>
        <div @click="clickBlock('mineCloud')">
          <el-collapse-item name="2" :disabled='true'>
              <template slot="title">
                  <img src='@/assets/image/icons/deskIcons/icon-ad.png'/>我的云端
              </template>
              <div class="cards slideInLeft animated">
                  <el-card v-for="(c,index) in myCloud" :key="index" shadow="hover" class="hvr-float">
                      <img :src="c.imgurl"/>
                      <div class="bottom1">{{c.name}}</div>
                  </el-card>
              </div>
          </el-collapse-item>
        </div>
    </el-collapse>
  </div>
</template>

<script>
export default {
  data () {
    return {
        activeNames: ['1', '2'],
        zyCloud:[
        {name:'我的桌面',imgurl:require('@/assets/image/icons/fileIcons/desk.png'),icon:''},
        {name:'我的文档',imgurl:require('@/assets/image/icons/deskIcons/tree-folder.png'),icon: ''},
        {name:'加密空间',imgurl:require('@/assets/image/icons/deskIcons/tree-folder.png'),icon:require('@/assets/image/icons/fileIcons/dsi.png')},
        {name:'我的共享',imgurl:require('@/assets/image/icons/deskIcons/tree-folder.png'),icon:require('@/assets/image/icons/fileIcons/user.png')},
        {name:'接收共享',imgurl:require('@/assets/image/icons/deskIcons/tree-folder.png'),icon:require('@/assets/image/icons/fileIcons/person.png')},
        {name:'我的分享',imgurl:require('@/assets/image/icons/deskIcons/tree-folder.png'),icon:require('@/assets/image/icons/fileIcons/myshare.png')},
        {name:'接收分享',imgurl:require('@/assets/image/icons/deskIcons/tree-folder.png'),icon:require('@/assets/image/icons/fileIcons/recept.png')},
        {name:'备份中心',imgurl:require('@/assets/image/icons/deskIcons/tree-folder.png'),icon:require('@/assets/image/icons/fileIcons/backups.png')},
      ],
      myCloud:[
        {name:'软件区',imgurl:require('@/assets/image/icons/deskIcons/tree-disk3.png')},
        {name:'文档区',imgurl:require('@/assets/image/icons/deskIcons/tree-disk3.png')},
        {name:'娱乐区',imgurl:require('@/assets/image/icons/deskIcons/tree-disk3.png')},
      ],
    };
  },
  methods: {
    clickBlock( tag ) {
      this.$emit('changeUtils', tag);
    }
  }
}

</script>
<style lang='less' scoped>
@import '../../assets/css/myCloud.less';
</style>