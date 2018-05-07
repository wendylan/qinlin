<template>
  <div>
    <div class="ad_index_container">
      <ul class="ad_index_panel clearfix">
        <li>
          <router-link :to="{path:'/sale/createClient'}" class="mask"></router-link>
          <div class="panel_top">
            <div class="panel_top_icon_wrap">
              <div class="panel_top_icon">
              </div>
            </div>
            <div class="panel_top_right">
				<h1>客户管理</h1>
				<span>创 建
					<i class="fa fa-angle-right fa-lg"></i>
					<!-- <img src="../../assets/home/rightArr.png" alt=""> -->
				</span>
            </div>
          </div>
          <div class="panel_bottom">
            <p><router-link :to="{path:'/sale/clientList'}">客户列表</router-link></p>
          </div>
        </li>
        <li>
          <router-link :to="{path:'/sale/createPlan'}" class="mask"></router-link>
          <div class="panel_top">
            <div class="panel_top_icon_wrap">
              <div class="panel_top_icon">
              </div>
            </div>
            <div class="panel_top_right">
              <h1>方案管理</h1>
              <span>创 建
				  <i class="fa fa-angle-right fa-lg"></i>
				  <!-- <img src="../../assets/home/rightArr.png" alt=""> -->
				</span>
            </div>
          </div>
          <div class="panel_bottom">
            <p><router-link :to="{path:'/sale/planList'}">方案列表</router-link></p>
          </div>
        </li>
        <li>
          <router-link :to="{path:'/sale/orderList'}" class="mask"></router-link>
          <div class="panel_top">
            <div class="panel_top_icon_wrap">
              <div class="panel_top_icon">
              </div>
            </div>
            <div class="panel_top_right">
              <h1>订单管理</h1>
              <span>查 看
				  <!-- <img src="../../assets/home/rightArr.png" alt=""> -->
				  <i class="fa fa-angle-right fa-lg"></i>
				</span>
            </div>
          </div>
          <div class="panel_bottom">
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
    export default {
        name: "sale_index"
    }
</script>

<style scoped>

</style>
