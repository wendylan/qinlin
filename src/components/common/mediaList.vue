<template>
	<div class="ad_mediaDetail_wrap clearfix">
		<div class="ad_mediaDetail_nav ">
			<p>
				<a href="#" style="color: #999">媒体管理</a>
			</p>
		</div>
		<div class="mediaList_wrap">
			<div class="mediaList_head">
				<h2>媒体列表</h2>
			</div>
			<div class="mediaList_container">
				<el-row>
					<div class="mediaList_handel">
						<span style="display:inline-block">
							<el-input placeholder="请输入内容" v-model="keyword" class="input-with-select" @change="initData">
								<el-select v-model="selectInfo" slot="prepend" placeholder="请选择">
									<el-option v-for="item in SelOptions" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-input>
						</span>
						<span>
							<el-button type="primary" icon="el-icon-search" @click="searchFun">搜索</el-button>
						</span>
						<span>
							<el-button plain @click="newMedia" v-if="showNewBtn">新建</el-button>
						</span>
						<!--<span><el-button plain>导入</el-button></span>
                        <span><el-button plain>导出</el-button></span>-->
					</div>
				</el-row>
				<div class="table_wrap">
					<el-table v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" v-loadmore="loadMore" border :data="currentPlan" style="width: 100%" :default-sort="{prop: 'resName', order: 'descending'}">
						<el-table-column label="资源名称" min-width="10.2%">
							<template slot-scope="scope">
								<el-tooltip class="item" effect="dark" :content="scope.row.resName" placement="bottom">
									<span @click="mediaDetail(scope.row)" v-if="haveDetail" style="color: #108ee9;cursor: pointer">
										{{scope.row.resName}}
									</span>
									<span v-else>{{scope.row.resName}}</span>
								</el-tooltip>

							</template>
						</el-table-column>
						<el-table-column prop="rtName" label="资源类型" min-width="7%" :filters="[
							{ text: '社区', value: '社区' },
							{ text: '写字楼', value: '写字楼' },
							]" :filter-method="filterRecType" :filter-multiple="true">
						</el-table-column>
						<el-table-column prop="city" label="城市" min-width="5%" :filters="filtersCity" :filter-method="filterCity" :filter-multiple="false">
							<!--[
							{ text: '石家庄', value: '石家庄' },
							{ text: '广州', value: '广州' },
							{ text: '上海', value: '上海' },
							{ text: '北京', value: '北京' },
							{ text: '深圳', value: '深圳' }
							]-->
						</el-table-column>
						<el-table-column prop="rName" label="区域" min-width="6.1%" :filters="filtersRName" :filter-method="filterRegion" :filter-multiple="false">
							<!--[
							{ text: '天河区', value: '天河区' },
							{ text: '越秀区', value: '越秀区' },
							{ text: '海珠区', value: '海珠区' },
							{ text: '黄浦区', value: '黄浦区' },
							{ text: '白云区', value: '白云区' }
							]-->
						</el-table-column>
						<el-table-column label="商圈" min-width="10.2%">
							<template slot-scope="scope">
								<el-tooltip class="item" effect="dark" :content="scope.row.tradingArea" placement="bottom">
									<span>{{scope.row.tradingArea || '--' }}</span>
								</el-tooltip>
							</template>
						</el-table-column>
						<el-table-column prop="mVehicle" label="媒体类型" min-width="7.4%">
						</el-table-column>
						<el-table-column label="媒体名称" min-width="8.2%">
							<template slot-scope="scope">
								<el-tooltip class="item" effect="dark" :content="scope.row.mTitle" placement="bottom">
									<span>{{scope.row.mTitle || '--' }}</span>
								</el-tooltip>
							</template>
						</el-table-column>
						<el-table-column label="资产编号" min-width="12.7%">
							<template slot-scope="scope">
								{{ scope.row.assetTag || '--' }}
							</template>
						</el-table-column>
						<el-table-column prop="pNum" label="可投面数" min-width="6.1%" class="tar">
						</el-table-column>
						<el-table-column prop="mState" label="媒体状态" min-width="7.7%" :filters="[
							{ text: '待维修', value: '待维修' },
							{ text: '待安装', value: '待安装' },
							{ text: '正常', value: '正常' },
							{ text: '禁用', value: '禁用' },
							]" :filter-method="filterPTStatus" :filter-multiple="false">
						</el-table-column>
						<el-table-column v-if="role!='OP'" label="操作" min-width="7.4%">
							<template slot-scope="scope">
								<el-dropdown size="small" split-button class="handel_btn" trigger="click" :hide-on-click="true">
									操作
									<el-dropdown-menu slot="dropdown">
										<el-dropdown-item @click.native.prevent="confirmBox($event,scope.$index, scope.row)">待安装
										</el-dropdown-item>
										<el-dropdown-item @click.native.prevent="confirmBox($event,scope.$index, scope.row)">正常
										</el-dropdown-item>
										<el-dropdown-item @click.native.prevent="confirmBox($event,scope.$index, scope.row)">待维修
										</el-dropdown-item>
										<el-dropdown-item @click.native.prevent="confirmBox($event,scope.$index, scope.row)">禁用
										</el-dropdown-item>
										<!-- <el-dropdown-item @click.native.prevent="confirmBox($event,scope.$index, scope.row)">删除</el-dropdown-item>-->
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
import api from "../../api/api";
import areaArr from "../../commonFun/areaPackage_new";
import cityData from "../../commonFun/region.json";
// 区域换成中文
import areaToText from "../../commonFun/areaToText_new.js";
import {
    Form,
    FormItem,
    Table,
    TableColumn,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Input,
    Row,
    Button,
    Tooltip,
    MessageBox,
    Message,
    Select,
    Option
} from "element-ui";

