export const myCloudMixin = {
    data() {
        return {}
    },
    methods: {
        //点击右侧内容，切换工具栏
        clickBlock( tag ) {
            this.$emit('changeUtils', tag);
        }
    }
}