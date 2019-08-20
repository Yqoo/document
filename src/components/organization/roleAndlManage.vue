<!--
 * @Date: 2019-08-16 09:18:16
 * @LastEditors: Yqoo
 * @LastEditTime: 2019-08-20 17:20:32
 * @Desc: 组织与用户下的角色管理组件
 -->  
<template>
  <div class='roleAndlManage'>
    <div class="btnTools">
      <el-button-group>
        <el-button type="primary" icon="el-icon-search" size="mini">搜索</el-button>
        <el-button type="success" icon="el-icon-plus" size="mini" @click="addDialogVisible = true">添加</el-button>
        <el-button type="warning" icon="el-icon-edit" size="mini">编辑</el-button>
        <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
      </el-button-group>
    </div>
    <el-dialog
      :visible.sync="addDialogVisible"
      v-dialogDrag
      :modal="false"
      width="30%"
      :close-on-click-modal="false"
      >
      <div slot="title" class="msgTitle">
        <img :src="require('@/assets/image/icons/table/table-add.png')">
        <span>添加角色</span>
      </div>
      <div>
        <el-form
          ref="addForm"
          :model="addForm"
          :rules="addRules"
          size="small"
          label-position="left"
          >
          <el-form-item label="名称" prop="name">
            <el-input v-model="addForm.name"></el-input>
          </el-form-item>
          <el-form-item label="角色别名" prop="alias">
            <el-input v-model="addForm.alias"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="desc">
            <el-input v-model="addForm.desc"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <el-button size="mini" type="info">取消</el-button>
        <el-button size="mini" type="success">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'roleAndlManage',
  components: {},
  data() {
    return {
      addDialogVisible:false,//控制添加表单的显示
      addForm:{
        name:'',
        alias:'',
        desc:''
      },
      addRules:{
        name:[
          { required: true, message: '请输入名称', trigger: 'blur' },
        ],
        alias:[
          { required: true, message: '请输入角色别名', trigger: 'blur' },
        ],
      },
    };
  },
}
</script>
<style lang='less' scoped>
  .roleAndlManage{
    padding: 10px 20px;
    & .btnTools {
      text-align: right;
    }
    & .msgTitle {
      & img {
        width: 20px;
        vertical-align:bottom;
        padding-right: 5px;
      }
    }
  }
</style>