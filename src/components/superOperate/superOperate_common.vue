<template>
  <!-- <div id="app"> -->
    <!--头部-->
    <!-- <div class="ad_index_header" >
      <div class="logo">
        <img src="../../assets/home/logo.png" alt="">
      </div>
      <ul class="ad_index_nav">
        <li>
          <router-link :to="{path:'/superOperate'}" class="nav_fast">首页</router-link>
        </li>
        <li>
          <router-link :to="{path:'/superOperate/mediaList'}" class="nav_fast">媒体列表</router-link>
        </li>
        <li>
          <router-link :to="{path:'/superOperate/clientList'}" class="nav_fast">客户列表</router-link>
        </li>
        <li>
          <router-link :to="{path:'/superOperate/planList'}" class="nav_fast">方案列表</router-link>
        </li>
        <li>
          <router-link :to="{path:'/superOperate/orderList'}" class="nav_fast">订单列表</router-link>
        </li>
        <li>
          <a href="#">账号设置</a>
        </li>
        <li>
          <router-link :to="{path:'/superOperate/ADlimitList'}" class="nav_fast">广告限制</router-link>
        </li>
        <li>
          <router-link :to="{path:'/superOperate/publishPriceList'}" class="nav_fast">刊例价</router-link>
        </li>
        <li>
          <a href="#">图片库</a>
        </li>
        <li>
          <a href="#">画像申请</a>
        </li>
        <li><a href="#">操作指引</a></li>
      </ul>
      <div class="handle clearfix">
        <a href="#" class="ad_index_user">
          <em>超级运营</em> <i class="uname fa fa-angle-down fa-lg">{{name}}</i>
        </a>
        <div class="user_handel_list">
          <ul>
            <li><a href="#">修改密码</a></li>
            <li><router-link :to="{path:'/login'}">退出登陆</router-link></li>
          </ul>
        </div>
      </div>

    </div>

    <router-view></router-view>

  </div> -->
</template>

<script>
	// import  utils from '../../utils.js';
	// export default {
	// 	name: 'home',
	// 	data(){
	// 		return {
	// 			name:'',
	// 		}
	// 	},
	// 	methods:{
	// 		routerNav:function (path) {
	// 		// this.$router.push({ path: path })
	// 			this.$router.push(path)
	// 		},
	// 	},
	
	// 	mounted:function(){
	// 		$(function () {

	// 			//修改密码
	// 			$('.ad_index_user').click(function () {
	// 				if ($('.user_handel_list').css('display') === 'none') {
	// 					$('.user_handel_list').show();
	// 				} else {
	// 					$('.user_handel_list').hide();
	// 				}
	// 			});
	// 		});
	// 		this.name = utils.getCookie('realname');
	// 	},
	// }

</script>

<style>

</style>



<template>
  <div id="app">
	<headerbar :pageData="pageData" :name="name"></headerbar>
    <router-view></router-view>
  </div>
</template>

<script>
import headerbar from '../public/headerbar.vue';
export default {
	name: 'home',
	components:{
		headerbar,
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