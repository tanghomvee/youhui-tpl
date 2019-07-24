<template>
    <div class="iv-lottery"> 
        <div class="bgImg">
            <img  :src="selBg?require('../../../../images/lottery/lottery_bg.png'):require('../../../../images/lottery/lottery_bg2.png')"/>
        </div>
        
        <ul>
            <li class="row">
                <div :class="['col-4' , {active : activeClass[index]}]" v-for="(prize,index) in lis1">
                    <div class="itemDiv">
                        <img :src="prize.img">
                        <span>
                            {{prize.title}}
                        </span>
                    </div>
                </div>
            </li>
            <li class="row">
                <div :class="['col-4' , {active : activeClass[7]}]">
                    <div class="itemDiv">
                        <img :src="prizesList[7].img">
                        <span>
                            {{prizesList[7].title}}
                        </span>
                    </div>
                </div>
                <div class="col-4" @click="startLottery">
                    <div class="itemDiv" :style="'backgroundImage:url('+lotteryBtn.btn_bg+');'">
                        <img :src="lotteryBtn.img">
                        <span>
                            {{lotteryBtn.title}}
                        </span>
                    </div> 
                </div>
                <div :class="['col-4' , {active : activeClass[3]}]">
                    <div class="itemDiv">
                        <img :src="prizesList[3].img">
                        <span>
                            {{prizesList[3].title}}
                        </span>
                    </div>
                </div>
            </li>
            <li class="row">
                <div :class="['col-4' , {active : activeClass[6-index]}]" v-for="(prize,index) in lis2">
                <div class="itemDiv">
                        <img :src="prize.img">
                        <span>
                            {{prize.title}}
                        </span>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>



<script type="text/javascript">
    
    export default {
        name: 'swiper',
        data() {
            return {
                activeClass: [false, false, false, false, false, false, false, false],
                index: -1,
                selBg: true,
                count: 8,
                timer: null,
                interval: null,
                times: 0,
                speedData: 100,
                lock: false,
                afterLotteryHandler: null
            };
        },
        props: {

            prizesList: {
                type: Array,
                default() {
                    return [];
                }
            },

            lotteryBtn: {
                type: Object,
                default() {
                    return {
                        img: ''
                    };
                }
            },

            beforeLottery: {
                type: Function,
                default() { throw new Error('you must define beforeLottery before draw a lottery '); }
            },

            afterLottery: {
                type: Function,
                // eslint-disable-next-line
                default() { console.warn('you can use afterLottery after rolling'); }
            },

            prize: {
                type: Number,
                default: 0
            },
            speed: { 
                type: Number,
                default: 100
            },
            cycle: {
                type: Number,
                default: 20
            }
        },
        computed: {
            lis1() {
                return this.prizesList.slice(0, 3);
            },
            lis2() {
                return this.prizesList.slice(4, 7).reverse();
            }
        },
        mounted() {
            this.speedData = this.speed;
            this.afterLotteryHandler = this.afterLottery;
            this.interval = setInterval(()=>{
                console.log("interval== =")
                this.selBg = !this.selBg;
          },250); 
        },
        beforeDestroy() {
            this.afterLotteryHandler = () => { };
            if(this.interval){
                clearInterval(this.interval);
            }
        },
        methods: {
            startLottery() {
                if (!this.lock) {
                    let promise = () => {
                        return new Promise((resolve, reject) => {
                            this.lock = true;
                            this.beforeLottery(resolve, reject);
                        });
                    };

                    let start = async () => {
                        try {
                            await promise().then((data)=>{
                                this.roll();
                            },(err)=>{
                                console.log("reject==="+err) 
                                this.lock = false;
                            });
                        } catch (e) {
                            e();
                        }

                    };

                    start();
                }

            },
            _rollHandler() {
                var index = this.index;
                var count = this.count;

                for (let i = 0, len = this.activeClass.length; i < len; i++) {
                    this.activeClass[i] = false;
                }
                index += 1;
                if (index > count - 1) {
                    index = 0;
                }
                this.activeClass[index] = true;
                this.index = index;
                return false;
            },
            roll() {
                // eslint-disable-next-line
                this.activeClass = this.activeClass.map(item => item = false);
                this.times += 1;
                this._rollHandler();
                if (this.times > this.cycle + 10 && this.prize == this.index) {

                    clearTimeout(this.timer);

                    setTimeout(
                        () => { this._showResult(); }
                        , 1000);

                    this.lock = false;
                    this.index = -1;
                    this.count = 8;
                    this.timer = null;
                    this.speedData = this.speed;
                    this.times = 0;

                } else {
                    if (this.times < this.cycle) {
                        this.speedData -= 2;
                    } else {
                        if (this.times > this.cycle + 10 && ((this.prize == 0 && this.index == 7) || this.prize == this.index + 1)) {
                            this.speedData += 110;
                        } else {
                            this.speedData += 20;
                        }
                    }
                    if (this.speedData < 40) {
                        this.speedData = 40;
                    }
                    this.timer = setTimeout(
                        () => { this.roll(); }
                        , this.speedData);
                }
                return false;
            },
            _showResult() {
                this.afterLotteryHandler();
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import './lottery.scss';
</style>