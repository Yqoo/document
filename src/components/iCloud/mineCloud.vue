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
                    <i :class="c.imgurl"></i>
                    <div class="bottom">{{c.name}}</div>
                </el-card>
            </div>
        </el-collapse-item>
        <el-collapse-item name="2">
            <template slot="title">
                <img src='@/assets/image/icons/deskIcons/icon-ad.png'/>我的云端
            </template>
            <div class="cards slideInLeft animated">
                <el-card v-for="(c,index) in myCloud" :key="index" shadow="hover" class="hvr-float">
                    <i :class="c.imgurl"></i>
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
        {name:'我的桌面',imgurl:'el-icon-s-platform'},
        {name:'我的文档',imgurl:'el-icon-folder'},
        {name:'加密云端',imgurl:'el-icon-folder'},
        {name:'我的共享',imgurl:'el-icon-user'},
        {name:'接收共享',imgurl:'el-icon-sort'},
        {name:'我的分享',imgurl:'el-icon-share'},
        {name:'接收分享',imgurl:'el-icon-folder-checked'},
        {name:'备份中心',imgurl:'el-icon-folder-checked'},
      ],
      myCloud:[
        {name:'软件区',imgurl:'el-icon-mobile'},
        {name:'文档区',imgurl:'el-icon-mobile'},
        {name:'娱乐区',imgurl:'el-icon-mobile'},
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