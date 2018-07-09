<template>
    <div>
        <div class="ad_mediaMana_wrap">
            <div class="ad_mediaMana_nav clearfix">
                <p>
                    <a href="#">图片库</a>
                </p>
            </div>
            <div class="mediaList_wrap">
                <div class="mediaList_container">
                    <el-tabs v-model="activeName" @tab-click="handleClick()">
                        <!--搜索框-->
                        <div class="search-wrap" v-if="!ludan">
                            <span>
                                <div style="display:inline-block">
                                    <el-input placeholder="请输入内容" v-model="keyword" class="input-with-select">
                                        <el-select v-model="select" slot="prepend" placeholder="请选择">
                                            <el-option label="方案名称" value="1"></el-option>
                                            <el-option label="媒体名称" value="2"></el-option>
                                            <el-option label="资源名称" value="3"></el-option>
                                        </el-select>
                                    </el-input>
                                </div>
                            </span>
                            <el-cascader :options="citys" v-model="citySelect" class="plan-select" placeholder="选择地区" change-on-select>
                            </el-cascader>
                            <span>
                                <el-select v-model="LabSelect" placeholder="选择投放面" class="plan-select">
                                    <el-option label="A面" value="A"></el-option>
                                    <el-option label="B面" value="B"></el-option>
                                </el-select>
                            </span>
                            <span>
                                <div class="block">
                                    <el-date-picker v-model="date" type="daterange" range-separator="-" format="yyyy-MM-dd" value-format="yyyy-MM-dd" start-placeholder="投放日期" end-placeholder="投放日期">
                                    </el-date-picker>
                                </div>
                            </span>
                            <span>
                                <el-button type="primary" icon="el-icon-search" class="searchBtn" @click="searchPic">搜索</el-button>
                            </span>
                            <span>
                                <el-button plain class="map">一键导出</el-button>
                            </span>
                        </div>
                        <el-tab-pane label="上刊" name="first">
                            <div class="search-nav">
                                <!--提示或图片显示区域-->
                                <div class="tempPic">
                                    <div class="noFind" v-if="showPic === 1">
                                        <img src="../../assets/images/tempPic.png" alt="">
                                        <p style="margin-top: -10px">请先输入筛选条件搜索你所需要的图片</p>
                                    </div>
                                    <div class="cantFind" v-if="showPic === 2">
                                        <img src="../../assets/images/noPic.png" alt="">
                                        <h4>无匹配结果</h4>
                                        <p>可以尝试扩大搜索范围重新搜索哦</p>
                                    </div>
                                    <!--图片列表-->
                                    <div class="find clearfix" v-if="showPic === 3">
                                        <div class="photoCard" v-for="(upimg,index) of currUpImgArr" :key="upimg.pID">
                                            <div class="imgBox" @mouseenter="showPreImg = index" @mouseleave="showPreImg = null">
                                                <img :src="upimg.pURL" alt="" class="smallImg">
                                                <!--查看缩略图和下载-->
                                                <div class="mask-btn" v-if="showPreImg == index ">
                                                    <i class="el-icon-search" @click="handlePictureCardPreview(upimg)"></i>
                                                    <a :href="upimg.pURL" :download="upimg.pID+'.png'">下载图片</a>
                                                </div>
                                            </div>
                                            <div class="detailBox">
                                                <p>{{upimg.pAlt.plan}}</p>
                                                <!-- <span>华南碧桂园二期-东门</span> -->
                                                <span>{{upimg.pAlt.res}}-{{upimg.pAlt.media}}</span>
                                                <div class="icons">
                                                    <span class="el-icon-location">{{upimg.pAlt.city}}</span>
                                                    <!-- <span @mouseover="getAddresss(upimg.pAlt)"> -->
                                                    <span>
                                                        <i class="fa fa-file-text"></i>
                                                        {{upimg.pAlt.asLab}}面
                                                    </span>
                                                    <el-tooltip placement="bottom" effect="light">
                                                        <span class="el-icon-info"></span>
                                                        <div slot="content" class="content">
                                                            <p>{{upimg.pAlt.username}}上传</p>
                                                            <p>{{upimg.pAlt.assettag}}</p>
                                                            <p>{{upimg.pAlt.address}}</p>
                                                        </div>
                                                    </el-tooltip>
                                                </div>
                                            </div>
                                            <div class="infoBox">
                                                <i>超</i>
                                                <span>{{upimg.pAlt.brand}}</span>
                                                <em>{{formatTime(upimg.pUTime)}}</em>
                                            </div>
                                        </div>
                                        <!--页码-->
                                        <div class="pager">
                                            <!-- <el-pagination small background :current-page="1" :page-sizes="[10, 20]" :page-size="10" layout=" sizes, prev, pager, next, jumper" :total="60">
											</el-pagination> -->
                                            <el-pagination small background :current-page="currUpPage" :page-sizes="[10, 20]" :page-size="pageUpSize" layout="sizes, prev, pager, next, jumper" :total="upImgArr.length" @size-change="handleUpSizeChange" @current-change='changeUpPage'>
                                            </el-pagination>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="下刊" name="second">
                            <div class="search-nav">
                                <!--未搜索占位图-->
                                <div class="tempPic">
                                    <div class="noFind" v-if="showPic === 1">
                                        <img src="../../assets/images/tempPic.png" alt="">
                                        <p style="margin-top: -10px">请先输入筛选条件搜索你所需要的图片</p>
                                    </div>
                                    <div class="cantFind" v-if="showPic === 2">
                                        <img src="../../assets/images/noPic.png" alt="">
                                        <h4>无匹配结果</h4>
                                        <p>可以尝试扩大搜索范围重新搜索哦</p>
                                    </div>
                                    <!--图片列表-->
                                    <div class="find clearfix" v-if="showPic === 3">
                                        <div class="photoCard" v-for="(downimg,index) of currDownImgArr" :key="downimg.pID">
                                            <div class="imgBox" @mouseenter="showPreImg = index" @mouseleave="showPreImg = null">
                                                <img :src="downimg.pURL" alt="" class="smallImg">
                                                <!--查看缩略图和下载-->
                                                <div class="mask-btn" v-if="showPreImg == index">
                                                    <i class="el-icon-search" @click="handlePictureCardPreview(downimg)"></i>
                                                    <a :href="downimg.pURL" :download="downimg.pID+'.png'">下载图片</a>
                                                </div>
                                            </div>
                                            <div class="detailBox">
                                                <p>{{downimg.pAlt.plan}}</p>
                                                <!-- <span>华南碧桂园二期-东门</span> -->
                                                <span>{{downimg.pAlt.res}}-{{downimg.pAlt.media}}</span>
                                                <div class="icons">
                                                    <span class="el-icon-location">{{downimg.pAlt.city}}</span>
                                                    <!-- <span @mouseover="getAddresss(downimg.pAlt)"> -->
                                                    <span>
                                                        <i class="fa fa-file-text"></i>
                                                        {{downimg.pAlt.asLab}}面
                                                    </span>
                                                    <el-tooltip placement="bottom" effect="light">
                                                        <span class="el-icon-info"></span>
                                                        <div slot="content" class="content">
                                                            <p>{{downimg.pAlt.username}}上传</p>
                                                            <p>{{downimg.pAlt.assettag}}</p>
                                                            <p>{{downimg.pAlt.address}}</p>
                                                        </div>
                                                    </el-tooltip>
                                                </div>
                                            </div>
                                            <div class="infoBox">
                                                <i>超</i>
                                                <span>{{downimg.pAlt.brand}}</span>
                                                <em>{{formatTime(downimg.pUTime)}}</em>
                                            </div>
                                        </div>
                                        <!--页码-->
                                        <div class="pager">
                                            <!-- <el-pagination small background :current-page="1" :page-sizes="[10, 20]" :page-size="10" layout=" sizes, prev, pager, next, jumper" :total="60">
											</el-pagination> -->
                                            <el-pagination small background :current-page="currDownPage" :page-sizes="[10, 20]" :page-size="pageDownSize" layout="sizes, prev, pager, next, jumper" :total="downImgArr.length" @size-change="handleDownSizeChange" @current-change='changeDownPage'>
                                            </el-pagination>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="安装" name="third">
                            <div class="search-nav">
                                <!--未搜索占位图-->
                                <div class="tempPic">
                                    <div class="noFind" v-if="showPic === 1">
                                        <img src="../../assets/images/tempPic.png" alt="">
                                        <p style="margin-top: -10px">请先输入筛选条件搜索你所需要的图片</p>
                                    </div>
                                    <div class="cantFind" v-if="showPic === 2">
                                        <img src="../../assets/images/noPic.png" alt="">
                                        <h4>无匹配结果</h4>
                                        <p>可以尝试扩大搜索范围重新搜索哦</p>
                                    </div>
                                    <!--图片列表-->
                                    <div class="find clearfix" v-if="showPic === 3">
                                        <div class="photoCard" v-for="(item, index) of installArr" :key="index">
                                            <div class="imgBox" @mouseenter="showPreImg = index" @mouseleave="showPreImg = null">
                                                <img :src="dialogImageUrl" alt="" class="smallImg">
                                                <!--查看缩略图和下载-->
                                                <div class="mask-btn" v-if="showPreImg == index">
                                                    <i class="el-icon-search" @click="handlePictureCardPreview"></i>
                                                    <a href="#" download="name.jpg">下载图片</a>
                                                </div>
                                            </div>
                                            <div class="detailBox">
                                                <p>珠江帝景地产三月投放</p>
                                                <span>华南碧桂园二期-东门</span>
                                                <div class="icons">
                                                    <span class="el-icon-location">广州市</span>
                                                    <span class="el-icon-menu">钣金门</span>
                                                    <span><img src="../../assets/images/xzIcon.png" alt=""> 闲置中</span>
                                                    <el-tooltip placement="bottom" effect="light">
                                                        <span class="el-icon-info"></span>
                                                        <div slot="content" class="content">
                                                            <p>{{address}}</p>
                                                        </div>
                                                    </el-tooltip>
                                                </div>
                                            </div>
                                            <div class="infoBox">
                                                <i>超</i>
                                                <span>guangzhoumeijie</span>
                                                <em>2018.08.30</em>
                                            </div>
                                        </div>
                                        <!--页码-->
                                        <div class="pager">
                                            <el-pagination small background :current-page="1" :page-sizes="[10, 20]" :page-size="10" layout=" sizes, prev, pager, next, jumper" :total="60">
                                            </el-pagination>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="巡点" name="fourth">
                            <div class="search-nav">
                                <!--未搜索占位图-->
                                <div class="tempPic">
                                    <div class="noFind" v-if="showPic === 1">
                                        <img src="../../assets/images/tempPic.png" alt="">
                                        <p style="margin-top: -10px">请先输入筛选条件搜索你所需要的图片</p>
                                    </div>
                                    <div class="cantFind" v-if="showPic === 2">
                                        <img src="../../assets/images/noPic.png" alt="">
                                        <h4>无匹配结果</h4>
                                        <p>可以尝试扩大搜索范围重新搜索哦</p>
                                    </div>
                                    <!--图片列表-->
                                    <div class="find clearfix" v-if="showPic === 3">
                                        <div class="photoCard" v-for="(item, index) of searchAreaArr" :key="index">
                                            <div class="imgBox" @mouseenter="showPreImg = index" @mouseleave="showPreImg = null">
                                                <img :src="dialogImageUrl" alt="" class="smallImg">
                                                <!--查看缩略图和下载-->
                                                <div class="mask-btn" v-if="showPreImg == index">
                                                    <i class="el-icon-search" @click="handlePictureCardPreview"></i>
                                                    <a href="#" download="name.jpg">下载图片</a>
                                                </div>
                                            </div>
                                            <div class="detailBox">
                                                <p>珠江帝景地产三月投放</p>
                                                <span>华南碧桂园二期-东门</span>
                                                <div class="icons">
                                                    <span class="el-icon-location">广州市</span>
                                                    <span class="el-icon-menu">钣金门</span>
                                                    <span><img src="../../assets/images/xzIcon.png" alt=""> 闲置中</span>
                                                    <el-tooltip placement="bottom" effect="light">
                                                        <span class="el-icon-info"></span>
                                                        <div slot="content" class="content">
                                                            <p>{{assetID}}</p>
                                                            <p>{{address}}</p>
                                                        </div>
                                                    </el-tooltip>
                                                </div>
                                            </div>
                                            <div class="infoBox">
                                                <i>超</i>
                                                <span>guangzhoumeijie</span>
                                                <em>2018.08.30</em>
                                            </div>
                                        </div>
                                        <!--页码-->
                                        <div class="pager">
                                            <el-pagination small background :current-page="1" :page-sizes="[10, 20]" :page-size="10" layout=" sizes, prev, pager, next, jumper" :total="60">
                                            </el-pagination>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-tab-pane>
                        <!-- <el-tab-pane label="录单" name="fifth">
                            <div class="mediaList_container">
                                <div style="display:inline-block" v-if="ludan">
                                    <span>
                                        <el-input placeholder="请输入内容" v-model="keyword2" class="input-with-select">
                                            <el-select v-model="ludanSelect" slot="prepend" placeholder="请选择">
                                                <el-option label="任务名称" value="1"></el-option>
                                                <el-option label="创建人" value="2"></el-option>
                                            </el-select>
                                        </el-input>
                                    </span>
                                    <span>
                                        <el-button type="primary" icon="el-icon-search">搜索</el-button>
                                    </span>
                                </div>
                                <div class="table_wrap">
                                    <el-table border width="98%" :data="caseList" style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">
                                        <el-table-column label="任务名称" min-width="18.3%">
                                            <template slot-scope="scope">
                                                <span @click="newPath" style="color: #1890ff;cursor: pointer">{{scope.row.caseName}}</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="caseType" label="任务类型" min-width="11%" :filters="[{text: '上刊', value: '上刊'}, {text: '下刊', value: '下刊'}]" :filter-method="filterCaseType" :filter-multiple="false">
                                        </el-table-column>
                                        <el-table-column prop="dwNum" label="点位数量" min-width="11%">
                                        </el-table-column>
                                        <el-table-column prop="uploadImg" label="已上传图片" min-width="11%">
                                        </el-table-column>
                                        <el-table-column prop="creater" label="创建人" min-width="11%">
                                        </el-table-column>
                                        <el-table-column prop="account" label="创建账号" min-width="13.8%">
                                        </el-table-column>
                                        <el-table-column prop="createDate" label="创建时间" min-width="11.3%">
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </div>
                        </el-tab-pane> -->
                    </el-tabs>
                    <!--缩略图对话框-->
                    <el-dialog :visible.sync="dialogVisible">
                        <img style="width: 100%;height: 100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </div>
            </div>
            <div class="bottom-btn">
                <el-button plain>返回</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { api } from "../../api/api.js";
