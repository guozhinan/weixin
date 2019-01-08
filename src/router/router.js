import App from '../App'

const publish = r => require.ensure([], () => r(require('../page/publish/publish')), 'publish')
const mindList = r => require.ensure([], () => r(require('../page/mindList/mindList.1')), 'mindList')
const mindItem = r => require.ensure([], () => r(require('../page/mindItem/mindItem')), 'mindItem')
const own = r => require.ensure([], () => r(require('../page/own/own')), 'own')
const login = r => require.ensure([], () => r(require('../page/login/login')), 'login')
// const registered = r => require.ensure([], () => r(require('../page/registered/registered')), 'registered')
const advertising = r => require.ensure([], () => r(require('../page/advertising/advertising')), 'advertising')
const agreement = r => require.ensure([], () => r(require('../page/agreement/agreement')), 'agreement')
const userInfo = r => require.ensure([], () => r(require('../page/userInfo/userInfo')), 'userInfo')
const develop = r => require.ensure([], () => r(require('../page/develop/develop')), 'develop')
const myMindList = r => require.ensure([], () => r(require('../page/myMindList/myMindList')), 'myMindList')
const myMindItem = r => require.ensure([], () => r(require('../page/myMindItem/myMindItem')), 'myMindItem')
const editor = r => require.ensure([], () => r(require('../page/editor/editor')), 'editor')
const myCollection = r => require.ensure([], () => r(require('../page/myCollection/myCollection')), 'myCollection')
const myRecommendList = r => require.ensure([], () => r(require('../page/myRecommendList/myRecommendList')), 'myRecommendList')
const myTask = r => require.ensure([], () => r(require('../page/myTask/myTask')), 'myTask')
const myTaskMind = r => require.ensure([], () => r(require('../page/myTaskMind/myTaskMind')), 'myTaskMind')
const shareMind = r => require.ensure([], () => r(require('../page/shareMind/shareMind')), 'shareMind')
const earnings = r => require.ensure([], () => r(require('../page/earnings/earnings')), 'earnings')
const video = r => require.ensure([], () => r(require('../page/video/video')), 'video')

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
        //六度理论
        {
            path: '/advertising',
            component: advertising,
            meta: {
                title: '关于go想法'
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
        },
        {
            path: '/myTask',
            name: 'myTask',
            component: myTask,
            meta: {
                title: '我的任务'
            }
        },
        {
            path: '/myTaskMind/:id',
            name: 'myTaskMind',
            component: myTaskMind,
            meta: {
                title: '我的任务'
            }
        },
        {
            path: '/shareMind',
            name: 'shareMind',
            component: shareMind,
            meta: {
                title: '任务领取'
            }
        },
        {
            path: '/earnings',
            name: 'earnings',
            component: earnings,
            meta: {
                title: '我的奖励'
            }
        },
        {
            path: '/video',
            component: video
        }
    ]
}]
