<template>
    <section class="wrapper">
        <group class="main">
          <cell class="headImgCell">
            <span slot="title">头像</span>
            <span><img class="headImg" :src="headImgUrl" alt=""></span>
          </cell>
          <cell>
            <span slot="title">昵称</span>
            <span>{{nickname}}</span>
          </cell>
          <cell>
            <span slot="title">性别</span>
            <span>{{sex | setFn}}</span>
          </cell>
          <!-- <cell>
            <span slot="title">用户名</span>
            <span><span v-show="username&&canChange=='N'">{{username}}</span><input v-show="!username||canChange!='N'" type="text" maxlength="40" v-model="username" placeholder="请填写真实姓名"/></span>
          </cell> -->
          <cell>
            <span slot="title">绑定手机</span>
            <span>{{phone}}</span>
          </cell>
          <!-- <cell>
            <span slot="title">邮箱</span>
            <span><span v-show="email&&canChange=='N'">{{email}}</span><input type="text" v-show="!email||canChange!='N'" maxlength="40" v-model="email" placeholder="请填写真实邮箱"/></span>
          </cell> -->
        </group>
        <!-- <button class="changeInfo" v-show="canChange!='N'" @click="editTUser">编辑资料</button>   -->
        <button class="loginOut" @click="loginOut">退出登录</button>
        <alert v-show="Msg" title="提示"> {{Msg}}</alert>
    </section>
</template>
<script>
    import headTop from 'src/components/header/head'
    import alertTip from 'src/components/common/alertTip' 
    import {wxAuthor} from 'src/config/weixin'
    import {loginOut,editTUser} from 'src/service/getData';
    import { Group, Cell, Drawer,PopupPicker,Picker,XInput, XTextarea ,Checker,CheckerItem,Alert    } from 'vux'
    export default {
      data(){
            return{
              MsgShow: false, //是否显示弹框
              Msg:'',//弹框提示语
              user: '',//用户名
              isLogin: 'Y', //是否登陆，N表示未登陆
              headImgUrl: '',
              username: '',
              email: '',
              nickname: '', //昵称
              phone: '', //手机号
              openId: '', 
              canChange: 'Y',
            }
        },
        filters: {
            setFn(value) {
                if(!value) return;
                if(value == '1') return '男';
                if(value == '2') return '女';
            }
        },
        mounted(){
            let userInfo = JSON.parse(sessionStorage.user);
            this.nickname = userInfo.nickname;
            this.phone = userInfo.phone;
            this.headImgUrl = userInfo.headImgUrl;
            this.openId = userInfo.openId;
            this.sex = userInfo.sex;
            if(userInfo.username&&userInfo.email){
                this.username = userInfo.username;
                this.email = userInfo.email;
                this.canChange = 'N';
            }
        //   this.checkOpenId();
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
            Alert,
        },
        computed: {
           
        },
        methods: {
            // 退出登陆
            loginOut(){
                loginOut(sessionStorage.openId).then(res => {
                    if(res.resultCode == '00000') {
                        sessionStorage.isLogin = 'N';
                        this.$router.push('/own');
                    }else{
                        this.$vux.alert.show({
                            title: '提示',
                            content: res.resultMsg
                        });
                    }
                })
            },
            // 编辑个人资料
            editTUser(){
                let data ={};
                data.phone = this.phone;
                data.openid = this.openId;
                data.username = this.username;
                data.email = this.email;
                const _this = this // 需要注意 onCancel 和 onConfirm 的 this 指向
                if(!this.username || !this.email){
                    this.$vux.alert.show({
                        title: '提示',
                        content: '用户名或密码为空',
                    });
                    return;
                }
                this.$vux.confirm.show({
                    title:'提示',
                    content: '用户名、邮箱修改后将不能再修改，确定修改吗？',
                    onConfirm () {
                        _this.edit(data);
                    }
                })
            },
            edit(data){
                editTUser(data).then(res => {
                    if(res.resultCode == '00000') {
                        this.canChange = 'N';
                        let userInfo = JSON.parse(sessionStorage.user);
                        sessionStorage.user = JSON.stringify(Object.assign(userInfo,{username:this.username,email:this.email}));
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
        bottom: 1.95rem;
        left: 0;
        right: 0;
        overflow: auto;
        background: #fff;
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
    .main .headImg {
        width: 1.6rem;
        height: 1.6rem;
        border-radius: 50%;
    }
    .main span {
        font-size: 0.6rem;
        color: #999;
    }
    .main input {
        text-align: right;
        font-size: 0.6rem;
    }
    .main .weui-cell.headImgCell {
        padding: 10px 20px;
    }
    .changeInfo,
    .loginOut {
        display: block;
        width: 86%;
        height: 40px;
        line-height: 40px;
        background: cadetblue;
        color: #fff;
        font-size: 0.6rem;
        text-align: center;
        margin: 1rem auto;
        border-radius: 4px;
    }
    // .loginOut {
    //     color: cadetblue;
    //     background: #d4d4d4;
    // }
</style>

