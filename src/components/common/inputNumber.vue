 <template>
	<div class="input_container cwj_row cwj_center_v">
        <section @click="jian" class="jian" :style="jianStyle">
            -
        </section>
        <input class="elinput" :style="inputStyle" v-model="value" type="number"></input>
        <section @click="add" class="add" :style="addStyle">
            +
        </section> 
    </div>
</template>

<script>
    export default {
    	data(){
            return{
                value:"",
            }
        },
        mounted(){
        	this.value = this.num;
        },
        methods: {
            add() {
                if(this.max&&this.value>=this.max){
                    return;
                }
                this.value++;
                this.$emit('change',this.value)
            },
            jian() {
                if(this.min&&this.value<=this.min){
                    return;
                }
                this.value--;
                this.$emit('change',this.value)
            },
        },
        watch: {
            value:function(val){
                console.log("val==="+val)
                var nn = parseInt(val)>0?parseInt(val):0;
                this.value = parseInt(val)>0?parseInt(val):"";
                this.$emit('change',nn);
            }
        },
        props:{
            num: {
                type: Number,
                default: 0
            }, 
            min: {
                type: String,
                default: "0"
            }, 
            max: {
                type: String,
                default: ""
            },
            inputStyle: {
                type: String,
                default: ""
            },
            jianStyle: {
                type: String,
                default: ""
            },
            addStyle: {
                type: String,
                default: ""
            },
        },
    }
</script>

<style lang="scss" scoped>
    @import '../../style/mixin';
    .cwj_row { 
        /*background-color: red;*/
        display: -webkit-box;
        display: -webkit-flex;
        display: -moz-box;
        display: -ms-flexbox;
        display: flex;
    }
    .cwj_center_v {
        -webkit-box-align: center;
        -webkit-align-items: center;
        -ms-flex-align: center;
        align-items: center;
    }
	.input_container{
        position: relative;
        //background: red;
        height:20px; 
        font-size:14px;
        .jian{
            width:20px;
            height:20px;
            border: 1px solid rgb(136,136,136);
            border-right: none; 
            text-align:center;  
        }
        .elinput{
          height:20px;
          background: #fff; 
          border: 1px solid rgb(136,136,136);
          border-radius:0px;
          outline: none;
          width:30px;
          text-align:center; 
        }
        .add{
            width:20px;
            height:20px;
            border: 1px solid rgb(136,136,136);
            border-left: none; 
            text-align:center; 
        }
    }
</style>
