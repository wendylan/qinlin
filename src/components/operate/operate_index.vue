<template>
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
                {path: '/operate/clientList', name: '客户管理', smallOpera:'查看', operationName: '创建客户', operationPath: '/operate/createClient'},
                {path: '/operate/mediaList', name: '媒体管理', smallOpera:'查看', operationName: '录入媒体', operationPath: '/operate/mediaInput'},
                {path: '/operate/planList', name: '方案管理', smallOpera:'查看', operationName: '创建方案', operationPath: '/operate/createPlan'},
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
