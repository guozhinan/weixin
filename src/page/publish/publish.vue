<template>
    <section class="publish" v-show="isLogin!='N'">
        <section class="top">
          <div class="topItem" @click="changeType('01')" :class="{'nowItem':form.type=='01'}">任务发布</div>
          <div class="topItem" @click="changeType('02')" :class="{'nowItem':form.type=='02'}">项目发布</div>
          <div class="topItem" @click="changeType('03')" :class="{'nowItem':form.type=='03'}">愿景发布</div>          
        </section>
        <group class="main">
            <x-address ref="area" @on-hide="hideHandle" title="所属省市" v-model="area" :list="addressData" placeholder="请选择地址"   :hide-district="district"></x-address>
            <cell>
              <label for="address" class="slot" slot="title">详细地址</label>
              <input id="address" class="ownInput" type="text" v-model="form.address" maxlength="20">
            </cell>
            <cell>
              <label for="name" slot="title">
                <span v-show="form.type=='01'">任务名称</span>
                <span v-show="form.type=='02'">项目名称</span>
                <span v-show="form.type=='03'">愿景名称</span>
              </label>
              <input id="name" class="ownInput" type="text" v-model="form.name" maxlength="20">
            </cell>
            <cell>
              <label for="amount" slot="title">预算总额（元）</label>
              <input id="amount" class="ownInput" type="tel" v-model="form.amount" maxlength="20">
            </cell>
            <popup-picker :data="list1" :columns="1" v-model="form.returnType" show-name placeholder="请选择预计收益">
              <template slot="title" slot-scope="props" >
                <span :class="props.labelClass" :style="props.labelStyle" style="height:24px;">
                  <span style="vertical-align:middle;">预计收益</span>
                </span>
              </template>
            </popup-picker>
            <x-textarea :title="describeName" :max="200" v-model="form.taskDescribe" name="description" :placeholder="describePlaceholder"></x-textarea>
            <cell class="special">
              <span slot="title" v-show="form.type=='01'">任务详细文档</span>
              <span slot="title" v-show="form.type=='02'">项目实施计划</span>
              <span slot="title" v-show="form.type=='03'">商业计划</span>
              <label class="uploadLabel" for="introduce"><input id="introduce" type="file" @change="uploadIntroduce"></label>
            </cell>
            <cell class="special" v-show="form.type=='03'">
              <span slot="title">商业画布</span>
              <label class="uploadLabel" for="businessCanvas"><input id="businessCanvas" type="file" @change="uploadBusinessCanvas"></label>
            </cell>
            <div class="fee">
              <label slot="title" for="forGold">感谢金（元）</label>
              <input class="ownInput" id="forGold" type="tel" v-model="form.forGold" placeholder="推荐被推荐者各45%,平台管理费10%" maxlength="20">
            </div>
        </group>
        <x-button @click.native="public">发布</x-button>
    </section>
