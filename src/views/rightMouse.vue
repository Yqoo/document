<template>
  <div class='' @contextmenu.stop.prevent @click.stop>
    <ul class="menus pulse animated" :style="menuPosition" ref="ulMenu" @mouseleave="leaveMenus">
      <li v-for="(item,index) in menus[rules]" :key="index" @click="item.fn($event)" class="fadeInUp animated">
        <i :class="item.icon"></i>
        {{item.title}}
      </li>
    </ul>
  </div>
</template>

<script>  

export default {
    name: 'rightMenus',
    props:{
      rules:String,
      position:Object,
    },
    computed: {
      menuPosition() {  // 计算菜单在最下边和最右边点击
        let top = 0, left = 0;
        if(this.position.top + this.menuSize.mHeight > this.position.mainHeight){
          top = this.position.top - (this.position.top + this.menuSize.mHeight - this.position.mainHeight);
        } else {
          top = this.position.top;
        }
        if(this.position.left + this.menuSize.mWidth > this.position.mainWidth){
          left = this.position.left - (this.position.left + this.menuSize.mWidth - this.position.mainWidth);
        } else {
          left = this.position.left;
        }
        this._position = {
          top: top + 'px',
          position: 'absolute',
          left: left + 'px'
        };
        return this._position;
      }
    },
    data() {
        return {
          _position: Object.assign({}, this.position),
          menuSize: {  //菜单的宽高
            mWidth: '',
            mHeight: ''
          },
          menus:{
            desktop:[
              {title:'刷新',icon:'el-icon-refresh',fn:() => {
                this.$emit('closeMenus',true);
              }},
              {title:'上传',icon:'el-icon-upload',fn:() => {
                this.$emit('closeMenus',true);
              }},
              {title:'新建文件夹',icon:'el-icon-folder-add',fn:() => {
                this.$emit('closeMenus',true);
              }},
              {title:'新建文件',icon:'el-icon-document-add',fn:() => {
                this.$emit('closeMenus',true);
              }},
              {title:'粘贴',icon:'el-icon-files',fn:() => {
                this.$emit('closeMenus',true);
              }},
              {title:'查看剪贴板',icon:'el-icon-crop',fn:() => {
                this.$emit('closeMenus',true);
              }},
              {title:'排序方式',icon:'el-icon-s-fold',fn:() => {
                this.$emit('closeMenus',true);
              }},
              {title:'轻应用',icon:'el-icon-menu',fn:() => {
                this.$emit('closeMenus',true);
              }},
              {title:'壁纸设置',icon:'el-icon-picture-outline',fn:() => {
                 this.$emit('closeMenus',true);
              }},
              {title:'主题设置',icon:'el-icon-s-home',fn:() => {
                this.$router.push({name:'system',params:{index:'theme'}});
                this.$emit('closeMenus',true);
              }},
              {title:'系统设置',icon:'el-icon-s-tools',fn:() => {
                this.$emit('closeMenus',true);
              }},
            ],
            app:[
              {title:'打开',fn:() => {console.log(1)}},
              {title:'打开为',fn:() => {console.log(2)}},
              {title:'下载',fn:() => {console.log(3)}},
              {title:'分享',fn:() => {console.log(4)}},
              {title:'复制',fn:() => {console.log(5)}},
              {title:'剪切',fn:() => {console.log(6)}},
              {title:'重命名',fn:() => {console.log(7)}},
              {title:'删除',fn:() => {console.log(8)}},
              {title:'创建压缩包',fn:() => {console.log(9)}},
              {title:'浏览器打开',fn:() => {console.log(10)}},
              {title:'更多',fn:( e ) => { console.log(11)}},
              {title:'属性',fn:() => {console.log(11)}},
            ],
            protogenesis:[],
            recycle:[],
          },
          
        };
    },
    watch:{
     
    },
    methods:{
      leaveMenus() {
        this.$emit('closeMenus', true);
      }
    },
    mounted() {
      Object.assign(this.menuSize, {
        mWidth: this.$refs.ulMenu.offsetWidth,
        mHeight: this.$refs.ulMenu.offsetHeight
      });
    }
  
}
</script>
<style lang='less' scoped>
@color:rgb(30, 191, 231);
  .menus {
    background: #eee;
    float: left;
    border-radius: 5px;
    text-align: left;
    font-size: 12px;
    box-shadow: 0px 0px 50px 10px rgba(0, 0, 0, .3);
    transition: box-shadow 0.5s, transform 0.5s;
    & li {
      padding: 5px 20px;
      cursor: pointer;
    };
    & li:hover {
      background: @color;
      color: #fff;
      transition: all .4s linear;
    }
    
  }
</style>