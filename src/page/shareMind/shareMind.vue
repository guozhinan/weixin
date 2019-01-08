<template>
    <section class="wrapper">
          <div class="mindItem bgImg title">
            <div>您的朋友分享了一个任务，等待您领取</div> 
          </div>
          <div class="mindItem">
            <!--<div class="mindPart">
              <div class="mindPartTitle">发布信息</div>
              <div class="mindPartContent">
                <div class="mindPareItem">
                  <div class="flexLeft">发布时间</div>
                  <div class="flexRight">{{TTask.createTime | filterCreateTime}}</div>
                </div>
                <div class="mindPareItem">
                  <div class="flexLeft">发布人</div>
                  <div class="flexRight">{{user.nickname}}</div>
                </div>
                
              </div>
            </div>-->
            <div class="mindPart">
              <div class="mindPartTitle">任务详情</div>
              <div class="mindPartContent">
                <div class="mindPareItem">
                  <div class="flexLeft">任务名称</div>
                  <div class="flexRight">{{TTask.name}}</div>
                </div>
                <div class="mindPareItem">
                  <div class="flexLeft">所属省市</div>
                  <div class="flexRight">{{TTask.province}}-{{TTask.city}}</div>
                </div>
                <div class="mindPareItem">
                  <div class="flexLeft">详细地址</div>
                  <div class="flexRight">{{TTask.address}}</div>
                </div>
                <div class="mindPareItem">
                  <div class="flexLeft">预算总额</div>
                  <div class="flexRight">￥{{TTask.amount}}</div>
                </div>
                <div class="mindPareItem">
                  <div class="flexLeft">预算收益</div>
                  <div class="flexRight">{{TTask.returnType | filterRepay}}</div>
                </div>
                <div class="mindPareItem">
                  <div class="flexLeft">任务描述</div>
                  <div class="flexRight">{{TTask.taskDescribe}}</div>
                </div>
                <div class="mindPareItem">
                  <div class="flexLeft">任务详细文档</div>
                  <div class="flexRight download"><span @click="downloadFile(TTask.fileTask)">点击查看</span></div>
                </div>
                <div class="mindPareItem">
                  <div class="flexLeft">感谢金</div>
                  <div class="flexRight">￥{{TTask.forGold}}</div>
                </div>
              </div>
            </div>
          
        </div>
        <div class="footer">
          <x-button @click.native="receive">立即领取</x-button>
          <!--<div @click="collection" :class="{'collectionShow':collectionShow}">
            立即领取
          </div>-->
        </div>
    </section>
</template>
<script>
    import {getTTask,getCommentList,shareInfo,receive,getOpenid} from 'src/service/getData'
    import { XButton  } from 'vux'
    import {check} from 'src/config/checkLogin'
    export default {
      data(){
            return{
                collectionShow: false,  //收藏
                sereralShow: false, //加油
                tryShow: false,  //试试
                shareShow: false,  //推荐
                id:'',  //任务id
                TTask: {},   //任务详情
                user: {},
                isLogin: 'Y',  //判断是否登录
                taskId: '',  //任务Id
            }
        },
        mounted(){
          this.shareId = this.$route.query.shareId;
          this.checkOpenId();
        },
        components: {
          XButton
        },
        computed: {
           
        },
        methods: {
          //获取任务详情
          shareInfo() {
            shareInfo({id:this.shareId}).then(res => {
              if(res.resultCode == '00000'){
                this.TTask = res.tShare.tTask;
                this.taskId = res.tShare.taskId;
                // this.user = res.tShare.tUser.wxUser;
              }else{
                this.$vux.alert.show({title: '提示',content: res.resultMsg});
              }
            })
          },
          //获取评论列表
          getCommentList(){
            getCommentList({id:this.id}).then(res => {
              if(res.resultCode == '00000'){
                console.log(res);
              }else{
                this.$vux.alert.show({title: '提示',content: res.resultMsg});
              }
            })
          },
          //我想试试接口
          receive() {
            receive({
              openid: sessionStorage.openId,
              taskId: this.taskId,
              shareId:this.shareId
            }).then(res => {
              if(res.resultCode == '00000'){
                this.$vux.toast.text('任务领取成功')
              }else{
                this.$vux.alert.show({title: '提示',content: res.resultMsg});
              }
            })
          },
          //判断是否有openId
            checkOpenId() {
              let code = check.getUrlParam('code');
              if(sessionStorage.openId){//判断是否登陆
                check.checkLogin(sessionStorage.openId,this.shareInfo)
              }else if(code){//获取openid
                check.getOpenid(code,this.shareInfo);
              }
            },
            // showInfo() {
            //   let isLogin = sessionStorage.isLogin;
            //   if(sessionStorage.isLogin != 'Y'){
            //     sessionStorage.currentUrl = location.href;
            //     this.$router.push('/login');
            //   }
            // },


         
          //查看详细文档
          downloadFile(path) {
            path = 'https://www.baidu.com/img/baidu_jgylogo3.gif';
            window.location.href = path;
          }
        }
    }
