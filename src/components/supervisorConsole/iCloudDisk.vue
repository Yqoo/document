<!--
 * @Date: 2019-08-14 16:45:07
 * @LastEditors: Yqoo
 * @LastEditTime: 2019-08-19 10:22:47
 * @Desc: iCloud组件下的存储中心
 -->
<template>
  <div class='iCloudDisk'>
    <div class="topBtns">
      <el-button size='mini' icon="el-icon-circle-plus-outline" type="success"  @click="dialogFormVisible = true">创建存储中心</el-button>
    </div>
    <vxe-table
      ref="diskTable"
      show-overflow
      :data.sync="tableData"
      size="mini"
      max-height="400"
      header-align="center"
      align="center"
      highlight-hover-row
      highlight-current-row
      :edit-config="{trigger: 'manual', mode: 'row'}">
     <!--  <vxe-table-column type='selection' width="50"></vxe-table-column> -->
      <vxe-table-column field="ID" title="序号" width="50" ></vxe-table-column>
      <vxe-table-column field="dc" title="存储中心" width="80"></vxe-table-column>
      <vxe-table-column field="IP" title="网络地址" width="100"></vxe-table-column>
      <vxe-table-column field="port" title="端口" width="50"></vxe-table-column>
      <vxe-table-column field="path" title="物理路径" width="90" ></vxe-table-column>
      <vxe-table-column field="allocation" title="分配空间" width="130" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="usable" title="可用空间" width="120" ></vxe-table-column>
      <vxe-table-column field="user" title="创建人" width="80" ></vxe-table-column>
      <vxe-table-column field="time" title="操作时间" width="100" ></vxe-table-column>
      <vxe-table-column title="关联操作" fixed="right" width="220">
        <template v-slot="{row}">
          <template v-if="$refs.diskTable.hasActiveRow(row)">
            <vxe-button @click="saveRowEvent(row)">保存</vxe-button>
            <vxe-button @click="cancelRowEvent(row)">取消</vxe-button>
          </template>
          <template v-else>
            <i class="el-icon-edit toolsIcon" @click="editRowEvent(row)" title="编辑" style="color:#46cdcf"></i>
            <i class="el-icon-delete toolsIcon" @click="delrow(row)"  title="删除" style="color:#e84545"></i>
            <i class="el-icon-user toolsIcon" @click="admin(row)" title="管理员" style="color:#2a363b"></i>
            <i class="el-icon-sort toolsIcon"  title="迁移" style="color:#07689f"></i>
          </template>
        </template>
      </vxe-table-column>
    </vxe-table>
    <el-dialog   :visible.sync="dialogFormVisible" v-dialogDrag :modal="false" width="40%" :close-on-click-modal="false">
      <!-- 创建存储中心 -->
      <div slot="title" class="messageBox-title">
        <img :src="require('@/assets/image/icons/appIcons/appIcons-cloudDisk.png')">
        <span>创建存储中心</span>
      </div>
      <div class="messageBox-body">
        <el-form
          :model="diskForm"
          :rules="diskRules"
          ref="diskForm"
          label-width="70px"
          size="mini"
          :inline="false"
          >
          <div class="position">
            <el-form-item label="存储中心" prop="diskcenter">
            <el-input v-model="diskForm.diskcenter"></el-input>
            </el-form-item>
            <el-form-item>
              <el-switch
                v-model="space"
                active-text="网络空间"
                inactive-text="本地空间"
                @change="spaceChange"
                style="padding-left:10px;">
              </el-switch>
            </el-form-item>
          </div>
          <div v-show="isShowSpace">
            <el-form-item label="物理地址" prop="path">
              <el-input v-model="diskForm.path"></el-input>
            </el-form-item>
            <div>
              <el-form-item label="分配空间" prop="num">
                <el-slider
                  v-model="value"
                  show-input
                  :marks="marks">
                </el-slider>
              </el-form-item>
              <span class="formSpan" style="color:green">物理空间100G,可分配空间100G</span>
            </div>
            <div class="position">
              <el-form-item label="创建人" prop="creater">
                <el-input v-model="diskForm.creater" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="创建时间" prop="createTime">
                <el-input v-model="diskForm.createTime" :disabled="true"></el-input>
              </el-form-item>
            </div>
          </div>
          <div v-show="!isShowSpace">
            <el-form-item label="网络地址" prop="IP">
              <el-input v-model="diskForm.IP"></el-input>
            </el-form-item>
            <el-form-item label="端口" prop="port">
              <el-input v-model="diskForm.port"></el-input>
            </el-form-item>
              <el-form-item label="用户名" prop="name">
              <el-input v-model="diskForm.name"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pwd">
              <el-input v-model="diskForm.pwd"></el-input>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <div v-if="!space">
          <div class="customBtn">
            <el-radio v-model="confirm" label="confirmAndcontinue">确认并创建</el-radio>
            <el-radio v-model="confirm" label="confirmAndclose">确认并关闭</el-radio>
          </div>
          <el-button size="mini" type="success">确认</el-button>
          <el-button size="mini" type="danger" @click="dialogFormVisible = false">关闭</el-button>
        </div>
        <div v-else>
          <div v-if="nextStep">
            <el-button size="mini" @click="test" type="warning">测试</el-button>
            <el-button size="mini" @click="next" type="primary">下一步</el-button>
            <el-button size="mini" type="danger" @click="dialogFormVisible = false">关闭</el-button>
          </div>
          <div v-else>
             <div class="customBtn">
              <el-radio v-model="confirm" label="confirmAndcontinue">确认并创建</el-radio>
              <el-radio v-model="confirm" label="confirmAndclose">确认并关闭</el-radio>
            </div>
            <el-button size="mini" @click="prev" type="primary">上一步</el-button>
            <el-button size="mini" type="success">确认</el-button>
            <el-button size="mini" type="danger" @click="dialogFormVisible = false">关闭</el-button>
          </div>
        </div>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogAllocationVisible" :modal="false" width="60%" v-dialogDrag :close-on-click-modal="false">
      <!-- 分配存储空间 -->
      <div slot="title" class="messageBox-title">
        <img :src="require('@/assets/image/icons/appIcons/appIcons-cloudDisk.png')">
        <span>分配存储空间</span>
      </div>
      <div class="allocationBody">
        <el-row>
          <el-col :span="4">
            <div style="text-align:center">
              <img :src="require('@/assets/image/icons/appIcons/appIcons-disk.png')">
            </div>
            <div class="allocationDesc">
              <p>
                <img :src="require('@/assets/image/icons/appIcons/appIcons-cloudDisk.png')">
                存储中心：
              </p>
              <p>
                <img :src="require('@/assets/image/icons/appIcons/appIcons-interAddres.png')">
                网络地址：192.168.000.200
              </p>
              <p>
                <img :src="require('@/assets/image/icons/appIcons/appIcons-disk.png')" >
                总空间：
              </p>
              <p>
                <img :src="require('@/assets/image/icons/appIcons/appIcons-spaceable.png')">
                可分空间：
              </p>
            </div>
          </el-col>
          <el-col :span="20">
            <div class="rightTitle">
              <el-button size="mini" icon="el-icon-plus" type="success" plain>创建存储空间</el-button>
              <el-button size="mini" icon="el-icon-back" type="danger" plain>返回</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'iCloudDisk',
  components: {},
  data() {
    let checkNum = ( rule,value,callback) => {
      isNaN( value ) && callback( new Error('请输入数字')) || ( value > 4*1024 ? callback( new Error('分配空间不能大于4T')):true )
    };
    let checkPort = ( rule,value,fn ) => {
      isNaN( value ) && fn( new Error( '请输入1-65535之间的数字')) || ( value >= 1 && value <= 65535 ? true:fn( new Error( '请输入1-65535之间的数字')));
    };
    return {
      tableData:[
        { ID:1,dc:'A中心',IP:'127.0.0.1',port:'8080',path:'D:/',allocation:'90%',usable:'10%',user:'Yqoo',time:'13:00'},
        { ID:2,dc:'B中心',IP:'127.0.0.1',port:'8080',path:'D:/',allocation:'90%',usable:'10%',user:'Yqoo',time:'13:00'},
        { ID:3,dc:'C中心',IP:'127.0.0.1',port:'8080',path:'D:/',allocation:'90%',usable:'10%',user:'Yqoo',time:'13:00'},
      ],
      dialogFormVisible: false,//创建存储中心dialog
      dialogAllocationVisible:false,//分配存储空间dialog
      diskForm:{
        diskcenter:'',
        path:'',
        creater:'系统管理员',
        createTime:'2010-9-18',
        IP:'',
        port:'',
        name:'',
        pwd:'',
      },
      diskRules:{
        diskcenter: [
          { required: true, message: '请输入存储中心名称', trigger: 'blur' },
        ],
        path: [
          { required: true, message: '请选择物理地址', trigger: 'blur' },
        ],
        IP: [
          { required: true, message: '请输入网络地址', trigger: 'blur' },
        ],
        port: [
          { required: true, message: '请输入端口号', trigger: 'blur' },
          { validator: checkPort, trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
      },
      space:false,//控制创建存储中心底部按钮栏的显示
      isShowSpace:true,//控制创建存储中心中间内容的显示
      confirm:'confirmAndcontinue',
      nextStep:true,//控制创建存储中心在网络地址下的底部工具栏的显示
      testOver:null,//测试是否通过
      value: 10,
      marks: {
        10: '10G',
        50: '50G',
        100: '100G',
      },
      
    };
  },
  methods:{
    editRowEvent (row) {//编辑行
      this.$refs.diskTable.setActiveRow(row)
    },
    saveRowEvent (row) {//保存编辑的行
      this.cancelRowEvent()
    },
    cancelRowEvent (row) {//取消编辑的行
      this.$refs.diskTable.clearActived()
    },
    delrow( row ){//删除行
      this.$confirm('确定删除该行数据吗？','温馨提示',{
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        type:'warning'
      }).then(() => {
        //this.$refs.diskTable.removeSelecteds();
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });    
      })
    },
    spaceChange( val ){//滑块change
      this.space = val;
    },
    next(){//下一步
      let msg = '';
      switch (this.testOver) {
        case null:
          msg = '请先测试'
          break;
        case true:
          msg = '测试通过';
          break;
        default:
          msg = '测试未通过'
          break;
      }
      this.testOver && ( this.nextStep = false,this.isShowSpace = true) || (this.$message({
        message: msg,
        type: 'warning'
      }))
    },
    prev(){//上一步
      this.nextStep = true;
      this.isShowSpace = false;
      this.testOver = null;
    },
    test(){//测试
      this.testOver = true;
    },
    admin( row  ){//存储中心子界面，存储空间
      console.log( row )
      this.dialogAllocationVisible = true;
    },
   
  },
  watch:{
    space( val ){
      this.isShowSpace = !val;
      this.nextStep = true;
      this.testOver = null;
    }
  },
}
</script>
<style lang='less' scoped>
  .iCloudDisk {
    text-align: right;
    padding:10px 10px;
    & .topBtns{
      padding-bottom: 5px;
    }
  }
  .toolsIcon{
    padding-right: 5px;
    font-size: 15px;
    cursor: pointer;
  }
  .customBtn {
    position: absolute;
    bottom: 15px;
  }
  .messageBox-body{
    padding: 0px 50px;
    & .el-form .position {
      display: flex;
      flex-flow: row wrap;
    }
  }
  .formSpan {
    font-size: 12px;
    line-height: 2.5em;
    padding-left: 13px;
  }
  .allocationBody{
    text-align: left;
    & .el-row {
      & .el-col {
        & img {
          width: 80px;
        }
        & .allocationDesc {
          border-top: 1px solid #ddd;
          & img {
            width:20px;
            vertical-align: bottom;
          }
          & p {
            font-size: 10px;
            padding: 10px 0px;
          }
        }
        & .rightTitle {
          text-align: right;
          padding-bottom: 5px;
          border-bottom: 1px solid #ddd;
        }
      }
    }
  }
</style>