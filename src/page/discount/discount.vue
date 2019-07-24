<template>
  <div class="profile_page">
    <section style="margin-bottom: 40px;width: 100%;height: 100%;" :class="{mask: showArea}" @click="cancelArea">
      <header class="cm-header pf">
        <div @click="showAreaAction">
          <span style="display: flex;align-items: center;justify-content: center;">{{ area }}
          	<span v-show="!showArea" class="triangle_border_down"></span>
          	<span v-show="showArea" class="triangle_border_up"></span>
          </span>
        </div>
      </header>
      <ul class="area-item"  v-show='showArea'>
        <li @click="selectAll()">全部</li>
        <li @click="selectAreaAction(item)" v-for="item in regionOrder">
          {{ item.name }}
        </li>
      </ul>
    </section>
    <div id="mescroll" class="mescroll">
      <!--展示上拉加载的数据列表-->
      <ul id="dataList" class="data-list" v-cloak>
        <li v-for="(item, index) in consult_infos" :key="index" @click="itemClick(item)">
          <div class="itemContent" :class="{bgColorRed:(index%3==1)}">
              <div class="headRow">
                <img :src="item.logoUrl">
              </div>
              <div class="contentDetail">
                <span class="name">{{item.dname}}</span>
                <span>{{item.vname}}</span>
                <div class="detail">{{item.addr}}{{index==2?"乐山电力来肯定谁看":''}}</div>
              </div>
              <div class="vLine"></div>
              <div class="right">
                {{item.remark}}
              </div>
          </div>
        </li>
      </ul>
     </div>
    <foot-guide></foot-guide>
  </div>
</template>

<script>
import footGuide from 'src/components/footer/footGuide'

import MeScroll from 'src/components/mescroll/mescroll.min.js';
import st from 'src/components/mescroll/mescroll.min.css';

import {mapState, mapMutations} from 'vuex'
 import dialog from '../../components/common/dialog';
 import loading from 'src/components/common/loading';
    export default {
        data() {
            return {
                mescroll: null,
                consult_infos: [],
                area: '优惠类型',
                showArea: false,
                allArea: [],
                selType:'',
                regionOrder: [{name:"满减",type:1},{name:"打折",type:2},{name:"免费",type:3}],
            }
        },
        components: {
        footGuide,
        },
        beforeDestroy() {
            loading&&loading.hide();
        },
        mounted: function() {
            var self = this;
            self.mescroll = new MeScroll("mescroll", { //请至少在vue的mounted生命周期初始化mescroll,以确保您配置的id能够被找到
              up: {
                callback: self.upCallback, //上拉回调
                isBounce: false, //此处禁止ios回弹,解析(务必认真阅读,特别是最后一点): http://www.mescroll.com/qa.html#q10
                toTop:{ //配置回到顶部按钮
                  supportTap:true,
                },
                empty:{ //配置列表无任何数据的提示
                  warpId:"dataList",
                  icon : require("../../components/mescroll/img/mescroll-empty.png"),
                  tip : "亲,暂无相关数据哦~" ,
                },
                htmlNodata: '<p class="upwarp-nodata">~没有更多了~</p>', //无数据的布局，其中p标签中可以写自己想要的文字
              }
            });
            setTimeout(()=>{
              console.log("this.userInfo=="+JSON.stringify(this.userInfo));
           },100);
        },
        created() {
        	this.getTypes()
        },
        computed:{
            ...mapState([
                'userInfo',
            ]),
        },
        methods: {
            ...mapMutations([
                'GET_USERINFO'
            ]),
            getTypes() {
						  	let url = '/youhui/discount/typeList'
				          this.axios.get(url).then((ret) =>{
				                // 处理数据
				             console.log("ret==="+JSON.stringify(ret))
				             if (ret.success) {
				             	this.regionOrder = ret.data
				             } else {
				                dialog.toast(ret.msg);
				             }
				             loading.hide();
				         })
			       },
            selectAll () {
              this.showArea = false
              this.selType = ""
              this.area = "全部"
              document.documentElement.style.overflow = 'scroll'
              loading.show("加载中")
              this.upCallback({num:1, size:10})
            },
            selectAreaAction (item) {
              this.area = item.name
              this.showArea = false
              this.selType = item.id
              document.documentElement.style.overflow = 'scroll'
              loading.show("加载中")
              this.upCallback({num:1, size:10})
            },
            showAreaAction () {
              this.showArea = true
              document.documentElement.style.overflow = 'hidden'
            },
            cancelArea (event) {
              if (event.target.className === 'mask') {
                this.showArea = false
                document.documentElement.style.overflow = 'scroll'
              }
            },
            itemClick(item, index){
                console.log(item.status)
                this.$router.push({path:'discountDetail', query:item});
            },
            //上拉回调 page = {num:1, size:3}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
            upCallback: function(page) {
                //联网加载数据
                var self = this;
                self.getListDataFromNet(page.num, page.size, function(curPageData) {
                  if(page.num == 1) self.consult_infos = [];
                  self.consult_infos = self.consult_infos.concat(curPageData);
                  console.log("page.num="+page.num+", page.size="+page.size+", curPageData.length="+curPageData.length+", self.consult_infos.length==" + self.consult_infos.length);
                  self.mescroll.endSuccess(curPageData.length); //必传参数(当前页的数据个数, 是否有下一页 true/false)
                }, function() {
                  self.mescroll.endErr();
                });
              },
                getListDataFromNet(pageNum,pageSize,successCallback,errorCallback) {
                  setTimeout(() => {
                    let url = '/youhui/discount/list'
                    let getData = {
                        discountType:this.selType,
                        pageNum:pageNum,
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
                         if (ret&&ret.success) {
                            var newlist = ret && ret.data&& ret.data.data ? ret.data.data : [];
                            this.totalPage = ret && ret.data&& ret.data.pages ? ret.data.pages:0;
                            successCallback&&successCallback(newlist);//成功回调
                         } else {
                            dialog.toast(ret&&ret.msg);
                         }
                         loading.hide();
                     })
                }, 1000)
            }

        }
    }
