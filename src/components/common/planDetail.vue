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
                <div class="content_top_wrap">
                    <div class="plan-title">
                        <h4>
                            <img src="../../assets/images/orderlogo.png" alt="">{{planDetail.apName}}
                        </h4>
                        <div class="handleBtn">
                            <el-button plain>导出</el-button>
                            <el-button type="primary" @click="edit()" v-if="(role=='BD')|| (role=='MD')">编辑</el-button>
                        </div>
                    </div>
                    <div>
                        <div class="plan-detail">
                            <div class="plan-detail-left">
                                <ul>
                                    <li>
                                        <span>公司名称：</span>
                                        <em>{{planDetail.cName}}</em>
                                    </li>
                                    <li>
                                        <span>联系人：</span>
                                        <em>{{planDetail.cuName}}</em>
                                    </li>
                                    <li>
                                        <span>现金结算：</span>
                                        <em>¥ {{planDetail.pdTotal}}</em>
                                    </li>
                                    <li>
                                        <span>公司品牌：</span>
                                        <em>{{planDetail.bTitle}}</em>
                                    </li>
                                    <li>
                                        <span>投放城市：</span>
                                        <em>{{filter(planDetail.rIDs)}}</em>
                                    </li>
                                    <li>
                                        <span>资源置换：</span>
                                        <em>¥ {{planDetail.pdSendFee}}</em>
                                    </li>
                                    <li>
                                        <span>所属销售：</span>
                                        <em>{{planDetail.realName}}</em>
                                    </li>
                                    <li>
                                        <span>方案备注：</span>
                                        <em>{{planDetail.apRemark||"无"}}</em>
                                    </li>
                                    <li>
                                        <span>其他费用：</span>
                                        <em>¥ {{planDetail.pdOtherFee}}</em>
                                    </li>
                                </ul>
                            </div>
                            <div class="plan-detail-right">
                                <dl>
                                    <dt>状态</dt>
                                    <dd>{{stateToText(planDetail.apState)}}</dd>
                                </dl>
                                <dl>
                                    <dt>方案金额</dt>
                                    <dd>¥ {{planDetail.apTotal}}</dd>
                                </dl>
                            </div>
                        </div>
                        <div class="plan-panel">
                            <el-tabs v-model="planPanel">
                                <el-tab-pane label="选点排期" name="first">
                                    <div class="first-wrap box-wrap">
                                        <h4>选点排期</h4>
                                        <div class="table_wrap">
                                            <!-- <el-table border :data="setpointArr" :row-class-name="tableRowClassName" :highlight-current-row="true" style="width: 100%" :default-sort="{prop: 'recName', order: 'descending'}"> -->
                                            <el-table border :data="setpointArr" style="width: 100%" :default-sort="{prop: 'recName', order: 'descending'}">
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
                                                </el-table-column>
                                                <el-table-column prop="hNum" label="小区户数" min-width="6.0%" class="tar">
                                                </el-table-column>
                                                <el-table-column label="楼盘价格" min-width="9.0%">
                                                    <template slot-scope="scope">
                                                        <span>&yen;{{scope.row.hPrice?priceFormat(scope.row.hPrice/100):0}}</span>
                                                    </template>
                                                </el-table-column>
                                                <el-table-column prop="timeRange" label="排期" min-width="14.2%" :filters="filtersData" :filter-method="filterTimeRange">
                                                </el-table-column>
                                            </el-table>
                                        </div>
                                    </div>
                                    <div class="content_bottom_btn">
                                        <el-button class="cancel" @click="goBack()">返回</el-button>
                                    </div>
                                </el-tab-pane>
                                <el-tab-pane label="报价单" name="second">
                                    <div class="second-wrap box-wrap">
                                        <h4>报价单</h4>
                                        <div class="panel">
                                            <el-tabs type="border-card" class="baojiadan">
                                                <el-tab-pane :label="item.city" v-for="item of priceSheet" :key="item.pdID">
                                                    <div class="tab-info">
                                                        <div class="pqxx">
                                                            <h4>排期信息</h4>
                                                            <p>{{formatTime(item.pdStar) +"-"+formatTime(item.pdEnd)+" "+"("+item.pdDays+"面)"}}</p>
                                                            <!-- <p>2018.03.01-2018.03.28（20面）、2018.04.01-2018.04.28（10面）、2018.05.01-2018.05.28（10面）</p> -->
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
                                                                    <p>备注：{{item.pdRemark||'无'}}</p>
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
                                    </div>
                                    <div class="content_bottom_btn">
                                        <el-button class="cancel" @click="goBack()">返回</el-button>
                                    </div>
                                </el-tab-pane>
                            </el-tabs>
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
import { Table, TableColumn, Tabs, TabPane, Button, Message } from "element-ui";

