<!--
 * @Date: 2019-08-10 11:12:36
 * @LastEditors: Yqoo
 * @LastEditTime: 2019-08-26 11:40:18
 * @Desc: 授权信息组件
 -->
<template>
  <div class='authorizationMessage'>
    <div class="title">
      <img :src="require('@/assets/image/icons/deskIcons/icon-authorizationMessage.png')">
      <span>授权信息</span>
    </div>
    <div class="topBtns">
      <el-button-group>
        <el-button type="primary" size='mini' icon='el-icon-circle-plus-outline'>导入</el-button>
        <el-button type="warning" size='mini' icon='el-icon-edit'>修改</el-button>
        <el-button type="danger" size='mini' icon='el-icon-delete'>删除</el-button>
        <el-button type="success" size='mini' icon='el-icon-refresh'>刷新</el-button>
        <el-button type="primary" size='mini' icon='el-icon-s-promotion'>云注册</el-button>
        <el-button type="info" size='mini' icon='el-icon-s-marketing'>特征码</el-button>
        <el-button type="normal" size='mini' icon='el-icon-search'>搜索</el-button>
        <el-button type="success" size='mini' icon='el-icon-question'>帮助</el-button>
      </el-button-group>
    </div>
    <div class="tableTitle">
      <p>许可文件</p>
      <el-table
        :data='licenseFile'
        style="width: 100%"
        size='mini'
        max-height='150'>
        <el-table-column
          fixed
          type="selection"
          wdith='50'></el-table-column>
        <el-table-column
          prop="serialNumber"
          label="产品序列号"></el-table-column>
        <el-table-column
          prop="name"
          label="名称"></el-table-column>
        <el-table-column
          prop="status"
          label="启用状态"
          :formatter='formatterStatus'></el-table-column>
        <el-table-column
          prop="traitCodeStatus"
          label="特征码状态"
          >
          <template slot-scope="scope">
            {{ scope.row.traitCodeStatus? '匹配':'未匹配'}}
          </template>
        </el-table-column>
        <el-table-column
          prop="licenceTYpe"
          label="许可证类型"></el-table-column>
        <el-table-column
          prop="activeTime"
          label="激活时间"></el-table-column>
        <el-table-column
          prop="overdueTime"
          label="过期时间"></el-table-column>
        <el-table-column
          prop="standardTime"
          label="标准服务过期时间"
          width='150'></el-table-column>
        <el-table-column
          fixed='right'
          label='关联操作'
          >
          <template slot-scope="scope">
            <el-button type='text' size='mini' icon="el-icon-delete"  @click.native.prevent="deleteRow(scope.$index, licenseFile)"></el-button>
          </template>  
        </el-table-column>
      </el-table>
    </div>
    <div class="tableTitle">
      <p>授权信息</p>
      <el-table
        :data='authorizationTableData'
        style="width: 100%"
        size='mini'
        max-height='200'>
        <el-table-column
          prop='serialNumber'
          label='序号'
          width='50'></el-table-column>
        <el-table-column
          prop='productNumber'
          label='产品序列号'></el-table-column>
        <el-table-column
          prop='systemCoding'
          label='系统编码'></el-table-column>
        <el-table-column
          prop='modulName'
          label='模块或功能名称'></el-table-column>
        <el-table-column
          prop='licences'
          label='授权许可证数目'></el-table-column>
        <el-table-column
          prop='type'
          label='许可证类型'></el-table-column>
        <el-table-column
          prop='activeDay'
          label='激活日期'></el-table-column>
        <el-table-column
          prop='overdueDay'
          label='过期时间'></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>

