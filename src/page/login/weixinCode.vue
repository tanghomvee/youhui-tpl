/*
*author :cwj
*e-mail: 907727356@qq.com
*/
<template>
    <div class="loginContainer">
        <form class="loginForm" v-if="loginWay">
            <section class="input_container phone_number">
                <input type="number" placeholder="请输入您的手机号" name="phone" maxlength="11" v-model="phoneNumber">
                <button :class="{right_phone_number:rightPhoneNumber}" v-show="!computedTime">获取验证码</button>
                <button v-show="computedTime">已发送({{computedTime}}s)</button>
            </section>
            <section class="input_container">
                <input type="number" placeholder="验证码" name="mobileCode" maxlength="6" v-model="mobileCode">
            </section>
        </form>
       
        <div class="login_container">登录</div>
        <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
       
    </div>
</template>

<script>
    import alertTip from '../../components/common/alertTip'
    import {localapi, proapi, imgBaseUrl} from 'src/config/env'
    import dialog from '../../components/common/dialog';
    import {mapState, mapMutations} from 'vuex'


    export default {
        data(){
            return {
                loginWay: true, //登录方式，默认短信登录
                showPassword: false, // 是否显示密码
                phoneNumber: "", //电话号码
                mobileCode: null, //短信验证码
                computedTime: 0, //倒数记时
                userInfo: null, //获取到的用户信息
                userAccount: null, //用户名
                passWord: null, //密码
                captchaCodeImg: null, //验证码地址
                codeNumber: null, //验证码
                showAlert: false, //显示提示组件
                alertText: null, //提示的内容
                redirect_url:"http://www.aibaohe.cn/index.html",  
                appId: "wx99863997eb87291a",
                scope: "snsapi_base",//snsapi_userinfo   snsapi_base
                invitCode:"",
            }
        },
        created(){
            document.title=this.$route.meta.title;
        },
         mounted(){
         	this.invitCode = this.urlparameter("invitCode");
        	 console.log("this.invitCode==="+this.invitCode)
        	 var dataStr = ''
        	 if(this.$route.query.from){
            	dataStr += "from" + '=' + this.$route.query.from + '&';
            }
        	 if(this.invitCode){
        	 	dataStr += "invitCode" + '=' + this.invitCode + '&';
        	 }
        	 if (dataStr !== '') {
                dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
                this.redirect_url = this.redirect_url + '?' + dataStr;
            }
        	 console.log("this.redirect_url==="+this.redirect_url)
         	var REDIRECT_URI = this.redirect_url+"#/login";  
            REDIRECT_URI = encodeURIComponent(REDIRECT_URI);  
            console.log("REDIRECT_URI==="+REDIRECT_URI)
            location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+this.appId+"&redirect_uri="+REDIRECT_URI+"&response_type=code&scope="+this.scope+"&state=123#wechat_redirect"
         },
        components: {
            alertTip,
        },
        computed: {
            //判断手机号码
            rightPhoneNumber: function (){
                return /^1\d{10}$/gi.test(this.phoneNumber)
            }
        },
        methods: {
            ...mapMutations([
                'RECORD_USERINFO',
            ]),
            urlparameter(paras) {
	          var url = location.href;
	          console.log("url=" + url) 
	          var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
	          var paraObj = {};
	          var j="";
	          for(var i = 0;j = paraString[i]; i++) {
	            paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
	          }
	          var returnValue = paraObj[paras.toLowerCase()];
	          if(typeof(returnValue) == "undefined") {
	            return "";
	          } else {
	            return returnValue;
	          }
	        },	
        }
    }

</script>

<style lang="scss" scoped>
    @import '../../style/mixin';

    .loginContainer{
        padding-top: 1.95rem;
        p, span, input{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
    }
    .change_login{
        position: absolute;
        @include ct;
        right: 0.75rem;
        @include sc(.7rem, #fff);
    }

    .loginForm{
        background-color: #fff;
        margin-top: .6rem;
        .input_container{
            display: flex;
            justify-content: space-between;
            padding: .6rem .8rem;
            border-bottom: 1px solid #f1f1f1;
            input{
                @include sc(.7rem, #666);
                flex:1;
                border: none;
                outline: none;
            }
            button{
                @include sc(.65rem, #fff);
                font-family: Helvetica Neue,Tahoma,Arial;
                padding: .28rem .4rem;
                border: 1px;
                border-radius: 0.15rem;
                background-color: rgb(205,205,205); 
            }
            .right_phone_number{
                background-color: rgb(88,160,255);
            }
        }
        .phone_number{
            padding: .3rem .8rem;
        }
        .captcha_code_container{
            height: 2.2rem;
            .img_change_img{
                display: flex;
                align-items: center;
                img{
                    @include wh(3.5rem, 1.5rem);
                    margin-right: .2rem;
                }
                .change_img{
                    display: flex;
                    flex-direction: 'column';
                    flex-wrap: wrap;
                    width: 2rem;
                    justify-content: center;
                    p{
                        @include sc(.55rem, #666);
                    }
                    p:nth-of-type(2){
                        color: #3b95e9;
                        margin-top: .2rem;
                    }
                }
            }
        }
    }
    .login_container{
        margin: 0 .5rem 1rem;
        margin-top: 5rem;
        @include sc(.7rem, #fff);
        background-color:  rgb(88,160,255);
        padding: .5rem 0;
        border: 1px;
        border-radius: 0.15rem;
        text-align: center;
    }
    .button_switch{
        background-color: #ccc;
        display: flex;
        justify-content: center;
        @include wh(2rem, .7rem);
        padding: 0 .2rem;
        border: 1px;
        border-radius: 0.5rem;
        position: relative;
        .circel_button{
            transition: all .3s;
            position: absolute;
            top: -0.2rem;
            z-index: 1;
            left: -0.3rem;
            @include wh(1.2rem, 1.2rem);
            box-shadow: 0 0.026667rem 0.053333rem 0 rgba(0,0,0,.1);
            background-color: #f1f1f1;
            border-radius: 50%;
        }
        .trans_to_right{
            transform: translateX(1.3rem);
        }
        span{
            @include sc(.45rem, #fff);
            transform: translateY(.05rem);
            line-height: .6rem;
        }
        span:nth-of-type(2){
            transform: translateY(-.08rem);
        }
    }
    .change_to_text{
        background-color: #4cd964;
    }
</style>
