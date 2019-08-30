<!--
 * @Date: 2019-08-16 09:18:16
 * @LastEditors: Yqoo
 * @LastEditTime: 2019-08-29 15:40:05
 * @Desc: 组织与用户下的员工用户组件
 -->
<template>
  <div class='staffUsers'>
    <div class="topBtns">
      <el-button-group>
        <el-button type='primary' size='mini' icon='el-icon-plus' @click=" addDialog = true ">添加</el-button>
        <el-button type='warning' size='mini' icon='el-icon-edit' @click="edit">编辑</el-button>
        <el-button type='danger' size='mini' icon='el-icon-delete' @click="del">删除</el-button>
        <el-button type='info' size='mini' icon='el-icon-search'>搜索</el-button>
        <el-button type='success' size='mini' icon='el-icon-refresh'>重置密码</el-button>
      </el-button-group>
    </div>
    <el-table
      :data='tableData'
      style="width:100%"
      stripe
      size='mini'
      ref='staffUserTable'
      @selection-change='selectRow'
      @row-click='rowClick'
      :highlight-current-row='true'
      >
      <el-table-column fixed='left' type='selection' width='50'></el-table-column>
      <el-table-column prop='name' label='姓名'></el-table-column>
      <el-table-column prop='account' label='用户名'  :show-overflow-tooltip='true'></el-table-column>
      <el-table-column prop='wcAccount' label='微信账号'  :show-overflow-tooltip='true'></el-table-column>
      <el-table-column prop='orgName' label='归属组织'  :show-overflow-tooltip='true'></el-table-column>
      <el-table-column prop='gender' label='性别'>
        <template slot-scope="scope">
          {{ scope.row.gender === 'female'?'女':'男'}}
        </template>
      </el-table-column>
      <el-table-column prop='createTime' label='创建时间'  :show-overflow-tooltip='true'></el-table-column>
      <el-table-column prop='status' label='状态' :formatter="formatter"></el-table-column>
      <el-table-column label='关联操作'>
        <template slot-scope="scope">
          <el-button type='text' icon='el-icon-refresh' title='重置密码' @click="handleRow('reset',scope.$index,scope.row)"></el-button>
          <el-button type='text' icon='el-icon-error' title='禁用' @click="handleRow('disabled',scope.$index,scope.row)"></el-button>
          <el-button type='text' icon='el-icon-document' title='明细' @click="handleRow('detail',scope.$index,scope.row)"></el-button>
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
      :visible.sync='addDialog'
      v-dialogDrag
      :modal="false"
      width="50%"
      :close-on-click-modal="false"  
      @close='dialogClose'
      >
      <div slot="title">
        <i class="el-icon-user-solid"></i>
        <span>个人信息</span>
      </div>
      <div>
        <el-tabs v-model='active'>
          <el-tab-pane label='基本资料' name='basicInfo'>
            <el-row>
              <el-col :span='5'>
                <el-button type='danger' size='mini' style="margin:5px 0px">删除照片</el-button>
                <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-col>
              <el-col :span='19'>
                <el-form
                  :model="basicInfoForm"
                  size='small'
                  :rules="basicInfoRules"
                  ref='basicInfoForm'
                  style="padding:10px;"
                  label-width='100px'
                >
                  <div class="flexBox">
                    <el-form-item prop='account' label='账号'>
                      <el-input v-model="basicInfoForm.account"></el-input>
                    </el-form-item>
                    <el-form-item prop='password' label='密码'>
                      <el-input type='password' v-model='basicInfoForm.password'></el-input>
                    </el-form-item>
                  </div>
                  <div class="flexBox">
                    <el-form-item label='是否是管理员' prop='isAdmin'>
                      <el-radio-group v-model='basicInfoForm.isAdmin'>
                        <el-radio label='Y'>是</el-radio>
                        <el-radio label='N'>否</el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item prop='name' label='员工姓名'>
                      <el-input v-model='basicInfoForm.name'></el-input>
                    </el-form-item>
                  </div>
                  <div class="flexBox">
                    <el-form-item label='性别' prop='gender'>
                      <el-radio-group v-model='basicInfoForm.gender'>
                        <el-radio label='male'>男</el-radio>
                        <el-radio label='female'>女</el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item label='员工状态' prop='status'>
                      <el-select v-model='basicInfoForm.status'>
                        <el-option v-for='(op,key) in options' :label='op' :value='key' :key="key"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="flexBox">
                    <el-form-item label='邮箱' prop='email'>
                      <el-input v-model='basicInfoForm.email'></el-input>
                    </el-form-item>
                    <el-form-item label='地址' prop='address'>
                      <el-input v-model='basicInfoForm.address'></el-input>
                    </el-form-item>
                  </div>
                  <div class="flexBox">
                    <el-form-item label='电话' prop='mobile'>
                      <el-input v-model='basicInfoForm.mobile'></el-input>
                    </el-form-item>
                    <el-form-item label='QQ' prop='qq'>
                      <el-input v-model='basicInfoForm.qq'></el-input>
                    </el-form-item>
                  </div>
                  <div class="flexBox">
                    <el-form-item label='微信' prop='wcAccount'>
                      <el-input v-model='basicInfoForm.wcAccount'></el-input>
                    </el-form-item>
                  </div>
                </el-form>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label='扩展属性' name='extendAttr'>extendAttr</el-tab-pane>
          <el-tab-pane label='组织信息' name='organizeInfo'>organizeInfo</el-tab-pane>
          <el-tab-pane label='岗位信息' name='postInfo'>postInfo</el-tab-pane>
          <el-tab-pane label='角色信息' name='roleInfo'>
            <el-row>
              <el-col :span='5'>
               <!--  <el-tree
                  :data="data"
                  show-checkbox
                  node-key="id"
                  default-expand-all
                  :expand-on-click-node="false"
                  :render-content="renderContent">
                </el-tree> -->
              </el-col>
              <el-col :span='1'></el-col>
              <el-col :span='18'></el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label='用户组信息' name='userGroupInfo'>userGroupInfo</el-tab-pane>
        </el-tabs>
      </div>
      <div slot="footer">
        <el-button type='success' size='mini' @click='confirm'>确定</el-button>
        <el-button type='info' size='mini'>取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import qs from 'qs';
