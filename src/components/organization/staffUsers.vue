<!--
 * @Date: 2019-08-16 09:18:16
 * @LastEditors: Yqoo
 * @LastEditTime: 2019-08-28 18:36:56
 * @Desc: 组织与用户下的员工用户组件
 -->
<template>
  <div class='staffUsers'>
    <div class="topBtns">
      <el-button-group>
        <el-button type='primary' size='mini' icon='el-icon-plus' @click=" addDialog = true ">添加</el-button>
        <el-button type='warning' size='mini' icon='el-icon-edit'>编辑</el-button>
        <el-button type='danger' size='mini' icon='el-icon-delete'>删除</el-button>
        <el-button type='info' size='mini' icon='el-icon-search'>搜索</el-button>
        <el-button type='success' size='mini' icon='el-icon-refresh'>重置密码</el-button>
      </el-button-group>
    </div>
    <el-dialog
      :visible.sync='addDialog'
      v-dialogDrag
      :modal="false"
      width="60%"
      :close-on-click-modal="false"  
    >
      <div slot="title">
        <i class="el-icon-user-solid"></i>
        <span>个人信息</span>
      </div>
      <div>
        <el-tabs v-model='active'>
          <el-tab-pane label='基本资料' name='basicInfo'>
            <el-row>
              <el-col :span='7'>
               <!--  <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload> -->
                1
              </el-col>
              <el-col :span='17'>
                <el-form
                  :model="basicInfoForm"
                  size='small'
                  :rules="basicInfoRules"
                  ref='basicInfoForm'
                  style="padding:10px;"
                  label-width='100px'
                  :inline='true'
                >
                  <el-form-item prop='account' label='账号'>
                    <el-input v-model="basicInfoForm.account"></el-input>
                  </el-form-item>
                  <el-form-item prop='password' label='密码'>
                    <el-input v-model='basicInfoForm.password'></el-input>
                  </el-form-item>
                  <el-form-item prop='name' label='员工姓名'>
                    <el-input v-model='basicInfoForm.name'></el-input>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label='扩展属性' name='extendAttr'>extendAttr</el-tab-pane>
          <el-tab-pane label='组织信息' name='organizeInfo'>organizeInfo</el-tab-pane>
          <el-tab-pane label='岗位信息' name='postInfo'>postInfo</el-tab-pane>
          <el-tab-pane label='角色信息' name='roleInfo'>roleInfo</el-tab-pane>
          <el-tab-pane label='用户组信息' name='userGroupInfo'>userGroupInfo</el-tab-pane>
        </el-tabs>
      </div>
      <div slot="footer">
        <el-button type='success' size='mini'>确定</el-button>
        <el-button type='info' size='mini'>取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'staffUsers',
  components: {},
  data() {
    return {
      addDialog:false,//控制新建个人信息框的显示
      active:'basicInfo',//新建框下默认展示的tab
      imageUrl:'',//头像图片地址
      basicInfoForm:{
        accout:'',
        password:'',
        isAdmin:false,
        name:'',
        status:'',
        sex:'',
        email:'',
        address:'',
        phone:'',
        QQ:'',
        wx:''
      },
      basicInfoRules:{},
    };
  },
  methods:{
    handleAvatarSuccess(){},
    beforeAvatarUpload(){},
  },
}
</script>
<style lang='less' scoped>
  .staffUsers{
    & .topBtns {
      padding: 10px 0px;
    }
  }
</style>