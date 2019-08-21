/*
我的云端：不同组件，相同工具栏操作
*/

var timer= null; // 用于判断单击还是双击事件
export const myCloudUtilMixin = {
    props: ['attrs', 'current'],
    data(){
        return {
            size: {width: '60%'}, // 图标大小
            displayName: '行展示', // 行展示 && 列展示
            startIndex: 0, //记录选中的文件位置
        }
    },
    computed: {
        _isClick() { //用于判断点击的某一块内容
            return this.attrs.isClick;
        },
    },
    created () {
        //判断组件是行展示还是列展示
      let curr = this.current;
        if(curr=== undefined){
          curr = 'iCloudIndex';
        }
        if(this.$store.state.displayMode[curr] != undefined){
          this.displayName =  this.$store.state.displayMode[curr];
        }else {
          this.displayName = '行展示';
        }
    },
    watch: {
        $props: {
            deep: true,
            handler() {
                let { name, current } = this.attrs;
                switch( name ){
                    case '小图标':
                        this.size = {width: '40%'};break;
                    case '中图标':
                        this.size = {width: '60%'};break;
                    case '大图标':
                        this.size = {width: '70%'};break;
                    case '行展示':
                        this.changeDidplay(name, current);
                        break;
                    case '列展示':
                        this.changeDidplay(name, current);
                        break;
                }
            }
        },
    },
    methods: {
        activeCard(e, item, i, dataArr) { // 单击（文件夹），多选，添加一个边框表示选中
            let start = this.startIndex;
            this.startIndex = i;
            let end = i;
            if(e.ctrlKey){ // ctrl + 左键 多选
                item.active = true;
            }else if(e.shiftKey){ //  shift + 左键多选
                if( start > end ){
                    let middle = start;
                    start = end;
                    end = middle;
                }
                for(let j=start; j<=end; j++){
                    dataArr[j].active = true;
                }
            }else { // 单击选中
                clearTimeout(timer);
                timer = setTimeout(() => {
                    for(let i=0; i< dataArr.length; i++){
                        dataArr[i].active = false;
                    }
                    item.active = true;
                }, 200); 
            }
        },
        changeDidplay(name, current){ //修改展示方式
            this.displayName = name;
            this.$store.commit('changeDidplay', {name, current});
        },
        openFolder(component) { // 双击文件
            clearTimeout(timer);
            this.$emit('openFolder', component);
        },
        showRightMenu(e, list) { // 显示右键菜单
            this.$emit('showRightMenu', {e, list});
        },
    },
}