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
                <el-select v-model="planForm.ownerSales" placeholder="请选择所属销售">
                  <!--<el-option label="销售" value="BD"></el-option>
                  <el-option label="媒介" value="MD"></el-option>-->
                  <el-option
                    v-for="item in ownerSales"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
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
              <el-form-item label="投放城市：" prop="throwCity">
                <el-select v-model="planForm.throwCity" multiple placeholder="请选择">
                  <el-option
                    v-for="item in throwCity"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <!--  <el-cascader
                    :options="throwCity"
                    v-model="planForm.throwCity"
                    separator="-"
                    :show-all-levels="false"
                    @active-item-change="handleItemChange">
                  </el-cascader>-->
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
                <el-select v-model="value" placeholder="请选择" class="type-select">
                  <el-option v-for="item in typeSelect" :key="item.value" :label="item.value"
                             :value="item.value"></el-option>
                </el-select>
                <el-input v-model="searchInput" placeholder="请输入要搜索的内容" class="searchInput"></el-input>
                <el-select v-model="planSelect" placeholder="选择投已有方案" class="plan-select">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
                <el-date-picker
                  v-model="dateInput"
                  type="daterange"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  class="date-select"
                >
                </el-date-picker>
                <el-button type="primary" icon="el-icon-search" class="searchBtn">搜索</el-button>
                <el-button type="primary" icon="el-icon-location-outline" class="map">地图</el-button>
                <div class="shopcar" @click="dialogTableVisible = true">
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
                ref="multipleTable"
                border
                :data="planList"
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
                </el-table-column><!-- @click.native="alertFun()"  scope="scope"-->
                <el-table-column
                  type="selection"
                  width="41px"
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
                    <el-checkbox v-model="scope.row.checkBox.A" label="A面" @change="changeA(scope.row)"></el-checkbox>
                    <el-checkbox v-model="scope.row.checkBox.B" label="B面" @change="changeB(scope.row)"></el-checkbox>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <!--购物车-->
            <el-dialog title="购物车" :visible.sync="dialogTableVisible">
              <template slot-scope="scope">
                <div class="table_wrap car-list" style="margin-top: 60px">
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
                <h4>珠江帝景地产三月份投放</h4>
                <p>广州市视传文化传播有限公司</p>
                <p>珠江帝景</p>
              </div>
              <div class="bill-title-right">
                <ul>
                  <li><p><em>现金结算：</em><span>￥88,000,000.00</span></p></li>
                  <li><p><em>资源置换：</em><span>￥2,000,000.00</span></p></li>
                  <li><p><em>其他费用：</em><span>￥2,000,000.00</span></p></li>
                  <li><p><em style="top: 5px">总计：</em><span class="totalPrice">￥90,000,000.00</span></p></li>
                </ul>
              </div>
            </div>
            <div class="panel">
              <el-tabs type="border-card">
                <el-tab-pane label="广州">
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
                          <li>刊例价(面/周) <span>{{ADPrice}}</span></li>
                          <li>投放量(面·天) <span>{{tfl}}</span></li>
                          <li>赠送(面·天) <span>35</span></li>
                          <li>广告费折扣 <span>96.67%</span></li>
                          <li>￥3,800,000.00</li>
                        </ul>
                      </div>
                      <div class="price-right">
                        <h4>制作费
                          <el-button type="text" @click="changeMake = true">修改</el-button>
                        </h4>
                        <ul>
                          <li>制作费单价<span>￥100</span></li>
                          <li>广告画数量(张)<span>35</span></li>
                          <li></li>
                          <li>制作费折扣<span>100%</span></li>
                          <li>{{makePrice}}</li>
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
                            <li><p><em>现金结算：</em><span>{{cash}}</span></p></li>
                            <li><p><em>资源置换：</em><span>{{zyzh}}</span></p></li>
                            <li><p><em>其他费用：</em><span>{{other}}</span></p></li>
                          </ul>
                        </div>
                      </div>
                      <div class="bottom-fin">
                        <el-button type="text" @click="changeBill = true">修改</el-button>
                        <p><em style="top: 5px">总计：</em><span class="totalPrice">{{totalPrice}}</span></p>
                      </div>
                    </div>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="深圳">深圳内容</el-tab-pane>
                <el-tab-pane label="成都">成都内容</el-tab-pane>
              </el-tabs>
              <!--修改对话框-->
              <el-dialog
                title="修改广告费"
                :visible.sync="changeAD"
                width="30%">
                <div class="changeMakePrice">
                  <p>赠送(面·天)</p>
                  <el-input-number v-model="tfl" controls-position="right"></el-input-number>
                  <p style="margin-top: 20px">广告费</p>
                  <el-input v-model="ADPrice" placeholder="请输入内容"></el-input>
                </div>
                <span slot="footer" class="dialog-footer">
    <el-button @click="changeAD = false">取 消</el-button>
    <el-button type="primary" @click="handleClose">确 定</el-button>
  </span>
              </el-dialog>
              <!---->
              <el-dialog
                title="修改制作费"
                :visible.sync="changeMake"
                width="30%">
                <div class="changeMakePrice">
                  <p>制作费</p>
                  <el-input v-model="makePrice" placeholder="请输入内容"></el-input>
                </div>
                <span slot="footer" class="dialog-footer">
    <el-button @click="changeMake = false">取 消</el-button>
    <el-button type="primary" @click="handleClose">确 定</el-button>
  </span>
              </el-dialog>
              <el-dialog
                title="修改结算方式"
                :visible.sync="changeBill"
                width="30%"
              >
                <div class="changeBill">
                  <h4>{{totalPrice}}</h4>
                  <p>现金结算</p>
                  <el-input v-model="cash" placeholder="请输入内容"></el-input>
                  <p>资源置换</p>
                  <el-input v-model="zyzh" placeholder="请输入内容"></el-input>
                  <p>其他费用</p>
                  <el-input v-model="other" placeholder="请输入内容"></el-input>
                  <p>结算备注</p>
                  <el-input v-model="remark" type="textarea"></el-input>
                </div>
                <span slot="footer" class="dialog-footer">
    <el-button @click="changeBill = false">取 消</el-button>
    <el-button type="primary" @click="handleClose">确 定</el-button>
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
      return {
        cType: ['社区', '写字楼'],
        shopXY: {x: '', y: ''},   // 动画起始坐标
        shoppingShow: false, //动画效果的显示隐藏
        selectAll: false, // 是否全选
        badgeNumber:0,    // 购物车数量
        bodyWidth: 1920,
        //step2修改弹框
        changeAD: false,
        changeMake: false,
        changeBill: false,
        //step2制作费
        makePrice: '￥3,000',
        //广告费
        ADPrice: '￥3,000,000',
        //投放量
        tfl: '235',
        //总价
        totalPrice: '￥90,000,000.00',
        //备注
        remark: '无',
        cash: '￥88,000,000.00',
        zyzh: '￥2,000,000.00',
        other: '￥2,000,000.00',
        ownerSales: [], // step1所属销售
        customer: [],  // step1公司客户
        companyName: [], //step1公司名称
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
        //步骤
        active: 0,
        dateInput: '',
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
            {required: true, message: '请选择所属销售', trigger: 'change'},
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
        shopingList: [
         /* {
            id: 1,
            recName: '珠江帝景花园1',
            city: '广州1',
            origin: '海珠区',
            buildType: '高端住宅',
            houseNum: '600',
            buildPrice: '￥30,000',
            mediaName: '广州市中山大道1',
            buildNum: '12',
            schedules: '2017.08.30-2017.09.30',
            businessOrigin: '白云万达广场',
            assetID: 'GZ201871024',
            liveYear: '1999年',
            adLimit: '地产/医药/汽车',
            A_B: 'B面'
          }*/
        ],
        //step2列表
        planList: [
          {
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
          },
          {
            rid: 2,
            recName: '珠江2',
            city: '广州2',
            origin: '白云区',
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
          },
          {
            rid: 3,
            recName: '珠江3',
            city: '广州3',
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
          }, {
            rid: 4,
            recName: '珠江4',
            city: '广州4',
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
          },
          {
            rid: 5,
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
            adLimit: '地产/医药/汽车',
            checkBox: {A: false, B: false},
          },
          /*{
            id: 6,
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
            adLimit: '地产/医药/汽车',
            checkBox: {A: false, B: false},
          }, {
            id: 7,
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
            adLimit: '地产/医药/汽车',
            checkBox: {A: false, B: false},
          }, {
            id: 8,
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
            adLimit: '地产/医药/汽车',
            checkBox: {A: false, B: false},
          }, {
            id: 9,
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
            adLimit: '地产/医药/汽车',
            checkBox: {A: false, B: false},
          }, {
            id: 10,
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
            adLimit: '地产/医药/汽车',
            checkBox: {A: false, B: false},
          }, {
            id: 11,
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
            adLimit: '地产/医药/汽车',
            checkBox: {A: false, B: false},
          }, {
            id: 12,
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
            adLimit: '地产/医药/汽车',
            checkBox: {A: false, B: false},
          }, {
            id: 13,
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
            adLimit: '地产/医药/汽车',
            checkBox: {A: false, B: false},
          }, {
            id: 14,
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
            adLimit: '地产/医药/汽车',
            checkBox: {A: false, B: false},
          }, {
            id: 15,
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
            adLimit: '地产/医药/汽车',
            checkBox: {A: false, B: false},
          }*/],

      };
    },
    created: function () {

    },
    computed: {},
    mounted() {
      this.Get_cName()
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
    methods: {
      //获取公司名称列表MyCustomer
      Get_cName() {
        let userInfo = JSON.parse(sessionStorage.getItem('session_data'))
        //Type:"BD"
        let uType = userInfo.uType
        if (uType == 'BD') {
          //    alert('销售') //ownerSales
          let sales = {
            label: '销售',
            value: userInfo.uID
          }
          this.ownerSales.push(sales)
        }
        console.log('this.ownerSales', this.ownerSales)
        this.planForm.ownerSales = userInfo.uID //
        api.getApi('/MyCustomer', {uid: 3}).then(res => {
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
            } else if (JSON.stringify(companyList).indexOf(JSON.stringify(companyObj)) === -1) { //判断是否有重复的公司
              companyList.push(companyObj)
            }
          }
          console.log('companyList:', companyList)
          console.log('联系人列表:', ownerList)
          this.companyName = companyList  // 公司名称列表
          this.ownerBU = ownerList // 联系人列表
        })
        // 公司信息所在城市
        let uWho =  '440100,110100'//userInfo.uWho //
        let uWhoArr = uWho.split(',') // ['440100','110100']
        let cityList = []
        console.log()
        for (let j = 0; j < uWhoArr.length; j++) {
          console.log('公司uWho', uWhoArr[j])
          areaToText.toText(data => {
            console.log('公司信息所在城市', data);
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
      },
      // 获取公司品牌
      GetBrandByCid(val) {
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
          uid: 3,
          bid: this.planForm.companyBrand,
          apname: this.planForm.planName,
          adcid: '',
          rid: this.planForm.throwCity[1],
        }

      },
      /* // 城市地区联动-省级
       ShowRegion() {
         api.getApi('/ShowRegion').then(res => {
           //      console.log('地区：',res.data)
           let region = res.data
           let arr = [];
           for (let i = 0; i < region.length; i++) {
             let opt = {label: '', value: '', children: []}
             opt.label = region[i].rName
             opt.value = region[i].rID
             arr.push(opt)
           }
           this.throwCity = arr;
         })
       },
       // 城市地区联动，选择省级后去获取市级和区、县级
       handleItemChange(val) {
         console.log('active item:', val);
         let region = []
         api.getApi('/ShowRegion', {rid: val[0]}).then(res => {
           let city = res.data
           //    console.log('city：',city)
           for (let j = 0; j < this.throwCity.length; j++) {
             if (this.throwCity[j].value == val[0]) {
               this.throwCity[j].children = []
               for (let i = 0; i < city.length; i++) {
                 let obj = {label: '', value: ''}
                 obj.label = city[i].rName
                 obj.value = city[i].rID
                 if (city[i].rID.toString().substring(4, 6) == '00') {  // 二级，判断是否为地级市- 明确了省份过滤掉后面两位不是00的就剩下城市
                   //        console.log(city[i].rID.toString().substring(4,6))
                   this.throwCity[j].children.push(obj)
                 }
                 // else{
                 //   region.push(obj)              // 三级，所属区域
                 // }
               }
               //      console.log('region',region)
               //    this.regionOpt = region
               break
             }
           }
         })
       },*/
      //获取mouseEnter屏幕时的坐标像素
      mouseEnter(row, column, cell, event) {
        let e = event || window.event;
        this.shopXY.y = e.clientY
        // console.log('this.shopXY.y',this.shopXY.y)
      },
      // 行选中打钩
      handleSelect(selection, row) {
        /*  if(row.checkBox.B === false){
            row.checkBox.A = !row.checkBox.A
        }/*else{
            row.checkBox.A = false
          }
        if(row.checkBox.A){
           this.shopShow_hide()
        }else{
          row.checkBox.B = false
          this.badgeNumber--
        }*/
        if (!row.checkBox.B && !row.checkBox.A) {
          row.checkBox.A = true
          this.shopShow_hide()   // 动画效果
          this.AddShopingInfo(row) // 添加到购物车
        } else if (row.checkBox.A || row.checkBox.B) {
          if (row.checkBox.A && row.checkBox.B) {
            this.badgeNumber -= 2
          } else {
            this.badgeNumber--
          }
          row.checkBox.A = false
          row.checkBox.B = false
        } else {
          row.checkBox.A = false
        }
        console.log('选中selection',selection)
        console.log('选中row',row)
      },
      // 选中A、B面的时候
      changeA(row) {
        let check = row
        if (check.checkBox.A === true || check.checkBox.B === true) {
          this.$refs.multipleTable.toggleRowSelection(check, true);
          if (check.checkBox.A) {
            this.shopShow_hide()      // 动画效果
            this.AddShopingInfo(row,'A') // 添加到购物车
          } else {
            this.badgeNumber--
          }
        } else {
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
            this.AddShopingInfo(row,'B') // 添加到购物车
          } else {
            this.badgeNumber--
          }
        } else {
          this.$refs.multipleTable.toggleRowSelection(check, false);
          this.badgeNumber--
        }
      },
      //点击全选按钮
      handleSelectAll(selection) {
        console.log(selection)
        let number = 0    // 统计全选后取消的行数或A/B面
        if (selection.length !== 0) {
          console.log('number:', number)
          for (let i = 0; i < selection.length; i++) {
            if (selection[i].checkBox.A) {
              console.log('a')
              number++
            }
            if (selection[i].checkBox.B) {
              console.log('b')
              number++
            }
            selection[i].checkBox.A = true
            selection[i].checkBox.B = true
          }
          this.shopShow_hide('all', number)
          //  this.badgeNumber += (this.planList.length *2) - number
        } else {
          for (let i = 0; i < this.planList.length; i++) {
            this.planList[i].checkBox.A = false
            this.planList[i].checkBox.B = false
          }
          this.badgeNumber -= (this.planList.length * 2)
        }
      },
      // 点击确认框后显示详情
      showDetail() {
        console.log(123);
      },
      // 下一步
      next() {
        console.log('planForm', this.planForm)
        if (this.active === 0) {
          this.submitForm('planForm')
        } else if (this.active === 1) {
          this.active++
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
        this.active++;
        /*this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log('submit!');
            this.active++;
          } else {
            console.log('error submit!!');
            return false;
          }
        });*/
      },
      continueCreate() {
        this.active = 0;
        //表单重置
        /*this.planForm.resetFields();*/
      },
      //step3确认修改
      handleClose() {
        this.$message({
          message: '修改成功',
          type: 'success'
        });
        this.changeBill = false;
        this.changeMake = false;
        this.changeAD = false;
      },
      // 添加到购物车
      AddShopingInfo(info,letter) {
        //  alert('1')
        console.log('选中的row信息', info)
        let selectInfo = {
              rid: info.rid,
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
              liveYear:info.liveYear,
              adLimit: info.adLimit,
              checkBox: {A: info.checkBox.A, B: info.checkBox.B},
        }
       console.log(letter)
        if(letter == 'B'){
        //  alert('B')
          selectInfo.A_B = 'B面'
          this.shopingList.push(selectInfo)
        }else{
          selectInfo.A_B = 'A面'
          this.shopingList.push(selectInfo)
        }
      },
      // 购物车删除行
      deleteRow(rows) {
      //  console.log('购物车列表：',list)
      //  this.$refs.multipleTable.toggleRowSelection(rows, false)
        console.log('购物车删除行', rows)
        console.log('删除行id', rows.rid)
        for (let i = 0; i < this.planList.length; i++) {
          if (rows.rid === this.planList[i].rid) {
            console.log('相等的rid', rows.rid)
            if (rows.A_B == 'A面') {
              this.planList[i].checkBox.A = false
              console.log('删除行的 this.planList', this.planList[i])
              if(!this.planList[i].checkBox.B){
                alert('1')
                this.$refs.multipleTable.toggleRowSelection(this.planList[i], false)
              }
              console.log('相等的rid的checkBox.A', this.planList[i].checkBox.A)
              // 删除
              for(let j=0;j<this.shopingList.length;j++){
                if(this.shopingList[j].rid === rows.rid && this.shopingList[j].A_B == 'A面'){
                  this.shopingList.splice(j,1)
                  this.badgeNumber--
                  break
                }
              }
            }else if(rows.A_B == 'B面'){
              this.planList[i].checkBox.B = false
              if(!this.planList[i].checkBox.A){
                alert('2')
                this.$refs.multipleTable.toggleRowSelection(this.planList[i], false)
              }
              // 删除
              for(let j=0;j<this.shopingList.length;j++){
                if(this.shopingList[j].rid === rows.rid  && this.shopingList[j].A_B == 'B面'){
                  this.shopingList.splice(j,1)
                  this.badgeNumber--
                  break
                }
              }
            }
            break
          }
        }
      },
      //修改动画效果及显示隐藏
      shopShow_hide(all, num) {
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
            that.badgeNumber += (that.planList.length * 2) - num
            //   that.badgeNumber++
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
    }
  }
</script>

<style scoped>

  .el-table--scrollable-x .el-table__body-wrapper {
    overflow-x: auto !important;
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
    position: relative;
    top: -2px;
    left: -3px;
  }

  /*日期*/
  /deep/ .el-date-editor .el-range__close-icon {
    line-height: 29px;
  }

  .searchBtn, .map {
    position: relative;
    top: 3px;
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
    margin-top: 8px;
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
    width: 64px;
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
    width: 218px;
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
  @media screen and (min-width: 1440px) {
    .filter-input input {
      border: 1px solid #C2C2C2;
      border-radius: 4px;
      width: 57px;
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
  @media screen and (min-width: 1920px) {
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
