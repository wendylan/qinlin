<template>
    <div>
        <div class="ad_mediaMana_wrap">
            <div class="ad_mediaMana_nav clearfix">
                <p>
                    <a href="#">方案管理</a>
                    <em> / </em>
                    <a href="#">方案详情</a>
                </p>
                <div class="tip">该方案由 {{planDetail.realName}} 创建于 {{planDetail.apcTime}}</div>
            </div>
            <!--资源信息-->
            <div class="mediaMana_content_top">
                <div class="content_top_wrap" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
                    <div class="plan-title">
                        <h4>
                            <img src="../../assets/images/orderlogo.png" alt="">{{planDetail.apName}}
                        </h4>
                        <div class="handleBtn">
                            <!--<el-button plain>导出</el-button>-->
                            <template v-if="planDetail.apState==1">
                                <el-button type="primary" @click="edit()" v-if="(role=='BD')|| (role=='MD')">编辑</el-button>
                            </template>
                        </div>
                    </div>
                    <div>
                        <detail :detail="planDetail" v-if="isShow"></detail>
                        <div class="plan-panel">
                            <el-tabs v-model="planPanel" @tab-click="handleClick()">
                                <el-tab-pane label="选点排期" name="first">
                                    <div class="first-wrap box-wrap">
                                        <h4>选点排期
                                            <el-button type="default" icon="el-icon-download" class="searchBtn" @click="export2Excel(planDetail.apName)">导出</el-button>
                                        </h4>

                                        <div class="table_wrap">
                                            <el-table border :data="setpointArr" style="width: 100%" :default-sort="{prop: 'recName', order: 'descending'}"  v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
                                                <el-table-column type="expand">
                                                    <template slot-scope="props">
                                                        <el-form label-position="left" inline class="demo-table-expand">
                                                            <el-form-item label="商圈：">
                                                                <span>{{ props.row.tradingArea}}</span>
                                                            </el-form-item>
                                                            <el-form-item label="楼栋数量：">
                                                                <span>{{ props.row.fNum }}</span>
                                                            </el-form-item>
                                                            <el-form-item label="资产编号：">
                                                                <span>{{ props.row.assetTag }}</span>
                                                            </el-form-item>
                                                            <el-form-item label="入住年份：">
                                                                <span>{{ props.row.chDay }}</span>
                                                            </el-form-item>
                                                            <el-form-item label="广告限制：">
                                                                <span>{{ props.row.notPush }}</span>
                                                            </el-form-item>
                                                        </el-form>
                                                    </template>
                                                </el-table-column>

                                                <el-table-column label="资源名称" min-width="16.1%" prop="resName">
                                                </el-table-column>
                                                <el-table-column prop="mTitle" label="媒体名称" min-width="10.3%" class="tar">
                                                </el-table-column>
                                                <el-table-column prop="asLab" label="投放面" min-width="8.8%">
                                                </el-table-column>
                                                <el-table-column prop="city" label="城市" min-width="6%" :filters="filterCityData" :filter-method="filterCity">
                                                </el-table-column>
                                                <el-table-column prop="rName" label="区域" min-width="7.4%" :filters="filtersArea" :filter-method="filterOrigin">
                                                </el-table-column>
                                                <el-table-column prop="cType" label="楼盘类型" min-width="8.8%">
                                                    <template slot-scope="scope">
                                                        <span>{{scope.row.cType||'--'}}</span>
                                                    </template>
                                                </el-table-column>
                                                <el-table-column prop="hNum" label="小区户数" min-width="6.0%" class="tar">
                                                </el-table-column>
                                                <el-table-column label="楼盘价格" min-width="9.0%">
                                                    <template slot-scope="scope">
                                                        <span>&yen;{{scope.row.hPrice?priceFormat(scope.row.hPrice/100):0}}</span>
                                                    </template>
                                                </el-table-column>
                                                <el-table-column prop="timeRange" label="排期" min-width="14.2%" :filters="filtersData" :filter-method="filterTimeRange">
                                                    <template slot-scope="scope">
                                                        <template v-if="scope.row.lState==2">
                                                            <span>{{scope.row.finishTimeRange}}</span>
                                                            <el-tooltip placement="top">
                                                                <div slot="content">
                                                                    <span>{{scope.row.timeRange}}</span>
                                                                </div>
                                                                <i class="el-icon-question"> </i>
                                                            </el-tooltip>
                                                        </template>
                                                        <span v-else>{{scope.row.timeRange}}</span>
                                                    </template>
                                                </el-table-column>
                                            </el-table>
                                        </div>
                                    </div>
                                </el-tab-pane>
                                <el-tab-pane label="报价单" name="second">
                                    <!-- <div class="second-wrap box-wrap">
                                        <h4>报价单</h4>
                                        <div class="panel">
                                            <el-tabs type="border-card" class="baojiadan">
                                                <el-tab-pane :label="item.city" v-for="item of priceSheet" :key="item.pdID">
                                                    <div class="tab-info">
                                                        <div class="pqxx">
                                                            <h4>排期信息</h4>
                                                            <p>{{item.schedules}}</p>
                                                        </div>
                                                        <div class="price">
                                                            <div class="price-left">
                                                                <h4>广告费</h4>
                                                                <ul>
                                                                    <li>刊例价(面/周)
                                                                        <span>¥ {{priceFormat(item.adPrice)}}</span>
                                                                    </li>
                                                                    <li>投放量(面·天)
                                                                        <span>{{item.pdDays}}</span>
                                                                    </li>
                                                                    <li>赠送(面·天)
                                                                        <span>{{item.pdFreeNum}}</span>
                                                                    </li>
                                                                    <li>广告费折扣
                                                                        <span>{{item.discount}}%</span>
                                                                    </li>
                                                                    <li>¥ {{priceFormat(item.pdAdFee)}}</li>
                                                                </ul>
                                                            </div>
                                                            <div class="price-right">
                                                                <h4>制作费</h4>
                                                                <ul>
                                                                    <li>制作费单价
                                                                        <span>¥ 100</span>
                                                                    </li>
                                                                    <li>广告画数量(张)
                                                                        <span>{{item.pdNum}}</span>
                                                                    </li>
                                                                    <li></li>
                                                                    <li>制作费折扣
                                                                        <span>{{item.ADMakeDiscount}}%</span>
                                                                    </li>
                                                                    <li>¥ {{priceFormat(item.pdAdMake)}}</li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div class="bottom">
                                                            <div class="bottom-detail">
                                                                <div class="remark">
                                                                    <p>备注：{{item.pdRemark}}</p>
                                                                </div>
                                                                <div class="bill-title-right">
                                                                    <ul>
                                                                        <li>
                                                                            <p>
                                                                                <em>现金结算：</em>
                                                                                <span>¥ {{priceFormat(item.pdTotal)}}</span>
                                                                            </p>
                                                                        </li>
                                                                        <li>
                                                                            <p>
                                                                                <em>资源置换：</em>
                                                                                <span>¥ {{priceFormat(item.pdSendFee)}}</span>
                                                                            </p>
                                                                        </li>
                                                                        <li>
                                                                            <p>
                                                                                <em>其他费用：</em>
                                                                                <span>¥ {{priceFormat(item.pdOtherFee)}}</span>
                                                                            </p>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            <div class="bottom-fin">
                                                                <p>
                                                                    <em style="top: 5px">总计：</em>
                                                                    <span class="totalPrice">¥ {{priceFormat(item.allprice)}}</span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </el-tab-pane>
                                            </el-tabs>
                                        </div>
                                    </div> -->
                                    <!-- <price-sheet :price-sheet="priceSheet"></price-sheet> -->
                                    <price-sheet @detailInfo="setInfo" :copydata="copyAsidArr"></price-sheet>
                                    <!-- <div class="content_bottom_btn">
                                        <el-button class="cancel" @click="goBack()">返回</el-button>
                                    </div> -->
                                </el-tab-pane>
                                <el-tab-pane label="物料信息" name="third">
                                    <!-- <div class="third-wrap box-wrap">
                                        <h4>物料信息</h4>
                                        <div class="table_wrap">
                                            <el-table :data="materialInfo" border style="width: 100%">
                                                <el-table-column label="序号" min-width="5.9%">
                                                    <template slot-scope="scope">
                                                        <span>{{scope.$index+1}}</span>
                                                    </template>
                                                </el-table-column>
                                                <el-table-column prop="adSize" label="广告尺寸" min-width="12.4%">
                                                </el-table-column>
                                                <el-table-column prop="adViewSize" label="可视画面" min-width="12.4%">
                                                </el-table-column>
                                                <el-table-column prop="resolution" label="分辨率" min-width="12.4%">
                                                </el-table-column>
                                                <el-table-column prop="colorMode" label="颜色模式" min-width="12.4%">
                                                </el-table-column>
                                                <el-table-column prop="photoFormat" label="文件格式" min-width="17.6%">
                                                </el-table-column>
                                                <el-table-column prop="pointNum" label="点位面数" min-width="12.7%">
                                                </el-table-column>
                                            </el-table>
                                        </div>
                                    </div> -->
                                    <material :material="copyAsidArr"></material>
                                    <!-- <div class="content_bottom_btn">
                                        <el-button class="cancel" @click="goBack()">返回</el-button>
                                    </div> -->
                                </el-tab-pane>
                            </el-tabs>
                            <div class="content_bottom_btn">
                                <el-button class="cancel" @click="goBack()">返回</el-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mediaMana_content_bottom clearfix">
                <div class="content_bottom_wrap">

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { api } from "../../api/api.js";
// 城市区域变成中文
import areaToText from "../../commonFun/areaToText_new.js";
// 价格格式化
import commaFormat from "../../commonFun/commaFormat.js";
// 筛选过滤
import filterFormat from "../../commonFun/filterTableData.js";
// 时间格式化
import dateFormat from "../../commonFun/timeFormat.js";
import priceSheet from "./components/priceSheet.vue";
import material from "./components/materialInfo.vue";
import detail from "./components/detailInfo.vue";
import {
    Table,
    TableColumn,
    Tabs,
    TabPane,
    Button,
    Message,
    MessageBox
} from "element-ui";

