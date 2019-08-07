<!-- 默认图标选择 -->
<template>
  <div class='defaultIcon'>
      <el-dialog
        title="提示"
        v-dialogDrag
        :visible.sync="dialogVisible"
        width="30%"
        :modal-append-to-body="false"
        :append-to-body="true"
        :close-on-click-modal="false"
        :before-close="handleClose">
        <span>这是一段信息</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" >确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
export default {
  props:{
      dialogVisible: Boolean
  },
  data () {
    return {
        defaultIconList: [  // 默认图标库
            {iconImg:require('@/assets/image/icons/fileIcons/doc.png')},
            {iconImg:require('@/assets/image/icons/fileIcons/ppt.png')},
            {iconImg:require('@/assets/image/icons/fileIcons/excel.png')},
            {iconImg:require('@/assets/image/icons/fileIcons/文件夹.png')},
            {iconImg:require('@/assets/image/icons/fileIcons/zip.png')},
            {iconImg:require('@/assets/image/icons/fileIcons/excel.png')},
        ]
    };
  },
  methods: {
      handleClose() {
        this.$emit('closeDialog', false)
      },
  }
}

</script>
<style lang='less' scoped>
</style>