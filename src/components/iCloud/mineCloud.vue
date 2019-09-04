<!-- 我的云端： 挚友云&&我的云端 -->
<template>
  <div class="mineCloud">
    <el-collapse v-model="activeNames">
      <div
        @click="clickBlock({e: $event, clickTag: 'zhiyou', list:blankRightZy,dataArr:zyCloud})"
        @contextmenu.prevent="showRightMenu({e:$event,clickTag: 'zhiyou',dataArr:zyCloud,list:blankRightZy})"
      >
        <el-collapse-item name="1" :disabled="true">
          <template slot="title">
            <img src="@/assets/image/icons/deskIcons/icon-myCloud.png" />挚友云
          </template>
          <div class="cards slideInRight animated" :class="displayName==='行展示'?'row':'col'">
            <el-card
              v-for="(c,index) in zyCloud"
              :class="_isClick.mineCloud.zhiyou&&c.active?'addBorder':''"
              :key="index"
              shadow="hover"
            >
              <div
                @click.stop="activeCard({e:$event,item:c,i:index,clickTag: 'zhiyou',dataArr:zyCloud})"
                @contextmenu.stop.prevent="fileRightMenu({e:$event,item:c,dataArr:zyCloud,clickTag: 'zhiyou'})"
                @dblclick.stop="openFolder({component:c.component,name:c.name})"
                :title="c.name"
              >
                <img :src="c.imgurl" :style="displayName==='行展示'&&size" />
                <div class="bottom">{{c.name}}</div>
                <img :src="c.icon" class="fileIcon" />
              </div>
            </el-card>
          </div>
        </el-collapse-item>
      </div>
      <div
        @click="clickBlock({e:$event,clickTag:'mine', list: blankRightMine,dataArr:myCloud})"
        @contextmenu.prevent="showRightMenu({e:$event,clickTag: 'mine',dataArr:myCloud,list:blankRightMine})"
      >
        <space-progress :avaliableSpace="avaliableSpace" :totalSpace="totalSpace"></space-progress>
        <el-collapse-item name="2" :disabled="true">
          <template slot="title">
            <img src="@/assets/image/icons/deskIcons/icon-computer.png" />我的云端
          </template>
          <div class="cards slideInLeft animated" :class="displayName==='行展示'?'row':'col'">
            <el-card
              v-for="(c,index) in myCloud"
              :class="_isClick.mineCloud.mine&&c.active?'addBorder':''"
              :key="index"
              shadow="hover"
            >
              <div
                @click.stop="activeCard({e:$event,item:c,i:index,clickTag:'mine',dataArr:myCloud})"
                @contextmenu.stop.prevent="fileRightMenu({e:$event,item:c,dataArr:myCloud,clickTag:'mine'})"
                @dblclick.stop="openFolder({component:c.component,name:c.name})"
                :title="c.name"
              >
                <img :src="c.imgurl" :style="displayName==='行展示'&&size" />
                <div class="bottom1">{{c.name}}</div>
              </div>
            </el-card>
          </div>
        </el-collapse-item>
      </div>
    </el-collapse>
    <el-dialog
      v-dialogDrag
      :visible.sync="dialogVisible"
      :append-to-body="true"
      :close-on-click-modal="false"
      width="40%">
      <div slot="title" class="messageBox-title">
        <img :src="require('@/assets/image/icons/fileIcons/partition.png')" />
        <span>创建分区</span>
      </div>
      <el-form
        :model="createForm"
        :rules="createRules"
        ref="createForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="分区名称:" prop="partitionName">
          <el-input v-model="createForm.partitionName"></el-input>
        </el-form-item>
        <el-form-item label="分区盘符:" prop="disk">
          <el-select v-model="createForm.disk">
            <el-option label="E:" value="E:"></el-option>
            <el-option label="F:" value="F:"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数据中心:" prop="data">
          <el-input v-model="createForm.data"></el-input>
        </el-form-item>
        <el-form-item label="创建人:">
          <span>{{creater}}</span>
        </el-form-item>
        <el-form-item label="创建时间:">
          <span>{{createTime}}</span>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm('createForm')">取 消</el-button>
        <el-button type="primary" @click="submitCreateFrom('createForm')">确 定</el-button>
      </span>
    </el-dialog>
    <capacity
      v-if="capacityVisible&&(capacityData.clickTag==='zhiyou'||capacityData.clickTag==='mine')"
      :capacityVisible="capacityVisible"
      :info="capacityData"
      @closeCapacityForm="closeCapacityForm"
    ></capacity>
  </div>
