<template>
    <section id='foot_guide'>
        <router-link to='/publish' class="guide_item">
            <!-- <i class="icon iconfont icon-comment"></i> -->
            <i class="fa fa-file-text-o"></i>
            <span>一键发布</span>
        </router-link>
        <router-link to='/mindList/01' class="guide_item">
            <!-- <i class="icon iconfont icon-qingqiugenzongrizhi"></i>     -->
            <i class="fa fa-yelp"></i>                    
            <span>想法中心</span>
        </router-link>
        <router-link to="/own" class="guide_item">
            <!-- <i class="icon iconfont icon-yonghu"></i>             -->
            <i class="fa fa-user-o"></i> 
            <span>我的</span>
        </router-link>
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
	@import '../../style/font-awesome/css/font-awesome.min.css';

    #foot_guide{
        background-color: #fff;
        position: fixed;
        z-index: 100;
        left: 0;
        right: 0;
        bottom: 0;
        @include wh(100%, 1.95rem);
        display: flex;
        box-shadow: 0 -0.026667rem 0.053333rem rgba(0,0,0,.1);
    }
    .guide_item{
    	flex: 1;
    	display: flex;
    	text-align: center;
    	flex-direction: column;
    	align-items: center;
		// .icon{
		// 	@include wh(.8rem, .8rem);
		// 	margin-top: .3rem;
		// 	fill: #ccc;
		// }
        .fa {
            font-size: 0.8rem;
            margin-top: .3rem;
        }
		span{
			@include sc(.45rem, #666);
		}
    }
    .router-link-active {
        .fa,span {
            color: cadetblue;
            // font-weight: bold;
        }
    }
   
</style>