</script>
<style scoped>
    .wrapper {
        position: absolute;
        top: 0;
        bottom: 1.95rem;
        left: 0;
        right: 0;
        overflow: auto;
        background: #fff;
    }
    .bgImg {
      /* background: url('../../images/own_bg-1.jpg') no-repeat; */
      height: 4rem;
      background-size: 100% 100%;
      /* filter: url(10px);  FireFox, Chrome, Opera  */
      /* -webkit-filter: blur(6px); /* Chrome, Opera */
       /* -moz-filter: blur(6px);
        -ms-filter: blur(6px);    
            filter: blur(6px); */
      /* filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius=6, MakeShadow=false);  */ 
    }
    .title {
      padding: 0.5rem;
      border-bottom: 1px solid #d4d4d4;
      overflow: hidden;
    }
    .title div {
      font-size: 0.8rem;
      height: 3rem;
      line-height: 3rem;
      color: #333;
      letter-spacing: 1px;
      margin-top: 0.6rem;
      text-align: center;
    }
    .title p {
      overflow: hidden;
      margin-bottom: 0.2rem;
    }
    .title span {
      font-size: 0.6rem;
      color: #666;
    }
    .title .amount {
      color: cadetblue;
    }
    .title .icon {
      color: cadetblue;
    }
    .money {
      display: flex;
      font-size: 0.7rem;
      color: #666;
      border-bottom: 1px solid #d4d4d4;
      /* padding: 0.4rem; */
    }
    .money div {
      flex: 1;
      display: flex;
      flex-direction: column;
      margin: 0.3rem 0;
      padding: 0.4rem;
    }
    .money div:first-child {
      border-right: 1px solid #d4d4d4;
    }
    .money div span {
      flex: 1;
    }
    .mindItem {
      /* margin-top: 1rem; */
      font-size: 0.6rem;
      padding: 0.4rem;
      box-sizing: content-box;
      /* margin-bottom: 1rem; */
    }
    .mindItem .mindPart {
      /* margin-left: 0.4rem; */
       padding: 0.4rem 0; 
      border-bottom: 1px solid #f4f4f4;
    }
    .mindItem .mindPart .mindPartTitle {
      font-size: 0.6rem;
      color: #333;
      line-height: 1.4rem;
    }
    .mindItem .mindPart .mindPartContent {
      padding-left: 0.4rem;
      display: flex;
      flex-direction: column;
    }
    .mindItem .mindPart .mindPartContent .mindPareItem {
      flex: 1;
      margin: 0;
      line-height: 1.2rem;
      /* display: flex; */
    }
    .mindItem .download span {
      color: cadetblue!important;
      border-bottom: 1px solid cadetblue; 
    }
    .mindItem .mindPart .mindPartContent .flexLeft {
      float: left;
      width: 30%;
      margin: 0;
      color: #999;
    }
    .mindItem .mindPart .mindPartContent .flexRight {
      float: right;
      max-width: 70%;
      flex: 1;
      margin: 0;
      color: #999;
      text-align: justify;
    }
    
    .commont {
      padding: 0.4rem 0;
      font-size: 0.6rem;
      overflow: hidden;
    }
    .commont textarea {
      width: 100%;
      height: 2rem;
      border: 1px solid #d4d4d4;
      padding: 3px 6px;
      border-radius: 4px;
      margin: 0.3rem 0;
    }
    .commont .commontBtn {
      float: right;
      width: 3rem;
      text-align: center;
      height: 1.2rem;
      line-height: 1.2rem;
      background: cadetblue;
      color: #fff;
      border-radius: 0.6rem;
      margin-bottom: 0.6rem;
    }
    .commontList {
      clear: both;
      display: flex;
      padding-bottom: 0.4rem;
      border-bottom: 1px solid #d4d4d4;
    }
    .commontList .flexLeft {
      width: 2.2rem;
      margin-right: 0.3rem;
    }
    .commontList img {
      width: 2rem;
      height: 2rem;
    }
    .commontList .flexRight {
      flex: 1;
      font-size: 0.6rem;
    }
    .commontList .flexRight p {
      font-size: 0.5rem;
      color: #666;
    }
    .seeAll {
      margin-top: 0.6rem;
      font-size: 0.6rem;
      text-align: center;
    }
    .footer {
      position: fixed;
      height: 1.95rem;
      width: 100%;
      bottom: 0;
      z-index: 103;
      background: #fff;
      font-size: 0.6rem;
      text-align: center;
      line-height: 0.95rem;
    }
    .footer .weui-btn_default {
      width: 80%;
      background: cadetblue;
      color: #fff;
      border-radius: 4px;
    }

</style>

