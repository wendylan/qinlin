<template>
    <!-- <div>
        <div class="ad_index_container">
            <ul class="ad_index_panel clearfix">
                <li>
                    <router-link :to="{path:'/operate/clientList'}" class="mask"></router-link>
                    <div class="panel_top">
                        <div class="panel_top_icon_wrap">
                            <div class="panel_top_icon">

                            </div>
                        </div>
                        <div class="panel_top_right">
                            <h1>客户管理</h1>
                            <span>查 看<img src="../../assets/images/rightArr.png" alt=""></span>
                        </div>
                    </div>
                    <div class="panel_bottom">
                       <p><router-link :to="{path:'admin/createClient'}">创建客户</router-link></p>
                    </div>
                </li>
                <li>
                  <router-link :to="{path:'/operate/mediaList'}" class="mask"></router-link>
                    <div class="panel_top">
                        <div class="panel_top_icon_wrap">
                            <div class="panel_top_icon">
                            </div>
                        </div>
                        <div class="panel_top_right">
                            <h1>媒体管理</h1>
                            <span>查 看<img src="../../assets/images/rightArr.png" alt=""></span>
                        </div>
                    </div>
                    <div class="panel_bottom">
                        <p><router-link :to="{path:'operate/mediaInput'}">录入媒体</router-link></p>
                    </div>
                </li>
                <li>
                  <router-link :to="{path:'/operate/planList'}" class="mask"></router-link>
                    <div class="panel_top">
                        <div class="panel_top_icon_wrap">
                            <div class="panel_top_icon">
                            </div>
                        </div>
                        <div class="panel_top_right">
                            <h1>方案管理</h1>
                            <span>查 看<img src="../../assets/images/rightArr.png" alt=""></span>
                        </div>
                    </div>
                    <div class="panel_bottom">
                        <p><router-link :to="{path:'admin/createPlan'}">创建方案</router-link></p>
                    </div>
                </li>
                <li>
                  <router-link :to="{path:'/operate/orderList'}" class="mask"></router-link>
                    <div class="panel_top">
                        <div class="panel_top_icon_wrap">
                            <div class="panel_top_icon">
                            </div>
                        </div>
                        <div class="panel_top_right">
                            <h1>订单管理</h1>
                            <span>查 看<img src="../../assets/images/rightArr.png" alt=""></span>
                        </div>
                    </div>
                    <div class="panel_bottom">
                    </div>
                </li>
            </ul>
        </div>


    </div> -->
    <div>
        <managebox :contain-data="containData"></managebox>
    </div>
</template>

<script>
import managebox from '../public/cardManage.vue';
export default {
    name: "admin_index",
    data(){
        return { 
            containData:[
                {path: '/operate/clientList', name: '客户管理', smallOpera:'查看', operationName: '创建客户', operationPath: 'admin/createClient'},
                {path: '/operate/mediaList', name: '媒体管理', smallOpera:'查看', operationName: '录入媒体', operationPath: '/operate/mediaInput'},
                {path: '/operate/planList', name: '方案管理', smallOpera:'查看', operationName: '创建方案', operationPath: 'admin/createPlan'},
                {path: '/operate/orderList', name: '订单管理', smallOpera:'查看', operationName: '', operationPath: ''}
            ],
        }
    },
    components: {
        managebox
    }
}
</script>

<style scoped>

</style>
