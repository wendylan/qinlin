<template>
	<div>
		<div class="ad_mediaMana_wrap">
			<div class="ad_mediaMana_nav clearfix">
				<p><a href="#">图片库</a></p>
			</div>
			<div class="mediaList_wrap">
				<div class="mediaList_container">
					<el-tabs v-model="activeName" @tab-click="handleClick">
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
							<el-cascader
								:options="citys"
								v-model="selectedOptions"
								class="plan-select"
								placeholder="选择地区"
								change-on-select
							>
							</el-cascader>
							<span>
								<el-select v-model="mianSelect" placeholder="选择投放面" class="plan-select">
									<el-option label="A面" value="Amian"></el-option>
									<el-option label="B面" value="Bmian"></el-option>
								</el-select>
							</span>
							<span>
								<div class="block">
									<el-date-picker
										v-model="date"
										type="daterange"
										range-separator="-"
										start-placeholder="投放日期"
										end-placeholder="投放日期">
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
										<div class="photoCard" v-for="(item, index) of upImgArr" :key="index">
											<div class="imgBox">
												<img :src="dialogImageUrl" alt="" class="smallImg">
												<!--查看缩略图和下载-->
												<div class="mask-btn" style="display: none">
													<i class="el-icon-search" @click="handlePictureCardPreview"></i>
													<a href="#" download="name.jpg">下载图片</a>
												</div>
											</div>
											<div class="detailBox">
												<p>珠江帝景地产三月投放</p>
												<span>华南碧桂园二期-东门</span>
												<div class="icons">
													<span class="el-icon-location">广州市</span>
													<span>
														<i class="fa  fa-file-text"></i>
														A面
													</span>
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
											<el-pagination
												small
												background
												:current-page="1"
												:page-sizes="[10, 20]"
												:page-size="10"
												layout=" sizes, prev, pager, next, jumper"
												:total="60">
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
										<div class="photoCard" v-for="(item, index) of downImgArr" :key="index">
											<div class="imgBox">
												<img :src="dialogImageUrl" alt="" class="smallImg">
												<!--查看缩略图和下载-->
												<div class="mask-btn" style="display: none">
												<i class="el-icon-search" @click="handlePictureCardPreview"></i>
												<a href="#" download="name.jpg">下载图片</a>
												</div>
											</div>
											<div class="detailBox">
												<p>珠江帝景地产三月投放</p>
												<span>华南碧桂园二期-东门</span>
												<div class="icons">
												<span class="el-icon-location">广州市</span>
												<span>
													<i class="fa  fa-file-text"></i>
													A面
													</span>
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
											<el-pagination
												small
												background
												:current-page="1"
												:page-sizes="[10, 20]"
												:page-size="10"
												layout=" sizes, prev, pager, next, jumper"
												:total="60">
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
										<div class="imgBox">
											<img :src="dialogImageUrl" alt="" class="smallImg">
											<!--查看缩略图和下载-->
											<div class="mask-btn" style="display: none">
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
										<el-pagination
											small
											background
											:current-page="1"
											:page-sizes="[10, 20]"
											:page-size="10"
											layout=" sizes, prev, pager, next, jumper"
											:total="60">
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
										<div class="imgBox">
											<img :src="dialogImageUrl" alt="" class="smallImg">
											<!--查看缩略图和下载-->
											<div class="mask-btn" style="display: none">
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
										<el-pagination
											small
											background
											:current-page="1"
											:page-sizes="[10, 20]"
											:page-size="10"
											layout=" sizes, prev, pager, next, jumper"
											:total="60">
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
								<el-table
									border
									width="98%"
									:data="caseList"
									style="width: 100%"
									:default-sort="{prop: 'date', order: 'descending'}"
								>
									<el-table-column
									label="任务名称"
									min-width="18.3%"
									>
									<template slot-scope="scope">
										<span @click="newPath" style="color: #1890ff;cursor: pointer">{{scope.row.caseName}}</span>
									</template>
									</el-table-column>
									<el-table-column
									prop="caseType"
									label="任务类型"
									min-width="11%"
									:filters="[{text: '上刊', value: '上刊'}, {text: '下刊', value: '下刊'}]"
									:filter-method="filterCaseType"
									:filter-multiple="false"
									>
									</el-table-column>
									<el-table-column
									prop="dwNum"
									label="点位数量"
									min-width="11%"
									>
									</el-table-column>
									<el-table-column
									prop="uploadImg"
									label="已上传图片"
									min-width="11%"
									>
									</el-table-column>
									<el-table-column
									prop="creater"
									label="创建人"
									min-width="11%"
									>
									</el-table-column>
									<el-table-column
									prop="account"
									label="创建账号"
									min-width="13.8%"
									>
									</el-table-column>
									<el-table-column
									prop="createDate"
									label="创建时间"
									min-width="11.3%"
									>
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
import {Button, Input, Dialog, Table, TableColumn, Row, Tooltip, Tabs, TabPane, Select, Option, Cascader, DatePicker, Pagination} from 'element-ui';

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
		elPagination: Pagination,
	},
	data() {
		return {
			// 上刊
			upImgArr: [],
			// 下刊
			downImgArr: [],
			// 安装
			installArr: [],
			// 巡点
			searchAreaArr:[],

			//缩略图
			dialogImageUrl: '../../../static/images/testPic.png',
			dialogVisible: false,
			showBtn: false,
			assetID: `005B201803GZ-X446`,
			address: `广东广州市天河区黄埔大道中`,
			activeName: 'first',
			//上刊搜索行
			select: '',
			keyword: '',
			keyword2: '',
			mianSelect: '',
			date: '',
			selectedOptions: [],
			//录单搜索行
			ludan: false,
			ludanSelect: '任务名称',
			//地区搜索
			citys: [
			{
				value: 'guangzhou',
				label: '广州',
				children: [{
				value: 'tianhequ',
				label: '天河区'
				}]
			}, {
				value: 'beijing',
				label: '北京',
				children: [{
				value: 'chaoyangqu',
				label: '朝阳区'
				}, {
				value: 'haizhuqu',
				label: '海珠区'
				}]
			}],

			//是否搜索到图片
			showPic: 2,
			//  录单
			input: '',
			value6: '',
			//表格
			caseList: [
			{
				caseName: '珠江帝景地产三月份方案',
				caseType: '上刊',
				dwNum: '60',
				uploadImg: '73',
				creater: '冯少宏',
				account: 'fengshaohong',
				createDate: '2018.05.26',
			}, {
				caseName: '珠江帝景地产三月份方案',
				caseType: '上刊',
				dwNum: '60',
				uploadImg: '73',
				creater: '冯少宏',
				account: 'fengshaohong',
				createDate: '2018.05.26',
			}, {
				caseName: '珠江帝景地产三月份方案',
				caseType: '上刊',
				dwNum: '60',
				uploadImg: '73',
				creater: '冯少宏',
				account: 'fengshaohong',
				createDate: '2018.05.26',
			}, {
				caseName: '珠江帝景地产三月份方案',
				caseType: '上刊',
				dwNum: '60',
				uploadImg: '73',
				creater: '冯少宏',
				account: 'fengshaohong',
				createDate: '2018.05.26',
			}, {
				caseName: '珠江帝景地产三月份方案',
				caseType: '上刊',
				dwNum: '60',
				uploadImg: '73',
				creater: '冯少宏',
				account: 'fengshaohong',
				createDate: '2018.05.26',
			}, {
				caseName: '珠江帝景地产三月份方案',
				caseType: '上刊',
				dwNum: '60',
				uploadImg: '73',
				creater: '冯少宏',
				account: 'fengshaohong',
				createDate: '2018.05.26',
			}, {
				caseName: '珠江帝景地产三月份方案',
				caseType: '上刊',
				dwNum: '60',
				uploadImg: '73',
				creater: '冯少宏',
				account: 'fengshaohong',
				createDate: '2018.05.26',
			}, {
				caseName: '珠江帝景地产三月份方案',
				caseType: '上刊',
				dwNum: '60',
				uploadImg: '73',
				creater: '冯少宏',
				account: 'fengshaohong',
				createDate: '2018.05.26',
			}, {
				caseName: '珠江帝景地产三月份方案',
				caseType: '上刊',
				dwNum: '60',
				uploadImg: '73',
				creater: '冯少宏',
				account: 'fengshaohong',
				createDate: '2018.05.26',
			}, {
				caseName: '珠江帝景地产三月份方案',
				caseType: '上刊',
				dwNum: '60',
				uploadImg: '73',
				creater: '冯少宏',
				account: 'fengshaohong',
				createDate: '2018.05.26',
			}, {
				caseName: '珠江帝景地产三月份方案',
				caseType: '上刊',
				dwNum: '60',
				uploadImg: '73',
				creater: '冯少宏',
				account: 'fengshaohong',
				createDate: '2018.05.26',
			}, {
				caseName: '珠江帝景地产三月份方案',
				caseType: '上刊',
				dwNum: '60',
				uploadImg: '73',
				creater: '冯少宏',
				account: 'fengshaohong',
				createDate: '2018.05.26',
			}, {
				caseName: '珠江帝景地产三月份方案',
				caseType: '上刊',
				dwNum: '60',
				uploadImg: '73',
				creater: '冯少宏',
				account: 'fengshaohong',
				createDate: '2018.05.26',
			}]
		};
	},
	mounted: function () {
		$(function () {
			$('.smallImg').mouseenter(function () {
				$(this).siblings('.mask-btn').show();
			});
			$('.mask-btn').mouseleave(function () {
				$(this).hide();
			});
			$('.photoCard').hover(function () {
				$(this).css('box-shadow', '0px 0px 20px rgba(0, 0, 0, 0.20)')
			}, function () {
				$(this).css('box-shadow', 'none')
			})
		})

	},

	methods: {
	//请求
	PostIMg() {

	},
	handleClick(tab, event) {
		if (this.activeName === 'fifth') {
		this.ludan = true;
		} else {
		this.ludan = false
		}
	},
	handlePictureCardPreview() {
		// this.dialogImageUrl = this.dialogImageUrl;
		this.dialogVisible = true;
	},
	//筛选
	filterCaseType(value, row) {
		return row.tag === value;
	},
	searchPic() {
		if (!this.select && !this.keyword && !this.mianSelect && !this.date && this.selectedOptions.length == 0) {
		this.$message({
			message: '请先输入搜索条件',
			type: 'warning'
		});
		}
	},
	newPath() {
		this.$router.push('./ludanReport')
	}

	}
}
</script>