export default {
    name: "planDetail",
    components: {
        elTable: Table,
        elTableColumn: TableColumn,
        elTabs: Tabs,
        elTabPane: TabPane,
        elButton: Button
    },
    data() {
        return {
            role: "",
            // 方案详情
            planDetail: {
                // realName: "",
                // apState: 1,
                // rIDs: "",
                // cName: "",
                // apID: 1,
                // apcTime: "",
                // cuName: "",
                // bTitle: "",
                // apTotal: 0,
                // apName: "",
                // apQC: "",
                // pdTotal: 0,
                // pdSendFee: 0,
                // pdOtherFee: 0
            },
            // 选点排期
            setpointArr: [],
            // 报价单详情
            priceSheet: [],
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
        // 选点排期
        this.getSetPoint();
        // 报价单
        this.getPriceData();
    },
    methods: {
        // // 当前行是否高亮
        // tableRowClassName({ row }) {
        //     if (row.lState) {
        //         return "warning-row";
        //     } else {
        //         return "";
        //     }
        // },
        // 添加是否被占的状态
        // checkLock(tableData) {
        //     // CheckADS
        //     // uid         int【必填】         当前账户UserID
        //     // asid        int【必填】         投放广告点位状态查询
        //     let uid = JSON.parse(sessionStorage.getItem("session_data")).uID;
        //     for (let i = 0; i < tableData.length; i++) {
        //         tableData[i].lState = 0;
        //         this.$set(tableData[i], "lState", 0);
        //         api
        //             .getApi("/CheckADS", { uid: uid, asid: tableData[i].asID })
        //             .then(res => {
        //                 console.log(res);
        //                 if (res.data.length) {
        //                     // tableData[i].lState = 1;
        //                     this.$set(tableData[i], "lState", 1);
        //                 }
        //                 if (i >= tableData.length - 1) {
        //                     console.log("tableData------------", tableData);
        //                     this.setpointArr = tableData;
        //                 }
        //                 // console.log(data);
        //             })
        //             .catch(res => {
        //                 console.log(res);
        //             });
        //     }
        // },
        // 去重城市
        filter(val) {
            let res = "";
            if (val) {
                for (let data of val.split(",")) {
                    if (!res.includes(data)) {
                        res = data + "," + res;
                    }
                }
                console.log(res);
            }
            return res;
        },
        // 获取选点排期列表数据
        getInitData() {
            // 测试数据
            // let plan = {
            // 	realName: "黄启炜",
            // 	apState: 1,
            // 	rIDs: "广州市,北京市,重庆市",
            // 	cName: "新光百货",
            // 	apID: 1,
            // 	apcTime: "May 9, 2018 6:29:47 PM",
            // 	cuName: "赵爽",
            // 	bTitle: "新光百货",
            // 	apTotal: 465200,
            // 	apName: "第一个投放方案",
            // 	apQC: "QC201803284401001",
            // 	pdTotal: 0,
            // 	pdSendFee: 0,
            // 	pdOtherFee: 0
            // };
            // plan.apTotal = this.priceFormat(plan.apTotal);
            // plan.apcTime = dateFormat.toDateTime(plan.apcTime);
            // this.planDetail = plan;
            // console.log(
            //     "time",
            //     dateFormat.toDateTime("Jun 6, 2018 6:31:59 PM")
            // );

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
                .postApi("/GetFanganInfo", info)
                .then(res => {
                    console.log(res.data);
                    if (!res.data.SysCode) {
                        let info = res.data;
                        // if (info.apTotal) {
                        //     info.apTotal = this.priceFormat(info.apTotal / 100);
                        // }
                        info.apcTime = dateFormat.toDateTime(info.apcTime);
                        this.planDetail = info;
                    } else {
                        Message.warning(res.data.MSG);
                    }
                })
                .catch(res => {
                    console.log(res);
                });
        },
        // 获取选点排期
        getSetPoint() {
            // // 测试数据情况
            // this.setpointArr = [
            // 	{resName: "尚东3",mTitle: "尚东3东门",rName: "荔湾区",cType: "一般住宅",hNum: 100,hPrice: 56000,rID: 440104,asIDs: "7",asLab: "A",asStates: "1",tradingArea: "三里屯",fNum: 3,assetTag: "201805GZ-1324",notPush: ""},
            // 	{resName: "帝景山庄改1",mTitle: "帝景1门",rName: "越秀区",cType: "高端住宅",hNum: 170,hPrice: 6100000,rID: 440104,asIDs: "2,1",asLab: "B,",asStates: "1,1",tradingArea: "山泉1",fNum: 12,assetTag: "201707GZ-13161",chDay: "2013",notPush: "美容"},
            // 	{resName: "帝景山庄改1",mTitle: "帝景2门2",rName: "越秀区",cType: "高端住宅",hNum: 170,hPrice: 6100000,rID: 440104,asIDs: "3,4",asLab: "A,B",asStates: "1,1",tradingArea: "山泉1",fNum: 12,assetTag: "201707GZ-1324",chDay: "2013",notPush: "地产"},
            // 	{resName: "帝景山庄改1",mTitle: "帝景3门3",rName: "越秀区",cType: "高端住宅",hNum: 170,hPrice: 6100000,rID: 440104,asIDs: "5,6",asLab: "A,B",asStates: "1,1",tradingArea: "山泉1",fNum: 12,assetTag: "201707GZ-1329",chDay: "2013",notPush: "医学"}
            // ];
            // for(let data of this.setpointArr){
            // 	this.$set(data, 'city', areaToText.toTextCity(data.rID));
            // 	let time = this.formatTime(data.pbStar) +"-"+ this.formatTime(data.pbEnd);
            // 	this.$set(data, 'timeRange', time);
            // }
            // this.filterCityData = filterFormat(this.setpointArr, 'city');
            // this.filtersArea = filterFormat(this.setpointArr, 'rName');
            // this.filtersData = filterFormat(this.setpointArr, 'timeRange');
            // // 选点排期
            // this.checkLock(this.setpointArr);
            // this.currentSetpoint = this.setpointArr;

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
                .getApi("/GetADB", info)
                .then(res => {
                    console.log(res.data);
                    if (!res.data.SysCode) {
                        let resInfo = res.data;
                        // 城市中文名称
                        for (let data of resInfo) {
                            this.$set(
                                data,
                                "city",
                                areaToText.toTextCity(data.rID)
                            );
                            let time =
                                this.formatTime(data.pbStar) +
                                "-" +
                                this.formatTime(data.pbEnd);
                            this.$set(data, "timeRange", time);
                        }
                        // 城市筛选过滤
                        this.filterCityData = filterFormat(resInfo, "city");
                        this.filtersArea = filterFormat(resInfo, "rName");
                        this.filtersData = filterFormat(resInfo, "timeRange");
                        // 选点排期
                        // this.checkLock(resInfo);
                        this.setpointArr = resInfo;
                        this.currentSetpoint = this.setpointArr;
                    } else {
                        Message.warning(res.data.MSG);
                    }
                })
                .catch(res => {
                    console.log(res);
                });
        },
        // 获取三个费用价格(报价单)
        getPriceData() {
            // 测试数据
            // let ADPriceList = [
            // 	{amID: 110, rID: 440200, rName: "韶关市", mVehicle: "广告门", adPrice: 500000},
            // 	{amID: 109, rID: 440100, rName: "广州市", mVehicle: "广告门", adPrice: 600000},
            // 	{amID: 108, rID: 310100, rName: "上海市", mVehicle: "广告门", adPrice: 888800},
            // 	{amID: 107, rID: 110100, rName: "北京市", mVehicle: "广告门", adPrice: 777700},
            // 	{amID: 106, rID: 120100, rName: "天津市", mVehicle: "广告门", adPrice: 588800}];
            // let adPrice = ADPriceList;
            // let plandata = [
            // 	{pdID: 1,apID: 1,rID: 440100,muID: 0,pdDays: 7,pdStar: "2018-05-19",pdEnd: "2018-05-25",pdFreeNum: 0,pdAdFee: 0,pdNum: 4,pdAdMake: 40000,pdTotal: 760000,pdSendFee: 0,pdOtherFee: 0},
            // 	{pdID: 2,apID: 1,rID: 110100,muID: 0,pdDays: 7,pdStar: "2018-05-19",pdEnd: "2018-05-25",pdFreeNum: 0,pdAdFee: 0,pdNum: 6,pdAdMake: 60000,pdTotal: 1140000,pdSendFee: 0,pdOtherFee: 0},
            // 	{pdID: 3,apID: 1,rID: 500100,muID: 0,pdDays: 7,pdStar: "2018-05-19",pdEnd: "2018-05-25",pdFreeNum: 0,pdAdFee: 0,pdNum: 6,pdAdMake: 60000,pdTotal: 1140000,pdSendFee: 0,pdOtherFee: 0}
            // ];

            // 真实数据
            let uid = JSON.parse(sessionStorage.getItem("session_data")).uID;
            let apid = sessionStorage.getItem("plan_apid");
            let info = {
                uid: uid,
                apid: apid
            };
            // 获取各个城市的刊例价
            // uid         int【必填】     当前账户UserID
            api
                .getApi("/GetAdPrice", { uid: uid })
                .then(res => {
                    console.log(res.data);
                    let adPrice = res.data;
                    // uid         int【必填】     当前账户UserID
                    // apid        int             公司对应方案apID
                    api
                        .getApi("/GetAPD", info)
                        .then(res => {
                            console.log(res.data);
                            if (!res.data.SysCode) {
                                let plandata = res.data;
                                let pdTotal = 0;
                                let pdSendFee = 0;
                                let pdOtherFee = 0;
                                let arr = [];
                                for (let price of plandata) {
                                    pdTotal += price.pdTotal;
                                    pdSendFee += price.pdSendFee;
                                    pdOtherFee += price.pdOtherFee;

                                    let obj = {
                                        pdID: price.pdID,
                                        apID: price.apID,
                                        rID: price.rID,
                                        city: "",
                                        muID: price.muID,
                                        adPrice: 0,
                                        // 投放量
                                        pdDays: price.pdDays,
                                        pdStar: price.pdStar,
                                        pdEnd: price.pdEnd,
                                        // 赠送
                                        pdFreeNum: price.pdFreeNum,
                                        // 广告费用
                                        pdAdFee: price.pdAdFee / 100,
                                        // 广告画数量
                                        pdNum: price.pdNum,
                                        // 制作费
                                        pdAdMake: price.pdAdMake / 100,
                                        // 现金结算
                                        pdTotal: price.pdTotal / 100,
                                        // 资源置换
                                        pdSendFee: price.pdSendFee / 100,
                                        // 其他费用
                                        pdOtherFee: price.pdOtherFee / 100,
                                        allprice: 0
                                    };
                                    obj.allprice =
                                        (price.pdTotal +
                                            price.pdSendFee +
                                            price.pdOtherFee) /
                                        100;
                                    obj.city = areaToText.toTextCity(obj.rID);
                                    arr.push(obj);
                                }
                                let total = pdTotal + pdSendFee + pdOtherFee;
                                this.$set(
                                    this.planDetail,
                                    "apTotal",
                                    this.priceFormat(total / 100)
                                );
                                this.$set(
                                    this.planDetail,
                                    "pdTotal",
                                    this.priceFormat(pdTotal / 100)
                                );
                                this.$set(
                                    this.planDetail,
                                    "pdSendFee",
                                    this.priceFormat(pdSendFee / 100)
                                );
                                this.$set(
                                    this.planDetail,
                                    "pdOtherFee",
                                    this.priceFormat(pdOtherFee / 100)
                                );
                                // 为每一条添加刊例价,广告费折扣百分比，制作费折扣百分比
                                for (let ta of arr) {
                                    for (let ad of adPrice) {
                                        if (ad.rID == ta.rID) {
                                            ta.adPrice = ad.adPrice / (100 * 2); // 刊例价(面/周)
                                            let onedayPrice = ta.adPrice / 7;
                                            ta.discount =
                                                Math.round(
                                                    ta.pdAdFee /
                                                        (onedayPrice *
                                                            ta.pdDays) *
                                                        10000
                                                ) / 100; // 广告费折扣百分比
                                            ta.ADMakeDiscount =
                                                Math.round(
                                                    ta.pdAdMake /
                                                        (100 * ta.pdNum) *
                                                        10000
                                                ) / 100; // 制作费折扣百分比
                                            break;
                                        }
                                    }
                                }
                                this.priceSheet = arr;
                            } else {
                                Message.warning(res.data.MSG);
                            }
                        })
                        .catch(res => {
                            console.log(res);
                        });
                })
                .catch(res => {
                    console.log(res);
                });
        },
        // 城市转换为中文
        cityToText(rid) {
            return areaToText.toTextCity(rid);
        },
        // 状态转换成文本
        stateToText(val) {
            let state = [
                { text: "已完成", state: 0 },
                { text: "进行中", state: 1 },
                { text: "未投放", state: 2 },
                { text: "投放中", state: 3 },
                { text: "强行结束", state: 5 }
            ];
            for (let data of state) {
                if (val == data.state) {
                    return data.text;
                }
            }
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
        // 编辑
        edit() {
            this.$router.push("./editPlan");
        },
        // 获取角色
        getRole() {
            this.role = JSON.parse(
                sessionStorage.getItem("session_data")
            ).uType;
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
    }
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

/deep/ .el-table__row td:nth-child(7),
/deep/ .el-table__row td:nth-child(8) {
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

.plan-detail {
    font-size: 14px;
    color: #333333;
    padding-left: 41px;
}

.plan-detail-left {
    float: left;
    width: 82%;
}

.plan-detail-left ul {
    width: 100%;
    float: left;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.plan-detail-left ul li {
    float: left;
    width: 300px;
    margin-bottom: 12px;
}

.plan-detail-left ul li:nth-child(3n-2) {
    /*width: 350px;*/
}

.plan-detail-left ul li:nth-child(3n-1) {
    /*width: 248px;*/
}

.plan-detail-left ul li em {
    font-size: 14px;
    color: #666666;
}

.plan-detail-right {
    display: flex;
    justify-content: space-between;
    width: 18%;
    float: right;
}

.plan-detail-right dl {
    float: left;
    text-align: right;
}

.plan-detail-right dt {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
}

.plan-detail-right dd {
    margin-top: 4px;
    display: inline-block;
    font-size: 20px;
    color: rgba(0, 0, 0, 0.85);
    font-weight: bold;
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

    .plan-detail-left ul li:nth-child(3n-2) {
        /*width: 500px;*/
    }

    .plan-detail-left ul li:nth-child(3n-1) {
        /*width: 400px;*/
    }

    .up-loader-Imgpanel + .up-loader-Imgpanel {
        margin-left: 54px;
    }

    .up-loader-Imgpanel:nth-child(5) {
        margin-left: 0;
    }

    .plan-detail-left ul li {
        width: 400px;
    }

    .plan-detail-right {
        width: 15%;
    }
}
</style>
