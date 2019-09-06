<!--
 * @Date: 2019-08-16 09:18:16
 * @LastEditors: Yqoo
 * @LastEditTime: 2019-09-06 11:17:15
 * @Desc: 组织与用户下的岗位管理组件
 -->
<template>
  <div class='postAndManage'>
    <el-row>
      <el-col :span='4'>
        <el-tree
          :data="postTreeData.treeNode"
          node-key="id"
          :expand-on-click-node="false"
          ref='orgTree'
          highlight-current
          @node-click='postTreeClick'
          style="padding-top:7px;"
          @node-contextmenu="rightMouseEvent"
          :key='postTreeData.isRefreshTree'
          >
        </el-tree>
        <ul v-if='rightMenus.isRightClick' 
          :style="rightMenus.rightMenusStyle" class="rightMenus" 
          @mouseleave="rightMenus.isRightClick = false">
          <li v-for="( item,index) in rightMenus.data" :key="index" @click="mouseMethods( item.type )">
            <i :class="item.icon"></i>
            <span>{{item.name}}</span>
          </li>
        </ul>
      </el-col>
      <el-col :span='20'>
        <div v-show="targetPostId">
          <el-tabs>
            <el-tab-pane label="岗位明细">
              <ul class="postDetail">
                <li v-for='(item,key) in postDetail' :key="key">
                  <div>{{ item.desc }} :</div>
                  <div>{{ item.value}}</div>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="归属组织">
              <ul class="postDetail">
                <li>
                  <div>组织名称：</div>
                  <div>{{ownerGroupInfo.name}}</div>
                </li>
                <li>
                  <div>等级：</div>
                  <div>{{ownerGroupInfo.levelID}}</div>
                </li>
                <li>
                  <div>状态：</div>
                  <div>{{orgStatus[ownerGroupInfo.status]}}</div>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="岗位人员">
              <div class="topBtns">
                <el-button-group>
                  <el-button type='primary' icon='el-icon-search' size='mini' @click="staffBtnsHandler('search')">搜索</el-button>
                  <el-button type='success' icon='el-icon-circle-plus' size='mini' @click="staffBtnsHandler('join')">加入</el-button>
                  <el-button type='danger' icon='el-icon-error' size='mini' @click="staffBtnsHandler('isDel')">移除</el-button>
                </el-button-group>
              </div>
              <el-table
                :data="staffsPosition.tableData"
                @selection-change='selectStaffs'
                size='mini'
                style='width:100%'
                height='300'
                stripe
                ref='staffsTable'
                >
                <el-table-column fixed type='selection' width='50'></el-table-column>
                <el-table-column prop='name' label='姓名'></el-table-column>
                <el-table-column prop='orgName' label='归属组织'></el-table-column>
                <el-table-column prop='gender' label='性别'>
                  <template slot-scope="scope">
                    {{ scope.row.gender === 'female'? '女':'男' }}
                  </template>
                </el-table-column>
                <el-table-column prop='createTime' label='创建时间' show-overflow-tooltip></el-table-column>
                <el-table-column prop='status' label='状态'>
                  <template slot-scope="scope">
                    {{ staffStatus[scope.row.status] }}
                  </template>
                </el-table-column>
                <el-table-column fixed='right' label='关联操作'>
                  <template slot-scope="scope">
                    <el-button type='text' icon='el-icon-refresh-right' title='撤销主岗位' @click="tableColumnTools(scope.$index,staffsPosition.tableData,'isMain')"></el-button>
                    <el-button type='text' icon='el-icon-s-custom' title='撤销主负责人' @click="tableColumnTools(scope.$index,staffsPosition.tableData,'isPrin')"></el-button>
                    <el-button type='text' icon='el-icon-error' title='移除' @click="tableColumnTools(scope.$index,staffsPosition.tableData,'isDel')"></el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination
                @size-change="staffSizeChange"
                @current-change="staffCurrentChange"
                :current-page="staffsPosition.page"
                :hide-on-single-page="true"
                :page-sizes="[10,20,30,40]"
                :page-size="staffsPosition.size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="staffsPosition.total"
                small
                style="margin:10px 0px">
              </el-pagination>
            </el-tab-pane>
            <el-tab-pane label="扩展属性">用户管理</el-tab-pane>
            <el-tab-pane label="已分配角色">用户管理</el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
    <!-- 增加岗位 -->
    <el-dialog
      :visible.sync='addPost.dialogVisible'
      v-dialogDrag
      :modal="false"
      width="30%"
      :close-on-click-modal="false"
      @close="rightMouseAorUPostClose"
      >
      <div slot="title">
        <div v-if="addPost.isAdd">
          <i class="el-icon-circle-plus"></i>
          <span>增加岗位</span>
        </div>
        <div v-else>
          <i class="el-icon-edit"></i>
          <span>编辑岗位</span>
        </div>
      </div>
      <div style="padding:20px 0px;">
        <el-form
          :model="addPost.formData"
          label-width='100px'
          ref='rightMenusAddForm'
          :rules='addPost.formRules'
          size='small'
          >
          <el-form-item prop='name' label='岗位名称'>
            <el-input v-model='addPost.formData.name'></el-input>
          </el-form-item>
          <el-form-item prop='posAlias' label='岗位别名'>
            <el-input v-model='addPost.formData.posAlias' :disabled="!addPost.isAdd"></el-input>
          </el-form-item>
          <el-form-item prop='levelID' label='岗位等级'>
            <el-select v-model='addPost.formData.levelID'>
              <el-option v-for="(op,key) in levelOption" :key='key' :label='op' :value='key'></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop='desc' label='岗位说明'>
            <el-input v-model='addPost.formData.desc'></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <el-button type='success' size='mini' @click="confirmHandler">确认</el-button>
        <el-button type='info' size='mini'>取消</el-button>
      </div>
    </el-dialog>
    <!-- 员工搜索 -->
    <el-dialog
      :visible.sync='staffsPosition.search.dialogVisible'
      v-dialogDrag
      :modal="false"
      width="30%"
      :close-on-click-modal="false"
      >
      <div slot="title">
        <i class="el-icon-search"></i>
        <span>员工搜索</span>
      </div>
      <div>
        <el-form :data="staffsPosition.search" size='small' label-width='100px' style='padding:20px 0px;'>
          <el-form-item label='姓名'>
            <el-input v-model='staffsPosition.search.name'></el-input>
          </el-form-item>
          <el-form-item label='创建时间'>
            <el-date-picker
              v-model="staffsPosition.search.time"
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
        <el-button type='success' size='mini' @click="confirmStaffSearch">确认</el-button>
        <el-button type='info' size='mini' @click='staffsPosition.search.dialogVisible = false'>取消</el-button>
      </div>
    </el-dialog>
    <!-- 人员选择框 -->
    <el-dialog
      :visible.sync='staffsPosition.personalSelection.dialogVisible'
      v-dialogDrag
      :modal="false"
      width="50%"
      :close-on-click-modal="false"
      >
      <div slot="title">
        <i class="el-icon-user"></i>
        <span>人员选择</span>
      </div>
      <div slot="footer">
        <el-button type='success' size='mini'>确认</el-button>
        <el-button type='info' size='mini'>取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import qs from 'qs';
