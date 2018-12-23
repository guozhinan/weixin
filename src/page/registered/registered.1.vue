<template>
    <section class="wrapper">
        <div class="top">
            <my-input :value="value" :placeholder="placeholder" :label="label"></my-input>
        </div>
    </section>
</template>
<script>
    import headTop from 'src/components/header/head'
    import myInput from 'src/components/myInput/myInput'
    import alertTip from 'src/components/common/alertTip' 
    import { Group, Cell, Drawer,PopupPicker,Picker,XInput, XTextarea ,Checker,CheckerItem,CheckIcon   } from 'vux'
    export default {
      data(){
            return{
              value: '',
              placeholder: '用户名',
              label: '用户111'
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
            CheckIcon,
            myInput
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
<style lang="scss" scoped>
    @import '../../style/fontsize/iconfont.css';
    .wrapper {
        position: absolute;
        top: 0;
        bottom: 1.95rem;
        left: 0;
        right: 0;
        overflow: auto;
    }
    .top {
      width: 100%;
      background: #fff;
      position: absolute;
      top: 0;
      bottom: 0;
      font-size: 0.7rem;
      // position: relative;
    }
    .top .container {
      margin-top: 4rem;
    }
    
    
    
</style>

