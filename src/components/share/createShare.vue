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
    <div v-if="!showLink">
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
            <el-menu-item><el-checkbox v-model="checkDialy" @change="(val)=>handlePartChange(val,'daily')">日常操作</el-checkbox></el-menu-item>
            <el-menu-item><el-checkbox v-model="checkOnline" @change="(val)=>handlePartChange(val,'online')">在线操作</el-checkbox></el-menu-item>
            <el-menu-item><el-checkbox v-model="checkForward" @change="(val)=>handlePartChange(val,'forward')">转发操作</el-checkbox></el-menu-item>
        </el-menu>
        <el-checkbox-group v-model="checkLimits" @change="handleCheckedChange">
            <el-checkbox v-for="item in shareLimits" :label="item.id" :key="item.name">{{item.label}}</el-checkbox>
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
    </div>
    <div v-if="showLink"></div>
    <div slot="footer" class="dialog-footer">
        <el-button v-if='!showLink' type='primary' size='small' @click="createLink">创建链接</el-button>
        <el-button v-if="showLink" type='primary' size='small'>复制链接与提取码</el-button>
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
        showLink:false, // 创建分享： true：分享页面  false：链接页面
        shareLimits:[
            {id:1,name:'new',label:'新建',type:'daily'},{id:2,name:'cut',label:'剪切',type:'daily'},{id:3,name:'copy',label:'复制',type:'daily'},{id:4,name:'paste',label:'粘贴',type:'daily'},{id:5,name:'rename',label:'重命名',type:'daily'},{id:6,name:'del',label:'删除',type:'daily'},
            {id:7,name:'preview',label:'在线预览',type:'online'},{id:8,name:'edit',label:'在线编辑',type:'online'},{id:9,name:'collaborative',label:'协同编辑',type:'online'},{id:10,name:'compress',label:'在线压缩',type:'online'},{id:11,name:'decompress',label:'在线解压',type:'online'},{id:12,name:'encryption',label:'文件加密',type:'online'},{id:13,name:'deciphering',label:'文件解密',type:'online'},
            {id:14,name:'upload',label:'上传',type:'forward'},{id:15,name:'down',label:'下载',type:'forward'},{id:16,name:'print',label:'打印',type:'forward'},{id:17,name:'save',label:'保存我的云端',type:'forward'}
        ],
    };
  },
  computed: {
      dailyLimits(){ //日常操作
        let newArr = [];
        let arr = this.shareLimits.filter((e)=>{
            if(e.type === 'daily'){
                newArr.push(e.id);
            }
        });
        return newArr;
      },
      onlineLimits(){ // 在线操作
        let newArr = [];
        let arr = this.shareLimits.filter((e) => {
            if(e.type === 'online'){
                newArr.push(e.id);
            }
        });
        return newArr;
      },
      forwardLimits(){ // 转发操作
        let newArr = [];
        let arr = this.shareLimits.filter((e) => {
            if(e.type === 'forward'){
                newArr.push(e.id);
            }
        });
        return newArr;
      }
  },
  methods: {
      handleAllLimitChange( val ){ //创建分享：勾选所有分享权限
          this.checkAllLimit = val;
          this.checkDialy = val;
          this.checkOnline = val;
          this.checkForward = val;
          let checked = this.shareLimits.map((item) => {return item.id});
          this.checkLimits = this.checkAllLimit ? checked : [];
      },
      handlePartChange(val, tag){
          let checkBox = '';
          switch(tag){
              case 'daily':
                  checkBox = this.checkDialy;break;
              case 'online':
                  checkBox = this.checkOnline;break;
              case 'forward':
                  checkBox = this.checkForward;break;
          }
          checkBox = val;
          let checked = this.shareLimits.map((item) => {
              if(item.type === tag){
                  return item.id;
              }
          });
          this.checkLimits = checkBox ? checked : [];
      },
      handleDailyChange(val){  //勾选全部日常操作
          this.checkDialy = val;
          let checked = this.shareLimits.map((item) => {
              if(item.type === 'daily'){
                  return item.id;
              }
          });
          this.checkLimits = this.checkDialy ? checked : [];
      },
      handleOnlineChange(val){ //勾选全部在线操作
          //
      },
      handleForwardChange(val){ //勾选全部转发操作
          //
      },
      handleCheckedChange( val ){  // 单独勾选权限
          console.log(val);
      },
      closeDialog(){ //关闭弹框
          this.$emit('closeDialog','showShare');
      },
      createLink(){
          this.showLink = true;
      }
  },
  mounted(){
    //   console.log(this.info)
  }
}

</script>
<style lang='less' scoped>
@import './shareStyle.less';
</style>