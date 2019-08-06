<!-- 系统设置： 系统设置表单 -->
<template>
  <el-form ref="form" :model="form" label-width="100px" size="small" active-value="0" inactive-value="1" label-position="left">
    <el-form-item label="程序名称:">
        <el-input v-model="form.name" size="mini"></el-input>
        <label>程序logo图标</label>
        <el-button size="mini">更新</el-button>
    </el-form-item>
    <el-form-item label="目录排除:">
        <el-input v-model="form.catolog" size="mini"></el-input>
    </el-form-item>
    <el-form-item label="开启共享:">
        <p>
            <el-switch v-model="form.enjoyTogether1" active-value="0" inactive-value="1"></el-switch>
            <label>开启用户之间文件共享功能</label>
        </p>
        <p>
            <el-switch v-model="form.enjoyTogether2" active-value="0" inactive-value="1"></el-switch>
            <label>开启用户自动接收共享功能</label>
        </p>
    </el-form-item>
    <el-form-item label="开启分享:">
        <p>
            <el-switch v-model="form.share1" active-value="0" inactive-value="1"></el-switch>
            <label>开启云盘分享功能</label>
            <el-input v-show="form.share1 === '0'" v-model="form.shareAddress" size="mini" placeholder="输入外网分享地址，如：http://www.govnk.com"></el-input>
        </p>
        <p>
            <el-switch v-model="form.share2" active-value="0" inactive-value="1"></el-switch>
            <label>开启分享上传功能</label>
            <el-input v-show="form.share2 === '0'" v-model="form.suffix" size="mini" placeholder="设置限制后缀名，如：.exe,.msi"></el-input>
        </p>
    </el-form-item>
    <el-form-item label="在线解压:">
        <el-switch v-model="form.decompression" active-value="0" inactive-value="1"></el-switch>
        <label>开启在线解压与压缩功能</label>
    </el-form-item>
    <el-form-item label="在线预览:">
        <el-switch v-model="form.preview" active-value="0" inactive-value="1"></el-switch>
        <label>开启在线预览Office文件</label>
    </el-form-item>
    <el-form-item label="在线编辑:">
        <el-switch v-model="form.edit" active-value="0" inactive-value="1"></el-switch>
        <label>开启在线编辑Office文件</label>
    </el-form-item>
    <el-form-item label="协同编辑:">
        <el-switch v-model="form.editTogether" active-value="0" inactive-value="1"></el-switch>
        <label>开启协同编辑Office文件</label>
    </el-form-item>
    <el-form-item label="短信功能:">
        <el-switch v-model="form.shortLetter" active-value="0" inactive-value="1"></el-switch>
        <label>开启短信收发功能</label>
    </el-form-item>
    <el-form-item label="即使通讯:">
        <el-switch v-model="form.instantMsg" active-value="0" inactive-value="1"></el-switch>
        <label>开启即使通讯功能</label>
    </el-form-item>
    <el-form-item label="登陆后默认进入:">
        <el-radio-group v-model="form.defaultPage">
            <el-radio label="0">桌面</el-radio>
            <el-radio label="1">我的云端</el-radio>
            <el-radio label="2">共享云端</el-radio>
        </el-radio-group>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data () {
    return {
        form: {
            name: '挚友云',  //程序名称
            catolog: '',  //目录排除：访问的物理地址，需用逗号隔开
            enjoyTogether1: '0', //开启文件共享
            enjoyTogether2: '1', // 关闭自动接收共享
            share1: '1', //关闭云盘分享
            share2: '0',  // 开启分享上传
            shareAddress: '',  //云盘分享外网地址
            suffix: '',  //上传文件后缀名
            decompression: '0',  //开启在线解压
            preview: '0',  // 开启在线预览
            edit: '0', //开启在线编辑
            editTogether: '0',  //开启协同编辑
            shortLetter: '0',  //开启短信收发
            instantMsg: '0',  //开启即时通讯功能
            defaultPage: '0', //登陆后默认进入的页面
        }
    };
  },
  methods: {
  }
}

</script>
<style lang='less' scoped>
.el-input{
    width: 50%;
}
.el-form-item label {
    color: #9e9e9e;
    font-size: 12px;
    margin: 0 4% 0 2%;
}
.el-radio-group{
    width: 100%;
}
</style>