export default {
    name: "planDetail",
    components: {
        priceSheet,
        material,
        detail,
        elTable: Table,
        elTableColumn: TableColumn,
        elTabs: Tabs,
        elTabPane: TabPane,
        elButton: Button,
    },
    data() {
        return {
            isShow: true,
            //加载中
            loading: true,
            role: "",
            // 方案详情
            planDetail: {},
            // 选点排期
            setpointArr: [],
            copyAsidArr: [],
            // 报价单详情
            priceSheet: [],
            //物料信息
            materialInfo: [],
            // 城市过滤结果
            filterCityData: [],
            // 排期时间过滤
            filtersData: [],
            // 地区过滤结果
            filtersArea: [],
            planPanel: "first"
        };
    },
    created() {
        // 获取角色
        this.getRole();
        // 获取选点排期数据
        this.getInitData();
    },
    methods: {
        setInfo(data){
           console.log('defail------data', data); 
            this.$set(this.planDetail, "rIDs", data.rIDs);
            this.$set(this.planDetail, "Total", data.Total);
            this.$set(this.planDetail, "pdTotal", data.pdTotal);
            this.$set(this.planDetail, "pdSendFee", data.pdSendFee);
            this.$set(this.planDetail, "pdOtherFee", data.pdOtherFee);
            this.priceSheet = data.priceSheet;
        },
        // 导出excel
        export2Excel(name) { 
            require.ensure([], () => { 
                const { export_json_to_excel } = require('../../vendorExcel/Export2Excel'); 
                const tHeader = ['市', '区域', '资源名称', '媒体名称', '投放面',  '投放日期', '终止日期','资产编号', '商圈', '楼旁类型/写字楼类型', '楼盘价格', '住户数量/办公室数量', '楼栋数量', '入住年份/建成年份', '广告尺寸']; 
                const filterVal = ['city', 'rName', 'resName', 'mTitle', 'asLab', 'timeRange', 'finishTimeRange', 'assetTag', 'tradingArea', 'cType', 'hPrice', 'hNum', 'fNum', 'chDay', 'adSize']; 
                const list = this.setpointArr; 
                const data = this.formatJson(filterVal, list); 
                export_json_to_excel(tHeader, data, name); 
            }) 
        }, 
        formatJson(filterVal, jsonData) { 
            return jsonData.map(v => filterVal.map(j => (j=='hPrice')?(v[j]/100):v[j])) 
        },
        // tab点击
        handleClick() {
            if (this.planPanel == "first") {
                this.getSetPoint();
            }
        },
        // 获取选点排期列表数据
        getInitData() {
            this.isShow = false;

            // 真实数据
            let uid = JSON.parse(sessionStorage.getItem("session_data")).uID;
            let apid = sessionStorage.getItem("plan_apid");
            let info = {
                uid: uid,
                apid: apid
            };
            // uid         int【必填】     当前账户UserID
            // apid        int             公司对应方案apID
            api
                .getApi("/GetFanganInfo", info)
                .then(res => {
                    console.log(res.data);
                    if (!res.data.SysCode) {
                        let info = res.data;
                        info.apcTime = dateFormat.toDateTime(info.apcTime);
                        this.planDetail = info;
                        // 选点排期
                        this.getSetPoint();
                    } else if(res.data.SysCode == 100302){
                        this.loginTimeout();
                    }else{
                        Message.warning(res.data.MSG);
                    }
                })
                .catch(res => {
                    console.log(res);
                });
        },
        // 获取选点排期
        getSetPoint() {
            if(this.setpointArr.length){
                return;
            }
            // 真实数据
            let uid = JSON.parse(sessionStorage.getItem("session_data")).uID;
            let apid = sessionStorage.getItem("plan_apid");
            let info = {
                uid: uid,
                apid: apid
            };
            if (this.planDetail.apState == 0 || this.planDetail.apState == 1) {
                this.funcToInit('/GetADB', info, this.planDetail.apState);
            } else {
                this.funcToInit('/GetAdLaunch', info, this.planDetail.apState);
            }
        },
        // 请求数据整合
        funcToInit(apiUrl, info, state){
            // uid         int【必填】     当前账户UserID
            // apid        int             公司对应方案apID
            api
                .getApi(apiUrl, info)
                .then(res => {
                    console.log(res.data);
                    if (!res.data.SysCode) {
                        let resInfo = res.data;
                        // 城市中文名称
                        for (let data of resInfo) {
                            data.city = areaToText.toTextCity(data.rID);
                            let time = "";
                            if(state == 0 || state == 1){
                                time = this.formatTime(data.pbStar) + "-" + this.formatTime(data.pbEnd);
                            }else{
                                time = this.formatTime(data.lStar) + "-" + this.formatTime(data.lEnd);
                            }
                            data.timeRange = time;
                            let finishTimeRange = '';
                            if(data.lState == 2){
                                finishTimeRange = this.formatTime(data.lStar)+"-"+this.formatTime(data.lSetTime);
                            }
                            data.finishTimeRange = finishTimeRange;
                        }
                        // 城市筛选过滤
                        this.filterCityData = filterFormat(resInfo, "city");
                        this.filtersArea = filterFormat(resInfo, "rName");
                        this.filtersData = filterFormat(resInfo, "timeRange");
                        // 选点排期
                        this.copyAsidArr = JSON.parse(JSON.stringify(resInfo));
                        this.setpointArr = resInfo;
                        // this.currentSetpoint = this.setpointArr;
                        this.loading = false;

                        this.$nextTick(function () {
                            this.isShow = true;
                        });
                    } else if(res.data.SysCode == 100302){
                        this.loginTimeout();
                    } else {
                        Message.warning(res.data.MSG);
                    }
                })
                .catch(res => {
                    this.loading = false;
                    console.log(res);
                });
        },
        // 城市转换为中文
        cityToText(rid) {
            return areaToText.toTextCity(rid);
        },
        // 时间格式规范
        formatTime(val) {
            return dateFormat.toDate(val, ".");
        },
        // 价格加上逗号
        priceFormat(price) {
            // console.log('price', price);
            return commaFormat.init(price);
        },
        // 返回
        goBack() {
            this.$router.push("./planList");
        },
        // 弹出框修改路径
        changeRoute(){
            MessageBox.confirm(
                `该方案被预锁,请先解除预锁,是否去解锁？`,
                "提示",
                {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }
            )
                .then(() => {
                    this.$router.push("./planList");
                })
                .catch(() => {
                    Message.info("已取消操作");
                });
        },
        // 编辑
        edit() {
            let priceSheet = this.priceSheet;
            let uid = JSON.parse(sessionStorage.getItem("session_data")).uID;
            let sumNotLock = 0;
            let sumLock = 0;
            for (let i = 0; i < priceSheet.length; i++) {
                api
                    .postApi("/CheckLock", {
                        uid: uid,
                        pdid: priceSheet[i].pdID
                    })
                    .then(res => {
                        if (!res.data.IsLock) {
                            sumNotLock++;
                        }else{
                            sumLock++;
                        }
                        if (sumNotLock >= priceSheet.length) {
                            this.$router.push("./editPlan");
                        } else {
                            if(sumLock && sumLock+sumNotLock == priceSheet.length){
                                this.changeRoute();
                            }
                        }
                    })
                    .catch(res => {
                        console.log(res);
                    });
            }
        },
        // 获取角色
        getRole() {
            this.role = JSON.parse(
                sessionStorage.getItem("session_data")
            ).uType;
        },
        loginTimeout(){
            Message.warning("登录超时,请重新登录");
            this.$router.push("/login");
        },
        filterCity(value, row) {
            return row.city === value;
        },
        filterOrigin(value, row) {
            return row.rName === value;
        },
        filterTimeRange(value, row) {
            return row.timeRange === value;
        }
    },
};
</script>

