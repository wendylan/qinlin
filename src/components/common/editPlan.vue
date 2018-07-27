<template>
	<div class="ad_mediaMana_wrap">
		<div class="ad_mediaMana_nav clearfix">
			<p>
				<a href="#">方案管理</a>
				<em> / </em>
				<a href="#">编辑方案</a>
			</p>
		</div>
		<div class="mediaMana_content_top">
			<div class="content_top_wrap">
				<div class="step-wrap">
					<el-steps :active="active" finish-status="success">
						<el-step title="填写基本信息"></el-step>
						<el-step title="选择点位"></el-step>
						<el-step title="确认报价单"></el-step>
						<el-step title="完成"></el-step>
					</el-steps>
				</div>
				<!--填写客户信息-->
				<div class="step1" v-if="active==0">
					<div class="createPlan">
						<el-form :model="planForm" status-icon :rules="planRules" ref="planForm" label-width="100px" class="demo-ruleForm">
							<el-form-item label="方案名称：" prop="planName">
								<el-input v-model="planForm.planName" placeholder="请输入方案名称"></el-input>
							</el-form-item>
							<el-form-item label="所属销售：" prop="ownerSales">
								<el-input v-if="isBD" v-model="planForm.ownerSales" disabled></el-input>
								<!--BDData.realName-->
								<el-autocomplete v-else v-model="planForm.ownerSales" :fetch-suggestions="querySearchAsync" placeholder="请输入账号">
								</el-autocomplete>
							</el-form-item>
							<el-form-item label="公司名称：" prop="companyName">
								<el-select v-model="planForm.companyName" placeholder="请选择公司名称">
									<el-option v-for="item in companyName" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="公司品牌：" prop="companyBrand">
								<el-select v-model="planForm.companyBrand" placeholder="请选择公司品牌">
									<el-option v-for="item in companyBrand" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="联系人：" prop="ownerBU">
								<el-select v-model="planForm.ownerBU" placeholder="请选择所属联系人">
									<el-option v-for="item in ownerBU" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="投放城市：" prop="throwCity">
								<div v-if="cityOther" v-model="planForm.throwCity">
									<el-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false" @close="spliceCity(tag)">
										{{tag}}
									</el-tag>
									<el-cascader style="width: 140px" class="inputNewTag" v-if="inputVisible" v-model="selectedOptions" :options="cityOptions" ref="saveTagInput" :show-all-levels="false" size="small" @change="handleInputConfirm">
									</el-cascader>
									<el-button v-else class="button-new-tag" size="small" @mouseover.native="showInput">+</el-button>
								</div>
								<el-select v-else v-model="planForm.throwCity" multiple placeholder="请选择">
									<el-option v-for="item in throwCity" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="方案备注：" prop="planRemark">
								<el-input type="textarea" v-model="planForm.planRemark" placeholder="请填写备注信息"></el-input>
							</el-form-item>
						</el-form>
					</div>
				</div>
				<!--选择点位-->
				<div class="step2" v-if="active==1">
					<div>
						<div class="search-nav">
							<div class="search-wrap">
								<span>
									<el-select v-model="selectValue" placeholder="请选择" class="type-select">
										<el-option v-for="item in typeSelect" :key="item.value" :label="item.value" :value="item.value"></el-option>
									</el-select>
									<el-input v-model="searchInput" placeholder="请输入要搜索的内容" class="searchInput input-with-select"></el-input>
								</span>
								<span>
									<el-select v-model="mState" placeholder="请选择媒体状态" class="plan-select input-with-select" @change="mStateChange">
										<el-option label="不限" value="不限"></el-option>
										<el-option label="正常" value="1"></el-option>
										<el-option label="待安装" value="2"></el-option>
									</el-select>
								</span>
								<span>
									<el-date-picker v-model="dateInput" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy.MM.dd" class="date-select input-with-select">
									</el-date-picker>
								</span>
								<span>
									<el-button type="primary" icon="el-icon-search" class="searchBtn" @click="searchFun">搜索</el-button>
								</span>
								<span>
									<el-button type="primary" icon="el-icon-location-outline" class="map" @click="mapAD">地图</el-button>
								</span>
								<div class="shopcar" @click="dialogVisible()">
									<el-badge :value="badgeNumber" class="item">
										<img src="../../assets/images/shopCar.png" alt="">
									</el-badge>
								</div>
							</div>
						</div>
						<!--类型区域选择面板-->
						<div class="dw-panel">
							<dl>
								<dt>资源类型：</dt>
								<dd :class="recType === 1?'active': ''" @click="activeRecType(1)">社区</dd>
								<dd :class="recType === 2?'active': ''" @click="activeRecType(2)">写字楼</dd>
							</dl>
							<dl>
								<dt>媒体类型：</dt>
								<dd class="active">广告门</dd>
							</dl>
							<dl style="border: none">
								<dt>城市区域：</dt>
								<!--city-->
								<dd v-for="(item, index) in city" :index="index" :class=" index == activeIndex ? 'active' : ''" @click="activeCity(item,index)">{{item.rName}}
								</dd>
							</dl>
							<dl class="city-proper" v-for="(list, index) of area" :index="index" v-show=" index == activeIndex">
								<dd v-for="item of list" :class="item.rName == areaName ? 'active' : ''" @click="activeArea(item.rName)">{{item.rName}}
								</dd>
							</dl>
							<dl style="border: none">
								<dt>广告限制：</dt>
								<dd v-for="(obj, index) of ADLimit" :key="index" :class="limitName.includes(obj.value) ? 'active' : ''" @click="activeADLimit(obj.value)">{{obj.value}}
								</dd>
							</dl>
						</div>
						<!--数量价格年份输入筛选框-->
						<div class="filter-input">
							<ul>
								<li style="margin-left: 0">
									<span>住户数量:</span>
									<div class="input-wrap" :class="HSearch === 'h'? 'focus': ''">
										<input type="text" class="input" @focus="haveFocus('h')" v-model="houseNum[0]"> -
										<input type="text" class="input" @focus="haveFocus('h')" v-model="houseNum[1]">
										<el-button size="mini" v-show=" HSearch === 'h'" @click="emptyFun('H')">清除</el-button>
										<el-button size="mini" type="primary" v-show=" HSearch === 'h'" @click="tableHSearch()">确定
										</el-button>
									</div>
								</li>
								<li>
									<span>楼盘价格:</span>
									<div class="input-wrap" :class="HSearch === 'p'? 'focus': ''">
										<input type="text" class="input" @focus="haveFocus('p')" v-model="buildPrice[0]"> -
										<input type="text" class="input" @focus="haveFocus('p')" v-model="buildPrice[1]">
										<el-button size="mini" v-show=" HSearch === 'p'" @click="emptyFun('P')">清除</el-button>
										<el-button size="mini" type="primary" v-show=" HSearch === 'p'" @click="tableHSearch()">确定
										</el-button>
									</div>
								</li>
								<li>
									<span>入住年份:</span>
									<div class="input-wrap" :class="HSearch === 'y'? 'focus': ''">
										<input type="text" class="input" @focus="haveFocus('y')" v-model="liveYear[0]"> -
										<input type="text" class="input" @focus="haveFocus('y')" v-model="liveYear[1]">
										<el-button size="mini" v-show=" HSearch === 'y'" @click="emptyFun('Y')">清除</el-button>
										<el-button size="mini" type="primary" v-show=" HSearch === 'y'" @click="tableHSearch()">确定
										</el-button>
									</div>
								</li>
								<li>
									<span style="float: left">楼盘类型:</span>
									<el-select v-model="buildValue" placeholder="请选择" class="buildType" style="float: left;" @change="tableHSearch">
										<el-option v-for="item in buildType" :key="item.buildValue" :label="item.buildValue" :value="item.buildValue"></el-option>
									</el-select>
								</li>
							</ul>
						</div>
						<!--表格-->
						<div class="table_wrap">
							<el-table v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" v-loadmore="loadMore" ref="multipleTable" border :data="planList" :select-on-indeterminate="selectOnAll" :default-sort="{prop: 'mID', order: 'descending'}" @select="handleSelect" @select-all="handleSelectAll" @cell-mouse-enter="mouseEnter" style="width: 100%">
								<el-table-column type="expand">
									<template slot-scope="props">
										<el-form label-position="left" inline class="demo-table-expand">
											<el-form-item label="商圈：">
												<span>{{ props.row.tradingArea}}</span>
											</el-form-item>
											<el-form-item label="楼栋数量：">
												<span>{{ props.row.buildNum }}</span>
											</el-form-item>
											<el-form-item label="资产编号：">
												<span>{{ props.row.assetTag }}</span>
											</el-form-item>
											<el-form-item label="广告尺寸：">
												<span>{{ props.row.adSize }}</span>
											</el-form-item>
											<el-form-item :label="recType === 1? '入住年份:' : '建成年份:'">
												<span>{{ props.row.liveYear }}</span>
											</el-form-item>
											<el-form-item :label="recType === 1? '小区户数:': '办公室数量:'">
												<span>{{ props.row.houseNum }}</span>
											</el-form-item>
											<el-form-item label="广告限制：">
												<span>{{ props.row.adLimit }}</span>
											</el-form-item>
										</el-form>
									</template>
								</el-table-column>
								<el-table-column type="selection" width="41px" scope="scope">
								</el-table-column>
								<el-table-column label="资源名称" min-width="16.1%" prop="resName">
								</el-table-column>
								<el-table-column v-if="false" min-width="0" label="媒体mID" prop="mID">
								</el-table-column>
								<el-table-column prop="mediaName" label="媒体名称" min-width="10.3%" class="tar">
								</el-table-column>
								<el-table-column prop="city" label="城市" min-width="6%">
								</el-table-column>
								<el-table-column prop="origin" label="区域" min-width="7.4%">
								</el-table-column>
								<el-table-column prop="buildType" :label="recType === 1? '楼盘类型':'写字楼类型'" min-width="8.8%">
								</el-table-column>
								<el-table-column prop="mState" label="媒体状态" min-width="7.8%" class="tar">
								</el-table-column>
								<el-table-column label="楼盘价格" min-width="7.3%">
									<template slot-scope="scope">
										<span>&yen;{{scope.row.buildPrice}}</span>
									</template>
								</el-table-column>
								<el-table-column prop="schedules" label="排期" min-width="14.2%">
								</el-table-column>
								<el-table-column width="132px">
									<template slot-scope="scope">
										<el-checkbox v-model="scope.row.checkBox.A" label="A面" @change="changeA(scope.row)" :disabled="scope.row.box.A">
											<!-- :disabled="scope.row.box.A"-->
										</el-checkbox>
										<el-checkbox v-model="scope.row.checkBox.B" label="B面" @change="changeB(scope.row)" :disabled="scope.row.box.B">
											<!--:disabled="scope.row.box.B"-->
										</el-checkbox>
									</template>
								</el-table-column>
							</el-table>
						</div>
						<!--购物车-->
						<el-dialog title="已选点位" :visible.sync="dialogTableVisible" :close-on-click-modal="false" :close-on-press-escape="false" :before-close="shopingBeforeClose">
							<template slot-scope="scope">
								<div class="table_wrap car-list" style="margin-top: 60px" :visible.sync="dialogTableVisible">
									<span @click="getMapADList" class="mapBtn">获取地图选点</span>
									<div class="car-title">
										<h4>已选择
											<span>{{shopMedia_ADNum.mediaNum}}</span>个媒体,
											<p>投放
												<span>{{shopMedia_ADNum.ADNum}}</span>面,</p>
											<p>其中有
												<span>{{ADLockNum}}</span>个被占点位</p>
											<i class="el-icon-info" style="color: #1890FF;"></i>
											<span @click="clearShop" style="cursor: pointer">&nbsp; &nbsp;清空</span>
											<span @click="clearADLock" style="cursor: pointer">移除被占点位</span>
											<!--<span @click="getMapADList" style="cursor: pointer" v-show="getMapADBtn">获取地图选点</span>-->
										</h4>
									</div>
									<el-table v-loading="shopLoading" element-loading-text="加载中" element-loading-spinner="el-icon-loading" border :row-class-name="tableRowClassName" :highlight-current-row="true" :data="shopingList" style="width: 100%">
										<el-table-column type="expand">
											<template slot-scope="props">
												<el-form label-position="left" inline class="demo-table-expand">
													<el-form-item label="商圈：">
														<span>{{ props.row.tradingArea}}</span>
													</el-form-item>
													<el-form-item label="资产编号：">
														<span>{{ props.row.assetTag }}</span>
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
										<el-table-column label="资源名称" min-width="140" prop="resName">
										</el-table-column>
										<el-table-column prop="mediaName" label="媒体名称" min-width="130" class="tar">
										</el-table-column>
										<el-table-column prop="city" label="城市" min-width="85">
										</el-table-column>
										<el-table-column prop="origin" label="区域" min-width="85">
										</el-table-column>
										<el-table-column prop="buildType" label="楼盘类型" min-width="85">
										</el-table-column>
										<el-table-column prop="houseNum" label="小区户数" min-width="85" class="tar">
										</el-table-column>
										<el-table-column label="楼盘价格" min-width="90">
											<template slot-scope="scope">
												<el-tooltip class="item" effect="dark" :content="scope.row.buildPrice ? priceFormat(scope.row.buildPrice/100):0" placement="bottom">
													<span>&yen;{{scope.row.buildPrice ? priceFormat(scope.row.buildPrice/100):0}}</span>
												</el-tooltip>
											</template>
										</el-table-column>
										<el-table-column prop="schedules" label="排期" min-width="200">
											<template slot-scope="scope">
												<el-tooltip class="item" effect="dark" :content="scope.row.schedules" placement="bottom">
													<span>{{scope.row.schedules}}</span>
												</el-tooltip>
											</template>
										</el-table-column>

										<el-table-column min-width="55px">
											<template slot-scope="scope">
												<span>{{scope.row.A_B}}</span>
											</template>
										</el-table-column>
										<el-table-column min-width="54px">
											<template slot-scope="scope">
												<span style="cursor: pointer;color: #1890ff" @click="deleteRow(scope.row)">
													<i class="el-icon-delete" style="color: #108DE7;font-size: 20px;margin-left: 7px"></i>
												</span>
											</template>
										</el-table-column>
									</el-table>
									<div style="text-align: center;margin-bottom: 10px">
										<el-button style="margin-top: 12px;" @click="goBack" type="primary">返回</el-button>
										<el-button style="margin-top: 12px;" @click="next" type="primary">下一步</el-button>
									</div>
								</div>
							</template>
						</el-dialog>
					</div>
				</div>
				<div class="step3" v-if="active==2">
					<div class="confirmBox">
						<div class="bill-title">
							<div class="bill-title-left">
								<h4>{{planName}}</h4>
								<p>{{cName}}</p>
								<p>{{cBand}}</p>
							</div>
							<div class="bill-title-right">
								<ul>
									<li>
										<p>
											<em>现金结算：</em>
											<span>￥{{priceFormat(cash)}}</span>
										</p>
									</li>
									<li>
										<p>
											<em>资源置换：</em>
											<span>￥{{priceFormat(zyzh)}}</span>
										</p>
									</li>
									<li>
										<p>
											<em>其他费用：</em>
											<span>￥{{priceFormat(other)}}</span>
										</p>
									</li>
									<li>
										<p>
											<em style="top: 5px">总计：</em>
											<span class="totalPrice">￥{{priceFormat(totalPrice)}}</span>
										</p>
									</li>
								</ul>
							</div>
						</div>
						<div class="panel">
							<el-tabs type="border-card">
								<el-tab-pane v-for="(item,index) in quotation" :label=item.city :key=index :index=index>
									<div class="tab-info">
										<div class="pqxx">
											<h4>排期信息</h4>
											<p>{{ item.SM }}</p>
										</div>
										<div class="price">
											<div class="price-left">
												<h4>广告费
													<el-button type="text" @click="changePrice('AD',item)">修改</el-button>
													<!--changeAD = true-->
												</h4>
												<ul>
													<li>刊例价(面/周)
														<span>￥{{priceFormat(item.ADPrice)}}</span>
													</li>
													<li>投放量(面·天)
														<span>{{item.tfl}}</span>
													</li>
													<li>赠送(面·天)
														<span>{{item.GMDate}}</span>
													</li>
													<li>广告费折扣
														<span>{{item.discount}}</span>
													</li>
													<li>￥{{priceFormat(item.advertyPrice)}}</li>
												</ul>
											</div>
											<div class="price-right">
												<h4>制作费
													<el-button type="text" @click="changePrice('M',item)">修改</el-button>
												</h4>
												<ul>
													<li>制作费单价
														<span>￥{{item.MPrice}}</span>
													</li>
													<li>广告画数量(张)
														<span>{{item.ADNumber}}</span>
													</li>
													<li></li>
													<li>制作费折扣
														<span>{{item.makeDiscount}}</span>
													</li>
													<li>￥{{priceFormat(item.makePrice)}}</li>
												</ul>
											</div>
										</div>
										<div class="bottom">
											<div class="bottom-detail">
												<div class="remark">
													<p>备注：{{item.remark}}</p>
													<!--  <el-input type="textarea" v-model="item.remark" placeholder="备注信息"></el-input>-->
												</div>
												<div class="bill-title-right">
													<ul>
														<li>
															<p>
																<em>现金结算：</em>
																<span>￥{{priceFormat(item.cash)}}</span>
															</p>
														</li>
														<li>
															<p>
																<em>资源置换：</em>
																<span>￥{{priceFormat(item.zyzh)}}</span>
															</p>
														</li>
														<li>
															<p>
																<em>其他费用：</em>
																<span>￥{{priceFormat(item.other)}}</span>
															</p>
														</li>
													</ul>
												</div>
											</div>
											<div class="bottom-fin">
												<el-button type="text" @click="changePrice('TP',item)">修改</el-button>
												<!--changeBill = true-->
												<p>
													<em style="top: 5px">总计：</em>
													<span class="totalPrice">￥{{priceFormat(item.total)}}</span>
												</p>
											</div>
										</div>
									</div>
								</el-tab-pane>
							</el-tabs>
							<!--修改对话框-->
							<el-dialog title="修改广告费" :visible.sync="changeAD" width="30%">
								<div class="changeMakePrice">
									<p>赠送(面·天)</p>
									<el-input-number v-model="ADchanger.GMDate" controls-position="right"></el-input-number>
									<p style="margin-top: 20px">广告费</p>
									<el-input v-model="ADchanger.reaPrice" placeholder="请输入内容" @change="checkInput" :clearable="true"></el-input>
								</div>
								<span slot="footer" class="dialog-footer">
									<el-button @click="changeAD = false">取 消</el-button>
									<el-button type="primary" @click="handleClose('AD')">确 定</el-button>
								</span>
							</el-dialog>
							<el-dialog title="修改制作费" :visible.sync="changeMake" width="30%">
								<div class="changeMakePrice">
									<p>制作费</p>
									<el-input v-model="makeChange.MReaPrice" placeholder="请输入内容" @change="checkInput" :clearable="true"></el-input>
								</div>
								<span slot="footer" class="dialog-footer">
									<el-button @click="changeMake = false">取 消</el-button>
									<el-button type="primary" @click="handleClose('M')">确 定</el-button>
								</span>
							</el-dialog>
							<el-dialog title="修改结算方式" :visible.sync="changeBill" width="30%">
								<div class="changeBill">
									<h4>￥{{totalChange.total}}</h4>
									<p>现金结算</p>
									<el-input v-model="totalChange.cash" placeholder="请输入内容" @change="checkCash" :clearable="true"></el-input>
									<p>资源置换</p>
									<el-input v-model="totalChange.zyzh" placeholder="请输入内容" @change="checkZyzh" :clearable="true"></el-input>
									<p>其他费用</p>
									<el-input v-model="totalChange.other" placeholder="请输入内容" @change="checkOther" :clearable="true"></el-input>
									<p>结算备注</p>
									<el-input v-model="totalChange.remark" type="textarea"></el-input>
								</div>
								<span slot="footer" class="dialog-footer">
									<el-button @click="changeBill = false">取 消</el-button>
									<el-button type="primary" @click="handleClose('TP')">确 定</el-button>
									<!--Settlement method-->
								</span>
							</el-dialog>

						</div>
					</div>
				</div>
				<div class="step4" v-if="active==3">
					<div class="createSuccess">
						<div class="successIcon">
							<img src="../../assets/images/createSuccess.png" alt="">
							<!--<i class="fa fa-check-circle fa-4x" style="color:#67C23A;"></i>-->
							<h2>编辑成功</h2>
							<p>编辑时间：{{dateTime}}</p>
						</div>
						<div class="planPanel">
							<ul>
								<li>
									<em>方案名称：</em>{{planName}}</li>
								<li>
									<em>所属客户：</em>{{cName}}</li>
								<li>
									<em>所属品牌：</em>{{cBand}}</li>
								<li class="money">
									<em>订单金额：</em>￥{{priceFormat(totalPrice)}}</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="content_bottom_btn">
			<el-button @click="prev" v-if="active == 2" type="default">上一步</el-button>
			<el-button @click="goBack" v-if="active == 1" type="default">取消</el-button>
			<el-button @click="clearData" v-if="active === 0" type="default">取消</el-button>
			<el-button style="margin-top: 12px;" @click="next" v-if="active == 0 || active == 1 || active == 2 " type="primary">下一步
			</el-button>
			<div class="finishBtn" v-if="active == 3">
				<el-button type="primary" @click="continueCreate">继续创建</el-button>
				<el-button type="default" @click="ToDetail">
					查看方案
				</el-button>
			</div>
		</div>
		<!--添加商品到购物车的动画效果-->
		<div class="shopAnimate" v-show="shoppingShow">
			<img src="../../assets/images/select.png" alt="">
		</div>
		<div class="shopAnimateAll" v-show="selectAll">
			<img src="../../assets/images/allselect.png" alt="">
		</div>
	</div>
