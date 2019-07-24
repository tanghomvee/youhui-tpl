/*
*author :cwj
*e-mail: 907727356@qq.com
*/
<template>
    <div class="profile_page">
        <section>
            <section class="profile-number">
                <router-link :to="userInfo&&userInfo.user&&userInfo.user.userId? '/ddbuserinfo' : '/ddblogin'" class="profile-link">
                    <img :src="info.headimgurl" class="privateImage" v-if="info.headimgurl">
                    <span class="privateImage" v-else>
                        <img src="../../images/head.png" />
                    </span>
                    <div class="user-info">
                        <p>{{info.nickname}}</p>
                         <p>
                            <span class="icon-mobile-number">{{info.mobile}}</span>
                        </p>
                    </div>
                </router-link>
            </section>
            <div class="info-data-pay">
            	<router-link to="/pay" tag="li" class="">
               		 <span class="info-data-bottom"><b>充值</b></span>
            	</router-link>
            </div>
            <div class="servers" style="border: none;">
                <div  class="title" style="display: flex;align-items: center;">
                	<div class="v_line">
            		  </div>
                   	 邀请
                </div>
                <div  style="font-size: 13px;margin-left: 25px;">
                 	   已经邀请<span>{{info.recommenderCount||0}}</span>人|  充值<span>{{info.rewardCount||0}}</span>人| 奖励金额<span>{{info.rewardAmt||0}}</span>元
                </div>
            </div>
            <div class="servers" style="border: none;">
                <div  class="title" style="display: flex;align-items: center;">
                	<div class="v_line">
            		</div>
                   	发出邀请<span style="font-size: 13px;">(点击右上角分享给朋友)</span>
                </div>
                <!--<div style="width: 100px;text-align: center;font-size: 14px;">
					<img @click="goShare()" style="height: 30px;;" src="../../images/ddb/weixin.png"/>
					<p>微信好友</p>
				</div>
                <div class="info-data-link" :data-clipboard-text = "copyTxt" type="text" style="font-size: 13px;text-align: center;padding-bottom: 50px;">
                 	<span @click="copy" class="info-data-bottom"><b>复制邀请口令</b></span>
                </div>-->
            </div>
        </section>
        <foot-guide></foot-guide>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>
