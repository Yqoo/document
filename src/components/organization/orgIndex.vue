<!--
 * @Date: 2019-08-15 18:00:06
 * @LastEditors: Yqoo
 * @LastEditTime: 2019-08-16 09:33:57
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
          <el-menu :default-active="active">
            <el-menu-item v-for="(menu,key) in leftMenus" :key="key" :index="menu.name" @click="changeMenu(menu.name)">
              <img :src="menu.img">
              <span slot="title">{{menu.title}}</span>
            </el-menu-item>
          </el-menu>
        </div>
      </el-col>
      <el-col :span="21">
        <component :is="current"></component>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import levelManage from "@/components/organization/levelManage.vue";
import extended from "@/components/organization/extended.vue";
import orgAndManage from "@/components/organization/orgAndManage.vue";
import grader from "@/components/organization/grader.vue";
import postAndManage from "@/components/organization/postAndManage.vue";
import roleAndlManage from "@/components/organization/roleAndlManage.vue";
import staffUsers from "@/components/organization/staffUsers.vue";
import leaderMember from "@/components/organization/leaderMember.vue";
import usergroup from "@/components/organization/usergroup.vue";
export default {
  name: 'orgIndex',
  components: {
    levelManage,
    extended,
    orgAndManage,
    grader,
    postAndManage,
    roleAndlManage,
    staffUsers,
    leaderMember,
    usergroup
  },
  data() {
    return {
      leftMenus:[
        { name:'levelManage',title:'等级管理',img:require('@/assets/image/icons/appIcons/org-level.png') },
        { name:'extended',title:'扩展属性',img:require('@/assets/image/icons/appIcons/org-extend.png') },
        { name:'orgAndManage',title:'组织管理',img:require('@/assets/image/icons/appIcons/org-orgAndManage.png') },
        { name:'grader',title:'分级组织',img:require('@/assets/image/icons/appIcons/org-grader.png') },
        { name:'postAndManage',title:'岗位管理',img:require('@/assets/image/icons/appIcons/org-postAndManage.png') },
        { name:'roleAndlManage',title:'角色管理',img:require('@/assets/image/icons/appIcons/org-roleAndlManage.png') },
        { name:'staffUsers',title:'员工用户',img:require('@/assets/image/icons/appIcons/org-staffUsers.png') },
        { name:'leaderMember',title:'上下级关系',img:require('@/assets/image/icons/appIcons/org-leaderMember.png') },
        { name:'usergroup',title:'用户组',img:require('@/assets/image/icons/appIcons/org-usergroup.png') },
      ],
      current:'levelManage',//默认右侧显示等级管理
      active:'levelManage',//默认激活
    };
  },
  methods:{
    changeMenu( name ){//切换菜单
      this.current = name;
    },
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
    & .el-menu {
      border: none!important;
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