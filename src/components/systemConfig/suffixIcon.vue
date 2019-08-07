<!--系统设置： 后缀图标 -->
<template>
  <div class="suffixIcon">
      <el-col :span="2" v-for="(item, index) in iconList" :key="item.suffix" :offset="1">
          <div class="suffixBox" @contextmenu.prevent.stop="showOperateMenu($event, index)">
              <el-card :body-style="{ padding: '2px 0 0 0',textAlign: 'center',cursor:'pointer' }">
                  <img :src="item.iconImg" :alt="item.suffix">
                  <div>
                      <span>{{item.suffix}}</span>
                  </div>
              </el-card>
          </div>
      </el-col>
      <div class="addBtn" @click="showDefaultIcon">
          <el-button class="addIcon" icon="el-icon-plus" circle></el-button>
      </div>
      <SuffixOperate :position="position" @operateSuffix="operateSuffix" @hideMenu="hideMenu" v-show="isShowMenu"></SuffixOperate>
      <DefaultIcons :dialogVisible="dialogVisible" @closeDialog="closeDialog"></DefaultIcons>
  </div>
</template>

<script>
import SuffixOperate from './suffixIconOperate'
import DefaultIcons from '@/views/defaultIcons'
export default {
  components:{
      SuffixOperate,
      DefaultIcons
  },
  data () {
    return {
        iconList: [//默认后缀名及图标
            {iconImg:require('@/assets/image/icons/fileIcons/doc.png'), suffix: '.doc'},
            {iconImg:require('@/assets/image/icons/fileIcons/ppt.png'), suffix: '.pptx'},
            {iconImg:require('@/assets/image/icons/fileIcons/excel.png'), suffix: '.xlsx'},
        ],
        position: {top: 0, left: 0},  // 操作菜单的位置
        isShowMenu: false,  //控制是否显示菜单
        selectIndex: 0,  //操作图标的下标
        dialogVisible: false
    };
  },
  methods: {
      getImgFile( e ) {
          let file  = e.target.files[0];
          this.fileUrl = this.getObjectURL(file);
      },
      getObjectURL(file) {  //获取图片本地路径
          let url = null ;
          if (window.createObjectURL!=undefined) { // basic
              url = window.createObjectURL(file) ;
          }else if (window.webkitURL!=undefined) { // webkit or chrome
              url = window.webkitURL.createObjectURL(file) ;
          }else if (window.URL!=undefined) { // mozilla(firefox)
              url = window.URL.createObjectURL(file) ;
          }
          return url ;
      },
      showDefaultIcon() {
          this.dialogVisible = true;
      },
      closeDialog() {
          this.dialogVisible = false;
      },
      showOperateMenu( e, index ) {  //对已有的后缀图标进行操作：修改删除
        Object.assign(this.position, {
            top: this._getPosition(e).top + 'px',
            left: this._getPosition(e).left + 'px'
        });
        this.isShowMenu = true;
        this.selectIndex = index;
      },
      hideMenu( status ) {
          this.isShowMenu = false;
      },
      operateSuffix( state ) {
          console.log(state)
      }
  }
}

</script>
<style lang='less' scoped>
.suffixIcon /deep/ .el-card{
    position: relative;
    overflow: visible;
    margin-bottom: 5px;
    & img{
        width: 32px;
        height:32px;
    }
    & > div {
        padding:2px;
        text-align:center;
        font-size:14px;
        // & input {
        //     height: 21px;
        //     padding: 0 0 0 2px;
        // }
        // & i{
        //     position: absolute;
        //     cursor: pointer;
        //     font-size: 16px;
        //     right: -16px;
        //     z-index: 990;
        // }
        // & i.el-icon-circle-close{
        //     top: 0;
        //     color: #f92020;
        // }
        // & i.el-icon-circle-check{
        //     color: #2fe82f;
        //     bottom: 3px;
        // }
    }
}
.addBtn{
    float: left;
    position: relative;
    padding: 2% 0 0 4%;
    & input{
        position: absolute;
        width: 30px;
        top: 35%;
        left: 50%;
        opacity: 0;
    }
}
</style>