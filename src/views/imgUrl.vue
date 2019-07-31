<template>
  <div class=''>
    <el-input v-model="imgSrc" placeholder="请选择图片">
      <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input>
    <el-upload
      action="https://jsonplaceholder.typicode.com/posts/"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>

export default {
    name: 'imgUrl',
    data() {
        return {
          imgSrc:'',
          dialogImageUrl: '',
          dialogVisible: false
        };
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      }
    }
}
</script>
<style lang='less' scoped>

</style>