<!--
 * @Date: 2019-08-19 11:49:20
 * @LastEditors: Yqoo
 * @LastEditTime: 2019-08-28 18:04:37
 * @Desc: 我的账户组件
 -->
<template>
  <div class='account'  v-drag :class="themeColorName">
    <boxTools class="theme-color moveBox" :style="themeColorStyle" :info="info" @windowsTools="windowsTools" :title="componentTitle"></boxTools>
    <div class="accountBody fadeIn animated">
      <div class="accountTitle">
        <el-avatar :size="30" :src="avatar"></el-avatar>
        <div class="desc">
          <div>
            <span>{{titleDesc}}</span>
            <span>{{titleRole}}</span>
          </div>
          <div>
            <span style="color:#409EFF;font-size:10px;">基本信息</span>
          </div>
        </div>
      </div>
      <el-row>
        <el-col :span="6">
          <div class="avatarImg">
            <el-image style="width: 120px; height: 120px" :src="avatarUrl" fit="fit"></el-image>
            <div class="avatarTools">
              <el-upload class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-success="handleAvatarSuccess"
                :show-file-list="false">
                 <i class="el-icon-user-solid" style="color:#64c4ed"></i>
                <el-button type="text" size="mini">更改头像</el-button>
              </el-upload>
              <div>
                <i class="el-icon-unlock" style="color:#207561"></i>
                <el-button type="text" size="mini" @click=" pwdDialog = true ">更改密码</el-button>
              </div>
              <div>
                <i class="el-icon-mobile-phone" style="color:#ff935c"></i>
                <el-button type="text" size="mini" @click="dialogPhone = true">绑定手机</el-button>
              </div>
            </div>
          </div>
          <div class="info">
            <ul>
              <li v-for="(item,index) in basicInfo.personal" :key="index">
                <span class="fontDisplay">{{item.title}}：<span>{{item.value}}</span> </span>
              </li>
            </ul>
            <div class="loadtype">
              <p>
                <i class="el-icon-s-operation"></i>
                <span>默认登录</span>
              </p>
              <el-radio-group v-model="basicInfo.defaultLoad" @change="updateLodingShow">
                <el-radio label="desk">桌面</el-radio>
                <el-radio label="iCloud">我的云端</el-radio>
                <el-radio label="sCloud">共享云端</el-radio>
              </el-radio-group>
            </div>
            <div class="ispace">
              <p>
                <i class="el-icon-s-operation"></i>
                <span>我的空间</span>
              </p>
              <div class="spacenum">18G/36G</div>
              <el-progress :percentage="50"></el-progress>
              <div class="spaceTools">
                <div>
                  <img :src="require('@/assets/image/icons/deskIcons/icon-reduceSpace2.png')">
                  <span>扩容</span>
                </div>
                <div>
                  <img :src="require('@/assets/image/icons/deskIcons/icon-reduceSpace.png')">
                  <span>减容</span>
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="18">
          <div class="msg">
            <el-badge v-for="(item,index) in basicInfo.msg" :key="index" :value="item.value" :type="item.type">
              <el-button size='mini' :icon="item.icon">{{item.title}}</el-button>
            </el-badge>
          </div>
          <div class="communicationBox">
            <div class="comTitle">
              <div>
                <i class="el-icon-s-operation"></i>
                <span>通讯信息</span>
              </div>
              <div>
                <el-dropdown split-button type="primary" @command="addCommunication" size="mini">
                  新增联系方式
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="电话">电话</el-dropdown-item>
                    <el-dropdown-item command="QQ">QQ</el-dropdown-item>
                    <el-dropdown-item command="微信">微信</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <el-button size="mini" icon="el-icon-edit-outline" type="primary" @click="isdisabled = false" style="margin-left:10px;">修改</el-button>
                <el-button size="mini" icon="el-icon-document-checked" type="success" @click="getCommunication">保存</el-button>
              </div>
            </div>
            <div class="comFormBox">
              <el-form ref="infoForm" :model="basicInfo.communication"  label-width="80px" size="mini">
                <el-form-item v-for="(item,index) in basicInfo.communication.basic"
                  :key="index" 
                  :label="item.type"
                  :prop="'basic.'+ index + '.value'"
                  :rules="{ required: true, message: item.key_? item.type + '不能为空或删除该联系方式':item.type + '不能为空', trigger: 'blur' }"
                  >
                  <el-input v-model="item.value" :disabled="isdisabled">
                    <i slot="suffix" class="el-icon-circle-close" @click="removeCommunication(item,'old')" v-if="item.key_" title="删除该联系方式"></i>
                  </el-input>
                </el-form-item>
                <el-form-item v-for="(t,index) in basicInfo.communication.type" 
                  :key="t.key" :label="t.type"
                  :prop="'type.' + index + '.value'"
                  :rules="{ required: true, message: t.type+'不能为空或删除该联系方式', trigger: 'blur' }">
                  <el-input v-model="t.value">
                    <i slot="suffix" class="el-icon-circle-close" @click="removeCommunication(t,'new')" v-if="t.key_" title="删除该联系方式"></i>
                  </el-input>
                </el-form-item>                
              </el-form>
              <div class="comTitle">
                <div>
                  <i class="el-icon-s-operation"></i>
                  <span>上下级关系</span>
                </div>
                <div>
                  <el-button size="mini" icon="el-icon-edit-outline" type="primary" @click="isdisabled2 = false">修改</el-button>
                  <el-button size="mini" icon="el-icon-document-checked" type="success">保存</el-button>
                </div>
              </div>
              <el-form :model="basicInfo.leaderMember" label-width="80px" size="mini">
                <el-form-item label="直接上级">
                  <el-input v-model="basicInfo.leaderMember.immediateSuperior" :disabled="isdisabled2"></el-input>
                </el-form-item>
                <el-form-item label="直接下级">
                  <el-input v-model="basicInfo.leaderMember.directSubordinates" :disabled="isdisabled2"></el-input>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-dialog
        :visible.sync="dialogPhone"
        v-dialogDrag
        :modal="false"
        width="30%"
        :close-on-click-modal="false">
        <div slot="title">
          <i class="el-icon-phone"></i>
          <span>绑定手机</span>
        </div>
        <div>
          <el-form
            ref="phoneForm" 
            :model="phoneForm"
            size="small">
            <el-form-item prop="phone">
              <el-input v-model="phoneForm.phone">
                <template slot="prepend">手机号</template>
              </el-input>
            </el-form-item>
            <el-form-item prop="code">
              <el-input v-model="phoneForm.code">
                <template slot="prepend">验证码</template>
                <el-button slot="append" style="color:#409EFF" @click="getCode" v-if="!isSend">获取验证码</el-button>
                <el-button slot="append" style="color:#409EFF" v-else>{{waitTime}}</el-button>
              </el-input>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer">
          <el-button size="mini" type="danger" @click="dialogPhone = false ">取消</el-button>
          <el-button size="mini" type="success" @click="consfirmBinding">确认</el-button>
        </div>
      </el-dialog>
      <el-dialog
        :visible.sync="pwdDialog"
        v-dialogDrag
        :modal="false"
        width="30%"
        :close-on-click-modal="false">
        <div slot='title'>
          <i class="el-icon-edit"></i>
          <span>更改密码</span>
        </div>
        <div>
          <el-form
            ref="pwdForm"
            :model="pwdForm"
            :rules="pwdRules"
            size='small'>
            <el-form-item label="旧密码" prop="oldPwd">
              <el-input type="password" v-model="pwdForm.oldPwd"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop='newPwd' v-if="isSuccess">
              <el-input type="password" v-model='pwdForm.newPwd'></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer">
          <el-button type="warning" size='mini' @click=" pwdDialog = false ">取消</el-button>
          <el-button type="success" size='mini' @click="changePwd">确认</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import tools from  "@/assets/js/utils/tools.js";