</template>

<script>
import {
    Input,
    Dialog,
    Button,
    Tabs,
    TabPane,
    Table,
    TableColumn,
    Cascader,
    DatePicker,
    Select,
    Option,
    Form,
    FormItem,
    Steps,
    Step,
    Badge,
    Checkbox,
    Message,
    InputNumber
} from "element-ui";
import api from "../../api/api";
import areaToText from "../../commonFun/areaToText.js";
import areaArr from "../../commonFun/areaPackage_new";
import areaArrToText from "../../commonFun/areaToText_new";
import commaFormat from "../../commonFun/commaFormat";
// 时间格式化
import dateFormat from "../../commonFun/timeFormat.js";
// 筛选过滤
import filterFormat from "../../commonFun/filterTableData.js";

export default {
    name: "createPlan",
    components: {
        elInput: Input,
        elDialog: Dialog,
        elButton: Button,
        elTabs: Tabs,
        elTabPane: TabPane,
        elTable: Table,
        elTableColumn: TableColumn,
        elCascader: Cascader,
        elDatePicker: DatePicker,
        elSelect: Select,
        elOption: Option,
        elForm: Form,
        elFormItem: FormItem,
        elSteps: Steps,
        elStep: Step,
        elBadge: Badge,
        elCheckbox: Checkbox,
        elInputNumber: InputNumber
    },
    data() {
        var validateSales = (rule, value, callback) => {
            if (value) {
                if (this.BDData.uid === 0) {
                    callback(new Error("请输入正确的账号"));
                } else {
                    callback();
                }
            } else {
                callback();
            }
        };
        var validateName = (rule, value, callback) => {
            if (value) {
                if (value.match(/^\s+$/)) {
                    callback(new Error("方案名称不能为空格"));
                } else {
                    callback();
                }
            } else {
                callback();
            }
        };
        return {
            // 城市过滤结果
            filterCityData: [],
            // 排期时间过滤
            filtersData: [],
            // 地区过滤结果
            filtersArea: [],
            shopLoading: true, // 购物车加载中
            loading: true, //加载中
            dynamicTags: [],
            inputVisible: false,
            inputValue: "",
            selectedOptions: [],
            cityOptions: [],
            cityOther: false, // 判断是否要选择全国其他城市
            isBD: true, // 判断登录用户是否为销售
            username: "", // 获取登录用户的userName
            loading: false, // 加载所属销售
            resType: ["社区", "写字楼"], // step2 资源类型
            recType: 1, // step2  1:社区 0:写字楼
            shopXY: { x: "", y: "" }, // 动画起始坐标
            shoppingShow: false, //动画效果的显示隐藏
            selectAll: false, // 是否全选
            badgeNumber: 0, // 购物车数量
            bodyWidth: 1920,
            city: [], // step2 城市
            area: [], // step2城市下属区域
            activeIndex: 0, //step2当前选中的城市下标
            activeRName: "", //step2当前选中的城市名称
            areaName: "全市", // step2当前选中的区域
            quotation: [], // step3 报价单汇总
            ADchanger: { rid: "", GMDate: 0, reaPrice: 0 }, // 广告费修改
            makeChange: { rid: "", MReaPrice: 0 }, // 制作费修改
            totalChange: {
                rid: "",
                cash: 0,
                zyzh: 0,
                other: 0,
                total: 0,
                remark: ""
            }, // 合计费用修改
            CSMList: [], // 城市不同排期的所有面数
            // step2修改弹框
            changeAD: false,
            changeMake: false,
            changeBill: false,
            totalPrice: 0, //总价
            remark: "无", //备注
            cash: 0, // 现金结算
            zyzh: 0, // 资源置换
            other: 0, // 其他费用
            customer: [], // step1公司客户
            companyName: [], //step1公司名称
            planName: "", // 方案名称
            cName: "", // 选中公司名称
            companyBrand: [], //step1公司品牌
            cBand: "空", // 选中的品牌
            ownerBU: [], //step1联系人
            throwCity: [], //step1投放城市
            dialogTableVisible: true, //购物车
            checkAB: true, //选中
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
                    value: "资产编号",
                    label: "资产编号"
                }
            ],
            //默认
            selectValue: "资源名称",
            //楼盘类型
            buildType: [
                {
                    buildValue: "全部",
                    buildlabel: "全部"
                },
                {
                    buildValue: "高端住宅",
                    buildlabel: "高端住宅"
                },
                {
                    buildValue: "中端住宅",
                    buildlabel: "中端住宅"
                },
                {
                    buildValue: "一般住宅",
                    buildlabel: "一般住宅"
                },
                {
                    buildValue: "洋房",
                    buildlabel: "洋房"
                },
                {
                    buildValue: "别墅",
                    buildlabel: "别墅"
                }
            ],
            buildValue: "",
            //搜索框
            searchInput: "",
            planSelect: "",
            mState: "", //媒体状态
            active: 1, //步骤
            dateInput: [], // 时间输入框
            beforeDate: [], // 时间输入框的前一次时间
            //setp1创建方案表单
            planForm: {
                planName: "",
                ownerSales: "", // 所属销售
                companyName: "",
                companyBrand: "",
                throwCity: [],
                ownerBU: "", // 所属联系人
                planRemark: ""
            },
            planRules: {
                planName: [
                    { validator: validateName, trigger: "blur" },
                    {
                        required: true,
                        type: "string",
                        message: "方案名称不能为空",
                        trigger: "blur"
                    },
                    {
                        max: 30,
                        message: "最多只能输入30个字节",
                        trigger: "blur"
                    }
                ],
                ownerBU: [
                    {
                        required: true,
                        message: "请选择联系人",
                        trigger: "change"
                    }
                ],
                ownerSales: [
                    { required: true, message: "请输入账号", trigger: "blur" },
                    { validator: validateSales, trigger: "blur" }
                ],
                companyName: [
                    {
                        required: true,
                        message: "请选择公司名称",
                        trigger: "change"
                    }
                ],
                throwCity: [
                    {
                        required: true,
                        message: "请选择投放城市(可多选)",
                        trigger: "change"
                    }
                ]
            },
            beforADTotalList: [], // step2原始的所有点位列表
            ADTotalList: [], // step2所有点位列表
            shopingList: [], // step2购物车列表
            planList: [], //step2可选点位列表
            AdLaunchList: [], // 被占点位列表
            totalPlanList: [], // step2全部城市的选点列表
            sessionData: "", // 登录用户的数据
            shopListCity: [], // 购物车的城市列表
            selectOnAll: false, // 默认selecton
            FAData: "", // 创建方后台返回的数据
            timeout: null,
            BDData: { uid: 0, realName: "" },
            copyPlanList: [], // 备份planList
            backupsList: [], //  表头搜索过后的备份
            HSearch: "", // 获取传值显示‘清除’、‘确定’按钮
            houseNum: ["", ""], // 表头搜索住户数量
            buildNum: ["", ""], // 表头搜索楼栋数量
            buildPrice: ["", ""], // 表头搜索楼盘价格
            liveYear: ["", ""], // 表头搜索入住年份
            loadSign: true, // table滚轮
            shopMedia_ADNum: { mediaNum: 0, ADNum: 0 },
            ADloading: "", // 创建方案、提交选点和报价单时的loading
            computeAuotation: "", // 计算报价单时的loading
            areaCity: [],
            CityPlanIndex: [], // 记录每个城市遍历到的下标
            activeCityData: {}, // 城市切换的数据，默认为this.city[0]
            loadScroll: true, // 搜索后不执行滚动加载
            dateTime: "", // 获取今天日期
            firstLevelSearch: false, // 一级搜索
            firstLevelData: [], // 一级搜索保存的数据
            ADLimit: [
                // step2 广告限制
                { value: "全部", label: "全部" },
                { value: "地产", label: "地产" },
                { value: "汽车", label: "汽车" },
                { value: "美容", label: "美容" },
                { value: "餐饮", label: "餐饮" },
                { value: "食品", label: "食品" },
                { value: "金融", label: "金融" },
                { value: "医学", label: "医学" }
            ],
            limitName: "全部", // 当前广告限制高亮，默认为全部
            FAInfo: {},
            ADchangerReaPrice: true, // 广告费修改验证
            totalChangeCash: true, // 修改制作费现金输入验证
            totalChangeZyzh: true, // 修改制作费资源置换输入验证
            totalChangeOther: true, // 修改制作费其他费用输入验证
            commentMediaADNum: [], // 统计同一城市相同因不同排期而选择相同的asid
            mStateIndex: 0, // 切换媒体状态时，如果状态为1(正常)则进行滚动加载，mStateIndex记录下标
            beforADList_mState: [], // 保存切换媒体的所有数据--ADList
            scroll_mState: false,
            editApid: "", // 编辑方案的id
            editApRemark: [], // 编辑方案之前的备注信息，[{rid:440100,remark:''}]
            ADLockNum: 0, // 被锁点位的数量
            mapADList: [], // 地图选择的点位数据
            mapParams: {}, // 记录当前地图选点时的参数，包括排期、城市名和rid
            getMapADBtn: false // 没触发地图选点时不显示获取地图点位的按钮
        };
    },
    mounted() {
        this.getsessionData(); // 获取session中的数据
        this.getSetPoint(); //获取选点排期数据
        this.areaCity = areaArr.cityArea();
        this.getADLimit(); // 获取广告限制列表
        // 注：window.onresize只能在项目内触发1次
        let that = this;
        window.onresize = function windowResize() {
            // 实时监控body的宽带。注：修改该方法后要重启项目并重新打开页面
            // 通过捕获系统的onresize事件触发我们需要执行的事件
            that.bodyWidth = document.body.offsetWidth;
            that.shopXY.x = that.bodyWidth - 170;
            shopAnimate.style.right = that.shopXY.x + "px";
        };
        let Right = document.body.offsetWidth - 835;
        this.shopXY.x = Right;
        //    this.shopXY.x = this.bodyWidth - 170
        let shopAnimate = document.getElementsByClassName("shopAnimate")[0];
        shopAnimate.style.right = this.shopXY.x + "px";
        $(function() {
            //事件委托
            $(".content_top_wrap").on("click", ".close-tags", function() {
                $(this)
                    .parents(".tags")
                    .hide();
            });
            $(".content_top_wrap").on("click", ".clear-filter", function() {
                $(this)
                    .parents(".filter-tags")
                    .hide();
            });
        });
        console.log("this.cityOptions", this.cityOptions);
    },
    directives: {
        loadmore: {
            heightSign: 413,
            bind: function(el, binding) {
                const selectWrap = el.querySelector(".el-table__body-wrapper");
                console.log(binding.def.heightSign);
                selectWrap.addEventListener("scroll", function() {
                    const scrollDistance =
                        this.scrollHeight - this.scrollTop - this.clientHeight;
                    if (scrollDistance <= 150) {
                        binding.value();
                    }
                });
            }
        }
    },
    methods: {
        //监听table滚动
        loadMore() {
            if (this.loadScroll) {
                if (this.loadSign) {
                    this.loadSign = false;
                    if (this.scroll_mState === true) {
                        this.addADList_mState();
                    } else {
                        this.addADList();
                    }
                    setTimeout(() => {
                        this.loadSign = true;
                    }, 500);
                }
            } else {
                console.log("此时为搜索出来的数据");
            }
        },
        // step1投放城市权限是全国时handleClose1、showInput、handleInputConfirm
        spliceCity(tag) {
            // step1方案创建,删除选择城市
        },
        showInput() {},
        // 选择投放城市
        handleInputConfirm() {},
        // 获取浏览器session数据
        getsessionData() {
            this.sessionData = JSON.parse(
                sessionStorage.getItem("session_data")
            );
            if (this.sessionData.uType === "BD") {
                this.BDData.realName = sessionStorage.getItem("username");
                this.planForm.ownerSales = this.BDData.realName;
                this.BDData.uid = this.sessionData.uID;
                this.isBD = true;
                // this.Get_cName()
            } else {
                this.isBD = false;
            }
        },
        // 登录用户为媒介输入销售用户名去获取该销售的信息以便获取接下来的城市、公司、品牌、投放城市等信息
        querySearchAsync(queryString, callback) {},
        //获取公司名称列表MyCustomer
        Get_cName() {},
        // step2 获取广告限制列表
        getADLimit() {
            let uid = this.sessionData.uID;
            this.ADLimit = [];
            api.getApi("/GetNotPush", { uid: uid }).then(res => {
                console.log("广告限制列表", res);
                let limit = res.data;
                let limitArr = [];
                let firstObj = { value: "全部", label: "全部" };
                limitArr.push(firstObj);
                for (let i = 0; i < limit.length; i++) {
                    let limitObj = {
                        value: limit[i].nTitle,
                        label: limit[i].nTitle
                    };
                    limitArr.push(limitObj);
                }
                this.ADLimit = limitArr;
            });
        },
        // 初始化方案选点
        SetADBFun() {
            /* uid         int【必填】         当前账户UserID
            pdid        int【必填】         选择方案投放pdID*/
            let apid = sessionStorage.getItem("plan_apid");
            api
                .postApi("/SetADB", { uid: this.sessionData.uID, apid: apid })
                .then(res => {
                    console.log("初始化方案选点", res);
                    if (
                        res.data.SysCode == 300200 ||
                        res.data.MSG === "操作成功"
                    ) {
                        this.getPDIDFun(apid);
                    } else {
                        if (
                            res.data.SysCode === 100302 ||
                            res.data.MSG === "登陆超时"
                        ) {
                            this.loginTimeout(); // 登录超时
                        } else {
                            Message.warning("选点信息提交失败");
                        }
                        this.ADloading.close();
                    }
                });
        },
        // 提交方案选点信息
        getPDIDFun(apID) {
            /*   uid         int【必填】         当前账户UserID
            pdid        int【必填】         选择方案投放pdID
            pbs         String【必填】      广告开始投放日期
            pbe         String【必填】      广告投放结束日期
            asids       String【必填】      选择的广告点位asID组合，以","逗号组合*/
            let csmArr = this.CSMList;
            let shopingArr = this.shopingList;
            console.log("shopingArr", shopingArr);
            console.log("csmArr", csmArr);
            console.log("this.city", this.city);
            let uid = this.sessionData.uID;
            api.getApi("/GetAPD", { uid: uid, apid: apID }).then(res => {
                console.log("获取pdid", res);
                let APDData = res.data;
                if (APDData.length !== 0) {
                    this.PushADBFun(APDData);
                } else {
                    console.log("获取的pdid为空");
                }
            });
        },
        // 提交方案选点信息
        PushADBFun(data) {
            let ADBData = data;
            let shopingArr = this.shopingList;
            console.log("shopingArr", shopingArr);
            console.log("this.city", this.city);
            let cityArr = [];
            for (let j = 0; j < ADBData.length; j++) {
                for (let t = 0; t < this.city.length; t++) {
                    if (this.city[t].rid == ADBData[j].rID) {
                        // let city = this.city[t].rName
                        let cityObj = {
                            city: this.city[t].rName,
                            pdID: ADBData[j].pdID
                        };
                        cityArr.push(cityObj);
                    }
                }
            }
            console.log("cityArr", cityArr);
            let pbSetTime = this.timestampToTime(Date.parse(new Date())); //
            console.log("当前日期时间", pbSetTime);
            let uid = this.sessionData.uID;
            let arr = [];
            for (let i = 0; i < shopingArr.length; i++) {
                let ADobj = {
                    asID: shopingArr[i].asIDs,
                    pdID: 0,
                    pbStar: shopingArr[i].schedules.split("-")[0],
                    pbEnd: shopingArr[i].schedules.split("-")[1],
                    uID: uid,
                    pbSetTime: pbSetTime
                };
                for (let n = 0; n < cityArr.length; n++) {
                    if (shopingArr[i].city == cityArr[n].city) {
                        ADobj.pdID = cityArr[n].pdID;
                    }
                }
                arr.push(ADobj);
            }
            console.log("PushADBFun的arr", arr);
            let postData = { uid: uid, abList: arr };
            console.log(JSON.stringify(postData));
            api.postApi_new("/PushADB", JSON.stringify(postData)).then(res => {
                console.log("PushADB提交选点", res);
                if (
                    res.data.SysCode === 100302 ||
                    res.data.MSG === "登陆超时"
                ) {
                    this.ADloading.close();
                    this.loginTimeout();
                } else {
                    if (res.data === "" || res.data === null) {
                        this.$message({
                            message: "提交选点失败",
                            type: "warning"
                        });
                    } else {
                        this.CreateAPDFun();
                    }
                }
            });
        },
        // 创建方案投放城市详情(报价单数据提交)CreateAPD
        CreateAPDFun() {
            /*  uid         int【必填】     当前账户UserID
            apid        int【必填】     方案apID
            pdre        String【必填】  方案投放特定城市详情备注
            muid        int【选填】     如果当前账户是MD，在填写该媒介UserID
            rid         int【必填】     方案投放的目标城市rID
            days        int【必填】     投放总数：面*天
            fdays       int【必填】     赠送数量：面/天
            ps          String【必填】  方案投放开始时间
            pe          String【必填】  投放结束日期
            pdfee       int【必填】     实计广告费用
            pdn         int【必填】     投放点位数
            pdm         int【必填】     实计制作费用
            pdt         int【必填】     现金金额
            pdsf        int【必填】     置换金额
            pdof        int【必填】     其他金额*/
            console.log("this.quotation2222212", this.quotation);
            let apid = sessionStorage.getItem("plan_apid");
            for (let i = 0; i < this.quotation.length; i++) {
                let CAPDParams = {
                    uid: this.sessionData.uID, // 当前账户UserID
                    apid: apid, //this.FAData.apID,         // 方案apID
                    pdre: this.quotation[i].remark, // 方案投放特定城市详情备注 '备注信息',
                    muid: this.sessionData.uID, // 如果当前账户是MD，在填写该媒介UserID
                    rid: this.quotation[i].rid, // 方案投放的目标城市rID
                    days: this.quotation[i].tfl, // 投放总数：面*天
                    fdays: this.quotation[i].GMDate, // 赠送数量：面/天
                    ps: "", // 方案投放开始时间
                    pe: "", // 投放结束日期
                    //commaFormat.noComma(this.quotation[i].advertyPrice) * 100,
                    pdfee: parseInt(this.quotation[i].advertyPrice * 100), //  实际广告费用
                    pdn: this.quotation[i].ADNumber, // 投放点位数cash
                    pdm: (this.quotation[i].makePrice * 100).toFixed(0), // 实计制作费用
                    pdt: (this.quotation[i].cash * 100).toFixed(0),
                    pdsf: (this.quotation[i].zyzh * 100).toFixed(0),
                    pdof: (this.quotation[i].other * 100).toFixed(0)
                };
                if (this.sessionData.uType === "BD") {
                    delete CAPDParams.muid;
                }
                let schedulesArr = "";
                if (
                    this.quotation[i].schedules !== "" &&
                    this.quotation[i].schedules !== null &&
                    this.quotation[i].schedules !== undefined
                ) {
                    schedulesArr = this.quotation[i].schedules.split("-");
                    CAPDParams.ps = schedulesArr[0];
                    CAPDParams.pe = schedulesArr[schedulesArr.length - 1];
                } else {
                    CAPDParams.ps = this.dateInput[0];
                    CAPDParams.pe = this.dateInput[1];
                }
                console.log(
                    "广告画数：",
                    this.quotation[i].ADNumber,
                    ",报价单数据提交:",
                    CAPDParams
                );
                api.postApi("/CreateAPD", CAPDParams).then(res => {
                    console.log("提交报价单后台返回数据：", res);
                    this.ADloading.close();
                    if (!res.data.SysCode) {
                        if (res.data !== "") {
                            Message({
                                message: "投放城市的报价信息提交成功！",
                                type: "success"
                            });
                            this.active = 3;
                        } else {
                            Message({
                                message: "投放城市的报价信息提交失败！",
                                type: "warning"
                            });
                        }
                    } else {
                        Message({
                            message: "投放城市的报价信息提交失败！",
                            type: "warning"
                        });
                    }
                });
            }
        },
        // 获取当前时间并计算N天后的日期
        GetDateStr(AddDayCount) {
            let dd = new Date();
            dd.setDate(dd.getDate() + AddDayCount); // 获取AddDayCount天后的日期
            let y = dd.getFullYear();
            let m =
                dd.getMonth() + 1 < 10
                    ? "0" + (dd.getMonth() + 1)
                    : dd.getMonth() + 1; // 获取当前月份的日期，不足10补0
            let d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate(); // 获取当前几号，不足10补0
            return y + "." + m + "." + d;
        },
        // 设置城市区域
        getAreaFun() {
            this.area = [];
            let throwCityList = this.planForm.throwCity;
            console.log("****************", throwCityList);
            console.log("________--------", this.throwCity);
            let cityArr = [];
            for (let j = 0; j < throwCityList.length; j++) {
                for (let t = 0; t < this.throwCity.length; t++) {
                    if (this.throwCity[t].value === throwCityList[j]) {
                        let cityObj = {
                            rName: this.throwCity[t].label,
                            rid: this.throwCity[t].value
                        };
                        cityArr.push(cityObj);
                    }
                }
                if (j >= throwCityList.length - 1) {
                    this.city = cityArr;
                    this.city.sort(this.compareFun);
                    console.log("this.city ", this.city);
                    this.activeCityData = this.city[0]; // 设置初始选中城市信息
                    for (let n = 0; n < this.city.length; n++) {
                        let rid = this.city[n].rid;
                        console.log("投放城市rid", rid);
                        let provinceRid = rid.substring(0, 2) + "0000";
                        // alert(provinceRid)
                        let city_arr = this.areaCity;
                        let areaArr = [];
                        console.log("this.cityOptions", this.areaCity);
                        for (let i = 0; i < city_arr.length; i++) {
                            // 遍历城市查找城市名对应的rid，用于删除勾选的城市
                            if (city_arr[i].value == provinceRid) {
                                let child = city_arr[i].children;
                                for (let j = 0; j < child.length; j++) {
                                    if (child[j].value == rid) {
                                        let areaChild = child[j].children;
                                        // console.log('区区区',areaChild)
                                        for (
                                            let n = 0;
                                            n < areaChild.length;
                                            n++
                                        ) {
                                            if (n === 0) {
                                                let allArea = {
                                                    rID: rid,
                                                    rName: "全市"
                                                };
                                                areaArr.push(allArea);
                                            }
                                            let myArea = {
                                                rID: areaChild[n].value,
                                                rName: areaChild[n].label
                                            };
                                            areaArr.push(myArea);
                                            if (n >= areaChild.length - 1) {
                                                console.log("areaArr", areaArr);
                                                this.area.push(areaArr);
                                                this.area.sort(
                                                    this.compareArea
                                                );
                                            }
                                        }
                                    }
                                }
                            }
                            if (i >= city_arr.length - 1) {
                                console.log("this.area", this.area);
                                // this.area = areaArr
                            }
                        }
                    }
                }
            }
        },
        // step2, 资源类型切换
        activeRecType(num) {
            this.recType = num;
            let index = this.activeIndex;
            let cityData = this.activeCityData;
            let beforAD = [];
            beforAD = this.beforADTotalList[index].list;
            let tempList = [];
            if (num == 2) {
                this.loading = true;
                this.loadScroll = false;
                console.log("num", num);
                for (let i = 0; i < beforAD.length; i++) {
                    if (beforAD[i].resType == num) {
                        // console.log('i:',i)
                        tempList.push(beforAD[i]);
                    } else {
                        console.log("1");
                    }
                }
                console.log("资源类型切换tempList", tempList);
                this.areaName = "全市";
                if (tempList.length !== 0) {
                    if (this.searchInput !== "" && this.searchInput !== null) {
                        let filterList = this.filterResOrigin(tempList); // 过滤搜索条件
                        console.log("搜索框不为空时过滤", filterList);
                        if (filterList.length !== 0) {
                            if (this.mState !== "") {
                                // 媒体状态过滤
                                console.log(
                                    "切换资源时媒体状态过滤",
                                    this.mState
                                );
                                filterList = this.filter_mState(filterList);
                                if (filterList.length !== 0) {
                                    this.setResTypeData(filterList);
                                } else {
                                    this.loading = false;
                                    this.planList = [];
                                }
                            } else {
                                console.log(
                                    "切换资源时没有进行媒体状态过滤",
                                    this.mState
                                );
                                this.setResTypeData(filterList);
                            }
                        } else {
                            this.loading = false;
                            this.planList = [];
                        }
                    } else {
                        if (this.mState !== "") {
                            // 媒体状态过滤
                            tempList = this.filter_mState(tempList);
                            if (tempList.length !== 0) {
                                this.setResTypeData(tempList);
                            } else {
                                this.loading = false;
                                this.planList = [];
                            }
                        } else {
                            this.setResTypeData(tempList);
                        }
                    }
                } else {
                    this.loading = false;
                    this.planList = [];
                }
            } else {
                this.activeCity(cityData, index);
                this.loadScroll = true;
            }
        },
        //资源类型切换的数据
        setResTypeData(Data) {
            let datalist = Data;
            let planArr = [];
            for (let i = 0; i < datalist.length; i++) {
                let adObj = this.setTeblePlanList(datalist[i], i);
                planArr.push(adObj);
                if (i >= datalist.length - 1) {
                    console.log("资源类型过滤完成后的planArr", planArr);
                    this.planList = planArr;
                    this.judgeByselect();
                    this.secondLevelData = this.planList;
                }
            }
            this.loading = false;
        },
        // 切换资源时，如果搜索框不为空则过滤
        filterResOrigin(FData) {
            let BPL = FData;
            let arr = [];
            for (let i = 0; i < BPL.length; i++) {
                if (this.selectValue === "资源名称") {
                    if (BPL[i].resName.includes(this.searchInput)) {
                        // console.log('资源名称不为空')
                        arr.push(BPL[i]);
                    }
                } else if (this.selectValue === "商圈") {
                    if (BPL[i].tradingArea.includes(this.searchInput)) {
                        // console.log('商圈不为空')
                        arr.push(BPL[i]);
                    }
                } else if (this.selectValue === "资产编号") {
                    if (
                        BPL[i].assetTag !== undefined &&
                        BPL[i].assetTag.includes(this.searchInput)
                    ) {
                        // console.log('商圈不为空')
                        arr.push(BPL[i]);
                    }
                }
            }
            return arr;
        },
        //切换城市及区域的时候进行资源类型的过滤
        filterByResType(data, letter) {
            let dataList = data;
            let TypeNum = this.recType;
            let tempList = [];
            for (let i = 0; i < dataList.length; i++) {
                if (dataList[i].resType == TypeNum) {
                    if (this.mState !== "") {
                        if (this.mState == dataList[i].mState) {
                            tempList.push(dataList[i]);
                        } else {
                            console.log("****");
                        }
                    } else {
                        tempList.push(dataList[i]);
                    }
                } else {
                    console.log("***");
                }
            }
            if (letter === "Fcity") {
                console.log("资源类型为写字楼", this.recType);
                tempList = this.filterByADLaunch(tempList, letter);
            }
            console.log("资源类型切换tempList", tempList);
            return tempList;
        },
        // stpe2, tab切换城市
        activeCity(item, index) {
            this.limitName = "全部"; // 初始化广告限制
            this.activeIndex = index;
            this.activeRName = item.rName;
            this.activeCityData = item;
            this.areaName = "全市";
            if (
                this.searchInput !== "" &&
                this.searchInput !== null &&
                this.searchInput !== undefined
            ) {
                this.ResOriginSearch();
            } else {
                if (this.recType === 1) {
                    this.loadScroll = true;
                }
                console.log(
                    "item.rid",
                    item.rid,
                    ",this.totalPlanList",
                    this.totalPlanList
                );
                for (let i = 0; i < this.totalPlanList.length; i++) {
                    if (this.totalPlanList[i].rid === item.rid) {
                        if (this.recType === 2) {
                            this.planList = this.filterByResType(
                                this.beforADTotalList[i].list,
                                "Fcity"
                            );
                        } else {
                            // 媒体状态过滤
                            if (this.mState !== "") {
                                this.mStateChange(this.mState);
                            } else {
                                this.planList = this.totalPlanList[i].list;
                            }
                            this.resetPlanList(); // 把所有的勾选去掉
                        }
                        console.log("this.planList", this.planList);
                        if (this.planList.length !== 0) {
                            this.judgeByselect();
                            break;
                        } else {
                            this.$message({
                                message: item.rName + "暂无可选的投放点",
                                type: "warning"
                            });
                        }
                    }
                }
            }
        },
        // 根据购物车已有的mID对应AB面判断勾选
        judgeByselect(letter) {
            let that = this;
            console.log("judgeByselect");
            setTimeout(function() {
                for (let i = 0; i < that.shopingList.length; i++) {
                    for (let j = 0; j < that.planList.length; j++) {
                        if (that.planList[j].mID == that.shopingList[i].mID) {
                            //  && that.planList[j].schedules === that.shopingList[i].schedules
                            let crossIf = that.crossSchedules(
                                that.shopingList[i].schedules
                            );
                            if (crossIf) {
                                if (that.shopingList[i].A_B === "A面") {
                                    that.planList[j].checkBox.A = true;
                                } else if (that.shopingList[i].A_B === "B面") {
                                    that.planList[j].checkBox.B = true;
                                }
                            } else {
                                console.log("排期无交叉且不相等");
                            }
                        }
                        if (
                            that.planList[j].checkBox.A ||
                            that.planList[j].checkBox.B
                        ) {
                            if (
                                letter !== "firstLevel" &&
                                letter !== "FArea" &&
                                letter !== "scoll"
                            ) {
                                // console.log('时间排期', that.dateInput)
                                that.planList[j].schedules =
                                    that.dateInput[0] + "-" + that.dateInput[1];
                            }
                            that.$refs.multipleTable.toggleRowSelection(
                                that.planList[j],
                                true
                            );
                        }
                    }
                }
                if (letter === "firstLevel") {
                    that.firstLevelData = that.planList; // 保存一级搜索的数据
                    console.log(
                        "一级搜索得到的数据firstLevelData",
                        that.firstLevelData
                    );
                }
            }, 0);
        },
        // 重置planList的勾选
        resetPlanList() {
            console.log("重置planList的勾选开始");
            for (let i = 0; i < this.planList.length; i++) {
                if (
                    this.planList[i].checkBox.A ||
                    this.planList[i].checkBox.B
                ) {
                    console.log("有勾选");
                    this.planList[i].checkBox.A = false;
                    this.planList[i].checkBox.B = false;
                    this.$refs.multipleTable.toggleRowSelection(
                        this.planList[i],
                        false
                    );
                } else {
                    console.log("无勾选");
                }
            }
            console.log("重置planList的勾选结束");
        },
        //点位有时间交叉
        crossSchedules(sche) {
            let scheArr = sche.split("-");
            if (
                this.dateInput[0] == scheArr[0] &&
                this.dateInput[1] == scheArr[1]
            ) {
                return true;
            } else if (
                this.dateInput[0] < scheArr[0] &&
                this.dateInput[1] >= scheArr[0]
            ) {
                return true;
            } else if (
                this.dateInput[0] > scheArr[0] &&
                this.dateInput[0] < scheArr[1]
            ) {
                return true;
            } else if (
                this.dateInput[1] > scheArr[0] &&
                this.dateInput[1] < scheArr[1]
            ) {
                return true;
            } else if (
                this.dateInput[0] <= scheArr[1] &&
                this.dateInput[1] > scheArr[1]
            ) {
                return true;
            } else {
                return false;
            }
        },
        //  stpe2, 切换区域
        activeArea(rName) {
            this.limitName = "全部"; // 初始化广告限制
            this.loadScroll = false;
            this.areaName = rName;
            this.filterByArea(rName);
        },
        // 城市区域过滤
        filterByArea(name) {
            this.loading = true;
            let AName = name;
            let FBAIndex = this.activeIndex;
            console.log("切换区域", this.firstLevelData);
            let FBA = [];
            if (this.searchInput !== "" && this.searchInput !== null) {
                if (this.recType === 1) {
                    FBA = this.firstLevelData;
                } else if (this.recType === 2) {
                    let temp_FBA = this.filterByResType(
                        this.beforADTotalList[FBAIndex].list
                    ); // 过滤资源类型
                    FBA = this.filterResOrigin(temp_FBA); // 过滤不符合搜索框内容的
                    console.log("切换区域temp_FBA", temp_FBA);
                    console.log("切换区域FBA", FBA);
                }
            } else {
                FBA = this.filterByResType(
                    this.beforADTotalList[FBAIndex].list
                );
                console.log(
                    FBAIndex,
                    ",城市区域过滤的beforPlanList",
                    this.beforADTotalList
                );
            }
            if (AName !== "全市") {
                this.loading = true;
                let filterAreaArr = [];
                console.log("城市区域过滤的beforPlanList", FBA);
                for (let i = 0; i < FBA.length; i++) {
                    if (AName === FBA[i].rName || AName === FBA[i].origin) {
                        filterAreaArr.push(FBA[i]);
                    } else {
                        console.log("不匹配", AName);
                    }
                }
                console.log("城市区域过滤到的数据:", filterAreaArr);
                if (filterAreaArr.length !== 0) {
                    if (this.searchInput !== "" && this.searchInput !== null) {
                        if (this.recType === 1) {
                            this.planList = filterAreaArr;
                        } else if (this.recType === 2) {
                            let FArr = [];
                            for (let j = 0; j < filterAreaArr.length; j++) {
                                let tempObj = this.setTeblePlanList(
                                    filterAreaArr[j],
                                    j
                                );
                                FArr.push(tempObj);
                            }
                            this.planList = FArr;
                        }
                        this.judgeByselect("FArea");
                        this.secondLevelData = this.planList; // 保存二级过滤
                        this.loading = false;
                    } else {
                        this.filterByADLaunch(filterAreaArr);
                    }
                } else {
                    this.planList = [];
                    this.loading = false;
                }
            } else {
                if (this.firstLevelData.length && this.searchInput !== "") {
                    this.planList = this.firstLevelData;
                    this.judgeByselect("FArea");
                    this.secondLevelData = this.planList; // 保存二级过滤
                } else {
                    console.log(
                        "搜索为空点击全市",
                        this.activeCityData,
                        this.activeIndex
                    );
                    this.activeCity(this.activeCityData, this.activeIndex);
                }
                this.loading = false;
            }
        },
        // 根据过滤条件得到的数据
        filterByADLaunch(fdata, letter) {
            let filterData = fdata;
            let filterPlanArr = [];
            for (let n = 0; n < filterData.length; n++) {
                let filterAD = this.setTeblePlanList(filterData[n], n);
                filterPlanArr.push(filterAD);
                if (n >= filterData.length - 1) {
                    console.log("搜索中的filterPlanArr", filterPlanArr);
                    if (letter === "Fcity") {
                        this.loading = false;
                        return filterPlanArr;
                    } else {
                        this.planList = filterPlanArr;
                        this.judgeByselect("FArea");
                        this.secondLevelData = this.planList; // 保存二级过滤
                    }
                }
            }
            this.loading = false;
        },
        // 广告限制切换
        activeADLimit(limit) {
            console.log("广告限制limit", limit);
            let limitText = limit;
            if (this.limitName === "全部" || limitText === "全部") {
                if (this.limitName === "全部") {
                    this.limitName = limitText + "、";
                } else {
                    this.limitName = limitText;
                }
            } else {
                let index = this.limitName.indexOf(limitText);
                if (index === -1) {
                    this.limitName = limitText + "、" + this.limitName;
                } else {
                    console.log(this.limitName, "包含了", limitText);
                    this.limitName =
                        this.limitName.split(limitText + "、").join("") ||
                        "全部";
                }
            }
            console.log("广告限制 this.limitName", this.limitName);
            this.filterByADLimit(this.limitName);
        },
        // 广告限制过滤
        filterByADLimit(limit) {
            let LimitList = limit.split("、");
            console.log("匹配字段ADLimitList", LimitList);
            let FADLIndex = this.activeIndex;
            console.log("FADLIndex", FADLIndex);
            if (limit !== "全部") {
                let FADLArr = [];
                let FADL = this.beforADTotalList[FADLIndex].list;
                if (this.searchInput !== "" && this.searchInput !== null) {
                    FADL = this.filterResOrigin(FADL);
                }
                for (let j = 0; j < FADL.length; j++) {
                    console.log("资源类型为", this.recType);
                    if (FADL[j].resType === this.recType) {
                        // 资源类型过滤
                        if (FADL[j].notPush !== undefined) {
                            console.log("存在广告限制的", FADL[j]);
                            let tempObj = this.ADLimitFun(LimitList, FADL[j]);
                            if (tempObj) {
                                tempObj = this.setTeblePlanList(tempObj, j);
                                FADLArr.push(tempObj);
                            }
                        }
                    }
                }
                console.log("广告限制过滤得到的数据1111", FADLArr);
                if (FADLArr.length) {
                    // filterResOrigin
                    let filterList = FADLArr;
                    if (this.mState !== "") {
                        filterList = this.filter_mState(filterList);
                    }
                    this.planList = filterList;
                } else {
                    Message({
                        message: "暂无可选的点位",
                        type: "warning"
                    });
                    this.planList = [];
                }
            } else {
                let tempPlanList = "";
                if (
                    (this.searchInput !== "" && this.searchInput !== null) ||
                    this.mState !== ""
                ) {
                    tempPlanList = this.beforADTotalList[FADLIndex].list;
                    if (this.searchInput !== "" && this.searchInput !== null) {
                        tempPlanList = this.filterResOrigin(tempPlanList);
                    }
                    if (this.mState !== "" && tempPlanList.length) {
                        tempPlanList = this.filter_mState(tempPlanList);
                    }
                    let tempList = [];
                    for (let i = 0; i < tempPlanList.length; i++) {
                        if (tempPlanList[i].resType === this.recType) {
                            let tempObj = this.setTeblePlanList(
                                tempPlanList[i],
                                i
                            );
                            tempList.push(tempObj);
                        }
                    }
                    tempPlanList = tempList;
                } else {
                    console.log(
                        "广告限制切换为全部",
                        this.totalPlanList[FADLIndex].list
                    );
                    tempPlanList = this.totalPlanList[FADLIndex].list;
                }
                this.planList = tempPlanList;
            }
        },
        // 广告限制过滤
        ADLimitFun(LData, FData) {
            let ADLimitList = LData;
            let FADList = "";
            if (FData.notPush !== undefined) {
                FADList = FData.notPush.split("、");
            } else {
                FADList = FData.adLimit.split("、");
            }
            console.log("待匹配字段FADList", FADList);
            let num = 0;
            for (let i = 0; i < ADLimitList.length - 1; i++) {
                for (let n = 0; n < FADList.length; n++) {
                    if (FADList[n] === ADLimitList[i]) {
                        num += 1;
                        break;
                    }
                }
            }
            if (ADLimitList.length - 1 === num) {
                console.log("媒体mid", FData.mID);
                return FData;
            } else {
                return false;
            }
        },
        // 从原数据到teble显示的数据
        setTeblePlanList(data, j, n) {
            let i = n || this.activeIndex;
            let setData = data;
            let AD_data = {
                rid: i + j.toString(),
                mID: setData.mID,
                resType: setData.resType,
                asIDs: setData.asIDs,
                asLabs: setData.asLabs,
                resName: setData.resName,
                city: this.activeRName, //'广州',
                origin: setData.rName,
                buildType: setData.cType,
                houseNum: setData.hNum,
                buildPrice: setData.hPrice / 100,
                mediaName: setData.mTitle,
                buildNum: setData.fNum,
                schedules: this.dateInput[0] + "-" + this.dateInput[1],
                tradingArea: setData.tradingArea || "",
                assetTag: setData.assetTag || "",
                liveYear: setData.chDay,
                adLimit: setData.notPush,
                mState:
                    setData.mState === 1
                        ? "正常"
                        : setData.mState === 2 ? "待安装" : "",
                adSize: setData.adSize || "",
                checkBox: { A: false, B: false },
                box: { A: false, B: false }
            };
            if (setData.asLabs.indexOf("A") === -1) {
                AD_data.box.A = true;
            }
            if (setData.asLabs.indexOf("B") === -1) {
                AD_data.box.B = true;
            }
            return AD_data;
        },
        // 获取广告点位列表
        getAdList(letter) {
            this.loading = true;
            let starTime, endTime;
            if (letter === "search") {
                starTime = this.dateInput[0];
                endTime = this.dateInput[1];
            } else {
                this.dateTime = this.GetDateStr(0);
                starTime = this.GetDateStr(1);
                endTime = this.GetDateStr(14);
                this.dateInput = [starTime, endTime]; // 设置默认时间
            }
            if (this.dateInput !== this.beforeDate) {
                this.beforADTotalList = [];
                let uid = this.sessionData.uID;
                let throwCity = this.city;
                // console.log('投放城市333333333', throwCity)
                for (let t = 0; t < throwCity.length; t++) {
                    let rid = throwCity[t].rid;
                    //  let rName = throwCity[t].rName
                    api
                        .getApi("/GetAdS", {
                            uid: uid,
                            rid: rid,
                            act: 1,
                            ls: starTime,
                            le: endTime
                        })
                        .then(res => {
                            console.log("选点列表：", res);
                            if (!res.data.SysCode) {
                                let ADList = res.data;
                                let listObj = { rid: rid, list: [] };
                                listObj.list = ADList;
                                this.ADTotalList.push(listObj);
                                this.beforADTotalList.push(listObj);
                                this.beforADTotalList.sort(this.compareFun);
                                if (
                                    this.beforADTotalList.length >=
                                    throwCity.length
                                ) {
                                    console.log(
                                        "GetAdS选点列表",
                                        this.beforADTotalList
                                    );
                                    if (
                                        letter === "search" &&
                                        this.searchInput !== ""
                                    ) {
                                        this.loadScroll = true;
                                        this.setAdLaunchFun("search");
                                    } else {
                                        this.setAdLaunchFun();
                                    }
                                    this.beforeDate = this.dateInput;
                                }
                            } else {
                                if (
                                    res.data.SysCode === 100302 ||
                                    res.data.MSG === "登陆超时"
                                ) {
                                    this.loginTimeout(); // 登录超时
                                } else {
                                    this.$message({
                                        message: "权限异常,请重新登录",
                                        type: "warning"
                                    });
                                    this.$router.push("/login");
                                }
                            }
                        });
                }
            } else if (this.searchInput !== "") {
                this.ResOriginSearch();
            } else {
                this.loading = false;
            }
        },
        // 重排列表，显示planList
        setAdLaunchFun(letter) {
            this.CityPlanIndex = [];
            let ADArr = this.beforADTotalList;
            let throwCity = this.city;
            let totalList = []; // 全部城市的选点列表
            console.log("重排列表this.beforADTotalList", this.beforADTotalList);
            console.log("重排列表throwCity", throwCity);
            for (let t = 0; t < throwCity.length; t++) {
                for (let n = 0; n < ADArr.length; n++) {
                    if (throwCity[t].rid == ADArr[n].rid) {
                        console.log("城市与全部点位相同的rid", ADArr[n].rid);
                        let ADList = ADArr[n].list;
                        let planArr = { rid: throwCity[t].rid, list: [] };
                        if (ADList.length !== 0) {
                            for (let i = 0; i < ADList.length; i++) {
                                let adObj = {
                                    rid: t.toString() + i.toString(),
                                    mID: ADList[i].mID,
                                    resType: ADList[i].resType,
                                    asIDs: ADList[i].asIDs,
                                    asLabs: ADList[i].asLabs,
                                    resName: ADList[i].resName,
                                    city: throwCity[t].rName, //'广州',
                                    origin: ADList[i].rName,
                                    buildType: ADList[i].cType,
                                    houseNum: ADList[i].hNum,
                                    buildPrice: ADList[i].hPrice / 100,
                                    mediaName: ADList[i].mTitle,
                                    buildNum: ADList[i].fNum,
                                    schedules:
                                        this.dateInput[0] +
                                        "-" +
                                        this.dateInput[1],
                                    tradingArea: ADList[i].tradingArea || "",
                                    assetTag: ADList[i].assetTag || "",
                                    liveYear: ADList[i].chDay,
                                    adLimit: ADList[i].notPush || "",
                                    mState:
                                        ADList[i].mState === 1
                                            ? "正常"
                                            : ADList[i].mState === 2
                                                ? "待安装"
                                                : "",
                                    adSize: ADList[i].adSize || "",
                                    checkBox: { A: false, B: false },
                                    box: { A: false, B: false }
                                };
                                if (ADList[i].asLabs.indexOf("A") === -1) {
                                    adObj.box.A = true;
                                }
                                if (ADList[i].asLabs.indexOf("B") === -1) {
                                    adObj.box.B = true;
                                }
                                console.log("资源类型为", this.recType);
                                if (ADList[i].resType === this.recType) {
                                    // 资源类型过滤
                                    planArr.list.push(adObj);
                                }
                                // planArr.list.push(adObj)
                                let index = 49;
                                if (
                                    i >= index &&
                                    ADList.length >= index &&
                                    planArr.list.length >= index
                                ) {
                                    let indexObj = {
                                        rid: ADArr[n].rid,
                                        LIndex: i + 1
                                    };
                                    this.CityPlanIndex.push(indexObj);
                                    console.log(
                                        "城市rid:",
                                        indexObj.rid,
                                        "遍历到的下标:",
                                        indexObj.LIndex
                                    );
                                    this.listIndex = i + 1;
                                    console.log("方案选点列表1", planArr);
                                    totalList.push(planArr);
                                    break;
                                } else {
                                    if (i >= ADList.length - 1) {
                                        let indexObj = {
                                            rid: ADArr[n].rid,
                                            LIndex: i + 1
                                        };
                                        this.CityPlanIndex.push(indexObj);
                                        this.listIndex = i + 1;
                                        console.log(
                                            "方案选点列表长度小于19",
                                            planArr
                                        );
                                        // this.planList = planArr
                                        totalList.push(planArr);
                                    }
                                }
                            }
                        } else {
                            totalList.push(planArr);
                        }
                    }
                }
            }
            this.totalPlanList = totalList;
            let ATIndex = this.activeIndex;
            this.planList = this.totalPlanList[ATIndex].list;
            this.loading = false;
            this.copyPlanList = this.planList;
            if (letter === "search" && this.searchInput !== "") {
                this.ResOriginSearch("search"); // 资源名称或商圈搜索
            } else {
                this.judgeByselect();
            }
        },
        // 监听滚动，每次曾加20条数据
        addADList() {
            console.log("监听到滚动，并调用了addADList");
            let beforAD = this.beforADTotalList; // 选点列表
            let cityListIndex = this.CityPlanIndex;
            console.log("cityListIndex", cityListIndex);
            console.log("this.beforADTotalList", this.beforADTotalList);
            console.log("this.activeCityData", this.activeCityData);
            for (let n = 0; n < beforAD.length; n++) {
                for (let g = 0; g < cityListIndex.length; g++) {
                    if (
                        cityListIndex[g].rid === beforAD[n].rid &&
                        this.activeCityData.rid === beforAD[n].rid
                    ) {
                        let rid = cityListIndex[g].rid;
                        console.log(
                            cityListIndex[g].rid,
                            "该城市从下标为",
                            cityListIndex[g].LIndex
                        );
                        let myIndex = cityListIndex[g].LIndex;
                        let ADList = beforAD[n].list;
                        let planArr = { rid: rid, list: [] };
                        for (let i = myIndex; i < ADList.length; i++) {
                            console.log("遍历选点列表");
                            if (ADList[i].resType === this.recType) {
                                // 资源类型过滤
                                if (this.mState !== "") {
                                    if (this.mState == ADList[i].mState) {
                                        let adObj = this.setTeblePlanList(
                                            ADList[i],
                                            i
                                        );
                                        planArr.list.push(adObj);
                                    } else {
                                        console.log("***");
                                    }
                                } else {
                                    let adObj = this.setTeblePlanList(
                                        ADList[i],
                                        i,
                                        n
                                    );
                                    planArr.list.push(adObj);
                                }
                            }
                            if (
                                i >= myIndex + 29 &&
                                ADList.length >= myIndex + 29 &&
                                planArr.list.length >= 29
                            ) {
                                this.CityPlanIndex[g].LIndex = i + 1;
                                this.listIndex = i + 1;
                                console.log("滚动加载方案选点列表", planArr);
                                this.addListPush(planArr);
                                break;
                            } else {
                                if (i >= ADList.length - 1) {
                                    this.CityPlanIndex[g].LIndex = i + 1;
                                    this.listIndex = i + 1;
                                    console.log(
                                        "滚动加载方案选点列表小于29",
                                        planArr
                                    );
                                    this.addListPush(planArr);
                                }
                            }
                        }
                    }
                }
            }
        },
        // addADList完成push动作
        addListPush(addData) {
            let addList = addData;
            console.log("addListPush滚动增加的数据", addList);
            let rid = this.city[this.activeIndex].rid;
            if (rid === addList.rid) {
                let tempArr = addList.list;
                for (let j = 0; j < tempArr.length; j++) {
                    this.planList.push(tempArr[j]);
                }
            }
            this.judgeByselect("scoll");
            this.copyPlanList = this.planList;
        },
        // 切换媒体状态--监听滚动，每次曾加30条数据
        addADList_mState() {
            // beforADList_mState
            let beforADList = this.beforADList_mState;
            let index = this.mStateIndex;
            console.log(index, "beforADList", beforADList);
            let arr_mState = [];
            for (let i = index; i < beforADList.length; i++) {
                if (beforADList[i].resType === this.recType) {
                    // 资源类型过滤
                    let adObj = this.setTeblePlanList(beforADList[i], i);
                    arr_mState.push(adObj);
                    if (
                        beforADList.length >= index + 29 &&
                        i >= index + 29 &&
                        arr_mState.length >= 29
                    ) {
                        this.mStateIndex = i + 1;
                        break;
                    } else {
                        if (i >= beforADList.length - 1) {
                            this.mStateIndex = i + 1;
                            console.log(
                                "媒体状态-滚动加载时列表小于index + 49",
                                arr_mState
                            );
                        }
                    }
                }
            }
            let tempArr = this.planList;
            console.log("切换媒体状态--监听滚动arr_mState", arr_mState);
            for (let data of arr_mState) {
                tempArr.push(data);
            }
            this.planList = tempArr;
            console.log("媒体状态-滚动加载完成", this.planList);
            this.judgeByselect("scoll");
        },
        //获取mouseEnter屏幕时的坐标像素
        mouseEnter(row, column, cell, event) {
            let e = event || window.event;
            this.shopXY.y = e.clientY;
            // console.log('this.shopXY.y',this.shopXY.y)
        },
        // 行选中打钩
        handleSelect(selection, row) {
            if (!row.checkBox.B && !row.checkBox.A) {
                if (!row.box.A && row.box.B) {
                    row.checkBox.A = true;
                } else if (!row.box.B && row.box.A) {
                    row.checkBox.B = true;
                } else {
                    // 前提条件AB都可选
                    // Math.floor(Math.random()*2 + 1)
                    let num = Math.floor(Math.random() * 10); // 0-9
                    console.log("随机生成的数字", num);
                    if (num % 2) {
                        // 偶数勾选A,奇数勾选B
                        row.checkBox.A = true;
                    } else {
                        row.checkBox.B = true;
                    }
                }
                this.shopShow_hide(); // 动画效果
                this.AddShopingInfo(row); // 添加到购物车
            } else if (row.checkBox.A || row.checkBox.B) {
                if (row.checkBox.A && row.checkBox.B) {
                    this.badgeNumber -= 2;
                } else {
                    this.badgeNumber--;
                }
                this.deleteShopRow(row, "AB");
                row.checkBox.A = false;
                row.checkBox.B = false;
            } else {
                row.checkBox.A = false;
            }
        },
        // 选中A、B面的时候
        changeA(row) {
            let check = row;
            if (check.checkBox.A === true || check.checkBox.B === true) {
                this.$refs.multipleTable.toggleRowSelection(check, true);
                if (check.checkBox.A) {
                    this.shopShow_hide(); // 动画效果
                    this.AddShopingInfo(row, "A"); // 添加到购物车
                } else {
                    // A、B都勾选的时候
                    this.deleteShopRow(check, "A");
                    this.badgeNumber--;
                }
            } else {
                this.deleteShopRow(check, "A");
                this.$refs.multipleTable.toggleRowSelection(check, false);
                this.badgeNumber--;
            }
        },
        changeB(row) {
            let check = row;
            if (check.checkBox.A === true || check.checkBox.B === true) {
                this.$refs.multipleTable.toggleRowSelection(check, true);
                if (check.checkBox.B === true) {
                    this.shopShow_hide();
                    this.AddShopingInfo(row, "B"); // 添加到购物车
                } else {
                    // A、B都勾选的时候
                    this.deleteShopRow(check, "B");
                    this.badgeNumber--;
                }
            } else {
                this.$refs.multipleTable.toggleRowSelection(check, false);
                this.deleteShopRow(check, "B");
                this.badgeNumber--;
            }
        },
        //点击全选按钮
        handleSelectAll(selection) {
            // console.log('selection', selection)
            if (selection.length !== 0) {
                for (let i = 0; i < selection.length; i++) {
                    // 根据是否被占用去打勾
                    if (!selection[i].box.A) {
                        selection[i].checkBox.A = true;
                    }
                    if (!selection[i].box.B) {
                        selection[i].checkBox.B = true;
                    }
                }
                this.shopShow_hide("all");
                this.deleteShopRow(selection, "all"); // 全选时添加进购物篮
            } else {
                let shopingArr = this.shopingList;
                let planListCity = this.planList[0].city;
                this.resetPlanList(); // 重置当前planList的勾选
                for (let i = 0; i < shopingArr.length; ) {
                    if (planListCity === shopingArr[i].city) {
                        let crossIf = this.crossSchedules(
                            this.shopingList[i].schedules
                        );
                        if (crossIf) {
                            console.log("删除城市为：", planListCity);
                            // this.deleteRow(shopingArr[i],'delAll')
                            this.selectAlldelRow(shopingArr[i]); // 取消全勾选时的购物车删除
                        } else {
                            i++;
                        }
                    } else {
                        i++;
                    }
                    if (i >= shopingArr.length - 1) {
                        this.getBadeNumberByShopList();
                    }
                }
            }
        },
        // 下一步
        next() {
            if (this.active === 0) {
                this.submitForm("planForm");
                this.shopingList = [];
                this.badgeNumber = 0;
                this.limitName = "全部"; // 初始化广告限制
            } else if (this.active === 1) {
                if (this.badgeNumber !== 0) {
                    this.active++;
                    this.computeAuotation = this.$loading({
                        lock: true,
                        text: "努力计算ing",
                        spinner: "el-icon-loading",
                        background: "rgba(0, 0, 0, 0.7)"
                    });
                    this.getFA_remark(); // 获取原投放城市详情的备注信息，再去this.creatTab()、 this.getShopingCityName() 、this.computeCityDiffAsIdNum() 、this.quotationFun()
                } else {
                    this.$message({
                        message: "请选择点位",
                        type: "warning"
                    });
                }
            } else if (this.active === 2) {
                this.ADloading = this.$loading({
                    lock: true,
                    text: "加急保存中...",
                    spinner: "el-icon-loading",
                    background: "rgba(0, 0, 0, 0.7)"
                });
                this.SetADBFun(); // 创建方案
            }
            if (this.active > 3) {
                this.active = 0;
            }
        },
        // 上一步
        prev() {
            if (this.active === 2) {
                this.active--;
                let that = this;
                setTimeout(function() {
                    for (let j = 0; j < that.planList.length; j++) {
                        if (
                            that.planList[j].checkBox.A ||
                            that.planList[j].checkBox.B
                        ) {
                            that.$refs.multipleTable.toggleRowSelection(
                                that.planList[j],
                                true
                            );
                        }
                    }
                }, 0);
            } else {
                this.active--;
            }
            if (this.active < 1) {
                this.active = 0;
            }
        },
        // 表单验证
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.active++;
                    this.getAreaFun();
                    this.getAdList(); // 获取选点列表
                } else {
                    return false;
                }
            });
        },
        // 继续创建
        continueCreate() {
            this.$router.push("./createPlan");
        },
        changePrice(letter, info) {
            if (letter === "AD") {
                this.changeAD = true;
                this.ADchanger.rid = info.rid;
                this.ADchanger.GMDate = info.GMDate;
                this.ADchanger.reaPrice =
                    Math.floor(info.advertyPrice * 100) / 100;
            } else if (letter === "M") {
                this.changeMake = true;
                this.makeChange.rid = info.rid;
                this.makeChange.MReaPrice = info.makePrice;
            } else if (letter === "TP") {
                this.changeBill = true;
                this.totalChange.rid = info.rid;
                this.totalChange.cash = commaFormat.noComma(info.cash); //(info.cash).toFixed(2)
                this.totalChange.zyzh = commaFormat.noComma(info.zyzh); //(info.zyzh).toFixed(2)
                this.totalChange.other = commaFormat.noComma(info.other); //(info.other).toFixed(2)
                this.totalChange.total = commaFormat.noComma(info.total); //(info.total).toFixed(2)
                this.totalChange.remark = info.remark;
            }
        },
        //step3确认修改
        handleClose(letter) {
            // 'AD'为广告费修改，'M'为制作费修改, 'SM'为修改结算方式
            let QArr = this.quotation;
            if (letter === "AD") {
                if (this.ADchangerReaPrice === true) {
                    for (let i = 0; i < QArr.length; i++) {
                        if (QArr[i].rid === this.ADchanger.rid) {
                            // this.quotation[i].advertyPrice = ((this.quotation[i].tfl - this.ADchanger.GMDate) * (this.quotation[i].ADPrice / 7))
                            // this.quotation[i].GMDate = this.ADchanger.GMDate
                            if (this.ADchanger.GMDate != 0) {
                                let reg = /^[0-9]\d*$/;
                                if (
                                    this.ADchanger.GMDate >
                                    this.quotation[i].tfl
                                ) {
                                    this.ADchanger.GMDate = this.quotation[
                                        i
                                    ].GMDate;
                                    this.$message({
                                        message: "赠送(面·天)大于投放量",
                                        type: "warning"
                                    });
                                } else if (
                                    new RegExp(reg).test(
                                        this.ADchanger.GMDate
                                    ) === false
                                ) {
                                    // console.log('非数字')
                                    this.$message({
                                        message: "请输入正整数",
                                        type: "warning"
                                    });
                                } else {
                                    this.quotation[i].advertyPrice =
                                        (this.quotation[i].tfl -
                                            this.ADchanger.GMDate) *
                                        (this.quotation[i].ADPrice / 7);
                                    this.quotation[
                                        i
                                    ].GMDate = this.ADchanger.GMDate;

                                    console.log(
                                        "ADchanger.reaPrice",
                                        this.ADchanger.reaPrice
                                    );
                                    console.log(
                                        "quotation.advertyPrice",
                                        this.quotation[i].advertyPrice
                                    );
                                    console.log(
                                        "quotation.reaPrice",
                                        this.quotation[i].reaPrice
                                    );

                                    if (
                                        this.ADchanger.reaPrice ===
                                        this.quotation[i].reaPrice
                                    ) {
                                        // alert('2')
                                        this.ADchanger.reaPrice = this.quotation[
                                            i
                                        ].advertyPrice.toFixed(2);
                                        this.quotation[
                                            i
                                        ].reaPrice = this.quotation[
                                            i
                                        ].advertyPrice;
                                        this.quotation[i].discount =
                                            Math.round(
                                                this.quotation[i].advertyPrice /
                                                    this.quotation[i].oldPrice *
                                                    10000
                                            ) /
                                                100.0 +
                                            "%"; // 折扣百分比
                                        this.hideBox();
                                    } else if (
                                        this.ADchanger.reaPrice >
                                        this.quotation[i].advertyPrice
                                    ) {
                                        // alert('3')
                                        this.ADchanger.reaPrice =
                                            Math.floor(
                                                this.quotation[i].advertyPrice *
                                                    100
                                            ) / 100;
                                        this.$message({
                                            message: "大于原价格",
                                            type: "warning"
                                        });
                                    } else {
                                        this.quotation[
                                            i
                                        ].reaPrice = this.quotation[
                                            i
                                        ].advertyPrice;
                                        this.quotation[
                                            i
                                        ].advertyPrice = this.ADchanger.reaPrice;
                                        this.quotation[i].discount =
                                            Math.round(
                                                this.quotation[i].advertyPrice /
                                                    this.quotation[i].oldPrice *
                                                    10000
                                            ) /
                                                100.0 +
                                            "%"; // 折扣百分比
                                        this.hideBox();
                                    }
                                }
                            } else {
                                this.quotation[i].advertyPrice =
                                    (this.quotation[i].tfl -
                                        this.ADchanger.GMDate) *
                                    (this.quotation[i].ADPrice / 7);
                                this.quotation[
                                    i
                                ].GMDate = this.ADchanger.GMDate;

                                if (
                                    this.ADchanger.reaPrice >
                                    this.quotation[i].oldPrice
                                ) {
                                    this.ADchanger.reaPrice =
                                        Math.floor(
                                            this.quotation[i].advertyPrice * 100
                                        ) / 100;
                                    this.$message({
                                        message: "大于原价格",
                                        type: "warning"
                                    });
                                } else {
                                    this.quotation[
                                        i
                                    ].advertyPrice = this.ADchanger.reaPrice;
                                    this.quotation[i].reaPrice = this.quotation[
                                        i
                                    ].oldPrice;
                                    this.quotation[i].discount =
                                        Math.round(
                                            this.quotation[i].advertyPrice /
                                                this.quotation[i].oldPrice *
                                                10000
                                        ) /
                                            100.0 +
                                        "%"; // 折扣百分比
                                    this.hideBox();
                                }
                            }
                            // break
                            this.quotation[i].total =
                                Number(this.quotation[i].advertyPrice) +
                                Number(this.quotation[i].makePrice);
                            this.quotation[i].cash = this.quotation[i].total;
                            this.computeTotal();
                        }
                    }
                } else {
                    this.checkInput(this.ADchanger.reaPrice);
                }
            } else if (letter === "M") {
                // 制作费修改
                if (this.ADchangerReaPrice === true) {
                    for (let i = 0; i < QArr.length; i++) {
                        if (QArr[i].rid === this.makeChange.rid) {
                            if (
                                this.makeChange.MReaPrice >
                                this.quotation[i].MReaPrice
                            ) {
                                this.$message({
                                    message: "大于原价格",
                                    type: "warning"
                                });
                            } else {
                                this.quotation[i].makeDiscount =
                                    Math.round(
                                        this.makeChange.MReaPrice /
                                            this.quotation[i].MReaPrice *
                                            10000
                                    ) /
                                        100.0 +
                                    "%"; // 制作费折扣百分比
                                this.quotation[
                                    i
                                ].makePrice = this.makeChange.MReaPrice;
                                this.hideBox();
                            }
                            // break
                            this.quotation[i].total =
                                Number(this.quotation[i].advertyPrice) +
                                Number(this.quotation[i].makePrice);
                            this.quotation[i].cash = this.quotation[i].total;
                            this.computeTotal();
                        }
                    }
                } else {
                    this.checkInput(this.makeChange.MReaPrice);
                }
            } else if (letter === "TP") {
                // 修改结算方式
                if (
                    this.totalChangeCash &&
                    this.totalChangeZyzh &&
                    this.totalChangeOther
                ) {
                    for (let i = 0; i < QArr.length; i++) {
                        if (QArr[i].rid === this.totalChange.rid) {
                            // alert('1')
                            let total =
                                Number(this.totalChange.other) +
                                Number(this.totalChange.zyzh) +
                                Number(this.totalChange.cash);
                            console.log("total", total, this.totalChange.total);
                            if (total > this.totalChange.total) {
                                this.$message({
                                    message: "大于总价格",
                                    type: "warning"
                                });
                            } else {
                                this.totalChange.other =
                                    this.totalChange.total -
                                    (Number(this.totalChange.zyzh) +
                                        Number(this.totalChange.cash));
                                this.quotation[i].cash = Number(
                                    this.totalChange.cash
                                ); // Number(this.totalChange.cash).toFixed(2)
                                this.quotation[i].zyzh = Number(
                                    this.totalChange.zyzh
                                ); // Number(this.totalChange.zyzh).toFixed(2)
                                this.quotation[i].other = Number(
                                    this.totalChange.other
                                ); // Number(this.totalChange.other).toFixed(2)
                                this.quotation[
                                    i
                                ].remark = this.totalChange.remark;
                                this.computeTotal();
                                this.hideBox();
                            }
                            break;
                        }
                    }
                } else {
                    if (!this.totalChangeCash) {
                        this.checkCash(this.totalChange.cash);
                    } else if (!this.totalChangeZyzh) {
                        this.checkZyzh(this.totalChange.zyzh);
                    } else if (!this.totalChangeOther) {
                        this.checkOther(this.totalChange.other);
                    }
                }
            }
        },
        // 隐藏弹出框
        hideBox() {
            this.$message({
                message: "修改成功",
                type: "success"
            });
            this.changeBill = false;
            this.changeMake = false;
            this.changeAD = false;
        },
        // step3 获取方案的各投放城市的原备注信息
        getFA_remark() {
            let uid = this.sessionData.uID;
            console.log("用户uid", uid, ",方案id", this.editApid);
            api
                .getApi("/GetAPD", { uid: uid, apid: this.editApid })
                .then(res => {
                    console.log("获取pdid", res);
                    if (
                        res.data.SysCode === 100302 ||
                        res.data.MSG === "登陆超时"
                    ) {
                        this.computeAuotation.close();
                        this.loginTimeout();
                    } else {
                        let APDData = res.data;
                        if (APDData.length !== 0) {
                            //[{rid:440100,remark:''}] editApRemark
                            let arr = [];
                            for (let i = 0; i < APDData.length; i++) {
                                if (
                                    APDData[i].pdRemark === undefined ||
                                    APDData[i].pdRemark === null
                                ) {
                                    APDData[i].pdRemark = "";
                                }
                                let obj = {
                                    rid: APDData[i].rID,
                                    remark: APDData[i].pdRemark
                                };
                                arr.push(obj);
                            }
                            this.editApRemark = arr;
                        } else {
                            console.log("获取的pdid为空");
                        }
                        this.creatTab(); // 报价单tab
                        this.getShopingCityName(); // 获取购物车列表的城市名称及根据购物车列表城市获取不同排期的所有面数
                        this.computeCityDiffAsIdNum(); // 获取不同城市里相同点位的个数
                        this.quotationFun(); // 报价单计算
                    }
                });
        },
        // step3 creatTab
        creatTab() {
            let quotationArr = [];
            console.log("this.editApRemark", this.editApRemark);
            for (let i = 0; i < this.city.length; i++) {
                let quotationObj = {
                    city: this.city[i].rName,
                    rid: this.city[i].rid,
                    schedules: "", // 排期
                    SM: "", // 排期面数
                    GMDate: 0, // 赠送面.天
                    discount: "100%", // 广告费折扣
                    advertyPrice: 0, // 广告费
                    ADNumber: 0, // 广告画数量
                    makeDiscount: "100%", // 制作费折扣
                    MPrice: 100.0, // 制作费单价
                    reaPrice: 0, // 广告费每次修改前的价格
                    oldPrice: 0, //  广告费初始价格
                    MReaPrice: 0, // 制作费原价
                    makePrice: 0, // 制作费
                    ADPrice: 0, // 刊例价(面/周)
                    tfl: 0, //投放量
                    cash: 0, // 现金结算
                    zyzh: 0, // 资源置换
                    other: 0, // 其他费用
                    total: 0,
                    remark: ""
                };
                for (let n = 0; n < this.editApRemark.length; n++) {
                    if (quotationObj.rid == this.editApRemark[n].rid) {
                        quotationObj.remark = this.editApRemark[n].remark;
                    }
                }
                quotationArr.push(quotationObj);
                if (i >= this.city.length - 1) {
                    this.quotation = quotationArr;
                }
                // 从购物车列表获取排期及同一排期下的面数
                let shopingArr = this.shopingList;
                for (let j = 0; j < this.shopingList.length; j++) {
                    let shoping = this.shopingList[j];
                    // console.log('从购物车列表获取排期',shoping.schedules)
                    for (let t = 0; t < this.quotation.length; t++) {
                        if (shoping.city === this.quotation[t].city) {
                            if (
                                this.quotation[t].schedules.indexOf(
                                    shoping.schedules
                                ) === -1
                            ) {
                                // console.log('增加排期',shoping.schedules)
                                if (
                                    this.quotation[t].schedules == "" ||
                                    this.quotation[t].schedules == null
                                ) {
                                    this.quotation[t].schedules =
                                        shoping.schedules;
                                } else {
                                    this.quotation[t].schedules =
                                        this.quotation[t].schedules +
                                        "、" +
                                        shoping.schedules;
                                }
                            }
                        }
                    }
                }
            }
        },
        //获取购物车中的城市名
        getShopingCityName() {
            // shopListCity
            let cityList = [];
            for (let i = 0; i < this.shopingList.length; i++) {
                let list = this.shopingList[i];
                if (i === 0) {
                    cityList.push(list.city);
                } else {
                    let cityName = cityList.join("");
                    // console.log('wwwwwwwwwwwwwwww',cityName)
                    if (cityName.indexOf(list.city) === -1) {
                        cityList.push(list.city);
                    }
                }
                if (i >= this.shopingList.length - 1) {
                    // console.log('购物车城市列表', cityList)
                    this.shopListCity = cityList;
                    this.getPM_numByCityList();
                }
            }
        },
        // 根据购物车列表城市获取不同排期的所有面数
        getPM_numByCityList() {
            this.CSMList = [];
            for (let i = 0; i < this.shopListCity.length; i++) {
                for (let t = 0; t < this.quotation.length; t++) {
                    if (this.shopListCity[i] === this.quotation[t].city) {
                        // 购物车中对应城市的不同排期的所有面数
                        let q_schedulesArr = this.quotation[t].schedules.split(
                            "、"
                        );
                        for (let t = 0; t < q_schedulesArr.length; t++) {
                            let csm_obj = {
                                city: this.shopListCity[i],
                                schedules: q_schedulesArr[t],
                                mNum: ""
                            };
                            for (let j = 0; j < this.shopingList.length; j++) {
                                let list = this.shopingList[j];
                                if (
                                    list.schedules == q_schedulesArr[t] &&
                                    this.shopListCity[i] === list.city
                                ) {
                                    csm_obj.mNum++;
                                }
                                if (j >= this.shopingList.length - 1) {
                                    // console.log('获取不同排期的所有面数', csm_obj)
                                    this.CSMList.push(csm_obj);
                                }
                            }
                        }
                    }
                }
            }
            console.log("城市不同排期的所有面数", this.CSMList);
            for (let m = 0; m < this.quotation.length; m++) {
                let SM = "";
                for (let n = 0; n < this.CSMList.length; n++) {
                    if (this.CSMList[n].city === this.quotation[m].city) {
                        let schedulesList = this.CSMList[n].schedules.split(
                            "-"
                        );
                        let dayNum =
                            this.DateDiff(schedulesList[0], schedulesList[1]) +
                            1;
                        console.log(schedulesList, "排期天数", dayNum);
                        let weekAndDay = "";
                        if (dayNum < 7) {
                            weekAndDay = dayNum + "天";
                        } else if (dayNum % 7 === 0 && dayNum > 7) {
                            weekAndDay = dayNum / 7 + "周";
                        } else {
                            weekAndDay =
                                parseInt(dayNum / 7) + "周" + dayNum % 7 + "天";
                        }
                        if (SM === "" || SM === null || SM === undefined) {
                            SM =
                                this.CSMList[n].schedules +
                                "(" +
                                weekAndDay +
                                "," +
                                this.CSMList[n].mNum +
                                "面) ";
                        } else {
                            SM +=
                                this.CSMList[n].schedules +
                                "(" +
                                weekAndDay +
                                "," +
                                this.CSMList[n].mNum +
                                "面) ";
                        }
                    }
                }
                this.quotation[m].SM = SM;
            }
            // console.log('getPM_numByCityList排期信息',this.quotation)
        },
        // step3 报价单
        quotationFun() {
            let uid = this.sessionData.uID;
            api.getApi("/GetAdPrice", { uid: uid }).then(res => {
                console.log("刊例价信息", res);
                let ADPriceList = res.data; //SysCode: 100302, MSG: "登陆超时"
                if (
                    ADPriceList.SysCode === 100302 ||
                    ADPriceList.MSG === "登陆超时"
                ) {
                    this.computeAuotation.close();
                    this.loginTimeout();
                } else {
                    console.log("投放城市信息", this.planForm.throwCity);
                    // let throwCityList = this.planForm.throwCity
                    let quotation = this.quotation;
                    for (let i = 0; i < ADPriceList.length; i++) {
                        // 刊例价过滤
                        for (let j = 0; j < quotation.length; j++) {
                            // 投放城市过滤
                            let quotationObj = quotation[j];
                            for (let g = 0; g < this.shopListCity.length; g++) {
                                // 购物车里有的城市（选中点对应的城市）
                                if (
                                    ADPriceList[i].rID == quotationObj.rid &&
                                    this.shopListCity[g] === quotationObj.city
                                ) {
                                    // alert(ADPriceList[i].adPrice)
                                    let mDate = 0;
                                    let mNUm = 0;
                                    let csm_arr = this.CSMList;
                                    for (let t = 0; t < csm_arr.length; t++) {
                                        if (
                                            csm_arr[t].city ===
                                            quotationObj.city
                                        ) {
                                            let begin = csm_arr[
                                                t
                                            ].schedules.split("-")[0];
                                            let end = csm_arr[
                                                t
                                            ].schedules.split("-")[1];
                                            console.log(
                                                "begin",
                                                begin,
                                                ",end",
                                                end
                                            );
                                            let schedul =
                                                this.DateDiff(begin, end) + 1;
                                            console.log("schedul", schedul);
                                            mDate += schedul * csm_arr[t].mNum;
                                            mNUm += csm_arr[t].mNum;
                                        }
                                    }
                                    console.log(
                                        "this.commentMediaADNum",
                                        this.commentMediaADNum
                                    );
                                    for (
                                        let n = 0;
                                        n < this.commentMediaADNum.length;
                                        n++
                                    ) {
                                        if (
                                            quotationObj.rid ==
                                            this.commentMediaADNum[n].rid
                                        ) {
                                            console.log(
                                                "去除不同排期下相同的asid数！"
                                            );
                                            mNUm =
                                                mNUm -
                                                this.commentMediaADNum[n]
                                                    .commentNum;
                                        }
                                    }
                                    console.log(
                                        "天数mDate",
                                        mDate,
                                        ",面数mNUm",
                                        mNUm
                                    );
                                    console.log(
                                        ADPriceList[i].rName,
                                        "广告门价格为",
                                        ADPriceList[i].adPrice
                                    );
                                    // 广告费计算
                                    quotationObj.ADPrice =
                                        ADPriceList[i].adPrice / (100 * 2); //(ADPriceList[i].adPrice / (100 * 2)).toFixed(2)                     // 刊例价(面/周)
                                    console.log(
                                        "刊例价(面/周)",
                                        quotationObj.ADPrice
                                    );
                                    quotationObj.tfl = mDate; //this.badgeNumber * 14                                         // 投放量(面·天)
                                    console.log(
                                        "(quotationObj.tfl * (quotationObj.ADPrice / 7))",
                                        quotationObj.tfl *
                                            (quotationObj.ADPrice / 7)
                                    );
                                    quotationObj.reaPrice =
                                        quotationObj.tfl *
                                        (quotationObj.ADPrice / 7); //(quotationObj.tfl * (quotationObj.ADPrice / 7)).toFixed(2)        // 广告费总价
                                    console.log(
                                        quotationObj,
                                        "quotationObj.reaPrice",
                                        quotationObj.reaPrice
                                    );
                                    quotationObj.oldPrice =
                                        quotationObj.reaPrice; // 保存最初计算的价格

                                    quotationObj.advertyPrice =
                                        quotationObj.reaPrice;
                                    console.log(
                                        "广告费总价",
                                        quotationObj.advertyPrice
                                    );
                                    quotationObj.discount =
                                        Math.round(
                                            quotationObj.advertyPrice /
                                                quotationObj.reaPrice *
                                                10000
                                        ) /
                                            100.0 +
                                        "%"; // 广告费折扣百分比

                                    // 制作费计算
                                    quotationObj.ADNumber = mNUm; //this.badgeNumber                                           // 广告画数量
                                    quotationObj.MReaPrice =
                                        quotationObj.ADNumber *
                                        quotationObj.MPrice; // 制作费 = 广告画数量 * 制作费单价
                                    quotationObj.makePrice =
                                        quotationObj.MReaPrice;
                                    quotationObj.makeDiscount =
                                        Math.round(
                                            quotationObj.makePrice /
                                                quotationObj.MReaPrice *
                                                10000
                                        ) /
                                            100.0 +
                                        "%"; // 制作费折扣百分比

                                    quotationObj.total =
                                        Number(quotationObj.advertyPrice) +
                                        Number(quotationObj.makePrice); //(Number(quotationObj.advertyPrice) + Number(quotationObj.makePrice)).toFixed(2)
                                    quotationObj.cash = quotationObj.total;
                                    // 计算总价格
                                    this.computeTotal();
                                    this.computeAuotation.close(); // 计算完成关闭loading
                                }
                            }
                        }
                    }
                }
            });
            for (let n = 0; n < this.companyName.length; n++) {
                if (this.companyName[n].value === this.planForm.companyName) {
                    this.cName = this.companyName[n].label;
                }
            }
            this.getBand(); // 获取品牌
        },
        //计算总价格
        computeTotal() {
            this.totalPrice = 0;
            this.cash = 0;
            this.other = 0;
            this.zyzh = 0;
            for (let i = 0; i < this.quotation.length; i++) {
                this.totalPrice += this.quotation[i].total;
                this.cash = Number(this.cash) + Number(this.quotation[i].cash); //(Number(this.cash) + Number(this.quotation[i].cash)).toFixed(2) //cash
                this.other =
                    Number(this.other) + Number(this.quotation[i].other); //(Number(this.other) + Number(this.quotation[i].other)).toFixed(2)
                this.zyzh = Number(this.zyzh) + Number(this.quotation[i].zyzh); //(Number(this.zyzh) +  Number(this.quotation[i].zyzh)).toFixed(2)
            }
            if (this.other == 0 && this.zyzh == 0) {
                this.totalPrice = this.cash;
            }
        },
        // dialog购物筐的显示全选中后添加都购物车
        dialogVisible() {
            this.dialogTableVisible = true;
            this.computeMedia_AD();
        },
        // 添加到购物车
        AddShopingInfo(info, letter) {
            //  alert('1')
            console.log("选中的row信息", info);
            let selectInfo = {
                rid: info.rid,
                mID: info.mID,
                asIDs: info.asIDs,
                asLabs: info.asLabs,
                resName: info.resName,
                city: info.city,
                origin: info.origin,
                buildType: info.buildType,
                houseNum: info.houseNum,
                buildPrice: info.buildPrice,
                mediaName: info.mediaName,
                buildNum: info.buildNum,
                schedules: info.schedules,
                tradingArea: info.tradingArea,
                assetTag: info.assetTag,
                liveYear: info.liveYear,
                adLimit: info.adLimit,
                checkBox: { A: info.checkBox.A, B: info.checkBox.B }
            };
            let asLabsArr = selectInfo.asLabs.split(",");
            let asIDArr = selectInfo.asIDs.split(",");
            // console.log(letter)
            if (letter == "B") {
                //  alert('B')
                for (let n = 0; n < asLabsArr.length; n++) {
                    if (asLabsArr[n] === "B") {
                        // console.log('B', asIDArr[n])
                        selectInfo.asIDs = asIDArr[n];
                        // break
                    }
                }
                selectInfo.A_B = "B面";
                this.shopingList.push(selectInfo);
            } else {
                if (info.checkBox.B && letter !== "A") {
                    for (let n = 0; n < asLabsArr.length; n++) {
                        if (asLabsArr[n] === "B") {
                            // console.log('B', asIDArr[n])
                            selectInfo.asIDs = asIDArr[n];
                            // break
                        }
                    }
                    selectInfo.A_B = "B面";
                } else {
                    for (let n = 0; n < asLabsArr.length; n++) {
                        if (asLabsArr[n] === "A") {
                            // console.log('A', asIDArr[n])
                            selectInfo.asIDs = asIDArr[n];
                            // break
                        }
                    }
                    selectInfo.A_B = "A面";
                }
                this.shopingList.push(selectInfo);
            }
        },
        // 取消全选时的购物车删除
        selectAlldelRow(rows) {
            if (this.ADLockNum > 0) {
                this.ADLockNum -= 1;
            }
            for (let j = 0; j < this.shopingList.length; j++) {
                if (
                    this.shopingList[j].mID === rows.mID &&
                    this.shopingList[j].schedules === rows.schedules
                ) {
                    this.shopingList.splice(j, 1);
                    break;
                }
            }
        },
        // 购物车删除行
        deleteRow(rows, letter) {
            let deleteIf = false;
            //  console.log('购物车列表：',list)
            console.log("购物车删除行", rows);
            console.log("删除行id", rows.mID);
            if (this.planList.length > 0) {
                if (rows.city === this.planList[0].city) {
                    //判断删除的城市选点是否是当前选点列表的城市
                    for (let i = 0; i < this.planList.length; i++) {
                        if (rows.mID === this.planList[i].mID) {
                            console.log("相等的mID", rows.mID);
                            if (rows.A_B === "A面") {
                                this.planList[i].checkBox.A = false;
                                console.log(
                                    "取消行的 this.planList",
                                    this.planList[i]
                                );
                                if (!this.planList[i].checkBox.B) {
                                    //  alert('1')
                                    this.$refs.multipleTable.toggleRowSelection(
                                        this.planList[i],
                                        false
                                    );
                                }
                                console.log(
                                    "相等的mID的checkBox.A",
                                    this.planList[i].checkBox.A
                                );
                                // 删除
                                for (let j = 0; j < this.shopingList.length; ) {
                                    if (
                                        this.shopingList[j].mID === rows.mID &&
                                        this.shopingList[j].A_B == "A面" &&
                                        this.shopingList[j].schedules ===
                                            rows.schedules
                                    ) {
                                        this.shopingList.splice(j, 1);
                                        deleteIf = true;
                                        this.badgeNumber--;
                                        // break
                                    } else {
                                        j++;
                                    }
                                }
                            } else if (rows.A_B === "B面") {
                                this.planList[i].checkBox.B = false;
                                if (!this.planList[i].checkBox.A) {
                                    //  alert('2')
                                    this.$refs.multipleTable.toggleRowSelection(
                                        this.planList[i],
                                        false
                                    );
                                }
                                // 删除
                                for (let j = 0; j < this.shopingList.length; ) {
                                    if (
                                        this.shopingList[j].mID === rows.mID &&
                                        this.shopingList[j].A_B == "B面" &&
                                        this.shopingList[j].schedules ===
                                            rows.schedules
                                    ) {
                                        deleteIf = true;
                                        this.shopingList.splice(j, 1);
                                        this.badgeNumber--;
                                        // break
                                    } else {
                                        j++;
                                    }
                                }
                            }
                            break;
                        } else {
                        }
                    }
                } else {
                    console.log("不相同");
                    this.delereRowByTotal(rows);
                }
            }
            if (!deleteIf) {
                console.log("deleteIf", deleteIf);
                for (let j = 0; j < this.shopingList.length; ) {
                    if (
                        this.shopingList[j].mID === rows.mID &&
                        this.shopingList[j].A_B == rows.A_B &&
                        this.shopingList[j].schedules === rows.schedules
                    ) {
                        this.shopingList.splice(j, 1);
                        this.badgeNumber--;
                        // break
                    } else {
                        j++;
                    }
                }
            }
            if (letter !== "delAll") {
                this.computeMedia_AD(); // 统计购物车媒体数、面数
            }
        },
        // 当在购物车删除项不在当前选点列表（城市不同）时，去totalPlanList查找
        delereRowByTotal(rows) {
            let deleteIf = false;
            let totalList = this.totalPlanList;
            console.log("totalPlanList查找", totalList);
            for (let i = 0; i < totalList.length; i++) {
                if (totalList[i].list.length > 0) {
                    if (totalList[i].list[0].city === rows.city) {
                        deleteIf = true;
                        console.log("找到城市:", rows.city);
                        let childrenList = totalList[i].list;
                        for (let j = 0; j < childrenList.length; j++) {
                            if (rows.mID === childrenList[j].mID) {
                                console.log("找到mID", rows.mID);
                                if (rows.A_B == "A面") {
                                    childrenList[j].checkBox.A = false;
                                    console.log(
                                        "删除行的 childrenList",
                                        childrenList[j]
                                    );
                                    console.log(
                                        "相等的mID的checkBox.A",
                                        childrenList[j].checkBox.A
                                    );
                                    // 删除
                                    for (
                                        let t = 0;
                                        t < this.shopingList.length;
                                        t++
                                    ) {
                                        if (
                                            this.shopingList[t].mID ===
                                                rows.mID &&
                                            this.shopingList[t].A_B == "A面" &&
                                            this.shopingList[t].schedules ===
                                                rows.schedules
                                        ) {
                                            this.shopingList.splice(t, 1);
                                            this.badgeNumber--;
                                            break;
                                        }
                                    }
                                } else if (rows.A_B == "B面") {
                                    childrenList[j].checkBox.B = false;
                                    // 删除
                                    for (
                                        let t = 0;
                                        t < this.shopingList.length;
                                        t++
                                    ) {
                                        if (
                                            this.shopingList[t].mID ===
                                                rows.mID &&
                                            this.shopingList[t].A_B == "B面" &&
                                            this.shopingList[t].schedules ===
                                                rows.schedules
                                        ) {
                                            this.shopingList.splice(t, 1);
                                            this.badgeNumber--;
                                            break;
                                        }
                                    }
                                }
                                break;
                            }
                        }
                        break;
                    }
                }
            }
            if (!deleteIf) {
                console.log("deleteIf", deleteIf);
                for (let j = 0; j < this.shopingList.length; ) {
                    if (
                        this.shopingList[j].mID === rows.mID &&
                        this.shopingList[j].A_B == rows.A_B &&
                        this.shopingList[j].schedules === rows.schedules
                    ) {
                        this.shopingList.splice(j, 1);
                        this.badgeNumber--;
                        // break
                    } else {
                        j++;
                    }
                }
            }
        },
        // 取消勾时,删除购物车里对应的数据行
        deleteShopRow(row, letter) {
            if (letter === "all") {
                // 判断是否全选
                for (let i = 0; i < this.planList.length; i++) {
                    let info = this.planList[i];
                    for (let j = 0; j < 2; j++) {
                        let selectInfo = {
                            rid: info.rid,
                            mID: info.mID,
                            asIDs: info.asIDs,
                            asLabs: info.asLabs,
                            resName: info.resName,
                            city: info.city,
                            origin: info.origin,
                            buildType: info.buildType,
                            houseNum: info.houseNum,
                            buildPrice: info.buildPrice,
                            mediaName: info.mediaName,
                            buildNum: info.buildNum,
                            schedules: info.schedules,
                            tradingArea: info.tradingArea,
                            assetTag: info.assetTag,
                            liveYear: info.liveYear,
                            adLimit: info.adLimit,
                            checkBox: {
                                A: info.checkBox.A,
                                B: info.checkBox.B
                            },
                            box: { A: info.box.A, B: info.box.B }
                        };
                        let asLabsArr = selectInfo.asLabs.split(",");
                        let asIDArr = selectInfo.asIDs.split(",");
                        if (j === 0 && !selectInfo.box.A) {
                            //  alert('B')
                            selectInfo.A_B = "A面";
                            for (let n = 0; n < asLabsArr.length; n++) {
                                if (asLabsArr[n] === "A") {
                                    // console.log('A', asIDArr[n])
                                    selectInfo.asIDs = asIDArr[n];
                                    // break
                                }
                            }
                            this.shopingList.push(selectInfo);
                        } else if (j === 1 && !selectInfo.box.B) {
                            selectInfo.A_B = "B面";
                            for (let n = 0; n < asLabsArr.length; n++) {
                                if (asLabsArr[n] === "B") {
                                    // console.log('B', asIDArr[n])
                                    selectInfo.asIDs = asIDArr[n];
                                    // break
                                }
                            }
                            this.shopingList.push(selectInfo);
                        }
                    }
                }
            } else {
                for (let i = 0; i < this.planList.length; i++) {
                    if (row.mID === this.planList[i].mID) {
                        console.log("相等的mID", row.mID);
                        if (letter === "B") {
                            for (let j = 0; j < this.shopingList.length; j++) {
                                if (
                                    this.shopingList[j].mID === row.mID &&
                                    this.shopingList[j].A_B === "B面"
                                ) {
                                    let crossIf = this.crossSchedules(
                                        this.shopingList[j].schedules
                                    );
                                    if (crossIf) {
                                        this.shopingList.splice(j, 1);
                                        break;
                                    } else {
                                        console.log("购物车中不存在相同点位");
                                    }
                                    // this.shopingList.splice(j, 1)
                                    // break
                                }
                            }
                        } else if (letter === "A") {
                            for (let j = 0; j < this.shopingList.length; j++) {
                                if (
                                    this.shopingList[j].mID === row.mID &&
                                    this.shopingList[j].A_B === "A面"
                                ) {
                                    let crossIf = this.crossSchedules(
                                        this.shopingList[j].schedules
                                    );
                                    if (crossIf) {
                                        this.shopingList.splice(j, 1);
                                        break;
                                    } else {
                                        console.log("购物车中不存在相同点位");
                                    }
                                }
                            }
                        } else if (letter === "AB") {
                            console.log("this.shopingList", this.shopingList);
                            for (let j = 0; j < this.shopingList.length; ) {
                                if (this.shopingList[j].mID === row.mID) {
                                    let crossIf = this.crossSchedules(
                                        this.shopingList[j].schedules
                                    );
                                    if (crossIf) {
                                        this.shopingList.splice(j, 1);
                                    } else {
                                        console.log("购物车中不存在相同点位");
                                    }
                                    // this.shopingList.splice(j, 1)
                                } else {
                                    j++;
                                }
                            }
                        }
                        break;
                    }
                }
            }
        },
        //修改动画效果及显示隐藏
        shopShow_hide(all) {
            let R = this.shopXY.x;
            let T = this.shopXY.y;
            // console.log('Right:', R, ',Top:', T)
            let shopAnimate = document.getElementsByClassName("shopAnimate")[0];
            let animateAll = document.getElementsByClassName(
                "shopAnimateAll"
            )[0];

            shopAnimate.style.top = this.shopXY.y + "px";
            shopAnimate.style.right = this.shopXY.x + "px";

            animateAll.style.top = this.shopXY.y + "px";
            animateAll.style.right = this.shopXY.x - 140 + "px";
            let that = this;
            if (all === "all") {
                this.selectAll = true;
                $(".shopAnimateAll").animate(
                    {
                        right: "37px",
                        top: "77px",
                        width: "18px",
                        height: "18px"
                    },
                    700,
                    function() {
                        $(".shopAnimateAll").css({
                            top: T,
                            right: R,
                            width: "790px",
                            height: "386px"
                        });
                        that.selectAll = false;
                        that.getBadeNumberByShopList();
                    }
                );
            } else {
                this.shoppingShow = true;
                $(".shopAnimate").animate(
                    {
                        right: "37px",
                        top: "77px",
                        width: "18px",
                        height: "18px"
                    },
                    700,
                    function() {
                        $(".shopAnimate").css({
                            top: T,
                            right: R,
                            width: "650px",
                            height: "49px"
                        });
                        that.shoppingShow = false;
                        that.badgeNumber++;
                    }
                );
            }
        },
        // 根据购物车列表的行数确定badgeNumber  shopingList
        getBadeNumberByShopList() {
            this.badgeNumber = this.shopingList.length;
        },
        // 修改搜索中的媒体状态
        mStateChange(val) {
            this.limitName = "全部"; // 初始化广告限制
            let state = val;
            // let beforAD = ''
            if (state !== "不限") {
                this.mStateIndex = 0;
                this.scroll_mState = true;
                let index = this.activeIndex;
                let beforAD = this.beforADTotalList[index].list;
                if (this.searchInput !== "") {
                    console.log("this.firstLevelData", this.firstLevelData);
                    beforAD = this.filterResOrigin(beforAD); // 搜索框不为空则过滤
                }
                let ADList_mState = this.filter_mState(beforAD); // 媒体状态过滤
                console.log("媒体状态过滤", ADList_mState);
                this.beforADList_mState = ADList_mState;
                let mStateList = this.setData_mState(ADList_mState);
                if (this.mState == 1 && this.recType === 1) {
                    this.loadScroll = true;
                } else if (this.mState == 2 || this.recType === 2) {
                    this.loadScroll = false;
                }
                this.planList = mStateList;
            } else {
                this.scroll_mState = false;
                this.mState = "";
                console.log(
                    "修改搜索中的媒体状态",
                    this.activeCityData,
                    this.activeIndex
                );
                this.activeCity(this.activeCityData, this.activeIndex);
            }
        },
        // 媒体状态过滤
        filter_mState(dataInfo) {
            console.log("触发filter_mState", dataInfo);
            let tempList = [];
            let mStateType = this.mState;
            let dataList = dataInfo;
            console.log(
                "this.mState数据类型:",
                typeof this.mState,
                this.mState
            );
            for (let i = 0; i < dataList.length; i++) {
                let mState = "";
                if (dataList[i].mState === "待安装") {
                    mState = 2;
                } else if (dataList[i].mState === "正常") {
                    mState = 1;
                } else {
                    mState = dataList[i].mState;
                }
                if (mState == mStateType) {
                    tempList.push(dataList[i]);
                } else {
                    console.log("***媒体状态filter***");
                }
            }
            return tempList;
        },
        // 切换媒体状态后，设置数据
        setData_mState(dataInfo) {
            let dataList = dataInfo;
            let ADList = [];
            let myIndex = this.mStateIndex;
            for (let i = 0; i < dataList.length; i++) {
                if (dataList[i].resType == this.recType) {
                    let tempObj = this.setTeblePlanList(dataList[i], i);
                    ADList.push(tempObj);
                    if (
                        dataList.length >= 49 &&
                        i >= myIndex + 49 &&
                        ADList.length >= myIndex + 49
                    ) {
                        this.mStateIndex = i + 1;
                        break;
                    } else {
                        if (i >= dataList.length - 1) {
                            this.mStateIndex = i + 1;
                            console.log(
                                "媒体状态-滚动加载时列表小于49",
                                ADList
                            );
                        }
                    }
                }
            }
            console.log("媒体状态-滚动加载时下标", this.mStateIndex);
            return ADList;
        },
        //step2搜索按钮
        searchFun() {
            console.log("搜索排期时间", this.dateInput);
            this.limitName = "全部"; // 初始化广告限制
            this.recType = 1;
            this.areaName = "全市";
            this.getAdList("search"); // 根据时间段获取被占点位，并重组选点列表
        },
        //step2地图选点
        mapAD() {
            // let apid = sessionStorage.getItem("plan_apid")
            // let tempwindow=window.open()
            // tempwindow.location = 'https://www.dituwuyou.com/qinlin/embed?mid=FPcrNHyq3xXFZDbqlTyHKA&token=fp3nxsKCYZzOSnU0KosEq0GA1o1qcKh5XLA&myid=' + apid
            // api.getApi('/EncryptNo', {num: apid}).then(res => {
            //   console.log('加密后的apid', res.data)
            //   apid = res.data.EncryptCode
            //   window.open('https://www.dituwuyou.com/qinlin/embed?mid=xIze7Knb4FooG_GgRFSA2Q&token=gvaH2e0TXevVmExv-iL43i7Lq9eZYOnhSqU&myid=' + apid,
            //     '_blank', 'toolbar=yes, menubar=yes, scrollbars=yes, resizable=yes, location=yes, status=yes')
            // }).catch(err => {
            //   console.log('error', err)
            // })
            console.log("地图选点提交的rid", this.activeCityData);
            let rid = this.activeCityData.rid;
            this.mapParams = {
                rid: rid,
                city: this.activeCityData.rName,
                ls: this.dateInput[0],
                le: this.dateInput[1]
            };
            let params = {
                uid: this.sessionData.uID,
                rid: rid,
                act: 1,
                ls: this.dateInput[0],
                le: this.dateInput[1]
            };
            console.log("生成地图MapID参数", params);
            let tempwindow = window.open();
            api
                .getApi("/GetMapInfo", params)
                .then(res => {
                    console.log("GetMapInfo地图mapid返回的信息", res);
                    if (!res.data.SysCode) {
                        let mapid = res.data.MapID;
                        this.dialogTableVisible = true;
                        this.getMapADBtn = true;
                        // window.open('https://www.dituwuyou.com/qinlin/embed?mid=FPcrNHyq3xXFZDbqlTyHKA&token=fp3nxsKCYZzOSnU0KosEq0GA1o1qcKh5XLA&mapid=' + mapid ,
                        //   '_blank', 'toolbar=yes, menubar=yes, scrollbars=yes, resizable=yes, location=yes, status=yes')
                        // let tempwindow = window.open()
                        tempwindow.location =
                            "https://www.dituwuyou.com/qinlin/embed?mid=FPcrNHyq3xXFZDbqlTyHKA&token=fp3nxsKCYZzOSnU0KosEq0GA1o1qcKh5XLA&mapid=" +
                            mapid;
                    } else {
                        tempwindow.close();
                        if (
                            res.data.SysCode === 100302 ||
                            res.data.MSG === "登陆超时"
                        ) {
                            this.loginTimeout(); // 登陆超时
                        } else {
                            Message({
                                message: res.data.MSG + ",请尝试重新点击",
                                type: "warning"
                            });
                        }
                    }
                })
                .catch(err => {
                    console.log("error", err);
                });
        },
        //计算天数差的函数，通用
        DateDiff(sDate1, sDate2) {
            //sDate1和sDate2是2002.12.18格式
            let aDate, oDate1, oDate2, iDays;
            aDate = sDate1.split(".");
            oDate1 = new Date(aDate[1] + "/" + aDate[2] + "/" + aDate[0]); //转换为12-18-2002格式
            aDate = sDate2.split(".");
            oDate2 = new Date(aDate[1] + "/" + aDate[2] + "/" + aDate[0]);
            iDays = Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24;
            return iDays;
        },
        // 数组排序，城市rid从小到大排
        compareFun(obj1, obj2) {
            let val1 = obj1.rid;
            let val2 = obj2.rid;
            if (val1 < val2) {
                return -1;
            } else if (val1 > val2) {
                return 1;
            } else {
                return 0;
            }
        },
        // 数组排序，城市区域按rid从小到大排
        compareArea(obj1, obj2) {
            let val1 = obj1[0].rID;
            let val2 = obj2[0].rID;
            if (val1 < val2) {
                return -1;
            } else if (val1 > val2) {
                return 1;
            } else {
                return 0;
            }
        },
        // 数组排序,对uWho进行小到大排
        compareUWho(obj1, obj2) {
            let val1 = obj1;
            let val2 = obj2;
            if (val1 < val2) {
                return -1;
            } else if (val1 > val2) {
                return 1;
            } else {
                return 0;
            }
        },
        // 资源名称\商圈搜索typeSelect
        ResOriginSearch(letter) {
            this.loading = true;
            if (letter === "search") {
                this.loadScroll = true;
            } else {
                this.loadScroll = false;
            }
            let empty = false;
            let arr = [];
            let index = this.activeIndex;
            console.log(index, ",beforPlanList", this.beforADTotalList);
            let BPL = this.beforADTotalList[index].list;
            if (this.searchInput === "") {
                arr = this.copyPlanList;
                empty = true;
            } else {
                for (let i = 0; i < BPL.length; i++) {
                    if (this.selectValue === "资源名称") {
                        if (BPL[i].resName.includes(this.searchInput)) {
                            arr.push(BPL[i]);
                        }
                    } else if (this.selectValue === "商圈") {
                        if (BPL[i].tradingArea.includes(this.searchInput)) {
                            arr.push(BPL[i]);
                        }
                    } else if (this.selectValue === "资产编号") {
                        if (
                            BPL[i].assetTag !== undefined &&
                            BPL[i].assetTag.includes(this.searchInput)
                        ) {
                            arr.push(BPL[i]);
                        }
                    }
                }
            }
            if (!empty) {
                this.firstLevelSearch = true;
                let planArr = [];
                if (arr.length !== 0) {
                    for (let n = 0; n < arr.length; n++) {
                        if (this.recType === arr[n].resType) {
                            if (this.mState !== "") {
                                if (this.mState == arr[n].mState) {
                                    let adObj = this.setTeblePlanList(
                                        arr[n],
                                        n
                                    );
                                    planArr.push(adObj);
                                } else {
                                    console.log("***");
                                }
                            } else {
                                let adObj = this.setTeblePlanList(arr[n], n);
                                planArr.push(adObj);
                            }
                        }
                        if (n >= arr.length - 1) {
                            this.planList = planArr;
                            this.judgeByselect("firstLevel");
                        }
                    }
                } else {
                    this.loadScroll = true;
                    Message({
                        type: "warning",
                        message: "暂时搜索不到数据"
                    });
                }
            } else {
                this.planList = arr;
            }
            this.loading = false;
        },
        // 住户数量过滤
        tableHeaderFilter_h() {
            let FADLIndex = this.activeIndex;
            let levelData = this.beforADTotalList[FADLIndex].list;
            let keyword = this.houseNum;
            let arr = [];
            for (let data of levelData) {
                if (keyword[0] !== "" && keyword[1] !== "") {
                    if (data.hNum >= keyword[0] && data.hNum <= keyword[1]) {
                        console.log("h");
                        arr.push(data);
                    }
                } else {
                    arr = levelData;
                    break;
                }
            }
            console.log("住户数量过滤", arr);
            return arr;
        },
        // 楼盘价格过滤
        tableHeaderFilter_p() {
            let filterData = "";
            let keyword = this.buildPrice;
            let arr = [];
            if (this.houseNum[0] !== "" && this.houseNum[1] !== "") {
                filterData = this.tableHeaderFilter_h();
            } else {
                let FADLIndex = this.activeIndex;
                filterData = this.beforADTotalList[FADLIndex].list;
            }
            for (let data of filterData) {
                if (keyword[0] !== "" && keyword[1] !== "") {
                    if (
                        data.hPrice / 100 >= keyword[0] &&
                        data.hPrice / 100 <= keyword[1]
                    ) {
                        console.log("p");
                        arr.push(data);
                    }
                } else {
                    arr = filterData;
                    break;
                }
            }
            console.log("楼盘价格过滤", arr);
            return arr;
        },
        // 年份过滤
        tableHSearch() {
            this.planList = [];
            this.loading = true;
            let filterData = "";
            let keyword = this.liveYear;
            let arr = [];
            if (
                (this.buildPrice[0] === "" || this.buildPrice[1] === "") &&
                (this.houseNum[0] === "" || this.houseNum[1] === "") &&
                (this.liveYear[0] === "" || this.liveYear[1] === "") &&
                (this.buildValue === "全部" || this.buildValue === "")
            ) {
                console.log(
                    "tableHSearch时过滤条件无效时，回调activeCity方法",
                    this.activeCityData,
                    this.activeIndex
                );
                this.activeCity(this.activeCityData, this.activeIndex);
                this.loading = false;
                return;
            }
            if (
                (this.buildPrice[0] !== "" && this.buildPrice[1] !== "") ||
                (this.houseNum[0] !== "" && this.houseNum[1] !== "")
            ) {
                filterData = this.tableHeaderFilter_p();
            } else {
                let FADLIndex = this.activeIndex;
                filterData = this.beforADTotalList[FADLIndex].list;
            }
            for (let data of filterData) {
                if (keyword[0] !== "" && keyword[1] !== "") {
                    let yearDay = data.chDay.split("年")[0];
                    if (yearDay >= keyword[0] && yearDay <= keyword[1]) {
                        console.log("y");
                        arr.push(data);
                    }
                } else {
                    arr = filterData;
                    break;
                }
            }
            console.log("入住年份过滤", arr);
            this.HSearch = "";
            if (this.searchInput !== "" && this.searchInput !== null) {
                // 搜索框不为空时，进行搜索框过滤
                arr = this.filterResOrigin(arr);
            }
            if (this.buildValue !== "全部" && this.buildValue !== "") {
                arr = this.filter_cType(arr);
            }
            let tempList = [];
            console.log(typeof this.recType, "资源类型", this.recType);
            console.log(typeof this.mState, "媒体状态", this.mState);
            console.log("城市区域", this.areaName);
            for (let i = 0; i < arr.length; i++) {
                if (this.recType === arr[i].resType) {
                    // 资源类型过滤
                    if (this.mState !== "" && this.areaName !== "全市") {
                        if (
                            this.mState == arr[i].mState &&
                            this.areaName === arr[i].rName
                        ) {
                            let tempObj = this.setTeblePlanList(arr[i], i);
                            tempList.push(tempObj);
                        } else {
                            console.log(
                                "媒体状态或城市区域不符",
                                arr[i].mState,
                                arr[i].rName
                            );
                        }
                    } else if (this.mState !== "" && this.areaName === "全市") {
                        if (this.mState == arr[i].mState) {
                            let tempObj = this.setTeblePlanList(arr[i], i);
                            tempList.push(tempObj);
                        } else {
                            console.log("媒体状态不符", arr[i].mState);
                        }
                    } else if (this.mState === "" && this.areaName !== "全市") {
                        if (this.areaName === arr[i].rName) {
                            let tempObj = this.setTeblePlanList(arr[i], i);
                            tempList.push(tempObj);
                        } else {
                            console.log("城市区域不符", arr[i].rName);
                        }
                    } else {
                        let tempObj = this.setTeblePlanList(arr[i], i);
                        tempList.push(tempObj);
                    }
                } else {
                    console.log("资源类型不符", arr[i].resType);
                }
            }
            this.loadScroll = false;
            console.log("头部过滤得到的数据", tempList);
            this.planList = tempList;
            this.loading = false;
        },
        // 楼盘类型过滤
        filter_cType(data) {
            let filterData = data;
            let returnData = [];
            for (let val of filterData) {
                if (val.cType === this.buildValue) {
                    returnData.push(val);
                } else {
                    console.log("楼盘类型不符", val.cType);
                }
            }
            console.log("楼盘类型过滤得到的数据", returnData);
            return returnData;
        },
        emptyFun(letter) {
            // 清空
            if (letter === "H") {
                this.houseNum = ["", ""];
            } else if (letter === "B") {
                this.buildNum = ["", ""];
            } else if (letter === "P") {
                this.buildPrice = ["", ""];
            } else if (letter === "Y") {
                this.liveYear = ["", ""];
            }
        },
        haveFocus(l) {
            this.HSearch = l;
        },
        // 购物车-获取地图选择的点位列表
        getMapADList() {
            console.log("触发获取地图选点信息click");
            api.getApi("/SendMap", { uid: this.sessionData.uID }).then(res => {
                console.log("地图选点", res);
                // this.setShopDataByMapAD()
                if (!res.data.SysCode && res.data !== "") {
                    this.mapADList = res.data;
                    this.setShopDataByMapAD();
                } else {
                    if (
                        res.data.SysCode === 100302 ||
                        res.data.MSG === "登陆超时"
                    ) {
                        this.loginTimeout();
                    } else {
                        Message({
                            message: "无法获取到数据",
                            type: "warning"
                        });
                    }
                }
            });
        },
        // 根据地图选点返回的数据，设置成购物车所需的数据格式
        setShopDataByMapAD() {
            console.log("执行了setShopDataByMapAD", this.mapADList);
            let mapADList_ = this.mapADList; // tempData
            let tempArr = [];
            for (let data of mapADList_) {
                for (let i = 0; i < 2; i++) {
                    let ADInfo = {
                        mID: data.mID,
                        resType: data.resType,
                        asIDs: data.asIDs,
                        asLabs: data.asLabs,
                        resName: data.resName,
                        city: this.mapParams.city,
                        origin: data.rName,
                        buildType: data.cType,
                        houseNum: data.hNum,
                        buildPrice: data.hPrice / 100,
                        mediaName: data.mTitle,
                        buildNum: data.fNum,
                        schedules: this.mapParams.ls + "-" + this.mapParams.le,
                        tradingArea: data.tradingArea,
                        assetTag: data.assetTag,
                        liveYear: data.chDay,
                        adLimit: data.notPush || "",
                        checkBox: { A: false, B: false }
                    };
                    let asLabsArr = ADInfo.asLabs.split(",");
                    let asIDArr = ADInfo.asIDs.split(",");
                    for (let n = 0; n < asLabsArr.length; n++) {
                        if (i === 0 && asLabsArr[n] === "A") {
                            ADInfo.checkBox.A = true;
                            ADInfo.A_B = "A面";
                            ADInfo.asIDs = asIDArr[n];
                            if (this.judgeHaveDiffAD(ADInfo)) {
                                tempArr.push(ADInfo);
                                break;
                            }
                        } else if (i === 1 && asLabsArr[n] === "B") {
                            ADInfo.checkBox.B = true;
                            ADInfo.A_B = "B面";
                            ADInfo.asIDs = asIDArr[n];
                            if (this.judgeHaveDiffAD(ADInfo)) {
                                tempArr.push(ADInfo);
                                break;
                            }
                        }
                    }
                }
            }
            console.log(
                "根据地图选点返回的数据，设置成购物车所需的数据格式",
                tempArr
            );
            if (this.shopingList.length !== 0) {
                for (let key of tempArr) {
                    this.shopingList.push(key);
                }
            } else {
                this.shopingList = tempArr;
            }
            this.computeMedia_AD();
            this.getBadeNumberByShopList();
        },
        // 判断点位是否已存在购物车
        judgeHaveDiffAD(data) {
            let ADData = data;
            let shopArr = this.shopingList;
            console.log("点位是否已存在购物车", ADData);
            if (shopArr.length !== 0) {
                for (let i = 0; i < shopArr.length; i++) {
                    if (
                        ADData.mID === shopArr[i].mID &&
                        ADData.A_B === shopArr[i].A_B
                    ) {
                        console.log("相同mid,相同面", ADData);
                        let ADScheArr = ADData.schedules.split("-");
                        let shopScheArr = shopArr[i].schedules.split("-");
                        if (
                            shopScheArr[0] == ADScheArr[0] &&
                            shopScheArr[1] == ADScheArr[1]
                        ) {
                            return false;
                        } else if (
                            shopScheArr[0] < ADScheArr[0] &&
                            shopScheArr[1] >= ADScheArr[0]
                        ) {
                            return false;
                        } else if (
                            shopScheArr[0] > ADScheArr[0] &&
                            shopScheArr[0] < ADScheArr[1]
                        ) {
                            return false;
                        } else if (
                            shopScheArr[1] > ADScheArr[0] &&
                            shopScheArr[1] < ADScheArr[1]
                        ) {
                            return false;
                        } else if (
                            shopScheArr[0] <= ADScheArr[1] &&
                            shopScheArr[1] > ADScheArr[1]
                        ) {
                            return false;
                        } else {
                            return true;
                        }
                    }
                }
                return true;
            } else {
                return true;
            }
        },
        // 清空购物车
        clearShop() {
            this.$confirm("此操作将删除已选的所有数据, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    this.shopingList = [];
                    this.getBadeNumberByShopList();
                    this.computeMedia_AD();
                    let cityData = this.activeCityData;
                    console.log(
                        "cityData.rid",
                        cityData.rid,
                        ",this.totalPlanList",
                        this.totalPlanList
                    );
                    this.$message({
                        type: "success",
                        message: "删除成功!"
                    });
                    let that = this;
                    for (let i = 0; i < that.totalPlanList.length; i++) {
                        setTimeout(function() {
                            for (
                                let j = 0;
                                j < that.totalPlanList[i].list.length;
                                j++
                            ) {
                                that.totalPlanList[i].list[
                                    j
                                ].checkBox.A = false;
                                that.totalPlanList[i].list[
                                    j
                                ].checkBox.B = false;
                            }
                            if (that.totalPlanList[i].rid === cityData.rid) {
                                that.planList = that.totalPlanList[i].list;
                                for (let n = 0; n < that.planList.length; n++) {
                                    that.$refs.multipleTable.toggleRowSelection(
                                        that.planList[n],
                                        false
                                    );
                                }
                                console.log("this.planList", that.planList);
                            }
                        }, 10);
                    }
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },
        // 清空被占的点位
        clearADLock() {
            //this.shopingList
            this.$confirm("移除所有被占点位!", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                showClose: false,
                type: "warning "
            })
                .then(() => {
                    let list = this.shopingList;
                    let haveADLock = false;
                    for (let i = 0; i < list.length; ) {
                        if (list[i].lState === 1) {
                            list.splice(i, 1);
                            haveADLock = true;
                        } else {
                            i++;
                        }
                    }
                    if (haveADLock) {
                        this.$message({
                            type: "success",
                            message: "移除成功!"
                        });
                        this.getBadeNumberByShopList();
                        this.computeMedia_AD();
                    } else {
                        this.$message({
                            type: "warning",
                            message: "暂无被占点位"
                        });
                    }
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "取消成功"
                    });
                });
            this.ADLockNum = 0;
            this.resetPlanList();
        },
        // 统计购物车媒体数、面数
        computeMedia_AD() {
            let shopList = this.shopingList;
            console.log("购物车统计面数媒体数shopList", shopList);
            let mediaArr = [];
            let mediaAD = [];
            for (let i = 0; i < shopList.length; i++) {
                if (mediaArr.indexOf(shopList[i].mID) === -1) {
                    mediaArr.push(shopList[i].mID);
                } else {
                    // console.log('重复的asIDs是', shopList[i].mID)
                }
                if (mediaAD.indexOf(shopList[i].asIDs) === -1) {
                    mediaAD.push(shopList[i].asIDs);
                } else {
                    // console.log('重复的asIDs是', shopList[i].asIDs)
                }
            }
            // console.log('mediaArr', mediaArr)
            // console.log('mediaAD', mediaAD)
            this.shopMedia_ADNum.mediaNum = mediaArr.length;
            this.shopMedia_ADNum.ADNum = mediaAD.length;
        },
        // 统计购物车中相同城市不同排期的同一asids个数
        computeCityDiffAsIdNum() {
            console.log(
                "统计购物车中相同城市不同排期的同一asids个数",
                this.quotation,
                this.shopingList
            );
            let quoData = this.quotation;
            let shopList = this.shopingList;
            let mediaAD = [];
            for (let i = 0; i < quoData.length; i++) {
                let num = 0;
                let diffAD = [];
                for (let j = 0; j < shopList.length; j++) {
                    if (quoData[i].city === shopList[j].city) {
                        if (diffAD.indexOf(shopList[j].asIDs) === -1) {
                            diffAD.push(shopList[j].asIDs);
                            console.log("不重复");
                        } else {
                            console.log("重复的asIDs是", shopList[j].asIDs);
                            num++;
                        }
                    }
                }
                let obj = { rid: quoData[i].rid, commentNum: num };
                mediaAD.push(obj);
            }
            this.commentMediaADNum = mediaAD;
            console.log("this.commentMediaADNum", this.commentMediaADNum);
        },
        // 价格加上逗号
        priceFormat(price) {
            // console.log('price', price);
            return commaFormat.init(price);
        },
        // 获取品牌
        getBand() {
            for (let n = 0; n < this.companyBrand.length; n++) {
                if (this.companyBrand[n].value === this.planForm.companyBrand) {
                    this.cBand = this.companyBrand[n].label;
                }
            }
        },
        clearData() {
            Object.assign(this.$data, this.$options.data()); // vue data恢复初始化数据
        },
        // 时间格式规范
        formatTime(val) {
            return dateFormat.toDate(val, ".");
        },
        //取消编辑返回列表
        goBack() {
            this.$router.go(-1);
        },
        //根据编辑方案的apid获取选点排期
        getSetPoint() {
            // 真实数据
            let uid = this.sessionData.uID;
            let apid = sessionStorage.getItem("plan_apid");
            let info = { uid: uid, apid: apid };
            // let info = {uid: 3, apid: 77}
            api
                .getApi("/GetADB", info)
                .then(res => {
                    console.log("选点排期数据", res.data);
                    if (!res.data.SysCode) {
                        let resInfo = res.data;
                        // 当一个方案有账号权限外的城市不能进行编辑，需要进行剔除
                        let resultArr = this.getLimitCity(resInfo);
                        let shopList = [];
                        if (resultArr.length !== 0) {
                            for (let data of resultArr) {
                                this.$set(
                                    data,
                                    "city",
                                    areaArrToText.toTextCity(data.rID)
                                );
                                let time =
                                    this.formatTime(data.pbStar) +
                                    "-" +
                                    this.formatTime(data.pbEnd);
                                this.$set(data, "schedules", time); //.A_B
                                let checkBox = { A: false, B: false };
                                if (data.asLab === "A") {
                                    // console.log('A')
                                    this.$set(data, "A_B", "A面");
                                    checkBox.A = true;
                                } else if (data.asLab === "B") {
                                    // console.log('B')
                                    this.$set(data, "A_B", "B面");
                                    checkBox.B = true;
                                }
                                let selectInfo = {
                                    asID: data.asID,
                                    pbStar: data.pbStar,
                                    pbEnd: data.pbEnd,
                                    rID: data.rID,
                                    rid: data.rID,
                                    mID: data.mID,
                                    asIDs: data.asID,
                                    asLabs: data.asLab,
                                    resName: data.resName,
                                    city: data.city,
                                    origin: data.rName,
                                    buildType: data.cType,
                                    houseNum: data.hNum,
                                    buildPrice: data.hPrice,
                                    mediaName: data.mTitle,
                                    buildNum: data.fNum,
                                    schedules: data.schedules,
                                    tradingArea: data.tradingArea || "",
                                    assetTag: data.assetTag || "",
                                    liveYear: data.chDay,
                                    adLimit: data.adLimit || "",
                                    A_B: data.A_B,
                                    checkBox: { A: checkBox.A, B: checkBox.B }
                                };
                                shopList.push(selectInfo);
                            }
                            console.log("shoplist---------", shopList);
                            /* // 城市筛选过滤
               this.filterCityData = filterFormat(resInfo, "city")
               this.filtersArea = filterFormat(resInfo, "origin")
               this.filtersData = filterFormat(resInfo, "schedules")*/
                            this.checkLock(shopList);
                            console.log("购物车列表数据", this.shopingList);
                        } else {
                            this.shopingList = [];
                            this.shopLoading = false;
                            this.computeMedia_AD(); // 统计购物车媒体数和面数
                            this.getBadeNumberByShopList();
                            this.FanganInfoByApid(); //获取方案详情
                        }
                    } else {
                        Message.warning(res.data.MSG);
                    }
                })
                .catch(res => {
                    console.log(res);
                });
        },
        getLimitCity(resInfo) {
            let uWhoArr = this.sessionData.uWho;
            // 当一个方案有账号权限外的城市不能进行编辑，需要进行剔除
            let resultArr = [];
            if (uWhoArr == 0) {
                resultArr = resInfo;
            } else {
                for (let data of resInfo) {
                    data.rID = data.rID.toString().substring(0, 4) + "00";
                    if (uWhoArr.indexOf(data.rID) != -1) {
                        resultArr.push(data);
                    }
                }
            }
            console.log("resultArr----uwho-----", resultArr);
            return resultArr;
        },
        // 根据编辑方案的apid获取该方案的详情
        FanganInfoByApid() {
            let uid = this.sessionData.uID;
            this.editApid = sessionStorage.getItem("plan_apid");
            let info = { uid: uid, apid: this.editApid };
            api.getApi("/GetFanganInfo", info).then(res => {
                console.log("方案详情", res.data);
                if (!res.data.SysCode) {
                    this.FAInfo = res.data;
                    this.planName = this.FAInfo.apName;
                    this.cName = this.FAInfo.cName;
                    this.cBand = this.FAInfo.bTitle;
                    this.setCityAndArea(this.FAInfo.rIDs);
                } else {
                    Message.warning(res.data.MSG);
                }
            });
        },
        // 根据方案详情的rIDs，例如: "广州市,深圳市",构建城市区域
        setCityAndArea(citys) {
            let uWho = this.sessionData.uWho;
            if (uWho == "0") {
                let cityArr = citys.split(",");
                console.log("城市数组", cityArr);
                let cityList = [];
                for (let i = 0; i < cityArr.length; i++) {
                    let CityRid = areaArr.TextToCode(cityArr[i]);
                    let cityObj = { rName: cityArr[i], rid: CityRid };
                    cityList.push(cityObj);
                }
                this.city = cityList;
                this.city.sort(this.compareFun);
                this.activeCityData = this.city[0];
                console.log("构建城市", this.city);
                let areaList = [];
                for (let j = 0; j < cityList.length; j++) {
                    let area_Arr = areaArr.findArea(cityList[j].rid);
                    area_Arr.unshift({ rid: cityList[j].rid, rName: "全市" });
                    areaList.push(area_Arr);
                }
                this.area = areaList;
                console.log("构建城市区域", this.area);
                this.getAdList();
                this.cityOptions = areaArr.province();
            } else {
                let uWhoArr = uWho.split(","); // ['440100','110100','330100']
                uWhoArr.sort(this.compareUWho);
                let cityList = [];
                for (let j = 0; j < uWhoArr.length; j++) {
                    console.log("用户uWho", uWhoArr[j]);
                    areaToText.toText(data => {
                        console.log("22312", data);
                        let cityObj = { rName: data.city, rid: uWhoArr[j] };
                        cityList.push(cityObj);
                        if (j >= uWhoArr.length - 1) {
                            console.log("用户uWhocityList", cityList);
                            cityList = this.filterCity(cityList);
                            this.city = cityList;
                            this.city.sort(this.compareFun); // 排序
                            this.activeCityData = this.city[0]; // 设置默认显示可选点城市的信息
                            console.log("构建城市", this.city);
                            let areaList = [];
                            for (let j = 0; j < cityList.length; j++) {
                                let area_Arr = areaArr.findArea(
                                    cityList[j].rid
                                );
                                area_Arr.unshift({
                                    rid: cityList[j].rid,
                                    rName: "全市"
                                });
                                areaList.push(area_Arr);
                            }
                            this.area = areaList;
                            console.log("构建城市区域", this.area);
                            this.getAdList();
                            this.cityOptions = areaArr.province();
                        }
                    }, uWhoArr[j]);
                }
            }
        },
        // 根据用户权限与投放城市的交集，显示城市
        filterCity(cityData) {
            // this.FAInfo.rIDs
            let FA_rIDs_arr = this.FAInfo.rIDs.split(",");
            let uRID = cityData;
            let cityArr = [];
            for (let i = 0; i < uRID.length; i++) {
                for (let j = 0; j < FA_rIDs_arr.length; j++) {
                    if (uRID[i].rName == FA_rIDs_arr[j]) {
                        cityArr.push(uRID[i]);
                    }
                }
            }
            return cityArr;
        },
        // 当前行是否高亮
        tableRowClassName({ row }) {
            if (row.lState) {
                return "warning-row";
            } else {
                return "";
            }
        },
        // 添加是否被占的状态
        checkLock(tableData) {
            // uid         int【必填】         当前账户UserID
            // ds          String【必填】      广告开始投放日期
            // de          String【必填】      广告投放结束日期
            // asidlist    String【必填】      选择的广告点位asID组合，以","逗号组合
            //this.ADLockNum = 0
            let LockNum = 0;
            let resultArr = this.constructData(tableData);
            console.log("resultArr ------------", resultArr);
            let holdArr = [];
            for (let i = 0; i < resultArr.length; i++) {
                api.postApi("/CheckPD", resultArr[i]).then(res => {
                    console.log(res.data);
                    if (res.data.length) {
                        holdArr = holdArr.concat(res.data);
                    }
                    console.log("i-holdArr", i, holdArr);
                    if (i >= resultArr.length - 1) {
                        let hightArr = [];
                        let lowArr = [];
                        // 把被占的提前显示
                        for (let tab of tableData) {
                            this.$set(tab, "lState", 0);
                            for (let data of holdArr) {
                                if (data.asID == tab.asID) {
                                    this.$set(tab, "lState", 1);
                                    LockNum += 1;
                                }
                            }
                            if (tab.lState) {
                                hightArr.push(tab);
                            } else {
                                lowArr.push(tab);
                            }
                        }
                        tableData = hightArr.concat(lowArr);
                        console.log("tableData------------", tableData);

                        this.ADLockNum = LockNum; // 被占点位的个数
                        this.shopingList = tableData;
                        this.shopLoading = false;
                        this.computeMedia_AD(); // 统计购物车媒体数和面数
                        this.getBadeNumberByShopList();
                        this.FanganInfoByApid(); //获取方案详情
                    }
                });
            }
        },
        constructData(tableData) {
            // uid         int【必填】         当前账户UserID
            // ds          String【必填】      广告开始投放日期
            // de          String【必填】      广告投放结束日期
            // asidlist    String【必填】      选择的广告点位asID组合，以","逗号组合
            let resultArr = [];
            if (!resultArr.length) {
                let start = dateFormat.toDate(tableData[0].pbStar);
                let end = dateFormat.toDate(tableData[0].pbEnd);
                let obj = {
                    uid: this.sessionData.uID,
                    ds: start,
                    de: end,
                    asidlist: ""
                };
                resultArr.push(obj);
            }
            for (let res of resultArr) {
                let asIDs = "";
                for (let data of tableData) {
                    let start = dateFormat.toDate(data.pbStar);
                    let end = dateFormat.toDate(data.pbEnd);
                    let resobj = {
                        uid: this.sessionData.uID,
                        ds: start,
                        de: end,
                        asidlist: ""
                    };
                    if (res.ds == start && res.de == end) {
                        if (asIDs == "") {
                            asIDs = data.asID;
                        } else {
                            asIDs = asIDs + "," + data.asID;
                        }
                    } else {
                        let door = 1;
                        for (let init of resultArr) {
                            if (init.ds == start && init.de == end) {
                                door = 0;
                            }
                        }
                        if (door) {
                            resultArr.push(resobj);
                        }
                    }
                }
                res.asidlist = asIDs;
            }
            return resultArr;
        },
        shopingBeforeClose() {
            for (let j = 0; j < this.shopingList.length; j++) {
                if (this.shopingList[j].lState) {
                    Message.warning("请先删除完被占点位再进行其它操作");
                    break;
                }
                if (j >= this.shopingList.length - 1) {
                    console.log("退出购物车");
                    this.dialogTableVisible = !this.dialogTableVisible;
                    this.judgeByselect(); // 勾选已经选择的A、B面
                }
            }
            if (this.shopingList.length === 0) {
                this.dialogTableVisible = !this.dialogTableVisible;
            }
            this.computeMedia_AD();
        },
        // 编辑成功后查看方案
        ToDetail() {
            this.$router.push("./planDetail");
        },
        // 修改广告费和制作费的验证
        checkInput(value) {
            let reg = /[^\d\.]/g;
            if (value) {
                if (new RegExp(reg).test(value)) {
                    this.$message({
                        message: "请输入正确的数字",
                        type: "warning"
                    });
                    this.ADchangerReaPrice = false;
                } else {
                    this.ADchangerReaPrice = true;
                }
            }
            console.log("checkInput", this.ADchangerReaPrice);
        },
        // 修改结算方式的验证checkCash、checkZyzh、checkOther
        checkCash(val) {
            let reg = /[^\d\.]/g;
            if (val) {
                if (new RegExp(reg).test(val)) {
                    this.$message({
                        message: "现金金额只能为数字",
                        type: "warning"
                    });
                    this.totalChangeCash = false;
                } else {
                    this.totalChangeCash = true;
                }
            }
        },
        checkZyzh(val) {
            let reg = /[^\d\.]/g;
            if (val) {
                if (new RegExp(reg).test(val)) {
                    this.$message({
                        message: "请输入数字.",
                        type: "warning"
                    });
                    this.totalChangeZyzh = false;
                } else {
                    this.totalChangeZyzh = true;
                }
            }
        }, //checkOther
        checkOther(val) {
            let reg = /[^\d\.]/g;
            if (val) {
                if (new RegExp(reg).test(val)) {
                    this.$message({
                        message: "请输入数字..",
                        type: "warning"
                    });
                    this.totalChangeOther = false;
                } else {
                    this.totalChangeOther = true;
                }
            }
        },
        // 时间戳转换成日期格式 2018-06-18 10:33:24
        timestampToTime(timestamp) {
            let date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
            let Y = date.getFullYear() + "-";
            let M =
                (date.getMonth() + 1 < 10
                    ? "0" + (date.getMonth() + 1)
                    : date.getMonth() + 1) + "-";
            let D = date.getDate() + " ";
            let h = date.getHours() + ":";
            let m = date.getMinutes() + ":";
            let s = date.getSeconds();
            return Y + M + D + h + m + s;
        },
        // 登录超时
        loginTimeout() {
            this.$message({
                message: "登录超时或权限异常,请重新登录",
                type: "warning"
            });
            this.$router.push("/login");
        }
    }
};
</script>

