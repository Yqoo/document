<!--
 * @Date: 2019-08-14 16:45:07
 * @LastEditors: Yqoo
 * @LastEditTime: 2019-08-14 17:57:24
 * @Desc: iCloud组件下的存储中心
 -->
<template>
  <div class='iCloudDisk'>
    <el-table
    :data="tableData"
    style="width: 100%"
    size="mini"
    >
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="ID" label="序号"></el-table-column>
      <el-table-column prop="dc" label="存储中心"></el-table-column>
      <el-table-column prop="IP" label="网络地址"></el-table-column>
      <el-table-column prop="port" label="端口"></el-table-column>
      <el-table-column prop="path" label="物理路径"></el-table-column>
      <el-table-column prop="allocation" label="分配空间"></el-table-column>
      <el-table-column prop="usable" label="可用空间"></el-table-column>
      <el-table-column prop="user" label="创建人"></el-table-column>
      <el-table-column prop="time" label="操作时间"></el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <i class="el-icon-edit" @click="handleClick(scope)"></i>
          <i class="el-icon-delete"></i>
          <i class="el-icon-user"></i>
          <i class="el-icon-refresh-left"></i>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

export default {
  name: 'iCloudDisk',
  components: {},
  data() {
    return {
      tableData:[
        { ID:1,dc:'A中心',IP:'127.0.0.1',port:'8080',path:'D:/',allocation:'90%',usable:'10%',user:'Yqoo',time:'13:00'}
      ],
    };
  },
  methods:{
    handleClick( scope ){
      console.log( scope )
    }
  },
}
</script>
<style lang='less' scoped>
  .cell i{
    padding-right: 5px;
    font-size: 14px;
    cursor: pointer;
    color: #00adb5;
  }
</style>