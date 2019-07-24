<template>
    <div class="swiper-container">
        <div class="swiper-wrapper" :style="Sstyle">
            <div class="swiper-slide" @click="goTo(index)" v-for="(str,index) in listImg" :style="{ backgroundImage: 'url(' + str.url + ')' }"></div>
        </div>
        <div class="swiper-pagination swiper-pagination-white"></div>
    </div>
</template>

<script>
    //npm install --save swiper
    //import Swiper from 'swiper';
    //import 'swiper/dist/css/swiper.min.css';
    import Swiper from 'src/plugins/swiper.min.js'
    import 'src/style/swiper.min.css'
    export default {
        props: {
            'listImg':{//轮播列表图片数据
                type: Array,
                default: []
            },  
            Sstyle: {//轮播部分的样式 如宽高
                type: String,
                default: ""
            },
            playSpeed: {//轮播速度，大于零表示轮播
                type: Number,
                default: 0
            },
            isAuto: {//是否可以循环
                type: Boolean,
                default: true
            }
        },
        mounted() {
            console.log('mounted', this)
            var swiper = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                paginationClickable: true,
                loop: this.isAuto,//是否循环
                speed: 600,
                autoplay: this.playSpeed,//轮播速度 设置表示轮播
                onTouchEnd: function() {
                    swiper.startAutoplay()
                },
            });
        },
          methods: {
            goTo(index) {
              this.$emit('clickItem',index)
            }
        },
    }
</script>

<style lang="less">
    .swiper-container {
        width: 100%;
        .swiper-wrapper {
            width: 100%;
            height: 100%;
        }
        .swiper-slide {
            background-position: center;
            background-size: 100% 100%;
            width: 100%;
            height: 100%;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .swiper-pagination-bullet {
            width:.4rem;
            height: .4rem;
            display: inline-block;
            background: #fff;
        }
    }
</style>