<style scoped>
.mapBtn {
    width: 110px;
    text-align: center;
    display: inline-block;
    padding: 3px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.65);
    margin-bottom: 5px;
    cursor: pointer;
}

/deep/ .el-form--inline .el-form-item {
    margin-right: 7px !important;
}

/*状态行*/
/deep/ .el-table .warning-row {
    background: #fff1f1;
}

/deep/ .el-input__inner:hover {
    border-color: #dcdfe6;
}

/deep/ .el-select .el-input.is-focus .el-input__inner {
    border-color: #dcdfe6;
}

.inputNewTag /deep/ .el-input__inner {
    width: 140px !important;
}

.input-with-select /deep/ .el-input__inner {
    font-size: 14px;
    padding: 10px 10px;
    height: 34px;
    line-height: 14px;
}

/deep/ .el-input__inner {
    font-size: 14px;
    /*padding: 10px 10px;*/
    height: 34px;
    line-height: 14px;
}

.shopAnimate,
.shopAnimateAll {
    position: fixed;
    top: 574px;
    right: 170px;
    width: auto;
    height: auto;
    color: #fff;
    z-index: 1000;
}

/*面包屑导航*/
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
    margin-bottom: 145px;
    position: relative;
}

.mediaMana_content_top {
    padding: 42px 60px 0 60px;
}