<script>
import footGuide from 'src/components/footer/footGuide'
import {mapState, mapMutations} from 'vuex'
import dialog from 'src/components/common/dialog';
import loading from 'src/components/common/loading';
import Clipboard from 'clipboard';
export default {
    data(){
        return{
            info:{},
            avatar:"",
            phoneNo:'',
            copyTxt:'https://www.baidu.com/',
            wx_js_config:{},
            redirect_url:"http://www.aibaohe.cn/index.html",
            appId: "",
            scope: "snsapi_base",//snsapi_userinfo   snsapi_base
        }
    },
    async beforeMount(){
        const wx = document.createElement('script');
          wx.type = 'text/javascript';
          wx.async="async";
          wx.src = 'http://res.wx.qq.com/open/js/jweixin-1.2.0.js';
          document.body.appendChild(wx);
    },
    created(){
		  this.getAppId()
    },
    beforeDestroy() {
        loading&&loading.hide();
    },
    components:{
        footGuide,
    },
    computed:{
        ...mapState([
            'userInfo',
        ]),
    },
    mounted(){
        document.title=this.$route.meta.title;
        // loading.show('加载中...');
        setTimeout(() => {
            console.log("this.userInfo=="+JSON.stringify(this.userInfo));
            this.getData();
        }, 100)
    },
    methods:{
    	...mapMutations([
            'GET_USERINFO'
        ]),
        getAppId(){
        	let url = '/youhui/wechat/getAppId'
	          this.axios.get(url).then((ret) =>{
	                // 处理数据
	             console.log("ret==="+JSON.stringify(ret))
	             if (ret.success) {
	             	this.appId = ret.data.appId
	             	console.log("this.appId==="+JSON.stringify(this.appId))
	             } else {
	                dialog.toast(ret.msg);
	             }
	             loading.hide();
	         })
        },
    	getShareData(){
    		let url = '/youhui/wechat/jsapi?url=http://www.aibaohe.cn/index.html'
    		this.axios.get(url).then((ret) =>{
                // 处理数据
                 console.log("ret==="+JSON.stringify(ret))
                 if (ret&&ret.success) {
                 	this.wx_js_config = {
//		                debug: true,
		                appId: ret.data.appid,
		                timestamp: ret.data.timestamp,
		                nonceStr: ret.data.nonceStr,
		                signature: ret.data.signature,
		                jsApiList: [
		                    "onMenuShareTimeline","onMenuShareAppMessage"
		                ]
		            }
                 	let shareUrl = "http://www.aibaohe.cn/index.html?invitCode="+this.info.mobile
                 	shareUrl = shareUrl+"#share"
                 	this.readyWX(shareUrl);
                 } else {
                    dialog.toast(ret.msg);
                    if (ret.msg=="登陆超时") {
                        setTimeout(() => {
//                          this.$router.push({path:'code', query:{from:"user"}});
                            var REDIRECT_URI = this.redirect_url+"#/login";
        				            REDIRECT_URI = encodeURIComponent(REDIRECT_URI);
        				            console.log("REDIRECT_URI==="+REDIRECT_URI)
                   					 location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+this.appId+"&redirect_uri="+REDIRECT_URI+"&response_type=code&scope="+this.scope+"&state=123&connect_redirect=1#wechat_redirect"
                                }, 1000)
                    }
                 }
                 loading.hide();
             })
    	},
        getData(){
            let url = '/youhui/user/myCenter'
            let getData = {
                openid:this.userInfo&&this.userInfo.openid
                // openid:""
            }
            let dataStr = ''; //数据拼接字符串
            Object.keys(getData).forEach(key => {
                dataStr += key + '=' + getData[key] + '&';
            })
            if (dataStr !== '') {
                dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
                url = url + '?' + dataStr;
            }
             this.axios.get(url).then((ret) =>{
                // 处理数据
                 console.log("ret==="+JSON.stringify(ret))
                 if (ret.success) {
                    this.info = ret.data||{}
                    this.phoneNo = this.userInfo&&this.userInfo.phoneNo||""
                    this.getShareData()
                 } else {
                    dialog.toast(ret.msg);
                    if (ret.msg=="登陆超时") {
                        setTimeout(() => {
//                          this.$router.push({path:'code', query:{from:"user"}});
                            var REDIRECT_URI = this.redirect_url+"#/login";
                            REDIRECT_URI = encodeURIComponent(REDIRECT_URI);
                            console.log("REDIRECT_URI==="+REDIRECT_URI)
                             location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+this.appId+"&redirect_uri="+REDIRECT_URI+"&response_type=code&scope="+this.scope+"&state=123&connect_redirect=1#wechat_redirect"
                        }, 1000)
                    }
                 }
                 loading.hide();
             })
        },
        copy(){
            console.log("copy===")
            dialog.toast("复制成功");
            let clipboard = new Clipboard('.info-data-link');
        },
        readyWX(url){
                var shareId = this.userInfo&&this.userInfo.phoneNo? this.userInfo.phoneNo : "";
                var shareUrl = url;
                var shareImg = this.info.logo;
                var descTxt = this.info.title;
                wx.config(this.wx_js_config);
                //处理验证失败的信息
                wx.error((res)=> {
                    dialog.toast(res.errMsg);
                });
                wx.ready((res)=> {
                    console.log("ready==");
                     wx.onMenuShareTimeline({
                          title: "优惠券",
                          desc: descTxt,
                          link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                          imgUrl: shareImg, // 分享图标
                          type: 'link',
                          success: function(res) {
                             dialog.toast("分享成功");
                          },
                          cancel: function(res) {
                           console.log("取消分享:"+res);
                          }
                         });
                       wx.onMenuShareAppMessage({
                            title: '优惠券', // 分享标题
                            desc: descTxt, // 分享描述
                            link: shareUrl,
                            imgUrl: shareImg,
                            type: 'link',
                            success: function (res) {
                                console.log("确认分享:"+res);
                                dialog.toast("分享成功");
                            },
                            cancel: function(res) {
                               console.log("取消分享:"+res);
                            }
                       });
                });
        },
        goShare(){
        	 var shareId = this.userInfo&&this.userInfo.phoneNo? this.userInfo.phoneNo : "";
             var shareUrl = "http://www.aibaohe.cn/index.html?=invitCode="+shareId+"#/code";
             var shareImg = this.info.logo;
             WeixinJSBridge.on('menu:share:appmessage', function(argv){
             	 WeixinJSBridge.invoke('sendAppMessage',{
        					//"appid":appId,
        					"img_url":shareImg,
        					//"img_width":"640",
        					//"img_height":"640",
        					"link":shareUrl,
        					"title": '优惠券', // 分享标题
        	                "desc": '不知道说点什么' // 分享描述
        					});
             })
        },
    },
    watch: {
    }
}

