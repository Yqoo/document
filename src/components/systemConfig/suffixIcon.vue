<!--系统设置： 后缀图标 -->
<template>
  <div class="suffixIcon">
      <el-col :span="2" v-for="item in iconList" :key="item.suffix" :offset="1">
          <div @contextmenu.prevent.stop="operateSuffix">
              <el-card :body-style="{ padding: '2px 0 0 0',textAlign: 'center',cursor:'pointer' }">
                  <img :src="item.iconImg" :alt="item.suffix">
                  <div>
                      <span>{{item.suffix}}</span>
                  </div>
              </el-card>
          </div>
      </el-col>
      <el-col v-if="fileUrl != ''" :span="2" :offset="1">
          <el-card :body-style="{ padding: '2px 0 0 0',textAlign: 'center',cursor:'pointer' }">
              <img :src="fileUrl">
              <div>
                  <i @click="deleteFile" class="el-icon-circle-close"></i>
                  <el-input v-model="newSuffix" autofocus="true"></el-input>
                  <i class="el-icon-circle-check" @click="getSuffix"></i>
              </div>
          </el-card>
      </el-col>
      <div class="addBtn">
          <input type="file" @change="getImgFile" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg">
          <el-button class="addIcon" icon="el-icon-plus" circle></el-button>
      </div>
      <SuffixOperate :position="position" v-show="isShowMenu"></SuffixOperate>
  </div>
</template>

<script>
import SuffixOperate from './suffixIconOperate'
export default {
  components:{
      SuffixOperate
  },
  data () {
    return {
        iconList: [//默认文件及图标
            {iconImg:require('@/assets/image/icons/fileIcons/doc.png'), suffix: '.doc'},
            {iconImg:require('@/assets/image/icons/fileIcons/ppt.png'), suffix: '.pptx'},
            {iconImg:require('@/assets/image/icons/fileIcons/excel.png'), suffix: '.xlsx'},
        ],
        fileUrl: '', //选中的图片 
        newSuffix: '',  //新增的后缀名 
        position: {top: 0, left: 0},  // 操作菜单的位置
        isShowMenu: false,  //控制是否显示菜单
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
      getSuffix() { //得到后缀名
          if(this.newSuffix === '') {
              this.$message('请输入后缀名');
          }
      },
      deleteFile() { //取消 新建后缀名
          this.fileUrl = '';
          this.newSuffix = '';
      },
      operateSuffix(e) {  //对已有的后缀图标进行操作：修改删除
        Object.assign(this.position, {
            top: this._getPosition(e).top + 'px',
            left: this._getPosition(e).left + 'px'
        });
        this.isShowMenu = true;
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
        & input {
            height: 21px;
            padding: 0 0 0 2px;
        }
        & i{
            position: absolute;
            cursor: pointer;
            font-size: 16px;
            right: -16px;
            z-index: 990;
        }
        & i.el-icon-circle-close{
            top: 0;
            color: #f92020;
        }
        & i.el-icon-circle-check{
            color: #2fe82f;
            bottom: 3px;
        }
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