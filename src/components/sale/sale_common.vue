<template>
	<div id="app">
		<headerbar :pageData="pageData" :name="name"></headerbar>
		<router-view></router-view>
		<footerbar></footerbar>
	</div>
</template>

<script>
import headerbar from '../public/headerbar.vue';
import footerbar from '../public/footer.vue';
export default {
	name: 'home',
	components:{
		headerbar,
		footerbar
	},
	data() {
		return {
			name:'销售',
			pageData: [
				{name: '首页',path: '/sale'},
				{name: '创建用户',path: '/sale/createClient'},
				{name: '创建方案',path: '/sale/createPlan'},
				{name: '订单列表',path: '/sale/orderList'},
				{name: '刊例价',path: '/sale/publishPriceList'},
				{name: '操作指引',path: '/media'},
			],
		}
	},
}
</script>

<style>

</style>