<style scoped>
/*状态行*/
/deep/ .el-table .warning-row {
    background: #fff1f1;
}

/*tabbar*/
/deep/ .el-textarea__inner {
    resize: vertical;
}

/deep/ .el-tabs__nav-wrap::after {
    background-color: transparent;
}

.box-wrap {
    border: 1px solid #e6e7e9;
    background-color: #fff;
}

.plan-panel {
    position: absolute;
    top: 225px;
    width: 100%;
    left: 0;
}

/deep/ .el-tabs__nav-scroll {
    padding-left: 28px;
}

.baojiadan /deep/ .el-tabs__nav-scroll {
    padding-left: 0;
}

.box-wrap > h4 {
    height: 55px;
    padding-left: 28px;
    border-bottom: 1px solid #e6e7e9;
    font-size: 16px;
    color: rgba(51, 51, 51, 0.85);
    line-height: 55px;
    font-weight: bold;
}

/deep/ .el-table__row td:nth-child(8),
/deep/ .el-table__row td:nth-child(9),
/deep/ .has-gutter th:nth-child(8),
/deep/ .has-gutter th:nth-child(9) {
    text-align: right;
}

/deep/ .el-table__column-filter-trigger {
    left: 5px;
}

/*选点排期*/
/deep/ .el-table th,
.el-table tr {
    background: #f7f7f7;
    padding: 10px 0;
}

