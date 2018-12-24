<template>
    <section class="wrapper">
        <div class="top" @click = "gotoAddress('/login')">
           <div class="topLeft">
              <img :src="headImgUrl">
           </div>
           <div class="topRight">
             <div class="login"><span v-show="isLogin == 'Y'">{{userName}}</span><span v-show="isLogin == 'N'">用户登陆</span></div>
           </div>
        </div>
        <div class="main">
          <cell is-link @click.native="goto('/myMindList')">
            <span slot="title"><i class="icon iconfont icon-qingqiugenzongrizhi"></i>&nbsp;&nbsp;&nbsp;我的请求</span>
          </cell>
          <cell is-link @click.native="goto('/myCollection')">
            <span slot="title"><i class="icon iconfont icon-shoucang"></i>&nbsp;&nbsp;&nbsp;我的收藏</span>          
          </cell>
          <cell link="/develop">
            <span slot="title"><i class="icon iconfont icon-comment"></i>&nbsp;&nbsp;&nbsp;我的评论</span>                      
          </cell>
          <cell link="/develop">
            <span slot="title"><i class="icon iconfont icon-tuijian"></i>&nbsp;&nbsp;&nbsp;我的推荐</span>                                  
          </cell>
          <cell link="/develop">
            <span slot="title"><i class="icon iconfont icon-jiangli"></i>&nbsp;&nbsp;&nbsp;我的奖励</span>                                              
          </cell>
        </div>
    </section>
</template>
<script>
    import {getOpenid,checkLogin} from 'src/service/getData';
    import headImg from 'src/images/go_logo_1.png'
    import { Cell } from 'vux'
    export default {
      data(){
            return{
              userName: '',//用户名
              isLogin: 'N', //是否登陆，N表示未登陆
              headImgUrl: headImg, //头像
            }
        },
        mounted(){
          this.showInfo();
          this.checkOpenId();
        },
        components: {
            Cell
        },
        computed: {
           
        },
        watch: {

        },
        methods: {
            showInfo(){
              if(sessionStorage.isLogin == 'Y'){
                this.isLogin = 'Y';
                let userInfo = JSON.parse(sessionStorage.user);
                this.userName = userInfo.nickname;
                this.headImgUrl = userInfo.headImgUrl;
              }else{
                this.headImgUrl = headImg;
              }
            },
            gotoAddress(path){
              if(this.isLogin == 'Y'){
                this.$router.push('/userInfo');
                return;
              }
              sessionStorage.currentUrl = window.location.href;
              this.$router.push(path);
            },
            goto(path){//登录了跳相应链接，未登录先登录
              this.isLogin == 'Y'?this.$router.push(path):this.$router.push('/login');
            },
            //判断是否登陆
            checkLogin(openId){
              checkLogin(openId).then(res => {
                if(res.resultCode == '00000'){
                  this.isLogin = res.isLogin;
                  sessionStorage.isLogin = this.isLogin;
                  this.showInfo();
                  let userInfo = JSON.parse(sessionStorage.user);
                  sessionStorage.user = JSON.stringify(Object.assign(userInfo,res.user));
                }else{
                  this.$vux.alert.show({
                    title: '提示',
                    content: res.resultMsg
                  });
                }
              })
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
<style lang="scss" scoped>
    @import '../../style/fontsize/iconfont.css';
    .wrapper {
        position: absolute;
        top: 0;
        bottom: 1.95rem;
        left: 0;
        right: 0;
        overflow: auto;
        background: #fff;
    }
    .top {
      width: 100%;
      height: 6rem;
      background: url('../../images/own_bg.jpg') no-repeat;
      background-size: cover;
      display: flex;
      padding: 10px;
    }
    .topLeft {
      width: 4rem;
      height: 5rem;
    }
    .topLeft img {
      margin-top: 1rem;
      margin-left: 10px;
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
    }
    .topRight {
      flex: 1;
    }
    .topRight div {
        line-height: 5rem;
        color: cadetblue;
    }
    .topRight div span {
      color: #999;
      font-size: 0.75rem;
    }
    .main {
      width: 100%;
      min-height: 6rem;
      margin: 10px auto 0;
      background: #fff;
      font-size: 0.6rem;
      color: #999;
    }
    .main .weui-cell {
      padding: 20px;
    }
    .main .weui-cell:before {
      border: none;
    }
</style>

