<!--
 * @Date: 2019-08-01 10:55:48
 * @LastEditors: Yqoo
 * @LastEditTime: 2019-08-10 14:14:22
 -->
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
      <a href="javascript:void(0)" class="customIcon" @click="randomWallpaper">
        <img :src="customIcon" alt="自定义图标">
      </a>
      <!-- <div>
        <el-input placeholder="" clearable size="small" :readonly="true">
          <el-button @click="randomWallpaper" slot="append" icon="el-icon-loading"></el-button>
        </el-input>
      </div> -->
      <el-button size="small">保存</el-button>
    </div>
  </div>
</template>

<script>
import { request } from 'http';
import customIcon from '@/assets/image/icons/deskIcons/fengche.png';
export default {
  name:'wallpaper',
  data() {
      return {
        disabled: false,
        customIcon: customIcon, //自定义壁纸图标
        defaultWallpapers: [ //默认壁纸
          {
            imgName: '哆啦A梦',
            imgUrl: require('@/assets/image/bg/defaultImg/dlam.jpg')
          },
          {
            imgName: '埃菲尔铁塔',
            imgUrl: require('@/assets/image/bg/defaultImg/afe.jpg')
          },
          {
            imgName: 'Think',
            imgUrl: require('@/assets/image/bg/defaultImg/think.jpg')
          },
          {
            imgName: '夕阳',
            imgUrl: require('@/assets/image/bg/defaultImg/rl.jpg')
          }
        ],
        selectWallpaper: [],  // 增加的壁纸
        randomWallpaperImg: [ // 随机壁纸
          {imgName: '笑脸', imgUrl: require('@/assets/image/bg/randomImg/笑脸_1.jpg')},
          {imgName: '灯塔', imgUrl: require('@/assets/image/bg/randomImg/灯塔_2.jpg')},
          {imgName: '泡芙小姐', imgUrl: require('@/assets/image/bg/randomImg/泡芙小姐_3.jpg')},
          {imgName: '晚安', imgUrl: require('@/assets/image/bg/randomImg/晚安_4.jpg')},
          {imgName: '猫咪', imgUrl: require('@/assets/image/bg/randomImg/猫咪_5.jpg')},
          {imgName: '星空', imgUrl: require('@/assets/image/bg/randomImg/星空_6.jpg')},
          {imgName: '插画', imgUrl: require('@/assets/image/bg/randomImg/插画_7.jpg')},
          {imgName: '兔子', imgUrl: require('@/assets/image/bg/randomImg/兔子_8.jpg')},
          {imgName: '减肥', imgUrl: require('@/assets/image/bg/randomImg/减肥_9.jpg')},
          {imgName: '光', imgUrl: require('@/assets/image/bg/randomImg/光_10.jpg')},
        ],
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
    // console.log(file.url)
      this.$store.commit('changeDesktopImg', file.url);
    },
    changeDesktopImg( url ){ // 设置默认壁纸
      this.$store.commit('changeDesktopImg', url);
    },
    randomWallpaper() {
      let index = Math.floor(Math.random() * 10);
      // this.customImg = this.randomWallpaperImg[index].imgName;
      this.$store.commit('changeDesktopImg', this.randomWallpaperImg[index].imgUrl);
    }
  }
}
</script>
<style lang='less' scoped>
  .wallpaper{
    height: 550px;
    overflow-y:auto;
    overflow-x: hidden;
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
      &>.customIcon{
        display: inline-block;
        width: 25px;
        height: 25px;
        vertical-align: middle;
        animation: rotating 2s linear infinite;
        margin-left: 10px;
        & > img{
          width: 100%;
        }
      }
      & > .el-button{
        margin: 2% 0 2% 0;
        opacity: 0;
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
  @keyframes rotating{
    from {
      transform: rotate(0)
    }
    to {
      transform: rotate(360deg)
    }
  }
  
</style>