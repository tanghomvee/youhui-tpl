/*
*author :cwj
*e-mail: 907727356@qq.com
*/
<template>
	<div id="body">
		<div class="top_div">
			<div class="log_div">
				<img :src="logo" alt="" />
				<div class="head">
					<p>{{name}}</p>
					<!--<p>1122</p>-->
				</div>
			</div>
			<div class="title">
				{{title}}
			</div>
			<form v-show="!showScan" class="loginForm">
	            <section class="input_container phone_number">
	                <input type="number" placeholder="请输入您的手机号" name="phone" maxlength="11" v-model="phoneNumber">
	            </section>
	        </form>
	        <form v-show="!showScan" class="loginForm">
	             <section class="input_container phone_number">
               		<input type="number" placeholder="验证码" name="mobileCode" maxlength="6" v-model="mobileCode">
	                <button @click.prevent="getVerifyCode" :class="{right_phone_number:rightPhoneNumber}" v-show="!computedTime">获取验证码</button>
	                <button  @click.prevent v-show="computedTime">已发送({{computedTime}}s)</button>
	            </section>
	        </form>
	        <div v-show="!showScan" class="login_container" @click="mobileLogin">一键注册</div>
	        <div v-show="showScan" style="text-align: center;">
		        <img :src="scan"/>
	        </div>
		</div>
		<div v-show="!showScan" class="listDiv">
			<div style="font-size: 15px;margin-left: 15px;font-weight: bold;">{{listTitle}}</div>
			<div class="listItem" v-for="item in listdata">
				<div class="imgdiv">
					<img :src="item.logoUrl"/>
				</div>
				<div class="content">
					<p class="name">{{item.dname}}</p>
					<div class="text">
						<p>{{item.detail}}</p>
						<!--{{item.detail}}-->
					</div>
				</div>
				<div class="rightNum">
					{{item.remark}}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
  import loading from 'src/components/common/loading';
  import dialog from 'src/components/common/dialog';
  import {mapState, mapMutations} from 'vuex'
  import Logo from '../../images/logo.jpg'
export default{
	data(){
		return{
			phoneNumber:"",
			mobileCode: "", //短信验证码
			computedTime: 0, //倒数记时
			logo:'http://www.aibaohe.cn/img/12.jpg',
			logname:'',
			listdata:[],
			listTitle:'',
			name:'',
			title:'',
			invitCode:'',
			scan:'',
			showScan:false,
		}
	},
	created(){
		document.title=this.$route.meta.title;
	},
	 mounted(){
        this.invitCode = this.urlparameter("invitCode");
        this.getData();
//      this.invitCode = '15281728895'
     },
	computed: {
        //判断手机号码
        rightPhoneNumber: function (){
            return /^1\d{10}$/gi.test(this.phoneNumber)
        }
    },
	methods:{
		...mapMutations([
            'RECORD_USERINFO',
        ]),
		getData() {
          let url = '/youhui/wechat/shareInfo'
          this.axios.get(url).then((ret) =>{
                // 处理数据
             console.log("ret==="+JSON.stringify(ret))
             if (ret.success) {
                this.logo = ret.data&&ret.data.logo||Logo
                this.listTitle = ret.data&&ret.data.listInfo||''
                this.name = ret.data&&ret.data.head||''
                this.title = ret.data&&ret.data.title||''
                this.listdata = ret.data&&ret.data.listData||[]
                console.log("this.listdata==="+JSON.stringify(this.listdataet))
             } else {
                dialog.toast(ret.msg);
             }
         })
        },
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
            bind(){
                loading.show("注册中");
                let url = '/youhui/wechat/register'
                let getData = {
                    phoneNo:this.phoneNumber,
                    invitCode:this.invitCode,
                    code:this.mobileCode
                }
                console.log("getData==="+JSON.stringify(getData))
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
                     console.log("ret 注册成功==="+JSON.stringify(ret))
                     if (ret.success) {
                     	this.scan = ret.data
                     	this.showScan = true
                     	dialog.toast('注册成功');
                     } else {
                        dialog.toast(ret.msg);
                     }
                     loading.hide();
                 })
			},
            //获取验证吗，线上环境使用固定的图片，生产环境使用真实的验证码
            async getCaptchaCode(){
              this.axios.get('/youhui/wechat/sendPhoneVerify?phoneNo='+this.phoneNumber).then((ret) =>{
                // 处理数据
                 console.log("ret==="+JSON.stringify(ret))
                 if (ret.success) {
//                  this.mobileCode = ret.data
                 } else {
                    dialog.toast(ret.msg);
                 }
             })
            },
            //获取短信验证码
            async getVerifyCode(){
                if (!this.rightPhoneNumber) {
                    dialog.toast('手机号码不正确');
                    return
                }
                this.getCaptchaCode();
                this.computedTime = 60;
                this.timer = setInterval(() => {
                    this.computedTime --;
                    if (this.computedTime < 1) {
                        clearInterval(this.timer)
                    }
                }, 1000)
            },
            //发送登录信息
            async mobileLogin(){
                console.log("this.loginWay111="+this.loginWay)
                if (!this.rightPhoneNumber) {
                    dialog.toast('手机号码不正确');
                    return
                }else if(!(/^\d{4}$/gi.test(this.mobileCode))){
                	dialog.toast('短信验证码不正确');
                    return
                }
                this.bind()
            },
	},
}
</script>

