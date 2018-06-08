<template>
	<div>
		<div class="ad_mediaMana_wrap">
			<div class="ad_mediaMana_nav clearfix">
				<p><a href="#">订单管理</a><em> / </em><a href="#">订单详情</a></p>
			</div>
			<!--资源信息-->
			<div class="mediaMana_content_top">
				<div class="content_top_wrap">
					<div class="plan-title">
						<h4>
							<img src="../../assets/images/planlogo.png" alt="">{{orderDetail.apName}}
							<p>{{orderDetail.apQC}}<i class="el-icon-edit" @click="changeCID = true" :class="{changeCID:!usableBtn}"></i></p>
						</h4>
						<!--修改合同号对话框-->
						<el-dialog
							title="修改合同编号"
							:visible.sync="changeCID"
							width="30%">
							<el-input v-model="CIDinput"></el-input>
							<span slot="footer" class="dialog-footer">
								<el-button @click="cancelChangeID">取 消</el-button>
								<el-button type="primary" @click="confirmChangeID">确 定</el-button>
							</span>
						</el-dialog>
						<div class="handleBtn">
							<el-button plain @click="changeRemark = true" :disabled="usableBtn">监播备注</el-button>
							<el-button plain :disabled="usableMakeBtn" @click="makeMission">生成任务</el-button>
							<el-button type="primary" :disabled="usableBtn" @click="changePoint">换点</el-button>
							<!--监播备注对话框-->
							<el-dialog
								title="监播备注"
								:visible.sync="changeRemark"
								width="30%"
							>
								<el-input type="textarea" v-model="remark" :rows="2"></el-input>
								<span slot="footer" class="dialog-footer">
									<el-button @click="cancelChangeRemark">取 消</el-button>
									<el-button type="primary" @click="confirmChangeRemark">确 定</el-button>
								</span>
							</el-dialog>
						</div>
					</div>
					<div>
						<div class="plan-detail">
							<div class="plan-detail-left">
								<ul>
									<li><span>公司名称：</span><em>{{orderDetail.cName}}</em></li>
									<li><span>所属销售：</span><em>{{orderDetail.realName}}</em></li>
									<li><span>现金结算：</span><em>¥ {{orderDetail.pdTotal}}</em></li>
									<li><span>公司品牌：</span><em>{{orderDetail.bTitle}}</em></li>
									<li><span>投放城市：</span><em>{{orderDetail.rIDs}}</em></li>
									<li><span>资源置换：</span><em>¥ {{orderDetail.pdSendFee}}</em></li>
									<li><span>联系人：</span><em>{{orderDetail.cuName}}</em></li>
									<li><span>方案备注：</span><em>{{orderDetail.remark||"无"}}</em></li>
									<li><span>其他费用：</span><em>¥ {{orderDetail.pdOtherFee}}</em></li>
								</ul>
							</div>
							<div class="plan-detail-right">
								<dl>
									<dt>状态</dt>
									<dd>{{stateToText(orderDetail.apState)}}</dd>
								</dl>
								<dl>
									<dt>方案金额</dt>
									<dd>¥ {{orderDetail.apTotal}}</dd>
								</dl>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="plan-panel">
				<el-tabs v-model="planPanel">
					<el-tab-pane label="选点排期" name="first">
						<div class="first-wrap box-wrap">
							<h4 v-if="!showTitle">选点排期</h4>
							<h4 v-if="showTitle">更换点位
								<el-button type="primary" @click="dialogAddPoint = true" class="changeDWBtn">添加点位
								</el-button>
								<span>原投放面数:40&nbsp;&nbsp;     种植投放面数:1&nbsp;&nbsp;    新增面数:1&nbsp;&nbsp;     现投放面数:40</span>
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
								</span>
							</div>

							<div class="table_wrap">
								<el-table
									border
									:data="currentSetpoint"
									style="width: 100%"
									:default-sort="{prop: 'recName', order: 'descending'}"
								>
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

									<el-table-column
										label="资源名称"
										min-width="16.1%"
										prop="resName"
									>
									</el-table-column>
									<el-table-column
										prop="mTitle"
										label="媒体名称"
										min-width="10.3%"
										class="tar"
									>
									</el-table-column>
									<el-table-column
										prop="asLab"
										label="投放面"
										min-width="8.8%"
									>
									</el-table-column>
									<el-table-column
										prop="city"
										label="城市"
										min-width="6%"
										:filters="filterCityData"
										:filter-method="filterCity"
									>
									</el-table-column>
									<el-table-column
										prop="rName"
										label="区域"
										min-width="7.4%"
										:filters="filtersArea"
										:filter-method="filterRName"
									>
									</el-table-column>
									<el-table-column
										prop="cType"
										label="楼盘类型"
										min-width="8.8%"
									>
									</el-table-column>
									<el-table-column
										prop="hNum"
										label="小区户数"
										min-width="7.3%"
										class="tar"
									>
									</el-table-column>
									<el-table-column
										label="楼盘价格"
										min-width="7.3%"
									>
										<template slot-scope="scope">
											<span>{{priceFormat(scope.row.hPrice/100)}}</span>
										</template>
									</el-table-column>
									<el-table-column
										prop="timeRange"
										label="排期"
										min-width="14.2%"
										:filters="filtersData"
										:filter-method="filterTimeRange"
									>
									</el-table-column>
								</el-table>
							</div>
							<!--添加点位对话框-->
							<el-dialog
								title="添加点位"
								:visible.sync="dialogAddPoint"
								width="30%"
							>
								<div class="step2">
								<div>
									<div class="search-nav">
									<div class="search-wrap">
										<span>
											<el-select v-model="value" placeholder="请选择" class="type-select">
											<el-option v-for="item in typeSelect" :key="item.value" :label="item.value"
														:value="item.value"></el-option>
											<el-input v-model="searchInput" placeholder="请输入要搜索的内容" class="searchInput"></el-input>
											</el-select>
										</span>

										<span>
										<el-select v-model="planSelect" placeholder="选择投已有方案" class="plan-select">
										<el-option label="区域一" value="shanghai"></el-option>
										<el-option label="区域二" value="beijing"></el-option>
										</el-select>
										</span>
										<span>
										<el-date-picker
										v-model="dateInput"
										type="daterange"
										start-placeholder="开始日期"
										end-placeholder="结束日期"
										class="date-select"
										>
										</el-date-picker>
									</span>
										<span>
										<el-button type="primary" icon="el-icon-search" class="searchBtn">搜索</el-button>
									</span>
									</div>
									</div>
									<!--类型区域选择面板-->
									<div class="dw-panel">
									<dl style="position: relative">
										<dt>资源类型：</dt>
										<dd class="active">社区</dd>
										<dd>写字楼</dd>
										<el-button type="text" style="position: absolute; right: 10px; top:2px;">重置选项</el-button>
									</dl>
									<dl>
										<dt>媒体类型：</dt>
										<dd class="active">社区广告门</dd>
										<dd>电梯广告</dd>
									</dl>
									<dl style="border: none">
										<dt>城市区域：</dt>
										<dd class="active">广州</dd>
										<dd>深圳</dd>
									</dl>
									<dl class="city-proper">
										<dd class="active">全市</dd>
										<dd>天河区</dd>
										<dd>越秀区</dd>
										<dd>海珠区</dd>
										<dd>荔湾区</dd>
										<dd>黄浦区</dd>
										<dd>白云区</dd>
										<dd>番禺区</dd>
										<dd>花都区</dd>
										<dd>南沙区</dd>
										<dd>从化区</dd>
										<dd>增城区</dd>
									</dl>
									<dl style="border: none">
										<dt>广告限制：</dt>
										<dd>医学</dd>
										<dd>汽车</dd>
										<dd>地产</dd>
									</dl>
									</div>
									<!--数量价格年份输入筛选框-->
									<div class="filter-input">
									<ul>
										<li style="margin-left: 0">
										<span>住户数量:</span>
										<div class="input-wrap">
											<input type="text" class="input">
											-
											<input type="text" class="input">
											<el-button size="mini">清除</el-button>
											<el-button size="mini" type="primary">确定</el-button>
										</div>
										</li>
										<li>
										<span>楼栋数量:</span>
										<div class="input-wrap">
											<input type="text" class="input">
											-
											<input type="text" class="input">
											<el-button size="mini">清除</el-button>
											<el-button size="mini" type="primary">确定</el-button>
										</div>

										</li>
										<li>
										<span>楼盘价格:</span>
										<div class="input-wrap">
											<input type="text" class="input">
											-
											<input type="text" class="input">
											<el-button size="mini">清除</el-button>
											<el-button size="mini" type="primary">确定</el-button>
										</div>

										</li>
										<li>
										<span>入住年份:</span>
										<div class="input-wrap">
											<input type="text" class="input">
											-
											<input type="text" class="input">
											<el-button size="mini">清除</el-button>
											<el-button size="mini" type="primary">确定</el-button>
										</div>
										</li>
										<li>
										<span>楼盘类型:</span>
										<el-select v-model="buildValue" placeholder="请选择" class="buildType">
											<el-option v-for="item in buildType" :key="item.buildValue" :label="item.buildValue"
													:value="item.buildValue"></el-option>
										</el-select>
										</li>
									</ul>
									</div>
									<!--表格-->
									<div class="table_wrap">
									<el-table
										border
										:data="planList"
										style="width: 100%"
										:default-sort="{prop: 'recName', order: 'descending'}"
									>
										<el-table-column type="expand">
										<template slot-scope="props">
											<el-form label-position="left" inline class="demo-table-expand">
											<el-form-item label="商圈：">
												<span>{{ props.row.businessOrigin}}</span>
											</el-form-item>
											<el-form-item label="楼栋数量：">
												<span>{{ props.row.buildNum }}</span>
											</el-form-item>
											<el-form-item label="资产编号：">
												<span>{{ props.row.assetID }}</span>
											</el-form-item>
											<el-form-item label="入住年份：">
												<span>{{ props.row.liveYear }}</span>
											</el-form-item>
											<el-form-item label="广告限制：">
												<span>{{ props.row.adLimit }}</span>
											</el-form-item>
											</el-form>
										</template>
										</el-table-column>
										<el-table-column
										type="selection"
										width="41px">
										</el-table-column>

										<el-table-column
										label="资源名称"
										min-width="16.1%"
										prop="recName"
										>
										</el-table-column>
										<el-table-column
										prop="mediaName"
										label="媒体名称"
										min-width="10.3%"
										class="tar"
										>
										</el-table-column>
										<el-table-column
										prop="city"
										label="城市"
										min-width="6%"
										>
										</el-table-column>
										<el-table-column
										prop="origin"
										label="区域"
										min-width="7.4%"
										>
										</el-table-column>
										<el-table-column
										prop="buildType"
										label="楼盘类型"
										min-width="8.8%"
										>
										</el-table-column>
										<el-table-column
										prop="houseNum"
										label="小区户数"
										min-width="7.3%"
										class="tar"
										>
										</el-table-column>
										<el-table-column
										prop="buildPrice"
										label="楼盘价格"
										min-width="7.3%"
										>
										</el-table-column>
										<el-table-column
										prop="schedules"
										label="排期"
										min-width="14.2%"
										>
										</el-table-column>
										<el-table-column width="132px">
										<template slot-scope="scope">
											<el-checkbox>A面</el-checkbox>
											<el-checkbox>B面</el-checkbox>
										</template>
										</el-table-column>
									</el-table>
									</div>
								</div>
								</div>
								<span slot="footer" class="dialog-footer">
									<el-button @click="cancelAddPoint">取 消</el-button>
									<el-button type="primary" @click="confirmAddPoint">确 定</el-button>
								</span>
							</el-dialog>
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
													<li>刊例价(面/周) <span>¥ {{priceFormat(item.adPrice)}}</span></li>
													<li>投放量(面·天) <span>{{item.pdDays}}</span></li>
													<li>赠送(面·天) <span>{{item.pdFreeNum}}</span></li>
													<li>广告费折扣 <span>{{item.discount}}%</span></li>
													<li>¥ {{priceFormat(item.pdAdFee)}}</li>
													</ul>
												</div>
												<div class="price-right">
													<h4>制作费</h4>
													<ul>
													<li>制作费单价<span>¥ 100</span></li>
													<li>广告画数量(张)<span>{{item.pdNum}}</span></li>
													<li></li>
													<li>制作费折扣<span>{{item.ADMakeDiscount}}%</span></li>
													<li>¥ {{priceFormat(item.pdAdMake)}}</li>
													</ul>
												</div>
											</div>
											<div class="bottom">
												<div class="bottom-detail">
													<div class="remark">
													<p>备注：无</p>
													</div>
													<div class="bill-title-right">
													<ul>
														<li><p><em>现金结算：</em><span>¥ {{priceFormat(item.pdTotal)}}</span></p></li>
														<li><p><em>资源置换：</em><span>¥ {{priceFormat(item.pdSendFee)}}</span></p></li>
														<li><p><em>其他费用：</em><span>¥ {{priceFormat(item.pdOtherFee)}}</span></p></li>
													</ul>
													</div>
												</div>
												<div class="bottom-fin">
													<p><em style="top: 5px">总计：</em><span class="totalPrice">¥ {{priceFormat(item.allprice)}}</span></p>
												</div>
											</div>
										</div>
									</el-tab-pane>



									<!-- <el-tab-pane label="深圳">深圳内容</el-tab-pane>
									<el-tab-pane label="成都">成都内容</el-tab-pane> -->
								</el-tabs>
							</div>
						</div>
					</el-tab-pane>
					<el-tab-pane label="物料信息" name="third" :disabled="usableBtn">
						<div class="third-wrap box-wrap">
							<h4>物料信息</h4>
							<div class="table_wrap">
								<el-table
									:data="materialInfo"
									border
									style="width: 100%">
								<el-table-column
									label="序号"
									min-width="5.9%">
									<template slot-scope="scope">
										<span>{{scope.$index+1}}</span>
									</template>
								</el-table-column>
								<el-table-column
									prop="adSize"
									label="广告尺寸"
									min-width="12.4%">
								</el-table-column>
								<el-table-column
									prop="visualPic"
									label="可视画面"
									min-width="12.4%">
								</el-table-column>
								<el-table-column
									prop="resolution"
									label="分辨率"
									min-width="12.4%">
								</el-table-column>
								<el-table-column
									prop="colorMode"
									label="颜色模式"
									min-width="12.4%">
								</el-table-column>
								<el-table-column
									prop="photoFormat"
									label="照片格式"
									min-width="17.6%">
								</el-table-column>
								<el-table-column
									prop="pointNum"
									label="点位面数"
									min-width="12.7%">
								</el-table-column>
								</el-table>
							</div>
						</div>
					</el-tab-pane>
					<el-tab-pane label="上刊报告" name="forth" :disabled="usableBtn">
						<div class="forth-wrap box-wrap">
						<h4>上刊报告</h4>
						<div class="panel">
							<div class="up-report">
								<div class="up-loader-header">
									<el-cascader
										:options="citys"
										v-model="selectedOptions"
									>
									</el-cascader>
									<el-select placeholder="请选择资源" filterable v-model="allhouse">
										<el-option label="全部资源" value="allHouse"></el-option>
										<el-option label="区域一" value="shanghai"></el-option>
										<el-option label="区域二" value="beijing"></el-option>
									</el-select>
									<el-select placeholder="请选择监播图" v-model="allPic">
										<el-option label="全部监播图" value="allHouse"></el-option>
										<el-option label="已上传" value="shanghai"></el-option>
										<el-option label="未上传" value="beijing"></el-option>
									</el-select>
									<!--进度条-->
									<div class="progress">
										<el-progress :percentage="50"></el-progress>
										<span>130 / 260</span>
									</div>
								</div>
								<div class="imgs-box">
									<div class="up-loader-Imgpanel">
										<el-card class="box-card" shadow="never">
											<div slot="header" class="clearfix img-car">
											<span>广州市-天河区-东方雅苑-西门-B</span>
											<el-popover
												placement="top-start"
												width="200"
												trigger="hover">
												<ol slot-scope="scope" style="text-align:center">
												<li>2017.10.10-2018.10.10</li>
												<li>2017.10.10-2018.10.10</li>
												<li>2017.10.10-2018.10.10</li>
												</ol>
												<i class="el-icon-date" style="float: right; padding: 3px 0" type="text"
												slot="reference"></i>
											</el-popover>
											</div>
											<div class="upload-img">
											<el-upload
												action="https://jsonplaceholder.typicode.com/posts/"
												list-type="picture-card"
												:on-preview="handlePictureCardPreview"
												:on-remove="handleRemove">
												<i class="el-icon-plus"></i>
												<span>点击上传照片</span>
											</el-upload>
											</div>
											<div class="upload-img">
											<el-upload
												action="https://jsonplaceholder.typicode.com/posts/"
												list-type="picture-card"
												:on-preview="handlePictureCardPreview"
												:on-remove="handleRemove">
												<i class="el-icon-plus"></i>
												<span>点击上传照片</span>
											</el-upload>
											</div>
											<!-- 是否显示更多的图片上传框打开 -->
											<div class="showimgbox openMoreImg">
											<i class="fa fa-angle-double-down"></i>
											</div>
											<div class="moreImgBox" style="display: none">
											<div class="upload-img">
												<el-upload
												action="https://jsonplaceholder.typicode.com/posts/"
												list-type="picture-card"
												:on-preview="handlePictureCardPreview"
												:on-remove="handleRemove">
												<i class="el-icon-plus"></i>
												<span>上传远景照片</span>
												</el-upload>
											</div>
											<div class="upload-img">
												<el-upload
												action="https://jsonplaceholder.typicode.com/posts/"
												list-type="picture-card"
												:on-preview="handlePictureCardPreview"
												:on-remove="handleRemove">
												<i class="el-icon-plus"></i>
												<span>上传远景照片</span>
												</el-upload>
											</div>
											<!-- 是否显示更多的图片上传框关闭 -->
											<div class="showimgbox closeMoreImg">
												<i class="fa fa-angle-double-up"></i>
											</div>
											</div>
										</el-card>
									</div>
									<div class="up-loader-Imgpanel">
										<el-card class="box-card" shadow="never">
											<div slot="header" class="clearfix img-car">
											<span>广州市-天河区-东方雅苑-西门-B</span>
											<el-popover
												placement="top-start"
												width="200"
												trigger="hover">
												<ol slot-scope="scope" style="text-align:center">
												<li>2017.10.10-2018.10.10</li>
												<li>2017.10.10-2018.10.10</li>
												<li>2017.10.10-2018.10.10</li>
												</ol>
												<i class="el-icon-date" style="float: right; padding: 3px 0" type="text"
												slot="reference"></i>
											</el-popover>
											</div>
											<div class="upload-img">
											<el-upload
												action="https://jsonplaceholder.typicode.com/posts/"
												list-type="picture-card"
												:on-preview="handlePictureCardPreview"
												:on-remove="handleRemove">
												<i class="el-icon-plus"></i>
												<span>点击上传照片</span>
											</el-upload>
											</div>
											<div class="upload-img">
											<el-upload
												action="https://jsonplaceholder.typicode.com/posts/"
												list-type="picture-card"
												:on-preview="handlePictureCardPreview"
												:on-remove="handleRemove">
												<i class="el-icon-plus"></i>
												<span>点击上传照片</span>
											</el-upload>
											</div>
											<!-- 是否显示更多的图片上传框打开 -->
											<div class="showimgbox openMoreImg">
											<i class="fa fa-angle-double-down"></i>
											</div>
											<div class="moreImgBox" style="display: none">
											<div class="upload-img">
												<el-upload
												action="https://jsonplaceholder.typicode.com/posts/"
												list-type="picture-card"
												:on-preview="handlePictureCardPreview"
												:on-remove="handleRemove">
												<i class="el-icon-plus"></i>
												<span>上传远景照片</span>
												</el-upload>
											</div>
											<div class="upload-img">
												<el-upload
												action="https://jsonplaceholder.typicode.com/posts/"
												list-type="picture-card"
												:on-preview="handlePictureCardPreview"
												:on-remove="handleRemove">
												<i class="el-icon-plus"></i>
												<span>上传远景照片</span>
												</el-upload>
											</div>
											<!-- 是否显示更多的图片上传框关闭 -->
											<div class="showimgbox closeMoreImg">
												<i class="fa fa-angle-double-up"></i>
											</div>
											</div>
										</el-card>
									</div>
									<div class="up-loader-Imgpanel">
										<el-card class="box-card" shadow="never">
											<div slot="header" class="clearfix img-car">
											<span>广州市-天河区-东方雅苑-西门-B</span>
											<el-popover
												placement="top-start"
												width="200"
												trigger="hover">
												<ol slot-scope="scope" style="text-align:center">
												<li>2017.10.10-2018.10.10</li>
												<li>2017.10.10-2018.10.10</li>
												<li>2017.10.10-2018.10.10</li>
												</ol>
												<i class="el-icon-date" style="float: right; padding: 3px 0" type="text"
												slot="reference"></i>
											</el-popover>
											</div>
											<div class="upload-img">
											<el-upload
												action="https://jsonplaceholder.typicode.com/posts/"
												list-type="picture-card"
												:on-preview="handlePictureCardPreview"
												:on-remove="handleRemove">
												<i class="el-icon-plus"></i>
												<span>点击上传照片</span>
											</el-upload>
											</div>
											<div class="upload-img">
											<el-upload
												action="https://jsonplaceholder.typicode.com/posts/"
												list-type="picture-card"
												:on-preview="handlePictureCardPreview"
												:on-remove="handleRemove">
												<i class="el-icon-plus"></i>
												<span>点击上传照片</span>
											</el-upload>
											</div>
											<!-- 是否显示更多的图片上传框打开 -->
											<div class="showimgbox openMoreImg">
											<i class="fa fa-angle-double-down"></i>
											</div>
											<div class="moreImgBox" style="display: none">
											<div class="upload-img">
												<el-upload
												action="https://jsonplaceholder.typicode.com/posts/"
												list-type="picture-card"
												:on-preview="handlePictureCardPreview"
												:on-remove="handleRemove">
												<i class="el-icon-plus"></i>
												<span>上传远景照片</span>
												</el-upload>
											</div>
											<div class="upload-img">
												<el-upload
												action="https://jsonplaceholder.typicode.com/posts/"
												list-type="picture-card"
												:on-preview="handlePictureCardPreview"
												:on-remove="handleRemove">
												<i class="el-icon-plus"></i>
												<span>上传远景照片</span>
												</el-upload>
											</div>
											<!-- 是否显示更多的图片上传框关闭 -->
											<div class="showimgbox closeMoreImg">
												<i class="fa fa-angle-double-up"></i>
											</div>
											</div>
										</el-card>
									</div>
									<div class="up-loader-Imgpanel">
										<el-card class="box-card" shadow="never">
											<div slot="header" class="clearfix img-car">
											<span>广州市-天河区-东方雅苑-西门-B</span>
											<el-popover
												placement="top-start"
												width="200"
												trigger="hover">
												<ol slot-scope="scope" style="text-align:center">
												<li>2017.10.10-2018.10.10</li>
												<li>2017.10.10-2018.10.10</li>
												<li>2017.10.10-2018.10.10</li>
												</ol>
												<i class="el-icon-date" style="float: right; padding: 3px 0" type="text"
												slot="reference"></i>
											</el-popover>
											</div>
											<div class="upload-img">
											<el-upload
												action="https://jsonplaceholder.typicode.com/posts/"
												list-type="picture-card"
												:on-preview="handlePictureCardPreview"
												:on-remove="handleRemove">
												<i class="el-icon-plus"></i>
												<span>点击上传照片</span>
											</el-upload>
											</div>
											<div class="upload-img">
											<el-upload
												action="https://jsonplaceholder.typicode.com/posts/"
												list-type="picture-card"
												:on-preview="handlePictureCardPreview"
												:on-remove="handleRemove">
												<i class="el-icon-plus"></i>
												<span>点击上传照片</span>
											</el-upload>
											</div>
											<!-- 是否显示更多的图片上传框打开 -->
											<div class="showimgbox openMoreImg">
											<i class="fa fa-angle-double-down"></i>
											</div>
											<div class="moreImgBox" style="display: none">
											<div class="upload-img">
												<el-upload
												action="https://jsonplaceholder.typicode.com/posts/"
												list-type="picture-card"
												:on-preview="handlePictureCardPreview"
												:on-remove="handleRemove">
												<i class="el-icon-plus"></i>
												<span>上传远景照片</span>
												</el-upload>
											</div>
											<div class="upload-img">
												<el-upload
												action="https://jsonplaceholder.typicode.com/posts/"
												list-type="picture-card"
												:on-preview="handlePictureCardPreview"
												:on-remove="handleRemove">
												<i class="el-icon-plus"></i>
												<span>上传远景照片</span>
												</el-upload>
											</div>
											<!-- 是否显示更多的图片上传框关闭 -->
											<div class="showimgbox closeMoreImg">
												<i class="fa fa-angle-double-up"></i>
											</div>
											</div>
										</el-card>
									</div>
									<div class="up-loader-Imgpanel">
										<el-card class="box-card" shadow="never">
											<div slot="header" class="clearfix img-car">
											<span>广州市-天河区-东方雅苑-西门-B</span>
											<el-popover
												placement="top-start"
												width="200"
												trigger="hover">
												<ol slot-scope="scope" style="text-align:center">
												<li>2017.10.10-2018.10.10</li>
												<li>2017.10.10-2018.10.10</li>
												<li>2017.10.10-2018.10.10</li>
												</ol>
												<i class="el-icon-date" style="float: right; padding: 3px 0" type="text"
												slot="reference"></i>
											</el-popover>
											</div>
											<div class="upload-img">
											<el-upload
												action="https://jsonplaceholder.typicode.com/posts/"
												list-type="picture-card"
												:on-preview="handlePictureCardPreview"
												:on-remove="handleRemove">
												<i class="el-icon-plus"></i>
												<span>点击上传照片</span>
											</el-upload>
											</div>
											<div class="upload-img">
											<el-upload
												action="https://jsonplaceholder.typicode.com/posts/"
												list-type="picture-card"
												:on-preview="handlePictureCardPreview"
												:on-remove="handleRemove">
												<i class="el-icon-plus"></i>
												<span>点击上传照片</span>
											</el-upload>
											</div>
											<!-- 是否显示更多的图片上传框打开 -->
											<div class="showimgbox openMoreImg">
											<i class="fa fa-angle-double-down"></i>
											</div>
											<div class="moreImgBox" style="display: none">
											<div class="upload-img">
												<el-upload
												action="https://jsonplaceholder.typicode.com/posts/"
												list-type="picture-card"
												:on-preview="handlePictureCardPreview"
												:on-remove="handleRemove">
												<i class="el-icon-plus"></i>
												<span>上传远景照片</span>
												</el-upload>
											</div>
											<div class="upload-img">
												<el-upload
												action="https://jsonplaceholder.typicode.com/posts/"
												list-type="picture-card"
												:on-preview="handlePictureCardPreview"
												:on-remove="handleRemove">
												<i class="el-icon-plus"></i>
												<span>上传远景照片</span>
												</el-upload>
											</div>
											<!-- 是否显示更多的图片上传框关闭 -->
											<div class="showimgbox closeMoreImg">
												<i class="fa fa-angle-double-up"></i>
											</div>
											</div>
										</el-card>
									</div>
									<div class="up-loader-Imgpanel">
										<el-card class="box-card" shadow="never">
											<div slot="header" class="clearfix img-car">
											<span>广州市-天河区-东方雅苑-西门-B</span>
											<el-popover
												placement="top-start"
												width="200"
												trigger="hover">
												<ol slot-scope="scope" style="text-align:center">
												<li>2017.10.10-2018.10.10</li>
												<li>2017.10.10-2018.10.10</li>
												<li>2017.10.10-2018.10.10</li>
												</ol>
												<i class="el-icon-date" style="float: right; padding: 3px 0" type="text"
												slot="reference"></i>
											</el-popover>
											</div>
											<div class="upload-img">
											<el-upload
												action="https://jsonplaceholder.typicode.com/posts/"
												list-type="picture-card"
												:on-preview="handlePictureCardPreview"
												:on-remove="handleRemove">
												<i class="el-icon-plus"></i>
												<span>点击上传照片</span>
											</el-upload>
											</div>
											<div class="upload-img">
											<el-upload
												action="https://jsonplaceholder.typicode.com/posts/"
												list-type="picture-card"
												:on-preview="handlePictureCardPreview"
												:on-remove="handleRemove">
												<i class="el-icon-plus"></i>
												<span>点击上传照片</span>
											</el-upload>
											</div>
											<!-- 是否显示更多的图片上传框打开 -->
											<div class="showimgbox openMoreImg">
											<i class="fa fa-angle-double-down"></i>
											</div>
											<div class="moreImgBox" style="display: none">
											<div class="upload-img">
												<el-upload
												action="https://jsonplaceholder.typicode.com/posts/"
												list-type="picture-card"
												:on-preview="handlePictureCardPreview"
												:on-remove="handleRemove">
												<i class="el-icon-plus"></i>
												<span>上传远景照片</span>
												</el-upload>
											</div>
											<div class="upload-img">
												<el-upload
												action="https://jsonplaceholder.typicode.com/posts/"
												list-type="picture-card"
												:on-preview="handlePictureCardPreview"
												:on-remove="handleRemove">
												<i class="el-icon-plus"></i>
												<span>上传远景照片</span>
												</el-upload>
											</div>
											<!-- 是否显示更多的图片上传框关闭 -->
											<div class="showimgbox closeMoreImg">
												<i class="fa fa-angle-double-up"></i>
											</div>
											</div>
										</el-card>
									</div>
									<div class="up-loader-Imgpanel">
										<el-card class="box-card" shadow="never">
											<div slot="header" class="clearfix img-car">
											<span>广州市-天河区-东方雅苑-西门-B</span>
											<el-popover
												placement="top-start"
												width="200"
												trigger="hover">
												<ol slot-scope="scope" style="text-align:center">
												<li>2017.10.10-2018.10.10</li>
												<li>2017.10.10-2018.10.10</li>
												<li>2017.10.10-2018.10.10</li>
												</ol>
												<i class="el-icon-date" style="float: right; padding: 3px 0" type="text"
												slot="reference"></i>
											</el-popover>
											</div>
											<div class="upload-img">
											<el-upload
												action="https://jsonplaceholder.typicode.com/posts/"
												list-type="picture-card"
												:on-preview="handlePictureCardPreview"
												:on-remove="handleRemove">
												<i class="el-icon-plus"></i>
												<span>点击上传照片</span>
											</el-upload>
											</div>
											<div class="upload-img">
											<el-upload
												action="https://jsonplaceholder.typicode.com/posts/"
												list-type="picture-card"
												:on-preview="handlePictureCardPreview"
												:on-remove="handleRemove">
												<i class="el-icon-plus"></i>
												<span>点击上传照片</span>
											</el-upload>
											</div>
											<!-- 是否显示更多的图片上传框打开 -->
											<div class="showimgbox openMoreImg">
											<i class="fa fa-angle-double-down"></i>
											</div>
											<div class="moreImgBox" style="display: none">
											<div class="upload-img">
												<el-upload
												action="https://jsonplaceholder.typicode.com/posts/"
												list-type="picture-card"
												:on-preview="handlePictureCardPreview"
												:on-remove="handleRemove">
												<i class="el-icon-plus"></i>
												<span>上传远景照片</span>
												</el-upload>
											</div>
											<div class="upload-img">
												<el-upload
												action="https://jsonplaceholder.typicode.com/posts/"
												list-type="picture-card"
												:on-preview="handlePictureCardPreview"
												:on-remove="handleRemove">
												<i class="el-icon-plus"></i>
												<span>上传远景照片</span>
												</el-upload>
											</div>
											<!-- 是否显示更多的图片上传框关闭 -->
											<div class="showimgbox closeMoreImg">
												<i class="fa fa-angle-double-up"></i>
											</div>
											</div>
										</el-card>
									</div>
									<div class="up-loader-Imgpanel">
										<el-card class="box-card" shadow="never">
											<div slot="header" class="clearfix img-car">
											<span>广州市-天河区-东方雅苑-西门-B</span>
											<el-popover
												placement="top-start"
												width="200"
												trigger="hover">
												<ol slot-scope="scope" style="text-align:center">
												<li>2017.10.10-2018.10.10</li>
												<li>2017.10.10-2018.10.10</li>
												<li>2017.10.10-2018.10.10</li>
												</ol>
												<i class="el-icon-date" style="float: right; padding: 3px 0" type="text"
												slot="reference"></i>
											</el-popover>
											</div>
											<div class="upload-img">
											<el-upload
												action="https://jsonplaceholder.typicode.com/posts/"
												list-type="picture-card"
												:on-preview="handlePictureCardPreview"
												:on-remove="handleRemove">
												<i class="el-icon-plus"></i>
												<span>点击上传照片</span>
											</el-upload>
											</div>
											<div class="upload-img">
											<el-upload
												action="https://jsonplaceholder.typicode.com/posts/"
												list-type="picture-card"
												:on-preview="handlePictureCardPreview"
												:on-remove="handleRemove">
												<i class="el-icon-plus"></i>
												<span>点击上传照片</span>
											</el-upload>
											</div>
											<!-- 是否显示更多的图片上传框打开 -->
											<div class="showimgbox openMoreImg">
											<i class="fa fa-angle-double-down"></i>
											</div>
											<div class="moreImgBox" style="display: none">
											<div class="upload-img">
												<el-upload
												action="https://jsonplaceholder.typicode.com/posts/"
												list-type="picture-card"
												:on-preview="handlePictureCardPreview"
												:on-remove="handleRemove">
												<i class="el-icon-plus"></i>
												<span>上传远景照片</span>
												</el-upload>
											</div>
											<div class="upload-img">
												<el-upload
												action="https://jsonplaceholder.typicode.com/posts/"
												list-type="picture-card"
												:on-preview="handlePictureCardPreview"
												:on-remove="handleRemove">
												<i class="el-icon-plus"></i>
												<span>上传远景照片</span>
												</el-upload>
											</div>
											<!-- 是否显示更多的图片上传框关闭 -->
											<div class="showimgbox closeMoreImg">
												<i class="fa fa-angle-double-up"></i>
											</div>
											</div>
										</el-card>
									</div>
									<div class="up-loader-Imgpanel">
										<el-card class="box-card" shadow="never">
											<div slot="header" class="clearfix img-car">
											<span>广州市-天河区-东方雅苑-西门-B</span>
											<el-popover
												placement="top-start"
												width="200"
												trigger="hover">
												<ol slot-scope="scope" style="text-align:center">
												<li>2017.10.10-2018.10.10</li>
												<li>2017.10.10-2018.10.10</li>
												<li>2017.10.10-2018.10.10</li>
												</ol>
												<i class="el-icon-date" style="float: right; padding: 3px 0" type="text"
												slot="reference"></i>
											</el-popover>
											</div>
											<div class="upload-img">
											<el-upload
												action="https://jsonplaceholder.typicode.com/posts/"
												list-type="picture-card"
												:on-preview="handlePictureCardPreview"
												:on-remove="handleRemove">
												<i class="el-icon-plus"></i>
												<span>点击上传照片</span>
											</el-upload>
											</div>
											<div class="upload-img">
											<el-upload
												action="https://jsonplaceholder.typicode.com/posts/"
												list-type="picture-card"
												:on-preview="handlePictureCardPreview"
												:on-remove="handleRemove">
												<i class="el-icon-plus"></i>
												<span>点击上传照片</span>
											</el-upload>
											</div>
											<!-- 是否显示更多的图片上传框打开 -->
											<div class="showimgbox openMoreImg">
											<i class="fa fa-angle-double-down"></i>
											</div>
											<div class="moreImgBox" style="display: none">
											<div class="upload-img">
												<el-upload
												action="https://jsonplaceholder.typicode.com/posts/"
												list-type="picture-card"
												:on-preview="handlePictureCardPreview"
												:on-remove="handleRemove">
												<i class="el-icon-plus"></i>
												<span>上传远景照片</span>
												</el-upload>
											</div>
											<div class="upload-img">
												<el-upload
												action="https://jsonplaceholder.typicode.com/posts/"
												list-type="picture-card"
												:on-preview="handlePictureCardPreview"
												:on-remove="handleRemove">
												<i class="el-icon-plus"></i>
												<span>上传远景照片</span>
												</el-upload>
											</div>
											<!-- 是否显示更多的图片上传框关闭 -->
											<div class="showimgbox closeMoreImg">
												<i class="fa fa-angle-double-up"></i>
											</div>
											</div>
										</el-card>
									</div>
									<div class="up-loader-Imgpanel">
										<el-card class="box-card" shadow="never">
											<div slot="header" class="clearfix img-car">
											<span>广州市-天河区-东方雅苑-西门-B</span>
											<el-popover
												placement="top-start"
												width="200"
												trigger="hover">
												<ol slot-scope="scope" style="text-align:center">
												<li>2017.10.10-2018.10.10</li>
												<li>2017.10.10-2018.10.10</li>
												<li>2017.10.10-2018.10.10</li>
												</ol>
												<i class="el-icon-date" style="float: right; padding: 3px 0" type="text"
												slot="reference"></i>
											</el-popover>
											</div>
											<div class="upload-img">
											<el-upload
												action="https://jsonplaceholder.typicode.com/posts/"
												list-type="picture-card"
												:on-preview="handlePictureCardPreview"
												:on-remove="handleRemove">
												<i class="el-icon-plus"></i>
												<span>点击上传照片</span>
											</el-upload>
											</div>
											<div class="upload-img">
											<el-upload
												action="https://jsonplaceholder.typicode.com/posts/"
												list-type="picture-card"
												:on-preview="handlePictureCardPreview"
												:on-remove="handleRemove">
												<i class="el-icon-plus"></i>
												<span>点击上传照片</span>
											</el-upload>
											</div>
											<!-- 是否显示更多的图片上传框打开 -->
											<div class="showimgbox openMoreImg">
											<i class="fa fa-angle-double-down"></i>
											</div>
											<div class="moreImgBox" style="display: none">
											<div class="upload-img">
												<el-upload
												action="https://jsonplaceholder.typicode.com/posts/"
												list-type="picture-card"
												:on-preview="handlePictureCardPreview"
												:on-remove="handleRemove">
												<i class="el-icon-plus"></i>
												<span>上传远景照片</span>
												</el-upload>
											</div>
											<div class="upload-img">
												<el-upload
												action="https://jsonplaceholder.typicode.com/posts/"
												list-type="picture-card"
												:on-preview="handlePictureCardPreview"
												:on-remove="handleRemove">
												<i class="el-icon-plus"></i>
												<span>上传远景照片</span>
												</el-upload>
											</div>
											<!-- 是否显示更多的图片上传框关闭 -->
											<div class="showimgbox closeMoreImg">
												<i class="fa fa-angle-double-up"></i>
											</div>
											</div>
										</el-card>
									</div>
									<div class="up-loader-Imgpanel">
										<el-card class="box-card" shadow="never">
											<div slot="header" class="clearfix img-car">
											<span>广州市-天河区-东方雅苑-西门-B</span>
											<el-popover
												placement="top-start"
												width="200"
												trigger="hover">
												<ol slot-scope="scope" style="text-align:center">
												<li>2017.10.10-2018.10.10</li>
												<li>2017.10.10-2018.10.10</li>
												<li>2017.10.10-2018.10.10</li>
												</ol>
												<i class="el-icon-date" style="float: right; padding: 3px 0" type="text"
												slot="reference"></i>
											</el-popover>
											</div>
											<div class="upload-img">
											<el-upload
												action="https://jsonplaceholder.typicode.com/posts/"
												list-type="picture-card"
												:on-preview="handlePictureCardPreview"
												:on-remove="handleRemove">
												<i class="el-icon-plus"></i>
												<span>点击上传照片</span>
											</el-upload>
											</div>
											<div class="upload-img">
											<el-upload
												action="https://jsonplaceholder.typicode.com/posts/"
												list-type="picture-card"
												:on-preview="handlePictureCardPreview"
												:on-remove="handleRemove">
												<i class="el-icon-plus"></i>
												<span>点击上传照片</span>
											</el-upload>
											</div>
											<!-- 是否显示更多的图片上传框打开 -->
											<div class="showimgbox openMoreImg">
											<i class="fa fa-angle-double-down"></i>
											</div>
											<div class="moreImgBox" style="display: none">
											<div class="upload-img">
												<el-upload
												action="https://jsonplaceholder.typicode.com/posts/"
												list-type="picture-card"
												:on-preview="handlePictureCardPreview"
												:on-remove="handleRemove">
												<i class="el-icon-plus"></i>
												<span>上传远景照片</span>
												</el-upload>
											</div>
											<div class="upload-img">
												<el-upload
												action="https://jsonplaceholder.typicode.com/posts/"
												list-type="picture-card"
												:on-preview="handlePictureCardPreview"
												:on-remove="handleRemove">
												<i class="el-icon-plus"></i>
												<span>上传远景照片</span>
												</el-upload>
											</div>
											<!-- 是否显示更多的图片上传框关闭 -->
											<div class="showimgbox closeMoreImg">
												<i class="fa fa-angle-double-up"></i>
											</div>
											</div>
										</el-card>
									</div>
								</div>
								<div class="pager">
									<el-pagination
									small
									background
									@size-change="handleSizeChange"
									@current-change="handleCurrentChange"
									:current-page="1"
									:page-sizes="[6, 12]"
									:page-size="6"
									layout=" sizes, prev, pager, next, jumper"
									:total="30">
									</el-pagination>
								</div>
								<div class="up-report-bottom">
									<div class="up-report-bottom-checkbox">
									<el-checkbox v-model="sendReportchecked">生成报告同时发送至客户邮箱：444094173@qq.com
										<el-button type="text">修改</el-button>
									</el-checkbox>
									</div>
									<div class="up-report-bottom-btns">
									<el-button type="primary">生成报告</el-button>
									<el-button plain>下载PDF</el-button>
									<el-button plain @click="show2H5">查看H5</el-button>
									</div>
								</div>
							</div>
						</div>
						</div>
					</el-tab-pane>
					<el-tab-pane label="下刊报告" name="fifth" :disabled="usableBtn">
						<div class="forth-wrap box-wrap">
						<h4>下刊报告</h4>
						<div class="panel">
							<div class="up-report">
							<div class="up-loader-header">
								<el-cascader
								:options="citys"
								v-model="selectedOptions"
								>
								</el-cascader>
								<el-select placeholder="请选择资源" filterable v-model="allhouse">
								<el-option label="全部资源" value="allHouse"></el-option>
								<el-option label="区域一" value="shanghai"></el-option>
								<el-option label="区域二" value="beijing"></el-option>
								</el-select>
								<el-select placeholder="请选择监播图" v-model="allPic">
								<el-option label="全部监播图" value="allHouse"></el-option>
								<el-option label="已上传" value="shanghai"></el-option>
								<el-option label="未上传" value="beijing"></el-option>
								</el-select>
								<!--进度条-->
								<div class="progress">
								<el-progress :percentage="50"></el-progress>
								<span>130 / 260</span>
								</div>
							</div>
							<div class="imgs-box">
								<div class="up-loader-Imgpanel">
								<el-card class="box-card" shadow="never">
									<div slot="header" class="clearfix img-car">
									<span>广州市-天河区-东方雅苑-西门-B</span>
									<i class="el-icon-date" style="float: right; padding: 3px 0" type="text"></i>
									</div>
									<div class="upload-img">
									<el-upload
										action="https://jsonplaceholder.typicode.com/posts/"
										list-type="picture-card"
										:on-preview="handlePictureCardPreview"
										:on-remove="handleRemove">
										<i class="el-icon-plus"></i>
										<span>点击上传照片</span>
									</el-upload>
									</div>
									<div class="upload-img">
									<el-upload
										action="https://jsonplaceholder.typicode.com/posts/"
										list-type="picture-card"
										:on-preview="handlePictureCardPreview"
										:on-remove="handleRemove">
										<i class="el-icon-plus"></i>
										<span>点击上传照片</span>
									</el-upload>
									</div>
									<!-- 是否显示更多的图片上传框打开 -->
									<div class="showimgbox" @click="isShow1=true" v-if="isShow1==false">
									<i class="fa fa-angle-double-down"></i>
									</div>
									<div v-if="isShow1">
									<div class="upload-img">
										<el-upload
										action="https://jsonplaceholder.typicode.com/posts/"
										list-type="picture-card"
										:on-preview="handlePictureCardPreview"
										:on-remove="handleRemove">
										<i class="el-icon-plus"></i>
										<span>上传远景照片</span>
										</el-upload>
									</div>
									<div class="upload-img">
										<el-upload
										action="https://jsonplaceholder.typicode.com/posts/"
										list-type="picture-card"
										:on-preview="handlePictureCardPreview"
										:on-remove="handleRemove">
										<i class="el-icon-plus"></i>
										<span>上传远景照片</span>
										</el-upload>
									</div>
									<!-- 是否显示更多的图片上传框关闭 -->
									<div class="showimgbox" @click="isShow1=false">
										<i class="fa fa-angle-double-up"></i>
									</div>
									</div>
								</el-card>
								</div>
								<div class="up-loader-Imgpanel">
								<el-card class="box-card" shadow="never">
									<div slot="header" class="clearfix img-car">
									<span>广州市-天河区-东方雅苑-西门-B</span>
									<i class="el-icon-date" style="float: right; padding: 3px 0" type="text"></i>
									</div>
									<div class="upload-img">
									<el-upload
										action="https://jsonplaceholder.typicode.com/posts/"
										list-type="picture-card"
										:on-preview="handlePictureCardPreview"
										:on-remove="handleRemove">
										<i class="el-icon-plus"></i>
										<span>上传远景照片</span>
									</el-upload>
									</div>
									<div class="upload-img">
									<el-upload
										action="https://jsonplaceholder.typicode.com/posts/"
										list-type="picture-card"
										:on-preview="handlePictureCardPreview"
										:on-remove="handleRemove">
										<i class="el-icon-plus"></i>
										<span>上传远景照片</span>
									</el-upload>
									</div>

									<!-- 是否显示更多的图片上传框打开 -->
									<div class="showimgbox" @click="isShow2=true" v-if="isShow2==false">
									<i class="fa fa-angle-double-down"></i>
									</div>
									<div v-if="isShow2">
									<div class="upload-img">
										<el-upload
										action="https://jsonplaceholder.typicode.com/posts/"
										list-type="picture-card"
										:on-preview="handlePictureCardPreview"
										:on-remove="handleRemove">
										<i class="el-icon-plus"></i>
										<span>上传远景照片</span>
										</el-upload>
									</div>
									<div class="upload-img">
										<el-upload
										action="https://jsonplaceholder.typicode.com/posts/"
										list-type="picture-card"
										:on-preview="handlePictureCardPreview"
										:on-remove="handleRemove">
										<i class="el-icon-plus"></i>
										<span>上传远景照片</span>
										</el-upload>
									</div>
									<!-- 是否显示更多的图片上传框关闭 -->
									<div class="showimgbox" @click="isShow2=false">
										<i class="fa fa-angle-double-up"></i>
									</div>
									</div>
								</el-card>
								</div>
								<div class="up-loader-Imgpanel">
								<el-card class="box-card" shadow="never">
									<div slot="header" class="clearfix img-car">
									<span>广州市-天河区-东方雅苑-西门-B</span>
									<i class="el-icon-date" style="float: right; padding: 3px 0" type="text"></i>
									</div>
									<div class="upload-img">
									<el-upload
										action="https://jsonplaceholder.typicode.com/posts/"
										list-type="picture-card"
										:on-preview="handlePictureCardPreview"
										:on-remove="handleRemove">
										<i class="el-icon-plus"></i>
										<span>上传远景照片</span>
									</el-upload>
									</div>
									<div class="upload-img">
									<el-upload
										action="https://jsonplaceholder.typicode.com/posts/"
										list-type="picture-card"
										:on-preview="handlePictureCardPreview"
										:on-remove="handleRemove">
										<i class="el-icon-plus"></i>
										<span>上传远景照片</span>
									</el-upload>
									<el-dialog :visible.sync="dialogVisible">
										<img width="100%" :src="dialogImageUrl" alt="">
									</el-dialog>
									</div>

									<!-- 是否显示更多的图片上传框打开 -->
									<div class="showimgbox" @click="isShow3=true" v-if="isShow3==false">
									<i class="fa fa-angle-double-down"></i>
									</div>
									<div v-if="isShow3">
									<div class="upload-img">
										<el-upload
										action="https://jsonplaceholder.typicode.com/posts/"
										list-type="picture-card"
										:on-preview="handlePictureCardPreview"
										:on-remove="handleRemove">
										<i class="el-icon-plus"></i>
										<span>上传远景照片</span>
										</el-upload>
									</div>
									<div class="upload-img">
										<el-upload
										action="https://jsonplaceholder.typicode.com/posts/"
										list-type="picture-card"
										:on-preview="handlePictureCardPreview"
										:on-remove="handleRemove">
										<i class="el-icon-plus"></i>
										<span>上传远景照片</span>
										</el-upload>
									</div>
									<!-- 是否显示更多的图片上传框关闭 -->
									<div class="showimgbox" @click="isShow3=false">
										<i class="fa fa-angle-double-up"></i>
									</div>
									</div>
								</el-card>
								</div>
								<div class="up-loader-Imgpanel">
								<el-card class="box-card" shadow="never">
									<div slot="header" class="clearfix img-car">
									<span>广州市-天河区-东方雅苑-西门-B</span>
									<i class="el-icon-date" style="float: right; padding: 3px 0" type="text"></i>
									</div>
									<div class="upload-img">
									<el-upload
										action="https://jsonplaceholder.typicode.com/posts/"
										list-type="picture-card"
										:on-preview="handlePictureCardPreview"
										:on-remove="handleRemove">
										<i class="el-icon-plus"></i>
										<span>上传远景照片</span>
									</el-upload>
									</div>
									<div class="upload-img">
									<el-upload
										action="https://jsonplaceholder.typicode.com/posts/"
										list-type="picture-card"
										:on-preview="handlePictureCardPreview"
										:on-remove="handleRemove">
										<i class="el-icon-plus"></i>
										<span>上传远景照片</span>
									</el-upload>
									</div>

									<!-- 是否显示更多的图片上传框打开 -->
									<div class="showimgbox" @click="isShow4=true" v-if="isShow4==false">
									<i class="fa fa-angle-double-down"></i>
									</div>
									<div v-if="isShow4">
									<div class="upload-img">
										<el-upload
										action="https://jsonplaceholder.typicode.com/posts/"
										list-type="picture-card"
										:on-preview="handlePictureCardPreview"
										:on-remove="handleRemove">
										<i class="el-icon-plus"></i>
										<span>上传远景照片</span>
										</el-upload>
									</div>
									<div class="upload-img">
										<el-upload
										action="https://jsonplaceholder.typicode.com/posts/"
										list-type="picture-card"
										:on-preview="handlePictureCardPreview"
										:on-remove="handleRemove">
										<i class="el-icon-plus"></i>
										<span>上传远景照片</span>
										</el-upload>
									</div>
									<!-- 是否显示更多的图片上传框关闭 -->
									<div class="showimgbox" @click="isShow4=false">
										<i class="fa fa-angle-double-up"></i>
									</div>
									</div>
								</el-card>
								</div>
								<div class="up-loader-Imgpanel">
								<el-card class="box-card" shadow="never">
									<div slot="header" class="clearfix img-car">
									<span>广州市-天河区-东方雅苑-西门-B</span>
									<i class="el-icon-date" style="float: right; padding: 3px 0" type="text"></i>
									</div>
									<div class="upload-img">
									<el-upload
										action="https://jsonplaceholder.typicode.com/posts/"
										list-type="picture-card"
										:on-preview="handlePictureCardPreview"
										:on-remove="handleRemove">
										<i class="el-icon-plus"></i>
										<span>上传远景照片</span>
									</el-upload>
									</div>
									<div class="upload-img">
									<el-upload
										action="https://jsonplaceholder.typicode.com/posts/"
										list-type="picture-card"
										:on-preview="handlePictureCardPreview"
										:on-remove="handleRemove">
										<i class="el-icon-plus"></i>
										<span>上传远景照片</span>
									</el-upload>
									</div>

									<!-- 是否显示更多的图片上传框打开 -->
									<div class="showimgbox" @click="isShow5=true" v-if="isShow5==false">
									<i class="fa fa-angle-double-down"></i>
									</div>
									<div v-if="isShow5">
									<div class="upload-img">
										<el-upload
										action="https://jsonplaceholder.typicode.com/posts/"
										list-type="picture-card"
										:on-preview="handlePictureCardPreview"
										:on-remove="handleRemove">
										<i class="el-icon-plus"></i>
										<span>上传远景照片</span>
										</el-upload>
									</div>
									<div class="upload-img">
										<el-upload
										action="https://jsonplaceholder.typicode.com/posts/"
										list-type="picture-card"
										:on-preview="handlePictureCardPreview"
										:on-remove="handleRemove">
										<i class="el-icon-plus"></i>
										<span>上传远景照片</span>
										</el-upload>
									</div>
									<!-- 是否显示更多的图片上传框关闭 -->
									<div class="showimgbox" @click="isShow5=false">
										<i class="fa fa-angle-double-up"></i>
									</div>
									</div>
								</el-card>
								</div>
								<div class="up-loader-Imgpanel">
								<el-card class="box-card" shadow="never">
									<div slot="header" class="clearfix img-car">
									<span>广州市-天河区-东方雅苑-西门-B</span>
									<i class="el-icon-date" style="float: right; padding: 3px 0" type="text"></i>
									</div>
									<div class="upload-img">
									<el-upload
										action="https://jsonplaceholder.typicode.com/posts/"
										list-type="picture-card"
										:on-preview="handlePictureCardPreview"
										:on-remove="handleRemove">
										<i class="el-icon-plus"></i>
										<span>上传远景照片</span>
									</el-upload>
									</div>
									<div class="upload-img">
									<el-upload
										action="https://jsonplaceholder.typicode.com/posts/"
										list-type="picture-card"
										:on-preview="handlePictureCardPreview"
										:on-remove="handleRemove">
										<i class="el-icon-plus"></i>
										<span>上传远景照片</span>
									</el-upload>
									</div>

									<!-- 是否显示更多的图片上传框打开 -->
									<div class="showimgbox" @click="isShow6=true" v-if="isShow6==false">
									<i class="fa fa-angle-double-down"></i>
									</div>
									<div v-if="isShow6">
									<div class="upload-img">
										<el-upload
										action="https://jsonplaceholder.typicode.com/posts/"
										list-type="picture-card"
										:on-preview="handlePictureCardPreview"
										:on-remove="handleRemove">
										<i class="el-icon-plus"></i>
										<span>上传远景照片</span>
										</el-upload>
									</div>
									<div class="upload-img">
										<el-upload
										action="https://jsonplaceholder.typicode.com/posts/"
										list-type="picture-card"
										:on-preview="handlePictureCardPreview"
										:on-remove="handleRemove">
										<i class="el-icon-plus"></i>
										<span>上传远景照片</span>
										</el-upload>
									</div>
									<!-- 是否显示更多的图片上传框关闭 -->
									<div class="showimgbox" @click="isShow6=false">
										<i class="fa fa-angle-double-up"></i>
									</div>
									</div>
								</el-card>
								</div>
								<div class="up-loader-Imgpanel">
								<el-card class="box-card" shadow="never">
									<div slot="header" class="clearfix img-car">
									<span>广州市-天河区-东方雅苑-西门-B</span>
									<i class="el-icon-date" style="float: right; padding: 3px 0" type="text"></i>
									</div>
									<div class="upload-img">
									<el-upload
										action="https://jsonplaceholder.typicode.com/posts/"
										list-type="picture-card"
										:on-preview="handlePictureCardPreview"
										:on-remove="handleRemove">
										<i class="el-icon-plus"></i>
										<span>点击上传照片</span>
									</el-upload>
									</div>
									<div class="upload-img">
									<el-upload
										action="https://jsonplaceholder.typicode.com/posts/"
										list-type="picture-card"
										:on-preview="handlePictureCardPreview"
										:on-remove="handleRemove">
										<i class="el-icon-plus"></i>
										<span>点击上传照片</span>
									</el-upload>
									</div>
									<!-- 是否显示更多的图片上传框打开 -->
									<div class="showimgbox" @click="isShow1=true" v-if="isShow1==false">
									<i class="fa fa-angle-double-down"></i>
									</div>
									<div v-if="isShow1">
									<div class="upload-img">
										<el-upload
										action="https://jsonplaceholder.typicode.com/posts/"
										list-type="picture-card"
										:on-preview="handlePictureCardPreview"
										:on-remove="handleRemove">
										<i class="el-icon-plus"></i>
										<span>上传远景照片</span>
										</el-upload>
									</div>
									<div class="upload-img">
										<el-upload
										action="https://jsonplaceholder.typicode.com/posts/"
										list-type="picture-card"
										:on-preview="handlePictureCardPreview"
										:on-remove="handleRemove">
										<i class="el-icon-plus"></i>
										<span>上传远景照片</span>
										</el-upload>
									</div>
									<!-- 是否显示更多的图片上传框关闭 -->
									<div class="showimgbox" @click="isShow1=false">
										<i class="fa fa-angle-double-up"></i>
									</div>
									</div>
								</el-card>
								</div>
								<div class="up-loader-Imgpanel">
								<el-card class="box-card" shadow="never">
									<div slot="header" class="clearfix img-car">
									<span>广州市-天河区-东方雅苑-西门-B</span>
									<i class="el-icon-date" style="float: right; padding: 3px 0" type="text"></i>
									</div>
									<div class="upload-img">
									<el-upload
										action="https://jsonplaceholder.typicode.com/posts/"
										list-type="picture-card"
										:on-preview="handlePictureCardPreview"
										:on-remove="handleRemove">
										<i class="el-icon-plus"></i>
										<span>上传远景照片</span>
									</el-upload>
									</div>
									<div class="upload-img">
									<el-upload
										action="https://jsonplaceholder.typicode.com/posts/"
										list-type="picture-card"
										:on-preview="handlePictureCardPreview"
										:on-remove="handleRemove">
										<i class="el-icon-plus"></i>
										<span>上传远景照片</span>
									</el-upload>
									</div>

									<!-- 是否显示更多的图片上传框打开 -->
									<div class="showimgbox" @click="isShow2=true" v-if="isShow2==false">
									<i class="fa fa-angle-double-down"></i>
									</div>
									<div v-if="isShow2">
									<div class="upload-img">
										<el-upload
										action="https://jsonplaceholder.typicode.com/posts/"
										list-type="picture-card"
										:on-preview="handlePictureCardPreview"
										:on-remove="handleRemove">
										<i class="el-icon-plus"></i>
										<span>上传远景照片</span>
										</el-upload>
									</div>
									<div class="upload-img">
										<el-upload
										action="https://jsonplaceholder.typicode.com/posts/"
										list-type="picture-card"
										:on-preview="handlePictureCardPreview"
										:on-remove="handleRemove">
										<i class="el-icon-plus"></i>
										<span>上传远景照片</span>
										</el-upload>
									</div>
									<!-- 是否显示更多的图片上传框关闭 -->
									<div class="showimgbox" @click="isShow2=false">
										<i class="fa fa-angle-double-up"></i>
									</div>
									</div>
								</el-card>
								</div>
								<div class="up-loader-Imgpanel">
								<el-card class="box-card" shadow="never">
									<div slot="header" class="clearfix img-car">
									<span>广州市-天河区-东方雅苑-西门-B</span>
									<i class="el-icon-date" style="float: right; padding: 3px 0" type="text"></i>
									</div>
									<div class="upload-img">
									<el-upload
										action="https://jsonplaceholder.typicode.com/posts/"
										list-type="picture-card"
										:on-preview="handlePictureCardPreview"
										:on-remove="handleRemove">
										<i class="el-icon-plus"></i>
										<span>上传远景照片</span>
									</el-upload>
									</div>
									<div class="upload-img">
									<el-upload
										action="https://jsonplaceholder.typicode.com/posts/"
										list-type="picture-card"
										:on-preview="handlePictureCardPreview"
										:on-remove="handleRemove">
										<i class="el-icon-plus"></i>
										<span>上传远景照片</span>
									</el-upload>
									<el-dialog :visible.sync="dialogVisible">
										<img width="100%" :src="dialogImageUrl" alt="">
									</el-dialog>
									</div>

									<!-- 是否显示更多的图片上传框打开 -->
									<div class="showimgbox" @click="isShow3=true" v-if="isShow3==false">
									<i class="fa fa-angle-double-down"></i>
									</div>
									<div v-if="isShow3">
									<div class="upload-img">
										<el-upload
										action="https://jsonplaceholder.typicode.com/posts/"
										list-type="picture-card"
										:on-preview="handlePictureCardPreview"
										:on-remove="handleRemove">
										<i class="el-icon-plus"></i>
										<span>上传远景照片</span>
										</el-upload>
									</div>
									<div class="upload-img">
										<el-upload
										action="https://jsonplaceholder.typicode.com/posts/"
										list-type="picture-card"
										:on-preview="handlePictureCardPreview"
										:on-remove="handleRemove">
										<i class="el-icon-plus"></i>
										<span>上传远景照片</span>
										</el-upload>
									</div>
									<!-- 是否显示更多的图片上传框关闭 -->
									<div class="showimgbox" @click="isShow3=false">
										<i class="fa fa-angle-double-up"></i>
									</div>
									</div>
								</el-card>
								</div>
								<div class="up-loader-Imgpanel">
								<el-card class="box-card" shadow="never">
									<div slot="header" class="clearfix img-car">
									<span>广州市-天河区-东方雅苑-西门-B</span>
									<i class="el-icon-date" style="float: right; padding: 3px 0" type="text"></i>
									</div>
									<div class="upload-img">
									<el-upload
										action="https://jsonplaceholder.typicode.com/posts/"
										list-type="picture-card"
										:on-preview="handlePictureCardPreview"
										:on-remove="handleRemove">
										<i class="el-icon-plus"></i>
										<span>上传远景照片</span>
									</el-upload>
									</div>
									<div class="upload-img">
									<el-upload
										action="https://jsonplaceholder.typicode.com/posts/"
										list-type="picture-card"
										:on-preview="handlePictureCardPreview"
										:on-remove="handleRemove">
										<i class="el-icon-plus"></i>
										<span>上传远景照片</span>
									</el-upload>
									</div>

									<!-- 是否显示更多的图片上传框打开 -->
									<div class="showimgbox" @click="isShow4=true" v-if="isShow4==false">
									<i class="fa fa-angle-double-down"></i>
									</div>
									<div v-if="isShow4">
									<div class="upload-img">
										<el-upload
										action="https://jsonplaceholder.typicode.com/posts/"
										list-type="picture-card"
										:on-preview="handlePictureCardPreview"
										:on-remove="handleRemove">
										<i class="el-icon-plus"></i>
										<span>上传远景照片</span>
										</el-upload>
									</div>
									<div class="upload-img">
										<el-upload
										action="https://jsonplaceholder.typicode.com/posts/"
										list-type="picture-card"
										:on-preview="handlePictureCardPreview"
										:on-remove="handleRemove">
										<i class="el-icon-plus"></i>
										<span>上传远景照片</span>
										</el-upload>
									</div>
									<!-- 是否显示更多的图片上传框关闭 -->
									<div class="showimgbox" @click="isShow4=false">
										<i class="fa fa-angle-double-up"></i>
									</div>
									</div>
								</el-card>
								</div>
								<div class="up-loader-Imgpanel">
								<el-card class="box-card" shadow="never">
									<div slot="header" class="clearfix img-car">
									<span>广州市-天河区-东方雅苑-西门-B</span>
									<i class="el-icon-date" style="float: right; padding: 3px 0" type="text"></i>
									</div>
									<div class="upload-img">
									<el-upload
										action="https://jsonplaceholder.typicode.com/posts/"
										list-type="picture-card"
										:on-preview="handlePictureCardPreview"
										:on-remove="handleRemove">
										<i class="el-icon-plus"></i>
										<span>上传远景照片</span>
									</el-upload>
									</div>
									<div class="upload-img">
									<el-upload
										action="https://jsonplaceholder.typicode.com/posts/"
										list-type="picture-card"
										:on-preview="handlePictureCardPreview"
										:on-remove="handleRemove">
										<i class="el-icon-plus"></i>
										<span>上传远景照片</span>
									</el-upload>
									</div>

									<!-- 是否显示更多的图片上传框打开 -->
									<div class="showimgbox" @click="isShow5=true" v-if="isShow5==false">
									<i class="fa fa-angle-double-down"></i>
									</div>
									<div v-if="isShow5">
									<div class="upload-img">
										<el-upload
										action="https://jsonplaceholder.typicode.com/posts/"
										list-type="picture-card"
										:on-preview="handlePictureCardPreview"
										:on-remove="handleRemove">
										<i class="el-icon-plus"></i>
										<span>上传远景照片</span>
										</el-upload>
									</div>
									<div class="upload-img">
										<el-upload
										action="https://jsonplaceholder.typicode.com/posts/"
										list-type="picture-card"
										:on-preview="handlePictureCardPreview"
										:on-remove="handleRemove">
										<i class="el-icon-plus"></i>
										<span>上传远景照片</span>
										</el-upload>
									</div>
									<!-- 是否显示更多的图片上传框关闭 -->
									<div class="showimgbox" @click="isShow5=false">
										<i class="fa fa-angle-double-up"></i>
									</div>
									</div>
								</el-card>
								</div>
								<div class="up-loader-Imgpanel">
								<el-card class="box-card" shadow="never">
									<div slot="header" class="clearfix img-car">
									<span>广州市-天河区-东方雅苑-西门-B</span>
									<i class="el-icon-date" style="float: right; padding: 3px 0" type="text"></i>
									</div>
									<div class="upload-img">
									<el-upload
										action="https://jsonplaceholder.typicode.com/posts/"
										list-type="picture-card"
										:on-preview="handlePictureCardPreview"
										:on-remove="handleRemove">
										<i class="el-icon-plus"></i>
										<span>上传远景照片</span>
									</el-upload>
									</div>
									<div class="upload-img">
									<el-upload
										action="https://jsonplaceholder.typicode.com/posts/"
										list-type="picture-card"
										:on-preview="handlePictureCardPreview"
										:on-remove="handleRemove">
										<i class="el-icon-plus"></i>
										<span>上传远景照片</span>
									</el-upload>
									</div>

									<!-- 是否显示更多的图片上传框打开 -->
									<div class="showimgbox" @click="isShow6=true" v-if="isShow6==false">
									<i class="fa fa-angle-double-down"></i>
									</div>
									<div v-if="isShow6">
									<div class="upload-img">
										<el-upload
										action="https://jsonplaceholder.typicode.com/posts/"
										list-type="picture-card"
										:on-preview="handlePictureCardPreview"
										:on-remove="handleRemove">
										<i class="el-icon-plus"></i>
										<span>上传远景照片</span>
										</el-upload>
									</div>
									<div class="upload-img">
										<el-upload
										action="https://jsonplaceholder.typicode.com/posts/"
										list-type="picture-card"
										:on-preview="handlePictureCardPreview"
										:on-remove="handleRemove">
										<i class="el-icon-plus"></i>
										<span>上传远景照片</span>
										</el-upload>
									</div>
									<!-- 是否显示更多的图片上传框关闭 -->
									<div class="showimgbox" @click="isShow6=false">
										<i class="fa fa-angle-double-up"></i>
									</div>
									</div>
								</el-card>
								</div>
							</div>
							<div class="pager">
								<el-pagination
								small
								background
								@size-change="handleSizeChange"
								@current-change="handleCurrentChange"
								:current-page="1"
								:page-sizes="[6, 12]"
								:page-size="6"
								layout=" sizes, prev, pager, next, jumper"
								:total="30">
								</el-pagination>
							</div>
							<div class="up-report-bottom">
								<div class="up-report-bottom-checkbox">
								<el-checkbox v-model="sendReportchecked">生成报告同时发送至客户邮箱：444094173@qq.com
									<el-button type="text">修改</el-button>
								</el-checkbox>
								</div>
								<div class="up-report-bottom-btns">
								<el-button type="primary">生成报告</el-button>
								<el-button plain>下载PDF</el-button>
								<el-button plain @click="showH5">查看H5</el-button>
								</div>
							</div>
							</div>
						</div>
						</div>
					</el-tab-pane>
				</el-tabs>

				<!-- 图片查看显示 -->
				<el-dialog :visible.sync="dialogVisible">
				<img width="100%" :src="dialogImageUrl" alt="">
				</el-dialog>
				<!-- 返回框 -->
				<div class="content_bottom_btn">
				<el-button type="default">返回</el-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { api } from '../../api/api.js';
