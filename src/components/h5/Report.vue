<template>
    <div>
        <div class="ad_mediaMana_wrap">
            <div class="mediaMana_content_top">
                <div class="content_top_wrap">
                    <div class="title">
                        <h1>{{upReport.apName}}{{(Info.name =='SK')?'上刊':'下刊'}}报告</h1>
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
                                <el-table border :data="currPutDetail" style="width: 100%" :default-sort="{prop: 'recName', order: 'descending'}" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
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

                                <div class="picBox" v-for="(up, upIndex) of upReportArr" :key="up.asID" @mouseenter="showPreImg = upIndex" @mouseleave="showPreImg = null">
                                    <el-carousel :autoplay="false" trigger="click">
                                        <el-carousel-item v-for="(item, index) in up.upImgArr" :key="index">
                                            <!-- <img :src="item.url" alt=""> -->
                                            <img v-lazyload="item.url" alt="">
                                            <!--缩略图-->
                                            <div class="mask-btn" v-if="showPreImg == upIndex ">
                                                <i class="el-icon-search" @click="handlePictureCardPreview(item.url)"></i>
                                            </div>
                                        </el-carousel-item>
                                    </el-carousel>
                                    <div class="pic-title">{{up.resName}}</div>

                                </div>
                            </div>
                            <div class="typeOfPic" v-if="!isActive">
                                <div class="picBox" v-for="(img, index) of imgInfo" :key="index" @mouseenter="showPreImg = index" @mouseleave="showPreImg = null">
                                    <!-- <img :src="img.pURL" alt=""> -->
                                    <img v-lazyload="img.pURL" alt="">
                                    <!--缩略图-->
                                    <div class="mask-btn" v-if="showPreImg == index ">
                                        <i class="el-icon-search" @click="handlePictureCardPreview(img.pURL)"></i>
                                    </div>
                                    <div class="pic-title">{{JSON.parse(img.pRemarks).res}}</div>
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
                <el-dialog :visible.sync="isShowImgArr" class="JB">
                    <div style="clear: both">
                        <el-carousel :autoplay="false" trigger="click">
                            <el-carousel-item v-for="(item, index) in ImgBoxArr" :key="index">
                                <img :src="item.url" alt="" style="width:100%; height:100%;">
                            </el-carousel-item>
                        </el-carousel>
                    </div>
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
import Vue from "vue";
import LazyLoad from "../../commonFun/lazyLoad.js";

