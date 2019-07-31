<template>
  <div class='theme' :class="themeColorName">
    <div class="dragDiv theme-color" :style="themeColorStyle">
      <i class="el-icon-eleme"></i> 主题设置
    </div>
    <div>
      <i class="el-icon-star-on"></i> 默认主题
      <div class="defaultTheme">
        <el-card v-for="(card,index) in 4 " :key="index" :offset="index > 0 ? 4 : 0">
          <div>
            {{card}}
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
export default {
    name:'theme',
    components:{
      imgUrl,
      color
    },
    data() {
        return {
          themeForm:{
            type:'imgUrl',
          },
          current:'imgUrl',
          themeColorName: '',
          themeColorStyle: {}
        };
    },
    computed: {
      storeChange() {
        return this.$store.state.themeColor;
      }
    },
    methods:{
      changeType( type ){
        this.current = type;
      }
    },
    watch: {
      storeChange( val ) {
        this.themeColorName = this._getThemeColor(this, val.themeColorName, val.themeColorStyle).className;
        this.themeColorStyle = this._getThemeColor(this, val.themeColorName, val.themeColorStyle).style;
      }
    },
    created(){
      this.themeColorName = this._getThemeColor(this, this.themeColorName, this.themeColorStyle).className;
      this.themeColorStyle = this._getThemeColor(this, this.themeColorName, this.themeColorStyle).style;
    }
}
</script>
<style lang='less' scoped>
@import url('../style/theme.less');
@import url('../style/defaultColor.less');
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
  }
  .el-form{
    padding:0px 100px;
  }
  .dragDiv{
    cursor: all-scroll;
    background: linear-gradient(#eee,#ddd);   
  }
</style>