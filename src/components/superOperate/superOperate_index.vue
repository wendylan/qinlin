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
                {path: '/superOperate/clientList', name: '客户管理', smallOpera: '查看', operationName: '创建客户', operationPath: 'admin/createClient'},
                {path: '/superOperate/mediaList', name: '媒体管理', smallOpera:'查看', operationName: '录入媒体', operationPath: '/superOperate/mediaInput'},
                {path: '/superOperate/planList', name: '方案管理', smallOpera:'查看', operationName: '创建方案', operationPath: 'admin/createPlan'},
                {path: '/superOperate/orderList', name: '订单管理', smallOpera:'查看', operationName: '', operationPath: ''},
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
