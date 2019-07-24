<template>
    <section id='foot_guide'>
        <section @click = "gotoAddress('/home')" class="guide_item">
        	<span  class="icon_style">
                <i :style="$route.path.indexOf('home') !== -1?{color:'rgb(245,110,35)'}:{color:'rgb(51,51,51)'}" class="iconfont icon-home"></i>  
            </span> 
            <span :style="$route.path.indexOf('home') !== -1?{color:'rgb(245,110,35)'}:{color:'rgb(51,51,51)'}" >首页</span> 
        </section>
        <section @click = "gotoAddress('/user')" class="guide_item">
        	<span  class="icon_style">
                <i :style="$route.path.indexOf('user') !== -1?{color:'rgb(245,110,35)'}:{color:'rgb(51,51,51)'}" class="iconfont icon-xiazai"></i>  
            </span>
            <span :style="$route.path.indexOf('user') !== -1?{color:'rgb(245,110,35)'}:{color:'rgb(51,51,51)'}" >我的</span>
        </section>
    </section>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
    	data(){
            return{
                
            }
        },
        created(){
           
        },
        mounted(){
            
        },
        computed: {
            ...mapState([
                'geohash'
            ]),
        },
        methods: {
        	gotoAddress(path){
        		this.$router.push(path)
        	}
        },

    }

</script>

<style lang="scss" scoped>
    @import '../../style/mixin';
    @import '../../style/iconfont';
    
    #foot_guide{
        background-color: #fff;
        position: fixed;
        z-index: 9999;
        left: 0;
        right: 0;
        bottom: 0; 
        @include wh(100%, 1.95rem);
        display: flex;
        box-shadow: 0 -0.026667rem 0.053333rem rgba(0,0,0,.1);
    }

     .i_center{
            font-size:1rem;   
        }  
    .guide_center{
             flex: 1;
            display: flex;
            text-align: center;
            flex-direction: column;
            align-items: center;
            justify-content:center;
            @include wh(2.5rem, 2.5rem);
            background:linear-gradient(rgb(250,151,97), rgb(247,107,28));
            //height:60px;
            //width:60px;  
             border-radius: 50%;
             position: absolute;
             //bottom:.2rem; 
             bottom:3px;   
             // margin-top:-10px; 
             i{
                font-size:1rem; 
                flex: 1;
                display: flex;
                text-align: center;
                flex-direction: column;
                align-items: center;
                margin-top:-5px; 
                color:#fff;
             }
        }
    .guide_item{
        flex: 1;
        display: flex;
        text-align: center;
        flex-direction: column;
        align-items: center;
        
        .icon_style{
            @include wh(.8rem, .8rem);
            margin-top: .3rem;
            text-align: center;
            fill: #ccc;
        }
        span{
            @include sc(.45rem, #666);
        }
    }
   
</style>
