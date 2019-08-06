<template>
  <div class='config'>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="系统设置" name="systemSetting">
        <SystemSetting></SystemSetting>
      </el-tab-pane>
      <el-tab-pane label="用户目录" name="userDirectory">用户目录</el-tab-pane>
      <el-tab-pane label="共享目录" name="shareDirectory">共享目录</el-tab-pane>
      <el-tab-pane label="组织目录" name="organizeDirectory">组织目录</el-tab-pane>
      <el-tab-pane label="后缀图标" name="suffixIcon">
        <SuffixIcon></SuffixIcon>
      </el-tab-pane>
      <el-tab-pane label="备份与恢复" name="backupRecovery">备份与恢复</el-tab-pane>
      <el-tab-pane label="日志管理" name="logManagement">日志管理</el-tab-pane>
      <el-tab-pane label="授权信息" name="licenseInfo">授权信息</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

import SystemSetting from '@/components/systemConfig/systemSetting.vue';
import SuffixIcon from '@/components/systemConfig/suffixIcon.vue';
export default {
    name:'config',
    components: {
      SystemSetting,
      SuffixIcon,
    },
    data() {
        return {
          activeName: 'systemSetting'
        };
    },
    methods: {
      handleClick(tab, event) {
        // console.log(tab, event);
      }
    }
}
</script>
<style lang='less' scoped>
.config{
  padding: 10px;
  & /deep/ .el-tabs__item{
    padding: 0 13px;
    line-height: 35px;
    height: 35px;
    font-size: 12px;
  }
}
</style>