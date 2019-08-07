export const themeMixin = {
    data() {
        return {
            themeColorName: '',
            themeColorStyle: {}
        }
    },
    computed: {
        storeChange() {
           return this.$store.state.themeColor;
        }
    },
    watch: {
        storeChange( val ) {
          this.themeColorName = this._getThemeColor(this, val.themeColorName, val.themeColorStyle).className;
          this.themeColorStyle = this._getThemeColor(this, val.themeColorName, val.themeColorStyle).style;
        }
    },
    created() {
        this.themeColorName = this._getThemeColor(this, this.themeColorName, this.themeColorStyle).className;
        this.themeColorStyle = this._getThemeColor(this, this.themeColorName, this.themeColorStyle).style;
    },
    mounted() {
        // if(this.$refs.rightContent){
        //     let rightContentHeight = this.$refs.rightContent.$el.offsetHeight;
        //     this.$refs.rightContent.$el.previousSibling.style.height = rightContentHeight + 'px';
        // }
    }
}