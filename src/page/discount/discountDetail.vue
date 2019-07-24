/*
*author :cwj
*e-mail: 907727356@qq.com
*/
<template>
  <div id="body" v-cloak>
    <div class="cwj_v_flex_container">
        <div class="cwj_row cwj_center_v cwj_center_h consult_detail_top">
          <div style="text-align: center;">
            <img v-show="info.logoUrl" :src="info.logoUrl"/>
            <p style="margin-top:5px;margin-bottom:10px;font-size:16px;">{{info.dname}}</p>
            <p style="font-size:15px;color: #ffffcc">{{activated?"可使用":"请充值"}}</p>
            <!-- <p style="font-size:13px;">{{"50"}}</p> -->
          </div>
        </div>
        <div class="contentName">
						<div class="cicleDiv">
						</div>
						<div class="name">
							商家
						</div>
        </div>
        <p class="textContent">
        	{{info.vname}}
        </p>
        <div class="contentName">
						<div class="cicleDiv">
						</div>
						<div class="name">
							详情介绍
						</div>
        </div>
        <p class="textContent">
        	{{info.detail}}
        </p>
        <div class="contentName">
						<div class="cicleDiv">
						</div>
						<div class="name">
							地址
						</div>
        </div>
        <p class="textContent">
        	  {{info.addr}}
        </p>
    </div>
    <div v-show="!activated" class="info-data-pay">
    	<router-link to="/pay" tag="li" class="">
       		 <span class="info-data-bottom"><b>充值</b></span>
    	</router-link>
    </div>
  </div>
</template>

<script>
     import {mapState, mapMutations} from 'vuex'
     import dialog from 'src/components/common/dialog';
     import loading from 'src/components/common/loading';
     import {removeStore,isData,checkPhone} from 'src/config/mUtils'
     import Bus from 'src/components/common/eventBus.js';

    export default {
        components: {
        },
        data() {
            return {
                info: {},
                activated:false,
            }
        },
        computed:{
            ...mapState([
                'userInfo'
            ]),
        },
        methods: {
            getData(id,openid) {
                loading.show("加载中");
                let url = '/youhui/discount/detail'
                let getData = {
                    id:id,
                    openid:openid
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
                        this.activated = ret.data.activated
                     } else {
                        dialog.toast(ret.msg);
                     }
                     loading.hide();
                 })
            },
        },
        mounted() {
           document.title=this.$route.meta.title;
           var str = this.$route.query;
           console.log("$route.params=="+JSON.stringify(this.$route.query));
           let detailId = str.id?str.id:"";
           setTimeout(()=>{
              let openId = this.userInfo&&this.userInfo.openid||""
              this.getData(detailId,openId);
              console.log("this.userInfo=="+JSON.stringify(this.userInfo));
           },100);
        }
    }
</script>

<style lang="scss">
    @import 'src/style/mixin';
    .consult_detail_top {
        /*height: 80px;*/
        height: 190px; 
        font-size: 14px;
        color: rgb(83,151,241);
        /*background-color: #6CB6E8;*/
        background:linear-gradient(to right bottom,#ED8583, rgb(214,142,233));
        p{
        	color:white
        }
      }
      .consult_detail_top img{
        height: 100px;
        width: 100px;
        border-radius:50%;
      }

      .contentName{
					margin-top: 20px;
					padding: 0px 30px;
					display: flex;
					align-items: center;
					font-size: 16px;
					
					.cicleDiv{
      			height: 10px;
      			width: 10px;
      			border-radius: 50%;
      			background-color: #6CB6E8;
      			margin-right: 10px;
      			
      		}
      		.name{
      			color:#6CB6E8;
      			font-size: 15px;
      		}
      }
      .textContent{
      	font-size: 13px;
      	padding: 0px 30px;
      }
      .info-data-pay{
	   		display: flex;
	   		/*background-color: white;*/
	   		padding-top: 50px;
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

</style>