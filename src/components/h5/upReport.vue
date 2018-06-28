<template>
    <div>
        <div class="ad_mediaMana_wrap">
            <div class="mediaMana_content_top">
                <div class="content_top_wrap">
                    <div class="title">
                        <h1>{{upReport.apName}}上刊报告</h1>
                        <!-- <h3>广州探鱼 &nbsp;&nbsp;2017/11/11-2017/12/12</h3> -->
                        <h3>{{upReport.bTitle}} &nbsp;&nbsp;{{formatTime(upReport.apcTime)}}</h3>
                    </div>
                    <div class="detail">
                        <p>
                            <em>公司名称：</em>
                            <i>{{upReport.cName}}</i>
                            <em>投放城市：</em>
                            <i>{{filter(upReport.rIDs)}}</i>
                            <em>投放面数：</em>
                            <i>{{upReport.totalNum}}</i>
                        </p>
                    </div>
                </div>
            </div>
            <div class="plan-panel">
                <el-tabs v-model="planPanel">
                    <el-tab-pane label="投放详情" name="first">
                        <div class="first-wrap box-wrap">
                            <h4>投放详情</h4>
                            <div class="search-wrap">
                                <span>
                                    <el-select v-model="select" placeholder="请选择" class="type-select">
                                        <el-option v-for="item in typeSelect" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                    <el-input v-model="keyword" placeholder="请输入要搜索的内容" class="searchInput" @change="initData"></el-input>
                                </span>
                                <span>
                                    <el-button type="primary" icon="el-icon-search" class="searchBtn" @click="search()">搜索</el-button>
                                </span>
                            </div>
                            <div class="table_wrap">
                                <el-table border :data="currPutDetail" style="width: 100%" :default-sort="{prop: 'recName', order: 'descending'}">
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
                                    <el-table-column prop="city" label="城市" min-width="6.7%" :filters="filterCityData" :filter-method="filterCity">
                                    </el-table-column>
                                    <el-table-column prop="rName" label="区域" min-width="6.7%" :filters="filtersArea" :filter-method="filterRName">
                                    </el-table-column>
                                    <el-table-column prop="resName" label="资源名称" min-width="11.9%" class="tar">
                                    </el-table-column>
                                    <el-table-column prop="resAddress" label="地址" min-width="19.5%">
                                    </el-table-column>
                                    <el-table-column prop="cType" label="楼盘类型" min-width="6.1%">
                                    </el-table-column>
                                    <el-table-column prop="chDay" label="入住时间" min-width="6.1%" class="tar">
                                    </el-table-column>
                                    <el-table-column label="楼盘价格" min-width="7.6%">
                                        <template slot-scope="scope">
                                            <span>{{priceFormat(scope.row.hPrice/100)}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="hNum" label="户数" min-width="5.6%">
                                    </el-table-column>
                                    <el-table-column label="媒体数量" prop="mediaNum" min-width="6.1%">
                                        <!-- <template slot-scope="scope">
                                            <span>{{scope.row.asidList.split(',').length}}</span>
                                        </template> -->
                                    </el-table-column>
                                    <el-table-column label="操作" min-width="6.1%">
                                        <template slot-scope="scope">
                                            <el-button type="text" @click="showImg(scope.row)">查看监播</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                    </el-tab-pane>
                    <!-- <el-tab-pane label="地图展示" name="second">
                        <div class="sec-wrap box-wrap">
                            <h4>地图展示</h4>
                            <div class="map">

                            </div>
                        </div>
                    </el-tab-pane> -->
                    <el-tab-pane label="监播图片" name="third">
                        <div class="sec-wrap box-wrap">
                            <h4>监播图片</h4>
                            <div class="tabs">
                                <button class="active" @click="changeImgType">按资源分</button>
                                <button @click="changeImgType">按图片分</button>
                            </div>
                            <div class="typeOfRec" v-if="isActive">
                                <div>
                                    <div class="picBox" v-for="(up, upIndex) of currUpReportArr" :key="up.asID" @mouseenter="showPreImg = upIndex" @mouseleave="showPreImg = null">
                                        <el-carousel :autoplay="false" trigger="click">
                                            <el-carousel-item v-for="(item, index) in up.upImgArr" :key="index">
                                                <img :src="item.url" alt="">
                                                <!--缩略图-->
                                                <div class="mask-btn" v-if="showPreImg == upIndex ">
                                                    <i class="el-icon-search" @click="handlePictureCardPreview(item.url)"></i>
                                                </div>
                                            </el-carousel-item>
                                        </el-carousel>
                                        <div class="pic-title">{{up.resName}}</div>
                                    </div>
                                </div>
                                <div class="pager">
                                    <!-- <el-pagination small background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[5, 10]" :page-size="5" layout=" sizes, prev, pager, next, jumper" :total="30">
                                    </el-pagination> -->
                                    <el-pagination small background :current-page="currUpPage" :page-sizes="[5, 10]" :page-size="pageUpSize" layout="sizes, prev, pager, next, jumper" :total="upReportArr.length" @size-change="handleUpSizeChange" @current-change='changeUpPage'>
                                    </el-pagination>
                                </div>
                            </div>
                            <div class="typeOfPic" v-if="!isActive">
                                <div>
                                    <div class="picBox" v-for="(img, index) of currImgInfo" :key="index" @mouseenter="showPreImg = index" @mouseleave="showPreImg = null">
                                        <img :src="img.pURL" alt="">
                                        <!--缩略图-->
                                        <div class="mask-btn" v-if="showPreImg == index ">
                                            <i class="el-icon-search" @click="handlePictureCardPreview(img.pURL)"></i>
                                        </div>
                                        <div class="pic-title">{{JSON.parse(img.pAlt).res}}</div>
                                    </div>
                                </div>
                                <div class="pager">
                                    <!-- <el-pagination small background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[5, 10]" :page-size="5" layout=" sizes, prev, pager, next, jumper" :total="30">
                                    </el-pagination> -->
                                    <el-pagination small background :current-page="currDownPage" :page-sizes="[5, 10]" :page-size="pageDownSize" layout="sizes, prev, pager, next, jumper" :total="imgInfo.length" @size-change="handleDownSizeChange" @current-change='changeDownPage'>
                                    </el-pagination>
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="发布情况" name="forth">
                        <div class="forth-wrap box-wrap">
                            <h4>发布情况</h4>
                            <div class="table_wrap">
                                <el-table border :data="postDetail" style="width: 100%" :default-sort="{prop: 'recName', order: 'descending'}">
                                    <el-table-column prop="city" label="城市" min-width="10.3%">
                                    </el-table-column>
                                    <el-table-column prop="planNum" label="计划点位数" min-width="18.6%">
                                    </el-table-column>
                                    <el-table-column prop="realNum" label="实际执行点位数" min-width="18.8%" class="tar">
                                    </el-table-column>
                                    <el-table-column prop="wrongNum" label="问题点位数" min-width="19.3%">
                                    </el-table-column>
                                    <el-table-column prop="resolveNum" label="问题解决数" min-width="19.8%">
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                    </el-tab-pane>
                </el-tabs>
                <!--缩略图对话框-->
                <el-dialog :visible.sync="dialogVisible">
                    <img style="width: 100%;height: 100%" :src="dialogImageUrl" alt="">
                </el-dialog>
                <!--监播图-->
                <el-dialog :visible.sync="isShowImgArr">
                    <el-carousel :autoplay="false" trigger="click">
                        <el-carousel-item v-for="(item, index) in ImgBoxArr" :key="index">
                            <img :src="item.url" alt="" style="height:100%;">
                        </el-carousel-item>
                    </el-carousel>
                </el-dialog>
            </div>
            <div class="ad_index_footer clearfix">
                <p>
                    Copyright &copy;2018 亲邻科技线上产品部
                </p>
            </div>
        </div>
    </div>

</template>

<script>
import { api } from "../../api/api";
// 城市区域变成中文
import areaToText from "../../commonFun/areaToText_new.js";
// 价格格式化
import commaFormat from "../../commonFun/commaFormat.js";
// 筛选过滤
import filterFormat from "../../commonFun/filterTableData.js";
// 时间格式化
import dateFormat from "../../commonFun/timeFormat.js";
import {
    Dialog,
    Tabs,
    TabPane,
    Table,
    TableColumn,
    Input,
    Button,
    Upload,
    Select,
    Option,
    Checkbox,
    Card,
    Progress,
    Cascader,
    Pagination,
    MessageBox,
    Message,
    Form,
    FormItem,
    Carousel,
    CarouselItem
} from "element-ui";
export default {
    name: "upReport",
    components: {
        elDialog: Dialog,
        elTabs: Tabs,
        elTabPane: TabPane,
        elTable: Table,
        elTableColumn: TableColumn,
        elInput: Input,
        elButton: Button,
        elUpload: Upload,
        elSelect: Select,
        elOption: Option,
        elCheckbox: Checkbox,
        elCard: Card,
        elProgress: Progress,
        elCascader: Cascader,
        elPagination: Pagination,
        elForm: Form,
        elFormItem: FormItem,
        elCarousel: Carousel,
        elCarouselItem: CarouselItem
    },
    data() {
        return {
            currUpPage: 1,
            currDownPage: 1,
            pageUpSize: 5,
            pageDownSize: 5,
            //显示预览图蒙版
            showPreImg: null,
            upReport: {
                apName: "第一个投放方案",
                bTitle: "新光百货",
                cName: "新光百货",
                rIDs: "广州市,北京市,重庆市",
                apcTime: "May 9, 2018 6:29:47 PM",
                totalNum: "200"
            },
            //投放详情
            putDetail: [],
            currPutDetail: [],
            // 城市过滤
            filterCityData: [],
            // 区域过滤
            filtersArea: [],
            //搜索类型
            typeSelect: [
                { value: 1, label: "资源名称" },
                { value: 2, label: "商圈" }
            ],
            //搜索框
            keyword: "",
            select: 1,
            // tab选项
            planPanel: "first",
            //发布情况
            postDetail: [],
            // 监播图片
            upReportArr: [],
            currUpReportArr: [],
            imgInfo: [],
            currImgInfo: [],
            // 查看监播
            isShowImgArr: false,
            // 监播图片组合
            ImgBoxArr: [],
            //监播图片内容为true则是按照资源分，false按照图片分
            isActive: true,

            //缩略图对话框
            dialogVisible: false,
            dialogImageUrl: ""
        };
    },
    created() {
        // 获取公司信息
        this.getCompanyInfo();
        // 投放城市
        this.getInitData();
    },
    methods: {
        // 分页功能
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
            let arr = this.upReportArr;
            let total = arr.length;
            let resultArr = [];
            for (
                let i = (page - 1) * pageSize;
                i < (page * pageSize < total ? page * pageSize : total);
                i++
            ) {
                resultArr.push(arr[i]);
            }
            this.currUpReportArr = [];
            this.currUpReportArr = resultArr;
            console.log("currUpReportArr", this.currUpReportArr);
            console.log("page", page, "pageSize", pageSize);
        },
        // 分页功能
        changeDownPage(page) {
            let pageSize = this.pageDownSize;
            let arr = this.imgInfo;
            let total = arr.length;
            let resultArr = [];
            for (
                let i = (page - 1) * pageSize;
                i < (page * pageSize < total ? page * pageSize : total);
                i++
            ) {
                resultArr.push(arr[i]);
            }
            this.currImgInfo = [];
            this.currImgInfo = resultArr;
            console.log("currImgInfo", this.currImgInfo);
            console.log("page", page, "pageSize", pageSize);
        },
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
        // 获取公司信息
        getCompanyInfo() {
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
                        let result = res.data;
                        this.upReport = result;
                        api
                            .getApi("/GetAPD", info)
                            .then(res => {
                                console.log(res.data);
                                if (!res.data.SysCode) {
                                    let arr = res.data;
                                    let sum = 0;
                                    for (let data of arr) {
                                        sum += data.pdNum;
                                        // 发布情况
                                        data.city = areaToText.toTextCity(
                                            data.rID
                                        );
                                        // {
                                        //     city: "深圳",
                                        //     planNum: 200,
                                        //     realNum: 200,
                                        //     wrongNum: 0,
                                        //     resolveNum: 0
                                        // }
                                        data.planNum = data.pdNum;
                                        data.realNum = data.pdNum;
                                        data.wrongNum = 0;
                                        data.resolveNum = 0;
                                    }
                                    this.$set(this.upReport, "totalNum", sum);
                                    this.postDetail = arr;

                                    // this.upReport.totalNum = sum;
                                }
                            })
                            .catch(res => {
                                console.log(res);
                            });
                    } else {
                        Message.warning(res.data.MSG);
                    }
                })
                .catch(res => {
                    console.log(res);
                });
        },
        // 投放详情
        getInitData() {
            // // 测试数据
            // let tempADList = [
            //     {
            //         asID: 3644,
            //         lID: 428,
            //         cType: "高端住宅",
            //         lStar: "Jun 15, 2018",
            //         tradingArea: "北苑片区",
            //         adSize: "1180*840",
            //         assetTag: "NBJ00236",
            //         rID: 110105,
            //         resID: 11194,
            //         hNum: 2100,
            //         fNum: 26,
            //         resName: "润泽悦溪",
            //         chDay: "2011年",
            //         hPrice: 8000000,
            //         rName: "朝阳区",
            //         asLab: "A",
            //         adViewSize: "1154*813",
            //         mTitle: "西南门7",
            //         lEnd: "Jun 29, 2018",
            //         resAddress: "北京市朝阳区来广营乡水岸庄园（润泽悦溪）"
            //     },
            //     {
            //         asID: 3642,
            //         lID: 429,
            //         cType: "高端住宅",
            //         lStar: "Jun 15, 2018",
            //         tradingArea: "北苑片区",
            //         adSize: "1180*840",
            //         assetTag: "NBJ00235",
            //         rID: 110105,
            //         resID: 11194,
            //         hNum: 2100,
            //         fNum: 26,
            //         resName: "润泽悦溪",
            //         chDay: "2011年",
            //         hPrice: 8000000,
            //         rName: "朝阳区",
            //         asLab: "A",
            //         adViewSize: "1154*813",
            //         mTitle: "西北门6",
            //         lEnd: "Jun 29, 2018",
            //         resAddress: "北京市朝阳区来广营乡水岸庄园（润泽悦溪）"
            //     },
            //     {
            //         asID: 3634,
            //         lID: 430,
            //         cType: "高端住宅",
            //         lStar: "Jun 15, 2018",
            //         tradingArea: "北苑片区",
            //         adSize: "1180*840",
            //         assetTag: "NBJ00231",
            //         rID: 110105,
            //         resID: 11192,
            //         hNum: 1700,
            //         fNum: 20,
            //         resName: "拂林园",
            //         chDay: "2000年",
            //         hPrice: 5600000,
            //         rName: "朝阳区",
            //         asLab: "A",
            //         adViewSize: "1154*813",
            //         mTitle: "西门4",
            //         lEnd: "Jun 29, 2018",
            //         resAddress: "北京市朝阳区北五环红军营南路"
            //     },
            //     {
            //         asID: 3632,
            //         lID: 431,
            //         cType: "高端住宅",
            //         lStar: "Jun 15, 2018",
            //         tradingArea: "北苑片区",
            //         adSize: "1180*840",
            //         assetTag: "NBJ00230",
            //         rID: 110105,
            //         resID: 11192,
            //         hNum: 1700,
            //         fNum: 20,
            //         resName: "拂林园",
            //         chDay: "2000年",
            //         hPrice: 5600000,
            //         rName: "朝阳区",
            //         asLab: "A",
            //         adViewSize: "1154*813",
            //         mTitle: "东门3",
            //         lEnd: "Jun 29, 2018",
            //         resAddress: "北京市朝阳区北五环红军营南路"
            //     },
            //     {
            //         asID: 3630,
            //         lID: 432,
            //         cType: "高端住宅",
            //         lStar: "Jun 15, 2018",
            //         tradingArea: "北苑片区",
            //         adSize: "1180*840",
            //         assetTag: "NBJ00229",
            //         rID: 110105,
            //         resID: 11192,
            //         hNum: 1700,
            //         fNum: 20,
            //         resName: "拂林园",
            //         chDay: "2000年",
            //         hPrice: 5600000,
            //         rName: "朝阳区",
            //         asLab: "A",
            //         adViewSize: "1154*813",
            //         mTitle: "东南门2",
            //         lEnd: "Jun 29, 2018",
            //         resAddress: "北京市朝阳区北五环红军营南路"
            //     }
            // ];
            // // let upImginfo = [
            // //     {
            // //         pAlt: "广州市-越秀区-帝景山庄-帝景3门3-A",
            // //         pID: 283,
            // //         pSrc:
            // //             "/data/web/beta.qinlinad.com/upload/2018/6/076785993d7e4189a69d27e023c1584e.png",
            // //         pType: "SK",
            // //         pURL:
            // //             "https://beta.qinlinad.com/upload/2018/6/076785993d7e4189a69d27e023c1584e.png",
            // //         pUTime: "2018-06-09 18:55:26.0",
            // //         ptID: 5,
            // //         ptP: "7",
            // //         puID: 3
            // //     },
            // //     {
            // //         pAlt: "广州市-越秀区-帝景山庄-帝景3门3-A",
            // //         pID: 274,
            // //         pSrc:
            // //             "/data/web/beta.qinlinad.com/upload/2018/6/83d326c78d3647debba869c966c186fa.png",
            // //         pType: "SK",
            // //         pURL:
            // //             "https://beta.qinlinad.com/upload/2018/6/83d326c78d3647debba869c966c186fa.png",
            // //         pUTime: "2018-06-09 18:31:14.0",
            // //         ptID: 5,
            // //         ptP: "7",
            // //         puID: 3
            // //     },
            // //     {
            // //         pAlt: "广州市-越秀区-帝景山庄-帝景3门3-A",
            // //         pID: 245,
            // //         pSrc:
            // //             "/data/web/beta.qinlinad.com/upload/2018/6/83d326c78d3647debba869c966c186fa.png",
            // //         pType: "SK",
            // //         pURL:
            // //             "https://beta.qinlinad.com/upload/2018/6/83d326c78d3647debba869c966c186fa.png",
            // //         pUTime: "2018-06-09 18:31:14.0",
            // //         ptID: 2,
            // //         ptP: "7",
            // //         puID: 3
            // //     },
            // //     {
            // //         pAlt: "广州市-越秀区-帝景山庄-帝景3门3-A",
            // //         pID: 234,
            // //         pSrc:
            // //             "/data/web/beta.qinlinad.com/upload/2018/6/83d326c78d3647debba869c966c186fa.png",
            // //         pType: "SK",
            // //         pURL:
            // //             "https://beta.qinlinad.com/upload/2018/6/076785993d7e4189a69d27e023c1584e.png",
            // //         pUTime: "2018-06-09 18:31:14.0",
            // //         ptID: 2,
            // //         ptP: "7",
            // //         puID: 3
            // //     }
            // // ];
            // let upImginfo = [
            //     {
            //         pAlt:
            //             '{"plan":"北京方案test3","res":"龙阁公寓","media":"南门","city":"北京市","area":"朝阳区","asLab":"A","lstart":"Jun 28, 2018","lend":"Jul 12, 2018","assettag":"NBJ00323","brand":"AC9美容院","username":"周昭杰","resid":11229}',
            //         pID: 321,
            //         pSrc:
            //             "/data/web/beta.qinlinad.com/upload/2018/6/8f4e2601541f487b9a4634f7943f1e01.png",
            //         pType: "SK",
            //         pURL:
            //             "https://beta.qinlinad.com/upload/2018/6/8f4e2601541f487b9a4634f7943f1e01.png",
            //         pUTime: "2018-06-12 15:08:45.0",
            //         ptID: 3644,
            //         ptP: "35",
            //         puID: 3
            //     },
            //     {
            //         pAlt:
            //             '{"plan":"北京方案test3","res":"龙阁公寓","media":"南门","city":"北京市","area":"朝阳区","asLab":"A","lstart":"Jun 28, 2018","lend":"Jul 12, 2018","assettag":"NBJ00323","brand":"AC9美容院","username":"周昭杰","resid":11229}',
            //         pID: 320,
            //         pSrc:
            //             "/data/web/beta.qinlinad.com/upload/2018/6/5ff93ff39b52454a802eedbd6745ffa3.png",
            //         pType: "SK",
            //         pURL:
            //             "https://beta.qinlinad.com/upload/2018/6/5ff93ff39b52454a802eedbd6745ffa3.png",
            //         pUTime: "2018-06-12 15:08:39.0",
            //         ptID: 3644,
            //         ptP: "35",
            //         puID: 3
            //     },
            //     {
            //         pAlt:
            //             '{"plan":"北京方案test3","res":"龙锦苑东5区","media":"南门3","city":"北京市","area":"昌平区","asLab":"A","lstart":"Jun 28, 2018","lend":"Jul 12, 2018","assettag":"NBJ01493","brand":"AC9美容院","username":"周昭杰","resid":11645}',
            //         pID: 319,
            //         pSrc:
            //             "/data/web/beta.qinlinad.com/upload/2018/6/54cdb518a7ca4eed99247e6718022a2e.png",
            //         pType: "SK",
            //         pURL:
            //             "https://beta.qinlinad.com/upload/2018/6/54cdb518a7ca4eed99247e6718022a2e.png",
            //         pUTime: "2018-06-12 15:08:30.0",
            //         ptID: 3630,
            //         ptP: "35",
            //         puID: 3
            //     },
            //     {
            //         pAlt:
            //             '{"plan":"北京方案test3","res":"龙锦苑东5区","media":"南门3","city":"北京市","area":"昌平区","asLab":"A","lstart":"Jun 28, 2018","lend":"Jul 12, 2018","assettag":"NBJ01493","brand":"AC9美容院","username":"周昭杰","resid":11645}',
            //         pID: 318,
            //         pSrc:
            //             "/data/web/beta.qinlinad.com/upload/2018/6/7a9614e275bd4ae2a7d5d9cd99653a8e.png",
            //         pType: "SK",
            //         pURL:
            //             "https://beta.qinlinad.com/upload/2018/6/7a9614e275bd4ae2a7d5d9cd99653a8e.png",
            //         pUTime: "2018-06-12 15:08:20.0",
            //         ptID: 3630,
            //         ptP: "35",
            //         puID: 3
            //     }
            // ];

            // for (let temp of tempADList) {
            //     temp.city = areaToText.toTextCity(temp.rID);
            // }

            // tempADList = this.constructData(tempADList);
            // this.filterCityData = filterFormat(tempADList, "city");
            // this.filtersArea = filterFormat(tempADList, "rName");

            // // console.log('arr', arr);
            // // this.putDetail = tempADList;
            // this.putDetail = tempADList;
            // this.currPutDetail = this.putDetail;

            // // 上刊数据(组合图片按资源分)
            // tempADList = this.constructImg(tempADList, upImginfo);
            // this.upReportArr = tempADList;
            // console.log("upImginfo", this.upReportArr);
            // // 上刊数据(组合图片按图片分)
            // // this.imgInfo = this.initImg(tempADList, upImginfo);
            // this.imgInfo = upImginfo;

            // 真实数据
            let uid = JSON.parse(sessionStorage.getItem("session_data")).uID;
            let info = {
                uid: uid,
                apid: sessionStorage.getItem("order_apid")
            };
            // uid         int【必填】     当前账户UserID
            // apid        int             公司对应方案apID
            api
                .getApi("/GetAdLaunch", info)
                .then(res => {
                    console.log(res.data);
                    if (!res.data.SysCode) {
                        let resArr = res.data;
                        resArr = this.constructData(resArr);
                        for (let result of resArr) {
                            result.city = areaToText.toTextCity(result.rID);
                        }
                        this.filterCityData = filterFormat(resArr, "city");
                        this.filtersArea = filterFormat(resArr, "rName");
                        this.putDetail = resArr;
                        this.currPutDetail = this.putDetail;

                        // uid         int【必填】         当前账户UserID
                        // ptype       String【必填】      关联类型
                        // ptid        int                 关联类型对应唯一ID
                        // ptp         String              关联类型区分属性
                        let imginfo = {
                            uid: JSON.parse(
                                sessionStorage.getItem("session_data")
                            ).uID,
                            ptype: "SK",
                            ptp: sessionStorage.getItem("order_apid")
                        };
                        api
                            .postApi("/GetImg", imginfo)
                            .then(res => {
                                console.log(res.data);
                                let upImginfo = res.data;
                                // 上刊数据(组合图片)
                                resArr = this.constructImg(resArr, upImginfo);
                                this.upReportArr = resArr;
                                this.currUpReportArr = JSON.parse(
                                    JSON.stringify(this.upReportArr)
                                );
                                this.changeUpPage(1);
                                console.log("upimginfo", this.upReportArr);
                                // 上刊数据(组合图片按图片分)
                                this.imgInfo = this.initImg(resArr, upImginfo);
                                this.currImgInfo = JSON.parse(
                                    JSON.stringify(this.imgInfo)
                                );
                                this.changeDownPage(1);
                                console.log(
                                    "imgInfo----------------",
                                    this.imgInfo
                                );
                            })
                            .catch(res => {
                                console.log(res);
                            });
                    } else {
                        Message.warning(res.data.MSG);
                    }
                })
                .catch(res => {
                    console.log(res);
                });
        },
        // 组装数据
        constructData(initData) {
            let result = [];
            for (let data of initData) {
                let door = 1;
                for (let res of result) {
                    if (res.resID == data.resID) {
                        door = 0;
                    }
                }
                if (door) {
                    result.push(data);
                }
            }
            console.log("reuslt-------", result);
            for (let res of result) {
                let asIDs = "";
                let mediaNum = 0;
                for (let init of initData) {
                    if (res.resID == init.resID) {
                        if (asIDs === "") {
                            asIDs = init.asID.toString();
                            mediaNum = 1;
                        } else {
                            asIDs = asIDs + "," + init.asID;
                            mediaNum++;
                        }
                    }
                }
                res.mediaNum = mediaNum;
                console.log("asidS", asIDs);
            }
            return result;
        },
        // 按照图片分类
        initImg(arr, imgArr) {
            for (let img of imgArr) {
                for (let data of arr) {
                    if (data.asID == img.ptID) {
                        img.resName = data.resName;
                        break;
                    }
                }
            }
            return imgArr;
        },
        // 组合上下刊图片数据(按照资源分类)
        constructImg(arr, imgArr) {
            for (let data of arr) {
                let img = [];
                for (let item of imgArr) {
                    let alt = JSON.parse(item.pAlt);
                    if (data.resID == alt.resid) {
                        // uid         int【必填】         当前账户UserID
                        // pid         int【必填】         图库pID
                        // palt        String              图片标题
                        // ptype       String              关联类型
                        // ptid        int                 关联类型对应唯一ID
                        // ptp         String              关联类型区分属性
                        img.push({
                            name: item.pID + ".png",
                            url: item.pURL,
                            uid: item.puID,
                            pid: item.pID,
                            palt: item.pAlt,
                            ptype: item.pType,
                            ptid: item.ptID,
                            ptp: item.ptP
                        });
                    }
                }
                data.upImgArr = img;
            }
            console.log("arr-Img--------------", arr);
            return arr;
        },
        // 查看监播
        showImg(row) {
            console.log(row);
            this.ImgBoxArr = row.upImgArr;
            this.isShowImgArr = true;
        },
        // 当搜索框为空的时候进行重置显示
        initData() {
            if (!this.keyword) {
                this.currPutDetail = this.putDetail;
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
                for (let data of this.putDetail) {
                    if (data.resName) {
                        if (select == "1" && data.resName.includes(keyword)) {
                            arr.push(data);
                        }
                    }
                    if (data.tradingArea) {
                        if (
                            select == "2" &&
                            data.tradingArea.includes(keyword)
                        ) {
                            arr.push(data);
                        }
                    }
                }
                this.currPutDetail = arr;
                return;
            }
            this.currPutDetail = this.putDetail;
        },
        // 城市转换为中文
        cityToText(rid) {
            return areaToText.toTextCity(rid);
        },
        // 时间格式规范
        formatTime(val) {
            return dateFormat.toDate(val, "/");
        },
        // 价格加上逗号
        priceFormat(price) {
            // console.log('price', price);
            return commaFormat.init(price);
        },
        //缩略图
        handlePictureCardPreview(url) {
            console.log("item", url);
            this.dialogImageUrl = url;
            this.dialogVisible = true;
        },
        filterCity(value, row) {
            return row.city === value;
        },
        filterRName(value, row) {
            return row.rName === value;
        },

        changeImgType() {
            this.isActive = !this.isActive;
        },
        //页码
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        }
    },
    mounted() {
        $(function() {
            $(".tabs")
                .find("button")
                .click(function() {
                    $(this)
                        .addClass("active")
                        .siblings()
                        .removeClass("active");
                });
            // $(".picBox")
            //     .mouseenter(function() {
            //         $(this)
            //             .find(".mask-btn")
            //             .show();
            //     })
            //     .mouseleave(function() {
            //         $(this)
            //             .find(".mask-btn")
            //             .hide();
            //     });
        });
    }
};
</script>

