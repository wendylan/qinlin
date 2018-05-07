<template>
    <div>
        <div class="ad_index_container">
            <ul class="ad_index_panel clearfix">
                <li>
                    <router-link :to="{path:'/superOperate/clientList'}" class="mask"></router-link>
                    <div class="panel_top">
                        <div class="panel_top_icon_wrap">
                            <div class="panel_top_icon">

                            </div>
                        </div>
                        <div class="panel_top_right">
                            <h1>客户管理</h1>
                            <span>查 看<img src="../../assets/home/rightArr.png" alt=""></span>
                        </div>
                    </div>
                    <div class="panel_bottom">
                       <!-- <p><router-link :to="{path:'admin/createClient'}">创建客户</router-link></p>-->
                    </div>
                </li>
                <li>
                  <router-link :to="{path:'/superOperate/mediaList'}" class="mask"></router-link>
                    <div class="panel_top">
                        <div class="panel_top_icon_wrap">
                            <div class="panel_top_icon">
                            </div>
                        </div>
                        <div class="panel_top_right">
                            <h1>媒体管理</h1>
                            <span>查 看<img src="../../assets/home/rightArr.png" alt=""></span>
                        </div>
                    </div>
                    <div class="panel_bottom">
                        <p><router-link :to="{path:'superOperate/mediaInput'}">录入媒体</router-link></p>
                    </div>
                </li>
                <li>
                  <router-link :to="{path:'/superOperate/planList'}" class="mask"></router-link>
                    <div class="panel_top">
                        <div class="panel_top_icon_wrap">
                            <div class="panel_top_icon">
                            </div>
                        </div>
                        <div class="panel_top_right">
                            <h1>方案管理</h1>
                            <span>查 看<img src="../../assets/home/rightArr.png" alt=""></span>
                        </div>
                    </div>
                    <div class="panel_bottom">
                        <!--<p><router-link :to="{path:'admin/createPlan'}">创建方案</router-link></p>-->
                    </div>
                </li>
                <li>
                  <router-link :to="{path:'/superOperate/orderList'}" class="mask"></router-link>
                    <div class="panel_top">
                        <div class="panel_top_icon_wrap">
                            <div class="panel_top_icon">
                            </div>
                        </div>
                        <div class="panel_top_right">
                            <h1>订单管理</h1>
                            <span>查 看<img src="../../assets/home/rightArr.png" alt=""></span>
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
        name: "admin_index"
    }
</script>

<style scoped>
    .ad_index_panel li:nth-child(1) .panel_top_icon_wrap{
        border: 8px solid rgba(255,208,77,0.3);
        margin-left: 50px;
        margin-top: 20px;
        display: inline-block;
    }

    .ad_index_panel li:nth-child(1) .panel_top_icon{
        background: #FFD04D url("../../assets/home/group.png") no-repeat center center;
    }

    .ad_index_panel li:nth-child(2) .panel_top_icon_wrap{
        border: 8px solid rgba(97,161,248,0.30);;
        margin-left: 50px;
        margin-top: 20px;
        display: inline-block;
    }

    .ad_index_panel li:nth-child(2) .panel_top_icon{
        background: #61A1F8 url("../../assets/home/media.png") no-repeat center center;
    }

    .ad_index_panel li:nth-child(3) .panel_top_icon_wrap{
        border: 8px solid rgba(152,237,141,0.30);
        margin-left: 50px;
        margin-top: 20px;
        display: inline-block;
    }

    .ad_index_panel li:nth-child(3) .panel_top_icon{
        background: #98ED8D url("../../assets/home/editor.png") no-repeat center center;
    }

    .ad_index_panel li:nth-child(4) .panel_top_icon_wrap{
        border: 8px solid rgba(239,129,140,0.30);
        margin-left: 50px;
        margin-top: 20px;
        display: inline-block;
    }

    .ad_index_panel li:nth-child(4) .panel_top_icon{
        background: #EF818C url("../../assets/home/order.png") no-repeat center center;
    }


</style>
