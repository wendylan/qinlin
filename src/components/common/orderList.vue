<template>
	<div class="ad_mediaDetail_wrap clearfix">
		<div class="ad_mediaDetail_nav ">
			<p>
				<a href="#" style="color: #999">订单管理</a>
			</p>
		</div>
		<div class="mediaList_wrap">
			<div class="mediaList_head">
				<h2>订单列表</h2>
			</div>
			<div class="mediaList_container">
				<el-row>
					<div class="mediaList_handel">
						<span>
							<div style="display:inline-block">
								<el-input placeholder="请输入内容" v-model="keyword" class="input-with-select" @change="initData">
									<el-select v-model="select" slot="prepend" placeholder="请选择">
										<el-option label="订单名" value="1"></el-option>
										<el-option label="客户名" value="2"></el-option>
										<el-option label="合同编号" value="3"></el-option>
									</el-select>
								</el-input>
							</div>
						</span>
						<span>
							<div class="block">
								<el-date-picker v-model="rangeDate" type="daterange" range-separator="-" start-placeholder="发布日期" end-placeholder="发布日期">
								</el-date-picker>
							</div>
						</span>
						<span>
							<el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
						</span>
					</div>
				</el-row>
				<div class="table_wrap">
					<el-table border :data="currentOrder" style="width: 100%" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
						<el-table-column label="订单名称" min-width="14.6%">
							<template slot-scope="scope">
								<a href="javascript:void(0);" @click="ToDetail(scope.row.apID)">{{scope.row.apName}}</a>
							</template>
						</el-table-column>
						<el-table-column label="客户名称" min-width="10.4%">
							<template slot-scope="scope">
								<el-tooltip class="item" effect="dark" :content="scope.row.cName" placement="bottom">
									<span title="">{{scope.row.cName}}</span>
								</el-tooltip>
							</template>
						</el-table-column>
						<el-table-column prop="bTitle" label="品牌名称" min-width="6.0%">
							<template slot-scope="scope">
								<el-tooltip class="item" effect="dark" :content="scope.row.bTitle" placement="bottom">
									<span title="">{{scope.row.bTitle}}</span>
								</el-tooltip>
							</template>
						</el-table-column>
						<el-table-column label="合同编号" class="tar" min-width="7.9%">
							<template slot-scope="scope">
								<el-tooltip class="item" effect="dark" :content="scope.row.apQC" placement="bottom">
									<span title="">{{scope.row.apQC}}</span>
								</el-tooltip>
							</template>
						</el-table-column>
						<el-table-column sortable :sort-method="sortPrice" label="订单总价" min-width="7.5%">
							<template slot-scope="scope">
								<span>&yen; {{(scope.row.apTotal)?priceFormat(scope.row.apTotal/100):0}}</span>
							</template>
						</el-table-column>
						<el-table-column label="投放城市(点位面数，排期)" min-width="19.2%">
							<template slot-scope="scope">
								<p v-for="(item, index) of scope.row.cityArea" :key="index">{{item}}
									<!-- <i class="fa fa-lock fa-lg" style="color:#999;"></i> -->
								</p>
							</template>
						</el-table-column>
						<el-table-column label="发布日期" min-width="7.3%" sortable :sort-method="sortData">
							<template slot-scope="scope">
								<span>{{formatTime(scope.row.apcTime)}}</span>
							</template>
						</el-table-column>
						<el-table-column class="Status" prop="apState" label="状态" min-width="6%" :filters="[
								{ text: '投放中', value: 0 },
								{ text: '已完成', value: 1 },
								{ text: '未投放', value: 2 },
								{ text: '强制结束', value: 3 }
							]" :filter-method="filterStatus" :filter-multiple="false">
							<template slot-scope="scope">
								<span>{{ stateToText(scope.row.apState) }}</span>
							</template>
						</el-table-column>
						<el-table-column label="操作" min-width="7.4%" v-if="!(role=='OP')">
							<template slot-scope="scope">
								<el-dropdown size="small" split-button trigger="click">操作
									<el-dropdown-menu slot="dropdown">
										<el-dropdown-item @click.native.prevent="confirmBox1" class="finish">结束订单</el-dropdown-item>
										<el-dropdown-item @click.native.prevent="changePoint(scope.row.apID)" class="update">更换点位</el-dropdown-item>
										<el-dropdown-item @click.native.prevent="inputBox1" class="watch">监控备注</el-dropdown-item>
										<el-dropdown-item disabled="disabled" class="push">推送任务</el-dropdown-item>
									</el-dropdown-menu>
								</el-dropdown>
							</template>
						</el-table-column>
					</el-table>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { api } from "../../api/api";
