<!--
 * @Date: 2019-08-16 09:18:16
 * @LastEditors: Yqoo
 * @LastEditTime: 2019-08-27 18:28:27
 * @Desc: 组织与用户下的等级管理组件
 -->
<template>
  <div class='levelManage'>
    <div class="topBtns">
      <el-button size='mini' icon="el-icon-circle-plus-outline" type="primary" plain @click="dialogAddvisible = true ">新建</el-button>
      <el-button size='mini' icon="el-icon-edit" type="success" plain @click='edit'>编辑</el-button>
      <el-button size='mini' icon="el-icon-delete" type="danger" plain @click="del">删除</el-button>
      <el-button size='mini' icon="el-icon-refresh" type="warning" plain>刷新</el-button>
      <el-button size='mini' icon="el-icon-search" type="normal" plain @click="search">搜索</el-button>
      <el-button size='mini' icon="el-icon-warning-outline" type="info" plain>帮助</el-button>
    </div>
    <el-table
      :data='tableData'
      stripe
      height='400'  
      style="width: 100%"
      size='mini'
      ref='levelTable'
      @selection-change='selectRow'
      @row-click='rowClick'
      >
      <el-table-column
        fixed='left'
        type="selection"
        width='50'
      ></el-table-column>
      <el-table-column
        prop='name'
        label='名称'
      ></el-table-column>
      <el-table-column
        prop='type'
        label='组织类型'
      ></el-table-column>
      <el-table-column
        prop='level'
        label='级别值'
      ></el-table-column>
      <el-table-column
        prop='createBy'
        label='创建人'
      ></el-table-column>
      <el-table-column
        prop='createTime'
        label='创建时间'
        :show-overflow-tooltip='true'
      ></el-table-column>
      <el-table-column
        fixed='right'
        label='关联操作'
        >
        <template slot-scope="scope">
          <el-button type='text' icon='el-icon-edit' title='修改' @click.native.prevent='editRow(scope.$index, tableData)'></el-button>
          <el-button type='text' icon='el-icon-delete' title='删除' style='color:red' @click.native.prevent='deleteRow(scope.$index, tableData)'></el-button>
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
      width="30%"
      v-dialogDrag
      :modal="true"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      :visible.sync="dialogAddvisible">
      <div slot="title" class="msgTitle">
        <img :src="require('@/assets/image/icons/table/table-add.png')">
        <span v-if='isAdd'>新建</span>
        <span v-else>编辑</span>
      </div>
      <div class="msgBody">
        <el-form
          :model="addForm"
          :rules="addRules"
          ref="addForm"
          size="mini"
          label-width="80px"
          class="demo-ruleForm"
          status-icon>
          <el-form-item label="名称" prop="name">
            <el-input v-model="addForm.name"></el-input>
          </el-form-item>
          <el-form-item  label="组织类型" prop="type">
            <el-select v-model="addForm.type">
              <el-option v-for=" (o,key) in options" :key="key" :label='o' :value='key'></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="级别值" prop="level">
            <el-input v-model="addForm.level"></el-input>
          </el-form-item>
          <el-form-item label="图标" prop="icon" >
            <el-input v-model="addForm.icon" @focus="dialogIcons = true"></el-input>
          </el-form-item>
          <el-form-item label="创建人" prop="creater">
            <el-input v-model="addForm.createBy" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="创建时间" prop="time">
            <el-input v-model="addForm.createTime" :disabled="true"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <div class="customBtn" v-if="isAdd">
          <el-radio v-model="confirm" label="confirmAndcontinue">确认并创建</el-radio>
          <el-radio v-model="confirm" label="confirmAndclose">确认并关闭</el-radio>
        </div>
        <el-button v-if="isAdd" size="mini" type="success" @click='confirmAdd'>确认</el-button>
        <el-button v-else size="mini" type="success" @click='update'>确认</el-button>
        <el-button size="mini" type="danger" @click='dialogAddvisible = false'>关闭</el-button>
      </div>
    </el-dialog>
    <el-dialog
      width="30%"
      v-dialogDrag
      :modal="true"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      :visible.sync="dialogIcons">
      <div slot="title">
        <i class="el-icon-more"></i>
        <span>图标选择</span>
      </div>
      <icons @chooseIcon="chooseIcon"></icons>
      <div slot="footer">
        <el-button type='warning' size='mini' @click='dialogIcons = false'>取消</el-button>
        <el-button type='success' size='mini' @click='confirmIcon'>确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import tools from  "@/assets/js/utils/tools.js";
