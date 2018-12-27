//判断是否登陆
import { getOpenid, checkLogin } from '../service/getData';
import { AlertModule } from 'vux'
export const check = {
    //获取openId
    getOpenid(code, successFn) {
        getOpenid(code).then(res => {
            if (res.resultCode == '00000') {
                let openId = sessionStorage.openId = res.user.openId;
                sessionStorage.user = JSON.stringify(res.user);
                this.checkLogin(openId, successFn);
            } else {
                AlertModule.show({
                    title: '提示',
                    content: res.resultMsg
                });
            }
        })
    },
    //判断是否登陆
    checkLogin(openId, successFn) {
        checkLogin(openId).then(res => {
            if (res.resultCode == '00000') {
                sessionStorage.isLogin = res.isLogin;
                let userInfo = sessionStorage.user ? JSON.parse(sessionStorage.user) : {};
                sessionStorage.user = JSON.stringify(Object.assign(userInfo, res.user));
                if(successFn) successFn();
            } else {
                AlertModule.show({
                    title: '提示',
                    content: res.resultMsg
                });
            }
        })
    },
    getUrlParam(name) {
        let url = window.location.href;
        if (url.indexOf('?' + name + '=') > -1) {
            let string = url.split('?' + name + '=')[1];
            return string.split('&')[0];
        } else if (url.indexOf('&' + name + '=') > -1) {
            let string = url.split('&' + name + '=')[1];
            return string.split('&')[0];
        } else {
            return null;
        }
    },
}