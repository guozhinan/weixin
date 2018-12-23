<template>
    <div class="wrapper">
        <div class="outer">
            <p class="title">六度分离理论告诉我们</p>
            <p>只要充分相信和利用自己的人脉</p>
            <p>只需要 <span>小小的6步，</span></p>
            <p>每个人都可以认识这个地球的任一个人</p>
            <p>也就是说</p>
            <p>只要你有任何想法，</p>
            <p>通过6步都可以找到想要的</p>
            <p><span>人、钱、产品、服务、市场</span>等一切</p>
            <p>想要的社会资源</p>
            <p>找喜欢的人</p>
            <p>做想做的事</p>
            <p>只要你够想法</p>
            <p>就 <span>一定能实现</span></p>
            <div class="btn" @click="go('/publish')">GO想法>></div>
        </div>
        
    </div>
</template>
<script>
    export default {
        data(){
            return{
               
            }
        },
        mounted(){
          
        },
        components: {
            
        },
        computed: {
           
        },
        methods: {
           go(path){
              this.$router.push(path);
           }
        }
    }
</script>
<style scoped>
    .wrapper {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        overflow: hidden;
        background: url('../../images/advertisingBg.jpg') no-repeat;
        background-size: cover;
        padding: 3rem 1rem;
        display: flex;
        z-index: 102;
    }
    .outer {
        flex: 1;
        display: flex;
        flex-direction: column;
    }
    .outer p {
        flex: 1;
    }
    p {
        color: #fff;
        font-size: 0.7rem;
        height: 1.4rem;
        line-height: 1.4rem;
        letter-spacing: 1px;
    }
    p.title {
        font-size: 0.9rem;
        font-weight: 600;
        height: 2rem;
        line-height: 2rem;
    }
    p span{
        /* font-family: 'Audiowide'; */
        text-align: center;
        color: #00a67c;
        -webkit-transition: all 1.5s ease;
                transition: all 1.5s ease;
                color: #fff;
        -webkit-animation: Glow 1.5s ease infinite alternate;
                animation: Glow 1.5s ease infinite alternate;
    }
    .btn {
        width: 3.8rem;
        height: 1.4rem;
        background: #f00;
        color: #fff;
        font-size: 0.6rem;
        border-radius: 0.7rem;
        text-align: center;
        line-height: 1.4rem;
        margin-top: 1rem;
        margin-left: 50%;
        transform: translateX(-50%);
    }
    @-webkit-keyframes Glow {
        from {
            text-shadow: 0 0 10px #fff,
                        0 0 20px #fff,
                        0 0 30px #fff,
                        0 0 40px #00a67c,
                        0 0 70px #00a67c,
                        0 0 80px #00a67c,
                        0 0 100px #00a67c,
                        0 0 150px #00a67c;
        }
        to {
            text-shadow: 0 0 5px #fff,
                        0 0 10px #fff,
                        0 0 15px #fff,
                        0 0 20px #00a67c,
                        0 0 35px #00a67c,
                        0 0 40px #00a67c,
                        0 0 50px #00a67c,
                        0 0 75px #00a67c;
        }
    }
    @keyframes Glow {
            from {
                text-shadow: 0 0 10px #fff,
                            0 0 20px #fff,
                            0 0 30px #fff,
                            0 0 40px #00a67c,
                            0 0 70px #00a67c,
                            0 0 80px #00a67c,
                            0 0 100px #00a67c,
                            0 0 150px #00a67c;
            }
            to {
                text-shadow: 0 0 5px #fff,
                            0 0 10px #fff,
                            0 0 15px #fff,
                            0 0 20px #00a67c,
                            0 0 35px #00a67c,
                            0 0 40px #00a67c,
                            0 0 50px #00a67c,
                            0 0 75px #00a67c;
            }
        }
</style>

