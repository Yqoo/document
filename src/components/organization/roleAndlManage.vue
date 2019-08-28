<!--
 * @Date: 2019-08-16 09:18:16
 * @LastEditors: Yqoo
 * @LastEditTime: 2019-08-28 16:34:35
 * @Desc: 组织与用户下的角色管理组件
 -->  
<template>
  <div class='roleAndlManage'>
    <div class="btnTools">
      <el-button-group>
        <el-button type="success" icon="el-icon-plus" size="mini" @click="addDialogVisible = true">添加</el-button>
        <el-button type="warning" icon="el-icon-edit" size="mini" @click="update">编辑</el-button>
        <el-button type="danger" icon="el-icon-delete" size="mini" @click="del">删除</el-button>
        <el-button type="primary" icon="el-icon-search" size="mini" @click='search'>搜索</el-button>
        <el-button type="info" icon="el-icon-refresh" size="mini" @click='refresh'>刷新</el-button>
      </el-button-group>
    </div>
    <el-table
      :data='tableData'
      stripe
      height='400'  
      style="width: 100%"
      size='mini'
      ref="roleTable"
      :highlight-current-row='true'
      @selection-change='selectRow'
      @row-click='rowClick'
    >
      <el-table-column
        fixed='left'
        type="selection"
        width='50'></el-table-column>
      <el-table-column
        prop='name'
        label='角色名'
      ></el-table-column>
      <el-table-column
        prop='roleAlias'
        label='角色别名'
      ></el-table-column>
      <el-table-column
        fixed='right'
        label='关联操作'
      >
        <template slot-scope="scope">
          <el-button type='text' icon='el-icon-edit' title='修改' @click.native.prevent='editRow( scope.$index, tableData )'></el-button>
          <el-button type='text' icon='el-icon-delete' title='删除' style="color:red" @click.native.prevent='deleteRow( scope.$index, tableData )'></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40, 50]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      style="margin-top:20px">
    </el-pagination>
    <el-dialog
      :visible.sync="addDialogVisible"
      v-dialogDrag
      :modal="false"
      width="30%"
      :close-on-click-modal="false"
      @close="dialogClose"
      >
      <div slot="title" class="msgTitle">
        <img :src="require('@/assets/image/icons/table/table-add.png')">
        <span v-if='isAdd'>添加角色</span>
        <span v-else>修改角色</span>
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
          <el-form-item label="角色别名" prop="roleAlias">
            <el-input v-model="addForm.roleAlias"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="roleNote">
            <el-input v-model="addForm.roleNote"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <el-button size="mini" type="info" @click=" addDialogVisible = false ">取消</el-button>
        <el-button size="mini" type="success" v-if="isAdd" @click.native.prevent="addRole">确认</el-button>
        <el-button size="mini" type="success" v-else @click.native.prevent="updateRole">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import qs from 'qs';
