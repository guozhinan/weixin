<template>
    <section class="wrapper">
          <!-- <head-top head-title="想法中心"></head-top> -->
          <div class="mindItem bgImg title">
            <div>测试测试测试测试测试测试</div>
            <p>
              <span style="float:left;">总额：<span class="amount">￥8080</span></span>
              <span style="float:right"><i class="icon iconfont icon-dianzan1"></i>已加油：2</span>
            </p>
            <p>
              <span style="float:left;">推荐感谢金：<span class="amount">￥100</span></span>
              <span style="float:right">自荐感谢金：<span class="amount">￥200</span></span>
            </p>
          </div>
          <div class="mindItem">
            <div class="flexRight"> 
              <div class="flexRightItem">发布人：善谋文化公司</div>
              <div class="flexRightItem">发布时间：2018-10-20</div>  
              <div class="flexRightItem">想法类型：任务发布</div>  
              <div class="flexRightItem">所属地区： 上海市-黄浦区</div>
              <div class="flexRightItem">回报收益：利润率10%以下</div> 
              <div class="flexRightItem">任务简介：测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</div>  
              <div class="flexRightItem">想法环境：</div>
              <div class="imgWrapper">
                <img src="../../images/go_logo.jpg" alt="">
                <img src="../../images/go_logo.jpg" alt="">
                <img src="../../images/go_logo.jpg" alt=""> 
              </div>         
            </div>            
          </div>
          <div class="commont">
            <div class="commontTitle">评论列表</div>
            <textarea rows="2"></textarea>
            <div class="commontBtn">提交</div>
            <div class="commontList">
              <div class="flexLeft">
                <img src="../../images/go_logo_1.png" alt="">
              </div>
              <div class="flexRight">
                <div>
                  <span class="name">果汁</span>
                  <span class="time">2018-11-13</span>
                </div>
                <p>这种方法有一个非常明显的好处就是不必提前知道被居中元素的尺寸了，因为transform中translate偏移的百分比就是相对于元素自身的尺寸而言的。</p>
              </div>
            </div>
            <p class="seeAll">查看全部评论>></p>
          </div>
        </div>
        <div class="footer">
          <div @click="collection" :class="{'collectionShow':collectionShow}">
            <i class="fa fa-heart-o"></i>
            我要收藏
          </div>
          <div @click="tryHandle" :class="{'tryShow':tryShow}">
            <i class="fa fa-hand-pointer-o"></i>
            我想试试
          </div>
          <div @click="share" :class="{'shareShow':shareShow}">
            <i class="fa fa-paper-plane-o"></i>
            我要推荐
          </div>
        </div>
    </section>
</template>
<script>
    import {getTTask} from 'src/service/getData'
    // import { XTextarea,Search ,Checker,CheckerItem  } from 'vux'
    export default {
      data(){
            return{
                collectionShow: false,  //收藏
                tryShow: false,  //试试
                shareShow: false,  //推荐
                id:'',  //任务id
            }
        },
        mounted(){
          this.id = this.$route.params.id;
          this.getTTask();
        },
        components: {

        },
        computed: {
           
        },
        methods: {
          getTTask() {
            getTTask({id:this.id}).then(res => {
              if(res.resultCode == '00000'){
                console.log(res)
              }else{
                this.$vux.alert.show({
                  title: '提示',
                  content: res.resultMsg
                });
              }
            })
          },
           //我要收藏
          collection() {
            this.collectionShow = true;
          },
          //我想试试
          tryHandle() {
            this.tryShow = true;
          },
          //我要推荐
          share() {
            this.shareShow = true;
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
    .mindItem .flexRight {
      margin-top: 1rem;
      color: #666;
      display: flex;
      flex-direction: column;
    }
    .flexRightItem {
      flex: 1;
      line-height: 1rem;
      margin-bottom: 6px;
    }
    .imgWrapper {
      display: flex;
    }
    .imgWrapper img {
      width: 30%;
      height: 3.2rem;
      margin-right: 4%;
    }
    .commont {
      padding: 0.4rem;
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
      display: flex;
      z-index: 103;
      background: #fff;
      font-size: 0.6rem;
      text-align: center;
      line-height: 1.95rem;
    }
    .footer div {
      flex: 1;
    }
    .footer .collectionShow,
    .footer .tryShow,
    .footer .shareShow,
    .footer .collectionShow i,
    .footer .tryShow i,
    .footer .shareShow i {
      color: cadetblue;
    }
</style>

