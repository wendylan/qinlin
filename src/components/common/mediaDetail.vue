<template>
	<div class="mediaDetail">
		<div class="ad_mediaDetail_wrap clearfix">
			<div class="ad_mediaDetail_nav clearfix">
				<p>
					<a href="#">媒体管理</a>
					<em> / </em>
					<a href="#">媒体详情</a>
				</p>
			</div>

			<!--媒体信息-->
			<div class="ad_mediaInfo">
				<div class="ad_mediaInfo_head">
					<h2>媒体信息</h2>
				</div>
				<div class="ad_mediaInfoPanel" v-model="obj">
					<el-row type="flex" class="row-bg">
						<el-col :span="8">
							<ul>
								<li>资源名称：
									<span>{{obj.resName}}</span>
								</li>
								<li>资源类型：
									<span>{{obj.cType}}</span>
								</li>
								<li>所属城市：
									<span>{{obj.city}}</span>
								</li>
								<li>所属区域：
									<span>{{obj.cityArea}}</span>
								</li>
								<li>所属商圈：
									<span>{{obj.tradingArea || '--'}}</span>
								</li>
							</ul>
						</el-col>
						<el-col :span="8">
							<ul class="">
								<li>{{res_village.hType}}：
									<span>{{obj.houseType}}</span>
								</li>
								<li>出入口数：
									<span>{{obj.EntryExitNum}}</span>
								</li>
								<li>{{res_village.hNum}}：
									<span>{{obj.HouseNum}}</span>
								</li>
								<li>楼盘价格：
									<span>{{obj.housePrice}}</span>
								</li>
								<li>{{res_village.joinTime}}：
									<span>{{obj.joinTime || '--'}}</span>
								</li>
							</ul>
						</el-col>
						<el-col :span="8">
							<ul class="">
								<li> 具体地址：
									<span>{{obj.resAddress}}</span>
								</li>
								<li>经纬度：
									<span>{{obj.latLng}}</span>
								</li>
								<li> 所属物业：
									<span>{{obj.pmc || '--'}}</span>
								</li>
								<li> 小区全貌：
									<span @click="showResImg" style="color: #108EE9;cursor: pointer">查看</span>
								</li>
								<!--<li> 小区全貌：<a href="#" style="color: #108EE9">查看</a></li>-->
							</ul>
						</el-col>
					</el-row>
				</div>
			</div>

			<!--社区广告门-->
			<div class="ad_ad">
				<div class="ad_adHeader">
					<ul class="ad_tab">
						<li class="curr_ad">社区广告门</li>
						<!--<li style="margin-left: 36px">电梯广告</li>-->
					</ul>
				</div>
				<div class="ad_adPanel">
					<div class="table_wrap">
						<el-table border :data="mediaList" style="width: 100%">
							<el-table-column prop="mTitle" label="媒体名称" min-width="8%">
							</el-table-column>
							<el-table-column prop="mType" label="媒体类型" min-width="7%">
							</el-table-column>
							<el-table-column prop="mState" label="状态" min-width="7%">
							</el-table-column>
							<el-table-column label="资产编号" min-width="10.2%">
								<template slot-scope="scope">
									{{ scope.row.assetTag || '--' }}
								</template>
							</el-table-column>
							<el-table-column prop="adSize" label="广告尺寸" min-width="7%">
							</el-table-column>
							<el-table-column prop="adViewSize" label="可视画面" min-width="7%">
							</el-table-column>
							<el-table-column label="广告限制" min-width="10%" class="tar">
								<template slot-scope="scope">
									{{ scope.row.notPush || '--' }}
								</template>
							</el-table-column>
							<el-table-column label="备注" min-width="12%">
								<template slot-scope="scope">
									{{ scope.row.mrk || '--' }}
								</template>
							</el-table-column>
							<el-table-column label="门禁图片" min-width="6%">
								<template slot-scope="scope">
									<div style="color: #108EE9;cursor: pointer;" @click="showMediaImg(scope.row.mID)">查看</div>
								</template>
							</el-table-column>
						</el-table>
					</div>
				</div>
			</div>

			<div class="content_bottom_btn">
				<el-button type="primary" @click="edit" v-if="haveEdit">编辑</el-button>
				<el-button type="default" @click="goBack">
					<!-- <router-link :to="{path:'/superOperate/mediaList'}" >返回</router-link>-->
					返回
				</el-button>
			</div>
		</div>
		<el-dialog :visible.sync="ResImgDialogVisible">
			<img class="resImg" :src='ResImgSrc' alt="资源图片">
		</el-dialog>
		<el-dialog :visible.sync="mediaImgDialogVisible">
			<img class="resImg" :src='mediaIngSrc[mediaImgSrcIndex].src' alt="媒体图片">
		</el-dialog>
	</div>
