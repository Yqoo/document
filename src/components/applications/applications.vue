<!--
 * @Date: 2019-08-10 10:53:31
 * @LastEditors: Yqoo
 * @LastEditTime: 2019-08-10 16:37:26
 * @desc: 程序应用组件
 -->
<template>
  <div class='applications'>
    <div class="title">
      <i class="el-icon-menu"></i>
      <span>程序应用</span>
    </div>
    <div class="applications-main">
      <el-tabs v-model="active">
        <el-tab-pane label="所有" name="all">
          <ul class="appList">
            <li>
              <div class="appImg">
                <img :src="require('@/assets/image/icons/deskIcons/icon-ad.png')" alt="">
              </div>
              <div class="appName">挚友ICloud</div>
              <div class="appSetting">
                <div class="btnBox">
                  <div>
                    <i class="el-icon-setting"></i>
                    <span>配置程序</span>
                  </div>
                  <div>
                    <i class="el-icon-caret-bottom"></i>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </el-tab-pane>
        <el-tab-pane label="已启用" name="enabled">已启用</el-tab-pane>
        <el-tab-pane label="未启用" name="disabled">未启用</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>

export default {
  name: 'applications',
  components: {},
  data() {
    return {
      active: "all",//默认展示所有
    };
  },
}
</script>
<style lang='less' scoped>
  .applications{
    height: 550px;
    overflow-y:auto;
    overflow-x: hidden; 
    & .title {
      border-bottom: 1px solid #ddd;
      & i {
        vertical-align: middle;
      }
      &  span {
        font-size: 12px;
        padding-left: 10px;
      }
    }
    & .applications-main {
      font-size: 12px;
    }
  }
  .appList {
    & li {
      height: 150px;
      width: 120px;
      border: 1px solid #ddd;
      text-align:center;
      & img {
        width: 80px;
      }
      & .appName {
        font-size: 12px;
      }
      & .appSetting {
        padding: 0px 10px;
        margin-top: 10px;
        & .btnBox {
          background: linear-gradient(#eee,#ddd);
          border: 1px solid #ddd;
          border-radius: 5px;
          display: flex;
          justify-content: space-around;
          height: 25px;
          line-height: 25px;
          & div:nth-child(2){
            border-left: 1px solid rgb(172, 166, 166);
            padding-left: 3px;
            cursor: pointer;
          }
        }
      }
    }
  }
</style>