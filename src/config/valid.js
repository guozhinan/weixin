//表单校验
export const valid = {
    //校验不能为空
    notEmpty(value) {
        if(!value){
            this.$vux.alert.show({
                title: '提示',
                content: '信息不能为空'
            });
            return false;
        }
    }
}