<style lang="scss" scoped>
	@import 'src/style/mixin';
	.top_div{
		background:linear-gradient(to bottom,#3366ff, #f5f5f5);
		height: 330px;
		width: 100%;
		.title{
			font-size:20px;
			color:white;
			height:80px;
			display:flex;
			justify-content:center;
			align-items:center;
		}
	}
	.log_div{
		width:100%;
		height:50px;
		display: flex;
		font-size: 14px;
		padding: 10px 15px;
		align-items: center;
		img {
			height: 30px;
			width: 30px;
			border-radius: 50%;
			margin-right: 5px;
		}
		.head{
			p{
				font-size: 14px;
				color: white;
			}
		}
	}
	.login_container{
        margin: 20px 10%;
        @include sc(.7rem, #fff);
        background-color:  #2C68E9;
        padding: 10px 0;
        border: 1px;
        border-radius: 0.15rem;
        text-align: center;
    }
	.loginForm{
        background-color: #fff;
        margin: 10px 10%;
        .input_container {
            display: flex;
            justify-content: space-between;
            padding: 10px 0px;
            border-bottom: 1px solid #f1f1f1;
            input {
                @include sc(.6rem, #666);
                flex:1;
                border: none;
                outline: none;
            }
        }
        .phone_number{
            padding: .3rem .8rem;
        }
    }
    .listDiv{
    	width: 100%;
    	min-height: 100px;
    	.listItem {
    		display:flex;
    		align-items:center;
    		margin: 10px 15px;
    		padding:10px 15px;
    		background-color:white;
    		border-radius:5px;
    		.imgdiv {
    			width:15%;
    			min-width:60px;
    			display: flex;
    			align-items: center;
    			justify-content: center;
    			img {
		    		height: 60px;
		    		width: 60px;
		    		border-radius:50%;
		    		margin-right: 10px;
		    	}
    		}
	    	.content{
	    		flex: 1;
	    		width:70%;
	    		.name{
	    			font-size: 16px;
	    			font-weight: bold;
	    		}
	    		.text{
	    			width: 100%;
	    			display: flex;
	    			font-size: 14px;
	    			color: #999999;
					p {
						width: 100%;
						height: 40px;
						text-overflow: -o-ellipsis-lastline;
						display:block;
						overflow: hidden;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
						-o-text-overflow: ellipsis;
						/* Opera 9-10 */
						text-overflow: ellipsis;
					}
	    		}
	    	}
	    	.rightNum{
	    		background-color: #2C68E9;
	    		height: 30px;
	    		width: 15%;
	    		min-width: 60px;
	    		font-size: 14px;
	    		border-radius: 15px;
	    		color: white;
	    		display: flex;
	    		align-items: center;
	    		justify-content: center;
	    	}
	    }
    }
    button{
        // @include sc(.65rem, #fff);
        padding: 5px 5px;
        font-size: 12px;
        // width: 150px;
        border: 1px;
        border-radius: 0.15rem;
        background-color: rgb(205,205,205); 
    }
    .right_phone_number{
        background-color: rgb(88,160,255);
        color: white;
    }
</style>