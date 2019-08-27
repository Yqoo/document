<!-- 我的云端：内容 -->
<template>
  <div class='myCloudContent'>
      <div class="cards flipInX animated" :class="displayName==='行展示'?'row':'col'">
          <el-card v-for="(c,index) in dataList" :class="c.active?'addBorder':''" :key="index" shadow="hover">
              <div @click="activeCard(c, dataList)" @dblclick.stop="openFolder" :title="c.name">
                <img :src="c.imgurl" :style="displayName==='行展示'&&size"/>
                <div class="bottom">{{c.name}}</div>
                <img :src="c.icon" class="fileIcon">
              </div>
          </el-card>
      </div>
  </div>
</template>

<script>
import { myCloudUtilMixin } from '@/assets/js/myCloudUtilMixins.js';
import { setTimeout } from 'timers';
var folder = {
  blankRight: [
    {iconImg: require('@/assets/image/icons/fileIcons/newFile.png'),iconTitle: '新建',isRightBorder: false,flag: false,children: [{iconImg: require('@/assets/image/icons/fileIcons/newFile.png'),iconTitle: '新建文件',flag: false,children: [{iconImg: require('@/assets/image/icons/fileIcons/doc.png'),iconTitle: 'Word文档'},{iconImg: require('@/assets/image/icons/fileIcons/excel.png'),iconTitle: 'Excel文档'},{iconImg: require('@/assets/image/icons/fileIcons/ppt.png'),iconTitle: 'PPT文档'},{iconImg: require('@/assets/image/icons/fileIcons/txt.png'),iconTitle: '文本文件'}]},{iconImg:require('@/assets/image/icons/fileIcons/newFolder.png'),iconTitle:'新建文件夹'}]},
    {iconImg: require('@/assets/image/icons/fileIcons/fileO.png'),iconTitle: '文件操作',isRightBorder: false,flag: false,children: [{iconImg: require('@/assets/image/icons/fileIcons/dailyO.png'),iconTitle: '日常操作',children: [{iconImg: require('@/assets/image/icons/fileIcons/cut.png'),iconTitle: '剪切',tip:'Ctrl+x'},{iconImg: require('@/assets/image/icons/fileIcons/copy.png'),iconTitle: '复制',tip:'Ctrl+c'},{iconImg: require('@/assets/image/icons/fileIcons/paste.png'),iconTitle: '粘贴',tip:'Ctrl+v'},{iconImg: require('@/assets/image/icons/fileIcons/rename.png'),iconTitle: '重命名',tip:'F2'},{iconImg: require('@/assets/image/icons/fileIcons/pardelete.png'),iconTitle: '删除',tip:'del'}]},{iconImg: require('@/assets/image/icons/fileIcons/check.png'),iconTitle: '在线操作',children: [{iconImg: require('@/assets/image/icons/fileIcons/preview.png'),iconTitle: '在线预览'},{iconImg: require('@/assets/image/icons/fileIcons/edit.png'),iconTitle: '在线编辑'},{iconImg: require('@/assets/image/icons/fileIcons/coordination.png'),iconTitle: '协同编辑'},{iconImg: require('@/assets/image/icons/fileIcons/compress.png'),iconTitle: '在线压缩'},{iconImg: require('@/assets/image/icons/fileIcons/decompression.png'),iconTitle: '在线解压'}, {iconImg: require('@/assets/image/icons/fileIcons/encryption.png'),iconTitle: '文件加密'}, {iconImg: require('@/assets/image/icons/fileIcons/dsi.png'),iconTitle: '文件解密'}       ]},]},
    {iconImg: require('@/assets/image/icons/fileIcons/myshare.png'),iconTitle: '分享',isRightBorder: false},
    {iconImg: require('@/assets/image/icons/fileIcons/person.png'),iconTitle: '共享',isRightBorder: true,},
    {iconImg: require('@/assets/image/icons/fileIcons/down.png'),iconTitle: '下载',isRightBorder: false},
    {iconImg: require('@/assets/image/icons/fileIcons/upload.png'),iconTitle: '上传',isRightBorder: true,flag: false,children: [{iconImg: require('@/assets/image/icons/fileIcons/newFile.png'),iconTitle: '上传文件'},{iconImg: require('@/assets/image/icons/fileIcons/newFolder.png'),iconTitle: '上传文件夹'},]},
    {iconImg: require('@/assets/image/icons/fileIcons/check.png'),iconTitle: '查看',isRightBorder: false,flag: false,children: [{iconImg: require('@/assets/image/icons/fileIcons/little.png'),iconTitle: '小图标'},{iconImg: require('@/assets/image/icons/fileIcons/middle.png'),iconTitle: '中图标'},{iconImg: require('@/assets/image/icons/fileIcons/big.png'),iconTitle: '大图标'},]},
    {iconImg: require('@/assets/image/icons/fileIcons/array.png'),iconTitle: '排列',isRightBorder: true,flag: false,children: [{iconImg: require('@/assets/image/icons/fileIcons/row.png'),iconTitle: '行展示'},{iconImg: require('@/assets/image/icons/fileIcons/col.png'),iconTitle: '列展示'}]},
    {iconImg: require('@/assets/image/icons/fileIcons/sendmsg.png'),iconTitle: '发送',isRightBorder: true,flag: false,children: [{iconImg: require('@/assets/image/icons/fileIcons/desk.png'),iconTitle: '发送桌面'},{iconImg: require('@/assets/image/icons/fileIcons/msg.png'),iconTitle: '即时通讯'},{iconImg: require('@/assets/image/icons/fileIcons/mail.png'),iconTitle: '发送邮件'},{iconImg: require('@/assets/image/icons/fileIcons/phone.png'),iconTitle: '发送短信'},{iconImg: require('@/assets/image/icons/fileIcons/message.png'),iconTitle: '发送消息'},]},
    {iconImg: require('@/assets/image/icons/fileIcons/refresh.png'),iconTitle: '刷新',isRightBorder: false},
    {iconImg: require('@/assets/image/icons/fileIcons/help.png'),iconTitle: '帮助',isRightBorder: false}
  ],
};
export default {
  extends: myCloudUtilMixin,
  props:['attrs'],
  data () {
    return {
      dataList: [
        {name:'文件夹1',imgurl:require('@/assets/image/icons/deskIcons/tree-disk3.png'),active:false},
        {name:'文件夹2',imgurl:require('@/assets/image/icons/deskIcons/tree-folder.png'),active:false},
      ],
    };
  },
  methods: {},
  mounted(){
    let name = this.attrs.name;
    setTimeout(()=>{
      this.$emit('someMethods',{name:'getContentUtils',data:folder.blankRight});
    }, 300);
  }
}

</script>
<style lang='less' scoped>
@import '../../assets/css/myCloud.less';
</style>