// 时间格式化
import dateFormat from "../../commonFun/timeFormat.js";
// 价格格式化
import commaFormat from "../../commonFun/commaFormat.js";
import {
    Button,
    CheckboxGroup,
    Checkbox,
    Input,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    Row,
    Table,
    TableColumn,
    DatePicker,
    Tooltip,
    Dialog,
    MessageBox,
    Message,
    Select,
    Option
} from "element-ui";

export default {
    name: "projectList",
    components: {
        elButton: Button,
        elCheckboxGroup: CheckboxGroup,
        elCheckbox: Checkbox,
        elInput: Input,
        elDropdown: Dropdown,
        elDropdownItem: DropdownItem,
        elDropdownMenu: DropdownMenu,
        elRow: Row,
        elTable: Table,
        elTableColumn: TableColumn,
        elDatePicker: DatePicker,
        elTooltip: Tooltip,
        elDialog: Dialog,
        elSelect: Select,
        elOption: Option
    },
    data() {
        return {
            // 角色
            role: "",
            //加载中
            // loading: true,
            loading: false,
            rangeDate: "",
            keyword: "",
            select: "1",
            //表格
            orderList: [
                {
                    apID: 1,
                    apName: "第一个投放方案",
                    cName: "新光百货",
                    bTitle: "新光百货",
                    apTotal: 465200,
                    realName: "黄启炜",
                    rIDs:
                        "重庆市(6面2018-05-19至2018-05-25),广州市(4面2018-05-19至2018-05-25),北京市(6面2018-05-19至2018-05-25)",
                    apcTime: "2018-05-09 18:29:47.0",
                    apState: 1
                }
            ],
            currentOrder: [
                {
                    apID: 1,
                    apName: "第一个投放方案",
                    cName: "新光百货",
                    bTitle: "新光百货",
                    apTotal: 465200,
                    realName: "黄启炜",
                    rIDs:
                        "重庆市(6面2018-05-19至2018-05-25),广州市(4面2018-05-19至2018-05-25),北京市(6面2018-05-19至2018-05-25)",
                    apcTime: "2018-05-09 18:29:47.0",
                    apState: 1
                }
            ]
        };
    },
    mounted() {
        // 获得初始数据
        this.getInitData();
        // 获取角色
        this.getRole();
    },
    methods: {
        // 获取角色
        getRole() {
            let role = JSON.parse(sessionStorage.getItem("session_data")).uType;
            this.role = role;
        },
        // 获得初始数据
        getInitData() {
            let uid = JSON.parse(sessionStorage.getItem("session_data")).uID;
            api
                .getApi("/GetOrder", { uid: uid })
                .then(res => {
                    console.log(res.data);
                    if (!res.data.SysCode) {
                        this.orderList = res.data.reverse();
                        this.loading = false;
                        for (let item of this.orderList) {
                            if (item.rIDs) {
                                item.cityArea = item.rIDs.split(",");
                            }
                            console.log(item.cityArea);
                        }
                        this.currentOrder = this.orderList;
                    } else {
                        Message.warning(res.data.MSG);
                    }
                })
                .catch(res => {
                    console.log(res);
                });
        },
        // 跳转到详情页面
        ToDetail(apid) {
            console.log(apid);
            sessionStorage.setItem("order_apid", apid);
            this.$router.push("./orderDetail");
        },
        // 更换点位
        changePoint(apid) {
            console.log(apid);
            sessionStorage.setItem("order_apid", apid);
            this.$router.push("./orderDetail");
        },
        // 状态转换成文本
        stateToText(val) {
            let state = [
                { text: "投放中", value: 0 },
                { text: "已完成", value: 1 },
                { text: "未投放", value: 2 },
                { text: "强制结束", value: 3 }
            ];
            for (let data of state) {
                if (val == data.value) {
                    return data.text;
                }
            }
        },
        // 时间格式规范
        formatTime(val) {
            return dateFormat.toDate(val);
        },
        // 价格排序
        sortPrice(a, b) {
            return a.apTotal - b.apTotal;
        },
        //日期排序
        sortData(a, b) {
            return a.apcTime > b.apcTime;
        },
        // 价格加上逗号
        priceFormat(price) {
            return commaFormat.init(price);
        },
        // 当搜索框为空的时候进行重置显示
        initData() {
            if (!this.rangeDate && !this.keyword) {
                this.currentOrder = JSON.parse(JSON.stringify(this.orderList));
            }
        },
        // 搜索方案
        search() {
            let range = this.rangeDate;
            let arr = [];
            let select = this.select;
            let keyword = this.keyword;
            if (range || this.keyword) {
                for (let data of this.orderList) {
                    if (range && keyword) {
                        if (
                            dateFormat.toDate(data.apcTime) >= range[0] &&
                            dateFormat.toDate(data.apcTime) <= range[1]
                        ) {
                            if (data.apName) {
                                if (
                                    select == "1" &&
                                    data.apName.includes(keyword)
                                ) {
                                    arr.push(data);
                                }
                            }
                            if (data.cName) {
                                if (
                                    select == "2" &&
                                    data.cName.includes(keyword)
                                ) {
                                    arr.push(data);
                                }
                            }
                            if (data.bTitle) {
                                if (
                                    select == "3" &&
                                    data.bTitle.includes(keyword)
                                ) {
                                    arr.push(data);
                                }
                            }
                        }
                    } else if (range) {
                        if (
                            dateFormat.toDate(data.apcTime) >= range[0] &&
                            dateFormat.toDate(data.apcTime) <= range[1]
                        ) {
                            arr.push(data);
                        }
                    } else if (keyword) {
                        if (data.apName) {
                            if (
                                select == "1" &&
                                data.apName.includes(keyword)
                            ) {
                                arr.push(data);
                            }
                        }
                        if (data.cName) {
                            if (select == "2" && data.cName.includes(keyword)) {
                                arr.push(data);
                            }
                        }
                        if (data.bTitle) {
                            if (
                                select == "3" &&
                                data.bTitle.includes(keyword)
                            ) {
                                arr.push(data);
                            }
                        }
                    }
                }
                this.currentOrder = arr;
                if (!arr.length) {
                    Message.warning({
                        message: "查询数据为空",
                        duration: 1500
                    });
                }
                console.log(arr);
                return;
            }
            this.currentOrder = JSON.parse(JSON.stringify(this.orderList));
        },

        //提示框
        inputBox1() {
            MessageBox.prompt("请输入监控备注", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                inputType: "textarea",
                inputPattern: /^.{1,100}$/,
                inputErrorMessage: "监控备注超过100字,请缩减"
            })
                .then(() => {
                    Message.success("监控备注输入成功");
                })
                .catch(() => {
                    Message.info("取消输入");
                });
        },

        confirmBox1() {
            MessageBox.confirm(
                "是否结束<b>" + this.orderList[0].orderName + "</b>订单投放？",
                "提示",
                {
                    confirmButtonText: "是",
                    cancelButtonText: "否",
                    dangerouslyUseHTMLString: true,
                    type: "warning"
                }
            )
                .then(() => {
                    //确定
                    Message.success("操作成功");
                })
                .catch(() => {
                    Message.info("已取消操作");
                });
        },
        //筛选
        filterStatus(value, row) {
            let sum = 0;
            for (let data of this.orderList) {
                if (data.apState != value) {
                    sum++;
                }
            }
            //sum和所有数据的长度相同时说明都不匹配
            if (sum == this.orderList.length) {
                Message.warning({
                    message: "筛选数据为空",
                    duration: 1500
                });
            }
            return row.apState === value;
        }
        //状态
    }
};