// 城市区域变成中文
import areaToText from '../../commonFun/areaToText_new.js';
// 价格格式化
import commaFormat from '../../commonFun/commaFormat.js';
// 筛选过滤
import filterFormat from '../../commonFun/filterTableData.js';
// 时间格式化
import dateFormat  from '../../commonFun/timeFormat.js';
import { Table, TableColumn, Tabs, TabPane, Button, Upload, Card, Dialog, Checkbox, Select, Option, Input, Cascader, Progress, Pagination, Popover, Form, FormItem, MessageBox, Message } from 'element-ui';
export default {
	name: "orderDetail",
	components:{
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
			// 订单详情头部
			orderDetail: {
				realName: "黄启炜",
				apState: 1,
				rIDs: "广州市,北京市,重庆市",
				cName: "新光百货",
				apID: 1,
				apcTime: "May 9, 2018 6:29:47 PM",
				cuName: "赵爽",
				bTitle: "新光百货",
				apTotal: 465200,
				apName: "第一个投放方案",
				apQC: "QC201803284401001",
				pdTotal: 0,
				pdSendFee: 0,
				pdOtherFee: 0
			},
			// 选点排期
			setpointArr: [],
			currentSetpoint: [],
			// 报价单详情
			priceSheet: [],
			// 城市过滤结果
			filterCityData: [],
			// 地区过滤结果
			filtersArea: [],
			// 排期时间过滤
			filtersData: [],

			isShow1: false,
			isShow2: false,
			isShow3: false,
			isShow4: false,
			isShow5: false,
			isShow6: false,
			resource_name: '',
			resourceNameArr: [],
			//添加点位
			dialogAddPoint: false,
			dateInput: '',
			//搜索类型
			typeSelect: [{
			value: '资源名称',
			label: '资源名称'
			}, {
			value: '商圈',
			label: '商圈'
			}, {
			value: '城市',
			label: '城市'
			}],
			//默认
			value: '资源名称',
			//楼盘类型
			buildType: [{
			buildValue: '高端小区',
			buildlabel: '高端小区'
			}, {
			buildValue: '商圈',
			buildlabel: '商圈'
			}, {
			buildValue: '城市',
			buildlabel: '城市'
			}],
			buildValue: '',
			//搜索框
			searchInput: '',
			planSelect: '',
			//添加点位列表
			planList: [
			{
				recName: '珠江帝景',
				city: '广州',
				origin: '海珠区',
				buildType: '高端住宅',
				houseNum: '600',
				buildPrice: '￥30,000',
				mediaName: '广州市中山大道',
				buildNum: '12',
				schedules: '2017.08.30-2017.09.30',
				businessOrigin: '白云万达广场',
				assetID: 'GZ201871024',
				liveYear: '1999年',
				adLimit: '地产/医药/汽车'
			}, {
				recName: '珠江帝景花园',
				city: '广州',
				origin: '海珠区',
				buildType: '高端住宅',
				houseNum: '600',
				buildPrice: '￥30,000',
				mediaName: '广州市中山大道',
				buildNum: '12',
				schedules: '2017.08.30-2017.09.30',
				businessOrigin: '白云万达广场',
				assetID: 'GZ201871024',
				liveYear: '1999年',
				adLimit: '地产/医药/汽车'
			}, {
				recName: '珠江帝景花园',
				city: '广州',
				origin: '海珠区',
				buildType: '高端住宅',
				houseNum: '600',
				buildPrice: '￥30,000',
				mediaName: '广州市中山大道',
				buildNum: '12',
				schedules: '2017.08.30-2017.09.30',
				businessOrigin: '白云万达广场',
				assetID: 'GZ201871024',
				liveYear: '1999年',
				adLimit: '地产/医药/汽车'
			}, {
				recName: '珠江帝景花园',
				city: '广州',
				origin: '海珠区',
				buildType: '高端住宅',
				houseNum: '600',
				buildPrice: '￥30,000',
				mediaName: '广州市中山大道',
				buildNum: '12',
				schedules: '2017.08.30-2017.09.30',
				businessOrigin: '白云万达广场',
				assetID: 'GZ201871024',
				liveYear: '1999年',
				adLimit: '地产/医药/汽车'
			}, {
				recName: '珠江帝景花园',
				city: '广州',
				origin: '海珠区',
				buildType: '高端住宅',
				houseNum: '600',
				buildPrice: '￥30,000',
				mediaName: '广州市中山大道',
				buildNum: '12',
				schedules: '2017.08.30-2017.09.30',
				businessOrigin: '白云万达广场',
				assetID: 'GZ201871024',
				liveYear: '1999年',
				adLimit: '地产/医药/汽车'
			}, {
				recName: '珠江帝景花园',
				city: '广州',
				origin: '海珠区',
				buildType: '高端住宅',
				houseNum: '600',
				buildPrice: '￥30,000',
				mediaName: '广州市中山大道',
				buildNum: '12',
				schedules: '2017.08.30-2017.09.30',
				businessOrigin: '白云万达广场',
				assetID: 'GZ201871024',
				liveYear: '1999年',
				adLimit: '地产/医药/汽车'
			}, {
				recName: '珠江帝景花园',
				city: '广州',
				origin: '海珠区',
				buildType: '高端住宅',
				houseNum: '600',
				buildPrice: '￥30,000',
				mediaName: '广州市中山大道',
				buildNum: '12',
				schedules: '2017.08.30-2017.09.30',
				businessOrigin: '白云万达广场',
				assetID: 'GZ201871024',
				liveYear: '1999年',
				adLimit: '地产/医药/汽车'
			}, {
				recName: '珠江帝景花园',
				city: '广州',
				origin: '海珠区',
				buildType: '高端住宅',
				houseNum: '600',
				buildPrice: '￥30,000',
				mediaName: '广州市中山大道',
				buildNum: '12',
				schedules: '2017.08.30-2017.09.30',
				businessOrigin: '白云万达广场',
				assetID: 'GZ201871024',
				liveYear: '1999年',
				adLimit: '地产/医药/汽车'
			}, {
				recName: '珠江帝景花园',
				city: '广州',
				origin: '海珠区',
				buildType: '高端住宅',
				houseNum: '600',
				buildPrice: '￥30,000',
				mediaName: '广州市中山大道',
				buildNum: '12',
				schedules: '2017.08.30-2017.09.30',
				businessOrigin: '白云万达广场',
				assetID: 'GZ201871024',
				liveYear: '1999年',
				adLimit: '地产/医药/汽车'
			}, {
				recName: '珠江帝景花园',
				city: '广州',
				origin: '海珠区',
				buildType: '高端住宅',
				houseNum: '600',
				buildPrice: '￥30,000',
				mediaName: '广州市中山大道',
				buildNum: '12',
				schedules: '2017.08.30-2017.09.30',
				businessOrigin: '白云万达广场',
				assetID: 'GZ201871024',
				liveYear: '1999年',
				adLimit: '地产/医药/汽车'
			}, {
				recName: '珠江帝景花园',
				city: '广州',
				origin: '海珠区',
				buildType: '高端住宅',
				houseNum: '600',
				buildPrice: '￥30,000',
				mediaName: '广州市中山大道',
				buildNum: '12',
				schedules: '2017.08.30-2017.09.30',
				businessOrigin: '白云万达广场',
				assetID: 'GZ201871024',
				liveYear: '1999年',
				adLimit: '地产/医药/汽车'
			}, {
				recName: '珠江帝景花园',
				city: '广州',
				origin: '海珠区',
				buildType: '高端住宅',
				houseNum: '600',
				buildPrice: '￥30,000',
				mediaName: '广州市中山大道',
				buildNum: '12',
				schedules: '2017.08.30-2017.09.30',
				businessOrigin: '白云万达广场',
				assetID: 'GZ201871024',
				liveYear: '1999年',
				adLimit: '地产/医药/汽车'
			}, {
				recName: '珠江帝景花园',
				city: '广州',
				origin: '海珠区',
				buildType: '高端住宅',
				houseNum: '600',
				buildPrice: '￥30,000',
				mediaName: '广州市中山大道',
				buildNum: '12',
				schedules: '2017.08.30-2017.09.30',
				businessOrigin: '白云万达广场',
				assetID: 'GZ201871024',
				liveYear: '1999年',
				adLimit: '地产/医药/汽车'
			}, {
				recName: '珠江帝景花园',
				city: '广州',
				origin: '海珠区',
				buildType: '高端住宅',
				houseNum: '600',
				buildPrice: '￥30,000',
				mediaName: '广州市中山大道',
				buildNum: '12',
				schedules: '2017.08.30-2017.09.30',
				businessOrigin: '白云万达广场',
				assetID: 'GZ201871024',
				liveYear: '1999年',
				adLimit: '地产/医药/汽车'
			}, {
				recName: '珠江帝景花园',
				city: '广州',
				origin: '海珠区',
				buildType: '高端住宅',
				houseNum: '600',
				buildPrice: '￥30,000',
				mediaName: '广州市中山大道',
				buildNum: '12',
				schedules: '2017.08.30-2017.09.30',
				businessOrigin: '白云万达广场',
				assetID: 'GZ201871024',
				liveYear: '1999年',
				adLimit: '地产/医药/汽车'
			}],
			//生成任务按钮
			usableMakeBtn: false,
			//按钮
			usableBtn: false,
			//发送报告
			sendReportchecked: false,
			//上传照片
			dialogImageUrl: '',
			dialogVisible: false,
			//监播备注
			remark: '',
			changeRemark: false,
			//合同号
			cid: 'QC201803284401001',
			CIDinput: 'QC201803284401001',
			//修改合同号
			changeCID: false,
			planPanel: 'first',
			//选点排期标题
			showTitle: false,
			//选点排期按钮
			showBtn: true,
			//更换点位取消中止按钮
			cancelbtnShow: false,
			//选点排期操作
			showHandel: false,
			//选点排期资源名称搜索
			keyword: "",
			selectRecName: '1',
			//物料信息
			materialInfo: [
			{
				no: 1,
				adSize: '840*1180',
				visualPic: '840*1180',
				resolution: '150dpi',
				colorMode: 'CMYK',
				photoFormat: 'JPG/TIF/AI/PSD/CDR',
				pointNum: '28'
			}, {
				no: 1,
				adSize: '840*1180',
				visualPic: '840*1180',
				resolution: '150dpi',
				colorMode: 'CMYK',
				photoFormat: 'JPG/TIF/AI/PSD/CDR',
				pointNum: '28'
			}, {
				no: 1,
				adSize: '840*1180',
				visualPic: '840*1180',
				resolution: '150dpi',
				colorMode: 'CMYK',
				photoFormat: 'JPG/TIF/AI/PSD/CDR',
				pointNum: '28'
			}, {
				no: 1,
				adSize: '840*1180',
				visualPic: '840*1180',
				resolution: '150dpi',
				colorMode: 'CMYK',
				photoFormat: 'JPG/TIF/AI/PSD/CDR',
				pointNum: '28'
			}, {
				no: 1,
				adSize: '840*1180',
				visualPic: '840*1180',
				resolution: '150dpi',
				colorMode: 'CMYK',
				photoFormat: 'JPG/TIF/AI/PSD/CDR',
				pointNum: '28'
			}, {
				no: 1,
				adSize: '840*1180',
				visualPic: '840*1180',
				resolution: '150dpi',
				colorMode: 'CMYK',
				photoFormat: 'JPG/TIF/AI/PSD/CDR',
				pointNum: '28'
			}, {
				no: 1,
				adSize: '840*1180',
				visualPic: '840*1180',
				resolution: '150dpi',
				colorMode: 'CMYK',
				photoFormat: 'JPG/TIF/AI/PSD/CDR',
				pointNum: '28'
			}, {
				no: 1,
				adSize: '840*1180',
				visualPic: '840*1180',
				resolution: '150dpi',
				colorMode: 'CMYK',
				photoFormat: 'JPG/TIF/AI/PSD/CDR',
				pointNum: '28'
			}, {
				no: 1,
				adSize: '840*1180',
				visualPic: '840*1180',
				resolution: '150dpi',
				colorMode: 'CMYK',
				photoFormat: 'JPG/TIF/AI/PSD/CDR',
				pointNum: '28'
			}, {
				no: 1,
				adSize: '840*1180',
				visualPic: '840*1180',
				resolution: '150dpi',
				colorMode: 'CMYK',
				photoFormat: 'JPG/TIF/AI/PSD/CDR',
				pointNum: '28'
			}, {
				no: 1,
				adSize: '840*1180',
				visualPic: '840*1180',
				resolution: '150dpi',
				colorMode: 'CMYK',
				photoFormat: 'JPG/TIF/AI/PSD/CDR',
				pointNum: '28'
			}, {
				no: 1,
				adSize: '840*1180',
				visualPic: '840*1180',
				resolution: '150dpi',
				colorMode: 'CMYK',
				photoFormat: 'JPG/TIF/AI/PSD/CDR',
				pointNum: '28'
			}, {
				no: 1,
				adSize: '840*1180',
				visualPic: '840*1180',
				resolution: '150dpi',
				colorMode: 'CMYK',
				photoFormat: 'JPG/TIF/AI/PSD/CDR',
				pointNum: '28'
			}, {
				no: 1,
				adSize: '840*1180',
				visualPic: '840*1180',
				resolution: '150dpi',
				colorMode: 'CMYK',
				photoFormat: 'JPG/TIF/AI/PSD/CDR',
				pointNum: '28'
			}],
			//上刊报告省市级联
			citys: [
			{
				value: 'all',
				label: '全部',
			},
			{
				value: 'guangzhou',
				label: '广州',
				children: [{
				value: 'tianhequ',
				label: '天河区',
				children: [{
					value: 'tiyuzhongxin',
					label: '体育中心',
				}, {
					value: 'shipaiqiao',
					label: '石牌桥'
				}]
				}]
			}, {
				value: 'beijing',
				label: '北京',
				children: [{
				value: 'chaoyangqu',
				label: '朝阳区',
				children: [{
					value: 'tiyuzhongxin',
					label: '体育中心',
				}, {
					value: 'shipaiqiao',
					label: '石牌桥'
				}]
				}, {
				value: 'haizhuqu',
				label: '海珠区',
				children: [{
					value: 'tiyuzhongxin',
					label: '体育中心',
				}, {
					value: 'shipaiqiao',
					label: '石牌桥'
				}]
				}]
			}],
			selectedOptions: [],
			//上刊报告社区和监播图
			allhouse: '',
			allPic: '',
		};
	},
	created(){
		this.getInitData();
		// 选点排期
		this.getSetPoint();
		// 报价单
		this.getPriceData();
	},
	methods: {
		// 获取选点排期列表数据
		getInitData(){
			// 测试数据
			let order = {
				realName: "黄启炜",
				apState: 1,
				rIDs: "广州市,北京市,重庆市",
				cName: "新光百货",
				apID: 1,
				apcTime: "May 9, 2018 6:29:47 PM",
				cuName: "赵爽",
				bTitle: "新光百货",
				apTotal: 465200,
				apName: "第一个投放方案",
				apQC: "QC201803284401001",
				pdTotal: 0,
				pdSendFee: 0,
				pdOtherFee: 0
			};
			order.apTotal = this.priceFormat(order.apTotal);
			this.orderDetail = order;

			// 真实数据
			let uid = JSON.parse(sessionStorage.getItem('session_data')).uID;
			let apid = sessionStorage.getItem('order_apid');
			let info = {
				uid: uid,
				apid: apid
			};
			// uid         int【必填】     当前账户UserID
            // apid        int             公司对应方案apID
			// api.postApi('/GetFanganInfo', info).then(res =>{
			// 	console.log(res.data);
			// 	if(!res.data.SysCode){
			// 		let info = res.data;
			// 		if(info.apTotal){
			// 			info.apTotal = this.priceFormat(info.apTotal);
			// 		}
			// 		this.orderDetail = info;
			// 	}else{
			// 		Message.warning(res.data.MSG);
			// 	}
			// }).catch(res => {
			// 	console.log(res);
			// });
		},
		// 获取选点排期
		getSetPoint(){
			// 测试数据
			let testInfo = [
				{resName: "尚东3",mTitle: "尚东3东门",rName: "荔湾区",cType: "一般住宅",hNum: 100,hPrice: 56000,rID: 440104,asIDs: "7",asLab: "A",asStates: "1",tradingArea: "三里屯",fNum: 3,assetTag: "201805GZ-1324",notPush: "", pbEnd:"Jun 21, 2018",pbStar:"Jun 7, 2018", adSize: "1181*841", adViewSize: "118*84"},
				{resName: "帝景山庄改1",mTitle: "帝景1门",rName: "越秀区",cType: "高端住宅",hNum: 170,hPrice: 6100000,rID: 440104,asIDs: "2,1",asLab: "B,",asStates: "1,1",tradingArea: "山泉1",fNum: 12,assetTag: "201707GZ-13161",chDay: "2013",notPush: "美容",pbEnd:"Jun 21, 2018",pbStar:"Jun 7, 2018",adSize: "1181*841", adViewSize: "118*84"},
				{resName: "帝景山庄改1",mTitle: "帝景2门2",rName: "越秀区",cType: "高端住宅",hNum: 170,hPrice: 6100000,rID: 440104,asIDs: "3,4",asLab: "A,B",asStates: "1,1",tradingArea: "山泉1",fNum: 12,assetTag: "201707GZ-1324",chDay: "2013",notPush: "地产",pbEnd:"Jun 21, 2018",pbStar:"Jun 7, 2018",adSize: "1181*841", adViewSize: "118*84"},
				{resName: "帝景山庄改1",mTitle: "帝景3门3",rName: "越秀区",cType: "高端住宅",hNum: 170,hPrice: 6100000,rID: 440104,asIDs: "5,6",asLab: "A,B",asStates: "1,1",tradingArea: "山泉1",fNum: 12,assetTag: "201707GZ-1329",chDay: "2013",notPush: "医学",pbEnd:"Jun 21, 2018",pbStar:"Jun 7, 2018",adSize: "1181*841", adViewSize: "118*84"}
			];

			let arr = [];
			// 组装数据
			for(let data of testInfo){
				// 城市中文名称
				// this.$set(data, 'city', areaToText.toText(data.rID).city);
				data.city = areaToText.toText(data.rID).city;
				let time = this.formatTime(data.pbStar) +"-"+ this.formatTime(data.pbEnd);
				data.timeRange = time;
				// 物料信息
				if(!arr.length){
					arr.push({
						adSize: data.adSize,
						visualPic: data.adViewSize,
						resolution: '150dpi',
						colorMode: 'CMYK',
						photoFormat: 'JPG/TIF/AI/PSD/CDR',
						pointNum: 1
					});
				}else{
					for(let test of arr){
						if((data.adSize != test.adSize)&& (data.adViewSize != test.visualPic)){
							arr.push({
								adSize: data.adSize,
								visualPic: data.adViewSize,
								resolution: '150dpi',
								colorMode: 'CMYK',
								photoFormat: 'JPG/TIF/AI/PSD/CDR',
								pointNum: 1
							});
						}else{
							test.pointNum++;
							
						}
					}
				}
			}
			console.log('arr', arr);
			// 城市筛选过滤
			this.filterCityData = filterFormat(testInfo, 'city');
			this.filtersArea = filterFormat(testInfo, 'rName');
			this.filtersData = filterFormat(testInfo, 'timeRange');
			this.setpointArr = testInfo;
			this.currentSetpoint = this.setpointArr;
			this.materialInfo = arr;

			// 真实数据
			let uid = JSON.parse(sessionStorage.getItem('session_data')).uID;
			let apid = sessionStorage.getItem('order_apid');
			let info = {
				uid: uid,
				apid: apid
			};
			// uid         int【必填】     当前账户UserID
            // apid        int             公司对应方案apID
			// api.getApi('/GetADB', info).then(res =>{
			// 	console.log(res.data);
			// 	if(!res.data.SysCode){
			// 		let info = res.data;
			// 		let arr = [];
			// 		// 组装数据
			// 		for(let data of info){
			// 			// 城市中文名称
			// 			// this.$set(data, 'city', areaToText.toText(data.rID).city);
			// 			data.city = areaToText.toText(data.rID).city;
			// 			let time = this.formatTime(data.pbStar) +"-"+ this.formatTime(data.pbEnd);
			// 			data.timeRange = time;
			// 			// this.$set(data, 'timeRange', time);
			// 			let material = {
			// 				adSize: '',
			// 				visualPic: '',
			// 				resolution: '150dpi',
			// 				colorMode: 'CMYK',
			// 				photoFormat: 'JPG/TIF/AI/PSD/CDR',
			// 				pointNum: ''
			// 			};
			// 			material.adSize = data.adSize;
			// 			material.visualPic = data.adViewSize;
			// 			matrial.pointNum = 1;
			// 			arr.push(material);
			// 		}
			// 		// 城市筛选过滤
			// 		this.filterCityData = filterFormat(info, 'city');
			// 		this.filtersArea = filterFormat(info, 'rName');
			// 		this.filtersData = filterFormat(info, 'timeRange');
			// 		this.setpointArr = info;
			// 		this.currentSetpoint = this.setpointArr;
			// 		this.materialInfo = arr;
			// 	}else{
			// 		Message.warning(res.data.MSG);
			// 	}
			// }).catch(res =>{
			// 	console.log(res);
			// });
		},
		// 获取三个费用价格(报价单)
		getPriceData(){
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
			let uid = JSON.parse(sessionStorage.getItem('session_data')).uID;
			let apid = sessionStorage.getItem('order_apid');
			let info = {
				uid: uid,
				apid: apid
			};
			// 获取各个城市的刊例价
			// uid         int【必填】     当前账户UserID
			api.getApi('/GetAdPrice', {uid: uid}).then(res =>{
				console.log(res.data);
				let adPrice = res.data;
				// uid         int【必填】     当前账户UserID
				// apid        int             公司对应方案apID
				api.getApi('/GetAPD', info).then(res => {
					console.log(res.data);
					if(!res.data.SysCode){
						let plandata = res.data;
						let pdTotal = 0;
						let pdSendFee = 0;
						let pdOtherFee = 0;
						let arr = [];
						for(let price of plandata){
							pdTotal+= price.pdTotal;
							pdSendFee+= price.pdSendFee;
							pdOtherFee+= price.pdOtherFee;

							let obj = {
								"pdID":price.pdID,
								"apID":price.apID,
								"rID":price.rID,
								"city": '',
								"muID":price.muID,
								"adPrice":0,
								// 投放量
								"pdDays":price.pdDays,
								"pdStar":price.pdStar,
								"pdEnd":price.pdEnd,
								// 赠送
								"pdFreeNum":price.pdFreeNum,
								// 广告费用
								"pdAdFee":price.pdAdFee/100,
								// 广告画数量
								"pdNum":price.pdNum,
								// 制作费
								"pdAdMake":price.pdAdMake/100,
								// 现金结算
								"pdTotal":price.pdTotal/100,
								// 资源置换
								"pdSendFee":price.pdSendFee/100,
								// 其他费用
								"pdOtherFee":price.pdOtherFee/100,
								"allprice": 0
							};
							obj.allprice = (price.pdTotal+price.pdSendFee+price.pdOtherFee)/100;
							obj.city = areaToText.toText(obj.rID).city;
							arr.push(obj);
						}
						this.$set(this.orderDetail, 'pdTotal', this.priceFormat(pdTotal/100));
						this.$set(this.orderDetail, 'pdSendFee', this.priceFormat(pdSendFee/100));
						this.$set(this.orderDetail, 'pdOtherFee', this.priceFormat(pdOtherFee/100));
						// 为每一条添加刊例价,广告费折扣百分比，制作费折扣百分比
						for(let ta of arr){
							for(let ad of adPrice){
								if(ad.rID == ta.rID){
									ta.adPrice = ad.adPrice/(100*2); // 刊例价(面/周)
									let onedayPrice = ta.adPrice/7;
									ta.discount = Math.round(ta.pdAdFee/( onedayPrice * ta.pdDays )*10000) / 100; // 广告费折扣百分比
									ta.ADMakeDiscount = Math.round( ta.pdAdMake /(100*ta.pdNum) *10000) / 100; // 制作费折扣百分比
									break;
								}
							}
						}
						this.priceSheet = arr;
					}else{
						Message.warning(res.data.MSG);
					}
				}).catch(res => {
					console.log(res);
				});

			}).catch(res =>{
				console.log(res);
			});

		},
		// 城市转换为中文
		cityToText(rid){
			return areaToText.toText(rid).city;
		},
		// 状态转换成文本
		stateToText(val){
			let state = [
				{text: '已完成', state: 0},
				{text: '进行中', state: 1},
				{text: '未投放', state: 2},
				{text: '投放中', state: 3},
				{text: '强行结束', state: 5}
			];
			for(let data of state ){
				if(val == data.state){
					return data.text;
				}
			}
		},
		// 时间格式规范
		formatTime(val){
			return dateFormat.toDate(val, '.');
		},
		// 价格加上逗号
		priceFormat(price){
			// console.log('price', price);
			return commaFormat.init(price);
		},
		// 当搜索框为空的时候进行重置显示
		init(){
			if(!this.keyword){
				this.currentSetpoint = this.setpointArr;
			}
		},
		// 搜索
		search(){
			// 账号，姓名
			console.log(this.selectRecName);
			console.log(this.keyword);
			let select = this.selectRecName;
			let keyword = this.keyword;
			if(this.keyword){
				let arr = [];
				for(let data of this.setpointArr){
					if(data.resName){
						if((select=='1') && data.resName.includes(keyword)){
							arr.push(data);
						}
					}
				}
				this.currentSetpoint = arr;
				return;
			}
			this.currentSetpoint = this.setpointArr;
		},
		show2H5() {
			this.$router.push('/upReport')
		},
		//跳转
		showH5() {
			this.$router.push('/downReport')
		},
		// 过滤来获取唯一的资源名称
		getResourceNameArr(dataArr) {
			let arr = [];
			let door = 1;
			for (let data of dataArr) {
			for (let item of arr) {
				if (data.recName == item.value) {
				door = 0;
				}
			}
			if (door) {
				arr.push({label: data.recName, value: data.recName});
			}
			}
			return arr;
		},
		filterCity(value, row) {
			return row.city === value;
		},
		filterRName(value, row) {
			return row.rName === value;
		},
		filterTimeRange(value, row) {
			return row.timeRange === value;
		},
		//生成任务
		makeMission() {
			MessageBox.confirm('是否生成任务？', '提示', {
				confirmButtonText: '是',
				cancelButtonText: '否',
				type: 'warning'
			}).then(() => {
				//按钮不可用
				this.usableMakeBtn = true;
			}).catch(() => {

			});
		},
		cancelChangeID() {
			this.changeCID = false;
			Message.info('取消修改合同编号');
		},
		confirmChangeID() {
			this.cid = this.CIDinput;
			this.changeCID = false;
			Message.success('修改合同编号成功');
		},
		cancelChangeRemark() {
			this.changeRemark = false;
			Message.info('取消修改监播备注');
		},
		confirmChangeRemark() {
			this.changeRemark = false;
			Message.success('修改监播备注成功');
		},
		//上传照片
		handleRemove(file, fileList) {
			console.log(file, fileList);
		},
		handlePictureCardPreview(file) {
			this.dialogImageUrl = file.url;
			this.dialogVisible = true;
		},
		//页码
		handleSizeChange(val) {
			console.log(`每页 ${val} 条`);
		},
		handleCurrentChange(val) {
			console.log(`当前页: ${val}`);
		},
		//点击换点
		changePoint() {
			this.usableMakeBtn = true;
			this.usableBtn = true;
			$(window).scrollTop(288);
			this.showTitle = true;
			this.showBtn = false;
			this.showHandel = true;
		},
		//保存更换点位
		saveChangePoint() {
			this.usableBtn = false;
			this.usableMakeBtn = false;
			this.showTitle = false;
			this.showBtn = true;
			this.showHandel = false;
		},
		//取消更换点位
		cancelChangePoint() {
			this.usableBtn = false;
			this.usableMakeBtn = false;
			this.showTitle = false;
			this.showBtn = true;
			this.showHandel = false;
		},
		//中止操作确认操作对话框
		confirmHandel(e) {
			let recName = this.currentSetpoint[0].recName;
			let schedules = this.currentSetpoint[0].schedules;
			if (e.target.innerText === '中止') {
			//中止
			MessageBox.confirm('是否停止 ' + recName + ' 在 ' + schedules + ' 的投放？\n', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				//中止投放e
				Message.success('操作成功');
				e.target.innerText = '取消中止'
			}).catch(() => {
				Message.info('已取消操作');
			});
			} else if (e.target.innerText === '取消中止') {
			//取消中止
			MessageBox.confirm('是否取消中止 ' + recName + ' 在 ' + schedules + ' 的投放？\n', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				Message.success('操作成功');
				e.target.innerText = '中止'
			}).catch(() => {
				Message.info('已取消操作');
			});
			}
		},
		/*  //取消中止
			confirmCancelHandel(){
			let recName = this.currentSetpoint[0].recName;
			let schedules = this.currentSetpoint[0].schedules;
			MessageBox.confirm('是否取消中止 ' + recName + ' 在 ' + schedules + ' 的投放？\n', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				Message.success('操作成功');
				this.cancelbtnShow = false;
			}).catch(() => {
				Message.info('已取消操作');
			});
			},*/
		//添加点位对话框确认按钮
		confirmAddPoint() {
			this.dialogAddPoint = false;
			Message.success('操作成功')
		},
		//添加点位对话框取消按钮
		cancelAddPoint() {
			this.dialogAddPoint = false;
			Message.info('已取消操作');
		}
	},
	mounted: function () {
		this.resourceNameArr = this.getResourceNameArr(this.planList);
		$(function () {
			//上下刊报告展开上传
			$('.openMoreImg').click(function () {
			console.log(1);
			$(this).hide().siblings('.moreImgBox').show()
			});
			$('.closeMoreImg').click(function () {
			console.log(2);
			$(this).parents('.moreImgBox').hide();
			$(this).parents('.moreImgBox').siblings('.openMoreImg').show();
			});
			//事件委托
			$('.content_top_wrap').on('click', 'dd', function () {
			if ($(this).hasClass('active')) {
				$(this).removeClass('active')
			} else {
				$(this).addClass('active');
			}
			});
			//筛选输入框
			$('.content_top_wrap').on('focus', '.input', function () {
			$(this).parents('.input-wrap').addClass('focus');
			$(this).siblings('button').show();
			}).on('blur', '.input', function () {
			$(this).parents('.input-wrap').removeClass('focus');
			$(this).siblings('button').hide();
			});

			$('.content_top_wrap').on('click', '.close-tags', function () {
			$(this).parents('.tags').hide();
			});
			$('.content_top_wrap').on('click', '.clear-filter', function () {
			$(this).parents('.filter-tags').hide();
			})

		})
		},
}

