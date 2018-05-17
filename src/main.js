// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vueRouter from 'vue-router'
import axios from 'axios'

Vue.use(vueRouter);

//echarts
import echarts from 'echarts';
Vue.prototype.$echarts = echarts;

Vue.config.productionTip = false;
Vue.prototype.$http = axios;


//引入全局css
// Element css
import 'element-ui/lib/theme-chalk/index.css';
// reset css
import  '../static/css/reset.css';
// 字体图标css
import 'font-awesome/css/font-awesome.css'

// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// import  $ from 'jquery'
/*//创建实例，配置默认项
var instance = axios.create({
  baseURL:'https://beta.qinlinad.com/QADN/'
});
//所有请求在超时前等待2.5s
instance.defaults.timeout = 2500;*/
// Vue.use(ElementUI);

//全局配置
axios.defaults.baseURL = 'https://beta.qinlinad.com/QADN/';
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components: { App },
	template: '<App/>'
});