</template>
<script>
    import { Group, Cell,PopupPicker,Picker,XInput,XButton, XTextarea ,XAddress,ChinaAddressV4Data,Value2nameFilter as value2name   } from 'vux'
    import {getOpenid,insertTask,checkLogin} from 'src/service/getData'
    export default {
      data(){
            return{
              form: {
                address: '', //详细地址
                name: '',//想法名称
                taskDescribe: '',//任务简介
                amount: '',//想法总额
                type: '01',
                fileTask: '', //任务介绍文档
                fileTaskname: '',//任务介绍文档名
                fileTaskType: '',//任务介绍文档类型
                fileTaskSize: '',//任务介绍文档大小
                fileBlueprint: '', //商业画布
                blueprintfilename: '',//商业画布文件名
                fileBlueprintType: '',//商业画布文件类型
                fileBlueprintSize: '',//商业画布文件大小
                forGold: '',//感谢金
                returnType: [], //一次性回报
                openid: '',
              },
              areaName: [],
              area: [],  //省市区
              addressData: ChinaAddressV4Data,  //省市区三级联动数据
              list1: [
                {name:'一次性回报',value:'01'},
                {name:'收益比',value:'02'},
                {name:'月收入',value:'03'}
              ],
              placeholder1: '请选择想法类型',
              district: true,  //true为隐藏所属省市区中的区
              isLogin: 'Y',
              size: true,
            }
        },
        mounted(){
          if(sessionStorage.isLogin == 'Y') return;
          this.checkOpenId();
        },
        components: {
            Group,
            Cell,
            PopupPicker,
            Picker,
            XInput,
            XTextarea,
            XButton,
            XAddress 
        },
        computed: {
          describeName() {
            if(this.form.type == '01') return '任务描述';
            if(this.form.type == '02') return '项目描述';
            if(this.form.type == '03') return '愿景描述';            
          },
          describePlaceholder() {
            if(this.form.type == '01' || this.form.type == '02') return '请输入要找的人（合作分享资源）、资金（融资条件）';
            // if(this.form.type == '02') return '项目描述';
            if(this.form.type == '03') return '使命 愿景 价值观'; 
          }
        },
        methods: {
            hideHandle() {
              this.areaName = value2name(this.area,ChinaAddressV4Data).split(' ');
            },
            uploadIntroduce (e) {
              let _this = this;
              this.form.fileTaskType = e.target.files[0].type;
              this.form.fileTaskSize = e.target.files[0].size;
              this.form.fileTaskname = e.target.files[0].name;
              console.log(e.target.files[0])
              let reader=new FileReader();
              reader.readAsDataURL(e.target.files[0]);
              reader.onload=function(e){
                _this.form.fileTask = this.result.split(';base64,')[1];
              }                            
            },
            uploadBusinessCanvas (e) {
              let _this = this;
              console.log(e.target.files[0])
              this.form.blueprintfileType = e.target.files[0].type;
              this.form.blueprintfileSize = e.target.files[0].size;
              this.form.blueprintfilename = e.target.files[0].name;
              let reader=new FileReader();
              reader.readAsDataURL(e.target.files[0]);
              reader.onload=function(e){
                _this.form.fileBlueprint = this.result.split(';base64,')[1];
              }   
            },
            public() {
              this.form.openid = sessionStorage.openId || 'ozIdu1Ro-oFTru19uM0JnB_CBfCM';
              [this.form.province,this.form.city] = this.areaName;
              let obj = {};
              let keys = Object.keys(this.form);
              for(let i=0;i<keys.length;i++){
                if(keys[i] == 'returnType') {
                  obj.returnType = this.form.returnType[0] || '';
                  continue;
                }
                obj[keys[i]] = this.form[keys[i]];
              }
              console.log(obj);
              if(this.checkForm(obj)){
                //提交表单
                this.insertTask(obj);
              }
              
            },
            //校验要提交的表单数据
            checkForm(obj) {
              let reg = /^\d+$/;  //正整数
              if(!this.form.openid) {
                this.$vux.alert.show({content: 'openid不能为空'});
                return false;
              }
              if(!this.form.province || !this.form.city) {
                this.$vux.alert.show({content: '请选择所属省市'});
                return false;
              }
              if(!this.form.address) {
                this.$vux.alert.show({content: '请输入详细地址'});
                return false;
              }
              if(!this.form.name) {
                this.$vux.alert.show({content: '请输入任务名称'});
                return false;
              }
              if(!this.form.amount) {
                this.$vux.alert.show({content: '请输入预算总额'});
                return false;
              }
              if(!reg.test(this.form.amount)){
                this.$vux.alert.show({content: '预算总额只能为整数'});
                return false;
              }
              if(!this.form.returnType) {
                this.$vux.alert.show({content: '请选择预计收益'});
                return false;
              }
              if(!this.form.taskDescribe) {
                this.$vux.alert.show({content: '请输入任务描述'});
                return false;
              }
              if(!this.form.fileTaskname || !this.form.fileTask) {
                this.$vux.alert.show({content: '请上传任务详细文档'});
                return false;
              }
              if(this.form.fileTaskType!='application/msword'&&this.form.fileTaskType!='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'&&this.form.fileTaskType!='application/vnd.ms-excel') {
                this.$vux.alert.show({content: '任务详细文档仅支持word、excel，请重新上传'});
                return false;
              }
              if(this.form.fileTaskSize > 5*1024*1024){
                this.$vux.alert.show({content: '任务详细文档不能大于5M'});
                return false;
              }
              if(this.form.type == '03') {
                if(!this.form.fileBlueprint || !this.form.blueprintfilename) {
                  this.$vux.alert.show({content: '请上传商业画布'});
                  return false;
                }
                if(this.form.fileBlueprintType!='application/msword'&&this.form.fileBlueprintType!='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'&&this.form.fileBlueprintType!='application/vnd.ms-excel'&&this.form.fileBlueprintType!='application/vnd.ms-powerpoint'&&this.form.fileBlueprintType!='application/vnd.openxmlformats-officedocument.presentationml.presentation') {
                  this.$vux.alert.show({content: '商业画布仅支持word、excel、ppt，请重新上传'});
                  return false;
                }
                if(this.form.fileTaskSize > 5*1024*1024){
                  this.$vux.alert.show({content: '商业画布大小不能大于5M'});
                  return false;
                }
              }
              if(!this.form.forGold) {
                this.$vux.alert.show({content: '请输入感谢金'});
                return false;
              }
               if(!reg.test(this.form.amount)){
                this.$vux.alert.show({content: '感谢金只能为整数'});
                return false;
              }
              // let keys = Object.keys(obj);
              // if(this.form.type != '03') {
              //   keys = keys.filter(item => item != 'fileBlueprint' && item !=  'blueprintfilename');
              // }
              // for(let i=0;i<keys.length;i++){
              //   if(!obj[keys[i]]) {
              //     this.$vux.alert.show({
              //       title: '提示',
              //       content: '信息不能为空'
              //     });
              //     return false;
              //   }
              // }
              // if(!this.size) {
              //   this.$vux.alert.show({
              //     title: '提示',
              //     content: '文件不能大于5M，请重新选择文件'
              //   });
              //   return false;
              // }
              return true;
            },
            insertTask(params) {
              insertTask(params).then(res => {
                if(res.resultCode == '00000'){
                  this.$vux.alert.show({
                    content: '发布成功'
                  });
                }else{
                  this.$vux.alert.show({
                    title: '提示',
                    content: res.resultMsg
                  });
                }
              })
            },
            //切换任务类型
            changeType(num) {
              this.form.type = num;
            },
            //判断是否有openId
            checkOpenId() {
              let code = this.getUrlParam('code');
              console.log(code);
              if(sessionStorage.openId){//判断是否登陆
                this.checkLogin(sessionStorage.openId)
              }else if(code){//获取openid
                this.getOpenid(code);
              }
            },
            //获取openId
            getOpenid(code){
              getOpenid(code).then(res => {
                if(res.resultCode == '00000'){
                  let openId = res.user.openId;
                  sessionStorage.openId = openId;
                  sessionStorage.user = JSON.stringify(res.user);
                  this.checkLogin(openId);
                }else{
                  this.$vux.alert.show({
                    title: '提示',
                    content: res.resultMsg
                  });
                }
              })
            },
             //判断是否登陆
            checkLogin(openId){
              checkLogin(openId).then(res => {
                if(res.resultCode == '00000'){
                  this.isLogin = res.isLogin;
                  sessionStorage.isLogin = this.isLogin;
                  let userInfo = JSON.parse(sessionStorage.user);
                  sessionStorage.user = JSON.stringify(Object.assign(userInfo,res.user));
                  sessionStorage.currentUrl = location.href;
                  if(this.isLogin == 'N'){
                    this.$router.push('/login');
                  }
                }else{
                  this.$vux.alert.show({
                    title: '提示',
                    content: res.resultMsg
                  });
                }
              })
            },
            getUrlParam(name){
                let url = window.location.href;
                if(url.indexOf('?'+name+'=')>-1){
                  let string = url.split('?'+name+'=')[1];
                  return string.split('&')[0];
                }else if(url.indexOf('&'+name+'=')>-1){
                  let string = url.split('&'+name+'=')[1];
                  return string.split('&')[0];
                }else{
                  return null;
                }
            },
        },
        
    }
