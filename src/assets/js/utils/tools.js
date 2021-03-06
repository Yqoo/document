
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
            }
        }else if(themeColor.type === '2'){
            className = '';
            style = {
                background: themeColor.color,
                color: themeColor.fontColor
            }
        } else {
            className = '';
            style = {
                background: `url(${themeColor.imgSrc}) 0% 0% /cover`,
            }
        }
        return {className, style};
    },
    _restore: (tagName,minHeight,minWidth)  => {//还原
        tagName.style.width = minWidth + "px";
        tagName.style.height = minHeight + "px";
        tagName.style.left = (document.documentElement.clientWidth - tagName.offsetWidth) / 2 + "px";
        tagName.style.top = (document.documentElement.clientHeight - tagName.offsetHeight) / 2 + "px";
        // 弹框高度还原
        try {//不是所有组件下都有 rightContent
            let rightContent = tagName.querySelector('.rightContent');
            let cutHeight = 0;
            if(tagName.className.indexOf('myCloud') > -1){
                // 173：弹框标题高度+工具栏高度+边框
                cutHeight = 173;
            }else {
                cutHeight = 58;  //看情况分析
            }
            rightContent.style.height = minHeight - cutHeight + 'px';
        } catch (error) {
            //...
        }
        
    },
    _maxSize:tagName => {//最大化
        tagName.style.top = tagName.style.left = 0;
        tagName.style.width = document.documentElement.clientWidth - 2 + "px";
        tagName.style.height = document.documentElement.clientHeight - 43 + "px";
        // 弹框高度变化
        try {
            let rightContent = tagName.querySelector('.rightContent');
            let cutHeight = 0;
            if(tagName.className.indexOf('myCloud') > -1){
                // 174：弹框标题高度+工具栏高度+边框
                cutHeight = 174;
            }else {
                // 弹框标题高度35 + 边框20
                cutHeight = 55;
            }
            rightContent.style.height = document.documentElement.clientHeight - cutHeight + 'px';
        } catch (error) {
            //...
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