<!-- 主题设置：玻璃效果 -->
<template>
  <div class='opacity'>
      <el-input v-model="color" size="medium">
          <template slot="prepend">选择颜色</template>
          <template slot="append">
              <el-color-picker v-model="color" size="mini" :show-alpha="true" color-format="rgb"></el-color-picker>
          </template> 
      </el-input>
      <el-input v-model="fontColor" size="medium">
          <template slot="prepend">字体颜色</template>
          <template slot="append">
              <el-color-picker v-model="fontColor" :show-alpha="false" color-format="hex" size="mini"></el-color-picker>
          </template> 
      </el-input>
      <div><el-tag :style="showStyle">颜色展示</el-tag></div>
      <el-button size="small" @click="saveCustomTheme">保存</el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
        color: 'rgba(255, 88, 88, 0.5)',
        fontColor: '#4d4d4d',
        showStyle: {
            background: 'rgba(255, 88, 88, 0.5)',
            color: '#4d4d4d'
        }
    };
  },
  computed: {
      showColor(){
          const { color, fontColor } = this;
          return {color, fontColor, type: '2'};
      }
  },
  watch: {
      showColor( val ) {
          Object.assign(this.showStyle, {
              background: val.color,
              color: val.fontColor,
          })
      }
  },
  methods: {
      saveCustomTheme() {
          this.$store.commit('changeThemeColor', this.showColor);
      }
  }
}

</script>
<style lang='less' scoped>
.el-input{
    padding-bottom: 10px;
}
.el-tag {
    width: 100%;
    margin-bottom: 10px;
}
</style>