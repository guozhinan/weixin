<template>
    <section class="wrapper">
        <!-- 浮层 -->
        <section class="master" @click="hideSort" v-show="masterShow"></section>
        <!-- <head-top head-title="想法中心"></head-top> -->
        <section class="search">
          <input type="search" class="searchInput"/>
          <div class="searchBtn">搜索</div>
        </section>
        <section class="sortContainer">
          <div class="sortList">
            <div class="sortItem" @click="show('area')">地区  <i></i></div>
            <div class="sortItem" @click="show('amount')">预算  <i></i></div>
            <div class="sortItem" @click="show('repay')">收益  <i></i></div>
          </div>
          <div class="sortInfo" v-show="masterShow">
            <div class="showArea" v-show="itemShow.area">
              <x-address ref="area" @on-hide="hideHandle" title="所属省市" v-model="area" :list="addressData" placeholder="请选择地址"   :hide-district="district"></x-address>
            </div>
            <div class="showAmount" v-show="itemShow.amount">
              <div class="amountList">
                <x-switch title="一次性回报" v-model="amount.value1"></x-switch>
                <x-switch title="收益比" v-model="amount.value2"></x-switch>
                <x-switch title="月收入" v-model="amount.value3"></x-switch>
              </div>
              <div class="amountBtns" >
                <div class="clear" @click="clearAmount">重置</div>
                <div class="finish" @click="finishSearch">完成</div>                
              </div>
            </div>
            <div class="showRepay" v-show="itemShow.repay">
              <div class="repayList">
                <x-switch title="0-1000" v-model="repay.value1"></x-switch>
                <x-switch title="1000-5000" v-model="repay.value2"></x-switch>
                <x-switch title="5000-10000" v-model="repay.value3"></x-switch>
                <x-switch title="10000以上" v-model="repay.value3"></x-switch>
              </div>
              <div class="repayBtns">
                <div class="clear" @click="clearAmount">重置</div>
                <div class="finish" @click="finishSearch">完成</div>                
              </div>
            </div>
          </div>
        </section>
        <div class="noMindList" v-show="mindList.length==0">
          <div>
            <span class="logo"></span><br><br>
            <span class="info">暂无请求~~快去发布吧</span>
          </div>
        </div>
        <div class="mindList" v-show="mindList.length>0">
          <!-- <router-link to="/mindList/mindItem" class="mindItem" :key="index" v-for="(item,index) in mindList">
            <div class="flexLeft">
              <img :src="item.tUser.wxUser.headimgurl"></img>
            </div>
            <div class="flexRight">
              <div class="flexRightItem title">{{item.name}}</div> 
              <div class="flexRightItem name">{{item.tUser.wxUser.nickname}}</div>
              <div class="amount">￥{{item.amount}}</div>
            </div>            
          </router-link> -->
          <router-link :to="{name:'mindItem',params:{id:item.id}}" class="mindItem" :key="index" v-for="(item,index) in mindList">
              <div class="mindItemTop">
                <span class="left">{{item.type | mindType}}</span>
                <span class="right">{{item.createTime | createTime}}</span>
              </div>
              <div class="mindItemName">{{item.name}}</div> 
              <div class="mindItemDes">
                <div class="left">
                  <img :src="item.tUser.wxUser.headimgurl"></img>
                </div>
                <p class="right">{{item.taskDescribe}}</p>
              </div>
              <div class="mindItemAmount">
                <span class="left">{{item.status | mindStatus}}</span>
                <span class="right">￥{{item.amount}}</span>
              </div>
              <div class="mindItemAmount">
                <span class="left">评论数：{{item.status | mindStatus}}</span>
                <span class="right">点赞数：￥{{item.amount}}</span>
              </div>            
          </router-link>
        </div>
    </section>