/deep/ .el-table th > .cell {
    color: #666666;
    line-height: 14px;
    font-weight: bold;
}

/deep/ .el-checkbox + .el-checkbox {
    margin-left: 10px;
}

/deep/ .el-table__expanded-cell[class*="cell"] {
    padding: 0 46px;
    background-color: #f7f7f7;
}

/deep/ .el-table__expanded-cell[class*="cell"] .el-form {
    height: 44px;
    line-height: 44px;
}

/deep/ .el-form-item__content {
    line-height: 46px;
}

/deep/ .el-form-item__label {
    padding: 0 0 0 12px;
}

.table_wrap {
    padding: 28px;
}

/deep/ .el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: #ecf5ff;
}

/deep/ .el-tabs__item.is-active {
    font-weight: bold;
}

.searchBtn {
    position: relative;
    /*top: 3px;*/
    /*left: -3px;*/
}

/deep/ .searchBtn .el-icon-search {
    position: relative;
    top: -2px;
    left: -9px !important;
}

/deep/ .el-button.searchBtn span {
    position: relative;
    left: -5px;
    top: -2px;
}
/deep/ .el-button {
    /*width: 76px;*/
    height: 34px;
    margin-left: 2px;
}
/*报价单*/

/deep/ .el-tabs--border-card {
    box-shadow: none;
}

