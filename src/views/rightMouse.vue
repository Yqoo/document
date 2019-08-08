<template>
  <div class='' @contextmenu.stop.prevent @click.stop>
    <ul class="menus pulse animated" :style="menuPosition" ref="ulMenu" @mouseleave="leaveMenus">
      <li v-for="(item,index) in menus[rules]" :key="index" @click="item.fn($event)" class="fadeInUp animated">
        <i :class="item.icon" :style="item.color"></i>
        {{item.title}}
        <div style="display:none">
          <ul v-if="item.children" class="childUl">
            <li v-for="(child,key) in item.children" :key="key" @click="child.fn">
              <img :src="child.icon">
              {{child.title}}
            </li>
          </ul>
        </div>
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
          // top = this.position.top - (this.position.top + this.menuSize.mHeight - this.position.mainHeight);
          top = this.position.mainHeight - this.menuSize.mHeight;
        } else {
          top = this.position.top;
        }
        if(this.position.left + this.menuSize.mWidth > this.position.mainWidth){
          // left = this.position.left - (this.position.left + this.menuSize.mWidth - this.position.mainWidth);
          left = this.position.mainWidth - this.menuSize.mWidth;
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
              {title:'刷新',icon:'el-icon-refresh',color:{ color:'#f38181' },fn:() => {
                location.reload();
                this.$emit('closeMenus',true);
              }},
              {title:'上传',icon:'el-icon-upload',color:{ color:'#f5c7f7' },fn:() => {
                this.$emit('closeMenus',true);
              }},
              {title:'新建文件夹',icon:'el-icon-folder-add',color:{ color:'#ff5722' },fn:() => {
                this.$emit('closeMenus',true);
              }},
              {title:'新建文件',icon:'el-icon-document-add',color:{ color:'#95e1d3' },fn:() => {
                this.$emit('closeMenus',true);
              },children:[
                { title:'word',icon:require('@/assets/image/icons/deskIcons/icon-word.png'),fn:() => { console.log('word')}},
                { title:'excel',icon:require('@/assets/image/icons/deskIcons/icon-excel.png'),fn:() => { console.log('excel')}},
                { title:'ppt',icon:require('@/assets/image/icons/deskIcons/icon-ppt.png'),fn:() => { console.log('ppt')}},
                { title:'txt',icon:require('@/assets/image/icons/deskIcons/icon-txt.png'),fn:() => { console.log('txt')}},
              ]},
              {title:'粘贴',icon:'el-icon-files',color:{ color:'#ff2e63' },fn:() => {
                this.$emit('closeMenus',true);
              }},
              {title:'复制',icon:'el-icon-crop',color:{ color:'#08d9d6' },fn:() => {
                this.$emit('closeMenus',true);
              }},
               {title:'图标大小',icon:'el-icon-star-off',color:{ color:'#aa96da' },fn:() => {
                this.$emit('closeMenus',true);
              },children:[
                { title:'大图标',icon:require('@/assets/image/icons/deskIcons/icon-big.png'),fn:() => {
                  this.$store.commit('changeIconSize','big')
                } },
                { title:'中图标',icon:require('@/assets/image/icons/deskIcons/icon-normal.png'),fn:() => {
                  this.$store.commit('changeIconSize','normal')
                }},
                { title:'小图标',icon:require('@/assets/image/icons/deskIcons/icon-small.png'),fn:() => {
                  this.$store.commit('changeIconSize','small')
                }},
              ]},
              {title:'轻应用',icon:'el-icon-menu',color:{ color:'#ffc7c7' },fn:() => {
                this.$emit('closeMenus',true);
              }},
              {title:'壁纸设置',icon:'el-icon-picture-outline',color:{ color:'#30e3ca' },fn:() => {
                this.$emit('closeMenus',true);
                this.$emit('closeMenus',{index:'wallpaper',path:'system'});
              }},
              {title:'主题设置',icon:'el-icon-s-home',color:{ color:'#7a08fa' },fn:() => {
                this.$emit('closeMenus',{index:'theme',path:'system'});
              }},
              {title:'系统设置',icon:'el-icon-s-tools',color:{ color:'#252a34' },fn:() => {
                this.$emit('closeMenus',true);
                this.$emit('closeMenus',{index:'config',path:'system'});
              }},
            ],
            app:[
              {title:'打开',icon:'el-icon-open',color:{ color:'#3490de' },fn:() => {console.log(1)}},
              {title:'重命名',icon:'el-icon-edit',color:{ color:'#c06c84' },fn:() => {console.log(7)}},
              {title:'删除',icon:'el-icon-delete',color:{ color:'#ea5455' },fn:() => {console.log(8)}},
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
        //this.$emit('closeMenus', true);
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
    padding: 5px 0px;
    background: #eee;
    float: left;
    border-radius: 5px;
    text-align: left;
    font-size: 12px;
    width: 160px;
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
      & div {
        display: block!important;
      }
    }
    
  }
   .childUl{
    position: absolute;
    width: 70%;
    left:100%;
    top:0px;
    background: #eee;
    color: #000;
    & li img {
      vertical-align: sub;
    }
  }
</style>