<!--
 * @Date: 2019-08-31 18:57:20
 * @LastEditors: Yqoo
 * @LastEditTime: 2019-08-31 19:49:08
 * @Desc: 
 -->
<!-- 桌面：打开文件 -->
<template>
  <div class="file" v-drag :class="themeColorName">
    <boxTools
      class="theme-color moveBox"
      :style="themeColorStyle"
      :info="info"
      @windowsTools="windowsTools"
      :title="componentTitle"
    ></boxTools>
    <div class="filBoxBody">
      <el-tabs
        v-model="editableTabsValue"
        :tab-position="tabPosition"
        type="border-card"
        closable
        @tab-remove="removeTab"
      >
        <el-tab-pane
          v-for="item in editableTabs"
          :key="item.name"
          :label="item.title"
          :name="item.name"
        >
          <iframe :src="item.content" frameborder="0" width="100%" height="100%"></iframe>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import tools from "@/assets/js/utils/tools.js";
import boxTools from "@/views/boxTools";
import topUtil from "@/components/iCloud/topUtil";
import { themeMixin } from "@/assets/js/themeMixin.js";

export default {
  mixins: [themeMixin],
  props:['item'],
  components: {
    boxTools,
    topUtil
  },
  data() {
    return {
      info: { className: ".file", name: "file", icon: "icon-fileCheck" },
      componentTitle: "查看",
      minWidth: "",
      minHeight: "",
      tabPosition: "left",
      editableTabsValue: "1",
      editableTabs: [],
      tabIndex: 1
    };
  },
  created(){
      let flag = true;
      this.editableTabs.forEach((e) => {
          if(e.title === this.item.name){ // 弹框中已有标签（已打开过文件）
              flag = false;
              this.editableTabsValue = e.name;
          }
      });
      if( flag ){ //打开文件
          this.addTab();
      }
  },
  methods: {
    windowsTools(obj) {
      let _s = {
        minSize: param => this.$emit("minSize", param),
        maxSize: param => {
          tools._maxSize(document.querySelector(param));
        },
        restore: param =>
          tools._restore(
            document.querySelector(param),
            this.minHeight,
            this.minWidth
          ),
        closeItem: param => this.$emit("closeItem", param)
      };
      _s[obj.type](obj.param);
    },
    addTab() { //增加一个新的标签
      let newTabName = ++this.tabIndex + "";
      this.editableTabs.push({
        title: this.item.name,
        name: newTabName,
        content: 'static/online.html?name='+encodeURI(this.item.name)+'&type='+this.item.type,
      });
      this.editableTabsValue = newTabName;
    },
    removeTab(targetName) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }
      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter(tab => tab.name !== targetName);
    }
  },
  mounted() {
    this.minWidth = document.querySelector(".file").offsetWidth;
    this.minHeight = document.querySelector(".file").offsetHeight;
  }
};
</script>
<style lang='less' scoped>
.file {
  height: 80%;
  width: 90%;
  position: absolute;
  top: 10%;
  left: 5%;
  border-radius: 4px;
  box-shadow: 0px 0px 50px 10px rgba(0, 0, 0, 0.3);
  transition: box-shadow 0.5s, transform 0.5s;
  text-align: left;
  background: #fff;
  margin: 0px;
  padding: 0px;
  & .filBoxBody {
    height: calc(100% - 35px);
    box-sizing: border-box;
    //   border: 10px solid #c5c5c5;
    border-radius: 0 0 5px 5px;
  }
}
.el-tabs {
  height: 100%;
  & /deep/.el-tabs__header.is-left {
    width: 10%;
  }
  & /deep/ .el-tabs__content {
    height: 100%;
    & .el-tab-pane {
      height: 97%;
    }
  }
}
</style>