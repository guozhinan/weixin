<template>
    <section class="wrapper">
        <div class="noMindList" v-show="mindList.length ==0">
          <div>
            <span class="logo"></span><br><br>
            <span class="info">暂无请求~~快去发布吧</span>
          </div>
        </div>
        <div class="mindList" v-show="mindList.length>0">
          <router-link :to="{name:'myMindItem',params:{id:item.id}}" class="mindItem" :key="index" v-for="(item,index) in mindList">
              <div class="mindItemTop">
                <span class="left">{{item.type | filterMindType}}</span>
                <span class="right">{{item.createTime | filterCreateTime}}</span>
              </div>
              <div class="mindItemName">{{item.name}}</div> 
              <div class="mindItemDes">{{item.taskDescribe}}</div>
              <div class="mindItemAmount">
                <span class="left">{{item.status | filterMindStatus}}</span>
                <span class="right">￥{{item.amount}}</span>
              </div>          
          </router-link>
        </div>
    </section>
</template>
<script>
    import {getTTaskList,getOpenid,checkLogin} from 'src/service/getData'
    import {check} from 'src/config/checkLogin'
    export default {
      data(){
            return{
              mindList:[],
            }
        },
        mounted(){
          // sessionStorage.openId = 'ozIdu1Ro-oFTru19uM0JnB_CBfCM';
          let openId = sessionStorage.openId?sessionStorage.openId:null;
          if(openId) {
            if(sessionStorage.isLogin == 'Y'){
              this.getTTaskList();
            }else {
              check.checkLogin(openId,this.showInfo)
            }
          }else{
            this.checkOpenId();
          }
        },
        components: {

        },
        computed: {
           
        },
        methods: {
          //获取收藏列表
          getTTaskList() {
            let openid = sessionStorage.openId;
            getTTaskList({openid}).then(res => {
              if(res.resultCode == '00000'){
                this.mindList = res.TTaskList;
              }else{
                this.$vux.alert.show({
                  title: '提示',
                  content: res.resultMsg
                });
              }
            })
          },
          //判断是否有openId
          checkOpenId() {
            let code = check.getUrlParam('code');
            let openId = sessionStorage.openId?sessionStorage.openId:null;
            if(openId){//判断是否登陆
              check.checkLogin(openId,this.showInfo);
            }else if(code){//获取openid
              check.getOpenid(code,this.showInfo);
            }
          },
          showInfo() {
            let isLogin = sessionStorage.isLogin;
            if(sessionStorage.isLogin == 'Y'){
              this.getTTaskList();
            }else{
              sessionStorage.currentUrl = location.href;
              this.$router.push('/login');
            }
          },
        }
    }
</script>
<style scoped>
    .noMindList {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 100%;
      background: #fff;
      text-align: center;
      font-size: 0.6rem;
    }
    .noMindList div {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
    }
    .noMindList .logo{
      /* margin-top: 7rem; */
      display: inline-block;
      width: 4rem;
      height: 4rem;
      background: url(../../images/go_logo_1.jpg) no-repeat;
      background-size: 100% 100%; 
    }
    .mindList {
      position: absolute;
      top: 0;
      bottom: 1.95rem;
      left: 0;
      right: 0;
      overflow: auto;
      background: #f3f5f7;
    }
    .mindItem {
      width: 96%;
      background: #fff;
      margin: 0.3rem auto;
      display: flex;
      flex-direction: column;
      font-size: 0.6rem;
      padding: 0.5rem; 
      border: 1px solid #e7e7e7;
      border-radius: 3px;
    }
    .mindItemTop {
      display: flex;
      font-size: 0.55rem;
      line-height: 1.1rem;
    }
    .mindItemTop span {
      flex:1;
      color: #666;
    }
    .mindItemTop .left{
      text-align: left;
    }
    .mindItemTop .right{
      text-align: right;
      color: #999;
    }
    .mindItemName {
      font-size: 0.65rem;
      color: #333;
      line-height: 1.5rem;
      border-bottom: 1px dashed #d4d4d4;
    }
    .mindItemDes {
      padding: 0.5rem 0;
      border-bottom: 1px dashed #d4d4d4;
      color: #666;
      font-size: 0.55rem;
    }
    .mindItemAmount {
      padding: 0.5rem 0 0;
      font-size: 0.55rem;
    }
    .mindItemAmount .left {
      color: #999;
    }
    .mindItemAmount .right {
      color: #f60; 
    }
</style>

