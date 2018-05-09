<template>
	<div>
		<managebox :contain-data="containData"></managebox>
	</div>
</template>

<script>
import managebox from '../public/cardManage.vue';
export default {
	name: "sale_index",
	data(){
        return {
            containData:[
                {path: '/sale/createClient', name: '客户管理', smallOpera: '创建', operationName: '客户列表', operationPath: '/sale/clientList'},
                {path: '/sale/createPlan', name: '方案管理', smallOpera:'创建', operationName: '方案列表', operationPath: '/sale/planList'},
                {path: '/sale/orderList', name: '订单管理', smallOpera:'查看', operationName: '', operationPath: ''}
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
