<template>
	<div>
		<div class="ad_mediaMana_wrap">
			<div class="ad_mediaMana_nav clearfix">
				<p>
					<a href="#">订单管理</a>
					<em> / </em>
					<a href="#">订单详情</a>
				</p>
			</div>
			<!--资源信息-->
			<div class="mediaMana_content_top">
				<!--<div class="content_top_wrap" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"> -->
				<div class="content_top_wrap">
					<div class="plan-title">
						<h4>
							<img src="../../assets/images/planlogo.png" alt="">{{orderDetail.apName}} 不知道什么方案
						</h4>
						<div class="handleBtn">
							<el-button type="primary">查看H5</el-button>
						</div>
						<div class="plan-detail">
							<div class="plan-detail-left">
								<ul>
									<li>
										<span>公司名称：</span>
										<em>阿里巴巴</em>
									</li>
									<li>
										<span>所属销售：</span>
										<em>周杰伦</em>
									</li>
									<li>
										<span>现金结算：</span>
										<em>¥ 1,234,567</em>
									</li>
									<li>
										<span>公司品牌：</span>
										<em>阿里巴巴</em>
									</li>
									<li>
										<span>投放城市：</span>
										<em>广州、深圳</em>
									</li>
									<li>
										<span>资源置换：</span>
										<em>¥ 0</em>
									</li>
									<li>
										<span>联系人：</span>
										<em>刘德华</em>
									</li>
									<li>
										<span>方案备注：</span>
										<em>无</em>
									</li>
									<li>
										<span>其他费用：</span>
										<em>¥ 0</em>
									</li>
								</ul>
							</div>
							<div class="plan-detail-right">
								<dl>
									<dt>状态</dt>
									<dd>投放中</dd>
								</dl>
								<dl>
									<dt>方案金额</dt>
									<dd>¥ 1,234,567</dd>
								</dl>
							</div>
						</div>
					</div>
				</div>
				<div class="plan-panel">
					<el-tabs v-model="planPanel" @tab-click="handleClick()">
						<el-tab-pane label="选点排期" name="first">
							<div class="first-wrap box-wrap">
								<h4 v-if="!showTitle">选点排期</h4>
								<h4 v-if="showTitle">更换点位
									<!-- <el-button type="primary" @click="dialogAddPoint = true" class="changeDWBtn">添加点位
                  </el-button> -->
									<span>原投放面数:{{setpointArr.length}}&nbsp;&nbsp; 中止投放面数:{{stopPointNum}} &nbsp;&nbsp;&nbsp; 现投放面数:{{nowPointNum}}</span>
								</h4>
								<div style="display:inline-block;margin-left: 30px;margin-top: 20px;" class="search-wrap">
									<span>
										<el-input placeholder="请输入内容" v-model="keyword" class="input-with-select" @change="init()">
											<el-select v-model="selectRecName" slot="prepend" placeholder="请选择">
												<el-option label="资源名称" value="1"></el-option>
											</el-select>
										</el-input>
									</span>
									<span>
										<el-button type="primary" icon="el-icon-search" class="searchBtn" @click="search()">搜索</el-button>
										<el-button type="default" icon="el-icon-download" class="searchBtn" @click="export2Excel(orderDetail.apName)">导出</el-button>
									</span>
								</div>

								<div class="table_wrap">
									<el-table border :data="currentSetpoint" style="width: 100%" :default-sort="{prop: 'recName', order: 'descending'}" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
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
										<el-table-column prop="rName" label="区域" min-width="7.4%" :filters="filtersArea" :filter-method="filterRName">
										</el-table-column>
										<el-table-column prop="cType" label="楼盘类型" min-width="8.8%">
										</el-table-column>
										<el-table-column prop="hNum" label="小区户数" min-width="7.3%" class="tar">
										</el-table-column>
										<el-table-column label="楼盘价格" min-width="7.3%">
											<template slot-scope="scope">
												<span>&yen;{{(scope.row.hPrice)?priceFormat(scope.row.hPrice/100): 0 }}</span>
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
										<el-table-column label="操作" min-width="4.3%" v-if="showHandel">
											<template slot-scope="scope">
												<span style="color:#999;" v-if="scope.row.lState==2">终止</span>
												<el-button type="text" v-else @click="disContinue(scope.row)">终止</el-button>
											</template>
										</el-table-column>
									</el-table>
								</div>
							</div>
						</el-tab-pane>
						<el-tab-pane label="受众画像" name="second">
							<div class="box portrait-wrap">
								<!--尚未开通-->
								<div class="box NotOpen" v-if="picStatus == 1">
									<img src="../../assets/images/portrait.png" alt="">
									<p>尚未开通受众画像</p>
									<el-button type="primary" @click.native.prevent="applyPhoto">申请开通</el-button>
								</div>
								<!--审核中-->
								<div class="box inReview" v-if="picStatus == 2">
									<img src="../../assets/images/portrait.png" alt="">
									<p>受众画像申请审核中...</p>
								</div>
								<!--已开通-->
								<div class="box Review" v-if="picStatus == 3">
									<div class="map-wrap">
										<h1>受众画像</h1>
										<div class="map">
											<div class="map" id="allmap" ref="allmap">
											</div>
											<div class="tip-box" v-if="showTipBox">
												<div class="tip-box-top">
													<img src="../../assets/images/map-img.jpg" alt="">
													<p>尚东峰景雅苑</p>
													<p>
														<i class="el-icon-location"></i>
														<span>广州市海珠区南洲北路峰景东街5-9号</span>
													</p>
												</div>
												<div class="tip-box-bottom">
													<p>受众画像</p>
													<ul>
														<li style="width: 45%">
															<em>人流量</em> 22,357</li>
														<li style="width: 50%">
															<em>居民访客比例</em> 50%</li>
														<li style="width: 45%">
															<em>居民</em> 2,357</li>
														<li style="width: 50%">
															<em>平均停留时长</em> 3:33</li>
														<li style="width: 45%">
															<em>访客</em> 357</li>
													</ul>
													<p>
														<i class="fa fa-building"></i> 社区画像</p>
												</div>
											</div>
										</div>

										<div class="data-list">
											<span>
												<div style="display:inline-block">
													<el-input placeholder="请输入内容" v-model="houseSearchKey" class="input-with-select" @change="initData">
														<el-select v-model="houseSearchSelect" slot="prepend" placeholder="请选择">
															<el-option label="社区名称" value="1"></el-option>
															<el-option label="客户名称" value="2"></el-option>
															<el-option label="品牌名称" value="3"></el-option>
														</el-select>
													</el-input>
												</div>
											</span>
											<span>
												<el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
											</span>
											<el-table :data="houselist" height="380" style="width: 100%">
												<el-table-column type="index" label="编号" min-width="10%">
												</el-table-column>
												<el-table-column prop="house" label="社区" min-width="18%">
												</el-table-column>
												<el-table-column prop="mian" label="投放面数" min-width="8%" sortable>
												</el-table-column>
												<el-table-column prop="person" label="人流量" min-width="7%" sortable>
												</el-table-column>
												<el-table-column prop="residents" label="居民" min-width="8%" sortable>
												</el-table-column>
												<el-table-column prop="visitors" label="访客" min-width="8%" sortable :sort-orders="[2,1]">
												</el-table-column>
												<el-table-column label="居民访客比例" min-width="12%" sortable :sort-orders="[2,1]">
													<template slot-scope="scope">
														<span>{{scope.row.percent}}</span>
													</template>
												</el-table-column>
												<el-table-column prop="time" label="平均停留时间" min-width="12%" sortable>
												</el-table-column>
												<el-table-column prop="portraitStatus" label="社区画像" min-width="10%">
												</el-table-column>
												<el-table-column label="操作" min-width="8%">
													<template slot-scope="scope">
														<span style="color: #108ee9;cursor: pointer" v-if="scope.row.portraitStatus == '已开通'">查看画像</span>
														<span style="color: #108ee9;cursor: pointer" v-else @click="dialogHouseVisible = true">开通画像</span>
													</template>
												</el-table-column>
											</el-table>
										</div>
									</div>
								</div>
							</div>
						</el-tab-pane>
					</el-tabs>
					<!-- 画像申请的弹出框开始 -->
					<el-dialog :visible.sync="showPhoto" title="协助客户开通受众画像" center>
						<applyphoto @cancel="cancelApply" @apply="confirmApply"></applyphoto>
					</el-dialog>
					<!--社区开通画像 -->
					<el-dialog title="开通社区画像" :visible.sync="dialogHouseVisible" class="dialogHouseVisible">
						<p>选择调研时间段</p>
						<div>
							<!--时间默认选择订单投放时间，如果超过31天默认选择31天-->
							<el-date-picker v-model="openPicDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
							</el-date-picker>
						</div>
						<span slot="footer" class="dialog-footer">
							<el-button @click="dialogVisible = false">取 消</el-button>
							<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
						</span>
					</el-dialog>
					<!-- 返回框 -->
					<!--<div class="content_bottom_btn">-->
					<!--<el-button type="default" @click="goBack">返回</el-button>-->
					<!--</div>-->
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
import {
    Table,
    TableColumn,
    Tabs,
    TabPane,
    Button,
    Upload,
    Card,
    Dialog,
    Checkbox,
    Select,
    Option,
    Input,
    Cascader,
    Progress,
    Pagination,
    Popover,
    Form,
    FormItem,
    MessageBox,
    Message
} from "element-ui";
import applyphoto from "../common/components/applyPhoto.vue";

