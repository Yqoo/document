
let tools = {
    /**
     * 时间戳转换
     */
    _time:(time = +new Date()) => {
        var date = new Date(time + 8 * 3600 * 1000);
        return date.toJSON().substr(0, 19).replace('T', ' ').replace(/-/g, '-');
    },
}
export default tools;