<template>
	<div class="wrap">
		<div>
			<div class="tabs">
				<div class="tips">
					<span>数据统计截止至2018年6月20日</span>
					<el-dropdown trigger="click" placement="bottom">
						<span class="el-dropdown-link">
							{{currCity}}
							<i class="el-icon-arrow-down el-icon--right"></i>
						</span>
						<el-dropdown-menu slot="dropdown" filterable>
							<el-dropdown-item v-for="(items,index) in citys" :key="index" @click.native.prevent="changeCity(index)">
								{{items}}
							</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</div>
				<el-tabs v-model="activeName">
					<el-tab-pane label="数据概况" name="first">
						<div class="data-cards">
							<!--数据总览-->
							<div class="card card1">
								<el-card class="box-card" shadow="never">
									<div slot="header" class="clearfix">
										<span>数据总览
											<el-popover placement="right" width="200" trigger="hover" content="这是一段内容,这是一段内容。这是一段内容,这是一段内容。这是一段内容,这是一段内容。">
												<i slot="reference" class="el-icon-question" style="color: #dfdfdf"></i>
											</el-popover>
										</span>
									</div>
									<div class="data-wrap">
										<div class="data-txt">
											<div>资源
												<p>237,503</p>
											</div>
											<div>广告门
												<p>237,503</p>
											</div>
											<div>上刊率
												<p>67.33%</p>
											</div>
											<div>订单
												<p>42,548</p>
											</div>
											<div>现金总额
												<p>&yen;219,682,931</p>
											</div>
											<div>客单价
												<p>&yen;2,133</p>
											</div>
											<div>广告主
												<p>730</p>
											</div>
										</div>
										<div class="data-charts all-data-charts">
											<div class="pie-wrap">
												<div class="charts2" ref="allDataPie" style="width: 1200px;height: 350px"></div>
												<p>资源</p>
												<p>广告门</p>
												<p>点位</p>
												<p>上刊率</p>
											</div>

											<div class="more" @click="cityDataTableVisible = true">全部>></div>
											<el-dialog title="城市数据总览" :visible.sync="cityDataTableVisible">
												<div class="table-wrap" style="width: 100%">
													<el-table :data="cityDataTable" border height="430px" class="all-city-data-table">
														<el-table-column property="area" label="区域" min-width="20%" :filters="[{text: '天河区', value: '天河区'}, {text: '越秀区', value: '越秀区'}]" :filter-method="filterArea">
														</el-table-column>
														<el-table-column property="recNum" label="资源数" min-width="30%" sortable :sort-orders="[2,1]">

														</el-table-column>
														<el-table-column property="adDoorNum" label="广告门数" min-width="30%" sortable :sort-orders="[2,1]">

														</el-table-column>
														<el-table-column property="pointNum" label="点位数" min-width="30%" sortable :sort-orders="[2,1]">

														</el-table-column>
														<el-table-column label="上刊率" min-width="20%" sortable :sort-method="sortUpPercent">
															<template slot-scope="scope">
																{{scope.row.upPercent}}％
															</template>
														</el-table-column>
													</el-table>
												</div>
											</el-dialog>
											<div class="bottom-data">
											</div>
										</div>
									</div>
								</el-card>
							</div>
							<!--关键数据展示-->
							<!--<div class="card card2">
                <el-card class="box-card" shadow="hover">
                  <div slot="header" class="clearfix">
                    <span>关键数据展示
                    <el-popover
                      placement="right"
                      width="200"
                      trigger="hover"
                      content="这是一段内容,这是一段内容。这是一段内容,这是一段内容。这是一段内容,这是一段内容。">
                          <i slot="reference" class="el-icon-question" style="color: #dfdfdf"></i>
                        </el-popover>
                    </span>
                  </div>
                  <div class="data-wrap">
                    <div class="data-tab">
                      <span>
                        时间：
                      </span>
                      <span>
                        <el-radio-group v-model="card2time" size="mini">
                        <el-radio-button label="本月"></el-radio-button>
                        <el-radio-button label="今年"></el-radio-button>
                      </el-radio-group>
                      </span>
                    </div>
                    <div class="data-box">
                      <div class="data-title">
                        <div>资源</div>
                        <div>广告门</div>
                        <div>上刊率</div>
                        <div>订单</div>
                        <div>现金总额</div>
                        <div>客单价</div>
                        <div>广告主</div>
                      </div>
                      &lt;!&ndash;本月&ndash;&gt;
                      <div class="month-data" v-if="this.card2time == '本月'">
                        <ol>
                          <li>本月(六月)</li>
                          <li>上月(五月)</li>
                          <li>月环比</li>
                        </ol>
                        <ul v-for="(data,index) in keyDataOfMonth" :key="index">
                          <li>{{data.thisMonth}}</li>
                          <li>{{data.lastMonth}}</li>
                          <li>
                            <i class="up" v-if="data.thisMonth>data.lastMonth">↑</i>
                            <i class="down" v-else>↓</i>
                            {{data.percent}}
                          </li>
                        </ul>
                      </div>
                      &lt;!&ndash;今年&ndash;&gt;
                      <div class="month-data" v-if="this.card2time == '今年'">
                        <ol>
                          <li>本月(六月)</li>
                          <li>上月(五月)</li>
                          <li>月环比</li>
                        </ol>
                        <ul v-for="(data,index) in keyDataOfYear" :key="index">
                          <li>{{data.thisMonth}}</li>
                          <li>{{data.lastMonth}}</li>
                          <li>
                            <i class="up" v-if="data.thisMonth>data.lastMonth">↑</i>
                            <i class="down" v-else>↓</i>
                            {{data.percent}}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </el-card>
              </div>-->
							<!--关键数据总量趋势-->
							<div class="card card3">
								<el-card class="box-card" shadow="never">
									<div slot="header" class="clearfix">
										<span>关键数据总量趋势
											<el-popover placement="right" width="200" trigger="hover" content="这是一段内容,这是一段内容。这是一段内容,这是一段内容。这是一段内容,这是一段内容。">
												<i slot="reference" class="el-icon-question" style="color: #dfdfdf"></i>
											</el-popover>
										</span>
									</div>
									<div>
										<div class="data-tab">
											<span>数据：</span>
											<span>
												<el-radio-group v-model="card3data" size="mini">
													<el-radio-button label="资源数"></el-radio-button>
													<el-radio-button label="广告门数"></el-radio-button>
													<el-radio-button label="点位数"></el-radio-button>
													<el-radio-button label="上刊率"></el-radio-button>
													<el-radio-button label="订单数"></el-radio-button>
													<el-radio-button label="订单总额"></el-radio-button>
													<el-radio-button label="广告主数"></el-radio-button>
												</el-radio-group>
											</span>
										</div>
										<div class="data-tab">
											<span>时间：</span>
											<span>
												<el-radio-group v-model="card3time" size="mini" @change="changecard3Time">
													<el-radio-button label="最近半年"></el-radio-button>
													<el-radio-button label="最近三个月"></el-radio-button>
												</el-radio-group>
											</span>
											<span style="margin-left: 10px">
												<div class="block">
													<el-date-picker size="mini" v-model="card3Date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
													</el-date-picker>
												</div>
											</span>
										</div>
										<div class="keyDataChart">
											<div class="charts2" id="keyDataLine" ref="keyDataLine" style="width: 1200px;height: 350px"></div>
										</div>
									</div>
								</el-card>
							</div>
							<!--关键数据增量对比-->
							<div class="card card4">
								<el-card class="box-card" shadow="never">
									<div slot="header" class="clearfix">
										<span>关键数据增量对比
											<el-popover placement="right" width="200" trigger="hover" content="这是一段内容,这是一段内容。这是一段内容,这是一段内容。这是一段内容,这是一段内容。">
												<i slot="reference" class="el-icon-question" style="color: #dfdfdf"></i>
											</el-popover>
										</span>
									</div>
									<div>
										<div class="data-tab">
											<span>
												数据：
											</span>
											<span>
												<el-radio-group v-model="card4data" size="mini">
													<el-radio-button label="资源数"></el-radio-button>
													<el-radio-button label="广告门数"></el-radio-button>
													<el-radio-button label="点位数"></el-radio-button>
													<el-radio-button label="上刊率"></el-radio-button>
													<el-radio-button label="订单数"></el-radio-button>
													<el-radio-button label="订单总额"></el-radio-button>
													<el-radio-button label="广告主数"></el-radio-button>
												</el-radio-group>
											</span>
										</div>
										<div class="data-tab">
											<span>时间：</span>
											<span>
												<el-radio-group v-model="card4time" size="mini">
													<el-radio-button label="最近半年"></el-radio-button>
													<el-radio-button label="最近三个月"></el-radio-button>
												</el-radio-group>
											</span>
											<span style="margin-left: 10px">
												<div class="block">
													<el-date-picker size="mini" v-model="card4Date1" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
													</el-date-picker>
												</div>
												<el-checkbox v-model="dateCompare">对比</el-checkbox>
												<div class="block" v-if="dateCompare">
													<el-date-picker size="mini" v-model="card4Date2" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
													</el-date-picker>
												</div>

											</span>
										</div>
										<div class="keyDataChart">
											<div class="charts2" id="keyDataBar" ref="keyDataBar" style="width: 1200px;height: 350px"></div>
										</div>
									</div>
								</el-card>
							</div>
							<!--行业订单总量趋势-->
							<div class="card card5">
								<el-card class="box-card" shadow="never">
									<div slot="header" class="clearfix">
										<span>行业订单总量趋势
											<el-popover placement="right" width="200" trigger="hover" content="这是一段内容,这是一段内容。这是一段内容,这是一段内容。这是一段内容,这是一段内容。">
												<i slot="reference" class="el-icon-question" style="color: #dfdfdf"></i>
											</el-popover>
										</span>
									</div>
									<div>
										<div class="data-tab Bradio">
											<span>
												行业：
											</span>
											<span>
												<el-checkbox-group v-model="card5business " size="mini">
													<el-checkbox-button label="房地产"></el-checkbox-button>
													<el-checkbox-button label="教育培训"></el-checkbox-button>
													<el-checkbox-button label="医疗保健"></el-checkbox-button>
													<el-checkbox-button label="家具建材"></el-checkbox-button>
												</el-checkbox-group>
											</span>
											<span style="position: relative;left: -1px">
												<el-dropdown split-button :type="currBusiness=='其他'?'':'primary'" size="mini">
													{{currBusiness}}
													<el-dropdown-menu slot="dropdown" placement="bottom">
														<el-dropdown-item v-for="(item,index) in businessArr" :key="index" @click.native.prevent="chooseBusiness(index)">
															{{item}}
														</el-dropdown-item>
													</el-dropdown-menu>
												</el-dropdown>
											</span>
										</div>
										<div class="data-tab timeSelect">
											<span>时间：</span>
											<span class="spe1">
												<el-select v-model="currTime" placeholder="请选择" size="mini" @change="selectcard5Date">
													<el-option value="自然天"></el-option>
													<el-option value="自然月"></el-option>
												</el-select>
											</span>
											<span style="margin-left: 10px">
												<div class="block">
													<el-date-picker size="mini" v-model="card5Date" type="daterange" :format="currTime == '自然天' ? 'yyyy-MM-dd' : 'yyyy-MM'" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
													</el-date-picker>
												</div>
											</span>
										</div>
										<div class="data-tab">
											<span>
												数据：
											</span>
											<span>
												<el-radio-group v-model="card5data" size="mini">
													<el-radio-button label="订单金额"></el-radio-button>
													<el-radio-button label="订单数量"></el-radio-button>
													<el-radio-button label="广告主数"></el-radio-button>
												</el-radio-group>
											</span>
										</div>
									</div>
									<div class="busOrderChart">
										<div class="charts2" id="busOrderLine" ref="busOrderLine" style="width: 1200px;height: 350px"></div>
									</div>
								</el-card>
							</div>
							<!--行业订单占比-->
							<div class="card card6">
								<el-card class="box-card" shadow="never">
									<div slot="header" class="clearfix">
										<span>行业订单占比
											<el-popover placement="right" width="200" trigger="hover" content="这是一段内容,这是一段内容。这是一段内容,这是一段内容。这是一段内容,这是一段内容。">
												<i slot="reference" class="el-icon-question" style="color: #dfdfdf"></i>
											</el-popover>
										</span>
									</div>
									<div>
										<div class="data-tab">
											<span>
												数据：
											</span>
											<span>
												<el-radio-group v-model="card6data" size="mini">
													<el-radio-button label="订单金额"></el-radio-button>
													<el-radio-button label="订单数量"></el-radio-button>
													<el-radio-button label="广告主数"></el-radio-button>
												</el-radio-group>
											</span>
										</div>
									</div>
									<div class="wrap-box">
										<div class="allOrderChart">
											<div class="charts1" id="allOrderPie" ref="allOrderPie" style="width: 600px;height: 350px"></div>
											<div class="title">
												<p>订单总金额</p>
												<h3>¥ 213,116,560</h3>
											</div>
										</div>
										<div class="table-wrap">
											<el-table :data="orderTable" border height="380" style="width: 100%;">
												<el-table-column label="序号" width="50" type="index">
												</el-table-column>
												<el-table-column prop="business" label="行业" min-width="30%">
												</el-table-column>
												<el-table-column label="订单总额" min-width="25%">
													<template slot-scope="scope">
														&yen;{{scope.row.totalPrice}}
													</template>
												</el-table-column>
												<el-table-column prop="orderNum" label="订单数" min-width="30%">
												</el-table-column>
												<el-table-column prop="adOwner" label="广告主" min-width="25%">
												</el-table-column>
											</el-table>
										</div>
									</div>
								</el-card>
							</div>
							<!--入驻物业排行-->
							<div class="card card7">
								<el-card class="box-card" shadow="never">
									<div slot="header" class="clearfix">
										<span>入驻物业排行
											<el-popover placement="right" width="200" trigger="hover" content="这是一段内容,这是一段内容。这是一段内容,这是一段内容。这是一段内容,这是一段内容。">
												<i slot="reference" class="el-icon-question" style="color: #dfdfdf"></i>
											</el-popover>
										</span>
										<div class="all" @click="PropertyRankTableVisible = true">全部>></div>
										<el-dialog title="入驻物业总排行" :visible.sync="PropertyRankTableVisible">
											<div class="table-wrap" style="width: 100%">
												<el-table :data="PropertyRankTable" height="430px" border class="into-property-rank">
													<el-table-column property="rank" label="排名" min-width="10%"></el-table-column>
													<el-table-column property="property" label="物业" min-width="50%"></el-table-column>
													<el-table-column property="resource" label="资源" min-width="20%" sortable :sort-orders="[2,1]"></el-table-column>
													<el-table-column property="adDoor" label="广告门数" min-width="20%" sortable :sort-orders="[2,1]"></el-table-column>
												</el-table>
											</div>
										</el-dialog>
									</div>
									<div>
										<div class="data-tab">
											<span>
												数据：
											</span>
											<span>
												<el-radio-group v-model="card7data" size="mini">
													<el-radio-button label="资源数量"></el-radio-button>
													<el-radio-button label="点位数量"></el-radio-button>
												</el-radio-group>
											</span>
										</div>
										<div class="data-tab">
											<span>时间：</span>
											<span>
												<el-radio-group v-model="card7time" size="mini">
													<el-radio-button label="最近半年"></el-radio-button>
													<el-radio-button label="最近三个月"></el-radio-button>
													<el-radio-button label="全部"></el-radio-button>
												</el-radio-group>
											</span>
											<span style="margin-left: 10px">
												<div class="block">
													<el-date-picker size="mini" v-model="card7Date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
													</el-date-picker>
												</div>
											</span>
										</div>
										<div class="keyDataChart">
											<div class="charts2" id="PropertyRank" ref="PropertyRank" style="width: 1200px;height: 350px"></div>
										</div>
									</div>
								</el-card>
							</div>
							<!--广告主排行-->
							<div class="card card8">
								<el-card class="box-card" shadow="never">
									<div slot="header" class="clearfix">
										<span>广告主排行
											<el-popover placement="right" width="200" trigger="hover" content="这是一段内容,这是一段内容。这是一段内容,这是一段内容。这是一段内容,这是一段内容。">
												<i slot="reference" class="el-icon-question" style="color: #dfdfdf"></i>
											</el-popover>
										</span>
										<div class="all" @click="adOwnerRankTableVisible = true">全部>></div>
										<el-dialog title="广告主总排行" :visible.sync="adOwnerRankTableVisible">
											<div class="table-wrap" style="width: 100%">
												<el-table :data="adOwnerRankTable" height="430px" border class="ad-owner-rank-table">
													<el-table-column property="rank" label="排名" min-width="10%"></el-table-column>
													<el-table-column property="adOwner" label="广告主" min-width="45%"></el-table-column>
													<el-table-column property="price" label="金额" min-width="25%" sortable :sort-orders="[2,1]">
														<template slot-scope="scope">
															&yen;{{scope.row.price}}
														</template>
													</el-table-column>
													<el-table-column property="number" label="数量" min-width="20%" sortable :sort-orders="[2,1]"></el-table-column>
												</el-table>
											</div>
										</el-dialog>
									</div>
									<div>
										<div class="data-tab">
											<span>
												数据：
											</span>
											<span>
												<el-radio-group v-model="card8data" size="mini">
													<el-radio-button label="订单金额"></el-radio-button>
													<el-radio-button label="订单数量"></el-radio-button>
												</el-radio-group>
											</span>
										</div>
										<div class="data-tab">
											<span>时间：</span>
											<span>
												<el-radio-group v-model="card8time" size="mini">
													<el-radio-button label="最近半年"></el-radio-button>
													<el-radio-button label="最近三个月"></el-radio-button>
													<el-radio-button label="全部"></el-radio-button>
												</el-radio-group>
											</span>
											<span style="margin-left: 10px">
												<div class="block">
													<el-date-picker size="mini" v-model="card8Date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
													</el-date-picker>
												</div>
											</span>
										</div>
										<div class="keyDataChart">
											<div class="charts2" id="adOwnerRank" ref="adOwnerRank" style="width: 1200px;height: 350px"></div>
										</div>
									</div>
								</el-card>
							</div>
							<!--销售业绩排行-->
							<div class="card card9">
								<el-card class="box-card" shadow="never">
									<div slot="header" class="clearfix">
										<span>销售业绩排行
											<el-popover placement="right" width="200" trigger="hover" content="这是一段内容,这是一段内容。这是一段内容,这是一段内容。这是一段内容,这是一段内容。">
												<i slot="reference" class="el-icon-question" style="color: #dfdfdf"></i>
											</el-popover>
										</span>
										<div class="all" @click="salesRankTableVisible = true">全部>></div>
										<el-dialog title="销售业绩总排行" :visible.sync="salesRankTableVisible">
											<div class="table-wrap" style="width: 100%">
												<el-table :data="salesRankTable" height="430px" border class="sales-rank-table">
													<el-table-column property="rank" label="排名" min-width="10%"></el-table-column>
													<el-table-column property="sale" label="销售" min-width="45%"></el-table-column>
													<el-table-column property="price" label="金额" min-width="25%" sortable :sort-orders="[2,1]">
														<template slot-scope="scope">
															&yen;{{scope.row.price}}
														</template>
													</el-table-column>
													<el-table-column property="number" label="数量" min-width="20%" sortable :sort-orders="[2,1]"></el-table-column>
												</el-table>
											</div>
										</el-dialog>
									</div>
									<div>
										<div class="data-tab">
											<span>
												数据：
											</span>
											<span>
												<el-radio-group v-model="card9data" size="mini">
													<el-radio-button label="销售金额"></el-radio-button>
													<el-radio-button label="销售单数"></el-radio-button>
												</el-radio-group>
											</span>
										</div>
										<div class="data-tab">
											<span>时间：</span>
											<span>
												<el-radio-group v-model="card9time" size="mini">
													<el-radio-button label="最近半年"></el-radio-button>
													<el-radio-button label="最近三个月"></el-radio-button>
													<el-radio-button label="全部"></el-radio-button>
												</el-radio-group>
											</span>
											<span style="margin-left: 10px">
												<div class="block">
													<el-date-picker size="mini" v-model="card9Date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
													</el-date-picker>
												</div>
											</span>
										</div>
										<div class="keyDataChart">
											<div class="charts2" id="salesRank" ref="salesRank" style="width:1200px;height: 350px"></div>
										</div>
									</div>
								</el-card>
							</div>
						</div>
					</el-tab-pane>
					<el-tab-pane label="城市对比" name="second">
						<!--城市数据展示-->
						<div class="card sec-card1">
							<el-card class="box-card" shadow="never">
								<div slot="header" class="clearfix">
									<span>城市数据展示
										<el-popover placement="right" width="200" trigger="hover" content="这是一段内容,这是一段内容。这是一段内容,这是一段内容。这是一段内容,这是一段内容。">
											<i slot="reference" class="el-icon-question" style="color: #dfdfdf"></i>
										</el-popover>
									</span>
								</div>
								<div class="cityData-wrap">
									<div class="chinaMapChart">
										<div class="charts1" id="chinaMap" ref="chinaMap" style="width:600px;height: 400px"></div>
									</div>
									<div class="all-data-table">
										<el-table class="cityBattle-table" :data="allCitysData" border height="430" width="100%" style="width: 100%">
											<el-table-column type="index" fixed label="序号" width="50">
											</el-table-column>
											<el-table-column fixed prop="city" label="城市" min-width="55px">
											</el-table-column>
											<el-table-column prop="recNum" label="资源数" sortable :sort-orders="[2,1]" min-width="100px">
											</el-table-column>
											<el-table-column prop="adDoors" label="广告门数" sortable :sort-orders="[2,1]" min-width="120px">
											</el-table-column>
											<el-table-column prop="points" label="点位数" sortable :sort-orders="[2,1]" min-width="100px">
											</el-table-column>
											<el-table-column label="上刊率" sortable :sort-method="sortUpPercent" min-width="100px">
												<template slot-scope="scope">
													<span>{{scope.row.upPercent}}%</span>
												</template>
											</el-table-column>
											<el-table-column label="广告主数" sortable :sort-orders="[2,1]" min-width="120px">
												<template slot-scope="scope">
													<el-tooltip class="item" effect="dark" :content="scope.row.adOwners" placement="bottom">
														<span>{{scope.row.adOwners}}</span>
													</el-tooltip>
												</template>
											</el-table-column>
											<el-table-column prop="orders" label="订单数" sortable :sort-orders="[2,1]" min-width="100px">
											</el-table-column>
											<el-table-column prop="totalPrice" label="订单总额" sortable :sort-orders="[2,1]" min-width="150px">
												<template slot-scope="scope">
													<span>&yen;{{scope.row.totalPrice}}</span>
												</template>
											</el-table-column>
										</el-table>
									</div>
								</div>
							</el-card>
						</div>
						<!--城市数据对比-->
						<div class="card sec-card2">
							<el-card class="box-card" shadow="never">
								<div slot="header" class="clearfix">
									<span>城市数据对比
										<el-popover placement="right" width="200" trigger="hover" content="这是一段内容,这是一段内容。这是一段内容,这是一段内容。这是一段内容,这是一段内容。">
											<i slot="reference" class="el-icon-question" style="color: #dfdfdf"></i>
										</el-popover>
									</span>
								</div>
								<div>
									<div class="data-tab">
										<span>
											数据：
										</span>
										<span>
											<el-radio-group v-model="cityBattleData" size="mini">
												<el-radio-button label="资源数"></el-radio-button>
												<el-radio-button label="广告门数"></el-radio-button>
												<el-radio-button label="点位数"></el-radio-button>
												<el-radio-button label="上刊率"></el-radio-button>
												<el-radio-button label="订单数"></el-radio-button>
												<el-radio-button label="订单总额"></el-radio-button>
												<el-radio-button label="广告主数"></el-radio-button>
											</el-radio-group>
										</span>
									</div>
									<div class="data-tab">
										<span>
											时间：
										</span>
										<span>
											<el-radio-group v-model="cityBattleTime" size="mini">
												<el-radio-button label="最近半年"></el-radio-button>
												<el-radio-button label="最近三个月"></el-radio-button>
											</el-radio-group>
										</span>
										<span style="margin-left: 10px">
											<div class="block sec-card2-eldata">
												<el-date-picker size="mini" v-model="secCard2time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
												</el-date-picker>
											</div>
										</span>
									</div>
									<div class="data-tab cityDX">
										<span>
											城市：
										</span>
										<span>
											<el-select filterable v-model="selectCity" multiple :multiple-limit=8 placeholder="请选择" size="mini" @change="selectCities">
												<el-option-group v-for="group in cities" :key="group.label" :label="group.label">
													<el-option v-for="item in group.options" :key=item :value="item">
													</el-option>
												</el-option-group>
											</el-select>
										</span>
									</div>
								</div>
								<div class="cityBattleChart">
									<div class="charts2" id="cityBattleLine" ref="cityBattleLine" style="width:1200px;height: 450px"></div>
								</div>
							</el-card>
						</div>
						<!--城市上刊率对比-->
						<div class="card sec-card3">
							<el-card class="box-card" shadow="never">
								<div slot="header" class="clearfix">
									<span>城市上刊率对比
										<el-popover placement="right" width="200" trigger="hover" content="这是一段内容,这是一段内容。这是一段内容,这是一段内容。这是一段内容,这是一段内容。">
											<i slot="reference" class="el-icon-question" style="color: #dfdfdf"></i>
										</el-popover>
									</span>
								</div>
								<div>
									<div class="data-tab">
										<span>
											时间：
										</span>
										<span>
											<el-radio-group v-model="cityBattleTime2" size="mini">
												<el-radio-button label="最近半年"></el-radio-button>
												<el-radio-button label="最近三个月"></el-radio-button>
											</el-radio-group>
										</span>
										<span style="margin-left: 10px">
											<div class="block sec-card2-eldata">
												<el-date-picker size="mini" v-model="secCard3time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
												</el-date-picker>
											</div>
										</span>
									</div>
									<div class="data-tab cityDX">
										<span>
											城市：
										</span>
										<span>
											<el-select filterable v-model="selectCity2" multiple :multiple-limit=8 placeholder="请选择" size="mini">
												<el-option-group v-for="group in cities" :key="group.label" :label="group.label">
													<el-option v-for="item in group.options" :key="item" :value="item">
													</el-option>
												</el-option-group>
											</el-select>
										</span>
									</div>
								</div>
								<div class="cityBattleChart">
									<div class="charts2" id="cityPercentBattleBar" ref="cityPercentBattleBar" style="width:1200px;height: 450px"></div>
								</div>
							</el-card>
						</div>
						<!--城市关键数据对比-->
						<div class="card sec-card4">
							<el-card class="box-card" shadow="never">
								<div slot="header" class="clearfix">
									<span>城市关键数据对比
										<el-popover placement="right" width="200" trigger="hover" content="这是一段内容,这是一段内容。这是一段内容,这是一段内容。这是一段内容,这是一段内容。">
											<i slot="reference" class="el-icon-question" style="color: #dfdfdf"></i>
										</el-popover>
									</span>
								</div>
								<div>
									<div class="data-tab">
										<span>
											时间：
										</span>
										<span>
											<el-radio-group v-model="cityBattleTime3" size="mini">
												<el-radio-button label="最近半年"></el-radio-button>
												<el-radio-button label="最近三个月"></el-radio-button>
											</el-radio-group>
										</span>
										<span style="margin-left: 10px">
											<div class="block sec-card2-eldata">
												<el-date-picker size="mini" v-model="secCard4time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
												</el-date-picker>
											</div>
										</span>
									</div>
									<div class="data-tab cityDX">
										<span>
											城市：
										</span>
										<span>
											<el-select v-model="selectCity3" filterable multiple :multiple-limit=8 placeholder="请选择" size="mini">
												<el-option-group v-for="group in cities" :key="group.label" :label="group.label">
													<el-option v-for="item in group.options" :key="item" :value="item">
													</el-option>
												</el-option-group>
											</el-select>
										</span>
									</div>
									<div class="data-charts cityKeyData-charts">
										<div class="pie-wrap">
											<div class="charts" ref="keyDataPie2" style="width: 1200px;height: 600px"></div>
											<p>资源</p>
											<p>广告门</p>
											<p>点位</p>
											<p>订单</p>
											<p>订单总额</p>
											<p>广告主</p>
										</div>
									</div>
								</div>
							</el-card>
						</div>
					</el-tab-pane>
					<el-tab-pane label="点位分析" name="third">
						<div class="card thr-card1">
							<el-card class="box-card" shadow="never">
								<div slot="header" class="clearfix" style="position: relative">
									<span class="header-title">点位使用概况
										<el-popover placement="right" width="200" trigger="hover" content="这是一段内容,这是一段内容。这是一段内容,这是一段内容。这是一段内容,这是一段内容。">
											<i slot="reference" class="el-icon-question" style="color: #dfdfdf"></i>
										</el-popover>
									</span>
									<div class="data-tab header-select">
										<span></span>
										<span style="margin-right: 10px">
											<el-select v-model="pointSelect" placeholder="请选择" size="mini">
												<el-option value="自然天"></el-option>
												<el-option value="自然月"></el-option>
											</el-select>
										</span>
										<span>
											<div class="block">
												<el-date-picker v-model="pointDate" size="mini" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
												</el-date-picker>
											</div>
										</span>
									</div>
								</div>
								<div class="pointData-wrap">
									<div class="left-data">
										<div class="line1">
											<dl>
												<dt>总点位数</dt>
												<dd>9,876</dd>
											</dl>
											<dl>
												<dt>A面上刊率</dt>
												<dd>82.12%</dd>
											</dl>
											<dl>
												<dt>B面上刊率</dt>
												<dd>54.33%</dd>
											</dl>
										</div>
										<div class="line2">
											<dl>
												<dt>
													方案点位数
													<el-popover placement="right" width="200" trigger="hover" content="这是一段内容,这是一段内容。这是一段内容,这是一段内容。这是一段内容,这是一段内容。">
														<i slot="reference" class="el-icon-question" style="color: #dfdfdf"></i>
													</el-popover>
												</dt>
												<dd>9,876</dd>
											</dl>
											<dl>
												<dt>方案数</dt>
												<dd>234</dd>
											</dl>
										</div>
										<div class="line3">
											<dl>
												<dt>
													订单点位数
													<el-popover placement="right" width="200" trigger="hover" content="这是一段内容,这是一段内容。这是一段内容,这是一段内容。这是一段内容,这是一段内容。">
														<i slot="reference" class="el-icon-question" style="color: #dfdfdf"></i>
													</el-popover>
												</dt>
												<dd>9,876</dd>
											</dl>
											<dl>
												<dt>订单数</dt>
												<dd>452</dd>
											</dl>
											<dl>
												<dt>
													成交单价
													<el-popover placement="right" width="200" trigger="hover" content="这是一段内容,这是一段内容。这是一段内容,这是一段内容。这是一段内容,这是一段内容。">
														<i slot="reference" class="el-icon-question" style="color: #dfdfdf"></i>
													</el-popover>
												</dt>
												<dd>54,123</dd>
											</dl>
										</div>
									</div>
									<div class="right-chart">
										<img src="../../assets/images/dataAnalysis-ld.png" alt="">
										<div class="translate-txt">
											<!--总点位数 ——> 方案点位数 -->
											<div class="translate1">转化率：71.22%</div>
											<!--方案点位数 ——> 订单点位数 -->
											<div class="translate2">转化率：66.22%</div>
											<!-- 总点位数 ——> 方案点位数 -->
											<div class="translate3">转化率：46.22%</div>
										</div>
									</div>
								</div>
							</el-card>
						</div>
						<div class="card thr-card2">
							<div>
								<div class="thr-tabs">
									<el-tabs v-model="thirdActiveName" type="card">
										<el-tab-pane label="社区上刊率" name="first">
											<div class="community-percent">
												<div class="select-wrap">
													<span>
														<el-select v-model="comSearch" placeholder="请选择">
															<el-option value="资源名称"></el-option>
														</el-select>
													</span>
													<span style="margin-right: 6px">
														<el-input v-model="comInput" placeholder="请输入内容" class="s-input"></el-input>
													</span>
													<span style="margin-right: 6px">
														<el-button type="primary" icon="el-icon-search">搜索</el-button>
													</span>
													<span>
														<el-button plain>导出</el-button>
													</span>
												</div>
												<div class="select-wrap select2">
													<div class="data-tab">
														<span>
															上刊率查询范围：
														</span>
														<span>
															<el-radio-group v-model="comSearchTime" size="mini">
																<el-radio-button label="最近半年"></el-radio-button>
																<el-radio-button label="最近三个月"></el-radio-button>
															</el-radio-group>
														</span>
														<span style="margin-left: 10px">
															<div class="block">
																<el-date-picker size="mini" v-model="comSearchDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
																</el-date-picker>
															</div>
														</span>
														<span style="position: relative; top: 4px; margin-left: 10px">点位创建日期：</span>
														<span>
															<div class="block">
																<el-date-picker size="mini" v-model="comSearchDate2" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
																</el-date-picker>
															</div>
														</span>
														<span style="position: relative; top: 4px; margin-left: 10px">上刊率：</span>
														<span>
															<div class="upPercent-wrap">
																<div class="input-wrap">
																	<el-input v-model="cUpMin" placeholder="" @focus="cinputFocus = true" @blur="cinputFocus = false">
																		<em slot="suffix" style="position: relative;top: 3px">%</em>
																	</el-input>
																	<span style="margin: 0 6px;position: relative;top: 3px">-</span>
																	<el-input v-model="cUpMax" placeholder="" @focus="cinputFocus = true" @blur="cinputFocus = false">
																		<em slot="suffix" style="position: relative;top: 2px">%</em>
																	</el-input>
																</div>
																<div class="upPercent-wrap-mask" v-if="cinputFocus">
																	<el-button type="text" @click="cClear">清除</el-button>
																	<el-button plain class="confirm" @click="cConfirm">确定</el-button>
																</div>
															</div>
														</span>
														<span>
														</span>
													</div>
												</div>
												<div class="table-wrap table-wrap2">
													<el-table class="CUP-table" :data="CUPData" border style="width: 100%" height="390">
														<el-table-column type="index" label="序号" width="50">
														</el-table-column>
														<el-table-column prop="city" label="城市" min-width="10%">
														</el-table-column>
														<el-table-column prop="area" label="区域" :filters="[{ text: '天河区', value: '天河区' }, { text: '越秀区', value:'越秀区' }]" :filter-method="filterArea" min-width="10%">
														</el-table-column>
														<el-table-column prop="recName" label="资源名称" min-width="18%">
														</el-table-column>
														<el-table-column prop="adDoorName" label="广告门名称" min-width="10%">
														</el-table-column>
														<el-table-column prop="adNo" label="广告编号" :filters="[{ text: 'A', value: 'A' }, { text: 'B', value: 'B' }]" :filter-method="filterAdNo" min-width="8%">
														</el-table-column>
														<el-table-column prop="createTime" label="点位创建日期" sortable min-width="20%">
														</el-table-column>
														<el-table-column label="上刊率" sortable :sort-method="sortUpPercent" min-width="10%">
															<template slot-scope="scope">
																<span>{{scope.row.upPercent}}%</span>
															</template>
														</el-table-column>
														<el-table-column label="投放金额" sortable :sort-orders="[2,1]" min-width="10%">
															<template slot-scope="scope">
																<span>&yen;{{scope.row.price}}</span>
															</template>
														</el-table-column>
													</el-table>
												</div>
											</div>
										</el-tab-pane>
										<el-tab-pane label="点位上刊率" name="second">
											<div class="point-percent">
												<div class="select-wrap">
													<span>
														<el-select v-model="poiSearch" placeholder="请选择">
															<el-option value="资源名称"></el-option>
														</el-select>
													</span>
													<span style="margin-right: 6px">
														<el-input v-model="poiInput" placeholder="请输入内容" class="s-input"></el-input>
													</span>
													<span style="margin-right: 6px">
														<el-button type="primary" icon="el-icon-search">搜索</el-button>
													</span>
													<span>
														<el-button plain>导出</el-button>
													</span>
												</div>
												<div class="select-wrap select2">
													<div class="data-tab">
														<span>
															上刊率查询范围：
														</span>
														<span>
															<el-radio-group v-model="poiSearchTime" size="mini">
																<el-radio-button label="最近半年"></el-radio-button>
																<el-radio-button label="最近三个月"></el-radio-button>
															</el-radio-group>
														</span>
														<span style="margin-left: 10px">
															<div class="block">
																<el-date-picker size="mini" v-model="poiSearchDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
																</el-date-picker>
															</div>
														</span>
														<span style="position: relative; top: 4px; margin-left: 10px">点位创建日期：</span>
														<span>
															<div class="block">
																<el-date-picker size="mini" v-model="poiSearchDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
																</el-date-picker>
															</div>
														</span>
														<span style="position: relative; top: 4px; margin-left: 10px">上刊率：</span>
														<span>
															<div class="upPercent-wrap">
																<div class="input-wrap">
																	<el-input v-model="pUpMin" placeholder="" @focus="cinputFocus = true" @blur="cinputFocus = false">
																		<em slot="suffix" style="position: relative;top: 3px">%</em>
																	</el-input>
																	<span style="margin: 0 6px;position: relative;top: 3px">-</span>
																	<el-input v-model="pUpMax" placeholder="" @focus="cinputFocus = true" @blur="cinputFocus = false">
																		<em slot="suffix" style="position: relative;top: 2px">%</em>
																	</el-input>
																</div>
																<div class="upPercent-wrap-mask" v-if="cinputFocus">
																	<el-button type="text" @click="pClear">清除</el-button>
																	<el-button plain class="confirm" @click="pConfirm">确定</el-button>
																</div>
															</div>
														</span>
														<span>
														</span>
													</div>
												</div>
												<div class="table-wrap table-wrap2">
													<el-table class="CUP-table PUP-table" :data="PUPData" border style="width: 100%" height="390">
														<el-table-column type="index" label="序号" width="50">
														</el-table-column>
														<el-table-column prop="city" label="城市" min-width="10%">
														</el-table-column>
														<el-table-column prop="area" label="区域" :filters="[{ text: '天河区', value: '天河区' }, { text: '越秀区', value:'越秀区' }]" :filter-method="filterArea" min-width="10%">
														</el-table-column>
														<el-table-column prop="recName" label="资源名称" min-width="18%">
														</el-table-column>
														<el-table-column prop="createTime" label="点位创建日期" sortable :sort-orders="[2,1]" min-width="20%">
														</el-table-column>
														<el-table-column label="上刊率" sortable :sort-method="sortUpPercent" :sort-orders="[2,1]" min-width="10%">
															<template slot-scope="scope">
																<span>{{scope.row.upPercent}}%</span>
															</template>
														</el-table-column>
														<el-table-column label="投放金额" sortable :sort-orders="[2,1]" min-width="10%">
															<template slot-scope="scope">
																<span>&yen;{{scope.row.price}}</span>
															</template>
														</el-table-column>
													</el-table>
												</div>
											</div>
										</el-tab-pane>
									</el-tabs>
								</div>
							</div>
						</div>
					</el-tab-pane>
				</el-tabs>
			</div>

		</div>
	</div>
