<template>
    <section class="publish editor" v-show="isLogin!='N'">
        <section class="top">
          <div class="topItem" @click="changeType('01')" :class="{'nowItem':form.type=='01'}">任务发布</div>
          <div class="topItem" @click="changeType('02')" :class="{'nowItem':form.type=='02'}">项目发布</div>
          <div class="topItem" @click="changeType('03')" :class="{'nowItem':form.type=='03'}">愿景发布</div>          
        </section>
        <group class="main">
            <x-address ref="area" raw-value @on-hide="hideHandle" title="所属省市" v-model="areaName" :list="addressData" placeholder="请选择地址"   :hide-district="district"></x-address>
            <cell>
              <label for="address" class="slot" slot="title">详细地址</label>
              <input id="address" class="ownInput" type="text" v-model="form.address">
            </cell>
            <cell>
              <label for="name" slot="title">
                <span v-show="form.type=='01'">任务名称</span>
                <span v-show="form.type=='02'">项目名称</span>
                <span v-show="form.type=='03'">愿景名称</span>
              </label>
              <input id="name" class="ownInput" type="text" v-model="form.name">
            </cell>
            <cell>
              <label for="amount" slot="title">预算总额（元）</label>
              <input id="amount" class="ownInput" type="tel" v-model="form.amount">
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
              <label><input type="text" v-model="fileName"/></label><br>
              <label class="uploadLabel" for="introduce">更换文件<input id="introduce" type="file" @change="uploadIntroduce"></label>
            </cell>
            <cell class="special" v-show="form.type=='03'">
              <span slot="title">商业画布</span>
              <label><input type="text" v-model="fileName1"/></label><br>
              <label class="uploadLabel" for="businessCanvas">更换文件<input id="businessCanvas" type="file" @change="uploadBusinessCanvas"></label>
            </cell>
            <div class="fee">
              <label slot="title" for="forGold">感谢金（元）</label>
              <input class="ownInput" id="forGold" type="tel" v-model="form.forGold" placeholder="推荐被推荐者各45%,平台管理费10%">
            </div>
        </group>
        <x-button @click.native="editor">发布</x-button>
    </section>
