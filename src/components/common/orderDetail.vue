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
                            <img src="../../assets/mediaMana/planlogo.png" alt="">珠江帝景地产三月投放
                            <!--<p>{{cid}}<img src="../../assets/home/bi.png" alt="" @click="changeCID = true"></p>-->
                            <p>{{cid}}<i class="el-icon-edit" @click="changeCID = true" :class="{changeCID:!usableBtn}"></i></p>
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
                            <el-button plain :disabled="usableBtn">生成任务</el-button>
                            <el-button type="primary" :disabled="usableBtn" @click="changePoint">换点</el-button>
                            <!--监播备注对话框-->
                            <el-dialog
                                title="监播备注"
                                :visible.sync="changeRemark"
                                width="30%">
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
                                    <li><span>公司名称：</span><em>杭州市阿里巴巴网络科技有限公司</em></li>
                                    <li><span>事业部：</span><em>市场推广部</em></li>
                                    <li><span>现金结算：</span><em>￥797,142</em></li>
                                    <li><span>公司品牌：</span><em>阿里巴巴</em></li>
                                    <li><span>投放城市：</span><em>广州、深圳</em></li>
                                    <li><span>资源置换：</span><em>￥0</em></li>
                                    <li><span>所属销售：</span><em>周杰伦</em></li>
                                    <li><span>方案备注：</span><em>无</em></li>
                                    <li><span>其他费用：</span><em>￥0</em></li>
                                </ul>
                            </div>
                            <div class="plan-detail-right">
                                <dl>
                                    <dt>状态</dt>
                                    <dd>锁点</dd>
                                </dl>
                                <dl>
                                    <dt>方案金额</dt>
                                    <dd>¥ 1,380,568.08</dd>
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
                                <el-button type="primary" size="small" style="margin-left: 10px" @click="dialogAddPoint = true">添加点位</el-button>
                                <span>原投放面数：40    种植投放面数：1    新增面数：1    现投放面数：40</span>
                            </h4>
                            <div class="table_wrap">
                                <el-table
                                    border
                                    :data="orderList"
                                    style="width: 100%"
                                    :default-sort="{prop: 'recName', order: 'descending'}"
                                    :row-class-name="tableRowClassName"
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
                                        label="资源名称"
                                        min-width="16.1%"
                                        prop="recName"
                                        :filters="[{text: '广州', value: '广州'}, {text: '深圳', value: '深圳'}, {text: '成都', value: '成都'}, {text: '北京', value: '北京'}]"
                                        :filter-method="filterRecName"
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
                                        prop="putAB"
                                        label="投放面"
                                        min-width="8.8%"
                                    >
                                    </el-table-column>
                                    <el-table-column
                                        prop="city"
                                        label="城市"
                                        min-width="6%"
                                        :filters="[{text: '广州', value: '广州'}, {text: '深圳', value: '深圳'}, {text: '成都', value: '成都'}, {text: '北京', value: '北京'}]"
                                        :filter-method="filterCity"
                                    >
                                    </el-table-column>
                                    <el-table-column
                                        prop="origin"
                                        label="区域"
                                        min-width="7.4%"
                                        :filters="[{text: '天河区', value: '天河区'}, {text: '海珠区', value: '海珠区'}, {text: '越秀区', value: '越秀区'}, {text: '白云区', value: '白云区'}]"
                                        :filter-method="filterOrigin"
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
                                        :filters="[{text: '2017.08.30-2017.09.30', value: '2017.08.30-2017.09.30'}, {text: '2017.09.30', value: '2017.09.30'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
                                        :filter-method="filterSchedules"
                                    >
                                    </el-table-column>
                                    <el-table-column
                                        label="操作"
                                        min-width="6.3%"
                                        v-if="showHandel"
                                    >
                                        <template slot-scope="scope">
                                            <el-button type="text" @click="confirmHandel">中止</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <div class="content_bottom_btn" v-if="!showBtn">
                                    <button class="save" @click="saveChangePoint">保存</button>
                                    <button class="cancel">取消</button>
                                </div>
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
                    <el-tab-pane label="报价单" name="second" :disabled="usableBtn">
                        <div class="second-wrap box-wrap">
                            <h4>报价单</h4>
                            <div class="panel">
                                <el-tabs type="border-card" class="baojiadan">
                                    <el-tab-pane label="广州">
                                        <div class="tab-info">
                                            <div class="pqxx">
                                                <h4>排期信息</h4>
                                                <p>2018.03.01-2018.03.28（20面）、2018.04.01-2018.04.28（10面）、2018.05.01-2018.05.28（10面）</p>
                                            </div>
                                            <div class="price">
                                                <div class="price-left">
                                                    <h4>广告费</h4>
                                                    <ul>
                                                        <li>刊例价(面/周) <span>￥1900.00</span></li>
                                                        <li>投放量(面·天) <span>235</span></li>
                                                        <li>赠送(面·天) <span>35</span></li>
                                                        <li>广告费折扣 <span>96.67%</span></li>
                                                        <li>￥3,800,000.00</li>
                                                    </ul>
                                                </div>
                                                <div class="price-right">
                                                    <h4>制作费</h4>
                                                    <ul>
                                                        <li>制作费单价<span>￥100</span></li>
                                                        <li>广告画数量(张)<span>35</span></li>
                                                        <li></li>
                                                        <li>制作费折扣<span>100%</span></li>
                                                        <li>￥3,000.00</li>
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
                                                            <li><p><em>现金结算：</em><span>¥ 88,000,000.00</span></p></li>
                                                            <li><p><em>资源置换：</em><span>¥ 2,000,000.00</span></p></li>
                                                            <li><p><em>其他费用：</em><span>¥ 2,000,000.00</span></p></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div class="bottom-fin">
                                                    <p><em style="top: 5px">总计：</em><span class="totalPrice">¥ 90,000,000.00</span></p>
                                                </div>
                                            </div>
                                        </div>
                                    </el-tab-pane>
                                    <el-tab-pane label="深圳">深圳内容</el-tab-pane>
                                    <el-tab-pane label="成都">成都内容</el-tab-pane>
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
                                        prop="no"
                                        label="序号"
                                        min-width="5.9%">
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
                                        <el-select placeholder="全部社区" v-model="allhouse">
                                            <el-option label="区域一" value="shanghai"></el-option>
                                            <el-option label="区域二" value="beijing"></el-option>
                                        </el-select>
                                        <el-select placeholder="全部监播图" v-model="allPic">
                                            <el-option label="区域一" value="shanghai"></el-option>
                                            <el-option label="区域二" value="beijing"></el-option>
                                        </el-select>
                                        <!--进度条-->
                                        <div class="progress">
                                            <el-progress :percentage="50"></el-progress>
                                            <span>130 / 260</span>
                                        </div>
                                    </div>
                                    <div>
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
                                                    <el-dialog :visible.sync="dialogVisible">
                                                        <img width="100%" :src="dialogImageUrl" alt="">
                                                    </el-dialog>

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
                                                <div class="showimgbox" @click="isShow=true" v-if="isShow==false">
                                                    <i class="fa fa-angle-double-down"></i>
                                                </div>
                                                <div v-if="isShow">
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
													<!-- 是否显示更多的图片上传框关闭 -->
													<div class="showimgbox" @click="isShow=false">
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
                                                    <el-dialog :visible.sync="dialogVisible">
                                                        <img width="100%" :src="dialogImageUrl" alt="">
                                                    </el-dialog>
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
                                                <div class="showimgbox" @click="isShow=true" v-if="isShow==false">
                                                    <i class="fa fa-angle-double-down"></i>
                                                </div>
                                                <div v-if="isShow">
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
													<!-- 是否显示更多的图片上传框关闭 -->
													<div class="showimgbox" @click="isShow=false">
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
                                                    <el-dialog :visible.sync="dialogVisible">
                                                        <img width="100%" :src="dialogImageUrl" alt="">
                                                    </el-dialog>

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
                                                <div class="showimgbox" @click="isShow=true" v-if="isShow==false">
                                                    <i class="fa fa-angle-double-down"></i>
                                                </div>
                                                <div v-if="isShow">
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
													<!-- 是否显示更多的图片上传框关闭 -->
													<div class="showimgbox" @click="isShow=false">
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
                                                    <el-dialog :visible.sync="dialogVisible">
                                                        <img width="100%" :src="dialogImageUrl" alt="">
                                                    </el-dialog>

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
                                                <div class="showimgbox" @click="isShow=true" v-if="isShow==false">
                                                    <i class="fa fa-angle-double-down"></i>
                                                </div>
                                                <div v-if="isShow">
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
													<!-- 是否显示更多的图片上传框关闭 -->
													<div class="showimgbox" @click="isShow=false">
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
                                                    <el-dialog :visible.sync="dialogVisible">
                                                        <img width="100%" :src="dialogImageUrl" alt="">
                                                    </el-dialog>
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
                                                    <el-dialog :visible.sync="dialogVisible">
                                                        <img width="100%" :src="dialogImageUrl" alt="">
                                                    </el-dialog>

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
                                            <el-button plain>复制链接</el-button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="下刊报告" name="fifth" :disabled="usableBtn">
                        <div class="fifth-wrap box-wrap">
                            <h4>报价单</h4>
                            <div class="panel">
                                <el-tabs type="border-card" class="baojiadan">
                                    <el-tab-pane label="广州">
                                        <div class="tab-info">
                                            <div class="pqxx">
                                                <h4>排期信息</h4>
                                                <p>2018.03.01-2018.03.28（20面）、2018.04.01-2018.04.28（10面）、2018.05.01-2018.05.28（10面）</p>
                                            </div>
                                        <div class="price">
                                            <div class="price-left">
                                                <h4>广告费</h4>
                                                <ul>
                                                    <li>刊例价(面/周) <span>￥1900.00</span></li>
                                                    <li>投放量(面·天) <span>235</span></li>
                                                    <li>赠送(面·天) <span>35</span></li>
                                                    <li>广告费折扣 <span>96.67%</span></li>
                                                    <li>￥3,800,000.00</li>
                                                </ul>
                                            </div>
                                            <div class="price-right">
                                                <h4>制作费</h4>
                                                <ul>
                                                    <li>制作费单价<span>￥100</span></li>
                                                    <li>广告画数量(张)<span>35</span></li>
                                                    <li></li>
                                                    <li>制作费折扣<span>100%</span></li>
                                                    <li>￥3,000.00</li>
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
                                                        <li><p><em>现金结算：</em><span>¥ 88,000,000.00</span></p></li>
                                                        <li><p><em>资源置换：</em><span>¥ 2,000,000.00</span></p></li>
                                                        <li><p><em>其他费用：</em><span>¥ 2,000,000.00</span></p></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div class="bottom-fin">
                                                <p><em style="top: 5px">总计：</em><span class="totalPrice">¥ 90,000,000.00</span></p>
                                            </div>
                                        </div>
                                        </div>
                                    </el-tab-pane>
                                    <el-tab-pane label="深圳">深圳内容</el-tab-pane>
                                    <el-tab-pane label="成都">成都内容</el-tab-pane>
                                </el-tabs>
                            </div>
                        </div>
                    </el-tab-pane>
                </el-tabs>
                <div class="content_bottom_btn">
                    <button class="back">返回</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
	name: "planDetail",
	data() {
		return {
			isShow:false,
			//添加点位
			dialogAddPoint:false,
			dateInput:'',
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
			//添加点位列表
			planList: [
				{
				recName: '珠江帝景花园',
				city: '广州',
				origin: '海珠区',
				buildType: '高端住宅',
				houseNum: '600',
				buildPrice: '￥30,000',
				mediaName:'广州市中山大道',
				buildNum: '12',
				schedules: '2017.08.30-2017.09.30',
				businessOrigin: '白云万达广场',
				assetID: 'GZ201871024',
				liveYear: '1999年',
				adLimit: '地产/医药/汽车'
				},{
				recName: '珠江帝景花园',
				city: '广州',
				origin: '海珠区',
				buildType: '高端住宅',
				houseNum: '600',
				buildPrice: '￥30,000',
				mediaName:'广州市中山大道',
				buildNum: '12',
				schedules: '2017.08.30-2017.09.30',
				businessOrigin: '白云万达广场',
				assetID: 'GZ201871024',
				liveYear: '1999年',
				adLimit: '地产/医药/汽车'
				},{
				recName: '珠江帝景花园',
				city: '广州',
				origin: '海珠区',
				buildType: '高端住宅',
				houseNum: '600',
				buildPrice: '￥30,000',
				mediaName:'广州市中山大道',
				buildNum: '12',
				schedules: '2017.08.30-2017.09.30',
				businessOrigin: '白云万达广场',
				assetID: 'GZ201871024',
				liveYear: '1999年',
				adLimit: '地产/医药/汽车'
				},{
				recName: '珠江帝景花园',
				city: '广州',
				origin: '海珠区',
				buildType: '高端住宅',
				houseNum: '600',
				buildPrice: '￥30,000',
				mediaName:'广州市中山大道',
				buildNum: '12',
				schedules: '2017.08.30-2017.09.30',
				businessOrigin: '白云万达广场',
				assetID: 'GZ201871024',
				liveYear: '1999年',
				adLimit: '地产/医药/汽车'
				},{
				recName: '珠江帝景花园',
				city: '广州',
				origin: '海珠区',
				buildType: '高端住宅',
				houseNum: '600',
				buildPrice: '￥30,000',
				mediaName:'广州市中山大道',
				buildNum: '12',
				schedules: '2017.08.30-2017.09.30',
				businessOrigin: '白云万达广场',
				assetID: 'GZ201871024',
				liveYear: '1999年',
				adLimit: '地产/医药/汽车'
				},{
				recName: '珠江帝景花园',
				city: '广州',
				origin: '海珠区',
				buildType: '高端住宅',
				houseNum: '600',
				buildPrice: '￥30,000',
				mediaName:'广州市中山大道',
				buildNum: '12',
				schedules: '2017.08.30-2017.09.30',
				businessOrigin: '白云万达广场',
				assetID: 'GZ201871024',
				liveYear: '1999年',
				adLimit: '地产/医药/汽车'
				},{
				recName: '珠江帝景花园',
				city: '广州',
				origin: '海珠区',
				buildType: '高端住宅',
				houseNum: '600',
				buildPrice: '￥30,000',
				mediaName:'广州市中山大道',
				buildNum: '12',
				schedules: '2017.08.30-2017.09.30',
				businessOrigin: '白云万达广场',
				assetID: 'GZ201871024',
				liveYear: '1999年',
				adLimit: '地产/医药/汽车'
				},{
				recName: '珠江帝景花园',
				city: '广州',
				origin: '海珠区',
				buildType: '高端住宅',
				houseNum: '600',
				buildPrice: '￥30,000',
				mediaName:'广州市中山大道',
				buildNum: '12',
				schedules: '2017.08.30-2017.09.30',
				businessOrigin: '白云万达广场',
				assetID: 'GZ201871024',
				liveYear: '1999年',
				adLimit: '地产/医药/汽车'
				},{
				recName: '珠江帝景花园',
				city: '广州',
				origin: '海珠区',
				buildType: '高端住宅',
				houseNum: '600',
				buildPrice: '￥30,000',
				mediaName:'广州市中山大道',
				buildNum: '12',
				schedules: '2017.08.30-2017.09.30',
				businessOrigin: '白云万达广场',
				assetID: 'GZ201871024',
				liveYear: '1999年',
				adLimit: '地产/医药/汽车'
				},{
				recName: '珠江帝景花园',
				city: '广州',
				origin: '海珠区',
				buildType: '高端住宅',
				houseNum: '600',
				buildPrice: '￥30,000',
				mediaName:'广州市中山大道',
				buildNum: '12',
				schedules: '2017.08.30-2017.09.30',
				businessOrigin: '白云万达广场',
				assetID: 'GZ201871024',
				liveYear: '1999年',
				adLimit: '地产/医药/汽车'
				},{
				recName: '珠江帝景花园',
				city: '广州',
				origin: '海珠区',
				buildType: '高端住宅',
				houseNum: '600',
				buildPrice: '￥30,000',
				mediaName:'广州市中山大道',
				buildNum: '12',
				schedules: '2017.08.30-2017.09.30',
				businessOrigin: '白云万达广场',
				assetID: 'GZ201871024',
				liveYear: '1999年',
				adLimit: '地产/医药/汽车'
				},{
				recName: '珠江帝景花园',
				city: '广州',
				origin: '海珠区',
				buildType: '高端住宅',
				houseNum: '600',
				buildPrice: '￥30,000',
				mediaName:'广州市中山大道',
				buildNum: '12',
				schedules: '2017.08.30-2017.09.30',
				businessOrigin: '白云万达广场',
				assetID: 'GZ201871024',
				liveYear: '1999年',
				adLimit: '地产/医药/汽车'
				},{
				recName: '珠江帝景花园',
				city: '广州',
				origin: '海珠区',
				buildType: '高端住宅',
				houseNum: '600',
				buildPrice: '￥30,000',
				mediaName:'广州市中山大道',
				buildNum: '12',
				schedules: '2017.08.30-2017.09.30',
				businessOrigin: '白云万达广场',
				assetID: 'GZ201871024',
				liveYear: '1999年',
				adLimit: '地产/医药/汽车'
				},{
				recName: '珠江帝景花园',
				city: '广州',
				origin: '海珠区',
				buildType: '高端住宅',
				houseNum: '600',
				buildPrice: '￥30,000',
				mediaName:'广州市中山大道',
				buildNum: '12',
				schedules: '2017.08.30-2017.09.30',
				businessOrigin: '白云万达广场',
				assetID: 'GZ201871024',
				liveYear: '1999年',
				adLimit: '地产/医药/汽车'
				},{
				recName: '珠江帝景花园',
				city: '广州',
				origin: '海珠区',
				buildType: '高端住宅',
				houseNum: '600',
				buildPrice: '￥30,000',
				mediaName:'广州市中山大道',
				buildNum: '12',
				schedules: '2017.08.30-2017.09.30',
				businessOrigin: '白云万达广场',
				assetID: 'GZ201871024',
				liveYear: '1999年',
				adLimit: '地产/医药/汽车'
				}],
			//详情按钮
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
			//选点排期
			orderList: [
				{
					recName: '珠江帝景花园',
					city: '广州',
					origin: '海珠区',
					buildType: '高端住宅',
					houseNum: '600',
					buildPrice: '￥30,000',
					mediaName: '广州市中山大道',
					putAB: 'A面',
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
					putAB: 'A面',
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
					putAB: 'A面',
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
					putAB: 'A面',
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
					putAB: 'A面',
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
					putAB: 'A面',
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
					putAB: 'A面',
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
					putAB: 'A面',
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
					putAB: 'A面',
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
					putAB: 'A面',
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
					putAB: 'A面',
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
					putAB: 'A面',
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
					putAB: 'A面',
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
					putAB: 'A面',
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
					putAB: 'A面',
					buildNum: '12',
					schedules: '2017.08.30-2017.09.30',
					businessOrigin: '白云万达广场',
					assetID: 'GZ201871024',
					liveYear: '1999年',
					adLimit: '地产/医药/汽车'
			}],
			//选点排期标题
			showTitle:false,
			//选点排期按钮
			showBtn:true,
			//选点排期操作
			showHandel:false,
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
    methods: {
      filterRecName(value, row) {
        return row.recName === value;
      },
      filterCity(value, row) {
        return row.city === value;
      },
      filterOrigin(value, row) {
        return row.origin === value;
      },
      filterSchedules(value, row) {
        return row.schedules === value;
      },
      //已锁状态资源加红色背景并置顶
      tableRowClassName({row, rowIndex}) {
        //状态行 根据状态判断
        if (rowIndex === 0) {
          //添加类名
          return 'warning-row'
        }
        return '';
      },
      cancelChangeID() {
        this.changeCID = false;
        this.$message('取消修改合同编号');
      },
      confirmChangeID() {
        this.cid = this.CIDinput;
        this.changeCID = false;
        this.$message.success('修改合同编号成功');
      },
      cancelChangeRemark() {
        this.changeRemark = false;
        this.$message('取消修改监播备注');
      },
      confirmChangeRemark() {
        this.changeRemark = false;
        this.$message.success('修改监播备注成功');
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
        this.usableBtn = true;
        $(window).scrollTop(288);
        this.showTitle = true;
        this.showBtn = false;
        this.showHandel = true;
      },
      saveChangePoint(){
        this.usableBtn = false;
        this.showTitle = false;
        this.showBtn = true;
        this.showHandel = false;
      },
      //确认操作对话框
      confirmHandel() {
        let recName  = this.orderList[0].recName;
        let schedules = this.orderList[0].schedules;
        this.$confirm('是否停止 '+recName +' 在 '+schedules +' 的投放？\n','提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '操作成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
      },
      //添加点位对话框确认按钮
      confirmAddPoint(){
        this.dialogAddPoint = false;
        this.$message({
          type:'success',
          message:'操作成功!'
        })
      },
      //添加点位对话框取消按钮
      cancelAddPoint(){
        this.dialogAddPoint = false;
        this.$message({
          type: 'info',
          message: '已取消操作'
        });
      }
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
  /deep/ .el-table th, .el-table tr{
    height: 44px;
  }

  /deep/ .el-form-item__content {
    line-height: 46px;
  }

  /deep/ .el-form-item__label {
    padding: 0 0 0 12px;
  }

  .table_wrap {
    padding: 28px;
  }

  /deep/ .el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: #ecf5ff;
  }

  /deep/ .el-tabs__item.is-active {
    font-weight: bold;
  }

  /*报价单*/

  /deep/ .el-tabs--border-card {
    box-shadow: none;
  }

  /deep/ .el-tabs--border-card > .el-tabs__content {
    padding: 40px;
  }

  .panel {
    padding: 20px;
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
    border-right: 2px dashed #D8D8D8;
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
    border-bottom: 2px dashed #D8D8D8;
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
    padding-left: 41px;
  }

  .plan-detail-left ul {
    width: 81%;
    float: left;
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

  .plan-detail-right dl {
    float: left;
    text-align: right;
  }

  .plan-detail-right dl:last-of-type {
    margin-left: 34px;
  }

  .plan-detail-right dt {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
  }

  .plan-detail-right dd {
    margin-top: 4px;
    display: inline-block;
    font-size: 20px;
    color: rgba(0, 0, 0, 0.85);
  }

  /*物料信息*/
  /deep/ .el-table_2_column_16 .cell {
    text-align: right;
    padding-right: 20px;
  }

  /*上刊报告*/
  .up-loader-header {
    position: relative;
  }

  .progress {
    float: right;
  }

.showimgbox{
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

  .up-loader-Imgpanel {
    width: 390px;
    /*height: 270px;*/
    margin-top: 11px;
    display: inline-block;
  }

  .up-loader-Imgpanel + .up-loader-Imgpanel {
    margin-left: 2px;
  }

  .up-loader-Imgpanel:nth-child(4) {
    margin-left: 0;
  }

  /*上传图片*/
  /deep/ .el-card__body{
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
    margin-top: 18px;
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

  .up-report-bottom {
    text-align: center;
    margin-top: 20px;
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
    outline: none;
    cursor: pointer;
    border: 1px solid #D9D9D9;
    border-radius: 2px;
    background: #FFFFFF;
    font-size: 14px;
    color: #666666;
  }

  /*选点排期保存返回按钮*/
  .content_bottom_btn .save{
    background: #1890FF;
    color: #fff;
  }
  .content_bottom_btn .cancel{
    border: none;
    background-color: #fff;
  }
  /*换点表格*/
  /deep/ .el-table td, .el-table th{
    padding: 4px 0;
    height: 48px;
  }
  /*添加点位对话框*/
  /deep/ .el-dialog{
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

  /deep/ .el-table_3_column_26  , /deep/ .el-table_3_column_27, /deep/ .el-table_1_column_9,  .el-table_1_column_18, /deep/ .el-table_2_column_19{
    text-align: right;
  }

  /deep/.table_wrap.car-list{
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



  /*1440*/
  @media screen and (min-width: 1440px) {
    .tab-info .price h4 {
      width: 92%;
    }

    .up-loader-Imgpanel + .up-loader-Imgpanel {
      margin-left: 39px;
    }

    .up-loader-Imgpanel:nth-child(4) {
      margin-left: 0;
    }
  }

  /*1920*/
  @media screen and (min-width: 1920px) {
    .tab-info .price h4 {
      width: 94%;
    }

    .plan-detail-left ul li:nth-child(3n-2) {
      width: 500px;
    }

    .plan-detail-left ul li:nth-child(3n-1) {
      width: 400px;
    }

    .up-loader-Imgpanel + .up-loader-Imgpanel {
      margin-left: 54px;
    }

    .up-loader-Imgpanel:nth-child(5) {
      margin-left: 0;
    }

  }

</style>