</template>

<script>
import "echarts/lib/chart/map";
import "echarts/map/js/china.js";

export default {
    name: "dataAnalysis",
    data() {
        return {
            //数据概况
            activeName: "first",
            citys: ["全国", "北京市", "上海市", "广州市", "深圳市"],
            currCity: "全国",
            //数据总览   如果选中全国就是北上广深渝川，如果选中城市就是市区
            allData: [
                {
                    data: [
                        { name: "天河区", value: 5335 },
                        { name: "越秀区", value: 3410 },
                        { name: "海珠区", value: 7234 },
                        { name: "荔湾区", value: 2234 },
                        { name: "白云区", value: 3234 },
                        { name: "黄埔区", value: 4234 },
                        { name: "番禺区", value: 2234 },
                        { name: "其他", value: 1234 }
                    ]
                },
                {
                    legendData: [
                        "天河区",
                        "越秀区",
                        "海珠区",
                        "荔湾区",
                        "白云区",
                        "黄埔区",
                        "番禺区",
                        "其他"
                    ]
                }
            ],
            cityDataTableVisible: false,
            cityDataTable: [
                {
                    area: "天河区",
                    recNum: "452",
                    adDoorNum: "555",
                    pointNum: "666",
                    upPercent: "45"
                },
                {
                    area: "越秀区",
                    recNum: "452",
                    adDoorNum: "555",
                    pointNum: "666",
                    upPercent: "45"
                }
            ],
            //关键数据展示
            /*card2time: '本月',
        keyDataOfMonth: [
          {thisMonth: 9, lastMonth: 8, percent: '8.32%'},
          {thisMonth: 18, lastMonth: 19, percent: '0.32%'},
          {thisMonth: '82.87%', lastMonth: '72.27%', percent: '8.32%'},
          {thisMonth: 9, lastMonth: 8, percent: '8.32%'},
          {thisMonth: '75,021', lastMonth: '65,021', percent: '8.32%'},
          {thisMonth: '75,821', lastMonth: '75,021', percent: '8.32%'},
          {thisMonth: 9, lastMonth: 8, percent: '8.32%'}
        ],
        //年
        keyDataOfYear: [
          {thisMonth: 70, lastMonth: 80, percent: '8.32%'},
          {thisMonth: 18, lastMonth: 19, percent: '0.32%'},
          {thisMonth: '82.87%', lastMonth: '72.27%', percent: '8.32%'},
          {thisMonth: 90, lastMonth: 100, percent: '8.32%'},
          {thisMonth: '75,021', lastMonth: '65,021', percent: '8.32%'},
          {thisMonth: '75,821', lastMonth: '75,021', percent: '8.32%'},
          {thisMonth: 9, lastMonth: 8, percent: '8.32%'}
        ],*/
            //关键数据总量趋势
            card3data: "资源数",
            card3time: "最近半年",
            //关键数据总量折线图X轴
            card3Xdate: [
                "2017/08/15",
                "2017/09/15",
                "2017/10/15",
                "2017/11/15",
                "2017/12/15",
                "2018/01/15",
                "2018/02/15"
            ],
            //关键数据总量折线图Y轴
            card3Ydata: [520, 632, 901, 634, 890, 930, 1020],
            card3Date: [new Date() - 3600 * 1000 * 24 * 180, new Date()],
            //关键数据增量对比
            card4data: "资源数",
            card4time: "最近半年",
            card4Date1: [new Date() - 3600 * 1000 * 24 * 180, new Date()],
            card4Date2: "",
            dateCompare: false,
            //关键数据增量柱状图X轴
            card4Xdate: [
                "2016/08 对比 2017/08",
                "2016/09 对比 2017/09",
                "2016/10 对比 2017/10",
                "2016/11 对比 2017/11",
                "2016/12 对比 2017/12",
                "2017/01 对比 2018/01"
            ],

            //行业订单总量趋势
            card5business: ["房地产"],
            currBusiness: "其他",
            //剩下的行业
            businessArr: [
                "汽车",
                "健身运动",
                "旅游",
                "互联网服务",
                "丽人",
                "其他",
                "还有很多"
            ],
            //时间
            currTime: "自然天",
            card5Date: [new Date() - 3600 * 1000 * 24 * 30, new Date()],
            //数据
            card5data: "订单金额",
            //行业订单总量趋势折线图Y
            card5Ydata: [52120, 50632, 60001, 90034, 80090, 90130, 141020],
            //行业订单总量趋势折线图X
            card5Xdate: [
                "2017/08/15",
                "2017/09/15",
                "2017/10/15",
                "2017/11/15",
                "2017/12/15",
                "2018/01/15",
                "2018/02/15"
            ],
            //行业订单占比
            card6data: "订单金额",
            //饼图数据
            card6dataArr: [
                {
                    data: [
                        { value: 5335, name: "医美" },
                        { value: 3410, name: "房地产" },
                        { value: 2734, name: "汽车" },
                        { value: 1035, name: "本地生活" },
                        { value: 1548, name: "餐饮美食" },
                        { value: 1548, name: "其他" }
                    ]
                },
                {
                    legendData: [
                        "医美",
                        "房地产",
                        "汽车",
                        "本地生活",
                        "餐饮美食",
                        "其他"
                    ]
                }
            ],
            //表格数据
            orderTable: [
                {
                    number: "1",
                    business: "地产",
                    totalPrice: "21,234,544",
                    orderNum: "148",
                    adOwner: "欧阳震华"
                },
                {
                    number: "2",
                    business: "地产",
                    totalPrice: "21,234,544",
                    orderNum: "148",
                    adOwner: "欧阳震华"
                },
                {
                    number: "3",
                    business: "地产",
                    totalPrice: "21,234,544",
                    orderNum: "148",
                    adOwner: "欧阳震华"
                },
                {
                    number: "4",
                    business: "地产",
                    totalPrice: "21,234,544",
                    orderNum: "148",
                    adOwner: "欧阳震华"
                },
                {
                    number: "5",
                    business: "地产",
                    totalPrice: "21,234,544",
                    orderNum: "148",
                    adOwner: "欧阳震华"
                },
                {
                    number: "6",
                    business: "地产",
                    totalPrice: "21,234,544",
                    orderNum: "148",
                    adOwner: "欧阳震华"
                },
                {
                    number: "7",
                    business: "地产",
                    totalPrice: "21,234,544",
                    orderNum: "148",
                    adOwner: "欧阳震华"
                },
                {
                    number: "8",
                    business: "地产",
                    totalPrice: "21,234,544",
                    orderNum: "148",
                    adOwner: "欧阳震华"
                }
            ],

            //入驻物业排行
            card7data: "资源数量",
            card7Date: [new Date() - 3600 * 1000 * 24 * 180, new Date()],
            card7time: "最近半年",
            card7Xdate: [
                "万科物业",
                "绿城物业",
                "保利物业",
                "中海物业",
                "长城物业",
                "碧桂园物业",
                "金地物业",
                "龙湖物业",
                "还有很多"
            ],
            PropertyRankTableVisible: false,
            PropertyRankTable: [
                {
                    rank: "1",
                    property: "万科物业",
                    resource: 1518,
                    adDoor: 1518
                },
                {
                    rank: "2",
                    property: "万科物业",
                    resource: 1518,
                    adDoor: 1518
                },
                {
                    rank: "3",
                    property: "万科物业",
                    resource: 1518,
                    adDoor: 1518
                },
                {
                    rank: "4",
                    property: "万科物业",
                    resource: 1518,
                    adDoor: 1518
                },
                {
                    rank: "5",
                    property: "万科物业",
                    resource: 1518,
                    adDoor: 1518
                },
                {
                    rank: "6",
                    property: "万科物业",
                    resource: 1518,
                    adDoor: 1518
                },
                {
                    rank: "6",
                    property: "万科物业",
                    resource: 1518,
                    adDoor: 1518
                },
                {
                    rank: "6",
                    property: "万科物业",
                    resource: 1518,
                    adDoor: 1518
                },
                {
                    rank: "6",
                    property: "万科物业",
                    resource: 1518,
                    adDoor: 1518
                }
            ],
            //广告主排行
            card8data: "订单金额",
            card8Date: [new Date() - 3600 * 1000 * 24 * 180, new Date()],
            card8time: "最近半年",
            card8Xdate: [
                "广州曙光整形医院",
                "广州曙光整形医院2",
                "广州曙光整形医院3",
                "广州曙光整形医院4",
                "广州曙光整形医院5",
                "广州曙光整形医院6",
                "广州曙光整形医院",
                "龙湖物业",
                "还有很多"
            ],
            adOwnerRankTableVisible: false,
            adOwnerRankTable: [
                {
                    rank: "1",
                    adOwner: "维他柠檬茶",
                    price: "151,812,211",
                    number: 1518
                },
                {
                    rank: "1",
                    adOwner: "中影国际影城",
                    price: "151,812,211",
                    number: 1518
                }
            ],

            //销售业绩排行
            card9data: "销售金额",
            card9Date: [new Date() - 3600 * 1000 * 24 * 180, new Date()],
            card9time: "最近半年",
            card9Xdate: [
                "金城武",
                "吴彦祖",
                "罗贯中",
                "张学友",
                "陈意涵",
                "杨幂",
                "迪丽热巴",
                "易烊千玺",
                "古天乐"
            ],
            salesRankTableVisible: false,
            salesRankTable: [
                {
                    rank: "1",
                    sale: "金城武",
                    price: "111,518",
                    number: 1518
                },
                {
                    rank: "2",
                    sale: "吴彦祖",
                    price: "11,518",
                    number: 1518
                }
            ],

            //城市对比
            //全国数据表格
            allCitysData: [
                {
                    num: "1",
                    city: "广州",
                    recNum: "1,091",
                    adDoors: "31,201",
                    points: "31,203",
                    upPercent: "66.66",
                    adOwners: "31,412",
                    orders: "1,482",
                    totalPrice: "12,345,678"
                },
                {
                    num: "2",
                    city: "广州",
                    recNum: "11,091",
                    adDoors: "31,201",
                    points: "31,203",
                    upPercent: "66.66",
                    adOwners: "31,412",
                    orders: "1,482",
                    totalPrice: "12,345,678"
                },
                {
                    num: "3",
                    city: "广州",
                    recNum: "12,091",
                    adDoors: "31,201",
                    points: "313,203",
                    upPercent: "66.66",
                    adOwners: "31,412",
                    orders: "1,482",
                    totalPrice: "12,345,678"
                },
                {
                    num: "6",
                    city: "广州",
                    recNum: "1,091",
                    adDoors: "31,201",
                    points: "31,203",
                    upPercent: "61.66",
                    adOwners: "31,412",
                    orders: "12,482",
                    totalPrice: "121,345,678"
                },
                {
                    num: "4",
                    city: "广州",
                    recNum: "1,091",
                    adDoors: "31,201",
                    points: "31,203",
                    upPercent: "66.66",
                    adOwners: "31,412",
                    orders: "1,482",
                    totalPrice: "12,345,678"
                },
                {
                    num: "5",
                    city: "广州",
                    recNum: "1,091",
                    adDoors: "31,201",
                    points: "31,203",
                    upPercent: "66.66",
                    adOwners: "31,412",
                    orders: "1,482",
                    totalPrice: "12,345,678"
                }
                /* {
             num: '1',
             city: '广州',
             recNum: '1,091',
             adDoors: '31,201',
             points: '31,203',
             upPercent: '66.66',
             adOwners: '31,412',
             orders: '1,482',
             totalPrice: '12,345,678'
           },
           {
             num: '1',
             city: '广州',
             recNum: '1,091',
             adDoors: '31,201',
             points: '31,203',
             upPercent: '66.66',
             adOwners: '31,412',
             orders: '1,482',
             totalPrice: '12,345,678'
           },
           {
             num: '1',
             city: '广州',
             recNum: '1,091',
             adDoors: '31,201',
             points: '31,203',
             upPercent: '66.66',
             adOwners: '31,412',
             orders: '1,482',
             totalPrice: '12,345,678'
           },
           {
             num: '1',
             city: '广州',
             recNum: '1,091',
             adDoors: '31,201',
             points: '31,203',
             upPercent: '66.66',
             adOwners: '31,412',
             orders: '1,482',
             totalPrice: '12,345,678'
           },
           {
             num: '1',
             city: '广州',
             recNum: '1,091',
             adDoors: '31,201',
             points: '31,203',
             upPercent: '66.66',
             adOwners: '31,412',
             orders: '1,482',
             totalPrice: '12,345,678'
           },*/
            ],
            //城市数据对比button
            cityBattleData: "资源数",
            cityBattleTime: "最近半年",
            secCard2time: [new Date() - 3600 * 1000 * 24 * 180, new Date()],
            selectCity: ["北京", "上海", "深圳", "广州", "成都", "重庆"],
            cities: [
                { label: "提示：最多可同时选择8项", options: [""] },
                {
                    label: "热门城市",
                    options: ["北京", "上海", "深圳", "广州", "成都", "重庆"]
                },
                {
                    label: "广东省",
                    options: [
                        "广州",
                        "深圳",
                        "珠海",
                        "佛山",
                        "东莞",
                        "茂名",
                        "湛江"
                    ]
                },
                {
                    label: "广西壮族自治区",
                    options: [
                        "南宁",
                        "桂林",
                        "柳州",
                        "梧州",
                        "百色",
                        "贵港",
                        "河池",
                        "钦州",
                        "防城港"
                    ]
                },
                {
                    label: "湖南省",
                    options: [
                        "广州",
                        "深圳",
                        "珠海",
                        "佛山",
                        "东莞",
                        "茂名",
                        "湛江"
                    ]
                },
                {
                    label: "湖北省",
                    options: [
                        "广州",
                        "深圳",
                        "珠海",
                        "佛山",
                        "东莞",
                        "茂名",
                        "湛江"
                    ]
                }
            ],
            //城市上刊率对比
            secCard3time: [new Date() - 3600 * 1000 * 24 * 180, new Date()],
            cityBattleTime2: "最近半年",
            selectCity2: ["北京", "上海", "深圳", "广州", "成都", "重庆"],
            //城市关键数据对比
            secCard4time: [new Date() - 3600 * 1000 * 24 * 180, new Date()],
            cityBattleTime3: "最近半年",
            selectCity3: ["北京", "上海", "深圳", "广州", "成都", "重庆"],
            citykeyData: [
                { name: "北京", value: 5335 },
                { name: "上海", value: 3410 },
                { name: "深圳", value: 7234 },
                { name: "广州", value: 2234 },
                { name: "成都", value: 3234 },
                { name: "重庆", value: 4234 }
            ],

            //点位分析
            thirdActiveName: "first",
            pointSelect: "自然天",
            comSearchTime: "最近半年",
            comSearchDate: [new Date() - 3600 * 1000 * 24 * 180, new Date()],
            comSearchDate2: "",
            pointDate: "",
            comSearch: "资源名称",
            comInput: "",
            cUpMin: "",
            cUpMax: "",
            cinputFocus: false,
            //社区上刊率表格
            CUPData: [
                {
                    NO: 1,
                    city: "广州",
                    area: "越秀区",
                    recName: "绿地世纪花园二期",
                    adDoorName: "东门",
                    adNo: "A",
                    createTime: "2015/03/07",
                    upPercent: "66.66",
                    price: "129,621"
                },
                {
                    NO: 1,
                    city: "广州",
                    area: "越秀区",
                    recName: "绿地世纪花园二期",
                    adDoorName: "东门",
                    adNo: "A",
                    createTime: "2015/03/07",
                    upPercent: "66.66",
                    price: "129,621"
                },
                {
                    NO: 1,
                    city: "广州",
                    area: "越秀区",
                    recName: "绿地世纪花园二期",
                    adDoorName: "东门",
                    adNo: "A",
                    createTime: "2015/03/07",
                    upPercent: "66.66",
                    price: "129,621"
                },
                {
                    NO: 1,
                    city: "广州",
                    area: "越秀区",
                    recName: "绿地世纪花园二期",
                    adDoorName: "东门",
                    adNo: "A",
                    createTime: "2015/03/07",
                    upPercent: "66.66",
                    price: "129,621"
                },
                {
                    NO: 1,
                    city: "广州",
                    area: "越秀区",
                    recName: "绿地世纪花园二期",
                    adDoorName: "东门",
                    adNo: "A",
                    createTime: "2015/03/07",
                    upPercent: "66.66",
                    price: "129,621"
                }
            ],
            //点位上刊率
            poiSearchTime: "最近半年",
            poiSearchDate: "",
            poiInput: "",
            pUpMin: "",
            pUpMax: "",
            poiSearch: "资源名称",
            PUPData: [
                {
                    NO: 1,
                    city: "广州",
                    area: "越秀区",
                    recName: "绿地世纪花园二期",
                    createTime: "2015/03/07",
                    upPercent: "66.66",
                    price: "129,621"
                },
                {
                    NO: 1,
                    city: "广州",
                    area: "越秀区",
                    recName: "绿地世纪花园二期",
                    createTime: "2015/03/07",
                    upPercent: "66.66",
                    price: "129,621"
                },
                {
                    NO: 1,
                    city: "广州",
                    area: "越秀区",
                    recName: "绿地世纪花园二期",
                    createTime: "2015/03/07",
                    upPercent: "66.66",
                    price: "129,621"
                },
                {
                    NO: 1,
                    city: "广州",
                    area: "越秀区",
                    recName: "绿地世纪花园二期",
                    createTime: "2015/03/07",
                    upPercent: "66.66",
                    price: "129,621"
                },
                {
                    NO: 1,
                    city: "广州",
                    area: "越秀区",
                    recName: "绿地世纪花园二期",
                    createTime: "2015/03/07",
                    upPercent: "66.66",
                    price: "129,621"
                }
            ],

            colorArr: [
                "#975fe4",
                "#3aa0ff",
                "#36cbcb",
                "#4dcb73",
                "#fad337",
                "#f2637b",
                "#6081FF",
                "#FE752A"
            ],
            colortest: "red",
            //图表数据
            //城市数据对比
            cityBattleLineSeries: [
                {
                    name: "北京",
                    type: "line",
                    data: [17220, 23432, 34031, 44354, 55490, 64630]
                },
                {
                    name: "上海",
                    type: "line",
                    data: [11210, 21812, 32491, 44334, 54190, 69330]
                },
                {
                    name: "深圳",
                    type: "line",
                    data: [15140, 25132, 31401, 24154, 45190, 66330]
                },
                {
                    name: "广州",
                    type: "line",
                    data: [13220, 34332, 33031, 45534, 43690, 63830]
                },
                {
                    name: "成都",
                    type: "line",
                    data: [8250, 39432, 39041, 49534, 58290, 69330]
                },
                {
                    name: "重庆",
                    type: "line",
                    data: [11250, 4432, 39041, 49534, 51290, 69330]
                },
                {
                    name: "",
                    type: "line",
                    data: []
                },
                {
                    name: "",
                    type: "line",
                    data: []
                }
            ]
        };
    },
    mounted() {
        this.allDataPie();
        this.keyDataLine();
        this.keyDateBar();
        this.busOrderLine();
        this.allOrderPie();
        this.PropertyRank();
        this.adOwnerRank();
        this.salesRank();
        this.chinaMap();
        this.cityPercentBattleBar();
        this.keyDataPie2();
        this.cityBattleLine();
    },
    methods: {
        //
        changecard3Time(res) {
            if (res == "最近半年") {
                //  card3Date: [new Date() - 3600 * 1000 * 24 * 180 , new Date()],
                this.card3Date = [
                    new Date() - 3600 * 1000 * 24 * 180,
                    new Date()
                ];
            } else {
                this.card3Date = [
                    new Date() - 3600 * 1000 * 24 * 365,
                    new Date()
                ];
            }
        },
        selectcard5Date(res) {
            console.log(res);
            if (res == "自然天") {
                this.card5Date = [
                    new Date() - 3600 * 1000 * 24 * 30,
                    new Date()
                ];
            } else {
                this.card5Date = [
                    new Date() - 3600 * 1000 * 24 * 180,
                    new Date()
                ];
            }
        },

        //选择城市
        changeCity(index) {
            this.currCity = this.citys[index];
        },

        //图表
        //数据总览 饼图
        allDataPie() {
            let allDataPie = this.$echarts.init(this.$refs.allDataPie);
            allDataPie.setOption({
                color: [
                    "#975fe4",
                    "#3aa0ff",
                    "#36cbcb",
                    "#4dcb73",
                    "#fad337",
                    "#f2637b",
                    "#6081FF",
                    "#FE752A"
                ],
                tooltip: {
                    trigger: "item",
                    // formatter: "{a} <br/>{b}: {c} ({d}%)",
                    formatter: function(params) {
                        return (
                            '<p style="background-color:#F4F6F6;font-size: 12px; color: #808080; width: 200px;height: 36px; display: flex; justify-content: space-between;padding: 0px 10px; align-items: center;box-sizing: border-box;margin-bottom: -20px;">' +
                            "<span>" +
                            params.name +
                            "</span>" +
                            "<span>" +
                            "数据" +
                            "</span>" +
                            "</p>" +
                            "<br/>" +
                            '<p style="display: flex; justify-content: space-between;padding: 0px 10px; box-sizing: border-box; align-items: center; font-size: 12px;color: #2C313C;height: 32px; margin-bottom: -20px;">' +
                            '<span><i style="display: inline-block; width: 6px; height: 6px; border-radius: 50%;background-color: #4AA6FC;margin-right: 5px"></i>' +
                            params.seriesName +
                            "</span>" +
                            params.value +
                            "</p>" +
                            "<br/>" +
                            '<p style="display: flex; justify-content: space-between;padding: 0px 10px; box-sizing: border-box; align-items: center; font-size: 12px;color: #2C313C;height: 32px;">' +
                            '<span><i style="display: inline-block; width: 6px; height: 6px; border-radius: 50%;background-color: #4AA6FC;margin-right: 5px"></i>' +
                            "占比" +
                            "</span>" +
                            params.percent +
                            "%" +
                            "</p>"
                        );
                    },
                    backgroundColor: "#FFFFFF",
                    textStyle: {
                        color: "#2C313C"
                    },
                    borderColor: "#ddd",
                    borderWidth: 1,
                    padding: 0
                },
                legend: {
                    orient: "horizontal",
                    data: this.allData[1].legendData,
                    left: "center",
                    top: "90%",
                    itemWidth: 8,
                    itemHeight: 8,
                    itemGap: 24
                },
                series: [
                    {
                        name: "资源",
                        type: "pie",
                        center: ["15%", "50%"],
                        radius: ["42%", "55%"],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: "center"
                            },
                            emphasis: {
                                show: false,
                                textStyle: {
                                    fontSize: "30",
                                    fontWeight: "bold"
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: this.allData[0].data
                    },
                    {
                        name: "广告门",
                        type: "pie",
                        center: ["38%", "50%"],
                        radius: ["42%", "55%"],
                        color: this.colorArr,
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: "center",
                                formatter: "{a}\n{b}: ￥{c}"
                            },
                            emphasis: {
                                show: false,
                                textStyle: {
                                    fontSize: "20",
                                    fontWeight: "bold",
                                    color: "#000"
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: this.allData[0].data
                    },
                    {
                        name: "点位",
                        type: "pie",
                        center: ["62%", "50%"],
                        radius: ["42%", "55%"],
                        color: this.colorArr,
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: "center",
                                formatter: "{a}\n{b}: ￥{c}"
                            },
                            emphasis: {
                                show: false,
                                textStyle: {
                                    fontSize: "20",
                                    fontWeight: "bold",
                                    color: "#000"
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: this.allData[0].data
                    },
                    {
                        name: "上刊率",
                        type: "pie",
                        center: ["85%", "50%"],
                        radius: ["42%", "55%"],
                        color: this.colorArr,
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: "center",
                                formatter: "{a}\n{b}: ￥{c}"
                            },
                            emphasis: {
                                show: false,
                                textStyle: {
                                    fontSize: "20",
                                    fontWeight: "bold",
                                    color: "#000"
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: this.allData[0].data
                    }
                ]
            });
            window.addEventListener("resize", function() {
                allDataPie.resize();
            });
        },
        //关键数据总量趋势 折线图
        keyDataLine() {
            let keyDataLine = this.$echarts.init(this.$refs.keyDataLine);
            keyDataLine.setOption({
                tooltip: {
                    //提示框
                    trigger: "axis", //触发类型(坐标轴触发)
                    axisPointer: {
                        type: "cross",
                        label: {
                            backgroundColor: "#4AA6FC"
                        }
                    },
                    backgroundColor: "#FFFFFF",
                    padding: 0,
                    borderColor: "#dddddd",
                    borderWidth: 1,
                    formatter: function(params) {
                        return (
                            '<p style="background-color:#F4F6F6;font-size: 12px; color: #808080; width: 200px;height: 36px; display: flex; justify-content: space-between;padding: 0px 10px; align-items: center;box-sizing: border-box;margin-bottom: -20px;">' +
                            "<span>" +
                            "时间" +
                            "</span>" +
                            "<span>" +
                            "数量" +
                            "</span>" +
                            "</p>" +
                            "<br/>" +
                            '<p style="display: flex; justify-content: space-between;padding: 0px 10px; box-sizing: border-box; align-items: center; font-size: 12px;color: #2C313C;height: 32px; ">' +
                            "<span>" +
                            params[0].name +
                            "</span>" +
                            params[0].value +
                            "</p>"
                        );
                    }
                },
                grid: {
                    left: "3%",
                    right: "4%",
                    bottom: "14%",
                    containLabel: true
                },
                xAxis: {
                    type: "category",
                    boundaryGap: false, //坐标的刻度是否在中间
                    data: this.card3Xdate,
                    axisLine: {
                        //坐标轴线条相关设置(颜色等)
                        lineStyle: {
                            color: "#E8E8E8"
                        }
                    },
                    axisLabel: {
                        //坐标轴刻度标签
                        margin: 10, //刻度标签与轴线之间的距离
                        textStyle: {
                            fontFamily: "DINPro-Regular",
                            color: "#2C313C" //坐标轴刻度文字的颜色
                        }
                    }
                },
                yAxis: {
                    type: "value",
                    axisLine: {
                        //坐标轴线条相关设置(颜色等)
                        lineStyle: {
                            color: "#E8E8E8"
                        }
                    },
                    axisLabel: {
                        //坐标轴刻度标签
                        margin: 7, //刻度标签与轴线之间的距离
                        textStyle: {
                            fontFamily: "DINPro-Regular",
                            color: "#2C313C" //坐标轴刻度文字的颜色
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: "#E8E8E8",
                            type: "dashed"
                        }
                    }
                },
                series: [
                    {
                        data: this.card3Ydata,
                        type: "line",
                        color: "rgba(58,160,255,0.3)",
                        smooth: false,
                        areaStyle: {}, //区域填充样式
                        itemStyle: {
                            normal: {
                                lineStyle: {
                                    width: 2, //折线宽度
                                    color: "#1890ff" //折线颜色
                                }
                            }
                        }
                    }
                ]
            });
            window.addEventListener("resize", function() {
                keyDataLine.resize();
            });
        },
        //关键数据增量对比 柱状图
        keyDateBar() {
            let keyDataBar = this.$echarts.init(this.$refs.keyDataBar);
            keyDataBar.setOption({
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        // 坐标轴指示器，坐标轴触发有效
                        type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
                        shadowStyle: {
                            shadowColor: "#f5f5f5"
                        }
                    },
                    // formatter: function (params) {
                    //   let t1 = params[0].name.substr(0, 7) + '：' + params[0].data;
                    //   let t2 = params[0].name.slice(11) + '：' + params[1].data;
                    //   return '资源数' + '<br/>' + t1 + '<br/>' + t2;
                    // }
                    backgroundColor: "#FFFFFF",
                    padding: 0,
                    borderColor: "#dddddd",
                    borderWidth: 1,
                    formatter: function(params) {
                        return (
                            '<p style="background-color:#F4F6F6;font-size: 12px; color: #808080; width: 200px;height: 36px; display: flex; justify-content: space-between;padding: 0px 10px; align-items: center;box-sizing: border-box;margin-bottom: -20px;">' +
                            "<span>" +
                            "时间" +
                            "</span>" +
                            "<span>" +
                            "数量" +
                            "</span>" +
                            "</p>" +
                            "<br/>" +
                            '<p style="display: flex; justify-content: space-between;padding: 0px 10px; box-sizing: border-box; align-items: center; font-size: 12px;color: #2C313C;height: 32px; ">' +
                            '<span><i style="display: inline-block; width: 6px; height: 6px; border-radius: 50%;background-color: #4AA6FC;margin-right: 5px"></i>' +
                            params[0].name.substr(0, 7) +
                            "</span>" +
                            params[0].data +
                            "</p>" +
                            "</br>" +
                            '<p style="display: flex; justify-content: space-between;padding: 0px 10px; box-sizing: border-box; align-items: center; font-size: 12px;color: #2C313C;height: 32px; margin-top: -20px">' +
                            '<span><i style="display: inline-block; width: 6px; height: 6px; border-radius: 50%;background-color: #BDDEFD;margin-right: 5px"></i>' +
                            params[0].name.slice(11) +
                            "</span>" +
                            params[1].data +
                            "</p>"
                        );
                    }
                },
                legend: {
                    left: "center",
                    data: ["2016/08-2017/01", "2017/08-2017/01"]
                },
                grid: {
                    left: "3%",
                    right: "4%",
                    bottom: "3%",
                    containLabel: true
                },
                xAxis: [
                    {
                        type: "category",
                        data: this.card4Xdate,
                        axisTick: {
                            alignWithLabel: true
                        },
                        axisLabel: {
                            //坐标轴刻度标签
                            margin: 7, //刻度标签与轴线之间的距离
                            textStyle: {
                                fontFamily: "DINPro-Regular",
                                color: "#2C313C" //坐标轴刻度文字的颜色
                            }
                        },
                        axisLine: {
                            //坐标轴线条相关设置(颜色等)
                            lineStyle: {
                                color: "#E8E8E8"
                            }
                        }
                    }
                ],
                yAxis: [
                    {
                        type: "value",
                        axisLine: {
                            //坐标轴线条相关设置(颜色等)
                            lineStyle: {
                                color: "#E8E8E8"
                            }
                        },
                        axisLabel: {
                            //坐标轴刻度标签
                            margin: 7, //刻度标签与轴线之间的距离
                            textStyle: {
                                fontFamily: "DINPro-Regular",
                                color: "#2C313C" //坐标轴刻度文字的颜色
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: "#E8E8E8",
                                type: "dashed"
                            }
                        }
                    }
                ],
                series: [
                    {
                        color: "#4AA6FC",
                        name: "2016/08-2017/01",
                        type: "bar",
                        barWidth: "10%",
                        data: [400, 502, 50, 134, 390, 330, 220]
                    },
                    {
                        color: "#BDDEFD",
                        name: "2017/08-2017/01",
                        type: "bar",
                        barWidth: "10%",
                        data: [290, 152, 200, 334, 190, 230, 480]
                    }
                ]
            });
            window.addEventListener("resize", function() {
                keyDataBar.resize();
            });
        },
        //行业订单总量趋势 折线图
        busOrderLine() {
            let busOrderLine = this.$echarts.init(this.$refs.busOrderLine);
            busOrderLine.setOption({
                tooltip: {
                    //提示框
                    trigger: "axis", //触发类型(坐标轴触发)
                    axisPointer: {
                        type: "cross",
                        label: {
                            backgroundColor: "#4AA6FC"
                        }
                    },
                    backgroundColor: "#FFFFFF",
                    padding: 0,
                    borderColor: "#dddddd",
                    borderWidth: 1,
                    formatter: function(params) {
                        return (
                            '<p style="background-color:#F4F6F6;font-size: 12px; color: #808080; width: 200px;height: 36px; display: flex; justify-content: space-between;padding: 0px 10px; align-items: center;box-sizing: border-box;margin-bottom: -20px;">' +
                            "<span>" +
                            "时间" +
                            "</span>" +
                            "<span>" +
                            "数量" +
                            "</span>" +
                            "</p>" +
                            "<br/>" +
                            '<p style="display: flex; justify-content: space-between;padding: 0px 10px; box-sizing: border-box; align-items: center; font-size: 12px;color: #2C313C;height: 32px; ">' +
                            "<span>" +
                            params[0].name +
                            "</span>" +
                            params[0].value +
                            "</p>"
                        );
                    }
                },
                grid: {
                    left: "3%",
                    right: "4%",
                    bottom: "14%",
                    containLabel: true
                },
                xAxis: {
                    type: "category",
                    boundaryGap: false, //坐标的刻度是否在中间
                    data: this.card5Xdate,
                    axisLine: {
                        //坐标轴线条相关设置(颜色等)
                        lineStyle: {
                            color: "#E8E8E8"
                        }
                    },
                    axisLabel: {
                        //坐标轴刻度标签
                        margin: 10, //刻度标签与轴线之间的距离
                        textStyle: {
                            fontFamily: "DINPro-Regular",
                            color: "#2C313C" //坐标轴刻度文字的颜色
                        }
                    }
                },
                yAxis: {
                    type: "value",
                    axisLine: {
                        //坐标轴线条相关设置(颜色等)
                        lineStyle: {
                            color: "#E8E8E8"
                        }
                    },
                    axisLabel: {
                        //坐标轴刻度标签
                        margin: 7, //刻度标签与轴线之间的距离
                        textStyle: {
                            fontFamily: "DINPro-Regular",
                            color: "#2C313C" //坐标轴刻度文字的颜色
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: "#E8E8E8",
                            type: "dashed"
                        }
                    }
                },
                series: [
                    {
                        data: this.card5Ydata,
                        type: "line",
                        color: "rgba(58,160,255,0.3)",
                        smooth: false,
                        areaStyle: {}, //区域填充样式
                        itemStyle: {
                            normal: {
                                lineStyle: {
                                    width: 2, //折线宽度
                                    color: "#1890ff" //折线颜色
                                }
                            }
                        }
                    }
                ]
            });
            window.addEventListener("resize", function() {
                busOrderLine.resize();
            });
        },
        //行业订单占比 饼图
        allOrderPie() {
            let allOrderPie = this.$echarts.init(this.$refs.allOrderPie);
            let option1 = {
                tooltip: {
                    trigger: "item",
                    // formatter: "{b}: {c} ({d}%)"
                    formatter: function(params) {
                        return (
                            '<p style="background-color:#F4F6F6;font-size: 12px; color: #808080; width: 200px;height: 36px; display: flex; justify-content: space-between;padding: 0px 10px; align-items: center;box-sizing: border-box;margin-bottom: -20px;">' +
                            "<span>" +
                            params.name +
                            "</span>" +
                            // '<span>' + '数据' + '</span>' +
                            "</p>" +
                            "<br/>" +
                            '<p style="display: flex; justify-content: space-between;padding: 0px 10px; box-sizing: border-box; align-items: center; font-size: 12px;color: #2C313C;height: 32px; margin-bottom: -20px;">' +
                            '<span><i style="display: inline-block; width: 6px; height: 6px; border-radius: 50%;background-color: #4AA6FC;margin-right: 5px"></i>' +
                            params.seriesName +
                            "</span>" +
                            params.value +
                            "</p>" +
                            "<br/>" +
                            '<p style="display: flex; justify-content: space-between;padding: 0px 10px; box-sizing: border-box; align-items: center; font-size: 12px;color: #2C313C;height: 32px;">' +
                            '<span><i style="display: inline-block; width: 6px; height: 6px; border-radius: 50%;background-color: #4AA6FC;margin-right: 5px"></i>' +
                            "占比" +
                            "</span>" +
                            params.percent +
                            "%" +
                            "</p>"
                        );
                    },
                    backgroundColor: "#FFFFFF",
                    textStyle: {
                        color: "#2C313C"
                    },
                    borderColor: "#ddd",
                    borderWidth: 1,
                    padding: 0
                },
                legend: {
                    icon: "circle",
                    itemWidth: 8,
                    itemHeight: 8,
                    // padding: 18,
                    itemGap: 25,
                    align: "left",
                    orient: "vertical",
                    left: "60%",
                    top: "20%",
                    bottom: 20,
                    x: "right",
                    textStyle: {
                        fontSize: "14",
                        fontFamily: "DINPro-Regular"
                    },
                    data: this.card6dataArr[1].legend,
                    formatter: function(params) {
                        for (
                            let i = 0;
                            i < option1.series[0].data.length;
                            i++
                        ) {
                            if (option1.series[0].data[i].name == params) {
                                //   return params + "    |    "+"35%   " + "   ￥" + option.series[0].data[i].value;//&nbsp;
                                if (params.length === 2) {
                                    return (
                                        params + "           |      " + "35%   "
                                    );
                                } else if (params.length === 3) {
                                    return params + "       |      " + "35%   ";
                                } else if (params.length === 4) {
                                    return params + "   |      " + "3%    ";
                                } else {
                                    return params + "    |    " + "35%   ";
                                }
                            }
                        }
                    }
                },
                series: [
                    {
                        center: ["33%", "50%"],
                        name: "订单总金额",
                        type: "pie",
                        radius: ["50%", "70%"],
                        color: [
                            "#8543E0",
                            "#1890FF",
                            "#13C2C2",
                            "#2FC25B",
                            "#FACC14",
                            "#F04864",
                            "#8543E0"
                        ],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: "center",
                                formatter: "{a}\n{b}: ￥{c}"
                            },
                            emphasis: {
                                show: false,
                                textStyle: {
                                    fontSize: "20",
                                    fontWeight: "bold",
                                    color: "#000"
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: this.card6dataArr[0].data
                    }
                ]
            };
            allOrderPie.setOption(option1);
            window.addEventListener("resize", function() {
                allOrderPie.resize();
            });
        },
        //入驻物业排行 柱状图
        PropertyRank() {
            let PropertyRank = this.$echarts.init(this.$refs.PropertyRank);
            PropertyRank.setOption({
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        // 坐标轴指示器，坐标轴触发有效
                        type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
                        shadowStyle: {
                            shadowColor: "#f5f5f5"
                        }
                    },
                    backgroundColor: "#FFFFFF",
                    padding: 0,
                    borderColor: "#dddddd",
                    borderWidth: 1,
                    formatter: function(params) {
                        return (
                            '<p style="background-color:#F4F6F6;font-size: 12px; color: #808080; width: 200px;height: 36px; display: flex; justify-content: space-between;padding: 0px 10px; align-items: center;box-sizing: border-box;margin-bottom: -20px;">' +
                            "<span>" +
                            params[0].name +
                            "</span>" +
                            // '<span>' + '数量' + '</span>' +
                            "</p>" +
                            "<br/>" +
                            '<p style="display: flex; justify-content: space-between;padding: 0px 10px; box-sizing: border-box; align-items: center; font-size: 12px;color: #2C313C;height: 32px; ">' +
                            '<span><i style="display: inline-block; width: 6px; height: 6px; border-radius: 50%;background-color: #4AA6FC;margin-right: 5px"></i>' +
                            params[0].seriesName +
                            "</span>" +
                            params[0].data +
                            "</p>"
                        );
                    }
                },

                grid: {
                    left: "3%",
                    right: "4%",
                    bottom: "3%",
                    containLabel: true
                },
                xAxis: [
                    {
                        type: "category",
                        data: this.card7Xdate,
                        axisTick: {
                            alignWithLabel: true
                        },
                        axisLine: {
                            //坐标轴线条相关设置(颜色等)
                            lineStyle: {
                                color: "#E8E8E8"
                            }
                        },
                        axisLabel: {
                            //坐标轴刻度标签
                            margin: 7, //刻度标签与轴线之间的距离
                            textStyle: {
                                fontFamily: "DINPro-Regular",
                                color: "#2C313C" //坐标轴刻度文字的颜色
                            }
                        }
                    }
                ],
                yAxis: [
                    {
                        type: "value",
                        axisLine: {
                            //坐标轴线条相关设置(颜色等)
                            lineStyle: {
                                color: "#E8E8E8"
                            }
                        },
                        axisLabel: {
                            //坐标轴刻度标签
                            margin: 7, //刻度标签与轴线之间的距离
                            textStyle: {
                                fontFamily: "DINPro-Regular",
                                color: "#2C313C" //坐标轴刻度文字的颜色
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: "#E8E8E8",
                                type: "dashed"
                            }
                        }
                    }
                ],
                series: [
                    {
                        color: "#4AA6FC",
                        name: "小区数", //或资源数
                        type: "bar",
                        barWidth: "15%",
                        data: [
                            8000,
                            7502,
                            6650,
                            5134,
                            4390,
                            3330,
                            2220,
                            1111,
                            999
                        ]
                    }
                ]
            });
            window.addEventListener("resize", function() {
                PropertyRank.resize();
            });
        },
        //广告主排行 柱状图
        adOwnerRank() {
            let adOwnerRank = this.$echarts.init(this.$refs.adOwnerRank);
            adOwnerRank.setOption({
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        // 坐标轴指示器，坐标轴触发有效
                        type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
                        shadowStyle: {
                            shadowColor: "#f5f5f5"
                        }
                    },
                    backgroundColor: "#FFFFFF",
                    padding: 0,
                    borderColor: "#dddddd",
                    borderWidth: 1,
                    formatter: function(params) {
                        return (
                            '<p style="background-color:#F4F6F6;font-size: 12px; color: #808080; width: 200px;height: 36px; display: flex; justify-content: space-between;padding: 0px 10px; align-items: center;box-sizing: border-box;margin-bottom: -20px;">' +
                            "<span>" +
                            params[0].name +
                            "</span>" +
                            // '<span>' + '数量' + '</span>' +
                            "</p>" +
                            "<br/>" +
                            '<p style="display: flex; justify-content: space-between;padding: 0px 10px; box-sizing: border-box; align-items: center; font-size: 12px;color: #2C313C;height: 32px; ">' +
                            '<span><i style="display: inline-block; width: 6px; height: 6px; border-radius: 50%;background-color: #4AA6FC;margin-right: 5px"></i>' +
                            params[0].seriesName +
                            "</span>" +
                            params[0].data +
                            "</p>"
                        );
                    }
                },

                grid: {
                    left: "3%",
                    right: "4%",
                    bottom: "3%",
                    containLabel: true
                },
                xAxis: [
                    {
                        type: "category",
                        data: this.card8Xdate,
                        axisTick: {
                            alignWithLabel: true
                        },
                        axisLine: {
                            //坐标轴线条相关设置(颜色等)
                            lineStyle: {
                                color: "#E8E8E8"
                            }
                        },
                        axisLabel: {
                            //坐标轴刻度标签
                            margin: 7, //刻度标签与轴线之间的距离
                            textStyle: {
                                fontFamily: "DINPro-Regular",
                                color: "#2C313C" //坐标轴刻度文字的颜色
                            }
                        }
                    }
                ],
                yAxis: [
                    {
                        type: "value",
                        axisLine: {
                            //坐标轴线条相关设置(颜色等)
                            lineStyle: {
                                color: "#E8E8E8"
                            }
                        },
                        axisLabel: {
                            //坐标轴刻度标签
                            margin: 7, //刻度标签与轴线之间的距离
                            textStyle: {
                                fontFamily: "DINPro-Regular",
                                color: "#2C313C" //坐标轴刻度文字的颜色
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: "#E8E8E8",
                                type: "dashed"
                            }
                        }
                    }
                ],
                series: [
                    {
                        color: "#4AA6FC",
                        name: "订单金额", //或订单数量
                        type: "bar",
                        barWidth: "15%",
                        data: [
                            8000,
                            7502,
                            6650,
                            5134,
                            4390,
                            3330,
                            2220,
                            1111,
                            999
                        ]
                    }
                ]
            });
            window.addEventListener("resize", function() {
                adOwnerRank.resize();
            });
        },
        //销售业绩排行 柱状图
        salesRank() {
            let salesRank = this.$echarts.init(this.$refs.salesRank);
            salesRank.setOption({
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        // 坐标轴指示器，坐标轴触发有效
                        type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
                        shadowStyle: {
                            shadowColor: "#f5f5f5"
                        }
                    },
                    backgroundColor: "#FFFFFF",
                    padding: 0,
                    borderColor: "#dddddd",
                    borderWidth: 1,
                    formatter: function(params) {
                        return (
                            '<p style="background-color:#F4F6F6;font-size: 12px; color: #808080; width: 200px;height: 36px; display: flex; justify-content: space-between;padding: 0px 10px; align-items: center;box-sizing: border-box;margin-bottom: -20px;">' +
                            "<span>" +
                            params[0].name +
                            "</span>" +
                            // '<span>' + '数量' + '</span>' +
                            "</p>" +
                            "<br/>" +
                            '<p style="display: flex; justify-content: space-between;padding: 0px 10px; box-sizing: border-box; align-items: center; font-size: 12px;color: #2C313C;height: 32px; ">' +
                            '<span><i style="display: inline-block; width: 6px; height: 6px; border-radius: 50%;background-color: #4AA6FC;margin-right: 5px"></i>' +
                            params[0].seriesName +
                            "</span>" +
                            params[0].data +
                            "</p>"
                        );
                    }
                },

                grid: {
                    left: "3%",
                    right: "4%",
                    bottom: "3%",
                    containLabel: true
                },
                xAxis: [
                    {
                        type: "category",
                        data: this.card9Xdate,
                        axisTick: {
                            alignWithLabel: true
                        },
                        axisLine: {
                            //坐标轴线条相关设置(颜色等)
                            lineStyle: {
                                color: "#E8E8E8"
                            }
                        },
                        axisLabel: {
                            //坐标轴刻度标签
                            margin: 7, //刻度标签与轴线之间的距离
                            textStyle: {
                                fontFamily: "DINPro-Regular",
                                color: "#2C313C" //坐标轴刻度文字的颜色
                            }
                        }
                    }
                ],
                yAxis: [
                    {
                        type: "value",
                        axisLine: {
                            //坐标轴线条相关设置(颜色等)
                            lineStyle: {
                                color: "#E8E8E8"
                            }
                        },
                        axisLabel: {
                            //坐标轴刻度标签
                            margin: 7, //刻度标签与轴线之间的距离
                            textStyle: {
                                fontFamily: "DINPro-Regular",
                                color: "#2C313C" //坐标轴刻度文字的颜色
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: "#E8E8E8",
                                type: "dashed"
                            }
                        }
                    }
                ],
                series: [
                    {
                        color: "#4AA6FC",
                        name: "销售金额", //或销售单数
                        type: "bar",
                        barWidth: "15%",
                        data: [
                            8000,
                            7502,
                            6650,
                            5134,
                            4390,
                            3330,
                            2220,
                            1111,
                            999
                        ]
                    }
                ]
            });
            window.addEventListener("resize", function() {
                salesRank.resize();
            });
        },
        //中国地图
        chinaMap() {
            let chinaMap = this.$echarts.init(this.$refs.chinaMap);
            chinaMap.setOption({
                tooltip: {
                    trigger: "item",
                    formatter: function(params) {
                        if (params.name) {
                            return (
                                params.seriesName +
                                "<br/>" +
                                params.name +
                                " : " +
                                params.value
                            );
                        }
                    }
                },
                visualMap: {
                    type: "continuous",
                    min: 0,
                    max: 100000,
                    text: ["高", "低"],
                    realtime: false, //拖拽手柄时实时更新
                    calculable: false, //是否显示手柄
                    color: [
                        "#3887e0",
                        "#6a9ce3",
                        "#92bdee",
                        "#c7ddf6",
                        "#ebf3fc"
                    ]
                },
                series: [
                    {
                        name: "资源数",
                        type: "map",
                        mapType: "china",
                        roam: false, //是否可以放大缩小
                        itemStyle: {
                            emphasis: { label: { show: true } },
                            borderColor: "#f7f7f7",
                            areaColor: "#e6e6e6"
                        },
                        data: [
                            { name: "广东", value: 98397 },
                            { name: "北京", value: 79549 },
                            { name: "上海", value: 53150 },
                            { name: "广西", value: 8441 },
                            { name: "湖南", value: 38441 },
                            { name: "重庆", value: 40374 },
                            { name: "四川", value: 22963 },
                            { name: "江西", value: 12963 },
                            { name: "山西", value: 22608 },
                            { name: "湖北", value: 22608 },
                            { name: "安徽", value: 12608 },
                            { name: "福建", value: 26028 },
                            { name: "浙江", value: 76028 },
                            { name: "河南", value: 22608 },
                            { name: "河北", value: 21608 },
                            { name: "陕西", value: 22608 },
                            { name: "贵州", value: 12608 },
                            { name: "香港", value: 22608 },
                            { name: "江苏", value: 22608 },
                            { name: "山东", value: 22608 },
                            { name: "辽宁", value: 22608 },
                            { name: "吉林", value: 22608 },
                            { name: "黑龙江", value: 22608 },
                            { name: "青海", value: 22608 },
                            { name: "甘肃", value: 22608 },
                            { name: "内蒙古", value: 22608 },
                            { name: "海南", value: 2608 },
                            { name: "云南", value: 22608 }
                        ]
                    }
                ]
            });
            window.addEventListener("resize", function() {
                chinaMap.resize();
            });
        },
        //城市上刊率对比  柱状图
        cityPercentBattleBar() {
            let cityPercentBattleBar = this.$echarts.init(
                this.$refs.cityPercentBattleBar
            );
            cityPercentBattleBar.setOption({
                color: ["#4AA6FC"],
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        // 坐标轴指示器，坐标轴触发有效
                        type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
                    },
                    backgroundColor: "#FFFFFF",
                    padding: 0,
                    borderColor: "#dddddd",
                    borderWidth: 1,
                    formatter: function(params) {
                        return (
                            '<p style="background-color:#F4F6F6;font-size: 12px; color: #808080; width: 200px;height: 36px; display: flex; justify-content: space-between;padding: 0px 10px; align-items: center;box-sizing: border-box;margin-bottom: -20px;">' +
                            "<span>" +
                            params[0].name +
                            "</span>" +
                            // '<span>' + '数量' + '</span>' +
                            "</p>" +
                            "<br/>" +
                            '<p style="display: flex; justify-content: space-between;padding: 0px 10px; box-sizing: border-box; align-items: center; font-size: 12px;color: #2C313C;height: 32px; ">' +
                            '<span><i style="display: inline-block; width: 6px; height: 6px; border-radius: 50%;background-color: #4AA6FC;margin-right: 5px"></i>' +
                            params[0].seriesName +
                            "</span>" +
                            params[0].data +
                            "%" +
                            "</p>"
                        );
                    }
                },
                /* legend: {
             data: ['上刊率'],
             left: 'center',
           },*/
                grid: {
                    left: "3%",
                    right: "4%",
                    bottom: "3%",
                    containLabel: true
                },
                xAxis: [
                    {
                        type: "category",
                        data: this.selectCity2,
                        axisTick: {
                            alignWithLabel: true
                        },
                        axisLine: {
                            //坐标轴线条相关设置(颜色等)
                            lineStyle: {
                                color: "#E8E8E8"
                            }
                        },
                        axisLabel: {
                            //坐标轴刻度标签
                            margin: 7, //刻度标签与轴线之间的距离
                            textStyle: {
                                fontFamily: "DINPro-Regular",
                                color: "#2C313C" //坐标轴刻度文字的颜色
                            }
                        }
                    }
                ],
                yAxis: [
                    {
                        min: 0,
                        max: 100,
                        axisLabel: {
                            formatter: function(value) {
                                var texts = [];
                                if (value == 0) {
                                    texts.push("0%");
                                } else if (value <= 20) {
                                    texts.push("20%");
                                } else if (value <= 40) {
                                    texts.push("40%");
                                } else if (value <= 60) {
                                    texts.push("60%");
                                } else if (value <= 80) {
                                    texts.push("80%");
                                } else {
                                    texts.push("100%");
                                }
                                return texts;
                            },
                            //坐标轴刻度标签
                            margin: 7, //刻度标签与轴线之间的距离
                            textStyle: {
                                fontFamily: "DINPro-Regular",
                                color: "#2C313C" //坐标轴刻度文字的颜色
                            }
                        },
                        axisLine: {
                            //坐标轴线条相关设置(颜色等)
                            lineStyle: {
                                color: "#E8E8E8"
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: "#E8E8E8",
                                type: "dashed"
                            }
                        }
                    }
                ],
                series: [
                    {
                        name: "上刊率",
                        type: "bar",
                        barWidth: "20%",
                        data: [10, 52, 50, 74, 59, 63]
                    }
                ]
            });
            window.addEventListener("resize", function() {
                cityPercentBattleBar.resize();
            });
        },
        //城市关键数据对比  饼图
        keyDataPie2() {
            let keyDataPie2 = this.$echarts.init(this.$refs.keyDataPie2);
            keyDataPie2.setOption({
                tooltip: {
                    trigger: "item",
                    formatter: function(params) {
                        return (
                            '<p style="background-color:#F4F6F6;font-size: 12px; color: #808080; width: 200px;height: 36px; display: flex; justify-content: space-between;padding: 0px 10px; align-items: center;box-sizing: border-box;margin-bottom: -20px;">' +
                            "<span>" +
                            params.name +
                            "</span>" +
                            "<span>" +
                            "数据" +
                            "</span>" +
                            "</p>" +
                            "<br/>" +
                            '<p style="display: flex; justify-content: space-between;padding: 0px 10px; box-sizing: border-box; align-items: center; font-size: 12px;color: #2C313C;height: 32px; margin-bottom: -20px;">' +
                            '<span><i style="display: inline-block; width: 6px; height: 6px; border-radius: 50%;background-color: #4AA6FC;margin-right: 5px"></i>' +
                            params.seriesName +
                            "</span>" +
                            params.value +
                            "</p>" +
                            "<br/>" +
                            '<p style="display: flex; justify-content: space-between;padding: 0px 10px; box-sizing: border-box; align-items: center; font-size: 12px;color: #2C313C;height: 32px;">' +
                            '<span><i style="display: inline-block; width: 6px; height: 6px; border-radius: 50%;background-color: #4AA6FC;margin-right: 5px"></i>' +
                            "占比" +
                            "</span>" +
                            params.percent +
                            "%" +
                            "</p>"
                        );
                    },
                    backgroundColor: "#FFFFFF",
                    textStyle: {
                        color: "#2C313C"
                    },
                    borderColor: "#ddd",
                    borderWidth: 1,
                    padding: 0
                },
                legend: {
                    orient: "horizontal",
                    x: "left",
                    data: this.selectCity3,
                    left: "center",
                    top: "0",
                    itemWidth: 8,
                    itemHeight: 8,
                    itemGap: 24
                },
                series: [
                    {
                        name: "资源",
                        type: "pie",
                        radius: ["25%", "35%"],
                        center: ["20%", "25%"],
                        color: this.colorArr,
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: "center",
                                formatter: "{a}\n{b}: ￥{c}"
                            },
                            emphasis: {
                                show: false,
                                textStyle: {
                                    fontSize: "20",
                                    fontWeight: "bold",
                                    color: "#000"
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: this.citykeyData
                    },
                    {
                        name: "广告门",
                        type: "pie",
                        radius: ["25%", "35%"],
                        center: ["50%", "25%"],
                        color: this.colorArr,
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: "center",
                                formatter: "{a}\n{b}: ￥{c}"
                            },
                            emphasis: {
                                show: false,
                                textStyle: {
                                    fontSize: "20",
                                    fontWeight: "bold",
                                    color: "#000"
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: this.citykeyData
                    },
                    {
                        name: "点位",
                        type: "pie",
                        radius: ["25%", "35%"],
                        center: ["80%", "25%"],
                        color: this.colorArr,
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: "center",
                                formatter: "{a}\n{b}: ￥{c}"
                            },
                            emphasis: {
                                show: false,
                                textStyle: {
                                    fontSize: "20",
                                    fontWeight: "bold",
                                    color: "#000"
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: this.citykeyData
                    },
                    {
                        name: "订单",
                        type: "pie",
                        radius: ["25%", "35%"],
                        center: ["20%", "80%"],
                        color: this.colorArr,
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: "center",
                                formatter: "{a}\n{b}: ￥{c}"
                            },
                            emphasis: {
                                show: false,
                                textStyle: {
                                    fontSize: "20",
                                    fontWeight: "bold",
                                    color: "#000"
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: this.citykeyData
                    },
                    {
                        name: "订单总额",
                        type: "pie",
                        radius: ["25%", "35%"],
                        center: ["50%", "80%"],
                        color: this.colorArr,
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: "center",
                                formatter: "{a}\n{b}: ￥{c}"
                            },
                            emphasis: {
                                show: false,
                                textStyle: {
                                    fontSize: "20",
                                    fontWeight: "bold",
                                    color: "#000"
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: this.citykeyData
                    },
                    {
                        name: "广告主",
                        type: "pie",
                        radius: ["25%", "35%"],
                        center: ["80%", "80%"],
                        color: this.colorArr,
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: "center",
                                formatter: "{a}\n{b}: ￥{c}"
                            },
                            emphasis: {
                                show: false,
                                textStyle: {
                                    fontSize: "20",
                                    fontWeight: "bold",
                                    color: "#000"
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: this.citykeyData
                    }
                ]
            });
            window.addEventListener("resize", function() {
                keyDataPie2.resize();
            });
        },
        //城市数据对比  折线图
        cityBattleLine() {
            let cityBattleLine = this.$echarts.init(this.$refs.cityBattleLine);
            cityBattleLine.setOption({
                color: this.colorArr,
                tooltip: {
                    trigger: "axis",
                    formatter: function(params) {
                        // params[i].color
                        var title = "";
                        var arr = [];
                        for (let i = 0; i < params.length; i++) {
                            title =
                                '<p style="background-color:#F4F6F6;font-size: 12px; color: #808080; width: 200px;height: 36px; display: flex; justify-content: space-between;padding: 0px 10px; align-items: center;box-sizing: border-box;margin-bottom: -20px;">' +
                                "<span>" +
                                "城市(" +
                                params[i].name +
                                ")" +
                                "</span>" +
                                "<span>" +
                                "数量" +
                                "</span>" +
                                "</p>" +
                                "<br/>";
                            let data =
                                '<p style="display: flex; justify-content: space-between;padding: 0px 10px; box-sizing: border-box; align-items: center; font-size: 12px;color: #2C313C;height: 25px ">' +
                                '<span><i style="display: inline-block;width: 6px; height: 6px; border-radius: 50%;margin-right: 5px;" :style="{background:params[i].color}"></i>' +
                                params[i].seriesName +
                                "</span>" +
                                params[i].value +
                                "</p>";
                            arr.push(data);
                        }
                        let tooltip = arr.join("");
                        return title + tooltip;
                    },
                    backgroundColor: "#FFFFFF",
                    textStyle: {
                        color: "#2C313C"
                    },
                    borderColor: "#ddd",
                    borderWidth: 1,
                    padding: 0
                },
                legend: {
                    data: this.selectCity
                },
                grid: {
                    left: "3%",
                    right: "4%",
                    bottom: "3%",
                    containLabel: true
                },
                xAxis: {
                    type: "category",
                    boundaryGap: false,
                    data: [
                        "2016/10",
                        "2017/02",
                        "2017/06",
                        "2017/10",
                        "2018/02",
                        "2018/06"
                    ],
                    axisLine: {
                        //坐标轴线条相关设置(颜色等)
                        lineStyle: {
                            color: "#E8E8E8"
                        }
                    },
                    axisLabel: {
                        //坐标轴刻度标签
                        margin: 7, //刻度标签与轴线之间的距离
                        textStyle: {
                            fontFamily: "DINPro-Regular",
                            color: "#2C313C" //坐标轴刻度文字的颜色
                        }
                    }
                },
                yAxis: {
                    type: "value",
                    axisLine: {
                        //坐标轴线条相关设置(颜色等)
                        lineStyle: {
                            color: "#E8E8E8"
                        }
                    },
                    axisLabel: {
                        //坐标轴刻度标签
                        margin: 7, //刻度标签与轴线之间的距离
                        textStyle: {
                            fontFamily: "DINPro-Regular",
                            color: "#2C313C" //坐标轴刻度文字的颜色
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: "#E8E8E8",
                            type: "dashed"
                        }
                    }
                },
                series: this.cityBattleLineSeries
            });
        },

        //城市选择和charts关联
        selectCities(res) {
            console.log(res);
            this.selectCity = res;
            // this.cityBattleLineOption.legend.data = res;
            for (let i of this.cityBattleLineSeries) {
                if (res.indexOf(i.name) == -1) {
                    console.log("------", i.name);
                    i.data = [];
                    // console.log('删掉了');
                    // let index = this.cityBattleLineSeries.indexOf(i);
                    // this.cityBattleLineSeries.splice(index, 1);
                    if (i.name == "") {
                        console.log(123);
                    }
                }
            }
            console.log("series---", this.cityBattleLineSeries);

            //更新图表
            // this.cityBattleLine.setOption(this.cityBattleLineOption)
            this.cityBattleLine();
        },

        //选择行业
        chooseBusiness(index) {
            this.currBusiness = this.businessArr[index];
        },
        //社区上刊率
        cClear() {
            //清除
            this.cUpMin = "";
            this.cUpMax = "";
            this.cinputFocus = false;
        },
        cConfirm() {
            //确定
            this.cinputFocus = false;
        },
        pClear() {
            //清除
            this.cUpMin = "";
            this.cUpMax = "";
            this.cinputFocus = false;
        },
        pConfirm() {
            //确定
            this.cinputFocus = false;
        },
        //表格筛选
        filterAdNo(value, row) {
            return row.adNo === value;
        },
        filterArea(value, row) {
            return row.area === value;
        },
        //表格排序
        sortUpPercent(a, b) {
            return b.upPercent - a.upPercent;
        }
    }
};
</script>

<style scoped>
/*字体*/
@font-face {
    font-family: DINPro-Medium;
    src: url("fonts/DINPro-Medium.otf"), url("fonts/DINPro-Medium.ttf");
}

@font-face {
    font-family: DINPro-Regular;
    src: url("fonts/DINPro-Regular.otf");
}

.wrap {
    padding: 0 60px;
}

/*.wrap/deep/ .el-tabs__nav-wrap {*/
/*width: 100%;*/
/*}*/

/*.wrap/deep/ .el-tabs__item {*/
/*font-size: 16px;*/
/*color: #999999;*/
/*}*/

/*.wrap/deep/ .el-tabs__item.is-active {*/
/*color: #108EE9;*/
/*}*/

/*.wrap/deep/ .el-dropdown {*/
/*cursor: pointer;*/
/*}*/

.tips {
    position: absolute;
    right: 70px;
    top: 70px;
    z-index: 9;
}

.tips span {
    font-size: 12px;
    color: #999999;
    margin-left: 18px;
}

/*数据卡片*/
/*/deep/ .el-card__header .header-title {*/
/*font-size: 16px;*/
/*color: #2C313C;*/
/*font-weight: bold;*/
/*}*/

.card {
    margin-bottom: 20px;
}

/*数据总览*/
.data-txt {
    display: flex;
    justify-content: space-around;
    border-bottom: 1px solid #f0f0f0;
    padding-bottom: 23px;
}

.data-txt div {
    text-align: right;
    font-size: 14px;
    color: #616161;
    padding-right: 14px;
}

.data-txt div p {
    margin-top: 16px;
    font-size: 20px;
    color: #2c313c;
    font-weight: bold;
    font-family: "DINPro-Regular", "PingFangSC-Regular", "Microsoft YaHei";
    border-right: 1px solid #f0f0f0;
    padding-right: 14px;
    margin-right: -14px;
}

/*饼状图*/
.charts {
    width: 200px;
    height: 200px;
}

.data-charts {
    display: flex;
    justify-content: space-around;
    /*margin-bottom: 40px;*/
}

.pie-wrap {
    position: relative;
}

.pie-wrap p {
    font-weight: bold;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    font-size: 16px;
    color: #333333;
}

.all-data-charts .pie-wrap p:nth-of-type(1) {
    left: 15%;
}

.all-data-charts .pie-wrap p:nth-of-type(2) {
    left: 38%;
}

.all-data-charts .pie-wrap p:nth-of-type(3) {
    left: 62%;
}

.all-data-charts .pie-wrap p:nth-of-type(4) {
    left: 85%;
}

.data-wrap,
.data-charts {
    position: relative;
}

.data-charts .more {
    position: absolute;
    right: 10px;
    top: 15px;
    font-size: 12px;
    color: #4aa6fc;
    cursor: pointer;
}

.bottom-data {
    position: absolute;
    bottom: -30px;
    left: 23%;
}

.bottom-data ul li {
    float: left;
    margin-right: 24px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.65);
}

.bottom-data ul li .dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: 8px;
}

/*关键数据展示*/
.data-tab {
    font-size: 12px;
    color: #808080;
    margin-bottom: 10px;
    height: 30px;
}

.data-title {
    width: 79%;
    margin-left: 19%;
    display: flex;
    font-size: 14px;
    color: #616161;
    margin-bottom: 17px;
    box-sizing: border-box;
    justify-content: space-between;
    margin-top: 30px;
}

.data-title div {
    text-align: right;
}

.month-data {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    color: #616161;
    border-bottom: 1px solid #f0f0f0;
    padding-bottom: 23px;
    margin-bottom: 20px;
}

.month-data ol,
.month-data ul {
    border-right: 1px solid #f0f0f0;
    padding-right: 25px;
}

.month-data ol li {
    padding-left: 36px;
    margin-top: 10px;
}

.month-data ul li {
    margin-top: 10px;
    text-align: right;
}

.month-data ul li i {
    font-family: "DINPro-Medium", "PingFangSC-Regular", "Microsoft YaHei";
    font-style: normal;
    font-size: 13px;
    position: relative;
    top: -2px;
    right: 2px;
}

i.up {
    color: #de1010;
}

i.down {
    color: #17b726;
}

/*关键数据总量趋势*/
.data-tab span {
    float: left;
}

.data-tab span:first-child {
    position: relative;
    top: 5px;
}

.block {
    display: inline-block;
}

/*

    .card3 /deep/ .el-range-editor--mini.el-input__inner {
      width: 338px;
    }

    !*关键数据增量对比*!
    .card4 /deep/ .el-range-editor--mini.el-input__inner {
      width: 220px;
    }

    /deep/ .el-checkbox__input.is-checked + .el-checkbox__label {
      font-size: 12px;
      padding-left: 5px;
    }

    !*行业订单总量趋势*!
    .Bradio /deep/ .el-radio-button:last-child .el-radio-button__inner {
      border-radius: 0 0 0 0;
    }

    /deep/ .el-button-group .el-button:first-child {
      border-bottom-left-radius: 0;
      border-top-left-radius: 0;
    }

    /deep/ .el-button-group button {
      float: left;
    }

    /deep/ .el-button-group .el-button:last-child {
      line-height: 10px;
      position: relative;
      top: -1px;
    }

    !*  /deep/ .el-button:focus, /deep/ .el-button:hover {
        color: #409EFF;
        border-color: #dcdfe6;
        background-color: #fff;
      }*!

    .card5 /deep/ .el-range-editor--mini.el-input__inner {
      width: 282px;
    }

    .timeSelect /deep/ .el-dropdown-menu--mini .el-dropdown-menu__item {
      padding: 0 20px;
    }

    !*行业订单占比*!
    .spe1 /deep/ .el-button-group .el-button:first-child {
      border-bottom-left-radius: 4px;
      border-top-left-radius: 4px;
    }
  */

.card6 {
    position: relative;
}

.card6 .title {
    position: absolute;
    z-index: 2;
    top: 49%;
    left: 10%;
    width: 200px;
    height: 70px;
    box-sizing: border-box;
    /*width: 100%;*/
}

.card6 .title p {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
    text-align: center;
}

.card6 .title h3 {
    font-size: 24px;
    color: rgba(0, 0, 0, 0.85);
    text-align: center;
    font-family: "DINPro-Regular", "PingFangSC-Regular", "Microsoft YaHei";
}

.card6 .wrap-box {
    display: flex;
    width: 100%;
    justify-content: space-between;
}

.allOrderChart {
    width: 50%;
}

.table-wrap {
    width: 50%;
    /*border: 1px solid #dedede;*/
    margin-bottom: 30px;
}

/* /deep/ thead th {
     font-size: 14px;
     color: #2C313C;
     font-weight: bold;
     background: #F7F7F7;
     text-align: center;
   }

   /deep/ .el-table__row {
     font-size: 14px;
     color: #2C313C;
     text-align: center;
   }

   .card7 /deep/ .el-range-editor--mini.el-input__inner,
   .card8 /deep/ .el-range-editor--mini.el-input__inner,
   .card9 /deep/ .el-range-editor--mini.el-input__inner {
     width: 230px;
   }

   !*入驻物业排行*!
   /deep/ .el-card__header {
     position: relative;
   }
 */
.all {
    position: absolute;
    right: 15px;
    top: 20px;
    font-size: 12px;
    color: #4aa6fc;
    cursor: pointer;
}

/* /deep/ .el-dialog__body {
     padding: 20px 20px;
   }

   !*滚动条*!
   .all-data-table /deep/ .el-table__body-wrapper {
     overflow-y: scroll;
     overflow-x: scroll;
   }

   .all-data-table /deep/ .el-table__body-wrapper::-webkit-scrollbar {
     width: 6px;
     height: 6px;
     background: #fafafa;
   }

   /deep/ .el-table__body-wrapper {
     overflow-y: scroll;
     overflow-x: hidden;
   }

   /deep/ .el-table__body-wrapper::-webkit-scrollbar {
     width: 4px;
     background: #fafafa;
   }

   /deep/ .el-table__body-wrapper::-webkit-scrollbar-thumb {
     !*滚动条里面小方块*!

     -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
     background: #c1c1c1;
     border-radius: 4px;
   }*/

/*城市对比*/
.cityData-wrap {
    width: 100%;
    display: flex;
}

.chinaMapChart {
    width: 50%;
}

.all-data-table {
    width: 50%;
}

/*  /deep/ .el-table__fixed-right::before, /deep/ .el-table__fixed::before {
      height: 0px;
    }

    .sec-card2-eldata /deep/ .el-range-editor--mini.el-input__inner {
      width: 337px;
    }

    !*城市数据对比*!
    /deep/ .el-select-group {
      display: flex;
      width: 466px;
      flex-wrap: wrap;
      padding-left: 33px;
      box-sizing: border-box;
    }

    /deep/ .el-select-dropdown__item.selected::after {
      display: none;
    }

    /deep/ .el-select-dropdown__item {
      padding: 0 10px;
    }

    /deep/ .el-select-group__wrap:not(:last-of-type) {
      padding-bottom: 15px;
    }

    .cityDX /deep/ .el-input--mini .el-input__inner {
      width: 505px;
    }*/

/*城市关键数据对比*/
.cityKeyData-charts {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}

.cityKeyData-charts .pie-wrap p:nth-of-type(1) {
    left: 20%;
    top: 25%;
}

.cityKeyData-charts .pie-wrap p:nth-of-type(2) {
    left: 50%;
    top: 25%;
}

.cityKeyData-charts .pie-wrap p:nth-of-type(3) {
    left: 80%;
    top: 25%;
}

.cityKeyData-charts .pie-wrap p:nth-of-type(4) {
    left: 20%;
    top: 80%;
}

.cityKeyData-charts .pie-wrap p:nth-of-type(5) {
    left: 50%;
    top: 80%;
}

.cityKeyData-charts .pie-wrap p:nth-of-type(6) {
    left: 80%;
    top: 80%;
}

/*点位分析*/
.thr-tabs {
    width: 100%;
    background-color: #ffffff;
}

/*点位使用概况*/
.header-select {
    position: absolute;
    right: 0;
    top: 0;
}

/* .header-select /deep/ .el-input__inner {
     width: 90px;
   }

   .header-select /deep/ .el-range-editor--mini.el-input__inner {
     width: 225px !important;
   }*/

.pointData-wrap {
    display: flex;
    justify-content: space-between;
}

.left-data {
    width: 75%;
}

.left-data > div {
    width: 100%;
    height: 75px;
    padding-top: 17px;
    box-sizing: border-box;
    border-bottom: 1px solid #f0f0f0;
}

.left-data > div:last-child {
    border-bottom: none;
}

.left-data dl {
    float: left;
    /*margin-right: 64px;*/
    text-align: left;
    width: 118px;
}

.left-data dl dt {
    /*float: left;*/
    display: block;
    font-size: 12px;
    color: #666666;
}

.left-data dl dd {
    font-size: 20px;
    color: #2c313c;
    font-family: DINPro-Regular, PingFangSC-Regular, Microsoft YaHei;
}

/*/deep/ .el-card__body {*/
/*padding: 20px 40px;*/
/*}*/

.right-chart {
    margin-right: 45px;
    position: relative;
}

.right-chart img {
    width: 299px;
}

.translate-txt {
    width: 120%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
}

.translate-txt div {
    position: absolute;
    font-size: 12px;
    color: #666666;
}

.translate1 {
    top: 24%;
    left: 52%;
}

.translate2 {
    top: 66%;
    left: 46%;
}

.translate3 {
    top: 45%;
    left: 65%;
}

.select-wrap {
    height: 34px;
    margin-bottom: 16px;
}

.select-wrap span {
    float: left;
}

/*社区上刊率和点位上刊率*/
.community-percent,
.point-percent {
    padding: 16px;
    margin-bottom: 40px;
    /*height: 300px;*/
}

/*.select-wrap /deep/ .el-select /deep/ .el-input__inner {
    width: 105px !important;
    height: 34px;
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
  }

  .select-wrap /deep/ .el-input /deep/ .el-input__inner {
    width: 224px;
    height: 34px;
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
  }*/

.s-input {
    position: relative;
    left: -1px;
}

.select-wrap button {
    width: 76px;
    height: 34px;
}

/* .select-wrap button /deep/ .el-icon-search {
     position: relative;
     left: -10px;
     top: -3px;
   }

   /deep/ .el-button [class*=el-icon-] + span {
     position: relative;
     left: -10px;
     top: -3px;
   }

   /deep/ .el-button span {
     position: relative;
     top: -2px;
   }

   .select2 /deep/ .el-range-editor--mini.el-input__inner {
     width: 220px;
   }*/

.upPercent-wrap {
    display: flex;
    justify-content: space-around;
    position: relative;
}

.input-wrap {
    display: flex;
    justify-content: space-around;
    position: relative;
    z-index: 9;
}

/*.upPercent-wrap /deep/ .el-input /deep/ .el-input__inner {*/
/*width: 66px;*/
/*height: 26px;*/
/*border-bottom-left-radius: 4px;*/
/*border-top-left-radius: 4px;*/
/*padding-left: 10px;*/
/*}*/

.upPercent-wrap-mask {
    width: 105%;
    height: 70px;
    top: -3px;
    left: -5px;
    position: absolute;
    border: 1px solid #c2c2c2;
    border-radius: 4px;
    z-index: 8;
    background: #fff;
}

.upPercent-wrap-mask button {
    width: 44px;
    height: 24px;
    position: absolute;
    bottom: 5px;
    left: 10px;
}

.upPercent-wrap-mask button:last-child {
    left: 60%;
    bottom: 0;
}

.upPercent-wrap-mask button:last-child span {
    position: relative;
    top: 0px;
    left: -5px;
    font-size: 14px;
    color: #2c313c;
}

/*.upPercent-wrap-mask /deep/ .el-button.confirm span {*/
/*left: -11px;*/
/*top: -6px;*/
/*}*/

.table-wrap2 {
    width: 100%;
    border: none;
}

/*.CUP-table /deep/ .el-table__row td:nth-of-type(8),
  .CUP-table /deep/ .el-table__row td:nth-of-type(9),
  .CUP-table /deep/ .has-gutter th:nth-of-type(8),
  .CUP-table /deep/ .has-gutter th:nth-of-type(9)
  {
    text-align: right;
  }
*/
/*1440*/
@media all and (min-width: 1420px) {
    .card6 .title {
        left: 9.5%;

        /*width: 100%;*/
    }
}

/*1920*/
@media all and (min-width: 1900px) {
    .charts2 {
        width: 1700px !important;
    }

    .charts1 {
        width: 850px !important;
    }

    .data-title {
        width: 81%;
        margin-left: 18%;
    }

    .bottom-data {
        left: 30%;
    }

    .card6 .title {
        left: 11.5%;
    }

    /*滚动条*/
    /*.all-data-table /deep/ .el-table__body-wrapper {*/
    /*overflow-y: scroll;*/
    /*overflow-x: hidden;*/
    /*}*/
    .cityKeyData-charts .charts {
        width: 1700px !important;
    }

    .left-data dl {
        float: left;
        /*margin-right: 64px;*/
        text-align: left;
        width: 218px;
    }
}
</style>

<style>
.wrap .el-tabs__nav-wrap {
    width: 100%;
}

.wrap .el-tabs__item {
    font-size: 16px;
    color: #999999;
}

.wrap .el-tabs__item.is-active {
    color: #108ee9;
}

.wrap .el-dropdown {
    cursor: pointer;
}

.el-card__header span:nth-child(1) {
    font-size: 16px;
    color: #2c313c;
    font-weight: bold;
}

.card3 .el-range-editor--mini.el-input__inner {
    width: 338px;
}

/*关键数据增量对比*/
.card4 .el-range-editor--mini.el-input__inner {
    width: 220px;
}

.el-checkbox__input.is-checked + .el-checkbox__label {
    /*font-size: 12px;*/
    /*padding-left: 5px;*/
}

/*行业订单总量趋势*/
/*.Bradio /deep/ .el-radio-button:last-child .el-radio-button__inner {*/
/*border-radius: 0 0 0 0;*/
/*}*/

.el-button-group .el-button:first-child {
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
}

.el-button-group button {
    float: left;
}

.el-button-group .el-button:last-child {
    line-height: 10px;
    position: relative;
    top: -1px;
}

/*  /deep/ .el-button:focus, /deep/ .el-button:hover {
      color: #409EFF;
      border-color: #dcdfe6;
      background-color: #fff;
    }*/

.card5 .el-range-editor--mini.el-input__inner {
    width: 292px;
}

.timeSelect .el-dropdown-menu--mini .el-dropdown-menu__item {
    padding: 0 20px;
}

/*行业订单占比*/
.spe1 .el-input__inner {
    width: 86px;
}

thead th {
    font-size: 14px;
    color: #2c313c;
    font-weight: bold;
    background: #f7f7f7;
    text-align: center;
}

.el-table__row {
    font-size: 14px;
    color: #2c313c;
    text-align: center;
}

.card7 .el-range-editor--mini.el-input__inner,
.card8 .el-range-editor--mini.el-input__inner,
.card9 .el-range-editor--mini.el-input__inner {
    width: 230px;
}

.el-card__header {
    position: relative;
}

.el-dialog__body {
    padding: 20px 20px;
}

/*滚动条*/
.all-data-table .el-table__body-wrapper {
    overflow-y: scroll;
    overflow-x: scroll;
}

.all-data-table .el-table__body-wrapper::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    background: #fafafa;
}

.el-table__body-wrapper {
    overflow-y: scroll;
    overflow-x: hidden;
}

.el-table__body-wrapper::-webkit-scrollbar {
    width: 4px;
    background: #fafafa;
}

.el-table__body-wrapper::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/

    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #c1c1c1;
    border-radius: 4px;
}

