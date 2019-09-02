<!--
 * @Date: 2019-08-16 09:18:16
 * @LastEditors: Yqoo
 * @LastEditTime: 2019-09-02 18:44:04
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
                  <el-button type='primary' size='mini' icon='el-icon-search'>搜索</el-button>
                  <el-button type='success' size='mini' icon='el-icon-circle-plus-outline'>加入</el-button>
                  <el-button type='danger' size='mini' icon='el-icon-circle-close'>移除</el-button>
                </el-button-group>
              </div>
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
            <el-table-column fixed='left' type='selection' width='50'></el-table-column>
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
        <el-button type='success' size='mini' @click='confirmAddOrg'>确认</el-button>
        <el-button type='info' size='mini'  @click='setOrgData.visibleDialog = false'>关闭</el-button>
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
      rightMenus:{//右键菜单
        isRightClick:false,//控制组织树右键点击弹出框的显示
        rightMenusStyle:{},
        data:[
          { name:'增加',type:'add',icon:'el-icon-plus' },
          { name:'编辑',type:'edit',icon:'el-icon-edit' },
          { name:'删除',type:'delete',icon:'el-icon-delete' },
          { name:'移动节点',type:'move',icon:'el-icon-sort' },
          { name:'设置分级管理员',type:'set',icon:'el-icon-setting' },
          { name:'新增岗位',type:'job',icon:'el-icon-circle-plus-outline' },
        ],
      },
      orgTreeData:[],//组织树
      targetGroupId:null,//被选中的组织\
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
      },
      astJobs:{//行政岗位 -- 数据
        tableData:[],
        searchText:'',
      },
      ac:this.offset,
    };
  },
  created(){
    let getOrgTree = () => this.axios.get('/org/orgTree');
    this.axios.all([ getOrgTree() ]).then( this.axios.spread( (orgTree) => {
      this.orgTreeData.push( orgTree.data.obj );
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
            this.orgBasicInfo[b].value = basic.data.obj[b];
          }
        })).catch( err => console.log( err ));
        this.getPageInfo({ type : 'orgLeader',url : "/org/principalPager",params:{ orgId:node.data.id,page:1,size:10}})
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
    },
    mouseActive( type ){
      console.log( type )
    }
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