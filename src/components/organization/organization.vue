/** 
组织与用户组件

*/
<template>
  <div class="organization">
    <div class="top">
      <i class="el-icon-user-solid"></i><span class="myFont">组织与用户</span>
    </div>
    <el-tabs type='card' v-model="activeTab">
      <el-tab-pane label="组织等级" name='org-level'>组织等级</el-tab-pane>
      <el-tab-pane label="组织管理" name='org-manage'>组织管理</el-tab-pane>
      <el-tab-pane label="岗位管理" name='post-manage'>岗位管理</el-tab-pane>
      <el-tab-pane label="角色管理" name='role-manage'>角色管理</el-tab-pane>
      <el-tab-pane label="分级组织" name='grading-org'>分级组织</el-tab-pane>
      <el-tab-pane label="参与者属性" name='participant'>参与者属性</el-tab-pane>
      <el-tab-pane label="员工" name='employes'>员工</el-tab-pane>
      <el-tab-pane label="用户" name='user'>用户</el-tab-pane>
      <el-tab-pane label="上下级" name='supAsub'>上下级</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "organization",
  data() {
    return {
      activeTab:'org-level'
    };
  }
};
</script>
<style lang='less' scoped>
  .organization {
    padding:10px;
    & .top {
      box-sizing: border-box;
      margin-bottom: 3px;
    }
    & .myFont {
      font-size:12px;
      padding-left:10px;
    }
    & /deep/ .el-tabs__item{
      padding: 0 13px;
      line-height: 35px;
      height: 35px;
      font-size: 12px;
    }
  }
</style>