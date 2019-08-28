<!-- 创建共享 -->
<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :append-to-body="true"
    :close-on-click-modal="false"
    :modal="false"
    :before-close="closeDialog"
    width="50%">
      <div slot="title" class="messageBox-title">
        <img src="@/assets/image/icons/fileIcons/person.png">
        <span>创建共享</span>
      </div>
      <div class="resourceName">
        <img src="@/assets/image/icons/fileIcons/attribute.png">
        <span>共享资源</span>
        <span class="name">
            <img :src="info.img">
            {{info.name}}
        </span>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane :disabled='true'>
        <span slot='label' class="tab-title"><img src="@/assets/image/icons/fileIcons/pepole.png">共享范围</span>
    </el-tab-pane>
    <el-tab-pane label="内部组织" name="inside">
        <el-menu :default-active="insideActive" mode="horizontal" @select="handleSelect">
            <el-menu-item :disabled='true'><img src="@/assets/image/icons/fileIcons/seal.png"/>共享组织</el-menu-item>
            <el-menu-item index="organization">组织</el-menu-item>
            <el-menu-item index="post">岗位</el-menu-item>
            <el-menu-item index="role">角色</el-menu-item>
            <el-menu-item index="user">用户</el-menu-item>
            <el-menu-item index="userGroup">用户组</el-menu-item>
        </el-menu>
        <el-row class="middleSearch">
            <el-col :span="3">
                <el-checkbox v-model="checkAll">所有</el-checkbox>
            </el-col>
            <el-col :span="11">
                <el-input
                placeholder="请输入内容"
                suffix-icon="el-icon-search"
                size="small"
                v-model="searchValue">
                </el-input>
            </el-col>
            <el-col :span="10">
                <span class="empowerTitle">授权方式：</span>
                <el-switch
                v-model="empower"
                active-text="分项"
                inactive-text="统一">
                </el-switch>
            </el-col>
        </el-row>
        <div class="treeContent">11</div>
        <el-menu mode="horizontal">
            <el-menu-item :disabled='true'><img src="@/assets/image/icons/fileIcons/power.png"/>共享权限</el-menu-item>
            <el-menu-item><el-checkbox :indeterminate="isIndeterminate" v-model="checkAllLimit" @change="handleAllLimitChange">所有</el-checkbox></el-menu-item>
            <el-menu-item><el-checkbox>日常操作</el-checkbox></el-menu-item>
            <el-menu-item><el-checkbox>在线操作</el-checkbox></el-menu-item>
            <el-menu-item><el-checkbox>转发操作</el-checkbox></el-menu-item>
        </el-menu>
        <el-checkbox-group v-model="checkLimits">
            <el-checkbox v-for="item in shareLimits" :label="item" :key="item">{{item}}</el-checkbox>
        </el-checkbox-group>
        <el-menu mode="horizontal">
            <el-menu-item :disabled='true'><img src="@/assets/image/icons/fileIcons/calendar.png"/>共享期限</el-menu-item>
        </el-menu>
        <div class="shareDate">
            <el-radio v-model="shareDate" label="forever">永久有效</el-radio>
            <el-radio v-model="shareDate" label="1">1天</el-radio>
            <el-radio v-model="shareDate" label="3">3天</el-radio>
            <el-radio v-model="shareDate" label="7">7天</el-radio>
            <el-radio v-model="shareDate" label="custom">自定义</el-radio>
        </div>
    </el-tab-pane>
    <el-tab-pane label="外部组织" name="outside">外部组织</el-tab-pane>
    </el-tabs>
    <div slot="footer" class="dialog-footer">
        <el-button type='primary' size='small'>确定</el-button>
        <el-button @click="closeDialog" size="small">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props:{
    show:Boolean,
    info:Object
  },
  data () {
    return {
        dialogVisible: this.show,
        activeName:'inside', //共享范围
        insideActive: 'organization', //共享组织
        checkLimits:[], //共享权限选中数据
        shareLimits:['新建','预览','复制','剪切','命名','删除','加密','解密','上传','下载','在线编辑','协同编辑','压缩','解压','打印','共享','分享','发送','分级授权','管理者','回收站'],
    };
  },
  methods: {
      handleSelect(){ //选择共享范围：内部组织 || 外部组织
          //
      },
      closeDialog(){
          this.$emit('closeDialog', 'showEnjoy');
      }
  }
}

</script>
<style lang='less' scoped>
@import './shareStyle.less';
</style>