.content_top_wrap,
.content_bottom_wrap {
    background: #ffffff;
    border: 1px solid #dedede;
    /*height: 830px;*/
    padding: 46px 18px 40px 18px;
}

.content_top_wrap .content_top_head {
    width: 100%;
    height: 35px;
    border-bottom: 1px solid #dedede;
}

.content_bottom_wrap .content_bottom_head {
    width: 100%;
    height: 35px;
    border-bottom: 1px solid #dedede;
}

.content_top_wrap .content_top_head h2,
.content_bottom_wrap .content_bottom_head h2 {
    font-family: PingFangSC-Semibold;
    font-size: 16px;
    color: #2c313c;
    font-weight: bold;
    padding-left: 16px;
    height: 24px;

    margin-top: 8px;
}

.content_top_wrap .content_top_form_wrap,
.content_bottom_wrap .content_bottom_form_wrap {
    padding: 18px;
    /*display: flex;
    justify-content: center;
    align-content: center;*/
}

/*按钮*/
.content_bottom_btn {
    width: 100%;
    position: absolute;
    bottom: -100px;
    margin-bottom: 22px;
    text-align: center;
    /* left: 45.3%; */
    /* display: flex;
     justify-content: center;
     align-items: center;*/
}

.content_bottom_btn button {
    width: 80px;
    height: 34px;
    outline: none;
    cursor: pointer;
}