export default {
  name: 'authorizationMessage',
  components: {},
  data() {
    return {
      licenseFile:[{
        serialNumber:'ZY001',
        name:'License',
        status:false,
        traitCodeStatus:false,
        licenceTYpe:'试用',
        activeTime:'2019-08-12',
        overdueTime:'2020-08-12',
        standardTime:'2020-09-12',
      },{
        serialNumber:'ZY001',
        name:'License',
        status:true,
        traitCodeStatus:true,
        licenceTYpe:'试用',
        activeTime:'2019-08-12',
        overdueTime:'2020-08-12',
        standardTime:'2020-09-12',
      },{
        serialNumber:'ZY001',
        name:'License',
        status:true,
        traitCodeStatus:true,
        licenceTYpe:'试用',
        activeTime:'2019-08-12',
        overdueTime:'2020-08-12',
        standardTime:'2020-09-12',
      },{
        serialNumber:'ZY001',
        name:'License',
        status:true,
        traitCodeStatus:true,
        licenceTYpe:'试用',
        activeTime:'2019-08-12',
        overdueTime:'2020-08-12',
        standardTime:'2020-09-12',
      },{
        serialNumber:'ZY001',
        name:'License',
        status:false,
        traitCodeStatus:false,
        licenceTYpe:'试用',
        activeTime:'2019-08-12',
        overdueTime:'2020-08-12',
        standardTime:'2020-09-12',
      }],
      authorizationTableData:[
        {
          serialNumber:1,
          productNumber:'ZYFC1001',
          systemCoding:'FC',
          modulName:'挚友iCloud基础版',
          licences:'300',
          type:'试用',
          activeDay:'2019-08-12',
          overdueDay:'2020-08-12',
        },
        {
          serialNumber:1,
          productNumber:'ZYFC1001',
          systemCoding:'FC',
          modulName:'挚友iCloud基础版',
          licences:'300',
          type:'试用',
          activeDay:'2019-08-12',
          overdueDay:'2020-08-12',
        },
        {
          serialNumber:1,
          productNumber:'ZYFC1001',
          systemCoding:'FC',
          modulName:'挚友iCloud基础版',
          licences:'300',
          type:'试用',
          activeDay:'2019-08-12',
          overdueDay:'2020-08-12',
        },
        {
          serialNumber:1,
          productNumber:'ZYFC1001',
          systemCoding:'FC',
          modulName:'挚友iCloud基础版',
          licences:'300',
          type:'试用',
          activeDay:'2019-08-12',
          overdueDay:'2020-08-12',
        },
        {
          serialNumber:1,
          productNumber:'ZYFC1001',
          systemCoding:'FC',
          modulName:'挚友iCloud基础版',
          licences:'300',
          type:'试用',
          activeDay:'2019-08-12',
          overdueDay:'2020-08-12',
        },
        {
          serialNumber:1,
          productNumber:'ZYFC1001',
          systemCoding:'FC',
          modulName:'挚友iCloud基础版',
          licences:'300',
          type:'试用',
          activeDay:'2019-08-12',
          overdueDay:'2020-08-12',
        },
        {
          serialNumber:1,
          productNumber:'ZYFC1001',
          systemCoding:'FC',
          modulName:'挚友iCloud基础版',
          licences:'300',
          type:'试用',
          activeDay:'2019-08-12',
          overdueDay:'2020-08-12',
        },
      ],
    };
  },
  methods:{
    formatterStatus(row, column, cellValue, index){
      let msg = '';
      row.status && ( msg = '启用') || ( msg = '未启用');
      return msg;
    },
    deleteRow( index, rows ){
      this.$confirm('此操作将永久删除该数据, 是否继续?','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type:'warning'
      }).then( () => {
        rows.splice( index,1 );
        this.$message.success('删除成功')
      }).catch( () => this.$message.info('已取消删除'));
    },
  },
}
</script>
<style lang='less' scoped>
  .authorizationMessage {
    height: 500px;
    overflow-y:auto;
    overflow-x: hidden;
    font-size: 12px;
    & .title {
      padding: 5px 0px;
      border-bottom: 1px solid #ddd;
      & img {
        width: 20px;
        vertical-align: bottom;
        padding: 0px 5px 0px 10px;
      }
    }
    & .topBtns {
      padding:5px 0px 5px 10px;
    }
    & .tableTitle {
      & p {
        margin: 5px 0px 5px 10px;
        border-bottom: 2px solid #ddd;
      }
    }
  }
</style>