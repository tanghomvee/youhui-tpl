/*
*author :cwj
*e-mail: 907727356@qq.com
*/
<template>
	<div id="body">
			<div class="pay_money">
				金额：<span style="color: red;">{{money}}</span>
			</div>
			<div class="info-data-pay">
               	<span @click="pay()" class="info-data-bottom"><b>充值</b></span>
            </div>
		</div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import dialog from 'src/components/common/dialog';
import loading from 'src/components/common/loading';
export default{
	data(){
		return{
			money:0,
			payInfo:{},
			redirect_url:"http://www.aibaohe.cn/index.html",
            appId: "wx8bb9c4454dd0a7ae",
            scope: "snsapi_base",
//			payInfo:{"timeStamp":"1555741284233","package":"prepay_id=wx20142124184506e255e771273193798417","paySign":"147EE766B3DDDEDCD7A79B19FABEFF19","appId":"wx8bb9c4454dd0a7ae","signType":"MD5","nonceStr":"4EeYFOUQvcMIu6Ya3XWNo2HIhVJfA28j"}
		}
	},
	computed:{
        ...mapState([
            'userInfo',
        ]),
    },
	created(){
		document.title=this.$route.meta.title;
		this.getAppId()
		setTimeout(() => {
            console.log("this.userInfo=="+JSON.stringify(this.userInfo));
            this.getMoney()
            this.getPayInfo()
        }, 100)
	},
	methods:{
		getMoney() {
		  let openId = this.userInfo&&this.userInfo.openid||""
		  let url = '/youhui/pay/payInfo?openid='+openId
          this.axios.get(url).then((ret) =>{
                // 处理数据
             console.log("ret==="+JSON.stringify(ret))
             if (ret.success) {
                this.money = ret.data.money||0
             } else {
                dialog.toast(ret.msg);
             }
             loading.hide();
         })
        },
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
        getPayInfo() {
		  let openId = this.userInfo&&this.userInfo.openid||""
		  // openId = "oFfWN1ftvX4BvMn9YvquudRr9RZA"
		  let url = '/youhui/pay/createCharge?openid='+openId
          this.axios.get(url).then((ret) =>{
                // 处理数据
             console.log("ret==="+JSON.stringify(ret))
             if (ret.success) {
                this.payInfo = ret.data||{}
             } else {
                dialog.toast(ret.msg);
                if (ret.msg=="登陆超时") {
                    setTimeout(() => {
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
        pay() {
        	var payData = this.payInfo||{}
			function onBridgeReady() {
				WeixinJSBridge.invoke(
					'getBrandWCPayRequest', payData,
					function(res) {
						if(res.err_msg == "get_brand_wcpay_request:ok") {
							// 使用以上方式判断前端返回,微信团队郑重提示：
							//res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
							dialog.toast("支付成功");
						}
					});
			}
			if(typeof WeixinJSBridge == "undefined") {
				if(document.addEventListener) {
					document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
				} else if(document.attachEvent) {
					document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
					document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
				}
			} else {
				onBridgeReady();
			}
		}
	},
}
</script>

<style lang="scss" scoped>
	@import 'src/style/mixin';
	#body{
		background-color: white;
		padding-bottom: 30px;
	}
	.pay_money{
		padding: 20px;
		font-size: 15px;
	}
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
           padding:5px 30px;
           border-radius:5px;
        }
    }
</style>