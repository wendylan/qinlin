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
                {path: '/operate/clientList', name: '客户管理', smallOpera:'查看', operationName: '创建客户', operationPath: '/operate/createClient', classPar: 'group_box', class:'group'},
                {path: '/operate/mediaList', name: '媒体管理', smallOpera:'查看', operationName: '录入媒体', operationPath: '/operate/mediaInput', classPar: 'media_box', class:'media'},
                {path: '/operate/planList', name: '方案管理', smallOpera:'查看', operationName: '创建方案', operationPath: '/operate/createPlan', classPar: 'editor_box', class:'editor'},
                {path: '/operate/orderList', name: '订单管理', smallOpera:'查看', operationName: '', operationPath: '', classPar: 'order_box', class:'order'}
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