.el-table__fixed-right::before,
.el-table__fixed::before {
    height: 0px;
}

.sec-card2-eldata .el-range-editor--mini.el-input__inner {
    width: 337px;
}

/*城市数据对比*/
.el-select-group {
    display: flex;
    width: 466px;
    flex-wrap: wrap;
    padding-left: 33px;
    box-sizing: border-box;
}

.el-select-dropdown__item.selected::after {
    display: none;
}

.el-select-dropdown__item {
    padding: 0 10px;
}

.el-select-group__wrap:not(:last-of-type) {
    padding-bottom: 15px;
}

.cityDX .el-input--mini .el-input__inner {
    width: 507px;
}

.header-select .el-input__inner {
    width: 90px;
}

.header-select .el-range-editor--mini.el-input__inner {
    width: 225px !important;
}

.el-card__body {
    padding: 20px 40px;
}

.select-wrap .el-select .el-input__inner {
    width: 105px !important;
    height: 34px;
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
}

.select-wrap .el-input .el-input__inner {
    width: 224px;
    height: 34px;
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
}

.select-wrap button .el-icon-search {
    position: relative;
    left: -10px;
    top: -3px;
}

.el-button [class*="el-icon-"] + span {
    position: relative;
    left: -10px;
    top: -3px;
}