</script>

<style scoped>

  /*修改合同号*/
  .changeCID {
    color: #1890ff;
    cursor: pointer;
    font-size: 16px
  }

  /*状态行*/
  /deep/ .el-table .warning-row {
    background: #FFF1F1;
  }

  /*tabbar*/
  /deep/ .el-textarea__inner {
    resize: vertical;
  }

  /deep/ .el-tabs__nav-wrap::after {
    background-color: transparent;
  }

  .box-wrap {
    border: 1px solid #E6E7E9;
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
    padding-left: 60px;
    padding-right: 60px;
    /*margin-left: 60px;*/
    /*margin-right: 60px;*/
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

  /deep/ .el-table_1_column_7, /deep/ .el-table_1_column_8 {
    text-align: right;
  }

  /deep/ .el-table__column-filter-trigger {
    position: relative;
    left: 5px;
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

  /deep/ .el-table th, .el-table tr {
    background: #F7F7F7;
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

  /deep/ .el-table__expanded-cell[class*=cell] {
    padding: 0 46px;
    background-color: #F7F7F7;;
  }

  /deep/ .el-table__expanded-cell[class*=cell] .el-form {
    height: 44px;
    line-height: 44px;
  }

  /deep/ .el-table th, .el-table tr {
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

  .first-wrap /deep/ .el-button span, .first-wrap /deep/ .el-button i {
    /*position: relative;*/
    /*!*top: -2px;*!*/
    left: -16px;
  }

  .first-wrap /deep/ .el-button span a {
    color: #606266;
  }

  /*报价单*/

  /deep/ .el-tabs--border-card {
    box-shadow: none;
  }

  /deep/ .el-tabs--border-card > .el-tabs__content {
    padding: 40px;
  }

  .panel {
    padding: 20px 17px;
  }

  .step3 {
    padding: 0 105px;
  }

  .bill-title {
    width: 100%;
    height: 181px;
    box-sizing: border-box;
    border: 1px solid #D8D8D8;
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
    background: #FAFAFA;
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
    border-right: 1px dashed #D8D8D8;
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
    background: #E6F1FC;
    border: 1px solid #A3D0FD;
    border-radius: 4px;
    float: right;
    font-size: 12px;
    color: #1989FA;
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
    border-bottom: 1px solid #D8D8D8;
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
    background: #FAFAFA;
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
    border-bottom: 1px dashed #D8D8D8;
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
    background: #FAFAFA;

  }

  /deep/ .el-table__body-wrapper::-webkit-scrollbar-thumb { /*滚动条里面小方块*/

    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #C1C1C1;
    border-radius: 4px;
  }

  /deep/ .el-table th > .cell {
    font-weight: bold;
  }

  /*详情头部*/
  .content_top_wrap {
    padding: 34px 28px;
    background: #FFFFFF;
    border: 1px solid #DEDEDE;
    height: 161px;
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
    /*padding-left: 41px;*/
  }

  .plan-detail-left ul {
    width: 81%;
    float: left;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    text-align: left;
  }

  .plan-detail-left ul li {
    float: left;
    width: 300px;
    margin-bottom: 12px;
  }

  .plan-detail-left ul li:nth-child(3n-2) {
    width: 350px;
  }

  .plan-detail-left ul li:nth-child(3n-1) {
    width: 248px;
  }

  .plan-detail-left ul li em {
    font-size: 14px;
    color: #666666;
  }

  .plan-detail-right {
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

  /*物料信息*/
  /deep/ .el-table_2_column_16 .cell {
    text-align: right;
    padding-right: 20px;
  }

  /*上刊报告*/
  .imgs-box {
    display: flex;
    flex-wrap: wrap;
    /*justify-content: space-between;*/
  }

  .up-loader-header {
    position: relative;
  }

  .progress {
    float: right;
  }

  .showimgbox {
    text-align: center;
    background: #f8f8f8;
    width: 100%;
    height: 28px;
    line-height: 28px;
    margin-top: 20px;
    color: #999999;
  }

  /deep/ .up-loader-header .el-input__inner {
    height: 34px;
    width: 180px;
  }

  .progress span {
    position: relative;
    top: 8px;
    left: 0;
    font-size: 14px;
    color: #666666;
  }

  /deep/ .el-progress-bar__outer {
    height: 10px !important;
  }

  /deep/ .el-progress-bar {
    width: 100%;
  }

  /deep/ .el-progress {
    position: absolute;
    line-height: 1;
    width: 43%;
    right: 65px;
    top: 10px;
  }

  .img-car {
    font-size: 14px;
    color: #666666;
  }
  .imgs-box{
    display: flex;
    justify-content: space-between;
  }

  .up-loader-Imgpanel {
    width: 390px;
    /*height: 270px;*/
    margin-top: 11px;
    display: inline-block;
  }

  .up-loader-Imgpanel {
    /*margin-left: 2px;*/
  }

  /*.up-loader-Imgpanel:nth-child(4) {
    margin-left: 0;
  }*/

  /*上传图片*/
  /deep/ .el-card__body {
    text-align: center;
    padding: 0;
  }

  .upload-img {
    position: relative;
    display: inline-block;
    /* margin-left: 10px; */
    width: 144px;
    overflow: hidden;
    height: 192px;
    padding-top: 20px;
  }

  .upload-img + .upload-img {
    margin-left: 32px;
  }

  .upload-img span {
    position: absolute;
    top: 30px;
    left: 30px;
    font-size: 14px;
    color: #666666;
  }

  /deep/ .el-upload--picture-card {
    width: 144px;
    height: 192px;
    position: relative;
  }

  /deep/ .el-upload-list--picture-card .el-upload-list__item {
    width: 144px;
    height: 192px;
    position: relative;
  }

  .upload_img_wrap {
    width: 236px;
    height: 125px;
    overflow: hidden;
  }

  /*页码*/
  .pager {
    position: relative;
    height: 32px;
    margin-top: 30px;
  }

  /deep/ .el-pagination {
    position: absolute;
    right: 0;
    top: 0;
  }

  /deep/ .el-pagination.is-background .el-pager li {
    font-weight: normal;
    font-size: 13px;
  }

  /deep/ span.el-pagination__sizes {
    position: relative;
    top: -3px;
  }

  /deep/ span.el-pagination__jump {
    position: relative;
    top: -3px;
    margin-left: 20px;
  }

  .up-report-bottom {
    text-align: center;
    margin-top: 20px;
  }

  .up-report-bottom-checkbox {
    margin-bottom: 10px;
  }

  .up-report-bottom-checkbox .el-button {
    position: relative;
    top: 5px;
    left: 0;
  }

  .up-report-bottom-btns .el-button {
    width: 74px;
    height: 32px;
    padding: 0;
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
    color: #D9D9D9;
    line-height: 18px;
  }

  .ad_mediaMana_nav p a {
    color: #666;
  }

  .ad_mediaMana_nav p a:nth-of-type(1) {
    color: #999;
  }

  .ad_mediaMana_wrap {
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

  /deep/ .el-button--default:focus, .el-button--default:hover {
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
  /deep/ .el-table td, .el-table th {
    padding: 4px 0;
    height: 48px;
  }

  /*添加点位对话框*/
  .first-wrap /deep/ .el-dialog {
    width: 1246px !important;
  }

  /*选择点位*/
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
    /*width: 76px;*/
    height: 34px;
    margin-left: 2px;
  }

  /deep/ .el-button + .el-button {
    margin-left: 0;
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
    margin-left: -6px;
  }

  /deep/ .date-select.el-input__inner {
    width: 237px;
    position: relative;
    top: 3px;
    left: -5px;
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

  .map {
    width: 76px;
    height: 34px;
    border: 1px solid #C2C2C2;
    border-radius: 4px;
    cursor: pointer;
    top: 3px;
    text-align: center;
    font-size: 14px;
  }

  /deep/ .map .el-icon-location-outline {
    position: relative;
    top: -2px;
    left: -9px;
  }

  /deep/ .el-button.map span {
    position: relative;
    left: -10px;
    top: -2px;
  }

  .search-wrap {
    position: relative;
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
    border: 1px solid #D8D8D8;
    margin-top: 8px;
    padding: 10px 18px 0 18px;
  }

  .dw-panel dl {
    border-bottom: 2px dashed #D8D8D8;
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
    color: #1890FF;
    border: 1px solid #1890ff;
    border-radius: 4px;
  }

  /*筛选输入框*/
  .filter-input {
    width: 100%;
    height: 38px;
    background: #F1F1F1;
    margin-top: 8px;
    margin-bottom: 8px;
    font-size: 14px;
    color: #979797;
    padding: 5px 0 6px 10px;
    box-sizing: border-box;
  }

  .filter-input input {
    border: 1px solid #C2C2C2;
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

  /deep/ .buildType .el-input, /deep/ .buildType .el-input__inner {
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

  /*筛选tags*/
  .filter-tags {
    width: 100%;
    height: 41px;
    padding-bottom: 8px;
  }

  .filter-tags .tags {
    display: inline-block;
    border: 1px solid #D8D8D8;
    height: 24px;
    line-height: 24px;
    font-size: 14px;
    color: #999999;
    padding: 0 0 0 8px;
    margin-right: 8px;
    position: relative;
  }

  .filter-tags .tags i {
    display: inline-block;
    width: 24px;
    height: 24px;
    text-align: center;
    font-size: 16px;
    border-left: 1px solid #d8d8d8;
    cursor: pointer;
    margin-left: 10px;
    font-style: normal;
  }

  .filter-tags .clear-filter {
    position: relative;
    z-index: 2;
  }

  /*表格*/
  /deep/ .el-table th, .el-table tr {
    background: #F7F7F7;
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

  /deep/ .el-table__expanded-cell[class*=cell] {
    padding: 0 44px;
    background-color: #F7F7F7;;
  }

  /deep/ .el-table__expanded-cell[class*=cell] .el-form {
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

  /deep/ .el-form--inline .el-form-item {
    margin-right: 45px;
  }

  /deep/ .el-table_3_column_26, /deep/ .el-table_3_column_27, /deep/ .el-table_1_column_9, .el-table_1_column_18, /deep/ .el-table_2_column_19 {
    text-align: right;
  }

  /deep/ .table_wrap.car-list {
    margin-top: 0 !important;
  }

  /*超出省略*/
  /deep/ .el-table .cell {
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /deep/ .plan-select .el-input, /deep/ .plan-select .el-input__inner {
    width: 180px;
    margin-left: -6px;
    height: 34px;
  }

  /deep/ .el-date-editor .el-range__icon {
    position: relative;
    top: -2px;
    left: -3px;
  }

  /deep/ .search-wrap>span{
    float: left;
    margin-left: 2px;
  }

  /*1440*/
  @media all and (min-width: 1420px) {
    .tab-info .price h4 {
      width: 92%;
    }

    /*  .up-loader-Imgpanel + .up-loader-Imgpanel {
        margin-left: 39px;
      }*/
    /*.up-loader-Imgpanel:nth-child(4) {
      margin-left: 0;
    }*/
    .up-loader-Imgpanel {
      /*margin-left: 21px;*/
    }
  }

  /*1920*/
  @media all and (min-width: 1900px) {
    .tab-info .price h4 {
      width: 94%;
    }

    .plan-detail-left ul li:nth-child(3n-2) {
      width: 500px;
    }

    .plan-detail-left ul li:nth-child(3n-1) {
      width: 400px;
    }

    /*.up-loader-Imgpanel + .up-loader-Imgpanel {
      margin-left: 54px;
    }*/
    /*.up-loader-Imgpanel:nth-child(5) {
      margin-left: 0;
    }*/
    .plan-title .handleBtn {
      position: absolute;
      right: 135px;
      top: 30px;
    }

    .up-loader-Imgpanel {
      /*margin-left: 37px;*/
    }
  }

</style>
