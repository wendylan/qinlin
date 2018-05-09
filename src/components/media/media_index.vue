<template>
    <div>
        <managebox :contain-data="containData"></managebox>
    </div>
</template>

<script>
import managebox from '../public/cardManage.vue';
export default {
    name: "media_index",
    data(){
        return {
            containData:[
                {path: '/media/mediaList', name: '媒体管理', smallOpera:'查看', operationName: '录入媒体', operationPath: '/media/mediaInput'},
                {path: '/media/planList', name: '方案管理', smallOpera:'查看', operationName: '创建方案', operationPath: '/media/createPlan'},
                {path: '/media/orderList', name: '订单管理', smallOpera:'查看', operationName: '', operationPath: ''}
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
