<!--
 * @Date: 2019-08-09 09:31:46
 * @LastEditors: Yqoo
 * @LastEditTime: 2019-08-09 18:04:40
 * @desc: 我的云端初始进入右侧界面
 -->
<template>
  <div class=''>
     <el-collapse v-model="activeCollapse">
      <el-collapse-item name='1'>
        <template slot="title">
          <i class="el-icon-cloudy"></i>挚友云
        </template>
        <div class="cards slideInRight animated">
          <el-card v-for="(c,index) in zyCloud" :key="index" shadow="hover" class="hvr-backward">
            <i :class="c.imgurl"></i>
            <div class="bottom">{{c.name}}</div>
          </el-card>
        </div>
      </el-collapse-item>
        <el-collapse-item  name='2'>
        <template slot="title">
          <i class="el-icon-s-custom"></i>我的云端
        </template>
        <div class="cards slideInLeft animated">
          <el-card v-for="(c,index) in myCloud" :key="index" shadow="hover" class="hvr-float">
            <i :class="c.imgurl"></i>
            <div class="bottom1">{{c.name}}</div>
          </el-card>
        </div>
      </el-collapse-item>
        <el-collapse-item  name='3'>
        <template slot="title">
          <i class="el-icon-cloudy-and-sunny"></i>共享云端
        </template>
        <div class="cards slideInDown animated">
          <el-card v-for="(c,index) in shareCloud" :key="index" shadow="hover" class="hvr-sink">
            <i :class="c.imgurl"></i>
            <div class="bottom1">{{c.name}}</div>
          </el-card>
        </div>
      </el-collapse-item>
        <el-collapse-item  name='4'>
        <template slot="title">
          <i class="el-icon-partly-cloudy"></i>组织云端
        </template>
        <div class="cards slideInUp animated">
          <el-card v-for="(c,index) in organizationCloud" :key="index" shadow="hover" class="hvr-forward">
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
  name: 'iCloudIndex',
  data() {
    return {
      activeCollapse:['1', '2' ,'3', '4'],
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
      shareCloud:[
        {name:'开发部',imgurl:'el-icon-mobile'},
        {name:'学习区',imgurl:'el-icon-mobile'},
      ],
      organizationCloud:[
        {name:'挚友',imgurl:'el-icon-office-building'}
      ],
    };
  },
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
      & i{
        font-size: 40px;
      }
    }
  }
  .bottom {
    font-size: 10px;
    width: 50px;
    text-align: left;
  }
  .bottom1 {
    font-size:10px;
    text-align:center
  }
</style>