.select-wrap .el-button span {
    position: relative;
    top: -2px;
}

.select2 .el-range-editor--mini.el-input__inner {
    width: 220px;
}

.upPercent-wrap .el-input .el-input__inner {
    width: 66px;
    height: 26px;
    border-bottom-left-radius: 4px;
    border-top-left-radius: 4px;
    padding-left: 10px;
    padding-right: 10px;
}

.CUP-table .el-table__row td:nth-of-type(8),
.CUP-table .el-table__row td:nth-of-type(9),
.CUP-table .has-gutter th:nth-of-type(8),
.CUP-table .has-gutter th:nth-of-type(9) {
    text-align: right;
    padding-right: 10px;
}

.PUP-table .el-table__row td:nth-of-type(6),
.PUP-table .el-table__row td:nth-of-type(7),
.PUP-table .has-gutter th:nth-of-type(6),
.PUP-table .has-gutter th:nth-of-type(7) {
    text-align: right;
    padding-right: 10px;
}

.cityBattle-table .el-table__row td:nth-of-type(3),
.cityBattle-table .el-table__row td:nth-of-type(4),
.cityBattle-table .el-table__row td:nth-of-type(5),
.cityBattle-table .el-table__row td:nth-of-type(6),
.cityBattle-table .el-table__row td:nth-of-type(7),
.cityBattle-table .el-table__row td:nth-of-type(8),
.cityBattle-table .el-table__row td:nth-of-type(9) {
    text-align: right;
    padding-right: 10px;
}