</script>
<style lang="scss">
	/*向下*/
			.triangle_border_down {
				width: 0;
				height: 0;
				border-width: 6px 6px 0;
				border-style: solid;
				border-color: #C7C7CC transparent transparent;
				/*灰 透明 透明 */
				/*margin: 40px auto;*/
				position: relative;
				margin-left: 5px;
			}
			/*向上*/
			.triangle_border_up{
			    width:0;
			    height:0;
			    border-width:0 6px 6px;
			    border-style:solid;
			    border-color:transparent transparent #C7C7CC;/*透明 透明  灰*/
			    position:relative;
			    margin-left: 5px;
			}
    .profile_page{
        p, span{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
        padding-bottom:50px;
    }

      body{background-color: #F5F5F5;}
      ul{list-style-type: none}
      a {text-decoration: none;color: #18B4FE;}
      
      /*vue*/
      [v-cloak] {
        display: none;
      }
     
      /*mescroll滚动的区域*/
      .mescroll{
        position: fixed;
        top:45px;
        bottom: 0;
        height: auto;
        padding-bottom:90px;
      }
      .itemContent{
        background-color:#fff;
        background:linear-gradient(to right,rgb(102,163,255), rgb(153,194,255));
        height:120px;
        margin:0px 15px;
        margin-bottom:10px;
        border-radius:10px;
        display:flex;
        align-items:center;
        .headRow{
          width: 20%;
          margin: 10px;
          text-align: center;
          img{
            height:60px;
            width:60px;
            border-radius:50%;
          }
        }
        .contentDetail{
          flex:1;
          width:50%;
          display:flex;
          flex-direction:column;
          justify-content:space-between;
          font-size: 12PX;
          height: 60px;
          .name{
            font-size: 15px;
          }
          .detail{
            display:block;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
        .vLine{
          display:block;
          width: 1px;
          height:50px;
          background-color:#cccccc;
        }
        .right{
          width: 20%; 
          display:block;
          text-align: center;
          font-size: 13px;
        }
        .footBtn{
            height: 35px;
            span{
              text-align: center;
              font-size: 14px;
              color: rgb(242,102,102);
            }
        }
    }
    .bgColorRed{
        background:linear-gradient(to right,#ED8583, rgb(214,142,233));
      }
    .bottomLoading{
      text-align: center;
      margin: 0 auto;
      display: flex;
      align-items:center;
      justify-content:center;
      //display:inline-block;
      span{
        text-align:left;
        // background-color:red;
      }
      .icon{
         //display:inline-block;
      }
    }
  .cm-header {
    background: #fafafa;
      color: #333;
      height: 40px;
      line-height: 26px;
      font-size: 14px;
      left: 0px;
      right: 0px;
      top: 0px;
      display: -webkit-box;
      box-sizing: border-box;
      padding: 8px 0;
      border-bottom: 1px solid #ebebeb;
      position: fixed;
  }
  .cm-header>div {
    -moz-box-flex: 1.0;
    -webkit-box-flex: 1.0;
    text-align: center;
    box-sizing: border-box;
  }
  .area-item {
    background-color: #fff;
    font-size: 14px;
    color: #222;
    box-sizing: border-box;
    max-height: 70%;
    padding-left: 15px;
    overflow-y: scroll;
    opacity:1;
    margin-top: 40px;
  }
  .area-item li {
    padding: 14px 0;
    background-color: #fff;
    border-bottom: 1px solid #ebebeb;
    opacity:1;
  }
  .mask{
    position:fixed;
    top:0;
    bottom:0;
    left:0; 
    right:0;
    // background-color:#000000;
    z-index:998;
  }
</style>