<template>
  <div id="app">
    <!--头部-->
    <div class="ad_index_header" >
      <div class="logo">
        <img src="../../assets/home/logo.png" alt="">
      </div>
      <ul class="ad_index_nav">
        <li>
          <a href="#" class="nav_fast">快捷方式</a>
          <div class="fast_list clearfix">
            <ul class="fast_list_fir">
              <li><a @click="routerNav('/admin/clientList')">客户管理</a></li>
              <li><a @click="routerNav('/admin/mediaList')">媒体管理</a></li>
              <li><a @click="routerNav('/admin/planList')">方案管理</a></li>
              <li><a @click="routerNav('/admin/orderList')">订单管理</a></li>
            </ul>
          </div>
        </li>
        <li>
          <a href="#" class="nav_other">其他设置</a>
          <div class="other_list">
            <ul class="media_list">
              <li><a href="#">刊例价</a></li>
              <li><a href="#">广告限制</a></li>
              <li><a href="#">账号管理</a></li>
            </ul>
          </div>

        </li>
        <li><a href="#">操作指引</a></li>
      </ul>
      <div class="handle clearfix">
        <a href="#" class="ad_index_user">
          <em>管理员</em> <i class="uname fa fa-angle-down fa-lg">{{name}}</i>
          <!-- <img src="../../assets/home/downArr.png" alt=""> -->
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

    <!--尾部-->
    <div class="ad_index_footer clearfix" >
      <p><img src="../../assets/home/home_icon.png" alt=""><router-link to="/admin"> 回到首页</router-link> | Copyright &copy;2018 亲邻科技线上产品部</p>
    </div>

  </div>
</template>

<script>
  import  utils from '../../utils.js';
  export default {
    name: 'home',

    mounted:function(){
      $(function () {
        $('.ad_index_nav').children('li').hover(function () {
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


        //修改密码
        $('.ad_index_user').click(function () {
          if ($('.user_handel_list').css('display') === 'none') {
            $('.user_handel_list').show();
          } else {
            $('.user_handel_list').hide();
          }
        });
      })
      this.name = utils.getCookie('realname');
    },
    data(){
      return {
        name:'',
        paths:["admin/clientList", "admin/clientList", "admin/planList", "admin/orderList"]
      }
    },
    methods:{
      routerNav:function (path) {
        // this.$router.push({ path: path })
        this.$router.push(path)
      },
    }
  }


</script>

<style>

</style>
