<!--
 * @Date: 2019-08-01 09:26:31
 * @LastEditors: Yqoo
 * @LastEditTime: 2019-08-20 17:56:59
 -->
<template>
  <div class='taskBarMenus fadeInUp animated'>
    <ul>
      <li v-for="(menu,index) in menus" :key="index" @click="taskMethods(menu.type)" :class="menu.type">
        <i :class="menu.icon" :style="menu.color"></i> {{menu.name}}
        <div style="display:none" v-if="showSecondMenu">
          <ul v-if="menu.children" class="childUl" :class="rightChildUl">
            <li v-for="(child,key) in menu.children" :key="key" @click.stop="taskMethods(child.type)">
              <i :class="child.icon" :style="child.color"></i>  {{child.name}}
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
    name:'taskBarMenus',
    props:['isFix'],
    data() {
        return {
          menus:[
            { name:'显示桌面',icon:'el-icon-s-platform',color:{ color:'#207561' },type:'showDesk' },
            { name:'锁屏设置',icon:'el-icon-unlock',color:{ color:'#29c6cd' },type:'lockScreen' },
            { name:'任务管理器',icon:'el-icon-s-help',color:{ color:'#ed3833' },type:'taskManage' },
            { name:'锁定任务栏',icon:'el-icon-lock',color:{ color:'#ff89c0' },type:'lockTask' },
            { name:'任务栏设置',icon:'el-icon-setting',color:{ color:'#fea386' },type:'position',children:[
              { name:'顶部',icon:'el-icon-caret-top',color:{ color:'#f12b6b' },type:'top' },
              { name:'左边',icon:'el-icon-caret-left',color:{ color:'#ff467e' },type:'left' },
              { name:'右边',icon:'el-icon-caret-right',color:{ color:'#fd94b4' },type:'right' },
              { name:'底部',icon:'el-icon-caret-bottom',color:{ color:'#f6c7c7' },type:'bottom' },
            ]},
            { name:'固定到任务栏',icon:'el-icon-attract',color:{ color:'#f67280' },type:'fix' },
            { name:'从任务栏取消固定',icon:'el-icon-document-delete',color:{ color:'#c06c84' },type:'unFix' },
            { name:'关闭窗口',icon:'el-icon-switch-button',color:{ color:'#8fbaf3' },type:'close' },
          ],
          rightChildUl: '',  //用于判断底部菜单在右边时，弹出框的位置
          showSecondMenu: true,  //用于判断二级菜单是否显示
        };
    },
    created(){
      if(!this.$store.state.isLockTask){ //判断是否锁定任务栏
        this.menus[1].name = '解锁任务栏';
        this.showSecondMenu = false;
      }
      if( this.isFix === null ){//控制显示固定 和 取消固定
        this.menus.splice(5,3);
      } else {
        if( this.isFix ) this.menus.splice(5,1);
        else this.menus.splice(6,1);
      }
    },
    methods:{
      taskMethods( type ){
        let active = Object.assign({
          showDesk: () => this.$emit('showDesk','hidden'),//关闭桌面所有已显示的弹出层组件,
          position: () => false,
          lockScreen: () => { this.$emit('lockScreen')},
          lockTask: () => {
            let status = this.$store.state.isLockTask;
            if(status){
              document.querySelector('.lockTask').innerHTML = `<i class='el-icon-unlock'></i> 解锁任务栏`;
              this.showSecondMenu = false;
              this.$store.commit('changeLockTaskStatus', false);
            } else {
              document.querySelector('.lockTask').innerHTML = `<i class='el-icon-lock'></i> 锁定任务栏`;
              this.showSecondMenu = true;
              this.$store.commit('changeLockTaskStatus', true);
            }
          },
          top: () => {
            this.$emit('barChangePosition', 'top');
          },
          left: () => {
            this.$emit('barChangePosition', 'left');
          },
          right: () => {
            this.$emit('barChangePosition', 'right');
          },
          bottom: () => {
            this.$emit('barChangePosition', 'bottom');
          },
          fix: () => { 
            if( localStorage.getItem('fixTabs')  === null ){//在local里尚未存或已清除key => fixTabs
              localStorage.setItem('fixTabs',JSON.stringify( this.$store.state.chooseTabName ));
              this.$store.commit('addFixTabs');
            } else {
              this.$store.commit('addFixTabs');
              localStorage.setItem('fixTabs',JSON.stringify(this.$store.state.fixTabs))
            }
          },
          unFix: () => {
            if( localStorage.getItem('fixTabs')  !== null ){
              this.$store.commit('reduceFixTabs',JSON.stringify( this.$store.state.chooseTabName ))
            } 
          },
          close: () => { this.$emit('close',Object.keys(this.$store.state.chooseTabName)) },
          taskManage: () => this.$emit('showDesk','taskManager'),
        });
        active[type]();
      }
    },
   mounted() {
     let footerPosition = this.$store.state.footerPosition;
     if(footerPosition === 'right'){  // 如果底部菜单在右侧时，弹出框二级菜单向左展示
       this.rightChildUl = 'rightChildUl';
     }
   }
}
</script>
<style lang='less' scoped>
  .taskBarMenus {
    & ul li {
      padding: 5px 10px;
      border-bottom: 1px solid #ddd;
      font-size: 12px;
      position: relative;
      &:hover{
        background: #ddd;
        cursor: pointer;
        & div{
          display: block!important;
        }
      }
    }
  }
  .childUl{
    position: absolute;
    width: 60%;
    left:100%;
    top:-83px;
    background: #fff;
  }
  .rightChildUl{
    left: -60%;
  }
</style>