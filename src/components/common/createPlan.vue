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
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="公司名称：" prop="companyName">
                <el-select v-model="planForm.companyName" placeholder="请选择公司名称">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="公司品牌：" prop="companyBrand">
                <el-select v-model="planForm.companyBrand" placeholder="请选择公司品牌">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
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
              </el-form-item>
              <el-form-item label="事业部：" prop="ownerBU">
                <el-select v-model="planForm.ownerBU" placeholder="请选择所属事业部">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="备注：" prop="planRemark">
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
                  <el-badge :value="12" class="item">
                    <img src="../../assets/home/shopCar.png" alt="">
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
           <!-- &lt;!&ndash;筛选标签&ndash;&gt;
            <div class="filter-tags">
              <div class="tags">
                <span>资源类型：</span>
                <em>社区</em>
                <i class="close-tags">×</i>
              </div>
              <div class="tags">
                <span>媒体类型：</span>
                <em>社区广告门</em>
                <i class="close-tags">×</i>
              </div>
              <div class="tags">
                <span>城市区域：</span>
                <em>广州<em>全市</em></em>
                <i class="close-tags">×</i>
              </div>
              <div class="tags">
                <span>住户数量：</span>
                <em>300<em>-</em>3000</em>
                <i class="close-tags">×</i>
              </div>
              <el-button type="text" style="margin-left: -10px" class="clear-filter">清空筛选</el-button>
            </div>-->
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
                  min-width="14.1%"
                  prop="recName"
                >
                </el-table-column>
                <el-table-column
                  prop="city"
                  label="城市"
                  min-width="7%"
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
                  min-width="8.3%"
                  class="tar"
                >
                </el-table-column>
                <el-table-column
                  prop="buildPrice"
                  label="楼盘价格"
                  min-width="8.3%"
                >
                </el-table-column>
                <el-table-column
                  prop="buildNum"
                  label="楼栋数量"
                  min-width="8.3%"
                  class="tar"
                >
                </el-table-column>
                <el-table-column
                  prop="schedules"
                  label="排期"
                  min-width="16.2%"
                >
                </el-table-column>
                <el-table-column width="132px">
                  <template slot-scope="scope">
                      <el-checkbox>A面</el-checkbox>
                      <el-checkbox>B面</el-checkbox>
                  </template>
                </el-table-column>
              </el-table>
             <!-- <div>
                <div class="thead tt">
                  <ul>
                    <li style="width:41px;">
                      <el-checkbox></el-checkbox>
                    </li>
                    <li style="min-width:14.1%">资源名称</li>
                    <li style="min-width:7%">城市</li>
                    <li style="min-width:7.4%">区域</li>
                    <li style="min-width:8.8%">楼盘类型</li>
                    <li style="min-width:8.3%">小区户数</li>
                    <li style="min-width:8.3%">楼盘价格</li>
                    <li style="min-width:8.3%">楼栋数量</li>
                    <li style="min-width:16.2%">排期</li>
                    <li style="width:160px; border-right: none"></li>
                  </ul>
                </div>
                <div class="tbody tt">
                  <div v-for="item in planList">
                    <ul class="tr">
                      <li>
                        <el-checkbox @click="showDetail"></el-checkbox>
                      </li>
                      <li>{{item.recName}}</li>
                      <li>{{item.city}}</li>
                      <li>{{item.origin}}</li>
                      <li>{{item.buildType}}</li>
                      <li style="text-align: right">{{item.houseNum}}</li>
                      <li>{{item.buildPrice}}</li>
                      <li style="text-align: right">{{item.buildNum}}</li>
                      <li>{{item.schedules}}</li>
                      <li style="border-right: none">
                        <div>
                          <el-checkbox>A面</el-checkbox>
                          <el-checkbox>B面</el-checkbox>
                        </div>
                      </li>
                    </ul>
                    <div class="tr-txt">
                      <p><span>商圈：</span> <em>{{item.businessOrigin}}</em></p>
                      <p><span>资产编号：</span> <em>{{item.assetID}}</em></p>
                      <p><span>入住年份：</span> <em>{{item.liveYear}}</em></p>
                      <p><span>广告限制：</span> <em>地产</em>/<em>医药</em>/<em>汽车</em></p>
                    </div>
                  </div>
                </div>
              </div>-->
            </div>
            <!--购物车-->
            <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
                <template slot-scope="scope">
                  <div class="table_wrap car-list" style="margin-top: 60px" :visible.sync="dialogTableVisible">
                    <div class="car-title">
                      <h4>已选1000个媒体 <p>投放2000面</p> <span>清空已选</span></h4>
                    </div>
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
                        min-width="14.1%"
                        prop="recName"
                      >
                      </el-table-column>

                      <el-table-column
                        prop="city"
                        label="城市"
                        min-width="6.5%"
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
                        min-width="8.3%"
                      >
                      </el-table-column>
                      <el-table-column
                        prop="buildPrice"
                        label="楼盘价格"
                        min-width="8.3%"
                      >
                      </el-table-column>
                      <el-table-column
                        prop="buildNum"
                        label="楼栋数量"
                        min-width="8.0%"
                      >
                      </el-table-column>
                      <el-table-column
                        prop="schedules"
                        label="排期"
                        min-width="16.2%"
                      >
                      </el-table-column>
                      <el-table-column width="52px">
                        <template slot-scope="scope">
                          <span>B面</span>
                        </template>
                      </el-table-column>
                      <el-table-column width="52px">
                        <template slot-scope="scope">
                          <span style="cursor: pointer;color: #1890ff">删除</span>
                        </template>
                      </el-table-column>
                    </el-table>
                    <!-- <div>
                       <div class="thead tt">
                         <ul>
                           <li style="width:41px;">
                             <el-checkbox></el-checkbox>
                           </li>
                           <li style="min-width:14.1%">资源名称</li>
                           <li style="min-width:7%">城市</li>
                           <li style="min-width:7.4%">区域</li>
                           <li style="min-width:8.8%">楼盘类型</li>
                           <li style="min-width:8.3%">小区户数</li>
                           <li style="min-width:8.3%">楼盘价格</li>
                           <li style="min-width:8.3%">楼栋数量</li>
                           <li style="min-width:16.2%">排期</li>
                           <li style="width:160px; border-right: none"></li>
                         </ul>
                       </div>
                       <div class="tbody tt">
                         <div v-for="item in planList">
                           <ul class="tr">
                             <li>
                               <el-checkbox @click="showDetail"></el-checkbox>
                             </li>
                             <li>{{item.recName}}</li>
                             <li>{{item.city}}</li>
                             <li>{{item.origin}}</li>
                             <li>{{item.buildType}}</li>
                             <li style="text-align: right">{{item.houseNum}}</li>
                             <li>{{item.buildPrice}}</li>
                             <li style="text-align: right">{{item.buildNum}}</li>
                             <li>{{item.schedules}}</li>
                             <li style="border-right: none">
                               <div>
                                 <el-checkbox>A面</el-checkbox>
                                 <el-checkbox>B面</el-checkbox>
                               </div>
                             </li>
                           </ul>
                           <div class="tr-txt">
                             <p><span>商圈：</span> <em>{{item.businessOrigin}}</em></p>
                             <p><span>资产编号：</span> <em>{{item.assetID}}</em></p>
                             <p><span>入住年份：</span> <em>{{item.liveYear}}</em></p>
                             <p><span>广告限制：</span> <em>地产</em>/<em>医药</em>/<em>汽车</em></p>
                           </div>
                         </div>
                       </div>
                     </div>-->
                  </div>
                </template>
            </el-dialog>
          </div>
        </div>
        <div class="step3" v-if="active==2">
          <div class="confirmBox">
            <el-tabs type="border-card">
              <el-tab-pane label="广州">
                <div class="bill-panel">
                  <div class="bill-top">
                    <div class="bill-top-left">
                      <div class="bill-title">
                        <h2>珠江帝景地产三月份投放</h2>
                        <p>广州市视传文化传播有限公司</p>
                        <p>珠江帝景</p>
                      </div>
                      <div class="put-info title">
                        <h3>
                          投放信息
                          <button>修改</button>
                        </h3>
                        <ul>
                          <li><h4>投放城市</h4>
                            <p>广州</p></li>
                          <li><h4>投放面数</h4>
                            <p>100面(赠送10面)</p></li>
                          <li><h4>投放周期</h4>
                            <p>12周0天(赠送0天0面)</p></li>
                          <li class="jtpq"><h4>具体排期</h4>
                            <p>2018.03.01-2018.03.28（4周0天）</p>
                            <p>2018.04.01-2018.04.28（4周0天）</p>
                            <p>2018.05.01-2018.05.28（4周0天）</p>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div class="bill-top-right ">
                      <div class="ad title">
                        <h3>
                          广告费
                          <button>修改</button>
                        </h3>
                        <ul class="adPrice">
                          <li>刊例价 <span>￥1900.00/周/面</span></li>
                          <li>广告费折扣 <span>100%</span></li>
                          <li><span class="total">￥3,800,000.00</span></li>
                        </ul>
                      </div>
                      <div class="make title">
                        <h3>
                          制作费
                          <button>修改</button>
                        </h3>
                        <ul class="makePrice">
                          <li>广告画制作费 <span>￥100/张</span></li>
                          <li>结算制作费折扣 <span>100%</span></li>
                          <li>赠送制作费折扣 <span>100%</span></li>
                          <li><span class="total">￥3,800,000.00</span></li>
                        </ul>
                        <div class="all-total">
                          合计
                          <h3>￥76,00,000.00</h3>
                        </div>
                      </div>

                    </div>
                  </div>
                  <div class="bill-bottom">

                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="深圳">深圳内容</el-tab-pane>
              <el-tab-pane label="成都">成都内容</el-tab-pane>
            </el-tabs>
          </div>
        </div>
        <div class="step4" v-if="active==3">
          <div class="createSuccess">
            <div class="successIcon">
              <img src="../../assets/home/createSuccess.png" alt="">
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
      <el-button style="margin-top: 12px; background-color: #fff; color: #666666; border: 1px solid #d9d9d9"
                 @click="prev" v-if="active!=3" type="primary">上一步
      </el-button>
      <el-button style="margin-top: 12px;" @click="next" v-if="active!=3" type="primary">下一步</el-button>

      <div class="finishBtn" v-if="active==3">
        <button class="create" @click="continueCreate">继续创建</button>
        <button class="cancel">查看订单</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "createPlan",
    data() {
      return {
        //step1投放城市
        throwCity:[{
          value: '广州',
          label: '广州'
        }, {
          value: '北京',
          label: '北京'
        }, {
          value: '上海',
          label: '上海'
        }, {
          value: '成都',
          label: '成都'
        }],
        //购物车
        // carShow:false,
        dialogTableVisible: false,
        //选中
        checkAB:true,
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
        buildValue:'',
        //搜索框
        searchInput: '',
        planSelect: '',
        //步骤
        active: 0,
        dateInput: '',
        //setp1创建方案表单
        planForm: {
          planName: '',
          ownerSales: '',
          companyName: '',
          companyBrand: '',
          throwCity:'',
          ownerBU: '',
          planRemark: ''
        },
        planRules: {
          planName: [
            {required: true, message: '方案名称不能为空', trigger: 'blur'},
            {max: 50, message: '最多只能输入40个字节', trigger: 'blur'}
          ],
          ownerSales: [
            {required: true, message: '所属销售不能为空', trigger: 'change'},
          ],
          companyName: [
            {required: true, message: '公司名称不能为空', trigger: 'change'},
          ],
          companyBrand: [
            {required: true, message: '公司品牌不能为空', trigger: 'change'},
          ],

        },
        //step2列表
        planList: [{
          recName: '珠江帝景花园',
          city: '广州',
          origin: '海珠区',
          buildType: '高端住宅',
          houseNum: '600',
          buildPrice: '￥30,000',
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
          buildNum: '12',
          schedules: '2017.08.30-2017.09.30',
          businessOrigin: '白云万达广场',
          assetID: 'GZ201871024',
          liveYear: '1999年',
          adLimit: '地产/医药/汽车'
        }],

      };
    },
    mounted:function(){
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
          // $(this).parents('.input-wrap').removeClass('focus');
          // $(this).siblings('button').hide();
        });

        $('.content_top_wrap').on('click', '.close-tags', function () {
          // $(this).parents('.tags').hide();
        });
        $('.content_top_wrap').on('click', '.clear-filter', function () {
          // $(this).parents('.filter-tags').hide();
        })

      })
    },
    methods: {
      //点击确认框后显示详情
      showDetail(){
        console.log(123);
      },
      next() {
        this.active++;
        if (this.active > 2) {
          // this.active = 0;
        }
      },
      prev() {
        this.active--;
        if (this.active < 1) {
          this.active = 0;
        }
      },
      continueCreate() {
        this.active = 0;
        //表单重置
        /*this.planForm.resetFields();*/
      },
    }
  }

