<template>
  <div id="app">
    <!--头部-->
    <!-- <div class="ad_index_header">
      <div class="logo">
        <img src="../../assets/home/logo.png" alt="">
      </div>
      <ul class="ad_index_nav">
        <li>
          <router-link :to="{path:'/media'}" class="nav_fast">首页</router-link>
        </li>
        <li>
          <router-link :to="{path:'/media/mediaList'}" class="nav_fast">媒体列表</router-link>
        </li>
        <li>
          <router-link :to="{path:'/media/createPlan'}" class="nav_fast">创建方案</router-link>
        </li>
        <li>
          <router-link :to="{path:'/media/orderList'}" class="nav_fast">订单列表</router-link>
        </li>
        <li>
          <a href="#">账号设置</a>
        </li>
        <li>
          <router-link :to="{path:'/media/publishPriceList'}" class="nav_fast">刊例价</router-link>
        </li>
        <li>
          <a href="#">图片库</a>
        </li>
        <li><a href="#">操作指引</a></li>
      </ul>
      <div class="handle clearfix">
        <a href="#" class="ad_index_user">
          <em>媒介</em> <i class="uname fa fa-angle-down fa-lg">{{name}}</i>
        </a>
        <div class="user_handel_list">
          <ul>
            <li><a href="#">修改密码</a></li>
            <li>
              <router-link :to="{path:'/login'}">退出登陆</router-link>
            </li>
          </ul>
        </div>
      </div>

    </div> -->
	<headerbar :pageData="pageData" :name="name"></headerbar>
    <router-view></router-view>
  </div>
</template>

<script>
import headerbar from '../public/headerbar.vue';
import utils from '../../utils.js';
export default {
	name: 'home',
	components:{
		headerbar,
	},
	mounted: function () {
		$(function () {
			/* $('.ad_index_nav').children('li').hover(function () {
				$(this).children('a').css({
					"color": "#fff",
					"border-bottom": "3px solid #fff"
				});
				$(this).find('ul').show();
				}, function () {
				$(this).children('a').css({
					"color": "#999",
					"border-bottom": "none"
				});
				$(this).find('ul').hide();
				}).click(function () {
				$(this).find('ul').hide();
				});
		*/
			//修改密码
			// $('.ad_index_user').click(function () {
			// 	if ($('.user_handel_list').css('display') === 'none') {
			// 		$('.user_handel_list').show();
			// 	} else {
			// 		$('.user_handel_list').hide();
			// 	}
			// });
		});
		// this.name = utils.getCookie('realname');
	},
	data() {
		return {
			// name: '',
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
			paths: ["admin/clientList", "admin/clientList", "admin/planList", "admin/orderList"]
		}
	},
	methods: {
		routerNav: function (path) {
			// this.$router.push({ path: path })
			this.$router.push(path)
		},
	}
}
</script>

<style>

</style>
