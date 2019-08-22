<!--
 * @Date: 2019-08-22 11:24:56
 * @LastEditors: Yqoo
 * @LastEditTime: 2019-08-22 15:23:45
 * @Desc:手机短信服务控制台 
 -->
 <template>
  <div class="note" v-drag :class="themeColorName">
    <boxTools class="theme-color moveBox" :style="themeColorStyle" :info="info" @windowsTools="windowsTools" :title="componentTitle"></boxTools>
    <div class="noteMain fadeIn animated">
      <div class="left">
        <div>
          <img :src="require('@/assets/image/icons/appIcons/appIcon-bigPhone.png')">
        </div>
      </div>
      <div class="right">
        <div class="topBtns">
          <el-button type='text' icon="el-icon-user">注册</el-button>
          <el-button type='text' icon="el-icon-switch-button">注销</el-button>
        </div>
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
        </div>
        <div class="box-1">
          <div class="div1">
            <span>今日发送</span>
            <span>短信发送统计有延迟，如有即时误差，请10分钟后查看</span>
          </div>
          <div>
            <ul class="ulbox">
              <li v-for="(item,index) in box1" :key="index">
                <p>{{item.num}}</p>
                <p>{{item.desc}} <span v-if="item.point">({{item.point}})</span>  </p>
              </li>
            </ul>
          </div>
        </div>
        <div class="box-2">
          <ul>
            <li>
              <p>通知短信</p>
              <p></p>
              <p>
                <span>通过API的形式，将验证码或者通知短信准确发至用户</span>
                <span>余额：1234条</span>
              </p>
              <div>
                <img :src="require('@/assets/image/icons/appIcons/appIcon-duanxin.png')">
              </div>
              <div>
                <el-button size="mini" type="danger">进入应用</el-button>
              </div>
            </li>
            <li>
              <p>智能语音</p>
              <p></p>
              <p>
                <span>通过API语音的形式，拨打电话告知用户验证码，实现信息验证</span>
              </p>
              <div>
                <img :src="require('@/assets/image/icons/appIcons/appIcon-yuyin.png')">
              </div>
              <div>
                <el-button size="mini" type="danger">进入应用</el-button>
              </div>
            </li>
            <li>
              <p>充值中心</p>
              <p></p>
              <p>
                <span>您可以自助续费，以便我们更好的为您服务！</span>
              </p>
              <div>
                <img :src="require('@/assets/image/icons/appIcons/appIcon-chongzhi.png')">
              </div>
              <div>
                <el-button size="mini" type="danger">我要续费</el-button>
              </div>
            </li>
          </ul>
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
  name: 'note',
  components: {
    boxTools
  },
  data() {
    return {
      info:{ className:'.note',name:'note',icon:'icon-note' },
      componentTitle:'手机短信管理控制台',
      minWidth:'',
      minHeight:'',
      box1:[
        { desc:'发送总数',num:12 },
        { desc:'成功数',num:12,point:'10%' },
        { desc:'失败数',num:22,point:'40%' },
      ],
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
    this.minWidth = document.querySelector('.note').offsetWidth;
    this.minHeight = document.querySelector('.note').offsetHeight;
  },
};
</script>
<style lang='less' scoped>
  .note {
    min-height: 500px;
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
    & .noteMain {
      font-size: 12px;
      & .left{
        width: 250px;
        float: left;
        text-align: center;
        & div {
          position: absolute;
          top: 50%;
          transform: translate(10px,-50%);
        }
      }
      & .right{
        margin-left: 250px;
        padding-right: 20px;
        & .topBtns {
          text-align: right;
          border-bottom: 1px solid #ddd;
          padding: 0px 20px 0px 0px;
        }
        & .title {
          padding: 10px 0px;
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
        }
        & .box-1 {
          border: 1px solid #ddd;
          border-radius: 4px;
          & div:nth-child(1){
            height: 30px;
            line-height: 30px;
            border-bottom: 1px solid #ddd;
            padding: 0px 20px;
            & span:nth-child(1){
              font-weight: 600;
              padding-right: 20px;
            }
            & span:nth-child(2){
              font-size: 10px;
              color:#e84545;
            }
          }
          & .ulbox {
            display: flex;
            flex-flow: row wrap;
            padding: 10px 0px;
            & li {
              height: 80px;
              width: 33%;
              text-align: center;
              & p:nth-child(1){
                font-size: 30px;
              }
              & p:nth-child(2){
                font-size: 10px;
              }
              & span {
                color:#e84545;
              }
            }
            & li:not(:nth-child(3)){
              border-right: 1px solid #ddd;
            }
          }
        }
        & .box-2 {
          border: 1px solid #ddd;
          margin-top: 10px;
          border-radius: 4px;
          & ul {
            display: flex;
            flex-flow: row wrap;
            & li {
              min-height: 180px;
              width: 33%;
              text-align: center;
              & p:nth-child(1){
                padding-top: 10px;
                font-size: 14px;
                font-weight: 600;
              }
              & p:nth-child(2){
                border-top: 3px solid #ddd;
                width: 40px;
                margin: 5px auto;
              }
              & p:nth-child(3){
                padding: 0px 20px;
                text-align: left;
                & span:nth-child(2){
                  padding-left: 20px;
                  color: #e84545;
                }
              }
              & div{
                padding: 0px 20px;
                & img {
                  width: 50px;
                  padding: 5px 0px;
                }
                
                & .el-button {
                  width: 100%;
                }
              }
            }
            & li:not(:nth-child(3)){
              border-right: 1px solid #ddd;
            }
          }
        }
      }
    }
  }
</style>