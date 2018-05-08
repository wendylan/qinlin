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
import utils from '../../utils.js';
export default {
	name: 'home',
	components:{
		headerbar,
		footerbar
	},
	data() {
		return {
			name:'媒介',
			pageData: [
				{name: '首页',path: '/media'},
				{name: '媒体列表',path: '/media/mediaList'},
				{name: '创建方案',path: '/media/createPlan'},
				{name: '订单列表',path: '/media/orderList'},
				{name: '账号设置',path: '/media'},
				{name: '刊例价',path: '/media/publishPriceList'},
				{name: '图片库',path: '/media'},
				{name: '操作指引',path: '/media'},
			],
		}
	},
}
</script>

<style>

</style>
