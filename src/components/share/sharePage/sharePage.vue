<!-- 分享页面 -->
<template>
  <div class='shagePage'>
    <el-row>
      <el-col :span="12" class="title">
        <img src="@/assets/image/icons/fileIcons/share_icon.png" alt="挚友云">
        <span>挚友云</span>
      </el-col>
      <el-col :span="12" class="btns">
        <el-button v-if="!isLogin" type="primary" size="small">登录</el-button>
        <el-button v-if="isLogin" type='primary' size='small'>欢迎您，{{userName}}</el-button>
      </el-col>
    </el-row>
    <section>
      <div class="pwdBox" v-if="sharePassword!=''&& showPwdBox">
        <p>
          <img src="@/assets/image/icons/deskIcons/icon-ad.png">
          请输入分享密码
        </p>
        <el-input v-model="pwdInput" clearable></el-input>
        <div class="btns">
          <el-button type='primary' size="medium" @click="pwdSuccess">确定</el-button>
        </div>
      </div>
      <div class="fileBox" v-if="sharePassword==='' || !showPwdBox">
        <el-row>
          <el-col :span="12" class="sharer">
            <img src="@/assets/image/icons/deskIcons/icon_cloudAdmin.png">
            分享人:
            <span>系统管理员</span>
          </el-col>
          <el-col :span='12' class="btns">
            <el-button type="primary" icon="el-icon-user" size="small">保存到个人文区</el-button>
            <el-button type='primary' icon="el-icon-download" size="small">下载</el-button>
            <el-button type='primary' icon="el-icon-mobile-phone" size='small'>保存到手机</el-button>
          </el-col>
        </el-row>
        <el-row class="shareTime">
          <el-col :span="24">
            <span>分享时间：2019-09-01</span>
            <span>失效时间：2019-09-03</span>
          </el-col>
        </el-row>
        <el-row class="filePath">
          <el-col :span='24'>
            全部文件
          </el-col>
        </el-row>
        <el-table
          :data="tableData"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection">
          </el-table-column>
          <el-table-column
            prop="fileName"
            label="文件名">
            <template slot-scope="scope">
              <img src="@/assets/image/icons/deskIcons/tree-folder.png">
              <span style="margin-left:5px">{{ scope.row.fileName }}</span>
              <div class="fileBths">
                <el-button circle size="mini" icon="el-icon-folder-checked" title="保存到个人文区" @click="saveFile(scope.$index, scope.row)"></el-button>
                <el-button circle size="mini" icon="el-icon-download" title="下载" @click="uploadFile(scope.$index, scope.row)"></el-button>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="size"
            label="大小">
          </el-table-column>
          <el-table-column
            prop="updateTime"
            label="修改日期">
          </el-table-column>
        </el-table>
      </div>
    </section>
    <el-dialog
      v-dialogDrag
      :visible.sync="dialogVisible"
      :append-to-body="true"
      :close-on-click-modal="false"
      width="40%"
      class='pathDialog'>
      <div slot="title" class="messageBox-title">
        <img :src="require('@/assets/image/icons/fileIcons/dailyO.png')" />
        <span>选择路径</span>
      </div>
      <div class="pathTree">
        这里是路径
      </div>
      <p class="latestPath">
        <el-checkbox v-model="checkedLatestPath"></el-checkbox>
        最近保存路径：<span>D:/</span>
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button icon="el-icon-folder-add" size="small" @click="createNewFolder" style="float:left;">新建文件夹</el-button>
        <el-button type="primary" @click="selectedPath" size="small">确 定</el-button>
        <el-button @click="resetForm" size="small">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import qs from 'qs';
export default {
  data () {
    return {
      sharePassword:'', //分享密码
      userName:'系统管理员', //登录人
      pwdInput:'', //输入的分享密码
      showPwdBox: true, // true：显示输入密码  false：显示文件列表
      tableData:[
        {fileName:'文件名',size:'300b',updateTime:'2019-09-01'},
      ],
      dialogVisible:false,  //保存到个人文区弹框 显示和隐藏
      checkedLatestPath:false,  // 勾选最近保存的路径
      isLogin: true, // 是否登录
    };
  },
  created(){
    this.sharePassword = this.$route.query.sharePassword;
    console.log(this.sharePassword)
    let token = localStorage.getItem('loginToken');
    console.log(token)
    if( token === null || token === ''){
      this.isLogin = false;
    } else {
      this.isLogin = true;
      this.userName = JSON.parse(token).name;
    }
  },
  methods: {
    getFileList(){
      let json = {
        userId: this.$route.query.userId,
        fileId: this.$route.query.fileId,
        sharePassword: this.sharePassword
      };
      this.axios.get(`/temp/selectShareFile?userId=${json.userId}&fileId=${json.fileId}&sharePassword=${json.sharePassword}`)
        .then((res) => {
          console.log(res)
        });
    },
    pwdSuccess(){ //确定输入验证码
      if(this.pwdInput === ''){
        this.$message('请输入分享密码');
        return false;
      }
      if(this.pwdInput != this.sharePassword){
        this.$message('分享密码输入不正确');
      } else {
        this.showPwdBox = false;
        this.getFileList();
      }
    },
    handleSelectionChange( val ){
      //
    },
    uploadFile(index, row){ //下载
      //
    },
    saveFile(index, row){ //点击保存到个人文区，弹框弹出
      // console.log(index)
      // console.log(row)
      this.dialogVisible = true;
    },
    selectedPath(){ //保存到个人文区，确定选择保存路径
      //
    },
    resetForm(){
      this.dialogVisible = false;
    },
    createNewFolder(){ //新建文件夹
      //
    }
  },
  mounted(){
    this.sharePassword === '' && this.getFileList();
  }
}

</script>
<style lang='less' scoped>
.shagePage{
  padding: 2%;
  height: 100%;
  box-sizing: border-box;
  & .btns{
    text-align: right;
    line-height: 48px;
  }
  & .el-col.title{
    & > img{
      vertical-align: middle;
      margin-right: 1%;
    }
  }
  section {
    box-shadow: 5px 5px 8px #cacaca;
    height: 95%;
    border-top: 1px solid transparent;
    .pwdBox{
      width: 50%;
      margin: 0 auto;
      margin-top: 10%;
      & > p{
        font-size: 30px;
        color: #989898;
        & img{
          width: 10%;
          vertical-align: middle;
        }
      }
    }
    .fileBox{
      font-size: 12px;
      padding: 1%;
      box-sizing: border-box;
      height: 100%;
      & .el-col.sharer{
        font-size: 14px;
        line-height: 48px;
        & img{
          width: 25px;
          vertical-align: middle;
          position: relative;
          top: -2px;
        }
      }
      & .el-row.shareTime{
        line-height: 30px;
        & span{
          margin-right: 10px;
        }
      }
      & .el-row.filePath{
        line-height: 40px;
        color: #9a9a9a;
      }
      .el-table{
        & img{
          vertical-align: middle;
          width: 20px;
        }
      }
    }
  }
}
.fileBths{
  position: absolute;
  right: 0;
  top: 9px;
}
.pathDialog{
  .pathTree{
    border: 1px solid #dddddd;
    min-height: 270px;
    overflow-y: auto;
  }
  .latestPath{
    font-size: 12px;
    line-height: 26px;
  }
}
</style>