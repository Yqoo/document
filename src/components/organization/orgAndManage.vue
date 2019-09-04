<!--
 * @Date: 2019-08-16 09:18:16
 * @LastEditors: Yqoo
 * @LastEditTime: 2019-09-03 18:28:24
 * @Desc: 组织与用户下的组织管理组件
 -->
<template>
  <div class='orgAndManage'>
    <el-row>
      <el-col :span='4'>
        <div style="position:relative">
          <el-tree
            :data="orgTreeData"
            node-key="id"
            :expand-on-click-node="false"
            ref='orgTree'
            highlight-current
            @node-click='orgTreeClick'
            style="padding-top:7px;"
            @node-contextmenu="rightMouseEvent"
            :key='rightMenus.isRefreshTree'
            >
          </el-tree>
          <ul v-if='rightMenus.isRightClick' 
            :style="rightMenus.rightMenusStyle" class="rightMenus" 
            @mouseleave="rightMenus.isRightClick = false">
            <li v-for="( item,index) in rightMenus.data" :key="index" @click="mouseActive(item.type)">
              <i :class="item.icon"></i>
              <span>{{item.name}}</span>
            </li>
          </ul>
        </div>
      </el-col>
      <el-col :span='20'>
        <div v-show='targetGroupId'>
          <el-tabs>
            <el-tab-pane label='组织明细' style="padding:20px">
              <ul>
                <li v-for="( item,key ) in this,orgBasicInfo " :key='key'>
                  <div class="fontDesc">
                    <p>{{item.title}}：</p>
                    <p>{{item.value}}</p>
                  </div>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label='组织负责人'>
              <div class="topBtns">
                <el-button-group>
                  <el-button type='primary' size='mini' icon='el-icon-search' @click="orgLeaderSearch">搜索</el-button>
                  <el-button type='success' size='mini' icon='el-icon-setting' @click='setOrgData.visibleDialog = true'>设置</el-button>
                  <el-button type='warning' size='mini' icon='el-icon-error' @click="revocationBtn">撤销</el-button>
                </el-button-group>
              </div>
              <el-table
                :data='orgLeaderData.data'
                size='mini'
                style='width:100%'
                height='300'
                stripe
                ref='orgLeaderTable'
                @row-click='orgLeaderRowClick'
                @selection-change='selectOrgLeaders'
                >
               <el-table-column fixed='left' type='selection' width='50'></el-table-column>
               <el-table-column prop='name' label='姓名'></el-table-column>
               <el-table-column prop='status' label='状态'></el-table-column>
               <el-table-column prop='gender' label='性别'></el-table-column>
               <el-table-column prop='createTime' label='创建时间' show-overflow-tooltip></el-table-column>
               <el-table-column label='关联操作' fixed='right'>
                 <template slot-scope="scope">
                   <el-button type='text' size='mini' icon="el-icon-error" title='撤销' @click='revocation( scope.$index, orgLeaderData.data )'></el-button>
                 </template>
               </el-table-column>
              </el-table>
              <el-pagination
                @size-change="orgLeaderSizeChange"
                @current-change="orgLeaderCurrentChange"
                :current-page="orgLeaderData.currentPage"
                :hide-on-single-page="false"
                :page-sizes="[10,20,30,40,50]"
                :page-size="orgLeaderData.size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="orgLeaderData.total"
                small
                style="margin:10px 0px">
              </el-pagination>
            </el-tab-pane>
            <el-tab-pane label='行政岗位'>
              <div class="topBtns">
                <el-button-group>
                  <el-button type='primary' size='mini' icon='el-icon-search' @click='postSearch'>搜索</el-button>
                  <el-button type='success' size='mini' icon='el-icon-circle-plus-outline' @click='getPostTree'>加入</el-button>
                  <el-button type='danger' size='mini' icon='el-icon-circle-close' @click='postRemove'>移除</el-button>
                </el-button-group>
              </div>
              <el-table
                :data="astJobs.tableData"
                size='mini'
                style='width:100%'
                height='300'
                stripe
                ref='astJobsTable'
                @row-click='postRowClick'
                @selection-change='selectpost'
                >
                <el-table-column fixed='left' type='selection' width='50'></el-table-column>
                <el-table-column prop='name' label='岗位名称'></el-table-column>
                <el-table-column prop='level' label='等级'></el-table-column>
                <el-table-column fixed='right' label='关联操作'>
                  <template slot-scope="scope">
                    <el-button type='text' icon='el-icon-error' title='移除' @click='postTableRemove( scope.$index,astJobs.tableData)'></el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination
                @size-change="postTableSizeChange"
                @current-change="postTableCurrentChange"
                :current-page="astJobs.page"
                :hide-on-single-page="false"
                :page-sizes="[10, 20, 30, 40, 50]"
                :page-size="astJobs.size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="astJobs.total"
                small
                style="margin:10px 0px">
              </el-pagination>
            </el-tab-pane>
            <el-tab-pane label='组织人员'></el-tab-pane>
            <el-tab-pane label='扩展属性'></el-tab-pane>
            <el-tab-pane label='已分配角色'></el-tab-pane>
            <el-tab-pane label='组织分级管理'></el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
    <el-dialog
      :visible.sync='setOrgData.visibleDialog'
      v-dialogDrag
      :modal="false"
      width="50%"
      :close-on-click-modal="false"
      @close="setOrgdialogClose"
      :key="setOrgData.isrefreshDialog"
      >
      <div slot='title'>
        <i class="el-icon-circle-plus-outline"></i>
        <span>人员选择器</span>
      </div>
      <el-row>
        <el-col :span='4'>
          <el-tree
            :data="orgTreeData"
            node-key="id"
            :expand-on-click-node="false"
            ref='orgTree'
            highlight-current
            style="padding-top:7px;"
            @node-click='getNodeData'
            default-expand-all
            >
          </el-tree>
        </el-col>
        <el-col :span='20'>
          <div class="topBtns">
            <el-input size='mini' placeholder='请输入搜索关键词' v-model='setOrgData.searchText'>
              <el-button slot="append" type='primary' size='mini' icon="el-icon-search" @click='setOrgDataSearch'></el-button>
            </el-input>
          </div>
          <el-table
            :data='setOrgData.data'
            size='mini'
            style='width:100%'
            height='300'
            stripe
            ref='orgTable'
            @selection-change='selectionOrg'
            >
            <el-table-column  v-if='!rightMenus.setDialog' fixed='left' type='selection' width='50'></el-table-column>
            <el-table-column v-else fixed='left' width='50'>
              <template slot-scope="scope">
                <el-radio :label='scope.row.id' v-model='rightMenus.setRadio'><span style="opacity:0;">.</span></el-radio>
              </template>
            </el-table-column>
            <el-table-column prop='name' label='姓名'></el-table-column>
            <el-table-column prop='account' label='账号'></el-table-column>
          </el-table>
          <el-pagination
              @size-change="setOrgDataSizeChange"
              @current-change="setOrgDataCurChange"
              :current-page="setOrgData.page"
              :hide-on-single-page="true"
              :page-sizes="[10,20,30,40,50]"
              :page-size="setOrgData.size"
              layout="total, sizes, prev, pager, next, jumper"
              :total="setOrgData.total"
              small
              style="margin:10px 0px">
            </el-pagination>
        </el-col>
      </el-row>
      <div slot="footer">
        <el-button v-if='!rightMenus.setDialog' type='success' size='mini' @click='confirmAddOrg'>确认</el-button>
        <el-button v-else type='success' size='mini' @click='confirmSetAdmin'>确认</el-button>
        <el-button type='info' size='mini'  @click='setOrgData.visibleDialog = false'>关闭</el-button>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync='rightMenus.addDialog'
      v-dialogDrag
      :modal="false"
      width="30%"
      :close-on-click-modal="false"
      @close="orgTreeAddNodeClose"
      >
      <div slot="title">
        <i v-if='rightMenus.isAdd' class="el-icon-circle-plus-outline"></i>
        <i v-else class="el-icon-edit"></i>
        <span v-if='rightMenus.isAdd'>新增组织</span>
        <span v-else>编辑组织</span>
      </div>
      <div>
        <el-form
          :model='rightMenus.addForm'
          label-width='100px'
          ref='rightMenusAddForm'
          :rules='rightMenus.addRules'
          size='small'
        >
          <el-form-item prop='name' label='机构名称'>
            <el-input v-model='rightMenus.addForm.name'></el-input>
          </el-form-item>
          <el-form-item prop='orgAlias' label='机构别名'>
            <el-input v-model='rightMenus.addForm.orgAlias' :disabled='!rightMenus.isAdd'></el-input>
          </el-form-item>
          <el-form-item prop='levelID' label='机构等级'>
            <el-select v-model='rightMenus.addForm.levelID'>
              <el-option v-for="(option,index) in orgLevel" :key='index' :label='option.name' :value='option.id'></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop='status' label='机构状态'>
            <el-select v-model='rightMenus.addForm.status'>
              <el-option v-for="( item, key ) in orgStatus" :label='item' :value='key' :key='key'></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <el-button v-if="rightMenus.isAdd" type='success' size='mini' @click='confirmAddOrgForm'>确认</el-button>
        <el-button v-else type='success' size='mini' @click="confirmUpdateOrgForm">确认</el-button>
        <el-button type='info' size='mini' @click='rightMenus.addDialog = false'>取消</el-button>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync='rightMenus.moveDialog'
      v-dialogDrag
      :modal="false"
      width="20%"
      :close-on-click-modal="false"
      @close="moveDialogClose"
      >
      <div slot="title">
        <i class="el-icon-sort"></i>
        <span>移动节点</span>
      </div>
      <div>
        <el-tree
          :data="rightMenus.moveOrgTree"
          node-key="id"
          :expand-on-click-node="false"
          ref='orgTree'
          highlight-current
          style="padding-top:7px;"
          @node-click="moveOrgTreeNode"
          >
        </el-tree>
      </div>
      <div slot="footer">
        <el-button type='success' size='mini' @click='confirmMoveTo'>确定</el-button>
        <el-button type='取消' size='mini' @click=" rightMenus.moveDialog = false">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync='rightMenus.setDialog'
      v-dialogDrag
      :modal="false"
      width="40%"
      :close-on-click-modal="false"
      >
      <div slot="title">
        <i class="el-icon-setting"></i>
        <span>设置分级节点管理员</span>
      </div>
      <div>
        <el-form
          :data='rightMenus.setAdminFormData'
          :rules="rightMenus.setAdminFormRules"
          label-width='150px'
          ref='setAdminForm'
          size='small'
          >
          <el-form-item label='分级管理员用户'>
            <el-input v-model='rightMenus.setAdminFormData.account' clearable @focus='setOrgData.visibleDialog = true'></el-input>
          </el-form-item>
          <el-form-item label='被授权的组织'>
            <el-input v-model='rightMenus.setAdminFormData.org'></el-input>
          </el-form-item>
          <el-form-item label='本层级组织操作授权项'>
            <el-checkbox-group v-model='rightMenus.setAdminFormData.top'>
              <el-checkbox label="增加" name="add"></el-checkbox>
              <el-checkbox label="删除" name="del"></el-checkbox>
              <el-checkbox label="修改" name="update"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label='其子级组织操作授权项'>
            <el-checkbox-group v-model='rightMenus.setAdminFormData.bottom'>
              <el-checkbox label="增加" name="add"></el-checkbox>
              <el-checkbox label="删除" name="del"></el-checkbox>
              <el-checkbox label="修改" name="update"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <el-button type='success' size='mini'>确定</el-button>
        <el-button type='info' size='mini'>取消</el-button>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync='rightMenus.addpost.visibleDialog'
      v-dialogDrag
      :modal="false"
      width="40%"
      :close-on-click-modal="false"
      @close='addpostDialogClose'
      >
      <div slot="title">
        <i class="el-icon-circle-plus"></i>
        <span>新增岗位</span>
      </div>
      <div>
        <el-form
          :model='rightMenus.addpost.formData'
          :rules="rightMenus.addpost.formRules"
          size='small'
          ref='postForm'
          label-width='100px'
          style="padding:20px"
        >
          <el-form-item prop='name' label='岗位名称'>
            <el-input v-model='rightMenus.addpost.formData.name'></el-input>
          </el-form-item>
          <el-form-item prop='posAlias' label='岗位别名'>
            <el-input v-model='rightMenus.addpost.formData.posAlias'></el-input>
          </el-form-item>
          <el-form-item prop='levelID' label='岗位等级'>
            <el-select v-model='rightMenus.addpost.formData.levelID'>
              <el-option v-for="(op,index) in rightMenus.addpost.leveloption" :key='index' :label='op.name' :value='op.id'></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop='desc' label='岗位说明'>
            <el-input v-model='rightMenus.addpost.formData.desc'></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <el-button type='success' size='mini' @click='confirmAddPost'>确定</el-button>
        <el-button type='info' size='mini' @click="rightMenus.addpost.visibleDialog = false">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync='astJobs.treeDialog'
      v-dialogDrag
      :modal="false"
      width="20%"
      :close-on-click-modal="false"
      @close="postTreeDialogClose"
      >
      <div slot="title">
        <i class="el-icon-setting"></i>
        <span>岗位选择</span>
      </div>
      <div>
        <el-tree
          :data="astJobs.treeData"
          node-key="id"
          :expand-on-click-node="false"
          ref='postTree'
          highlight-current
          show-checkbox
          @check-change="postTreeCheck"
          :key="astJobs.refreshTree"
          ></el-tree>
      </div>
      <div slot="footer">
        <el-button type='success' size='mini' @click="confirmJoinPost">确认</el-button>
        <el-button type='info' size='mini'>取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import qs from 'qs';