// 时间格式化
import dateFormat from "../../commonFun/timeFormat.js";
import {
    Button,
    Input,
    Dialog,
    Table,
    TableColumn,
    Row,
    Tooltip,
    Tabs,
    TabPane,
    Select,
    Option,
    Cascader,
    DatePicker,
    Pagination,
    Message
} from "element-ui";

export default {
    name: "PhotoGallery",
    components: {
        elButton: Button,
        elInput: Input,
        elDialog: Dialog,
        elTable: Table,
        elTableColumn: TableColumn,
        elRow: Row,
        elTooltip: Tooltip,
        elTabs: Tabs,
        elTabPane: TabPane,
        elSelect: Select,
        elOption: Option,
        elCascader: Cascader,
        elDatePicker: DatePicker,
        elPagination: Pagination
    },
    data() {
        return {
            // 当前页
            currUpPage: 1,
            currDownPage: 1,
            pageUpSize: 10,
            pageDownSize: 10,
            //显示预览图蒙版
            showPreImg: null,
            // 上刊
            upImgArr: [],
            currUpImgArr: [],
            // 下刊
            downImgArr: [],
            currDownImgArr: [],
            // 安装
            installArr: [],
            // 巡点
            searchAreaArr: [],
            //地区搜索
            citys: [],
            citySelect: [],
            //上刊搜索行
            select: "1",
            keyword: "",
            LabSelect: "",
            date: "",
            // tab默认选择第一项
            activeName: "first",

            //缩略图
            dialogImageUrl: "../../../static/images/testPic.png",
            dialogVisible: false,
            showBtn: false,
            // assetID: `005B201803GZ-X446`,
            // address: `广东广州市天河区黄埔大道中`,
            // keyword2: "",
            //录单搜索行
            ludan: false,
            ludanSelect: "任务名称",

            //是否搜索到图片
            showPic: 1,
            // showPic: 3,
            //  录单
            input: "",
            value6: "",
            //表格
            caseList: [
                {
                    caseName: "珠江帝景地产三月份方案",
                    caseType: "上刊",
                    dwNum: "60",
                    uploadImg: "73",
                    creater: "冯少宏",
                    account: "fengshaohong",
                    createDate: "2018.05.26"
                },
                {
                    caseName: "珠江帝景地产三月份方案",
                    caseType: "上刊",
                    dwNum: "60",
                    uploadImg: "73",
                    creater: "冯少宏",
                    account: "fengshaohong",
                    createDate: "2018.05.26"
                },
                {
                    caseName: "珠江帝景地产三月份方案",
                    caseType: "上刊",
                    dwNum: "60",
                    uploadImg: "73",
                    creater: "冯少宏",
                    account: "fengshaohong",
                    createDate: "2018.05.26"
                },
                {
                    caseName: "珠江帝景地产三月份方案",
                    caseType: "上刊",
                    dwNum: "60",
                    uploadImg: "73",
                    creater: "冯少宏",
                    account: "fengshaohong",
                    createDate: "2018.05.26"
                },
                {
                    caseName: "珠江帝景地产三月份方案",
                    caseType: "上刊",
                    dwNum: "60",
                    uploadImg: "73",
                    creater: "冯少宏",
                    account: "fengshaohong",
                    createDate: "2018.05.26"
                },
                {
                    caseName: "珠江帝景地产三月份方案",
                    caseType: "上刊",
                    dwNum: "60",
                    uploadImg: "73",
                    creater: "冯少宏",
                    account: "fengshaohong",
                    createDate: "2018.05.26"
                },
                {
                    caseName: "珠江帝景地产三月份方案",
                    caseType: "上刊",
                    dwNum: "60",
                    uploadImg: "73",
                    creater: "冯少宏",
                    account: "fengshaohong",
                    createDate: "2018.05.26"
                },
                {
                    caseName: "珠江帝景地产三月份方案",
                    caseType: "上刊",
                    dwNum: "60",
                    uploadImg: "73",
                    creater: "冯少宏",
                    account: "fengshaohong",
                    createDate: "2018.05.26"
                },
                {
                    caseName: "珠江帝景地产三月份方案",
                    caseType: "上刊",
                    dwNum: "60",
                    uploadImg: "73",
                    creater: "冯少宏",
                    account: "fengshaohong",
                    createDate: "2018.05.26"
                },
                {
                    caseName: "珠江帝景地产三月份方案",
                    caseType: "上刊",
                    dwNum: "60",
                    uploadImg: "73",
                    creater: "冯少宏",
                    account: "fengshaohong",
                    createDate: "2018.05.26"
                },
                {
                    caseName: "珠江帝景地产三月份方案",
                    caseType: "上刊",
                    dwNum: "60",
                    uploadImg: "73",
                    creater: "冯少宏",
                    account: "fengshaohong",
                    createDate: "2018.05.26"
                },
                {
                    caseName: "珠江帝景地产三月份方案",
                    caseType: "上刊",
                    dwNum: "60",
                    uploadImg: "73",
                    creater: "冯少宏",
                    account: "fengshaohong",
                    createDate: "2018.05.26"
                },
                {
                    caseName: "珠江帝景地产三月份方案",
                    caseType: "上刊",
                    dwNum: "60",
                    uploadImg: "73",
                    creater: "冯少宏",
                    account: "fengshaohong",
                    createDate: "2018.05.26"
                }
            ]
        };
    },
    created() {
        // 获取上刊图片
        this.getUpReport();
        // 获取下刊图片
        // this.getDownReport();
    },
    methods: {
        handleUpSizeChange(pageVal) {
            console.log("pageVal", pageVal);
            this.pageUpSize = pageVal;
            this.changeUpPage(1);
        },
        handleDownSizeChange(pageVal) {
            console.log("pageVal", pageVal);
            this.pageDownSize = pageVal;
            this.changeDownPage(1);
        },
        // 分页功能
        changeUpPage(page) {
            let pageSize = this.pageUpSize;
            let arr = this.upImgArr;
            let total = arr.length;
            let resultArr = [];
            for (
                let i = (page - 1) * pageSize;
                i < (page * pageSize < total ? page * pageSize : total);
                i++
            ) {
                resultArr.push(arr[i]);
            }
            this.currUpImgArr = [];
            this.currUpImgArr = resultArr;
            console.log("currUpImgArr", this.currUpImgArr);
            console.log("page", page, "pageSize", pageSize);
        },
        // 分页功能
        changeDownPage(page) {
            let pageSize = this.pageDownSize;
            let arr = this.downImgArr;
            let total = arr.length;
            let resultArr = [];
            for (
                let i = (page - 1) * pageSize;
                i < (page * pageSize < total ? page * pageSize : total);
                i++
            ) {
                resultArr.push(arr[i]);
            }
            this.currDownImgArr = [];
            this.currDownImgArr = resultArr;
            console.log("currDownImgArr", this.currDownImgArr);
            console.log("page", page, "pageSize", pageSize);
        },
        // tabClick
        handleClick() {
            if (this.activeName == "first") {
                this.getUpReport();
                this.ludan = false;
            }
            if (this.activeName == "second") {
                this.getDownReport();
                this.ludan = false;
            }
            if (this.activeName == "third") {
                this.ludan = false;
            }
            if (this.activeName == "fourth") {
                this.ludan = false;
            }
            if (this.activeName == "fifth") {
                this.ludan = true;
            }
        },
        // 获取上刊图片
        getUpReport() {
            // // 测试数据
            // let result = [
            //     {
            //         pAlt:
            //             '{"plan":"北京方案t","res":"龙阁公寓1","media":"东门","city":"北京市","area":"朝阳区","asLab":"B","lstart":"Jun 28, 2018","lend":"Jul 12, 2018","assettag":"NBJ00323","brand":"AC9美容院","username":"周昭杰","resid":11229,"address":"广州市越秀区珠光北路116号小区"}',
            //         pID: 321,
            //         pSrc:
            //             "/data/web/beta.qinlinad.com/upload/2018/6/8f4e2601541f487b9a4634f7943f1e01.png",
            //         pType: "SK",
            //         pURL:
            //             "https://beta.qinlinad.com/upload/2018/6/8f4e2601541f487b9a4634f7943f1e01.png",
            //         pUTime: "2018-06-12 15:08:45.0",
            //         ptID: 3758,
            //         ptP: "35",
            //         puID: 3
            //     },
            //     {
            //         pAlt:
            //             '{"plan":"北京方案test3","res":"龙阁公寓","media":"西门","city":"北京市","area":"朝阳区","asLab":"A","lstart":"Jun 28, 2018","lend":"Jul 12, 2018","assettag":"NBJ00323","brand":"AC9美容院","username":"周昭杰","resid":11229,"address":"广州市越秀区珠光北路116号小区"}',
            //         pID: 320,
            //         pSrc:
            //             "/data/web/beta.qinlinad.com/upload/2018/6/5ff93ff39b52454a802eedbd6745ffa3.png",
            //         pType: "SK",
            //         pURL:
            //             "https://beta.qinlinad.com/upload/2018/6/5ff93ff39b52454a802eedbd6745ffa3.png",
            //         pUTime: "2018-06-12 15:08:39.0",
            //         ptID: 3758,
            //         ptP: "35",
            //         puID: 3
            //     },
            //     {
            //         pAlt:
            //             '{"plan":"北京方案test3","res":"龙锦苑东5区","media":"南门","city":"北京市","area":"昌平区","asLab":"A","lstart":"Jun 28, 2018","lend":"Jul 12, 2018","assettag":"NBJ01493","brand":"AC9美容院","username":"周昭杰","resid":11645,"address":"广州市越秀区珠光北路116号小区"}',
            //         pID: 319,
            //         pSrc:
            //             "/data/web/beta.qinlinad.com/upload/2018/6/54cdb518a7ca4eed99247e6718022a2e.png",
            //         pType: "SK",
            //         pURL:
            //             "https://beta.qinlinad.com/upload/2018/6/54cdb518a7ca4eed99247e6718022a2e.png",
            //         pUTime: "2018-06-12 15:08:30.0",
            //         ptID: 3758,
            //         ptP: "35",
            //         puID: 3
            //     },
            //     {
            //         pAlt:
            //             '{"plan":"北京方案test3","res":"龙锦苑东5区","media":"北门","city":"北京市","area":"昌平区","asLab":"A","lstart":"Jun 28, 2018","lend":"Jul 12, 2018","assettag":"NBJ01493","brand":"AC9美容院","username":"周昭杰","resid":11645,"address":"广州市越秀区珠光北路116号小区"}',
            //         pID: 318,
            //         pSrc:
            //             "/data/web/beta.qinlinad.com/upload/2018/6/7a9614e275bd4ae2a7d5d9cd99653a8e.png",
            //         pType: "SK",
            //         pURL:
            //             "https://beta.qinlinad.com/upload/2018/6/7a9614e275bd4ae2a7d5d9cd99653a8e.png",
            //         pUTime: "2018-06-12 15:08:20.0",
            //         ptID: 3758,
            //         ptP: "35",
            //         puID: 3
            //     }
            // ];
            // this.citys = this.getCitys(result);
            // this.upImgArr = result;
            // this.currUpImgArr = JSON.parse(JSON.stringify(this.upImgArr));

            // 真实数据
            if (this.upImgArr.length) {
                return;
            }
            let uid = JSON.parse(sessionStorage.getItem("session_data")).uID;
            let upinfo = {
                uid: uid,
                ptype: "SK"
            };
            api
                .postApi("/GetImg", upinfo)
                .then(res => {
                    if (!res.data.SysCode) {
                        console.log(res.data);
                        let result = res.data;
                        this.citys = this.getCitys(result);
                        this.upImgArr = result;
                        this.currUpImgArr = JSON.parse(
                            JSON.stringify(this.upImgArr)
                        );
                        console.log("upimginfo", this.upImgArr);
                    } else if (res.data.SysCode == 100302) {
                        Message.warning("登录超时,请重新登录");
                        this.$router.push("/login");
                    } else {
                        Message.warning(res.data.MSG);
                    }
                })
                .catch(res => {
                    console.log(res);
                });
        },
        // 区域二级联动
        getCitys(arr) {
            let cityArr = [];
            for (let data of arr) {
                if (data.pAlt) {
                    data.pAlt = JSON.parse(data.pAlt);
                    let obj = {
                        value: data.pAlt.city,
                        label: data.pAlt.city,
                        children: []
                    };
                    if (
                        JSON.stringify(cityArr).indexOf(JSON.stringify(obj)) ===
                        -1
                    ) {
                        cityArr.push(obj);
                    }
                }
            }
            for (let item of cityArr) {
                for (let data of arr) {
                    if (data.pAlt) {
                        let areaObj = {
                            value: data.pAlt.area,
                            label: data.pAlt.area
                        };
                        if (data.pAlt.city == item.value) {
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
            }
            console.log("cityArr---------------fda", cityArr);
            return cityArr;
        },
        // 获取下刊图片
        getDownReport() {
            if (this.downImgArr.length) {
                return;
            }
            let uid = JSON.parse(sessionStorage.getItem("session_data")).uID;
            let upinfo = {
                uid: uid,
                ptype: "XK"
            };
            api
                .postApi("/GetImg", upinfo)
                .then(res => {
                    if (!res.data.SysCode) {
                        console.log(res.data);
                        let result = res.data;
                        this.citys = this.getCitys(result);
                        this.downImgArr = result;
                        this.currDownImgArr = JSON.parse(
                            JSON.stringify(this.downImgArr)
                        );
                        console.log("upimginfo", this.downImgArr);
                    } else if (res.data.SysCode == 100302) {
                        Message.warning("登录超时,请重新登录");
                        this.$router.push("/login");
                    } else {
                        Message.warning(res.data.MSG);
                    }
                })
                .catch(res => {
                    console.log(res);
                });
        },
        // 获取地址详细信息
        getAddresss(row) {
            // resid       int【必填】     资源ID
            // info        String          是否输出完整资源信息（小写：y）
            let info = {
                resid: row.resid,
                info: "y"
            };
            api
                .getApi("/GetResCT", info)
                .then(res => {
                    console.log(res.data);
                    this.$set(row, "address", res.data.resAddress);
                })
                .catch(res => {
                    console.log(res);
                });
        },
        // 时间格式规范
        formatTime(val) {
            return dateFormat.toDate(val, ".");
        },
        // 查看图片
        handlePictureCardPreview(item) {
            this.dialogImageUrl = item.pURL;
            this.dialogVisible = true;
        },
        // 搜索图片
        searchPic(initData) {
            if (
                !this.select &&
                !this.keyword &&
                !this.LabSelect &&
                !this.date &&
                !this.citySelect.length
            ) {
                Message.warning("请先输入搜索条件");
            } else {
                if (this.activeName == "first") {
                    initData = this.upImgArr;
                } else if (this.activeName == "second") {
                    initData = this.downImgArr;
                }

                // 搜索
                console.log(
                    this.select,
                    this.keyword,
                    this.LabSelect,
                    this.date,
                    this.citySelect
                );
                let arr = [];
                let range = this.date;
                let select = this.select;
                let keyword = this.keyword;
                let lab = this.LabSelect;
                let city = this.citySelect;
                if (range || keyword || lab || city.length) {
                    for (let data of initData) {
                        let alt = data.pAlt;
                        if (range && keyword && lab && city.length) {
                            if (
                                dateFormat.toDate(alt.lstart) >= range[0] &&
                                dateFormat.toDate(alt.lend) <= range[1]
                            ) {
                                if (
                                    select == "1" &&
                                    alt.plan.includes(keyword) &&
                                    alt.asLab == lab &&
                                    alt.city == city[0] &&
                                    alt.area == city[1]
                                ) {
                                    arr.push(data);
                                }
                                if (
                                    select == "2" &&
                                    alt.media.includes(keyword) &&
                                    alt.asLab == lab &&
                                    alt.city == city[0] &&
                                    alt.area == city[1]
                                ) {
                                    arr.push(data);
                                }
                                if (
                                    select == "3" &&
                                    alt.res.includes(keyword) &&
                                    alt.asLab == lab &&
                                    alt.city == city[0] &&
                                    alt.area == city[1]
                                ) {
                                    arr.push(data);
                                }
                            }
                        } else if (range) {
                            if (
                                dateFormat.toDate(alt.lstart) >= range[0] &&
                                dateFormat.toDate(alt.lend) <= range[1]
                            ) {
                                if (keyword) {
                                    if (
                                        select == "1" &&
                                        alt.plan.includes(keyword)
                                    ) {
                                        arr.push(data);
                                    }
                                    if (
                                        select == "2" &&
                                        alt.media.includes(keyword)
                                    ) {
                                        arr.push(data);
                                    }
                                    if (
                                        select == "2" &&
                                        alt.res.includes(keyword)
                                    ) {
                                        arr.push(data);
                                    }
                                } else if (lab) {
                                    if (alt.asLab == lab) {
                                        arr.push(data);
                                    }
                                } else if (city.length) {
                                    if (
                                        alt.city == city[0] &&
                                        alt.area == city[1]
                                    ) {
                                        arr.push(data);
                                    }
                                } else {
                                    arr.push(data);
                                }
                            }
                        } else if (keyword) {
                            if (select == "1" && alt.plan.includes(keyword)) {
                                // arr.push(data);
                                if (range) {
                                    if (
                                        dateFormat.toDate(alt.lstart) >=
                                            range[0] &&
                                        dateFormat.toDate(alt.lend) <= range[1]
                                    ) {
                                        arr.push(data);
                                    }
                                } else if (lab) {
                                    if (alt.asLab == lab) {
                                        arr.push(data);
                                    }
                                } else if (city.length) {
                                    if (
                                        alt.city == city[0] &&
                                        alt.area == city[1]
                                    ) {
                                        arr.push(data);
                                    }
                                } else {
                                    arr.push(data);
                                }
                            }
                            if (select == "2" && alt.media.includes(keyword)) {
                                // arr.push(data);
                                if (range) {
                                    if (
                                        dateFormat.toDate(alt.lstart) >=
                                            range[0] &&
                                        dateFormat.toDate(alt.lend) <= range[1]
                                    ) {
                                        arr.push(data);
                                    }
                                } else if (lab) {
                                    if (alt.asLab == lab) {
                                        arr.push(data);
                                    }
                                } else if (city.length) {
                                    if (
                                        alt.city == city[0] &&
                                        alt.area == city[1]
                                    ) {
                                        arr.push(data);
                                    }
                                } else {
                                    arr.push(data);
                                }
                            }
                            if (select == "3" && alt.res.includes(keyword)) {
                                // arr.push(data);
                                if (range) {
                                    if (
                                        dateFormat.toDate(alt.lstart) >=
                                            range[0] &&
                                        dateFormat.toDate(alt.lend) <= range[1]
                                    ) {
                                        arr.push(data);
                                    }
                                } else if (lab) {
                                    if (alt.asLab == lab) {
                                        arr.push(data);
                                    }
                                } else if (city.length) {
                                    if (
                                        alt.city == city[0] &&
                                        alt.area == city[1]
                                    ) {
                                        arr.push(data);
                                    }
                                } else {
                                    arr.push(data);
                                }
                            }
                        } else if (lab) {
                            if (alt.asLab == lab) {
                                if (range) {
                                    if (
                                        dateFormat.toDate(alt.lstart) >=
                                            range[0] &&
                                        dateFormat.toDate(alt.lend) <= range[1]
                                    ) {
                                        arr.push(data);
                                    }
                                } else if (keyword) {
                                    if (
                                        select == "1" &&
                                        alt.plan.includes(keyword)
                                    ) {
                                        arr.push(data);
                                    }
                                    if (
                                        select == "2" &&
                                        alt.media.includes(keyword)
                                    ) {
                                        arr.push(data);
                                    }
                                    if (
                                        select == "2" &&
                                        alt.res.includes(keyword)
                                    ) {
                                        arr.push(data);
                                    }
                                } else if (city.length) {
                                    if (
                                        alt.city == city[0] &&
                                        alt.area == city[1]
                                    ) {
                                        arr.push(data);
                                    }
                                } else {
                                    arr.push(data);
                                }
                            }
                        } else if (city.length) {
                            if (alt.city == city[0] && alt.area == city[1]) {
                                if (range) {
                                    if (
                                        dateFormat.toDate(alt.lstart) >=
                                            range[0] &&
                                        dateFormat.toDate(alt.lend) <= range[1]
                                    ) {
                                        arr.push(data);
                                    }
                                } else if (keyword) {
                                    if (
                                        select == "1" &&
                                        alt.plan.includes(keyword)
                                    ) {
                                        arr.push(data);
                                    }
                                    if (
                                        select == "2" &&
                                        alt.media.includes(keyword)
                                    ) {
                                        arr.push(data);
                                    }
                                    if (
                                        select == "2" &&
                                        alt.res.includes(keyword)
                                    ) {
                                        arr.push(data);
                                    }
                                } else if (lab) {
                                    if (alt.asLab == lab) {
                                        arr.push(data);
                                    }
                                } else {
                                    arr.push(data);
                                }
                            }
                        }
                    }

                    if (arr.length) {
                        this.showPic = 3;
                        // 上刊
                        if (this.activeName == "first") {
                            this.currUpImgArr = arr;
                        }
                        // 下刊
                        if (this.activeName == "second") {
                            this.currDownImgArr = arr;
                        }
                        // 安装
                        if (this.activeName == "third") {
                        }
                        // 巡点
                        if (this.activeName == "fourth") {
                        }
                    }
                    //  this.currentOrder = arr;
                    if (!arr.length) {
                        this.showPic = 2;
                        Message.warning("查询数据为空");
                    }
                    console.log(arr);
                }
            }
        },

        //筛选
        filterCaseType(value, row) {
            return row.tag === value;
        },
        newPath() {
            this.$router.push("./ludanReport");
        }
    },

    mounted: function() {
        /* $(function () {
      $(".smallImg").mouseenter(function () {
        $(this)
          .siblings(".mask-btn")
          .show();
      });
      $(".mask-btn").mouseleave(function () {
        $(this).hide();
      });
      $(".photoCard").hover(
        function () {
          $(this).css(
            "box-shadow",
            "0px 0px 20px rgba(0, 0, 0, 0.20)"
          );
        },
        function () {
          $(this).css("box-shadow", "none");
        }
      );
    });*/
    }
};
</script>

<style scoped>
/deep/ .el-cascader__label {
    line-height: 34px;
}

/*面包屑导航*/
.ad_mediaMana_wrap {
    position: relative;
    /*height: 768px;*/
}

.ad_mediaMana_nav p {
    padding-left: 57px;
    position: absolute;
    left: 0;
    top: 12px;
    font-size: 14px;
    line-height: 18px;
}

.ad_mediaMana_nav p a {
    color: #666;
}

.ad_mediaMana_nav {
    height: 42px;
    position: relative;
}

.ad_mediaMana_nav p a:nth-of-type(1) {
    color: #999;
}

.mediaList_wrap {
    width: 1246px;
    background: #ffffff;
    border: 1px solid #e6e7e9;
    margin: 0 auto;
    margin-bottom: 26px;
}

.mediaList_wrap .mediaList_container {
    /*width: 100%;*/
    padding: 0 18px 31px 18px;
}

/*tabs*/
/deep/ .el-tabs__item {
    font-size: 16px;
    color: #999999;
}

/deep/ .el-tabs__item.is-top.is-active {
    font-weight: bold;
    color: #409eff;
}

/deep/ .el-tabs__nav {
    height: 49px;
    line-height: 49px;
}

/*上刊*/
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
    width: 76px;
    height: 34px;
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

/deep/ .plan-select .el-input,
/deep/ .plan-select .el-input__inner {
    width: 180px;
    /*height: 34px;*/
}

.searchBtn,
.map {
    position: relative;
    /*top: 3px;*/
    left: -3px;
}

.map {
    left: -12px;
}

/* /deep/ .el-button.map span {
           position: relative;
           !*left: -10px;*!
           top: -2px;
         }*/

.search-wrap {
    position: relative;
    height: 40px;
}

/deep/ .el-input-group .el-input__suffix {
    right: 5px;
}

/deep/ .el-input__icon {
    line-height: 34px;
}

.tempPic {
    text-align: center;
    /*margin-top: 87px;*/
    margin-bottom: 50px;
}

.noFind,
.cantFind {
    margin-top: 87px;
    margin-bottom: 70px;
}

.tempPic img {
    width: 350px;
    height: 245px;
}

.tempPic p {
    font-size: 16px;
    color: #666666;
}

.tempPic h4 {
    font-size: 28px;
    color: #666666;
    margin-top: -30px;
    margin-bottom: 7px;
}

/*搜索到的图片列表*/
.input-with-select /deep/ .el-input__inner {
    font-size: 14px;
    /*padding: 10px 10px;*/
    height: 34px;
    /*line-height: 14px;*/
    vertical-align: middle;
}

/deep/ .plan-select .el-input__inner {
    font-size: 14px;
    /*padding: 10px 10px;*/
    height: 34px;
    /*line-height: 14px;*/
    vertical-align: middle;
}

.find {
    /* position: relative; */
    display: flex;
    flex-wrap: wrap;
    /*justify-content: space-around;*/
}

.find .photoCard {
    margin-right: 20px;
}

.photoCard {
    transition: all 0.3s;
    float: left;
    width: 234px;
    /*height: 307px;*/
    background: #ffffff;
    /*box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.20);*/
    border-radius: 2px;
    text-align: left;
    border: 1px solid rgba(0, 0, 0, 0.1);
    margin-top: 20px;
}

.photoCard + .photoCard {
    /*margin-left: 7px;*/
}

.find .photoCard:nth-child(6) {
    /*margin-left: 0;*/
}

.photoCard .imgBox {
    width: 234px;
    height: 190px;
    position: relative;
    overflow: hidden;
}

.imgBox .mask-btn {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.2);

    text-align: center;
}

.mask-btn .el-icon-search {
    color: #fff;
    font-size: 26px;
    line-height: 176px;
    cursor: pointer;
}

.mask-btn a {
    position: absolute;
    bottom: 18px;
    left: 63px;
    background: #1890ff;
    border-radius: 4px;
    width: 100px;
    height: 34px;
    color: #fff;
    text-align: center;
    line-height: 34px;
    font-size: 14px;
}

/deep/ .el-dialog {
    box-shadow: none;
}

.photoCard .imgBox > img {
    display: inline-block;
    /* width: 100%; */
    /* height: 100%; */
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
}

.detailBox {
    padding-left: 10px;
    margin-top: 10px;
    border-bottom: 1px solid #eeeeee;
    padding-bottom: 13px;
    display: flex;
    flex-direction: column;
}

.detailBox p {
    font-size: 14px;
    color: #333333;
}

.detailBox > span {
    font-size: 10px;
    color: #999999;
}

.detailBox .icons {
    font-size: 10px;
    color: #999999;
    margin-top: 12px;
    position: relative;
}

.icon span {
    float: left;
}

.icons img {
    width: 14px;
    height: 14px;
    position: relative;
    top: 2px;
}

.icons span + span {
    margin-left: 15px;
}

.icons .content p {
    font-size: 10px;
    color: #666666;
}

.el-icon-info,
.el-icon-location {
    font-size: 13px;
}

.icons .el-icon-info {
    position: absolute;
    right: 12px;
    top: 2px;
}

.infoBox {
    padding: 10px;
}

.infoBox i {
    display: inline-block;
    width: 22px;
    height: 22px;
    font-size: 10px;
    color: #ffffff;
    border-radius: 50%;
    background-color: #91acf9;
    font-style: normal;
    text-align: center;
    line-height: 20px;
}

.infoBox span {
    font-size: 10px;
    color: #333333;
}

.infoBox em {
    font-size: 10px;
    color: #999999;
    margin-left: 20px;
    float: right;
    position: relative;
    top: 5px;
}

/*页码*/
/* .pager {
    position: absolute;
    bottom: 0;
    right: 10px;
    height: 32px;
    margin-top: 18px;
}

/deep/ .el-pagination {
    position: absolute;
    right: 0;
    top: 50px;
} */

/deep/ .el-pagination.is-background .el-pager li {
    font-weight: normal;
    font-size: 13px;
    background-color: transparent;
}

/deep/ .el-select__caret {
    position: relative;
    right: 4px;
}

.up-report-bottom {
    text-align: center;
    margin-top: 20px;
}

.up-report-bottom-checkbox .el-button {
    position: relative;
    top: 5px;
    left: 0;
}

/deep/ .el-pager .number {
    background-color: transparent;
}

.up-report-bottom-btns .el-button {
    width: 74px;
    height: 32px;
    padding: 0;
}

/deep/ .el-pagination .el-select .el-input .el-input__inner {
    height: 28px !important;
}

/deep/ .el-pagination__editor.el-input .el-input__inner {
    height: 28px !important;
}

/deep/ .el-pagination span:not([class*="suffix"]) {
    position: relative;
    top: -4px;
}

/deep/ .el-pagination span:not([class*="suffix"]) .el-input__inner {
    width: 100px;
}

/deep/ .el-pagination__editor.el-input .el-input__inner {
    width: 50px !important;
}

/*录单*/
/deep/ .el-table {
    width: 98% !important;
}

.el-input {
    width: 240px;
    height: 34px !important;
    border-radius: 4px;
}

/deep/ .el-input__inner {
    height: 34px !important;
    line-height: 34px;
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
}

/deep/ .el-button + .el-button {
    margin-left: 0;
}

.mediaList_wrap .mediaList_container .table_wrap {
    width: 1210px;
    margin: 10px 0 0 0;
    border-radius: 4px;
}

/deep/ .el-date-editor .el-range-separator {
    line-height: 26px;
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
    padding: 12px 0;
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

/*/deep/ .el-table_1_column_3, /deep/ .el-table_1_column_4 {
          text-align: right;
        }*/

/deep/ .el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: #ecf5ff;
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

/*超出省略*/
/deep/ .el-table .cell {
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

/deep/ .el-table .el-table_1_column_3 .cell {
    width: 95px;
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

/deep/ .el-dropdown .el-button-group .el-button {
    height: 28px;
}

.bottom-btn {
    text-align: center;
    margin-bottom: 30px;
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

/deep/ .el-date-editor .el-range__close-icon {
    position: relative;
    top: -1px;
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

/*按钮*/
/deep/ .el-button--default:focus,
.el-button--default:hover {
    color: #606266;
    border-color: #dcdfe6;
    background-color: #fcfcfc;
}

.search-wrap span {
    float: left;
    margin-left: 4px;
}

.mediaList_container .search-wrap span {
    float: left;
    margin-left: 4px;
}

/deep/ .el-cascader {
    line-height: 19px;
}

.content_bottom_btn /deep/ .el-button span {
    position: relative;
    top: -2px;
}

.content_bottom_btn /deep/ .el-button span a {
    color: #606266;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both;
}

/deep/ .el-tabs__nav-wrap::after {
    height: 1px;
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

    .photoCard + .photoCard {
        /*margin-left: 26px;*/
    }

    .find .photoCard:nth-child(6) {
        /*margin-left: 0;*/
    }
}

/*1920*/
@media all and (min-width: 1900px) {
    .mediaList_wrap {
        width: 1800px !important;
        /*margin-bottom: 70px !important;*/
    }

    .mediaList_wrap .mediaList_container .table_wrap {
        width: 1764px;
    }

    .photoCard {
        margin-left: 35px;
    }

    .photoCard + .photoCard {
        /*margin-left: 98px;*/
    }

    .find .photoCard:nth-child(6) {
        /*margin-left: 98px;*/
    }
}
</style>
