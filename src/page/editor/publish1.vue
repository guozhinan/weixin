<template>
    <section class="publish">
        <!-- <head-top head-title="go想法"></head-top> -->
        <group class="main">
            <popup-picker :data="list3" :columns="3" v-model="value4" show-name>
              <template slot="title" slot-scope="props" >
                <span :class="props.labelClass" :style="props.labelStyle" style="height:24px;">
                  <span style="vertical-align:middle;">所属省市</span>
                </span>
              </template>
            </popup-picker>
            <cell>
              <label for="address" class="slot" slot="title">详细地址</label>
              <input id="address" class="ownInput" type="text" v-model="address">
            </cell>
            <popup-picker :data="list1" :columns="1" v-model="type" show-name>
              <template slot="title" slot-scope="props" >
                <span :class="props.labelClass" :style="props.labelStyle" style="height:24px;">
                  <span style="vertical-align:middle;">想法类型</span>
                </span>
              </template>
            </popup-picker>
            <cell>
              <span slot="title">想法名称</span>
              <label for="name"></label>
              <input id="name" class="ownInput" type="text" v-model="name">
            </cell>
            <cell>
              <label for="amount" slot="title">想法总额</label>
              <input id="amount" class="ownInput" type="text" v-model="amount">
            </cell>
            <x-textarea title="任务简介" :max="200" v-model="describe" name="description" :placeholder="placeholderContent"></x-textarea>
            <cell class="special">
              <span slot="title">任务介绍文档</span>
              <label class="uploadLabel" for="introduce"><input id="introduce" type="file"></label>
            </cell>
            <cell class="special">
              <span slot="title">想法实施计划表</span>
              <label class="uploadLabel" for="schedule"><input id="schedule" type="file"></label>
            </cell>
            <cell>
              <label slot="title">感谢金</label>
              <input class="ownInput" type="text">
            </cell>
            <cell>
              <label slot="title">一次性回报</label>
              <input class="ownInput" type="text">
            </cell>
            <cell>
              <label slot="title">收益比</label>
              <input class="ownInput" type="text">
            </cell>
            <cell>
              <label slot="title">月收入</label>
              <input class="ownInput" type="text">
            </cell>
        </group>
        <x-button type="primary">发布</x-button>
    </section>
</template>
<script>
    import headTop from 'src/components/header/head'
    import alertTip from 'src/components/common/alertTip' 
    import { Group, Cell, Drawer,PopupPicker,Picker,XInput,XButton, XTextarea ,Checker,CheckerItem  } from 'vux'
    export default {
      data(){
            return{
                showAlert: false,
                alertText: null,
                title1: '想法类型',
                 title4: '所属省市',
                 address: '', //详细地址
                 name: '',//想法名称
                 describe: '',//任务简介
                 amount: '',
                 list1: [{name:'任务发布',value:'01'},{name:'想法发布',value:'02'},{name:'愿景发布',value:'03'}],
                 type: ['任务发布'],
                 list3: [{
        name: '中国',
        value: 'china',
        parent: 0
      }, {
        name: '美国',
        value: 'USA',
        parent: 0
      }, {
        name: '广东',
        value: 'china001',
        parent: 'china'
      }, {
        name: '广西',
        value: 'china002',
        parent: 'china'
      }, {
        name: '美国001',
        value: 'usa001',
        parent: 'USA'
      }, {
        name: '美国002',
        value: 'usa002',
        parent: 'USA'
      }, {
        name: '广州',
        value: 'gz',
        parent: 'china001'
      }, {
        name: '深圳',
        value: 'sz',
        parent: 'china001'
      }, {
        name: '广西001',
        value: 'gx001',
        parent: 'china002'
      }, {
        name: '广西002',
        value: 'gx002',
        parent: 'china002'
      }, {
        name: '美国001_001',
        value: '0003',
        parent: 'usa001'
      }, {
        name: '美国001_002',
        value: '0004',
        parent: 'usa001'
      }, {
        name: '美国002_001',
        value: '0005',
        parent: 'usa002'
      }, {
        name: '美国002_002',
        value: '0006',
        parent: 'usa002'
      }],
      
      value3: [],
      value4: [],
      maskValue2:"",
      placeholderContent: '请输入要找的人（合作分享资源）、资金（融资条件）',
      demo1:'',
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
            XButton
        },
        computed: {
           
        },
        methods: {
            onChange (val) {
                console.log('val change', val)
            },
            onShow () {
                console.log('on show')
            },
            onHide (type) {
                console.log('on hide', type)
            }
        }
    }
</script>
<style lang="scss">
    .publish {
        width: 100%;
        min-height: 100%;
        padding-bottom: 1.95rem;
        overflow: auto;
    }
    /* .wrapper .vux-label,
    .wrapper .vux-label span {
      display: block;
      width: 100%;
    } */
    /* .ownInput {
      width: 70%;
      float: right;
      text-align: right;
    } */
    .publish{
      .main .weui-cells {
        font-size: 0.6rem;
      }
      .main input,
      .main textarea {
        font-size: 0.6rem;
        text-align: right;
        outline: 0;
        border: none 0;
        color: #999;
      }
      label.weui-label {
        font-size: 0.6rem!important;
      }
      .main .weui-cell__hd .weui-label {
        font-size: 0.6rem;
      }
      .weui-btn_primary {
        width: 90%;
        margin: 10px auto;
        background: cadetblue;
        font-size: 0.6rem;
      }
      .weui-textarea {
        font-size: 0.6rem;
      }
      .special .weui-cell__ft {
        width: 50%;
        // position: relative;
      }
      // .special .uploadLabel {
      //   display: inline-block;
      //   width: 100%;
      //   height: 100%;
      //   border: 1px solid #ccc;
      // }
      // .special input {
      //   float: right;
      // }
    }
    
</style>

