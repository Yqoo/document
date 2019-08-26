<!-- 我的云端： 共享云端 -->
<template>
  <div class='shareCloud'>
      <el-collapse v-model="activeNames">
        <div @click="clickBlock({e: $event,clickTag:'shareCloud',list:blankRight})" @contextmenu.prevent="showRightMenu({e:$event,clickTag: 'shareCloud',dataArr:shareCloud,list:blankRight})">
          <el-collapse-item  name='1' :disabled='true'>
              <template slot="title">
                  <img src='@/assets/image/icons/deskIcons/tree-share2.png'/>共享云端
              </template>
              <div class="cards slideInDown animated" :class="displayName==='行展示'?'row':'col'">
                  <el-card v-for="(c,index) in shareCloud" :class="_isClick.shareCloud&&c.active?'addBorder':''" :key="index" shadow="hover">
                      <div @click.stop="activeCard({e:$event,item:c,i:index,clickTag:'shareCloud',dataArr:shareCloud})" @contextmenu.stop.prevent="fileRightMenu({e:$event,item:c,dataArr:shareCloud,clickTag:'shareCloud'})" @dblclick.stop="openFolder(c.component)" :title="c.name">
                        <img :src="c.imgurl" :style="size"/>
                        <div class="bottom1">{{c.name}}</div>
                      </div>
                  </el-card>
              </div>
          </el-collapse-item>
        </div>
      </el-collapse>
      <capacity 
        v-if="capacityVisible&&capacityData.clickTag==='shareCloud'" 
        :capacityVisible="capacityVisible" 
        :info="capacityData"
        @closeCapacityForm="closeCapacityForm">
      </capacity>
      <el-dialog
        v-dialogDrag
        :visible.sync="dialogVisible"
        :append-to-body="true"
        :close-on-click-modal="false"
        width="50%">
        <div slot="title" class="messageBox-title">
          <img :src="require('@/assets/image/icons/fileIcons/partition.png')">
          <span>创建云端</span>
        </div>
        <el-form v-if="!next" :model="cloudForm1" :rules="rules1" label-width="100px" class="cloudForm1 fadeIn animated" ref="cloudForm1">
          <el-form-item label="云端名称" prop="name">
            <el-input v-model="cloudForm1.name" size="small"></el-input>
            <el-switch
              v-model="cloudForm1.selectSource"
              active-text="新建资源"
              inactive-text="已有资源">
            </el-switch>
          </el-form-item> 
          <el-form-item v-if="cloudForm1.selectSource" label="选择资源" prop="source" class="fadeInLeft animated">
            <el-input v-model="cloudForm1.source" size="small" suffix-icon="el-icon-more"></el-input>
          </el-form-item>
          <el-form-item label="数据中心" prop="dataCenter">
            <el-input v-model="cloudForm1.dataCenter" size="small" suffix-icon="el-icon-more"></el-input>
          </el-form-item>
        </el-form>
        <div v-else class="jackInTheBox animated">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane :disabled='true'>
              <span slot='label' class="tab-title"><img src="@/assets/image/icons/fileIcons/pepole.png">权限维度</span>
            </el-tab-pane>
            <el-tab-pane label="内部组织" name="inside">
              <el-menu :default-active="insideActive" mode="horizontal" @select="handleSelect">
                <el-menu-item :disabled='true'><img src="@/assets/image/icons/fileIcons/seal.png"/>组织维度</el-menu-item>
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
                <el-menu-item :disabled="true"><img src="@/assets/image/icons/fileIcons/power.png">云端权限</el-menu-item>
                <el-menu-item><el-checkbox :indeterminate="isIndeterminate" v-model="checkAllLimit" @change="handleAllLimitChange">所有</el-checkbox></el-menu-item>
              </el-menu>
              <el-checkbox-group v-model="checkedLimits" @change="handleCheckedLimitsChange">
                <el-checkbox v-for="item in cloudLimits" :label="item" :key="item">{{item}}</el-checkbox>
              </el-checkbox-group>
            </el-tab-pane>
            <el-tab-pane label="外部组织" name="outside">外部组织</el-tab-pane>
          </el-tabs>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button v-if="!next" type="primary" @click="nextStep('cloudForm1')" size="small">下一步</el-button>
          <el-button v-if="next" type='primary' @click="prevStep" size="small">上一步</el-button>
          <el-button v-if="next" type='primary' @click="submitCloud" size='small'>确定</el-button>
          <el-button @click="closeDialog('cloudForm1')" size="small">关闭</el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script>
