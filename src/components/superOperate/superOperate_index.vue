<template>
    <div>
        <managebox :contain-data="containData" :role="role"></managebox>
    </div>
</template>

<script>
import managebox from "../public/cardManage.vue";
import { Table, TableColumn, Progress } from "element-ui";
export default {
    name: "admin_index",
    components: {
        managebox,
        elTable: Table,
        elTableColumn: TableColumn,
        elProgress: Progress
    },
    data() {
        return {
            containData: [
                {
                    path: "/superOperate/clientList",
                    name: "客户管理",
                    smallOpera: "查看",
                    operationName: "",
                    operationPath: "",
                    classPar: "group_box",
                    class: "group"
                },
                {
                    path: "/superOperate/mediaList",
                    name: "媒体管理",
                    smallOpera: "查看",
                    operationName: "录入媒体",
                    operationPath: "/superOperate/mediaInput",
                    classPar: "media_box",
                    class: "media"
                },
                {
                    path: "/superOperate/planList",
                    name: "方案管理",
                    smallOpera: "查看",
                    operationName: "",
                    operationPath: "",
                    classPar: "editor_box",
                    class: "editor"
                },
                {
                    path: "/superOperate/orderList",
                    name: "订单管理",
                    smallOpera: "查看",
                    operationName: "账号列表",
                    operationPath: "/superOperate/accountList",
                    classPar: "order_box",
                    class: "order"
                }
            ],
            role: 'super'
        };
    },
};
</script>

<style scoped>
/*数据展示*/
.showData {
    width: 100%;
}

.numbers {
    /*width: 92%;*/
    width: 1245px;
    overflow: hidden;
    background-color: #fff;
    margin: 20px 60px 0 60px;
    border: 1px solid #dedede;
    border-radius: 2px;
    /*box-shadow: 0 2px 8px 1px rgba(0, 0, 0, 0.08);*/
}

.numbers li {
    float: left;
    padding: 0 28px;
    border-right: 1px solid #e8e8e8;
    margin-top: 20px;
    margin-bottom: 20px;

    box-sizing: border-box;
}

.numbers li:last-child {
    border-right: none;
}

.numbers li p {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
}

.numbers li h2 {
    font-size: 30px;
    color: rgba(0, 0, 0, 0.85);
    margin-top: 10px;
    margin-bottom: 14px;
}

.numbers li .scale {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.65);
}

.scale span + span {
    margin-left: 25px;
}

.numbers li .scale i {
    font-style: normal;
    color: #de1010;
    transform: rotateZ(90deg);
    font-size: 13px;
    font-weight: bold;
}

.scale em {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.85);
}

/*echarts*/
.echarts-box {
    /* width: 100%; */
    margin-left: 60px;
    overflow: hidden;
}

.echarts-box .box + .box {
    margin-left: 17px;
}

.echarts-box .box3 {
    margin-left: 0 !important;
}

.box {
    float: left;
    border: 1px solid #dedede;
    border-radius: 2px;
    width: 613px;
    background-color: #fff;
    margin-top: 20px;
    /*height: 443px;*/
}

.box h3 {
    font-size: 16px;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.85);
    padding-left: 24px;
    padding-top: 10px;
}

/*社区及广告门增长趋势*/
.box .tabs {
    padding-left: 24px;
    padding-top: 10px;
}

.box button {
    width: 88px;
    height: 32px;
    outline: none;
    border: 1px solid #d9d9d9;
    border-radius: 4px 0 0 4px;
    background-color: #fff;
    cursor: pointer;
}

.box button + button {
    margin-left: -5px;
    border-radius: 0 4px 4px 0;
}

.box button.active {
    border: 1px solid #1890ff;
}

.charts {
    border-top: 1px solid #e8e8e8;
    margin-top: 10px;
    margin-bottom: 20px;
}

/*订单数量分布情况*/
.box2 h3 {
    font-size: 16px;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.85);
    padding: 16px 24px 6px 24px;
}

.box4 {
    /* height: 504px; */
}

.box4 h3 {
    font-size: 16px;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.85);
    padding: 16px 24px 6px 24px;
}

/*广告方案数*/
.table-wrap {
    padding: 20px;
}
/deep/ .el-table thead {
    background: #fafafa;
}
/deep/ .el-table th {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.65);
}

html,
body {
    overflow: hidden;
}

.ad_index_container {
    /* height: 1888px; */
}

.ad_index_panel li {
    height: 146px;
}

.ad_index_panel li + li {
    margin-left: 22px;
}

.panel_top {
    border-bottom: none;
    height: 146px;
}

.ad_index_panel .mask {
    height: 146px;
}

.panel_top_right {
    top: 44px;
}

.ad_index_panel li .panel_top_icon_wrap {
    margin-top: 34px;
    margin-left: 50px;
    display: inline-block;
}

.ad_index_panel li:nth-child(1) .panel_top_icon_wrap {
    border: 8px solid rgba(255, 208, 77, 0.3);
}

.ad_index_panel li:nth-child(1) .panel_top_icon {
    background: #ffd04d url("../../assets/images/group.png") no-repeat center
        center;
}

.ad_index_panel li:nth-child(2) .panel_top_icon_wrap {
    border: 8px solid rgba(97, 161, 248, 0.3);
}

.ad_index_panel li:nth-child(2) .panel_top_icon {
    background: #61a1f8 url("../../assets/images/media.png") no-repeat center
        center;
}

.ad_index_panel li:nth-child(3) .panel_top_icon_wrap {
    border: 8px solid rgba(152, 237, 141, 0.3);
}

.ad_index_panel li:nth-child(3) .panel_top_icon {
    background: #98ed8d url("../../assets/images/editor.png") no-repeat center
        center;
}

.ad_index_panel li:nth-child(4) .panel_top_icon_wrap {
    border: 8px solid rgba(239, 129, 140, 0.3);
}

.ad_index_panel li:nth-child(4) .panel_top_icon {
    background: #ef818c url("../../assets/images/order.png") no-repeat center
        center;
}

/*1440*/
@media screen and (min-width: 1440px) {
    .ad_index_panel li {
        width: 310px;
    }

    .ad_index_container {
        /* height: 1441px; */
    }

    .ad_index_panel li + li {
        margin-left: 22px;
    }

    .numbers {
        /*width: 92%;*/
        width: 1306px;
    }

    .echarts-box .box + .box {
        margin-left: 22px;
    }
    .box {
        float: left;
        border: 1px solid #dedede;
        border-radius: 2px;
        width: 45%;
        background-color: #fff;
        margin-top: 20px;
        /*height: 443px;*/
    }
}

/*1920*/
@media screen and (min-width: 1920px) {
    .numbers li {
        float: left;
        padding: 0 97px;
    }

    .ad_index_panel li + li {
        margin-left: 22px;
    }

    .numbers {
        /*width: 92%;*/
        width: 1800px;
    }

    .box {
        float: left;
        border: 1px solid #dedede;
        border-radius: 2px;
        width: 46.7%;
        background-color: #fff;
        margin-top: 20px;
        /*height: 443px;*/
    }
}
</style>