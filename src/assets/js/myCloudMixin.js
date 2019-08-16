export const myCloudMixin = {
    props: ['attrs'],
    data(){
        return {
        }
    },
    computed: {
        _isClick() { //用于判断点击的某一块内容
            return this.attrs.isClick;
        },
    },
    watch: {
    },
    methods: {
        //点击右侧内容，切换工具栏
        clickBlock( tag ) {
            this.$emit('changeUtils', tag);
        }
    }
}