<!--
 * @Date: 2019-08-21 15:25:17
 * @LastEditors: Yqoo
 * @LastEditTime: 2019-08-21 18:24:31
 * @Desc: 域名管理控制台
 -->
 <template>
  <div class="domainConsole" v-drag :class="themeColorName">
    <boxTools class="theme-color moveBox" :style="themeColorStyle" :info="info" @windowsTools="windowsTools" :title="componentTitle"></boxTools>
    <div class="fadeIn animated">
      <div class="left">
          <div class="leftImg">
            <img :src="require('@/assets/image/icons/appIcons/appIcon-domainLogo.png')">
          </div>
      </div>
      <div class="right">
        <div class="topBtns">
          <el-button type='text' icon="el-icon-user">注册</el-button>
          <el-button type='text' icon="el-icon-switch-button">注销</el-button>
        </div>
        <div class="main">
          <div class="title">
            <div class="leftTitle">
              <el-avatar :size="50" src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"></el-avatar>
            </div>
            <div class="rightTitle">
              <p>Hi,南充汇义管理有限公司</p>
              <p>
                <i class="el-icon-message"></i>
                <i class="el-icon-mobile-phone"></i>
                <i class="el-icon-user"></i>
              </p>
              <p>
                <img :src="require('@/assets/image/icons/appIcons/appIcon-vip.png')">
                <span>企业已认证</span>
              </p>
            </div>
            <div class="rightMain">
              <el-row style="height:100px">
                <el-col :span="16">
                  <div class="box">
                    <div>
                      <img :src="require('@/assets/image/icons/appIcons/appIcon-domainTest.png')">
                      <p>
                        当前域名：{{dataBox.box1.domain}}
                        <el-button size="mini" type="danger">测试</el-button>
                      </p>
                      <p>当前状态：{{dataBox.box1.status}}</p>
                      <p>服务截止：{{dataBox.box1.serviceAs}}</p>
                      <p>ID：{{dataBox.box1.ID}}</p>
                    </div>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="other">
                    <div>
                      <p>访问当前地址</p>
                      <p></p>
                      <p>点击“我要访问”，即可用外网地址访问挚友iCloud！</p>
                      <p>
                        <img :src="require('@/assets/image/icons/appIcons/appIcon-contact.png')">
                      </p>
                      <p><el-button size='mini' type="danger">我要访问</el-button></p>
                    </div>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <div style="padding:5px">
                    <div class="other">
                      <div>
                        <p>域名服务</p>
                        <p></p>
                        <p>域名服务：即为系统创建动态域名解析 <br>当前状态：已启动 </p>
                        <p>
                          <img :src="require('@/assets/image/icons/appIcons/appIcon-dns.png')">
                        </p>
                        <p><el-button size='mini' type="danger">我要访问</el-button></p>
                      </div>
                    </div>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div style="padding:5px">
                    <div class="other">
                      <div>
                        <p>域名续费</p>
                        <p></p>
                        <p>您可以自助续费，以便我们更好的为您服务！</p>
                        <p>
                          <img :src="require('@/assets/image/icons/appIcons/appIcon-xufei.png')">
                        </p>
                        <p><el-button size='mini' type="danger">我要访问</el-button></p>
                      </div>
                    </div>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div style="padding-top:5px;">
                    <div class="other">
                      <div>
                        <p>域名设置</p>
                        <p></p>
                        <p>您可以设置外网访问时的流量控制，合理分配网络资源</p>
                        <p>
                          <img :src="require('@/assets/image/icons/appIcons/appIcon-domainsetting.png')">
                        </p>
                        <p><el-button size='mini' type="danger">我要访问</el-button></p>
                      </div>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
import tools from  "@/assets/js/utils/tools.js";
import boxTools from "@/views/boxTools";
import { themeMixin } from '@/assets/js/themeMixin.js'
export default {
  mixins: [themeMixin],
  name:'domainConsole',
  components: {
    boxTools,
  },
  data() {
    return {
      info:{ className:'.domainConsole',name:'domainConsole',icon:'icon-domainConsole' },
      componentTitle:'域名服务管理控制台',
      minWidth:'',
      minHeight:'',
      dataBox:{
        box1:{
          domain:'zhiyou.zhiyouicloud.com:8080',
          status:'正常',
          serviceAs:'2019年12月31',
          ID:123456
        },
      },
    };
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
    this.minWidth = document.querySelector('.domainConsole').offsetWidth;
    this.minHeight = document.querySelector('.domainConsole').offsetHeight;
  },
};
</script>

<style lang='less' scoped>
  .domainConsole {
    min-height: 530px;
    width: 60%;
    position: absolute;
    top: 10%;
    left: 20%;
    border-radius: 4px;
    box-shadow: 0px 0px 50px 10px rgba(0, 0, 0, .3);
    transition: box-shadow 0.5s, transform 0.5s;
    text-align: left;
    background: #fff;
    margin:0px;
    padding: 0px;
  }
  .leftImg {
    height: 530px;
    & img {
      width: 320px;
      position: absolute;
      top: 50%;
      transform: translate(10px,-50%);
    }
  }
  .left {
    float: left;
    width: 350px;
    border: 8px solid #ddd;
  }
  .right{
    margin-left: 358px;
    height: 530px;
    border-top: 8px solid #ddd;
    border-right: 8px solid #ddd;
    border-bottom: 8px solid #ddd;
    font-size:12px;
    padding: 0px 10px 0px 20px;
    & .topBtns {
      text-align: right;
      border-bottom: 1px solid #ddd;
    }
  }
  .main {
    padding-top: 10px;
    & .title {
      & .leftTitle {
        width: 80px;
        float: left;
        text-align: center;
      }
      & .rightTitle {
        margin-left: 80px;
        & p:not(:nth-child(3)) {
          color: #3490de;
          padding-left: 5px;
        }
        & p:nth-child(2){
          & i {
            padding-right: 5px;
          }
        }
        & p:nth-child(3){
          & img {
            width: 20px;
            vertical-align: middle;
          }
          color: #ffd460;
        }
      }
      & .rightMain {
        & .box {
          height: 200px;
          padding: 0px 5px;
          & div {
            height: 100%;
            border: 1px solid #3ec1d3;
            border-radius: 5px;
            & img {
              height: 100px;
            }
            & p {
              padding-left: 20px;
              padding-top: 2px;
            }
          }
        }
        & .other {
          height: 200px;
          & div {
            height: 100%;
            border: 1px solid #3ec1d3;
            border-radius: 5px;
            & p:nth-child(1) {
              text-align: center;
              padding-top: 20px;
              font-weight: 600;
            }
            & p:nth-child(2){
              width: 40px;
              border-top: 4px solid #3ec1d3;
              border-radius:5px;
              margin: 8px auto;
            }
            & p:nth-child(3){
              padding: 0px 5px;
              font-size: 10px;
            }
            & p:nth-child(4){
              text-align: center;
              padding: 10px 0px;
              & img {
                width: 70px;
                height: 50px;
              }
            }
            & p:nth-child(5){
              padding: 0px 10px;
              & .el-button {
                width: 100%;
              }
            }
            
          }
        }
      }
    }
  }
</style>