export default {
    name: "mediaList",
    components: {
        elForm: Form,
        elFormItem: FormItem,
        elTable: Table,
        elTableColumn: TableColumn,
        elDropdown: Dropdown,
        elDropdownMenu: DropdownMenu,
        elDropdownItem: DropdownItem,
        elInput: Input,
        elRow: Row,
        elButton: Button,
        elTooltip: Tooltip,
        elSelect: Select,
        elOption: Option
    },
    data() {
        return {
            //加载中
            loading: true,
            loadSign: true,
            role: "",
            showNewBtn: true, // 新建按钮
            haveDetail: true,
            //搜索框和下拉列表
            keyword: "",
            selectInfo: "1",
            SelOptions: [
                {
                    value: "1",
                    label: "资源名称"
                },
                {
                    value: "2",
                    label: "商圈"
                },
                {
                    value: "3",
                    label: "城市"
                }
            ],
            //表格
            /* planList: [
              {
                  city: '石家庄',
                  business: '白云万达商业广场',
                  mediaType: '广告门',
                  mediaName: '西街大道东门',
                  assetID: '005B2018D3GZ-X446',
                  usableNum: '2',
                  ptStatus: '正常'
              }, {
                  city: '石家庄',
                  business: '白云万达商业广场',
                  mediaType: '广告门',
                  mediaName: '西街大道东门',
                  assetID: '005B2018D3GZ-X446',
                  usableNum: '2',
                  ptStatus: '正常'
              }, {
                  city: '石家庄',
                  business: '白云万达商业广场',
                  mediaType: '广告门',
                  mediaName: '西街大道东门',
                  assetID: '005B2018D3GZ-X446',
                  usableNum: '2',
                  ptStatus: '正常'
              }]*/
            beforMediaList: [], //  后台返回的原始数据
            planList: [], //  table的所有数据
            currentPlan: [], // 显示在table中的数据
            copyMediaList: [], // 复制搜索前的表格数据
            firstLevelList: [], // 一级搜索存储的数据
            firstLevelListIndex: 0, // 目前显示到的条数下标
            filtersCity: [], // 城市头部筛选
            filtersRName: [], // 区域头部筛选
            loadScroll: true,
            provinceCity: [], //省份及其地级市
            timeID: "", // 计时器
            cityRid: "" // 搜索前置条件为城市时,转换成rid
        };
    },
    mounted: function() {
        // 判断角色确定是否有操作这一列
        this.role = JSON.parse(sessionStorage.getItem("session_data")).uType;
        let path = this.$route.path.split("/")[1];
        if (path != "media" && path != "superOperate") {
            this.showNewBtn = false;
        }

        let nowPath = this.$route.path; // /media/mediaList

        // if (nowPath.indexOf('/operate/') !== -1) {
        // 	this.haveDetail = false
        // }
        $(function() {
            $("body")
                .on(".el-tooltip__popper.is-light")
                .css({
                    color: "#666666"
                });
        });
        this.getData();
    },
    directives: {
        loadmore: {
            heightSign: 413,
            bind: function(el, binding) {
                const selectWrap = el.querySelector(".el-table__body-wrapper");
                selectWrap.addEventListener("scroll", function() {
                    let sign = 100;
                    const scrollDistance =
                        this.scrollHeight - this.scrollTop - this.clientHeight;
                    // console.log('滚动的距离',scrollDistance)
                    if (scrollDistance <= 100) {
                        binding.value();
                    }
                });
            }
        }
    },
    methods: {
        loadMore() {
            console.log("滚动触发了");
            // if(this.loadScroll){
            if (this.loadSign) {
                this.loadSign = false;
                if (this.keyword !== "" && this.loadScroll) {
                    this.firstLevelAdd();
                } else {
                    this.addMediaList();
                }
                setTimeout(() => {
                    this.loadSign = true;
                }, 1000);
                console.log("到底了");
            }
            // }else {
            // console.log('此时为搜索出来的数据')
            // }
        },
        //新建跳转
        newMedia() {
            this.$router.push("./mediaInput");
        },
        //筛选
        filterRecType(value, row) {
            return row.rtName === value;
        },
        filterCity(value, row) {
            return row.city === value;
        },
        filterRegion(value, row) {
            // console.log('value',value,'row',row)
            return row.rName === value;
        },
        filterPTStatus(value, row) {
            let sum = 0;
            for (let data of this.planList) {
                if (data.mState != value) {
                    sum++;
                }
            }
            //sum和所有数据的长度相同时说明都不匹配
            if (sum == this.planList.length) {
                Message.warning({
                    message: "筛选数据为空",
                    duration: 1500
                });
            }
            return row.mState === value;
        },
        //确认框
        confirmBox(e, index, rows) {
            let Status = e.target.innerText;
            let mstate = "";
            console.log("状态", Status);
            console.log("行内容", rows); //mState
            if (rows.mState == Status) {
                Message({
                    type: "warning",
                    message: "当前状态已是" + Status
                });
            } else if (rows.mState === "待安装") {
                /* else if (rows.mState === '正常' && Status === '待安装') {
          Message({
            type: 'warning',
            message: '请按正常流程走，当前媒体已安装'
          });
        } */
                if (Status === "正常") {
                    Message({
                        type: "warning",
                        message: "请在亲邻助手中完成安装任务"
                        // message: '请完善资产编号'
                    });
                } else {
                    Message({
                        type: "warning",
                        message: "请在亲邻助手中完成安装任务"
                        //  message: '需先完成每天安装任务'
                    });
                }
            } else if (Status === "待安装") {
                Message({
                    type: "warning",
                    message: "请按正常流程走，当前媒体已安装"
                });
            } else {
                if (Status == "正常") {
                    mstate = "1";
                } else if (Status == "禁用") {
                    mstate = "0";
                } else if (Status == "待安装") {
                    mstate = "2";
                } else if (Status == "待维修") {
                    mstate = "3";
                }
                let uid = JSON.parse(sessionStorage.getItem("session_data"))
                    .uID;
                let mid = rows.mID;

                MessageBox.confirm(
                    "<p>你确定更改媒体状态为<b>" + Status + "</b>吗？</p>",
                    "提示",
                    {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        dangerouslyUseHTMLString: true,
                        type: "warning"
                    }
                )
                    .then(() => {
                        //确定
                        api
                            .postApi("/CtrlMedia", {
                                uid: uid,
                                mid: mid,
                                mstate: mstate
                            })
                            .then(res => {
                                console.log("修改状态：", res);
                                if (
                                    res.data.SysCode === 200200 ||
                                    res.data.MSG === "操作成功"
                                ) {
                                    Message({
                                        type: "success",
                                        message: "成功更改状态"
                                    });
                                    this.planList[index].mState = Status;
                                    this.currentPlan = this.planList;
                                } else if (
                                    res.data.SysCode === 200302 ||
                                    res.data.MSG === "广告位已被占用"
                                ) {
                                    Message({
                                        type: "warning",
                                        message: res.data.MSG
                                    });
                                } else {
                                    Message({
                                        type: "warning",
                                        message: "状态更改失败"
                                    });
                                }
                            });
                    })
                    .catch(() => {
                        Message({
                            type: "info",
                            message: "已取消操作"
                        });
                    });
            }
        },
        submitForm() {
            this.$http({});
        },
        //删除
        deleteRow(index, rows) {
            console.log();
            MessageBox.confirm("你确定删除这条数据吗？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    Message({
                        type: "success",
                        message: "删除成功！"
                    });
                    //删除
                    rows.splice(index, 1);
                })
                .catch(() => {
                    Message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },
        getData() {
            let dataArr = [];
            let uid = JSON.parse(sessionStorage.getItem("session_data")).uID;
            api.getApi("/GetRMList", { uid: uid }).then(res => {
                console.log("资源媒体列表：", res);
                let RMList = res.data;
                if (!RMList.SysCode) {
                    // let RMList = reclist
                    if (RMList) {
                        this.beforMediaList = RMList.reverse();
                        // console.log('资源媒体列表：', res.data)
                        for (let i = 0; i < RMList.length; i++) {
                            if (RMList[i].mState == "1") {
                                RMList[i].mState = "正常";
                            } else if (RMList[i].mState == "0") {
                                RMList[i].mState = "禁用";
                            } else if (RMList[i].mState == "2") {
                                RMList[i].mState = "待安装";
                            } else if (RMList[i].mState == "3") {
                                RMList[i].mState = "待维修";
                            }
                            let data = areaToText.toTextCity(RMList[i].rID);
                            this.$set(RMList[i], "city", data);
                            dataArr.push(RMList[i]);
                            if (i >= 29 && RMList.length > 29) {
                                this.planList = dataArr;
                                console.log("planList", this.planList);
                                break;
                            } else {
                                if (i >= RMList.length - 1) {
                                    this.planList = dataArr;
                                    console.log(
                                        "媒体列表长度小于29",
                                        this.planList
                                    );
                                }
                            }
                        }
                        this.currentPlan = this.planList;
                        this.copyMediaList = this.planList;
                        //正在加载
                        this.loading = false;
                        this.tableHeadCity_area(); // 表头过滤选项
                    } else {
                        Message.warning({
                            message: "数据为空",
                            duration: 1500
                        });
                    }
                } else {
                    Message({
                        type: "warning",
                        message: RMList.MSG + ",请重新登录"
                    });
                    this.$router.push("/login");
                }
            });
        },
        // 每次曾加20条数据
        addMediaList() {
            let dataArr = [];
            let RMList = this.beforMediaList;
            let index = this.currentPlan.length;
            console.log("this.beforMediaList", this.beforMediaList);
            console.log("下标", index);
            for (let i = index; i < RMList.length; i++) {
                if (RMList[i].mState == "1") {
                    RMList[i].mState = "正常";
                } else if (RMList[i].mState == "0") {
                    RMList[i].mState = "禁用";
                } else if (RMList[i].mState == "2") {
                    RMList[i].mState = "待安装";
                } else if (RMList[i].mState == "3") {
                    RMList[i].mState = "待维修";
                }
                let data = areaToText.toTextCity(RMList[i].rID);
                this.$set(RMList[i], "city", data);
                dataArr.push(RMList[i]);
                // console.log('RMList[i]', i, RMList[i])
                if (i >= index + 29 && RMList.length > 29 + index) {
                    console.log("dataArr", dataArr);
                    for (let j = 0; j < dataArr.length; j++) {
                        this.planList.push(dataArr[j]);
                    }
                    console.log("planList", this.planList);
                    break;
                } else {
                    if (i >= RMList.length - 1) {
                        console.log("dataArr", dataArr);
                        let c = this.planList.concat(dataArr);
                        this.planList = c;
                        console.log("planList", this.planList);
                    }
                }
            }
            this.currentPlan = this.planList;
            if (this.selectInfo === "" || this.selectInfo === null) {
                this.copyMediaList = this.planList;
            }
            this.tableHeadCity_area();
        },
        // 表头区域和城市选项
        tableHeadCity_area() {
            this.filtersCity = [];
            this.filtersRName = [];
            for (let j = 0; j < this.planList.length; j++) {
                // 表头区域和城市选项
                let rName = {
                    text: this.planList[j].rName,
                    value: this.planList[j].rName
                };
                let rCity = {
                    text: this.planList[j].city,
                    value: this.planList[j].city
                };
                //  this.filtersRName.push(rName)
                if (
                    JSON.stringify(this.filtersRName).indexOf(rName.value) ===
                    -1
                ) {
                    this.filtersRName.push(rName);
                }
                if (
                    JSON.stringify(this.filtersCity).indexOf(rCity.value) === -1
                ) {
                    this.filtersCity.push(rCity);
                }
            }
        },
        // 跳转到媒体详情界面
        mediaDetail(data) {
            this.$router.push("./mediaDetail");
            sessionStorage.setItem("resID", data.resID);
        },
        // 当搜索框为空的时候进行重置显示
        initData(val) {
            console.log("搜索框变化的值", val);
            if (!this.keyword) {
                console.log("搜索框为空copyMediaList", this.copyMediaList);
                this.planList = this.copyMediaList; //JSON.parse(JSON.stringify(this.planList));
                this.currentPlan = this.planList;
                this.tableHeadCity_area();
                // this.loading = false
                this.loadScroll = false;
            }
        },
        //资源名称/商圈/城市过滤
        filterData(data) {
            console.log("filter过滤");
            let select = this.selectInfo;
            let keyword = this.keyword;
            let BML = data;
            if (BML.resName && select == "1") {
                if (BML.resName.includes(keyword)) {
                    // arr.push(BML);
                    return BML;
                }
            } else if (BML.tradingArea && select == "2") {
                if (BML.tradingArea.includes(keyword)) {
                    // arr.push(BML);
                    return BML;
                }
            } else if (BML.rID && select == "3") {
                let BMLrID = Math.floor(BML.rID / 100);
                console.log("BMLrID", BMLrID);
                if (BMLrID == this.cityRid) {
                    return BML;
                }
            } else {
                return false;
            }
        },
        // 搜索主方法
        searchListFun() {
            console.log("selectInfo", this.selectInfo);
            console.log("keyword", this.keyword);
            let select = this.selectInfo;
            let keyword = this.keyword;
            let BML = this.beforMediaList;
            let searchArr = [];
            if (this.keyword !== "" && this.keyword !== null) {
                let arr = [];
                if (select == "3") {
                    this.provinceCity = cityData;
                    for (let n = 0; n < this.provinceCity.length; n++) {
                        let city = this.provinceCity[n].regionEntitys;
                        for (let m = 0; m < city.length; m++) {
                            if (city[m].region.includes(keyword)) {
                                this.cityRid = city[m].code.substring(0, 4);
                                console.log(
                                    "城市为:",
                                    keyword,
                                    ",该rid为:",
                                    this.cityRid
                                );
                                break;
                            }
                        }
                    }
                }
                for (let i = 0; i < BML.length; i++) {
                    let tempData = this.filterData(BML[i]);
                    if (tempData) {
                        arr.push(BML[i]);
                    } else {
                        // console.log('不符合')
                    }
                }
                for (let j = 0; j < arr.length; j++) {
                    if (arr[j].mState == "1") {
                        arr[j].mState = "正常";
                    } else if (arr[j].mState == "0") {
                        arr[j].mState = "禁用";
                    } else if (arr[j].mState == "2") {
                        arr[j].mState = "待安装";
                    } else if (arr[j].mState == "3") {
                        arr[j].mState = "待维修";
                    }
                    let data = areaToText.toTextCity(arr[j].rID);
                    this.$set(arr[j], "city", data);
                    searchArr.push(arr[j]);
                }
                console.log("searchArr", searchArr);
                this.firstLevelList = searchArr;
                for (let t = 0; t < searchArr.length; t++) {
                    if (t < 50 && searchArr.length > 50) {
                        this.planList.push(searchArr[t]);
                    } else if (searchArr.length < 50) {
                        this.planList = searchArr;
                        this.firstLevelListIndex = searchArr.length;
                        break;
                    } else {
                        this.firstLevelListIndex = t;
                        this.currentPlan = this.planList;
                        console.log(
                            "firstLevelListIndex",
                            this.firstLevelListIndex
                        );
                        break;
                    }
                }
                this.currentPlan = this.planList;
                console.log("搜索完成", this.currentPlan);
                this.tableHeadCity_area();
                if (!searchArr.length) {
                    Message.warning({
                        message: "查询数据为空",
                        duration: 1000
                    });
                } else {
                    this.loadScroll = true;
                }
            } else {
                this.loading = false;
                this.loadScroll = false;
            }
            this.loading = false;
        },
        // 一级搜索后的滚动加载
        firstLevelAdd() {
            let LevelArr = [];
            let LevelList = this.firstLevelList;
            let LevelIndex = this.firstLevelListIndex;
            console.log("this.firstLevelList", this.firstLevelList);
            console.log("一级搜索", LevelIndex);
            for (let i = LevelIndex; i < LevelList.length; i++) {
                LevelArr.push(LevelList[i]);
                if (
                    i >= LevelIndex + 49 &&
                    LevelList.length > 49 + LevelIndex
                ) {
                    console.log("LevelArr", LevelArr);
                    for (let j = 0; j < LevelArr.length; j++) {
                        this.planList.push(LevelArr[j]);
                    }
                    console.log("planList", this.planList);
                    this.firstLevelListIndex = i + 1;
                    break;
                } else {
                    if (i >= LevelList.length - 1) {
                        console.log("LevelArr", LevelArr);
                        let c = this.planList.concat(LevelArr);
                        this.planList = c;
                        console.log("planList", this.planList);
                        this.firstLevelListIndex = i + 1;
                    }
                }
            }
            this.currentPlan = this.planList;
        },
        // 搜索按钮
        searchFun() {
            this.planList = [];
            this.currentPlan = [];
            this.loading = true;
            this.loadScroll = true;
            this.searchListFun();
        }
    }
};
</script>

