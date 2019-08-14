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
        secondMenu: [
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
        secondMenu: [
            {iconImg: require('@/assets/image/icons/fileIcons/row.png'),iconTitle: '行展示'},
            {iconImg: require('@/assets/image/icons/fileIcons/col.png'),iconTitle: '列展示'}
        ]
    };
    let send = {  // 发送
        iconImg: require('@/assets/image/icons/fileIcons/sendmsg.png'),
        iconTitle: '发送',
        isRightBorder: true,
        flag: false,
        secondMenu: [
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
    return {
        active: {
            unit: [
                {
                    iconImg: require('@/assets/image/icons/fileIcons/copy.png'),
                    iconTitle: '复制',
                    isRightBorder: false
                },
                {
                    iconImg: require('@/assets/image/icons/fileIcons/paste.png'),
                    iconTitle: '粘贴',
                    isRightBorder: false,
                },
                {
                    iconImg: require('@/assets/image/icons/fileIcons/rename.png'),
                    iconTitle: '重命名',
                    isRightBorder: false
                },
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