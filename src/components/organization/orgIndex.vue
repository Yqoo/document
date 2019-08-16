<!--
 * @Date: 2019-08-15 18:00:06
 * @LastEditors: Yqoo
 * @LastEditTime: 2019-08-15 18:32:34
 * @Desc: 组织与用户组件
 -->
<template>
  <div class='orgIndex'>
    <el-row>
      <el-col :span="3">
        <div class="leftTop">
          <img :src="require('@/assets/image/icons/deskIcons/icon-organization.png')" >
          <p>组织与用户</p>
        </div>
        <div class="leftMenus">
          <el-menu>
            <el-menu-item v-for="(menu,key) in leftMenus" :key="key">
              <img :src="menu.img">
              <span slot="title">{{menu.title}}</span>
            </el-menu-item>
          </el-menu>
        </div>
      </el-col>
      <el-col :span="21">2</el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  name: 'orgIndex',
  components: {},
  data() {
    return {
      leftMenus:[
        { name:'levelManage',title:'等级管理',img:require('@/assets/image/icons/appIcons/org-level.png') },
        { name:'extended',title:'扩展属性',img:require('@/assets/image/icons/appIcons/org-extend.png') },
        { name:'orgAndManage',title:'组织管理',img:'' },
        { name:'grader',title:'分级组织',img:'' },
        { name:'postAndManage',title:'岗位管理',img:'' },
        { name:'roleAndlManage',title:'角色管理',img:'' },
        { name:'staffUsers',title:'员工用户',img:'' },
        { name:'leaderMember',title:'上下级关系',img:'' },
        { name:'usergroup',title:'用户组',img:'' },
      ],
    };
  },
}
</script>
<style lang='less' scoped>
  .orgIndex {
    font-size: 12px;
    & .leftTop {
      padding: 10px;
      text-align: center;
      border-bottom: 1px solid #ddd;
      & img {
        width: 80px;
      }
    }
    & .el-menu-item {
      height: 35px;
      line-height: 35px;
      font-size: 12px;
      & img {
        width: 18px;
      }
      & span {
        padding-left: 3px;
      }
    }
  }
</style>