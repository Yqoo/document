<!--
 * @Date: 2019-08-10 10:53:31
 * @LastEditors: Yqoo
 * @LastEditTime: 2019-08-21 15:31:42
 * @desc: 程序应用组件
 -->
<template>
  <div class='applications'>
    <div class="title">
      <i class="el-icon-menu"></i>
      <span>程序应用</span>
    </div>
    <div class="applications-main">
      <el-row>
        <el-col :span="2">
          <div class="classify">
            <i class="el-icon-s-goods"></i>
            <span>应用中心</span>
          </div>
        </el-col>
        <el-col :span="22">
          <el-tabs v-model="active">
            <el-tab-pane label="云商城" name="mall"></el-tab-pane>
            <el-tab-pane label="已下载" name="downloaded"></el-tab-pane>
            <el-tab-pane label="已安装" name="installed"></el-tab-pane>
            <el-tab-pane label="已授权" name="authorized"></el-tab-pane>
            <el-tab-pane label="可更新" name="renewable"></el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2" >
          <div class="classify">
            <i class="el-icon-s-grid"></i>
            <span>应用分类</span>
          </div>
        </el-col>
        <el-col :span="22">
          <el-tabs v-model="active2">
            <el-tab-pane label="所有" name="all"></el-tab-pane>
            <el-tab-pane label="云存储" name="cloudStorage"></el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
      <div class="appDiv">
        <ul class="appList">
          <li v-for="(item,index) in items" :key="index">
            <el-badge value='已启用' type="primary">
              <div class="appImg">
                <img :src="item.img">
              </div>
            </el-badge>
            <div class="appName">{{item.title}}</div>
            <div class="appSetting">
              <div class="btnBox">
                <div>
                  <i class="el-icon-setting"></i>
                  <span>配置程序</span>
                </div>
                <div>
                  <el-popover trigger="click" placement="bottom" width="100">
                    <ul class="itemMenus">
                      <li v-for="(val,index) in item.children" :key="index" @click="handle(menus[val].name)">
                        <i :class="menus[val].icon" :style="menus[val].color"></i>
                        <span>{{menus[val].title}}</span>
                      </li>
                    </ul>
                    <i class="el-icon-caret-bottom" slot="reference" style="font-size:14px;" title="工具栏"></i>
                  </el-popover>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'applications',
  components: {},
  data() {
    return {
      active: "",
      active2: '',
      items:[//商品列表
        { name:'iCloud',title:'挚友iCloud',img:require('@/assets/image/icons/deskIcons/icon-ad.png'),children:[0,1,2,3,4,5,6,7] },
        { name:'domain',title:'域名服务',img:require('@/assets/image/icons/appIcons/appIcon-domain.png'),children:[8] },
      ],
      menus:[//每项子菜单 利用items中的children下标匹配
        { name:'download',title:'下载程序',icon:"el-icon-download",color:{ color:'#9896f1' } },
        { name:'install',title:'安装程序',icon:"el-icon-connection",color:{ color:'#eb7070' } },
        { name:'renewable',title:'更新程序',icon:"el-icon-refresh-right",color:{ color:'#edb1f1' } },
        { name:'buy',title:'购买授权',icon:"el-icon-shopping-cart-2",color:{ color:'#35b0ab'} },
        { name:'setting',title:'系统设置',icon:"el-icon-setting",color:{ color:'#4f81c7'} },
        { name:'console',title:'管理控制台',icon:"el-icon-s-marketing",color:{ color:'#589167'} },
        { name:'disabled',title:'禁用',icon:"el-icon-turn-off",color:{ color:'#216583'} },
        { name:'uninstall',title:'卸载程序',icon:"el-icon-sold-out",color:{ color:'#e15249'} },
        { name:'domain',title:'域名服务',icon:"el-icon-location-outline",color:{ color:'#384259'} },
      ],
      handleMenus:{//定义子菜单的方法集合
        console:() => { this.$emit('childHandle',{ component:'iCloudConsole',open:true})},
        domain:() => { this.$emit('childHandle',{ component:'domainConsole',open:true})},
      },
    };
  },
  methods:{
    handle( name ){
      try {
        this.handleMenus[name]();
      } catch (error) {
        this.$message.error('系统错误，请联系管理员')
      }
    }
  },
}
</script>
<style lang='less' scoped>
  .applications{
    padding: 20px;
    height: 60%;
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
    padding:5px 3px;
    display:flex;
    flex-flow:row wrap;
    & li {
      height: 150px;
      width: 120px;
      border: 1px solid #ddd;
      border-radius: 5px;
      background:linear-gradient(#ecfcff,#fff);
      text-align:center;
      margin: 10px 15px;
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
  .classify {
    height: 38px;
    line-height: 38px;
    border-bottom: 2px solid #ddd;
    & span {
      padding-left: 3px;
    }
  } 
</style>