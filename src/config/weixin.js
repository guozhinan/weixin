//微信授权
export const wxAuthor = {
    //手动授权
    authorization () {
        const appId = 'wx4047e004835d5614';
        const backUrl = encodeURIComponent(window.location.href);
        let url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${backUrl}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`
        return url;
    },
    turnCode() {
        let code = this.getUrlParam('code');
        if(code){//如果有code，调后台接口获取openId

        }else{//如果没有code,微信授权获取code
            sessionStorage.getCode = 'Yes';
            window.location.replace(this.authorization());
        }
    },
    getUrlParam(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r!=null) return unescape(r[2]); return null;
    },


}