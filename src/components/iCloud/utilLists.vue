<!-- 我的云端：工具栏 -->
<template>
  <div class='utilLists'>
      <topUtil :lists="active[utilName]"></topUtil>
  </div>
</template>

<script>
import topUtil from '@/components/iCloud/topUtil';
export default {
  props:{
      utilName: {
          type: String,
          default: 'myCloud'
      } 
  },
  components:{
      topUtil,
  },
  data () {
    return {
        active: {
            myCloud: [
                {
                    iconImg: require('@/assets/image/icons/fileIcons/copy.png'),
                    iconTitle: '复制',
                    isRightBorder: false
                },
                {
                    iconImg: require('@/assets/image/icons/fileIcons/paste.png'),
                    iconTitle: '粘贴',
                    isRightBorder: false,
                },
                {
                    iconImg: require('@/assets/image/icons/fileIcons/rename.png'),
                    iconTitle: '重命名',
                    isRightBorder: false
                },
                {
                    iconImg: require('@/assets/image/icons/fileIcons/recycle.png'),
                    iconTitle: '回收站',
                    isRightBorder: true
                },
                {
                    iconImg: require('@/assets/image/icons/fileIcons/addC.png'),
                    iconTitle: '申请增容',
                    isRightBorder: false
                },
                {
                    iconImg: require('@/assets/image/icons/fileIcons/reduceC.png'),
                    iconTitle: '申请减容',
                    isRightBorder: true
                },
                {
                    iconImg: require('@/assets/image/icons/fileIcons/check.png'),
                    iconTitle: '查看',
                    isRightBorder: false,
                    secondMenu: [
                        {iconImg: require('@/assets/image/icons/fileIcons/compress.png'),iconTitle: '压缩压缩'},
                    ]
                },
                {
                    iconImg: require('@/assets/image/icons/fileIcons/array.png'),
                    iconTitle: '排列',
                    isRightBorder: true,
                    secondMenu: [
                        {iconImg: require('@/assets/image/icons/fileIcons/compress.png'),iconTitle: '压缩压缩'},
                    ]
                },
            ]
        },
    };
  },
  methods: {}
}

</script>
<style lang='less' scoped>
</style>