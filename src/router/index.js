import Vue from 'vue'
import Router from 'vue-router'
//公用页面
import mediaInput from '../components/common/mediaInput.vue';
import mediaDetail from '../components/common/mediaDetail.vue';
import mediaList from '../components/common/mediaList.vue';
import clientList from '../components/common/clientList.vue';
import planList from '../components/common/planList.vue';
import publishPriceList from '../components/common/publishPriceList.vue';
import createAccount from '../components/common/createAccount.vue';
import accountList from '../components/common/accountList.vue';
import orderList from '../components/common/orderList.vue';
import clientDetail from '../components/common/clientDetail.vue';
import createPlan from '../components/common/createPlan.vue';
import planDetail from '../components/common/planDetail.vue';
import orderDetail from '../components/common/orderDetail.vue';
import photoGallery from '../components/common/photoGallery.vue';
import ludanReport from '../components/common/ludanReport.vue';
//管理员
import admin from '../components/admin/admin_common.vue'

//超级运营
import adminIndex from '../components/superOperate/superOperate_index.vue';
import ADlimitList from '../components/superOperate/ADlimitList.vue';
import superOperateCommon from '../components/superOperate/superOperate_common.vue';
//普通运营
import operateIndex from '../components/operate/operate_index.vue';
import operateCommon from '../components/operate/operate_common.vue';
//销售
import saleIndex from '../components/sale/sale_index.vue';
import createClient from '../components/sale/createClient.vue';
import editClient from '../components/sale/editClient.vue';
import saleCommon from '../components/sale/sale_common.vue';
//媒介
import mediaIndex from '../components/media/media_index.vue';
import mediaCommon from '../components/media/media_common.vue';
//登录
import login from '../components/home/login.vue';
//修改密码
import changePwd from '../components/home/changePwd.vue';
//亲邻科技上刊报告
import upReport from '../components/h5/upReport.vue';
import downReport from '../components/h5/downReport.vue';

Vue.use(Router);

export default new Router({
	mode: 'history',
	routes: [
		{path: '/', redirect: '/login'},
		{path: '/login', name: 'login', component: login},

		//上下刊报告h5页面
		{path:'/upReport', name:'upReport', component:upReport},
		{path:'/downReport', name:'downReport', component:downReport},

		//超级运营
		{
			path: '/',
			component: admin,
			children: [
				{path: '/admin', component: accountList},
			]
		},

		//超级运营
		{
			path: '/',
			component: superOperateCommon,
			children: [
				{path: '/superOperate', component: adminIndex},
				{path: '/superOperate/ADlimitList', component: ADlimitList},
				{path: '/superOperate/mediaInput', component: mediaInput},
				{path: '/superOperate/mediaList', component: mediaList},
				{path: '/superOperate/mediaDetail', component: mediaDetail},
				{path: '/superOperate/clientList', component: clientList},
				{path: '/superOperate/planList', component: planList},
				{path: '/superOperate/publishPriceList', component: publishPriceList},
				{path: '/superOperate/createAccount', component: createAccount},
				{path: '/superOperate/accountList', component: accountList},
				{path: '/superOperate/orderList', component: orderList},
				{path: '/superOperate/clientDetail', component: clientDetail},
				{path: '/superOperate/planDetail', component: planDetail},
				{path: '/superOperate/orderDetail', component: orderDetail},
				{path: '/superOperate/photoGallery', component: photoGallery},
				{path: '/superOperate/changePwd', component: changePwd},
				{path: '/superOperate/ludanReport', component: ludanReport},
			]
		},
		//普通运营
		{
			path: '/',
			component: operateCommon,
			children: [
				{path: '/operate', name: '普通运营首页', component: operateIndex},
				{path: '/operate/mediaList', component: mediaList},
				{path: '/operate/mediaDetail', component: mediaDetail},
				{path: '/operate/planList', component: planList},
				{path: '/operate/publishPriceList', component: publishPriceList},
				{path: '/operate/orderList', component: orderList},
				{path: '/operate/clientDetail', component: clientDetail},
				{path: '/operate/planDetail', component: planDetail},
				{path: '/operate/orderDetail', component: orderDetail},
				{path: '/operate/publishPriceList', component: publishPriceList},
				{path: '/operate/mediaInput', component: mediaInput},
				{path: '/operate/clientList', component: clientList},
				{path: '/operate/changePwd', component: changePwd},
			]
		},
		//媒介
		{
			path: '/',
			component: mediaCommon,
			children: [
				{path: '/media', component: mediaIndex},
				{path: '/media/mediaList', component: mediaList},
				{path: '/media/mediaInput', component: mediaInput},
				{path: '/media/mediaDetail', component: mediaDetail},
				{path: '/media/planList', component: planList},
				{path: '/media/publishPriceList', component: publishPriceList},
				{path: '/media/createAccount', component: createAccount},
				{path: '/media/accountList', component: accountList},
				{path: '/media/orderList', component: orderList},
				{path: '/media/createPlan', component: createPlan},
				{path: '/media/planDetail', component: planDetail},
				{path: '/media/orderDetail', component: orderDetail},
				{path: '/media/photoGallery', component: photoGallery},
				{path: '/media/changePwd', component: changePwd},
				{path: '/media/ludanReport', component: ludanReport},
			]
		},
		//销售
		{
			path: '/',
			component: saleCommon,
			children: [
				{path: '/sale', component: saleIndex},
				{path: '/sale/createClient', component: createClient},
				{path: '/sale/editClient', component: editClient},
				{path: '/sale/clientList', component: clientList},
				{path: '/sale/planList', component: planList},
				{path: '/sale/publishPriceList', component: publishPriceList},
				{path: '/sale/orderList', component: orderList},
				{path: '/sale/clientDetail', component: clientDetail},
				{path: '/sale/createPlan', component: createPlan},
				{path: '/sale/planDetail', component: planDetail},
				{path: '/sale/orderDetail', component: orderDetail},
				{path: '/sale/changePwd', component: changePwd},
			]
		},

	]
})
