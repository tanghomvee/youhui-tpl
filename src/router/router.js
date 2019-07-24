import App from '../App'

// 点点邦
const Login = r => require.ensure([], () => r(require('../page/login/login')), 'login')
const weixinCode = r => require.ensure([], () => r(require('../page/login/weixinCode')), 'code')
const User = r => require.ensure([], () => r(require('../page/user/user')), 'user')
const Discount = r => require.ensure([], () => r(require('../page/discount/discount')), 'consult')
const DiscountDetail = r => require.ensure([], () => r(require('../page/discount/discountDetail')), 'consultDetail')
const About = r => require.ensure([], () => r(require('../page/share/about')), 'about')
const Pay = r => require.ensure([], () => r(require('../page/pay/pay')), 'pay')

export default [{
    path: '/',
    component: App, //顶层路由对应index.html
    children: [ //二级路由。对应App.vue
        //地址为空时跳转home页面
        {
            path: '',
            redirect: '/home',
            // redirect: '/msite'
        },
        //登录
        {
            path: '/code',
            component: weixinCode,
            meta: {
                title: '登录'
              }
        },
        //登录
        {
            path: '/login',
            component: Login,
            meta: {
                title: '登录'
              }
        },
         //我的
        {
            path: '/user',
            component: User,
            meta: {
                // keepAlive: true,
                title: '我的'
              }
        },
         //支付
        {
            path: '/pay',
            component: Pay,
            meta: {
                // keepAlive: true,
                title: '充值'
              }
        },
         {//咨询详情
            path: '/discountDetail',
            component: DiscountDetail,
            meta: {
                title: '详情'
              }
        },
        {//关于我们
            path: '/share',
            component: About,
            meta: {
                title: '新人注册'
              }
        },
        {
            path: '/home',
            component: Discount,
            meta: {
                keepAlive: true, // 需要被缓存
                title: '首页'
              }
        },
    ]
}]