Vue.use(LazyLoad);
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
    name: "Report",
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
            loading: true,
            Info: {},
            currUpPage: 1,
            currDownPage: 1,
            pageUpSize: 5,
            pageDownSize: 5,
            //显示预览图蒙版
            showPreImg: null,
            upReport: {},
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
        this.getRouter();
        this.getData();
    },
    methods: {
        // 获取路由数据
        getRouter() {
            let route = this.$route.query;
            console.log(route);
            this.Info.name = Object.keys(route);
            this.Info.val = route[this.Info.name];
        },
        // 获取原始数据
        getData() {
            let name = this.Info.name.toString().toLowerCase();
            let val = this.Info.val;
            let info = {
                [name]: val
            };
            api
                .getApi("/GetReport", info)
                .then(res => {
                    console.log(res.data);
                    if (!res.data.SysCode) {
                        let data = res.data;
                        // 上下刊抬头信息
                        this.upReport = data.FanganInfo;
                        // 发布信息
                        this.postDetail = this.getPostDetail(data.APD);
                        // 投放详情
                        this.putDetail = this.getPutDetail(data.AdL, data.Img);
                        this.currPutDetail = JSON.parse(
                            JSON.stringify(this.putDetail)
                        );
                        // this.getImgInfo(this.putDetail, data.Img);

                        // 按照资源分
                        // this.getImgInfo(data.AdL, data.Img);
                        // this.upReportArr = data.ImgInfo;
                        // this.imgInfo = data.ImgInfo;
                        this.loading = false;
                    } else if (res.data.SysCode == 100302) {
                        this.loading = false;
                        this.loginTimeout();
                    } else {
                        this.loading = false;
                        Message.warning(res.data.MSG);
                    }
                })
                .catch(res => {
                    this.loading = false;
                    console.log(res);
                });
        },
        // 投放详情
        getPutDetail(resArr, upImginfo) {
            resArr = this.constructData(resArr);
            for (let result of resArr) {
                result.city = areaToText.toTextCity(result.rID);
            }
            this.filterCityData = filterFormat(resArr, "city");
            this.filtersArea = filterFormat(resArr, "rName");
            // return resArr;

            // 上刊数据(组合图片)
            resArr = this.constructImg(resArr, upImginfo);
            this.upReportArr = resArr;
            // this.currUpReportArr = JSON.parse(JSON.stringify(this.upReportArr));
            console.log("upimginfo", this.upReportArr);
            // 上刊数据(组合图片按图片分)
            this.imgInfo = this.initImg(resArr, upImginfo);
            // this.currImgInfo = JSON.parse(JSON.stringify(this.imgInfo));
            console.log("imgInfo----------------", this.imgInfo);

            return resArr;
            // this.putDetail = resArr;
            // this.currPutDetail = this.putDetail;
        },
        getImgInfo(resArr, upImginfo) {
            // 上刊数据(组合图片)
            resArr = this.constructImg(resArr, upImginfo);
            this.upReportArr = resArr;
            this.currUpReportArr = JSON.parse(JSON.stringify(this.upReportArr));
            console.log("upimginfo", this.upReportArr);
            // 上刊数据(组合图片按图片分)
            this.imgInfo = this.initImg(resArr, upImginfo);
            this.currImgInfo = JSON.parse(JSON.stringify(this.imgInfo));
            console.log("imgInfo----------------", this.imgInfo);
        },
        // 发布信息
        getPostDetail(arr) {
            let sum = 0;
            for (let data of arr) {
                sum += data.pdNum;
                // 发布情况
                data.city = areaToText.toTextCity(data.rID);
                data.planNum = data.pdNum;
                data.realNum = data.pdNum;
                data.wrongNum = 0;
                data.resolveNum = 0;
            }
            this.$set(this.upReport, "totalNum", sum);
            return arr;
            // this.postDetail = arr;
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
                res = res.toString().substring(0, res.toString().length - 1);
                console.log(res);
            }
            return res;
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
                    let prk = JSON.parse(item.pRemarks);
                    if (data.resID == prk.resid) {
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
                            ptp: item.ptP,
                            prk: item.pRemarks
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
            if (row.upImgArr.length) {
                this.ImgBoxArr = row.upImgArr;
                this.isShowImgArr = true;
            } else {
                Message.warning("暂无数据！！！");
            }
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
        loginTimeout() {
            Message.warning("登录超时,请重新登录");
            this.$router.push("/login");
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
    padding: 28px 31px 70px;
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
    font-size: 42px;
    margin-bottom: 8px;
    color: rgba(0, 0, 0, 0.85);
    /*font-weight: bold;*/
}

.title h3 {
    font-size: 24px;
    color: #333333;
    /*font-weight: bold;*/
    margin-bottom: 12px;
}

.detail p {
    margin-top: 12px;
}

.detail p em {
    font-size: 18px;
    color: #333333;
    margin-left: 24px;
}

.detail p em:nth-of-type(1) {
    margin-left: 0;
}

.detail p i {
    font-size: 18px;
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
    margin-bottom: 26px;
    height: 55px;
    /* padding-left: 28px; */
    padding-left: 32px;
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
    /* height: 450px;
    overflow-y: scroll;
    overflow-x: hidden; */
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

/*查看监播*/
.JB /deep/ .el-dialog {
    width: 42%;
    margin-top: 7vh;
}

.JB /deep/ .el-carousel__container {
    height: 650px;
}

/*地图展示*/
.sec-wrap .map {
    width: 1246px;
    height: 527px;
    padding: 21px 29px;
}

/*监播图片*/
/deep/ .el-dialog {
    width: 40%;
    height: 730px;
}

/deep/ .el-dialog__body {
    height: 640px;
}

.tabs {
    padding-left: 38px;
    margin-bottom: 25px;
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
    padding: 0 28px;
    display: flex;
    flex-wrap: wrap;
}

.picBox {
    width: 220px;
    height: 326px;
    padding: 4px;
    box-sizing: border-box;
    border: 1px solid #e9e9e9;
    border-radius: 2px;
    display: inline-block;
    margin-bottom: 42px;
    position: relative;
    margin-right: 8px;
    margin-left: 8px;
}

.picBox img {
    width: 210px;
    height: 280px;
    margin-bottom: 15px;
    border-bottom: 1px solid #e9e9e9;
}

.picBox .pic-title {
    font-size: 14px;
    color: #666666;
    text-align: center;
    line-height: 11px;
}

/deep/ .el-carousel__button {
    width: 18px;
}

/deep/ .el-carousel__indicators {
    /*bottom: 28px;*/
    position: absolute;
    list-style: none;
    bottom: 0;
    text-align: center;
    left: 50%;
    transform: translateX(-50%);
    margin: 0;
    padding: 0;
    z-index: 2;
    width: 100%;
}

/deep/ .el-carousel__button {
    background-color: #666;
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
/deep/ .el-table_2_column_15,
/deep/ .el-table_2_column_16 {
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

@media all and (min-width: 1420px) {
    .mediaMana_content_top,
    .plan-panel {
        width: 1320px;
    }
    .mediaMana_content_top {
        padding-bottom: 75px;
    }
    .box-wrap > h4 {
        margin-bottom: 75px;
    }
    .tabs {
        margin-bottom: 48px;
    }

    .picBox {
        margin-right: 9px;
        margin-left: 9px;
        width: 233.5px;
        height: 346px;
        margin-bottom: 38px;
    }
    /deep/ .el-carousel__container {
        height: 312px;
    }
    .picBox img {
        width: 100%;
        height: 285px;
    }
}

/*1920*/
@media all and (min-width: 1900px) {
    .mediaMana_content_top,
    .plan-panel {
        width: 1800px;
    }
    .mediaMana_content_top {
        padding-bottom: 145px;
    }
    .box-wrap > h4 {
        margin-bottom: 56px;
    }
    .tabs {
        margin-bottom: 62px;
    }

    .picBox {
        margin-right: 10px;
        margin-left: 10px;
        width: 322.2px;
        height: 477.5px;
        margin-bottom: 20.5px;
    }

    /deep/ .el-carousel__container {
        height: 446px;
    }
    .picBox img {
        width: 100%;
        height: 410px;
    }
}

@media print {
    @page {
        size: A4;
        width: 210mm;
    }
    @media all and (min-width: 1420px) {
        .mediaMana_content_top,
        .plan-panel {
            width: 1000px;
        }
    }
    @media all and (min-width: 1900px) {
        body {
            transform: scale(0.6);
        }
    }

    /*@page {*/
    /*width: 210mm!important;*/
    /*height: 297mm !important;*/
    /*}*/
    img {
        page-break-inside: avoid;
    }
}
</style>
