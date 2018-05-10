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
//超级运营
import adminIndex from '../components/superOperate/superOperate_index.vue';
import ADlimitList from '../components/superOperate/ADlimitList.vue';
import superOperateCommon from '../components/superOperate/superOperate_common.vue';
//普通运营
import operateCommon from '../components/operate/operate_common.vue';
//销售
import saleIndex from '../components/sale/sale_index.vue';
import createClient from '../components/sale/createClient.vue';
import saleCommon from '../components/sale/sale_common.vue';
//媒介
import mediaIndex from '../components/media/media_index.vue';
import mediaCommon from '../components/media/media_common.vue';
//登录
import login from '../components/home/login.vue';


Vue.use(Router);

export default new Router({
  // mode:'history',
	routes: [
		{path: '/', redirect: '/login'},
		{path: '/login', name: 'login', component: login},

		//超级运营
		{
			path: '/',
			component: superOperateCommon,
			children: [
				{path: '/superOperate', name: '超级运营首页', component: adminIndex},
				{path: '/superOperate/ADlimitList', name: '广告限制列表', component: ADlimitList},
				{path: '/superOperate/mediaInput', name: '媒体录入', component: mediaInput},
				{path: '/superOperate/mediaList', name: '媒体列表', component: mediaList},
				{path: '/superOperate/mediaDetail', name: '媒体详情', component: mediaDetail},
				{path: '/superOperate/clientList', name: '客户列表', component: clientList},
				{path: '/superOperate/planList', name: '方案列表', component: planList},
				{path: '/superOperate/publishPriceList', name: '刊例价列表', component: publishPriceList},
				{path: '/superOperate/createAccount', name: '创建帐户', component: createAccount},
				{path: '/superOperate/accountList', name: '帐户列表', component: accountList},
				{path: '/superOperate/orderList', name: '订单列表', component: orderList},
				{path: '/superOperate/clientDetail', name: '客户详情', component: clientDetail},
			]
		},
		//普通运营
		{
			path: '/',
			component: operateCommon,
			children: [
				// {path: '/operate', name: '普通运营首页', component: operateIndex},
				{path: '/operate/mediaList', name: '媒体列表', component: mediaList},
				{path: '/operate/mediaDetail', name: '媒体详情', component: mediaDetail},
				{path: '/operate/planList', name: '方案列表', component: planList},
				{path: '/operate/publishPriceList', name: '刊例价列表', component: publishPriceList},
				{path: '/operate/orderList', name: '订单列表', component: orderList},
				{path: '/operate/clientDetail', name: '客户详情', component: clientDetail},
			]
		},
		//媒介
		{
			path: '/',
			component: mediaCommon,
			children: [
				{path: '/media', name: '媒介首页', component: mediaIndex},
				{path: '/media/mediaList', name: '媒体列表', component: mediaList},
				{path: '/media/mediaInput', name: '媒体录入', component: mediaInput},
				{path: '/media/planList', name: '方案列表', component: planList},
				{path: '/media/publishPriceList', name: '刊例价列表', component: publishPriceList},
				{path: '/media/createAccount', name: '创建帐户', component: createAccount},
				{path: '/media/accountList', name: '帐户列表', component: accountList},
				{path: '/media/orderList', name: '订单列表', component: orderList},
				{path: '/media/createPlan', name: '创建方案', component: createPlan},
				{path: '/media/planDetail', component: planDetail},
				{path: '/media/orderDetail',  component: orderDetail},
			]
		},
		//销售
		{
			path: '/',
			component: saleCommon,
			children: [
				{path: '/sale', name: '销售首页', component: saleIndex},
				{path: '/sale/createClient', name: '创建客户', component: createClient},
				{path: '/sale/clientList', name: '客户列表', component: clientList},
				{path: '/sale/planList', name: '方案列表', component: planList},
				{path: '/sale/publishPriceList', name: '刊例价列表', component: publishPriceList},
				{path: '/sale/orderList', name: '订单列表', component: orderList},
				{path: '/sale/clientDetail', name: '客户详情', component: clientDetail},
				{path: '/sale/createPlan', name: '创建方案', component: createPlan},
			]
		},

	]
})
