<!--
 * @Date: 2019-08-13 16:36:29
 * @LastEditors: Yqoo
 * @LastEditTime: 2019-08-15 17:56:09
 * @Desc: 系统属性组件
 -->
<template>
  <div class='systemProperties' v-drag>
    <div :class="themeColorName">
      <boxTools class="theme-color moveBox"  :style="themeColorStyle" :info="info" @windowsTools="windowsTools" :title="componentName"></boxTools>
      <div class="SPMain">
        <el-row>
          <el-col :span="12" class="imgCol">
            <img :src="require('@/assets/image/icons/deskIcons/icon-computer.png')">
          </el-col>
          <el-col :span="12" class="descCol">
            <p>制造商：四川挚友软件有限公司</p>
            <p>系统：挚友ICloud基础版</p>
            <p>经销商：四川挚友软件有限公司</p>
            <p>
              授权：南充汇义财务管理有限公司
              <el-button type="primary" icon="el-icon-more" size='mini'>详情</el-button>
            </p>
            <p>ID:1234567</p>
          </el-col>
        </el-row>
        <div class="handleCard">
          <el-card v-for="(card,index) in cards" :key="index" shadow='hover' class="hvr-sweep-to-top">
            <img :src="card.img">
            <p>{{card.title}}</p>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tools from  "@/assets/js/utils/tools.js";
import { themeMixin}  from '@/assets/js/themeMixin.js';
import boxTools from "@/views/boxTools";
export default {
  mixins: [themeMixin],
  name: 'systemProperties',
  components: {
    boxTools
  },
  data() {
    return {
      info:{className:'.systemProperties',name:'systemProperties',icon:'icon-systemProperties'},
      componentName:'系统属性',
      minWidth:'',
      minHeight:'',
      cards:[
        { name:'serve',title:'需要服务',img:require('@/assets/image/icons/deskIcons/icon-serve.png') },
        { name:'advice',title:'需求建议',img:require('@/assets/image/icons/deskIcons/icon-advice.png') },
        { name:'complain',title:'我要投诉',img:require('@/assets/image/icons/deskIcons/icon-complain.png') },
      ],
    };
  },
  methods:{
    windowsTools( obj ){
      let _s = {
        minSize:   ( param ) => this.$emit( 'minSize',param ),
        maxSize:   ( param ) => tools._maxSize(document.querySelector( param )),
        restore:   ( param ) => tools._restore( document.querySelector(param),this.minHeight,this.minWidth),
        closeItem: ( param ) => this.$emit( 'closeItem',param )
      };
      _s[obj.type](obj.param);
    },
  },
   mounted(){
    this.minWidth = document.querySelector('.systemProperties').offsetWidth;
    this.minHeight = document.querySelector('.systemProperties').offsetHeight;
  },
}
</script>
<style lang='less' scoped>
  .systemProperties{
    width: 45%;
    height: 55%;
    position: absolute;
    top: 10%;
    left: 20%;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0px 0px 50px 10px rgba(0, 0, 0, .3);
  }
  .SPMain{
    & .el-row {
      & .imgCol {
        text-align: center;
        & img {
          width: 200px;
        }
      }
      & .descCol {
        text-align: left;
        padding-top: 50px;
        & p {
          padding: 5px 0px;
          font-size: 12px;
        }
      }
    }
  }
  .handleCard {
    display: flex;
    flex-flow: row wrap;
    justify-content:space-evenly;
    margin-top: 50px;
    & .el-card {
      width: 150px;
      height: 100px;
      margin: 0px 10px;
      text-align: center;
      font-size: 12px;
      cursor: pointer;
      background: linear-gradient(90deg,#a6e3e9,#71c9ce);
      & img {
        width: 60px;
      }
    }
  }
</style>