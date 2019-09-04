<!-- 我的云端：组织云端 -->
<template>
  <div class="organizationCloud">
    <el-collapse v-model="activeNames">
      <div
        @click="clickBlock({e: $event,clickTag:'organizationCloud',list:blankRight,dataArr:organizationCloud})"
        @contextmenu.prevent="showRightMenu({e:$event,clickTag: 'organizationCloud',dataArr:organizationCloud,list:blankRight})"
      >
        <el-collapse-item name="1" :disabled="true">
          <template slot="title">
            <img src="@/assets/image/icons/deskIcons/tree-org2.png" />组织云端
          </template>
          <div class="cards slideInUp animated" :class="displayName==='行展示'?'row':'col'">
            <el-card
              v-for="(c,index) in organizationCloud"
              :class="_isClick.organizationCloud&&c.active?'addBorder':''"
              :key="index"
              shadow="hover"
            >
              <div
                @click.stop="activeCard({e:$event,item:c,i:index,clickTag:'organizationCloud',dataArr:organizationCloud})"
                @contextmenu.stop.prevent="fileRightMenu({e:$event,item:c,dataArr:organizationCloud,clickTag: 'organizationCloud'})"
                @dblclick.stop="openFolder(c.component)"
                :title="c.name"
              >
                <img :src="c.imgurl" :style="size" />
                <div class="bottom1">{{c.name}}</div>
              </div>
            </el-card>
          </div>
        </el-collapse-item>
      </div>
    </el-collapse>
    <capacity
      v-if="capacityVisible&&capacityData.clickTag==='organizationCloud'"
      :capacityVisible="capacityVisible"
      :info="capacityData"
      @closeCapacityForm="closeCapacityForm"
    ></capacity>
  </div>
</template>

<script>
import { myCloudMixin } from '@/assets/js/myCloudMixin.js';
import { myCloudUtilMixin } from '@/assets/js/myCloudUtilMixins.js';
let organizationCloud = {
  fileRight: [],
  folderRight: [
    { iconImg: require('@/assets/image/icons/fileIcons/attr.png'), iconTitle: '云端属性', isRightBorder: false },
    { iconImg: require('@/assets/image/icons/fileIcons/check.png'), iconTitle: '查看', isRightBorder: false, flag: false, children: [{ iconImg: require('@/assets/image/icons/fileIcons/little.png'), iconTitle: '小图标' }, { iconImg: require('@/assets/image/icons/fileIcons/middle.png'), iconTitle: '中图标' }, { iconImg: require('@/assets/image/icons/fileIcons/big.png'), iconTitle: '大图标' },] },
    { iconImg: require('@/assets/image/icons/fileIcons/array.png'), iconTitle: '排列', isRightBorder: true, flag: false, children: [{ iconImg: require('@/assets/image/icons/fileIcons/row.png'), iconTitle: '行展示' }, { iconImg: require('@/assets/image/icons/fileIcons/col.png'), iconTitle: '列展示' }] },
    { iconImg: require('@/assets/image/icons/fileIcons/sendmsg.png'), iconTitle: '发送', isRightBorder: true, flag: false, children: [{ iconImg: require('@/assets/image/icons/fileIcons/desk.png'), iconTitle: '发送桌面' }, { iconImg: require('@/assets/image/icons/fileIcons/msg.png'), iconTitle: '即时通讯' }, { iconImg: require('@/assets/image/icons/fileIcons/mail.png'), iconTitle: '发送邮件' }, { iconImg: require('@/assets/image/icons/fileIcons/phone.png'), iconTitle: '发送短信' }, { iconImg: require('@/assets/image/icons/fileIcons/message.png'), iconTitle: '发送消息' },] },
    { iconImg: require('@/assets/image/icons/fileIcons/refresh.png'), iconTitle: '刷新', isRightBorder: false },
    { iconImg: require('@/assets/image/icons/fileIcons/help.png'), iconTitle: '帮助', isRightBorder: false }
  ],
  blankRight: [
    { iconImg: require('@/assets/image/icons/fileIcons/addC.png'), iconTitle: '申请增容', isRightBorder: false },
    { iconImg: require('@/assets/image/icons/fileIcons/reduceC.png'), iconTitle: '申请减容', isRightBorder: true },
    { iconImg: require('@/assets/image/icons/fileIcons/check.png'), iconTitle: '查看', isRightBorder: false, flag: false, children: [{ iconImg: require('@/assets/image/icons/fileIcons/little.png'), iconTitle: '小图标' }, { iconImg: require('@/assets/image/icons/fileIcons/middle.png'), iconTitle: '中图标' }, { iconImg: require('@/assets/image/icons/fileIcons/big.png'), iconTitle: '大图标' },] },
    { iconImg: require('@/assets/image/icons/fileIcons/array.png'), iconTitle: '排列', isRightBorder: true, flag: false, children: [{ iconImg: require('@/assets/image/icons/fileIcons/row.png'), iconTitle: '行展示' }, { iconImg: require('@/assets/image/icons/fileIcons/col.png'), iconTitle: '列展示' }] },
    { iconImg: require('@/assets/image/icons/fileIcons/sendmsg.png'), iconTitle: '发送', isRightBorder: true, flag: false, children: [{ iconImg: require('@/assets/image/icons/fileIcons/desk.png'), iconTitle: '发送桌面' }, { iconImg: require('@/assets/image/icons/fileIcons/msg.png'), iconTitle: '即时通讯' }, { iconImg: require('@/assets/image/icons/fileIcons/mail.png'), iconTitle: '发送邮件' }, { iconImg: require('@/assets/image/icons/fileIcons/phone.png'), iconTitle: '发送短信' }, { iconImg: require('@/assets/image/icons/fileIcons/message.png'), iconTitle: '发送消息' },] },
    { iconImg: require('@/assets/image/icons/fileIcons/refresh.png'), iconTitle: '刷新', isRightBorder: false },
    { iconImg: require('@/assets/image/icons/fileIcons/help.png'), iconTitle: '帮助', isRightBorder: false }
  ],
  data: [
    { name: '四川挚友软件有限公司', type: 'folder', component: 'fileContent', imgurl: require('@/assets/image/icons/fileIcons/company.png'), active: false }
  ]
}
export default {
  mixins: [myCloudMixin],
  extends: myCloudUtilMixin,
  data() {
    return {
      activeNames: ['1'],
      folderRight: [], //文件夹右键
      blankRight: [], // 空白处右键
      organizationCloud: organizationCloud.data,
    };
  },
  methods: {
  },
  mounted(){
    this.folderRight = organizationCloud.folderRight;
    this.blankRight = organizationCloud.blankRight;
  }
}

</script>
<style lang='less' scoped>
@import "../../assets/css/myCloud.less";
.el-collapse {
  border: none;
  & /deep/ .el-collapse-item__wrap {
    border: none;
  }
}
</style>