import boxTools from "@/views/boxTools";
import qs from 'qs';

export default {
  name: 'account',
  components: {
    boxTools
  },
  data() {
    let checkPwd = ( rule, value, fn ) => {
      if( value ){
        this.axios.post('/user/validatePwd',qs.stringify({password:value})).then( res => {
          if( res.data.code !== 200) {
            fn( new Error('密码错误'));
          } else {
            this.isSuccess = true;
          }
        }) 
      }
    };
    return {
      info:{ className:'.account',name:'account',icon:'icon-account' },
      themeColorName:'',
      themeColorStyle: {},
      componentTitle:'我的账户',
      minWidth:'',
      minHeight:'',
      avatar: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      avatarUrl: 'http://m.qpic.cn/psb?/V10vB2uw2CoNmJ/XwKpb*tX5HNfAFVwlzkbj6GUeQnPLXzUOpoFped4n6A!/b/dIMAAAAAAAAA&bo=OAQjCQAAAAARByY!&rf=viewer_4',
      basicInfo:{//基本信息
        personal:[],//个人信息
        defaultLoad:'iCloud',//默认登录
        space:[],//我的空间
        msg:[
          { value:'56',title:"文档",icon:'el-icon-document',type:"primary" },
          { value:'99',title:"共享",icon:'el-icon-folder-checked',type:"warning" },
          { value:'10',title:"分享",icon:'el-icon-sort',type:"success" },
          { value:'5',title:"邮件",icon:'el-icon-message',type:"info" },
          { value:'100',title:"短信",icon:'el-icon-mobile-phone',type:"danger" },
        ],
        communication:{//通讯信息
          basic:[],
          type:[],
        },
        leaderMember:{//上下级关系
          immediateSuperior:'',//直接上级
          directSubordinates:'',//直接下级
        },
      },
      isdisabled:true,
      isdisabled2:true,
      dialogPhone:false,
      phoneForm:{
        phone:'',
        code:''
      },
      pwdDialog:false,
      isSuccess:false,
      pwdForm:{
        oldPwd:'',
        newPwd:''
      },
      pwdRules:{
        oldPwd:[
          { validator: checkPwd, trigger: 'blur' }
        ],
      },
      isSend:false,//是否发送验证码
      waitTime:'60s后重新获取',//发送验证码后的提示
      titleDesc:'',
      titleRole:'',
    }
  },
  methods:{
    windowsTools( obj ){  
      let _s = {
        minSize:   ( param ) => this.$emit( 'minSize',param ),
        maxSize:   ( param ) => {tools._maxSize(document.querySelector( param ))},
        restore:   ( param ) => tools._restore( document.querySelector( param ),this.minHeight,this.minWidth),
        closeItem: ( param ) => this.$emit( 'closeItem',param )
      };
      _s[obj.type](obj.param);
    },
    handleAvatarSuccess( res,file ){//上传头像
      this.avatarUrl = URL.createObjectURL(file.raw);
    },
    addCommunication( command ){//新增联系方式
      this.basicInfo.communication.type.push({ type:command,value:'',key_:Date.now() });
    },
    removeCommunication( t,type ){//删除联系方式 type == new 临时新增的选项删除  type === old 历史新增的选项删除
      let _s = type === 'new'? this.basicInfo.communication.type:this.basicInfo.communication.basic;
      let index = _s.indexOf( t );
      if( index !== -1 ) _s.splice(index,1);
    },
    changePwd(){//更改密码
      if( this.isSuccess ){
        if( this.pwdForm.newPwd ){
           this.axios.post('/user/updatePwd',qs.stringify({password:this.pwdForm.newPwd})).then( res => {
            if( res.data.code === 200 ){
              this.$message.success('修改成功');
              this.pwdDialog = false;
            } else this.$message.error( res.data.desc );
          })
        } else {
          this.$message.error('请输入新密码');
        }
      } else {
        this.$message.error('请输入正确的旧密码');
      }
    },
    getCommunication(){//保存个人信息
      this.$refs['infoForm'].validate( valid => {
        if( valid ){
          let newInfo = this.basicInfo.communication.basic.concat( this.basicInfo.communication.type );
          let URLSearchParams = require('url-search-params');//URLSearchParams的兼容性
          let params = new URLSearchParams();
          params.append('contacts',JSON.stringify(newInfo))
          this.axios.post('/user/saveAttr',params).then( res => {
            res.data.code === 200 && ( this.$message.success('保存成功') ) || ( this.$message.error( res.data.desc ) );
          }).catch( err => this.$message.error( err ) );
        } else {
          this.$message.error('请完整填写信息');
        }
      });
    },
    getCode(){//获取验证码
      let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      if( reg.test( this.phoneForm.phone )){
        this.isSend = true;
        let t = 60;
        this.waitTime = '60s后重新获取';
        let timer = setInterval(() => {
          if( t === 1 ){
            this.isSend = false;
            clearInterval( timer );
          }
          t --;
          this.waitTime = t + 's后重新获取';
        }, 1000);
        this.axios.get('/user/sendCode?phone='+this.phoneForm.phone).then( res => {
          res.data.code === 200 && ( this.$message.success( res.data.obj )) || ( this.$message.error( res.data.desc ));
        })
      } else {
        this.$message.error('请输入正确的手机号');
      }
    },
    consfirmBinding(){//确认绑定手机
      if( this.phoneForm.code ){
        let params = {
          phone: this.phoneForm.phone,
          code:this.phoneForm.code
        };
        this.axios.post('/user/bindingTel',qs.stringify(params)).then( res => {
          res.data.code === 200 && ( this.$message.success('绑定成功') ) || ( this.$message.error( res.data.desc ));
           this.dialogPhone = false;
        }).catch( err => console.log(err));
      } else {
        this.$message.error('请完整填写表单！');
      }
    },
    updateLodingShow( label ){
      this.axios.post('/user/updateDesk',qs.stringify({desk:label})).then( res => true).catch( err => this.$message.error( res.data.desc ));
    },
  },
  mounted(){
    this.minWidth = document.querySelector('.account').offsetWidth;
    this.minHeight = document.querySelector('.account').offsetHeight;
  },
  created(){
    this.themeColorName = this._getThemeColor(this, this.themeColorName, this.themeColorStyle).className;
    this.themeColorStyle = this._getThemeColor(this, this.themeColorName, this.themeColorStyle).style;
    //获取账户信息
    this.axios.get('/user/getInfo').then( res => {
      if( res.data.code === 200 ){
        let {user,attrList } = res.data.obj;
        this.basicInfo.personal = [
          { title: '姓名',value: user.name },
          { title: '组织',value: user.org },
          { title: '账号',value: user.account },
          { title: '创建',value: user.createTime },
          { title: '岗位',value: user.position },
          { title: '角色',value: user.role }
        ];
        this.titleDesc = `${user.name}(${user.gender})`;
        this.titleRole = `${user.role}/${user.position}`;
        this.basicInfo.defaultLoad = user.defaultDesk;
        //通讯信息
        this.basicInfo.communication.basic = attrList;
      } else {
        this.$message.error( res.data.desc );
      }
    })
  },
  watch:{
    storeChange( val ){
      this.themeColorName = this._getThemeColor(this, val.themeColorName, val.themeColorStyle).className;
      this.themeColorStyle = this._getThemeColor(this, val.themeColorName, val.themeColorStyle).style;
    },
    pwdDialog() {
      this.isSuccess = false;
      this.pwdForm.newPwd = '';
      this.pwdForm.oldPwd = '';
    },
    dialogPhone(){
      this.phoneForm.phone = '';
      this.phoneForm.code = '';
    },

  },
  computed:{
    storeChange(){
      return this.$store.state.themeColor;
    }
  },
}
</script>
<style lang='less' scoped>
  .account {
    height: 600px;
    width: 60%;
    position: absolute;
    top: 10%;
    left: 20%;
    border-radius: 4px;
    box-shadow: 0px 0px 50px 10px rgba(0, 0, 0, .3);
    transition: box-shadow 0.5s, transform 0.5s;
    text-align: left;
    background: #fff;
    font-size: 12px;
    & .accountBody {
      & .accountTitle {
        border-bottom: 1px solid #ddd;
        display: flex;
        flex-flow: row wrap;
        padding: 5px 10px;
        & .desc {
          padding-left: 5px;
          & span:nth-child(2){
            padding-left: 10px;
            color:#409EFF;
          }
        }
      }
      & .avatarImg{
        text-align: center;
        padding: 5px 0px;
        & .avatarTools {
          display: flex;
          flex-flow: row wrap;
          justify-content: center;
          margin-top: 10px;
          & i {
            font-size: 20px;
            padding-left: 5px;
          }
          & .el-button--text{
            color:#000;
          }
          & .el-button--text:hover {
            color:#409EFF;
          }
        }
      }
      & .info {
        & ul {
          padding: 0px 28px;
          & li {
            padding: 3px 0px;
            border-bottom: 1px solid #ddd;
            & .fontDisplay {
              & span {
                padding-left: 10px;
                font-size: 10px;
              }
            }
          }
        }
        & .loadtype {
          margin: 10px 28px 0px;
          & p {
            
            border-bottom: 1px solid #ddd;
            & i {
              font-size: 15px;
              padding-right: 5px;
            }
          }
          & .el-radio-group {
            padding-top: 10px;
            & .el-radio {
              margin-right: 3px;
              & .el-radio__label {
                padding-left: 5px!important;
              }
            }
          }
        }
        & .ispace {
          margin: 10px 28px 0px;
          & p {
            border-bottom: 1px solid #ddd;
            & i {
              font-size: 15px;
              padding-right: 5px;
            }
          }
          & div.spacenum {
            padding: 5px 0px 0px 5px;
          }
          & .spaceTools {
            display: flex;
            flex-flow: row nowrap;
            & div {
              padding-top: 5px;
              cursor: pointer;
            }
            & div:nth-child(2){
              padding-left: 10px;
            }
            & img {
              width: 30px;
              vertical-align: bottom;
            }
          }
        }
      }
      & .msg {
        padding: 10px;
        text-align: right;
        & .el-badge{
          margin-right: 18px;
        }
      }
      & .communicationBox{
        & .comTitle {
          height: 40px;
          line-height: 40px;
          border-bottom: 1px solid #ddd;
          border-top: 1px solid #ddd;
          display: flex;
          flex-flow: row wrap;
          justify-content: space-between;
          padding-right: 30px;
        }
        & .comFormBox {
          padding: 10px 0px;
          height: 400px;
          overflow-y: auto;
          & .el-form {
            padding: 10px 30px;
          }
          & .el-form-item {
            margin-bottom: 15px;
          }
        }
      }
    }
  }
  .el-dialog__wrapper {
    & /deep/.el-dialog__body {
      min-height: 100px;
      padding: 20px 50px;
      & /deep/.el-input{
        margin-bottom: 5px;
      }
    }
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>