.content_bottom_btn button.create {
    background: #108ee9;
    border-radius: 4px;
    font-size: 14px;
    border: none;
    color: #ffffff;
}

.content_bottom_btn button.cancel {
    background: #ffffff;
    font-size: 14px;
    color: #666666;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    margin-left: 10px;
}

/*下一步按钮*/

/deep/ .map.el-button--primary {
    background: #ff7721;
    border-color: #ff7721;
}

/deep/ .el-button--primary span {
    position: relative;
    left: -2px;
    top: -2px;
}

/*步骤条*/
/deep/ .el-step__title {
    position: relative;
    top: -35px;
    left: 39px;
}

/deep/ .el-step__title.is-process {
    font-size: 16px;
    color: #333333;
}

/deep/ .el-step.is-horizontal .el-step__line {
    height: 1px;
    top: 17px;
    left: 143px;
    right: 18px;
}

/deep/ .el-step__icon-inner {
    font-weight: normal;
}

/deep/ .el-step__icon.is-text {
    width: 32px;
    height: 32px;
    border: 1px solid;
}

/deep/ .is-process .el-step__icon.is-text {
    border: none;
    background-color: #108ee9;
    color: #fff;
}

/deep/ .el-step__head.is-success {
    color: #108ee9;
    border-color: #108ee9;
}

