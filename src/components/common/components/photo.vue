<script>
import Vue from 'vue';
import LazyLoad from '../../../commonFun/lazyLoad.js'
Vue.use(LazyLoad);
// 时间格式化
import dateFormat from "../../../commonFun/timeFormat.js";
export default {
    props:{
        imgarr:{
            type: Array,
            default:[]
        },
        showPic:{
            type: Number,
            default: 1
        },
    },
    data(){
        return {
            //缩略图
            dialogImageUrl: "",
            dialogVisible: false,
            //显示预览图蒙版
            showPreImg: null,
        }
    },
    methods:{
        // 查看图片
        handlePictureCardPreview(item) {
            console.log('imgInfo--------', item);
            this.dialogImageUrl = item.pURL;
            this.dialogVisible = true;
        },
        // 时间格式规范
        formatTime(val) {
            return dateFormat.toDate(val, ".");
        },
    },
}
</script>
<template>
    <div>
        <div class="search-nav">
            <!--未搜索占位图-->
            <div class="tempPic">
                <div class="noFind" v-if="showPic === 1">
                    <img src="../../../assets/images/tempPic.png" alt="">
                    <p style="margin-top: -10px">请先输入筛选条件搜索你所需要的图片</p>
                </div>
                <div class="cantFind" v-if="showPic === 2">
                    <img src="../../../assets/images/noPic.png" alt="">
                    <h4>无匹配结果</h4>
                    <p>可以尝试扩大搜索范围重新搜索哦</p>
                </div>
                <!--图片列表-->
                <div class="find clearfix" v-if="showPic === 3">
                    <div class="photoCard" v-for="(img, index) of imgarr" :key="img.pID">
                        <div class="imgBox" @mouseenter="showPreImg = index" @mouseleave="showPreImg = null">
                            <!-- <img :src="img.pURL" alt="" class="smallImg"> -->
                            <img v-lazyload="img.pURL" alt="" class="smallImg">
                            <!--查看缩略图和下载-->
                            <div class="mask-btn" v-if="showPreImg == index">
                                <i class="el-icon-search" @click="handlePictureCardPreview(img)"></i>
                                <a :href="img.pURL" :download="formatTime(img.pUTime)+'下刊'+img.pAlt.account+img.pAlt.city+img.pAlt.area+img.pAlt.res+img.pAlt.assettag+'.png'">下载图片</a>
                            </div>
                        </div>
                        <div class="detailBox">
                            <p>{{img.pAlt.plan}}</p>
                            <!-- <span>华南碧桂园二期-东门</span> -->
                            <span>{{img.pAlt.res}}-{{img.pAlt.media}}</span>
                            <div class="icons">
                                <span class="el-icon-location">{{img.pAlt.city}}</span>
                                <span>
                                    <i class="fa fa-file-text"></i>
                                    {{img.pAlt.asLab}}面
                                </span>
                                <el-tooltip placement="bottom" effect="light">
                                    <span class="el-icon-info"></span>
                                    <div slot="content" class="content">
                                        <p>{{img.pAlt.username}}上传</p>
                                        <p>{{img.pAlt.assettag}}</p>
                                        <p>{{img.pAlt.address}}</p>
                                    </div>
                                </el-tooltip>
                            </div>
                        </div>
                        <div class="infoBox">
                            <i>{{img.pAlt.username.substr(-1)}}</i>
                            <span>{{img.pAlt.brand}}</span>
                            <em>{{formatTime(img.pUTime)}}</em>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--缩略图对话框-->
        <el-dialog :visible.sync="dialogVisible">
            <img style="width: 100%;height: 100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>


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

.pager{
    width: 100%;
    margin-top: 20px;
}
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
