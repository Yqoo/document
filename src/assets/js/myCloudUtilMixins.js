/*
我的云端：不同组件相同工具栏操作
*/
export const myCloudUtilMixin = {
    props: ['attrs'],
    data(){
        return {
            size: {width: '60%'},
        }
    },
    computed: {
    },
    watch: {
        $props: {
            deep: true,
            handler() {
                let { name } = this.attrs;
                switch( name ){
                    case '小图标':
                        this.size = {width: '40%'};break;
                    case '中图标':
                        this.size = {width: '60%'};break;
                    case '大图标':
                        this.size = {width: '70%'};break;
                }
            }
        },
    },
    methods: {
        //
    }
}