/deep/ .el-step__title.is-success {
    color: #666;
}

/deep/ .el-step__line-inner {
    border-width: 0px !important;
}

/deep/ .step-wrap {
    padding: 0 179px;
}

/*创建方案表单*/

.createPlan,
.step4 {
    /*display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;*/
}

/deep/ .el-form.demo-ruleForm {
    width: 416px;
    margin: 0 auto;
}

.el-input {
    width: 262px;
    height: 34px;
}

/deep/ .el-input__inner {
    width: 300px;
    height: 34px;
}

/deep/ .el-textarea__inner {
    width: 260px;
    height: 80px;
    resize: vertical;
}

/*选择点位*/
/deep/ .el-checkbox,
.el-checkbox__input {
}

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
}

/deep/ .el-button {
    width: 76px;
    height: 34px;
}

.searchInput /deep/ .el-input__inner,
.searchInput {
    width: 224px !important;
    position: relative;
    left: -8px;
    top: 0;
    height: 34px;
    line-height: 34px;
    /*border-left: none !important;*/
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
}

/deep/ .plan-select .el-input,
/deep/ .plan-select .el-input__inner {
    width: 215px;
    margin-left: -6px;
    line-height: 34px;
}

/deep/ .date-select.el-input__inner {
    /*width: 237px;*/
    position: relative;
    /*top: 3px;*/
    /*left: -5px;*/
}