import { myCloudMixin } from '@/assets/js/myCloudMixin.js';
import { myCloudUtilMixin } from '@/assets/js/myCloudUtilMixins.js';
export default {
  mixins: [myCloudMixin],
  extends: myCloudUtilMixin,
  created(){
    // console.log(this.attrs)
  },
  data () {
    return {
        activeNames: ['1'],
        activeName:'inside', //创建云端标签页（默认展示）
        insideActive:'organization', //组织维度默认展示
        checkAll: false, //组织维度中 勾选所有
        checkAllLimit: false, //云端权限  勾选所有
        searchValue:'', //组织维度中  搜索的内容
        next: false, // 创建云端：用于控制是否显示下一步
        empower:true, //授权方式
        shareCloud: this.attrs.data,
        dialogVisible:false, //用于控制创建云端弹框的显示隐藏
        cloudForm1:{  //创建云端表单1
          name:'', //云端名称
          selectSource: false, //新建资源  true:已有资源
          source: '', //选择资源
          dataCenter: '',  //数据中心
        },
        rules1:{
          name: {required:true,message:'请输入云端名称',trigger:'blur'},
          source: {required:true,message:'请选择已有资源',trigger:'change'},
          dataCenter:{required:true,message:'请选择数据中心',trigger:'change'}
        },
        checkedLimits:[],  //云端权限 已勾选的
        isIndeterminate: true,
        cloudLimits:['新建','预览','复制','剪切','命名','删除','加密','解密','上传','下载','在线编辑','协同编辑','压缩','解压','打印','共享','分享','发送','分级授权','管理者','回收站'],
    };
  },
  methods: {
    closeDialog(formName){ //关闭弹框
      this.next === false && this.$refs[formName].resetFields();
      this.dialogVisible = false;
    },
    createCloud(){ //创建云端弹框显示
      this.dialogVisible = true;
    },
    nextStep(formName){ // 下一步
      this.$refs[formName].validate((valid) => {
          if (valid) {
            this.next = true;
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
    prevStep(){ // 上一步
      this.next = false;
    },
    handleClick(){ //创建云端：权限维度标签页点击
      //
    },
    handleSelect(){ //组织维度标签页点击
      //
    },
    handleCheckedLimitsChange( value ){ //云端权限勾选单个
      // console.log(value)
      let checked = value.length;
      this.checkAllLimit = checked === this.checkedLimits.length;
      this.isIndeterminate = checked > 0 && checked < this.cloudLimits.length;
    },
    handleAllLimitChange(val){  //云端权限  全部勾选
      // console.log(val)
      this.isIndeterminate = false;
      this.checkedLimits = val ? this.cloudLimits : [];
    },
    submitCloud(){},
  }
}

</script>
<style lang='less' scoped>
@import '../../assets/css/myCloud.less';
.el-collapse{
  border: none;
  & /deep/ .el-collapse-item__wrap{
    border: none;
  }
}
.cloudForm1{
  & .el-form-item:nth-of-type(1){
    & /deep/ .el-input{
      width: 60%;
      margin-right: 4%;
    }
  }
}
.el-tabs{
  & .tab-title{
    color: #303133;
    & > img{
      display: inline-block;
      width: 20px;
      vertical-align: text-bottom;
    }
  }
}

.el-menu-item{
  font-size: 12px;
  height: 50px;
  line-height: 50px;
  padding: 0 12px;
  & img{
    display: inline-block;
    width: 20px;
    vertical-align: middle;
  }
}
.el-menu-item.is-disabled{
  opacity: 1;
  color: #303133;
}
.middleSearch{
  text-align: center;
  line-height: 30px;
  font-size: 12px;
  margin: 2% 0;
  & .empowerTitle{
    margin-right: 5%;
  }
}
.treeContent{
  border: 1px solid #ddd;
  height: 150px;
  box-sizing: border-box;
  overflow: auto;
}
</style>