</script>
<style lang="scss">
    .publish {
        width: 100%;
        min-height: 100%;
        padding-top: 1.95rem;
        padding-bottom: 1.95rem;
        overflow: auto;
    }
    .publish{
      .top {
        width: 100%;
        height: 1.95rem;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 105;
        background: #fff;
        display: flex;
        font-size: 0.65rem;
        text-align: center;
        line-height: 1.95rem;
        box-shadow: 0 0.02667rem 0.05333rem rgba(0, 0, 0, 0.1);
      }
      .topItem {
        flex: 1;
      }
      .top .nowItem {
        color: cadetblue;
        border-bottom: 2px solid cadetblue;
      }
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
      .weui-btn_default {
        width: 90%;
        margin: 10px auto;
        background: cadetblue;
        font-size: 0.6rem;
        color: #fff;
      }
      .weui-textarea {
        font-size: 0.6rem;
      }
      .special .weui-cell__ft {
        width: 50%;
      }
      .fee {
        // margin-top: 1.17647059em;
        background-color: #FFFFFF;
        line-height: 1.41176471;
        font-size: 17px;
        overflow: hidden;
        font-size: 0.6rem;
        margin-left: 15px;
        padding: 10px 15px 10px 0;
        display: flex;
        position: relative;
      }
      .fee:before {
        content: " ";
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        height: 1px;
        border-top: 1px solid #D9D9D9;
        color: #D9D9D9;;
        transform-origin: 0 0;
        transform: scaleY(0.5);
      }
      .fee label {
        width: 4rem;
      }
      .fee input {
        flex: 1;
      }
    }
    
</style>

