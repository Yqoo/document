<!--
 * @Date: 2019-08-19 11:49:20
 * @LastEditors: Yqoo
 * @LastEditTime: 2019-08-19 18:17:31
 * @Desc: 我的账户组件
 -->
<template>
  <div class='account'  v-drag :class="themeColorName">
    <boxTools class="theme-color moveBox" :style="themeColorStyle" :info="info" @windowsTools="windowsTools" :title="componentTitle"></boxTools>
    <div class="accountBody">
      <div class="accountTitle">
        <el-avatar :size="30" :src="avatar"></el-avatar>
        <div class="desc">
          <div>
            <span>赵文嘉（女）</span>
            <span>前端\开发部</span>
          </div>
          <div>
            <span style="color:#409EFF;font-size:10px;">基本信息</span>
          </div>
        </div>
      </div>
      <el-row>
        <el-col :span="6">
          <div class="avatarImg">
            <el-avatar shape="square" :size="130" fit="cover" :src="url"></el-avatar>
            <div class="avatarTools">
              <i class="el-icon-user-solid" style="color:#64c4ed"></i>
              <el-button type="text" size="mini">更改头像</el-button>
              <i class="el-icon-unlock" style="color:#207561"></i>
              <el-button type="text" size="mini">更改密码</el-button>
              <i class="el-icon-mobile-phone" style="color:#ff935c"></i>
              <el-button type="text" size="mini">绑定手机</el-button>
            </div>
          </div>
          <div class="info">
            <ul>
              <li v-for="(item,index) in basicInfo.personal" :key="index">
                <span>{{item.title}}:{{item.value}}</span>
              </li>
            </ul>
            <div class="loadtype">
              <p>
                <i class="el-icon-s-operation"></i>
                <span>默认登录</span>
              </p>
              <el-radio-group v-model="basicInfo.defaultLoad">
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
                <el-button size="mini" icon="el-icon-edit-outline" type="primary">修改</el-button>
                <el-button size="mini" icon="el-icon-document-checked" type="success">保存</el-button>
              </div>
            </div>
            <div class="comFormBox">
              <el-form :model="basicInfo.communication"  label-width="80px" size="mini">
                <el-form-item label="电子邮件">
                  <el-input v-model="basicInfo.communication.email"></el-input>
                </el-form-item>
                 <el-form-item label="办公地点">
                  <el-input v-model="basicInfo.communication.officeLocation"></el-input>
                </el-form-item>
                 <el-form-item label="办公室">
                  <el-input v-model="basicInfo.communication.office"></el-input>
                </el-form-item>
                <el-form-item label="电话">
                  <el-input v-model="basicInfo.communication.phone"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button size="mini" type="primary" icon="el-icon-plus">新增联系方式</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import tools from  "@/assets/js/utils/tools.js";
import boxTools from "@/views/boxTools";
export default {
  name: 'account',
  components: {
    boxTools
  },
  data() {
    return {
      info:{ className:'.account',name:'account',icon:'icon-account' },
      themeColorName:'',
      themeColorStyle: {},
      componentTitle:'我的账户',
      minWidth:'',
      minHeight:'',
      avatar: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      url: 'http://a3.qpic.cn/psb?/V10vB2uw2CoNmJ/Dd6fFmAGXXBJDZiqwdU91mXc7uiZuC9Em4PgcTIj5fA!/m/dEYBAAAAAAAAnull&bo=ZwOHBAAAAAARB9c!&rf=photolist&t=5',
      basicInfo:{//基本信息
        personal:[//个人信息
          { value:'赵文嘉',title:'姓名' },
          { value:'女',title:'性别' },
          { value:'****',title:'组织' },
          { value:'赵文嘉',title:'账号' },
          { value:'2019-08-19',title:'创建' },
          { value:'前端',title:'岗位' },
          { value:'开发部前端',title:'角色' },
        ],
        defaultLoad:'iCloud',//默认登录
        space:[//我的空间

        ],
        msg:[
          { value:'56',title:"文档",icon:'el-icon-document',type:"primary" },
          { value:'99',title:"共享",icon:'el-icon-folder-checked',type:"warning" },
          { value:'10',title:"分享",icon:'el-icon-sort',type:"success" },
          { value:'5',title:"邮件",icon:'el-icon-message',type:"info" },
          { value:'100',title:"短信",icon:'el-icon-mobile-phone',type:"danger" },
        ],
        communication:{
          email:'',
          officeLocation:'',
          office:'',
          phone:'',
        },
      },
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
  },
  mounted(){
    this.minWidth = document.querySelector('.account').offsetWidth;
    this.minHeight = document.querySelector('.account').offsetHeight;
  },
  created(){
    this.themeColorName = this._getThemeColor(this, this.themeColorName, this.themeColorStyle).className;
    this.themeColorStyle = this._getThemeColor(this, this.themeColorName, this.themeColorStyle).style;
  },
  watch:{
    storeChange( val ){
      this.themeColorName = this._getThemeColor(this, val.themeColorName, val.themeColorStyle).className;
      this.themeColorStyle = this._getThemeColor(this, val.themeColorName, val.themeColorStyle).style;
    }
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
        }
      }
      & .avatarImg{
        text-align: center;
        padding: 5px 0px;
        & .avatarTools {
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
          padding: 10px 30px;
        }
      }
    }
  }
</style>