</template>
<script>
    import { Group, Cell,PopupPicker,Picker,XInput,XButton, XTextarea ,XAddress,ChinaAddressV4Data,Value2nameFilter as value2name   } from 'vux'
    import {getOpenid,updateTask,checkLogin,getTTask} from 'src/service/getData'
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
                fileBlueprint: '', //商业画布
                blueprintfilename: '',//商业画布文件名
                forGold: '',//感谢金
                returnType: [], //一次性回报
                openid: '',
              },
              areaName: [],
              areaName1: [],
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
              id: '',
              fileName: '', //任务介绍文档
              fileName1: '', //商业画布
            }
        },
        mounted(){
          this.id = this.$route.params.id;
          this.getTTask();
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
            if(this.form.type == '03') return '使命 愿景 价值观'; 
          }
        },
        methods: {
            getTTask() {
              getTTask({id:this.id}).then(res => {
                if(res.resultCode == '00000'){
                  this.form = res.TTask;
                  this.form.openid = sessionStorage.openId;
                  this.form.returnType = [res.TTask.returnType];
                  this.areaName = [res.TTask.province,res.TTask.city];
                  this.fileName = res.TTask.fileTask.split('\/go\/')[1].slice(13);
                  this.fileName1 = res.TTask.fileBlueprint?res.TTask.fileBlueprint.split('\/go\/')[1].slice(13):'';
                }else{
                  this.$vux.alert.show({
                    title: '提示',
                    content: res.resultMsg
                  });
                }
              })
            },
            hideHandle() {
             
            },
            uploadIntroduce (e) {
              let _this = this;
              let typeArr = e.target.files[0].name.split('.');
              this.form.fileTaskType = typeArr[typeArr.length-1];
              console.log(this.form.fileTaskType)
              this.form.fileTaskSize = e.target.files[0].size;
              this.fileName = this.form.fileTaskname = e.target.files[0].name;
              console.log(e.target.files[0])
              let reader=new FileReader();
              reader.readAsDataURL(e.target.files[0]);
              reader.onload=function(e){
                _this.form.fileTask = this.result.split(';base64,')[1];
              }        
              // let _this = this;
              // this.form.fileTaskname = e.target.files[0].name;
              // let reader=new FileReader();
              // reader.readAsDataURL(e.target.files[0]);
              // reader.onload=function(e){
              //   _this.form.fileTask = this.result.split(';base64,')[1];
              // }                            
            },
            uploadBusinessCanvas (e) {
              let _this = this;
              console.log(e.target.files[0])
              let typeArr = e.target.files[0].name.split('.');
              this.form.fileBlueprintType = typeArr[typeArr.length-1];
              // this.form.fileBlueprintType = e.target.files[0].type;
              this.form.fileTaskSize = e.target.files[0].size;
              this.fileName1 = this.form.blueprintfilename = e.target.files[0].name;
              let reader=new FileReader();
              reader.readAsDataURL(e.target.files[0]);
              reader.onload=function(e){
                _this.form.fileBlueprint = this.result.split(';base64,')[1];
              }   
              // let _this = this;
              // this.form.blueprintfilename = e.target.files[0].name;
              // let reader=new FileReader();
              // reader.readAsDataURL(e.target.files[0]);
              // reader.onload=function(e){
              //   _this.form.fileBlueprint = this.result.split(';base64,')[1];
              // }   
            },
            editor() {
              this.areaName1 = value2name(this.areaName,ChinaAddressV4Data).split(' ');
              [this.form.province,this.form.city] = this.areaName1;
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
                this.updateTask(obj);
              }
              
            },
            //校验要提交的表单数据
            checkForm(obj) {
              let reg = /^\d+$/;  //正整数
              if(!this.form.id){
                this.$vux.alert.show({content: '任务id不能为空'});
                return false;
              }
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
              // if(!this.form.fileTaskname || !this.form.fileTask) {
              //   this.$vux.alert.show({content: '请上传任务详细文档'});
              //   return false;
              // }
              if(this.form.fileTaskname&&this.form.fileTaskType!='doc'&&this.form.fileTaskType!='docx'&&this.form.fileTaskType!='xls'&&this.form.fileTaskType!='xlsx'&&this.form.fileTaskType!='pdf') {
                this.$vux.alert.show({content: '任务详细文档仅支持word、excel、pdf，请重新上传'});
                return false;
              }
              if(this.form.fileTaskSize > 5*1024*1024){
                this.$vux.alert.show({content: '任务详细文档不能大于5M'});
                return false;
              }
              if(this.form.type == '03') {
                // if(!this.form.fileBlueprint || !this.form.blueprintfilename) {
                //   this.$vux.alert.show({content: '请上传商业画布'});
                //   return false;
                // }
                if(this.form.blueprintfilename&&this.form.fileBlueprintType!='doc'&&this.form.fileBlueprintType!='docx'&&this.form.fileBlueprintType!='xls'&&this.form.fileBlueprintType!='xlsx'&&this.form.fileBlueprintType!='ppt'&&this.form.fileBlueprintType!='pptx'&&this.form.fileTaskType!='pdf') {
                  this.$vux.alert.show({content: '商业画布仅支持word、excel、pdf、ppt，请重新上传'});
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
              return true;


              // if(this.form.type != '03'){
              //   if(!this.form.id || !this.form.openid || !this.form.city || !this.form.province || !this.form.address || !this.form.name || !this.form.amount || !this.form.taskDescribe || !this.form.fileTask || !this.form.fileTaskname || !this.form.forGold || !this.form.returnType) {
              //     this.$vux.alert.show({
              //       title: '提示',
              //       content: '信息填写不完整，请确认'
              //     });
              //     return false;
              //   }else{
              //     return true;
              //   }
              // }else if(this.form.type == '03'){
              //   if(!this.form.id || !this.form.openid || !this.form.city || !this.form.province || !this.form.address || !this.form.name || !this.form.amount || !this.form.taskDescribe || !this.form.fileTask || !this.form.fileTaskname || !this.form.forGold || !this.form.returnType || !this.form.fileBlueprint || !this.form.blueprintfilename) {
              //     this.$vux.alert.show({
              //       title: '提示',
              //       content: '信息填写不完整，请确认'
              //     });
              //     return false;
              //   }else{
              //     return true;
              //   }
              // }
              
            },
            updateTask(params) {
              updateTask(params).then(res => {
                if(res.resultCode == '00000'){
                  this.$vux.toast.text('编辑任务成功');
                  this.$router.push('/myMindList')
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
    .editor{
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
      .main .uploadLabel {
        // padding: 0 0.5rem;
        width: 4rem;
        display: inline-block;
        border: 1px solid #ccc;
        color: #555;
        background: #f4f4f4;
        text-align: center;
        border-radius: 3px;
      }
      .main #introduce,
      .main #businessCanvas {
        width: 0;
        visibility: hidden;
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

