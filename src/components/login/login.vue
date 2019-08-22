<!--
 * @Date: 2019-07-23 17:54:07
 * @LastEditors: Yqoo
 * @LastEditTime: 2019-08-22 17:43:37
 * @Desc: 
 -->
<template>
    <div class="login">
        <div class="formBox">
            <div class="rightTopIcon">
                <el-button  v-if="isPwd" size="mini" plain @click="changeLoginStyle"><i class="el-icon-mobile-phone"></i> 手机登录</el-button>
                <el-button  v-else size="mini" plain @click="changeLoginStyle"><i class="el-icon-user"></i> 用户登录</el-button>
            </div>
            <div>
                <img src="@/assets/image/icons/deskIcons/clound.png" class="imgIcon">
                <span class="imgFont" style="color:#409EFF;font-size:40px;padding-left:3px;">挚友ICloud</span>
            </div>
            <el-form ref="pwdform" :model="pwdform" :rules="pwdRules" size="small" v-show="isPwd" label-width="20px">
                <el-form-item label="" prop="username">
                    <el-input clearable placeholder="请输入用户名" v-model="pwdform.username">
                        <i slot="prefix" class="el-input__icon el-icon-user" style="color:#409EFF"></i>
                    </el-input>
                </el-form-item>
                <el-form-item label="" prop="pwd">
                    <el-input  type="password" v-model="pwdform.pwd" placeholder="请输入密码">
                         <i slot="prefix" class="el-input__icon el-icon-lock" style="color:#409EFF"></i>
                        <el-button slot="append" style="color:#409EFF" @click.prevent="submitForm('pwdform')"><i class="el-icon-finished"></i> 登录</el-button> 
                    </el-input>
                    <el-button type="text"><i class="el-icon-question" style="margin-top:5px"></i><span style="font-size:12px;">忘记密码</span></el-button>
                </el-form-item>
            </el-form>
            <el-form ref="phoneform" :model="phoneform" :rules="phoneRules" size="small" v-show="!isPwd" label-width="20px">
                <el-form-item label="" prop="phone">
                    <el-input clearable placeholder="请输入手机号" v-model="phoneform.phone">
                        <i slot="prefix" class="el-input__icon el-icon-mobile-phone" style="color:#409EFF"></i>
                    </el-input>
                </el-form-item>
                <el-form-item label="" prop="code">
                    <el-input placeholder='请输入验证码' v-model="phoneform.code">
                        <i slot="prefix" class="el-input__icon el-icon-lock" style="color:#409EFF"></i>
                        <el-button slot="append" style="color:#409EFF">发送验证码</el-button>  
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button  type="primary" style="width:100%" @click.prevent="submitForm('phoneform')">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
        <canvas id="canvas" :style="{height: screenHeight+'px'}"></canvas>
    </div>
