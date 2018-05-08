<template>
    <div>
        <div class="ad_index_container">
            <ul class="ad_index_panel clearfix">
                <li>
                  <router-link :to="{path:'/media/mediaList'}" class="mask"></router-link>
                    <div class="panel_top">
                        <div class="panel_top_icon_wrap">
                            <div class="panel_top_icon">
                            </div>
                        </div>
                        <div class="panel_top_right">
                            <h1>媒体管理</h1>
                            <!-- <span>查 看<img src="../../assets/home/rightArr.png" alt=""></span> -->
                            <span>查 看 <i class="fa fa-angle-right fa-lg"></i></span>
                        </div>
                    </div>
                    <div class="panel_bottom">
                        <p><router-link :to="{path:'/media/mediaInput'}">录入媒体</router-link></p>
                    </div>
                </li>
                <li>
                  <router-link :to="{path:'/media/planList'}" class="mask"></router-link>
                    <div class="panel_top">
                        <div class="panel_top_icon_wrap">
                            <div class="panel_top_icon">
                            </div>
                        </div>
                        <div class="panel_top_right">
                            <h1>方案管理</h1>
                            <!-- <span>查 看<img src="../../assets/home/rightArr.png" alt=""></span> -->
                            <span>查 看 <i class="fa fa-angle-right fa-lg"></i></span>
                        </div>
                    </div>
                    <div class="panel_bottom">
                        <p><router-link :to="{path:'/media/createPlan'}">创建方案</router-link></p>
                    </div>
                </li>
                <li>
                  <router-link :to="{path:'/media/orderList'}" class="mask"></router-link>
                    <div class="panel_top">
                        <div class="panel_top_icon_wrap">
                            <div class="panel_top_icon">
                            </div>
                        </div>
                        <div class="panel_top_right">
                            <h1>订单管理</h1>
                            <!-- <span>查 看<img src="../../assets/home/rightArr.png" alt=""></span> -->
                            <span>查 看 <i class="fa fa-angle-right fa-lg"></i></span>
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
    name: "media_index"
}
</script>

<style scoped>

</style>
