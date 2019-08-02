<template>
  <div class='taskBarMenus fadeInUp animated'>
    <ul>
      <li v-for="(menu,index) in menus" :key="index" @click="taskMethods(menu.type)">
        <i :class="menu.icon"></i> {{menu.name}}
        <div style="display:none">
          <ul v-if="menu.children" class="childUl">
            <li v-for="(child,key) in menu.children" :key="key" @click.stop="taskMethods(child.type)">
              <i :class="child.icon"></i>  {{child.name}}
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
            { name:'锁屏设置',icon:'el-icon-unlock',type:'lockScreen' },
            { name:'锁定任务栏',icon:'el-icon-lock',type:'lockTask' },
            { name:'任务栏设置',icon:'el-icon-setting',type:'position',children:[
              { name:'顶部',icon:'el-icon-caret-top',type:'top' },
              { name:'左边',icon:'el-icon-caret-left',type:'left' },
              { name:'右边',icon:'el-icon-caret-right',type:'right' },
              { name:'底部',icon:'el-icon-caret-bottom',type:'bottom' },
            ]},
            { name:'固定到任务栏',icon:'el-icon-attract',type:'fix' },
            { name:'从任务栏取消固定',icon:'el-icon-document-delete',type:'unFix' },
            { name:'关闭窗口',icon:'el-icon-switch-button',type:'close' },
          ],
        };
    },
    created(){
      if( this.isFix === null ){//控制显示固定 和 取消固定
        this.menus.splice(3,3);
      } else {
        if( this.isFix ) this.menus.splice(3,1);
        else this.menus.splice(4,1);
      }
    },
    methods:{
      taskMethods( type ){
        let active = Object.assign({
          position: () => false,
          lockScreen: () => console.log( 'lockScreen' ),
          lockTask: () => console.log( 'lockTask' ),
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
        });
        active[type]();
      }
    },
   
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
    top:-55px;
    background: #fff;
  }
</style>