export default {
  name: 'postAndManage',
  components: {},
  data() {
    return {
      postTreeData:{//岗位树数据
        treeNode:[],//岗位树
        isRefreshTree:1,//控制刷新树
      },
      postDetail: {
        name: { desc:'岗位名称',value: ''},
        posAlias: { desc:'岗位别名',value: ''},
        levelID: { desc:'岗位等级',value: ''},
        desc: { desc:'岗位说明',value: ''},
        createTime: { desc:'创建时间',value: ''},
        updateTime: { desc:'更新时间',value: ''},
      },
      targetPostId:null,//岗位id
      postLevelOption:[],//岗位等级下拉
      filterOptions:{},//格式化后的岗位等级下拉
      rightMenus:{
        isRightClick:false,
        rightMenusStyle:{},
        nodeId:null,//岗位id
        data:[
          { name:'增加',type:'add',icon:'el-icon-plus' },
          { name:'编辑',type:'edit',icon:'el-icon-edit' },
          { name:'删除',type:'del',icon:'el-icon-delete' },
          { name:'移动节点',type:'move',icon:'el-icon-sort' },
        ],
      },
      addPost:{//右键增加岗位
        dialogVisible: false,
        isAdd: true,// 新增 -- false -- 编辑
        formData:{
          name: '',
          posAlias: '',
          levelID: '',
          desc: '',
        },
        formRules: {
          name: [
            { required: true, message: '请输入岗位名称', trigger: 'blur' }
          ],
          posAlias: [
            { required: true, message: '请输入岗位别名', trigger: 'blur' }
          ],
          levelID: [
            { required: true, message: '请选择岗位等级', trigger: 'change' }
          ],
        },
      },
      orgStatus:{},//组织状态类型
      staffStatus:{},//员工状态
      ownerGroupInfo:{//归属组织信息
        name: '',
        levelID: '',
        status: '',
      },
      staffsPosition:{//岗位人员信息
        tableData:[],
        total:0,
        page:1,
        size:10,
        selection:[],
        search:{
          dialogVisible:false,
          name: '',
          time: ''
        },
        personalSelection:{//人员选择框数据
          dialogVisible: false,
          tableData:[],
          total:0,
          page:1,
          size:10,
          selection:[],
        },
      },
    };
  },
  created(){
    let getPostTree = () => this.axios.get('/position/positionTree');//获取岗位树
    let getPostLevel = () => this.axios.get('/partyLevel/getByType?type=position');//获取岗位等级
    let getOrgStatus = () => this.axios.get('/org/orgStatus');//获取组织状态类型
    let getStaffStatus = () => this.axios.get('/employee/userStatus');//获取员工的状态类型
    this.axios.all([getPostTree(),getPostLevel(),getOrgStatus(),getStaffStatus()]).then( this.axios.spread( ( postTree, postLevel,orgStatus,staffStatus ) => {
      this.postTreeData.treeNode.push(postTree.data.obj) ;
      this.postLevelOption = postLevel.data.obj;
      Object.assign( this.orgStatus,orgStatus.data.obj );
      Object.assign( this.staffStatus,staffStatus.data.obj );
    })).catch( err => console.log(err ));
  },
  methods:{
    getPage( { type, url ,params } ){
      let methods = {
        staff: () => {//员工分页
          this.axios.get( url, {params} ).then( s => {
            if( s.data.code === 200 ){
              this.staffsPosition.tableData = s.data.obj && s.data.obj.records;
              this.staffsPosition.total = s.data.obj && s.data.obj.total;
            }
          })    
        }
      };
      methods[type]();
    },
    postTreeClick( data, node, self ){
      if( node.data.id === '0') this.$message.info('根节点不是岗位');
      else {
        this.targetPostId = node.data.id;
        let getPostDetail = () => this.axios.get('/position/getById?id=' + node.data.id );
        let getOrgInfo = () => this.axios.get('/position/getOrg?id=' + node.data.id );//获取岗位归属组织详细信息
        let getStaffsTableData = () => this.axios.get(`/position/getEmployees?pid=${node.data.id}&page=1&size=10`);//获取岗位人员分页信息
        this.axios.all([getPostDetail(),getOrgInfo(),getStaffsTableData()]).then( this.axios.spread( ( detail,orgInfo,staffsTable ) => {
          let detailObj = detail.data.obj;
          for( let dKey in this.postDetail ){
            if( dKey === 'levelID'){
              let val = detailObj[dKey];
              this.postDetail[dKey].value = this.filterOptions[val];
            } else this.postDetail[dKey].value = detailObj[dKey];
            
          };
          for( let oKey in this.ownerGroupInfo ){
            try {
              this.ownerGroupInfo[oKey] = orgInfo.data.obj[oKey];
            } catch (error) {
              this.ownerGroupInfo[oKey] = '';
            }
          };
          this.staffsPosition.tableData = staffsTable.data.obj.records;
          this.staffsPosition.total = staffsTable.data.obj.total;
        }))
      }
    },
    rightMouseEvent( event,data,node,self ){
      this.rightMenus.isRightClick = false;
      Object.assign( this.rightMenus.rightMenusStyle ,{
        top:self.$el.offsetTop + 10 + 'px',
        left:event.layerX +  5 +'px',
        position:'absolute'
      });
      this.rightMenus.nodeId = data.id;
      this.rightMenus.isRightClick = true;
    },
    refreshPostTree(  msg ){//刷新岗位树
      this.axios.get('/position/positionTree').then( suc => {
        this.postTreeData.treeNode[0] = suc.data.obj;
        this.postTreeData.isRefreshTree ++;
        this.$message.success( msg );
      })
    },
    mouseMethods( type ){
      let actives = {
        add: () => this.addPost.dialogVisible = true,
        edit: () => {
          this.axios.get('/position/getById?id='+ this.rightMenus.nodeId).then( res => {
            if( res.data.code === 200 ){
              for( let key in this.addPost.formData ){
                this.addPost.formData[key] = res.data.obj[key]
              }
            } else this.$message.error( res.data.desc );
          })
          this.addPost.isAdd = false;
          this.addPost.dialogVisible = true;
        },
        del: () => {
          this.$confirm('当前操作将删除所选择的岗位，是否继续？','提示',{
            confirmButtonText: '确定',
            cancalButtonText: '取消',
            type: 'warning'
          }).then( () => {
            this.axios.post('/position/delete',qs.stringify({ id: this.rightMenus.nodeId })).then( res => {
              if( res.data.code === 200 ){
                this.refreshPostTree('删除成功');
              } else this.$message.error( res.data.desc );
            }).catch( err => this.$message.error('系统错误'));
          }).catch( () => this.$message.info('已取消删除操作'));
        },
      }
      actives[type]();
    },
    confirmHandler(){//新增或编辑岗位树节点
      this.$refs.rightMenusAddForm.validate( valid => {
        if( valid ){
          let url = this.addPost.isAdd? '/position/add':'/position/update';
          let msg = this.addPost.isAdd? '新增成功':'修改成功';
          let params = Object.assign({},this.addPost.formData);
          this.addPost.isAdd || ( delete params['posAlias'], params['id'] = this.rightMenus.nodeId );
          this.axios.post( url, qs.stringify( params )).then( res => {
            if( res.data.code === 200 ){
              this.refreshPostTree(msg);
              this.addPost.dialogVisible = false;
            } else this.$message.error( res.data.desc );
          }).catch( err => this.$message.error('系统错误'));
        }
      })
    },
    rightMouseAorUPostClose(){//新增 或编辑岗位框关闭的回调
      this.addPost.isAdd = true;
      Object.assign( this.addPost.formData,{
        name: '',
        posAlias: '',
        levelID: '',
        desc: '',
      });
      this.$refs.rightMenusAddForm.resetFields();
    },
    staffCurrentChange( page ){//员工分页当前页改变的回调
      this.staffsPosition.page = page;
      this.getPage({ type : 'staff',url : "/position/getEmployees",params:{
        pid: this.targetPostId,
        page: page,
        size: this.staffsPosition.size
      }});
    },
    staffSizeChange( size ){
      this.staffsPosition.size = size;
      this.getPage({ type : 'staff',url : "/position/getEmployees",params:{
        pid: this.targetPostId,
        page: this.staffsPosition.page,
        size: size
      }});
    },
    selectStaffs( selection ){
      this.staffsPosition.selection = selection;
    },
    tableColumnTools( index, data ,type ){
      let actives = {
        isDel: () => {
          this.$confirm('当前操作将移除该行数据，是否继续？','提示',{
            confirmButtonText:'确定',
            cancalButtonText:'取消',
            type:'warning'
          }).then( () => {
            this.axios.post('/position/removeEmp',qs.stringify({ pid: this.targetPostId, id: data[index].id })).then( res => {
              if( res.data.code === 200 ){
                data.splice( index,1 );
                this.staffsPosition.total --;
                this.$message.success('成功移除');
              } else this.$message.error( res.data.desc );
            })
          }).catch( () => this.$message.info('已取消移除'));
        },
      };
      actives[type]();
    },
    staffBtnsHandler( type ){
      let methods = {
        isDel: () => {
          if( this.staffsPosition.selection.length === 0 ){
            this.$message.info('请至少选择一条数据进行移除');
          } else {
            this.$confirm('当前操作将移除所选择的数据，是否继续？','提示',{
              confirmButtonText: '确定',
              cancalButtonText: '取消',
              type: 'warning'
            }).then( () => {
              let ids = this.staffsPosition.selection.map( s => s.id );
              this.axios.post('/position/removeEmp',qs.stringify({ pid: this.targetPostId, id: ids.join(',')})).then( res => {
                if( res.data.code === 200 ){
                  this.getPage({ type : 'staff',url : "/position/getEmployees",params:{
                    pid: this.targetPostId,
                    page: this.staffsPosition.page,
                    size: this.staffsPosition.size
                  }});
                  this.$message.success('成功移除');
                } else this.$message.error( res.data.desc);
              }).catch( err => this.$message.error('系统错误'));
            }).catch( () => this.$message.info('已取消移除'));
          }
        },
        search: () => {
          this.staffsPosition.search.dialogVisible = true;
        },
        join: () => this.staffsPosition.personalSelection.dialogVisible = true,
      };
      methods[type]();
    },
    confirmStaffSearch(){//员工搜索
      let sTime = '',eTime = '';
      if( Array.isArray( this.staffsPosition.search.time )){
        sTime = this.staffsPosition.search.time[0];
        eTime = this.staffsPosition.search.time[1];
      };
      this.getPage({ type : 'staff',url : "/position/getEmployees",params:{
        pid: this.targetPostId,
        page: this.staffsPosition.page,
        size: this.staffsPosition.size,
        s: this.staffsPosition.search.name,
        startTime: sTime,
        endTime: eTime
      }});
      this.staffsPosition.search.dialogVisible = false;
    },
  },
  computed:{
    levelOption(){//岗位等级下拉数据过滤
      if( this.postLevelOption.length > 0 ){
        let obj = {};
        this.postLevelOption.forEach( item => {
          obj[item.id] = item.name
        })
        Object.assign( this.filterOptions,obj );
        return obj;
      };
    },
  },
}
</script>
<style lang='less' scoped>
  .postAndManage{
    & .el-row {
      & .el-tree{
        height: 450px;
        overflow-y: auto;
      }
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
      padding: 6px 10px;
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
  .postDetail{
    padding: 20px 10px;
    & li {
      padding: 8px 0px;
      display: flex;
      flex-flow: row nowrap;
      & div:nth-child(1){
        width: 150px;
      }
    }
  }
  .topBtns {
    padding: 5px 10px;
    text-align: right;
  }
</style>