<style scoped>
.ad_mediaMana_wrap {
    width: 100%;
    box-sizing: border-box;
    padding: 40px 60px;
    position: relative;
}

.mediaMana_content_top {
    padding: 28px 31px 60px;
    width: 1247px;
    box-sizing: border-box;
    background: #fff url("../../assets/images/upReportBg.png") right no-repeat;
    /*height: 100px;*/
}

.title {
    border-bottom: 1px solid #d8d8d8;
    margin-right: 200px;
}

.title h1 {
    font-size: 28px;
    margin-bottom: 8px;
    color: rgba(0, 0, 0, 0.85);
    font-weight: bold;
}

.title h3 {
    font-size: 20px;
    color: #333333;
    font-weight: bold;
    margin-bottom: 12px;
}

.detail p {
    margin-top: 12px;
}

.detail p em {
    font-size: 14px;
    color: #333333;
    margin-left: 24px;
}

.detail p em:nth-of-type(1) {
    margin-left: 0;
}

.detail p i {
    font-size: 14px;
    color: #2a2a2a;
    font-style: normal;
}

.plan-panel {
    width: 1247px;
    position: relative;
    top: -40px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}

/* /deep/ .el-tabs__item {
     width: 88px;
     padding: 0;
     text-align: center;
   }

   /deep/ .el-tabs__active-bar {
     width: 88px !important;
     !*transform: translateX(88px) !important;*!
   }*/

