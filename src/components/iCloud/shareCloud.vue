<!-- 我的云端： 共享云端 -->
<template>
  <div class='shareCloud'>
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item  name='1'>
            <template slot="title">
                <img src='@/assets/image/icons/deskIcons/tree-share.png'/>共享云端
            </template>
            <div class="cards slideInDown animated">
                <el-card v-for="(c,index) in shareCloud" :key="index" shadow="hover" class="hvr-sink">
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
        activeNames: ['1'],
        shareCloud:[
            {name:'开发部',imgurl:require('@/assets/image/icons/deskIcons/tree-disk2.png')},
            {name:'学习区',imgurl:require('@/assets/image/icons/deskIcons/tree-disk2.png')},
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