/deep/ .plan-select /deep/ .el-input__suffix {
    right: 10px;
}

/*日期*/
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

/*.block {*/
/*display: inline-block;*/
/*margin-left: 2px;*/
/*position: relative;*/
/*!*top: 3px;*!*/
/*}*/

/*/deep/ .el-date-editor .el-range__icon {*/
/*position: relative;*/
/*!*top: -3px;*!*/
/*margin-right: 2px;*/
/*line-height: 14px;*/
/*}*/
/*/deep/ .el-range-separator{*/
/*position: relative;*/
/*top: 5px;*/
/*}*/
/*/deep/ .el-input__inner {*/
/*width: 260px;*/
/*height: 34px;*/
/*!*line-height: 34px;*!*/
/*}*/
/*/deep/ .el-date-editor .el-range__close-icon{*/
/*line-height: 28px;*/
/*}*/
/*/deep/ .el-range-editor .el-range-input{*/
/*line-height: 20px;*/
/*}*/

/deep/ .el-dialog__header {
    font-weight: 700;
}

.searchBtn,
.map {
    position: relative;
    /*top: 3px;*/
    left: 5px;
}

/deep/ .searchBtn .el-icon-search {
    position: relative;
    top: -2px;
    left: -9px;
}

/deep/ .el-button.searchBtn span {
    position: relative;
    left: -5px;
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
    height: 34px;
    /*position: relative;
    top: -1px;*/
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

.finishBtn /deep/ .el-button span {
    left: -8px;
}

.map {
    width: 76px;
    height: 34px;
    border: 1px solid #c2c2c2;
    border-radius: 4px;
    cursor: pointer;
    /*top: 3px;*/
    text-align: center;
    font-size: 14px;
    margin-left: 5px;
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
    height: 34px;
}

.search-wrap span {
    float: left;
    /*margin-left: 2px;*/
    margin-bottom: 30px;
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

.cart_box {
    color: #fff;
    background: #108ee9;
    border-radius: 50%;
    display: inline-block;
    width: 50px;
    height: 50px;
    vertial-align: middle;
    text-align: center;
    line-height: 50px;
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
    margin-top: 30px;
    padding: 10px 18px 0 18px;
}

.dw-panel dl {
    border-bottom: 1px dashed #d8d8d8;
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
    width: 55px;
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
    margin-left: 22px;
    position: relative;
    width: 212px;
    top: 4px;
}

.filter-input ul li:last-child {
    float: left;
    margin-left: 33px;
    position: relative;
    width: 189px;
    top: 5px;
    height: 20px;
}

/deep/ .buildType .el-input,
/deep/ .buildType .el-input__inner {
    width: 95px;
    height: 30px;
    position: relative;
    top: -3px;
    /* left: -5px; */
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
    /*display: none;*/
    /* opacity: 0;*/
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

.input-wrap .el-button + .el-button {
    float: right;
    margin-right: 2px;
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
    border: 1px solid #d8d8d8;
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
    padding: 0 86px;
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

/*/deep/ .el-table__row .td:nth-child(8),
  /deep/ .el-table__row .td:nth-child(9),
  /deep/ .has-gutter .th:nth-child(8),
  /deep/ .has-gutter .th:nth-child(9)
  {
    text-align: right;
  }*/

/*滚动条*/
/deep/ .el-table__body-wrapper {
    height: 440px;
    overflow-y: scroll;
    overflow-x: hidden !important;
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

/deep/ .el-form--inline .el-form-item {
    margin-right: 45px;
}

/deep/ .el-dialog {
    width: 1100px;
    height: 680px;
}

/*购物车列表*/
.car-title {
    background: #e6f7ff;
    border: 1px solid #bae7ff;
    border-radius: 4px;
    margin-bottom: 10px;
    padding: 5px;
}

.car-title h4 {
    font-size: 14px;
    /*font-weight: bold;*/
    display: inline-block;
}

.car-title p {
    font-size: 14px;
    font-weight: normal;
    display: inline-block;
    margin-left: 10px;
}

.car-title span {
    font-size: 14px;
    font-weight: normal;
    margin: 0 10px;
    cursor: pointer;
    color: #1890ff;
}

.car-del {
    text-align: center;
    cursor: pointer;
    color: #1890ff;
}

/deep/ .car-list .el-table__expanded-cell[class*="cell"] {
    padding: 0 46px;
    background-color: #f7f7f7;
}

.table_wrap /deep/ .has-gutter th:nth-child(8),
.table_wrap /deep/ .has-gutter th:nth-child(9),
.table_wrap /deep/ .el-table__row td:nth-child(8),
.table_wrap /deep/ .el-table__row td:nth-child(9) {
    text-align: right;
}

.el-dialog /deep/ .has-gutter th:nth-child(7),
.el-dialog /deep/ .has-gutter th:nth-child(8),
.el-dialog /deep/ .el-table__row td:nth-child(7),
.el-dialog /deep/ .el-table__row td:nth-child(8) {
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

/deep/ .el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: #ecf5ff;
}

/*确认报价单*/
.step3 {
    padding: 0 105px;
}

.bill-title {
    width: 100%;
    height: 181px;
    box-sizing: border-box;
    border: 1px solid #d8d8d8;
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
}

.bill-title-right {
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
    font-weight: bold;
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

.bottom-fin button {
    background: #e6f1fc;
    border: 1px solid #a3d0fd;
    border-radius: 4px;
    font-size: 12px;
    color: #1989fa;
    width: 50px;
    height: 24px;
    outline: none;
}

.bottom-fin p {
    float: right;
}

.bottom-fin span {
    font-size: 22px;
    color: #333333;
    font-weight: bold;
}

/*确认报价单修改框*/
/deep/ .el-dialog__body {
    padding: 8px 20px;
}

.changeBill h4 {
    font-size: 20px;
    color: #303133;
}

.changeBill p {
    margin-top: 20px;
    margin-bottom: 6px;
}
/deep/ .step3 .el-input {
    width: 348px;
}
/deep/ .step3 .el-input__inner,
/deep/ .step3 .el-textarea__inner {
    width: 348px;
}

/*计数器*/
/deep/ .el-input-number__decrease,
/deep/ .el-input-number__increase {
    background-color: transparent !important;
}

/deep/ .el-icon-arrow-down {
    position: relative;
    top: 1px;
}

/deep/ .el-input-number .el-input__suffix {
    right: 42px !important;
}

/deep/ .el-input__suffix {
    right: 7px;
}

/deep/
    .el-input-number.is-controls-right
    .el-input-number__decrease
    [class*="el-icon"],
.el-input-number.is-controls-right
    .el-input-number__increase
    [class*="el-icon"] {
    position: relative;
    top: 2px;
}

/deep/ .el-input-number {
    width: 348px;
}

/deep/ .el-table th > .cell.highlight {
    color: #409eff !important;
}

.changeMakePrice .el-input__inner {
    width: 352px;
    height: 34px;
    margin-top: 6px;
}

/deep/ .el-input-number.is-controls-right .el-input__inner {
    text-align: left;
}

/deep/ .el-tabs--border-card {
    box-shadow: none;
    border: 1px solid #d8d8d8;
}

/*完成创建*/
.successIcon img {
    width: 72px;
}

.successIcon h2 {
    font-size: 24px;
    color: #333333;
    margin-top: 24px;
    margin-bottom: 8px;
    font-weight: bold;
}

.successIcon p {
    font-size: 14px;
    color: #999999;
    margin-bottom: 16px;
}

.planPanel,
.successIcon {
    text-align: center;
}

.planPanel {
    width: 557px;
    height: 198px;
    background: #fafafa;
    border-radius: 2px;
    padding: 19px 0;
    box-sizing: border-box;
    margin: 0 auto;
}

.planPanel ul li {
    padding-left: 206px;
    text-align: left;
    font-size: 14px;
    color: #666666;
    margin-bottom: 24px;
}

.planPanel ul li.money {
    margin-bottom: 0;
    font-size: 20px;
    color: #666666;
}

.planPanel ul li em {
    font-size: 14px;
    color: #333333;
}

.planPanel ul .money i {
    font-style: normal;
    font-size: 12px;
    color: #666666;
}

/*1440*/
@media all and (min-width: 1420px) {
    .filter-input input {
        border: 1px solid #c2c2c2;
        border-radius: 4px;
        width: 55px;
        height: 26px;
        outline: none;
        text-indent: 1em;
        font-size: 14px;
        color: #666;
    }

    .filter-input ul li {
        float: left;
        margin-left: 33px;
        position: relative;
        width: 204px;
        vertical-align: center;
    }

    .filter-input .input-wrap .el-button--mini {
        left: 1px;
    }

    .tbody .tr li:nth-of-type(1) {
        width: 3.25%;
    }

    .tbody .tr li:nth-of-type(2) {
        width: 14.15%;
    }

    .tbody .tr li:nth-of-type(3) {
        width: 7%;
    }

    .tbody .tr li:nth-of-type(4) {
        width: 7.45%;
    }

    .tbody .tr li:nth-of-type(5) {
        width: 8.8%;
    }

    .tbody .tr li:nth-of-type(6) {
        width: 8.4%;
    }

    .tbody .tr li:nth-of-type(7) {
        width: 8.3%;
    }

    .tbody .tr li:nth-of-type(8) {
        width: 8.35%;
    }

    .tbody .tr li:nth-of-type(9) {
        width: 16.2%;
    }

    .tbody .tr li:nth-of-type(10) {
        width: 227px;
    }
}

/*1920*/
@media all and (min-width: 1900px) {
    .mediaMana_content_bottom .content_bottom_btn {
        position: absolute;
        bottom: -66px;
        left: 896px;
    }

    .tab-info .price h4 {
        width: 94%;
    }

    .filter-input input {
        border: 1px solid #c2c2c2;
        border-radius: 4px;
        width: 107px;
        height: 26px;
        outline: none;
        text-indent: 1em;
        font-size: 14px;
        color: #666;
    }

    .filter-input ul li {
        width: 303px;
    }

    .filter-input .input-wrap .el-button--mini {
        width: 52px;
        height: 26px;
    }

    .input-wrap /deep/ .el-button--mini span {
        position: relative;
        top: -1px;
        left: -3px;
    }

    .tbody .tr li:nth-of-type(1) {
        width: 2.35%;
    }

    .tbody .tr li:nth-of-type(2) {
        width: 14.15%;
    }

    .tbody .tr li:nth-of-type(3) {
        width: 7%;
    }

    .tbody .tr li:nth-of-type(4) {
        width: 7.45%;
    }

    .tbody .tr li:nth-of-type(5) {
        width: 8.8%;
    }

    .tbody .tr li:nth-of-type(6) {
        width: 8.3%;
    }

    .tbody .tr li:nth-of-type(7) {
        width: 8.3%;
    }

    .tbody .tr li:nth-of-type(8) {
        width: 8.35%;
    }

    .tbody .tr li:nth-of-type(9) {
        width: 16.2%;
    }

    .tbody .tr li:nth-of-type(10) {
        width: 331px;
    }
}
</style>
