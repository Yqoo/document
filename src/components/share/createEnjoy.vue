<!-- 创建共享 -->
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
        <img src="@/assets/image/icons/fileIcons/person.png">
        <span>创建共享</span>
      </div>
      <div class="resourceName">
        <img src="@/assets/image/icons/fileIcons/attribute.png">
        <span>共享资源</span>
        <span class="name">
            <img :src="require(`@/assets/image/icons/${info.img}`)">
            {{info.name}}
        </span>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane :disabled='true'>
        <span slot='label' class="tab-title"><img src="@/assets/image/icons/fileIcons/pepole.png">共享范围</span>
    </el-tab-pane>
    <el-tab-pane label="内部组织" name="inside">
        <el-menu :default-active="insideActive" mode="horizontal" @select="handleSelect">
            <el-menu-item :disabled='true'><img src="@/assets/image/icons/fileIcons/seal.png"/>共享组织</el-menu-item>
            <el-menu-item index="organization">组织</el-menu-item>
            <el-menu-item index="post">岗位</el-menu-item>
            <el-menu-item index="role">角色</el-menu-item>
            <el-menu-item index="user">用户</el-menu-item>
            <el-menu-item index="userGroup">用户组</el-menu-item>
        </el-menu>
        <el-row class="middleSearch">
            <el-col :span="3">
                <el-checkbox v-model="checkAll">所有</el-checkbox>
            </el-col>
            <el-col :span="11">
                <el-input
                placeholder="请输入内容"
                suffix-icon="el-icon-search"
                size="small"
                v-model="searchValue">
                </el-input>
            </el-col>
            <el-col :span="10">
                <span class="empowerTitle">授权方式：</span>
                <el-switch
                v-model="empower"
                active-text="分项"
                inactive-text="统一">
                </el-switch>
            </el-col>
        </el-row>
        <div class="treeContent">11</div>
        <el-menu mode="horizontal">
            <el-menu-item :disabled='true'><img src="@/assets/image/icons/fileIcons/power.png"/>分享权限</el-menu-item>
            <el-menu-item><el-checkbox v-model="checkAllLimit" @change="handleAllLimitChange">所有</el-checkbox></el-menu-item>
            <el-menu-item><el-checkbox v-model="checkDialy" @change="(val)=>handlePartChange(val,'daily')">日常操作</el-checkbox></el-menu-item>
            <el-menu-item><el-checkbox v-model="checkOnline" @change="(val)=>handlePartChange(val,'online')">在线操作</el-checkbox></el-menu-item>
            <el-menu-item><el-checkbox v-model="checkForward" @change="(val)=>handlePartChange(val,'forward')">转发操作</el-checkbox></el-menu-item>
        </el-menu>
        <el-checkbox-group v-model="checkLimits">
            <el-checkbox v-for="item in shareLimits" :label="item.id" @change="(val)=>handleCheckedChange(val,item)" :key="item.name">{{item.label}}</el-checkbox>
        </el-checkbox-group>
        <el-menu mode="horizontal">
            <el-menu-item :disabled='true'><img src="@/assets/image/icons/fileIcons/calendar.png"/>共享期限</el-menu-item>
        </el-menu>
        <div class="shareDate">
            <el-radio v-model="shareDate" label="forever">永久有效</el-radio>
            <el-radio v-model="shareDate" label="1">1天</el-radio>
            <el-radio v-model="shareDate" label="3">3天</el-radio>
            <el-radio v-model="shareDate" label="7">7天</el-radio>
            <el-radio v-model="shareDate" label="custom">自定义</el-radio>
        </div>
    </el-tab-pane>
    <el-tab-pane label="外部组织" name="outside">外部组织</el-tab-pane>
    </el-tabs>
    <div slot="footer" class="dialog-footer">
        <el-button type='primary' size='small' @click="createEnjoy">确定</el-button>
        <el-button @click="closeDialog" size="small">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
