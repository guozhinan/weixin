<template>
    <section class="wrapper">
        <!-- 浮层 -->
        <section class="master" @click="hideSort" v-show="masterShow"></section>
        <!-- <head-top head-title="想法中心"></head-top> -->
        <section class="search">
          <i class="fa fa-search"></i>
          <input type="search" v-model="submitParams.name" class="searchInput"/>
          <div class="searchBtn" @click="getAllTTask">搜索</div> 
        </section>
        <section class="sortContainer">
          <div class="sortList">
            <div class="sortItem" @click="show('area')">地区  <i></i></div>
            <div class="sortItem" @click="show('time')">发布时间  <i></i></div>
            <div class="sortItem" @click="show('amountList')">预算  <i></i></div>
            <div class="sortItem" @click="show('repay')">收益  <i></i></div>
            <div class="sortItem" @click="show('thankFee')">感谢金  <i></i></div>
          </div>
            <div class="sortInfo" v-if="masterShow">
              <div class="showArea" v-show="itemShow.area">
                <popup-picker title="地区" :data="provinceList" v-model="area" :columns="columns" show-name @on-hide="hideHandle" @on-change="changeHandle" placeholder="请选择"></popup-picker>
              </div>
              <div class="showRepay" v-show="itemShow.repay">
                <div class="amountList">
                  <radio :options="repay" v-model="submitParams.returnType"></radio>
                  <!-- <x-switch title="一次性回报" v-model="repay.value1"></x-switch>
                  <x-switch title="收益比" v-model="repay.value2"></x-switch>
                  <x-switch title="月收入" v-model="repay.value3"></x-switch> -->
                </div>
                <div class="repayBtns" >
                  <div class="clear" @click="clearAmount('returnType')">重置</div>
                  <div class="finish" @click="finishSearch">完成</div>                
                </div>
              </div>
              <div class="showTime" v-show="itemShow.time">
                <div class="repayList">
                  <radio :options="time" v-model="submitParams.publicTime"></radio>
                </div>
                <div class="timeBtns">
                  <div class="clear" @click="clearAmount('publicTime')">重置</div>
                  <div class="finish" @click="finishSearch">完成</div>                
                </div>
              </div>
              <div class="showAmount" v-show="itemShow.amountList">
                <div class="repayList">
                  <radio :options="amountList" v-model="submitParams.amount"></radio>
                </div>
                <div class="amountBtns">
                  <div class="clear" @click="clearAmount('amount')">重置</div>
                  <div class="finish" @click="finishSearch">完成</div>             
                </div>
              </div>
              <div class="showThankFee" v-show="itemShow.thankFee">
                <div class="repayList">
                  <radio :options="thankFee" v-model="submitParams.forGold"></radio>
                </div>
                <div class="thankFeeBtns">
                  <div class="clear" @click="clearAmount('forGold')">重置</div>
                  <div class="finish" @click="finishSearch">完成</div>             
                </div>
              </div>
            </div>
          <!-- </transition>   -->
        </section>
        <div class="noMindList" v-show="mindList.length==0">
          <div>
            <span class="logo"></span><br><br>
            <span class="info">暂无列表~~快去发布吧</span>
          </div>
        </div>
        <div ref="mindList" class="mindList" v-show="mindList.length>0">
          <div class="listWrapper" ref="listWrapper">
            <router-link :to="{name:'mindItem',params:{id:item.id}}" class="mindItem" :key="index" v-for="(item,index) in mindList">
              <div class="flexLeft">
                <img :src="item.tUser.wxUser.headimgurl"></img>
              </div>
              <div class="flexRight">
                <div class="flexRightItem title">{{item.name}}</div> 
                <div class="flexRightItem num">
                  <span>已点赞：{{item.sereralCount}}</span>
                  <span>已评论：{{item.commentCount}}</span>                
                </div>
                <div class="amount">￥{{item.amount}}</div>
              </div>            
            </router-link>
          </div>
        </div>
    </section>
