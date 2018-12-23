<template>
    <section class="wrapper">
        <div class="top">
          <div class="container">
            <label for="userName">
              <i class="icon iconfont icon-yonghu"></i><input id="userName" placeholder="请务必用实名注册，以便发放奖励" type="text">
            </label>
            <label for="phone">
              <i class="icon iconfont icon-yonghu"></i><input id="phone" placeholder="手机号" type="text">
            </label>
            <label for="otherCode">
              <i class="icon iconfont icon-yonghu"></i><input id="otherCode" placeholder="请输入验证码" type="text">
            </label>
            <label for="password">
              <i class="icon iconfont icon-mima"></i><input id="password" placeholder="请输入密码" type="password"/>
            </label>
            <label for="passwordAgain">
              <i class="icon iconfont icon-mima"></i><input id="passwordAgain" placeholder="请确认密码" type="password"/>
            </label>
            <p class="agreeInfo"><i v-if="!check" @click="handelCheck" class="fa fa-square-o"></i><i @click="handelCheck" v-if="check" class="fa fa-check-square"></i></check-icon>我已阅读并同意<span class="agreeText" @click="go('/agreement')">《用户注册协议》</span></p>
            <button class="login" :class="{'grayBtn':!check}">注册</button>
          </div>
        </div>
    </section>
</template>
<script>
    import headTop from 'src/components/header/head'
    import alertTip from 'src/components/common/alertTip' 
    import { Group, Cell, Drawer,PopupPicker,Picker,XInput, XTextarea ,Checker,CheckerItem,CheckIcon   } from 'vux'
    export default {
      data(){
            return{
              check: true,
            }
        },
        mounted(){
          
        },
        components: {
            headTop,
            alertTip,
            Group,
            Cell,
            PopupPicker,
            Picker,
            XInput,
            XTextarea,
            Checker,
            CheckerItem,
            CheckIcon
        },
        computed: {
           
        },
        methods: {
            handelCheck() {
              this.check = !this.check;
            },
            go(path) {
              this.$router.push(path);
            }
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
    }
    .top {
      width: 100%;
      background: #fff;
      position: absolute;
      top: 0;
      bottom: 0;
      // position: relative;
    }
    .top .container {
      margin-top: 4rem;
    }
    .top label,
    .top .login {
      display: block;
      width: 86%;
      height: 40px;
      // border-radius: 20px;
      // border: 1px solid #f60;
      border: none;
      border-bottom: 1px solid #ccc;
      margin: 1rem auto;
    }
    .top label {
      display: flex;
    }
    .top label i {
      font-size: 1rem;
      color: #ccc;
      width: 1.5rem;
      line-height: 40px;
    }
    .top input {
      flex: 1;
      height: 40px;
      line-height: 40px;
      font-size: 0.7rem;
    }
    .top .login {
      background: #f30;
      color: #fff;
      line-height: 40px;
      border: 1px solid #f30;
      outline: none 0;
      font-size: 0.8rem;
    }
    .top .login.grayBtn {
      background: #ccc;
      border: 1px solid #ccc;
    }
    .top .otherBtn {
      font-size: 0.7rem;
      color: #999;
      width: 84%;
      margin: 10px auto;
      padding: 0 2rem;
      box-sizing: border-box;
    }
    .top .otherBtn .registered{
      float: left;
    }
    .top .otherBtn .forget{
      float: right;
    }
    .top .agreeInfo {
      font-size: 0.6rem;
      margin-left: 7%;
    }
    .top .agreeInfo .fa {
      color: #f30;
      margin-right: 6px;
      font-size: 0.6rem;
    }
    .top .agreeText {
      color: #f30;
      border-bottom: 1px solid #f30;
    }
</style>

