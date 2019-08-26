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
            folderRight: this.attrs.folderRight, //文件夹右键
            fileRight: this.attrs.fileRight, //文件右键
            blankRight:this.attrs.blankRight, //空白右键
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
        'attrs.name': {
            deep: true,
            handler(name){
                let {current, clickTag} = this.attrs;
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
                    case "创建分区":
                        try {
                            this.createPartition();
                        }catch{
                            console.log('方法只在操作的组件中');
                        }
                        break;
                    case "申请增容":
                        this.capacityOperation({clickTag,operate:'add'});
                        break;
                    case "申请减容":
                        this.capacityOperation({clickTag,operate:'reduce'});
                        break;
                    case "创建云端":
                        try {
                            this.createCloud();
                        }catch{
                            console.log('方法只在操作组件中');
                        }
                        break;
                }
            }
        },
    },
    methods: {
        activeCard( data ) { // 单击（文件夹），多选，添加一个边框表示选中
            setTimeout(() => {
                let start = this.startIndex;
                let i = data.i, e = data.e, item = data.item, dataArr=data.dataArr;
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
                    for(let i=0; i< dataArr.length; i++){
                        dataArr[i].active = false;
                    }
                    item.active = true;
                }
                let utilList = this.getUtilList(item, data.clickTag);
                let info = {
                    ...data,
                    utilList
                };
                this.$emit('someMethods',{name:'clickFile',data:info});//点中文件（文件夹），改变工具栏
            }, 300);
        },
        changeDidplay(name, current){ //修改展示方式
            this.displayName = name;
            this.$store.commit('changeDidplay', {name, current});
        },
        openFolder(data) { // 双击文件
            clearTimeout(timer);
            this.$emit('someMethods', {name:'openFolder',data});
        },
        showRightMenu(data) { // 点击空白，显示右键菜单
            let dataArr = data.dataArr;
            for(let i=0; i< dataArr.length; i++){
                dataArr[i].active = false;
            }
            this.$emit('someMethods', {name:'showRightMenu',data});
        },
        clickBlock( tag ) { //点击右侧空白，切换工具栏
            if(tag.e.toElement.className.indexOf('cards') != -1){
                this.$emit('someMethods', {name:'clickBlock',data:tag});
            }
        },
        fileRightMenu( data ){ //右键文件，显示右键菜单
            let item = data.item, dataArr = data.dataArr;
            for(let i=0; i< dataArr.length; i++){
                dataArr[i].active = false;
            }
            item.active = true;
            let list = this.getUtilList(item, data.clickTag);
            let info = {
                ...data,
                list
            };
            this.$emit('someMethods', {name:'showRightMenu',data:info});
        },
        getUtilList(item, clickTag){ //点击文件（文件夹），获取工具栏数据（右键菜单数据）
            var utilList = [];
            if(item.type==='folder'){ //文件夹
                if(clickTag === 'zhiyou'){
                    utilList = this.folderRightZy;
                }else if(clickTag==='mine'){
                    utilList = this.folderRightMine;
                }else{
                    utilList = this.folderRight;
                }
            }else if(item.type==='backups'){
                utilList = this.backupsRight;
            }else if(item.type === 'private'){ //私密空间
                utilList = this.privateSpaceRight;
            }else if(item.type==='file'){  // 文件
                utilList = this.fileRight;
            }
            return utilList;
        }
    },
}