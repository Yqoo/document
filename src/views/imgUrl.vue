<template>
  <div class='imgUrl'>
    <el-upload
      action="#"
      list-type="picture-card"
      accept=".JPG,.JPEG,.PNG,.GIF,.SVG,.WEBP,.BMP"
      :auto-upload = "false"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-button @click="saveImgUrl" size="small">保存</el-button>
  </div>
</template>

<script>

export default {
    name: 'imgUrl',
    data() {
        return {
          imgSrc:'',
        };
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {  //查看壁纸
        this.imgSrc = file.url;  // 临时：获得文件路径
        const h = this.$createElement;
        this.$msgbox({
          title:'壁纸查看',
          message: h('div', {style: `background: url(${file.url}) 0% 0% /cover no-repeat;height: 300px;color: transparent;`},'1'),
          showCancelButton: false,
          showConfirmButton: false,
          callback: action => {
            return false;
          }
        });
      },
      saveImgUrl() {
        let style = {imgSrc: this.imgSrc, type: '0'};
        this.$store.commit('changeThemeColor', style);
      }
    }
}
</script>
<style lang='less' scoped>
  .el-button{
    margin: 5px 0 0 0;
  }
  .imgUrl /deep/ .el-upload-list{
    & > li {
      margin: 0 8px 0 0;
    }
  }
</style>