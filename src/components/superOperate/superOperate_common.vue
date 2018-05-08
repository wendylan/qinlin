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
			name:'超级运营',
			pageData: [
				{name: '首页',path: '/superOperate'},
				{name: '媒体列表',path: '/superOperate/mediaList'},
				{name: '客户列表',path: '/superOperate/clientList'},
				{name: '方案列表',path: '/superOperate/planList'},
				{name: '订单列表',path: '/superOperate/orderList'},
				{name: '账号设置',path: '/'},
				{name: '广告限制',path: '/superOperate/ADlimitList'},
				{name: '刊例价',path: '/superOperate/publishPriceList'},
				{name: '图片库',path: '/'},
				{name: '画像申请',path: '/'},
				{name: '操作指引',path: '/'},
			],
		}
	},
}
</script>

<style>

</style>