$(function() {
    /*window.onresize = function () {
		if ($(window.width >= 1366)) {
			$('.el-table-filter').css({
			left: '1145'
			})
		}
		};*/
    var Status = $(".el-table__row")
        .find("td")
        .text();
    if (Status === "已完成") {
        $(".watch").attr("disabled", "disabled");
    }
});
</script>

<style scoped>
a {
    color: #108ee9;
}

/deep/ .el-textarea__inner {
    height: 134px !important;
    resize: none;
}

/*筛选*/
.el-checkbox + .el-checkbox {
    margin-left: 0;
}

/deep/ .el-checkbox__label {
    font-size: 10px;
    color: #8a8a8a;
}

/*日期控件*/
.block {
    display: inline-block;
    margin-left: 2px;
    position: relative;
    /*top: 3px;*/
}

/deep/ .el-date-editor .el-range__icon {
    position: relative;
    top: -3px;
    margin-right: 2px;
}

/deep/ .el-range-separator {
    position: relative;
    top: -2px;
}

/deep/ .el-input__inner {
    width: 260px;
    height: 34px;
    line-height: 34px;
}

/deep/ .el-date-editor i,
/deep/ .el-date-editor input,
/deep/ .el-date-editor span {
    float: left;
    position: relative;
}

/*面包屑导航*/
.ad_mediaDetail_wrap {
    position: relative;
}