/deep/ .el-tabs--border-card > .el-tabs__content {
    padding: 40px;
}

.panel {
    padding: 20px;
}

.step3 {
    padding: 0 105px;
}

.bill-title {
    width: 100%;
    height: 181px;
    box-sizing: border-box;
    border: 1px solid #d8d8d8;
    margin-bottom: 10px;
    padding: 22px 60px;
}

.bill-title h4 {
    font-size: 18px;
    color: #333333;
    font-weight: bold;
    margin-bottom: 12px;
}

.bill-title p {
    margin-bottom: 12px;
    font-size: 14px;
    color: #666666;
}

.bill-title-left {
    float: left;
}

.bill-title-right {
    float: right;
    font-size: 14px;
    color: #666666;
}

.bill-title-right p {
    text-align: right;
    position: relative;
}

.bill-title-right em {
    float: right;
    position: absolute;
    right: 225px;
    top: 0;
    width: 100px;
}

.bill-title-right .totalPrice {
    font-size: 22px;
    color: #333333;
}

/deep/ .el-tabs--border-card > .el-tabs__content {
    padding: 40px;
}

.tab-info h4 {
    width: 100%;
    background: #fafafa;
    border-radius: 2px;
    font-size: 16px;
    color: #333333;
    height: 34px;
    line-height: 34px;
    padding-left: 20px;
    font-weight: bold;
}

