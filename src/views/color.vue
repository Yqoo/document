<template>
  <div class='' >
    <el-input v-model="startColor">
      <template slot="prepend">开始颜色</template>
      <colorPicker slot="append" v-model="startColor" style="cursor:pointer;z-index=1000001"></colorPicker>
    </el-input>
    <el-input  v-model="endColor">
      <template slot="prepend">结束颜色</template>
      <colorPicker slot="append" v-model="endColor" style="cursor:pointer;z-index=10000001"></colorPicker>
    </el-input>
    <el-input  v-model="fontColor">
      <template slot="prepend">字体颜色</template>
      <colorPicker slot="append" v-model="fontColor" style="cursor:pointer;z-index=10000001"></colorPicker>
    </el-input>
    <el-row>
      <el-col :span="6">
        <span>渐变角度：</span>
      </el-col>
      <el-col :span="18">
        <el-input-number size="mini" v-model="edg" :min="min" :max="max"></el-input-number>
      </el-col>
    </el-row>
    <div :class="themeColorName"><el-tag class='theme-color' :style="themeColorStyle">颜色展示</el-tag></div>
    <el-button @click="saveCustomTheme">保存</el-button>
  </div>
</template>

<script>
import { constants } from 'crypto';

export default {
    name:'color',
    data() {
        return {
          startColor:'#fff',
          endColor:'#409EFF',
          fontColor: '#adadad',
          edg:80,
          min:0,
          max:360,
          themeColorName: 'themea',
          themeColorStyle: {},
        };
    },
    computed: {
      colorInfo () {
        const {startColor, endColor, edg, fontColor} = this;
        return {startColor, endColor, edg, fontColor}
      }
    },
    watch: {
      colorInfo (val) {
          let selectThemeInfo = {
            themeColorName: 'selectThemeColor',
            themeColorStyle: {
                background: `-webkit-linear-gradient(${val.edg}deg, ${val.startColor}, ${val.endColor})`,
                background: `-o-linear-gradient(${val.edg}deg, ${val.startColor}, ${val.endColor})`,
                background: `-moz-linear-gradient(${val.edg}deg, ${val.startColor}, ${val.endColor})`,
                background: `linear-gradient(${val.edg}deg, ${val.startColor}, ${val.endColor})`,
                color: val.fontColor
            }
          }
          this.themeColorName = selectThemeInfo.themeColorName;
          this.themeColorStyle = selectThemeInfo.themeColorStyle;
      }
    },
    methods: {
      saveCustomTheme() {
        this.$store.commit('changeThemeColor', this.colorInfo);
      },
    },
    created() {
      //设置默认的主题颜色
      let themeColor = this.$store.state.themeColor;
      if( typeof themeColor == 'string' && (themeColor.constructor == String) ){
        this.themeColorName = themeColor;
      } else {
        this.startColor = themeColor.startColor;
        this.endColor = themeColor.endColor;
        this.fontColor = themeColor.fontColor;
        this.edg = themeColor.edg;
        this.themeColorName = '';
        this.themeColorStyle = {
          background: `-webkit-linear-gradient(${themeColor.edg}deg, ${themeColor.startColor}, ${themeColor.endColor})`,
          background: `-o-linear-gradient(${themeColor.edg}deg, ${themeColor.startColor}, ${themeColor.endColor})`,
          background: `-moz-linear-gradient(${themeColor.edg}deg, ${themeColor.startColor}, ${themeColor.endColor})`,
          background: `linear-gradient(${themeColor.edg}deg, ${themeColor.startColor}, ${themeColor.endColor})`,
          color: themeColor.fontColor
        }
      }
    },
    mounted(){
      // console.log(this.$store.state.themeColor)
    }
   
}
</script>

<style lang='less' scoped>
  @import '../style/theme.less';
  @import '../style/defaultColor.less';
  .el-input{
    padding: 10px 0px;
  }
  .el-tag {
    width: 100%;
    margin: 10px 0;
  }
</style>