</template>

<script>
import api from "../../api/api";
import areaToText from "../../commonFun/areaToText.js";
import areaToText_new from "../../commonFun/areaToText_new";
import { Button, Table, TableColumn, Row, Col, Message } from "element-ui";
export default {
    name: "mediaDetail",
    components: {
        elButton: Button,
        elTable: Table,
        elTableColumn: TableColumn,
        elRow: Row,
        elCol: Col
    },
    data() {
        return {
            haveEdit: true,
            obj: {
                resName: "",
                cType: "",
                city: "",
                cityArea: "",
                tradingArea: "",
                houseType: "",
                EntryExitNum: "",
                HouseNum: 1,
                housePrice: 0,
                joinTime: "",
                resAddress: "",
                latLng: "",
                pmc: ""
            },
            mediaList: [],
            res_village: {
                hType: "楼盘类型",
                hNum: "住户数量",
                joinTime: "入住年份"
            },
            ResImgDialogVisible: false, // 显示资源图片
            ResImgSrc: "",
            mediaImgDialogVisible: false,
            mediaIngSrc: [{ mid: "", src: "" }],
            mediaImgSrcIndex: 0,
            sessionData: JSON.parse(sessionStorage.getItem("session_data"))
        };
    },
    mounted() {
        // let userMsg = {uID: 3, realName: "周昭杰", division: "产品研发部", rID: 440100, uType: "SM", uWho: "0",
        //   puID: 2,token:"4FFBADA18815465B42ECBBF89833CE3F"}
        // sessionStorage.setItem("session_data", JSON.stringify(userMsg))
        // sessionStorage.setItem("resID", 5822);
        this.getDataFun();
        let nowPath = this.$route.path; // /media/mediaList

        if (nowPath.indexOf("/operate/") !== -1) {
            this.haveEdit = false;
        }
    },
    methods: {
        // 返回
        goBack() {
            this.$router.push("./mediaList");
        },
        // 编辑
        edit() {
            sessionStorage.setItem("recDetail", JSON.stringify(this.obj));
            for (let i = 0; i < this.mediaList.length; i++) {
                if (
                    this.mediaList[i].mState === "禁用" ||
                    this.mediaList[i].mState === "禁止"
                ) {
                    this.mediaList[i].mState = 0;
                } else if (this.mediaList[i].mState === "正常") {
                    this.mediaList[i].mState = 1;
                } else if (this.mediaList[i].mState === "待安装") {
                    this.mediaList[i].mState = 2;
                } else if (this.mediaList[i].mState === "待维修") {
                    this.mediaList[i].mState = 3;
                }
            }
            sessionStorage.setItem("mediaList", JSON.stringify(this.mediaList));
            this.$router.push("./mediaInput?edit=y");
        },
        getDataFun() {
            this.mediaIngSrc = [];
            let resID = sessionStorage.getItem("resID");
            api
                .getApi("/GetResCT", { resid: resID, info: "y" })
                .then(res => {
                    console.log("mediaDetail res.data", res.data); //fNum楼栋数量 dNum出入数量 hNum住户数量
                    if (res.data === null || res.data === "") {
                        Message({
                            type: "warning",
                            message: "媒体资源信息为空"
                        });
                    }
                    if (res.data.resType == "1") {
                        this.obj.cType = "社区";
                        this.res_village = {
                            hType: "楼盘类型",
                            hNum: "住户数量",
                            joinTime: "入住年份"
                        };
                    } else if (res.data.resType == "2") {
                        this.obj.cType = "写字楼";
                        this.res_village = {
                            hType: "写字楼楼盘类型",
                            hNum: "办公室数量",
                            joinTime: "建成年份"
                        };
                    }
                    //  this.obj.cType = res.data.cType houseType
                    this.obj.housePrice = res.data.hPrice / 100 + "元/平方米";
                    this.obj.joinTime = res.data.chDay;
                    this.obj.resAddress = res.data.resAddress;
                    this.obj.latLng = res.data.latLng;
                    this.obj.tradingArea = res.data.tradingArea;
                    this.obj.resName = res.data.resName;
                    this.obj.HouseNum = res.data.hNum;
                    this.obj.EntryExitNum = res.data.dNum;
                    this.obj.buildingNum = res.data.fNum;
                    this.obj.rid = res.data.rID;
                    this.obj.houseType = res.data.cType;
                    this.obj.pmc = res.data.resPMC;
                    // areaToText.toTextCityArea(data => {
                    //   console.log('公司信息所在城市', data);
                    //   this.obj.city= data.city
                    //   this.obj.cityArea = data.area
                    // }, res.data.rID);
                    // let data = areaToText.toTextCity(RMList[i].rID)
                    let cityArea = areaToText_new.toTextCityArea(res.data.rID);
                    this.obj.city = cityArea.city;
                    this.obj.cityArea = cityArea.area;
                    console.log("this.obj", this.obj);
                })
                .catch(err => {
                    console.log(err);
                });
            api
                .getApi("/GetMediaList", { resid: resID })
                .then(res => {
                    console.log("res.data", res.data);
                    let MediaList = res.data;
                    //  this.mediaList = MediaList
                    for (let i = 0; i < MediaList.length; i++) {
                        if (MediaList[i].mState === 1) {
                            MediaList[i].mState = "正常";
                        } else if (MediaList[i].mState === 0) {
                            MediaList[i].mState = "禁用";
                        } else if (MediaList[i].mState === 2) {
                            MediaList[i].mState = "待安装";
                        } else if (MediaList[i].mState === 3) {
                            MediaList[i].mState = "待维修";
                        }
                        MediaList[i].mrk = MediaList[i].mRemark;
                        if (
                            MediaList[i].mrk === "" ||
                            MediaList[i].mrk === null
                        ) {
                            //mRemark
                            MediaList[i].mrk = "--";
                        }
                        this.mediaList.push(MediaList[i]);
                        this.mediaIngSrc.push({
                            mid: MediaList[i].mID,
                            src: ""
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        // 点击查看显示该资源的图片
        showResImg() {
            console.log("点击查看资源图片");
            if (this.ResImgSrc !== "") {
                this.ResImgDialogVisible = true;
            } else {
                let resID = sessionStorage.getItem("resID");
                let uid = this.sessionData.uID;
                api
                    .getApi("/GetImg", {
                        uid: uid,
                        ptype: "restype",
                        ptid: resID
                    })
                    .then(res => {
                        console.log("资源图片的信息", res);
                        if (res.data.length === 0) {
                            this.$message({
                                message: "暂时没有该资源的图片！",
                                type: "warning"
                            });
                        } else {
                            this.ResImgSrc = res.data[0].pURL;
                            this.ResImgDialogVisible = true;
                        }
                    })
                    .catch(err => {
                        console.log("error", err);
                        this.$message({
                            message: "获取资源图片异常",
                            type: "warning"
                        });
                    });
            }
        },
        // 点击查看显示该媒体的图片
        showMediaImg(mID) {
            /*    let mid = mID
        let index = 0
        console.log('mid',mid)
        console.log('媒体列表',this.mediaList)
        console.log('媒体图片列表',this.mediaIngSrc)
        for(let i=0;i<this.mediaList.length;i++){
          if(this.mediaList[i].mID === mid){
            this.mediaImgSrcIndex = i
            index = i
            console.log('index',index)
          }
        }
        console.log(index,'媒体图片下标',this.mediaImgSrcIndex)
        if( this.mediaIngSrc[index].src !== ''){
          this.mediaImgDialogVisible = true
        }else{
          let uid = this.sessionData.uID
          let resID = sessionStorage.getItem('resID')
          let imgParam = {uid: uid,ptype:'XD',ptid:resID}
          api.getApi('/GetImg',imgParam).then(res=>{
            console.log('媒体图片的信息',res)
            if(res.data.length === 0){
              this.$message({
                message: '暂时查询不到该媒体的图片！',
                type: 'warning'
              })
            }else{
              // this.mediaIngSrc[index] = res.data[0].pURL
              let mediaImgArr = res.data
              for(let i=0;i<mediaImgArr.length;i++){
                for(let j=0;j<this.mediaIngSrc.length;j++){
                  if(this.mediaIngSrc[j].mid === mediaImgArr[i].ptp){
                    this.mediaIngSrc[j].src = mediaImgArr[i].pURL
                  }
                }
              }
              this.mediaImgDialogVisible = true
            }
          }).catch(err=>{
            console.log('error',err)
            this.$message({
              message: '获取媒体图片异常',
              type: 'warning'
            })
          })
        }*/
        }
    }
};
$(function() {
    $(".ad_tab")
        .find("li")
        .click(function() {
            $(this)
                .addClass("curr_ad")
                .siblings()
                .removeClass("curr_ad");
        });
});
</script>

<style scoped>
.resImg {
    width: 95%;
    height: auto;
}
/deep/ .el-dialog__body {
    text-align: center;
}
/deep/ .el-dialog__body img {
    width: 100%;
}
/*面包屑导航*/
.ad_mediaDetail_nav {
    position: relative;
    height: 30px;
}

.ad_mediaDetail_nav p {
    padding-left: 57px;
    position: absolute;
    left: 0;
    top: 12px;
    font-size: 14px;
    line-height: 18px;
}

.ad_mediaDetail_nav p em {
    font-size: 14px;
    color: #d9d9d9;
    line-height: 18px;
}

.ad_mediaDetail_nav p a {
    color: #666;
}

.ad_mediaDetail_nav p a:nth-of-type(1) {
    color: #999;
}

.ad_mediaDetail_wrap {
    margin-bottom: 80px;
    position: relative;
}

/*媒体信息*/
.ad_mediaInfo {
    width: 1246px;
    height: 266px;
    background: #ffffff;
    border: 1px solid #e6e7e9;
    margin: 10px auto;
}

.ad_mediaInfo_head {
    width: 100%;
    padding: 12px 0;
    border-bottom: 1px solid #dedede;
}

.ad_mediaInfo_head h2 {
    font-size: 16px;
    color: #2c313c;
    font-weight: bold;
    padding-left: 16px;
    height: 24px;
}

.ad_mediaInfo .ad_mediaInfoPanel {
    margin-left: 28px;
    /* display: flex;
     justify-content: space-between;*/
    padding-right: 100px;
}

.ad_mediaInfo .ad_mediaInfoPanel h4 {
    font-size: 16px;
    color: #666666;
}

.ad_mediaInfo .ad_mediaInfoPanel ul {
    margin-top: 8px;
    float: left;
}
.ad_mediaInfo .ad_mediaInfoPanel ul.ml157 {
    margin-left: 23%;
}

.ad_mediaInfo .ad_mediaInfoPanel ul li {
    font-size: 14px;
    color: #666666;
    margin-top: 16px;
}

/deep/ .el-table th > .cell {
    font-size: 14px;
    color: #666666;
    font-weight: bold;
}
/deep/ .el-table th,
.el-table tr {
    height: 44px;
    padding: 0;
    background-color: #f7f7f7;
}
/deep/ .el-table td {
    padding: 10px 0;
}

/*广告*/
.ad_ad {
    width: 1246px;
    padding-bottom: 30px;
    background: #ffffff;
    border: 1px solid #e6e7e9;
    margin: 0 auto;
    margin-bottom: 50px;
}

.ad_ad .ad_adHeader {
    width: 100%;
    height: 24px;
    border-bottom: 1px solid #dedede;
    width: 100%;
    padding: 12px 0;
}
.ad_ad .ad_adHeader .ad_tab {
    padding-left: 16px;
    height: 24px;
}
.ad_ad .ad_adHeader .ad_tab .curr_ad {
    color: #108de7;
    border-bottom: 3px solid #108de7;
}

.ad_ad .ad_adHeader .ad_tab li {
    float: left;
    height: 33px;
    line-height: 24px;
    font-size: 16px;
    color: #999999;
    cursor: pointer;
    /*border-bottom: 3px solid #108DE7;*/
}
.ad_ad .ad_adPanel .table_wrap {
    width: 1210px;
    border-radius: 4px;
    margin: 0 auto;
    margin-top: 20px;
}

.ad_ad .ad_adPanel .adPanel_table {
    /*去掉间距*/
    /*   border-collapse: collapse;*/
    height: 40px;
    line-height: 40px;
    text-align: center;
    width: 1210px;
    font-size: 14px;
    color: #666666;
    margin: 0 auto;
    border-radius: 4px;
    /*允许设置列宽*/
    table-layout: fixed;
}

.ad_ad .ad_adPanel .adPanel_table th {
    background-color: #f8f8f8;
    border-bottom: 1px solid #e2e2e2;
    border-right: 1px solid #e2e2e2;
    font-size: 14px;
    color: #666666;
    font-weight: bold;
    text-indent: 14px;
    box-sizing: border-box;
}

.ad_ad .ad_adPanel .adPanel_table tr th:nth-child(1) {
    width: 114px;
}
.ad_ad .ad_adPanel .adPanel_table tr th:nth-child(2) {
    width: 97px;
}
.ad_ad .ad_adPanel .adPanel_table tr th:nth-child(3) {
    width: 82px;
}
.ad_ad .ad_adPanel .adPanel_table tr th:nth-child(4) {
    width: 169px;
}
.ad_ad .ad_adPanel .adPanel_table tr th:nth-child(5) {
    width: 89px;
}
.ad_ad .ad_adPanel .adPanel_table tr th:nth-child(6) {
    width: 89px;
}
.ad_ad .ad_adPanel .adPanel_table tr th:nth-child(7) {
    width: 152px;
}
.ad_ad .ad_adPanel .adPanel_table tr th:nth-child(8) {
    width: 322px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.ad_ad .ad_adPanel .adPanel_table tr th:nth-child(9) {
    width: 84px;
}

.ad_ad .ad_adPanel .adPanel_table td {
    border-right: 1px solid #e2e2e2;
    text-indent: 14px;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    border-bottom: 1px solid #e2e2e2;
}
.ad_ad .ad_adPanel .adPanel_table tr:last-child td {
    border-bottom: none;
}

.ad_ad .ad_adPanel .adPanel_table td .dot {
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #fe7a38;
    margin-right: 6px;
}

/*按钮*/
.content_bottom_btn {
    text-align: center;
}
.content_bottom_btn button {
    width: 72px;
    height: 34px;
}
.content_bottom_btn /deep/ .el-button span {
    position: relative;
    top: -2px;
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
/*表格高亮*/
/deep/ .el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: #ecf5ff;
}

.ad_index_footer {
    bottom: -140px;
}

/*1440*/
@media all and (min-width: 1420px) {
    .ad_mediaInfo,
    .ad_ad {
        width: 1320px;
    }
    .ad_ad .ad_adPanel .adPanel_table {
        width: 1284px;
    }

    .ad_ad .ad_adPanel .adPanel_table tr th:nth-child(10) {
        width: 230px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .ad_ad .ad_adPanel .table_wrap {
        width: 1284px;
    }

    .ad_mediaDetail_wrap {
        margin-bottom: 216px;
        position: relative;
    }
}

/*1920*/
@media all and (min-width: 1900px) {
    .ad_mediaInfo,
    .ad_ad {
        width: 1800px;
    }
    .ad_ad .ad_adPanel .adPanel_table tr th:nth-child(1) {
        width: 154px;
    }
    .ad_ad .ad_adPanel .adPanel_table tr th:nth-child(2) {
        width: 137px;
    }
    .ad_ad .ad_adPanel .adPanel_table tr th:nth-child(3) {
        width: 122px;
    }
    .ad_ad .ad_adPanel .adPanel_table tr th:nth-child(4) {
        width: 189px;
    }
    .ad_ad .ad_adPanel .adPanel_table tr th:nth-child(5) {
        width: 109px;
    }
    .ad_ad .ad_adPanel .adPanel_table tr th:nth-child(6) {
        width: 109px;
    }
    .ad_ad .ad_adPanel .adPanel_table tr th:nth-child(7) {
        width: 211px;
    }
    .ad_ad .ad_adPanel .adPanel_table tr th:nth-child(8) {
        width: 639px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .ad_ad .ad_adPanel .adPanel_table tr th:nth-child(9) {
        width: 84px;
    }

    .ad_ad .ad_adPanel .adPanel_table {
        width: 1764px;
    }
    .ad_ad .ad_adPanel .table_wrap {
        width: 1764px;
    }
}
</style>