.tab-info p {
    margin-bottom: 40px;
    margin-top: 20px;
    margin-left: 20px;
    font-size: 14px;
    color: #666666;
}

.price {
    width: 100%;
    height: 300px;
}

.price-left {
    box-sizing: border-box;
    padding-right: 66px;
    width: 49%;
    float: left;
    border-right: 2px dashed #d8d8d8;
}

.price-right {
    width: 49%;
    float: right;
    padding-left: 66px;
    box-sizing: border-box;
}

.tab-info .price h4 {
    width: 90%;
}

.tab-info .price h4 button {
    width: 50px;
    height: 24px;
    background: #e6f1fc;
    border: 1px solid #a3d0fd;
    border-radius: 4px;
    float: right;
    font-size: 12px;
    color: #1989fa;
    position: relative;
    top: 5px;
    right: 10px;
    outline: none;
}

/deep/ .el-button.el-button--text span {
    position: relative;
    top: -5px;
}

.price ul li {
    font-size: 14px;
    color: #666666;
    border-bottom: 1px solid #d8d8d8;
    height: 50px;
    line-height: 50px;
    margin-left: 19px;
    margin-right: 28px;
}

.price ul li:last-child {
    text-align: right;
    border-bottom: none;
    font-size: 18px;
    color: #333333;
    font-weight: bold;
}

.price ul li span {
    float: right;
}

.bottom {
    width: 100%;
    height: 181px;
    background: #fafafa;
    box-sizing: border-box;
    padding: 21px;
}

.tab-info .bottom p {
    margin: 0;
    font-size: 14px;
    color: #666666;
}

