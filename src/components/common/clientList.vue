<template>
    <div class="ad_mediaDetail_wrap clearfix">
        <div class="ad_mediaDetail_nav ">
            <p class="clearfix">
                <a href="#" style="color: #999">客户管理</a>
            </p>
        </div>
        <div class="mediaList_wrap">
            <div class="mediaList_head">
                <h2>客户列表</h2>
            </div>
            <div class="mediaList_container">
                <el-row>
                    <div class="mediaList_handel">
                        <span>
                            <div style="display:inline-block">
                                <el-input placeholder="请输入内容" v-model="keyword" class="input-with-select" @change="initData">
                                    <el-select v-model="select" slot="prepend" placeholder="请选择">
                                        <el-option label="公司品牌" value="1"></el-option>
                                        <el-option label="公司名称" value="2"></el-option>
                                        <el-option label="联系人" value="3"></el-option>
                                    </el-select>
                                </el-input>
                            </div>
                        </span>
                        <span>
                            <div class="block">
                                <el-date-picker class="input-with-select" v-model="date" type="daterange" range-separator="-" format="yyyy-MM-dd" value-format="yyyy-MM-dd" start-placeholder="创建日期" end-placeholder="创建日期" @change="initData">
                                </el-date-picker>
                            </div>
                        </span>
                        <span>
                            <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
                        </span>
                        <span>
                            <el-button plain @click="newClient" v-if="showNewBtn">新建</el-button>
                        </span>
                    </div>
                </el-row>
                <div class="table_wrap">
                    <el-table border :data="currentPlan" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" style="width: 100%" :default-sort="{prop: 'joinTime', order: 'descending'}">
                        <el-table-column label="联系人" min-width="6%">
                            <template slot-scope="scope">
                                <el-tooltip class="item" effect="dark" :content="scope.row.realName" placement="bottom" v-if="scope.row.realName.length>18">
                                    <span>{{scope.row.realName}}</span>
                                </el-tooltip>
                                <span v-else>{{scope.row.realName}}</span>
                            </template>
                        </el-table-column>
                        <!--<el-table-column prop="clientRName" label="所在地" min-width="7.2%">-->
                        <!--</el-table-column>-->
                        <el-table-column label="职位" class="tar" min-width="7.2%">
                            <template slot-scope="scope">
                                <el-tooltip class="item" effect="dark" :content="scope.row.position" placement="bottom" v-if="scope.row.position.length>18">
                                    <span>{{scope.row.position||'--'}}</span>
                                </el-tooltip>
                                <span v-else>{{scope.row.position||'--'}}</span>
                            </template>

                        </el-table-column>
                        <el-table-column prop="phone" label="手机号码" min-width="9.5%">
                        </el-table-column>
                        <el-table-column label="公司名称" min-width="18.4%">
                            <template slot-scope="scope">
                                <el-tooltip class="item" effect="dark" :content="scope.row.cName" placement="bottom" v-if="scope.row.cName.length>18">
                                    <span>{{scope.row.cName||'--'}}</span>
                                </el-tooltip>
                                <span v-else>{{scope.row.cName||'--'}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="rName" label="所在城市" min-width="8%" :filters="filtCity" :filter-method="filterCity" :filter-multiple="false">
                            <template slot-scope="scope">
                                <span>{{scope.row.rName||'--'}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="公司品牌" min-width="12.1%">
                            <template slot-scope="scope">
                                <el-tooltip class="item" effect="dark" :content="scope.row.cBrand" placement="bottom" v-if="scope.row.cBrand.length>18">
                                    <span>{{scope.row.cBrand||'--'}}</span>
                                </el-tooltip>
                                <span v-else>{{scope.row.cBrand||'--'}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="puName" label="所有人" min-width="6.1%">
                            <template slot-scope="scope">
                                <span>{{scope.row.puName||'--'}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="创建日期" min-width="8.3%" sortable :sort-method="sortData">
                            <template slot-scope="scope">
                                <span>{{ formatTime(scope.row.joinTime) }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" min-width="4.1%">
                            <template slot-scope="scope">
                                <a href="javascript:void(0)" @click="showDetail(scope.row)" style="color: #108EE9">查看</a>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from "../../api/api.js";
// 时间控件格式化
import dateFormat from "../../commonFun/timeFormat.js";
// 筛选过滤
import filterFormat from "../../commonFun/filterTableData.js";
import {
    Row,
    Input,
    Button,
    Table,
    TableColumn,
    DatePicker,
    Select,
    Option,
    Message
} from "element-ui";
// 区域转换为中文
import areaToText from "../../commonFun/areaToText_new.js";

export default {
    name: "customList",
    components: {
        elRow: Row,
        elInput: Input,
        elButton: Button,
        elTable: Table,
        elTableColumn: TableColumn,
        elDatePicker: DatePicker,
        elSelect: Select,
        elOption: Option
    },
    data() {
        return {
            //加载中
            loading: true,
            showNewBtn: true,
            keyword: "",
            date: "",
            select: "1",
            filtCity: [],
            //表格
            planList: [],
            currentPlan: []
        };
    },
    mounted: function() {
        this.GetCustomer();
        this.getRole();
    },
    methods: {
        // 判断角色是否有新建按钮(销售有)
        getRole() {
            let role = JSON.parse(sessionStorage.getItem("session_data")).uType;
            console.log(role);
            if (role != "BD") {
                this.showNewBtn = false;
            }
        },
        // 获取客户列表
        GetCustomer() {
            let session = JSON.parse(sessionStorage.getItem("session_data"));
            let uType = session.uType;
            let uid = session.uID;
            let puid = session.puID;
            if (uType == "BD") {
                let info = { uid: uid };
                this.funcToInit("/MyCustomer", info);
            } else {
                let info = { uid: uid, puid: puid };
                this.funcToInit("/GetCustomer", info);
            }
        },
        // 请求数据整合
        funcToInit(apiUrl, info) {
            api
                .getApi(apiUrl, info)
                .then(res => {
                    this.loading = false;
                    if (!res.data.SysCode) {
                        this.planList = res.data.reverse();
                        for (let data of this.planList) {
                            this.$set(
                                data,
                                "clientRName",
                                areaToText.toTextCity(data.rID)
                            );
                        }
                        this.currentPlan = this.planList;
                        this.filtCity = filterFormat(this.planList, "rName");
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
        // 当搜索框为空的时候进行重置显示
        initData() {
            if (!this.date && !this.keyword) {
                this.currentPlan = JSON.parse(JSON.stringify(this.planList));
            }
        },
        // 搜索
        search() {
            // 搜索
            console.log(this.select);
            console.log(this.keyword);
            // console.log(this.date);
            let range = this.date;
            let arr = [];
            let select = this.select;
            let keyword = this.keyword;
            if (range || this.keyword) {
                for (let data of this.planList) {
                    if (range && keyword) {
                        if (
                            dateFormat.toDate(data.joinTime) >= range[0] &&
                            dateFormat.toDate(data.joinTime) <= range[1]
                        ) {
                            if (data.cBrand) {
                                if (
                                    select == "1" &&
                                    data.cBrand.includes(keyword)
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
                            if (data.realName) {
                                if (
                                    select == "3" &&
                                    data.realName.includes(keyword)
                                ) {
                                    arr.push(data);
                                }
                            }
                        }
                    } else if (range) {
                        if (
                            dateFormat.toDate(data.joinTime) >= range[0] &&
                            dateFormat.toDate(data.joinTime) <= range[1]
                        ) {
                            arr.push(data);
                        }
                    } else if (keyword) {
                        if (data.cBrand) {
                            if (
                                select == "1" &&
                                data.cBrand.includes(keyword)
                            ) {
                                arr.push(data);
                            }
                        }
                        if (data.cName) {
                            if (select == "2" && data.cName.includes(keyword)) {
                                arr.push(data);
                            }
                        }
                        if (data.realName) {
                            if (
                                select == "3" &&
                                data.realName.includes(keyword)
                            ) {
                                arr.push(data);
                            }
                        }
                    }
                }
                this.currentPlan = arr;
                if (!arr.length) {
                    Message.warning("查询数据为空");
                }
                console.log(arr);
                return;
            }
            this.currentPlan = JSON.parse(JSON.stringify(this.planList));
        },
        // 时间格式化
        formatTime(time) {
            return dateFormat.toDate(time);
        },
        // 新建按钮
        newClient() {
            this.$router.push("./createClient");
        },
        // 查看按钮
        showDetail(data) {
            // 获取缓存信息
            // let initdata = JSON.parse(sessionStorage.getItem('clientDetail_data'));
            console.log(data);
            // 用户信息
            let userInfo = {};
            userInfo.uID = data.uID;
            userInfo.realName = data.realName;
            userInfo.sName = data.sName;
            userInfo.rID = data.rID;
            userInfo.email = data.email ? data.email : "";
            userInfo.position = data.position ? data.position : "";
            userInfo.division = data.division ? data.division : "";
            userInfo.phone = data.phone;
            userInfo.telephone = data.telephone ? data.telephone : "";
            userInfo.puName = data.puName ? data.puName : "";
            // 公司信息
            let companyInfo = {};
            companyInfo.cID = data.cID;
            companyInfo.cName = data.cName;
            companyInfo.cBrand = data.cBrand ? data.cBrand : "";
            companyInfo.iID = data.iID ? data.iID : "";

            companyInfo.rName = data.rName ? data.rName : "";
            companyInfo.rID = data.crID;
            companyInfo.cAddress = data.cAddress ? data.cAddress : "";
            companyInfo.cRemark = data.cRemark ? data.cRemark : "";

            userInfo = JSON.stringify(userInfo);
            companyInfo = JSON.stringify(companyInfo);
            sessionStorage.setItem("userInfo", userInfo);
            sessionStorage.setItem("companyInfo", companyInfo);
            this.$router.push("./clientDetail");
        },
        //筛选
        filterCity(value, row) {
            return row.rName === value;
        },
        //日期排序
        sortData(a, b) {
            return a.joinTime < b.joinTime;
        },
        loginTimeout() {
            Message.warning("登录超时,请重新登录");
            this.$router.push("/login");
        }
    }
};
</script>

<style scoped>
/*筛选*/
.el-checkbox + .el-checkbox {
    margin-left: 0;
}

.input-with-select /deep/ .el-input__inner {
    font-size: 14px;
    /*padding: 10px 10px;*/
    height: 34px;
    line-height: 19px;
    /*vertical-align: middle;*/
}

.typeBox p {
    height: 30px;
    font-size: 12px;
    text-align: center;
    line-height: 30px;
    border-top: 1px solid #cccccc;
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
    top: -3px;
}

/deep/ .el-input__inner {
    width: 260px;
    height: 34px;
    /*line-height: 34px;*/
}

/deep/ .el-range-editor .el-range-input {
    line-height: 20px;
}

/*/deep/ .el-date-editor .el-range__close-icon {
        position: relative;
        top: -2px;
        left: 3px;
      }*/

/*/deep/ .el-picker-panel .el-date-range-picker .el-popper {
        left: 335px !important;
      }
      /deep/ .el-date-editor .el-range-separator {
        font-size: 14px;
        height: 34px;
        position: relative;
        top: -3px;
        !*top: -4px;*!
      }*/
/* /deep/ .el-range-editor .el-range-input{
        font-size: 14px;
        padding: 8px 0px;
        height: 30px;
        line-height: 14px;
        box-sizing: border-box;
        !*top: -4px;*!
        width: 85px;
        position: relative;
        top: -3px;

      }*/
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
    width: 240px;
    border-radius: 4px;
}

.el-button {
    width: 76px;
    height: 34px;
    text-align: center;
    /*line-height: 34px;*/
    padding: 0;
    margin-left: 2px;
    position: relative;
    /*top: 1px;*/
    left: 0;
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

.table_wrap {
    width: 1210px;
    border-radius: 4px;
    margin: 0 auto;
    margin-top: 20px;
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

/*表格*/

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
/deep/ .el-table .cell {
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

/deep/ .el-table__row td:nth-child(1) .cell {
    width: 90px;
}

/deep/ .el-table__row td:nth-child(2) .cell {
    width: 114px;
}

/deep/ .el-table__row td:nth-child(4) .cell {
    width: 247px;
}

/deep/ .el-table__row td:nth-child(6) .cell {
    width: 180px;
}

/deep/ .el-table__row td:nth-child(8) .cell {
    width: 108px;
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

/deep/ .el-button-group .el-button:not(:last-child) {
    margin-top: -1px;
}

.tar {
    text-align: right !important;
    padding-right: 10px;
}

/deep/ .el-dropdown .el-button-group .el-button {
    height: 28px;
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

.mediaList_handel span {
    float: left;
    margin-left: 2px;
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

    /deep/ .el-table__row td:nth-child(1) .cell {
        width: 101px;
    }

    /deep/ .el-table__row td:nth-child(2) .cell {
        width: 109px;
    }

    /deep/ .el-table__row td:nth-child(6) .cell {
        width: 196px;
    }
}

/*1920*/
@media all and (min-width: 1900px) {
    .mediaList_wrap {
        width: 1800px !important;
        /*margin-bottom: 211px !important;*/
    }

    .mediaList_wrap .mediaList_container .table_wrap {
        width: 1764px !important;
    }

    /deep/ .el-table__row td:nth-child(1) .cell {
        width: 130px;
    }

    /deep/ .el-table__row td:nth-child(2) .cell {
        width: 155px;
    }

    /deep/ .el-table__row td:nth-child(4) .cell {
        width: 360px;
    }

    /deep/ .el-table__row td:nth-child(6) .cell {
        width: 228px;
    }

    /deep/ .el-table__row td:nth-child(8) .cell {
        width: 150px;
    }
}
</style>
