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
import  utils from '../../utils.js';
export default {
	name: 'home',
    data(){
      return {
        name:'管理员',
        pageData: [
			{name: '客户管理',path: '/admin/clientList'},
			{name: '媒体管理',path: '/admin/mediaList'},
			{name: '方案管理',path: '/admin/planList'},
			{name: '订单管理',path: '/admin/orderList'},
			{name: '刊例价',path: '/'},
			{name: '广告限制',path: '/'},
			{name: '账号设置',path: '/media'},
			{name: '操作指引',path: '/media'},
        ],
      }
    },
	components:{
		headerbar,
		footerbar
	},
}


</script>

<style>

</style>