export default {
  name: 'orgAndManage',
  components: {},
  data() {
    return {
      orgStatus:{},//组织状态
      orgLevel:[],//组织等级
      rightMenus:{//右键菜单
        isRightClick:false,//控制组织树右键点击弹出框的显示
        nodeId:'',//右键选中的节点的id
        isRefreshTree:1,//控制刷新orgTree
        isAdd:true,//控制显示是新增还是编辑
        rightMenusStyle:{},
        data:[
          { name:'增加',type:'add',icon:'el-icon-plus' },
          { name:'编辑',type:'edit',icon:'el-icon-edit' },
          { name:'删除',type:'del',icon:'el-icon-delete' },
          { name:'移动节点',type:'move',icon:'el-icon-sort' },
          { name:'设置分级管理员',type:'set',icon:'el-icon-setting' },
          { name:'新增岗位',type:'job',icon:'el-icon-circle-plus-outline' },
        ],
        addDialog:false,//控制组织树节点新增弹出框显示
        addForm:{
          name:'',
          orgAlias:'',
          levelID:'',
          status:''
        },
        addRules:{
          name:[
            { required: true, message: '请输入机构名称', trigger: 'blur' },
          ],
          orgAlias:[
            { required: true, message: '请输入机构别名', trigger: 'blur' },
          ],
          levelID:[
            { required: true, message: '请选择机构等级', trigger: 'change' }
          ],
          status:[
            { required: true, message: '请选择机构状态', trigger: 'change' }
          ],
        },
        moveDialog:false,//控制移动节点弹出框显示
        moveOrgTree:[],//移动节点时被过滤的树
        moveToNodeId:'',//移动到那个节点
        setDialog:false,//控制设置分级节点弹出框显示
        setAdminFormData:{
          account:'',
          org:'',
          top:[],
          bottom:[],
        },
        setRadio:'',//分级管理员单选框数据
        addpost:{// 新增岗位
          visibleDialog:false,
          formData:{
            name:'',
            posAlias:'',
            levelID:'',
            desc:''
          },
          formRules:{
            name:[
              { required: true, message: '请输入岗位名称', trigger: 'blur' }
            ],
            posAlias:[
              { required: true, message: '请输入岗位别名', trigger: 'blur' }
            ],
            levelID:[
              { required: true, message: '请选择岗位等级', trigger: 'change' }
            ],
          },
          leveloption:[],
        },
      },
      orgTreeData:[],//组织树
      targetGroupId:null,//被选中的组织id
      orgBasicInfo:{
        name: { title:'机构名称',value:''},
        orgAlias: { title:'机构别名',value:''},
        levelID: { title:'机构等级',value:''},
        status: { title:'机构状态',value:''},
        createTime: { title:'创建时间',value:''},
        updateTime: { title:'更新时间',value:''},
      },
      orgLeaderData:{//组织负责人数据
        data:[],//组织负责人table数据
        total:0,
        currentPage:1,
        size:10,
        selection:[],//被选中的数据
      },
      setOrgData:{//设置员工下的各项数据
        visibleDialog:false,
        id:'',
        data:[],
        total:0,
        page:1,
        size:10,
        searchText:'',
        selection:[],//选中的员工
        isrefreshDialog:1,//控制刷新该弹出框
      },
      astJobs:{//行政岗位 -- 数据
        tableData:[],
        total:0,
        page:1,
        size:10,
        selection:[],
        searchText:'',
        treeDialog:false,
        treeData:[],//岗位树
        checkPostTreeNode:[],//被选中的岗位树节点信息集合
        refreshTree:1,//控制刷新树
      },
    };
  },
  created(){
    let getOrgTree = () => this.axios.get('/org/orgTree');
    let getOrgStatus = () => this.axios.get('/org/orgStatus');
    let getOrgLevel = () => this.axios.get('/partyLevel/getByType?type=org');
    this.axios.all([ getOrgTree(),getOrgStatus(),getOrgLevel() ]).then( this.axios.spread( (orgTree, orgStatus, orgLevel ) => {
      this.orgTreeData.push( orgTree.data.obj );
      Object.assign( this.orgStatus, orgStatus.data.obj );
      this.orgLevel = orgLevel.data.obj.map( level => {
        return {
          id:level.id,
          name:level.name
        }
      })
    })).catch( err => console.log( err ));
  },
  methods:{
    getPageInfo( { type, url ,params }){
      let actives = {
        orgLeader: () => {//组织负责人分页
          this.axios.get( url, {params} ).then( s => {
            if( s.data.code === 200 ){
              this.orgLeaderData.data = s.data.obj && s.data.obj.records;
              this.orgLeaderData.total = s.data.obj && s.data.obj.total;
            }
          })          
        },
        org: () => {//添加组织负责人的分页
          this.axios.get( url, {params} ).then( s => {
            if( s.data.code === 200 ){
              this.setOrgData.data = s.data.obj && s.data.obj.records;
              this.setOrgData.total = s.data.obj && s.data.obj.total;
            }
          })          
        },
        post: () => {//行政岗位分页信息
          this.axios.get( url, {params} ).then( s => {
            if( s.data.code === 200 ){
              this.astJobs.tableData = s.data.obj && s.data.obj.records;
              this.astJobs.total = s.data.obj && s.data.obj.total;
            }
          })     
        }
      };
      actives[type]();
    },
    orgTreeClick( data, node, self ){
      if( node.data.id === '0') this.$message.info('根节点不是组织机构')
      else {
        this.targetGroupId = node.data.id;
        let getOrgBasicInfo = () => this.axios.get('/org/getById?id=' + this.targetGroupId );
        this.axios.all([ getOrgBasicInfo() ]).then( this.axios.spread( ( basic ) => {
          for( let b in this.orgBasicInfo ){
            if( b === 'status'){
              for( let key in this.orgStatus ){
                if( key === basic.data.obj[b] ){
                  this.orgBasicInfo[b].value = this.orgStatus[key];
                }
              }
            } else this.orgBasicInfo[b].value = basic.data.obj[b];
          }
        })).catch( err => console.log( err ));
        this.getPageInfo({ type : 'orgLeader',url : "/org/principalPager",params:{ orgId:node.data.id,page:1,size:10}});
        this.getPageInfo({ type : 'post',url : "/org/getPositions",params:{ orgId:node.data.id,page:1,size:10}});
      };
    }, 
    orgLeaderSearch(){//组织负责人搜索
      this.$prompt('请输入关键词','搜索',{
        confirmButtonText:'确定',
        cancelButtonText:'取消',
      }).then( ({ value }) => {
        this.getPageInfo({
          type:'orgLeader',
          url:'/org/principalPager',
          params:{ orgId:this.targetGroupId,page:this.orgLeaderData.currentPage,size:this.orgLeaderData.size,s:value },
        });
      }).catch( () => this.$message.info('已取消搜索'))
    },
    revocation( index, data ){
      this.$confirm('确认撤销该组织负责人吗？','提示',{
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        type:'warning'
      }).then( () => {
        console.log( data[index].id )
        this.axios.post('/org/deletePrincipal',qs.stringify({ orgId:this.targetGroupId,id:data[index].id})).then( s => {
          s.data.code === 200 && ( data.splice(index,1))
        }).catch( err => console.log( err ));
      }).catch( () => this.$message.info('已取消该操作'))
    },
    revocationBtn(){//顶部工具栏撤销
      let selection = this.orgLeaderData.selection;
      if( selection.length > 0 ){
        this.$confirm('确认撤销所选的数据吗？','提示',{
          confirmButtonText:'确定',
          cancelButtonText:'取消',
          type:'warning'
        }).then( () => {
          let ids = selection.map( item => item.id );
          this.axios.post('/org/deletePrincipal',qs.stringify({ orgId:this.targetGroupId,id:ids.join(',')})).then( s => {
            if( s.data.code === 200 ){
              this.getPageInfo({ type : 'orgLeader',url : "/org/principalPager",params:{ orgId:this.targetGroupId,page:1,size:this.orgLeaderData.size }});
            }
          })
        }).catch( () => this.$message.info('已取消操作'));
      } else this.$message.info('请至少选中一行数据')
    },
    orgLeaderSizeChange( size ){//组织负责人table 条数改变
      this.orgLeaderData.size = size;
      this.getPageInfo( { type : 'orgLeader',url : "/org/principalPager",params:{
        orgId:this.targetGroupId,
        page:this.orgLeaderData.currentPage,
        size:size
      }})
    },
    orgLeaderCurrentChange( page ){//组织负责人table 页数改变
      this.orgLeaderData.currentPage = page;
      this.getPageInfo( { type : 'orgLeader',url : "/org/principalPager",params:{
        orgId:this.targetGroupId,
        page:page,
        size: this.orgLeaderData.size
      }})
    },
    orgLeaderRowClick( row ){
      this.$refs.orgLeaderTable.toggleRowSelection( row );
    },
    selectOrgLeaders( selection ){
      this.orgLeaderData.selection = selection;
    },
    setOrgdialogClose(){
      this.$refs.orgTable.clearSelection();
      this.setOrgData.isrefreshDialog ++ ;
    },
    getNodeData( data, node, self ){
      if( node.data.id === '0') {
        this.$message.info('根节点不是组织机构');
        return
      };
      this.setOrgData.id = node.data.id;
      this.getPageInfo({
        type:'org',
        url:'/employee/getEmpByOrg',
        params:{ orgId:node.data.id,page:this.setOrgData.page,size:this.setOrgData.size },
      })
    },
    setOrgDataSizeChange( size ){
      this.setOrgData.size = size;
      this.getPageInfo({
        type:'org',
        url:'/employee/getEmpByOrg',
        params:{ orgId:this.setOrgData.id,page:this.setOrgData.page,size:size },
      })
    },
    setOrgDataCurChange( page ){
      this.setOrgData.page = page;
      this.getPageInfo({
        type:'org',
        url:'/employee/getEmpByOrg',
        params:{ orgId:this.setOrgData.id,page:page,size:this.setOrgData.size },
      })
    },
    selectionOrg( selection ){//获取选中的要添加的员工
      this.setOrgData.selection = selection;
    },
    confirmAddOrg(){//确认添加员工为组织负责人
      let ids = this.setOrgData.selection.map( item => item.id );
      let params = {
        orgId: this.targetGroupId,
        id:ids.join(',')
      }
      this.axios.post('/org/addPrincipal', qs.stringify(params)).then( s => {
        if( s.data.code === 200 ){
          this.$message.success('添加成功');
          this.getPageInfo({ type : 'orgLeader',url : "/org/principalPager",params:{ orgId:this.targetGroupId,page:1,size:10}});
          this.setOrgData.visibleDialog = false;
        } else this.$$message.error( s.data.desc );
      })
    },
    setOrgDataSearch(){//添加员工下的搜索
      this.getPageInfo({
        type:'org',
        url:'/employee/getEmpByOrg',
        params:{ orgId:this.setOrgData.id,page:this.setOrgData.page,size:this.setOrgData.size,s:this.setOrgData.searchText },      
      })
    },
    rightMouseEvent( event,data,node,self ){//
      this.rightMenus.isRightClick = false;
      Object.assign( this.rightMenus.rightMenusStyle ,{
        top:self.$el.offsetTop + 10 + 'px',
        left:event.layerX +  5 +'px',
        position:'absolute'
      });
      this.rightMenus.isRightClick = true;
      this.rightMenus.nodeId = data.id;
    },
    mouseActive( type ){
      if( type !== 'add' && this.rightMenus.nodeId === '0'){
        this.$message.info('根节点无法删除、编辑、移动、设置分级管理员、新增岗位');
        return
      };
      let nodeId = this.rightMenus.nodeId;
      let methods = {
        add: () => { this.rightMenus.addDialog = true },
        del: () => {
          this.$confirm('当前操作将彻底删除该组织，是否继续？','提示',{
            confirmButtonText:'确定',
            cancelButtonText:'取消',
            type:'warning'
          }).then( () => {
            this.axios.post('/org/delete',qs.stringify({ id:nodeId })).then( s => {
              if( s.data.code === 200 ){
                this.$message.success('删除成功');
                this.refreshOrgTree();
              } else this.$message.error( s.data.desc );
            }).catch( err => console.log( err ));
          })
        },
        edit: () => {
          this.axios.get('/org/getById?id=' + nodeId ).then( s => {
            let levelID;
            this.orgLevel.forEach( ( level, index ) => {
              for( let key in level ){
                if( level[key] === s.data.obj.levelID){
                  levelID = this.orgLevel[index].id
                }
              }
            })
            this.rightMenus.addForm = {
              name: s.data.obj.name,
              orgAlias: s.data.obj.orgAlias,
              levelID: levelID,
              status: s.data.obj.status
            };
            this.rightMenus.isAdd = false;
            this.rightMenus.addDialog = true;
          }).catch( err => console.log( err ));
        },
        move: () => {
          this.axios.get('/org/getTree?id=' + nodeId).then( s => {
            if( s.data.code === 200 ){
              this.rightMenus.moveOrgTree.push(s.data.obj);
            }
          })
          this.rightMenus.moveDialog = true;
        },
        set: () => { this.rightMenus.setDialog = true },
        job: () => {
          this.axios.get('/partyLevel/getByType?type=position').then( s => {
            s.data.code === 200 && ( this.rightMenus.addpost.leveloption = s.data.obj );
            this.rightMenus.addpost.visibleDialog = true;
          })
        }
      };
      methods[type]();
    },
    refreshOrgTree(){//刷新组织树
      this.axios.get('/org/orgTree').then( s => {
        this.orgTreeData[0] = s.data.obj;
        this.rightMenus.isRefreshTree ++ ;
      })
    },
    confirmAddOrgForm(){
      this.$refs.rightMenusAddForm.validate( valid => {
        if( valid ){
          this.rightMenus.addForm['parentId'] = this.rightMenus.nodeId;
          this.axios.post('/org/add',qs.stringify(this.rightMenus.addForm)).then( s => {
            if( s.data.code === 200 ){
              this.refreshOrgTree();
              this.$message.success('添加成功');
              this.rightMenus.addDialog = false;
            } else this.$message.error( s.data.desc );
          }).catch( err => console.log( err ));
        }
      })
    },
    confirmUpdateOrgForm(){
      this.$refs.rightMenusAddForm.validate( valid => {
        if( valid ){
          let obj = Object.assign({},this.rightMenus.addForm);
          obj['id'] = this.rightMenus.nodeId;
          this.axios.post('/org/update',qs.stringify(obj)).then( s => {
            if( s.data.code === 200 ){
              this.refreshOrgTree();
              this.$message.success('编辑成功');
              this.rightMenus.addDialog = false;
            } else this.$message.error( s.data.desc );
          })
        }
      })
    },
    orgTreeAddNodeClose(){
      this.$refs.rightMenusAddForm.resetFields();
      this.rightMenus.addForm = {
        name:'',
        orgAlias:'',
        levelID:'',
        status:''
      }
      this.rightMenus.isAdd = true;
    },
    moveOrgTreeNode( data, node, self ){
      this.rightMenus.moveToNodeId = node.data.id;
    },
    confirmMoveTo(){//节点移动保存
      if(  this.rightMenus.moveToNodeId ){
        let params = {
          id:this.rightMenus.nodeId,
          parentId:this.rightMenus.moveToNodeId
        };
        this.axios.post('/org/moveNode',qs.stringify( params )).then( s => {
          if( s.data.code === 200 ){
            this.$message.success('移动成功');
            this.refreshOrgTree();
            this.rightMenus.moveDialog = false;
          } else this.$message.error( s.data.desc );
        })
      } else {
        this.$message.info('请选择移至的节点');
      }
      
    },
    moveDialogClose(){
       this.rightMenus.moveOrgTree = [];//清空移动节点数的数据
       this.rightMenus.moveToNodeId = '';//清除移至的节点
    },
    confirmSetAdmin(){
      console.log(this.rightMenus.setRadio);
    },
    confirmAddPost(){//组织节点树下新增岗位
      this.$refs.postForm.validate( valid => {
        if( valid ){
          let obj = Object.assign({},this.rightMenus.addpost.formData);
          obj['orgID'] = this.rightMenus.nodeId;
          this.axios.post('/position/add',qs.stringify( obj )).then( s => {
            if(  s.data.code === 200 ){
              this.$message.success('新增成功');
              //刷新行政岗位table
              this.getPageInfo({ type : 'post',url : "/org/getPositions",params:{ orgId:this.targetGroupId,page:this.astJobs.page,size:this.astJobs.size}});
              this.rightMenus.addpost.visibleDialog = false;
            } else this.$message.error( s.data.desc);
          })
        }
      })
    },
    addpostDialogClose(){
      this.$refs.postForm.resetFields();
    },
    postRowClick( row ){//行政岗位table行点击
      this.$refs.astJobsTable.toggleRowSelection( row );
    },
    selectpost( selection ){//行政岗位table 选中行数据
      this.astJobs.selection = selection;
    },
    postTableRemove( index, data ){//行政岗位table 行移除
      this.$confirm('当前操作将删除该行数据，是否继续？','提示',{
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        type:'warning'
      }).then( () => {
        this.axios.post('/org/removePos',qs.stringify({
          orgId:this.targetGroupId,
          id:data[index].id
        })).then( s => {
          s.data.code === 200 && ( this.$message.success('成功移除'),data.splice( index,1) );
        }).catch( err => console.log( err ));
      }).catch( () => this.$message.info('已取消操作'));
    },
    postRemove(){
      if( this.astJobs.selection.length === 0 ){
        this.$message.info('请至少选择一行数据')
      } else {
        this.$confirm('当前操作将删除该行数据，是否继续？','提示',{
          confirmButtonText:'确定',
          cancelButtonText:'取消',
          type:'warning'
        }).then( () => {
          let ids = this.astJobs.selection.map( se => se.id );
          this.axios.post('/org/removePos',qs.stringify({
            orgId:this.targetGroupId,
            id:ids.join(',')
          })).then( s => {
            if( s.data.code === 200 ){
              this.getPageInfo({ type : 'post',url : "/org/getPositions",params:{ orgId:this.targetGroupId,page:this.astJobs.page,size:this.astJobs.size}});
              this.$message.success('移除成功');
            }
          }).catch( err => console.log(err));
        }).catch( () => this.$message.info('已取消操作'))
      }
    },
    postSearch(){
      this.$prompt('请输入岗位名','搜索',{
        onfirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then( ({ value }) => {
        this.getPageInfo({ type : 'post',url : "/org/getPositions",params:{
          orgId:this.targetGroupId,
          page:this.astJobs.page,
          size:this.astJobs.size,
          s:value
        }});
      }).catch( () => this.$message.info('取消搜索'))
    },
    postTableSizeChange( size ){
      this.astJobs.size = size;
      this.getPageInfo({ type : 'post',url : "/org/getPositions",params:{
        orgId:this.targetGroupId,
        page:this.astJobs.page,
        size:size,
      }});
    },
    postTableCurrentChange( page ){
      this.astJobs.page = page;
      this.getPageInfo({ type : 'post',url : "/org/getPositions",params:{
        orgId:this.targetGroupId,
        page:page,
        size:this.astJobs.size,
      }});
    },
    getPostTree(){//获取行政岗位树
      this.axios.get('/position/posTreeWithNoOrg').then( res => {
        if( res.data.code === 200 ){
          this.astJobs.treeData[0] = res.data.obj;
          this.astJobs.treeDialog = true;
        }
      })
    },
    postTreeCheck(){
      this.astJobs.checkPostTreeNode = this.$refs.postTree.getCheckedNodes();
    },
    confirmJoinPost(){
      let nodes = this.astJobs.checkPostTreeNode;
      if( nodes.length === 0 ){
        this.$message.info('请至少选择一个岗位');
      } else {
        let ids = nodes.map( node => node.id );
        this.axios.post('/org/addPos',qs.stringify({
          orgId: this.targetGroupId,
          id:ids.join(',')
        })).then( res => {
          if( res.data.code === 200 ){
            this.getPageInfo({ type : 'post',url : "/org/getPositions",params:{
              orgId:this.targetGroupId,
              page:this.astJobs.page,
              size:this.astJobs.size,
            }});
            this.astJobs.treeDialog = false;
          } else this.$message.info( res.data.desc );
        }).catch( err => console.log( err ));
      }
    },
    postTreeDialogClose(){
      this.astJobs.refreshTree ++;
    },
  },
}
</script>
<style lang='less' scoped>
  .orgAndManage {
    padding: 10px;
    position: relative;
    & .topBtns {
      padding: 10px;
      text-align: right
    }
    & .el-tree {
      height: 300px;
      overflow-y: auto;
    }
  }
  .fontDesc{
    font-size: 12px;
    display: flex;
    flex-flow: row nowrap;
    padding: 5px 0px;
    & p:nth-child(1){
      width: 200px;
    }
  }
  .rightMenus{
    border:1px solid #ddd;
    border-radius: 4px;
    padding: 5px 0px;
    background: #fff;
    z-index: 100001;
    width: 150px;
    & li {
      padding: 3px 10px;
      cursor: pointer;
      & span {
        padding-left: 5px;
      }
    }
    & li:hover {
      background: #3490de;
      color:#fff;
    }
  }
</style>