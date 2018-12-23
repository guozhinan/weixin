<template>
	<div>
		<!-- <head-top></head-top> -->
		<transition name="router-fade" mode="out-in">
			<keep-alive>
			    <router-view v-if="$route.meta.keepAlive"></router-view>
			</keep-alive>
    	</transition>
    	<transition name="router-fade" mode="out-in">
			<router-view v-if="!$route.meta.keepAlive"></router-view>
		</transition>
		<foot-guide v-show="isOriginHei"></foot-guide>	
    </div>
</template>

<script>
    import headTop from 'src/components/header/head'
	import FootGuide from './components/footer/footGuide.vue'
	import {Drawer } from 'vux'
  	export default {
		data() {
			return {
				screenHeight: document.body.clientHeight,// 这里是给到了一个默认值 （这个很重要），
				originHeight: document.body.clientHeight,//默认高度在watch里拿来做比较
				isOriginHei: true
			}
		},
		mounted () {
            const that = this
            window.onresize = () => {
                return (() => {
                    window.screenHeight= document.body.clientHeight;
                    that.screenHeight= window.screenHeight;
                })()
            }
		},
		watch: {
            screenHeight(val) {
                if(this.originHeight != val) {
					this.isOriginHei = false;
                }else{
                    this.isOriginHei = true;
                }
            }
        },
    	components:{
			headTop,
			Drawer,
			FootGuide
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
