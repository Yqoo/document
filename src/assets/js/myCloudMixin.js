export const myCloudMixin = {
    data() {
        return {}
    },
    props: ['attrs'],
    computed: {
        _isClick() { //用于判断点击的某一块内容
            return this.attrs.isClick;
        },
    },
    data(){
        return {
            size: {width: '60%'},
        }
    },
    methods: {
        //点击右侧内容，切换工具栏
        clickBlock( tag ) {
            this.$emit('changeUtils', tag);
        },
        //单击（文件夹）时，有一个边框
        activeCard(item, dataArr) {
            for(let i=0; i< dataArr.length; i++){
                dataArr[i].active = false;
            }
            item.active = true;
        }
    }
}