<template>
    <div class="contain">
        <managebox :contain-data="containData"></managebox>
    </div>
</template>

<script>
import managebox from "../public/cardManage.vue";
export default {
    name: "admin_index",
    data() {
        return {
            containData: [
                {
                    path: "/operate/mediaList",
                    name: "媒体管理",
                    smallOpera: "查看",
                    operationName: "",
                    operationPath: "",
                    classPar: "media_box",
                    class: "media"
                },
                {
                    path: "/operate/planList",
                    name: "方案管理",
                    smallOpera: "查看",
                    operationName: "",
                    operationPath: "",
                    classPar: "editor_box",
                    class: "editor"
                },
                {
                    path: "/operate/orderList",
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
