import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/router'
import store from './store/'
import {routerMode} from './config/env'
import './config/rem'
import FastClick from 'fastclick'
import { AlertPlugin,ConfirmPlugin,ToastPlugin   } from 'vux'
import {filterMindType,filterCreateTime,filterRepay,filterMindStatus} from './config/filters' 
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(ToastPlugin)
Vue.filter('filterMindType', filterMindType);
Vue.filter('filterCreateTime', filterCreateTime);
Vue.filter('filterRepay', filterRepay);
Vue.filter('filterMindStatus', filterMindStatus);

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}

Vue.use(VueRouter)
const router = new VueRouter({
	routes,
	mode: routerMode,
	strict: process.env.NODE_ENV !== 'production',
	scrollBehavior (to, from, savedPosition) {
	    if (savedPosition) {
		    return savedPosition
		} else {
			if (from.meta.keepAlive) {
				from.meta.savedPosition = document.body.scrollTop;
			}
		    return { x: 0, y: to.meta.savedPosition || 0 }
		}
	}
})
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
//   const token = sessionStorage.isLogin;
//   if(to.matched.some(record => record.meta.requireAuth || record.meta.homePages)){
//         //路由元信息requireAuth:true，或者homePages:true，则不做登录校验
//         next()
//     }else{
//         if(token){//判断用户是否登录
//             if(Object.keys(from.query).length === 0){//判断路由来源是否有query，处理不是目的跳转的情况
//                 next()
//             }else{
//                 let redirect = from.query.redirect//如果来源路由有query
//                 if(to.path === redirect){//这行是解决next无限循环的问题
//                     next()
//                 }else{
//                     next({path:redirect})//跳转到目的路由
//                 }
//             }
//         }else{
//             if(to.path==="/login"){
//                 next()
//             }else{
//                 next({
//                       path:"/login",
//                       query: {redirect: to.fullPath}//将目的路由地址存入login的query中
//                 })
//             }
//         }
//     }
//     return
})

new Vue({
	router,
	store,
}).$mount('#app')