.ad_mediaDetail_nav p {
    padding-left: 57px;
    position: absolute;
    left: 0;
    top: 12px;
    color: #999999;
    font-size: 14px;
    line-height: 18px;
}

.ad_mediaDetail_nav p a {
    color: #666;
}

.ad_mediaDetail_nav {
    height: 42px;
    position: relative;
}

/*wrap*/
.mediaList_wrap {
    width: 1246px;
    background: #ffffff;
    border: 1px solid #e6e7e9;
    margin: 0 auto;
    /*margin-bottom: 46px;*/
}

.mediaList_wrap .mediaList_head {
    width: 100%;
    height: 24px;
    padding: 12px 0;
    border-bottom: 1px solid #e6e7e9;
}

.mediaList_wrap .mediaList_head h2 {
    font-size: 16px;
    color: #2c313c;
    height: 24px;
    padding-left: 14px;
    font-weight: bold;
}

.mediaList_wrap .mediaList_container {
    width: 100%;
    padding: 18px;
}

.el-input {
    width: 180px;
    height: 34px !important;
    border-radius: 4px;
}

.el-button {
    width: 76px;
    height: 34px;
    text-align: center;
    /*line-height: 34px;*/
    padding: 0;
    margin-left: 2px;
    /*position: relative;*/
    /*top: 1px;*/
    /*left: 0;*/
}

.mediaList_wrap .mediaList_container .table_wrap {
    width: 1210px;
    margin: 10px 0 0 0;

    border-radius: 4px;
}

.input-with-select /deep/ .el-input__inner {
    font-size: 14px;
    /*padding: 10px 10px;*/
    height: 34px;
    /*line-height: 14px;*/
    vertical-align: middle;
}

/*日期控件*/
.block {
    display: inline-block;
    margin-left: 2px;
}

/deep/ .el-input__inner {
    width: 260px;
    height: 34px;
}

/deep/ .el-range-input {
    font-size: 14px;
    padding: 10px 10px;
    height: 32px;
    line-height: 14px;
    box-sizing: border-box;
    /*vertical-align: middle;*/
}

/deep/ .el-date-editor .el-range__icon {
    position: relative;
    top: -3px;
    left: 0;
    margin-right: 2px;
}

/deep/ .el-date-editor .el-range__close-icon {
    position: relative;
    top: -2px;
    left: 3px;
}

/deep/ .el-picker-panel .el-date-range-picker .el-popper {
    left: 335px !important;
}

/deep/ .el-range-editor .el-range-input {
    line-height: 20px;
}

/*下拉搜索框*/
/deep/ .el-input-group__prepend {
    width: 64px;
    background-color: #fff;
}

/deep/ .el-input-group--prepend .el-select .el-input__inner {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;

    width: 104px;
}

/deep/ .el-input-group--prepend .el-input__inner {
    width: 185px;
}

.el-input {
    height: 34px !important;
    border-radius: 4px;
}

/deep/ .el-input__inner {
    height: 34px;
    /*position: relative;
    top: -1px;*/
}

/*按钮*/
/deep/ .el-button--default:focus,
.el-button--default:hover {
    color: #606266;
    border-color: #dcdfe6;
    background-color: #fcfcfc;
}

.content_bottom_btn /deep/ .el-button span {
    position: relative;
    top: -2px;
}

.content_bottom_btn /deep/ .el-button span a {
    color: #606266;
}

/*表格*/
/deep/ .el-date-editor .el-range-separator {
    line-height: 26px;
}