.cityBattle-table .has-gutter th:nth-of-type(6),
.cityBattle-table .has-gutter th:nth-of-type(7),
.cityBattle-table .has-gutter th:nth-of-type(3),
.cityBattle-table .has-gutter th:nth-of-type(4),
.cityBattle-table .has-gutter th:nth-of-type(5),
.cityBattle-table .has-gutter th:nth-of-type(8),
.cityBattle-table .has-gutter th:nth-of-type(9) {
    text-align: right;
}

/*城市数据总览表格*/
.all-city-data-table .has-gutter th:nth-of-type(2),
.all-city-data-table .has-gutter th:nth-of-type(3),
.all-city-data-table .has-gutter th:nth-of-type(4),
.all-city-data-table .has-gutter th:nth-of-type(5),
.all-city-data-table .el-table__row td:nth-of-type(2),
.all-city-data-table .el-table__row td:nth-of-type(3),
.all-city-data-table .el-table__row td:nth-of-type(4),
.all-city-data-table .el-table__row td:nth-of-type(5) {
    text-align: right;
    padding-right: 10px;
}

/*入驻物业总排行表格*/

.into-property-rank .has-gutter th:nth-of-type(3),
.into-property-rank .has-gutter th:nth-of-type(4),
.into-property-rank .el-table__row td:nth-of-type(3),
.into-property-rank .el-table__row td:nth-of-type(4) {
    text-align: right;
    padding-right: 10px;
}

