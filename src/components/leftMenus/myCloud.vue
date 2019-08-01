<template>
  <div class='myCloud' v-drag :class="themeColorName">
    <boxTools class="theme-color moveBox" :style="themeColorStyle" :info="info" @windowsTools="windowsTools" :title="componentTitle"></boxTools>
    <el-row>
      <el-col :span="6">
        <div>
          <el-tree :data="treeData"></el-tree>
        </div>
      </el-col>
      <el-col :span="18">
        <el-collapse v-model="activeCollapse" accordion>
          <el-collapse-item name='1'>
            <template slot="title">
              <i class="el-icon-cloudy"></i>挚友云
            </template>
            <div class="cards slideInRight animated">
              <el-card v-for="(c,index) in zyCloud" :key="index" shadow="hover">
                <i :class="c.imgurl"></i>
                <div class="bottom">{{c.name}}</div>
              </el-card>
            </div>
          </el-collapse-item>
           <el-collapse-item>
            <template slot="title">
              <i class="el-icon-s-custom"></i>我的云端
            </template>
            <div class="cards slideInLeft animated">
              <el-card v-for="(c,index) in myCloud" :key="index" shadow="hover">
                <i :class="c.imgurl"></i>
                <div class="bottom1">{{c.name}}</div>
              </el-card>
            </div>
          </el-collapse-item>
           <el-collapse-item>
            <template slot="title">
              <i class="el-icon-cloudy-and-sunny"></i>共享云端
            </template>
            <div class="cards slideInDown animated">
              <el-card v-for="(c,index) in shareCloud" :key="index" shadow="hover">
                <i :class="c.imgurl"></i>
                <div class="bottom1">{{c.name}}</div>
              </el-card>
            </div>
          </el-collapse-item>
           <el-collapse-item>
            <template slot="title">
              <i class="el-icon-partly-cloudy"></i>组织云端
            </template>
            <div class="cards slideInUp animated">
              <el-card v-for="(c,index) in organizationCloud" :key="index" shadow="hover">
                <i :class="c.imgurl"></i>
                <div class="bottom1">{{c.name}}</div>
              </el-card>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import tools from  "@/assets/js/utils/tools.js";
import boxTools from "@/views/boxTools";
export default {
    name:'myCloud',
    components:{
      boxTools
    },
    data() {
        return {
          info:{ className:'.myCloud',name:'myCloud'},
          minWidth:'',
          minHeight:'',
          themeColorName:'',
          themeColorStyle: {},
          componentTitle:'我的云端',
          treeData:[
            {
              label:'我的云端',
              children:[
                {label:'桌面'},
                {label:'我的文档'},
                {label:'软件区'},
                {label:'文档区'},
                {label:'娱乐区'},
              ],
            },
            {
              label:'共享云端',
              children:[
                {label:'开发部'},
                {label:'学习区'}
              ],
            },
            {
              label:'组织云端',
              children:[
                {label:'四川挚友软件有限公司',children:[{label:'前端学习区'},{label:'后端学习区'}]}
              ],
            }
          ],
          activeCollapse:['1'],
          zyCloud:[
            {name:'我的桌面',imgurl:'el-icon-s-platform'},
            {name:'我的文档',imgurl:'el-icon-folder'},
            {name:'我的共享',imgurl:'el-icon-user'},
            {name:'接收共享',imgurl:'el-icon-sort'},
            {name:'我的分享',imgurl:'el-icon-share'},
            {name:'接收分享',imgurl:'el-icon-folder-checked'},
          ],
          myCloud:[
            {name:'软件区',imgurl:'el-icon-mobile'},
            {name:'文档区',imgurl:'el-icon-mobile'},
            {name:'娱乐区',imgurl:'el-icon-mobile'},
          ],
          shareCloud:[
            {name:'开发部',imgurl:'el-icon-mobile'},
            {name:'学习区',imgurl:'el-icon-mobile'},
          ],
          organizationCloud:[
            {name:'挚友',imgurl:'el-icon-office-building'}
          ],
        };
    },
    methods:{
      windowsTools( obj ){  
        let _s = {
          minSize:   ( param ) => this.$emit( 'minSize',param ),
          maxSize:   ( param ) => {tools._maxSize(document.querySelector( param ))},
          restore:   ( param ) => tools._restore( document.querySelector( param ),this.minHeight,this.minWidth),
          closeItem: ( param ) => this.$emit( 'closeItem',param )
        };
        console.log( obj )
        _s[obj.type](obj.param);
      },
    },
    mounted(){
      this.minWidth = document.querySelector('.myCloud').offsetWidth;
      this.minHeight = document.querySelector('.myCloud').offsetHeight;
    },
    created(){
      this.themeColorName = this._getThemeColor(this, this.themeColorName, this.themeColorStyle).className;
      this.themeColorStyle = this._getThemeColor(this, this.themeColorName, this.themeColorStyle).style;
    },
    watch:{
      storeChange( val ){
        this.themeColorName = this._getThemeColor(this, val.themeColorName, val.themeColorStyle).className;
        this.themeColorStyle = this._getThemeColor(this, val.themeColorName, val.themeColorStyle).style;
      }
    },
    computed:{
      storeChange(){
        return this.$store.state.themeColor;
      }
    },
}
</script>
<style lang='less' scoped>
  .myCloud {
    min-height: 60%;  
    width: 60%;
    position: absolute;
    top: 10%;
    left: 20%;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0px 0px 50px 10px rgba(0, 0, 0, .3);
    transition: box-shadow 0.5s, transform 0.5s;
    text-align: left;
  }
  .cards{
    display:flex;
    flex-flow: row wrap;
    & .el-card {
      margin: 0px 10px;
      cursor: pointer;
      width:80px;
      height: 80px;
      & i{
        font-size: 40px;
      }
    }
  }
  .bottom {
    font-size: 10px;
    width: 50px;
    text-align: left;
  }
  .bottom1 {
    font-size:10px;
    text-align:center
  }
  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
</style>