export default {
    name: "orderDetail",
    components: {
        applyphoto,
        elTable: Table,
        elTableColumn: TableColumn,
        elTabs: Tabs,
        elTabPane: TabPane,
        elButton: Button,
        elUpload: Upload,
        elCard: Card,
        elDialog: Dialog,
        elCheckbox: Checkbox,
        elSelect: Select,
        elOption: Option,
        elInput: Input,
        elCascader: Cascader,
        elProgress: Progress,
        elPagination: Pagination,
        elPopover: Popover,
        elForm: Form,
        elFormItem: FormItem
    },
    data() {
        return {
            //开通社区画像
            openPicDate: "",
            dialogHouseVisible: false,
            //地图面板
            showTipBox: false,
            //画像申请
            showPhoto: false,
            picStatus: 3,
            houseSearchKey: "",
            houseSearchSelect: "社区名称",
            //受众画像社区列表
            houselist: [
                {
                    house: "东华苑",
                    mian: "1",
                    person: "1,231",
                    residents: "2,121",
                    visitors: "141",
                    percent: "12.67",
                    time: "02:12",
                    portraitStatus: "已开通"
                },
                {
                    house: "东华苑",
                    mian: "3",
                    person: "1,231",
                    residents: "2,121",
                    visitors: "141",
                    percent: "12.67",
                    time: "02:12",
                    portraitStatus: "已开通"
                },
                {
                    house: "东华苑",
                    mian: "3",
                    person: "1,231",
                    residents: "2,121",
                    visitors: "141",
                    percent: "82.67",
                    time: "02:12",
                    portraitStatus: "已开通"
                },
                {
                    house: "东华苑",
                    mian: "1",
                    person: "6,231",
                    residents: "2,121",
                    visitors: "141",
                    percent: "13.67",
                    time: "02:12",
                    portraitStatus: "已开通"
                },
                {
                    house: "东华苑",
                    mian: "1",
                    person: "5,231",
                    residents: "2,121",
                    visitors: "141",
                    percent: "16.67",
                    time: "05:12",
                    portraitStatus: "未开通"
                },
                {
                    house: "东华苑",
                    mian: "1",
                    person: "1,231",
                    residents: "8,121",
                    visitors: "1,411",
                    percent: "12.67",
                    time: "03:12",
                    portraitStatus: "未开通"
                },
                {
                    house: "东华苑",
                    mian: "1",
                    person: "1,231",
                    residents: "4,121",
                    visitors: "941",
                    percent: "12.67",
                    time: "02:17",
                    portraitStatus: "未开通"
                }
            ],
            //加载中
            loading: true,
            UpReportLoading: true,
            DownReportLoading: true,
            // 判断
            role: "",
            paginationShow: true,
            // 订单详情头部
            orderDetail: {},
            //修改合同号
            changeCID: false,
            planPanel: "second",
            // 选点排期
            setpointArr: [],
            currentSetpoint: [],
            copyAsidArr: [],
            // 报价单详情
            // priceSheet: [],
            // 城市过滤结果
            filterCityData: [],
            // 地区过滤结果
            filtersArea: [],
            // 排期时间过滤
            filtersData: [],
            //选点排期资源名称搜索
            keyword: "",
            selectRecName: "1",
            imgOrder: "",
            //物料信息
            // materialInfo: [],
            finishDate: "",
            nowRow: {},
            dateRange: {
                beginDate: "",
                endDate: ""
            },
            pickerOptions: {
                disabledDate: time => {
                    let beginDateVal = new Date(
                        this.dateRange.beginDate
                    ).getTime();
                    let endDateVal =
                        new Date(this.dateRange.endDate).getTime() -
                        60 * 60 * 24 * 1000;
                    if (beginDateVal || endDateVal) {
                        return (
                            time.getTime() < beginDateVal ||
                            time.getTime() > endDateVal
                        );
                    }
                }
            },

            //添加点位
            dialogAddPoint: false,
            dateInput: "",
            //搜索类型
            typeSelect: [
                {
                    value: "资源名称",
                    label: "资源名称"
                },
                {
                    value: "商圈",
                    label: "商圈"
                },
                {
                    value: "城市",
                    label: "城市"
                }
            ],
            //默认
            value: "资源名称",

            buildValue: "",
            //搜索框
            searchInput: "",
            planSelect: "",
            //按钮
            usableBtn: false,
            //发送报告
            sendReportchecked: false,
            //上传照片
            dialogImageUrl: "",
            dialogVisible: false,
            //监播备注
            remark: "",
            changeRemark: false,
            //选点排期标题
            showTitle: false,
            //选点排期按钮
            showBtn: true,
            //选点排期操作
            showHandel: false
        };
    },
    created() {
        // 根据角色判断是否有修改合同编号的权限
        this.getRole();
        // 获取订单详情的上面公司的信息
        this.getInitData();
        // 选点排期
        this.getSetPoint();
        // 报价单
        // this.getPriceData();
    },
    computed: {},
    methods: {
        //百度地图
        map() {
            var that = this;
            let map = new BMap.Map("allmap");
            let point = new BMap.Point(116.417854, 39.921988);
            var label;
            map.centerAndZoom(point, 15); //地图中心点和级别
            let data_info = [
                [116.417854, 39.921988, "尚东峰景雅苑"],
                [116.406605, 39.921585, "东华苑"],
                [116.412222, 39.912345, "怡乐花园"]
            ];

            for (let i = 0; i < data_info.length; i++) {
                let marker = new BMap.Marker(
                    new BMap.Point(data_info[i][0], data_info[i][1])
                ); // 创建标注
                let content = data_info[i][2];
                map.addOverlay(marker);
                label = new BMap.Label(content, {
                    offset: new BMap.Size(20, -10)
                });
                label.setStyle({
                    padding: "4px",
                    border: "1px solid #efefef",
                    fontcolor: "#3a3a3a"
                });

                // 将标注添加到地图中
                marker.addEventListener("onmouseover", function(e) {
                    marker.setLabel(label);

                    // that.addClickHandler();
                });
            }
            label.addEventListener("click", function(e) {
                that.addClickHandler();
            });
            map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
        },
        //  点击事件
        addClickHandler() {
            this.showTipBox = !this.showTipBox;
        },

        // 申请画像
        applyPhoto() {
            // Message.warning('该功能尚未完善');
            this.showPhoto = true;
        },
        cancelApply() {
            this.showPhoto = !this.showPhoto;
        },
        confirmApply(data) {
            console.log(data);
            this.showPhoto = !this.showPhoto;
            // Message.success('该订单住户画像开通成功');
        },

        setInfo(data) {
            console.log("defail------data", data);
            this.$set(this.orderDetail, "rIDs", data.rIDs);
            this.$set(this.orderDetail, "Total", data.Total);
            this.$set(this.orderDetail, "pdTotal", data.pdTotal);
            this.$set(this.orderDetail, "pdSendFee", data.pdSendFee);
            this.$set(this.orderDetail, "pdOtherFee", data.pdOtherFee);
            // this.priceSheet = data.priceSheet;
        },

        formatJson(filterVal, jsonData) {
            return jsonData.map(v =>
                filterVal.map(j => (j == "hPrice" ? v[j] / 100 : v[j]))
            );
        },

        // 获取角色
        getRole() {
            this.role = JSON.parse(
                sessionStorage.getItem("session_data")
            ).uType;
        },

        initData() {
            // if (!this.rangeDate && !this.keyword) {
            //   this.currentPlan = JSON.parse(JSON.stringify(this.planList));
            // }
        },
        // 获取选点排期列表数据
        getInitData() {
            // 真实数据
            let uid = JSON.parse(sessionStorage.getItem("session_data")).uID;
            let apid = sessionStorage.getItem("order_apid");
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
                        this.orderDetail = info;
                        this.apQC = this.orderDetail.apQC
                            ? this.orderDetail.apQC
                            : this.getContractNo(this.orderDetail.rID);
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
        // 获取选点排期
        getSetPoint() {
            if (this.setpointArr.length) {
                return;
            }
            // 真实数据
            let uid = JSON.parse(sessionStorage.getItem("session_data")).uID;
            let apid = sessionStorage.getItem("order_apid");
            let info = {
                uid: uid,
                apid: apid
            };
            // uid         int【必填】     当前账户UserID
            // apid        int             公司对应方案apID
            // api.getApi('/GetADB', info).then(res =>{
            api
                .getApi("/GetAdLaunch", info)
                .then(res => {
                    console.log(res.data);
                    if (!res.data.SysCode) {
                        let result = res.data;
                        for (let data of result) {
                            // 城市中文名称
                            data.city = areaToText.toTextCity(data.rID);
                            let time =
                                this.formatTime(data.lStar) +
                                "-" +
                                this.formatTime(data.lEnd);
                            data.timeRange = time;
                            let finishTimeRange = "";
                            if (data.lState == 2) {
                                finishTimeRange =
                                    this.formatTime(data.lStar) +
                                    "-" +
                                    this.formatTime(data.lSetTime);
                            }
                            data.finishTimeRange = finishTimeRange;
                        }
                        // 选点排期
                        this.copyAsidArr = JSON.parse(JSON.stringify(result));
                        this.setpointArr = result;
                        this.currentSetpoint = this.setpointArr;
                        // 城市筛选过滤
                        this.filterCityData = filterFormat(result, "city");
                        this.filtersArea = filterFormat(result, "rName");
                        this.filtersData = filterFormat(result, "timeRange");
                        // this.allResource = filterFormat(result, "resName");
                        this.loading = false;
                    } else if (res.data.SysCode == 100302) {
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
        // 被终止了的选点根据条件不显示上下刊报告
        filterInitData(arr) {
            let result = [];
            for (let data of arr) {
                let finish = dateFormat.toDate(data.lSetTime, "");
                let start = dateFormat.toDate(data.lStar, "");
                if (data.lState == 2 && finish < start) {
                } else {
                    result.push(data);
                }
            }
            return result;
        },

        // 区域二级联动
        getCitys(arr) {
            let cityArr = [];
            for (let data of arr) {
                let obj = {
                    value: data.city,
                    label: data.city,
                    children: []
                };
                if (
                    JSON.stringify(cityArr).indexOf(JSON.stringify(obj)) === -1
                ) {
                    cityArr.push(obj);
                }
            }
            for (let item of cityArr) {
                for (let data of arr) {
                    let areaObj = {
                        value: data.rName,
                        label: data.rName
                    };
                    if (data.city == item.value) {
                        // 去重
                        if (
                            JSON.stringify(item.children).indexOf(
                                JSON.stringify(areaObj)
                            ) === -1
                        ) {
                            item.children.push(areaObj);
                        }
                    }
                }
            }
            console.log("cityArr---------------fda", cityArr);
            return cityArr;
        },

        // 时间格式规范
        formatTime(val) {
            return dateFormat.toDate(val, ".");
        },
        // 当搜索框为空的时候进行重置显示
        init() {
            if (!this.keyword) {
                this.currentSetpoint = this.setpointArr;
            }
        },
        // 搜索
        search() {
            // 账号，姓名
            console.log(this.selectRecName);
            console.log(this.keyword);
            let select = this.selectRecName;
            let keyword = this.keyword;
            if (this.keyword) {
                let arr = [];
                for (let data of this.setpointArr) {
                    if (data.resName) {
                        if (select == "1" && data.resName.includes(keyword)) {
                            arr.push(data);
                        }
                    }
                }
                this.currentSetpoint = arr;
                return;
            }
            this.currentSetpoint = this.setpointArr;
        },
        searchImgChange() {
            let citySelect = this.citySelect;
            if (citySelect[0] == "全部") {
                this.allPic = "";
                this.allhouse = "";
            }
            this.searchImg();
        },

        // 城市筛选
        filterCity(value, row) {
            return row.city === value;
        },
        // 地区筛选
        filterRName(value, row) {
            return row.rName === value;
        },
        // 排期筛选
        filterTimeRange(value, row) {
            return row.timeRange === value;
        },

        loginTimeout() {
            Message.warning("登录超时,请重新登录");
            this.$router.push("/login");
        },
        // 状态修改更新数据
        updateState(order, val) {
            let len = order.length;
            for (let i = 0; i < len; i++) {
                let ds = dateFormat.toDate(order[i].lStar, ".");
                let de = dateFormat.toDate(order[i].lEnd, ".");
                let start = dateFormat.toDate(val.lStar, ".");
                let end = dateFormat.toDate(val.lEnd, ".");
                if (order[i].asID == val.asID && ds == start && de == end) {
                    order.splice(i, 1);
                    len--;
                }
            }
        },
        finishState() {
            if (this.upLoadImg.length) {
                this.updateState(this.upReportArr, this.nowRow);
                this.updateState(this.currUpReportArr, this.nowRow);
                this.updateState(this.pageUpReportArr, this.nowRow);
            } else {
                this.updateState(this.copyAsidArr, this.nowRow);
            }
            if (this.downImg.length) {
                this.updateState(this.downReportArr, this.nowRow);
                this.updateState(this.currDownReportArr, this.nowRow);
                this.updateState(this.pageDownReportArr, this.nowRow);
            } else {
                this.updateState(this.copyAsidArr, this.nowRow);
            }
        },
        conFirmStopAds() {
            console.log(this.nowRow);
            let uwho = JSON.parse(sessionStorage.getItem("session_data")).uWho;
            let rid = this.nowRow.rID.toString().substring(0, 4) + "00";
            console.log("uwho------", uwho);
            if (uwho == "0" || uwho.includes(rid)) {
                let info = {
                    uid: JSON.parse(sessionStorage.getItem("session_data")).uID,
                    lid: this.nowRow.lID
                };
                MessageBox.confirm(
                    `是否在${this.finishDate}这一天终止 ${this.nowRow.resName +
                        this.nowRow.mTitle +
                        this.nowRow.asLab}面在 ${
                        this.nowRow.timeRange
                    } 的投放？\n`,
                    "提示",
                    {
                        dangerouslyUseHTMLString: true,
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning"
                    }
                )
                    .then(() => {
                        api
                            .postApi("/StopADS", info)
                            .then(res => {
                                console.log(res.data);
                                if (!res.data.SysCode) {
                                    let resdata = res.data;
                                    this.$set(
                                        this.nowRow,
                                        "lState",
                                        resdata.lState
                                    );
                                    this.$set(
                                        this.nowRow,
                                        "lSetTime",
                                        resdata.lSetTime
                                    );
                                    let time =
                                        this.formatTime(resdata.lStar) +
                                        "-" +
                                        this.formatTime(resdata.lSetTime);
                                    this.$set(
                                        this.nowRow,
                                        "finishTimeRange",
                                        time
                                    );
                                    this.isFinish = false;
                                    this.finishState();
                                    Message.success("终止成功");
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
                        this.isFinish = false;
                    });
            } else {
                Message.warning("您没有权限终止点位");
                this.isFinish = false;
            }
        }
    },
    mounted: function() {
        this.map();
        $(function() {
            //事件委托
            $(".content_top_wrap").on("click", "dd", function() {
                if ($(this).hasClass("active")) {
                    $(this).removeClass("active");
                } else {
                    $(this).addClass("active");
                }
            });
            //筛选输入框
            $(".content_top_wrap")
                .on("focus", ".input", function() {
                    $(this)
                        .parents(".input-wrap")
                        .addClass("focus");
                    $(this)
                        .siblings("button")
                        .show();
                })
                .on("blur", ".input", function() {
                    $(this)
                        .parents(".input-wrap")
                        .removeClass("focus");
                    $(this)
                        .siblings("button")
                        .hide();
                });

            // $(".content_top_wrap").on("click", ".close-tags", function() {
            //     $(this)
            //         .parents(".tags")
            //         .hide();
            // });
            // $(".content_top_wrap").on("click", ".clear-filter", function() {
            //     $(this)
            //         .parents(".filter-tags")
            //         .hide();
            // });
        });
    }
};
</script>

<style scoped>
/*受众画像*/
.portrait-wrap .box {
    text-align: center;
}

.portrait-wrap .box p {
    font-size: 20px;
    color: rgba(102, 102, 102, 0.66);
    padding-top: 24px;
    padding-bottom: 15px;
}

.portrait-wrap .box img {
    width: 246px;
    height: 157px;
    margin-top: 87px;
}

.portrait-wrap .box .el-button {
    margin-bottom: 20px;
}

.map-wrap {
    background: #ffffff;
    border: 1px solid #dedede;
    border-radius: 2px;
    padding: 0 20px 20px;
}

.map-wrap h1 {
    text-align: left;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.85);
    height: 55px;
    line-height: 55px;
    border-bottom: 1px solid #e8e8e8;
    margin-bottom: 20px;
    margin-left: -20px;
    margin-right: -20px;
    padding-left: 20px;
    font-weight: bold;
}

.map-wrap .map {
    width: 100%;
    height: 515px;
    /*border: 1px solid #000;*/
    box-sizing: border-box;
    margin-bottom: 30px;
    position: relative;
}

.map-wrap .data-list > span {
    float: left;
}

.map .tip-box {
    width: 238px;
    height: 345px;
    padding: 4px;
    position: absolute;
    left: 10px;
    top: 10px;
    z-index: 999;
    background-color: #ffffff;
    box-shadow: 0 2px 1px 0 rgba(0, 0, 0, 0.24);
}

.map .tip-box img {
    width: 230px;
    height: 140px;
    margin-top: 0;
}

.map .tip-box .tip-box-top p:first-of-type {
    font-size: 16px;
    color: rgba(0, 0, 0, 0.85);
    padding: 8px 10px;
    text-align: left;
}

.map .tip-box .tip-box-top p:last-of-type {
    font-size: 12px;
    color: rgba(131, 131, 131, 0.85);
    padding: 0 0 8px 8px;
    text-align: left;
    border-bottom: 3px solid #f2f2f2;
}

.map .tip-box .tip-box-bottom p:first-of-type {
    font-size: 12px;
    color: rgba(52, 52, 52, 0.85);
    padding: 8px 10px;
    text-align: left;
}

.map .tip-box .tip-box-bottom p:last-of-type {
    color: #108ee9;
    text-align: right;
    padding: 7px 12px;
    cursor: pointer;
    font-size: 12px;
}

.map .tip-box .tip-box-bottom ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 10px;
    box-sizing: border-box;
    border-bottom: 1px solid #e8e8e8;
}

.map .tip-box .tip-box-bottom ul li {
    font-size: 12px;
    color: rgba(52, 52, 52, 0.85);
    text-align: left;

    box-sizing: border-box;
    margin-bottom: 10px;
}

.map .tip-box .tip-box-bottom ul li em {
    color: rgba(153, 153, 153, 0.85);
    margin-right: 8px;
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

.first-wrap h4 span {
    font-size: 14px;
    color: #666;
    font-weight: normal;
    float: right;
    margin-right: 35px;
}

.plan-panel {
    /* position: absolute;
            top: 190px;
            width: 100%;
            left: 0;*/
    /*width: 100%;*/
    margin-top: -40px;
    /*padding-left: 60px;*/
    /*padding-right: 60px;*/
    /*margin-left: 60px;*/
    /*margin-right: 60px;*/
}

/deep/ .el-tabs__nav-scroll {
    padding-left: 28px;
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

/*选点排期*/
.changeDWBtn {
    margin-left: 10px;
}

/deep/ .changeDWBtn span {
    position: relative;
    left: -9px !important;
    top: -2px;
}

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

/deep/ .el-table th,
.el-table tr {
    height: 44px;
}

/deep/ .el-form-item__content {
    line-height: 46px;
}

/deep/ .el-form-item__label {
    padding: 0 0 0 12px;
}

.table_wrap {
    padding: 10px 28px 28px 28px;
}

/deep/ .el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: #ecf5ff;
}

/deep/ .el-tabs__item.is-active {
    font-weight: bold;
}

/deep/ .el-table--border {
    border-radius: 4px;
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
    font-size: 14px;
    /*padding: 10px 10px;*/
    height: 34px;
    /*line-height: 14px;*/
    vertical-align: middle;
}

/*按钮*/
.first-wrap /deep/ .el-button {
    width: 76px;
    position: relative;
    /*top: 3px;*/
}

.first-wrap /deep/ .el-button span,
.first-wrap /deep/ .el-button i {
    /*position: relative;*/
    /*!*top: -2px;*!*/
    left: -23px;
}

.first-wrap /deep/ .el-button span a {
    color: #606266;
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
    border-right: 1px dashed #d8d8d8;
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
    border-bottom: 1px dashed #d8d8d8;
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
    /*height: 380px;*/
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
    height: 205px;
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

.plan-title .el-input__inner {
    width: 100%;
}

.plan-detail {
    font-size: 14px;
    color: #333333;
    padding-left: 41px;
}

.plan-detail-left {
    float: left;
    width: 78%;
}

.plan-detail-left ul {
    width: 100%;
    float: left;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    text-align: left;
}

.plan-detail-left ul li {
    float: left;
    width: 280px;
    margin-bottom: 12px;
}

/*.plan-detail-left ul li:nth-child(3n-2) {*/
/*width: 350px;*/
/*}*/

/*.plan-detail-left ul li:nth-child(3n-1) {*/
/*width: 248px;*/
/*}*/

.plan-detail-left ul li em {
    font-size: 14px;
    color: #666666;
}

.plan-detail-right {
    width: 20%;
    float: right;
    display: flex;
    justify-content: space-between;
}

.plan-detail-right dl {
    float: left;
    text-align: right;
}

.plan-detail-right dl:last-of-type {
    /*margin-left: 34px;*/
}

.plan-detail-right dt {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
}

.plan-detail-right dd {
    margin-top: 4px;
    display: inline-block;
    font-size: 20px;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.85);
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
    padding-top: 64px;
    /*margin-bottom: 109px;*/
    position: relative;
}

.ad_mediaMana_nav p a:nth-of-type(1) {
    color: #999;
}

/*资源信息*/
.mediaMana_content_top {
    padding: 42px 60px 0 60px;
    /*padding: 42px 60px 0 10px;*/
}

/*按钮*/
.content_bottom_btn {
    width: 100%;
    text-align: center;
    margin-bottom: 20px;
    margin-top: 20px;
}

.content_bottom_btn button {
    width: 80px;
    height: 34px;
    line-height: 10px;
}

/deep/ .el-button--default:focus,
.el-button--default:hover {
    color: #606266;
    border-color: #dcdfe6;
    background-color: #fcfcfc;
}

.content_bottom_btn /deep/ .el-button span {
    /*position: relative;*/
    /*top: -2px;*/
}

.content_bottom_btn /deep/ .el-button span a {
    color: #606266;
}

/*换点表格*/
/deep/ .el-table td,
.el-table th {
    padding: 4px 0;
    height: 48px;
}

/*添加点位对话框*/
.first-wrap /deep/ .el-dialog {
    width: 87% !important;
}

/deep/ .el-dialog {
    width: 29%;
}

/*选择点位*/
/deep/ .type-select .el-input,
/deep/ .type-select .el-input__inner {
    width: 95px;
    position: relative;
    top: 0;
    left: -5px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    padding-right: 0;
    padding-left: 10px;
    height: 34px;
}

/deep/ .el-button {
    /*width: 76px;*/
    height: 34px;
    margin-left: 2px;
}

/deep/ .el-button + .el-button {
    margin-left: 0;
}

/deep/ .el-button [class*="el-icon-"] + span,
.select-wrap button .el-icon-search {
    position: relative;
    left: -2px;
    top: 0px;
}

.searchInput /deep/ .el-input__inner,
.searchInput {
    width: 224px !important;
    position: relative;
    left: -7px;
    top: 0;
    height: 34px;
    border-left: none !important;
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
}

/deep/ .date-select.el-input__inner {
    width: 237px;
    position: relative;
    /*top: 3px;*/
    left: 1px;
    height: 34px;
}

/deep/ .el-date-editor .el-range__icon {
    position: relative;
    top: -2px;
    left: -3px;
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

.search-wrap {
    position: relative;
    height: 34px;
}

.shopcar {
    width: 65px;
    height: 65px;
    border-radius: 50%;
    position: fixed;
    right: 29px;
    top: 75px;
    z-index: 999;
}

/deep/ .shopcar .el-badge__content.is-fixed {
    position: absolute;
    top: 10px;
    right: 25px;
}

.shopcar img {
    width: 59px;
    height: 59px;
    border-radius: 50%;
}

/*面板*/
.dw-panel {
    border: 1px solid #d8d8d8;
    margin-top: 8px;
    padding: 10px 18px 0 18px;
}

.dw-panel dl {
    border-bottom: 2px dashed #d8d8d8;
    line-height: 40px;
}

.dw-panel dt {
    display: inline-block;
    font-size: 14px;
    color: #999999;
    height: 40px;
}

.dw-panel .city-proper {
    padding-left: 75px;
}

.dw-panel dd {
    font-size: 14px;
    color: #666666;
    display: inline-block;
    height: 22px;
    line-height: 22px;
    padding: 2px 7px;
    cursor: pointer;
    margin-left: 6px;
}

.dw-panel dd.active {
    color: #1890ff;
    border: 1px solid #1890ff;
    border-radius: 4px;
}

/*筛选输入框*/
.filter-input {
    width: 100%;
    height: 38px;
    background: #f1f1f1;
    margin-top: 8px;
    margin-bottom: 8px;
    font-size: 14px;
    color: #979797;
    padding: 5px 0 6px 10px;
    box-sizing: border-box;
}

.filter-input input {
    border: 1px solid #c2c2c2;
    border-radius: 4px;
    width: 50px;
    height: 26px;
    outline: none;
    text-indent: 1em;
    font-size: 14px;
    color: #666;
}

.filter-input ul {
    /* display: flex;
            align-items: center;*/
}

.filter-input ul li {
    float: left;
    margin-left: 33px;
    position: relative;
    width: 189px;
    top: 4px;
}

.filter-input ul li:last-child {
    float: left;
    margin-left: 33px;
    position: relative;
    width: 189px;
    top: 1px;
}

/deep/ .buildType .el-input,
/deep/ .buildType .el-input__inner {
    width: 95px;
    height: 26px;
    position: relative;
    top: 0;
    left: -5px;
    padding-right: 0;
    padding-left: 10px;
}

.filter-input .input-wrap {
    position: absolute;
    left: 64px;
    top: -8px;
    height: 64px;
    padding: 4px 2px;
    border-radius: 4px;
}

.filter-input .input-wrap button {
    display: none;
}

.input-wrap.focus {
    background-color: #fff;
    z-index: 9;
    border: 1px solid #d8d8d8;
}

.filter-input .input-wrap .el-button--mini {
    width: 43px;
    height: 22px;
    position: relative;
    top: 10px;
}

.input-wrap /deep/ .el-button--mini span {
    position: relative;
    top: -2px;
    left: -5px;
}

.searchBtn.el-button + .el-button {
    margin-left: 0;
}

/*表格*/
/deep/ .el-table th,
.el-table tr {
    background: #f7f7f7;
    padding: 7px 0;
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
    padding: 0 44px;
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

/deep/ .tar .cell {
    text-align: right !important;
    padding-right: 10px;
}

/deep/ .table_wrap.car-list {
    margin-top: 0 !important;
}

/deep/ .el-table .el-table__row td:nth-child(3) .cell,
/deep/ .el-table .el-table__row td:nth-child(4) .cell,
/deep/ .el-table .el-table__row td:nth-child(5) .cell,
/deep/ .el-table .el-table__row td:nth-child(6) .cell,
/deep/ .el-table .el-table__row td:nth-child(7) .cell,
/deep/ .el-table .el-table__row td:nth-child(8) .cell,
/deep/ .el-table .has-gutter th:nth-child(3) .cell,
/deep/ .el-table .has-gutter th:nth-child(4) .cell,
/deep/ .el-table .has-gutter th:nth-child(5) .cell,
/deep/ .el-table .has-gutter th:nth-child(6) .cell,
/deep/ .el-table .has-gutter th:nth-child(7) .cell,
/deep/ .el-table .has-gutter th:nth-child(8) .cell {
    text-align: right;
}

/deep/ .el-table .el-table__row td:nth-child(3) .cell,
/deep/ .el-table .el-table__row td:nth-child(4) .cell,
/deep/ .el-table .el-table__row td:nth-child(5) .cell,
/deep/ .el-table .el-table__row td:nth-child(6) .cell,
/deep/ .el-table .el-table__row td:nth-child(7) .cell,
/deep/ .el-table .el-table__row td:nth-child(8) .cell {
    padding-right: 20px;
}

/*超出省略*/
/deep/ .el-table .cell {
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: left;
}

/deep/ .plan-select .el-input__inner {
    width: 180px;
    margin-left: -13px;
    height: 34px;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
}

/deep/ .el-date-editor .el-range__icon {
    position: relative;
    top: -2px;
    left: -3px;
}

/deep/ .search-wrap > span {
    float: left;
    margin-left: 2px;
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
    /* float: left;
    position: relative; */
}

/deep/ .el-range-editor .el-range-input {
    line-height: 20px;
}

/deep/ .el-dialog__body {
    padding: 30px 20px 20px;
}

/*1440*/
@media all and (min-width: 1420px) {
    .tab-info .price h4 {
        width: 92%;
    }

    .panel {
        padding: 20px 30px;
    }

    .upload-img {
        /*margin-left: 33px;*/
    }

    .up-loader-Imgpanel {
        margin-right: 18px;
    }
}

/*1920*/
@media all and (min-width: 1900px) {
    .tab-info .price h4 {
        width: 94%;
    }

    .plan-title .handleBtn {
        position: absolute;
        /*right: 135px;*/
        top: 30px;
    }

    .up-loader-Imgpanel {
        width: 445px;
        margin-top: 13px;
        margin-right: 67px;
        margin-left: 61px;
        /*margin-left: 37px;*/
    }

    .plan-detail-right {
        width: 15%;
    }

    .plan-detail-left ul li {
        float: left;
        width: 400px;
        margin-bottom: 12px;
    }
}
</style>