</template>

<script>
import { myCloudMixin } from "@/assets/js/myCloudMixin.js";
import { myCloudUtilMixin } from "@/assets/js/myCloudUtilMixins.js";
import SpaceProgress from "@/views/spaceProgress.vue";
import capacity from "@/components/iCloud/capacity.vue";
import { constants } from "crypto";
import rightMenu from "@/components/iCloud/rightMenu.vue";
import { debuglog } from "util";
const zhiyou = {
  fileRight: [],
  privateSpaceRight: [
    {
      iconImg: require("@/assets/image/icons/fileIcons/fileO.png"),
      iconTitle: "文件操作",
      isRightBorder: false,
      flag: false,
      children: [
        {
          iconImg: require("@/assets/image/icons/fileIcons/dailyO.png"),
          iconTitle: "日常操作",
          children: [
            {
              iconImg: require("@/assets/image/icons/fileIcons/cut.png"),
              iconTitle: "剪切",
              tip: "Ctrl+x"
            },
            {
              iconImg: require("@/assets/image/icons/fileIcons/copy.png"),
              iconTitle: "复制",
              tip: "Ctrl+c"
            },
            {
              iconImg: require("@/assets/image/icons/fileIcons/paste.png"),
              iconTitle: "粘贴",
              tip: "Ctrl+v"
            },
            {
              iconImg: require("@/assets/image/icons/fileIcons/rename.png"),
              iconTitle: "重命名",
              tip: "F2"
            },
            {
              iconImg: require("@/assets/image/icons/fileIcons/pardelete.png"),
              iconTitle: "删除",
              tip: "del"
            }
          ]
        },
        {
          iconImg: require("@/assets/image/icons/fileIcons/check.png"),
          iconTitle: "在线操作",
          children: [
            {
              iconImg: require("@/assets/image/icons/fileIcons/preview.png"),
              iconTitle: "在线预览"
            },
            {
              iconImg: require("@/assets/image/icons/fileIcons/edit.png"),
              iconTitle: "在线编辑"
            },
            {
              iconImg: require("@/assets/image/icons/fileIcons/coordination.png"),
              iconTitle: "协同编辑"
            },
            {
              iconImg: require("@/assets/image/icons/fileIcons/compress.png"),
              iconTitle: "在线压缩"
            },
            {
              iconImg: require("@/assets/image/icons/fileIcons/decompression.png"),
              iconTitle: "在线解压"
            },
            {
              iconImg: require("@/assets/image/icons/fileIcons/encryption.png"),
              iconTitle: "文件加密"
            },
            {
              iconImg: require("@/assets/image/icons/fileIcons/dsi.png"),
              iconTitle: "文件解密"
            }
          ]
        }
      ]
    },
    {
      iconImg: require("@/assets/image/icons/fileIcons/recycle.png"),
      iconTitle: "回收站",
      isRightBorder: true
    },
    {
      iconImg: require("@/assets/image/icons/fileIcons/setpwd.png"),
      iconTitle: "设置密码",
      isRightBorder: false
    },
    {
      iconImg: require("@/assets/image/icons/fileIcons/forgetpwd.png"),
      iconTitle: "忘记密码",
      isRightBorder: true
    },
    {
      iconImg: require("@/assets/image/icons/fileIcons/check.png"),
      iconTitle: "查看",
      isRightBorder: false,
      flag: false,
      children: [
        {
          iconImg: require("@/assets/image/icons/fileIcons/little.png"),
          iconTitle: "小图标"
        },
        {
          iconImg: require("@/assets/image/icons/fileIcons/middle.png"),
          iconTitle: "中图标"
        },
        {
          iconImg: require("@/assets/image/icons/fileIcons/big.png"),
          iconTitle: "大图标"
        }
      ]
    },
    {
      iconImg: require("@/assets/image/icons/fileIcons/array.png"),
      iconTitle: "排列",
      isRightBorder: true,
      flag: false,
      children: [
        {
          iconImg: require("@/assets/image/icons/fileIcons/row.png"),
          iconTitle: "行展示"
        },
        {
          iconImg: require("@/assets/image/icons/fileIcons/col.png"),
          iconTitle: "列展示"
        }
      ]
    },
    {
      iconImg: require("@/assets/image/icons/fileIcons/sendmsg.png"),
      iconTitle: "发送",
      isRightBorder: true,
      flag: false,
      children: [
        {
          iconImg: require("@/assets/image/icons/fileIcons/desk.png"),
          iconTitle: "发送桌面"
        },
        {
          iconImg: require("@/assets/image/icons/fileIcons/msg.png"),
          iconTitle: "即时通讯"
        },
        {
          iconImg: require("@/assets/image/icons/fileIcons/mail.png"),
          iconTitle: "发送邮件"
        },
        {
          iconImg: require("@/assets/image/icons/fileIcons/phone.png"),
          iconTitle: "发送短信"
        },
        {
          iconImg: require("@/assets/image/icons/fileIcons/message.png"),
          iconTitle: "发送消息"
        }
      ]
    },
    {
      iconImg: require("@/assets/image/icons/fileIcons/refresh.png"),
      iconTitle: "刷新",
      isRightBorder: false
    },
    {
      iconImg: require("@/assets/image/icons/fileIcons/help.png"),
      iconTitle: "帮助",
      isRightBorder: false
    }
  ],
  backupsRight: [
    {
      iconImg: require("@/assets/image/icons/fileIcons/fileO.png"),
      iconTitle: "文件操作",
      isRightBorder: false,
      flag: false,
      children: [
        {
          iconImg: require("@/assets/image/icons/fileIcons/dailyO.png"),
          iconTitle: "日常操作",
          children: [
            {
              iconImg: require("@/assets/image/icons/fileIcons/cut.png"),
              iconTitle: "剪切",
              tip: "Ctrl+x"
            },
            {
              iconImg: require("@/assets/image/icons/fileIcons/copy.png"),
              iconTitle: "复制",
              tip: "Ctrl+c"
            },
            {
              iconImg: require("@/assets/image/icons/fileIcons/paste.png"),
              iconTitle: "粘贴",
              tip: "Ctrl+v"
            },
            {
              iconImg: require("@/assets/image/icons/fileIcons/rename.png"),
              iconTitle: "重命名",
              tip: "F2"
            },
            {
              iconImg: require("@/assets/image/icons/fileIcons/pardelete.png"),
              iconTitle: "删除",
              tip: "del"
            }
          ]
        },
        {
          iconImg: require("@/assets/image/icons/fileIcons/check.png"),
          iconTitle: "在线操作",
          children: [
            {
              iconImg: require("@/assets/image/icons/fileIcons/preview.png"),
              iconTitle: "在线预览"
            },
            {
              iconImg: require("@/assets/image/icons/fileIcons/edit.png"),
              iconTitle: "在线编辑"
            },
            {
              iconImg: require("@/assets/image/icons/fileIcons/coordination.png"),
              iconTitle: "协同编辑"
            },
            {
              iconImg: require("@/assets/image/icons/fileIcons/compress.png"),
              iconTitle: "在线压缩"
            },
            {
              iconImg: require("@/assets/image/icons/fileIcons/decompression.png"),
              iconTitle: "在线解压"
            },
            {
              iconImg: require("@/assets/image/icons/fileIcons/encryption.png"),
              iconTitle: "文件加密"
            },
            {
              iconImg: require("@/assets/image/icons/fileIcons/dsi.png"),
              iconTitle: "文件解密"
            }
          ]
        }
      ]
    },
    {
      iconImg: require("@/assets/image/icons/fileIcons/recycle.png"),
      iconTitle: "回收站",
      isRightBorder: true
    },
    {
      iconImg: require("@/assets/image/icons/fileIcons/backups.png"),
      iconTitle: "备份规则",
      isRightBorder: false
    },
    {
      iconImg: require("@/assets/image/icons/fileIcons/check.png"),
      iconTitle: "查看",
      isRightBorder: false,
      flag: false,
      children: [
        {
          iconImg: require("@/assets/image/icons/fileIcons/little.png"),
          iconTitle: "小图标"
        },
        {
          iconImg: require("@/assets/image/icons/fileIcons/middle.png"),
          iconTitle: "中图标"
        },
        {
          iconImg: require("@/assets/image/icons/fileIcons/big.png"),
          iconTitle: "大图标"
        }
      ]
    },
    {
      iconImg: require("@/assets/image/icons/fileIcons/array.png"),
      iconTitle: "排列",
      isRightBorder: true,
      flag: false,
      children: [
        {
          iconImg: require("@/assets/image/icons/fileIcons/row.png"),
          iconTitle: "行展示"
        },
        {
          iconImg: require("@/assets/image/icons/fileIcons/col.png"),
          iconTitle: "列展示"
        }
      ]
    },
    {
      iconImg: require("@/assets/image/icons/fileIcons/sendmsg.png"),
      iconTitle: "发送",
      isRightBorder: true,
      flag: false,
      children: [
        {
          iconImg: require("@/assets/image/icons/fileIcons/desk.png"),
          iconTitle: "发送桌面"
        },
        {
          iconImg: require("@/assets/image/icons/fileIcons/msg.png"),
          iconTitle: "即时通讯"
        },
        {
          iconImg: require("@/assets/image/icons/fileIcons/mail.png"),
          iconTitle: "发送邮件"
        },
        {
          iconImg: require("@/assets/image/icons/fileIcons/phone.png"),
          iconTitle: "发送短信"
        },
        {
          iconImg: require("@/assets/image/icons/fileIcons/message.png"),
          iconTitle: "发送消息"
        }
      ]
    },
    {
      iconImg: require("@/assets/image/icons/fileIcons/refresh.png"),
      iconTitle: "刷新",
      isRightBorder: false
    },
    {
      iconImg: require("@/assets/image/icons/fileIcons/help.png"),
      iconTitle: "帮助",
      isRightBorder: false
    }
  ],
  folderRight: [
    {
      iconImg: require("@/assets/image/icons/fileIcons/fileO.png"),
      iconTitle: "文件操作",
      isRightBorder: false,
      flag: false,
      children: [
        {
          iconImg: require("@/assets/image/icons/fileIcons/dailyO.png"),
          iconTitle: "日常操作",
          children: [
            {
              iconImg: require("@/assets/image/icons/fileIcons/cut.png"),
              iconTitle: "剪切",
              tip: "Ctrl+x"
            },
            {
              iconImg: require("@/assets/image/icons/fileIcons/copy.png"),
              iconTitle: "复制",
              tip: "Ctrl+c"
            },
            {
              iconImg: require("@/assets/image/icons/fileIcons/paste.png"),
              iconTitle: "粘贴",
              tip: "Ctrl+v"
            },
            {
              iconImg: require("@/assets/image/icons/fileIcons/rename.png"),
              iconTitle: "重命名",
              tip: "F2"
            },
            {
              iconImg: require("@/assets/image/icons/fileIcons/pardelete.png"),
              iconTitle: "删除",
              tip: "del"
            }
          ]
        },
        {
          iconImg: require("@/assets/image/icons/fileIcons/check.png"),
          iconTitle: "在线操作",
          children: [
            {
              iconImg: require("@/assets/image/icons/fileIcons/preview.png"),
              iconTitle: "在线预览"
            },
            {
              iconImg: require("@/assets/image/icons/fileIcons/edit.png"),
              iconTitle: "在线编辑"
            },
            {
              iconImg: require("@/assets/image/icons/fileIcons/coordination.png"),
              iconTitle: "协同编辑"
            },
            {
              iconImg: require("@/assets/image/icons/fileIcons/compress.png"),
              iconTitle: "在线压缩"
            },
            {
              iconImg: require("@/assets/image/icons/fileIcons/decompression.png"),
              iconTitle: "在线解压"
            },
            {
              iconImg: require("@/assets/image/icons/fileIcons/encryption.png"),
              iconTitle: "文件加密"
            },
            {
              iconImg: require("@/assets/image/icons/fileIcons/dsi.png"),
              iconTitle: "文件解密"
            }
          ]
        }
      ]
    },
    {
      iconImg: require("@/assets/image/icons/fileIcons/recycle.png"),
      iconTitle: "回收站",
      isRightBorder: true
    },
    {
      iconImg: require("@/assets/image/icons/fileIcons/check.png"),
      iconTitle: "查看",
      isRightBorder: false,
      flag: false,
      children: [
        {
          iconImg: require("@/assets/image/icons/fileIcons/little.png"),
          iconTitle: "小图标"
        },
        {
          iconImg: require("@/assets/image/icons/fileIcons/middle.png"),
          iconTitle: "中图标"
        },
        {
          iconImg: require("@/assets/image/icons/fileIcons/big.png"),
          iconTitle: "大图标"
        }
      ]
    },
    {
      iconImg: require("@/assets/image/icons/fileIcons/array.png"),
      iconTitle: "排列",
      isRightBorder: true,
      flag: false,
      children: [
        {
          iconImg: require("@/assets/image/icons/fileIcons/row.png"),
          iconTitle: "行展示"
        },
        {
          iconImg: require("@/assets/image/icons/fileIcons/col.png"),
          iconTitle: "列展示"
        }
      ]
    },
    {
      iconImg: require("@/assets/image/icons/fileIcons/sendmsg.png"),
      iconTitle: "发送",
      isRightBorder: true,
      flag: false,
      children: [
        {
          iconImg: require("@/assets/image/icons/fileIcons/desk.png"),
          iconTitle: "发送桌面"
        },
        {
          iconImg: require("@/assets/image/icons/fileIcons/msg.png"),
          iconTitle: "即时通讯"
        },
        {
          iconImg: require("@/assets/image/icons/fileIcons/mail.png"),
          iconTitle: "发送邮件"
        },
        {
          iconImg: require("@/assets/image/icons/fileIcons/phone.png"),
          iconTitle: "发送短信"
        },
        {
          iconImg: require("@/assets/image/icons/fileIcons/message.png"),
          iconTitle: "发送消息"
        }
      ]
    },
    {
      iconImg: require("@/assets/image/icons/fileIcons/refresh.png"),
      iconTitle: "刷新",
      isRightBorder: false
    },
    {
      iconImg: require("@/assets/image/icons/fileIcons/help.png"),
      iconTitle: "帮助",
      isRightBorder: false
    }
  ],
  blankRight: [
    {
      iconImg: require("@/assets/image/icons/fileIcons/recycle.png"),
      iconTitle: "回收站",
      isRightBorder: true
    },
    {
      iconImg: require("@/assets/image/icons/fileIcons/addC.png"),
      iconTitle: "申请增容",
      isRightBorder: false
    },
    {
      iconImg: require("@/assets/image/icons/fileIcons/reduceC.png"),
      iconTitle: "申请减容",
      isRightBorder: true
    },
    {
      iconImg: require("@/assets/image/icons/fileIcons/check.png"),
      iconTitle: "查看",
      isRightBorder: false,
      flag: false,
      children: [
        {
          iconImg: require("@/assets/image/icons/fileIcons/little.png"),
          iconTitle: "小图标"
        },
        {
          iconImg: require("@/assets/image/icons/fileIcons/middle.png"),
          iconTitle: "中图标"
        },
        {
          iconImg: require("@/assets/image/icons/fileIcons/big.png"),
          iconTitle: "大图标"
        }
      ]
    },
    {
      iconImg: require("@/assets/image/icons/fileIcons/array.png"),
      iconTitle: "排列",
      isRightBorder: true,
      flag: false,
      children: [
        {
          iconImg: require("@/assets/image/icons/fileIcons/row.png"),
          iconTitle: "行展示"
        },
        {
          iconImg: require("@/assets/image/icons/fileIcons/col.png"),
          iconTitle: "列展示"
        }
      ]
    },
    {
      iconImg: require("@/assets/image/icons/fileIcons/sendmsg.png"),
      iconTitle: "发送",
      isRightBorder: true,
      flag: false,
      children: [
        {
          iconImg: require("@/assets/image/icons/fileIcons/desk.png"),
          iconTitle: "发送桌面"
        },
        {
          iconImg: require("@/assets/image/icons/fileIcons/msg.png"),
          iconTitle: "即时通讯"
        },
        {
          iconImg: require("@/assets/image/icons/fileIcons/mail.png"),
          iconTitle: "发送邮件"
        },
        {
          iconImg: require("@/assets/image/icons/fileIcons/phone.png"),
          iconTitle: "发送短信"
        },
        {
          iconImg: require("@/assets/image/icons/fileIcons/message.png"),
          iconTitle: "发送消息"
        }
      ]
    },
    {
      iconImg: require("@/assets/image/icons/fileIcons/refresh.png"),
      iconTitle: "刷新",
      isRightBorder: false
    },
    {
      iconImg: require("@/assets/image/icons/fileIcons/help.png"),
      iconTitle: "帮助",
      isRightBorder: false
    }
  ],
  data: [
    {
      name: "我的桌面",
      component: "fileContent",
      type: "folder",
      imgurl: require("@/assets/image/icons/deskIcons/desk.png"),
      icon: "",
      active: false
    },
    {
      name: "我的文档",
      component: "fileContent",
      type: "folder",
      imgurl: require("@/assets/image/icons/deskIcons/tree-folder.png"),
      icon: "",
      active: false
    },
    {
      name: "私密空间",
      component: "fileContent",
      type: "private",
      imgurl: require("@/assets/image/icons/deskIcons/tree-folder.png"),
      icon: require("@/assets/image/icons/fileIcons/dsi.png"),
      active: false
    },
    {
      name: "我的共享",
      component: "shareContent",
      type: "folder",
      imgurl: require("@/assets/image/icons/deskIcons/tree-folder.png"),
      icon: require("@/assets/image/icons/fileIcons/user.png"),
      active: false
    },
    {
      name: "接收共享",
      component: "shareContent",
      type: "folder",
      imgurl: require("@/assets/image/icons/deskIcons/tree-folder.png"),
      icon: require("@/assets/image/icons/fileIcons/person.png"),
      active: false
    },
    {
      name: "我的分享",
      component: "shareContent",
      type: "folder",
      imgurl: require("@/assets/image/icons/deskIcons/tree-folder.png"),
      icon: require("@/assets/image/icons/fileIcons/myshare.png"),
      active: false
    },
    {
      name: "接收分享",
      component: "shareContent",
      type: "folder",
      imgurl: require("@/assets/image/icons/deskIcons/tree-folder.png"),
      icon: require("@/assets/image/icons/fileIcons/recept.png"),
      active: false
    },
    {
      name: "备份中心",
      component: "fileContent",
      type: "backups",
      imgurl: require("@/assets/image/icons/deskIcons/tree-folder.png"),
      icon: require("@/assets/image/icons/fileIcons/backups.png"),
      active: false
    }
  ]
};
const mine = {
  fileRight: [],
  folderRight: [
    {
      iconImg: require("@/assets/image/icons/fileIcons/partition.png"),
      iconTitle: "创建分区",
      isRightBorder: false
    },
    {
      iconImg: require("@/assets/image/icons/fileIcons/parname.png"),
      iconTitle: "分区命名",
      isRightBorder: false
    },
    {
      iconImg: require("@/assets/image/icons/fileIcons/format.png"),
      iconTitle: "格式分区",
      isRightBorder: false
    },
    {
      iconImg: require("@/assets/image/icons/fileIcons/pardelete.png"),
      iconTitle: "删除分区",
      isRightBorder: true
    },
    {
      iconImg: require("@/assets/image/icons/fileIcons/attr.png"),
      iconTitle: "分区属性",
      isRightBorder: true
    },
    {
      iconImg: require("@/assets/image/icons/fileIcons/addC.png"),
      iconTitle: "申请增容",
      isRightBorder: false
    },
    {
      iconImg: require("@/assets/image/icons/fileIcons/reduceC.png"),
      iconTitle: "申请减容",
      isRightBorder: true
    },
    {
      iconImg: require("@/assets/image/icons/fileIcons/check.png"),
      iconTitle: "查看",
      isRightBorder: false,
      flag: false,
      children: [
        {
          iconImg: require("@/assets/image/icons/fileIcons/little.png"),
          iconTitle: "小图标"
        },
        {
          iconImg: require("@/assets/image/icons/fileIcons/middle.png"),
          iconTitle: "中图标"
        },
        {
          iconImg: require("@/assets/image/icons/fileIcons/big.png"),
          iconTitle: "大图标"
        }
      ]
    },
    {
      iconImg: require("@/assets/image/icons/fileIcons/array.png"),
      iconTitle: "排列",
      isRightBorder: true,
      flag: false,
      children: [
        {
          iconImg: require("@/assets/image/icons/fileIcons/row.png"),
          iconTitle: "行展示"
        },
        {
          iconImg: require("@/assets/image/icons/fileIcons/col.png"),
          iconTitle: "列展示"
        }
      ]
    },
    {
      iconImg: require("@/assets/image/icons/fileIcons/sendmsg.png"),
      iconTitle: "发送",
      isRightBorder: true,
      flag: false,
      children: [
        {
          iconImg: require("@/assets/image/icons/fileIcons/desk.png"),
          iconTitle: "发送桌面"
        },
        {
          iconImg: require("@/assets/image/icons/fileIcons/msg.png"),
          iconTitle: "即时通讯"
        },
        {
          iconImg: require("@/assets/image/icons/fileIcons/mail.png"),
          iconTitle: "发送邮件"
        },
        {
          iconImg: require("@/assets/image/icons/fileIcons/phone.png"),
          iconTitle: "发送短信"
        },
        {
          iconImg: require("@/assets/image/icons/fileIcons/message.png"),
          iconTitle: "发送消息"
        }
      ]
    },
    {
      iconImg: require("@/assets/image/icons/fileIcons/refresh.png"),
      iconTitle: "刷新",
      isRightBorder: false
    },
    {
      iconImg: require("@/assets/image/icons/fileIcons/help.png"),
      iconTitle: "帮助",
      isRightBorder: false
    }
  ],
  blankRight: [
    {
      iconImg: require("@/assets/image/icons/fileIcons/partition.png"),
      iconTitle: "创建分区",
      isRightBorder: false
    },
    {
      iconImg: require("@/assets/image/icons/fileIcons/attr.png"),
      iconTitle: "分区属性",
      isRightBorder: true
    },
    {
      iconImg: require("@/assets/image/icons/fileIcons/addC.png"),
      iconTitle: "申请增容",
      isRightBorder: false
    },
    {
      iconImg: require("@/assets/image/icons/fileIcons/reduceC.png"),
      iconTitle: "申请减容",
      isRightBorder: true
    },
    {
      iconImg: require("@/assets/image/icons/fileIcons/check.png"),
      iconTitle: "查看",
      isRightBorder: false,
      flag: false,
      children: [
        {
          iconImg: require("@/assets/image/icons/fileIcons/little.png"),
          iconTitle: "小图标"
        },
        {
          iconImg: require("@/assets/image/icons/fileIcons/middle.png"),
          iconTitle: "中图标"
        },
        {
          iconImg: require("@/assets/image/icons/fileIcons/big.png"),
          iconTitle: "大图标"
        }
      ]
    },
    {
      iconImg: require("@/assets/image/icons/fileIcons/array.png"),
      iconTitle: "排列",
      isRightBorder: true,
      flag: false,
      children: [
        {
          iconImg: require("@/assets/image/icons/fileIcons/row.png"),
          iconTitle: "行展示"
        },
        {
          iconImg: require("@/assets/image/icons/fileIcons/col.png"),
          iconTitle: "列展示"
        }
      ]
    }
  ],
  data: [
    {
      name: "软件区",
      component: "fileContent",
      type: "folder",
      imgurl: require("@/assets/image/icons/deskIcons/tree-disk3.png"),
      active: false
    },
    {
      name: "文档区",
      component: "fileContent",
      type: "folder",
      imgurl: require("@/assets/image/icons/deskIcons/tree-disk3.png"),
      active: false
    },
    {
      name: "娱乐区",
      component: "fileContent",
      type: "folder",
      imgurl: require("@/assets/image/icons/deskIcons/tree-disk3.png"),
      active: false
    }
  ]
};
export default {
  mixins: [myCloudMixin],
  extends: myCloudUtilMixin,
  components: {
    SpaceProgress,
    rightMenu,
    capacity
  },
  created() {
    // console.log(this.attrs)
  },
  data() {
    return {
      activeNames: ["1", "2"],
      zyCloud: [],
      myCloud: [],
      blankRightMine: [], //我的云端：空白处左右键
      folderRightMine: [], //我的云端：文件夹右键
      blankRightZy: [], //挚友云：空白处左右键
      folderRightZy: [], //挚友云：文件夹右键
      privateSpaceRight: [], //挚友云：私密空间右键
      backupsRight: [], //挚友云：备份中心
      dialogVisible: false, //控制弹框显示隐藏
      createForm: {
        // 创建分区表单
        partitionName: "", //分区名称
        disk: "", //分区盘符
        data: "" //数据中心
      },
      createRules: {
        // 创建分区表单规则
        partitionName: [
          { required: true, message: "请输入分区名称", trigger: "blur" }
        ],
        disk: [
          { required: true, message: "请选择分区盘符", trigger: "change" }
        ],
        data: [{ required: true, message: "请输入数据中心", trigger: "blur" }]
      },
      creater: "系统管理员",
      createTime: "2019-08-21",
      avaliableSpace: 18.6, //可用空间
      totalSpace: 30.2 //总空间
    };
  },
  methods: {
    createPartition() {
      //创建分区弹框显示隐藏
      this.dialogVisible = true;
    },
    resetForm(formname) {
      //取消创建分区
      this.$refs[formname].resetFields();
    },
    submitCreateFrom(formname) {
      this.$refs[formname].validate(valid => {
        if (valid) {
          console.log("提交");
        } else {
          console.log("提交失败");
          return false;
        }
      });
    }
  },
  mounted(){
    this.zyCloud = zhiyou.data;
    this.myCloud = mine.data;
    this.blankRightMine = mine.blankRight;
    this.folderRightMine = mine.folderRight;
    this.blankRightZy = zhiyou.blankRight;
    this.folderRightZy = zhiyou.folderRight;
    this.privateSpaceRight = zhiyou.privateSpaceRight;
    this.backupsRight = zhiyou.backupsRight;
    this.$emit('someMethods',{name:'getChildUtils',data:this.blankRightZy});
  }
};
</script>
<style lang='less' scoped>
@import "../../assets/css/myCloud.less";

.spaceProgress {
  position: absolute;
  width: 47%;
  right: 5px;
  top: 4%;
}
</style>