</template>
<script>
import qs from 'qs';
export default {
    name: 'login',
    data(){
        let checkPhone = ( rule, value, callback ) => {
           if( value === ''){
               callback( new Error('请输入手机号') )
           } else {
               let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
               if( reg.test( value )){
                   callback()
               } else{
                   callback( new Error('请输入正确的手机号码'))
               }
           }
        };
        let checkCode = ( rule, value, callback ) => {
            if( value === '' ){
                callback( new Error('请输入验证码'))
            } else {
                //...check后端返回的code
            }
        };
        return {
            pwdform:{
                username:'',
                pwd:'',
            },
            phoneform:{
                phone:'',
                code:''
            },
            pwdRules:{
                username:[
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                pwd:[
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, message: '长度需大于6个字符', trigger: 'blur' }
                ]
            },
            phoneRules:{
                phone:[
                    { validator: checkPhone,trigger:'blur' },
                ],
                code:[
                    { validator: checkCode,trigger:'blur' },
                ]
            },
            isPwd: true,
            screenHeight: window.innerHeight // 屏幕高度
        }
    },
    methods:{
        submitForm( formName ){
            let type = formName === 'pwdform'? 'zh':'ph';
            this.$refs[formName].validate( valid => {
                if( valid ){
                let params = {
                account:this.pwdform.username,
                password:this.pwdform.pwd,
                type,
                }
                this.axios.post('/login',qs.stringify(params)).then( res => {
                     switch ( res.data.code ) {
                        case 200:
                            this.$message({ message:res.data.desc,type:'success' });
                            let curTime = new Date().getTime();
                            localStorage.setItem('loginToken',JSON.stringify({is:true,time:curTime}));
                            this.$router.push({ path:'/' })
                            break;
                        default:
                            this.$message({ message:res.data.desc,type:'error'});
                            break;
                    }
                }) .catch( err => console.log( err ))
                } else {
                this.$message({
                    message: '请填写完整登录信息',
                    type: 'error'
                });
                }
             })
             return false;
        },
        changeLoginStyle(){
            this.isPwd = !this.isPwd;
        },
        addClass (val) {
            document.getElementById(val).style.color = 'black'
        },
        deleteClass (val) {
            document.getElementById(val).style.color = ''
        }
    },
    mounted () {
        let _this = this
        window.onresize = function () { // 定义窗口大小变更通知事件
            _this.screenHeight = document.documentElement.clientHeight // 窗口高度
        }
        let canvas = document.getElementById('canvas')
        let ctx = canvas.getContext('2d')
        let w = canvas.width = window.innerWidth
        let h = canvas.height = window.innerHeight
        let hue = 217
        let stars = []
        let count = 0
        let maxStars = 1300 // 星星数量
        let canvas2 = document.createElement('canvas')
        let ctx2 = canvas2.getContext('2d')
        canvas2.width = 100
        canvas2.height = 100
        let half = canvas2.width / 2
        let gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half)
        gradient2.addColorStop(0.025, '#CCC')
        gradient2.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)')
        gradient2.addColorStop(0.25, 'hsl(' + hue + ', 64%, 6%)')
        gradient2.addColorStop(1, 'transparent')

        ctx2.fillStyle = gradient2
        ctx2.beginPath()
        ctx2.arc(half, half, half, 0, Math.PI * 2)
        ctx2.fill()
        function random (min, max) {
            if (arguments.length < 2) {
                max = min
                min = 0
            }
            if (min > max) {
                let hold = max
                max = min
                min = hold
            }
            return Math.floor(Math.random() * (max - min + 1)) + min
        }
        function maxOrbit (x, y) {
            let max = Math.max(x, y)
            let diameter = Math.round(Math.sqrt(max * max + max * max))
            return diameter / 2
            // 星星移动范围，值越大范围越小，
        }
        let Star = function () {
            this.orbitRadius = random(maxOrbit(w, h))
            this.radius = random(60, this.orbitRadius) / 8
            // 星星大小
            this.orbitX = w / 2
            this.orbitY = h / 2
            this.timePassed = random(0, maxStars)
            this.speed = random(this.orbitRadius) / 280000
            // 星星移动速度
            this.alpha = random(2, 10) / 10
            count++
            stars[count] = this
        }
        Star.prototype.draw = function () {
            let x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX
            let y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY
            let twinkle = random(10)

            if (twinkle === 1 && this.alpha > 0) {
                this.alpha -= 0.05
            } else if (twinkle === 2 && this.alpha < 1) {
                this.alpha += 0.05
            }
            ctx.globalAlpha = this.alpha
            ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius)
            this.timePassed += this.speed
        }
        for (let i = 0; i < maxStars; i++) {
        /* eslint-disable no-new */
            new Star()
        }
        function animation () {
            ctx.globalCompositeOperation = 'source-over'
            ctx.globalAlpha = 0.5 // 尾巴
            ctx.fillStyle = 'hsla(' + hue + ', 64%, 6%, 2)'
            ctx.fillRect(0, 0, w, h)

            ctx.globalCompositeOperation = 'lighter'
            for (let i = 1, l = stars.length; i < l; i++) {
                stars[i].draw()
        };
            window.requestAnimationFrame(animation)
        }
        animation()
  },
}
</script>
<style lang="less">
    @baseColor: #c4bfc2;
    .login{
        height: 100vh;    
        overflow-y: hidden;   
    }
    .formBox {
        width: 500px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
       /*  border: 1px solid @baseColor; */
        padding: 50px;
        /* border-radius: 5px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); */
    }
    .formBox>div:first-child {
        margin-bottom: 30px;
    }
    .imgIcon {
        vertical-align: middle;
    }
    .imgFont {
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
        font-size: 20px;
    }
    .rightTopIcon {
        position: absolute;
        right: 53px;
        top: 90px;;
        font-size: 12px;
        color: #409EFF;
    }
    .el-input__inner{
        border-radius: 30px;
        color:#409EFF;
    }
    /* .el-input-group>.el-input__inner{
        height: 38px;
    } */
    .el-input-group__append{
        border-top-right-radius: 30px;
        border-bottom-right-radius: 30px;
    }
</style>
