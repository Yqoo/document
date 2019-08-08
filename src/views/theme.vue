<template>
  <div class='theme'>
    <div class="dragDiv">
      <i class="el-icon-eleme"></i> 主题设置
    </div>
    <div>
      <i class="el-icon-star-on"></i> 默认主题
      <div class="defaultTheme">
        <el-card v-for="(item,index) in defaultThemeColor " :key="item.name" :class="item.name" class="hvr-float-shadow" :offset="index > 0 ? 4 : 0">
          <div @click="changeDefaultTheme(item.name)">
            <span>{{item.themeName}}</span>
          </div>
        </el-card>
      </div>
    </div>
    <div>
      <i class="el-icon-edit"></i> 自定义主题
      <div class="customTheme">
        <el-form :themeForm="themeForm" size="mini">
          <el-form-item label="背景">
            <el-radio-group v-model="themeForm.type" @change="changeType">
              <el-radio label="imgUrl">图片</el-radio>
              <el-radio label="color">渐变颜色</el-radio>
              <el-radio label="opacity">玻璃效果</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <component :is="current"></component>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>  
</template>

<script>
import imgUrl from "@/views/imgUrl";
import color from "@/views/color";
import opacity from "@/views/opacity";
export default {
    name:'theme',
    components:{
      imgUrl,
      color,
      opacity
    },
    data() {
        return {
          themeForm:{
            type:'color',
          },
          current:'color',
          defaultThemeColor: [//默认的4套主题颜色
            {name: 'colorA', themeName: '天空蓝'}, 
            {name: 'colorB', themeName: '青草绿'}, 
            {name: 'colorC', themeName: '渐变粉'}, 
            {name: 'colorD', themeName: '酷炫黑'}]
        };
    },
    methods:{
      changeType( type ){
        this.current = type;
      },
      changeDefaultTheme( name ) {
        let themename = '';
        switch (name) {
          case 'colorA':
            themename = 'themea';break;
          case 'colorB':
            themename = 'themeb';break;
          case 'colorC':
            themename = 'themec';break;
          case 'colorD':
            themename = 'themed';break;
        }
        this.$store.commit('changeThemeColor', themename);
      }
    }
}
</script>
<style lang='less' scoped>
  .theme{
    & div {
      font-size: 12px;
      & i {
        font-size: 18px;
        vertical-align: sub;
      }
    }
    & div:nth-child(1){
      & i {
        padding: 5px 0px 5px 15px;
      }
    }
    & div:nth-child(2){
      & i {
        padding: 15px 0px 5px 20px;
      }
    }
    & div:nth-child(3){
      & i {
        padding: 15px 0px 5px 20px;
      }
    }      
  }
  .defaultTheme {
    display: flex;
    flex-flow: row wrap;
  }
  .el-card {
    width:100px;
    height:100px;
    margin: 10px;
    cursor: pointer;
    & /deep/ .el-card__body{
      padding: 0px;
      text-align: center;
      & > div {
        position: relative;
        height: 100px;
        & span{
          position: relative;
          top: 80%;
        }
      }
    }
  }
  .el-form{
    padding:0px 100px;
  }
  .colorA{
    background: -webkit-linear-gradient(160deg, #ecfcff, #5edfff);
    color: #696969;
  }
  .colorB{
    background: -webkit-linear-gradient(120deg, #60a9a6, #caf2d7);
    color: #eeece1;
  }
  .colorC{
    background: -webkit-linear-gradient(190deg, #ffb6b9, #bbded6);
    color: #525252;
  }
  .colorD{
    background: -webkit-linear-gradient(290deg, #696464, #e9e5dd);
    color: #3b3b3b;
  }
</style>
</style>
