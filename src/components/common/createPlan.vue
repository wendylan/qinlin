<template>
  <div class="ad_mediaMana_wrap">
    <div class="ad_mediaMana_nav clearfix">
      <p><a href="#">方案管理</a><em> / </em><a href="#">创建方案</a></p>
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
                <!--  <el-select v-model="planForm.ownerSales" placeholder="请选择所属销售">
                    <el-option
                      v-for="item in ownerSales"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>-->
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
                <el-select v-model="planForm.companyName" @change="GetBrandByCid" placeholder="请选择公司名称">
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
                    @close="handleClose1(tag)">
                    {{tag}}
                  </el-tag>
                  <el-cascader
                    style="width: 150px"
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
                <!-- <el-cascader
                   v-if="cityOther"
                   :options="cityOptions"
                   separator="-"
                   v-model="selectedOptions"
                   @change="handleChange">
                 </el-cascader>-->
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
                  <el-select v-model="value" placeholder="请选择" class="type-select">
                  <el-option v-for="item in typeSelect" :key="item.value" :label="item.value"
                             :value="item.value"></el-option>
                  </el-select>
                  <el-input v-model="searchInput" placeholder="请输入要搜索的内容"
                            class="searchInput input-with-select"></el-input>
                </span>
                <span>
                  <el-select v-model="planSelect" placeholder="选择投已有方案" class="plan-select input-with-select">
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
                     value-format="yyyy-MM-dd"
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
                <div class="shopcar" @click="dialogVisible()"><!--dialogTableVisible = true-->
                  <el-badge :value="badgeNumber" class="item">
                    <img src="../../assets/images/shopCar.png" alt="">
                    <!--<span class="cart_box">-->
                    <!--<i class="fa fa-shopping-cart fa-2x" style="margin-top:8px;"></i>-->
                    <!--</span>-->
                  </el-badge>
                </div>
              </div>
            </div>
            <!--类型区域选择面板-->
            <div class="dw-panel">
              <dl>
                <dt>资源类型：</dt>
                <dd class="active">社区</dd>
                <dd>写字楼</dd>
              </dl>
              <dl>
                <dt>媒体类型：</dt>
                <dd class="active">广告门</dd>
                <!-- <dd>电梯广告</dd>-->
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
              <!--<dl class="city-proper">
                <dd v-for="item of area[0]" :class="item.rName == '全市' ? 'active' : ''">{{item.rName}}</dd>
              </dl>-->
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
                    <input type="text" class="input"> - <input type="text" class="input">
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
                  <span style="float: left">楼盘类型:</span>
                  <el-select v-model="buildValue" placeholder="请选择" class="buildType" style="float: left;">
                    <el-option v-for="item in buildType" :key="item.buildValue" :label="item.buildValue"
                               :value="item.buildValue"></el-option>
                  </el-select>
                </li>
              </ul>
            </div>
            <!--表格-->
            <div class="table_wrap">
              <el-table
                ref="multipleTable"
                border
                :data="planList"
                :select-on-indeterminate="selectOnAll"
                :default-sort="{prop: 'recName', order: 'descending'}"
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
            <el-dialog title="已选点位" :visible.sync="dialogTableVisible">
              <template slot-scope="scope">
                <div class="table_wrap car-list" style="margin-top: 60px" :visible.sync="dialogTableVisible">
                  <div class="car-title">
                    <h4>已选1000个媒体 <p>投放2000面</p> <span>清空已选</span></h4>
                  </div>
                  <el-table
                    border
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
                    <el-table-column
                      label="资源名称"
                      width="120"
                      prop="recName"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="mediaName"
                      label="媒体名称"
                      width="130"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="city"
                      label="城市"
                      width="80"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="origin"
                      label="区域"
                      width="80"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="buildType"
                      label="楼盘类型"
                      width="80"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="houseNum"
                      label="小区户数"
                      width="80"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="buildPrice"
                      label="楼盘价格"
                      width="80"
                    >
                    </el-table-column>


                    <el-table-column
                      prop="schedules"
                      label="排期"
                      width="160"
                    >
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
                <h4>{{planForm.planName}}</h4>
                <p>{{cName}}</p>
                <p>珠江帝景</p>
              </div>
              <div class="bill-title-right">
                <ul>
                  <li><p><em>现金结算：</em><span>￥{{cash}}</span></p></li>
                  <li><p><em>资源置换：</em><span>￥{{zyzh}}</span></p></li>
                  <li><p><em>其他费用：</em><span>￥{{other}}</span></p></li>
                  <li><p><em style="top: 5px">总计：</em><span class="totalPrice">￥{{totalPrice}}</span></p></li>
                </ul>
              </div>
            </div>
            <div class="panel">
              <el-tabs type="border-card">
                <el-tab-pane v-for="(item,index) in quotation" :label=item.city :key=index :index=index>
                  <div class="tab-info">
                    <div class="pqxx">
                      <h4>排期信息</h4>
                      <p>{{ item.schedules }}</p>
                      <!--2018.03.01-2018.03.28（20面）、2018.04.01-2018.04.28（10面）、2018.05.01-2018.05.28（10面）-->
                    </div>
                    <div class="price">
                      <div class="price-left">
                        <h4>广告费
                          <el-button type="text" @click="changePrice('AD',item)">修改</el-button><!--changeAD = true-->
                        </h4>
                        <ul>
                          <li>刊例价(面/周) <span>￥{{item.ADPrice}}</span></li>
                          <li>投放量(面·天) <span>{{item.tfl}}</span></li>
                          <li>赠送(面·天) <span>{{item.GMDate}}</span></li>
                          <li>广告费折扣 <span>{{item.discount}}</span></li>
                          <li>￥{{item.advertyPrice}}</li>
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
                          <li>￥{{item.makePrice}}</li>
                        </ul>
                      </div>
                    </div>
                    <div class="bottom">
                      <div class="bottom-detail">
                        <div class="remark">
                          <p>备注：{{item.remark}}</p>
                        </div>
                        <div class="bill-title-right">
                          <ul>
                            <li><p><em>现金结算：</em><span>￥{{item.cash}}</span></p></li>
                            <li><p><em>资源置换：</em><span>￥{{item.zyzh}}</span></p></li>
                            <li><p><em>其他费用：</em><span>￥{{item.other}}</span></p></li>
                          </ul>
                        </div>
                      </div>
                      <div class="bottom-fin">
                        <el-button type="text" @click="changePrice('TP',item)">修改</el-button><!--changeBill = true-->
                        <p><em style="top: 5px">总计：</em><span class="totalPrice">￥{{item.total}}</span></p>
                      </div>
                    </div>
                  </div>
                </el-tab-pane>
              </el-tabs>
              <!-- <el-tabs type="border-card">
                 <el-tab-pane label='广州'>
                   <div class="tab-info">
                     <div class="pqxx">
                       <h4>排期信息</h4>
                       <p>2018.03.01-2018.03.28（20面）、2018.04.01-2018.04.28（10面）、2018.05.01-2018.05.28（10面）</p>
                     </div>
                     <div class="price">
                       <div class="price-left">
                         <h4>广告费
                           <el-button type="text" @click="changeAD = true">修改</el-button>
                         </h4>
                         <ul>
                           <li>刊例价(面/周) <span>￥{{ADPrice}}</span></li>
                           <li>投放量(面·天) <span>{{tfl}}</span></li>
                           <li>赠送(面·天) <span>{{GMDate}}</span></li>
                           <li>广告费折扣 <span>{{discount}}</span></li>
                           <li>￥{{advertyPrice}}</li>
                         </ul>
                       </div>
                       <div class="price-right">
                         <h4>制作费
                           <el-button type="text" @click="changeMake = true">修改</el-button>
                         </h4>
                         <ul>
                           <li>制作费单价<span>￥{{MPrice}}</span></li>
                           <li>广告画数量(张)<span>{{ADNumber}}</span></li>
                           <li></li>
                           <li>制作费折扣<span>{{makeDiscount}}</span></li>
                           <li>￥{{makePrice}}</li>
                         </ul>
                       </div>
                     </div>
                     <div class="bottom">
                       <div class="bottom-detail">
                         <div class="remark">
                           <p>备注：{{remark}}</p>
                         </div>
                         <div class="bill-title-right">
                           <ul>
                             <li><p><em>现金结算：</em><span>￥{{cash}}</span></p></li>
                             <li><p><em>资源置换：</em><span>￥{{zyzh}}</span></p></li>
                             <li><p><em>其他费用：</em><span>￥{{other}}</span></p></li>
                           </ul>
                         </div>
                       </div>
                       <div class="bottom-fin">
                         <el-button type="text" @click="changeBill = true">修改</el-button>
                         <p><em style="top: 5px">总计：</em><span class="totalPrice">￥{{totalPrice}}</span></p>
                       </div>
                     </div>
                   </div>
                 </el-tab-pane>
                 <el-tab-pane label="深圳">深圳内容</el-tab-pane>
                 <el-tab-pane label="成都">成都内容</el-tab-pane>
               </el-tabs>-->
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
              <h2>创建成功</h2>
              <p>创建时间：2018年3月18日</p>
            </div>
            <div class="planPanel">
              <ul>
                <li><em>方案名称：</em>珠江帝景地产三月份投放</li>
                <li><em>所属客户：</em>广州市视传文化传播有限公司</li>
                <li><em>所属品牌：</em>保利地产</li>
                <li class="money"><em>订单金额：</em>￥3,500,000.00</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content_bottom_btn">

      <el-button @click="prev" v-if="active!=3&&active!=0" type="default">上一步</el-button>
      <el-button @click="prev" v-if="active===0" type="default">取消</el-button>
      <el-button style="margin-top: 12px;" @click="next" v-if="active!=3" type="primary">下一步</el-button>

      <div class="finishBtn" v-if="active==3">
        <el-button type="primary" @click="continueCreate">继续创建</el-button>
        <el-button type="default">
          <router-link to="{path='/orderPlan'}"></router-link>
          查看订单
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
      return {
        dynamicTags: [],
        inputVisible: false,
        inputValue: '',
        selectedOptions: [],
        cityOptions: [/*{
          value: '120000',
          label: '天津市',
          children: [{
            value: '120100',
            label: '天津市',
          }]
        }*/],
        cityOther: false,             // 判断是否要选择全国其他城市
        isBD: true,                  // 判断登录用户是否为销售
        username: '',                   // 获取登录用户的userName
        loading: false,             // 加载所属销售
        cType: ['社区', '写字楼'],
        shopXY: {x: '', y: ''},     // 动画起始坐标
        shoppingShow: false,      //动画效果的显示隐藏
        selectAll: false,         // 是否全选
        badgeNumber: 0,            // 购物车数量
        bodyWidth: 1920,
        city: [],                      // step2 城市
        area: [],                    // step2城市下属区域
        activeIndex: 0,             //step2当前选中的城市下标
        areaName: '全市',            // step2当前选中的区域
        quotation: [],                // step3 报价单汇总
        ADchanger: {rid: '', GMDate: 0, reaPrice: 0,}, // 广告费修改
        makeChange: {rid: '', MReaPrice: 0},            // 制作费修改
        totalChange: {rid: '', cash: 0, zyzh: 0, other: 0, total: 0, remark: ''},   // 合计费用修改
        /*  GMDate: 0,                  // 赠送面.天
          discount: '100%',         // 广告费折扣
          advertyPrice: 0,           // 广告费
          ADNumber: 0,               // 广告画数量
          makeDiscount: '100%',    // 制作费折扣
          MPrice: 100,                // 制作费单价
          reaPrice: 0,               // 广告费原价
          MReaPrice: 0,              // 制作费原价
          makePrice: 0,    // 制作费
          ADPrice: 0,  // 广告费
         tfl: 0, //投放量
          */
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
        cName: '',         // 选中公司名称
        companyBrand: [], //step1公司品牌
        ownerBU: [],  //step1联系人
        //step1投放城市
        throwCity: [],
        //购物车
        // carShow:false,
        dialogTableVisible: false,
        //选中
        checkAB: true,
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
        active: 0, //步骤
        dateInput: [],
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
            {required: true, message: '方案名称不能为空', trigger: 'blur'},
            {max: 50, message: '最多只能输入40个字节', trigger: 'blur'}
          ],
          concat: [
            {required: true, message: '请选择联系人', trigger: 'change'},
          ],
          ownerSales: [
            {required: true, message: '请输入账号', trigger: 'blur'},
            {validator: validateSales, trigger: 'blur'},
          ],
          companyName: [
            {required: true, message: '请选择公司名称', trigger: 'change'},
          ],
          companyBrand: [
            {required: true, message: '请选择公司品牌', trigger: 'change'},
          ],
          throwCity: [
            {required: true, message: '请选择投放城市(可多选)', trigger: 'change'},
          ],
        },
        // 购物车列表
        shopingList: [],
        //step2列表
        planList: [
          /*{
            rid: 1,
            recName: '珠江1',
            city: '广州1',
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
            adLimit: '地产/医药/汽车',
            checkBox: {A: false, B: false},
            box: {A:true, B: false}
          },*/
        ],
        totalPlanList: [],   // step2全部城市的选点列表
        sessionData: '',    // 登录用户的数据
        shopListCity: [],    // 购物车的城市列表
        selectOnAll: false,   // 默认selecton
        FAData: '',            // 创建方后台返回的数据
        timeout: null,
        BDData: {uid: 0, realName: ''}
      };
    },
    created: function () {
    },
    computed: {},
    mounted() {
      this.getsessionData()   // 获取session中的数据
      //  this.getAdList()     // 获取选点列表
      // this.Get_cName()     // 获取公司名称列表
      //  this.getAreaFun()    // 获取城市区域
      //  this.GetBrand()
      //  this.ShowRegion()// 获取城市接口
      // 注：window.onresize只能在项目内触发1次
      let that = this;
      window.onresize = function windowResize() {    // 实时监控body的宽带。注：修改该方法后要重启项目并重新打开页面
        // 通过捕获系统的onresize事件触发我们需要执行的事件
        that.bodyWidth = document.body.offsetWidth;
        that.shopXY.x = that.bodyWidth - 170;
        shopAnimate.style.right = this.shopXY.x + 'px'

      };
      // let Right = document.body.offsetWidth - 170
      let Right = document.body.offsetWidth - 835
      this.shopXY.x = Right
      //    this.shopXY.x = this.bodyWidth - 170
      let shopAnimate = document.getElementsByClassName('shopAnimate')[0]
      shopAnimate.style.right = this.shopXY.x + 'px'
      $(function () {
        //事件委托
        /*  $('.content_top_wrap').on('click', 'dd', function () {
            if ($(this).hasClass('active')) {
              $(this).removeClass('active')
            } else {
              $(this).addClass('active');
            }
          });*/
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
    methods: {
      // step1投放城市权限是全国时handleClose1、showInput、handleInputConfirm
      handleClose1(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },
      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      handleInputConfirm() {
        let inputValue = this.selectedOptions;
        // console.log('********',inputValue)
        if (inputValue) {
          let cityArr = this.cityOptions
          for (let i = 0; i < cityArr.length; i++) {
            if (cityArr[i].value == inputValue[0]) {
              let childArr = cityArr[i].children
              for (let j = 0; j < childArr.length; j++) {
                if (childArr[j].value == inputValue[1]) {
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
                }
              }
              break
            }
          }
        }
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
        let uid = this.sessionData.uID
        if (queryString) {
          api.postApi('/CheckUserName', {uid: uid, sname: queryString}).then(res => {
            console.log('CheckUserName', res)
            console.log('媒介销售信息', this.BDData)
            if (res.data !== null) {
              this.BDData.uid = res.data.uID
              console.log('CheckUserName数据包', res.data)
              // if( this.BDData.realName !== '' &&  this.BDData.realName !== null){
              console.log('2')
              this.BDData.realName = queryString;
              this.planForm.ownerSales = queryString
              this.Get_cName()
              // }
              let results = [res.data];
              clearTimeout(this.timeout);
              this.timeout = setTimeout(() => {
                callback(results);
              }, 1000);
            } else {
              this.BDData.uid = 0
            }
          });
        }
      },
      //获取公司名称列表MyCustomer
      Get_cName() {
        // api.getApi('/MyCustomer', {uid: this.BDData.uid}).then(res => {
        api.getApi('/MyCustomer', {uid: 7}).then(res => {
          console.log('MyCustomer:', res.data)
          let customerList = res.data
          this.customer = res.data    //保存所有信息，方便后面的过滤使用
          //companyName ownerBU customer
          let companyList = []      // 公司名称
          let ownerList = []      // 联系人
          for (let i = 0; i < customerList.length; i++) {
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
        let uWho = '0'// this.sessionData.uWho // '110100,310100,440100'
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
        }
      },
      // 获取公司品牌
      GetBrandByCid(val) {
        this.planForm.companyBrand = ''
        this.planForm.ownerBU = ''
        console.log('所选公司的ID', val)
        let cidParams = {cid: val}
        api.getApi('/GetBrand', cidParams).then(res => {
          console.log('公司品牌', res.data)
          let CBrand = res.data
          let BrandList = []
          for (let i = 0; i < CBrand.length; i++) {
            let brandObj = {
              label: CBrand[i].bTitle,
              value: CBrand[i].bID
            }
            BrandList.push(brandObj)
          }
          this.companyBrand = BrandList
        })
        // 选择公司后过滤联系人列表customer
        let customerList = this.customer
        let ownerList = []   // 联系人
        let BrandList = []  // 公司品牌
        for (let j = 0; j < customerList.length; j++) {
          if (customerList[j].cID == val) {
            let owner = {
              label: customerList[j].realName,
              value: customerList[j].uID,
            }
            ownerList.push(owner)
          }
        }
        this.ownerBU = ownerList
      },
      // 创建方案
      creatAdPlan() {
        /*  uid         int【必填】     当前账户UserID
            bid         int             品牌ID
            apname      String【必填】  方案名称
            adcid       int【必填】     公司对应方案的客户UserID
            rid         String【必填】  方案投放的目标城市rID【例如：440100,110100】
            planForm: {
          planName: '',
          ownerSales: '',   // 所属销售
          companyName: '',
          companyBrand: '',
          throwCity: [],
          ownerBU: '',    // 所属联系人
          planRemark: '',
        },*/
        let uid = JSON.parse(sessionStorage.getItem('session_data')).uID
        let fangAnParams = {
          uid: uid,             // 销售uid
          suid: this.BDData.uid,
          bid: this.planForm.companyBrand,
          apname: this.planForm.planName,
          adcid: this.planForm.ownerBU,
          rid: this.planForm.throwCity[0],
        }
        console.log('创建方案时提交的数据：', fangAnParams)
        api.postApi('/CreateAdPlan', fangAnParams).then(res => {
          console.log('创建方案返回信息', res)
          let FAData = res.data
          this.FAData = FAData
          if (FAData !== '' || FAData !== null) {
            this.SendAdBaseFun(FAData.apID)
          } else {
            this.$message({
              message: '创建方案失败',
              type: 'warning'
            });
          }
        })
      },
      // 提交方案选点信息
      SendAdBaseFun(apID) {
        /*   uid         int【必填】         当前账户UserID
            pdid        int【必填】         选择方案投放pdID
            pbs         String【必填】      广告开始投放日期
            pbe         String【必填】      广告投放结束日期
            asids       String【必填】      选择的广告点位asID组合，以","逗号组合*/
        //this.shopListCity[g] === quotationObj.city
        let shopingArr = this.shopingList
        let asIDs = ''
        // console.log('shopingArr',shopingArr)
        for (let i = 0; i < shopingArr.length; i++) {
          // alert('1')
          for (let j = 0; j < this.shopListCity; j++) {
            if (this.shopListCity[j] === shopingArr[i].city) {    // 根据列表购物车列表的城市提交
              if (asIDs === '') {
                // alert('2aa',shopingArr[i].asIDs)
                asIDs = shopingArr[i].asIDs
              } else {
                // alert('3aa',shopingArr[i].asIDs)
                asIDs = asIDs + ',' + shopingArr[i].asIDs
              }
              if (i >= shopingArr.length - 1) {
                console.log('+++++++++++++', asIDs)
              }
              let uid = this.sessionData.uID
              api.getApi('/GetAPD', {uid: uid, apid: apID}).then(res => {
                console.log('获取pdid', res)
                let APDData = res.data
                if (APDData.length !== 0) {
                  let pointParams = {
                    uid: uid,
                    pdid: APDData[0].pdID,
                    pbs: this.shopingList[0].schedules.split('-')[0],
                    pbe: this.shopingList[0].schedules.split('-')[1],
                    asids: asIDs,
                  }
                  console.log('提交选点的信息', pointParams)
                  api.postApi('/SendAdBase', pointParams).then(res => {
                    console.log('提交选点后返回的data', res)
                    let AdBase = res.data
                    // this.CreateAPDFun()
                    if(j >= this.shopListCity.length-1){
                      this.CreateAPDFun()
                    }
                  })
                }
              })
            }
          }
        }
        /*  if(asIDs === ''){
            // alert('2aa',shopingArr[i].asIDs)
            asIDs = shopingArr[i].asIDs
          }else{
            // alert('3aa',shopingArr[i].asIDs)
            asIDs = asIDs + ',' + shopingArr[i].asIDs
          }
          if(i >= shopingArr.length-1){
            console.log('+++++++++++++',asIDs)
          }
        }
        let uid = this.sessionData.uID
        api.getApi('/GetAPD',{uid:uid,apid:apID}).then(res=>{
          console.log('获取pdid',res)
          let APDData = res.data
            if(APDData.length !== 0){
              let pointParams = {
                uid: uid,
                pdid: APDData[0].pdID,
                pbs: this.shopingList[0].schedules.split('-')[0],
                pbe: this.shopingList[0].schedules.split('-')[1],
                asids: asIDs,
              }
              console.log('提交选点的信息',pointParams)
              api.postApi('/SendAdBase',pointParams).then(res=>{
                console.log('提交选点后返回的data',res)
                let AdBase = res.data
                this.CreateAPDFun()
              })
            }
        })*/
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
        let CAPDParams = {
          uid: this.sessionData.uID,      // 当前账户UserID
          apid: this.FAData.apID,         // 方案apID
          pdre: this.quotation[0].remark,   // 方案投放特定城市详情备注
          muid: this.sessionData.uID,    // 如果当前账户是MD，在填写该媒介UserID
          rid: this.quotation[0].rid,       // 方案投放的目标城市rID
          days: this.quotation[0].tfl,      // 投放总数：面*天
          fdays: this.quotation[0].GMDate,  // 赠送数量：面/天
          ps: this.quotation[0].schedules.split('-')[0],       // 方案投放开始时间
          pe: this.quotation[0].schedules.split('-')[1],       // 投放结束日期
          pdfee: this.quotation[0].advertyPrice * 100,         //  实计广告费用
          pdn: this.badgeNumber,                      // 投放点位数
          pdm: this.quotation[0].makePrice * 100,   // 实计制作费用
          pdt: this.quotation[0].cash * 100,        // 现金金额
          pdsf: this.quotation[0].zyzh * 100,       // 置换金额
          pdof: this.quotation[0].other * 100,      // 其他金额
        }
        console.log('报价单数据提交:', CAPDParams)
        api.postApi('/CreateAPD', CAPDParams).then(res => {
          console.log('提交报价单后台返回数据：', res)
          let APD_data = res.data
          if (!res.data.SysCode) {
            if (res.data !== '') {
              Message({
                message: '投放城市的报价信息提交成功！',
                type: 'success'
              })
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
        // let rid = 440100
        let throwCityList = this.planForm.throwCity
        console.log('****************', throwCityList)
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
            console.log('this.city ', this.city)
          }
        }
        for (let n = 0; n < throwCityList.length; n++) {
          let rid = throwCityList[n]
          console.log('投放城市rid', rid)
          api.getApi('/ShowRegion', {rid: rid}).then(res => {
            console.log('城市区域', res.data)
            let areaList = res.data
            let areaArr = []
            for (let i = 0; i < areaList.length; i++) {
              if (i === 0) {
                let allArea = {
                  rID: rid,
                  rName: '全市'
                }
                areaArr.push(allArea)
              }
              if (rid.toString().substring(0, 4) === areaList[i].rID.toString().substring(0, 4) && areaList[i].rID.toString().substring(4, 6) !== '00') {
                areaArr.push(areaList[i])
              }
              if (i >= areaList.length - 1) {
                this.area.push(areaArr)
              }
            }
          })
          if (n >= throwCityList.length - 1) {
            console.log('this.area', this.area)
            // this.area = areaArr
          }
        }
      },
      // stpe2, tab切换城市
      activeCity(item, index) {
        //  console.log('stpe2,tab切换城市',item)
        this.activeIndex = index
        this.areaName = '全市'
        for (let i = 0; i < this.totalPlanList.length; i++) {
          if (this.totalPlanList[i][0].city === item.rName) {
            //    console.log('this.totalPlanList[i]',this.totalPlanList[i])
            this.planList = this.totalPlanList[i]
            console.log('this.planList', this.planList)
            let that = this
            setTimeout(function () {
              for (let j = 0; j < that.planList.length; j++) {
                if (that.planList[j].checkBox.A || that.planList[j].checkBox.B) {
                  console.log('时间排期', that.dateInput)
                  that.planList[j].schedules = that.dateInput[0] + '-' + that.dateInput[1],
                    that.$refs.multipleTable.toggleRowSelection(that.planList[j], true)
                }
              }
            }, 0)
            break
          }
        }
      },
      //  stpe2, 切换区域
      activeArea(rName) {
        this.areaName = rName
      },
      // 获取广告点位列表
      getAdList() {
        let starTime = this.GetDateStr(1)
        let endTime = this.GetDateStr(15)
        console.log('开始日期', starTime, '结束日期', endTime)
        this.dateInput = [starTime, endTime] // 设置默认时间
        let uid = this.sessionData.uID
        let tempADList = [
          {
            resName: "尚东3",
            mTitle: "尚东3东门",
            rName: "荔湾区",
            cType: "一般住宅",
            hNum: 100,
            hPrice: 56000,
            asIDs: "7",
            asLabs: "A",
            asStates: "1",
            tradingArea: "三里屯",
            fNum: 3,
            assetTag: "201805GZ-1324",
            notPush: ""
          },
          {
            resName: "帝景山庄改1",
            mTitle: "帝景1门",
            rName: "越秀区",
            cType: "高端住宅",
            hNum: 170,
            hPrice: 6100000,
            asIDs: "1,2",
            asLabs: "A,B",
            asStates: "1,1",
            tradingArea: "山泉1",
            fNum: 12,
            assetTag: "201707GZ-13161",
            chDay: "2013",
            notPush: "美容"
          },
          {
            resName: "帝景山庄改1",
            mTitle: "帝景2门2",
            rName: "越秀区",
            cType: "高端住宅",
            hNum: 170,
            hPrice: 6200000,
            asIDs: "4,3",
            asLabs: "B,A",
            asStates: "1,1",
            tradingArea: "山泉1",
            fNum: 12,
            assetTag: "201707GZ-1324",
            chDay: "2013",
            notPush: "地产"
          },
          {
            resName: "帝景山庄改1",
            mTitle: "帝景3门3",
            rName: "越秀区",
            cType: "高端住宅",
            hNum: 170,
            hPrice: 6100000,
            asIDs: "5,6",
            asLabs: "A,B",
            asStates: "1,1",
            tradingArea: "山泉1",
            fNum: 12,
            assetTag: "201707GZ-1329",
            chDay: "2013",
            notPush: "医学"
          },
          {
            resName: "帝景山庄",
            mTitle: "帝景门",
            rName: "白云区",
            cType: "别墅",
            hNum: 171,
            hPrice: 6600000,
            asIDs: "7,8",
            asLabs: "A,B",
            asStates: "1,1",
            tradingArea: "山泉",
            fNum: 12,
            assetTag: "201707GZ-1328",
            chDay: "2014",
            notPush: "医学"
          },
          {
            resName: "尚东",
            mTitle: "尚东一号",
            rName: "天河区",
            cType: "别墅",
            hNum: 171,
            hPrice: 7600000,
            asIDs: "9,10",
            asLabs: "A,B",
            asStates: "1,1",
            tradingArea: "山泉",
            fNum: 12,
            assetTag: "201707GZ-1329",
            chDay: "2015",
            notPush: "汽车"
          },
        ]
        let throwCity = this.city
        let totalList = []        // 全部城市的选点列表
        console.log('投放城市333333333', throwCity)
        for (let t = 0; t < throwCity.length; t++) {
          let rid = throwCity[t].rid
          let rName = throwCity[t].rName
          api.getApi('/GetAdS', {uid: uid, rid: rid}).then(res => {
            console.log('选点列表：', res)
            // let ADList = res.data
            // if(ADList.length !==0){
            let ADList = tempADList
            // 被占广告点位列表【选点】GetAdLaunch
            let LaunchParams = {uid: uid, rid: 440100, ls: starTime, le: endTime}
            api.getApi('/GetAdLaunch', LaunchParams).then(res => {
              console.log('被占选点列表', res)
              // let adLaunch = res.data
              let adLaunch = [
                {
                  lID: 1,
                  asID: 1,
                  pdID: 1,
                  lStar: "2018-06-01",
                  lEnd: "2018-06-09",
                  uID: 1,
                  lSetTime: "2018-05-17 18:19:15.0",
                  lState: 1
                },
                {
                  lID: 2,
                  asID: 2,
                  pdID: 1,
                  lStar: "2018-06-01",
                  lEnd: "2018-06-09",
                  uID: 1,
                  lSetTime: "2018-05-17 18:19:15.0",
                  lState: 1
                },
                {
                  lID: 3,
                  asID: 3,
                  pdID: 1,
                  lStar: "2018-06-01",
                  lEnd: "2018-06-09",
                  uID: 1,
                  lSetTime: "2018-05-17 18:19:15.0",
                  lState: 1
                },
                {
                  lID: 4,
                  asID: 6,
                  pdID: 1,
                  lStar: "2018-06-01",
                  lEnd: "2018-06-09",
                  uID: 1,
                  lSetTime: "2018-05-17 18:19:15.0",
                  lState: 2
                }]
              let planArr = []
              for (let i = 0; i < ADList.length; i++) {
                console.log('遍历选点列表')
                let adObj = {
                  rid: t.toString() + i.toString(),
                  asIDs: tempADList[i].asIDs,
                  asLabs: tempADList[i].asLabs,
                  recName: tempADList[i].resName,
                  city: rName, //'广州',
                  origin: tempADList[i].rName,
                  buildType: tempADList[i].cType,
                  houseNum: tempADList[i].hNum,
                  buildPrice: (tempADList[i].hPrice / 100),
                  mediaName: tempADList[i].mTitle,
                  buildNum: tempADList[i].fNum,
                  schedules: this.dateInput[0] + '-' + this.dateInput[1],
                  businessOrigin: tempADList[i].tradingArea,
                  assetID: tempADList[i].assetTag,
                  liveYear: tempADList[i].chDay,
                  adLimit: tempADList[i].notPush,
                  checkBox: {A: false, B: false},
                  box: {A: false, B: false},
                }
                if (ADList[i].asLabs.indexOf('A') === -1) {
                  adObj.box.A = true
                }
                if (ADList[i].asLabs.indexOf('B') === -1) {
                  adObj.box.B = true
                }
                if (i % 2) {
                  adObj.schedules = '2018.06.23' + '-' + '2018.07.07'
                }
                let asIDArr = ADList[i].asIDs.split(',')
                let asLabArr = ADList[i].asLabs.split(',')
                for (let j = 0; j < adLaunch.length; j++) {
                  for (let t = 0; t < 2; t++) {
                    if (adLaunch[j].asID == asIDArr[t]) {
                      if (asLabArr[t] === 'B') {
                        adObj.box.B = true
                      } else if (asLabArr[t] === 'A') {
                        adObj.box.A = true
                      }
                    }
                  }
                }
                if (adObj.box.A !== true || adObj.box.B !== true) {   // 去除AB两面都被占的
                  planArr.push(adObj)
                }
                if (i >= ADList.length - 1) {
                  console.log('方案选点列表', planArr)
                  // this.planList = planArr
                  totalList.push(planArr)
                }
              }
              if (t >= throwCity.length - 1) {
                console.log('全部城市的选点列表', totalList)
                this.totalPlanList = totalList
                this.planList = this.totalPlanList[0]
              }
            })
            // }else{
            // this.$message({
            //   message: '该城市暂无可选的投放点',
            //   type: 'warning'
            // });
            // }
          })
        }

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
        console.log('选中selection', selection)
        console.log('选中row', row)
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
        console.log('selection', selection)
        // let number = 0    // 统计全选后取消的行数或A/B面
        if (selection.length !== 0) {
          // console.log('number:', number)
          for (let i = 0; i < selection.length; i++) {
            // 判断右边AB面是否被勾选
            if (selection[i].checkBox.A) {
              // console.log('a')
              // number++
            }
            if (selection[i].checkBox.B) {
              // console.log('b')
              // number++
            }
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
          // let num = 0
          // for (let i = 0; i < this.planList.length; i++) {
          //   // 判断是否有取消勾选 A B面的
          //   if (!this.planList[i].checkBox.A) {
          //     console.log('A')
          //     num++
          //   } else {
          //     this.planList[i].checkBox.A = false
          //   }
          //   if (!this.planList[i].checkBox.B) {
          //     console.log('B')
          //     num++
          //   } else {
          //     this.planList[i].checkBox.B = false
          //   }
          // }
          // this.shopingList = [] // 清空购物车的列表
          // this.badgeNumber -= ((this.planList.length * 2) - num)
          let shopingArr = this.shopingList
          let planListCity = this.planList[0].city
          for (let i = 0; i < shopingArr.length;) {
            if (planListCity === shopingArr[i].city) {
              console.log('删除城市为：', planListCity)
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
        console.log('planForm', this.planForm)
        if (this.active === 0) {
          this.submitForm('planForm')
        } else if (this.active === 1) {
          this.active++
          this.creatTab()       // 报价单tab
          this.getShopingCityName()   // 获取购物车列表的城市名称
          this.quotationFun()   // 报价单计算
          // this.creatAdPlan()    // 创建方案
        } else if (this.active === 2) {
          this.creatAdPlan()    // 创建方案
        }
        if (this.active > 2) {
          // this.active = 0;
        }
      },
      // 上一步
      prev() {
        /* let topWrap = $('.content_top_wrap dd')
         for(let i=0;i<topWrap.length;i++){
           if(topWrap.eq(i).hasClass('active')){
             console.log('值',topWrap.eq(i).text())
           }
         }*/
        /*  let topWrap = document.getElementsByClassName('content_top_wrap')[0]
          let dd = topWrap.getElementsByTagName('dd')
        //  console.log(dd.length)
          for(let i=0;i<dd.length;i++){
            if(dd[i].getAttribute('class') == 'active'){
              console.log('值',dd[i].innerHTML)
            }
          }*/
        this.active--;
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
            console.log('submit!');
            this.active++;
            this.getAreaFun()
            this.getAdList()    // 获取选点列表
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      continueCreate() {
        this.active = 0;
        //表单重置
        /*this.planForm.resetFields();*/
      },
      changePrice(letter, info) {
        if (letter === 'AD') {
          this.changeAD = true
          this.ADchanger.rid = info.rid
          this.ADchanger.reaPrice = info.advertyPrice
        } else if (letter === 'M') {
          this.changeMake = true
          this.makeChange.rid = info.rid
          this.makeChange.MReaPrice = info.makePrice
        } else if (letter === 'TP') {
          this.changeBill = true
          this.totalChange.rid = info.rid
          this.totalChange.cash = info.cash
          this.totalChange.zyzh = info.zyzh
          this.totalChange.other = info.other
          this.totalChange.total = info.total
        }
      },
      //step3确认修改
      handleClose(letter) {
        // 'AD'为广告费修改，'M'为制作费修改, 'SM'为修改结算方式
        let QArr = this.quotation
        if (letter === 'AD') {
          for (let i = 0; i < QArr.length; i++) {
            if (QArr[i].rid === this.ADchanger.rid) {
              //  this.quotation[i].advertyPrice = ((this.quotation[i].tfl - this.ADchanger.GMDate) * (this.quotation[i].ADPrice/7)).toFixed(2)
              //   this.quotation[i].advertyPrice = ((this.quotation[i].tfl - this.ADchanger.GMDate) * (this.quotation[i].ADPrice/7)).toFixed(2)
              //   this.quotation[i].reaPrice = this.quotation[i].advertyPrice
              //   if(this.ADchanger.reaPrice === this.quotation[i].reaPrice){         // 判断是否输入修改了广告费
              //     this.ADchanger.reaPrice = this.quotation[i].advertyPrice
              //     this.quotation[i].reaPrice = this.ADchanger.reaPrice
              //     this.quotation[i].discount = Math.round(this.ADchanger.reaPrice/QArr[i].advertyPrice * 10000) / 100.00 + "%" // 折扣百分比
              //   }else{
              //   //  this.quotation[i].advertyPrice = this.ADchanger.reaPrice
              //     this.quotation[i].discount = Math.round(this.quotation[i].advertyPrice/QArr[i].reaPrice * 10000) / 100.00 + "%" // 折扣百分比
              //   }
              this.quotation[i].advertyPrice = ((this.quotation[i].tfl - this.ADchanger.GMDate) * (this.quotation[i].ADPrice / 7)).toFixed(2)
              this.quotation[i].GMDate = this.ADchanger.GMDate
              if (this.ADchanger.GMDate != 0) {
                // alert('1')
                console.log('ADchanger.reaPrice', this.ADchanger.reaPrice)
                console.log('quotation.advertyPrice', this.quotation[i].advertyPrice)
                console.log('quotation.reaPrice', this.quotation[i].reaPrice)

                if (this.ADchanger.reaPrice === this.quotation[i].reaPrice) {
                  // alert('2')
                  this.ADchanger.reaPrice = this.quotation[i].advertyPrice
                  this.quotation[i].reaPrice = this.quotation[i].advertyPrice
                  this.quotation[i].discount = '100%'
                  this.hideBox()
                } else if (this.ADchanger.reaPrice > this.quotation[i].reaPrice) {
                  // alert('3')
                  this.ADchanger.reaPrice = this.quotation[i].advertyPrice
                  this.$message({
                    message: '大于原价格',
                    type: 'warning'
                  });
                } else {
                  // alert('4')
                  if (this.ADchanger.reaPrice > this.quotation[i].advertyPrice) {
                    this.ADchanger.reaPrice = this.quotation[i].advertyPrice
                    this.$message({
                      message: '大于原价格',
                      type: 'warning'
                    });
                  } else {
                    this.quotation[i].reaPrice = this.quotation[i].advertyPrice
                    this.quotation[i].advertyPrice = this.ADchanger.reaPrice
                    this.quotation[i].discount = Math.round(this.quotation[i].advertyPrice / this.quotation[i].reaPrice * 10000) / 100.00 + "%" // 折扣百分比
                    this.hideBox()
                  }
                }
              } else {
                // alert('0')
                if (this.ADchanger.reaPrice > this.quotation[i].oldPrice) {
                  this.$message({
                    message: '大于原价格',
                    type: 'warning'
                  });
                } else {
                  this.quotation[i].advertyPrice = this.ADchanger.reaPrice
                  this.quotation[i].reaPrice = this.quotation[i].oldPrice
                  this.quotation[i].discount = Math.round(this.quotation[i].advertyPrice / this.quotation[i].reaPrice * 10000) / 100.00 + "%" // 折扣百分比
                  this.hideBox()
                }
              }
              // break
              this.quotation[i].total = Number(this.quotation[i].advertyPrice) + Number(this.quotation[i].makePrice)
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
            }
          }
        } else if (letter === 'TP') {     // 修改结算方式
          for (let i = 0; i < QArr.length; i++) {
            if (QArr[i].rid === this.totalChange.rid) {
              // alert('1')
              let total = Number(this.totalChange.other) + Number(this.totalChange.zyzh) + Number(this.totalChange.cash)
              console.log('total', total, this.totalChange.total)
              if (total > this.totalChange.total) {
                this.$message({
                  message: '大于总价格',
                  type: 'warning'
                });
              } else {
                this.totalChange.other = this.totalChange.total - (Number(this.totalChange.zyzh) + Number(this.totalChange.cash))
                this.quotation[i].cash = this.totalChange.cash
                this.quotation[i].zyzh = this.totalChange.zyzh
                this.quotation[i].other = this.totalChange.other
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
            GMDate: 0,                   // 赠送面.天
            discount: '100%',           // 广告费折扣
            advertyPrice: 0,             // 广告费
            ADNumber: 0,                 // 广告画数量
            makeDiscount: '100%',      // 制作费折扣
            MPrice: 100,                // 制作费单价
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
            remark: '价格计算信息',
          }
          quotationArr.push(quotationObj)
          if (i >= this.city.length - 1) {
            this.quotation = quotationArr
          }
          // 从购物车列表获取排期
          let shopingArr = this.shopingList
          for (let j = 0; j < this.shopingList.length; j++) {
            let shoping = this.shopingList[j]
            // console.log('从购物车列表获取排期',shoping.schedules)
            for (let t = 0; t < this.quotation.length; t++) {
              if (shoping.city === this.quotation[t].city) {
                // this.quotation[t].schedules = shoping.schedules
                if (j === 0) {
                  // console.log('第一个排期',shoping.schedules)
                  this.quotation[t].schedules = shoping.schedules
                } else {
                  if (this.quotation[t].schedules.indexOf(shoping.schedules) === -1) {
                    // console.log('增加排期',shoping.schedules)
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
              // alert('2')
              cityList.push(list.city)
            }
          }
          if (i >= this.shopingList.length - 1) {
            console.log('购物车城市列表', cityList)
            this.shopListCity = cityList
          }
        }
      },
      // step3 报价单
      quotationFun() {
        let ADPriceList = [
          {amID: 92, rID: 440200, rName: "韶关市", mVehicle: "广告门", adPrice: 500000},
          {amID: 91, rID: 440100, rName: "广州市", mVehicle: "广告门", adPrice: 600000},
          {amID: 90, rID: 310100, rName: "上海市", mVehicle: "广告门", adPrice: 888800},
          {amID: 89, rID: 110100, rName: "北京市", mVehicle: "广告门", adPrice: 777700},
          {amID: 88, rID: 120100, rName: "天津市", mVehicle: "广告门", adPrice: 588800}]
        let uid = this.sessionData.uID
        api.getApi('/GetAdPrice', {uid: uid}).then(res => {
          console.log('刊例价信息', res)
          // let ADPriceList = res.data
          console.log('投放城市信息', this.planForm.throwCity)
          // let throwCityList = this.planForm.throwCity
          let quotation = this.quotation
          for (let i = 0; i < ADPriceList.length; i++) {
            for (let j = 0; j < quotation.length; j++) {
              let quotationObj = quotation[j]
              for (let g = 0; g < this.shopListCity.length; g++) {
                if (ADPriceList[i].rID == quotationObj.rid && this.shopListCity[g] === quotationObj.city) {
                  // alert(ADPriceList[i].adPrice)
                  console.log('该城市的排期', quotationObj.schedules)
                  let schedulesArr = quotationObj.schedules.split('-')
                  // for(){
                  //
                  // }
                  console.log(ADPriceList[i].rName, '广告门价格为', ADPriceList[i].adPrice)
                  // 广告费计算
                  quotationObj.ADPrice = ADPriceList[i].adPrice / (100 * 2)       // 刊例价(面/周)
                  console.log('刊例价(面/周)', quotationObj.ADPrice)
                  quotationObj.tfl = this.badgeNumber * 14                    // 投放量(面·天)
                  quotationObj.reaPrice = quotationObj.tfl * (quotationObj.ADPrice / 7)        // 广告费总价
                  quotationObj.oldPrice = quotationObj.reaPrice               // 保存最初计算的价格

                  quotationObj.advertyPrice = quotationObj.reaPrice
                  console.log('广告费总价', quotationObj.advertyPrice)
                  quotationObj.discount = Math.round(quotationObj.advertyPrice / quotationObj.reaPrice * 10000) / 100.00 + "%" // 广告费折扣百分比

                  // 制作费计算
                  quotationObj.ADNumber = this.badgeNumber                    // 广告画数量
                  quotationObj.makePrice = quotationObj.ADNumber * quotationObj.MPrice       // 制作费 = 广告画数量 * 制作费单价
                  quotationObj.MReaPrice = quotationObj.makePrice
                  quotationObj.makeDiscount = Math.round(quotationObj.makePrice / quotationObj.MReaPrice * 10000) / 100.00 + "%" // 制作费折扣百分比

                  quotationObj.total = quotationObj.advertyPrice + quotationObj.makePrice
                  quotationObj.cash = quotationObj.total

                  // 计算总价格
                  this.totalPrice += quotationObj.total
                  this.cash += quotationObj.cash
                  this.other += quotationObj.other
                  this.zyzh += quotationObj.zyzh
                }
                /*if (ADPriceList[i].rID == quotationObj.rid && this.shopListCity[g] === quotationObj.city) {
                  // alert(ADPriceList[i].adPrice)
                  console.log('该城市的排期',quotationObj.schedules)
                  console.log(ADPriceList[i].rName, '广告门价格为', ADPriceList[i].adPrice)
                  // 广告费计算
                  quotationObj.ADPrice = ADPriceList[i].adPrice / (100 * 2)       // 刊例价(面/周)
                  console.log('刊例价(面/周)', quotationObj.ADPrice)
                  quotationObj.tfl = this.badgeNumber * 14                    // 投放量(面·天)
                  quotationObj.reaPrice = quotationObj.tfl * (quotationObj.ADPrice / 7)        // 广告费总价
                  quotationObj.oldPrice = quotationObj.reaPrice               // 保存最初计算的价格

                  quotationObj.advertyPrice = quotationObj.reaPrice
                  console.log('广告费总价', quotationObj.advertyPrice)
                  quotationObj.discount = Math.round(quotationObj.advertyPrice / quotationObj.reaPrice * 10000) / 100.00 + "%" // 广告费折扣百分比

                  // 制作费计算
                  quotationObj.ADNumber = this.badgeNumber                    // 广告画数量
                  quotationObj.makePrice = quotationObj.ADNumber * quotationObj.MPrice       // 制作费 = 广告画数量 * 制作费单价
                  quotationObj.MReaPrice = quotationObj.makePrice
                  quotationObj.makeDiscount = Math.round(quotationObj.makePrice / quotationObj.MReaPrice * 10000) / 100.00 + "%" // 制作费折扣百分比

                  quotationObj.total = quotationObj.advertyPrice + quotationObj.makePrice
                  quotationObj.cash = quotationObj.total

                  // 计算总价格
                  this.totalPrice += quotationObj.total
                  this.cash += quotationObj.cash
                  this.other += quotationObj.other
                  this.zyzh += quotationObj.zyzh
                }*/
              }
            }
          }
        })
        for (let n = 0; n < this.companyName.length; n++) {
          if (this.companyName[n].value === this.planForm.companyName) {
            this.cName = this.companyName[n].label
          }
        }
      },
      //计算总价格
      computeTotal() {
        this.totalPrice = 0
        this.cash = 0
        this.other = 0
        this.zyzh = 0
        for (let i = 0; i < this.quotation.length; i++) {
          this.totalPrice += this.quotation[i].total
          this.cash += this.quotation[i].cash
          this.other += this.quotation[i].other
          this.zyzh += this.quotation[i].zyzh
        }
      },
      // dialog购物筐的显示全选中后添加都购物车
      dialogVisible() {
        this.dialogTableVisible = true
      },
      // 添加到购物车
      AddShopingInfo(info, letter) {
        //  alert('1')
        console.log('选中的row信息', info)
        let selectInfo = {
          rid: info.rid,
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
              console.log('B', asIDArr[n])
              selectInfo.asIDs = asIDArr[n]
              // break
            }
          }
          selectInfo.A_B = 'B面'
          this.shopingList.push(selectInfo)
        } else {
          if (info.checkBox.B) {
            for (let n = 0; n < asLabsArr.length; n++) {
              if (asLabsArr[n] === 'B') {
                console.log('B', asIDArr[n])
                selectInfo.asIDs = asIDArr[n]
                // break
              }
            }
            selectInfo.A_B = 'B面'
          } else {
            for (let n = 0; n < asLabsArr.length; n++) {
              if (asLabsArr[n] === 'A') {
                console.log('A', asIDArr[n])
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
        //  console.log('购物车列表：',list)
        console.log('购物车删除行', rows)
        console.log('删除行id', rows.rid)
        if (rows.city === this.planList[0].city) {    //判断删除的城市选点是否是当前选点列表的城市
          for (let i = 0; i < this.planList.length; i++) {
            if (rows.rid === this.planList[i].rid) {
              console.log('相等的rid', rows.rid)
              if (rows.A_B === 'A面') {
                this.planList[i].checkBox.A = false
                console.log('取消行的 this.planList', this.planList[i])
                if (!this.planList[i].checkBox.B) {
                  //  alert('1')
                  this.$refs.multipleTable.toggleRowSelection(this.planList[i], false)
                }
                console.log('相等的rid的checkBox.A', this.planList[i].checkBox.A)
                // 删除
                for (let j = 0; j < this.shopingList.length;) {
                  if (this.shopingList[j].rid === rows.rid && this.shopingList[j].A_B == 'A面') {
                    this.shopingList.splice(j, 1)
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
                  if (this.shopingList[j].rid === rows.rid && this.shopingList[j].A_B == 'B面') {
                    this.shopingList.splice(j, 1)
                    this.badgeNumber--
                    // break
                  } else {
                    j++
                  }
                }
              }
              break
            }
          }
        } else {
          // alert('不相同')
          this.delereRowByTotal(rows)
        }
      },
      // 当在购物车删除项不在当前选点列表（城市不同）时，去totalPlanList查找
      delereRowByTotal(rows) {
        let totalList = this.totalPlanList
        console.log('totalPlanList查找', totalList)
        for (let i = 0; i < totalList.length; i++) {
          if (totalList[i][0].city === rows.city) {
            console.log('找到城市:', rows.city)
            let childrenList = totalList[i]
            for (let j = 0; j < childrenList.length; j++) {
              if (rows.rid === childrenList[j].rid) {
                console.log('找到rid', rows.rid)
                if (rows.A_B == 'A面') {
                  childrenList[j].checkBox.A = false
                  console.log('删除行的 childrenList', childrenList[j])
                  console.log('相等的rid的checkBox.A', childrenList[j].checkBox.A)
                  // 删除
                  for (let t = 0; t < this.shopingList.length; t++) {
                    if (this.shopingList[t].rid === rows.rid && this.shopingList[t].A_B == 'A面') {
                      this.shopingList.splice(t, 1)
                      this.badgeNumber--
                      break
                    }
                  }
                } else if (rows.A_B == 'B面') {
                  childrenList[j].checkBox.B = false
                  // 删除
                  for (let t = 0; t < this.shopingList.length; t++) {
                    if (this.shopingList[t].rid === rows.rid && this.shopingList[t].A_B == 'B面') {
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
      },
      // 取消勾时,删除购物车里对应的数据行
      deleteShopRow(row, letter) {
        if (letter === 'all') {     // 判断是否全选
          // if(this.shopingList.length !== 0){

          // }else{
          // this.shopingList = []
          for (let i = 0; i < this.planList.length; i++) {
            let info = this.planList[i]
            for (let j = 0; j < 2; j++) {
              let selectInfo = {
                rid: info.rid,
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
                    console.log('A', asIDArr[n])
                    selectInfo.asIDs = asIDArr[n]
                    // break
                  }
                }
                this.shopingList.push(selectInfo)
              } else if (j === 1 && !selectInfo.box.B) {
                selectInfo.A_B = 'B面'
                for (let n = 0; n < asLabsArr.length; n++) {
                  if (asLabsArr[n] === 'B') {
                    console.log('B', asIDArr[n])
                    selectInfo.asIDs = asIDArr[n]
                    // break
                  }
                }
                this.shopingList.push(selectInfo)
              }
            }
          }
          // }
          console.log('全选是this.shopingList', this.shopingList)
        } else {
          for (let i = 0; i < this.planList.length; i++) {
            if (row.rid === this.planList[i].rid) {
              console.log('相等的rid', row.rid)
              if (letter === 'B') {
                for (let j = 0; j < this.shopingList.length; j++) {
                  if (this.shopingList[j].rid === row.rid && this.shopingList[j].A_B === 'B面') {
                    this.shopingList.splice(j, 1)
                    break
                  }
                }
              } else if (letter === 'A') {
                for (let j = 0; j < this.shopingList.length; j++) {
                  if (this.shopingList[j].rid === row.rid && this.shopingList[j].A_B === 'A面') {
                    this.shopingList.splice(j, 1)
                    break
                  }
                }
              } else if (letter === 'AB') {
                console.log('this.shopingList', this.shopingList)
                for (let j = 0; j < this.shopingList.length; j++) {
                  if (this.shopingList[j].rid === row.rid) {
                    // alert('2')
                    this.shopingList.splice(j, 1)
                    //  break
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
        console.log('Right:', R, ',Top:', T)
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
            // that.badgeNumber += (that.planList.length * 2) - num
            // if (that.badgeNumber < 0) {
            //   that.badgeNumber = 0
            // }
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
        console.log('搜索排期时间', this.dateInput)
      },
    }
  }
</script>

<style scoped>
  .inputNewTag > > > .el-input__inner {
    width: 140px;
  }

  .input-with-select /deep/ .el-input__inner {
    font-size: 14px;
    padding: 10px 10px;
    height: 34px;
    line-height: 14px;
  }

  /deep/ .el-input__inner {
    font-size: 14px;
    padding: 10px 10px;
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
    width: 300px;
    height: 34px;
  }

  /deep/ .el-input__inner {
    width: 300px;
    height: 34px;
  }

  /deep/ .el-textarea__inner {
    width: 300px;
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
    /*border-left: none !important;*/
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
  }

  /deep/ .plan-select .el-input, /deep/ .plan-select .el-input__inner {
    width: 215px;
    margin-left: -6px;
  }

  /deep/ .date-select.el-input__inner {
    width: 237px;
    position: relative;
    top: 3px;
    left: -5px;
  }

  /deep/ .plan-select /deep/ .el-input__suffix {

    right: 10px;
  }

  /deep/ .el-date-editor .el-range__icon {
    line-height: 14px;
    position: relative;
  }

  /*日期*/

  /deep/ .el-date-editor .el-range__close-icon {
    line-height: 29px;
  }

  .searchBtn, .map {
    position: relative;
    /*top: 3px;*/
    left: -3px;
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
    margin-left: 2px;
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
    margin-left: 2px;
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

  /deep/ .el-dialog {
    width: 1000px;
  }

  /*购物车列表*/
  .car-title {
    margin-bottom: 10px;
  }

  .car-title h4 {
    font-size: 16px;
    font-weight: bold;
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

  /deep/ .el-table_1_column_7, /deep/ .el-table_1_column_8, /deep/ .el-table_1_column_9, .el-table_1_column_18, /deep/ .el-table_2_column_19 {
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
    padding-left: 153px;
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
