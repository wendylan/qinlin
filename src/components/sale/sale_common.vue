<template>
  <!-- <div id="app">
    //头部
    <div class="ad_index_header" >
      <div class="logo">
        <img src="../../assets/home/logo.png" alt="">
      </div>
      <ul class="ad_index_nav">
        <li>
          <router-link :to="{path:'/sale'}" class="nav_fast">首页</router-link>
        </li>
        <li>
          <router-link :to="{path:'/sale/createClient'}" class="nav_fast">创建客户</router-link>
        </li>
        <li>
          <router-link :to="{path:'/sale/createPlan'}" class="nav_fast">创建方案</router-link>
        </li>
        <li>
          <router-link :to="{path:'/sale/orderList'}" class="nav_fast">订单列表</router-link>
        </li>
        <li>
          <router-link :to="{path:'/sale/publishPriceList'}" class="nav_fast">刊例价</router-link>
        </li>
        <li><a href="#">操作指引</a></li>
      </ul>
      <div class="handle clearfix">
        <a href="#" class="ad_index_user">
          <em>销售</em> <i class="uname fa fa-angle-down fa-lg">{{name}}</i>
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
// 		})
// 		this.name = utils.getCookie('realname');
// 	},
// 	data(){
// 		return {
// 			name:'',
// 			paths:["admin/clientList", "admin/clientList", "admin/planList", "admin/orderList"]
// 		}
// 	},
// 	methods:{
// 		routerNav:function (path) {
// 			// this.$router.push({ path: path })
// 			this.$router.push(path)
// 		},
// 	}
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
