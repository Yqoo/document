<!--
 * @Date: 2019-08-10 11:10:02
 * @LastEditors: Yqoo
 * @LastEditTime: 2019-08-27 09:20:09
 * @Desc: 备份恢复组件
 -->
<template>
  <div class='backupAndRecovery'>
    <div class="title">
      <img :src="require('@/assets/image/icons/deskIcons/icon-backupArecy.png')">
      <span>备份恢复</span>
    </div>
    <div class="topBoxs">
      <div class="box-1 hvr-bounce-to-right">
        <div>
          <img :src="require('@/assets/image/icons/deskIcons/icon-backupArecy.png')">
          <span>我要备份</span>
        </div>
      </div>
      <div class="box-2 hvr-bounce-to-right">
        <div>
          <img :src="require('@/assets/image/icons/deskIcons/icon-backupArecy.png')">
          <span>我要恢复</span>
        </div>
      </div>
    </div>
    <div class="handwork">
      <i class="el-icon-refresh-right"></i>
      <span>手工备份</span>
    </div>
    <div>
      <el-form
        :model="handworkFrom"
        :rules='handworkRules'
        red='handworkForm'
        label-width='80px'
        :inline='true'
        size='small'
        >
        <el-form-item label='备份对象' prop='backups'>
          <el-input v-model='handworkFrom.backups' suffix-icon="el-icon-arrow-down"></el-input>
        </el-form-item>
        <el-form-item label='储存路径' prop='path'>
          <el-input v-model='handworkFrom.path' placeholder='请选择存储路径'>
            <el-button slot="append" type='primary' icon="el-icon-refresh-right">数据备份</el-button>
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="plan">
      <div class="planTitle">
        <i class="el-icon-s-operation"></i>
        <span>备份计划</span>
      </div>
      <div class="btns">
        <el-button-group>
          <el-button type='primary' size='mini' icon='el-icon-circle-plus-outline' @click='addFormVisible = true'>新建</el-button>
          <el-button type='warning' size='mini' icon='el-icon-edit'>修改</el-button>
          <el-button type='danger' size='mini' icon='el-icon-delete'>删除</el-button>
          <el-button type='success' size='mini' icon='el-icon-refresh'>刷新</el-button>
          <el-button type='info' size='mini' icon='el-icon-question'>帮助</el-button>
        </el-button-group>
      </div>
      <el-table
        :data='planTableData'
        style="width: 100%"
        size='mini'
        max-height='250'>
        <el-table-column
          fixed='left'
          type="selection"
          width='50'></el-table-column>
        <el-table-column
          label='计划名称'
          prop='name'
          :show-overflow-tooltip='true'></el-table-column>
        <el-table-column
          label='计划类型'
          prop='type'></el-table-column>
        <el-table-column
          label='计划说明'
          prop='desc'
          :show-overflow-tooltip='true'></el-table-column>
        <el-table-column
          label='频率'
          prop='frequency'></el-table-column>
        <el-table-column
          label='创建人'
          prop='createUser'
          :show-overflow-tooltip='true'></el-table-column>
        <el-table-column
          label='创建时间'
          prop='createTime'
          :show-overflow-tooltip='true'></el-table-column>
          <el-table-column
            fixed='right'
            label='关联操作'>
            <template slot-scope="scope">
              <el-button type='text' icon='el-icon-document' @click.native.prevent='logRow(scope.$index, planTableData)'></el-button>
              <el-button type='text' @click.native.prevent='deleteRow(scope.$index, planTableData)'>
                <i class="el-icon-delete"></i>
              </el-button>
            </template>  
          </el-table-column>
      </el-table>
    </div>
    <el-dialog
      :visible.sync='addFormVisible'
      v-dialogDrag
      :modal="false"
      width="50%"
      :close-on-click-modal="false"
      :append-to-body='true'>
      <div slot="title">
        <i class="el-icon-document-add"></i>
        <span>新建计划</span>
      </div>  
      <div class="main">
        <el-form
          :model="addForm"
          :rules="addRules"
          ref='addForm'
          :inline='true'
          label-width='100px'
          size='small'>
          <el-form-item label='计划名称' prop='name'>
            <el-input v-model='addForm.name' suffix-icon="el-icon-reading" placeholder='请输入计划名称'></el-input>
          </el-form-item>
          <el-form-item label='计划类型' prop='type'>
            <el-select v-model='addForm.type' @change="changeType">
              <el-option label='一次' value='once'></el-option>
              <el-option label='重复' value='repeat'></el-option>
            </el-select>
            <el-checkbox v-model="checked" :border='true' size='small' style="margin-left:20px;">已启用</el-checkbox>
          </el-form-item>
          <el-form-item label='备份对象' prop='backups'>
            <el-input v-model='addForm.backups' suffix-icon="el-icon-arrow-down" placeholder='请选择备份对象'></el-input>
          </el-form-item>
          <el-form-item label='储存路径' prop='path'>
            <el-input v-model='addForm.path' placeholder='请选择存储路径' suffix-icon="el-icon-more"></el-input>
          </el-form-item>
          <div class="typeVisible">
            <div class="desc" v-if="addForm.type === 'once'?true:false"><i class="el-icon-s-operation"></i><span>执行一次</span></div>
            <div class="desc" v-else><i class="el-icon-s-operation"></i><span>执行频率</span></div>
          </div>
          <div v-if="addForm.type === 'once'?true:false">
            <el-form-item label='日期（D）' prop='day' >
              <el-date-picker size='small' type="date" placeholder="选择日期" v-model="addForm.day" style="width: 100%;"></el-date-picker>
            </el-form-item>
            <el-form-item label=时间（T）>
              <el-time-select
                v-model="addForm.time"
                :picker-options="{
                  start: '08:30',
                  step: '00:15',
                  end: '24:00'
                }"
                placeholder="选择时间"
                prop='time'>
              </el-time-select>
            </el-form-item>
          </div>
          <div v-else class="complex">
            <el-form-item label='执行（C）'>
              <el-select v-model='addForm.execute'>
                <el-option label='每天' value='day'></el-option>
                <el-option label='每周' value='week'></el-option>
                <el-option label='每月' value='month'></el-option>
              </el-select>
            </el-form-item>
            <div>
              <el-form-item label='执行间隔（D）' v-if="addForm.execute === 'day'">
                <el-slider
                  :min=1
                  :max=100
                  v-model='interval'
                  show-input
                  style='width:350px'>
                </el-slider>
              </el-form-item>
              <el-form-item label='执行间隔（W）' v-if=" addForm.execute === 'week'">
                <el-input-number v-model="addForm.week"  :min="1" :max="4"></el-input-number>
                <span style="font-size:12px;padding:0px 5px;">周，在</span>
                <el-select v-model='addForm.weekDay'>
                  <el-option label='星期一' value='1'></el-option>
                  <el-option label='星期二' value='2'></el-option>
                  <el-option label='星期三' value='3'></el-option>
                  <el-option label='星期四' value='4'></el-option>
                  <el-option label='星期五' value='5'></el-option>
                  <el-option label='星期六' value='6'></el-option>
                  <el-option label='星期日' value='7'></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label='执行间隔（M）'  v-if=" addForm.execute === 'month'">
                <el-input-number v-model="addForm.month"  :min="1" :max="12" @change='changeMonth'></el-input-number>
                <span style="font-size:12px;padding-right:15px;">月</span>
                <el-radio-group v-model='monthday'>
                  <el-radio label='day'>
                    <span>在每月</span><el-input-number v-model="addForm.monthDay"  :min="1" :max="moreOne"></el-input-number><span>天</span>
                  </el-radio>
                  <el-radio label='week'>
                    <span>在每月</span><el-input-number v-model="addForm.monthWeek"  :min="1" :max="4"></el-input-number><span>周</span>
                    <el-select v-model='addForm.monthWeekDay'>
                      <el-option label='星期一' value='1'></el-option>
                      <el-option label='星期二' value='2'></el-option>
                      <el-option label='星期三' value='3'></el-option>
                      <el-option label='星期四' value='4'></el-option>
                      <el-option label='星期五' value='5'></el-option>
                      <el-option label='星期六' value='6'></el-option>
                      <el-option label='星期日' value='7'></el-option>
                    </el-select>
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
          </div>
          <div  v-if="addForm.type === 'repeat'?true:false">
            <div class="typeVisible">
              <div class="desc"><i class="el-icon-s-operation"></i><span>每天频率</span></div>
            </div>
            <el-form-item label='执行时间' prop='time'>
              <el-time-select
                v-model="addForm.time"
                :picker-options="{
                  start: '08:30',
                  step: '00:15',
                  end: '24:00'
                }"
                placeholder="选择时间"
                prop='time'>
              </el-time-select>
            </el-form-item>
            <el-form-item label='失败间隔重启'>
              <el-input-number v-model="addForm.reStart"  :min="1" :max="24"></el-input-number>
              <span style="font-size:12px;">小时</span>
            </el-form-item>
            <div class="typeVisible">
              <div class="desc"><i class="el-icon-s-operation"></i><span>持续说明</span></div>
            </div>
            <el-form-item label='开始时间'>
              <el-date-picker
                v-model="addForm.continueStartTime"
                type="date"
                placeholder="选择日期"
                size='small'>
              </el-date-picker>
            </el-form-item>
            <el-form-item label='保留备份'>
              <el-input-number v-model="addForm.copies"  :min="1" :max="100"></el-input-number>
              <span style="font-size:12px;">份</span>
              <el-checkbox v-model="checked1" :border='true' size='small' style="margin-left:20px;">已启用</el-checkbox>
            </el-form-item>
          </div>
          <div class="typeVisible">
            <div class="desc"><i class="el-icon-s-operation"></i><span>计划说明</span></div>
          </div>
          <el-input type='textarea' v-model='addForm.desc'></el-input>
        </el-form>
      </div>
      <div slot="footer">
        <div class="customBtn">
          <el-radio v-model="confirm" label="confirmAndcontinue">确认并创建</el-radio>
          <el-radio v-model="confirm" label="confirmAndclose">确认并关闭</el-radio>
        </div>
        <el-button size="mini" type="success">确认</el-button>
        <el-button size="mini" type="danger">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'backupAndRecovery',
  components: {},
  data() {
    return {
      handworkFrom:{
        backups:'',
        path:''
      },
      handworkRules:{
        backups:[
          { required: true, message: '请选择备份对象', trigger: 'blur' },
        ],
        path:[
          { required: true, message: '请选择存储路径', trigger: 'blur' },
        ],
      },
      planTableData:[
        {
          name:'iCloud库备份',
          type:'重复',
          desc:'每周五一次备份',
          frequency:'周',
          createUser:'系统管理员',
          createTime:'2019-08-12',
        },
        {
          name:'iCloud库备份',
          type:'重复',
          desc:'每周五一次备份',
          frequency:'周',
          createUser:'系统管理员',
          createTime:'2019-08-12',
        },
        {
          name:'iCloud库备份',
          type:'重复',
          desc:'每周五一次备份',
          frequency:'周',
          createUser:'系统管理员',
          createTime:'2019-08-12',
        },
        {
          name:'iCloud库备份',
          type:'重复',
          desc:'每周五一次备份',
          frequency:'周',
          createUser:'系统管理员',
          createTime:'2019-08-12',
        },
        {
          name:'iCloud库备份',
          type:'重复',
          desc:'每周五一次备份',
          frequency:'周',
          createUser:'系统管理员',
          createTime:'2019-08-12',
        },
        {
          name:'iCloud库备份',
          type:'重复',
          desc:'每周五一次备份',
          frequency:'周',
          createUser:'系统管理员',
          createTime:'2019-08-12',
        },
      ],
      addFormVisible:false,
      addForm:{
        name:'',
        type:'repeat',
        day:'',
        time:'09:00',
        execute:'day',
        week:'1',//第几周
        weekDay:'1',//星期几
        month:'1',//第几月
        monthDay:'1',//第几月下的第几天
        monthWeek:'1',//第几天下的第几周
        monthWeekDay:'1',//每月下的周下面的星期几
        reStart:2,//失败间隔重启
        continueStartTime:'',//持续说明开始时间
        copies:1,//保留备份
        desc:'',//计划说明
      },
      addRules:{
        name:[
          { required: true, message: '请输入计划名称', trigger: 'blur' }
        ],
        type:[
          { required: true, message: '请选择类型', trigger: 'blur' }
        ],
        backups:[
          { required: true, message: '请选择备份对象', trigger: 'blur' }
        ],
        path:[
          { required: true, message: '请选择存储路径', trigger: 'blur' }
        ],
        day:[
          { required: true, message: '请选择日期', trigger: 'blur' }
        ],
        time:[
          { required: true, message: '请选择执行时间', trigger: 'blur' }
        ],
       
      },
      checked:false,
      checked1:true,//持续说明下的已启用
      confirm:'confirmAndclose',
      interval:5,//执行间隔
      monthday:'week',
      moreOne:31,//1 3 5 7 8 10 12 月下每月应是31天
    };
  },
  methods:{
    logRow( index,row ){},
    deleteRow( index,row ){
      this.$confirm('此操作将永久删除该数据, 是否继续?','提示',{
        confirmButtonText:'确定',
        cancalButtopnText:'取消',
        type:'warning'
      }).then( () => {
        row.splice( index,1 );
        this.$message.success('删除成功');
      }).catch( () =>  this.$message.info('已取消删除'))
    },
    changeType( type ){
      this.addForm.type = type;
    },
    changeMonth( v ){
      let month = [1,3,5,7,8,10,12];
      if( month.indexOf( v ) > 0 ) this.moreOne = 31;// 多一天
      else {
        this.moreOne = 30;
        if( this.addForm.monthDay > 30 ) this.addForm.monthDay = 30;
      }
    },
  },
}
</script>
<style lang='less' scoped>
  .backupAndRecovery{
    overflow-y:auto;
    overflow-x: hidden;
    font-size: 12px;
    & .title {
      padding: 5px 0px 5px 10px;
      border-bottom: 1px solid #ddd;
      & img {
        width: 20px;
        vertical-align: bottom;
        padding-right: 5px;
      }
    }
    & .topBoxs {
      display:flex;
      flex-flow:row wrap;
      padding: 10px 0px;
      & img{
        width: 20px;
        vertical-align: bottom;
        padding-right: 5px;
      }
      & div.box-1,& div.box-2 {
        height: 80px;
        width: 150px;
        border: 1px solid #ddd;
        border-radius: 4px;
        position: relative;
        margin-left: 10px;
        cursor: pointer;
        & div {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%,-50%);
        }
      }
    }
    & .handwork {
      height: 20px;
      line-height: 20px;
      border-bottom: 2px solid #ddd;
      margin-left: 10px;
    }
    & .el-form {
      padding: 10px;
    }
    & .plan {
      & .planTitle {
        height: 20px;
        line-height: 20px;
        border-bottom: 2px solid #ddd;
        margin-left: 10px;
      }
      & .btns {
        padding: 5px 0px 5px 10px;
      }
    }
    & .el-icon-delete {
      color: red!important;
    }
  }
  .el-dialog {
    & .customBtn {
      position: absolute;
    }
  }
  & .typeVisible {
    margin-bottom: 5px;
    & .desc {
      font-size: 12px;
      border-bottom: 2px solid #ddd;
      padding:0px 0px 3px 10px;
    }
  }
  .complex {
    display: flex;
    flex-flow: row wrap;
  }
</style>