<!--
 * @Date: 2019-08-16 09:18:16
 * @LastEditors: Yqoo
 * @LastEditTime: 2019-09-05 14:48:52
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
            <el-tab-pane label="归属组织">用户管理</el-tab-pane>
            <el-tab-pane label="岗位人员">用户管理</el-tab-pane>
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
      targetPostId:null,//组织id
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
    };
  },
  created(){
    let getPostTree = () => this.axios.get('/position/positionTree');//获取岗位树
    let getPostLevel = () => this.axios.get('/partyLevel/getByType?type=position');//获取岗位等级
    this.axios.all([getPostTree(),getPostLevel()]).then( this.axios.spread( ( postTree, postLevel ) => {
      this.postTreeData.treeNode.push(postTree.data.obj) ;
      this.postLevelOption = postLevel.data.obj;
    })).catch( err => console.log(err ));
  },
  methods:{
    postTreeClick( data, node, self ){
      if( node.data.id === '0') this.$message.info('根节点不是岗位');
      else {
        this.targetPostId = node.data.id;
        let getPostDetail = () => this.axios.get('/position/getById?id=' + node.data.id );
        this.axios.all([getPostDetail()]).then( this.axios.spread( ( detail ) => {
          let detailObj = detail.data.obj;
          for( let dKey in this.postDetail ){
            if( dKey === 'levelID'){
              let val = detailObj[dKey];
              this.postDetail[dKey].value = this.filterOptions[val];
            } else this.postDetail[dKey].value = detailObj[dKey];
            
          }
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
</style>