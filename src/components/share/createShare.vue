<!-- 创建分享 -->
<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :append-to-body="true"
    :close-on-click-modal="false"
    :modal="false"
    width="50%">
    <div slot="title" class="messageBox-title">
        <img src="@/assets/image/icons/fileIcons/myshare.png">
        <span>创建分享</span>
    </div>
    <div class="resourceName">
        <img src="@/assets/image/icons/fileIcons/attribute.png">
        <span>分享资源</span>
        <span class="name">
            <img :src="info.img">
            {{info.name}}
        </span>
    </div>
    <el-menu mode="horizontal">
        <el-menu-item :disabled='true'><img src="@/assets/image/icons/fileIcons/type.png"/>分享类型</el-menu-item>
    </el-menu>
    <div class="shareType">
        <p><el-radio v-model="shareType" label="1">有提取码</el-radio><span>仅限拥有提取码者可查看，更加隐私安全</span></p>
        <p><el-radio v-model="shareType" label="0">无提取码</el-radio><span>无需提取码，仅限拥有链接的用户可以查看</span></p>
    </div>
    <el-menu mode="horizontal">
        <el-menu-item :disabled='true'><img src="@/assets/image/icons/fileIcons/power.png"/>分享权限</el-menu-item>
        <el-menu-item><el-checkbox :indeterminate="isIndeterminate" v-model="checkAllLimit" @change="handleAllLimitChange">所有</el-checkbox></el-menu-item>
        <el-menu-item><el-checkbox>日常操作</el-checkbox></el-menu-item>
        <el-menu-item><el-checkbox>在线操作</el-checkbox></el-menu-item>
        <el-menu-item><el-checkbox>转发操作</el-checkbox></el-menu-item>
    </el-menu>
    <el-checkbox-group v-model="checkLimits">
        <el-checkbox v-for="item in shareLimits" :label="item" :key="item">{{item}}</el-checkbox>
    </el-checkbox-group>
    <el-menu mode="horizontal">
        <el-menu-item :disabled='true'><img src="@/assets/image/icons/fileIcons/calendar.png"/>分享期限</el-menu-item>
    </el-menu>
    <div class="shareDate">
        <el-radio v-model="shareDate" label="forever">永久有效</el-radio>
        <el-radio v-model="shareDate" label="1">1天</el-radio>
        <el-radio v-model="shareDate" label="3">3天</el-radio>
        <el-radio v-model="shareDate" label="7">7天</el-radio>
        <el-radio v-model="shareDate" label="custom">自定义</el-radio>
    </div>
    <el-menu mode="horizontal">
        <el-menu-item :disabled='true'><img src="@/assets/image/icons/fileIcons/line.png"/>访问次数</el-menu-item>
    </el-menu>
    <div class="shareDate">
        <el-radio v-model="visitTime" label="forever">不限次数</el-radio>
        <el-radio v-model="visitTime" label="10">10次</el-radio>
        <el-radio v-model="visitTime" label="30">30次</el-radio>
        <el-radio v-model="visitTime" label="50">50次</el-radio>
        <el-radio v-model="visitTime" label="custom">自定义</el-radio>
    </div>
    <div slot="footer" class="dialog-footer">
        <el-button type='primary' size='small'>创建链接</el-button>
        <el-button @click="closeDialog('cloudForm1')" size="small">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props:{
      show:Boolean,
      info:Object
  },
  data () {
    return {
        dialogVisible: this.show,
        shareType: '1',
        checkAllLimit: false, //创建分享  勾选所有
        checkLimits:[], //已勾选的权限
        shareDate:'1', //分享期限
        visitTime:'10', //访问次数
        shareLimits:['新建','预览','复制','剪切','命名','删除','加密','解密','上传','下载','在线编辑','协同编辑','压缩','解压','打印','共享','分享','发送','分级授权','管理者','回收站'],
    };
  },
  methods: {
      handleAllLimitChange(){ //创建分享：勾选所有分享权限
          //
      },
      closeDialog(){ //关闭弹框
          //
      }
  },
  mounted(){
      console.log(this.info)
  }
}

</script>
<style lang='less' scoped>
@import './shareStyle.less';
</style>