<style scoped>

  /deep/ .el-cascader__label{
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
    background: #FFFFFF;
    border: 1px solid #E6E7E9;
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
    color: #409EFF;
  }

  /deep/ .el-tabs__nav {
    height: 49px;
    line-height: 49px;
  }

  /*上刊*/
  /deep/ .type-select .el-input, /deep/ .type-select .el-input__inner {
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

  .searchInput /deep/ .el-input__inner, .searchInput {
    width: 224px !important;
    position: relative;
    left: -7px;
    top: 0;
    height: 34px;
    border-left: none !important;
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
  }

  /deep/ .plan-select .el-input, /deep/ .plan-select .el-input__inner {
    width: 180px;
    /*height: 34px;*/
  }

  .searchBtn, .map {
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
  }



  /deep/ .el-input-group .el-input__suffix {
    right: 5px;
  }
  /deep/ .el-input__icon{
    line-height: 34px;
  }

  .tempPic {
    text-align: center;
    /*margin-top: 87px;*/
    margin-bottom: 50px;
  }

  .noFind, .cantFind {
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
  .input-with-select /deep/ .el-input__inner{
    font-size: 14px;
    /*padding: 10px 10px;*/
    height: 34px;
    /*line-height: 14px;*/
    vertical-align: middle;
  }
  /deep/ .plan-select .el-input__inner{
    font-size: 14px;
    /*padding: 10px 10px;*/
    height: 34px;
    /*line-height: 14px;*/
    vertical-align: middle;;
  }

  .find {
    position: relative;
  }

  .photoCard {
    transition: all 0.3s;
    float: left;
    width: 234px;
    /*height: 307px;*/
    background: #FFFFFF;
    /*box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.20);*/
    border-radius: 2px;
    text-align: left;
    border: 1px solid rgba(0, 0, 0, 0.10);
    margin-top: 20px;
  }

  .photoCard + .photoCard {
    margin-left: 7px;
  }

  .find .photoCard:nth-child(6) {
    margin-left: 0;
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
    background: #1890FF;
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

  .el-icon-info, .el-icon-location {
    font-size: 13px;
  }

  .icons .el-icon-info {
    position: absolute;
    right: 12px;
    top: 3px;
  }

  .infoBox {
    padding: 10px;
  }

  .infoBox i {
    display: inline-block;
    width: 22px;
    height: 22px;
    font-size: 10px;
    color: #FFFFFF;
    border-radius: 50%;
    background-color: #91ACF9;
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
  }

  /*页码*/
  .pager {
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

  /deep/ .el-pagination span:not([class*=suffix]) {
    position: relative;
    top: -4px;
  }

  /deep/ .el-pagination span:not([class*=suffix]) .el-input__inner {
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

  /deep/ .el-table th, .el-table tr {
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
    background: #FAFAFA;

  }

  /deep/ .el-table__body-wrapper::-webkit-scrollbar-thumb { /*滚动条里面小方块*/

    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #C1C1C1;
    border-radius: 4px;
  }

  /*超出省略*/
  /deep/ .el-table .cell {
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  /deep/ .el-table .el-table_1_column_3 .cell{
    width: 95px;
  }

  /*筛选*/
  /deep/ .el-table__column-filter-trigger {
    margin-left: 10px;
  }

  /deep/ .el-table th > .cell.highlight {
    color: #409EFF !important;
  }

  /deep/ div.el-table-filter {
    left: 1106px !important;
  }

  /*操作*/
  /deep/ .el-button--mini, .el-button--small {
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
    color: #8A8A8A;
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
  /deep/ .el-range-separator{
    position: relative;
    top: -2px;
  }
  /deep/ .el-input__inner {
    width: 260px;
    height: 34px;
    line-height: 34px;
  }
  /deep/ .el-date-editor i, /deep/ .el-date-editor input, /deep/ .el-date-editor span {
    float: left;
    position: relative;
  }
  /deep/ .el-range-editor .el-range-input{
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
  /deep/ .el-button--default:focus, .el-button--default:hover {
    color: #606266;
    border-color: #dcdfe6;
    background-color: #fcfcfc;
  }

  .search-wrap span {
    float: left;
    margin-left: 4px;
  }
  .mediaList_container span{
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
    clear: both
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
      margin-left: 26px;
    }

    .find .photoCard:nth-child(6) {
      margin-left: 0;
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
      margin-left: 98px;
    }

    .photoCard + .photoCard {
      margin-left: 98px;
    }

    .find .photoCard:nth-child(6) {
      margin-left: 98px;
    }

  }
</style>
