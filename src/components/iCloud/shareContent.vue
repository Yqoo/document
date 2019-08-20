<!-- 我的云端：我的共享 && 接受共享 && 我的分享 && 接受分享 -->
<template>
  <div class='content'>
      <div class="enjoyContent">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1">所有</el-menu-item>
          <el-menu-item index="2">未审批</el-menu-item>
          <el-submenu index="3">
            <template slot="title">已审批</template>
            <el-menu-item index="3-1">选项1</el-menu-item>
            <el-menu-item index="3-2">选项2</el-menu-item>
            <el-menu-item index="3-3">选项3</el-menu-item>
          </el-submenu>
        </el-menu>
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          max-height="400"
          style="width: 100%;font-size:12px;">
          <el-table-column
            type="selection"
            width="55"
            fixed>
          </el-table-column>
          <el-table-column
            fixed
            label="序号"
            type="index"
            :index="getIndex">
          </el-table-column>
          <el-table-column
            label="共享资源"
            width="250">
            <template slot-scope="scope">
              <img :src='scope.row.iconImg'>
              <span>{{scope.row.resourceName}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="password"
            label="共享密码">
          </el-table-column>
          <el-table-column
            prop="visits"
            label="访问次数">
          </el-table-column>
          <el-table-column
            prop="transfers"
            label="转存次数">
          </el-table-column>
          <el-table-column
            prop="effectiveTime"
            label="生效时间"
            width="100px">
          </el-table-column>
          <el-table-column
            prop="sharedTime"
            label="共享期限">
          </el-table-column>
          <el-table-column
            prop="sharer"
            label="共享人">
          </el-table-column>
          <el-table-column
            prop="operateTime"
            label="操作时间"
            width="100px">
          </el-table-column>
          <el-table-column
            prop="relevance"
            label="关联操作"
            width="120"
            fixed="right">
            <template slot-scope="scope">
              <a @click="sharedLimit(scope.row)"><img src="@/assets/image/icons/fileIcons/limit.png" title="共享权限"></a>
              <a @click="approvalProgress(scope.row)"><img src="@/assets/image/icons/fileIcons/approval-progress.png" title="审批进度"></a>
              <a @click="sharedLog(scope.row)"><img src="@/assets/image/icons/fileIcons/log.png" title="共享日志"></a>
              <a @click="diagram(scope.row)"><img src="@/assets/image/icons/fileIcons/diagram.png" title="关系图"></a>
            </template>
          </el-table-column>
      </el-table>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: '1', // 默认显示
      tableData: [
        {iconImg: require('@/assets/image/icons/deskIcons/tree-folder.png'), resourceName:'挚友icloud设计图',password:'12345',visits:2,transfers:4,effectiveTime:'2019-09-01',sharedTime:'7',sharer:'谢x',operateTime:'2019-08-10',relevance:''},
        {iconImg: require('@/assets/image/icons/fileIcons/excel.png'), resourceName:'挚友icloud设计图',password:'12345',visits:2,transfers:4,effectiveTime:'2019-09-01',sharedTime:'5',sharer:'谢x',operateTime:'2019-08-10',relevance:''}
      ]
    };
  },
  methods: {
    handleSelect(key, keyPath) {// 选中标题
        console.log(key, keyPath);
    },
    getIndex( index ){ // 表格中的序号
      return index + 1;
    },
    sharedLimit(data) { // 共享权限
      console.log(data)
    },
    approvalProgress(data){ // 审批进度
      console.log(data)
    },
    sharedLog(data){ // 共享日志
      console.log(data)
    },
    diagram(data) {  //关系图
      console.log(data)
    }
  }
}

</script>
<style lang='less' scoped>
.el-menu{
  & .el-menu-item{
    font-size: 12px;
  }
  & /deep/ .el-submenu__title{
    font-size: 12px;
  }
}
.el-table{
  & .cell{
    & img{
      display: inline-block;
      width: 20px;
      margin-right: 5px;
      vertical-align: middle;
    }
  }
}
</style>