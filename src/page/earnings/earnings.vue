<template>
    <section class="earnings">
        <div class="top">
          <p>0</p>
          <p>累计奖励</p>
          <p class="withdrawal">立即提现</p>
        </div>
        <div class="main">
          <div class="title">我的收益</div>
          <div class="mainInfo">
            <div>
              <p>0</p>
              <p>累计收益（元）</p>
            </div>
            <div>
              <p>0</p>
              <p>可提现收益（元）</p>
            </div>
            <div>
              <p>0</p>
              <p>新增收益（元）</p>
            </div>            
          </div>
        </div>
    </section>
</template>
<script>
    import {getReceiveList,getOpenid,checkLogin} from 'src/service/getData'
    import {check} from 'src/config/checkLogin'
    export default {
      data(){
            return{
              mindList:[]
            }
        },
        mounted(){
          
        },
        components: {

        },
        computed: {
           
        },
        methods: {
         
        }
    }
</script>
<style scoped>
    .top {
      width: 100%;
      height: 8rem;
      background-image: linear-gradient(45deg, #11998e, #99f2c8);
      padding: 2rem 0;
      box-sizing: border-box;
    }
    .top p {
      color: #fff;
      text-align: center;
      font-size: 1rem;
    }
    .top p:nth-child(2) {
      margin-top: 0.4rem;
      font-size: 0.6rem;
    }
    .top .withdrawal {
      /* display: inline-block; */
      font-size: 0.55rem;
      width: 4rem;
      height: 1rem;
      margin: 0.8rem auto 0;
      line-height: 1rem;
      border: 1px solid #fff;
      color: #fff;
      border-radius: 0.5rem;
      box-sizing: content-box;
    }
    .main {
      margin-top: 0.8rem;
      width: 100%;
      height: 5rem;
      background: #fff;
      padding: 0.4rem;
      display: flex;
      flex-direction: column;
    }
    .title {
      font-size: 0.6rem;
      padding-left: 0.65rem;
      border-left: 4px solid cadetblue;
      color: #111;
    }
    .mainInfo {
      flex: 1;
      display: flex;
      padding: 0.6rem 0;
    }
    .mainInfo div {
      flex: 1;
    }
    .mainInfo div p {
      color: #999;
      font-size: 0.6rem;
      text-align: center;
    }
    .mainInfo div p:first-child {
      color: cadetblue;
      margin-bottom: 0.4rem;
      font-size: 0.65rem;
    }
</style>

