<!-- 申请增容，申请减容 -->
<template>
  <el-dialog
      v-dialogDrag
      :visible.sync="visible"
      :append-to-body="true"
      :close-on-click-modal="false"
      :before-close="closeCapacityForm"
      width="40%">
      <div slot="title" class="messageBox-title">
        <img :src="msg.img">
        <span>{{msg.title}}</span>
      </div>
      <el-form :model="capacityForm" :rules="capacityRules" ref="capacityForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="申请容量:" prop="capacity">
              <el-input v-model="capacityForm.capacity" placeholder="请输入申请容量（G）"></el-input>
          </el-form-item>
          <el-form-item label="申请原因：" prop="reason">
              <el-input type="textarea" v-model="capacityForm.reason"></el-input>
          </el-form-item>
          <el-row>
            <el-col :span="12">
                <el-form-item label="申请人:">
                    <span>{{applyer}}</span>
                </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="申请时间:">
                  <span>{{applyTime}}</span>
              </el-form-item>
            </el-col>
          </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm('capacityForm')">取 消</el-button>
        <el-button type="primary" @click="submitForm('capacityForm')">确 定</el-button>
      </span>
  </el-dialog>
</template>

<script>
export default {
  props: ['capacityVisible', 'info'],
  created(){
      console.log(this.info);
  },
  computed:{
      msg(){
          let title = '';
          let img = '';
          switch(this.info.operate){
              case 'add':
                  title = '申请增容';
                  img = require('@/assets/image/icons/fileIcons/addC.png');
                  break;
              case 'reduce':
                  title = '申请减容';
                  img = require("@/assets/image/icons/fileIcons/reduceC.png");
                  break;
          }
          return {title, img}
      }
  },
  data () {
    return {
        visible: this.capacityVisible,
        capacityForm:{ //申请增容减容表单
            capacity:'', //申请容量
            reason:'',  //申请原因
        },
        capacityRules:{
            capacity:[
                {required: true, message:'请输入申请容量', trigger: 'blur'}
            ]
        },
        applyer:'系统管理员',
        applyTime: '2019-8-22'
    };
  },
  methods: {
      resetForm(formName) { // 取消申请增容减容
        this.closeCapacityForm();
        this.$refs[formName].resetFields();
      },
      submitForm(formName) { // 确定提交申请
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      closeCapacityForm(){ //关闭申请增容减容的弹框
          this.$emit('closeCapacityForm');
      }
  }
}

</script>
<style lang='less' scoped>
.el-form-item{
    & /deep/ textarea{
        height: 100px;
    }
    & span{
      font-size: 12px;
    }
}
</style>