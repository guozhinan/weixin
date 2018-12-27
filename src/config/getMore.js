//下拉加载更多
import { getOpenid, checkLogin } from '../service/getData';
import { AlertModule } from 'vux'
export const getMore = {
    getScrollData(scroll,pageNum,successFn) {
        console.log(scroll)
        if(scroll){
            scroll = false;
            pageNum++;
            successFn();
        }
    },
    isScrollToPageBottom(dom) {
        let documentHeight = this.getScrollHeight(dom);
        let viewPortHeight = this.getViewportHeight(dom);
        let scrollHeight = this.getScrollTop(dom);
        console.log('viewPortHeight',viewPortHeight);
        console.log('scrollHeight',scrollHeight);
        
        return  documentHeight = viewPortHeight - scrollHeight < 20;
    },
    getViewportHeight(dom) {
        let windowHeight = 0;
        // if(document.compatMode == 'CSS1Compat') {
        //     windowHeight = document.documentElement.clientHeight;
        // }else{
        //     windowHeight = document.body.clientHeight;
        // }
        return dom.clientHeight;
    },
    getScrollTop(dom) {
        let scrollTop = 0,
            bodyScrollTop = 0,
            documentScrollTop = 0;
        if(dom) {
            bodyScrollTop = dom.scrollTop;
        }else if(document.body) {
            bodyScrollTop = document.body.scrollTop;
        }else if(document.documentElement) {
            bodyScrollTop = document.documentElement.scrollTop;
        }
        scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
        // console.log('scrollTop',scrollTop)
        return scrollTop;
    },
    getScrollHeight(dom) {
        let scrollHeight = 0,
            bodyScrollHeight = 0,
            documentScrollHeight = 0;
        if(dom) {
            bodyScrollHeight = dom.scrollHeight;
        }else if(document.body){
            bodyScrollHeight = document.body.scrollHeight;
        }else if(document.documentElement){
            bodyScrollHeight = document.documentElement.scrollHeight;
        }
        scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight:documentScrollHeight;
        // console.log('scrollHeight',scrollHeight)
        return scrollHeight;
    }
}