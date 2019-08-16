<!-- 我的云端：工具栏 -->
<template>
  <div class='utilLists'>
      <topUtil :lists="active[utilName]" @utilClick="utilClick"></topUtil>
  </div>
</template>

<script>
import topUtil from '@/components/iCloud/topUtil';
export default {
  props:{
      utilName: {
          type: String,
          default: 'unit'
      } 
  },
  components:{
      topUtil,
  },
  data () {
    let volume = { // 容量增加减少
        addV: {
            iconImg: require('@/assets/image/icons/fileIcons/addC.png'),
            iconTitle: '申请增容',
            isRightBorder: false
        },
        reduceV: {
            iconImg: require('@/assets/image/icons/fileIcons/reduceC.png'),
            iconTitle: '申请减容',
            isRightBorder: true
        },
    };
    let check = { //查看
        iconImg: require('@/assets/image/icons/fileIcons/check.png'),
        iconTitle: '查看',
        isRightBorder: false,
        flag: false,  //用于判断二级菜单是否显示
        children: [
            {iconImg: require('@/assets/image/icons/fileIcons/little.png'),iconTitle: '小图标'},
            {iconImg: require('@/assets/image/icons/fileIcons/middle.png'),iconTitle: '中图标'},
            {iconImg: require('@/assets/image/icons/fileIcons/big.png'),iconTitle: '大图标'},
        ]
    };
    let array = {  // 排列
        iconImg: require('@/assets/image/icons/fileIcons/array.png'),
        iconTitle: '排列',
        isRightBorder: true,
        flag: false,
        children: [
            {iconImg: require('@/assets/image/icons/fileIcons/row.png'),iconTitle: '行展示'},
            {iconImg: require('@/assets/image/icons/fileIcons/col.png'),iconTitle: '列展示'}
        ]
    };
    let send = {  // 发送
        iconImg: require('@/assets/image/icons/fileIcons/sendmsg.png'),
        iconTitle: '发送',
        isRightBorder: true,
        flag: false,
        children: [
            {iconImg: require('@/assets/image/icons/fileIcons/desk.png'),iconTitle: '发送桌面'},
            {iconImg: require('@/assets/image/icons/fileIcons/msg.png'),iconTitle: '即时通讯'},
            {iconImg: require('@/assets/image/icons/fileIcons/mail.png'),iconTitle: '发送邮件'},
            {iconImg: require('@/assets/image/icons/fileIcons/phone.png'),iconTitle: '发送短信'},
            {iconImg: require('@/assets/image/icons/fileIcons/message.png'),iconTitle: '发送消息'},
        ]
    };
    let refresh_help = {  // 刷新和帮助
        refresh: {
            iconImg: require('@/assets/image/icons/fileIcons/refresh.png'),
            iconTitle: '刷新',
            isRightBorder: false
        },
        help: {
            iconImg: require('@/assets/image/icons/fileIcons/help.png'),
            iconTitle: '帮助',
            isRightBorder: false
        },
    }
    let newCreate = {// 新建文件 && 新建文件夹
        iconImg: require('@/assets/image/icons/fileIcons/newFile.png'),
        iconTitle: '新建',
        isRightBorder: false,
        flag: false,
        children: [
            {
                iconImg: require('@/assets/image/icons/fileIcons/newFile.png'),
                iconTitle: '新建文件',
                flag: false,
                children: [
                    {iconImg: require('@/assets/image/icons/fileIcons/doc.png'),iconTitle: 'Word文档'},
                    {iconImg: require('@/assets/image/icons/fileIcons/excel.png'),iconTitle: 'Excel文档'},
                    {iconImg: require('@/assets/image/icons/fileIcons/ppt.png'),iconTitle: 'PPT文档'},
                    {iconImg: require('@/assets/image/icons/fileIcons/txt.png'),iconTitle: '文本文件'}
                ]
            },
            {iconImg:require('@/assets/image/icons/fileIcons/newFolder.png'),iconTitle:'新建文件夹'}
        ]
    };
    let fileOperation = { // 复制 && 粘贴 && 重命名 && 剪切
        iconImg: require('@/assets/image/icons/fileIcons/fileO.png'),
        iconTitle: '文件操作',
        isRightBorder: false,
        flag: false,
        children: [
            {
                iconImg: require('@/assets/image/icons/fileIcons/dailyO.png'),
                iconTitle: '日常操作',
                children: [
                    {iconImg: require('@/assets/image/icons/fileIcons/cut.png'),iconTitle: '剪切',tip:'Ctrl+x'},
                    {iconImg: require('@/assets/image/icons/fileIcons/copy.png'),iconTitle: '复制',tip:'Ctrl+c'},
                    {iconImg: require('@/assets/image/icons/fileIcons/paste.png'),iconTitle: '粘贴',tip:'Ctrl+v'},
                    {iconImg: require('@/assets/image/icons/fileIcons/rename.png'),iconTitle: '重命名',tip:'F2'},
                    {iconImg: require('@/assets/image/icons/fileIcons/pardelete.png'),iconTitle: '删除',tip:'del'}
                ],
            },
            {
                iconImg: require('@/assets/image/icons/fileIcons/check.png'),
                iconTitle: '在线操作',
                children: [
                    {iconImg: require('@/assets/image/icons/fileIcons/preview.png'),iconTitle: '在线预览'},
                    {iconImg: require('@/assets/image/icons/fileIcons/edit.png'),iconTitle: '在线编辑'},
                    {iconImg: require('@/assets/image/icons/fileIcons/coordination.png'),iconTitle: '协同编辑'},
                    {iconImg: require('@/assets/image/icons/fileIcons/compress.png'),iconTitle: '在线压缩'},
                    {iconImg: require('@/assets/image/icons/fileIcons/decompression.png'),iconTitle: '在线解压'}, 
                    {iconImg: require('@/assets/image/icons/fileIcons/encryption.png'),iconTitle: '文件加密'}, 
                    {iconImg: require('@/assets/image/icons/fileIcons/dsi.png'),iconTitle: '文件解密'}       
                ]
            },
        ],
    };
    let shareFile = { // 分享 && 共享
        share: {
            iconImg: require('@/assets/image/icons/fileIcons/myshare.png'),
            iconTitle: '分享',
            isRightBorder: false
        },
        enjoyTogether: {
            iconImg: require('@/assets/image/icons/fileIcons/person.png'),
            iconTitle: '共享',
            isRightBorder: true,
        }
    };
    let down_upload = { // 下载 && 上传
        down: {
            iconImg: require('@/assets/image/icons/fileIcons/down.png'),
            iconTitle: '下载',
            isRightBorder: false
        },
        upload: {
            iconImg: require('@/assets/image/icons/fileIcons/upload.png'),
            iconTitle: '上传',
            isRightBorder: true,
            flag: false,
            children: [
                {iconImg: require('@/assets/image/icons/fileIcons/newFile.png'),iconTitle: '上传文件'},
                {iconImg: require('@/assets/image/icons/fileIcons/newFolder.png'),iconTitle: '上传文件夹'},
            ]
        }
    };
    let preview = {
        iconImg: require('@/assets/image/icons/fileIcons/preview.png'),
        iconTitle: '在线预览',
        isRightBorder: false,
    };
    let diagram = {
        iconImg: require('@/assets/image/icons/fileIcons/diagram.png'),
        iconTitle: '关系图',
        isRightBorder: true,
    };
    let approval ={
        iconImg: require('@/assets/image/icons/fileIcons/approval-submit.png'),
        iconTitle: '审批',
        isRightBorder: false,
        flag: false,
        children: [
            {iconImg: require('@/assets/image/icons/fileIcons/approval-submit.png'),iconTitle: '提交审批'},
            {iconImg: require('@/assets/image/icons/fileIcons/approval-progress.png'),iconTitle: '审批进度'},
            {iconImg: require('@/assets/image/icons/fileIcons/flowpath.png'),iconTitle: '审批流程'}
        ]
    };
    let print = {
        iconImg: require('@/assets/image/icons/fileIcons/print.png'),
        iconTitle: '打印',
        isRightBorder: false,
    };
    let showField={
        iconImg: require('@/assets/image/icons/fileIcons/col.png'),
        iconTitle: '显示字段',
        isRightBorder: false,
    };
    let exportExcel = {
        iconImg: require('@/assets/image/icons/fileIcons/export.png'),
        iconTitle: '导出excel',
        isRightBorder: false,
    };
    return {
        active: {
            unit: [
                fileOperation,
                {
                    iconImg: require('@/assets/image/icons/fileIcons/recycle.png'),
                    iconTitle: '回收站',
                    isRightBorder: true
                },
                volume.addV,
                volume.reduceV,
                check,
                array,
                send,
                refresh_help.refresh,
                refresh_help.help
            ],
            organizationCloud: [  // 组织云端
                volume.addV,
                volume.reduceV,
                {
                    iconImg: require('@/assets/image/icons/fileIcons/attr.png'),
                    iconTitle: '云端属性',
                    isRightBorder: false
                },
                check,
                array,
                send,
                refresh_help.refresh,
                refresh_help.help
            ],
            mineCloud: [  // 我的云端
                {
                    iconImg: require('@/assets/image/icons/fileIcons/partition.png'),
                    iconTitle: '创建分区',
                    isRightBorder: false
                },
                {
                    iconImg: require('@/assets/image/icons/fileIcons/parname.png'),
                    iconTitle: '分区命名',
                    isRightBorder: false
                },
                {
                    iconImg: require('@/assets/image/icons/fileIcons/format.png'),
                    iconTitle: '格式分区',
                    isRightBorder: false
                },
                {
                    iconImg: require('@/assets/image/icons/fileIcons/pardelete.png'),
                    iconTitle: '删除分区',
                    isRightBorder: true
                },
                {
                    iconImg: require('@/assets/image/icons/fileIcons/attr.png'),
                    iconTitle: '分区属性',
                    isRightBorder: true
                },
                volume.addV,
                volume.reduceV,
                check,
                array,
                send,
                refresh_help.refresh,
                refresh_help.help
            ],
            shareCloud: [  // 共享云端
                {
                    iconImg: require('@/assets/image/icons/fileIcons/partition.png'),
                    iconTitle: '创建云端',
                    isRightBorder: false
                },
                {
                    iconImg: require('@/assets/image/icons/fileIcons/editCloud.png'),
                    iconTitle: '编辑云端',
                    isRightBorder: false
                },
                {
                    iconImg: require('@/assets/image/icons/fileIcons/power.png'),
                    iconTitle: '云端权限',
                    isRightBorder: false
                },
                {
                    iconImg: require('@/assets/image/icons/fileIcons/format.png'),
                    iconTitle: '格式云端',
                    isRightBorder: false
                },
                {
                    iconImg: require('@/assets/image/icons/fileIcons/pardelete.png'),
                    iconTitle: '删除云端',
                    isRightBorder: true
                },
                volume.addV,
                volume.reduceV,
                check,
                array,
                refresh_help.refresh,
                refresh_help.help
            ],
            myCloudContent:[ // 我的文档，软件区，娱乐区，文档区
                newCreate,
                fileOperation,
                shareFile.share,
                shareFile.enjoyTogether,
                down_upload.down,
                down_upload.upload,
                check,
                array,
                send,
                refresh_help.refresh,
                refresh_help.help,
            ],
            share_organization:[ //共享云端 =》节点
                newCreate,
                {
                    iconImg: require('@/assets/image/icons/fileIcons/limit.png'),
                    iconTitle: '文件夹权限',
                    isRightBorder: false
                },
                fileOperation,
                down_upload.down,
                down_upload.upload,
                shareFile.share,
                shareFile.enjoyTogether,
                check,
                array,
                send,
                refresh_help.refresh,
                refresh_help.help,
            ],
            shareContent: [ // 挚友云=》 我的分享 && 接受分享
                preview,
                {
                    iconImg: require('@/assets/image/icons/fileIcons/dailyO.png'),
                    iconTitle: '分享操作',
                    isRightBorder: false,
                    flag: false,
                    children:[
                        {iconImg: require('@/assets/image/icons/fileIcons/myshare.png'),iconTitle: '访问分享'},
                        {iconImg: require('@/assets/image/icons/fileIcons/rename.png'),iconTitle: '修改分享'},
                        {iconImg: require('@/assets/image/icons/fileIcons/pardelete.png'),iconTitle: '取消分享'}
                    ]
                },
                {
                    iconImg: require('@/assets/image/icons/fileIcons/link.png'),
                    iconTitle: '复制链接',
                    isRightBorder: false,
                },
                {
                    iconImg: require('@/assets/image/icons/fileIcons/lock.png'),
                    iconTitle: '复制提取码',
                    isRightBorder: false,
                },
                {
                    iconImg: require('@/assets/image/icons/fileIcons/limit.png'),
                    iconTitle: '分享权限',
                    isRightBorder: false,
                },
                {
                    iconImg: require('@/assets/image/icons/fileIcons/edit.png'),
                    iconTitle: '更改提取码',
                    isRightBorder: false,
                },
                {
                    iconImg: require('@/assets/image/icons/fileIcons/log.png'),
                    iconTitle: '分享日志',
                    isRightBorder: false,
                },
                diagram,
                approval,
                print,
                showField,
                exportExcel,
                send,
                refresh_help.refresh,
                refresh_help.help,
            ],
            enjoyContent: [ // 挚友云=》 我的共享 && 接受共享
                preview,
                {
                    iconImg: require('@/assets/image/icons/fileIcons/dailyO.png'),
                    iconTitle: '共享操作',
                    isRightBorder: false,
                    flag: false,
                    children:[
                        {iconImg: require('@/assets/image/icons/fileIcons/enjoyTo.png'),iconTitle: '访问共享'},
                        {iconImg: require('@/assets/image/icons/fileIcons/rename.png'),iconTitle: '修改共享'},
                        {iconImg: require('@/assets/image/icons/fileIcons/pardelete.png'),iconTitle: '取消共享'}
                    ]
                },
                {
                    iconImg: require('@/assets/image/icons/fileIcons/limit.png'),
                    iconTitle: '共享权限',
                    isRightBorder: false,
                },
                {
                    iconImg: require('@/assets/image/icons/fileIcons/calendar.png'),
                    iconTitle: '共享期限',
                    isRightBorder: false,
                },
                {
                    iconImg: require('@/assets/image/icons/fileIcons/edit.png'),
                    iconTitle: '更改密码',
                    isRightBorder: false,
                },
                {
                    iconImg: require('@/assets/image/icons/fileIcons/log.png'),
                    iconTitle: '共享日志',
                    isRightBorder: false,
                },
                diagram,
                approval,
                print,
                showField,
                exportExcel,
                send,
                refresh_help.refresh,
                refresh_help.help,
            ]
        },
    };
  },
  methods: {
      utilClick( value ){
          this.$emit('utilClick', value);
      }
  }
}

</script>
<style lang='less' scoped>
</style>