</template>
<script>
    import headTop from 'src/components/header/head'
    import {getAllTTask} from 'src/service/getData'
    import { Group, Cell, Drawer,PopupPicker,Picker,XInput, XTextarea,Search ,Checker,CheckerItem,XAddress,ChinaAddressV4Data,Value2nameFilter as value2name,XSwitch   } from 'vux'
    export default {
      data(){
            return{
              mindList: [],
              area: [],
              addressData: ChinaAddressV4Data,  //省市区三级联动数据
              district: true,  //true为隐藏所属省市区中的区
              amount: {
                value1: false,
                value2: false,
                value2: false,
              },
              repay: {
                value1: false,
                value2: false,
                value3: false,
                value4: false,
              },
              masterShow: false,
              itemShow: {
                area: false,
                amount: false,
                repay: false,
              }
            }
        },
        mounted(){
          this.getAllTTask();
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
            XSwitch 
        },
        computed: {
           
        },
        filters: {
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
          hideHandle() {
            this.masterShow = false;
            // this.areaName = value2name(this.area,ChinaAddressV4Data).split(' ');
          },
          clearAmount() {
            let keys = Object.keys(this.amount);
            keys.forEach(i => this.amount[i] = false);
          },
          finishSearch() {
            this.masterShow = false;
            let keys = Object.keys(this.itemShow);
            keys.forEach(i => this.itemShow[i] = false);
          },
          hideSort() {
            this.masterShow = false;
          },
          getAllTTask() {
            let params = {
              pageNum: 1,
              pageSize: 20
            }
            getAllTTask(params).then(res => {
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
            // this.itemShow[type] = true;
          }
        }
    }
</script>
<style scoped>
    .master {
      position: fixed;
      top: 1.95rem;
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
      padding: 0.4rem;
      display: flex;
      height: 2rem;
    }
    .search .searchInput {
      flex: 1;
      line-height: 1.2rem;
      border: 1px solid #ccc;
      margin-right: 0.4rem;
      padding: 0 8px;
    }
    .search .searchInput:focus {
      border: 1px solid cadetblue;
    }
    .search .searchBtn {
      width: 2.4rem;
      line-height: 1.2rem;
      text-align: center;
      font-size: .6rem;
      color: #fff;
      background: cadetblue;
      border-radius: 0.6rem;
    }
    .noMindList {
      position: absolute;
      top: 4rem;
      bottom: 1.95rem;
      left: 0;
      right: 0;
      overflow: auto;
      background: #f3f5f7;
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
      top: 4rem;
      bottom: 1.95rem;
      left: 0;
      right: 0;
      overflow: auto;
      background: #f3f5f7;
    }
    .mindItem {
      width: 100%;
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
      /* display: flex; */
    }
    .mindItemDes .right {
      width: 70%;
      display: inline-block;
       /* float: left;  */
      text-align: left;
      vertical-align: middle;
    }
    .mindItemDes .left {
      display: inline-block;
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 0.5rem;
    }
    .mindItemDes .left img {
      width: 3rem;
      height: 3rem;
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
    .sortContainer {
      position: fixed;
      width: 100%;
      height: 1.95rem;
      top: 1.95rem;
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
      line-height: 1.95rem;
      /* border-right: 1px solid #d4d4d4; */
    }
    .sortContainer .sortItem i {
      display: inline-block;
      width: 0.3rem;
      height: 0.3rem;
      border-bottom: 1px solid #666;
      border-right: 1px solid #666;
      transform: rotate(45deg);
      vertical-align: middle;
    }
    .sortContainer .sortInfo {
      position: absolute;
      top: 1.95rem;
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
    .showRepay .repayBtns {
      width: 100%;
      height: 1.5rem;
      line-height: 1.5rem;
      font-size: 0.6rem;
      display: flex;
      border-top: 1px solid #f4f4f4;
      
    }
    .amountBtns div:first-child,
    .repayBtns div:first-child {
      border-right: 1px solid #f4f4f4;
    }
    .amountBtns div,
    .repayBtns div {
      flex: 1;
      text-align: center;
    }
    .amountBtns .finish,
    .repayBtns .finish {
      color: cadetblue;
    }
</style>

