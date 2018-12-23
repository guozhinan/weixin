<template>
    <section class="wrapper">
        <div class="noMindList" v-show="mindList.length ==0">
          <div>
            <span class="logo"></span><br><br>
            <span class="info">暂无收藏~~快去想法中心看看吧</span>
          </div>
        </div>
        <div class="mindList" v-show="mindList.length>0">
          <router-link :to="{name:'myMindItem',params:{id:item.id}}" class="mindItem" :key="index" v-for="(item,index) in mindList">
              <div class="mindItemTop">
                <span class="left">{{item.type | mindType}}</span>
                <span class="right">{{item.createTime | createTime}}</span>
              </div>
              <div class="mindItemName">{{item.name}}</div> 
              <div class="mindItemDes">{{item.taskDescribe}}</div>
              <div class="mindItemAmount">
                <span class="left">{{item.status | mindStatus}}</span>
                <span class="right">￥{{item.amount}}</span>
              </div>          
          </router-link>
        </div>
    </section>
</template>
<script>
    import headTop from 'src/components/header/head'
    import {getTTaskList,getOpenid,checkLogin} from 'src/service/getData'
    import { Group, Cell, Drawer,PopupPicker,Picker,XInput, XTextarea,Search ,Checker,CheckerItem  } from 'vux'
    export default {
      data(){
            return{
              mindList:[]
            }
        },
        mounted(){
          // sessionStorage.openId = 'ozIdu1Ro-oFTru19uM0JnB_CBfCM';
          // this.getTTaskList();
          if(sessionStorage.openId) {
            if(sessionStorage.isLogin == 'Y'){
              this.getTTaskList();
            }else {
              this.checkLogin(sessionStorage.openId)
            }
          }else{
            this.checkOpenId();
          }
        },
        components: {
            headTop,
            Group,
            Cell,
            PopupPicker,
            Picker,
            XInput,
            XTextarea,
            Checker,
            CheckerItem,
            Search
        },
        computed: {
           
        },
        filters: {
          mindType(value) {
            if(!value) return;
            if(value == '01') return '任务发布';
            if(value == '02') return '项目发布';
            if(value == '03') return '愿景发布';
          },
          createTime(value) {
            if(!value) return;
            let time = new Date(value);
            let y = time.getFullYear();    
            let m = time.getMonth() + 1;    
            m = m < 10 ? ('0' + m) : m;    
            let d = time.getDate();    
            d = d < 10 ? ('0' + d) : d;    
            return y+'/'+m+'/'+d;
          },
          //01发布中 02领取中 03已撤销 04失败 05成功
          mindStatus(value) {
            if(!value) return;
            if(value == '01') return '发布中';
            if(value == '02') return '领取中';
            if(value == '03') return '已撤销';
            if(value == '04') return '失败';
            if(value == '05') return '成功';
          }
        },
        methods: {
          getTTaskList() {
            let openid = sessionStorage.openId;
            getTTaskList({openid}).then(res => {
              if(res.resultCode == '00000'){
                console.log(res)
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
            let code = this.getUrlParam('code');
            console.log(code);
            if(sessionStorage.openId){//判断是否登陆
              this.checkLogin(sessionStorage.openId)
            }else if(code){//获取openid
              this.getOpenid(code);
            }
          },
          //获取openId
          getOpenid(code){
            getOpenid(code).then(res => {
              if(res.resultCode == '00000'){
                let openId = res.user.openId;
                sessionStorage.openId = openId;
                sessionStorage.user = JSON.stringify(res.user);
                this.checkLogin(openId);
              }else{
                this.$vux.alert.show({
                  title: '提示',
                  content: res.resultMsg
                });
              }
            })
          },
          //判断是否登陆
          checkLogin(openId){
            checkLogin(openId).then(res => {
              if(res.resultCode == '00000'){
                this.isLogin = res.isLogin;
                sessionStorage.isLogin = this.isLogin;
                let userInfo = JSON.parse(sessionStorage.user);
                sessionStorage.user = JSON.stringify(Object.assign(userInfo,res.user));
                sessionStorage.currentUrl = location.href;
                if(this.isLogin == 'N'){
                  this.$router.push('/login');
                }else{
                  this.getTTaskList();
                }
              }else{
                this.$vux.alert.show({
                  title: '提示',
                  content: res.resultMsg
                });
              }
            })
          },
          getUrlParam(name){
            let url = window.location.href;
            if(url.indexOf('?'+name+'=')>-1){
              let string = url.split('?'+name+'=')[1];
              return string.split('&')[0];
            }else if(url.indexOf('&'+name+'=')>-1){
              let string = url.split('&'+name+'=')[1];
              return string.split('&')[0];
            }else{
              return null;
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