</script>

<style scoped>

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
    margin-left: -6px;
  }

  /deep/ .date-select.el-input__inner {
    width: 237px;
    position: relative;
    top: 3px;
    left: -5px;
  }

  /deep/ .el-date-editor .el-range__icon {
    position: relative;
    top: -2px;
    left: -3px;
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
    width:59px;
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

  .el-button + .el-button {
    margin-left: 28px;
  }
  .searchBtn.el-button + .el-button{
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
   /deep/ .el-table th, .el-table tr{
     background: #F7F7F7;
     padding: 10px 0;
   }
   /deep/ .el-table th>.cell{
     color: #666666;
     line-height: 14px;
     font-weight: bold;
   }
   /deep/ .el-checkbox+.el-checkbox{
     margin-left: 10px;
   }
   /deep/ .el-table__expanded-cell[class*=cell]{
     padding: 0 86px;
     background-color: #F7F7F7;;
   }
  /deep/ .el-table__expanded-cell[class*=cell] .el-form{
    height: 44px;
    line-height: 44px;
  }
  /deep/ .el-form-item__content{
    line-height: 46px;
  }
  /deep/ .el-form-item__label{
    padding: 0 0 0 12px;
  }

  /deep/ .tar .cell {
    text-align: right !important;
    padding-right: 10px;
  }
  /*滚动条*/
  /deep/ .el-table__body-wrapper{
    height: 480px;
    overflow-y: scroll;
    overflow-x: hidden;
  }
  /deep/ .el-table__body-wrapper::-webkit-scrollbar{
    width: 4px;
    background: #FAFAFA;

  }
  /deep/ .el-table__body-wrapper::-webkit-scrollbar-thumb {/*滚动条里面小方块*/

    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: #C1C1C1;
    border-radius: 4px;
  }
  /deep/ .el-form--inline .el-form-item{
    margin-right: 45px;
  }
  /deep/ .el-dialog{
    width: 1000px;
  }


  /*.table_wrap .thead {
    width: 100%;
  }

  .thead ul {
    height: 44px;
  }

  .tt ul li {
    float: left;
  }

  .table_wrap > div {
    border: 1px solid #E9E9E9;
    border-radius: 4px;
    border-bottom: none;
  }

  .table_wrap .tt {
    border-bottom: 1px solid #e9e9e9;
    background: #F7F7F7;
    width: 100%;
  }

  .table_wrap .thead.tt {

  }

  .tt ul li {
    height: 44px;
    line-height: 44px;
    float: left;
    font-size: 14px;
    color: #666666;
    font-weight: bold;
    padding: 0 14px;
    box-sizing: border-box;
    border-right: 1px solid #e9e9e9;
  }

  /deep/ .el-checkbox + .el-checkbox {
    margin-left: 10px;
  }

  .tbody .tr li {
    font-weight: normal;
    background-color: #fff;
  }

  .tbody .tr /deep/ .el-checkbox-group {
    height: 42px;
  }

  .tbody .tr-txt, .tr {
    height: 44px;
    line-height: 44px;
    border-bottom: 1px solid #e9e9e9;
  }

  .tbody .tr-txt {
    font-size: 14px;
    color: #666666;
    padding-left: 55px;
  }

  .tbody .tr-txt p {
    display: inline-block;
    margin-right: 24px;
  }

  .tbody .tr li:nth-of-type(1) {
    width: 3.5%;
  }

  .tbody .tr li:nth-of-type(2) {
    width: 14.1%;
  }

  .tbody .tr li:nth-of-type(3) {
    width: 7.1%;
  }

  .tbody .tr li:nth-of-type(4) {
    width: 7.4%;
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
    width: 8.3%;
  }

  .tbody .tr li:nth-of-type(9) {
    width: 16.2%;
  }

  .tbody .tr li:nth-of-type(10) {
    width: 211px;
  }

  !*滚动条*!
  .table_wrap .tbody {
    height: 441px;
    overflow-y: scroll;
  }

  .table_wrap .tbody::-webkit-scrollbar {
    width: 4px;
    background: #FAFAFA;
  }

  .table_wrap .tbody::-webkit-scrollbar-thumb {
    background: #C1C1C1;
    border-radius: 4px;
  }*/

  /*购物车列表*/
  .car-title{
    margin-bottom: 10px;
  }
  .car-title h4{
    font-size: 16px;
    font-weight: bold;
    display: inline-block;
  }
  .car-title p{
    font-size: 14px;
    font-weight: normal;
    display: inline-block;
    margin-left: 10px;
  }
  .car-title span{
    font-size: 14px;
    font-weight: normal;
    margin-left: 10px;
    cursor: pointer;
    color: #1890ff;
  }
  .car-del{
    text-align: center;
    cursor: pointer;
    color: #1890ff;
  }
  /deep/.car-list .el-table__expanded-cell[class*=cell]{
    padding: 0 46px;
    background-color: #F7F7F7;;
  }

  /deep/ .el-table_1_column_7, /deep/ .el-table_1_column_8, /deep/ .el-table_1_column_9, /deep/ .el-table_2_column_17, /deep/ .el-table_1_column_18, /deep/ .el-table_2_column_19{
    text-align: right;
  }

  /deep/.table_wrap.car-list{
    margin-top: 0 !important;
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
    border-left: 2px solid #465D89;
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
    border-radius: 2px;
    font-size: 14px;
    border: none;
    color: #ffffff;
  }

  .content_bottom_btn button.cancel {
    background: #ffffff;
    font-size: 14px;
    color: #666666;
    border: 1px solid #D9D9D9;
    border-radius: 2px;
    margin-left: 10px;
  }

  /*下一步按钮*/
  /deep/ .el-button--primary {
    background-color: #108EE9;
    border-color: #108EE9;
  }

  /deep/ .map.el-button--primary{
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
  /deep/ .el-form.demo-ruleForm{
    width: 416px;
    margin:  0 auto;
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

  /*确认报价单*/
  .bill-top-left {
    width: 49%;
    float: left;
    padding-right: 35px;
    margin-right: 35px;
    border-right: 2px dashed #D8D8D8;
  }

  .bill-panel {
    padding: 47px 60px;
  }

  .bill-title {
    margin-bottom: 20px;
  }

  .bill-title h2 {
    font-size: 18px;
    color: #333333;
    font-weight: bold;
    margin-bottom: 6px;
  }

  .bill-title p {
    font-size: 14px;
    color: #666666;
    margin-bottom: 4px;
  }

  .title h3 {
    background: #FAFAFA;
    border-radius: 2px;
    height: 34px;
    width: 100%;
    line-height: 34px;
    font-size: 16px;
    color: #333333;
    font-weight: bold;
    margin-bottom: 24px;
  }

  .title button {
    background: #E6F1FC;
    border: 1px solid #A3D0FD;
    border-radius: 4px;
    font-size: 12px;
    color: #1989FA;
    width: 50px;
    height: 24px;
    float: right;
    position: relative;
    top: 5px;
    right: 15px;
    outline: none;
    cursor: pointer;
  }

  .put-info ul li {
    margin-bottom: 12px;
  }

  .put-info ul li h4 {
    font-size: 16px;
    color: #666666;
    margin-bottom: 6px;
    font-weight: bold;
  }

  .put-info ul li p {
    font-size: 14px;
    color: #666666;
  }

  .put-info ul li.jtpq p {
    margin-bottom: 6px;
  }

  .bill-top-right {
    overflow: hidden;
    margin-left: 65px;

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

    .el-button + .el-button {
      margin-left: 40px;
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

    .filter-input .input-wrap .el-button--mini {
      left: 43px;
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
