
let tools = {
    /**
     * 时间戳转换
     */
    _time:(time = +new Date()) => {
        var date = new Date(time + 8 * 3600 * 1000);
        return date.toJSON().substr(0, 19).replace('T', ' ').replace(/-/g, '-');
    },
    /**
     * 判断显示主题
     */
    getThemeColor: () => {},
    _restore: (tagName,minHeight,minWidth)  => {//还原
        tagName.style.width = minWidth + "px";
        tagName.style.height = minHeight + "px";
        tagName.style.left = (document.documentElement.clientWidth - tagName.offsetWidth) / 2 + "px";
        tagName.style.top = (document.documentElement.clientHeight - tagName.offsetHeight) / 2 + "px";
    },
    _maxSize:tagName => {//最大化
        tagName.style.top = tagName.style.left = 0;
        tagName.style.width = document.documentElement.clientWidth - 2 + "px";
        tagName.style.height = document.documentElement.clientHeight - 43 + "px";
    },
    
}
export default tools;