/*广告主总排行表格*/
.ad-owner-rank-table .has-gutter th:nth-of-type(3),
.ad-owner-rank-table .has-gutter th:nth-of-type(4),
.ad-owner-rank-table .el-table__row td:nth-of-type(4),
.ad-owner-rank-table .el-table__row td:nth-of-type(3) {
    text-align: right;
    padding-right: 10px;
}

/*销售业绩总排行表格*/
.sales-rank-table .has-gutter th:nth-of-type(3),
.sales-rank-table .has-gutter th:nth-of-type(4),
.sales-rank-table .el-table__row td:nth-of-type(3),
.sales-rank-table .el-table__row td:nth-of-type(4) {
    text-align: right;
    padding-right: 10px;
}

.upPercent-wrap-mask .el-button.confirm span {
    left: -11px;
    top: -6px;
}

.CUP-table .el-table__row td {
    text-align: left;
}

.el-table__row td {
    text-align: left;
}

.el-table th {
    background-color: #f7f7f7;
}

.Bradio .el-checkbox-button:last-child .el-checkbox-button__inner {
    border-radius: 0 0 0 0;
}

.el-select-group .el-select-dropdown__item {
    padding-left: 10px;
}

.el-select-dropdown__list
    .el-select-group__wrap:nth-of-type(1)
    .el-select-group {
    display: none;
}

/*1920*/
@media all and (min-width: 1900px) {
    /*滚动条*/
    .all-data-table .el-table__body-wrapper {
        overflow-y: scroll;
        overflow-x: hidden;
    }
}
</style>
