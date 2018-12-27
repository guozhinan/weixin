import App from '../App'

const publish = r => require.ensure([], () => r(require('../page/publish/publish')), 'download')
const mindList = r => require.ensure([], () => r(require('../page/mindList/mindList.1')), 'download')
const mindItem = r => require.ensure([], () => r(require('../page/mindItem/mindItem')), 'download')
const own = r => require.ensure([], () => r(require('../page/own/own')), 'download')
const login = r => require.ensure([], () => r(require('../page/login/login')), 'download')
const registered = r => require.ensure([], () => r(require('../page/registered/registered')), 'download')
const advertising = r => require.ensure([], () => r(require('../page/advertising/advertising')), 'download')
const agreement = r => require.ensure([], () => r(require('../page/agreement/agreement')), 'download')
const userInfo = r => require.ensure([], () => r(require('../page/userInfo/userInfo')), 'download')
const develop = r => require.ensure([], () => r(require('../page/develop/develop')), 'download')
const myMindList = r => require.ensure([], () => r(require('../page/myMindList/myMindList')), 'download')
const myMindItem = r => require.ensure([], () => r(require('../page/myMindItem/myMindItem')), 'download')
const editor = r => require.ensure([], () => r(require('../page/editor/editor')), 'download')
const search = r => require.ensure([], () => r(require('../page/search/search')), 'download')
const myCollection = r => require.ensure([], () => r(require('../page/myCollection/myCollection')), 'download')
const myRecommendList = r => require.ensure([], () => r(require('../page/myRecommendList/myRecommendList')), 'download')



export default [{
    path: '/',
    component: App, //顶层路由，对应index.html
    children: [ //二级路由。对应App.vue
        //一键发布
        {
            path: '/publish',
            component: publish,
            meta: {
                title: '一键发布'
            }
        }, 
        //想法中心
        {
            path: '/mindList/:id',
            component: mindList,
            meta: {
                title: '想法中心'
            }
        },
        {
            path:'/mindList/mindItem/:id',
            name: 'mindItem',
            component: mindItem,
            meta: {
                title: '想法中心'
            }
        },
        //个人中心
        {
            path: '/own',
            component: own,
            meta: {
                title: '个人中心'
            }
        }, 
        //登录
        {
            path: '/login',
            component: login,
            meta: {
                title: '登录'
            }
        },
        // 注册
        {
            path: '/registered',
            component: registered,
            meta: {
                title: '注册'
            }
        },
        //六度理论
        {
            path: '/advertising',
            component: advertising,
            meta: {
                title: '六度理论'
            }
        },
        {
            path: '/agreement',
            component: agreement,
            meta: {
                title: '注册协议'
            }
        },
        {
            path: '/userInfo',
            component: userInfo,
            meta: {
                title: '个人资料'
            }
        },
        {
            path: '/develop',
            component: develop,
            meta: {
                title: '页面正在开发中'
            }
        },
        {
            path: '/myMindList',
            component: myMindList,
            meta: {
                title: '我的请求'
            }
        },
        {
            path: '/myMindItem/:id',
            name: 'myMindItem',
            component: myMindItem,
            meta: {
                title: '请求详情'
            }
        },
        {
            path: '/editor/:id',
            name: 'editor',
            component: editor,
            meta: {
                title: '编辑请求'
            }
        },
        {
            path: '/search',
            name: 'search',
            component: search,
            meta: {
                title: '搜索请求'
            }
        },
        {
            path: '/myCollection',
            name: 'myCollection',
            component: myCollection,
            meta: {
                title: '我的收藏'
            }
        },
        {
            path: '/myRecommendList',
            name: 'myRecommendList',
            component: myRecommendList,
            meta: {
                title: '我的推荐'
            }
        }
    ]
}]
