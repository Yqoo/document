/*
我的云端：不同组件，相同工具栏操作
*/
export const myCloudUtilMixin = {
    props: ['attrs'],
    data(){
        return {
            size: {width: '60%'}, // 图标大小
            isDisplay: true, // true：行展示  false：列展示
        }
    },
    computed: {
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
        changeDidplay(name, current){
            this.$store.commit('changeDidplay', {name,current});
        }
    },
    mounted : {
        displayShow(){ //判断是行展示还是列展示
            //
        }
    }
}