<template>
    <section class="wrapper">
        <div class="logo"></div>
        <div class="top">
          <div class="container">
            <label for="phone">
              <input id="phone" placeholder="请输入手机号" maxlength="11" type="tel" v-model="phone"><span @click="clearPhone"><icon v-show="phone" type="clear"></icon></span>
            </label>
            <label for="verifyCode">
              <input id="verifyCode" placeholder="请输入手机验证码" maxlength="6" type="tel" v-model="verifyCode"/><div class="getCode" @click="getVerifyCode">获取验证码</div>
            </label>
            <button class="login" @click="login">确定</button>
            <p class="agreeInfo">点击确定，即表示已阅读并同意<span @click="gotoAddress('/agreement')">《用户注册协议》</span></p>
          </div>
        </div>
    </section>
</template>
<script>
    import {getVerifyCode,login} from 'src/service/getData'
    // import { Group, Cell, Drawer,PopupPicker,Picker,XInput, XTextarea ,Checker,CheckerItem,Icon  } from 'vux'
    export default {
      data(){
            return{
              phone: '',
              verifyCode: '',
              
            }
        },
        mounted(){
          
        },
        // components: {
        //     headTop,
        //     alertTip,
        //     Group,
        //     Cell,
        //     PopupPicker,
        //     Picker,
        //     XInput,
        //     XTextarea,
        //     Checker,
        //     CheckerItem,
        //     Icon
        // },
        computed: {
           
        },
        methods: {
            clearPhone() {
              this.phone="";
            },
            gotoAddress(path){
              this.$router.push(path);
            },
            login(){
              login(this.phone,sessionStorage.openId,this.verifyCode).then(res => {
                if(res.resultCode == '00000'){
                  if(sessionStorage.user){
                    let userInfo = Object.assign(JSON.parse(sessionStorage.user),res.user);
                    sessionStorage.user = JSON.stringify(userInfo);
                  }else{
                    sessionStorage.user = JSON.stringify(res.user)
                  }
                  sessionStorage.isLogin = 'Y';
                  window.location.href = sessionStorage.currentUrl;
                }else{
                  this.$vux.alert.show({
                    title: '提示',
                    content: res.resultMsg
                  });
                }
              })
            },
            getVerifyCode(){
              getVerifyCode(this.phone).then(res => {
                if(res.resultCode == '00000'){
                  this.verifyCode = res.verifyCode;
                }else{
                  this.$vux.alert.show({
                    title: '提示',
                    content: res.resultMsg
                  });
                }
              })
            }

        }
    }
</script>
<style lang="scss" scoped>
    @import '../../style/fontsize/iconfont.css';
    .wrapper {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        overflow: auto;
        z-index: 101;
    }
    .top {
      width: 100%;
      background: #fff;
      position: absolute;
      top: 0;
      bottom: 0;
      // position: relative;
    }
    .logo {
      width: 4rem;
      height: 4rem;
      background: url('../../images/logo3.png') no-repeat;
      background-size: contain;
      position: absolute;
      top: 3rem;
      left: 50%;
      margin-left: -2rem;
      z-index: 100;
      line-height: 3rem;
      text-align: center;
      color: #fff;
    }
    .top .container {
      margin-top: 9rem;
    }
    .top label,
    .top .login {
      display: block;
      width: 78%;
      height: 40px;
      // border-radius: 20px;
      // border: 1px solid #f00;
      border: none;
      border-bottom: 1px solid #ccc;
      margin: 1rem auto 4px;
    }
    .top label {
      display: flex;
    }
    .top label i {
      color: #ccc;
      line-height: 40px;
    }
    .top input {
      flex: 1;
      height: 40px;
      line-height: 40px;
      font-size: 0.7rem;
      border: none 0;
      outline: 0;
    }
    .top .getCode {
      display: inline-block;
      padding: 0 auto;
      height: 20px;
      line-height: 20px;
      border-radius: 10px;
      font-size: 0.5rem;
      border: 1px solid cadetblue;
      color: cadetblue;
      margin-top: 10px;
      width: 3.5rem;
      text-align: center;
    }
    .top .login {
      background: cadetblue;
      color: #fff;
      line-height: 40px;
      border: 1px solid cadetblue;
      outline: none 0;
      font-size: 0.8rem;
      border-radius: 4px;
    }
    .top .agreeInfo {
      font-size: 0.5rem;
      color: #444;
      width: 78%;
      margin: 0 auto;
      box-sizing: border-box;
      text-align: center;
    }
    .top .agreeInfo span {
      color: cadetblue;
    }
</style>

