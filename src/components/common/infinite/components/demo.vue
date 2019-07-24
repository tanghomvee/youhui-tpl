<template>
        <div infinite-wrapper>
                <el-row class="jfList"> 
                      <div v-for="item in allList" class="row">
                            <div>
                                <img :src="item.img">
                            </div>
                            <div class="rowRight">
                                <div class="rightTop">
                                    <div class="name">
                                    {{item.type==4?'车险人伤专业律师诉讼+调解+咨询抵用券【理赔诉讼券】':item.type==3?'车险人伤专业律师调解+咨询抵用券【理赔调解券】':item.type==2?'车险人伤专业律师咨询抵用券【理赔咨询券】':''}}
                                    </div>
                                    <div class="tag">
                                        <span class="tag1">
                                             {{item.type==4?'诉讼专用':item.type==3?'调解专用':item.type==2?'咨询专用':''}}
                                        </span>
                                        <span v-show="item.type==3||item.type==4" class="tag2">
                                        {{item.type==4?'律师调解+诉讼费抵扣':item.type==3?'律师调解费抵扣':''}}
                                        </span>
                                    </div>
                                </div>
                                <div class="rightBottom">
                                  ￥
                                   <span class="money">
                                        199
                                    </span>
                                    <span class="need">
                                        <span class="iconfont icon-jifenduihuanbiaoqian">
                                        </span>
                                        <span class="jifenTag">
                                            2万积分兑换
                                        </span>
                                    </span>
                                </div>
                                <div class="h_line">
                                </div>

                            </div>
                      </div>
                      <infinite-loading @infinite="infiniteHandler" 
                       spinner="waveDots">
                        <span slot="no-more">
                          --没有更多了--
                        </span>
                        <span slot="no-results">
                          --暂无数据--
                        </span>
                      </infinite-loading>
            </el-row>
        </div>
</template>

<script>
    import VueDataLoading from 'vue-data-loading'
    //loading中show-type的可选类型'balls', 'bars', 'beat', 'bubbles', 'cylon', 'spin', 
    import vueLoading from 'vue-loading-template'

    import {mapState, mapMutations} from 'vuex'
     import {getConsultList,userCancel,getLawyer,doConsult} from 'src/service/getData'
     import dialog from 'src/components/common/dialog';
     import loading from 'src/components/common/loading';
     import {removeStore,isData,checkPhone} from 'src/config/mUtils'
     
     import InfiniteLoading from 'vue-infinite-loading';
    export default { 
        components: {
            VueDataLoading,
            vueLoading,
            InfiniteLoading
        },
        data() {
            return {
                loading: false,
                completed: false,
                page: 1,
                totalPage: 1,
                allList: [],
            }
        }, 
        mounted: function () {
           document.title=this.$route.meta.title;
           
           console.log("userInfo=="+JSON.stringify(this.userInfo));
        },
        beforeDestroy() {
            loading.hide();
        },
        computed:{
            ...mapState([
                'userInfo',
            ]),
        },
        methods: {
            ...mapMutations([
                'OUT_LOGIN'
            ]),
            itemClick(item, index){
                console.log(item.status)

            },
            infiniteHandler($state) {
              setTimeout(() => { 
                const temp = [];
                for (let i = 0; i <= 1; i++) {
                  temp.push({img:require('src/images/card/zixun.png'),type:2});
                }
                this.allList = this.allList.concat(temp);
                if(this.allList.length==0){
                    //组件接收到complete事件并且它没有接收过loaded事件时，no-results这个内容会显示出来。
                    $state.complete();
                    return
                }

                $state.loaded();
                if(this.allList.length > 4){
                 $state.complete();
                }
                
              }, 2000);
            },
        },
        created() {
//              this.fetchData()
        }
    }
</script>

<style lang="scss">
    @import 'src/style/mixin';
    .header-text, .footer-text{
        color:#888;
        font-size:14px;
    } 
    .jfList{ 
        margin-top:.7rem;
        padding:5px 10px;
        //display:flex;   
         flex-direction:column;
         .row{
            display:flex;
            justify-content:start;
            margin-bottom:20px;
            img{ 
                width: 120px;
                height: 120px;
                //display: block;
                margin-right:10px;
                border:5px solid rgb(248,248,248);
            }
            .rowRight{
                display:flex;
                align-items: space-between;
                flex-direction:column;
                justify-content:start;
                .rightTop{
                    flex:1;
                    .name{ 
                        font-size:14px;
                        color:#000;
                    }
                    .tag{
                        display:flex;
                        margin-top:10px;
                        .tag1{ 
                            background-color:rgb(120,176,255);
                            font-size:10px;
                            color:#fff;
                            border-radius:2px;
                            display:flex;
                            justify-content:center;
                            text-align:center;
                            padding:1px 5px;
                            margin-right:10px;
                        }
                        .tag2{
                            font-size:10px;
                            color:rgb(244,142,51);
                            border:.1px solid rgb(244,142,51);
                            padding:1px 5px;
                            border-radius:2px;
                            color:#F48E33;
                        }

                    }
                }
                .rightBottom{
                    font-size:12px;
                    color:rgb(228,36,36);
                    .money{
                        font-size:18px;
                        color:rgb(228,36,36);
                    }
                    .need{
                        //padding:1px 5px;
                        //width:100px;
                        position:absolute;
                        margin-left:10px; 
                        span{
                            position:absolute;
                            color:rgb(228,36,36);
                        }
                        .jifenTag{
                            width:80px;
                            height:18px; 
                            //background-color:blue;
                            display:flex; 
                            text-align:center;
                            align-items: center; 
                            justify-content: center;
                            //position:absolute;
                            font-size:10px;
                            color:#fff;
                        }
                    }
                }
                .h_line{
                  height:1px;
                  background-color:rgb(236,236,236);
                  margin-top:5px;
                  margin-bottom:-5px;
                }
            }
         }
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
</style>