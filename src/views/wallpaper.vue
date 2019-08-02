<template>
  <div class='wallpaper'>
    <div class="dragDiv">
      <i class="el-icon-eleme"></i> 
      <span>壁纸设置</span>
    </div>
    <div class="defaultWallpaper">
      <i class="el-icon-star-on"></i>
      <span>默认壁纸</span>
      <el-row class="defaultTheme">
        <el-col v-for="(fit, index) in defaultWallpapers" :span="4" :key="fit.imgName" :offset="index > 0 ? 1 : 0">
          <el-image
            style="width: 100px; height: 100px"
            :src="fit.imgUrl"
            :alt="fit.imgName"
            :title="fit.imgName"
            @click="changeDesktopImg(fit.imgUrl)"
            fit="cover"></el-image>
        </el-col>
      </el-row>
    </div>
    <div>
      <i class="el-icon-magic-stick"></i>
      <span>增加壁纸</span>
      <el-row>
        <el-upload
          action="#"
          list-type="picture-card"
          accept=".JPG,.JPEG,.PNG,.GIF,.SVG,.WEBP,.BMP"
          :on-success="wallpaperSuccess"
          :auto-upload="false">
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{file}">
              <img
                class="el-upload-list__item-thumbnail"
                :src="file.url" alt=""
              >
              <span class="el-upload-list__item-actions">
                <span
                  class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(file)"
                >
                  <i class="el-icon-zoom-in" title="查看"></i>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleDownload(file)"
                >
                  <i class="el-icon-loading" title="设置"></i>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <i class="el-icon-delete" title="删除"></i>
                </span>
              </span>
            </div>
        </el-upload>
      </el-row>
    </div>
    <div>
      <i class="el-icon-edit"></i>
      <span>自定义壁纸</span>
      <div>
        <el-input placeholder="" v-model="customImg" clearable size="small" :readonly="true">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <el-button size="small">保存</el-button>
    </div>
  </div>
</template>

<script>

export default {
  name:'wallpaper',
  data() {
      return {
        disabled: false,
        customImg: '',  //自定义壁纸的路径
        defaultWallpapers: [ //默认壁纸
          {
            imgName: '哆啦A梦',
            imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564663993200&di=c253bba59f5ecf3b940551af3246f3a7&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201506%2F17%2F20150617195505_Ykh5A.jpeg'
          },
          {
            imgName: '埃菲尔铁塔',
            imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564663993196&di=52b58bcae67ad2fa1f988ff3f55477ba&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fblog%2F201403%2F20%2F20140320120519_M2nYE.jpeg'
          },
          {
            imgName: 'Think',
            imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564663993195&di=e31cb7751985044fbcc7aa99b7959d17&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201410%2F24%2F20141024161607_niLhj.jpeg'
          },
          {
            imgName: '夕阳',
            imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564726088741&di=b751fb3ace71c151936bb62013338667&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fblog%2F201405%2F28%2F20140528131055_erJvP.jpeg'
          }
        ],
        selectWallpaper: [],  // 增加的壁纸
      };
  },
  methods: {
    handleRemove(file) {  // 删除壁纸
        console.log(file);
    },
    wallpaperSuccess(res, file) {  // 上传壁纸成功后
      console.log(file)
    },
    handlePictureCardPreview(file) {  //查看壁纸
      const h = this.$createElement;
      this.$msgbox({
        title:'壁纸查看',
        message: h('div', {style: `background: url(${file.url}) 0% 0% /cover no-repeat;height: 300px;color: transparent;`},'1'),
        showCancelButton: false,
        showConfirmButton: false,
        callback: action => {
          return false;
        }
      });
    },
    handleDownload(file) {  // 设置壁纸
      this.$store.commit('changeDesktopImg', file.url);
    },
    changeDesktopImg( url ){ // 设置默认壁纸
      this.$store.commit('changeDesktopImg', url);
    }
  }
}
</script>
<style lang='less' scoped>
  .wallpaper{
    & > div {
      margin-top: 2%;
      padding-left: 10px;
      & > span{
        font-size: 12px;
        padding-left: 5px;
      }
    }
    & > div:nth-of-type(1) {
      margin-top: 0;
    }
    & > div:nth-of-type(3) {
      & /deep/ .el-upload-list{
        & > li{
          margin: 0 8px -8px 0;
          & > div{
            height: 100%;
            & > img{
              object-fit: contain;
            }
          }
        }
      }
    }
    & > div:nth-of-type(4){
      width: 80%;
      & > .el-button{
        margin: 2% 0 2% 0;
      }
    }
  }
  .dragDiv {
    & > span {
      font-size: 12px;
      vertical-align: text-bottom;
      margin-left: 5px;
    }
  }
  .image {
    width: 100%;
    display: block;
  }
  
</style>