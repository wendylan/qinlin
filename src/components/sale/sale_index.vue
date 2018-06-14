<template>
    <div class="contain">
        <managebox :contain-data="containData"></managebox>
    </div>
</template>

<script>
import managebox from "../public/cardManage.vue";
export default {
    name: "sale_index",
    data() {
        return {
            containData: [
                {
                    path: "/sale/createClient",
                    name: "客户管理",
                    smallOpera: "创建",
                    operationName: "客户列表",
                    operationPath: "/sale/clientList",
                    classPar: "group_box",
                    class: "group"
                },
                {
                    path: "/sale/createPlan",
                    name: "方案管理",
                    smallOpera: "创建",
                    operationName: "方案列表",
                    operationPath: "/sale/planList",
                    classPar: "editor_box",
                    class: "editor"
                },
                {
                    path: "/sale/orderList",
                    name: "订单管理",
                    smallOpera: "查看",
                    operationName: "账户列表",
                    operationPath: "/sale/accountList",
                    classPar: "order_box",
                    class: "order"
                }
            ]
        };
    },
    components: {
        managebox
    }
};
</script>

<style scoped>
.contain {
    min-height: 720px;
}
</style>