export default {
  name: 'staffUsers',
  components: {},
  data() {
    let checkAccount = ( rule, value, fn ) => {
      if( value ){
        let reg = /^[A-Za-z][A-Za-z0-9]{2,}$/;
        reg.test( value ) && fn() || fn( new Error('由数字字母组成，以字母开头，至少3位'))
      } else fn( new Error('请输入账号，至少3位字符长度'))
    };
    let checkEmail = ( rule, value, fn ) => {
      if( value ){
        let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        reg.test( value ) && fn() || fn( new Error('请输入正确的邮箱地址'));
      } else fn( new Error('请输入邮箱地址'));
    };
    return {
      addDialog:false,//控制新建个人信息框的显示
      active:'basicInfo',//新建框下默认展示的tab
      imageUrl:'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',//头像图片地址
      tableData:[],
      total:0,
      size:10,
      currentPage:1,
      chooseList:'',
      isAdd:true,
      basicInfoForm:{
        account:'',
        password:'',
        isAdmin:'N',
        name:'',
        status:'',
        gender:'female',
        email:'',
        address:'',
        mobile:'',
        qq:'',
        wcAccount:''
      },
      basicInfoRules:{
        account:[
          { validator: checkAccount, trigger: 'blur' }
        ],
        password:[
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '长度至少 6 个字符', trigger: 'blur' }
        ],
        name:[
          { required: true, message: '请输入姓名', trigger: 'blur' },
        ],
        email:[
          { validator: checkEmail, trigger: 'blur' }
        ],
        status:[
          { required: true, message: '请选择员工状态', trigger: 'blur' },
        ],
      },
      options:{},
    };
  },
  created(){
    this.axios.get('/employee/userStatus').then( res => {//获取用户状态options
      res.data.code === 200 && ( Object.assign( this.options,res.data.obj ));
    });
    this.axios.get('/role/roleTree').then( res => {
      console.log( res )
    })
    this.getPage();
  },
  methods:{
    getPage( page = 1,size = 10 ){
      this.axios.get(`employee/pager?page=${page}&size=${size}`).then( res => {
        if( res.data.code === 200 ){
          this.tableData = res.data.obj && res.data.obj.records;
          this.total = res.data.obj.total;
        }
      })
    },
    handleAvatarSuccess(){},
    beforeAvatarUpload(){},
    confirm(){//表单提交
      this.$refs.basicInfoForm.validate( valid => {
        if( valid ) {
          let url = this.isAdd?'/employee/add':'/employee/update';
          this.axios.post(url,qs.stringify( this.basicInfoForm)).then( res => {
            console.log( res )
          }).catch( err => console.log( err ));
        }
      })
    },
    selectRow( selection ){
      this.chooseList = selection;
    },
    rowClick( row ){
      this.$refs.staffUserTable.toggleRowSelection( row );
    },
    formatter( row, column, cellValue, index ){
      return this.options[cellValue];
    },
    handleRow( type, index, row ){
      let methods = {
        reset: () => { 
          this.$prompt('请输入新密码','提示',{
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputPattern:/^[A-Za-z0-9]{6,}$/,
            inputType:'password',
            inputErrorMessage: '密码长度低于6位'
          }).then( ({value}) => {
            console.log( value )
          }).catch( () => this.$message.info('取消重置'))
        },
        disabled: () => { console.log( 'disabled ')},
        detail: () => { console.log( 'detail ')},
      };
      methods[type]();
    },
    handleSizeChange( val ){//每页显示条数改变的回调
      this.size = val;
      this.getPage(this.currentPage,val);
    },
    handleCurrentChange( val ){//当前页改变的回调
      this.currentPage = val;
      this.getPage(val,this.size);
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
          let ids = list.map( ( item,v ) => item.id );
          this.axios.post('/employee/delete',qs.stringify({id:ids.join(',')})).then( res => {
            if( res.data.code === 200 ){
              let _tableData = [];//临时保存表数据
              this.tableData.forEach( (item,index) => {// 多删情况下先保存不需要被删的项，然后再替换回去
                if( ids.indexOf( item.id ) === -1){
                  _tableData.push( item );
                }
              });
              this.tableData = _tableData;
              this.tableData.length === 0 ? this.getPage( this.currentPage -= 1 ,this.size):this.getPage(this.currentPage,this.size);
            } else this.$message.error( res.data.desc );
          }).catch( err => this.$message.error( 'err' ));
        }).catch( () => this.$message.info('已取消删除'))
      }
    },
    edit(){
      if( this.chooseList.length === 1 ){
        this.isAdd = false;
        this.addDialog = true;
        Object.assign( this.basicInfoForm,this.chooseList[0]);
      } else {
        this.$message.warning('请选择一行数据进行编辑修改');
      }
    },
    dialogClose(){
      this.isAdd = true;
    },
  }
}
</script>
<style lang='less' scoped>
  .staffUsers{
    & .topBtns {
      padding: 10px 0px;
    }
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 158px;
    height: 158px;
    line-height: 158px;
    text-align: center;
    border: 1px dashed #ddd;
  }
  .avatar {
    width: 158px;
    height: 158px;
    display: block;
  }
  .el-form {
    & .flexBox {
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;
    }
  }
</style>