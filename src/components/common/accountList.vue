<template>
    <div class="ad_mediaDetail_wrap clearfix">
        <div class="ad_mediaDetail_nav ">
            <p class="clearfix">
                <a href="#" style="color: #999">账号管理</a>
            </p>
        </div>
        <div class="mediaList_wrap">
            <div class="mediaList_head">
                <h2>账号列表</h2>
            </div>
            <div class="mediaList_container">
                <el-row>
                    <div class="mediaList_handel">
                        <span>
                            <div style="display:inline-block">
                                <el-input placeholder="请输入内容" v-model="keyword" class="input-with-select" @change="initData">
                                    <el-select v-model="select" slot="prepend" placeholder="请选择">
                                        <el-option label="姓名" value="1"></el-option>
                                        <el-option label="账号" value="2"></el-option>
                                    </el-select>
                                </el-input>
                            </div>
                        </span>
                        <span>
                            <div class="block">
                                <el-button type="primary" icon="el-icon-search" @click="search()">搜索</el-button>
                                <el-button plain @click="newAccount" v-if="showNewBtn">新建</el-button>
                            </div>
                        </span>
                    </div>
                </el-row>
                <div class="table_wrap">
                    <el-table border :data="currAccount" style="width: 100%" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" :default-sort="{prop: 'joinTime', order: 'descending'}">
                        <el-table-column label="账号" min-width="11.8%">
                            <template slot-scope="scope">
                                <a href="javascript:void(0);" @click="ToEdit(scope.row)">{{scope.row.sName}}</a>
                            </template>
                        </el-table-column>
                        <el-table-column prop="realName" label="姓名" min-width="7.8%">
                            <template slot-scope="scope">
                                <el-tooltip class="item" effect="dark" :content="scope.row.realName" placement="bottom" v-if="scope.row.realName.length>8">
                                    <span>{{scope.row.realName||'--'}}</span>
                                </el-tooltip>
                                <span v-else>{{scope.row.realName||'--'}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="uWhoArr" label="权限城市" class="tar" min-width="14.2%" :filters="filterUWhoData" :filter-method="filterUWho" :filter-multiple="true">
                            <template slot-scope="scope" >
                                <el-tooltip class="item" effect="dark" :content="scope.row.uWhoArr" placement="bottom" v-if="scope.row.uWhoArr.length>18">
                                    <span>{{scope.row.uWhoArr||'--'}}</span>
                                </el-tooltip>
                                <span v-else>{{scope.row.uWhoArr||'--'}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="uType" label="账号角色" min-width="8.1%" :filters="[
							{text: '系统管理员', value: 'SA'},
							{text: '超级管理员', value: 'SM'},
							{text: '运营', value: 'OP'},
							{text: '媒介', value: 'MD'},
							{text: '销售', value: 'BD'},
							{text: '广告主', value: 'AD'},
							{text: '工程人员', value: 'EP'}
						]" :filter-method="filterUType" :filter-multiple="false">
                            <template slot-scope="scope">
                                <span>{{roleToText(scope.row.uType)}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="puName" label="上级" min-width="7.8%">
                            <template slot-scope="scope">
                                <span>{{scope.row.puName||'--'}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="创建日期" min-width="9.8%" sortable :sort-method="sortData">
                            <template slot-scope="scope">
                                <span>{{formatTime(scope.row.joinTime)}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="uState" label="状态" min-width="8.9%" :filters="[
							{ text: '正常', value: 1 },
							{ text: '禁用', value: 0 },
							]" :filter-method="filterState" :filter-multiple="false">
                            <template slot-scope="scope">
                                <span>{{stateToText(scope.row.uState)}}</span>
                            </template>
                        </el-table-column>

                        <el-table-column label="操作" min-width="7.1%">
                            <template slot-scope="scope">
                                <!-- <span style="color: #108EE9;cursor: pointer;" @click="authority">权限</span> -->
                                <span v-if="scope.row.uState ==1" style="color: #108EE9;cursor: pointer;" @click="isForbidden(scope.row)">禁用</span>
                                <span v-if="scope.row.uState ==0" style="color: #108EE9;cursor: pointer;" @click="isForbidden(scope.row)">开通</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {
    Row,
    Input,
    Button,
    Table,
    TableColumn,
    MessageBox,
    Message,
    Select,
    Option,
    Loading
} from "element-ui";
import { api } from "../../api/api";
// 时间控件格式化
import dateFormat from "../../commonFun/timeFormat.js";
// 角色转换为中文
import uTypeToText from "../../commonFun/uTypeToText.js";
// 城市转换为中文
import areaToText from "../../commonFun/areaToText_new.js";

export default {
    name: "customList",
    components: {
        elRow: Row,
        elInput: Input,
        elButton: Button,
        elTable: Table,
        elTableColumn: TableColumn,
        elSelect: Select,
        elOption: Option
    },
    data() {
        return {
            //加载中
            loading: true,
            keyword: "",
            select: "1",
            showNewBtn: true,
            filterUWhoData: [],
            //表格
            accountList: [],
            currAccount: []
        };
    },
    created() {
        this.getAccountList();
        this.getRole();
    },
    methods: {
        //日期排序
        sortData(a, b) {
            return a.joinTime < b.joinTime;
        },
        // 初始数据
        getAccountList() {
            let uid = JSON.parse(sessionStorage.getItem("session_data")).uID;
            api
                .postApi("/GetUserList", { uid: uid })
                .then(res => {
                    console.log(res.data);
                    if (!res.data.SysCode) {
                        this.accountList = res.data.reverse();
                        this.loading = false;
                        let cityList = [
                            {
                                text: "全国",
                                value: "全国"
                            }
                        ];
                        let userUid = JSON.parse(
                            sessionStorage.getItem("session_data")
                        ).uID;
                        let account = this.accountList;
                        for (let index = 0; index < account.length; index++) {
                            let result = "";
                            let uWhoArr = account[index].uWho.split(",");
                            if (account[index].uWho == 0) {
                                this.$set(account[index], "uWhoArr", "全国");
                            } else {
                                for (let i = 0; i < uWhoArr.length; i++) {
                                    let res = areaToText.toTextCity(
                                        Number(uWhoArr[i])
                                    );
                                    if (uWhoArr.length > 1) {
                                        result = result + "/" + res;
                                    } else {
                                        result = res;
                                    }
                                    let cityObj = {
                                        text: res,
                                        value: res
                                    };
                                    // 去重城市
                                    if (
                                        JSON.stringify(cityList).indexOf(
                                            JSON.stringify(cityObj)
                                        ) === -1
                                    ) {
                                        cityList.push(cityObj);
                                    }
                                    if (i >= uWhoArr.length - 1) {
                                        // console.log("result", result);
                                        // data.uWhoArr = result;
                                        this.$set(
                                            account[index],
                                            "uWhoArr",
                                            result
                                        );
                                    }
                                }
                            }
                            // 去掉本账号
                            if (account[index].uID == userUid) {
                                account.splice(index, 1);
                                index--;
                            }
                        }
                        this.filterUWhoData = cityList;
                        console.log("cityList", cityList);

                        this.currAccount = this.accountList;
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
        // 时间格式化
        formatTime(time) {
            return dateFormat.toDate(time);
        },
        // 角色格式化
        roleToText(role) {
            return uTypeToText.toText(role);
        },
        // 状态转换
        stateToText(status) {
            let statusText = [
                { text: "正常", status: 1 },
                { text: "禁用", status: 0 }
            ];
            for (let data of statusText) {
                if (data.status == status) {
                    return data.text;
                }
            }
        },
        // 当搜索框为空的时候进行重置显示
        initData() {
            if (!this.keyword) {
                this.currAccount = JSON.parse(JSON.stringify(this.accountList));
            }
        },
        // 搜索
        search() {
            // 账号，姓名
            console.log(this.select);
            console.log(this.keyword);
            let select = this.select;
            let keyword = this.keyword;
            if (this.keyword) {
                let arr = [];
                for (let data of this.accountList) {
                    if (data.realName) {
                        if (select == "1" && data.realName.includes(keyword)) {
                            arr.push(data);
                        }
                    }
                    if (data.sName) {
                        if (select == "2" && data.sName.includes(keyword)) {
                            arr.push(data);
                        }
                    }
                }
                this.currAccount = arr;
                if (!arr.length) {
                    Message.warning({
                        message: "查询数据为空",
                        duration: 1500
                    });
                }
                return;
            }
            this.currAccount = JSON.parse(JSON.stringify(this.accountList));
        },
        // 新建
        newAccount() {
            this.$router.push("./createAccount");
        },
        //筛选状态
        filterState(value, row) {
            let sum = 0;
            for (let data of this.accountList) {
                if (data.uState != value) {
                    sum++;
                }
            }
            //sum和所有数据的长度相同时说明都不匹配
            if (sum == this.accountList.length) {
                Message.warning({
                    message: "筛选数据为空",
                    duration: 1500
                });
            }

            return row.uState === value;
        },
        // 筛选权限城市
        filterUWho(value, row) {
            // console.log(value, "-------------", row);
            // if(value =='全国'){
            // 	return true;
            // }
            return row.uWhoArr.includes(value);
        },
        // 筛选角色
        filterUType(value, row) {
            console.log(value, row);
            let sum = 0;
            for (let data of this.accountList) {
                if (data.uType != value) {
                    sum++;
                }
            }
            //sum和所有数据的长度相同时说明都不匹配
            if (sum == this.accountList.length) {
                Message.warning({
                    message: "筛选数据为空",
                    duration: 1500
                });
            }
            return row.uType === value;
        },
        //权限功能暂未开放
        authority() {
            Message.warning("该功能暂未开放");
        },
        // 开通或者禁用：
        isForbidden(row) {
            console.log(row);
            // uid         int【必填】     当前用户UserID
            // toid        int【必填】     被操作的UserID
            // ustate      int【必填】     用户状态值
            // this.$confirm(`是否${row.uState?'禁用':'开通'}该角色?`, '提示', {
            MessageBox.confirm(
                `是否${row.uState ? "禁用" : "开通"}该角色?`,
                "提示",
                {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }
            )
                .then(() => {
                    let info = {};
                    info.uid = JSON.parse(
                        sessionStorage.getItem("session_data")
                    ).uID;
                    info.toid = row.uID;
                    info.ustate = row.uState ? 0 : 1;
                    api
                        .postApi("/CtrlUser", info)
                        .then(res => {
                            console.log(res.data);
                            if (res.data.SysCode == 100200) {
                                Message.success("操作成功");
                                row.uState = row.uState ? 0 : 1;
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
        ToEdit(row) {
            console.log(row);
            sessionStorage.setItem("account_detail", JSON.stringify(row));
            this.$router.push("./createAccount?edit=y");
        },
        // 判断角色是否有新建按钮(系统管理员和超级管理员有)
        getRole() {
            let role = JSON.parse(sessionStorage.getItem("session_data")).uType;
            console.log(role);
            if (role != "SA" && role != "SM") {
                this.showNewBtn = false;
            }
        },
        loginTimeout() {
            Message.warning("登录超时,请重新登录");
            this.$router.push("/login");
        }
    }
};
</script>
<style scoped>
a {
    color: #108ee9;
}

/*筛选*/
.el-checkbox + .el-checkbox {
    margin-left: 0;
}

.input-with-select /deep/ .el-input__inner {
    font-size: 14px;
    /*padding: 10px 10px;*/
    height: 34px;
    line-height: 34px;
    /*vertical-align: middle;*/
}

/deep/ .plan-select .el-input__inner {
    font-size: 14px;
    /*padding: 10px 10px;*/
    height: 34px;
    line-height: 34px;
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
    position: relative;
    top: 0;
}

/deep/ .el-input__inner {
    width: 180px;
    height: 34px;
}

/deep/ .el-date-editor .el-range__icon {
    position: absolute;
    right: 10px;
    top: 0;
}

/deep/ .el-picker-panel .el-date-range-picker .el-popper {
    left: 335px !important;
}

/deep/ .el-range-editor .el-range-input {
    line-height: 20px;
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
    padding: 18px 18px 28px 18px;
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
    position: relative;
    /*top: 1px;*/
    left: 0;
    margin-left: 2px;
}
/deep/ .el-button [class*="el-icon-"] + span,
.select-wrap button .el-icon-search {
    position: relative;
    left: -2px;
    top: 0px;
}

/deep/ .el-button + .el-button {
    margin-left: 0;
}

.mediaList_wrap .mediaList_container .table_wrap {
    width: 1210px;
    margin: 10px 0 0 0;
    border-radius: 4px;
}

.mediaList_handel span {
    float: left;
    margin-left: 2px;
}

/deep/ .el-date-editor .el-range-separator {
    line-height: 26px;
}

.table_wrap {
    width: 1210px;
    border-radius: 4px;
    margin: 0 auto;
    margin-top: 20px;
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
    padding: 10px 0;
    overflow-x: hidden;
    text-overflow: ellipsis;
}

/deep/ .el-table__row td:nth-child(2) .cell {
    width: 124px;
}

/deep/ .el-table--border {
    border-radius: 4px;
    height: 445px;
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
    /* overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap; */
    white-space: nowrap;
    max-width: 300px;
    text-overflow: ellipsis;
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

.tar {
    text-align: right !important;
    padding-right: 10px;
}

/deep/ .el-dropdown .el-button-group .el-button {
    height: 28px;
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

.handel_btn {
    position: relative;
}

.tar /deep/ .el-table-filter__content{
  overflow-x: hidden;
  min-width: 100px;
  overflow-y: scroll;
  height: 172px;
}
.tar /deep/ .el-table-filter__content::-webkit-scrollbar {
  width: 4px;
  background: #fafafa;
}

.tar /deep/ .el-table-filter__content::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/

  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #c1c1c1;
  border-radius: 4px;
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

/*1900*/
@media all and (min-width: 1900px) {
    .mediaList_wrap {
        width: 1800px !important;
        /*margin-bottom: 211px !important;*/
    }

    .mediaList_wrap .mediaList_container .table_wrap {
        width: 1764px !important;
    }
    /deep/ .el-table__row td:nth-child(2) .cell {
        width: 168px;
    }
}
</style>

<style>
  .tar  .el-table-filter__content{
    overflow-x: hidden;
    min-width: 100px;
    overflow-y: scroll;
    height: 196px;
  }
  .tar  .el-table-filter__content::-webkit-scrollbar {
    width: 4px;
    background: #fafafa;
  }

  .tar  .el-table-filter__content::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/

    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #c1c1c1;
    border-radius: 4px;
  }
  .el-table-filter__list-item{
    color: #606266;
  }

</style>
