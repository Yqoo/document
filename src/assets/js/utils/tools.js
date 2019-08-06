
let tools = {
    /**
     * 时间戳转换
     */
    _time:(time = +new Date()) => {
        var date = new Date(time + 8 * 3600 * 1000);
        return date.toJSON().substr(0, 19).replace('T', ' ').replace(/-/g, '/');
    },
    /**
     * 判断显示主题
     */
    getThemeColor: (_this) => {
        let themeColor = _this.$store.state.themeColor;
        let className = '', style = {};
        if( typeof themeColor == 'string' && (themeColor.constructor == String) ){
            className = themeColor;
        } else if(themeColor.type === '1'){
            className = '';
            style = {
            background: `-webkit-linear-gradient(${themeColor.edg}deg, ${themeColor.startColor}, ${themeColor.endColor})`,
            background: `-o-linear-gradient(${themeColor.edg}deg, ${themeColor.startColor}, ${themeColor.endColor})`,
            background: `-moz-linear-gradient(${themeColor.edg}deg, ${themeColor.startColor}, ${themeColor.endColor})`,
            background: `linear-gradient(${themeColor.edg}deg, ${themeColor.startColor}, ${themeColor.endColor})`,
            color: themeColor.fontColor,
            height: '100%'
            }
        }else {
            className = '';
            style = {
                background: `url(${themeColor.imgSrc}) 0% 0% /cover`,
                height: '100%'
            }
        }
        return {className, style};
    },
    _restore: (tagName,minHeight,minWidth)  => {//还原
        tagName.style.width = minWidth + "px";
        tagName.style.height = minHeight + "px";
        tagName.style.left = (document.documentElement.clientWidth - tagName.offsetWidth) / 2 + "px";
        tagName.style.top = (document.documentElement.clientHeight - tagName.offsetHeight) / 2 + "px";
        if(tagName.querySelector('.el-menu')){  //判断左侧菜单栏的高度
            let titleHeight = tagName.querySelector('.boxTools').offsetHeight;
            tagName.querySelector('.el-menu').style.height = (minHeight - titleHeight) + 'px';
        }
    },
    _maxSize:tagName => {//最大化
        tagName.style.top = tagName.style.left = 0;
        tagName.style.width = document.documentElement.clientWidth - 2 + "px";
        tagName.style.height = document.documentElement.clientHeight - 43 + "px";
        if(tagName.querySelector('.el-menu')){  //判断左侧菜单栏的高度
            let titleHeight = tagName.querySelector('.boxTools').offsetHeight;
            let contentHeight = tagName.offsetHeight;
            tagName.querySelector('.el-menu').style.height = (contentHeight - titleHeight)+'px';
        }
    },
    /*
     *在弹框中获取点击的位置 
     */
    getPosition: ( e )=>{
        let clientX = e.clientX;
        let clientY = e.clientY;
        let box = document.querySelector('.themeBox');
        let top = clientY - box.offsetTop;
        let left = clientX - box.offsetLeft;
        return {top, left}
    }
}
export default tools;