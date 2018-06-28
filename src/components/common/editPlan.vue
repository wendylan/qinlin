<template>
  <div class="ad_mediaMana_wrap">
    <div class="ad_mediaMana_nav clearfix">
      <p><a href="#">方案管理</a><em> / </em><a href="#">编辑方案</a></p>
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
            <el-form :model="planForm" status-icon :rules="planRules" ref="planForm" label-width="100px"
                     class="demo-ruleForm">
              <el-form-item label="方案名称：" prop="planName">
                <el-input v-model="planForm.planName" placeholder="请输入方案名称"></el-input>
              </el-form-item>
              <el-form-item label="所属销售：" prop="ownerSales">
                <el-input v-if="isBD" v-model="planForm.ownerSales" disabled></el-input><!--BDData.realName-->
                <el-autocomplete
                  v-else
                  v-model="planForm.ownerSales"
                  :fetch-suggestions="querySearchAsync"
                  placeholder="请输入账号"
                >
                </el-autocomplete>
              </el-form-item>
              <el-form-item label="公司名称：" prop="companyName">
                <el-select v-model="planForm.companyName" placeholder="请选择公司名称">
                  <el-option
                    v-for="item in companyName"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="公司品牌：" prop="companyBrand">
                <el-select v-model="planForm.companyBrand" placeholder="请选择公司品牌">
                  <el-option
                    v-for="item in companyBrand"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="联系人：" prop="ownerBU">
                <el-select v-model="planForm.ownerBU" placeholder="请选择所属联系人">
                  <el-option
                    v-for="item in ownerBU"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="投放城市：" prop="throwCity">
                <div v-if="cityOther" v-model="planForm.throwCity">
                  <el-tag
                    :key="tag"
                    v-for="tag in dynamicTags"
                    closable
                    :disable-transitions="false"
                    @close="spliceCity(tag)">
                    {{tag}}
                  </el-tag>
                  <el-cascader
                    style="width: 140px"
                    class="inputNewTag"
                    v-if="inputVisible"
                    v-model="selectedOptions"
                    :options="cityOptions"
                    ref="saveTagInput"
                    :show-all-levels="false"
                    size="small"
                    @change="handleInputConfirm"
                  >
                  </el-cascader>
                  <el-button v-else class="button-new-tag" size="small" @mouseover.native="showInput">+</el-button>
                </div>
                <el-select v-else v-model="planForm.throwCity" multiple placeholder="请选择">
                  <el-option
                    v-for="item in throwCity"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
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
                  <el-option v-for="item in typeSelect" :key="item.value" :label="item.value"
                             :value="item.value"></el-option>
                  </el-select>
                  <el-input v-model="searchInput" placeholder="请输入要搜索的内容"
                            class="searchInput input-with-select"></el-input>
                </span>
                <span>
                  <el-select v-model="planSelect" placeholder="选择投已有方案" class="plan-select input-with-select">
                    <el-option label="努力开发中,敬请期待" value="beijing"></el-option>
                  </el-select>
                </span>
                <span>
                   <el-date-picker
                     v-model="dateInput"
                     type="daterange"
                     start-placeholder="开始日期"
                     end-placeholder="结束日期"
                     value-format="yyyy.MM.dd"
                     class="date-select input-with-select"
                   >
                </el-date-picker>
                </span>
                <span>
                  <el-button type="primary" icon="el-icon-search" class="searchBtn" @click="searchFun">搜索</el-button>
                </span>
                <span>
                  <el-button type="primary" icon="el-icon-location-outline" class="map">地图</el-button>
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
                <dt>城市区域：</dt><!--city-->
                <dd v-for="(item, index) in city" :index="index" :class=" index == activeIndex ? 'active' : ''"
                    @click="activeCity(item,index)">{{item.rName}}
                </dd>
              </dl>
              <dl class="city-proper" v-for="(list, index) of area" :index="index" v-show=" index == activeIndex">
                <dd v-for="item of list" :class="item.rName == areaName ? 'active' : ''"
                    @click="activeArea(item.rName)">{{item.rName}}
                </dd>
              </dl>
              <dl style="border: none">
                <dt>广告限制：</dt>
                <dd v-for="(obj, index) of ADLimit" :key="index" :class="obj.value == limitName ? 'active' : ''"
                    @click="activeADLimit(obj.value)">{{obj.value}}
                </dd>
              </dl>
            </div>
            <!--数量价格年份输入筛选框-->
          <!--  <div class="filter-input">
              <ul>
                <li style="margin-left: 0">
                  <span>住户数量:</span>
                  <div class="input-wrap" :class="HSearch === 'h'? 'focus': ''">
                    <input type="text" class="input" @focus="haveFocus('h')" v-model="houseNum[0]">
                    -
                    <input type="text" class="input" @focus="haveFocus('h')" v-model="houseNum[1]">
                    <el-button size="mini" v-show=" HSearch === 'h'" @click="emptyFun('H')">清除</el-button>
                    <el-button size="mini" type="primary" v-show=" HSearch === 'h'" @click="tableHSearch('H')">确定
                    </el-button>
                  </div>
                </li>
                <li>
                  <span>楼栋数量:</span>
                  <div class="input-wrap" :class="HSearch === 'b'? 'focus': ''">
                    <input type="text" class="input" @focus="haveFocus('b')" v-model="buildNum[0]">
                    -
                    <input type="text" class="input" @focus="haveFocus('b')" v-model="buildNum[1]">
                    <el-button size="mini" v-show=" HSearch === 'b'" @click="emptyFun('B')">清除</el-button>
                    <el-button size="mini" type="primary" v-show=" HSearch === 'b'" @click="tableHSearch('B')">确定
                    </el-button>
                  </div>

                </li>
                <li>
                  <span>楼盘价格:</span>
                  <div class="input-wrap" :class="HSearch === 'p'? 'focus': ''">
                    <input type="text" class="input" @focus="haveFocus('p')" v-model="buildPrice[0]">
                    -
                    <input type="text" class="input" @focus="haveFocus('p')" v-model="buildPrice[1]">
                    <el-button size="mini" v-show=" HSearch === 'p'" @click="emptyFun('P')">清除</el-button>
                    <el-button size="mini" type="primary" v-show=" HSearch === 'p'" @click="tableHSearch('P')">确定
                    </el-button>
                  </div>

                </li>
                <li>
                  <span>入住年份:</span>
                  <div class="input-wrap" :class="HSearch === 'y'? 'focus': ''">
                    <input type="text" class="input" @focus="haveFocus('y')" v-model="liveYear[0]">
                    -
                    <input type="text" class="input" @focus="haveFocus('y')" v-model="liveYear[1]">
                    <el-button size="mini" v-show=" HSearch === 'y'" @click="emptyFun('Y')">清除</el-button>
                    <el-button size="mini" type="primary" v-show=" HSearch === 'y'" @click="tableHSearch('Y')">确定
                    </el-button>
                  </div>
                </li>
                <li>
                  <span style="float: left">楼盘类型:</span>
                  <el-select v-model="buildValue" placeholder="请选择" class="buildType" style="float: left;"
                             @change="searchBT">
                    <el-option v-for="item in buildType" :key="item.buildValue" :label="item.buildValue"
                               :value="item.buildValue"></el-option>
                  </el-select>
                </li>
              </ul>
            </div>-->
            <!--表格-->
            <div class="table_wrap">
              <el-table
                v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                v-loadmore="loadMore"
                ref="multipleTable"
                border
                :data="planList"
                :select-on-indeterminate="selectOnAll"
                :default-sort="{prop: 'mID', order: 'descending'}"
                @select="handleSelect"
                @select-all="handleSelectAll"
                @cell-mouse-enter="mouseEnter"
                style="width: 100%"
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
                      <el-form-item :label="recType ? '入住年份:' : '建成年份:'">
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
                  width="41px"
                  scope="scope"
                >
                </el-table-column>
                <el-table-column
                  label="资源名称"
                  min-width="16.1%"
                  prop="recName"
                >
                </el-table-column>
                <el-table-column
                  v-if="false"
                  min-width="0"
                  label="媒体mID"
                  prop="mID"
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
                  :label="recType ? '楼盘类型':'写字楼类型'"
                  min-width="8.8%"
                >
                </el-table-column>
                <el-table-column
                  prop="houseNum"
                  :label="recType ? '小区户数': '办公室数量'"
                  min-width="7.3%"
                  class="tar"
                >
                </el-table-column>
                <el-table-column
                  label="楼盘价格"
                  min-width="7.3%"
                >
                  <template slot-scope="scope">
                    <span>&yen;{{scope.row.buildPrice}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="schedules"
                  label="排期"
                  min-width="14.2%"
                >
                </el-table-column>
                <el-table-column width="132px">
                  <template slot-scope="scope">
                    <el-checkbox v-model="scope.row.checkBox.A" label="A面"
                                 @change="changeA(scope.row)"
                                 :disabled="scope.row.box.A"><!-- :disabled="scope.row.box.A"-->
                    </el-checkbox>
                    <el-checkbox v-model="scope.row.checkBox.B" label="B面"
                                 @change="changeB(scope.row)"
                                 :disabled="scope.row.box.B"><!--:disabled="scope.row.box.B"-->
                    </el-checkbox>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <!--购物车-->
            <el-dialog title="已选点位" :visible.sync="dialogTableVisible"
                       :close-on-click-modal="false"
                       :close-on-press-escape="false"
                       :before-close="shopingBeforeClose">
              <template slot-scope="scope">
                <div class="table_wrap car-list" style="margin-top: 60px" :visible.sync="dialogTableVisible">
                  <div class="car-title">
                    <h4>已选{{shopMedia_ADNum.mediaNum}}个媒体<p>投放{{shopMedia_ADNum.ADNum}}面</p>
                      <span @click="clearShop" style="cursor: pointer">清空已选</span>
                    </h4>
                  </div>
                  <el-table
                    v-loading="shopLoading"
                    element-loading-text="加载中"
                    element-loading-spinner="el-icon-loading"
                    border
                    :row-class-name="tableRowClassName"
                    :highlight-current-row="true"
                    :data="shopingList"
                    style="width: 100%"
                    :default-sort="{prop: 'recName', order: 'descending'}"
                  >
                    <el-table-column type="expand">
                      <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                          <el-form-item label="商圈：">
                            <span>{{ props.row.businessOrigin}}</span>
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
                    <el-table-column label="资源名称" min-width="120" prop="recName">
                    </el-table-column>
                    <el-table-column prop="mediaName" label="媒体名称" min-width="120" class="tar">
                    </el-table-column>
                    <el-table-column prop="city" label="城市" min-width="80" >
                    </el-table-column>
                    <el-table-column prop="origin" label="区域" min-width="80" >
                    </el-table-column>
                    <el-table-column prop="buildType" label="楼盘类型" min-width="80">
                    </el-table-column>
                    <el-table-column prop="houseNum" label="小区户数" min-width="80" class="tar">
                    </el-table-column>
                    <el-table-column label="楼盘价格" min-width="80">
                      <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" :content="scope.row.buildPrice ? priceFormat(scope.row.buildPrice/100):0" placement="bottom">
                          <span>&yen;{{scope.row.buildPrice ? priceFormat(scope.row.buildPrice/100):0}}</span>
                        </el-tooltip>
                      </template>
                    </el-table-column>
                    <el-table-column prop="schedules" label="排期" min-width="160">
                      <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" :content="scope.row.schedules" placement="bottom">
                          <span>{{scope.row.schedules}}</span>
                        </el-tooltip>
                      </template>
                    </el-table-column>

                    <el-table-column width="52px">
                      <template slot-scope="scope">
                        <span>{{scope.row.A_B}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column width="52px">
                      <template slot-scope="scope">
                        <span style="cursor: pointer;color: #1890ff"
                              @click="deleteRow(scope.row)">删除</span>
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
                  <li><p><em>现金结算：</em><span>￥{{priceFormat(cash)}}</span></p></li>
                  <li><p><em>资源置换：</em><span>￥{{priceFormat(zyzh)}}</span></p></li>
                  <li><p><em>其他费用：</em><span>￥{{priceFormat(other)}}</span></p></li>
                  <li><p><em style="top: 5px">总计：</em><span class="totalPrice">￥{{priceFormat(totalPrice)}}</span></p>
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
                      <!--2018.03.01-2018.03.28（20面）、2018.04.01-2018.04.28（10面）、2018.05.01-2018.05.28（10面）-->
                    </div>
                    <div class="price">
                      <div class="price-left">
                        <h4>广告费
                          <el-button type="text" @click="changePrice('AD',item)">修改</el-button><!--changeAD = true-->
                        </h4>
                        <ul>
                          <li>刊例价(面/周) <span>￥{{priceFormat(item.ADPrice)}}</span></li>
                          <li>投放量(面·天) <span>{{item.tfl}}</span></li>
                          <li>赠送(面·天) <span>{{item.GMDate}}</span></li>
                          <li>广告费折扣 <span>{{item.discount}}</span></li>
                          <li>￥{{priceFormat(item.advertyPrice)}}</li>
                        </ul>
                      </div>
                      <div class="price-right">
                        <h4>制作费
                          <el-button type="text" @click="changePrice('M',item)">修改</el-button>
                        </h4>
                        <ul>
                          <li>制作费单价<span>￥{{item.MPrice}}</span></li>
                          <li>广告画数量(张)<span>{{item.ADNumber}}</span></li>
                          <li></li>
                          <li>制作费折扣<span>{{item.makeDiscount}}</span></li>
                          <li>￥{{priceFormat(item.makePrice)}}</li>
                        </ul>
                      </div>
                    </div>
                    <div class="bottom">
                      <div class="bottom-detail">
                        <div class="remark">
                          <el-input type="textarea" v-model="item.remark" placeholder="备注信息"></el-input>
                        </div>
                        <div class="bill-title-right">
                          <ul>
                            <li><p><em>现金结算：</em><span>￥{{priceFormat(item.cash)}}</span></p></li>
                            <li><p><em>资源置换：</em><span>￥{{priceFormat(item.zyzh)}}</span></p></li>
                            <li><p><em>其他费用：</em><span>￥{{priceFormat(item.other)}}</span></p></li>
                          </ul>
                        </div>
                      </div>
                      <div class="bottom-fin">
                        <el-button type="text" @click="changePrice('TP',item)">修改</el-button><!--changeBill = true-->
                        <p><em style="top: 5px">总计：</em><span class="totalPrice">￥{{priceFormat(item.total)}}</span></p>
                      </div>
                    </div>
                  </div>
                </el-tab-pane>
              </el-tabs>
              <!--修改对话框-->
              <el-dialog
                title="修改广告费"
                :visible.sync="changeAD"
                width="30%">
                <div class="changeMakePrice">
                  <p>赠送(面·天)</p>
                  <el-input-number v-model="ADchanger.GMDate" controls-position="right"></el-input-number>
                  <p style="margin-top: 20px">广告费</p>
                  <el-input v-model="ADchanger.reaPrice" placeholder="请输入内容"></el-input>
                </div>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="changeAD = false">取 消</el-button>
                  <el-button type="primary" @click="handleClose('AD')">确 定</el-button>
                </span>
              </el-dialog>
              <!---->
              <el-dialog
                title="修改制作费"
                :visible.sync="changeMake"
                width="30%">
                <div class="changeMakePrice">
                  <p>制作费</p>
                  <el-input v-model="makeChange.MReaPrice" placeholder="请输入内容"></el-input>
                </div>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="changeMake = false">取 消</el-button>
                  <el-button type="primary" @click="handleClose('M')">确 定</el-button>
                </span>
              </el-dialog>
              <el-dialog
                title="修改结算方式"
                :visible.sync="changeBill"
                width="30%"
              >
                <div class="changeBill">
                  <h4>￥{{totalChange.total}}</h4>
                  <p>现金结算</p>
                  <el-input v-model="totalChange.cash" placeholder="请输入内容"></el-input>
                  <p>资源置换</p>
                  <el-input v-model="totalChange.zyzh" placeholder="请输入内容"></el-input>
                  <p>其他费用</p>
                  <el-input v-model="totalChange.other" placeholder="请输入内容"></el-input>
                  <p>结算备注</p>
                  <el-input v-model="totalChange.remark" type="textarea"></el-input>
                </div>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="changeBill = false">取 消</el-button>
                  <el-button type="primary" @click="handleClose('TP')">确 定</el-button><!--Settlement method-->
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
                <li><em>方案名称：</em>{{planName}}</li>
                <li><em>所属客户：</em>{{cName}}</li>
                <li><em>所属品牌：</em>{{cBand}}</li>
                <li class="money"><em>订单金额：</em>￥{{priceFormat(totalPrice)}}</li>
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
      <el-button style="margin-top: 12px;" @click="next" v-if="active == 0 || active == 1 || active == 2 "
                 type="primary">下一步
      </el-button>
      <div class="finishBtn" v-if="active == 3">
        <el-button type="primary" @click="continueCreate">继续创建</el-button>
        <el-button type="default" @click="ToDetail">
          <!--<router-link to="{path='/orderList'}" ></router-link>-->
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
    Input, Dialog, Button, Tabs, TabPane, Table, TableColumn, Cascader, DatePicker,
    Select, Option, Form, FormItem, Steps, Step, Badge, Checkbox, Message, InputNumber
  } from 'element-ui';
  import api from '../../api/api'
  import areaToText from '../../commonFun/areaToText.js';
  import areaArr from '../../commonFun/areaPackage_new'
  import areaArrToText from '../../commonFun/areaToText_new'
  import commaFormat from '../../commonFun/commaFormat'
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
      elInputNumber: InputNumber,
    },
    data() {
      var validateSales = (rule, value, callback) => {
        if (value) {
          if (this.BDData.uid === 0) {
            callback(new Error('请输入正确的账号'));
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
            callback(new Error('方案名称不能为空格'));
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
        shopLoading: true,  // 购物车加载中
        loading: true,//加载中
        dynamicTags: [],
        inputVisible: false,
        inputValue: '',
        selectedOptions: [],
        cityOptions: [],
        cityOther: false,             // 判断是否要选择全国其他城市
        isBD: true,                  // 判断登录用户是否为销售
        username: '',                   // 获取登录用户的userName
        loading: false,             // 加载所属销售
        resType: ['社区', '写字楼'],   // step2 资源类型
        recType: 1,                  // step2  1:社区 0:写字楼
        shopXY: {x: '', y: ''},     // 动画起始坐标
        shoppingShow: false,        //动画效果的显示隐藏
        selectAll: false,           // 是否全选
        badgeNumber: 0,             // 购物车数量
        bodyWidth: 1920,
        city: [],                     // step2 城市
        area: [],                    // step2城市下属区域
        activeIndex: 0,             //step2当前选中的城市下标
        activeRName: '',            //step2当前选中的城市名称
        areaName: '全市',           // step2当前选中的区域
        quotation: [],              // step3 报价单汇总
        ADchanger: {rid: '', GMDate: 0, reaPrice: 0,}, // 广告费修改
        makeChange: {rid: '', MReaPrice: 0},            // 制作费修改
        totalChange: {rid: '', cash: 0, zyzh: 0, other: 0, total: 0, remark: ''},   // 合计费用修改
        CSMList: [],          // 城市不同排期的所有面数
        // step2修改弹框
        changeAD: false,
        changeMake: false,
        changeBill: false,
        totalPrice: 0,      //总价
        remark: '无',      //备注
        cash: 0,          // 现金结算
        zyzh: 0,          // 资源置换
        other: 0,         // 其他费用
        // ownerSales: { value:'',}, // step1所属销售
        customer: [],  // step1公司客户
        companyName: [], //step1公司名称
        planName:'',        // 方案名称
        cName: '',         // 选中公司名称
        companyBrand: [], //step1公司品牌
        cBand: '空',           // 选中的品牌
        ownerBU: [],  //step1联系人
        throwCity: [],//step1投放城市
        dialogTableVisible: true, //购物车
        checkAB: true, //选中
        //搜索类型
        typeSelect: [{
          value: '资源名称',
          label: '资源名称'
        }, {
          value: '商圈',
          label: '商圈'
        },],
        //默认
        selectValue: '资源名称',
        //楼盘类型
        buildType: [{
          buildValue: '全部',
          buildlabel: '全部'
        }, {
          buildValue: '高端住宅',
          buildlabel: '高端住宅'
        }, {
          buildValue: '中端住宅',
          buildlabel: '中端住宅'
        }, {
          buildValue: '一般住宅',
          buildlabel: '一般住宅'
        }, {
          buildValue: '洋房',
          buildlabel: '洋房'
        }, {
          buildValue: '别墅',
          buildlabel: '别墅'
        }],
        buildValue: '',
        //搜索框
        searchInput: '',
        planSelect: '',
        active: 1, //步骤
        dateInput: [],            // 时间输入框
        beforeDate: [],           // 时间输入框的前一次时间
        //setp1创建方案表单
        planForm: {
          planName: '',
          ownerSales: '',   // 所属销售
          companyName: '',
          companyBrand: '',
          throwCity: [],
          ownerBU: '',    // 所属联系人
          planRemark: '',
        },
        planRules: {
          planName: [
            {validator: validateName, trigger: 'blur'},
            {required: true, type: 'string', message: '方案名称不能为空', trigger: 'blur'},
            {max: 30, message: '最多只能输入30个字节', trigger: 'blur'},
          ],
          ownerBU: [
            {required: true, message: '请选择联系人', trigger: 'change'},
          ],
          ownerSales: [
            {required: true, message: '请输入账号', trigger: 'blur'},
            {validator: validateSales, trigger: 'blur'},
          ],
          companyName: [
            {required: true, message: '请选择公司名称', trigger: 'change'},
          ],
          /* companyBrand: [
             { message: '请选择公司品牌', trigger: 'change'},
           ],*/
          throwCity: [
            {required: true, message: '请选择投放城市(可多选)', trigger: 'change'},
          ],
        },
        beforADTotalList: [],    // step2原始的所有点位列表
        ADTotalList: [],         // step2所有点位列表
        shopingList: [],        // step2购物车列表
        planList: [],            //step2可选点位列表
        AdLaunchList: [],        // 被占点位列表
        totalPlanList: [],   // step2全部城市的选点列表
        sessionData: '',    // 登录用户的数据
        shopListCity: [],    // 购物车的城市列表
        selectOnAll: false,   // 默认selecton
        FAData: '',            // 创建方后台返回的数据
        timeout: null,
        BDData: {uid: 0, realName: ''},
        copyPlanList: [],       // 备份planList
        backupsList: [],         //  表头搜索过后的备份
        HSearch: '',           // 获取传值显示‘清除’、‘确定’按钮
        houseNum: ['', ''],      // 表头搜索住户数量
        buildNum: ['', ''],      // 表头搜索楼栋数量
        buildPrice: ['', ''],    // 表头搜索楼盘价格
        liveYear: ['', ''],       // 表头搜索入住年份
        loadSign: true,            // table滚轮
        shopMedia_ADNum: {mediaNum: 0, ADNum: 0},
        ADloading: '',                 // 创建方案、提交选点和报价单时的loading
        computeAuotation: '',         // 计算报价单时的loading
        areaCity: [],
        //    listIndex: 0,                 // 记录滚动加载到的下标
        CityPlanIndex: [],            // 记录每个城市遍历到的下标
        activeCityData: {},          // 城市切换的数据，默认为this.city[0]
        loadScroll: true,           // 搜索后不执行滚动加载
        dateTime: '',                // 获取今天日期
        firstLevelSearch: false,   // 一级搜索
        firstLevelData: [],             // 一级搜索保存的数据
        ADLimit: [                      // step2 广告限制
          {value: '全部', label: '全部'},
          {value: '地产', label: '地产'},
          {value: '汽车', label: '汽车'},
          {value: '美容', label: '美容'},
          {value: '餐饮', label: '餐饮'},
          {value: '食品', label: '食品'},
          {value: '金融', label: '金融'},
          {value: '医学', label: '医学'},
        ],
        limitName: '全部',            // 当前广告限制高亮，默认为全部
        FAInfo:{},
      };
    },
    mounted() {

      this.getsessionData()   // 获取session中的数据
      this.getSetPoint()      //获取选点排期数据
      this.areaCity = areaArr.cityArea()
      this.getADLimit()       // 获取广告限制列表
      // 注：window.onresize只能在项目内触发1次
      let that = this;
      window.onresize = function windowResize() {    // 实时监控body的宽带。注：修改该方法后要重启项目并重新打开页面
        // 通过捕获系统的onresize事件触发我们需要执行的事件
        that.bodyWidth = document.body.offsetWidth;
        that.shopXY.x = that.bodyWidth - 170;
        shopAnimate.style.right = that.shopXY.x + 'px'
      };
      let Right = document.body.offsetWidth - 835
      this.shopXY.x = Right
      //    this.shopXY.x = this.bodyWidth - 170
      let shopAnimate = document.getElementsByClassName('shopAnimate')[0]
      shopAnimate.style.right = this.shopXY.x + 'px'
      $(function () {
        //事件委托
        $('.content_top_wrap').on('click', '.close-tags', function () {
          $(this).parents('.tags').hide();
        });
        $('.content_top_wrap').on('click', '.clear-filter', function () {
          $(this).parents('.filter-tags').hide();
        })

      });
      console.log('this.cityOptions', this.cityOptions)
    },
    directives: {
      loadmore: {
        heightSign: 413,
        bind: function (el, binding) {
          const selectWrap = el.querySelector('.el-table__body-wrapper')
          console.log(binding.def.heightSign)
          selectWrap.addEventListener('scroll', function () {
            const scrollDistance = this.scrollHeight - this.scrollTop - this.clientHeight
            if (scrollDistance <= 150) {
              binding.value()
            }
          })
        }
      }
    },
    methods: {
      //监听table滚动
      loadMore() {
        console.log('触发了滚动')
        if (this.loadScroll) {
          if (this.loadSign) {
            this.loadSign = false
            this.addADList()
            // console.log('滚动了')
            setTimeout(() => {
              this.loadSign = true
            }, 500)
            // console.log('到底了')
          }
        } else {
          console.log('此时为搜索出来的数据')
        }
      },
      // step1投放城市权限是全国时handleClose1、showInput、handleInputConfirm
      spliceCity(tag) { // step1方案创建,删除选择城市
      /*  this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
        let city_arr = this.cityOptions
        for (let i = 0; i < city_arr.length; i++) {       // 遍历城市查找城市名对应的rid，用于删除勾选的城市
          for (let j = 0; j < city_arr[i].children.length; j++) {
            if (city_arr[i].children[j].label === tag) {
              let city_rid = city_arr[i].children[j].value
              for (let n = 0; n < this.planForm.throwCity.length; n++) {
                if (city_rid === this.planForm.throwCity[n]) {
                  for (let t = 0; t < this.throwCity.length; t++) {
                    if (city_rid === this.throwCity[t].value) {
                      this.throwCity.splice(t, 1)
                    }
                  }
                  this.planForm.throwCity.splice(n, 1)
                }
              }
            }
          }
        }*/
      },
      showInput() {
       /* this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });*/
      },
      // 选择投放城市
      handleInputConfirm() {
     /*   let inputValue = this.selectedOptions;
        // console.log('********',inputValue)
        if (inputValue) {
          let cityArr = this.cityOptions
          for (let i = 0; i < cityArr.length; i++) {
            if (cityArr[i].value == inputValue[0]) {
              let childArr = cityArr[i].children
              for (let j = 0; j < childArr.length; j++) {
                if (childArr[j].value == inputValue[1]) {
                  if (this.dynamicTags.indexOf(childArr[j].label) === -1) {
                    this.dynamicTags.push(childArr[j].label);
                    this.planForm.throwCity.push(inputValue[1])
                    let cityObj = {
                      label: childArr[j].label,
                      value: inputValue[1],
                    }
                    this.throwCity.push(cityObj)
                    this.inputVisible = false;
                    this.selectedOptions = [];
                    break
                  } else {
                    Message({
                      message: '不可以选择重复的城市！',
                      type: 'warning'
                    })
                  }
                }
              }
              break
            }
          }
        }*/
      },
      // 获取浏览器session数据
      getsessionData() {
        this.sessionData = JSON.parse(sessionStorage.getItem('session_data'))
        if (this.sessionData.uType === 'BD') {
          this.BDData.realName = sessionStorage.getItem('username')
          this.planForm.ownerSales = this.BDData.realName
          this.BDData.uid = this.sessionData.uID
          this.isBD = true
          this.Get_cName()
        } else {
          this.isBD = false
        }
      },
      // 登录用户为媒介输入销售用户名去获取该销售的信息以便获取接下来的城市、公司、品牌、投放城市等信息
      querySearchAsync(queryString, callback) {
       /* let uid = this.sessionData.uID
        if (queryString) {
          api.postApi('/CheckUserName', {uid: uid, sname: queryString}).then(res => {
            console.log('CheckUserName', res)
            console.log('媒介销售信息', this.BDData)
            if (res.data !== null) {
              this.BDData.uid = res.data.uID
              console.log('CheckUserName数据包', res.data)
              res.data.value = res.data.realName; //queryString
              this.BDData.realName = res.data.realName
              this.planForm.ownerSales = res.data.realName
              this.Get_cName()
              let results = [res.data];
              clearTimeout(this.timeout);
              this.timeout = setTimeout(() => {
                callback(results);
              }, 3000 * Math.random());
            } else {
              this.BDData.uid = 0
            }
          });
        }*/
      },
      //获取公司名称列表MyCustomer
      Get_cName() {
      /*  api.getApi('/MyCustomer', {uid: this.BDData.uid}).then(res => {
          // api.getApi('/MyCustomer', {uid: 7}).then(res => {
          console.log('MyCustomer:', res.data)
          let customerList = res.data
          this.customer = res.data    //保存所有信息，方便后面的过滤使用
          //companyName ownerBU customer
          let companyList = []      // 公司名称
          let ownerList = []      // 联系人
          for (let i = 0; i < customerList.length; i++) {
            // console.log('公司名称',i,customerList[i].cName)
            let companyObj = {
              label: customerList[i].cName,
              value: customerList[i].cID,
            }
            let owner = {
              label: customerList[i].realName,
              value: customerList[i].uID,
            }
            ownerList.push(owner)
            if (i == 0) {
              companyList.push(companyObj)
            } else if (JSON.stringify(companyList).indexOf(JSON.stringify(companyObj)) === -1) { //判断是否有重复的公司JSON.stringify(companyObj)
              companyList.push(companyObj)
            }
          }
          // console.log('companyList:', companyList)
          // console.log('联系人列表:', ownerList)
          this.companyName = companyList  // 公司名称列表
          this.ownerBU = ownerList // 联系人列表
        })
        // 公司信息所在城市
        let uWho = this.sessionData.uWho // '110100,310100,440100'
        if (uWho == '0') {
          this.cityOther = true
          this.cityOptions = areaArr.province()
          // console.log('全国省市',this.cityOptions)
        } else {
          let uWhoArr = uWho.split(',') // ['440100','110100','330100']
          let cityList = []
          for (let j = 0; j < uWhoArr.length; j++) {
            console.log('公司uWho', uWhoArr[j])
            areaToText.toText(data => {
              // console.log('公司信息所在城市', data);
              let cityObj = {
                label: data.city,
                value: uWhoArr[j],
              }
              console.log('cityObj', cityObj)
              cityList.push(cityObj);
              if (j >= uWhoArr.length - 1) {
                console.log('cityListcityList玩玩', cityList)
                this.throwCity = cityList
              }
            }, uWhoArr[j]);

          }
        }*/
      },
      // step2 获取广告限制列表
      getADLimit() {
        let uid = this.sessionData.uID
        this.ADLimit = []
        api.getApi('/GetNotPush', {uid: uid}).then(res => {
          console.log('广告限制列表', res)
          let limit = res.data
          let limitArr = []
          let firstObj = {value: '全部', label: '全部'}
          limitArr.push(firstObj)
          for (let i = 0; i < limit.length; i++) {
            let limitObj = {value: limit[i].nTitle, label: limit[i].nTitle}
            limitArr.push(limitObj)
          }
          this.ADLimit = limitArr
        })
      },
      // 初始化方案选点
      SetADBFun(){
        /* uid         int【必填】         当前账户UserID
            pdid        int【必填】         选择方案投放pdID*/
        let apid = sessionStorage.getItem("plan_apid");
        api.postApi('/SetADB',{uid:this.sessionData.uID,apid:apid}).then(res=>{
          console.log('初始化方案选点',res)
          if(res.data.SysCode == 300200){
            this.getPDIDFun(apid)
          }else{
            Message.warning('选点信息提交失败')
          }
        })
      },
      // 提交方案选点信息
      getPDIDFun(apID) {
        /*   uid         int【必填】         当前账户UserID
            pdid        int【必填】         选择方案投放pdID
            pbs         String【必填】      广告开始投放日期
            pbe         String【必填】      广告投放结束日期
            asids       String【必填】      选择的广告点位asID组合，以","逗号组合*/
        let csmArr = this.CSMList
        let shopingArr = this.shopingList
        console.log('shopingArr', shopingArr)
        console.log('csmArr', csmArr)
        let uid = this.sessionData.uID
        api.getApi('/GetAPD', {uid: uid, apid: apID}).then(res => {
          console.log('获取pdid', res)
          let APDData = res.data
          // let pointArr = []
          console.log('this.cityOption',this.cityOptions)
          if (APDData.length !== 0) {
            for (let j = 0; j < APDData.length; j++) {
              for (let t = 0; t < this.cityOptions.length; t++) {
                let child = this.cityOptions[t].children
                for (let g = 0; g < child.length; g++) {
                  if (child[g].value == APDData[j].rID) {
                    let city = child[g].label
                    for (let n = 0; n < csmArr.length; n++) {
                      let asIDs = ''
                      for (let i = 0; i < shopingArr.length; i++) {
                        if (csmArr[n].city === shopingArr[i].city && csmArr[n].schedules === shopingArr[i].schedules) {
                          // alert('2')
                          if (asIDs === '') {
                            // alert('2aa',shopingArr[i].asIDs)
                            asIDs = shopingArr[i].asIDs
                          } else {
                            // alert('3aa',shopingArr[i].asIDs)
                            asIDs = asIDs + ',' + shopingArr[i].asIDs
                          }
                        }
                      }
                      console.log('+++++++++++++', asIDs)
                      if (csmArr[n].city == city) {
                        let pointParams = {
                          uid: uid,
                          pdid: APDData[j].pdID,
                          pbs: csmArr[n].schedules.split('-')[0],
                          pbe: csmArr[n].schedules.split('-')[1],
                          asids: asIDs,
                        }
                        console.log('提交选点的信息', csmArr[n].city, pointParams)
                        api.postApi('/SendAdBase', pointParams).then(res => {
                          console.log('提交选点后返回的data', res)
                          let AdBase = res.data
                          // this.CreateAPDFun()
                          if (n >= csmArr.length - 1) {
                            if (j >= APDData.length - 1) {
                              this.CreateAPDFun()
                            }
                          }
                        })
                      }
                    }
                  }
                }
              }
            }
          }else{
            console.log('22312')
          }
        })
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
        let apid = sessionStorage.getItem("plan_apid");
        for (let i = 0; i < this.quotation.length; i++) {
          let CAPDParams = {
            uid: this.sessionData.uID,      // 当前账户UserID
            apid: apid,  //this.FAData.apID,         // 方案apID
            pdre: this.quotation[i].remark,   // 方案投放特定城市详情备注 '备注信息',
            muid: this.sessionData.uID,    // 如果当前账户是MD，在填写该媒介UserID
            rid: this.quotation[i].rid,       // 方案投放的目标城市rID
            days: this.quotation[i].tfl,      // 投放总数：面*天
            fdays: this.quotation[i].GMDate,  // 赠送数量：面/天
            ps: '',       // 方案投放开始时间
            pe: '',       // 投放结束日期
            //commaFormat.noComma(this.quotation[i].advertyPrice) * 100,
            pdfee: parseInt(this.quotation[i].advertyPrice * 100),    //  实际广告费用
            pdn: this.quotation[i].ADNumber,                      // 投放点位数
            pdm: this.quotation[i].makePrice * 100,   // 实计制作费用
            pdt: commaFormat.noComma(this.quotation[i].cash) * 100,        // 现金金额
            pdsf: commaFormat.noComma(this.quotation[i].zyzh) * 100,       // 置换金额
            pdof: commaFormat.noComma(this.quotation[i].other) * 100,      // 其他金额
          }
          if (this.sessionData.uType === 'BD') {
            delete CAPDParams.muid;
          }
          let schedulesArr = this.quotation[i].schedules.split('-')
          CAPDParams.ps = schedulesArr[0]
          CAPDParams.pe = schedulesArr[schedulesArr.length - 1]
          console.log('广告画数：', this.quotation[i].ADNumber, ',报价单数据提交:', CAPDParams)
          api.postApi('/CreateAPD', CAPDParams).then(res => {
            console.log('提交报价单后台返回数据：', res)
            let APD_data = res.data
            this.ADloading.close()
            if (!res.data.SysCode) {
              if (res.data !== '') {
                Message({
                  message: '投放城市的报价信息提交成功！',
                  type: 'success'
                })
                //获取品牌
                // this.getBand()
                this.active = 3
              } else {
                Message({
                  message: '投放城市的报价信息提交失败！',
                  type: 'warning'
                })
              }
            } else {
              Message({
                message: '投放城市的报价信息提交失败！',
                type: 'warning'
              })
            }
          })
        }

      },
      // 获取当前时间并计算N天后的日期
      GetDateStr(AddDayCount) {
        let dd = new Date();
        dd.setDate(dd.getDate() + AddDayCount)    // 获取AddDayCount天后的日期
        let y = dd.getFullYear();
        let m = (dd.getMonth() + 1) < 10 ? "0" + (dd.getMonth() + 1) : (dd.getMonth() + 1)  // 获取当前月份的日期，不足10补0
        let d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate()       // 获取当前几号，不足10补0
        return y + "." + m + "." + d
      },
      // 设置城市区域
      getAreaFun() {
        this.area = []
        let throwCityList = this.planForm.throwCity
        console.log('****************', throwCityList)
        console.log('________--------', this.throwCity)
        let cityArr = []
        for (let j = 0; j < throwCityList.length; j++) {
          for (let t = 0; t < this.throwCity.length; t++) {
            if (this.throwCity[t].value === throwCityList[j]) {
              let cityObj = {rName: this.throwCity[t].label, rid: this.throwCity[t].value}
              cityArr.push(cityObj)
            }
          }
          if (j >= throwCityList.length - 1) {
            this.city = cityArr
            this.city.sort(this.compareFun)
            console.log('this.city ', this.city)
            this.activeCityData = this.city[0]    // 设置初始选中城市信息
            for (let n = 0; n < this.city.length; n++) {
              let rid = this.city[n].rid
              console.log('投放城市rid', rid)
              let provinceRid = rid.substring(0, 2) + '0000'
              // alert(provinceRid)
              let city_arr = this.areaCity
              let areaArr = []
              console.log('this.cityOptions', this.areaCity)
              for (let i = 0; i < city_arr.length; i++) {       // 遍历城市查找城市名对应的rid，用于删除勾选的城市
                if (city_arr[i].value == provinceRid) {
                  let child = city_arr[i].children
                  for (let j = 0; j < child.length; j++) {
                    if (child[j].value == rid) {
                      let areaChild = child[j].children
                      // console.log('区区区',areaChild)
                      for (let n = 0; n < areaChild.length; n++) {
                        if (n === 0) {
                          let allArea = {
                            rID: rid,
                            rName: '全市'
                          }
                          areaArr.push(allArea)
                        }
                        let myArea = {rID: areaChild[n].value, rName: areaChild[n].label}
                        areaArr.push(myArea)
                        if (n >= areaChild.length - 1) {
                          console.log('areaArr', areaArr)
                          this.area.push(areaArr)
                          this.area.sort(this.compareArea)
                        }
                      }
                    }
                  }
                }
                if (i >= city_arr.length - 1) {
                  console.log('this.area', this.area)
                  // this.area = areaArr
                }
              }
            }
          }
        }
      },
      // step2, 资源类型切换
      activeRecType(num){
        this.recType = num
      //  let beforAD = this.beforADTotalList   // 选点列表
        let index = this.activeIndex
        let cityData = this.activeCityData
        let beforAD = []
        if(this.searchInput !== ''){
          beforAD = this.firstLevelData
        }else{
          beforAD = this.beforADTotalList[index].list
        }
        let tempList = []
        if(num == 2){
          this.loadScroll = false
          console.log('num',num)
          for (let i = 0; i < beforAD.length; i++) {
            if (beforAD[i].resType == num) {
              // console.log('i:',i)
              tempList.push(beforAD[i])
            } else {
              console.log('1')
            }
          }
          console.log('资源类型切换tempList',tempList)
          if(tempList.length !== 0){
            this.setResTypeData(tempList)
          }else{
            this.planList = []
          }
        }else{
          this.activeCity(cityData,index)
          this.loadScroll = true
        }
      },
      //资源类型切换的数据
      setResTypeData(Data){
        let datalist= Data
        let planArr = []
        let rName = this.activeCityData.rName //this.activeRName
        for(let i=0;i<datalist.length;i++){
          let adObj = {
            rid: 0 + i.toString(),
            mID: datalist[i].mID,
            asIDs: datalist[i].asIDs,
            asLabs: datalist[i].asLabs,
            recName: datalist[i].resName,
            city: rName, //'广州',
            origin: datalist[i].rName,
            buildType: datalist[i].cType,
            houseNum: datalist[i].hNum,
            buildPrice: (datalist[i].hPrice / 100),
            mediaName: datalist[i].mTitle,
            buildNum: datalist[i].fNum,
            schedules: this.dateInput[0] + '-' + this.dateInput[1],
            businessOrigin: datalist[i].tradingArea,
            assetID: datalist[i].assetTag,
            liveYear: datalist[i].chDay,
            adLimit: datalist[i].notPush,
            checkBox: {A: false, B: false},
            box: {A: false, B: false},
          }
          if (datalist[i].asLabs.indexOf('A') === -1) {
            adObj.box.A = true
          }
          if (datalist[i].asLabs.indexOf('B') === -1) {
            adObj.box.B = true
          }
          planArr.push(adObj)
          if (i >= datalist.length - 1) {
            console.log('资源类型过滤完成后的planArr', planArr)
            this.planList = planArr
            this.judgeByselect()
          }
        }

      },
      // stpe2, tab切换城市
      activeCity(item, index) {
        this.activeIndex = index
        this.activeRName = item.rName
        this.activeCityData = item
        this.areaName = '全市'
        if (this.searchInput !== '' && this.searchInput !== null && this.searchInput !== undefined) {
          this.ResOriginSearch()
        } else {
          this.loadScroll = true
          console.log('item.rid', item.rid, ',this.totalPlanList', this.totalPlanList)
          for (let i = 0; i < this.totalPlanList.length; i++) {
            if (this.totalPlanList[i].rid === item.rid) {
              //    console.log('this.totalPlanList[i]',this.totalPlanList[i])
              this.planList = this.totalPlanList[i].list
              this.copyPlanList = this.planList
              console.log('this.planList', this.planList)
              if (this.planList.length !== 0) {
                this.judgeByselect()
                break
              } else {
                this.$message({
                  message: item.rName + '暂无可选的投放点',
                  type: 'warning'
                })
              }
            }
          }
        }
        if(this.recType == 2){
          this.activeRecType(2)
        }
      },
      // 根据购物车已有的mID对应AB面判断勾选
      judgeByselect(letter) {
        // console.log('judgeByselect的planList',this.planList)
        let that = this
        setTimeout(function () {
          for (let i = 0; i < that.shopingList.length; i++) {
            for (let j = 0; j < that.planList.length; j++) {
              if (that.planList[j].mID == that.shopingList[i].mID && that.planList[j].schedules == that.shopingList[i].schedules) {
                console.log('相同shopingList[i]', that.shopingList[i])
                console.log('相同shopingList[i]', that.planList[j])
                if (that.shopingList[i].A_B === 'A面') {
                  that.planList[j].checkBox.A = true
                } else if (that.shopingList[i].A_B === 'B面') {
                  that.planList[j].checkBox.B = true
                }
              }
              if (that.planList[j].checkBox.A || that.planList[j].checkBox.B) {
                if (letter !== 'firstLevel' && letter !== 'FArea' && letter !== 'scoll') {
                  // console.log('时间排期', that.dateInput)
                  that.planList[j].schedules = that.dateInput[0] + '-' + that.dateInput[1]
                }
                that.$refs.multipleTable.toggleRowSelection(that.planList[j], true)
              }
            }
          }
          if (letter === 'firstLevel') {
            that.firstLevelData = that.planList     // 保存一级搜索的数据
            console.log('一级搜索得到的数据firstLevelData', that.firstLevelData)
          }
        }, 0)
      },
      //  stpe2, 切换区域
      activeArea(rName) {
        this.loadScroll = false
        this.areaName = rName
        this.filterByArea(rName)
      },
      // 城市区域过滤
      filterByArea(name) {
        this.loading = true
        let AName = name
        let copyPlan = this.copyPlanList
        console.log('切换区域', AName, ',copyPlan', copyPlan)
        let FBA = []
        if (this.searchInput !== '' && this.searchInput !== null) {
          FBA = this.firstLevelData //this.planList
        } else {
          let FBAIndex = this.activeIndex
          FBA = this.beforADTotalList[FBAIndex].list
          console.log(FBAIndex, ',城市区域过滤的beforPlanList', this.beforADTotalList)
        }
        if (AName !== '全市') {
          this.loading = true
          let filterAreaArr = []
          console.log('城市区域过滤的beforPlanList', FBA)
          for (let i = 0; i < FBA.length; i++) {
            if (AName === FBA[i].rName || AName === FBA[i].origin) {
              filterAreaArr.push(FBA[i])
            } else {
              console.log('不匹配', AName)
            }
          }
          console.log('城市区域过滤到的数据:', filterAreaArr)
          if (filterAreaArr.length !== 0) {
            if (this.searchInput !== '' && this.searchInput !== null) {
              this.planList = filterAreaArr
              this.judgeByselect('FArea')
              this.loading = false
            } else {
              this.filterByADLaunch(filterAreaArr)
            }
          } else {
            this.planList = []
            this.loading = false
          }
        } else if (AName === '全市' && this.searchInput !== '' && this.searchInput !== null) {
          this.planList = this.firstLevelData
          this.judgeByselect('FArea')
          this.loading = false
        } else {
          console.log('搜索为空点击全市', this.activeCityData, this.activeIndex)
          this.activeCity(this.activeCityData, this.activeIndex)
          this.loading = false
        }
      },
      // 根据过滤条件得到的数据再根据被占列表AdLaunchList进行帅选
      filterByADLaunch(fdata) {
        let filterData = fdata
        let filterPlanArr = []
        let cityName = this.activeCityData.rName //this.activeRName
        let FBAIndex = this.activeIndex
        for (let n = 0; n < filterData.length; n++) {
          let filterAD = {
            rid: FBAIndex + n.toString(),
            mID: filterData[n].mID,
            asIDs: filterData[n].asIDs,
            asLabs: filterData[n].asLabs,
            recName: filterData[n].resName,
            city: cityName, //'广州',
            origin: filterData[n].rName,
            buildType: filterData[n].cType,
            houseNum: filterData[n].hNum,
            buildPrice: (filterData[n].hPrice / 100),
            mediaName: filterData[n].mTitle,
            buildNum: filterData[n].fNum,
            schedules: this.dateInput[0] + '-' + this.dateInput[1],
            businessOrigin: filterData[n].tradingArea,
            assetID: filterData[n].assetTag,
            liveYear: filterData[n].chDay,
            adLimit: filterData[n].notPush,
            checkBox: {A: false, B: false},
            box: {A: false, B: false},
          }
          if (filterData[n].asLabs.indexOf('A') === -1) {
            filterAD.box.A = true
          }
          if (filterData[n].asLabs.indexOf('B') === -1) {
            filterAD.box.B = true
          }
          filterPlanArr.push(filterAD)
          if (n >= filterData.length - 1) {
            console.log('搜索中的filterPlanArr', filterPlanArr)
            this.planList = filterPlanArr
            this.judgeByselect('FArea')
          }
        }
        this.loading = false
      },
      // 广告限制切换
      activeADLimit(n) {
        this.limitName = n
      },
      // 获取广告点位列表
      getAdList(letter) {
        this.loading = true
        let starTime,endTime
        if (letter === 'search') {
          starTime = this.dateInput[0]
          endTime = this.dateInput[1]
        } else {
          this.dateTime = this.GetDateStr(0)
          starTime = this.GetDateStr(1)
          endTime = this.GetDateStr(14)
          this.dateInput = [starTime, endTime] // 设置默认时间
        }
        if(this.dateInput !== this.beforeDate){
          this.beforADTotalList = []
          let uid = this.sessionData.uID
          let throwCity = this.city
          // console.log('投放城市333333333', throwCity)
          for (let t = 0; t < throwCity.length; t++) {
            let rid = throwCity[t].rid
            //  let rName = throwCity[t].rName
            api.getApi('/GetAdS', {uid: uid, rid: rid,act:1,ls:starTime,le:endTime}).then(res => {
              console.log('选点列表：', res)
              let ADList = res.data
              let listObj = {rid: rid, list: []}
              listObj.list = ADList
              this.ADTotalList.push(listObj)
              this.beforADTotalList.push(listObj)
              this.beforADTotalList.sort(this.compareFun)
              if (this.beforADTotalList.length >= throwCity.length) {
                console.log('GetAdS选点列表',this.beforADTotalList)
                if(letter === 'search' && this.searchInput !== ''){
                  this.setAdLaunchFun('search')
                }else{
                  this.setAdLaunchFun()
                }
                this.beforeDate = this.dateInput
              }
            })
          }
        }else if (this.searchInput !== '') {
          this.ResOriginSearch()
        } else {
          this.loading = false
        }
      },
      // 重排列表，显示planList
      setAdLaunchFun(letter) {
        this.CityPlanIndex = []
        let ADArr = this.beforADTotalList
        let throwCity = this.city
        let totalList = []        // 全部城市的选点列表
        console.log('重排列表this.beforADTotalList', this.beforADTotalList)
        console.log('重排列表throwCity', throwCity)
        for (let t = 0; t < throwCity.length; t++) {
          for (let n = 0; n < ADArr.length; n++) {
            if (throwCity[t].rid == ADArr[n].rid) {
              console.log('城市与全部点位相同的rid', ADArr[n].rid)
              let ADList = ADArr[n].list
              let planArr = {rid: throwCity[t].rid, list: []}
              if (ADList.length !== 0) {
                for (let i = 0; i < ADList.length; i++){
                  let adObj = {
                    rid: t.toString() + i.toString(),
                    mID: ADList[i].mID,
                    asIDs: ADList[i].asIDs,
                    asLabs: ADList[i].asLabs,
                    recName: ADList[i].resName,
                    city: throwCity[t].rName, //'广州',
                    origin: ADList[i].rName,
                    buildType: ADList[i].cType,
                    houseNum: ADList[i].hNum,
                    buildPrice: (ADList[i].hPrice / 100),
                    mediaName: ADList[i].mTitle,
                    buildNum: ADList[i].fNum,
                    schedules: this.dateInput[0] + '-' + this.dateInput[1],
                    businessOrigin: ADList[i].tradingArea,
                    assetID: ADList[i].assetTag,
                    liveYear: ADList[i].chDay,
                    adLimit: ADList[i].notPush,
                    checkBox: {A: false, B: false},
                    box: {A: false, B: false},
                  }
                  if (ADList[i].asLabs.indexOf('A') === -1) {
                    adObj.box.A = true
                  }
                  if (ADList[i].asLabs.indexOf('B') === -1) {
                    adObj.box.B = true
                  }
                  planArr.list.push(adObj)
                  let index = 49
                  if (i >= index && ADList.length >= index && planArr.list.length >= index) {
                    let indexObj = {rid: ADArr[n].rid, LIndex: i + 1}
                    this.CityPlanIndex.push(indexObj)
                    console.log('城市rid:', indexObj.rid, '遍历到的下标:', indexObj.LIndex)
                    this.listIndex = i + 1
                    console.log('方案选点列表1', planArr)
                    totalList.push(planArr)
                    break
                  } else {
                    if (i >= ADList.length - 1) {
                      let indexObj = {rid: ADArr[n].rid, LIndex: i + 1}
                      this.CityPlanIndex.push(indexObj)
                      this.listIndex = i + 1
                      console.log('方案选点列表长度小于19', planArr)
                      // this.planList = planArr
                      totalList.push(planArr)
                    }
                  }
                }
              }else {
                totalList.push(planArr)
              }
            }
          }
        }
        this.totalPlanList = totalList
        let ATIndex = this.activeIndex
        this.planList = this.totalPlanList[ATIndex].list
        this.loading = false
        this.copyPlanList = this.planList
        if (letter === 'search' && this.searchInput !== '') {
          this.ResOriginSearch()      // 资源名称或商圈搜索
        }
      },
      // 监听滚动，每次曾加20条数据
      addADList() {
        console.log('监听到滚动，并调用了addADList')
        let beforAD = this.beforADTotalList   // 选点列表
        let cityListIndex = this.CityPlanIndex
        console.log('cityListIndex', cityListIndex)
        console.log('this.beforADTotalList', this.beforADTotalList)
        console.log('this.activeCityData',this.activeCityData)
        for (let n = 0; n < beforAD.length; n++) {
          for (let g = 0; g < cityListIndex.length; g++) {
            if (cityListIndex[g].rid === beforAD[n].rid && this.activeCityData.rid === beforAD[n].rid) {
              let rid = cityListIndex[g].rid
              console.log(cityListIndex[g].rid, '该城市从下标为', cityListIndex[g].LIndex)
              let myIndex = cityListIndex[g].LIndex
              let ADList = beforAD[n].list
              let planArr = {rid: rid, list: []}
              for (let i = myIndex; i < ADList.length; i++){
                console.log('遍历选点列表')
                let adObj = {
                  rid: n.toString() + i.toString(),
                  mID: ADList[i].mID,
                  asIDs: ADList[i].asIDs,
                  asLabs: ADList[i].asLabs,
                  recName: ADList[i].resName,
                  city: this.activeCityData.rName, //throwCity[t].rName, //'广州',
                  origin: ADList[i].rName,
                  buildType: ADList[i].cType,
                  houseNum: ADList[i].hNum,
                  buildPrice: (ADList[i].hPrice / 100),
                  mediaName: ADList[i].mTitle,
                  buildNum: ADList[i].fNum,
                  schedules: this.dateInput[0] + '-' + this.dateInput[1],
                  businessOrigin: ADList[i].tradingArea,
                  assetID: ADList[i].assetTag,
                  liveYear: ADList[i].chDay,
                  adLimit: ADList[i].notPush,
                  checkBox: {A: false, B: false},
                  box: {A: false, B: false},
                }
                if (ADList[i].asLabs.indexOf('A') === -1) {
                  adObj.box.A = true
                }
                if (ADList[i].asLabs.indexOf('B') === -1) {
                  adObj.box.B = true
                }
                planArr.list.push(adObj)
                if (i >= myIndex + 29 && ADList.length >= myIndex + 29 && planArr.list.length >= 29) {
                  this.CityPlanIndex[g].LIndex = i + 1
                  this.listIndex = i + 1
                  console.log('滚动加载方案选点列表', planArr)
                  this.addListPush(planArr)
                  break
                } else {
                  if (i >= ADList.length - 1) {
                    this.CityPlanIndex[g].LIndex = i + 1
                    this.listIndex = i + 1
                    console.log('滚动加载方案选点列表小于19', planArr)
                    this.addListPush(planArr)
                  }
                }
              }
            }
          }
        }
      },
      // addADList完成push动作
      addListPush(addData) {
        let addList = addData
        console.log('addListPush滚动增加的数据', addList)
        let rid = this.city[this.activeIndex].rid
        if (rid === addList.rid) {
          let tempArr = addList.list
          for (let j = 0; j < tempArr.length; j++) {
            this.planList.push(tempArr[j])
          }
        }
        this.judgeByselect('scoll')
        this.copyPlanList = this.planList
      },
      //获取mouseEnter屏幕时的坐标像素
      mouseEnter(row, column, cell, event) {
        let e = event || window.event;
        this.shopXY.y = e.clientY
        // console.log('this.shopXY.y',this.shopXY.y)
      },
      // 行选中打钩
      handleSelect(selection, row) {
        if (!row.checkBox.B && !row.checkBox.A) {
          if (!row.box.A) {
            row.checkBox.A = true
            this.shopShow_hide()   // 动画效果
            this.AddShopingInfo(row) // 添加到购物车
          } else if (!row.box.B && row.box.A) {
            row.checkBox.B = true
            this.shopShow_hide()   // 动画效果
            this.AddShopingInfo(row) // 添加到购物车
          }
        } else if (row.checkBox.A || row.checkBox.B) {
          if (row.checkBox.A && row.checkBox.B) {
            this.badgeNumber -= 2
          } else {
            this.badgeNumber--
          }
          this.deleteShopRow(row, 'AB')
          row.checkBox.A = false
          row.checkBox.B = false
        } else {
          row.checkBox.A = false
        }
        // console.log('选中selection', selection)
        // console.log('选中row', row)
      },
      // 选中A、B面的时候
      changeA(row) {
        let check = row
        if (check.checkBox.A === true || check.checkBox.B === true) {
          this.$refs.multipleTable.toggleRowSelection(check, true);
          if (check.checkBox.A) {
            this.shopShow_hide()      // 动画效果
            this.AddShopingInfo(row, 'A') // 添加到购物车
          } else {                          // A、B都勾选的时候
            this.deleteShopRow(check, 'A')
            this.badgeNumber--
          }
        } else {
          this.deleteShopRow(check, 'A')
          this.$refs.multipleTable.toggleRowSelection(check, false);
          this.badgeNumber--
        }
      },
      changeB(row) {
        let check = row
        if (check.checkBox.A === true || check.checkBox.B === true) {
          this.$refs.multipleTable.toggleRowSelection(check, true);
          if (check.checkBox.B === true) {
            this.shopShow_hide()
            this.AddShopingInfo(row, 'B') // 添加到购物车
          } else {                        // A、B都勾选的时候
            this.deleteShopRow(check, 'B')
            this.badgeNumber--
          }
        } else {
          this.$refs.multipleTable.toggleRowSelection(check, false);
          this.deleteShopRow(check, 'B')
          this.badgeNumber--
        }
      },
      //点击全选按钮
      handleSelectAll(selection) {
        // console.log('selection', selection)
        if (selection.length !== 0) {
          // console.log('number:', number)
          for (let i = 0; i < selection.length; i++) {
            // 根据是否被占用去打勾
            if (!selection[i].box.A) {
              // console.log('boxA')
              selection[i].checkBox.A = true
            }
            if (!selection[i].box.B) {
              // console.log('boxB')
              selection[i].checkBox.B = true
            }
          }
          this.shopShow_hide('all')
          this.deleteShopRow(selection, 'all')     // 全选时添加进购物篮
        } else {
          let shopingArr = this.shopingList
          let planListCity = this.planList[0].city
          for (let i = 0; i < shopingArr.length;) {
            if (planListCity === shopingArr[i].city) {
              // console.log('删除城市为：', planListCity)
              // shopingArr.splice(i, 1)
              this.deleteRow(shopingArr[i])
            } else {
              i++
            }
            if (i >= shopingArr.length - 1) {
              // this.shopingList = shopingArr
              this.getBadeNumberByShopList()
            }
          }
        }
      },
      // 下一步
      next() {
        if (this.active === 0) {
          // console.log('this.dynamicTags', this.dynamicTags)
          // this.openFullScreen2()
          this.submitForm('planForm')
          this.shopingList = []
          this.badgeNumber = 0
        } else if (this.active === 1) {
          if (this.badgeNumber !== 0) {
            this.active++
            this.computeAuotation = this.$loading({
              lock: true,
              text: '努力计算ing',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });
            this.creatTab()       // 报价单tab
            this.getShopingCityName()   // 获取购物车列表的城市名称
            this.quotationFun()   // 报价单计算
          } else {
            this.$message({
              message: '请选择点位',
              type: 'warning'
            });
          }
        } else if (this.active === 2) {
          this.ADloading = this.$loading({
            lock: true,
            text: '加急创建中...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          // setTimeout(() => {
          this.SetADBFun()    // 创建方案
          // }, 1000);
        }
        if (this.active > 3) {
          this.active = 0;
        }
      },
      // 上一步
      prev() {
        if (this.active === 2) {
          this.active--;
          let that = this
          setTimeout(function () {
            for (let j = 0; j < that.planList.length; j++) {
              if (that.planList[j].checkBox.A || that.planList[j].checkBox.B) {
                that.$refs.multipleTable.toggleRowSelection(that.planList[j], true)
              }
            }
          }, 0)
        } else {
          this.active--;
        }
        if (this.active < 1) {
          this.active = 0;
        }
      },
      // 表单验证
      submitForm(formName) {
        // this.active++;
        // this.getAreaFun()
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // console.log('submit!');
            this.active++;
            this.getAreaFun()
            this.getAdList()    // 获取选点列表
          } else {
            return false;
          }
        });
      },
      // 继续创建
      continueCreate() {
        this.$router.push("./createPlan");
      //  Object.assign(this.$data, this.$options.data()) // vue data恢复初始化数据
      },
      changePrice(letter, info) {
        if (letter === 'AD') {
          this.changeAD = true
          this.ADchanger.rid = info.rid
          this.ADchanger.GMDate = info.GMDate
          this.ADchanger.reaPrice = Math.floor(info.advertyPrice * 100) / 100
        } else if (letter === 'M') {
          this.changeMake = true
          this.makeChange.rid = info.rid
          this.makeChange.MReaPrice = info.makePrice
        } else if (letter === 'TP') {
          this.changeBill = true
          this.totalChange.rid = info.rid
          this.totalChange.cash = (info.cash).toFixed(2)
          this.totalChange.zyzh = (info.zyzh).toFixed(2)
          this.totalChange.other = (info.other).toFixed(2)
          this.totalChange.total = (info.total).toFixed(2)
        }
      },
      //step3确认修改
      handleClose(letter) {
        // 'AD'为广告费修改，'M'为制作费修改, 'SM'为修改结算方式
        let QArr = this.quotation
        if (letter === 'AD') {
          for (let i = 0; i < QArr.length; i++) {
            if (QArr[i].rid === this.ADchanger.rid) {
              this.quotation[i].advertyPrice = ((this.quotation[i].tfl - this.ADchanger.GMDate) * (this.quotation[i].ADPrice / 7)) //((this.quotation[i].tfl - this.ADchanger.GMDate) * (this.quotation[i].ADPrice / 7)).toFixed(2)
              this.quotation[i].GMDate = this.ADchanger.GMDate
              if (this.ADchanger.GMDate != 0) {

                if (this.ADchanger.reaPrice === this.quotation[i].reaPrice) {
                  // alert('2')
                  this.ADchanger.reaPrice = (this.quotation[i].advertyPrice).toFixed(2)
                  this.quotation[i].reaPrice = this.quotation[i].advertyPrice
                  this.quotation[i].discount = Math.round(this.quotation[i].advertyPrice / this.quotation[i].oldPrice * 10000) / 100.00 + "%" // 折扣百分比
                  this.hideBox()
                } else if (this.ADchanger.reaPrice > this.quotation[i].advertyPrice) {
                  // alert('3')
                  this.ADchanger.reaPrice = Math.floor(this.quotation[i].advertyPrice * 100) / 100
                  this.$message({
                    message: '大于原价格',
                    type: 'warning'
                  });
                } else {
                  // alert('4')
                  if (this.ADchanger.reaPrice > this.quotation[i].advertyPrice) {
                    this.ADchanger.reaPrice = Math.floor(this.quotation[i].advertyPrice * 100) / 100
                    this.$message({
                      message: '大于原价格',
                      type: 'warning'
                    });
                  } else {
                    this.quotation[i].reaPrice = this.quotation[i].advertyPrice
                    this.quotation[i].advertyPrice = this.ADchanger.reaPrice
                    this.quotation[i].discount = Math.round(this.quotation[i].advertyPrice / this.quotation[i].oldPrice * 10000) / 100.00 + "%" // 折扣百分比
                    this.hideBox()
                  }
                }
              } else {
                // alert('0')
                if (this.ADchanger.reaPrice > this.quotation[i].oldPrice) {
                  this.ADchanger.reaPrice =  Math.floor(this.quotation[i].advertyPrice * 100) / 100
                  this.$message({
                    message: '大于原价格',
                    type: 'warning'
                  });
                } else {
                  this.quotation[i].advertyPrice = this.ADchanger.reaPrice
                  this.quotation[i].reaPrice = this.quotation[i].oldPrice
                  // this.quotation[i].discount = Math.round(this.quotation[i].advertyPrice / this.quotation[i].reaPrice * 10000) / 100.00 + "%" // 折扣百分比
                  this.quotation[i].discount = Math.round(this.quotation[i].advertyPrice / this.quotation[i].oldPrice * 10000) / 100.00 + "%" // 折扣百分比
                  this.hideBox()
                }
              }
              // break
              this.quotation[i].total = Number(this.quotation[i].advertyPrice) + Number(this.quotation[i].makePrice)
              this.quotation[i].cash = this.quotation[i].total
              this.computeTotal()
            }
          }
        } else if (letter === 'M') {         // 制作费修改
          for (let i = 0; i < QArr.length; i++) {
            if (QArr[i].rid === this.makeChange.rid) {
              if (this.makeChange.MReaPrice > this.quotation[i].MReaPrice) {
                this.$message({
                  message: '大于原价格',
                  type: 'warning'
                });
              } else {
                this.quotation[i].makeDiscount = Math.round(this.makeChange.MReaPrice / this.quotation[i].MReaPrice * 10000) / 100.00 + "%" // 制作费折扣百分比
                this.quotation[i].makePrice = this.makeChange.MReaPrice
                this.hideBox()
              }
              // break
              this.quotation[i].total = Number(this.quotation[i].advertyPrice) + Number(this.quotation[i].makePrice)
              this.quotation[i].cash = this.quotation[i].total
              this.computeTotal()
            }
          }
        } else if (letter === 'TP') {     // 修改结算方式
          for (let i = 0; i < QArr.length; i++) {
            if (QArr[i].rid === this.totalChange.rid) {
              // alert('1')
              let total = Number(this.totalChange.other) + Number(this.totalChange.zyzh) + Number(this.totalChange.cash)
              // console.log('total', total, this.totalChange.total)
              if (total > this.totalChange.total) {
                this.$message({
                  message: '大于总价格',
                  type: 'warning'
                });
              } else {
                this.totalChange.other = this.totalChange.total - (Number(this.totalChange.zyzh) + Number(this.totalChange.cash))
                this.quotation[i].cash = Number(this.totalChange.cash)  // Number(this.totalChange.cash).toFixed(2)
                this.quotation[i].zyzh = Number(this.totalChange.zyzh)  // Number(this.totalChange.zyzh).toFixed(2)
                this.quotation[i].other = Number(this.totalChange.other) // Number(this.totalChange.other).toFixed(2)
                this.quotation[i].remark = this.totalChange.remark
                this.computeTotal()
                this.hideBox()
              }
              break
            }
          }
        }
      },
      // 隐藏弹出框
      hideBox() {
        this.$message({
          message: '修改成功',
          type: 'success'
        });
        this.changeBill = false;
        this.changeMake = false;
        this.changeAD = false;
      },
      // step3 creatTab
      creatTab() {
        let quotationArr = []
        for (let i = 0; i < this.city.length; i++) {
          let quotationObj = {
            city: this.city[i].rName,
            rid: this.city[i].rid,
            schedules: '',                // 排期
            SM: '',                        // 排期面数
            GMDate: 0,                   // 赠送面.天
            discount: '100%',           // 广告费折扣
            advertyPrice: 0,             // 广告费
            ADNumber: 0,                 // 广告画数量
            makeDiscount: '100%',      // 制作费折扣
            MPrice: 100.00,                // 制作费单价
            reaPrice: 0,                // 广告费每次修改前的价格
            oldPrice: 0,                 //  广告费初始价格
            MReaPrice: 0,              // 制作费原价
            makePrice: 0,              // 制作费
            ADPrice: 0,                // 刊例价(面/周)
            tfl: 0,                    //投放量
            cash: 0,                  // 现金结算
            zyzh: 0,                  // 资源置换
            other: 0,                 // 其他费用
            total: 0,
            remark: '',
          }
          quotationArr.push(quotationObj)
          if (i >= this.city.length - 1) {
            this.quotation = quotationArr
          }
          // 从购物车列表获取排期及同一排期下的面数
          let shopingArr = this.shopingList
          for (let j = 0; j < this.shopingList.length; j++) {
            let shoping = this.shopingList[j]
            // console.log('从购物车列表获取排期',shoping.schedules)
            for (let t = 0; t < this.quotation.length; t++) {
              if (shoping.city === this.quotation[t].city) {
                if (this.quotation[t].schedules.indexOf(shoping.schedules) === -1) {
                  // console.log('增加排期',shoping.schedules)
                  if (this.quotation[t].schedules == '' || this.quotation[t].schedules == null) {
                    this.quotation[t].schedules = shoping.schedules
                  } else {
                    this.quotation[t].schedules = this.quotation[t].schedules + '、' + shoping.schedules
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
        let cityList = []
        for (let i = 0; i < this.shopingList.length; i++) {
          let list = this.shopingList[i]
          if (i === 0) {
            cityList.push(list.city)
          } else {
            let cityName = cityList.join('')
            // console.log('wwwwwwwwwwwwwwww',cityName)
            if (cityName.indexOf(list.city) === -1) {
              cityList.push(list.city)
            }
          }
          if (i >= this.shopingList.length - 1) {
            // console.log('购物车城市列表', cityList)
            this.shopListCity = cityList
            this.getPM_numByCityList()
          }
        }
      },
      // 根据购物车列表城市获取不同排期的所有面数
      getPM_numByCityList() {
        this.CSMList = []
        for (let i = 0; i < this.shopListCity.length; i++) {
          for (let t = 0; t < this.quotation.length; t++) {
            if (this.shopListCity[i] === this.quotation[t].city) { // 购物车中对应城市的不同排期的所有面数
              let q_schedulesArr = this.quotation[t].schedules.split('、')
              for (let t = 0; t < q_schedulesArr.length; t++) {
                let csm_obj = {
                  city: this.shopListCity[i],
                  schedules: q_schedulesArr[t],
                  mNum: ''
                }
                for (let j = 0; j < this.shopingList.length; j++) {
                  let list = this.shopingList[j]
                  if (list.schedules == q_schedulesArr[t] && this.shopListCity[i] === list.city) {
                    csm_obj.mNum++
                  }
                  if (j >= this.shopingList.length - 1) {
                    // console.log('获取不同排期的所有面数', csm_obj)
                    this.CSMList.push(csm_obj)
                  }
                }
              }
            }
          }
        }
        console.log('城市不同排期的所有面数', this.CSMList)
        for (let m = 0; m < this.quotation.length; m++) {
          let SM = ''
          for (let n = 0; n < this.CSMList.length; n++){
            if (this.CSMList[n].city === this.quotation[m].city){
              if( SM === '' || SM === null || SM === undefined){
                SM = this.CSMList[n].schedules +'('+this.CSMList[n].mNum + '面)'
              }else{
                SM += this.CSMList[n].schedules +'('+this.CSMList[n].mNum + '面)'
              }
            }
          }
          this.quotation[m].SM = SM
        }
        // console.log('getPM_numByCityList排期信息',this.quotation)
      },
      // step3 报价单
      quotationFun() {
        let uid = this.sessionData.uID
        api.getApi('/GetAdPrice', {uid: uid}).then(res => {
          // console.log('刊例价信息', res)
          let ADPriceList = res.data
          // console.log('投放城市信息', this.planForm.throwCity)
          // let throwCityList = this.planForm.throwCity
          let quotation = this.quotation
          for (let i = 0; i < ADPriceList.length; i++) {    // 报价单过滤
            for (let j = 0; j < quotation.length; j++) {    // 投放城市过滤
              let quotationObj = quotation[j]
              for (let g = 0; g < this.shopListCity.length; g++) {          // 购物车里有的城市（选中点对应的城市）
                if (ADPriceList[i].rID == quotationObj.rid && this.shopListCity[g] === quotationObj.city) {
                  // alert(ADPriceList[i].adPrice)
                  let mDate = 0
                  let mNUm = 0
                  let csm_arr = this.CSMList
                  for (let t = 0; t < csm_arr.length; t++) {
                    if (csm_arr[t].city === quotationObj.city) {
                      let begin = csm_arr[t].schedules.split('-')[0]
                      let end = csm_arr[t].schedules.split('-')[1]
                      // console.log('begin', begin, ',end', end)
                      let schedul = this.DateDiff(begin, end) + 1
                      // console.log('schedul', schedul)
                      mDate += schedul * csm_arr[t].mNum
                      mNUm += csm_arr[t].mNum
                    }
                  }
                  // console.log('天数mDate', mDate, ',面数mNUm', mNUm)
                  // console.log(ADPriceList[i].rName, '广告门价格为', ADPriceList[i].adPrice)
                  // 广告费计算
                  quotationObj.ADPrice = (ADPriceList[i].adPrice / (100 * 2)) //(ADPriceList[i].adPrice / (100 * 2)).toFixed(2)                     // 刊例价(面/周)
                  // console.log('刊例价(面/周)', quotationObj.ADPrice)
                  quotationObj.tfl = mDate   //this.badgeNumber * 14                                         // 投放量(面·天)
                  // console.log('(quotationObj.tfl * (quotationObj.ADPrice / 7))', (quotationObj.tfl * (quotationObj.ADPrice / 7)))
                  quotationObj.reaPrice = (quotationObj.tfl * (quotationObj.ADPrice / 7))//(quotationObj.tfl * (quotationObj.ADPrice / 7)).toFixed(2)        // 广告费总价
                  // console.log(quotationObj, 'quotationObj.reaPrice', quotationObj.reaPrice)
                  quotationObj.oldPrice = quotationObj.reaPrice               // 保存最初计算的价格

                  quotationObj.advertyPrice = quotationObj.reaPrice
                  // console.log('广告费总价', quotationObj.advertyPrice)
                  quotationObj.discount = Math.round(quotationObj.advertyPrice / quotationObj.reaPrice * 10000) / 100.00 + "%" // 广告费折扣百分比

                  // 制作费计算
                  quotationObj.ADNumber = mNUm //this.badgeNumber                                           // 广告画数量
                  quotationObj.makePrice = (quotationObj.ADNumber * quotationObj.MPrice)//(quotationObj.ADNumber * quotationObj.MPrice).toFixed(2)       // 制作费 = 广告画数量 * 制作费单价
                  quotationObj.MReaPrice = quotationObj.makePrice
                  quotationObj.makeDiscount = Math.round(quotationObj.makePrice / quotationObj.MReaPrice * 10000) / 100.00 + "%" // 制作费折扣百分比

                  quotationObj.total = (Number(quotationObj.advertyPrice) + Number(quotationObj.makePrice))//(Number(quotationObj.advertyPrice) + Number(quotationObj.makePrice)).toFixed(2)
                  quotationObj.cash = quotationObj.total
                  // 计算总价格
                  this.computeTotal()
                  this.computeAuotation.close()   // 计算完成关闭loading
                }
              }
            }
          }
        })
        for (let n = 0; n < this.companyName.length; n++) {
          if (this.companyName[n].value === this.planForm.companyName) {
            this.cName = this.companyName[n].label
          }
        }
        this.getBand()    // 获取品牌
      },
      //计算总价格
      computeTotal() {
        this.totalPrice = 0
        this.cash = 0
        this.other = 0
        this.zyzh = 0
        for (let i = 0; i < this.quotation.length; i++) {
          this.totalPrice += this.quotation[i].total
          this.cash = (Number(this.cash) + Number(this.quotation[i].cash))//(Number(this.cash) + Number(this.quotation[i].cash)).toFixed(2) //cash
          this.other = (Number(this.other) + Number(this.quotation[i].other))//(Number(this.other) + Number(this.quotation[i].other)).toFixed(2)
          this.zyzh = (Number(this.zyzh) + Number(this.quotation[i].zyzh))//(Number(this.zyzh) +  Number(this.quotation[i].zyzh)).toFixed(2)
        }
        if (this.other == 0 && this.zyzh == 0) {
          this.totalPrice = this.cash
        }
      },
      // dialog购物筐的显示全选中后添加都购物车
      dialogVisible() {
        this.dialogTableVisible = true
        this.computeMedia_AD()
      },
      // 添加到购物车
      AddShopingInfo(info, letter) {
        //  alert('1')
        console.log('选中的row信息', info)
        let selectInfo = {
          rid: info.rid,
          mID: info.mID,
          asIDs: info.asIDs,
          asLabs: info.asLabs,
          recName: info.recName,
          city: info.city,
          origin: info.origin,
          buildType: info.buildType,
          houseNum: info.houseNum,
          buildPrice: info.buildPrice,
          mediaName: info.mediaName,
          buildNum: info.buildNum,
          schedules: info.schedules,
          businessOrigin: info.businessOrigin,
          assetID: info.assetID,
          liveYear: info.liveYear,
          adLimit: info.adLimit,
          checkBox: {A: info.checkBox.A, B: info.checkBox.B},
        }
        let asLabsArr = selectInfo.asLabs.split(',')
        let asIDArr = selectInfo.asIDs.split(',')
        // console.log(letter)
        if (letter == 'B') {
          //  alert('B')
          for (let n = 0; n < asLabsArr.length; n++) {
            if (asLabsArr[n] === 'B') {
              // console.log('B', asIDArr[n])
              selectInfo.asIDs = asIDArr[n]
              // break
            }
          }
          selectInfo.A_B = 'B面'
          this.shopingList.push(selectInfo)
        } else {
          if (info.checkBox.B && letter !== 'A') {
            for (let n = 0; n < asLabsArr.length; n++) {
              if (asLabsArr[n] === 'B') {
                // console.log('B', asIDArr[n])
                selectInfo.asIDs = asIDArr[n]
                // break
              }
            }
            selectInfo.A_B = 'B面'
          } else {
            for (let n = 0; n < asLabsArr.length; n++) {
              if (asLabsArr[n] === 'A') {
                // console.log('A', asIDArr[n])
                selectInfo.asIDs = asIDArr[n]
                // break
              }
            }
            selectInfo.A_B = 'A面'
          }
          this.shopingList.push(selectInfo)
        }
      },
      // 购物车删除行
      deleteRow(rows) {
        let deleteIf = false
        //  console.log('购物车列表：',list)
        console.log('购物车删除行', rows)
        console.log('删除行id', rows.mID)
        if (rows.city === this.planList[0].city) {    //判断删除的城市选点是否是当前选点列表的城市
          for (let i = 0; i < this.planList.length; i++) {
            if (rows.mID === this.planList[i].mID) {
              console.log('相等的mID', rows.mID)
              if (rows.A_B === 'A面') {
                this.planList[i].checkBox.A = false
                console.log('取消行的 this.planList', this.planList[i])
                if (!this.planList[i].checkBox.B) {
                  //  alert('1')
                  this.$refs.multipleTable.toggleRowSelection(this.planList[i], false)
                }
                console.log('相等的mID的checkBox.A', this.planList[i].checkBox.A)
                // 删除
                for (let j = 0; j < this.shopingList.length;) {
                  if (this.shopingList[j].mID === rows.mID && this.shopingList[j].A_B == 'A面' && this.shopingList[j].schedules === rows.schedules) {
                    this.shopingList.splice(j, 1)
                    deleteIf = true
                    this.badgeNumber--
                    // break
                  } else {
                    j++
                  }
                }
              } else if (rows.A_B === 'B面') {
                this.planList[i].checkBox.B = false
                if (!this.planList[i].checkBox.A) {
                  //  alert('2')
                  this.$refs.multipleTable.toggleRowSelection(this.planList[i], false)
                }
                // 删除
                for (let j = 0; j < this.shopingList.length;) {
                  if (this.shopingList[j].mID === rows.mID && this.shopingList[j].A_B == 'B面' && this.shopingList[j].schedules === rows.schedules) {
                    deleteIf = true
                    this.shopingList.splice(j, 1)
                    this.badgeNumber--
                    // break
                  } else {
                    j++
                  }
                }
              }
              break
            }else{

            }
          }
        } else {
          console.log('不相同')
          this.delereRowByTotal(rows)
        }
        if(!deleteIf){
          console.log('deleteIf',deleteIf)
          for (let j = 0; j < this.shopingList.length;) {
            if (this.shopingList[j].mID === rows.mID && this.shopingList[j].A_B == rows.A_B && this.shopingList[j].schedules === rows.schedules) {
              this.shopingList.splice(j, 1)
              this.badgeNumber--
              // break
            } else {
              j++
            }
          }
        }
        this.computeMedia_AD() // 统计购物车媒体数、面数
      },
      // 当在购物车删除项不在当前选点列表（城市不同）时，去totalPlanList查找
      delereRowByTotal(rows) {
        let deleteIf = false
        let totalList = this.totalPlanList
        console.log('totalPlanList查找', totalList)
        for (let i = 0; i < totalList.length; i++) {
          if (totalList[i].list[0].city === rows.city) {
            deleteIf = true
            console.log('找到城市:', rows.city)
            let childrenList = totalList[i].list
            for (let j = 0; j < childrenList.length; j++) {
              if (rows.mID === childrenList[j].mID) {
                console.log('找到mID', rows.mID)
                if (rows.A_B == 'A面') {
                  childrenList[j].checkBox.A = false
                  console.log('删除行的 childrenList', childrenList[j])
                  console.log('相等的mID的checkBox.A', childrenList[j].checkBox.A)
                  // 删除
                  for (let t = 0; t < this.shopingList.length; t++) {
                    if (this.shopingList[t].mID === rows.mID && this.shopingList[t].A_B == 'A面' && this.shopingList[t].schedules === rows.schedules) {
                      this.shopingList.splice(t, 1)
                      this.badgeNumber--
                      break
                    }
                  }
                } else if (rows.A_B == 'B面') {
                  childrenList[j].checkBox.B = false
                  // 删除
                  for (let t = 0; t < this.shopingList.length; t++) {
                    if (this.shopingList[t].mID === rows.mID && this.shopingList[t].A_B == 'B面' && this.shopingList[t].schedules === rows.schedules) {
                      this.shopingList.splice(t, 1)
                      this.badgeNumber--
                      break
                    }
                  }
                }
                break
              }
            }
            break
          }
        }
        if(!deleteIf){
          console.log('deleteIf',deleteIf)
          for (let j = 0; j < this.shopingList.length;) {
            if (this.shopingList[j].mID === rows.mID && this.shopingList[j].A_B == rows.A_B && this.shopingList[j].schedules === rows.schedules) {
              this.shopingList.splice(j, 1)
              this.badgeNumber--
              // break
            } else {
              j++
            }
          }
        }
      },
      // 取消勾时,删除购物车里对应的数据行
      deleteShopRow(row, letter) {
        if (letter === 'all') {     // 判断是否全选
          for (let i = 0; i < this.planList.length; i++) {
            let info = this.planList[i]
            for (let j = 0; j < 2; j++) {
              let selectInfo = {
                rid: info.rid,
                mID: info.mID,
                asIDs: info.asIDs,
                asLabs: info.asLabs,
                recName: info.recName,
                city: info.city,
                origin: info.origin,
                buildType: info.buildType,
                houseNum: info.houseNum,
                buildPrice: info.buildPrice,
                mediaName: info.mediaName,
                buildNum: info.buildNum,
                schedules: info.schedules,
                businessOrigin: info.businessOrigin,
                assetID: info.assetID,
                liveYear: info.liveYear,
                adLimit: info.adLimit,
                checkBox: {A: info.checkBox.A, B: info.checkBox.B},
                box: {A: info.box.A, B: info.box.B}
              }
              let asLabsArr = selectInfo.asLabs.split(',')
              let asIDArr = selectInfo.asIDs.split(',')
              if (j === 0 && !selectInfo.box.A) {
                //  alert('B')
                selectInfo.A_B = 'A面'
                for (let n = 0; n < asLabsArr.length; n++) {
                  if (asLabsArr[n] === 'A') {
                    // console.log('A', asIDArr[n])
                    selectInfo.asIDs = asIDArr[n]
                    // break
                  }
                }
                this.shopingList.push(selectInfo)
              } else if (j === 1 && !selectInfo.box.B) {
                selectInfo.A_B = 'B面'
                for (let n = 0; n < asLabsArr.length; n++) {
                  if (asLabsArr[n] === 'B') {
                    // console.log('B', asIDArr[n])
                    selectInfo.asIDs = asIDArr[n]
                    // break
                  }
                }
                this.shopingList.push(selectInfo)
              }
            }
          }
          // }
          // console.log('全选是this.shopingList', this.shopingList)
        } else {
          for (let i = 0; i < this.planList.length; i++) {
            if (row.mID === this.planList[i].mID) {
              // console.log('相等的mID', row.mID)
              if (letter === 'B') {
                for (let j = 0; j < this.shopingList.length; j++) {
                  if (this.shopingList[j].mID === row.mID && this.shopingList[j].A_B === 'B面' && this.shopingList[j].schedules === row.schedules) {
                    this.shopingList.splice(j, 1)
                    break
                  }
                }
              } else if (letter === 'A') {
                for (let j = 0; j < this.shopingList.length; j++) {
                  if (this.shopingList[j].mID === row.mID && this.shopingList[j].A_B === 'A面' && this.shopingList[j].schedules === row.schedules) {
                    this.shopingList.splice(j, 1)
                    break
                  }
                }
              } else if (letter === 'AB') {
                // console.log('this.shopingList', this.shopingList)
                for (let j = 0; j < this.shopingList.length;) {
                  if (this.shopingList[j].mID === row.mID && this.shopingList[j].schedules === row.schedules) {
                    // alert('2')
                    this.shopingList.splice(j, 1)
                    //  break
                  }else{
                    j++
                  }
                }
              }
              break
            }
          }
        }
      },
      //修改动画效果及显示隐藏
      shopShow_hide(all) {
        let R = this.shopXY.x
        let T = this.shopXY.y
        // console.log('Right:', R, ',Top:', T)
        let shopAnimate = document.getElementsByClassName('shopAnimate')[0]
        let animateAll = document.getElementsByClassName('shopAnimateAll')[0]

        shopAnimate.style.top = this.shopXY.y + 'px'
        shopAnimate.style.right = this.shopXY.x + 'px'

        animateAll.style.top = this.shopXY.y + 'px'
        animateAll.style.right = (this.shopXY.x - 140) + 'px'
        let that = this
        if (all === 'all') {
          this.selectAll = true
          $(".shopAnimateAll").animate({right: '37px', top: '77px', width: '18px', height: '18px'}, 700, function () {
            $(".shopAnimateAll").css({'top': T, 'right': R, width: '790px', height: '386px'})
            that.selectAll = false
            that.getBadeNumberByShopList()
          })
        } else {
          this.shoppingShow = true
          $(".shopAnimate").animate({right: '37px', top: '77px', width: '18px', height: '18px'}, 700, function () {
            $(".shopAnimate").css({'top': T, 'right': R, width: '650px', height: '49px'})
            that.shoppingShow = false
            that.badgeNumber++
          })
        }
      },
      // 根据购物车列表的行数确定badgeNumber  shopingList
      getBadeNumberByShopList() {
        this.badgeNumber = this.shopingList.length
      },
      //step2搜索按钮
      searchFun() {
        this.areaName = '全市'
        this.recType = 1
        this.getAdList('search')
      //  this.GetAdLaunchFun('search') // 根据时间段获取被占点位，并重组选点列表
        // this.ResOriginSearch()
      },
      //计算天数差的函数，通用
      DateDiff(sDate1, sDate2) {    //sDate1和sDate2是2002.12.18格式
        let aDate, oDate1, oDate2, iDays
        aDate = sDate1.split(".")
        oDate1 = new Date(aDate[1] + '/' + aDate[2] + '/' + aDate[0])    //转换为12-18-2002格式
        aDate = sDate2.split(".")
        oDate2 = new Date(aDate[1] + '/' + aDate[2] + '/' + aDate[0])
        iDays = Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24
        return iDays
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
      // 资源名称\商圈搜索typeSelect
      ResOriginSearch() {
        this.loading = true
        this.loadScroll = false
        let empty = false
        let arr = []
        let index = this.activeIndex
        console.log(index, ',beforPlanList', this.beforADTotalList)
        let BPL = this.beforADTotalList[index].list
        for (let i = 0; i < BPL.length; i++) {
          if (this.selectValue === '资源名称') {
            if (this.searchInput === '') {
              arr = this.copyPlanList
              empty = true
            } else if (BPL[i].resName.includes(this.searchInput)) {
              // console.log('资源名称不为空')
              arr.push(BPL[i])
            }
          } else if (this.selectValue === '商圈') {
            if (this.searchInput === '') {
              arr = this.copyPlanList
              empty = true
            } else if (BPL[i].tradingArea.includes(this.searchInput)) {
              // console.log('商圈不为空')
              arr.push(BPL[i])
            }
          }
        }
        if (!empty) {
          this.firstLevelSearch = true
          let planArr = []
          let rName = this.activeCityData.rName //this.activeRName
          // let ADLaunch = this.AdLaunchList[index].list
          for (let n = 0; n < arr.length; n++) {
            let adObj = {
              rid: 0 + n.toString(),
              mID: arr[n].mID,
              asIDs: arr[n].asIDs,
              asLabs: arr[n].asLabs,
              recName: arr[n].resName,
              city: rName, //'广州',
              origin: arr[n].rName,
              buildType: arr[n].cType,
              houseNum: arr[n].hNum,
              buildPrice: (arr[n].hPrice / 100),
              mediaName: arr[n].mTitle,
              buildNum: arr[n].fNum,
              schedules: this.dateInput[0] + '-' + this.dateInput[1],
              businessOrigin: arr[n].tradingArea,
              assetID: arr[n].assetTag,
              liveYear: arr[n].chDay,
              adLimit: arr[n].notPush,
              checkBox: {A: false, B: false},
              box: {A: false, B: false},
            }
            if (arr[n].asLabs.indexOf('A') === -1) {
              adObj.box.A = true
            }
            if (arr[n].asLabs.indexOf('B') === -1) {
              adObj.box.B = true
            }
            planArr.push(adObj)
            if (n >= arr.length - 1) {
              // console.log('搜索过滤完成后的planArr', planArr)
              this.planList = planArr
              this.judgeByselect('firstLevel')
            }
          }
        } else {
          this.planList = arr
        }
        this.loading = false
      },
      emptyFun(letter) {       // 清空
        if (letter === 'H') {
          this.houseNum = ['', '']
        } else if (letter === 'B') {
          this.buildNum = ['', '']
        } else if (letter === 'P') {
          this.buildPrice = ['', '']
        } else if (letter === 'Y') {
          this.liveYear = ['', '']
        }
      },
      // 搜索楼盘类型
      searchBT(val) {
        let planList = []
        let arr = []
        planList = this.copyPlanList
        for (let i = 0; i < planList.length; i++) { //buildType
          if (val === '全部') {
            arr = planList
          } else {
            if (val === planList[i].buildType) {
              arr.push(planList[i])
            }
          }
        }
        this.planList = arr
      },
      // 清空购物车
      clearShop() {
        this.shopingList = []
        this.getBadeNumberByShopList()
        this.computeMedia_AD()
        let cityData = this.activeCityData
        console.log('cityData.rid', cityData.rid, ',this.totalPlanList', this.totalPlanList)
        let that = this
        for (let i = 0; i < that.totalPlanList.length; i++) {
          setTimeout(function () {
            for (let j = 0; j < that.totalPlanList[i].list.length; j++) {
              that.totalPlanList[i].list[j].checkBox.A = false
              that.totalPlanList[i].list[j].checkBox.B = false
            }
            if (that.totalPlanList[i].rid === cityData.rid) {
              that.planList = that.totalPlanList[i].list
              for (let n = 0; n < that.planList.length; n++) {
                that.$refs.multipleTable.toggleRowSelection(that.planList[n], false)
              }
              console.log('this.planList', that.planList)
            }
          }, 10)
        }
      },
      // 统计购物车媒体数、面数
      computeMedia_AD() {
        let shopList = this.shopingList
        console.log('购物车统计面数媒体数shopList', shopList)
        let mediaArr = []
        let mediaAD = []
        for (let i = 0; i < shopList.length; i++) {
          if (mediaArr.indexOf(shopList[i].mID) === -1) {
            mediaArr.push(shopList[i].mID)
          } else {
            // console.log('重复的asIDs是', shopList[i].mID)
          }
          if (mediaAD.indexOf(shopList[i].asIDs) === -1) {
            mediaAD.push(shopList[i].asIDs)
          } else {
            // console.log('重复的asIDs是', shopList[i].asIDs)
          }
        }
        // console.log('mediaArr', mediaArr)
        // console.log('mediaAD', mediaAD)
        this.shopMedia_ADNum.mediaNum = mediaArr.length
        this.shopMedia_ADNum.ADNum = mediaAD.length
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
            this.cBand = this.companyBrand[n].label
          }
        }
      },
      clearData() {
        Object.assign(this.$data, this.$options.data()) // vue data恢复初始化数据
      },
      // 时间格式规范
      formatTime(val) {
        return dateFormat.toDate(val, ".");
      },
      //取消编辑返回列表
      goBack() {
        this.$router.go(-1)
      },
      //根据编辑方案的apid获取选点排期
      getSetPoint() {
        // 真实数据
        let uid = this.sessionData.uID
        let apid = sessionStorage.getItem("plan_apid");
        let info = {uid: uid, apid: apid}
        // let info = {uid: 3, apid: 77}
        api.getApi("/GetADB", info).then(res => {
            console.log('选点排期数据', res.data);
            if (!res.data.SysCode) {
              let resInfo = res.data;
              let shopList = []
              for (let data of resInfo) {
                this.$set(data, "city", areaArrToText.toTextCity(data.rID));
                let time = this.formatTime(data.pbStar) + "-" + this.formatTime(data.pbEnd);
                this.$set(data, "schedules", time);//.A_B
                let checkBox = {A: false, B: false}
                if(data.asLab === 'A'){
                  // console.log('A')
                  this.$set(data, "A_B", 'A面')
                  checkBox.A = true
                }else if(data.asLab === 'B'){
                  // console.log('B')
                  this.$set(data, "A_B", 'B面')
                  checkBox.B = true
                }
                let selectInfo = {
                  rid: data.rID,
                  mID: data.mID,
                  asIDs: data.asID,
                  asLabs: data.asLab,
                  recName: data.resName,
                  city: data.city,
                  origin: data.rName,
                  buildType: data.cType,
                  houseNum: data.hNum,
                  buildPrice: data.hPrice,
                  mediaName: data.mTitle,
                  buildNum: data.fNum,
                  schedules: data.schedules,
                  businessOrigin: data.tradingArea,
                  assetID: data.assetTag,
                  liveYear: data.chDay,
                  adLimit: data.adLimit,
                  A_B:data.A_B,
                 checkBox: {A: checkBox.A, B: checkBox.B},
                }
                shopList.push(selectInfo)
              }
             /* // 城市筛选过滤
              this.filterCityData = filterFormat(resInfo, "city")
              this.filtersArea = filterFormat(resInfo, "origin")
              this.filtersData = filterFormat(resInfo, "schedules")*/
              this.checkLock(shopList)
              console.log('购物车列表数据', this.shopingList)
            } else {
              Message.warning(res.data.MSG)
            }
          })
          .catch(res => {
            console.log(res);
          });
      },
      // 根据编辑方案的apid获取该方案的详情
      FanganInfoByApid(){
        let uid = this.sessionData.uID
        let apid = sessionStorage.getItem("plan_apid");
        let info = {uid: uid, apid: apid}
        api.getApi("/GetFanganInfo", info).then(res=>{
          console.log('方案详情', res.data);
          if (!res.data.SysCode) {
            this.FAInfo = res.data
            this.planName = this.FAInfo.apName
            this.cName = this.FAInfo.cName
            this.cBand = this.FAInfo.bTitle
            this.setCityAndArea(this.FAInfo.rIDs)
          }else{
            Message.warning(res.data.MSG);
          }
        })
      },
      // 根据方案详情的rIDs，例如: "广州市,深圳市",构建城市区域
      setCityAndArea(citys){
        let cityArr = citys.split(',')
        console.log('城市数组',cityArr)
        let cityList = []
        for(let i=0;i<cityArr.length;i++){
          let CityRid = areaArr.TextToCode(cityArr[i])
          let cityObj = {rName: cityArr[i], rid: CityRid}
          cityList.push(cityObj)
        }
        this.city = cityList
        this.activeCityData = this.city[0]
        console.log('构建城市',this.city)
        let areaList = []
        for(let j=0;j<cityList.length;j++){
          let area_Arr = areaArr.findArea(cityList[j].rid)
          area_Arr.unshift({rid:cityList[j].rid,rName:'全市'})
          areaList.push(area_Arr)
        }
        this.area = areaList
        console.log('构建城市区域',this.area )
        this.getAdList()
        this.cityOptions = areaArr.province()
      },
      // 当前行是否高亮
      tableRowClassName({ row }) {
          if (row.lState) {
              return "warning-row";
          } else {
              return "";
          }
      },
    //   // 添加是否被占的状态
    //   checkLock(tableData) {
    //       // CheckADS
    //       // uid         int【必填】         当前账户UserID
    //       // asid        int【必填】         投放广告点位状态查询
    //       let uid = this.sessionData.uID;
    //       for (let i = 0; i < tableData.length; i++) {
    //           tableData[i].lState = 0;
    //           this.$set(tableData[i], "lState", 0);
    //           api.getApi("/CheckADS", { uid: uid, asid: tableData[i].asIDs })
    //               .then(res => {
    //                   console.log('CheckADS',res.data);
    //                   if (res.data.length) {
    //                       this.$set(tableData[i], "lState", 1);
    //                   }
    //                   if (i >= tableData.length - 1) {
    //                       console.log("tableData------------", tableData);
    //                       this.shopingList = tableData;
    //                       this.shopLoading = false
    //                       this.computeMedia_AD()            // 统计购物车媒体数和面数
    //                       this.getBadeNumberByShopList()
    //                       this.FanganInfoByApid()           //获取方案详情
    //                   }
    //                   console.log();
    //               })
    //               .catch(res => {
    //                   console.log(res);
    //               });
    //       }
    //   },
      // 添加是否被占的状态
      checkLock(tableData) {
		  // uid         int【必填】         当前账户UserID
		  // ds          String【必填】      广告开始投放日期
		  // de          String【必填】      广告投放结束日期
		  // asidlist    String【必填】      选择的广告点位asID组合，以","逗号组合
			let resultArr = this.constructData(tableData);
			let holdArr = [];
			for(let i = 0; i< resultArr.length; i++){
				api.postApi('/CheckPD', resultArr[i]).then(res =>{
					console.log(res.data);
					if(res.data.length){
						holdArr.push(res.data);
					}
					if(i>resultArr.length-1){
						let hightArr = [];
						let lowArr = [];
						for(let tab of tableData){
							this.$set(tab, "lState", 0);
							for(let data of holdArr){
								if(data.asID == tab.asID){
									this.$set(tab, "lState", 1);
									break;
								}
							}
							if(tab.lState){
								hightArr.push(tab);
							}else{
								lowArr.push(tab);
							}
						}
						tableData = hightArr.concat(lowArr);
						console.log("tableData------------", tableData);

						this.shopingList = tableData;
						this.shopLoading = false
						this.computeMedia_AD()            // 统计购物车媒体数和面数
						this.getBadeNumberByShopList()
						this.FanganInfoByApid()           //获取方案详情
					}
				});
			}
        //   // CheckADS
        //   // uid         int【必填】         当前账户UserID
        //   // asid        int【必填】         投放广告点位状态查询
        //   let uid = this.sessionData.uID;
        //   for (let i = 0; i < tableData.length; i++) {
        //       tableData[i].lState = 0;
        //       this.$set(tableData[i], "lState", 0);
        //       api.getApi("/CheckADS", { uid: uid, asid: tableData[i].asIDs })
        //           .then(res => {
        //               console.log('CheckADS',res.data);
        //               if (res.data.length) {
        //                   this.$set(tableData[i], "lState", 1);
        //               }
        //               if (i >= tableData.length - 1) {
        //                   console.log("tableData------------", tableData);
        //                   this.shopingList = tableData;
        //                   this.shopLoading = false
        //                   this.computeMedia_AD()            // 统计购物车媒体数和面数
        //                   this.getBadeNumberByShopList()
        //                   this.FanganInfoByApid()           //获取方案详情
        //               }
        //               console.log();
        //           })
        //           .catch(res => {
        //               console.log(res);
        //           });
        //   }
	  },
	  constructData(tableData){
		  // uid         int【必填】         当前账户UserID
		  // ds          String【必填】      广告开始投放日期
		  // de          String【必填】      广告投放结束日期
		  // asidlist    String【必填】      选择的广告点位asID组合，以","逗号组合
		  let resultArr = [];
			if(!resultArr.length){
				let start = this.formatTime(tableData[0].pbStar);
				let end = this.formatTime(tableData[0].pbEnd);
				let obj = {
					uid : this.sessionData.uID,
					ds : start,
					de: end,
					asidlist: ''
				};
				resultArr.push(obj);
			}
			for(let res of resultArr){
				let asIDs = '';
				for(let data of tableData){
					let start = this.formatTime(data.pbStar);
					let end = this.formatTime(data.pbEnd);
					let resobj = {
						uid : this.sessionData.uID,
						ds : start,
						de: end,
						asidlist: ''
					};
					if(res.ds == start && res.de == end){
						if(asIDs ==''){
							asIDs = data.asID;
						}else{
							asIDs = asIDs + ','+ data.asID;
						}
					}else{
						let door = 1;
						for(let init  of  resultArr){
							if(init.ds == start && init.de == end){
								door = 0;
							}
						}
						if(door){
							resultArr.push(resobj);
						}
					}
				}
			}
			return resultArr;
	  },
      // 购物车删除被占点位
      shopDeleteRow(shopSow){
        for (let j = 0; j < this.shopingList.length;) {
          if (this.shopingList[j].mID === shopSow.mID && this.shopingList[j].A_B === shopSow.A_B  && this.shopingList[j].schedules === shopSow.schedules) {
            this.shopingList.splice(j, 1)
            this.badgeNumber--
            // break
          } else {
            j++
          }
        }
        this.computeMedia_AD()
      },
      shopingBeforeClose(){
        for (let j = 0; j < this.shopingList.length;j++) {
          if(this.shopingList[j].lState){
            Message.warning('请先删除完被占点位再进行其它操作');
            break;
          }
          if(j >= this.shopingList.length - 1){
            console.log('退出购物车')
            this.dialogTableVisible = !this.dialogTableVisible
            this.judgeByselect()    // 勾选已经选择的A、B面
          }
        }
        if(this.shopingList.length === 0){
          this.dialogTableVisible = !this.dialogTableVisible
        }
        this.computeMedia_AD()
      },
      // 编辑成功后查看方案
      ToDetail() {
        this.$router.push("./planDetail");
      },
    }
  }
</script>

<style scoped>
  /*状态行*/
  /deep/ .el-table .warning-row {
    background: #fff1f1;
  }
  /*  .filter-input .input-wrap .showBtn{
      opacity: 1;
    }*/

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

  .shopAnimate, .shopAnimateAll {
    position: fixed;
    top: 574px;
    right: 170px;
    /*
      font-weight: bold;
      font-size: 18px;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      text-align: center;
      line-height: 18px;
      */
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
    margin-bottom: 145px;
    position: relative;
  }

  .mediaMana_content_top {
    padding: 42px 60px 0 60px;
  }

  .content_top_wrap, .content_bottom_wrap {
    background: #FFFFFF;
    border: 1px solid #DEDEDE;
    /*height: 830px;*/
    padding: 46px 18px 40px 18px;
  }

  .content_top_wrap .content_top_head {
    width: 100%;
    height: 35px;
    border-bottom: 1px solid #DEDEDE;
  }

  .content_bottom_wrap .content_bottom_head {
    width: 100%;
    height: 35px;
    border-bottom: 1px solid #DEDEDE;
  }

  .content_top_wrap .content_top_head h2, .content_bottom_wrap .content_bottom_head h2 {
    font-family: PingFangSC-Semibold;
    font-size: 16px;
    color: #2C313C;
    font-weight: bold;
    padding-left: 16px;
    height: 24px;

    margin-top: 8px;
  }

  .content_top_wrap .content_top_form_wrap, .content_bottom_wrap .content_bottom_form_wrap {
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
    background: #108EE9;
    border-radius: 4px;
    font-size: 14px;
    border: none;
    color: #ffffff;
  }

  .content_bottom_btn button.cancel {
    background: #ffffff;
    font-size: 14px;
    color: #666666;
    border: 1px solid #D9D9D9;
    border-radius: 4px;
    margin-left: 10px;
  }

  /*下一步按钮*/

  /deep/ .map.el-button--primary {
    background: #FF7721;
    border-color: #FF7721;
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
    right: 18px;;
  }

  /deep/ .el-step__icon-inner {
    font-weight: normal;
  }

  /deep/ .el-step__icon.is-text {
    width: 32px;
    height: 32px;
    border: 1px solid
  }

  /deep/ .is-process .el-step__icon.is-text {
    border: none;
    background-color: #108EE9;
    color: #fff;
  }

  /deep/ .el-step__head.is-success {
    color: #108EE9;
    border-color: #108EE9;
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

  .createPlan, .step4 {
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
  /deep/ .el-checkbox, .el-checkbox__input {

  }

  /deep/ .type-select .el-input, /deep/ .type-select .el-input__inner {
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

  .searchInput /deep/ .el-input__inner, .searchInput {
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

  /deep/ .plan-select .el-input, /deep/ .plan-select .el-input__inner {
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

  /deep/ .el-date-editor i, /deep/ .el-date-editor input, /deep/ .el-date-editor span {
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

  .searchBtn, .map {
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
  /deep/ .el-button--default:focus, .el-button--default:hover {
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
    border: 1px solid #C2C2C2;
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
    background: #108EE9;
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
    border: 1px solid #D8D8D8;
    margin-top: 30px;
    padding: 10px 18px 0 18px;
  }

  .dw-panel dl {
    border-bottom: 1px dashed #D8D8D8;
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

  /deep/ .buildType .el-input, /deep/ .buildType .el-input__inner {
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
    padding: 0 86px;
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



  /*/deep/ .el-table__row .td:nth-child(8),
  /deep/ .el-table__row .td:nth-child(9),
  /deep/ .has-gutter .th:nth-child(8),
  /deep/ .has-gutter .th:nth-child(9)
  {
    text-align: right;
  }*/

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

  /deep/ .el-dialog {
    width: 1000px;
  }

  /*购物车列表*/
  .car-title {
    margin-bottom: 10px;
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
    margin-left: 10px;
    cursor: pointer;
    color: #1890ff;
  }

  .car-del {
    text-align: center;
    cursor: pointer;
    color: #1890ff;
  }

  /deep/ .car-list .el-table__expanded-cell[class*=cell] {
    padding: 0 46px;
    background-color: #F7F7F7;;
  }


  .table_wrap /deep/ .has-gutter th:nth-child(8),
  .table_wrap /deep/ .has-gutter th:nth-child(9),
  .table_wrap /deep/ .el-table__row td:nth-child(8),
  .table_wrap /deep/ .el-table__row td:nth-child(9)
  {
    text-align: right;
  }

  .el-dialog /deep/ .has-gutter th:nth-child(7),
  .el-dialog /deep/ .has-gutter th:nth-child(8),
  .el-dialog /deep/ .el-table__row td:nth-child(7),
  .el-dialog /deep/ .el-table__row td:nth-child(8)
  {
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

  .bottom-fin button {
    background: #E6F1FC;
    border: 1px solid #A3D0FD;
    border-radius: 4px;
    font-size: 12px;
    color: #1989FA;
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

  /deep/ .step3 .el-input__inner, /deep/ .step3 .el-textarea__inner {
    width: 348px;
  }

  /*计数器*/
  /deep/ .el-input-number__decrease, /deep/ .el-input-number__increase {
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

  /deep/ .el-input-number.is-controls-right .el-input-number__decrease [class*=el-icon], .el-input-number.is-controls-right .el-input-number__increase [class*=el-icon] {
    position: relative;
    top: 2px;
  }

  /deep/ .el-input-number {
    width: 348px;
  }

  /deep/ .el-table th > .cell.highlight {
    color: #409EFF !important;
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
    border: 1px solid #D8D8D8;
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

  .planPanel, .successIcon {
    text-align: center;
  }

  .planPanel {
    width: 557px;
    height: 198px;
    background: #FAFAFA;
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
      border: 1px solid #C2C2C2;
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
      width: 7.0%;
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
      border: 1px solid #C2C2C2;
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
      width: 7.0%;
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