export default {
  name: 'roleAndlManage',
  components: {},
  data() {
    return {
      addDialogVisible:false,//控制添加表单的显示
      addForm:{
        name:'',
        roleAlias:'',
        roleNote:''
      },
      addRules:{
        name:[
          { required: true, message: '请输入名称', trigger: 'blur' },
        ],
        roleAlias:[
          { required: true, message: '请输入角色别名', trigger: 'blur' },
        ],
      },
      tableData:[],
      currentPage:1,
      total:0,
      size:10,
      chooseList:[],//被选中的行数据
      isAdd:true,
    };
  },
  created(){
    this.getPage();
  },
  methods:{
    getPage( page = 1,size = 10,s = '' ){//获取分页信息
      this.axios.get(`/role/pager?page=${page}&size=${size}&s=${s}`).then( suc => {
        if( suc.data.code === 200 ){
          this.tableData = suc.data.obj && suc.data.obj.records;
          this.total = suc.data.obj && suc.data.obj.total;
        } else {
          this.$message.srror( suc.data.desc );
        }
      }).catch( err => console.log( err ));
    },
    addRole(){//新增角色
      this.$refs.addForm.validate( valid => {
        if( valid ){
          this.axios.post('/role/add',qs.stringify(this.addForm)).then( success => {
            if( success.data.code === 200 ){
              this.$message.success('新增成功');
              this.addDialogVisible = false;
              this.getPage( this.currentPage,this.size );
            } else this.$message.error( success.data.desc );
          }).catch( err => this.$message.error('系统错误') );
        }
      })
    },
    handleSizeChange( size ){
      this.size = size;
      this.getPage( this.currentPage,size );
    },
    handleCurrentChange( page ){
      this.currentPage = page;
      this.getPage( page,this.size );
    },
    selectRow( selection ){//所选择行的数组
      this.chooseList = selection;
    },
    rowClick( row ){//table行点击事件
      this.$refs.roleTable.toggleRowSelection( row );
    },
    editRow( index,row ){
      this.isAdd = false;
      this.addDialogVisible = true;
      Object.assign( this.addForm,row[index] );
    },
    updateRole(){//修改保存
      let params = Object.assign({},this.addForm);
      delete params.createTime;
      this.axios.post('/role/update',qs.stringify(params)).then( res => {
        if( res.data.code === 200 ){
          this.$message.success('修改成功');
          this.addDialogVisible = false;
          this.getPage( this.currentPage,this.size );
        }
      }).catch( err => this.$message.info( '系统错误' ));
    },
    update(){//顶部工具栏的编辑
      if( this.chooseList.length === 1 ){
        this.isAdd = false;
        this.addDialogVisible = true;
        Object.assign( this.addForm,this.chooseList[0]);
      } else {
        this.$message.warning('请选择一行数据进行编辑修改');
      }
    },
    deleteRow( index,row ){
      this.$confirm('当前操作将彻底删除该行数据，是否继续？','提示',{
        confirmButtonText:'确定',
        cancalButtonText:'取消',
        type:'warning'
      }).then( () => {
        this.axios.post('/role/delete',qs.stringify({id:row[index].id})).then( res => {
          if( res.data.code === 200){
            row.splice( index,1 );
            this.$message.success('删除成功');
          } else {
            this.$message.error( res.data.desc );
          }
        })
      }).catch( () => this.$message.info('已取消删除'));
    },
    del(){//顶部工具栏的删除
      let list = this.chooseList;
      if( list.length === 0 ) this.$message.warning('请至少选择一行数据进行删除');
      else {
        let ids = list.map( item => item.id );
        this.$confirm('当前操作将彻底删除所选择的数据，是否继续？','提示',{
          confirmButtonText:'确定',
          cancalButtonText:'取消',
          type:'warning'
        }).then( () => {
          this.axios.post('/role/delete',qs.stringify({id:ids.join(',')})).then( res => {
            if( res.data.code === 200 ){
              let _tableData = [];//临时保存表数据
              this.tableData.forEach( (item,index) => {// 多删情况下先保存不需要被删的项，然后再替换回去
                if( ids.indexOf( item.id ) === -1){
                  _tableData.push( item );
                }
              });
              this.tableData = _tableData;
              this.tableData.length === 0 ? this.getPage( this.currentPage -= 1 ,this.size):this.getPage(this.currentPage,this.size);
              this.$message.success('删除成功');
            } else this.$message.error( res.data.desc );
          })
        }).catch( () => this.$message.info('已取消删除'))
      }
    },
    search(){
      this.$prompt('请输入关键词','搜索',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then( ({value} ) => {
        this.getPage( 1, this.size, value?value:'' );
      }).catch( () => {
        this.$message({
          type: 'warning',
          message: '取消搜索'
        });
      })
    },
    refresh(){
      this.getPage( this.currentPage,this.size );
    },
    dialogClose(){  
      Object.assign( this.addForm,{
        name:'',
        roleAlias:'',
        roleNote:''
      });
      this.isAdd = true;
    },
  },
}
</script>
<style lang='less' scoped>
  .roleAndlManage{
    padding: 10px 10px;
    & .btnTools {
      padding: 0px 0px 10px 10px;
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