import icons from  "@/views/icons.vue";
import qs from 'qs';
export default {
  name: 'levelManage',
  components: {
    icons
  },
  data() {
    let isNumber = ( rule,value,fn ) => {
      if( value ){
        let reg = /^[+]{0,1}(\d+)$/;
        if( !reg.test(value) ){
          fn( new Error('请输入正整数'));
        } else fn();
      } else fn( new Error('请输入级别值'));
    }
    return {
      tableData:[],
      dialogAddvisible:false,//控制显示新建框
      confirm:'confirmAndcontinue',
      addForm:{
        name:'',
        type:'',
        level:'',
        icon:'',
        createBy:'',
        createTime:tools._time()
      },
      addRules:{
        name:[
          { required: true, message: '请输入名称', trigger: 'blur' },
        ],
        type: [
          { required: true, message: '请选择类型', trigger: 'blur' },
        ],
        level: [
          { validator: isNumber, trigger: 'blur' },
        ],
       /*  icon: [
          { required: true, message: '请选择图标', trigger: 'blur' },
        ], */
      },
      total:0,//表格数据总条数
      currentPage:1,//当前页
      size:10,//每页显示条数
      options:{},
      dialogIcons:false,
      iconName:'',
      chooseList:[],//被选中的行数据
      isAdd:true,//是否是新增

    };
  },
  created(){
    this.axios.get('/partyLevel/getType').then( res => {
      if( res.data.code === 200 ){
        this.addForm.createBy = res.data.obj.createBy;
        delete res.data.obj.createBy;
        Object.assign( this.options,res.data.obj );
      }
    });
    this.getPage();
  },
  methods:{
    getPage( page = 1,size = 10,s = '' ){
      this.axios.get(`/partyLevel/pager?page=${page}&size=${size}&s=${s}`).then( res => {
        if( res.data.code === 200 ){
          this.tableData = res.data.obj && res.data.obj.records;
          this.total = res.data.obj.total;
        }
      })
    },
    editRow( index,row ){//行编辑
      this.isAdd = false;
      this.dialogAddvisible = true;
      Object.assign( this.addForm,row[index] );
    },
    edit(){//顶部按钮修改
      let list = this.chooseList;
      if( list.length !== 1 )  this.$message.warning('请选择一行数据进行编辑');
      else {
        this.isAdd = false;
        this.dialogAddvisible = true;
        Object.assign( this.addForm,list[0] );
      }
    },
    update(){//修改保存
      this.$refs.addForm.validate( valid => {
        if( valid ){
          if( this.addForm.icon ){
            delete this.addForm.createTime;
            this.axios.post('/partyLevel/update',qs.stringify(this.addForm)).then( res => {
              if( res.data.code === 200 ){
                this.$message.success('修改成功');
                this.getPage( this.currentPage,this.size);
                this.dialogAddvisible = false;
                this.isAdd = true;
              } else this.$message.info( res.data.desc );
            }).catch( err =>this.$message.error(err));
          } else {
            this.$message.error('请选择图标');
            return;
          }
        }
      })
    },
    deleteRow( index,row ){//行删除
      this.$confirm('当前操作将彻底删除该行数据，是否继续？','提示',{
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        type:'warning'
      }).then( () => {
        this.axios.post('/partyLevel/deleteById',qs.stringify({id:row[index].id})).then( res => {
          res.data.code === 200 && ( row.splice(index,1) );
        }).catch( err => this.$message.error( err ));
      }).catch( () => this.$message.info('已取消删除'))
    },
    del(){
      let list = this.chooseList;
      if( list.length === 0 )  this.$message.warning('请至少选择一行数据进行删除');
      else {
        this.$confirm('当前操作将彻底删除该行数据，是否继续？','提示',{
          confirmButtonText:'确定',
          cancelButtonText:'取消',
          type:'warning'
        }).then( () => {
          let ids = [];
          ids = list.map( ( item,v ) => {
            return item.id;
          });
          this.axios.post('/partyLevel/deleteById',qs.stringify({id:ids.join(',')})).then( res => {
            res.data.code === 200 && ( row.splice(index,1) );
          }).catch( err => this.$message.error( err ));
        }).catch( () => this.$message.info('已取消删除'))
      }
    },
    selectRow( selection ){
      this.chooseList = selection;
    },
    rowClick( row ){
      this.$refs.levelTable.toggleRowSelection( row );
    },
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
    chooseIcon( icon ){
      this.iconName = icon.desc;
    },
    confirmIcon(){
      this.addForm.icon = this.iconName;
      this.dialogIcons = false;
    },
    confirmAdd(){
      this.$refs.addForm.validate( valid => {
        if( valid ){
          if( this.addForm.icon ){
            this.axios.post('/partyLevel/add',qs.stringify(this.addForm)).then( res => {
              if( res.data.code === 200 ){
                this.$message.success('新建成功');
                this.getPage( this.currentPage,this.size);
                if( this.confirm === 'confirmAndcontinue' )  this.$refs.addForm.resetFields();
                else this.dialogAddvisible = false;
              } else this.$message.info( res.data.desc );
            }).catch( err =>this.$message.error(err));
          } else {
            this.$message.error('请选择图标');
            return;
          }
        }
      })
    },
    handleSizeChange( val ){//每页显示条数改变的回调
      this.size = val;
      this.getPage(this.currentPage,val);
    },
    handleCurrentChange( val ){//当前页改变的回调
      this.currentPage = val;
      this.getPage(val,this.size);
    }
  },
  watch:{
    dialogAddvisible( newV,oldV ){
      if( !newV ){
        this.$refs.addForm.resetFields();
      }
    },
  },
}
</script>
<style lang='less' scoped>
  .topBtns {
    margin: 10px;
  }
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