</script>

<style lang="scss" scoped>
   @import 'src/style/mixin';
   @import 'src/style/iconfont';
   .info-data-pay{
   		display: flex;
   		background-color: white;
   		padding-top: 20px;
   		justify-content: center;
   		align-items: center;
        font-size:12px;
        b{
           background:rgb(242,102,102); 
           color:#fff;
           font-size:12px;
           padding:2px 10px;
           border-radius:9px;
        }
    }
    .profile_page{
        p, span{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
        padding-bottom:50px;
    }
    .showImg{
        margin:10px 0px;
        img{
            height:100px;
            width:100%;
            display:block;
        }
    }
    .servers{
        background-color: #fff;
        .title{
          @include sc(.6rem, #000);
          height:60px;
          line-height:60px;
          padding-left:1rem;
          /*border-bottom:1px solid #f1f1f1;*/
        }
        span{
         	color: red;
         }
         
         .info-data-bottom{
            font-size:12px;
            padding-bottom:.453333rem;
            b{
               background:rgb(242,102,102); 
               color:#fff;
               font-size:12px;
               padding:5px 10px;
               border-radius:9px;
            }
        }
    }
   .profile-number{
        //padding-top:1.95rem;
        .profile-link{
            display:block;
            display:flex;
            box-align: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            background:#fff;
            padding: .666667rem .6rem;
            border-bottom:1px solid #f1f1f1;
            .privateImage{
                display:inline-block;
                @include wh(2.5rem,2.5rem);
                border-radius:50%;
                vertical-align:middle;
                img{
                    @include wh(2.5rem,2.5rem);
                }
            }
            .user-info{
                margin-left:.48rem;
                -webkit-box-flex: 1;
                -ms-flex-positive: 1;
                flex-grow: 1;
                p{
                    font-weight:700;
                    @include sc(.8rem,rgb(51,51,51));
                    
                    .icon-mobile-number{
                        display:inline-block;
                        @include sc(.57333rem,rgb(136,136,136));

                    }
                }

            }
            .arrow{
                @include wh(.46667rem,.98rem);
                display:inline-block;
                svg{
                   @include wh(100%,100%);
                }
            }
        }
   }
    .router-slid-enter-active, .router-slid-leave-active {
        transition: all .4s;
    }
    .router-slid-enter, .router-slid-leave-active {
        transform: translate3d(2rem, 0, 0);
        opacity: 0;
    }

    .el-row {
        margin-bottom: 20px;
        &:last-child {
          margin-bottom: 0;
        }
      }
      .el-col {
        border-radius: 4px;
      }
      .bg-purple {
        background: #d3dce6;
      }
      .grid-content {
        border-radius: 4px;
        min-height: 30px;
        text-align:center;
        line-height:30px;
      }
      .v_line{
        height: 18px;
        width: 3px;
        background:linear-gradient(rgb(102,163,255), rgb(214,142,233));
        margin-right: 5px;
        border-radius: 2px;
      }
</style>