.bottom .remark {
    display: inline-block;
    width: 60%;
    height: 105px;
}

.bottom .bill-title-right li {
    font-size: 18px;
    color: #666666;
    margin-bottom: 8px;
}

.bottom .bill-title-right li em {
    font-size: 14px;
    color: #666666;
}

.bottom-detail {
    border-bottom: 2px dashed #d8d8d8;
}

.bottom-fin {
    margin-top: 15px;
}

.bottom-fin p {
    float: right;
}

.bottom-fin span {
    font-size: 22px;
    color: #333333;
    font-weight: bold;
}

/*滚动条*/
/deep/ .el-table__body-wrapper {
    height: 480px;
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

/deep/ .el-table th > .cell {
    font-weight: bold;
}

/*详情头部*/
.content_top_wrap {
    padding: 34px 28px;
    background: #ffffff;
    border: 1px solid #dedede;
    height: 195px;
    position: relative;
}

.plan-title .handleBtn {
    position: absolute;
    right: 28px;
    top: 30px;
}

.plan-title .handleBtn button {
    width: 74px;
    height: 32px;
    font-size: 14px;
    line-height: 9px;
    padding: 0;
}

.plan-title h4 {
    font-size: 20px;
    color: rgba(0, 0, 0, 0.85);
    font-weight: bold;
    margin-bottom: 22px;
}

.plan-title h4 p {
    display: inline-block;
    font-size: 14px;
    color: #666666;
    font-weight: normal;
    margin-left: 11px;
}

.plan-title h4 p img {
    width: 14px;
    height: 14px;
    position: relative;
    top: 1px;
    cursor: pointer;
}

.plan-title h4 img {
    width: 28px;
    height: 28px;
    position: relative;
    top: 5px;
    margin-right: 16px;
}

/*面包屑导航*/
.tip {
    position: absolute;
    right: 88px;
    font-size: 14px;
    color: #999999;
    top: 12px;
}

.ad_mediaMana_nav {
    position: relative;
    height: 0;
}

.ad_mediaMana_nav p {
    padding-left: 57px;
    position: absolute;
    left: 0;
    top: 12px;
    font-size: 14px;
    line-height: 18px;
}

.ad_mediaMana_nav p em {
    font-size: 14px;
    color: #d9d9d9;
    line-height: 18px;
}

.ad_mediaMana_nav p a {
    color: #666;
}

.ad_mediaMana_nav p a:nth-of-type(1) {
    color: #999;
}

.ad_mediaMana_wrap {
    margin-bottom: 109px;
    position: relative;
}

.ad_mediaMana_nav p a:nth-of-type(1) {
    color: #999;
}

/*资源信息*/
.mediaMana_content_top {
    padding: 42px 60px 0 60px;
}

.mediaMana_content_bottom {
    padding: 11px 60px;
}

.content_bottom_wrap {
    height: 612px;
    margin-top: 178px;
}

/*按钮*/
.content_bottom_btn {
    margin-top: 20px;
    width: 100%;
    text-align: center;
}

.content_bottom_btn button {
    width: 80px;
    height: 34px;
    outline: none;
    cursor: pointer;
    border: 1px solid #d9d9d9;
    border-radius: 2px;
    background: #ffffff;
    font-size: 14px;
    color: #666666;
}

/*1440*/
@media all and (min-width: 1420px) {
    .tab-info .price h4 {
        width: 92%;
    }

    .up-loader-Imgpanel + .up-loader-Imgpanel {
        margin-left: 39px;
    }

    .up-loader-Imgpanel:nth-child(4) {
        margin-left: 0;
    }
}

/*1920*/
@media all and (min-width: 1900px) {
    .tab-info .price h4 {
        width: 94%;
    }
    .up-loader-Imgpanel + .up-loader-Imgpanel {
        margin-left: 54px;
    }

    .up-loader-Imgpanel:nth-child(5) {
        margin-left: 0;
    }
}
</style>