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
import { setTimeout } from 'timers';
var share = {
  shareRight:[
        {iconImg: require('@/assets/image/icons/fileIcons/preview.png'),iconTitle: '在线预览',isRightBorder: false},
        {iconImg: require('@/assets/image/icons/fileIcons/dailyO.png'),iconTitle: '分享操作',isRightBorder: false,flag: false,children:[{iconImg: require('@/assets/image/icons/fileIcons/myshare.png'),iconTitle: '访问分享'},{iconImg: require('@/assets/image/icons/fileIcons/rename.png'),iconTitle: '修改分享'},{iconImg: require('@/assets/image/icons/fileIcons/pardelete.png'),iconTitle: '取消分享'}]},
        {iconImg: require('@/assets/image/icons/fileIcons/link.png'),iconTitle: '复制链接',isRightBorder: false,},
        {iconImg: require('@/assets/image/icons/fileIcons/lock.png'),iconTitle: '复制提取码',isRightBorder: false,},
        {iconImg: require('@/assets/image/icons/fileIcons/limit.png'),iconTitle: '分享权限',isRightBorder: false,},
        {iconImg: require('@/assets/image/icons/fileIcons/edit.png'),iconTitle: '更改提取码',isRightBorder: false,},
        {iconImg: require('@/assets/image/icons/fileIcons/log.png'),iconTitle: '分享日志',isRightBorder: false,},
        {iconImg: require('@/assets/image/icons/fileIcons/diagram.png'),iconTitle: '关系图',isRightBorder: true,},
        {iconImg: require('@/assets/image/icons/fileIcons/approval-submit.png'),iconTitle: '审批',isRightBorder: false,flag: false,children: [{iconImg: require('@/assets/image/icons/fileIcons/approval-submit.png'),iconTitle: '提交审批'},{iconImg: require('@/assets/image/icons/fileIcons/approval-progress.png'),iconTitle: '审批进度'},{iconImg: require('@/assets/image/icons/fileIcons/flowpath.png'),iconTitle: '审批流程'}]},
        {iconImg: require('@/assets/image/icons/fileIcons/print.png'),iconTitle: '打印',isRightBorder: false,},
        {iconImg: require('@/assets/image/icons/fileIcons/col.png'),iconTitle: '显示字段',isRightBorder: false,},
        {iconImg: require('@/assets/image/icons/fileIcons/export.png'),iconTitle: '导出excel',isRightBorder: false,},
        {iconImg: require('@/assets/image/icons/fileIcons/sendmsg.png'),iconTitle: '发送',isRightBorder: true,flag: false,children: [{iconImg: require('@/assets/image/icons/fileIcons/desk.png'),iconTitle: '发送桌面'},{iconImg: require('@/assets/image/icons/fileIcons/msg.png'),iconTitle: '即时通讯'},{iconImg: require('@/assets/image/icons/fileIcons/mail.png'),iconTitle: '发送邮件'},{iconImg: require('@/assets/image/icons/fileIcons/phone.png'),iconTitle: '发送短信'},{iconImg: require('@/assets/image/icons/fileIcons/message.png'),iconTitle: '发送消息'},]},
        {iconImg: require('@/assets/image/icons/fileIcons/refresh.png'),iconTitle: '刷新',isRightBorder: false},
        {iconImg: require('@/assets/image/icons/fileIcons/help.png'),iconTitle: '帮助',isRightBorder: false}
      ],
      enjoyRight:[
        {iconImg: require('@/assets/image/icons/fileIcons/preview.png'),iconTitle: '在线预览',isRightBorder: false},
        {iconImg: require('@/assets/image/icons/fileIcons/dailyO.png'),iconTitle: '共享操作',isRightBorder: false,flag: false,children:[{iconImg: require('@/assets/image/icons/fileIcons/enjoyTo.png'),iconTitle: '访问共享'},{iconImg: require('@/assets/image/icons/fileIcons/rename.png'),iconTitle: '修改共享'},{iconImg: require('@/assets/image/icons/fileIcons/pardelete.png'),iconTitle: '取消共享'}]},
        {iconImg: require('@/assets/image/icons/fileIcons/limit.png'),iconTitle: '共享权限',isRightBorder: false,},
        {iconImg: require('@/assets/image/icons/fileIcons/calendar.png'),iconTitle: '共享期限',isRightBorder: false,},
        {iconImg: require('@/assets/image/icons/fileIcons/edit.png'),iconTitle: '更改密码',isRightBorder: false,},
        {iconImg: require('@/assets/image/icons/fileIcons/log.png'),iconTitle: '共享日志',isRightBorder: false,},
        {iconImg: require('@/assets/image/icons/fileIcons/diagram.png'),iconTitle: '关系图',isRightBorder: true,},
        {iconImg: require('@/assets/image/icons/fileIcons/approval-submit.png'),iconTitle: '审批',isRightBorder: false,flag: false,children: [{iconImg: require('@/assets/image/icons/fileIcons/approval-submit.png'),iconTitle: '提交审批'},{iconImg: require('@/assets/image/icons/fileIcons/approval-progress.png'),iconTitle: '审批进度'},{iconImg: require('@/assets/image/icons/fileIcons/flowpath.png'),iconTitle: '审批流程'}]},
        {iconImg: require('@/assets/image/icons/fileIcons/print.png'),iconTitle: '打印',isRightBorder: false,},
        {iconImg: require('@/assets/image/icons/fileIcons/col.png'),iconTitle: '显示字段',isRightBorder: false,},
        {iconImg: require('@/assets/image/icons/fileIcons/export.png'),iconTitle: '导出excel',isRightBorder: false,},
        {iconImg: require('@/assets/image/icons/fileIcons/sendmsg.png'),iconTitle: '发送',isRightBorder: true,flag: false,children: [{iconImg: require('@/assets/image/icons/fileIcons/desk.png'),iconTitle: '发送桌面'},{iconImg: require('@/assets/image/icons/fileIcons/msg.png'),iconTitle: '即时通讯'},{iconImg: require('@/assets/image/icons/fileIcons/mail.png'),iconTitle: '发送邮件'},{iconImg: require('@/assets/image/icons/fileIcons/phone.png'),iconTitle: '发送短信'},{iconImg: require('@/assets/image/icons/fileIcons/message.png'),iconTitle: '发送消息'},]},
        {iconImg: require('@/assets/image/icons/fileIcons/refresh.png'),iconTitle: '刷新',isRightBorder: false},
        {iconImg: require('@/assets/image/icons/fileIcons/help.png'),iconTitle: '帮助',isRightBorder: false}
      ],
};
export default {
  props:['attrs'],
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
  },
  mounted() {
    let name = this.attrs.name;
    if(name === '我的共享' ||name==='接收共享'){
      setTimeout(()=>{
        this.$emit('someMethods', {name:'getContentUtils',data:share.enjoyRight});
      },400);
    }else{
      this.$emit('someMethods', {name:'getContentUtils',data:share.shareRight});
    }
  },
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