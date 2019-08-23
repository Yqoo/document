export const myCloudMixin = {
    props: ['attrs'],
    data(){
        return {
            capacityVisible: false, //控制增减容量弹框的显示
            capacityData: '',  // 判断哪一块内容，增减容量的数据
            clickTag: 'zhiyou',  //选中的模块名称
        }
    },
    computed: {
        _isClick() { //用于判断点击的某一块内容
            return this.attrs.isClick;
        },
    },
    methods: {
        capacityOperation( data ){ // 申请增容，申请减容
            // console.log(data);
            this.capacityData = data;
            this.capacityVisible = true;
        },
        closeCapacityForm(){ //关闭申请增容减容的弹框
            this.capacityVisible = false;
        }
    }
}