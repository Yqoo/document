<!--
 * @Date: 2019-08-16 09:18:16
 * @LastEditors: Yqoo
 * @LastEditTime: 2019-08-31 19:38:18
 * @Desc: 组织与用户下的员工用户组件
 -->
<template>
  <div class='staffUsers' v-loading="loading">
    <div class="topBtns">
      <el-button-group>
        <el-button type='primary' size='mini' icon='el-icon-plus' @click=" addDialog = true ">添加</el-button>
        <el-button type='warning' size='mini' icon='el-icon-edit' @click="edit">编辑</el-button>
        <el-button type='danger' size='mini' icon='el-icon-delete' @click="del">删除</el-button>
        <el-button type='success' size='mini' icon='el-icon-search' @click='searchDialog = true'>搜索</el-button>
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
      height='400'
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
          <el-button type='text' icon='el-icon-error' style='color:#f38181' title='禁用' v-if="scope.row.status === 'actived'" @click="handleRow('disabled',scope.$index,scope.row)"></el-button>
          <el-button type='text' icon='el-icon-success' title='激活' v-else @click="handleRow('disabled',scope.$index,scope.row)"></el-button>
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
                    <el-form-item prop='password' label='密码' v-if="isAdd">
                      <el-input type='password' v-model='basicInfoForm.password'></el-input>
                    </el-form-item>
                  </div>
                  <div class="flexBox">
                    <el-form-item label='是否是管理员' prop='isSuper'>
                      <el-radio-group v-model='basicInfoForm.isSuper'>
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
          <el-tab-pane label='组织信息' name='organizeInfo' style="padding:10px 0px">
             <el-row>
              <el-col :span='6'>
                <el-tree
                  :data="orgTreeData"
                  node-key="id"
                  :expand-on-click-node="false"
                  ref='orgTree'
                  highlight-current
                  @node-click='orgTreeClick'
                  >
                </el-tree>
              </el-col>
              <el-col :span='3'>
                <div class="treeBtns">
                  <el-button type='text' size='mini' icon="el-icon-back" disabled>属于<i class="el-icon-right el-icon--right"></i></el-button>
                  <el-button type='danger' size='mini' icon='el-icon-delete' @click="empty('org')">清空</el-button>
                </div>
              </el-col>
              <el-col :span='15'>
                <el-input size='small' v-model='orgName' disabled>
                  <template slot="prepend">
                    组织名称
                  </template>
                </el-input>
                <el-input size='small' style="margin-top:10px;" v-model='orgPath' disabled>
                  <template slot="prepend">
                    组织路径
                  </template>
                </el-input>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label='岗位信息' name='postInfo' style="padding:10px 0px">
           <el-row>
             <el-col :span='6'>
               <el-tree
                  :data="postTreeData"
                  show-checkbox
                  node-key="id"
                  :expand-on-click-node="false"
                  ref='postTree'
                  @check-change="getChecked('post')"
                  check-strictly
                  :default-checked-keys='defaultPostCheck'
                  >
                </el-tree>
             </el-col>
             <el-col :span='3'>
                <div class="treeBtns">
                  <el-button type='text' size='mini' icon="el-icon-back" disabled>分配组织<i class="el-icon-right el-icon--right"></i></el-button>
                  <el-button type='danger' size='mini' icon='el-icon-delete'>清空所有</el-button>
                </div>
             </el-col>
             <el-col :span='15'>
               <el-table
                :data='postTableData'
                style="width: 100%"
                stripe
                size='mini'
                height='300'
                >
                <el-table-column prop='label' label='岗位名称'></el-table-column>
                <el-table-column prop='isMainPost' label='主岗位'>
                  <template slot-scope="scope">
                    <el-radio-group v-model='isMainPost'>
                      <el-radio :label='scope.row.id'><span style="opacity:0">.</span></el-radio>
                    </el-radio-group>
                  </template>
                </el-table-column>
                <el-table-column prop='isPrincipal' label='主负责人'>
                  <template slot-scope="scope">
                    <el-checkbox v-model="isPrincipal" :label='scope.row.id'>
                      <span style="opacity:0;">.</span>
                    </el-checkbox>
                  </template>
                </el-table-column>
                <el-table-column label='关联操作'>
                  <template slot-scope="scope">
                    <el-button type='text' icon='el-icon-delete' title='删除' @click='deletePostTableRow(scope.$index,postTableData)'></el-button>
                  </template>
                </el-table-column>
               </el-table>
             </el-col>
           </el-row>
          </el-tab-pane>
          <el-tab-pane label='角色信息' name='roleInfo' style="padding:10px 0px;">
            <el-row>
              <el-col :span='6'>
                <el-tree
                  :data="roleTreeData"
                  show-checkbox
                  node-key="id"
                  :expand-on-click-node="false"
                  ref='roleTree'
                  @check-change="getChecked('role')"
                  check-strictly
                  :default-checked-keys='defaultRoleCheck'
                  >
                </el-tree>
              </el-col>
              <el-col :span='3'>
                <div class="treeBtns">
                  <el-button type='text' size='mini' icon="el-icon-back" disabled>分配角色<i class="el-icon-right el-icon--right"></i></el-button>
                  <el-button type='danger' size='mini' icon='el-icon-delete' @click="empty('role')">清空所有</el-button>
                </div>
              </el-col>
              <el-col :span='15'>
                <el-table
                  :data="roleTableData"
                  style="width: 100%"
                  stripe
                  size='mini'
                  height='300'
                  >
                  <el-table-column prop='label' label='角色名称'></el-table-column>
                  <el-table-column prop='name' label='角色来源'>
                    <template slot-scope="scope">
                      {{ scope.row.name?scope.row.name:'自有'}}
                    </template>
                  </el-table-column>
                  <el-table-column label='关联操作'>
                    <template slot-scope="scope">
                      <el-button type='text' icon='el-icon-delete' title='删除' @click='delRoleTableRow( scope.$index,roleTableData )'></el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label='用户组信息' name='userGroupInfo'>
            <el-row>
              <el-col :span='10'>
                <el-table
                  :data="groupTableData"
                  style="width:100%"
                  stripe
                  size='mini'
                  ref='groupTable'
                  @selection-change='selectGroup'
                  :highlight-current-row='true'
                  height='300'
                  >
                  <el-table-column fixed='left' type='selection' width='50'></el-table-column>
                  <el-table-column prop='groupAlias' label='组别名'></el-table-column>
                  <el-table-column prop='name' label='组名称'></el-table-column>
                </el-table>
                 <el-pagination
                  @size-change="groupSizeChange"
                  @current-change="groupCurrentChange"
                  :current-page="groupCurrentPage"
                  :hide-on-single-page="false"
                  :page-sizes="[10, 20, 30, 40, 50]"
                  :page-size="10"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="groupTotal"
                  small
                  style="margin:10px 0px">
                </el-pagination>
              </el-col>
              <el-col :span='3'>
                <div class="treeBtns">
                  <el-button type='text' size='mini' icon="el-icon-back" disabled>添加<i class="el-icon-right el-icon--right"></i></el-button>
                  <el-button type='danger' size='mini' icon='el-icon-delete' @click='cancelSelection'>清空</el-button>
                </div>
              </el-col>
              <el-col :span='11'>
                <el-table
                  :data='addGroupTableData'
                  style="width:100%"
                  stripe
                  :highlight-current-row='true'
                  size='mini'
                  height='300'
                  >
                  <el-table-column prop='name' label='组名称'></el-table-column>
                  <el-table-column label='关联操作'>
                    <template slot-scope="scope">
                      <el-button type='text' icon='el-icon-delete' title='删除' @click='deleteGroupRow( scope.$index,addGroupTableData,scope.row )'></el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div slot="footer">
        <el-button type='success' size='mini' @click='confirm'>确定</el-button>
        <el-button type='info' size='mini'>取消</el-button>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync='searchDialog'
      v-dialogDrag
      :modal="false"
      width="30%"
      :close-on-click-modal="false"  
      >
      <div slot="title">
        <i class="el-icon-search"></i>
        <span>搜索选项</span>
      </div>
      <div>
        <el-form
          :model='searchForm'
          ref='searchForm'
          label-width="80px"
          :inline='true'
          size='small'
          >
          <el-form-item label='姓名'>
            <el-input v-model='searchForm.name' suffix-icon="el-icon-edit"></el-input>
          </el-form-item>
          <el-form-item label='用户名'>
            <el-input v-model='searchForm.account' suffix-icon="el-icon-edit"></el-input>
          </el-form-item>
          <el-form-item label='状态'>
            <el-select v-model='searchForm.status'> 
              <el-option v-for='(op,key) in options' :label='op' :value='key' :key="key"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label='日期范围' prop='date'>
            <el-date-picker
              v-model="searchForm.date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy/MM/dd">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <el-button type='success' size='mini' @click='confirmSearch'>确定</el-button>
        <el-button type='info' size='mini' @click='searchDialog = false '>取消</el-button>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync='viewData.viewDialog'
      v-dialogDrag
      :modal="false"
      width="50%"
      :close-on-click-modal="false"
      @close="closeViewDialog"
      >
      <div slot="title">
        <i class="el-icon-info"></i>
        <span>个人信息明细</span>
      </div>
      <div>
        <el-tabs>
          <el-tab-pane label="基本资料" style='padding:20px;'>
            <el-row>
              <el-col :span='6'>
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
              </el-col>
              <el-col :span='18'>
                <ul>
                  <li v-for="( item,index) in viewData.basicInfo" :key='index'>
                    <div class="fontDesc">
                      <p>{{item.title}}:</p>
                      <p>{{item.value}}</p>
                    </div>
                  </li>
                </ul>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="扩展属性">扩展属性</el-tab-pane>
          <el-tab-pane label="组织信息" style="padding:20px">
            <ul>
              <li v-for="( item,index) in viewData.orgInfo" :key='index'>
                <div class="fontDesc">
                  <p>{{item.title}}:</p>
                  <p>{{item.value}}</p>
                </div>
              </li>
            </ul>
          </el-tab-pane>
          <el-tab-pane label="岗位信息">
            <el-table
              :data="viewData.postTableData"
              size='mini'
              style='width:100%'
              height='300'
              >
              <el-table-column prop='name' label='岗位名称'></el-table-column>
              <el-table-column prop='level' label='等级值'></el-table-column>
              <el-table-column prop='orgName' label='归属组织'></el-table-column>
              <el-table-column prop='isMainPost' label='是否主岗位'>
                <template slot-scope="scope">
                  {{scope.row.isMainPost?'是':'否'}}
                </template>
              </el-table-column>
              <el-table-column prop='isPrincipal' label='是否主负责人'>
                <template slot-scope="scope">
                  {{scope.row.isPrincipal?'是':'否'}}
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="角色信息">
            <el-table
              :data="viewData.roleTableData"
              size='mini'
              style='width:100%'
              height='300'
              >
              <el-table-column prop='name' label='角色'></el-table-column>
              <el-table-column prop='roleAlias' label='别名'></el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="用户组信息">
            <el-table
              :data="viewData.groupTableData"
              size='mini'
              style='width:100%'
              height='300'
              >
              <el-table-column prop='groupName' label='组名称'></el-table-column>
              <el-table-column prop='groupAlias' label='组别名'></el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div slot="footer">
        <el-button type='info' size='mini' @click="viewData.viewDialog = false">关闭</el-button>
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
        isSuper:'N',
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
      roleTreeData:[],//角色树
      roleTableData:[],//被选中的角色信息table展示
      orgTreeData:[],//组织树
      orgName:'',//组织名称
      orgPath:'',//组织路径
      groupID:'',//组织Id
      postTreeData:[],//岗位树
      postTableData:[],//岗位表数据
      isMainPost:'',//岗位下是主岗位的id
      isPrincipal:[],//岗位下是否是主负责人的id集合
      groupTableData:[],//用户组数据
      groupTotal:0,
      groupSize:10,
      groupCurrentPage:1,
      addGroupTableData:[],//被添加的分组信息数据表
      searchDialog:false,//搜索dialog
      searchForm:{
        name:'',
        account:'',
        status:'',
        date:'',
      },
      defaultPostCheck:[],//岗位树回显默认勾选项
      defaultRoleCheck:[],//角色树回显默认勾选项
      loading:false,
      viewData:{//明细下的数据保存
        viewDialog:false,
        basicInfo:{
          name:{ title:'员工姓名',value:''},
          gender:{ title:'性别',value:''},
          orgPath:{ title:'归属组织路径',value:''},
          account:{ title:'登录账号',value:''},
          isSuper:{ title:'是否超级管理员',value:''},
          wcAccount:{ title:'微信账号',value:''},
          createTime:{ title:'创建时间',value:''},
          updateTime:{ title:'更新时间',value:''},
          status:{ title:'用户状态',value:''},
        },
        orgInfo:{
          orgName:{ title:'组织名称',value:''},
          orgPath:{ title:'组织路径',value:''},
          level:{ title:'等级数值',value:''},
          statu:{ title:'状态',value:''},
        },
        postTableData:[],
        roleTableData:[],
        groupTableData:[],
      }
    };
  },
  created(){
    this.axios.get('/employee/userStatus').then( res => {//获取用户状态options
      res.data.code === 200 && ( Object.assign( this.options,res.data.obj ));
    });
    let getRoleTree = () => this.axios.get('/role/roleTree');
    let getOrgTree = () =>  this.axios.get('/org/orgTree');
    let getPostTree = () => this.axios.get('/position/positionTree');
    let getGroupTableData = () => this.axios.get('/group/pager?page=1&size=10');
    this.axios.all([getRoleTree(),getOrgTree(),getPostTree(),getGroupTableData()]).then( this.axios.spread( ( role, org, post,group ) => {
      this.roleTreeData.push( role.data.obj );
      this.orgTreeData.push( org.data.obj );
      this.postTreeData.push( post.data.obj );
      this.groupTableData = group.data.obj && group.data.obj.records;
      this.groupTotal = group.data.obj && group.data.obj.total;
    })).catch( err => this.$message.error('系统错误'));
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
    getGroupPage( page = 1,size = 10, s = '' ){//获取用户组分页信息
      this.axios.get(`/group/pager?page=${page}&size=${size}&s=${s}`).then( res => {
        if( res.data.code === 200 ){
          this.groupTableData = res.data.obj && res.data.obj.records;
          this.groupTotal = res.data.obj && res.data.obj.total;
        }
      })
    },
    handleAvatarSuccess(){},
    beforeAvatarUpload(){},
    confirm(){//表单提交
      this.$refs.basicInfoForm.validate( valid => {
        if( valid ) {
          let url = this.isAdd?'/employee/add':'/employee/update';
           /* 岗位信息 */
          let posList = [];
          this.postTableData.forEach( item => {
            let obj = {};
            item.id === this.isMainPost && ( obj['isMainPost'] = true ) || ( obj['isMainPost'] = false );
            this.isPrincipal.indexOf( item.id ) !== -1 && ( obj['isPrincipal'] = true ) || ( obj['isPrincipal'] = false );
            obj['posId'] = item.id;
            posList.push( obj );
          });
          /* 用户组信息 */
          let groupIds = [];
          groupIds = this.addGroupTableData.map( g => g.id );
          /* 组织信息 */
          let groupID = this.groupID;
          /* 角色信息 */
          let roleIds = this.roleTableData.map( r => r.id );
          let URLSearchParams = require('url-search-params');//URLSearchParams的兼容性
          let params = new URLSearchParams();
          if( !this.isAdd ){//修改表单
            delete this.basicInfoForm['password'];
            params.append('id',this.chooseList[0].id )
          };
          for ( let key in this.basicInfoForm ){
            params.append(key,this.basicInfoForm[key]);
          }
          params.append('posList',JSON.stringify(posList));
          params.append('groupIds',groupIds.join(','));
          params.append('groupID',groupID);
          params.append('roleIds',roleIds.join(','));
          params.append('orgPath',this.orgPath);
          this.axios.post(url,params).then( res => {
            if( res.data.code === 200 ){
              this.$message.success( this.isAdd?'添加成功':'修改成功');
              this.addDialog = false;
              this.getPage();
              Object.assign( this.basicInfoForm,{
                account:'',
                password:'',
                isSuper:'N',
                name:'',
                status:'',
                gender:'female',
                email:'',
                address:'',
                mobile:'',
                qq:'',
                wcAccount:''
              });
            } else this.$message.error( res.data.desc );
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
            let p = {
              id:row.id,
              password:value
            }
            this.axios.post('/employee/resetPwd',qs.stringify(p)).then( s => {
              s.data.code === 200 && ( this.$message.success('重置成功')) || ( this.$message.error(s.data.desc));
            }).catch( err => console.log( err ));
          }).catch( () => this.$message.info('取消重置'))
        },
        disabled: () => {
          let p = {
            id:row.id,
            status:row.status === 'actived'?'disabled':'actived'
          };
          this.axios.post('/employee/updateStatus',qs.stringify(p)).then( s => {
            if(  s.data.code === 200 ) this.getPage();
            else this.$message.error('系统错误')
          })
        },
        detail: () => {
          this.viewData.viewDialog = true;
          this.axios.get('/employee/getById?id=' + row.id ).then( s => {
            let { partyEmployeePo, positionVoList, roleVoList, userGroupPoList } = s.data.obj;
            for( let key in this.viewData.basicInfo ){//明细下的基本个人信息赋值
              if( key === 'gender') this.viewData.basicInfo[key].value = partyEmployeePo[key] === 'male'?'男':'女';
              else if ( key === 'isSuper') this.viewData.basicInfo[key].value = partyEmployeePo[key] === 'Y'?'是':'否';
              else this.viewData.basicInfo[key].value = partyEmployeePo[key];
            };
            /* 组织信息 */
            for( let k in this.viewData.orgInfo ){
              this.viewData.orgInfo[k].value = partyEmployeePo[k]
            };
            /* 岗位信息 */
            this.viewData.postTableData = positionVoList.map( post => {
              return {
                name:post.name,
                level:post.level,
                orgName:post.orgName,
                isMainPost:post.isMainPost,
                isPrincipal:post.isPrincipal
              }
            });
            /* 角色信息 */
            this.viewData.roleTableData = roleVoList.map( role => {
              return {
                name:role.name,
                roleAlias:role.roleAlias
              }
            });
            /* 用户组信息 */
            this.viewData.groupTableData = userGroupPoList.map( user => {
              return {
                groupName:user.groupName,
                groupAlias:user.groupAlias
              }
            })
          })
        },
      };
      methods[type]();
    },
    closeViewDialog(){
      /* 组织信息 */
      for( let k in this.viewData.orgInfo ){
        this.viewData.orgInfo[k].value = '';
      };
      /* 岗位信息 */
      this.viewData.postTableData = [];
      /* 角色信息 */
      this.viewData.roleTableData = [];
      /* 用户组信息 */
      this.viewData.groupTableData = []
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
        this.loading = true;
        let id = this.chooseList[0].id;
        this.axios.get('/employee/getById?id=' + id).then( s => {
          if( s.data.code === 200 ){
            /* 回显 */
            let { partyEmployeePo, positionVoList, roleVoList, userGroupPoList } = s.data.obj;
            for ( let key in this.basicInfoForm ){
              this.basicInfoForm[key] = partyEmployeePo[key]
            };
            /* 组织信息 */
            this.orgName = partyEmployeePo.orgName;
            this.orgPath = partyEmployeePo.orgPath;
            this.groupID = partyEmployeePo.groupID;
            /* 岗位信息 */
            this.defaultPostCheck = positionVoList.map( pos => pos.id );
            this.postTableData = this.defaultPostCheck.map( d => {//获取选中节点的详细信息并加载到posttable
              let da = this.$refs.postTree.getNode(d);
              return {
                label:da.data.label,
                id:da.data.id,
              }
            });
            positionVoList.forEach( pos => {//posttable下的单选框喝复选框的回显
              if( pos.isMainPost ) this.isMainPost = pos.id;
              if( pos.isPrincipal) this.isPrincipal.push( pos.id );
            });
            /* 角色信息 */
            this.defaultRoleCheck = roleVoList.map( r => r.id );
            this.roleTableData = roleVoList.map( r => {
              return {
                label:r.name,
                id:r.id,
              }
            });
            /* 用户组信息 */
            this.addGroupTableData = userGroupPoList.map( group => {
              return {
                name:group.groupName,
                id:group.id,
                groupAlias:group.groupAlias
              }
            });
            this.loading = false;
          }
        });
      } else {
        this.$message.warning('请选择一行数据进行编辑修改');
      }
    },
    dialogClose(){
      this.isAdd = true;
      this.roleTableData = [];
      this.orgName = '';//组织名称
      this.orgPath = '';//组织路径
      this.groupID = '';//组织Id
      this.postTableData = [];//岗位表数据
      this.isMainPost = '';//岗位下是主岗位的id
      this.isPrincipal = [];//岗位下是否是主负责人的id集合
      this.addGroupTableData = [];//被添加的分组信息数据表
      this.$refs.roleTree.setCheckedKeys([]);
      this.$refs.postTree.setCheckedKeys([]);
      this.basicInfoForm = {
        account:'',
        password:'',
        isSuper:'N',
        name:'',
        status:'',
        gender:'female',
        email:'',
        address:'',
        mobile:'',
        qq:'',
        wcAccount:''
      };
    },
    getChecked( type ){//获取角色树被选中的节点数据
      let _s = {
        role: () => this.roleTableData = this.$refs.roleTree.getCheckedNodes(),
        post: () => this.postTableData = this.$refs.postTree.getCheckedNodes(),
      };
      _s[type]();
    },
    delRoleTableRow( index, row ){
      row.splice(index,1)
      this.$refs.roleTree.setCheckedNodes(row);
    },
    deletePostTableRow( index, row ){
      row.splice(index,1)
      this.$refs.postTree.setCheckedNodes(row);
    },
    empty( type ){
      let active = {
        role: () => this.$refs.roleTree.setCheckedKeys([]),
        org: () => { this.groupID = '',this.orgName = '',this.orgPath = ''},

      }
      active[type]();
    },
    orgTreeClick( data, node, self ){//组织树节点被点击后的回调
      if( node.data.id === '0') {
        this.$message.warning('根节点不是组织机构')
      } else {
        let parent = node.parent.data;//父节点数据
        if( parent.id === '0'){//父节点为根节点
          this.orgPath = this.orgName = node.data.label;
        } else {
          this.orgName = node.data.label;
          this.orgPath = parent.label + '/' + this.orgName;
        }
        this.groupID = node.data.id;
      }
    },
    groupCurrentChange( val ){
      this.groupCurrentPage = val;
      this.getGroupPage( val,this.groupSize );
    },
    groupSizeChange( val ){
      this.groupSize = val;
      this.getGroupPage( this.groupCurrentPage,val );
    },
    selectGroup( selection ){
      this.addGroupTableData = selection;
    },
    cancelSelection( rows ) {//分组信息清空所选
      this.$refs.groupTable.clearSelection();
    },
    deleteGroupRow( index,data,row ){
      data.splice( index,1 );
      this.$refs.groupTable.toggleRowSelection( row );
    },
    confirmSearch(){//确认搜索
      let endTime = '' ,startTime = '';
      Array.isArray( this.searchForm.date ) && ( startTime = this.searchForm.date[0], endTime = this.searchForm.date[1] );
      this.axios.get(`/employee/pager?size=${this.size}&page=${this.currentPage}&name=${this.searchForm.name}&startTime=${startTime}
      &endTime=${endTime}&status=${this.searchForm.status}&account=${this.searchForm.account}`).then( res => {
        if( res.data.code === 200 ){
          this.tableData = res.data.obj && res.data.obj.records;
          this.total = res.data.obj.total;
          this.searchDialog = false;
          Object.assign( this.searchForm,{
            name:'',
            account:'',
            status:'',
            date:'',
          })
        }
      })
    }
  },
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
  .el-tree {
    height: 300px;
    overflow: auto;
  }
  .treeBtns {
    text-align: center;
    margin-top: 100px;
    & .el-button+.el-button {
      margin: 10px 0px 0px 0px;
    }
  }
  .fontDesc{
    font-size: 12px;
    display: flex;
    flex-flow: row nowrap;
    padding: 3px 0px;
    & p:nth-child(1){
      width: 200px;
    }
  }
</style>