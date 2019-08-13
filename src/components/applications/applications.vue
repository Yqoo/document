<!--
 * @Date: 2019-08-10 10:53:31
 * @LastEditors: Yqoo
 * @LastEditTime: 2019-08-13 10:31:57
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
                    <el-popover trigger="click" placement="bottom" width="100" @show="expandMenus = false" @hide="expandMenus = true">
                      <ul class="itemMenus">
                        <li v-for="(item,key) in menus" :key="key">
                          <i :class="item.icon" :style="item.color"></i>
                          <span>{{item.title}}</span>
                        </li>
                      </ul>
                      <i v-if="expandMenus" class="el-icon-caret-bottom" slot="reference" style="font-size:14px;" title="工具栏"></i>
                      <i v-else class="el-icon-caret-top" slot="reference" style="font-size:14px;" title="工具栏"></i>
                    </el-popover>
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
      expandMenus:true,
      menus:[//每项子菜单
        { name:'install',title:'安装程序',icon:"el-icon-connection",color:{ color:'#eb7070' } },
        { name:'buy',title:'购买授权',icon:"el-icon-shopping-cart-2",color:{ color:'#35b0ab'} },
        { name:'setting',title:'系统设置',icon:"el-icon-setting",color:{ color:'#4f81c7'} },
        { name:'console',title:'管理控制台',icon:"el-icon-s-marketing",color:{ color:'#589167'} },
        { name:'disabled',title:'禁用',icon:"el-icon-turn-off",color:{ color:'#216583'} },
        { name:'uninstall',title:'卸载程序',icon:"el-icon-sold-out",color:{ color:'#e15249'} },
      ],
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
    padding:0px 3px;
    & li {
      height: 150px;
      width: 120px;
      border: 1px solid #ddd;
      border-radius: 5px;
      background:linear-gradient(#ecfcff,#fff);
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
  .itemMenus {
    padding: 5px 0px;
    & li {
      padding: 5px 0px 5px 10px;
    }
    & li:hover {
      background: #64c4ed;
      color: #fff;
      cursor: pointer;
    }
    & i {
      font-size: 14px;
    }
    & span {
      font-size: 12px;
      padding-left: 8px;
    }
  }
</style>