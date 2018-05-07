// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vueRouter from 'vue-router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import  $ from 'jquery'
import axios from 'axios'

Vue.use(vueRouter);


Vue.config.productionTip = false;
Vue.prototype.$http = axios;


//引入全局css
import  '../static/css/reset.css'
import  '../static/css/index.css'
import '../static/css/header.css'
import '../static/css/footer.css'

/*//创建实例，配置默认项
var instance = axios.create({
  baseURL:'https://beta.qinlinad.com/QADN/'
});
//所有请求在超时前等待2.5s
instance.defaults.timeout = 2500;*/

//全局配置
axios.defaults.baseURL = 'https://beta.qinlinad.com/QADN/';
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'


Vue.use(ElementUI);


/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components: { App },
	template: '<App/>'
});