</template>
<script>
    import headTop from 'src/components/header/head'
    import {getAllTTask,getOpenid} from 'src/service/getData'
    import { Group, Cell, Drawer,PopupPicker,Picker,XInput, XTextarea,Search ,Checker,CheckerItem,XAddress,ChinaAddressV4Data,Value2nameFilter as value2name,XSwitch,Radio    } from 'vux'
    import {province} from 'src/config/province'
    import {getMore} from 'src/config/getMore'
    import {check} from 'src/config/checkLogin'
    export default {
      data(){
            return{
              mindList: [],
              area: [],
              addressData: ChinaAddressV4Data,  //省市区三级联动数据
              district: true,  //true为隐藏所属省市区中的区
              provinceList: province,
              amountList: [
                {key: '01',value: '0-1000'},
                {key: '02',value: '1000-5000'},
                {key: '03',value: '5000-10000'},
                {key: '04',value: '10000以上'}
              ],
              time: [
                {key: '01',value: '全部'},
                {key: '02',value: '最新'},
                {key: '03',value: '一周之内'},
                {key: '04',value: '一月之内'}
              ],
              repay: [
                {key: '01',value: '一次性回报'},
                {key: '02',value: '收益比'},
                {key: '03',value: '月收入'},
              ],
              thankFee: [
                {key: '01',value: '0-100'},
                {key: '02',value: '100-500'},
                {key: '03',value: '500-1000'},
                {key: '04',value: '1000以上'}
              ],
              masterShow: false,
              itemShow: {
                area: false,
                time: false,
                amountList: false,
                repay: false,
                thankFee: false,
              },
              columns: 1,  //地区picker只有一列
              submitParams: {
                type: '01',  //任务类型
                name: '',  //搜索框内容
                province: '', //地区搜索
                publicTime: '', //发布时间搜索
                amount: '',  //预算搜索
                returnType: '', //收益搜索
                forGold: '',  //感谢金搜索
                pageNum: 1,
                pageSize: 20,  
              },
              scroll: false,
            }
        },
        mounted(){
          this.submitParams.type = this.$route.params.id;
          // console.log(province)
          this.checkOpenId();
          let _this = this;
          let mindListDom = this.$refs.mindList;
          let wrapperDom = this.$refs.listWrapper;
          mindListDom.onscroll = function() {
            console.log(1111)
            if(getMore.isScrollToPageBottom(mindListDom,wrapperDom)) {
              console.log(222)
              getMore.getScrollData(_this.scroll,_this.submitParams.pageNum,_this.getAllTTask)
            }
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
            Search,
            XAddress,
            XSwitch,
            Radio  
        },
        computed: {
           
        },
        methods: {
          //判断是否有openId
          checkOpenId() {
            let code = check.getUrlParam('code');
            if(sessionStorage.openId){//判断是否登陆
              check.checkLogin(sessionStorage.openId,this.getAllTTask);
            }else if(code){//获取openid
              check.getOpenid(code,this.getAllTTask);
            }
          },
          hideHandle() {
            this.masterShow = false;
          },
          changeHandle() {
            this.submitParams.province = this.area == ''?'':value2name(this.area,province).split(' ')[0];
            this.getAllTTask();
          },
          clearAmount(type) {
            this.submitParams[type] = '';
          },
          finishSearch() {
            this.masterShow = false;
            let keys = Object.keys(this.itemShow);
            keys.forEach(i => this.itemShow[i] = false);
            this.getAllTTask();
          },
          hideSort() {
            this.masterShow = false;
          },
          getAllTTask(pageNum) {
            let params = this.submitParams;
            if(pageNum) {
              this.submitParams.pageNum = pageNum;              
            }else{
              this.submitParams.pageNum = 1;     
            }
            getAllTTask(params).then(res => {
              if(res.resultCode == '00000'){
                this.mindList = res.TTaskList;
                // this.mindList = [...this.mindList,...res.TTaskList];
                // if(this.mindList.length>=60){
                //   this.scroll = false;
                // }else{
                //   this.scroll = true;
                // }
                
              }else{
                this.$vux.alert.show({
                  title: '提示',
                  content: res.resultMsg
                });
              }
            })
          },
          show(type){
            let keys = Object.keys(this.itemShow);
            keys.forEach(item => {
              if(item == type){
                this.masterShow = !this.itemShow[item];
                this.itemShow[item] = !this.itemShow[item];
              } else{
                this.itemShow[item] = false;
              }
            })
          },
          gotoAddress(path) {
            this.$router.push(path);
          }
        }
    }
</script>
<style scoped>
    .master {
      position: fixed;
      top: 3rem;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.3);
      z-index: 104;
    }
    .search {
      position: absolute;
      top: 0;
      width: 100%;
      padding: 0.7rem 0.4rem;
      display: flex;
      height: 2.6rem;
      background: cadetblue;
    }
    .search .fa-search {
      color: #999;
      font-size: 0.6rem;
      position: absolute;
      left: 0.8rem;
      top: 1rem
    }
    .search .searchInput {
      flex: 1;
      line-height: 1.2rem;
      border: 1px solid #ccc;
      margin-right: 0.4rem;
      padding: 0 1.2rem;;
      border-radius: 0.6rem;
      color: #666;
    }
    .search .searchInput:focus {
      border: 1px solid cadetblue;
    }
     .search .searchBtn {
      /* width: 2.4rem; */
      height: 1.2rem;
      width: 2rem;
      line-height: 1.2rem;
      text-align: center;
      font-size: .6rem;
      color: #fff;
    } 
    .mindList {
      position: absolute;
      top: 4.3rem;
      bottom: 1.95rem;
      left: 0;
      right: 0;
      overflow: auto;
      background: #fff;
    }
    .noMindList {
      position: absolute;
      top: 4.3rem;
      bottom: 1.95rem;
      left: 0;
      right: 0;
      overflow: auto;
      background: #fff;
      font-size: 0.6rem;
    }
    .noMindList div {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      text-align: center;
    }
    .noMindList .logo{
      /* margin-top: 7rem; */
      display: inline-block;
      width: 4rem;
      height: 4rem;
      background: url(../../images/go_logo_1.jpg) no-repeat;
      background-size: 100% 100%; 
    }
    .mindItem {
      display: flex;
      font-size: 0.6rem;
      padding: 0.3rem;
      box-sizing: content-box;
      border-bottom: 1px solid #f4f4f4;
    }
    .flexLeft {
      width: 3rem;
      margin-right: 0.4rem;
    }
    .flexLeft img{
      width: 2.4rem;
      height: 2.4rem;
      margin-top: 0.3rem;
      border-radius: 50%;
    }    
    .flexRight {
      flex: 1;
      /* display: flex;
      flex-direction: column; */
      position: relative;
      font-size: 0.6rem;
    }
    .flexRightItem {
      /* flex: 1; */
      /* height: 24px; */
      /* line-height: 24px; */
      display: flex;
    }
    .flexRightItem span {
      flex: 1;
      color: #666;
    }
     .flexRightItem span i {
       color: cadetblue;
     }
    .flexRightItem.title {
      font-size: 0.6rem;
      height: 28px;
      line-height: 28px;
      color: #333;
      margin-top: 0.2rem;
    }
    .flexRightItem.name,
    .flexRightItem.num {
      font-size: 0.5rem;
      color: #888;
      /* margin-top: 0.2rem; */
    }
    .amount {
      /* position: absolute; */
      /* right: 0.2rem; */
      /* top: 50%; */
      /* transform: translateY(-50%); */
      color: #f60;
      font-size: 0.5rem;
      margin-top: 0.6rem;
      /* text-align: right; */
    }
    .sortContainer {
      position: fixed;
      width: 100%;
      height: 1.6rem;
      top: 2.6rem;
      z-index: 105;
      background: #fff;
      font-size: 0.6rem;
    }
    .sortContainer .sortList {
      width: 100%;
      height: 100%;
      display: flex;
    }
    .sortContainer .sortItem {
      flex: 1;
      text-align: center;
      line-height: 1.6rem;
      font-size: 0.5rem;
      vertical-align: middle;
      color: #666;
      /* border-right: 1px solid #d4d4d4; */
    }
    .sortContainer .sortItem i {
      display: inline-block;
      width: 0;
      height: 0;
      border-top: 0.2rem solid #999;
      border-left: 0.2rem solid transparent;
      border-bottom: 0.2rem solid transparent;
      border-right: 0.2rem solid transparent;
      margin-top: 0.2rem;
      /* border-right: 1px solid #666; */
      /* transform: rotate(45deg); */
      vertical-align: middle;
    }
    .sortContainer .sortInfo {
      position: absolute;
      top: 1.6rem;
      left: 0;
      width: 100%;
      min-height: 3rem;
      z-index: 107;
      background: #fff;
      /* border */
      box-shadow: 0 0.02667rem 0.05333rem rgba(0, 0, 0, 0.1)
    }
    .showArea {
      padding: 0.6rem;
    }
    .showAmount .amountList,
    .showRepay .repayList{
      margin: 0.6rem auto;
      /* border-top: 1px solid #f4f4f4; */
      /* border-bottom: 1px solid #f4f4f4; */
    }
    .showAmount .amountBtns,
    .showRepay .repayBtns,
    .showTime .timeBtns,
    .showThankFee .thankFeeBtns {
      width: 100%;
      height: 1.5rem;
      line-height: 1.5rem;
      font-size: 0.6rem;
      display: flex;
      border-top: 1px solid #f4f4f4;
      
    }
    .amountBtns div:first-child,
    .repayBtns div:first-child,
    .timeBtns div:first-child,
    .thankFeeBtns div:first-child {
      border-right: 1px solid #f4f4f4;
    }
    .amountBtns div,
    .repayBtns div,
    .timeBtns div,
    .thankFeeBtns div {
      flex: 1;
      text-align: center;
    }
    .amountBtns .finish,
    .repayBtns .finish,
    .timeBtns .finish,
    .thankFeeBtns .finish {
      color: cadetblue;
    }
    .slide-fade-enter-active {
      transition: all .3s ease;
    }
    .slide-fade-leave-active {
      transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
      transform: translate(0); 
      opacity: 0;
    }
    

</style>