import qs from 'qs';
export default {
  props:{
    show:Boolean,
    info:Object
  },
  computed:{
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
  data () {
    return {
        dialogVisible: this.show,
        activeName:'inside', //共享范围
        insideActive: 'organization', //共享组织
        shareDate:'3',
        searchValue:'',  // 节点搜索的内容
        empower:true,
        checkLimits:[], //共享权限选中数据
        checkAllLimit: false, //创建分享  勾选所有
        checkDialy: false, // 勾选所有日常操作
        checkOnline:false, // 勾选所有在线操作
        checkForward:false, // 勾选所有转发操作
        shareLimits:[
            {id:1,name:'new',label:'新建',type:'daily'},{id:2,name:'cut',label:'剪切',type:'daily'},{id:3,name:'copy',label:'复制',type:'daily'},{id:4,name:'paste',label:'粘贴',type:'daily'},{id:5,name:'rename',label:'重命名',type:'daily'},{id:6,name:'del',label:'删除',type:'daily'},
            {id:7,name:'preview',label:'在线预览',type:'online'},{id:8,name:'edit',label:'在线编辑',type:'online'},{id:9,name:'collaborative',label:'协同编辑',type:'online'},{id:10,name:'compress',label:'在线压缩',type:'online'},{id:11,name:'decompress',label:'在线解压',type:'online'},{id:12,name:'encryption',label:'文件加密',type:'online'},{id:13,name:'deciphering',label:'文件解密',type:'online'},
            {id:14,name:'upload',label:'上传',type:'forward'},{id:15,name:'down',label:'下载',type:'forward'},{id:16,name:'print',label:'打印',type:'forward'},{id:17,name:'save',label:'保存我的云端',type:'forward'}
        ],
    };
  },
  methods: {
      handleSelect(){ //选择共享范围：内部组织 || 外部组织
          //
      },
      handleAllLimitChange( val ){ //创建分享：勾选所有分享权限
          this.checkAllLimit = val;
          this.checkDialy = val;
          this.checkOnline = val;
          this.checkForward = val;
          let checked = this.shareLimits.map((item) => {return item.id});
          this.checkLimits = this.checkAllLimit ? checked : [];
      },
      handlePartChange(val, tag){ //勾选分类的全部操作（日常操作、在线操作、转发操作）
        let checked = [];
        this.shareLimits.map((item) => {
            if(item.type === tag){
                checked.push(item.id);
            }
        }); 
        if( val ){
            this.checkLimits = this.checkLimits.concat(checked);
        } else {
            this.checkLimits = this.checkLimits.filter((item) => {
                return !checked.includes(item);
            });
        }
        this.checkAllLimit = this.checkLimits.length === this.shareLimits.length ? true :false;
      },
      handleCheckedChange( val, item ){  // 单独勾选权限
        if(val){
            let flag = 0;
            switch(item.type){
                case 'daily':
                    for(let i = 0; i<this.dailyLimits.length; i++){
                        if(!this.checkLimits.includes(this.dailyLimits[i])){
                            flag = 1;
                            break;
                        }
                    }
                    flag === 0 && (this.checkDialy = true);
                    break;
                case 'online':
                    for(let i = 0; i<this.onlineLimits.length; i++){
                        if(!this.checkLimits.includes(this.onlineLimits[i])){
                            flag = 1;
                            break;
                        }
                    }
                    flag === 0 && (this.checkOnline = true);
                    break;
                case 'forward':
                    for(let i = 0; i<this.forwardLimits.length; i++){
                        if(!this.checkLimits.includes(this.forwardLimits[i])){
                            flag = 1;
                            break;
                        }
                    }
                    flag === 0 && (this.checkForward = true);
                    break;
            }
            this.checkDialy&&this.checkOnline&&this.checkForward&&(this.checkAllLimit=true);
        } else {
            this.checkAllLimit = val;
            item.type === 'daily' && (this.checkDialy = val);
            item.type === 'online' && (this.checkOnline = val);
            item.type === 'forward' && (this.checkForward = val);
        }
      },
      handleClick(){ // 点击外部组织 、内部组织
          //
      },
      checkAll(){  // 勾选所有树节点
          //
      },
      createEnjoy(){ //确定共享
        //   console.log(this.info)
        let json = {x:0,y:0,w:0,h:0,i:'',type:'',name:'',title:'',img:'',id:''};
        for(let k in json){
            json[k] = this.info[k];
        }
        this.axios.post('/userDesktop/addShareCloudFile',qs.stringify(json))
          .then((res) => {
              if(res.data.code === 200){
                  this.$message('共享成功！');
              }else{
                  this.$message(res.data.desc);
              }
          });
      },
      closeDialog(){ //关闭弹框
          this.$emit('closeDialog', 'showEnjoy');
      }
  }
}

</script>
<style lang='less' scoped>
@import './shareStyle.less';
</style>