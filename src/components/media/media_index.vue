<template>
    <div class="contain">
        <managebox :contain-data="containData"></managebox>
    </div>
</template>

<script>
import managebox from "../public/cardManage.vue";
export default {
    name: "media_index",
    data() {
        return {
            containData: [
                {
                    path: "/media/mediaList",
                    name: "媒体管理",
                    smallOpera: "查看",
                    operationName: "录入媒体",
                    operationPath: "/media/mediaInput",
                    classPar: "media_box",
                    class: "media"
                },
                {
                    path: "/media/planList",
                    name: "方案管理",
                    smallOpera: "查看",
                    operationName: "创建方案",
                    operationPath: "/media/createPlan",
                    classPar: "editor_box",
                    class: "editor"
                },
                {
                    path: "/media/orderList",
                    name: "订单管理",
                    smallOpera: "查看",
                    operationName: "",
                    operationPath: "",
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
