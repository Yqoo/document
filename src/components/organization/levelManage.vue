<!--
 * @Date: 2019-08-16 09:18:16
 * @LastEditors: Yqoo
 * @LastEditTime: 2019-08-16 14:01:54
 * @Desc: 组织与用户下的等级管理组件
 -->
<template>
  <div class='levelManage'>
    <vxe-toolbar>
      <template v-slot:buttons>
        <el-button size='mini' icon="el-icon-circle-plus-outline" type="primary" plain @click="dialogAddvisible = true ">新建</el-button>
        <el-button size='mini' icon="el-icon-edit" type="success" plain>编辑</el-button>
        <el-button size='mini' icon="el-icon-delete" type="danger" plain>删除</el-button>
        <el-button size='mini' icon="el-icon-refresh" type="warning" plain>刷新</el-button>
        <el-button size='mini' icon="el-icon-search" type="normal" plain @click="search">搜索</el-button>
        <el-button size='mini' icon="el-icon-warning-outline" type="info" plain>帮助</el-button>
      </template>
    </vxe-toolbar>
    <vxe-table
      ref="levelTable"
      :data.sync="tableData"
      show-overflow
      size="mini"
      max-height="400"
      header-align="center"
      align="center"
      highlight-hover-row
      highlight-current-row>
      <vxe-table-column type='selection' width="50" fixed="left"></vxe-table-column>
      <vxe-table-column field="name" title="名称" width="150" ></vxe-table-column>
      <vxe-table-column field="type" title="组织类型" width="150" ></vxe-table-column>
      <vxe-table-column field="level" title="级别值" width="100" ></vxe-table-column>
      <vxe-table-column field="creater" title="创建人" width="100" ></vxe-table-column>
      <vxe-table-column field="time" title="创建时间" width="120" ></vxe-table-column>
      <vxe-table-column  title="相关操作" fixed="right" width="150">
        <template v-slot="{row}">
          <template>
            <i class="el-icon-edit toolsIcon" title="编辑" style="color:#46cdcf"></i>
            <i class="el-icon-delete toolsIcon" title="删除" style="color:#e84545"></i>
          </template>
        </template>
      </vxe-table-column>
    </vxe-table>
    <el-dialog
      width="30%"
      v-dialogDrag
      :modal="true"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      :visible.sync="dialogAddvisible">
      <div slot="title" class="msgTitle">
        <img :src="require('@/assets/image/icons/table/table-add.png')">
        <span>新建</span>
      </div>
      <div class="msgBody">
        <el-form
          :model="addForm"
          :rules="addRules"
          ref="addForm"
          size="mini"
          label-width="80px"
          class="demo-ruleForm">
          <el-form-item label="名称" prop="name">
            <el-input v-model="addForm.name"></el-input>
          </el-form-item>
          <el-form-item  label="组织类型" prop="type">
            <el-select v-model="addForm.type" >
              <el-option label="集团" value="jt"></el-option>
              <el-option label="公司" value="gs"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="级别值" prop="level">
            <el-input v-model="addForm.level"></el-input>
          </el-form-item>
          <el-form-item label="图标" prop="icon">
            <el-input v-model="addForm.icon"></el-input>
          </el-form-item>
          <el-form-item label="创建人" prop="creater">
            <el-input v-model="addForm.creater" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="创建时间" prop="time">
            <el-input v-model="addForm.time" :disabled="true"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <div class="customBtn">
          <el-radio v-model="confirm" label="confirmAndcontinue">确认并创建</el-radio>
          <el-radio v-model="confirm" label="confirmAndclose">确认并关闭</el-radio>
        </div>
        <el-button size="mini" type="success">确认</el-button>
        <el-button size="mini" type="danger">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'levelManage',
  components: {},
  data() {
    return {
      tableData:[
        { name:'集团',type:'机构',level:'1',creater:'系统管理员',time:'2019-08-12' }
      ],
      dialogAddvisible:false,//控制显示新建框
      confirm:'confirmAndcontinue',
      addForm:{
        name:'',
        type:'',
      },
      addRules:{
        name:[
          { required: true, message: '请输入名称', trigger: 'blur' },
        ],
        type: [
          { required: true, message: '请选择类型', trigger: 'blur' },
        ],
        level: [
          { required: true, message: '请输入级别', trigger: 'blur' },
        ],
        icon: [
          { required: true, message: '请选择图标', trigger: 'blur' },
        ],
      },
    };
  },
  methods:{
    search(){
      this.$prompt('请输入关键词','搜索',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then( ({value} ) => {
        console.log( value )
      }).catch( () => {
        this.$message({
          type: 'warning',
          message: '取消搜索'
        });
      })
    },
  },
}
</script>
<style lang='less' scoped>
  .toolsIcon{
    padding-right: 5px;
    font-size: 15px;
    cursor: pointer;
  }
  .customBtn {
    position: absolute;
    bottom: 15px;
  }
  .msgTitle {
    & img {
      width: 20px;
      vertical-align:bottom;
    }
    & span {
      padding-left: 5px;
    }
  }


</style>