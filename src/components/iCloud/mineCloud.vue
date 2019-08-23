<!-- 我的云端： 挚友云&&我的云端 -->
<template>
  <div class='mineCloud'>
    <el-collapse v-model="activeNames">
        <div @click="clickBlock({e: $event, clickTag: 'zhiyou', list:blankRightZy})" @contextmenu.prevent="showRightMenu({e:$event,clickTag: 'zhiyou',dataArr:zyCloud,list:blankRightZy})">
          <el-collapse-item name="1" :disabled='true'>
              <template slot="title">
                  <img src='@/assets/image/icons/deskIcons/icon-myCloud.png'/>挚友云
              </template>
              <div class="cards slideInRight animated" :class="displayName==='行展示'?'row':'col'">
                  <el-card v-for="(c,index) in zyCloud" :class="_isClick.mineCloud.zhiyou&&c.active?'addBorder':''" :key="index" shadow="hover">
                      <div @click.stop="activeCard({e:$event,item:c,i:index,clickTag: 'zhiyou',dataArr:zyCloud})" @contextmenu.stop.prevent="fileRightMenu({e:$event,item:c,dataArr:zyCloud,clickTag: 'zhiyou'})" @dblclick.stop="openFolder(c.component)" :title="c.name">
                        <img :src="c.imgurl" :style="displayName==='行展示'&&size"/>
                        <div class="bottom">{{c.name}}</div>
                        <img :src="c.icon" class="fileIcon">
                      </div>
                  </el-card>
              </div>
          </el-collapse-item>
        </div>
        <div @click="clickBlock({e:$event,clickTag:'mine', list: blankRightMine})" @contextmenu.prevent="showRightMenu({e:$event,clickTag: 'mine',dataArr:myCloud,list:blankRightMine})" >
          <space-progress :avaliableSpace='avaliableSpace' :totalSpace='totalSpace'></space-progress>
          <el-collapse-item name="2" :disabled='true'>
              <template slot="title">
                  <img src='@/assets/image/icons/deskIcons/icon-computer.png'/>我的云端
              </template>
              <div class="cards slideInLeft animated" :class="displayName==='行展示'?'row':'col'">
                  <el-card v-for="(c,index) in myCloud" :class="_isClick.mineCloud.mine&&c.active?'addBorder':''" :key="index" shadow="hover">
                      <div @click.stop="activeCard({e:$event,item:c,i:index,clickTag:'mine',dataArr:myCloud})" @contextmenu.stop.prevent="fileRightMenu({e:$event,item:c,dataArr:myCloud,clickTag:'mine'})" @dblclick.stop="openFolder(c.component)" :title="c.name">
                        <img :src="c.imgurl" :style="displayName==='行展示'&&size"/>
                        <div class="bottom1">{{c.name}}</div>
                      </div>
                  </el-card>
              </div>
          </el-collapse-item>
        </div>
    </el-collapse>
    <el-dialog
      v-dialogDrag
      :visible.sync="dialogVisible"
      :append-to-body="true"
      :close-on-click-modal="false"
      width="40%">
      <div slot="title" class="messageBox-title">
        <img :src="require('@/assets/image/icons/fileIcons/partition.png')">
        <span>创建分区</span>
      </div>
      <el-form :model="createForm" :rules="createRules" ref="createForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="分区名称:" prop="partitionName">
          <el-input v-model="createForm.partitionName"></el-input>
        </el-form-item>
        <el-form-item label="分区盘符:" prop="disk">
          <el-select v-model="createForm.disk">
            <el-option label="E:" value="E:"></el-option>
            <el-option label="F:" value="F:"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数据中心:" prop="data">
          <el-input v-model="createForm.data"></el-input>
        </el-form-item>
        <el-form-item label="创建人:">
          <span>{{creater}}</span>
        </el-form-item>
        <el-form-item label="创建时间:">
          <span>{{createTime}}</span>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm('createForm')">取 消</el-button>
        <el-button type="primary" @click="submitCreateFrom('createForm')">确 定</el-button>
      </span>
    </el-dialog>
    <capacity 
      v-if="capacityVisible&&(capacityData.clickTag==='zhiyou'||capacityData.clickTag==='mine')" 
      :capacityVisible="capacityVisible" 
      :info="capacityData"
      @closeCapacityForm="closeCapacityForm">
    </capacity>
  </div>
</template>

<script>
import { myCloudMixin } from '@/assets/js/myCloudMixin.js';
import { myCloudUtilMixin } from '@/assets/js/myCloudUtilMixins.js';
import SpaceProgress from '@/views/spaceProgress.vue';
import capacity from '@/components/iCloud/capacity.vue';
import { constants } from 'crypto';
import rightMenu from '@/components/iCloud/rightMenu.vue'
import { debuglog } from 'util';
export default {
  mixins: [myCloudMixin],
  extends: myCloudUtilMixin,
  components: {
    SpaceProgress,
    rightMenu,
    capacity
  },
  created(){
    // console.log(this.attrs)
  },
  data () {
    return {
        activeNames: ['1', '2'],
        zyCloud:this.attrs.zhiyou.data,  
        myCloud:this.attrs.mine.data,
        blankRightMine: this.attrs.mine.blankRight, //我的云端：空白处左右键
        folderRightMine: this.attrs.mine.folderRight,  //我的云端：文件夹右键
        blankRightZy: this.attrs.zhiyou.blankRight, //挚友云：空白处左右键
        folderRightZy: this.attrs.zhiyou.folderRight, //挚友云：文件夹右键
        privateSpaceRight:this.attrs.zhiyou.privateSpaceRight, //挚友云：私密空间右键
        backupsRight:this.attrs.zhiyou.backupsRight,  //挚友云：备份中心
        dialogVisible: false,  //控制弹框显示隐藏
        createForm:{  // 创建分区表单
          partitionName:'', //分区名称
          disk:'',  //分区盘符
          data:'',  //数据中心
        }, 
        createRules:{ // 创建分区表单规则
          partitionName: [
            {required: true, message:'请输入分区名称', trigger: 'blur'}
          ],
          disk: [
            {required: true, message:'请选择分区盘符', trigger: 'change'}
          ],
          data:[
            {required: true, message:'请输入数据中心', trigger: 'blur'}
          ]
        },
        creater: '系统管理员',
        createTime: '2019-08-21',
        avaliableSpace: 18.6,  //可用空间
        totalSpace: 30.2,  //总空间
    };
  },
  methods: {
    createPartition(){ //创建分区弹框显示隐藏
      this.dialogVisible = true;
    },
    resetForm( formname ){ //取消创建分区
      this.$refs[formname].resetFields();
    },
    submitCreateFrom( formname ){
      this.$refs[formname].validate((valid) => {
        if(valid){
          console.log('提交');
        } else {
          console.log('提交失败');
          return false;
        }
      });
    }
  },
}

</script>
<style lang='less' scoped>
@import '../../assets/css/myCloud.less';

.spaceProgress{
  position: absolute;
  width: 47%;
  right: 5px;
  top: 4%;
}
</style>