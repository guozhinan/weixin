<template>
    <div class="wrapper">
        <div class="outer">
            <img src="../../images/go_logo_1.jpg" alt=""><br/>
            <span>页面正在开发中^_^，看看其它的吧</span>
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
        background: #fff;
        background-size: cover;
        padding: 3rem 1rem;
        display: flex;
        z-index: 102;
    }
    .outer {
        width: 100%;
        height: 100%;
        text-align: center;
        font-size: 0.6rem;
    }
    .outer img,
    .outer span {
        display: inline-block;
        margin-top: 1rem;
        color: #666;
    }
    
</style>

