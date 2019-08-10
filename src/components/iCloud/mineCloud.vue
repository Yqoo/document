<!-- 我的云端： 挚友云&&我的云端 -->
<template>
  <div class='mineCloud'>
    <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item name="1">
            <template slot="title">
                <img src='@/assets/image/icons/deskIcons/icon-myCloud.png'/>挚友云
            </template>
            <div class="cards slideInRight animated">
                <el-card v-for="(c,index) in zyCloud" :key="index" shadow="hover" class="hvr-backward">
                    <img :src="c.imgurl"/>
                    <div class="bottom">{{c.name}}</div>
                    <img :src="c.icon" class="fileIcon">
                </el-card>
            </div>
        </el-collapse-item>
        <el-collapse-item name="2">
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
        {name:'加密云端',imgurl:require('@/assets/image/icons/deskIcons/tree-folder.png'),icon:require('@/assets/image/icons/fileIcons/dsi.png')},
        {name:'我的共享',imgurl:require('@/assets/image/icons/deskIcons/tree-folder.png'),icon:require('@/assets/image/icons/fileIcons/user.png')},
        {name:'接收共享',imgurl:require('@/assets/image/icons/deskIcons/tree-folder.png'),icon:require('@/assets/image/icons/fileIcons/person.png')},
        {name:'我的分享',imgurl:require('@/assets/image/icons/deskIcons/tree-folder.png'),icon:require('@/assets/image/icons/fileIcons/myshare.png')},
        {name:'接收分享',imgurl:require('@/assets/image/icons/deskIcons/tree-folder.png'),icon:require('@/assets/image/icons/fileIcons/recept.png')},
        {name:'备份中心',imgurl:require('@/assets/image/icons/deskIcons/tree-folder.png'),icon:require('@/assets/image/icons/fileIcons/backups.png')},
      ],
      myCloud:[
        {name:'软件区',imgurl:require('@/assets/image/icons/deskIcons/tree-disk.png')},
        {name:'文档区',imgurl:require('@/assets/image/icons/deskIcons/tree-disk.png')},
        {name:'娱乐区',imgurl:require('@/assets/image/icons/deskIcons/tree-disk.png')},
      ],
    };
  },
  methods: {
      handleChange( val ){
          console.log(val)
      }
  }
}

</script>
<style lang='less' scoped>
.cards{
    display:flex;
    flex-flow: row wrap;
    & .el-card {
      margin: 5px 10px;
      cursor: pointer;
      width:80px;
      height: 80px;
      & /deep/ .el-card__body{
        padding: 5px 5px;
        text-align: center;
        & img{
          display: inline-block;
          width: 60%;
        }
        & img.fileIcon{
          position: absolute;
          top: 0;
          width: 22px;
          right: 20%;
        }
      }
      & i{
        font-size: 40px;
      }
    }
  }
.el-collapse-item{
  & /deep/ .el-collapse-item__header{
    & > img{
      display: inline-block;
      width: 20px;
      margin-right: 10px;
    }
  }
}
</style>