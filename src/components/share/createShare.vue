<!-- 创建分享 -->
<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :append-to-body="true"
    :close-on-click-modal="false"
    :modal="false"
    :before-close="closeDialog"
    width="50%">
    <div slot="title" class="messageBox-title">
        <img src="@/assets/image/icons/fileIcons/myshare.png">
        <span>创建分享</span>
    </div>
    <div class="resourceName">
        <img src="@/assets/image/icons/fileIcons/attribute.png">
        <span>分享资源</span>
        <span class="name">
            <img :src="require(`@/assets/image/icons/${info.img}`)">
            {{info.name}}
        </span>
    </div>
    <el-menu mode="horizontal">
        <el-menu-item :disabled='true'><img src="@/assets/image/icons/fileIcons/type.png"/>分享类型</el-menu-item>
    </el-menu>
    <div class="shareType">
        <p><el-radio v-model="shareType" label="1">有提取码</el-radio><span>仅限拥有提取码者可查看，更加隐私安全</span></p>
        <p><el-radio v-model="shareType" label="0">无提取码</el-radio><span>无需提取码，仅限拥有链接的用户可以查看</span></p>
    </div>
    <el-menu mode="horizontal">
        <el-menu-item :disabled='true'><img src="@/assets/image/icons/fileIcons/power.png"/>分享权限</el-menu-item>
        <el-menu-item><el-checkbox v-model="checkAllLimit" @change="handleAllLimitChange">所有</el-checkbox></el-menu-item>
        <el-menu-item><el-checkbox v-model="checkDialy" @change="handleDailyChange">日常操作</el-checkbox></el-menu-item>
        <el-menu-item><el-checkbox v-model="checkOnline" @change="handleOnlineChange">在线操作</el-checkbox></el-menu-item>
        <el-menu-item><el-checkbox v-model="checkForward" @change="handleForwardChange">转发操作</el-checkbox></el-menu-item>
    </el-menu>
    <el-checkbox-group v-model="checkLimits">
        <el-checkbox v-for="item in shareLimits" :label="item.label" :key="item.name">{{item.label}}</el-checkbox>
    </el-checkbox-group>
    <el-menu mode="horizontal">
        <el-menu-item :disabled='true'><img src="@/assets/image/icons/fileIcons/calendar.png"/>分享期限</el-menu-item>
    </el-menu>
    <div class="shareDate">
        <el-radio v-model="shareDate" label="forever">永久有效</el-radio>
        <el-radio v-model="shareDate" label="1">1天</el-radio>
        <el-radio v-model="shareDate" label="3">3天</el-radio>
        <el-radio v-model="shareDate" label="7">7天</el-radio>
        <el-radio v-model="shareDate" label="custom">自定义</el-radio>
    </div>
    <el-menu mode="horizontal">
        <el-menu-item :disabled='true'><img src="@/assets/image/icons/fileIcons/line.png"/>访问次数</el-menu-item>
    </el-menu>
    <div class="shareDate">
        <el-radio v-model="visitTime" label="forever">不限次数</el-radio>
        <el-radio v-model="visitTime" label="10">10次</el-radio>
        <el-radio v-model="visitTime" label="30">30次</el-radio>
        <el-radio v-model="visitTime" label="50">50次</el-radio>
        <el-radio v-model="visitTime" label="custom">自定义</el-radio>
    </div>
    <div slot="footer" class="dialog-footer">
        <el-button type='primary' size='small'>创建链接</el-button>
        <el-button @click="closeDialog" size="small">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props:{
      show:Boolean,
      info:Object
  },
  data () {
    return {
        dialogVisible: this.show,
        shareType: '1',
        checkAllLimit: false, //创建分享  勾选所有
        checkDialy: false, // 勾选所有日常操作
        checkOnline:false, // 勾选所有在线操作
        checkForward:false, // 勾选所有转发操作
        checkLimits:[], //已勾选的权限
        shareDate:'1', //分享期限
        visitTime:'10', //访问次数
        shareLimits:[
            {name:'new',label:'新建',type:'daily'},{name:'preview',label:'剪切',type:'daily'},{name:'copy',label:'复制',type:'daily'},{name:'paste',label:'粘贴',type:'daily'},{name:'rename',label:'重命名',type:'daily'},{name:'del',label:'删除',type:'daily'},
            {name:'preview',label:'在线预览',type:'online'},{name:'edit',label:'在线编辑',type:'online'},{name:'collaborative',label:'协同编辑',type:'online'},{name:'compress',label:'在线压缩',type:'online'},{name:'decompress',label:'在线解压',type:'online'},{name:'encryption',label:'文件加密',type:'online'},{name:'deciphering',label:'文件解密',type:'online'},
            {name:'upload',label:'上传',type:'forward'},{name:'down',label:'下载',type:'forward'},{name:'print',label:'打印',type:'forward'},{name:'save',label:'保存我的云端',type:'forward'}
        ],
    };
  },
  computed: {
      dailyLimits(){ //日常操作
          return this.shareLimits.filter((e)=>{
              return e.type === 'daily';
          });
      },
      onlineLimits(){ // 在线操作
          return this.shareLimits.filter((e) => {
              return e.type === 'online';
          });
      },
      forwardLimits(){ // 转发操作
          return this.shareLimits.filter((e) => {
              return e.type === 'forward';
          });
      }
  },
  methods: {
      handleAllLimitChange( val ){ //创建分享：勾选所有分享权限
        //   console.log(val)
          this.checkLimits = val ? shareLimits : [];
      },
      closeDialog(){ //关闭弹框
          this.$emit('closeDialog','showShare');
      }
  },
  mounted(){
      console.log(this.info)
  }
}

</script>
<style lang='less' scoped>
@import './shareStyle.less';
</style>