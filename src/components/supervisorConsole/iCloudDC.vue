<!--
 * @Date: 2019-08-14 16:47:38
 * @LastEditors: Yqoo
 * @LastEditTime: 2019-08-16 16:46:33
 * @Desc: iCloud组件下的数据中心
 -->
<template>
  <div class='iCloudDC'>
    <el-row>
      <el-col :span="leftsize">
        <div class="dcBox">
          <div class="boxTitle">
            <img :src="require('@/assets/image/icons/appIcons/appIcons-cloudDisk.png')">
            <span>我管理的空间</span>
          </div>
          <div class="boxBody">
            <el-card
              v-for="(card,index) in leftSpace" :key="index" shadow="hover">
              <div  @click="handleSpace(card,index)" :style="card.style">
                <img :src="require('@/assets/image/icons/appIcons/appIcons-cloudDisk.png')">
                <p>{{ card.title }}</p>
              </div>
            </el-card>
          </div>
        </div>  
      </el-col>
      <el-col :span="24-leftsize" class="slideInRight animated">
        <div class="rightTitle">
          <div style="padding-bottom:10px;">
            <img :src="require('@/assets/image/icons/appIcons/appIcons-cloudDisk.png')">
            <span>存储空间：<span style="color:#409EFF">{{chooseSpace.title}}</span></span>
          </div>
          <el-row>
            <el-col :span="3">
              <span>已用空间：</span>
            </el-col>
            <el-col :span="6">
               <el-progress :percentage="50" style="top: 2px;"></el-progress>
            </el-col>
            <el-col :span="6">
              <span class="spaceDesc">总空间20G,可用7.8G</span>
            </el-col>
            <el-col :span="9" class="createCol">
              <img :src="require('@/assets/image/icons/appIcons/appIcons-dc.png')">
              <span class="createTxt">创建数据中心</span>
            </el-col>
          </el-row>
         
        </div>
      </el-col>
    </el-row>
  </div>
</template>
 
<script>
 
export default {
  name:'iCloudDC',
  components: {},
  data() {
    return {
      leftSpace:[
        { name:'A',title:'A空间'},
        { name:'B',title:'B空间'},
        { name:'C',title:'C空间'},
        { name:'D',title:'D空间'},
      ],
      leftsize:24,
      chooseSpace:{},//左侧选中的空间
    };
  },
  methods:{
    handleSpace( card,index ){
      this.leftsize = 8;
      this.chooseSpace = card;
      this.leftSpace.map( (item,v) => {
        if( v === index ) item.style = {color:'#409EFF'}
        else delete item.style
      })
    },
  },
}
</script>
<style lang='less' scoped>
  .iCloudDC {
    & .boxTitle {
      padding: 20px 20px;
      border-bottom: 1px solid #ddd;
      & img {
        width: 20px;
        vertical-align: bottom;
      }
      & span {
        padding-left: 5px;
      }
    }
    & .boxBody {
      display: flex;
      flex-flow: row wrap;
      padding: 0px 15px;
      & .el-card {
        width: 80px;
        height: 80px;
        margin: 10px;
        cursor: pointer;
        text-align: center;
        & /deep/ .el-card__body{
          padding: 0px;
          & div {
            padding: 8px;
          }
        }
        & img {
          padding: 5px 0px;
        }
      }
    }
    & .rightTitle{
      display: flex;
      flex-flow: column;
      border-bottom: 1px solid #ddd;
      padding: 5px 5px;
      & img {
        width: 20px;
        vertical-align: bottom;
      }
    }
  }
  .spaceDesc {
    font-size: 10px;
    color:green;
  }
  .createCol {
    text-align: right;
    & .createTxt{
      color:#409EFF;
      padding:0px 10px 0px 5px;
      cursor: pointer;
    }
  }
  
</style>
