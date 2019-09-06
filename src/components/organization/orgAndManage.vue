<!--
 * @Date: 2019-08-16 09:18:16
 * @LastEditors: Yqoo
 * @LastEditTime: 2019-09-06 08:56:55
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
            <el-tab-pane label='组织人员'>
              <div class="topBtns">
                <el-button-group>
                  <el-button type='primary' size='mini' icon='el-icon-search' @click='organizer.searchDialog = true'>搜索</el-button>
                  <el-button type='success' size='mini' icon='el-icon-circle-plus' @click="organizerJoin">加入</el-button>
                  <el-button type='info' size='mini' icon='el-icon-error' @click='organizerRemove'>移除</el-button>
                </el-button-group>
              </div>
              <el-table
                :data='organizer.tableData'
                @selection-change='selectOrg'
                size='mini'
                style='width:100%'
                height='300'
                stripe
                ref='organizerTable'
                >
                <el-table-column type='selection' fixed='left' width='50'></el-table-column>
                <el-table-column prop='account' label='账号'></el-table-column>
                <el-table-column prop='name' label='姓名'></el-table-column>
                <el-table-column prop='account' label='归属组织'></el-table-column>
                <el-table-column prop='gender' label='性别'></el-table-column>
                <el-table-column prop='createTime' label='创建时间' :show-overflow-tooltip='true'></el-table-column>
                <el-table-column prop='status' label='状态'>
                  <template slot-scope="scope">
                    {{organizer.options[scope.row.status]}}
                  </template>
                </el-table-column>
                <el-table-column label='关联操作'>
                  <template slot-scope="scope">
                    <el-button type='text' icon='el-icon-error' title='移除' @click='organizerRemoveRow( scope.$index,organizer.tableData)'></el-button>
                  </template>
                </el-table-column>
              </el-table>
               <el-pagination
                @size-change="orgSizeChange"
                @current-change="orgCurrentChange"
                :current-page="organizer.oPage"
                :hide-on-single-page="false"
                :page-sizes="[10, 20, 30, 40, 50]"
                :page-size="organizer.oSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="organizer.oTotal"
                small
                style="margin:10px 0px">
              </el-pagination>
            </el-tab-pane>
            <el-tab-pane label='扩展属性'>
              <el-form :data="extendsFormData" size="small" label-width="150px">
                <el-form-item v-for="( item,key ) in extendsFormData" :key='key' :label='item.label'>
                  <div v-if="item.type === 'radio' ">
                    <el-radio-group v-model='item.value'>
                      <el-radio v-for="( r,i ) in item.data" :key="i" :label="r.label" :value="r.value"></el-radio>
                    </el-radio-group>
                  </div>
                  <div v-else-if=" item.type === 'checkbox'">
                    <el-checkbox-group v-model="item.value">
                      <el-checkbox v-for="(c,i) in item.data" :key='i' :value="c.value" :label="c.label"></el-checkbox>
                    </el-checkbox-group>
                  </div>
                  <div v-else-if=" item.type === 'date'">
                     <el-date-picker
                      v-model="item.value"
                      type="date"
                      placeholder="选择日期">
                    </el-date-picker>                  </div>
                  <div v-else-if=" item.type === 'boolean' ">
                    <el-radio-group v-model='item.value'>
                      <el-radio v-for="( r,i ) in item.data" :key="i" :label="r.label" :value="r.value"></el-radio>
                    </el-radio-group>
                  </div>
                  <div v-else>
                    <el-input v-model='item.value'></el-input>
                  </div>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label='已分配角色'>
              <div class="topBtns">
                <el-button type='primary' size='mini' icon='el-icon-circle-plus' @click='addRole'>添加角色</el-button>
              </div>
              <el-table
                :data='assignRole.tableData'
                size='mini'
                style='width:100%'
                height='300'
                stripe
                ref='assignRoleTable'
                >
                <el-table-column prop='name' label='角色'></el-table-column>
                <el-table-column prop='roleAlias' label='别名'></el-table-column>
                <el-table-column prop='from' label='来源'>
                  <template slot-scope="scope">
                    {{ scope.row.from? scope.row.from:'自有'}}
                  </template>
                </el-table-column>
                <el-table-column label='关联操作'>
                  <template slot-scope="scope">
                    <el-button type='text' size='mini' icon='el-icon-error' title='移除' @click='delAssignRoleRow( scope.$index, assignRole.tableData)'></el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination
                @size-change="roleSizeChange"
                @current-change="roleCurrentChange"
                :current-page="assignRole.page"
                :hide-on-single-page="true"
                :page-sizes="[10, 20, 30, 40, 50]"
                :page-size="assignRole.size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="assignRole.total"
                small
                style="margin:10px 0px">
              </el-pagination>
            </el-tab-pane>
            <el-tab-pane label='组织分级管理'>
              <div class="topBtns">
                <el-button-group>
                  <el-button type='primary' size='mini' icon='el-icon-search' @click="orgManSearch">搜索</el-button>
                  <el-button type='success' size='mini' icon='el-icon-plus' @click="rightMenus.setDialog = true ">添加</el-button>
                  <el-button type='danger' size='mini' icon='el-icon-delete' @click="orgManageDelete">删除</el-button>
                </el-button-group>
              </div>
              <div>
                <el-table
                  :data="orgLevelMan.tableData"
                  @selection-change='selectOrgManage'
                  size='mini'
                  style='width:100%'
                  height='300'
                  stripe
                  ref='orgLevelManTable'
                  >
                  <el-table-column type='selection'></el-table-column>
                  <el-table-column prop='managerName' label='用户姓名'></el-table-column>
                  <el-table-column prop='orgName' label='组织名称' show-overflow-tooltip></el-table-column>
                  <el-table-column prop='orgPerms' label='组织操作权限' :formatter="filterRole" show-overflow-tooltip></el-table-column>
                  <el-table-column prop='userPerms' label='子组织操作权限' :formatter="filterRole" show-overflow-tooltip></el-table-column>
                  <el-table-column prop='createTime' label='创建时间' show-overflow-tooltip></el-table-column>
                  <el-table-column label='关联操作'>
                    <template slot-scope="scope">
                      <el-button type='text' size='mini' icon='el-icon-edit' title='编辑' @click="editManageRow( scope.$index,orgLevelMan.tableData )"></el-button>
                      <el-button type='text' size='mini' icon='el-icon-error' style='color:red' title='删除' @click="delManageRow( scope.$index,orgLevelMan.tableData )"></el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <el-pagination
                  @size-change="orgManSizeChange"
                  @current-change="orgManCurrentChange"
                  :current-page="orgLevelMan.page"
                  :hide-on-single-page="false"
                  :page-sizes="[10,20,30,40,50]"
                  :page-size="orgLevelMan.size"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="orgLevelMan.total"
                  small
                  style="margin:10px 0px">
                </el-pagination>
              </div>
            </el-tab-pane>
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
                <el-radio :label='scope.row.id + " " + scope.row.name '  v-model='rightMenus.setRadio'><span style="opacity:0;">.</span></el-radio>
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
      @close="setDialogClose"
      >
      <div slot="title">
        <i class="el-icon-setting"></i>
        <span>设置分级管理员</span>
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
            <el-input v-model='targetGroupName' disabled></el-input>
          </el-form-item>
          <el-form-item label='本层级组织操作授权项'>
            <el-checkbox-group v-model='rightMenus.setAdminFormData.orgPerms'>
              <el-checkbox label="add" >增加</el-checkbox>
              <el-checkbox label="del">删除</el-checkbox>
              <el-checkbox label="edit">修改</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label='其子级组织操作授权项'>
            <el-checkbox-group v-model='rightMenus.setAdminFormData.userPerms'>
              <el-checkbox label="add">增加</el-checkbox>
              <el-checkbox label="del">删除</el-checkbox>
              <el-checkbox label="edit">修改</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <el-button type='success' size='mini' @click="confirmSetManagement">确定</el-button>
        <el-button type='info' size='mini' @click="rightMenus.setDialog = false">取消</el-button>
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
    <el-dialog
      :visible.sync='organizer.organizerDialog'
      v-dialogDrag
      :modal="false"
      width="50%"
      :close-on-click-modal="false"
      >
      <div slot="title">
        <i class="el-icon-circle-plus"></i>
        <span>组织人员选择</span>
      </div>
      <div>
        <div class="topBtns">
          <el-form :inline='true' size='small'>
            <el-form-item label='状态'>
              <el-select v-model='organizer.searchStatus' size='mini'>
                <el-option label='全部' value=''></el-option>
                <el-option v-for="(op,key) in organizer.options" :key="key" :label='op' :value='key'></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label='姓名'>
              <el-input v-model='organizer.searchName' size='mini'></el-input>
            </el-form-item>
            <el-button type='success' size='mini' icon='el-icon-search' style="margin-top:3px;" @click="searchOrgJoin">搜索</el-button>
          </el-form>        
        </div>
        <el-table
          :data="organizer.dialogTableData"
          @selection-change='selectOrgJoin'
          size='mini'
          style='width:100%'
          height='300'
          stripe
          ref='organizerDialogTable'
          >
          <el-table-column fixed='left' type='selection' width='50'></el-table-column>
          <el-table-column prop='name' label='名称'></el-table-column>
          <el-table-column prop='gender' label='性别'>
            <template slot-scope="scope">
              {{ scope.row.gender === 'female'?'女':'男' }}
            </template>
          </el-table-column>
          <el-table-column prop='status' label='状态'>
            <template slot-scope="scope">
              {{organizer.options[scope.row.status]}}
            </template>
          </el-table-column>
          <el-table-column prop='createTime' label='创建时间' show-overflow-tooltip></el-table-column>
        </el-table>
        <el-pagination
          @size-change="orgJoinSizeChange"
          @current-change="orgJoinCurrentChange"
          :current-page="organizer.page"
          :hide-on-single-page="false"
          :page-sizes="[10, 20, 30, 40, 50]"
          :page-size="organizer.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="organizer.total"
          small
          style="margin:10px 0px">
        </el-pagination>
      </div>
      <div slot="footer">
        <el-button type='success' size='mini' @click='confirmOrgJoin'>确认</el-button>
        <el-button type='info' size='mini' @click="organizer.organizerDialog = false">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync='organizer.searchDialog'
      v-dialogDrag
      :modal="false"
      width="22.5%"
      :close-on-click-modal="false"
      @close="oSearchDialogClose"
      >
      <div slot="title">
        <i class="el-icon-search"></i>
        <span>搜索</span>
      </div>
      <el-form size='small'>
        <el-form-item label='姓名'>
          <el-input v-model='organizer.sName'></el-input>
        </el-form-item>
        <el-form-item label='创建时间'>
           <el-date-picker
            v-model="organizer.sTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"  
            value-format=" yyyy/MM/dd">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type='success' size='mini' @click='confirmOsearch'>确定</el-button>
        <el-button type='info' size='mini' @click="organizer.searchDialog = false">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync='assignRole.addRoleDialog'
      v-dialogDrag
      :modal="false"
      width="40%"
      :close-on-click-modal="false"
      >
      <div slot="title">
        <i class="el-icon-circle-plus"></i>
        <span>角色选择</span>
      </div>
      <div>
        <div class="topBtns">
          <el-input v-model='assignRole.searchName' size='mini' placeholder='请输入角色名称'>
            <el-button slot="append" icon="el-icon-search" @click='addRoleSearch'></el-button>
          </el-input>
        </div>
        <el-table
          :data="assignRole.dialogTableData"
          size='mini'
          style='width:100%'
          height='300'
          stripe
          ref='addRoleDialogTable'
          @selection-change='selectRoleJoin'
          >
          <el-table-column type='selection' width='50'></el-table-column>
          <el-table-column prop='name' label='角色名称'></el-table-column>
          <el-table-column prop='roleAlias' label='角色别名'></el-table-column>
        </el-table>
        <el-pagination
          @size-change="addroleSizeChange"
          @current-change="addroleCurrentChange"
          :current-page="assignRole.aPage"
          :hide-on-single-page="true"
          :page-sizes="[10, 20, 30, 40, 50]"
          :page-size="assignRole.aSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="assignRole.aTotal"
          small
          style="margin:10px 0px">
        </el-pagination>
      </div>
      <div slot="footer">
        <el-button type='success' size='mini' @click="confirmAddRole">确认</el-button>
        <el-button type='danger' size='mini' @click="resetChooseRoles">清空</el-button>
        <el-button type='info' size='mini' @click=" assignRole.addRoleDialog = false ">取消</el-button>
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
        isMouse:false,//判断是右键打开的分级设置还是tab下打开的分级设置管理
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
          managerID:'',
          orgID:'',
          orgPerms:[],
          userPerms:[],
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
      targetGroupName:null,//被选中的组织名称
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
      organizer:{//组织人员下 -- 数据
        tableData:[],
        oTotal:0,
        oPage:1,
        oSize:10,
        options:{},
        oSelection:[],//外部表被选中项数据
        searchDialog:false,//外部搜索框
        sName:'',//外部搜索姓名
        sTime:'',//外部搜索时间
        organizerDialog:false,
        searchStatus:'',//搜索下的状态选择
        searchName:'',
        dialogTableData:[],//弹出框下的table data 
        total:0,
        page:1,
        size:10,
        selection:[],//加入的被选中表数据
      },
      assignRole:{//已分配角色下 -- 数据
        tableData:[],
        total:0,
        page:1,
        size:10,
        addRoleDialog:false,
        dialogTableData:[],
        aTotal:0,
        aPage:1,
        aSize:10,
        searchName:'',
        selection:[],
      },
      orgLevelMan:{//组织分级管理
        tableData:[],
        total:0,
        page:1,
        size:10,
        searchName:'',
        isUpdate:false,//控制设置分级管理是新增还是修改状态
        updateId:null,//修改时选择的行id
        selection:[],
      },
      orgEextends:[],//扩展属性
      extendsFormData:{},
    };
  },
  created(){
    let getOrgTree = () => this.axios.get('/org/orgTree');
    let getOrgStatus = () => this.axios.get('/org/orgStatus');
    let getOrgLevel = () => this.axios.get('/partyLevel/getByType?type=org');
    let getEmpStatus = () => this.axios.get('/employee/userStatus');
    this.axios.all([ getOrgTree(),getOrgStatus(),getOrgLevel(), getEmpStatus()]).then( this.axios.spread( (orgTree, orgStatus, orgLevel, empStatus ) => {
      this.orgTreeData.push( orgTree.data.obj );
      Object.assign( this.orgStatus, orgStatus.data.obj );
      this.orgLevel = orgLevel.data.obj.map( level => {
        return {
          id:level.id,
          name:level.name
        }
      });
      Object.assign( this.organizer.options,empStatus.data.obj );
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
        },
        organizer: () => {//组织人员分页
          this.axios.get( url, {params} ).then( s => {
            if( s.data.code === 200 ){
              this.organizer.tableData = s.data.obj && s.data.obj.records;
              this.organizer.oTotal = s.data.obj && s.data.obj.total;
            }
          })   
        },
        role: () => {//已分配角色分页信息
          this.axios.get( url, {params} ).then( s => {
            if( s.data.code === 200 ){
              this.assignRole.tableData = s.data.obj && s.data.obj.records;
              this.assignRole.total = s.data.obj && s.data.obj.total;
            }
          })  
        },
        orgManage: () => {//组织分级管理分页信息
          this.axios.get( url, {params} ).then( s => {
            if( s.data.code === 200 ){
              this.orgLevelMan.tableData = s.data.obj && s.data.obj.records;
              this.orgLevelMan.total = s.data.obj && s.data.obj.total;
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
        this.targetGroupName = node.data.label;
        let getOrgBasicInfo = () => this.axios.get('/org/getById?id=' + this.targetGroupId );
        let getExtends = () => this.axios.get('/partyAttr/getByTypeAndId?type=org&id='+ node.data.id);
        this.axios.all([ getOrgBasicInfo(),getExtends() ]).then( this.axios.spread( ( basic,orgEextends ) => {
          this.orgEextends = orgEextends.data.obj;
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
        this.getPageInfo({ type : 'organizer',url : "/employee/getEmpByOrg",params:{ orgId:node.data.id,page:1,size:10}});
        this.getPageInfo({ type : 'role',url : "/org/getRoles",params:{ orgId:node.data.id,page:1,size:10}});
        this.getPageInfo({ type : 'orgManage',url : "/orgAuth/pager",params:{ orgId:node.data.id,page:1,size:10}});
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
      this.rightMenus.isMouse = true;
      this.rightMenus.nodeId = data.id;
      this.targetGroupName = data.label;
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
    confirmSetAdmin(){//设置分级管理员用户的id和name
      let data = this.rightMenus.setRadio;
      this.rightMenus.setAdminFormData.account = data.split(' ')[1];
      this.rightMenus.setAdminFormData.managerID = data.split(' ')[0];
      this.setOrgData.visibleDialog = false;
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
    organizerRemoveRow( index, data ){
      this.$confirm('当前操作将移除该行数据，是否继续？','提示',{
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        type:'warning'
      }).then( () => {
        this.axios.post('/org/removeUser',qs.stringify({
          orgId:this.targetGroupId,
          id:data[index].id
        })).then( res => {
          if( res.data.code === 200 ){
            this.$message.success('移除成功');
            data.splice( index,1 );
          } else this.$message.error( res.data.desc );
        }).catch( err => console.log(err));
      }).catch( () => this.$message.info('已取消移除'));
    },
    selectOrg( selection){
      this.organizer.oSelection = selection;
    },
    organizerRemove(){//组织人员顶部工具栏的移除
      let selection = this.organizer.oSelection;
      if( selection.length === 0 ){
        this.$message.info('请至少选择一行数据进行移除');
      } else {
        this.$confirm('当前操作将移除所选择的数据，是否继续？','提示',{
          confirmButtonText:'确定',
          cancelButtonText:'取消',
          type:'warning'
        }).then( () => {
          let ids = selection.map( s => s.id );
          this.axios.post('/org/removeUser',qs.stringify({
            orgId:this.targetGroupId,
            id:ids.join(',')
          })).then( res => {
            if( res.data.code === 200 ){
              this.$message.success('移除成功');
              this.getPageInfo({ type : 'organizer',url : "/employee/getEmpByOrg",params:{
                orgId:this.targetGroupId,
                page:this.organizer.oPage,
                size:this.organizer.oSize,
              }});
            }
          }).catch( err => console.log( err ));
        })
      }
    },
    orgCurrentChange( page ){
      this.organizer.oPage = page;
      this.getPageInfo({ type : 'organizer',url : "/employee/getEmpByOrg",params:{
        orgId:this.targetGroupId,
        page:page,
        size:this.organizer.oSize,
      }});
    },
    orgSizeChange( size ){
      this.organizer.oSize = size;
      this.getPageInfo({ type : 'organizer',url : "/employee/getEmpByOrg",params:{
        orgId:this.targetGroupId,
        page:this.organizer.oPage,
        size:size,
      }});
    },
    organizerJoin(){
      this.getOrgWithNoOrgPage();
      this.organizer.organizerDialog = true
    },
    confirmOsearch(){
      let startTime = '',endTime = '';
      if( Array.isArray(this.organizer.sTime)){
        startTime = this.organizer.sTime[0];
        endTime = this.organizer.sTime[1];
      };
      this.getPageInfo({ type : 'organizer',url : "/employee/getEmpByOrg",params:{
        orgId:this.targetGroupId,
        page:this.organizer.oPage,
        size:this.organizer.size,
        s:this.organizer.sName,
        startTime,
        endTime,
      }});
      this.organizer.searchDialog = false;
    },
    oSearchDialogClose(){
      this.organizer.sName = '';
      this.organizer.sTime = '';
    },
    getOrgWithNoOrgPage( page = 1,size = 10,s = '',status = ''){
       this.axios.get(`/employee/getEmpWihtNoOrg?page=${page}&size=${size}&s=${s}&status=${status}`).then( res => {
        if( res.data.code === 200 ){
          this.organizer.dialogTableData = res.data.obj.records;
          this.organizer.total = res.data.obj.total;
        } else this.$message.error( res.data.desc );
      })
    },
    orgJoinCurrentChange( page ){
      this.organizer.page = page;
      this.getOrgWithNoOrgPage( page, this.organizer.size );
    },
    orgJoinSizeChange( size ){
      this.organizer.size = size;
      this.getOrgWithNoOrgPage( this.organizer.page, size )
    },
    selectOrgJoin( selection ){
      this.organizer.selection = selection;
    },
    confirmOrgJoin(){//组织人员下确定加入人员
      if( this.organizer.selection.length === 0 ){
        this.$message.info('请至少选择一行数据');
      } else {
        let ids = this.organizer.selection.map( s => s.id );
        this.axios.post('/org/addUser',qs.stringify({
          orgId:this.targetGroupId,
          id:ids.join(',')
        })).then( res => {
          if( res.data.code === 200 ){
            this.$message.success('加入成功');
            this.getPageInfo({ type : 'organizer',url : "/employee/getEmpByOrg",params:{
              orgId:this.targetGroupId,
              page:this.organizer.page,
              size:this.organizer.size,
            }});
            this.organizer.organizerDialog = false;
          }
        }).catch( err => console.log( err ));
      }
    },
    searchOrgJoin(){
      this.getOrgWithNoOrgPage( this.organizer.page,this.organizer.size,this.organizer.searchName,this.organizer.searchStatus );
    },
    orgManSizeChange( size ){
      this.orgLevelMan.size = size;
      this.getPageInfo({ type : 'orgManage',url : "/orgAuth/pager",params:{
        orgId:this.targetGroupId,
        page:this.orgLevelMan.page,
        size,
      }});
    },
    orgManCurrentChange( page ){
      this.orgLevelMan.page = page;
      this.getPageInfo({ type : 'orgManage',url : "/orgAuth/pager",params:{
        orgId:this.targetGroupId,
        page:page,
        size:this.orgLevelMan.size,
      }});
    },
    confirmSetManagement(){
      let obj = Object.assign({},this.rightMenus.setAdminFormData);
      if( obj.account  === ''){
        this.$message.info('请选择分级管理员用户');
        return
      }
      let orgId;
      if( this.rightMenus.isMouse ) {
        orgId = this.rightMenus.nodeId;
      } else {
        orgId = this.targetGroupId;
      };
      let params = {
        managerID: obj.managerID,
        orgID: orgId,
        orgPerms: obj.orgPerms.join(','),
        userPerms: obj.userPerms.join(',')
      };
      let url = '/orgAuth/add';
      if( this.orgLevelMan.isUpdate ){//修改时
        params.id = this.orgLevelMan.updateId;
        url = '/orgAuth/update';
      };
      this.axios.post(url,qs.stringify(params)).then( res => {
        if( res.data.code === 200 ){
          this.$message.success('保存成功');
          this.getPageInfo({ type : 'orgManage',url : "/orgAuth/pager",params:{
            orgId:this.targetGroupId,
            page:this.orgLevelMan.page,
            size:this.orgLevelMan.size,
          }});
          this.rightMenus.setDialog = false;
        } else this.$message.error( res.data.desc);
      }).catch( err => console.log( err ));
    },
    setDialogClose(){
      Object.assign( this.rightMenus.setAdminFormData,{
        account:'',
        managerID:'',
        orgID:'',
        orgPerms:[],
        userPerms:[],
      });
      this.rightMenus.isMouse = false;
      this.orgLevelMan.isUpdate = false;
    },
    delManageRow( index, data ){
      this.$confirm('当前操作将删除该行数据，是否继续？','提示',{
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        type:'warning'
      }).then( () => {
        this.axios.post('/orgAuth/delete',qs.stringify({id:data[index].id})).then( res => {
          res.data.code === 200 && ( data.splice( index,1 )) || ( this.$message.error( res.data.desc ));
        }).catch( err => console.log( err ));
      }).catch( () => this.$message.info('已取消删除'));
    },
    filterRole( row, column, cellValue, index ){//组织分页下的权限字段数据格式化
      let obj = {
        add: '增加',
        del: '删除',
        edit: '修改'
      };
      let arr = cellValue.split(',');
      let _arr = arr.map( item => {
        return obj[item];
      });
      return _arr.join(',');
    },
    editManageRow( index, data ){//组织管理分页行编辑
      this.axios.get('/orgAuth/getById?id=' + data[index].id).then( res => {
        if( res.data.code === 200 ){
          let rowData = res.data.obj;
          this.targetGroupName = rowData.orgName;
          let obj = {
            account: rowData.managerName,
            managerID: rowData.managerID,
            orgID: rowData.orgID,
            orgPerms: rowData.orgPerms.split(','),
            userPerms: rowData.userPerms.split(',')
          };
          this.orgLevelMan.updateId = data[index].id;
          this.orgLevelMan.isUpdate = true;
          Object.assign( this.rightMenus.setAdminFormData, obj );
          this.rightMenus.setDialog = true ;
        } else this.$message.error( res.data.desc);
      })
    },
    selectOrgManage( selection ){
      this.orgLevelMan.selection = selection;
    },
    orgManageDelete(){//组织分级管理下顶部工具栏删除
      let selection = this.orgLevelMan.selection;
      if( selection.length === 0 ){
        this.$message.info('至少选择一行数据进行删除');
      } else {
        this.$confirm('当前操作将删除所选数据，是否继续？','提示',{
          confirmButtonText:'确定',
          cancelButtonText:'取消',
          type:'danger'
        }).then( () => {
          let ids = selection.map( s => s.id );
          this.axios.post('/orgAuth/delete',qs.stringify({ id: ids.join(',')})).then( res => {
            if( res.data.code === 200 ){
              this.$message.success('删除成功');
              this.getPageInfo({ type : 'orgManage',url : "/orgAuth/pager",params:{
                orgId:this.targetGroupId,
                page:this.orgLevelMan.page,
                size:this.orgLevelMan.size,
              }});
            } else this.$message.error(res.data.desc);
          }).catch( err => console.log( err ));
        }).catch( () => this.$message.info('已取消删除'));
      }
    },
    orgManSearch(){
      this.$prompt('请输入姓名','搜索',{
        confirmButtonText:'确定',
        cancelButtonText:'取消',
      }).then( ({value}) => {
         this.getPageInfo({ type : 'orgManage',url : "/orgAuth/pager",params:{
            orgId:this.targetGroupId,
            page:this.orgLevelMan.page,
            size:this.orgLevelMan.size,
            s: value
          }});
      }).catch( () => this.$message.info('取消搜索'));
    },
    addRole(){//添加角色
      this.axios.get(`/role/getOtherRoles?type=org&id=${this.targetGroupId}&page=1&size=10`).then( res => {
        if( res.data.code === 200 ){
          this.assignRole.dialogTableData = res.data.obj.records;
          this.assignRole.aTotal = res.data.obj.total;
          this.assignRole.addRoleDialog = true
        } else this.$message.error( res.data.desc );
      })
    },
    selectRoleJoin( selection ){
      this.assignRole.selection = selection;
    },
    roleSizeChange( size ){
      this.assignRole.size = size;
      this.getPageInfo({ type : 'role',url : "/org/getRoles",params:{
        orgId: this.targetGroupId,
        page: this.assignRole.page,
        size: size
      }});
    },
    roleCurrentChange( page ){
      this.assignRole.page = page;
      this.getPageInfo({ type : 'role',url : "/org/getRoles",params:{
        orgId: this.targetGroupId,
        page: page,
        size: this.assignRole.size
      }});
    },
    confirmAddRole(){
      let selection = this.assignRole.selection;
      if( selection.length === 0 ){
        this.$message.info('至少选择一条数据加入');
      } else {
        let ids = selection.map( s => s.id);
        this.axios.post('/org/addRole',qs.stringify({
          orgId: this.targetGroupId,
          id: ids.join(',')
        })).then( res => {
          if( res.data.code === 200 ){
            this.$message.success('添加成功');
            this.getPageInfo({ type : 'role',url : "/org/getRoles",params:{
              orgId: this.targetGroupId,
              page: this.assignRole.page,
              size: this.assignRole.size
            }});
            this.assignRole.addRoleDialog = false;
          } else this.$message.error( res.data.desc );
        }).catch( err => console.log( err ));
      }
    },
    addroleSizeChange( size ){
      this.assignRole.aSize = size;
      this.axios.get(`/role/getOtherRoles?type=org&id=${this.targetGroupId}&page=${this.assignRole.aPage}&size=${size}`).then( res => {
        if( res.data.code === 200 ){
          this.assignRole.dialogTableData = res.data.obj.records;
          this.assignRole.aTotal = res.data.obj.total;
        } else this.$message.error( res.data.desc );
      });
    },
    addroleCurrentChange( page ){
      this.assignRole.aPage = page;
      this.axios.get(`/role/getOtherRoles?type=org&id=${this.targetGroupId}&page=${page}&size=${this.assignRole.aSize}`).then( res => {
        if( res.data.code === 200 ){
          this.assignRole.dialogTableData = res.data.obj.records;
          this.assignRole.aTotal = res.data.obj.total;
        } else this.$message.error( res.data.desc );
      })
    },
    delAssignRoleRow( index, data ){
      this.$confirm('当前操作将移除该行数据，是否继续？','提示',{
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        type:'warning'
      }).then( () => {
        this.axios.post('/org/removeRole',qs.stringify({
          orgId: this.targetGroupId,
          id: data[index].id
        })).then( res => {
          if( res.data.code === 200 ){
            this.$message.success('成功移除');
            data.splice( index,1 );
            this.assignRole.total --;
          }
        }).catch( err => console.log( err ));
      }).catch( () => this.$message.info('已取消移除'));
    },
    resetChooseRoles(){//清空添加角色下所选择的项
      this.$refs.addRoleDialogTable.clearSelection();
    },
    addRoleSearch(){
      this.axios.get(`/role/getOtherRoles?type=org&id=${this.targetGroupId}
        &page=${this.assignRole.aPage}&size=${this.assignRole.size}&s=${this.assignRole.searchName}`).then( res => {
        if( res.data.code === 200 ){
          this.assignRole.dialogTableData = res.data.obj.records;
          this.assignRole.aTotal = res.data.obj.total;
        } else this.$message.error( res.data.desc );
      });
    },
  },
  watch:{
    orgEextends:{
      deep: true,
      handler( newV,oldV ){
        let obj = {};
        newV.forEach( item => {
          switch ( item.dataType ) {
            case 'OPTION'://生成单选框或多选框
              if( item.isMulti === 'N'){//单选
                obj[item.id] = {
                  label: item.name,
                  type: 'radio',
                  attrId:item.id,
                  data:[],
                  value: item.values.length > 0?item.values[0].value:'',
                };
                obj[item.id].data = item.options.map( op => {
                  return {
                    label: op.groupName,
                    value: op.value
                  }
                })
              } else {//多选
                let _value = [];
                if( item.values.length > 0 ){
                  _value = item.values.map( s => s.value )
                };
                obj[item.id] = {
                  label: item.name,
                  type: 'checkbox',
                  attrId: item.id,
                  data:[],
                  value: _value
                };
                obj[item.id].data = item.options.map( op => {
                  return {
                    label: op.groupName,
                    value: op.value
                  }
                })
              }
              break;
            case "STRING":
              obj[item.id] = {
                label: item.name,
                type: 'string',
                attrId: item.id,
                value: item.values.length > 0?item.values[0].value:''
              };
              break;
            case "DOUBLE":
              obj[item.id] = {
                label: item.name,
                type: 'double',
                attrId: item.id,
                value: item.values.length > 0?item.values[0].value:''
              };
              break;
            case "INT":
              obj[item.id] = {
                label: item.name,
                type: 'int',
                attrId: item.id,
                value: item.values.length > 0?item.values[0].value:''
              };
              break;
            case "DATE":
              
              obj[item.id] = {
                label: item.name,
                type: 'date',
                attrId: item.id,
                value: item.values.length > 0?item.values[0].value:''
              };
              break;
            case "BOOLEAN":

              obj[item.id] = {
                label: item.name,
                type: 'boolean',
                attrId: item.id,
                data:[{ label:'是',value:'Y'},{ label:'否',value:'N'}],
                value: item.values.length > 0?item.values[0].value:''
              };
              break;
          };
        });   
        Object.assign( this.extendsFormData, obj );
        console.log(this.extendsFormData)
      }
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
    & .el-form {
      padding: 20px;
      height:400px;
      overflow-y:auto;
      & .el-form-item {
        margin-bottom: 8px;
      }
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