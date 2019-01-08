<template>
    <section class="wrapper">
          <div class="mindItem bgImg title">
            <div>{{TTask.name}}</div>
            <p>
              <span style="float:left;">总额：<span class="amount">￥{{TTask.amount}}</span></span>
              <span style="float:right">已加油：{{TTask.sereralCount}}</span>
            </p>
            <p>
              <span style="float:left;">感谢金：<span class="amount">￥{{TTask.forGold}}</span></span>
              <span style="float:right">已评论：{{TTask.commentCount}}</span>
            </p>
          </div>
          <div class="mindItem">
            <div class="mindPart">
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
            </div>
            <div class="mindPart">
              <div class="mindPartTitle">任务详情</div>
              <div class="mindPartContent">
                <div class="mindPareItem">
                  <div class="flexLeft">所属省市</div>
                  <div class="flexRight">{{TTask.province}}-{{TTask.city}}</div>
                </div>
                <div class="mindPareItem">
                  <div class="flexLeft">详细地址</div>
                  <div class="flexRight">{{TTask.address}}</div>
                </div>
                <div class="mindPareItem">
                  <div class="flexLeft">任务名称</div>
                  <div class="flexRight">{{TTask.name}}</div>
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
          <div class="commont">
            <div class="commontTitle">评论列表</div>
            <textarea rows="2" v-model="commentInfo" @input="inputComment"></textarea>
            <div class="commontBtn" @click="comment">提交</div>
            <div class="noCommontList" v-show="TCommentList.length==0">暂无评论</div>
            <div class="commontList">
              <section v-show="showOne&&TCommentList.length>0">
                <div class="flexLeft">
                  <img v-lazy="user.headimgurl" alt="">
                </div>
                <div class="flexRight">
                  <div>
                    <span class="name">{{user.nickname}}</span>
                    <span class="time">{{commentListOne.createTime | filterCreateTime}}</span>
                  </div>
                  <p>{{commentListOne.content}}</p>
                </div>
              </section>
              <section v-for="(item,index) in TCommentList" :key="index" v-show="showMore&&TCommentList.length>1">
                <div class="flexLeft">
                  <img v-lazy="item.tUser.wxUser.headimgurl" alt="">
                </div>
                <div class="flexRight">
                  <div>
                    <span class="name">{{item.tUser.wxUser.nickname}}</span>
                    <span class="time">{{item.createTime | filterCreateTime}}</span>
                  </div>
                  <p>{{item.content}}</p>
                </div>
              </section>
            </div>
            <p class="seeAll" @click="seeAll" v-show="showOne&&TCommentList.length>1">查看全部评论>></p>
          </div>
        </div>
    </section>
</template>
<script>
    import {getTTask,getCommentList,insertCollect,giveLike,giveComment,receive,recommend} from 'src/service/getData'
    // import { XTextarea,Search ,Checker,CheckerItem  } from 'vux'
    import {wxshare} from 'src/config/wxshare'
    import wx from 'weixin-js-sdk'
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
                isLogin: 'Y',  //判断是否登
                commentInfo: '',  //评论
                TCommentList: [],  //评论列表
                showOne: true, //显示一条评论
                showMore: false, //显示全部评论
                commentListOne: {}, //第一条评论
                user: {},
                maskShow: false,
            }
        },
        mounted(){
          this.id = this.$route.params.id;
          this.getTTask();
          console.log(wxshare)
          
        },
        components: {

        },
        computed: {
           
        },
        methods: {
          inputComment() {
            this.commentInfo = this.commentInfo.replace(/[^\u4e00-\u9fa5a-zA-Z,\.，。\?\？\……\、\;\；\''\""]+/g,'')
          },
          //获取任务详情
          getTTask() {
            getTTask({id:this.id}).then(res => {
              if(res.resultCode == '00000'){
                this.TTask = res.TTask;
                this.user = res.TTask.tUser.wxUser;
                this.getCommentList();
              }else{
                this.$vux.alert.show({title: '提示',content: res.resultMsg});
              }
            })
          },
          //获取评论列表
          getCommentList(){
            getCommentList({taskId:this.id}).then(res => {
              if(res.resultCode == '00000'){
                this.TCommentList = res.TCommentList;
                if(this.TCommentList.length>0){
                  this.commentListOne = this.TCommentList[0];
                  this.user = this.TCommentList[0].tUser.wxUser;
                }
              }else{
                this.$vux.alert.show({title: '提示',content: res.resultMsg});
              }
            })
          },
          //查看详细文档
          downloadFile(path) {
            path = 'https://www.baidu.com/img/baidu_jgylogo3.gif';
            window.location.href = path;
          },
          //评论
          comment() {
            if(this.commentInfo == ''){
              this.$vux.alert.show({title: '提示',content: '评论不能为空'});
              return
            }
            giveComment({
              openid: sessionStorage.openId,
              id: this.id,
              comment: this.commentInfo,
              commentCount: this.TTask.commentCount
            }).then(res => {
              if(res.resultCode == '00000'){
                this.$vux.toast.text('评论成功');
                this.commentInfo = '';
                this.TTask.commentCount = parseInt(this.TTask.commentCount) + 1;
                this.getCommentList();
              }else{
                this.$vux.alert.show({title: '提示',content: res.resultMsg});
              }
            })
          },
          //查看全部评论
          seeAll() {
            this.showOne = false;
            this.showMore = true;
          }
        }
    }
</script>
<style scoped>
    .wrapper {
        width: 100%;
        position: absolute;
        z-index: 110;
        /* margin-bottom: 1.95rem; */
        /* overflow: auto; */
        background: #fff;
    }
    .mask {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      /* background: rgba(0,0,0,0.5); */
      z-index: 110;
      background: url('../../images/share.png') no-repeat rgba(0,0,0,0.2);
      background-position: right top;
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
      height: 1.5rem;
      line-height: 1.5rem;
      color: #333;
      letter-spacing: 1px;
      margin-top: 0.6rem;
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
    .noCommontList {
      text-align: center;
      margin:1rem 0 0 0;
      clear: both;
      color: #666;
    }
    .commontList {
      clear: both;
      /* display: flex; */
      padding-bottom: 0.4rem;
      
    }
    .commontList section {
      display: flex;
      margin: 0.5rem;
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
      border-top: 1px solid #d4d4d4;
      padding-top: 0.6rem;
      font-size: 0.6rem;
      text-align: center;
    }
    .footer {
      position: fixed;
      height: 1.95rem;
      width: 100%;
      bottom: 0;
      display: flex;
      z-index: 103;
      background: #fff;
      font-size: 0.45rem;
      text-align: center;
      padding: 0.3rem;
      box-sizing: border-box;
    }
    .footer div {
      flex: 1;
    }
    
</style>