/deep/ .el-tabs__nav-wrap::after {
    background-color: transparent;
}

/deep/ .el-tabs__nav-scroll {
    padding-left: 30px;
}

/*投放详情*/
.searchBtn {
    background: #1890ff;
    border-radius: 4px;
    width: 76px;
    height: 34px;
    position: relative;
    left: 16px;
    /*top: 3px;*/
    padding: 0;
}

.search-wrap span {
    float: left;
    margin-left: 2px;
    margin-bottom: 30px;
}

.first-wrap /deep/ .el-select .el-input .el-select__caret {
    position: relative;
    left: 0;
    top: 2px;
}

/*超出省略*/
/deep/ .el-table .cell {
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.el-input {
    width: 300px;
    height: 34px;
}

/deep/ .el-table td,
.el-table th {
    padding: 2px 0;
}

/deep/ .type-select .el-input,
/deep/ .type-select .el-input__inner {
    width: 95px;
    position: relative;
    top: 2px;
    left: 10px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    padding-right: 0;
    padding-left: 10px;
    height: 34px;
}

.searchInput /deep/ .el-input__inner,
.searchInput {
    width: 224px !important;
    position: relative;
    left: 7px;
    top: 0;
    height: 34px;
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
}

/deep/ .el-input__suffix {
    right: -6px;
}

.box-wrap {
    border: 1px solid #e6e7e9;
    background-color: #ffffff;
    width: 100%;
    box-sizing: border-box;
    border-radius: 4px;
}

.box-wrap > h4 {
    margin-bottom: 16px;
    height: 55px;
    padding-left: 28px;
    border-bottom: 1px solid #e6e7e9;
    font-size: 16px;
    color: rgba(51, 51, 51, 0.85);
    line-height: 55px;
    font-weight: bold;
}

/deep/ .el-table__column-filter-trigger {
    position: relative;
    left: 5px;
}

/deep/ .el-table th,
.el-table tr {
    background: #f7f7f7;
    padding: 4px 0;
}

/deep/ .el-table th > .cell {
    color: #666666;
    line-height: 14px;
    font-weight: bold;
}

/deep/ .el-table__expanded-cell[class*="cell"] {
    padding: 0 45px;
    background-color: #f7f7f7;
}

/deep/ .el-table__expanded-cell[class*="cell"] .el-form {
    height: 44px;
    line-height: 44px;
}

/deep/ .el-form-item__label {
    padding: 0 0 0 12px;
}

/deep/ .el-form-item__content {
    line-height: 46px;
}

/deep/ .el-table_1_column_9,
/deep/ .el-table_1_column_10 {
    text-align: right !important;
}

/*滚动条*/
/deep/ .el-table__body-wrapper {
    height: 450px;
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

.el-table {
    border-radius: 4px;
}

.table_wrap {
    padding: 10px 29px 29px;
}

/deep/ .el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: #ecf5ff;
}

/deep/ .el-tabs__item.is-active {
    font-weight: bold;
}

.ad_index_footer {
    font-size: 14px;
    color: #8a8a8a;
    text-align: center;
}

/*地图展示*/
.sec-wrap .map {
    width: 1246px;
    height: 527px;
    padding: 21px 29px;
}

/*监播图片*/
.tabs {
    padding-left: 24px;
    margin-bottom: 12px;
    height: 34px;
}

.tabs button {
    width: 88px;
    height: 32px;
    outline: none;
    border: 1px solid #d9d9d9;
    border-radius: 4px 0 0 4px;
    background-color: #fff;
    cursor: pointer;
    float: left;
}

.tabs button + button {
    /*margin-left: 1px;*/
    border-radius: 0 4px 4px 0;
}

.tabs button.active {
    border: 1px solid #1890ff;
    font-weight: bold;
    color: #1890ff;
}

/*图片切换*/
.typeOfRec,
.typeOfPic {
    padding: 0 24px 30px;
}

.picBox {
    width: 220px;
    height: 326px;
    padding: 4px;
    box-sizing: border-box;
    border: 1px solid #e9e9e9;
    border-radius: 2px;
    display: inline-block;
    margin-bottom: 22px;
    position: relative;
}

.picBox + .picBox {
    margin-left: 19px;
}

.picBox img {
    width: 210px;
    height: 280px;
    margin-bottom: 4px;
    border-bottom: 1px solid #e9e9e9;
}

.picBox .pic-title {
    font-size: 14px;
    color: #666666;
    text-align: center;
    line-height: 22px;
}

/deep/ .el-carousel__button {
    width: 18px;
}

/deep/ .el-carousel__indicators {
    bottom: 28px;
}

/*发布情况*/
.forth-wrap /deep/ .el-table th,
.el-table tr {
    padding: 6px 0;
}

.forth-wrap /deep/ .el-table .cell {
    padding: 9px 14px;
}

/deep/ .el-table_2_column_13,
/deep/ .el-table_2_column_14,
/deep/ .el-table_2_column_15 {
    text-align: right;
}

/* .mask-btn {
    display: none;
} */

.mask-btn .el-icon-search {
    position: absolute;
    left: 43%;
    top: 43%;
    font-size: 30px;
    color: #fff;
    cursor: pointer;
    z-index: 2;
}

/*页码*/
.pager {
    position: relative;
    height: 32px;
    margin-top: 18px;
    top: -22px;
    right: 0px;
}

/deep/ .el-select .el-input .el-select__caret {
    position: relative;
    left: -9px;
}

/deep/ .el-select {
    top: -4px;
}

/deep/ .btn-prev {
    position: relative;
    top: -4px !important;
}

/deep/ .el-pagination {
    position: absolute;
    right: 0;
    top: 10px;
}

/deep/ .el-pagination.is-background .el-pager li {
    font-weight: normal;
    font-size: 13px;
    background-color: transparent;
}

/deep/ .el-pagination button,
.el-pagination span:not([class*="suffix"]) {
    position: relative;
    top: 0px !important;
    background-color: transparent !important;
}

/deep/ .el-pagination__jump {
    margin-left: 13px;
    position: relative;
    top: -4px;
}

/deep/ .el-card__body {
    display: flex;
    flex-wrap: wrap;
}

/*1440*/
@media all and (min-width: 1420px) {
    .mediaMana_content_top,
    .plan-panel {
        width: 1320px;
    }

    .picBox + .picBox {
        margin-left: 37px;
    }
}

/*1920*/
@media all and (min-width: 1900px) {
    .mediaMana_content_top,
    .plan-panel {
        width: 1800px;
    }

    .picBox + .picBox[data-v-74e3f71e] {
        margin-left: 118px;
    }

    .typeOfRec[data-v-74e3f71e],
    .typeOfPic[data-v-74e3f71e] {
        padding: 0 103px 30px;
    }
}
</style>