/deep/ .el-table th,
.el-table tr {
    height: 44px;
    padding: 0;
    background-color: #f7f7f7;
}

/deep/ .el-table td {
    padding: 6px 0;
    overflow-x: hidden;
    text-overflow: ellipsis;
}

/deep/ .el-table td .cell {
    /*display: flex;*/
}

/deep/ .el-table--border {
    border-radius: 4px;
}

/deep/ .el-table th > .cell {
    font-size: 14px;
    color: #666666;
    font-weight: bold;
}

/deep/ .el-table .caret-wrapper {
    width: 22px;
}

/deep/ .el-table_1_column_5 {
    text-align: right !important;
}

/deep/ .el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: #ecf5ff;
}

/*滚动条*/
/deep/ .el-table__body-wrapper {
    height: 405px;
    overflow-y: scroll;
    overflow-x: hidden;
}

/deep/ .el-table__body-wrapper::-webkit-scrollbar {
    width: 4px;
    background: #fafafa;
}

/deep/ .el-table__body-wrapper::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/

    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #c1c1c1;
    border-radius: 4px;
}

/*超出省略*/
/deep/ .el-table__row .cell {
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 24px;
    display: flex;
    flex-direction: column;
}
/deep/ .el-table__row .cell span {
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 24px;
}
/deep/ .el-table__row td:nth-child(5) .cell {
    text-align: right;
}
/deep/ .el-table__row td:nth-child(7) .cell span {
    width: 87px;
}
/deep/ .el-table__row td:nth-child(4) .cell span {
    width: 87px;
}

/deep/ .el-table__row td:nth-child(3) .cell span {
    width: 70px;
}

/deep/ .el-table__row td:nth-child(2) .cell span {
    width: 133px;
}

/*筛选*/
/deep/ .el-table__column-filter-trigger {
    margin-left: 10px;
}

/deep/ .el-table th > .cell.highlight {
    color: #409eff !important;
}

/deep/ div.el-table-filter {
    left: 1106px !important;
}

/deep/ .el-table-filter__list-item {
    color: #666;
}

/*操作*/
/deep/ .el-button--mini,
.el-button--small {
    font-size: 14px !important;
}

/deep/ .el-button .el-button--primary .el-button--mini {
    width: 51px;
}

/deep/ .el-dropdown-menu--mini .el-dropdown-menu__item {
    width: 65px;
}

/deep/ button.el-button.el-button--default.el-button--small:hover {
    color: #666;
    border-color: #d8d8d8;
    background-color: #fff;
}

.tar {
    text-align: right !important;
    padding-right: 10px;
}

/deep/ .el-dropdown .el-button-group .el-button {
    height: 28px;
    width: 48px;
    font-size: 14px;
    padding: 0;
}

/deep/ .el-dropdown .el-button-group .el-button:last-child {
    width: 30px;
}

/*/deep/ .el-button-group .el-button:not(:last-child){*/
/*margin-top: -1px;*/
/*}*/

/deep/ .el-button-group button {
    float: left !important;
}

/deep/ .popper__arrow {
    display: none;
}

.mediaList_handel span {
    float: left !important;
    margin-left: 4px;
}

/*1440*/
@media all and (min-width: 1420px) {
    .ad_mediaDetail_nav p {
        padding-left: 60px;
    }

    .mediaList_wrap {
        width: 1321.3px !important;
        /*margin-bottom: 177px !important;*/
    }

    .mediaList_wrap .mediaList_container .table_wrap {
        width: 1284px;
    }
}

/*1920*/
@media all and (min-width: 1900px) {
    .mediaList_wrap {
        width: 1800px !important;
        /*margin-bottom: 250px !important;*/
    }

    .mediaList_wrap .mediaList_container .table_wrap {
        width: 1764px !important;
    }

    /deep/ .el-table__row td:nth-child(7) .cell span {
        width: 120px;
    }

    /deep/ .el-table__row td:nth-child(3) .cell span {
        width: 102px;
    }

    /deep/ .el-table__row td:nth-child(2) .cell span {
        width: 185px;
    }
    /deep/ .el-table__row td:nth-child(4) .cell span {
        width: 138px;
    }

    /*   .table_wrap ul,.table_wrap .tr_wrap,.adPanel_table{
         width: 1764px;
       }

       .table_wrap .tr_wrap{
         height: 450px;}*/
}
</style>
