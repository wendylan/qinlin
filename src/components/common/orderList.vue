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
                                <el-date-picker v-model="rangeDate" type="daterange" range-separator="-" format="yyyy-MM-dd" value-format="yyyy-MM-dd" start-placeholder="发布日期" end-placeholder="发布日期" @change="initData">
                                </el-date-picker>
                            </div>
                        </span>
                        <span>
                            <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
                        </span>
                    </div>
                </el-row>
                <div class="table_wrap">
                    <el-table border :data="currentOrder" style="width: 100%" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" :default-sort="{prop: 'apcTime', order: 'descending'}">
                        <el-table-column label="订单名称" min-width="14.6%">
                            <template slot-scope="scope">
                                <a href="javascript:void(0);" @click="ToDetail(scope.row.apID)">{{scope.row.apName}}</a>
                            </template>
                        </el-table-column>
                        <el-table-column label="客户名称" min-width="10.4%">
                            <template slot-scope="scope">
                                <el-tooltip class="item" effect="dark" :content="scope.row.cName" placement="bottom" v-if="scope.row.cName.length>9">
                                    <span title="">{{scope.row.cName}}</span>
                                </el-tooltip>
                                <span v-else title="">{{scope.row.cName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="bTitle" label="品牌名称" min-width="6.0%">
                            <template slot-scope="scope">
                                <el-tooltip class="item" effect="dark" :content="scope.row.bTitle" placement="bottom" v-if="scope.row.bTitle.length>5">
                                    <span title="">{{scope.row.bTitle||'--'}}</span>
                                </el-tooltip>
                                <span v-else title="">{{scope.row.bTitle||'--'}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="合同编号" class="tar" min-width="8.5%">
                            <template slot-scope="scope">
                                <el-tooltip class="item" effect="dark" :content="scope.row.apQC" placement="bottom" v-if="scope.row.apQC.length>10">
                                    <span title="">{{scope.row.apQC}}</span>
                                </el-tooltip>
                                <span v-else title="">{{scope.row.apQC}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column sortable :sort-method="sortPrice" label="订单总价" min-width="7.5%">
                            <template slot-scope="scope">
                                <el-tooltip class="item" effect="dark" :content="(scope.row.apTotal)?priceFormat(scope.row.apTotal/100):0" placement="bottom" v-if="scope.row.apTotal?scope.row.apTotal.toString().length>8:0">
                                    <span>&yen; {{(scope.row.apTotal)?priceFormat(scope.row.apTotal/100):0}}</span>
                                </el-tooltip>
                                <span v-else>&yen; {{(scope.row.apTotal)?priceFormat(scope.row.apTotal/100):0}}</span>

                            </template>
                        </el-table-column>
                        <el-table-column label="投放城市(点位面数，排期)" min-width="20.2%">
                            <template slot-scope="scope">
                                <!-- <p v-for="(item, index) of scope.row.cityArea" :key="index">{{setComma(item)}}</p> -->
                                <p v-for="(item, index) of scope.row.cityArea" :key="index">{{setComma(item)}}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="发布日期" min-width="7.3%" sortable :sort-method="sortData">
                            <template slot-scope="scope">
                                <span>{{formatTime(scope.row.apcTime)}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column class="Status" prop="apState" label="状态" min-width="5%" :filters="[
								{text: '已完成', value: 0},
                                {text: '进行中', value: 1},
                                {text: '未投放', value: 2},
                                {text: '投放中', value: 3},
                                {text: '强制结束', value: 5}
							]" :filter-method="filterStatus" :filter-multiple="false">
                            <template slot-scope="scope">
                                <span>{{ stateToText(scope.row.apState) }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" min-width="7.0%" v-if="!(role=='OP')">
                            <template slot-scope="scope">
                                <el-dropdown size="small" split-button trigger="click" placement="bottom-start">操作
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item :disabled="(scope.row.apState==5)||(role!='SM') " @click.native.prevent="finishOrder(scope.row)" class="finish">结束订单</el-dropdown-item>
                                        <el-dropdown-item :disabled="(scope.row.apState==5)||(role!='SM')" @click.native.prevent="applyPhoto(scope.row)" class="finish">申请画像</el-dropdown-item>
                                        <el-dropdown-item :disabled="(scope.row.apState==5)||(role!='MD')" @click.native.prevent="changePoint(scope.row.apID)" class="update">更换点位
                                        </el-dropdown-item>
                                        <!-- <el-dropdown-item @click.native.prevent="inputBox1" class="watch">监控备注</el-dropdown-item> -->
                                        <!--<el-dropdown-item disabled="disabled" class="push">推送任务</el-dropdown-item>-->
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>

        <!-- 画像申请的弹出框开始 -->
        <el-dialog :visible.sync="showPhoto" title="协助客户开通受众画像" center>
            <applyphoto @cancel="cancelApply" @apply="confirmApply"></applyphoto>
        </el-dialog>
        <!-- 画像申请的弹出框结束 -->
    </div>
</template>

<script>
import { api } from "../../api/api";
// 时间格式化
import dateFormat from "../../commonFun/timeFormat.js";
// 价格格式化
import commaFormat from "../../commonFun/commaFormat.js";
// 画像申请
import applyphoto from "./components/applyPhoto.vue";
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
        applyphoto,
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
            loading: true,
            // loading: false,
            rangeDate: "",
            keyword: "",
            select: "1",
            //表格
            orderList: [],
            currentOrder: [],
            showPhoto: false
            // orderList: [
            //     {
            //         apID: 368,
            //         apName: "多城市方案7.6~7.19",
            //         cName: "饮料A",
            //         bTitle: "营养快线",
            //         apTotal: 23400000,
            //         realName: "汪键",
            //         rIDs: "北京市(58面2018-07-06至2018-07-19)238,上海市(60面2018-07-06至2018-07-19)239,广州市(60面2018-07-06至2018-07-19)240,深圳市(60面2018-07-06至2018-07-19)241",
            //         apcTime: "2018-07-05 16:20:22.0",
            //         apState: 2,
            //         apQC: "QC201807051101006"
            //     },
            //     {
            //         apID: 371,
            //         apName: "投放中方案（明天观察状态）",
            //         cName: "阿里巴巴",
            //         bTitle: "淘宝",
            //         apTotal: 39685714,
            //         realName: "汪键",
            //         rIDs: "广州市(180面2018-06-26至2018-07-19)246,深圳市(60面2018-06-26至2018-07-19)247",
            //         apcTime: "2018-07-05 16:28:12.0",
            //         apState: 3,
            //         apQC: "QC201807054401002"
            //     }
            // ],
            // currentOrder: [
            //     {
            //         apID: 368,
            //         apName: "多城市方案7.6~7.19",
            //         cName: "饮料A",
            //         bTitle: "营养快线",
            //         apTotal: 23400000,
            //         realName: "汪键",
            //         rIDs: "北京市(58面2018-07-06至2018-07-19)238,上海市(60面2018-07-06至2018-07-19)239,广州市(60面2018-07-06至2018-07-19)240,深圳市(60面2018-07-06至2018-07-19)241",
            //         apcTime: "2018-07-05 16:20:22.0",
            //         apState: 2,
            //         apQC: "QC201807051101006"
            //     },
            //     {
            //         apID: 371,
            //         apName: "投放中方案（明天观察状态）",
            //         cName: "阿里巴巴",
            //         bTitle: "淘宝",
            //         apTotal: 39685714,
            //         realName: "汪键",
            //         rIDs: "广州市(180面2018-06-26至2018-07-19)246,深圳市(60面2018-06-26至2018-07-19)247",
            //         apcTime: "2018-07-05 16:28:12.0",
            //         apState: 3,
            //         apQC: "QC201807054401002"
            //     }
            // ],
        };
    },
    mounted() {
        // 获得初始数据
        this.getInitData();
        // 获取角色
        this.getRole();
    },
    methods: {
        // 面后面添加逗号
        setComma(value) {
            if (value) {
                let index = value.indexOf("面");
                let arr = value.split("");
                arr.splice(index + 1, 0, ",");
                return arr.join("");
            }
        },
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
                                // item.cityArea = item.rIDs.split(",");
                                let arr = item.rIDs.split(",");
                                let resultArr = [];
                                for (let data of arr) {
                                    let text = data.substr(
                                        0,
                                        data.indexOf(")") + 1
                                    );
                                    resultArr.push(text);
                                }
                                item.cityArea = resultArr;
                            }
                            // console.log(item.cityArea);
                        }
                        this.currentOrder = this.orderList;
                    } else if (res.data.SysCode == 100302) {
                        this.loginTimeout();
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
            sessionStorage.setItem("change_point", "no");
            sessionStorage.setItem("order_apid", apid);
            this.$router.push("./orderDetail");
        },
        // 更换点位
        changePoint(apid) {
            // Message.warning("该功能尚未完善");
            sessionStorage.setItem("change_point", "yes");
            sessionStorage.setItem("order_apid", apid);
            this.$router.push("./orderDetail");
        },
        // 状态转换成文本
        stateToText(val) {
            let state = [
                { text: "已完成", value: 0 },
                { text: "进行中", value: 1 },
                { text: "未投放", value: 2 },
                { text: "投放中", value: 3 },
                { text: "强制结束", value: 5 }
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
            return a.apcTime < b.apcTime;
        },
        // 价格加上逗号
        priceFormat(price) {
            return commaFormat.init(price);
        },
        // 结束订单
        finishOrder(row) {
            let info = {
                uid: JSON.parse(sessionStorage.getItem("session_data")).uID,
                apid: row.apID,
                act: "E"
            };
            // Message.warning("该功能尚未完善");
            MessageBox.confirm(
                "是否结束<b>" + row.apName + "</b>订单投放？",
                "提示",
                {
                    confirmButtonText: "是",
                    cancelButtonText: "否",
                    dangerouslyUseHTMLString: true,
                    type: "warning"
                }
            )
                .then(() => {
                    api
                        .postApi("/SetFangan", info)
                        .then(res => {
                            console.log(res.data);
                            // Message.success("操作成功");
                            if (res.data.SysCode == 300200) {
                                Message.success(res.data.MSG);
                                this.$set(row, "apState", 5);
                            } else if (res.data.SysCode == 100302) {
                                this.loginTimeout();
                            } else {
                                Message.warning(res.data.MSG);
                            }
                        })
                        .catch(res => {
                            console.log(res);
                        });
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
            console.log(range);
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
                            if (data.apQC) {
                                if (
                                    select == "3" &&
                                    data.apQC.includes(keyword)
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
                        if (data.apQC) {
                            if (select == "3" && data.apQC.includes(keyword)) {
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
                console.log("arr----------------", arr);
                return;
            }
            this.currentOrder = JSON.parse(JSON.stringify(this.orderList));
        },
        loginTimeout() {
            Message.warning("登录超时,请重新登录");
            this.$router.push("/login");
        },
        // 申请画像
        applyPhoto() {
            // Message.warning('该功能尚未完善');
            this.showPhoto = true;
        },
        cancelApply() {
            Message.info("取消画像申请");
            console.log("用户取消了操作");
            this.showPhoto = !this.showPhoto;
        },
        confirmApply(data) {
            console.log(data);
            this.showPhoto = !this.showPhoto;
            // Message.success('该订单住户画像开通成功');
        },

        //提示框
        inputBox1() {
            Message.warning("该功能尚未完善");
            // MessageBox.prompt("请输入监控备注", "提示", {
            //     confirmButtonText: "确定",
            //     cancelButtonText: "取消",
            //     inputType: "textarea",
            //     inputPattern: /^.{1,100}$/,
            //     inputErrorMessage: "监控备注超过100字,请缩减"
            // })
            //     .then(() => {
            //         Message.success("监控备注输入成功");
            //     })
            //     .catch(() => {
            //         Message.info("取消输入");
            //     });
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

/deep/ .el-button [class*="el-icon-"] + span,
.select-wrap button .el-icon-search {
    position: relative;
    left: -2px;
    top: 0px;
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
    padding: 8px 0;
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

/deep/ .el-table__row td:nth-child(5) .cell,
/deep/ .has-gutter tr th:nth-child(5) .cell {
    text-align: right;
}

/deep/ .el-table__row td:nth-child(5) .cell span {
    width: 85px;
}

/deep/ .el-table__row td:nth-child(7) .cell span {
    width: 87px;
}

/deep/ .el-table__row td:nth-child(4) .cell span {
    width: 95px;
}

/deep/ .el-table__row td:nth-child(3) .cell span {
    width: 70px;
}

/deep/ .el-table__row td:nth-child(2) .cell span {
    width: 130px;
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
    position: relative;
    top: 0px;
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
    /deep/ .el-table__row td:nth-child(4) .cell span {
        width: 100px;
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
        width: 145px;
    }

    /deep/ .el-table__row td:nth-child(5) .cell span {
        width: 123px;
    }

    /*   .table_wrap ul,.table_wrap .tr_wrap,.adPanel_table{
         width: 1764px;
       }

       .table_wrap .tr_wrap{
         height: 450px;}*/
}
</style>
