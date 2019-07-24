<template>
	<div>
		<transition name="router-fade" mode="out-in">
			<keep-alive>
			    <router-view v-if="ifKeepAlive"></router-view>
			</keep-alive>
    	</transition>
    	<transition name="router-fade" mode="out-in">
			<router-view v-if="!ifKeepAlive"></router-view>
		</transition>
		<svg-icon></svg-icon>	
    </div>
</template>

<script>
	import svgIcon from './components/common/svg';
	import {mapState, mapActions} from 'vuex';
  	export default {
        data(){
            return {
                ifKeepAlive: false, 
            }
        },
    	components:{
            svgIcon
        },
        mounted(){
            //获取用户信息
            this.getUserInfo();
        },
        methods: {
            ...mapActions([
                'getUserInfo'
            ]),
        },
        beforeUpdate: function () {
           
            document.title=this.$route.meta.title;
            this.ifKeepAlive = this.$route.meta.keepAlive||false;
             console.group('ifKeepAlive 更新前状态===============》'+this.ifKeepAlive);
           
        },
  	}

</script>

<style lang="scss">
  	@import './style/common';
	.router-fade-enter-active, .router-fade-leave-active {
	  	transition: opacity .3s;
	}
	.router-fade-enter, .router-fade-leave-active {
	  	opacity: 0;
	}
</style>
