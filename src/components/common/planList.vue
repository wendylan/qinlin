<template>
    <div class="ad_mediaDetail_wrap clearfix">
        <div class="ad_mediaDetail_nav ">
            <p class="clearfix">
                <a href="#" style="color: #999">方案管理</a>
            </p>
        </div>
        <div class="mediaList_wrap">
            <div class="mediaList_head">
                <h2>方案列表</h2>
            </div>
            <div class="mediaList_container">
                <el-row>
                    <div class="mediaList_handel">
                        <span>
                            <div style="display:inline-block">
                                <el-input placeholder="请输入内容" v-model="keyword" class="input-with-select" @change="initData()">
                                    <el-select v-model="select" slot="prepend" placeholder="请选择">
                                        <el-option label="方案名称" value="1"></el-option>
                                        <el-option label="客户名称" value="2"></el-option>
                                        <el-option label="品牌名称" value="3"></el-option>
                                    </el-select>
                                </el-input>
                            </div>
                        </span>
                        <span>
                            <div class="block">
                                <el-date-picker class="input-with-select" v-model="rangeDate" type="daterange" range-separator="-" format="yyyy-MM-dd" value-format="yyyy-MM-dd" start-placeholder="创建日期" end-placeholder="创建日期" @change="initData()">
                                </el-date-picker>
                            </div>
                        </span>
                        <span>
                            <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
                        </span>
                        <span>
                            <el-button plain v-if="showNewBtn" @click="addOne">新建</el-button>
                        </span>
                    </div>
                </el-row>
                <div class="table_wrap">
                    <el-table border :data="currentPlan" style="width: 100%" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
                        <el-table-column label="方案名称" min-width="14.9%">
                            <template slot-scope="scope">
                                <el-tooltip class="item" effect="dark" :content="scope.row.apName" placement="bottom">
                                    <a href="javascript:void(0);" @click="ToDetail(scope.row.apID)">{{scope.row.apName}}</a>
                                </el-tooltip>
                            </template>
                        </el-table-column>
                        <el-table-column prop="cName" label="客户名称" min-width="12.6%">
                            <template slot-scope="scope">
                                <el-tooltip class="item" effect="dark" :content="scope.row.cName" placement="bottom">
                                    <span title="">{{scope.row.cName}}</span>
                                </el-tooltip>
                            </template>
                        </el-table-column>
                        <el-table-column prop="bTitle" label="品牌名称" min-width="6.6%">
                            <template slot-scope="scope">
                                <el-tooltip class="item" effect="dark" :content="scope.row.bTitle" placement="bottom">
                                    <span>{{scope.row.bTitle}}</span>
                                </el-tooltip>
                            </template>
                        </el-table-column>
                        <el-table-column label="方案价格" sortable :sort-method="sortPrice" class="tar" min-width="8.3%">
                            <template slot-scope="scope">
                                <el-tooltip class="item" effect="dark" :content="scope.row.apTotal?priceFormat(scope.row.apTotal/100):0" placement="bottom">
                                    <span>&yen; {{scope.row.apTotal?priceFormat(scope.row.apTotal/100):0}}</span>
                                </el-tooltip>
                            </template>
                        </el-table-column>
                        <el-table-column prop="realName" label="所有人" min-width="6.1%">
                        </el-table-column>
                        <el-table-column label="投放城市(点位面数,排期)" min-width="22.6%">
                            <template slot-scope="scope">
                                <p v-for="(item, index) of scope.row.cityArea" :key="index">{{setComma(item.text)}}
                                    <!-- <i v-if="item.IsLock" class="fa fa-lock fa-lg" style="color:#999;"></i>
                                    <i v-else class="fa fa-unlock fa-lg" style="color:#999;"></i> -->
                                </p>
                                <!-- <p v-for="(item, index) of scope.row.cityArea" :key="index">{{setComma(item)}}</p> -->
                            </template>
                        </el-table-column>
                        <el-table-column label="创建日期" min-width="8.3%" sortable :sort-method="sortData">
                            <template slot-scope="scope">
                                <span>{{formatTime(scope.row.apcTime)}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column class="tac" prop="apState" label="状态" min-width="6.1%" :filters="[
							{ text: '已完成', value: 0 },
							{ text: '进行中', value: 1 },
							{ text: '未投放', value: 2 },
							{ text: '投放中', value: 3 },
							{ text: '强制结束', value: 5 }
						]" :filter-method="filterStatus" :filter-multiple="false">
                            <template slot-scope="scope">
                                <span>{{ stateToText(scope.row.apState) }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" min-width="8.4%" v-if="!(role=='OP')">
                            <template slot-scope="scope">
                                <el-dropdown size="small" split-button trigger="click" placement="bottom-start">操作
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item @click.native.prevent="preload(scope.row)" :disabled="isDisable||(scope.row.apState!=1)">预锁
                                        </el-dropdown-item>
                                        <el-dropdown-item @click.native.prevent="release(scope.row)" :disabled="isDisable||(scope.row.apState!=1)">发布
                                        </el-dropdown-item>
                                        <el-dropdown-item @click.native.prevent="clearLock(scope.row)" :disabled="isDisable||(scope.row.apState!=1)">解除预锁
                                        </el-dropdown-item>
                                        <!-- <el-dropdown-item @click="deleteOne(scope.row)" :disabled="scope.row.apState!=1">删除
                                        </el-dropdown-item>-->
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>

                <el-dialog :title="isLock?'请选择预锁城市':'请选择解锁城市'" :visible.sync="dialogVisible" width="30%" center>
                    <el-checkbox-group v-model="cityChoose">
                        <el-checkbox v-if="isLock" :label="item.rName" v-for="item of cityList" :key="item.value" border :disabled="item.IsLock"></el-checkbox>
                        <el-checkbox v-if="!isLock" :label="item.rName" v-for="item of cityList" :key="item.value" border :disabled="!item.IsLock"></el-checkbox>
                    </el-checkbox-group>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="cancelLock">取 消</el-button>
                        <el-button type="primary" @click="confirmLock">确 定</el-button>
                    </span>
                </el-dialog>
            </div>
        </div>
    </div>
</template>

<script>
import api from "../../api/api.js";
// 城市区域变成中文
import areaToText from "../../commonFun/areaToText_new.js";
// 价格格式化
import commaFormat from "../../commonFun/commaFormat.js";
// 筛选过滤
import filterFormat from "../../commonFun/filterTableData.js";
// 时间格式化
import dateFormat from "../../commonFun/timeFormat.js";
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
    Option,
    Loading
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
            Ctrlloading: false,
            // 登录信息、
            sessionData: {},
            // 登录者角色
            role: "",
            //   判断是否有发布，预锁解锁等功能
            isDisable: true,
            //加载中
            loading: true,
            // loading: false,
            Info: {},
            // 解锁还是预锁
            isLock: false,
            // 预锁弹出框
            dialogVisible: false,
            // 选择要预锁的城市
            cityChoose: [],
            // 预锁的城市列表
            cityList: [],
            // 时间范围
            rangeDate: "",
            // 关键字
            keyword: "",
            // 根据角色判断是否显示新建按钮
            showNewBtn: true,
            // 搜索的select框
            select: "1",
            // 表格数据
            currentPlan: [],
            //所有数据
            planList: []
        };
    },
    created() {
        this.getSessionData();
        this.getUID();
        this.getPlanListData();
        this.getRole();
    },
    methods: {
        getSessionData() {
            this.sessionData = JSON.parse(
                sessionStorage.getItem("session_data")
            );
        },
        // 面后面添加逗号
        setComma(value) {
            if (value) {
                let index = value.indexOf("面");
                let arr = value.split("");
                arr.splice(index + 1, 0, ",");
                return arr.join("");
            }
        },
        getUID() {
            let uid = this.sessionData.uID;
            this.Info = {
                uid: uid,
                apid: ""
            };
        },
        // 判断角色是否有新建按钮(媒介和销售有)
        getRole() {
            let role = this.sessionData.uType;
            let uWhoArr = this.sessionData.uWho;
            this.role = role;
            console.log(role);
            if (role == "MD") {
                this.isDisable = false;
            }
            if (role != "BD" && role != "MD") {
                this.showNewBtn = false;
            }
            if (role == "BD" || role == "SM") {
                this.isDisable = true;
            }
        },
        // 获取方案列表初始数据
        getPlanListData() {
            let uid = this.sessionData.uID;
            api
                .getApi("./GetFangan", { uid: uid })
                .then(res => {
                    console.log(res.data);
                    let info = res.data;
                    if (!info.SysCode) {
                        this.planList = info.reverse();

                        for (let item of this.planList) {
                            if (item.rIDs) {
                                let arr = item.rIDs.split(",");
                                let dataArr = [];
                                for (let i = 0; i < arr.length; i++) {
                                    let text = arr[i].substr(
                                        0,
                                        arr[i].indexOf(")") + 1
                                    );
                                    let pdid = arr[i].substr(
                                        arr[i].indexOf(")") + 1
                                    );
                                    dataArr.push({
                                        text: text,
                                        pdID: pdid
                                    });
                                }

                                item.cityArea = dataArr;
                            }
                        }

                        this.loading = false;
                        this.currentPlan = this.planList;
                    }else if(info.SysCode ==100302){
                        Message.warning("登录超时,请重新登录");
                        this.$router.push("/login");
                    } else {
                        Message.warning(info.MSG);
                    }
                })
                .catch(res => {
                    console.log(res);
                });
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
        // 价格加上逗号
        priceFormat(price) {
            return commaFormat.init(price);
        },
        // 价格排序
        sortPrice(a, b) {
            return a.apTotal - b.apTotal;
        },
        //日期排序
        sortData(a, b) {
            return a.apcTime < b.apcTime;
        },
        // 新建方案
        addOne() {
            this.$router.push("./createPlan");
        },
        // 当搜索框为空的时候进行重置显示
        initData() {
            if (!this.rangeDate && !this.keyword) {
                this.currentPlan = JSON.parse(JSON.stringify(this.planList));
            }
        },
        // 搜索方案
        search() {
            let range = this.rangeDate;
            let arr = [];
            let select = this.select;
            let keyword = this.keyword;
            console.log(select, range);
            if (range || this.keyword) {
                for (let data of this.planList) {
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
                this.currentPlan = arr;
                if (!arr.length) {
                    Message.warning({
                        message: "查询数据为空",
                        duration: 1500
                    });
                }
                // console.log(arr);
                return;
            }
            this.currentPlan = JSON.parse(JSON.stringify(this.planList));
        },
        //筛选
        filterStatus(value, row) {
            //不匹配的数据
            let sum = 0;

            for (let data of this.planList) {
                if (data.apState != value) {
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
            return row.apState === value;
        },
        // 删除
        deleteOne(row) {
            console.log(row);
        },
        // 随机生成合同编号编码格式： 合同编码固定[QC],日期[20180328],省份[44],城市[01],等几份合同[001](随机数)
        getContractNo(rid) {
            let date = new Date();
            let result = "QC";
            result = result + dateFormat.toDate(date, "");
            result = result + rid.toString().substring(0, 4);
            result = result + "00" + Math.round(Math.random() * 10);
            // console.log(result);
            return result;
        },
        // 发布
        release(row) {
            // console.log(row);

            // 真实数据
            this.Info.apid = row.apID;
            let info = this.Info;
            api.getApi('/GetAPD', info).then(res =>{
                console.log(res.data);
                if(!res.data.SysCode){
                    let dataArr = res.data;
                    let rIDArr = '';
                    let uWhoArr = this.sessionData.uWho;
                    let isRelease = false;
                    for(let data of dataArr){
                        rIDArr = data.rID + ',' + rIDArr;
                    }
                    rIDArr = rIDArr.substring(0, rIDArr.length-1).split(',').sort(function(a, b){
                        return a-b;
                    }).join(',');
                    console.log('rIDArr----------', rIDArr);
                    if(uWhoArr == '0'){
                        isRelease = true;
                    }else{
                        // 数组排序,对uWho进行小到大排
                        uWhoArr = uWhoArr.split(',').sort(function(a, b){
                            return a-b;
                        }).join(',');
                        console.log('uWhoArr-------------', uWhoArr);
                        if(uWhoArr.includes(rIDArr)){
                            console.log('uWhoArr-------------', uWhoArr);
                            isRelease = true;
                        }
                        console.log('isrelease-----------', isRelease);
                    }
                    if(isRelease){
                        // uid         int【必填】     当前账户UserID
                        // apid        int             公司对应方案apID
                        api
                            .getApi("/GetFanganInfo", info)
                            .then(res => {
                                console.log(res.data);
                                if (!res.data.SysCode) {
                                    let text = res.data;
                                    let QCinfo = this.getContractNo(text.rID);
                                    console.log(QCinfo);
                                    MessageBox.prompt("合同编号:", {
                                        confirmButtonText: "是",
                                        cancelButtonText: "否",
                                        inputPattern: /^[^\u4e00-\u9fa5]{0,}$/,
                                        inputErrorMessage: "只能输入数字,字母,字符",
                                        inputValue: QCinfo
                                    })
                                        .then(() => {
                                            console.log("rowData-----------", row);
                                            console.log("row.cityarea", row.cityArea);
                                            let sumNotLock = 0;
                                            let sumLock = 0;
                                            let cityContent = row.cityArea;
                                            for (let i = 0; i < cityContent.length; i++) {
                                                api
                                                    .postApi("/CheckLock", {
                                                        uid: this.Info.uid,
                                                        pdid: cityContent[i].pdID
                                                    })
                                                    .then(res => {
                                                        if (!res.data.IsLock) {
                                                            sumNotLock++;
                                                        }else{
                                                            sumLock++;
                                                        }
                                                        if (
                                                            sumNotLock >= cityContent.length
                                                        ) {
                                                            // this.Ctrlloading = Loading.service(
                                                            //     {
                                                            //         text: "请耐心等待...",
                                                            //         spinner:
                                                            //             "el-icon-loading",
                                                            //         background:
                                                            //             "rgba(0, 0, 0, 0.7)"
                                                            //     }
                                                            // );
                                                            // 保存合同编号
                                                            this.saveContractNo(QCinfo);
                                                            // 组合数据并发布
                                                            this.getDataOfSetPrice(info,"R");
                                                            
                                                        } else {
                                                            if (i >= cityContent.length - 1) {
                                                                if(sumLock){
                                                                    Message.warning("该方案被预锁,请先解除预锁");
                                                                }
                                                            }
                                                        }

                                                        // if (i >= cityContent.length - 1) {
                                                        //     if (sumLock) {
                                                        //         Message.warning(
                                                        //             "该方案被预锁,请先解除预锁"
                                                        //         );
                                                        //     } else {
                                                        //         this.Ctrlloading = Loading.service({ text: '请耐心等待...',spinner: 'el-icon-loading',background: 'rgba(0, 0, 0, 0.7)'});
                                                        //         // 保存合同编号
                                                        //         this.saveContractNo(QCinfo);
                                                        //         // 组合数据并发布
                                                        //         this.getDataOfSetPrice(
                                                        //             info,
                                                        //             "R"
                                                        //         );
                                                        //     }
                                                        // }
                                                    })
                                                    .catch(res => {
                                                        console.log(res);
                                                    });
                                            }
                                        })
                                        .catch(() => {
                                            Message({
                                                type: "info",
                                                message: "已取消操作"
                                            });
                                        });
                                } else if(res.data.SysCode == 100302){
                                    Message.warning("登录超时,请重新登录");
                                    this.$router.push("/login");
                                } else {
                                    Message.warning(res.data.MSG);
                                }
                            })
                            .catch(res => {
                                console.log(res);
                            });
                    }else{
                        Message.warning('您没有权限发布该方案');
                    }

                } else if(res.data.SysCode == 100302){
                    Message.warning("登录超时,请重新登录");
                    this.$router.push("/login");
                } else {
                    Message.warning(res.data.MSG);
                }
            }).catch(res=>{
                console.log(res);
            });

        },
        // 保存合同编号
        saveContractNo(contractNo) {
            // uid         int【必填】     当前账户UserID
            // apid        int【必填】     方案apID
            // qc          String【必填】  方案合同编号
            let info = this.Info;
            info.qc = contractNo;
            api
                .postApi("/SetAdPlan", info)
                .then(res => {
                    console.log(res);
                     if(res.data.SysCode == 100302){
                        Message.warning("登录超时,请重新登录");
                        this.$router.push("/login");
                    }
                })
                .catch(res => {
                    console.log(res);
                });
        },
        // 发布方案(优化后的接口)
        releaseFangan(info){
            info.act = 'R';
            api.postApi('/SetFangan', info).then(res =>{
                console.log(res.data);
                if(res.data.SysCode == 300200){
                    this.Ctrlloading.close();
                    Message.success(res.data.MSG);
                    for (let data of this.planList) {
                        if (data.apID == this.Info.apid) {
                            this.$set(data, "apState", 2);
                            break;
                        }
                    }
                }else if(res.data.length){
                    // 存在点位被占，是否立即去方案详情修改？
                    MessageBox.confirm(
                        `存在点位被占，是否修改方案？`,
                        "提示",
                        {
                            confirmButtonText: "确定",
                            cancelButtonText: "取消",
                            type: "warning"
                        }
                    )
                        .then(() => {
                            this.ToEdit(this.Info.apid);
                            this.Ctrlloading.close();
                        })
                        .catch(() => {
                            Message.info("已取消操作");
                            this.Ctrlloading.close();
                        });
                }
            }).catch(res =>{
                console.log(res);
            });
        },
        // 发布需要请求的数据组合
        getDataOfSetPrice(info, act, citySelect = []) {
            // 获取pdid
            api
                .getApi("/GetAPD", info)
                .then(res => {
                    console.log(res.data);
                    let pdidArr = res.data;
                    // 获取asid列表GetADB
                    api
                        .getApi("/GetADB", info)
                        .then(res => {
                            console.log(res.data);
                            let asidArr = res.data;
                            let arr = this.initContruct(
                                asidArr,
                                pdidArr,
                                info.uid,
                                act
                            );
                            if (act == "R") {
                                // 循环发布
                                if(arr.length){
                                    this.ctrlFangan(arr, act);
                                }else{
                                    Message.warning('没有符合的数据进行发布');
                                }
                            } else {
                                // 筛选所选城市的数据
                                let result = [];
                                for (let arrData of arr) {
                                    for (let city of citySelect) {
                                        let arrRID = arrData.rID.toString().substring(0, 4);
                                        let cityRID = city.value.toString().substring(0, 4);
                                        if (arrRID == cityRID) {
                                            result.push(arrData);
                                        }
                                    }
                                }
                                console.log("resulttelajt", result);
                                if(result.length){
                                    this.ctrlFangan(result, act,  citySelect);
                                }else{
                                    Message.warning('没有符合的数据进行预锁');
                                }
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
        // 组装数据不同点位不同排期
        initContruct(asidArr, pdidArr, uid, act) {
            // 组装数据
            let result = [];
            if (!result.length) {
                let obj = {
                    uid: uid,
                    act: act,
                    pdid: "",
                    rID: asidArr[0].rID,
                    ds: dateFormat.toDate(asidArr[0].pbStar),
                    de: dateFormat.toDate(asidArr[0].pbEnd),
                    asidlist: ""
                };
                result.push(obj);
            }
            // 组合asid
            for (let res of result) {
                let asIDs = "";
                for (let init of asidArr) {
                    let resRID = res.rID.toString().substring(0, 4);
                    let dataRID = init.rID.toString().substring(0, 4);
                    let start = dateFormat.toDate(init.pbStar);
                    let end = dateFormat.toDate(init.pbEnd);
                    let resObj = {
                        uid: uid,
                        act: act,
                        pdid: "",
                        rID: init.rID,
                        ds: start,
                        de: end,
                        asidlist: ""
                    };
                    if (resRID == dataRID && res.ds == start && res.de == end) {
                        if (asIDs === "") {
                            asIDs = init.asID.toString();
                        } else {
                            asIDs = asIDs + "," + init.asID;
                        }
                    } else {
                        let door = 1;
                        for (let data of result) {
                            let dataR = data.rID.toString().substring(0, 4);
                            let initR = init.rID.toString().substring(0, 4);
                            if (
                                dataR == initR &&
                                data.ds == start &&
                                data.de == end
                            ) {
                                door = 0;
                            }
                        }
                        if (door) {
                            result.push(resObj);
                        }
                    }
                }
                res.asidlist = asIDs;
                console.log("asidS", asIDs);
            }
            console.log("result-------------", result);

            // 组合pdid
            for (let resData of result) {
                for (let pdData of pdidArr) {
                    let pdDataRID = pdData.rID.toString().substring(0, 4);
                    let arrRID = resData.rID.toString().substring(0, 4);
                    if (
                        pdDataRID == arrRID &&
                        resData.ds >= pdData.pdStar &&
                        resData.de <= pdData.pdEnd
                    ) {
                        resData.pdid = pdData.pdID;
                        break;
                    }
                }
            }
            console.log("resultArr", result);
            return result;
        },
        // 循环发布、预锁
        ctrlFangan(arr, act, citySelect = []) {
            console.log("----------arr-------------", arr);
            // uid         int【必填】         当前账户UserID
            // ds          String【必填】      广告开始投放日期
            // de          String【必填】      广告投放结束日期
            // asidlist    String【必填】      选择的广告点位asID组合，以","逗号组合
            let holdSum = 0;
            let holdNoSum = 0;

            this.Ctrlloading = Loading.service(
                {
                    text: "请耐心等待...",
                    spinner: "el-icon-loading",
                    background: "rgba(0, 0, 0, 0.7)"
                }
            );
            for (let i = 0; i < arr.length; i++) {
                let obj = {
                    uid: arr[i].uid,
                    ds: arr[i].ds,
                    de: arr[i].de,
                    asidlist: arr[i].asidlist
                };
                api.postApi("/CheckPD", obj).then(res => {
                    console.log("CheckPD-----------", res.data);
                    if (res.data.length) {
                        holdSum++;
                    }else{
                        holdNoSum++;
                    }

                    if(holdNoSum >= arr.length){
                        // uid         int【必填】         当前账户UserID
                        // act         String【必填】      事务类型：L锁点；R发布
                        // pdid        int【必填】         选择方案投放pdID
                        // ds          String【必填】      广告开始投放日期
                        // de          String【必填】      广告投放结束日期
                        // asidlist    String【必填】      选择的广告点位asID组合，以","逗号组合
                        // 发布接口
                        if(act == 'R'){
                            this.releaseFangan(this.Info);
                        }else{
                            this.SetLock(citySelect);
                        }
                        // for (let i = 0; i < arr.length; i++) {
                        //     api
                        //         .postApi("/CtrlFangan", arr[i])
                        //         .then(res => {
                        //             console.log(res.data);
                        //             Message.success(res.data.MSG);
                        //             if (act == "R") {
                        //                 if (i >= arr.length - 1) {
                        //                     for (let data of this
                        //                         .planList) {
                        //                         if (
                        //                             data.apID ==
                        //                             this.Info.apid
                        //                         ) {
                        //                             this.$set(
                        //                                 data,
                        //                                 "apState",
                        //                                 2
                        //                             );
                        //                             break;
                        //                         }
                        //                     }
                        //                 }
                        //             }
                        //             this.Ctrlloading.close();
                        //         })
                        //         .catch(res => {
                        //             console.log(res);
                        //             this.Ctrlloading.close();
                        //         });
                        // }
                    }else{
                        if (i >= arr.length - 1) {
                            if (holdSum) {
                                // 存在点位被占，是否立即去方案详情修改？
                                MessageBox.confirm(
                                    `存在点位被占，是否修改方案？`,
                                    "提示",
                                    {
                                        confirmButtonText: "确定",
                                        cancelButtonText: "取消",
                                        type: "warning"
                                    }
                                )
                                    .then(() => {
                                        this.ToEdit(this.Info.apid);
                                        this.Ctrlloading.close();
                                    })
                                    .catch(() => {
                                        Message.info("已取消操作");
                                        this.Ctrlloading.close();
                                    });
                            }
                        }
                    }

                    // if (i >= arr.length - 1) {
                    //     if (holdSum) {
                    //         // 存在点位被占，是否立即去方案详情修改？
                    //         MessageBox.confirm(
                    //             `存在点位被占，是否修改方案？`,
                    //             "提示",
                    //             {
                    //                 confirmButtonText: "确定",
                    //                 cancelButtonText: "取消",
                    //                 type: "warning"
                    //             }
                    //         )
                    //             .then(() => {
                    //                 this.ToEdit(this.Info.apid);
                    //                 this.Ctrlloading.close();
                    //             })
                    //             .catch(() => {
                    //                 Message.info("已取消操作");
                    //                 this.Ctrlloading.close();
                    //             });
                    //     } else {
                    //         // uid         int【必填】         当前账户UserID
                    //         // act         String【必填】      事务类型：L锁点；R发布
                    //         // pdid        int【必填】         选择方案投放pdID
                    //         // ds          String【必填】      广告开始投放日期
                    //         // de          String【必填】      广告投放结束日期
                    //         // asidlist    String【必填】      选择的广告点位asID组合，以","逗号组合
                    //         // 发布接口
                    //         for (let i = 0; i < arr.length; i++) {
                    //             api
                    //                 .postApi("/CtrlFangan", arr[i])
                    //                 .then(res => {
                    //                     console.log(res.data);
                    //                     Message.success(res.data.MSG);
                    //                     if (act == "R") {
                    //                         if (i >= arr.length - 1) {
                    //                             for (let data of this
                    //                                 .planList) {
                    //                                 if (
                    //                                     data.apID ==
                    //                                     this.Info.apid
                    //                                 ) {
                    //                                     this.$set(
                    //                                         data,
                    //                                         "apState",
                    //                                         2
                    //                                     );
                    //                                     break;
                    //                                 }
                    //                             }
                    //                             this.Ctrlloading.close();
                    //                         }
                    //                     }
                    //                 })
                    //                 .catch(res => {
                    //                     console.log(res);
                    //                     this.Ctrlloading.close();
                    //                 });
                    //         }
                    //     }
                    // }
                });
            }
        },
        // 跳转到详情页面
        ToDetail(apid) {
            console.log(apid);
            sessionStorage.setItem("plan_apid", apid);
            this.$router.push("./planDetail");
        },
        // 跳转到编辑页面
        ToEdit(apid) {
            console.log(apid);
            sessionStorage.setItem("plan_apid", apid);
            this.$router.push("./editPlan");
        },
        // 获取城市
        getSelLockCity() {
            let info = this.Info;
            // 获取城市
            api
                .getApi("/GetAPD", info)
                .then(res => {
                    console.log(res.data);
                    if(!res.data.SysCode){
                        let pdidArr = res.data;
                        let uWhoArr = JSON.parse(
                            sessionStorage.getItem("session_data")
                        ).uWho;
                        // 媒介权限大于销售的才能操作方案对应的城市,也就是说：当一个方案有账号权限外的城市不能进行操作，需要进行剔除
                        let resultArr = [];
                        if (uWhoArr == 0) {
                            resultArr = pdidArr;
                        } else {
                            for (let data of pdidArr) {
                                if (uWhoArr.indexOf(data.rID) != -1) {
                                    resultArr.push(data);
                                }
                            }
                        }
                        console.log("resultArr----uwho-----", resultArr);

                        for (let data of resultArr) {
                            data.IsLock = true;
                        }
                        let cityCode = filterFormat(
                            resultArr,
                            "rID",
                            "pdID",
                            "IsLock"
                        );
                        for (let item of cityCode) {
                            item.rName = areaToText.toTextCity(item.value);
                        }
                        this.cityList = cityCode;
                        // 获取是否锁住
                        this.getIsLock();
                    }else if(res.data.SysCode ==100302){
                        Message.warning('登录超时,请重新登录');
                        this.$router.push('/login');
                    }else{
                        Message.warning(res.data.MSG);
                    }
                })
                .catch(res => {
                    console.log(res);
                });
        },
        // 获取是否锁住
        getIsLock() {
            // 判断是否锁住状态,默认置灰状态
            for (let city of this.cityList) {
                api
                    .postApi("/CheckLock", {
                        uid: this.Info.uid,
                        pdid: city.pdID
                    })
                    .then(res => {
                        this.$set(city, "IsLock", res.data.IsLock);
                    })
                    .catch(res => {
                        console.log(res);
                    });
            }
        },
        //预锁
        preload(row) {
            this.cityChoose = [];
            this.isLock = true;
            this.dialogVisible = true;
            // let uid = this.sessionData.uID;
            // let apid = row.apID;
            // let info = {
            // 	uid: uid,
            // 	apid: apid
            // };
            this.Info.apid = row.apID;
            this.getSelLockCity();
        },
        // 解除预锁
        clearLock(row) {
            this.cityChoose = [];
            this.isLock = false;
            this.dialogVisible = true;
            this.Info.apid = row.apID;
            this.getSelLockCity();
        },
        // 解锁接口
        delLock(pdidArr) {
            // uid         int【必填】     当前账户UserID
            // pdid        int【必填】     方案具体投放pdID
            // api.postApi('/ClFangan', info).then(res =>{
            // 	console.log(res.data);
            // }).catch(res =>{
            // 	console.log(res);
            // });
            let uid = this.Info.uid;

            // 解锁接口
            for (let i = 0; i < pdidArr.length; i++) {
                let pdinfo = {
                    uid: uid,
                    pdid: pdidArr[i]
                };
                api
                    .postApi("/ClFangan", pdinfo)
                    .then(res => {
                        console.log(res.data);
                        Message.success(res.data.MSG);
                    })
                    .catch(res => {
                        console.log(res);
                    });
                // api
                //     .getApi("/CheckLock", pdinfo)
                //     .then(res => {
                //         if (res.data.IsLock) {
                //             api
                //                 .postApi("/ClFangan", pdinfo)
                //                 .then(res => {
                //                     console.log(res.data);

                //                     Message.success(res.data.MSG);
                //                     // if (i >= pdidArr.length - 1) {
                //                     //     location.reload();
                //                     // }
                //                 })
                //                 .catch(res => {
                //                     console.log(res);
                //                 });
                //         } else {
                //             Message.warning("该城市无锁住的点位,无需解锁");
                //         }
                //     })
                //     .catch(res => {
                //         console.log(res);
                //     });
            }
        },
        cancelLock() {
            this.dialogVisible = false;
            Message.info("已取消操作");
        },
        // 确定预锁
        confirmLock() {
            console.log(this.cityChoose);
            if (this.isLock) {
                let arr = [];
                for (let select of this.cityChoose) {
                    for (let data of this.cityList) {
                        if (data.rName == select) {
                            arr.push(data);
                            break;
                        }
                    }
                }
                // 原来接口
                this.getDataOfSetPrice(this.Info, "L", arr);
                // this.SetLock(arr);
                console.log("test", arr);
            } else {
                let pdidArr = [];
                for (let city of this.cityChoose) {
                    for (let data of this.cityList) {
                        if (data.rName == city) {
                            pdidArr.push(data.pdID);
                        }
                    }
                }
                this.delLock(pdidArr);
            }
            this.dialogVisible = false;
        },
        // 预锁
        SetLock(arr){
            for(let data of arr){
                let info = {
                    uid: this.Info.uid,
                    act: 'L',
                    pdid: data.pdID
                };
                // uid         int【必填】         当前账户UserID
                // act         String【必填】      事务类型：L锁点；R发布；E强制停止；
                // apid        int【二选一】            选择方案投放apID
                // pdid        int【二选一】            选择方案投放pdID(该参数多用于锁点)
                api.postApi('/SetFangan', info).then(res =>{
                    console.log(res.data);
                    if(res.data.SysCode == 300200 ){
                        this.Ctrlloading.close();
                        Message.success(res.data.MSG);
                    }else{
                        this.Ctrlloading.close();
                        Message.warning(res.data.MSG);
                    }
                }).catch(res =>{
                    console.log(res);
                    this.Ctrlloading.close();
                });
            }
        },
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

/*面包屑导航*/
.ad_mediaDetail_wrap {
    position: relative;
}

.ad_mediaDetail_nav p {
    padding-left: 58px;
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

/deep/ .el-dialog__body {
    text-align: center;
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

/deep/ .el-button {
    width: 76px;
    height: 34px;
    text-align: center;
    padding: 0;
    position: relative;
    /*top: 1px;*/
    left: 0;
    margin-left: 2px;
}

/deep/ .el-button + .el-button {
    margin-left: 0;
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

/deep/ .el-date-editor .el-range-separator {
    font-size: 14px;
    /*height: 34px;*/
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

/deep/ .el-range-editor .el-range-input {
    line-height: 20px;
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

/deep/ .el-table td .cell {
    display: flex;
    flex-direction: column;
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

/deep/ thead th:nth-child(4) .cell {
    text-align: right !important;
}

/deep/ .el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: #ecf5ff;
}

/deep/ .el-table__column-filter-trigger {
    display: inline-block;
    line-height: 15px;
    cursor: pointer;
    overflow-y: hidden;
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

/deep/ .el-table-filter__list-item {
    color: rgb(102, 102, 102);
}

/*超出省略*/
/deep/ .el-table .cell {
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

/deep/ .el-table .cell span {
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

/deep/ .el-table .cell a {
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

/deep/ .el-table__row td:nth-child(4) {
    text-align: right;
}

/deep/ .el-table__row td:nth-child(4) .cell span {
    width: 90px;
}

/deep/ .el-table__row td:nth-child(7) .cell span {
    width: 85px;
}

/deep/ .el-table__row td:nth-child(3) .cell span {
    width: 62px;
}

/deep/ .el-table__row td:nth-child(2) .cell span {
    width: 148px;
}

/deep/ .el-table__row td:nth-child(1) .cell a {
    width: 180px;
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

/*锁*/
.fa.fa-lock.fa-lg,
.fa.fa-unlock.fa-lg {
    font-size: 16px;
    color: #d8d8d8 !important;
    position: relative;
    top: -1px;
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

/*/deep/ .el-button-group .el-button:not(:last-child){*/
/*margin-top: -1px;*/
/*}*/

/deep/ .el-button-group button {
    float: left !important;
}

/deep/ .el-dropdown .el-button-group .el-button:last-child {
    width: 30px;
    /*position: relative;*/
    /*top: -1px;*/
}

/deep/ .popper__arrow {
    display: none;
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

.mediaList_container span {
    float: left !important;
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
        width: 126px;
    }

    /deep/ .el-table__row td:nth-child(3) .cell span {
        width: 98px;
    }

    /deep/ .el-table__row td:nth-child(2) .cell span {
        width: 212px;
    }

    /deep/ .el-table__row td:nth-child(4) .cell span {
        width: 135px;
    }

  /deep/ .el-table__row td:nth-child(1) .cell a {
    width: 250px;
  }
}

.el-dialog__footer span {
    float: none !important;
}
</style>

