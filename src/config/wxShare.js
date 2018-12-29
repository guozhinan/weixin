//微信分享
export const wxshare = {
    init: function(title,desc,link,imgUrl) {
        try{
            wxshare.ajax.signature();
        }catch(e){
            console.log(e);
        }
        wx.ready(function(){
            wx.updateAppMessageShareData({ //分享给朋友
                title: title, // 分享标题
                desc: desc, // 分享描述
                link: link, // 分享链接
                imgUrl: '', // 分享图标
                success: function () {
                    // 设置成功
                }
            });
            wx.updateTimelineShareData({ 
                title: '', // 分享标题
                link: '', // 分享链接
                imgUrl: '', // 分享图标
                success: function () {
                 // 设置成功
                }
            });
        })
    },
    compute: {//生成时间戳和随机串
        randomString: function(len) {
            len = len || 32;
            //去掉了容易混淆的oOLl,9gq,Vv,Uu,I1
            const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
            let maxPos = $chars.length;
            let pwd = '';
            for(let i=0;i<len;i++){
                pwd += $chars.charAt(Math.floor(Math.random()*maxPos));
            }
            return pwd;
        },
        timestamp: function() {
            return (new Date()).valueOf();
        }

    },
    ajax: {
        signature: function() {
            getSignature().then(res => {
                if(res.resultCode == '00000'){
                    wx.config({
                        debug: false, // 开启调试模式,
                        appId: res.appId, // 必填，企业号的唯一标识
                        timestamp: res.timestamp, // 必填，生成签名的时间戳
                        nonceStr: res.nonceStr, // 必填，生成签名的随机串
                        signature: res.signature,// 必填，签名
                        jsApiList: [
                            'hideMenuItems',
                            'updateAppMessageShareData',
                            'updateTimelineShareData',
                            'hideOptionMenu',
                            'showOptionMenu'
                        ] // 必填，需要使用的JS接口列表
                    });
                }
            })
        }
    }

}