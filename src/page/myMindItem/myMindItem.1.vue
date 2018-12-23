<template>
    <section class="wrapper">
          <div class="mindItem bgImg title">
            <div>{{TTask.name}}</div>
            <p>
              <span style="float: left;">已加油：<span class="amount">{{TTask.sereralCount}}</span></span>
              <span style="float: right;">已评论：<span class="amount">{{TTask.commentCount}}</span></span>
              
            </p>
          </div>
          <div class="mindItem mindDetail">
            <div class="flexRight"> 
              <div class="flexRightItem">发布时间：{{TTask.createTime | createTime}}</div>  
              <div class="flexRightItem">发布类型：{{TTask.type | mindType}}</div>  
              <div class="flexRightItem">所属省市： {{TTask.province}}-{{TTask.city}}</div>
              <div class="flexRightItem">详细地址： {{TTask.address}}</div>  
              <div class="flexRightItem">预算总额（元）： {{TTask.amount}}</div>  
              <div class="flexRightItem">感谢金（元）： {{TTask.forGold}}</div>        
              <div class="flexRightItem">预计收益：{{TTask.returnType | repay}}</div> 
              <div class="flexRightItem">任务描述：{{TTask.taskDescribe}}</div> 
              <div class="flexRightItem">任务详细文档：<a>下载查看</a></div>
            </div>            
          </div>
        </div>
        <div class="bottom">
          <div class="editor" @click="goAddress">编辑</div>
        </div>
    </section>
</template>
<script>
    import headTop from 'src/components/header/head'
    import alertTip from 'src/components/common/alertTip' 
    import {getTTask} from 'src/service/getData'
    import { Group, Cell, Drawer,PopupPicker,Picker,XInput, XTextarea,Search ,Checker,CheckerItem  } from 'vux'
    export default {
      data(){
            return{
                showAlert: false,
                alertText: null,
                results: [],
                value: 'test',
                TTask: {}
      
            }
        },
        mounted(){
          this.id = this.$route.params.id;
          this.getTTask();
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
            Search
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
          repay(value) {
            if(!value) return;
            if(value == '01') return '一次性回报';
            if(value == '02') return '收益比';
            if(value == '03') return '月收入';
          }
        },
        computed: {
           
        },
        methods: {
            getTTask() {
              getTTask({id:this.id}).then(res => {
                if(res.resultCode == '00000'){
                  this.TTask = res.TTask;
                }else{
                  this.$vux.alert.show({
                    title: '提示',
                    content: res.resultMsg
                  });
                }
              })
            },
            goAddress() {
              this.$router.push({name:'editor',params:{id:this.id}});
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
      background: url('../../images/own_bg-1.jpg') no-repeat;
      height: 4rem;
      background-size: 100% 100%;
    }
    .title {
      padding: 0.5rem;
      border-bottom: 1px solid #d4d4d4;
      overflow: hidden;
    }
    .title div {
      font-size: 0.8rem;
      height: 2rem;
      line-height: 2rem;
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
      color: #f60;
    }
    .title .icon {
      color: #f60;
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
    .flexRightItem a {
      color: cadetblue;
      border-bottom: 1px solid cadetblue;
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
      padding-left: 0.4rem; 
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
      padding: 0.4rem 0.4rem 0.4rem 0;
      clear: both;
      display: flex;
      padding-bottom: 0.4rem;
      /* border-bottom: 1px solid #d4d4d4; */
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
    .mindDetail {
      padding-bottom: 2.4rem;
    }
    .bottom {
      position: fixed;
      bottom: 1.95rem;
      left: 0;
      width: 100%;
      height: 2.4rem;
      z-index: 106;
      background: #fff;
    }
    .editor {
      width: 90%;
      margin: 0.5rem auto;
      height: 1.4rem;
      line-height: 1.4rem;
      text-align: center;
      font-size: 0.65rem;
      border: 1px solid #ccc;
      color: cadetblue;
      border-radius: 4px;
    }
</style>