<style scoped>
/deep/ .el-table-filter {
    height: 400px !important;
    overflow-y: auto !important;
}
a {
    color: #108ee9;
}

.input-with-select /deep/ .el-input__inner {
    font-size: 14px;
    /*padding: 10px 10px;*/
    height: 34px;
    line-height: 34px;
    /*vertical-align: middle;*/
}

/deep/ .el-table th > .cell.highlight {
    color: #409eff !important;
}

/deep/ .el-tooltip__popper.is-light {
    color: #666666 !important;
    border: 1px solid #666666 !important;
}

/deep/ .el-table-filter {
    height: 180px;
}

/*面包屑导航*/
.ad_mediaDetail_wrap {
    position: relative;
    /*height: 768px;*/
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

.ad_mediaMana_nav p a:nth-of-type(1) {
    color: #999;
}

/*媒体列表*/
.mediaList_wrap {
    width: 1246px;
    background: #ffffff;
    border: 1px solid #e6e7e9;
    margin: 0 auto;
    /*margin-bottom: 26px;*/
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
    padding: 18px 18px 31px 18px;
}

/*下拉搜索框*/
/deep/ .el-input-group__prepend {
    width: 64px;
    position: relative;
    background-color: #fff;
    /*   border-top-right-radius: 4px;
       border-bottom-right-radius: 4px;*/
}

/deep/ .el-input-group--prepend .el-select {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
}

.el-input {
    height: 34px !important;
    border-radius: 4px;
}

/deep/ .el-input__inner {
    height: 34px;
    /*line-height: 34px;*/
    /*position: relative;
    top: -1px;*/
}

.el-button {
    width: 76px;
    height: 34px;
    text-align: center;
    /*line-height: 34px;*/
    padding: 0;
    margin-left: 2px;
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
    /* overflow-x: hidden; */
    text-overflow: ellipsis;
}

/deep/ .el-table td .cell {
    /*display: flex;*/
    height: 30px;
    line-height: 30px;
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

/deep/ .el-table__row .cell span {
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

/deep/ .el-table__row td:nth-child(9) .cell,
/deep/ .has-gutter th:nth-child(9) .cell {
    text-align: right !important;
}

/deep/ .el-table__row td:nth-child(1) .cell {
    width: 155px;
}

/deep/ .el-table__row td:nth-child(5) .cell span {
    width: 126px;
}

/deep/ .el-table__row td:nth-child(7) .cell span {
    width: 96px;
}

/deep/ .el-table__row td:nth-child(8) .cell span {
    width: 156px;
}

/*筛选*/
/deep/ .el-table__column-filter-trigger {
    margin-left: 10px;
    line-height: 0px;
    overflow-y: hidden;
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

/deep/ .el-dropdown-menu__item {
    width: 45px !important;
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

/*/deep/ .el-button-group .el-button:not(:last-child){*/
/*margin-top: -1px;*/
/*}*/

/deep/ .el-button-group button {
    float: left !important;
}

/deep/ .el-dropdown .el-button-group .el-button:last-child {
    width: 30px;
    position: relative;
    top: 0px;
}

/deep/ .popper__arrow {
    display: none;
}

/*提示框*/
/deep/ .el-message {
    top: 65px;
    padding: 7px 15px 7px 20px;
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

.mediaList_handel span {
    float: left !important;
    margin-left: 2px !important;
}

/*1440*/
@media all and (min-width: 1420px) {
    .ad_mediaDetail_nav p {
        padding-left: 60px;
    }

    .mediaList_wrap {
        width: 1321.3px !important;
        /*margin-bottom: 165px !important;*/
    }

    .mediaList_wrap .mediaList_container .table_wrap {
        width: 1284px;
    }
}

/*1920*/
@media all and (min-width: 1900px) {
    .mediaList_wrap {
        width: 1800px !important;
        /*margin-bottom: 176px !important;*/
    }

    .mediaList_wrap .mediaList_container .table_wrap {
        width: 1764px;
    }

    /deep/ .el-table__row td:nth-child(1) .cell {
        width: 202px;
    }

    /deep/ .el-table__row td:nth-child(5) .cell span {
        width: 195px;
    }

    /deep/ .el-table__row td:nth-child(7) .cell span {
        width: 155px;
    }

    /deep/ .el-table__row td:nth-child(8) .cell span {
        width: 235px;
    }
}
</style>
