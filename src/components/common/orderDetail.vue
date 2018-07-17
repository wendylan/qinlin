<template>
    <div>
        <div class="ad_mediaMana_wrap">
            <div class="ad_mediaMana_nav clearfix">
                <p>
                    <a href="#">订单管理</a>
                    <em> / </em>
                    <a href="#">订单详情</a>
                </p>
            </div>
            <!--资源信息-->
            <div class="mediaMana_content_top">
                <div class="content_top_wrap" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
                    <div class="plan-title">
                        <h4>
                            <img src="../../assets/images/planlogo.png" alt="">{{orderDetail.apName}}
                            <p>{{orderDetail.apQC}}
                                <i class="el-icon-edit" v-if="(role=='MD')" @click="changeCID = true" :class="{changeCID:!usableBtn}"></i>
                            </p>
                        </h4>
                        <!--修改合同号对话框-->
                        <el-dialog title="修改合同编号" :visible.sync="changeCID" width="30%">
                            <!-- <el-input v-model="apQC" @change="setApQC()"></el-input> -->
                            <el-input v-model="apQC"></el-input>
                            <span slot="footer" class="dialog-footer">
                                <el-button @click="cancelChangeID">取 消</el-button>
                                <el-button type="primary" @click="confirmChangeID">确 定</el-button>
                            </span>
                        </el-dialog>
                        <div class="handleBtn">
                            <!-- <el-button plain @click="changeRemark = true" :disabled="usableBtn">监播备注</el-button> -->
                            <el-button type="primary" :disabled="usableBtn" v-if="role=='MD'&& planPanel=='first'" @click="changePoint">换点</el-button>
                            <!--监播备注对话框-->
                            <el-dialog title="监播备注" :visible.sync="changeRemark" width="30%">
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
                                    <li>
                                        <span>公司名称：</span>
                                        <em>{{orderDetail.cName}}</em>
                                    </li>
                                    <li>
                                        <span>所属销售：</span>
                                        <em>{{orderDetail.realName}}</em>
                                    </li>
                                    <li>
                                        <span>现金结算：</span>
                                        <em>¥ {{orderDetail.pdTotal}}</em>
                                    </li>
                                    <li>
                                        <span>公司品牌：</span>
                                        <em>{{orderDetail.bTitle}}</em>
                                    </li>
                                    <li>
                                        <span>投放城市：</span>
                                        <em>{{filter(orderDetail.rIDs)}}</em>
                                    </li>
                                    <li>
                                        <span>资源置换：</span>
                                        <em>¥ {{orderDetail.pdSendFee}}</em>
                                    </li>
                                    <li>
                                        <span>联系人：</span>
                                        <em>{{orderDetail.cuName}}</em>
                                    </li>
                                    <!-- <li>
                                        <span>方案备注：</span>
                                        <em>{{orderDetail.remark||"无"}}</em>
                                    </li> -->
                                    <li>
                                        <span>其他费用：</span>
                                        <em>¥ {{orderDetail.pdOtherFee}}</em>
                                    </li>
                                </ul>
                            </div>
                            <div class="plan-detail-right">
                                <dl>
                                    <dt>状态</dt>
                                    <dd>{{stateToText(orderDetail.apState)}}</dd>
                                </dl>
                                <dl>
                                    <dt>方案金额</dt>
                                    <dd>¥ {{orderDetail.Total}}</dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="plan-panel">
                <el-tabs v-model="planPanel" @tab-click="handleClick()">
                    <el-tab-pane label="选点排期" name="first">
                        <div class="first-wrap box-wrap">
                            <h4 v-if="!showTitle">选点排期</h4>
                            <h4 v-if="showTitle">更换点位
                                <!--<el-button type="primary" @click="dialogAddPoint = true" class="changeDWBtn">添加点位-->
                                <!--</el-button>-->
                                <span>原投放面数:{{setpointArr.length}}&nbsp;&nbsp; 中止投放面数:{{stopPointNum}} &nbsp;&nbsp;&nbsp; 现投放面数:{{nowPointNum}}</span>
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
                                <el-table border :data="currentSetpoint" style="width: 100%" :default-sort="{prop: 'recName', order: 'descending'}" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
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
                                    <el-table-column label="资源名称" min-width="16.1%" prop="resName">
                                    </el-table-column>
                                    <el-table-column prop="mTitle" label="媒体名称" min-width="10.3%" class="tar">
                                    </el-table-column>
                                    <el-table-column prop="asLab" label="投放面" min-width="8.8%">
                                    </el-table-column>
                                    <el-table-column prop="city" label="城市" min-width="6%" :filters="filterCityData" :filter-method="filterCity">
                                    </el-table-column>
                                    <el-table-column prop="rName" label="区域" min-width="7.4%" :filters="filtersArea" :filter-method="filterRName">
                                    </el-table-column>
                                    <el-table-column prop="cType" label="楼盘类型" min-width="8.8%">
                                    </el-table-column>
                                    <el-table-column prop="hNum" label="小区户数" min-width="7.3%" class="tar">
                                    </el-table-column>
                                    <el-table-column label="楼盘价格" min-width="7.3%">
                                        <template slot-scope="scope">
                                            <span>&yen;{{(scope.row.hPrice)?priceFormat(scope.row.hPrice/100): 0 }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="timeRange" label="排期" min-width="14.2%" :filters="filtersData" :filter-method="filterTimeRange">
                                        <template slot-scope="scope">
                                            <template v-if="scope.row.lState==2">
                                                <span>{{formatTime(scope.row.lStar)+"-"+formatTime(scope.row.lSetTime)}}</span>
                                                <el-tooltip placement="top">
                                                    <div slot="content">
                                                        <span>{{scope.row.timeRange}}</span>
                                                    </div>
                                                    <i class="el-icon-question"> </i>
                                                </el-tooltip>
                                            </template>
                                            <span v-else>{{scope.row.timeRange}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="操作" min-width="4.3%" v-if="showHandel">
                                        <template slot-scope="scope">
                                            <span style="color:#999;" v-if="scope.row.lState==2">终止</span>
                                            <el-button type="text" v-else @click="disContinue(scope.row)">终止</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <!-- <div class="content_bottom_btn" v-if="!showBtn">
                                    <el-button type="primary" @click="saveChangePoint">保存</el-button>
                                    <el-button type="default" @click="cancelChangePoint">取消</el-button>
                                </div> -->
                            </div>
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
                                                <p>{{item.schedules}}</p>
                                                <!-- <p>{{formatTime(item.pdStar) +"-"+formatTime(item.pdEnd)+" "+"("+item.pdDays+"面)"}}</p> -->
                                                <!-- <p>2018.03.01-2018.03.28（20面）、2018.04.01-2018.04.28（10面）、2018.05.01-2018.05.28（10面）</p> -->
                                            </div>
                                            <div class="price">
                                                <div class="price-left">
                                                    <h4>广告费</h4>
                                                    <ul>
                                                        <li>刊例价(面/周)
                                                            <span>¥ {{priceFormat(item.adPrice)}}</span>
                                                        </li>
                                                        <li>投放量(面·天)
                                                            <span>{{item.pdDays}}</span>
                                                        </li>
                                                        <li>赠送(面·天)
                                                            <span>{{item.pdFreeNum}}</span>
                                                        </li>
                                                        <li>广告费折扣
                                                            <span>{{item.discount}}%</span>
                                                        </li>
                                                        <li>¥ {{priceFormat(item.pdAdFee)}}</li>
                                                    </ul>
                                                </div>
                                                <div class="price-right">
                                                    <h4>制作费</h4>
                                                    <ul>
                                                        <li>制作费单价
                                                            <span>¥ 100</span>
                                                        </li>
                                                        <li>广告画数量(张)
                                                            <span>{{item.pdNum}}</span>
                                                        </li>
                                                        <li></li>
                                                        <li>制作费折扣
                                                            <span>{{item.ADMakeDiscount}}%</span>
                                                        </li>
                                                        <li>¥ {{priceFormat(item.pdAdMake)}}</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div class="bottom">
                                                <div class="bottom-detail">
                                                    <div class="remark">
                                                        <p>备注：{{item.pdRemark}}</p>
                                                    </div>
                                                    <div class="bill-title-right">
                                                        <ul>
                                                            <li>
                                                                <p>
                                                                    <em>现金结算：</em>
                                                                    <span>¥ {{priceFormat(item.pdTotal)}}</span>
                                                                </p>
                                                            </li>
                                                            <li>
                                                                <p>
                                                                    <em>资源置换：</em>
                                                                    <span>¥ {{priceFormat(item.pdSendFee)}}</span>
                                                                </p>
                                                            </li>
                                                            <li>
                                                                <p>
                                                                    <em>其他费用：</em>
                                                                    <span>¥ {{priceFormat(item.pdOtherFee)}}</span>
                                                                </p>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div class="bottom-fin">
                                                    <p>
                                                        <em style="top: 5px">总计：</em>
                                                        <span class="totalPrice">¥ {{priceFormat(item.allprice)}}</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </el-tab-pane>
                                </el-tabs>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="物料信息" name="third" :disabled="usableBtn">
                        <div class="third-wrap box-wrap">
                            <h4>物料信息</h4>
                            <div class="table_wrap">
                                <el-table :data="materialInfo" border style="width: 100%">
                                    <el-table-column label="序号" min-width="5.9%">
                                        <template slot-scope="scope">
                                            <span>{{scope.$index+1}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="adSize" label="广告尺寸" min-width="12.4%">
                                    </el-table-column>
                                    <el-table-column prop="adViewSize" label="可视画面" min-width="12.4%">
                                    </el-table-column>
                                    <el-table-column prop="resolution" label="分辨率" min-width="12.4%">
                                    </el-table-column>
                                    <el-table-column prop="colorMode" label="颜色模式" min-width="12.4%">
                                    </el-table-column>
                                    <el-table-column prop="photoFormat" label="文件格式" min-width="17.6%">
                                    </el-table-column>
                                    <el-table-column prop="pointNum" label="点位面数" min-width="12.7%">
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="上刊报告" name="forth" :disabled="usableBtn||role =='OP'">
                        <div class="forth-wrap box-wrap">
                            <h4>上刊报告</h4>
                            <div class="panel" v-loading="UpReportLoading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
                                <div class="up-report">
                                    <div class="up-loader-header">
                                        <el-cascader :options="citys" v-model="citySelect" @change="searchImgChange()">
                                        </el-cascader>
                                        <el-select placeholder="请选择资源" filterable v-model="allhouse" @change="searchImg()">
                                            <el-option v-for="(item, index) of allResource" :key="index" :label="item.text" :value="item.value"></el-option>
                                        </el-select>
                                        <el-select placeholder="请选择监播图" v-model="allPic" @change="searchImg()">
                                            <el-option label="全部监播图" value="1"></el-option>
                                            <el-option label="已上传" value="2"></el-option>
                                            <el-option label="未上传" value="3"></el-option>
                                        </el-select>
                                        <!--进度条-->
                                        <div class="progress">
                                            <el-progress :percentage="upImgPercent"></el-progress>
                                            <span>{{ currUpNum }} / {{upReportArr.length}}</span>
                                        </div>
                                    </div>

                                    <div class="imgs-box">
                                        <div class="up-loader-Imgpanel" v-for="(updata,index) in pageUpReportArr" :key="index">
                                            <el-card class="box-card" shadow="never">
                                                <div slot="header" class="clearfix img-car">
                                                    <!-- <span>广州市-天河区-东方雅苑-西门-B</span> -->
                                                    <span>{{updata.city+"-"+updata.rName+"-"+updata.resName+"-"+updata.mTitle+"-"+updata.asLab}}</span>
                                                    <el-popover placement="top-start" width="200" trigger="hover">
                                                        <ol slot-scope="scope" style="text-align:center">
                                                            <li>{{updata.timeRange}}</li>
                                                            <!-- <li>2017.10.10-2018.10.10</li>
                                                            <li>2017.10.10-2018.10.10</li> -->
                                                        </ol>
                                                        <i class="el-icon-date" style="float: right; padding: 3px 0" type="text" slot="reference"></i>
                                                    </el-popover>
                                                </div>
                                                <div class="upload-img">
                                                    <el-upload @click.native="saveId(updata, 'one')" :action="doUpload" list-type="picture-card" :file-list="updata.upImg.one" :before-upload="beforeAvatarUpload" :on-success="handleUpSuccess" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                                                        <i class="el-icon-plus"></i>
                                                        <span>点击上传照片</span>
                                                    </el-upload>
                                                </div>
                                                <div class="upload-img">
                                                    <el-upload @click.native="saveId(updata, 'two')" :action="doUpload" list-type="picture-card" :file-list="updata.upImg.two" :before-upload="beforeAvatarUpload" :on-success="handleUpSuccess" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                                                        <i class="el-icon-plus"></i>
                                                        <span>点击上传照片</span>
                                                    </el-upload>
                                                </div>
                                                <!-- 是否显示更多的图片上传框打开 -->
                                                <div class="showimgbox" @click="isShow=index" v-if="!(isShow == index)">
                                                    <i class="fa fa-angle-double-down"></i>
                                                </div>
                                                <div v-show="isShow == index" class="moreimgs">
                                                    <div class="upload-img">
                                                        <el-upload @click.native="saveId(updata, 'three')" :action="doUpload" list-type="picture-card" :file-list="updata.upImg.three" :before-upload="beforeAvatarUpload" :on-success="handleUpSuccess" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                                                            <i class="el-icon-plus"></i>
                                                            <span>点击上传照片</span>
                                                        </el-upload>
                                                    </div>
                                                    <div class="upload-img">
                                                        <el-upload @click.native="saveId(updata, 'four')" :action="doUpload" list-type="picture-card" :file-list="updata.upImg.four" :before-upload="beforeAvatarUpload" :on-success="handleUpSuccess" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                                                            <i class="el-icon-plus"></i>
                                                            <span>点击上传照片</span>
                                                        </el-upload>
                                                    </div>
                                                    <!-- 是否显示更多的图片上传框关闭 -->
                                                    <div class="showimgbox" @click="isShow=null">
                                                        <i class="fa fa-angle-double-up"></i>
                                                    </div>
                                                </div>
                                            </el-card>
                                        </div>
                                    </div>
                                    <div class="pager">
                                        <el-pagination small background :current-page.sync="currUpPage" :page-sizes="[6, 12]" :page-size="pageUpSize" layout="sizes, prev, pager, next, jumper" :total="currUpReportArr.length" @size-change="sizeChange" @current-change='changePage'>
                                        </el-pagination>
                                    </div>
                                    <div class="up-report-bottom">
                                        <div class="up-report-bottom-checkbox">
                                            <!--<el-checkbox v-model="sendReportchecked">生成报告同时发送至客户邮箱：444094173@qq.com-->
                                            <!--<el-button type="text">修改</el-button>-->
                                            <!--</el-checkbox>-->
                                        </div>
                                        <div class="up-report-bottom-btns">
                                            <!--<el-button type="primary">生成报告</el-button>-->
                                            <el-button plain @click="downloadUp">下载PDF</el-button>
                                            <el-button plain @click="showH5Up">查看H5</el-button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="下刊报告" name="fifth" :disabled="usableBtn||role =='OP'">
                        <div class="forth-wrap box-wrap">
                            <h4>下刊报告</h4>
                            <div class="panel" v-loading="DownReportLoading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
                                <div class="up-report">
                                    <div class="up-loader-header">
                                        <el-cascader :options="citys" v-model="citySelect" @change="searchImg()">
                                        </el-cascader>
                                        <el-select placeholder="请选择资源" filterable v-model="allhouse" @change="searchImg()">
                                            <el-option v-for="(item, index) of allResource" :key="index" :label="item.text" :value="item.value"></el-option>
                                        </el-select>
                                        <el-select placeholder="请选择监播图" v-model="allPic" @change="searchImg()">
                                            <el-option label="全部监播图" value="1"></el-option>
                                            <el-option label="已上传" value="2"></el-option>
                                            <el-option label="未上传" value="3"></el-option>
                                        </el-select>
                                        <!--进度条-->
                                        <div class="progress">
                                            <el-progress :percentage="downImgPercent"></el-progress>
                                            <span>{{ currDownNum }} / {{downReportArr.length}}</span>
                                        </div>
                                    </div>
                                    <div class="imgs-box">
                                        <div class="up-loader-Imgpanel" v-for="(downData,index) in pageDownReportArr" :key="index">
                                            <el-card class="box-card" shadow="never">
                                                <div slot="header" class="clearfix img-car">
                                                    <!-- <span>广州市-天河区-东方雅苑-西门-B</span> -->
                                                    <span>{{downData.city+"-"+downData.rName+"-"+downData.resName+"-"+downData.mTitle+"-"+downData.asLab}}</span>
                                                    <i class="el-icon-date" style="float: right; padding: 3px 0" type="text"></i>
                                                </div>
                                                <div class="upload-img">
                                                    <el-upload @click.native="saveId(downData, 'one')" :action="doUpload" list-type="picture-card" :file-list="downData.downImg.one" :before-upload="beforeAvatarUpload" :on-success="handleDownSuccess" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                                                        <i class="el-icon-plus"></i>
                                                        <span>点击上传照片</span>
                                                    </el-upload>
                                                </div>
                                                <div class="upload-img">
                                                    <el-upload @click.native="saveId(downData, 'two')" :action="doUpload" list-type="picture-card" :file-list="downData.downImg.two" :before-upload="beforeAvatarUpload" :on-success="handleDownSuccess" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                                                        <i class="el-icon-plus"></i>
                                                        <span>点击上传照片</span>
                                                    </el-upload>
                                                </div>
                                                <!-- 是否显示更多的图片上传框打开 -->
                                                <div class="showimgbox" @click="isShow2 = index" v-if="!(isShow2 == index)">
                                                    <i class="fa fa-angle-double-down"></i>
                                                </div>
                                                <div v-show="isShow2 == index" class="moreimgs">
                                                    <div class="upload-img">
                                                        <el-upload @click.native="saveId(downData, 'three')" :action="doUpload" list-type="picture-card" :file-list="downData.downImg.three" :before-upload="beforeAvatarUpload" :on-success="handleDownSuccess" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                                                            <i class="el-icon-plus"></i>
                                                            <span>点击上传照片</span>
                                                        </el-upload>
                                                    </div>
                                                    <div class="upload-img">
                                                        <el-upload @click.native="saveId(downData, 'four')" :action="doUpload" list-type="picture-card" :file-list="downData.downImg.four" :before-upload="beforeAvatarUpload" :on-success="handleDownSuccess" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                                                            <i class="el-icon-plus"></i>
                                                            <span>点击上传照片</span>
                                                        </el-upload>
                                                    </div>
                                                    <!-- 是否显示更多的图片上传框关闭 -->
                                                    <div class="showimgbox" @click="isShow2= null">
                                                        <i class="fa fa-angle-double-up"></i>
                                                    </div>
                                                </div>
                                            </el-card>
                                        </div>
                                    </div>
                                    <div class="pager">
                                        <el-pagination small background :current-page.sync="currDownPage" :page-sizes="[6, 12]" :page-size="pageDownSize" layout="sizes, prev, pager, next, jumper" :total="currDownReportArr.length" @size-change="sizeChange" @current-change='changePage'>
                                        </el-pagination>
                                    </div>
                                    <div class="up-report-bottom">
                                        <div class="up-report-bottom-checkbox">
                                            <!--<el-checkbox v-model="sendReportchecked">生成报告同时发送至客户邮箱：444094173@qq.com-->
                                            <!--<el-button type="text">修改</el-button>-->
                                            <!--</el-checkbox>-->
                                        </div>
                                        <div class="up-report-bottom-btns">
                                            <!--<el-button type="primary">生成报告</el-button>-->
                                            <el-button plain @click="downloadDown">下载PDF</el-button>
                                            <el-button plain @click="showH5Down">查看H5</el-button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>
                </el-tabs>

                <!--添加点位对话框-->
                <el-dialog title="添加点位" :visible.sync="dialogAddPoint" width="80%">
                    <div class="step2">
                        <div>
                            <div class="search-nav">
                                <div class="search-wrap">
                                    <span>
                                        <el-select v-model="value" placeholder="请选择" class="type-select">
                                            <el-option v-for="item in typeSelect" :key="item.value" :label="item.value" :value="item.value"></el-option>
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
                                        <el-date-picker v-model="dateInput" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" class="date-select">
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
                                            <input type="text" class="input"> -
                                            <input type="text" class="input">
                                            <el-button size="mini">清除</el-button>
                                            <el-button size="mini" type="primary">确定</el-button>
                                        </div>
                                    </li>
                                    <li>
                                        <span>楼栋数量:</span>
                                        <div class="input-wrap">
                                            <input type="text" class="input"> -
                                            <input type="text" class="input">
                                            <el-button size="mini">清除</el-button>
                                            <el-button size="mini" type="primary">确定</el-button>
                                        </div>
                                    </li>
                                    <li>
                                        <span>楼盘价格:</span>
                                        <div class="input-wrap">
                                            <input type="text" class="input"> -
                                            <input type="text" class="input">
                                            <el-button size="mini">清除</el-button>
                                            <el-button size="mini" type="primary">确定</el-button>
                                        </div>
                                    </li>
                                    <li>
                                        <span>入住年份:</span>
                                        <div class="input-wrap">
                                            <input type="text" class="input"> -
                                            <input type="text" class="input">
                                            <el-button size="mini">清除</el-button>
                                            <el-button size="mini" type="primary">确定</el-button>
                                        </div>
                                    </li>
                                    <li>
                                        <span>楼盘类型:</span>
                                        <el-select v-model="buildValue" placeholder="请选择" class="buildType">
                                            <el-option v-for="item in buildType" :key="item.buildValue" :label="item.buildValue" :value="item.buildValue"></el-option>
                                        </el-select>
                                    </li>
                                </ul>
                            </div>
                            <!--表格-->
                            <div class="table_wrap">
                                <el-table border :data="planList" style="width: 100%" :default-sort="{prop: 'recName', order: 'descending'}">
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
                                    <el-table-column type="selection" width="41px">
                                    </el-table-column>

                                    <el-table-column label="资源名称" min-width="16.1%" prop="recName">
                                    </el-table-column>
                                    <el-table-column label="媒体名称" min-width="10.3%" class="tar">
                                        <template slot-scope="scope">
                                            <el-tooltip class="item" effect="dark" :content="scope.row.mediaName" placement="bottom">
                                                <span>{{scope.row.mediaName}}</span>
                                            </el-tooltip>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="city" label="城市" min-width="6%">
                                    </el-table-column>
                                    <el-table-column prop="origin" label="区域" min-width="7.4%">
                                    </el-table-column>
                                    <el-table-column label="楼盘类型" min-width="8.8%">
                                        <template slot-scope="scope">
                                            <el-tooltip class="item" effect="dark" :content="scope.row.buildType" placement="bottom">
                                                <span>{{scope.row.buildType}}</span>
                                            </el-tooltip>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="houseNum" label="小区户数" min-width="7.3%" class="tar">
                                    </el-table-column>
                                    <el-table-column label="楼盘价格" min-width="7.3%">
                                        <template slot-scope="scope">
                                            <span>{{scope.row.buildPrice}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="schedules" label="排期" min-width="14.2%">
                                        <template slot-scope="scope">
                                            <el-tooltip class="item" effect="dark" :content="scope.row.schedules" placement="bottom">
                                                <span>{{scope.row.schedules}}</span>
                                            </el-tooltip>
                                        </template>
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

                <!-- 图片查看显示 -->
                <el-dialog :visible.sync="dialogVisible" class="imgPreview">
                    <img  :src="dialogImageUrl" alt="">
                </el-dialog>
                <!-- 返回框 -->
                <div class="content_bottom_btn">
                    <el-button type="default" @click="goBack">返回</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { api } from "../../api/api.js";
// 城市区域变成中文
import areaToText from "../../commonFun/areaToText_new.js";
// 价格格式化
import commaFormat from "../../commonFun/commaFormat.js";
// 筛选过滤
import filterFormat from "../../commonFun/filterTableData.js";
// 时间格式化
import dateFormat from "../../commonFun/timeFormat.js";
import {
    Table,
    TableColumn,
    Tabs,
    TabPane,
    Button,
    Upload,
    Card,
    Dialog,
    Checkbox,
    Select,
    Option,
    Input,
    Cascader,
    Progress,
    Pagination,
    Popover,
    Form,
    FormItem,
    MessageBox,
    Message
} from "element-ui";

export default {
    name: "orderDetail",
    components: {
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
            //加载中
            loading: true,
            UpReportLoading: true,
            DownReportLoading: true,
            // 判断
            role: "",
            // 当前页
            currUpPage: 1,
            currDownPage: 1,
            pageUpSize: 6,
            pageDownSize: 6,
            // 订单详情头部
            orderDetail: {},
            //修改合同号
            changeCID: false,
            planPanel: "first",
            // 选点排期
            setpointArr: [],
            currentSetpoint: [],
            copyAsidArr: [],
            // 报价单详情
            priceSheet: [],
            // 城市过滤结果
            filterCityData: [],
            // 地区过滤结果
            filtersArea: [],
            // 排期时间过滤
            filtersData: [],
            //选点排期资源名称搜索
            keyword: "",
            selectRecName: "1",
            imgOrder: "",
            //物料信息
            materialInfo: [],
            // 上刊报告Arr
            upReportArr: [],
            currUpReportArr: [],
            pageUpReportArr: [],
            upImgPercent: 0,
            // 下刊报告Arr
            downReportArr: [],
            currDownReportArr: [],
            pageDownReportArr: [],
            downImgPercent: 0,
            // 上传图片地址
            doUpload: "/QADN/UpLoad",
            // 上传图片附带参数
            upLoadData: {
                uid: JSON.parse(sessionStorage.getItem("session_data")).uID,
                pid: "",
                palt: "",
                ptype: "",
                ptid: "",
                ptp: ""
            },
            // 上刊图片
            upLoadImg: [],
            //上刊报告市区级联
            citys: [],
            citySelect: [],
            //上刊报告社区和监播图
            allResource: [],
            allhouse: "",
            allPic: "",
            // 下刊图片
            downImg: [],
            // 默认合同编号(如果订单详情没有合同编号)
            apQC: "",
            // 图片显示放大按钮控件
            isShow: null,
            isShow2: null,

            //添加点位
            dialogAddPoint: false,
            dateInput: "",
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
                    value: "城市",
                    label: "城市"
                }
            ],
            //默认
            value: "资源名称",
            //楼盘类型
            buildType: [
                {
                    buildValue: "高端小区",
                    buildlabel: "高端小区"
                },
                {
                    buildValue: "商圈",
                    buildlabel: "商圈"
                },
                {
                    buildValue: "城市",
                    buildlabel: "城市"
                }
            ],
            buildValue: "",
            //搜索框
            searchInput: "",
            planSelect: "",
            //添加点位列表
            planList: [
                {
                    recName: "珠江帝景",
                    city: "广州",
                    origin: "海珠区",
                    buildType: "高端住宅",
                    houseNum: "600",
                    buildPrice: "￥30,000",
                    mediaName: "广州市中山大道",
                    buildNum: "12",
                    schedules: "2017.08.30-2017.09.30",
                    businessOrigin: "白云万达广场",
                    assetID: "GZ201871024",
                    liveYear: "1999年",
                    adLimit: "地产/医药/汽车"
                },
                {
                    recName: "珠江帝景花园",
                    city: "广州",
                    origin: "海珠区",
                    buildType: "高端住宅",
                    houseNum: "600",
                    buildPrice: "￥30,000",
                    mediaName: "广州市中山大道",
                    buildNum: "12",
                    schedules: "2017.08.30-2017.09.30",
                    businessOrigin: "白云万达广场",
                    assetID: "GZ201871024",
                    liveYear: "1999年",
                    adLimit: "地产/医药/汽车"
                },
                {
                    recName: "珠江帝景花园",
                    city: "广州",
                    origin: "海珠区",
                    buildType: "高端住宅",
                    houseNum: "600",
                    buildPrice: "￥30,000",
                    mediaName: "广州市中山大道",
                    buildNum: "12",
                    schedules: "2017.08.30-2017.09.30",
                    businessOrigin: "白云万达广场",
                    assetID: "GZ201871024",
                    liveYear: "1999年",
                    adLimit: "地产/医药/汽车"
                },
                {
                    recName: "珠江帝景花园",
                    city: "广州",
                    origin: "海珠区",
                    buildType: "高端住宅",
                    houseNum: "600",
                    buildPrice: "￥30,000",
                    mediaName: "广州市中山大道",
                    buildNum: "12",
                    schedules: "2017.08.30-2017.09.30",
                    businessOrigin: "白云万达广场",
                    assetID: "GZ201871024",
                    liveYear: "1999年",
                    adLimit: "地产/医药/汽车"
                },
                {
                    recName: "珠江帝景花园",
                    city: "广州",
                    origin: "海珠区",
                    buildType: "高端住宅",
                    houseNum: "600",
                    buildPrice: "￥30,000",
                    mediaName: "广州市中山大道",
                    buildNum: "12",
                    schedules: "2017.08.30-2017.09.30",
                    businessOrigin: "白云万达广场",
                    assetID: "GZ201871024",
                    liveYear: "1999年",
                    adLimit: "地产/医药/汽车"
                },
                {
                    recName: "珠江帝景花园",
                    city: "广州",
                    origin: "海珠区",
                    buildType: "高端住宅",
                    houseNum: "600",
                    buildPrice: "￥30,000",
                    mediaName: "广州市中山大道",
                    buildNum: "12",
                    schedules: "2017.08.30-2017.09.30",
                    businessOrigin: "白云万达广场",
                    assetID: "GZ201871024",
                    liveYear: "1999年",
                    adLimit: "地产/医药/汽车"
                },
                {
                    recName: "珠江帝景花园",
                    city: "广州",
                    origin: "海珠区",
                    buildType: "高端住宅",
                    houseNum: "600",
                    buildPrice: "￥30,000",
                    mediaName: "广州市中山大道",
                    buildNum: "12",
                    schedules: "2017.08.30-2017.09.30",
                    businessOrigin: "白云万达广场",
                    assetID: "GZ201871024",
                    liveYear: "1999年",
                    adLimit: "地产/医药/汽车"
                },
                {
                    recName: "珠江帝景花园",
                    city: "广州",
                    origin: "海珠区",
                    buildType: "高端住宅",
                    houseNum: "600",
                    buildPrice: "￥30,000",
                    mediaName: "广州市中山大道",
                    buildNum: "12",
                    schedules: "2017.08.30-2017.09.30",
                    businessOrigin: "白云万达广场",
                    assetID: "GZ201871024",
                    liveYear: "1999年",
                    adLimit: "地产/医药/汽车"
                },
                {
                    recName: "珠江帝景花园",
                    city: "广州",
                    origin: "海珠区",
                    buildType: "高端住宅",
                    houseNum: "600",
                    buildPrice: "￥30,000",
                    mediaName: "广州市中山大道",
                    buildNum: "12",
                    schedules: "2017.08.30-2017.09.30",
                    businessOrigin: "白云万达广场",
                    assetID: "GZ201871024",
                    liveYear: "1999年",
                    adLimit: "地产/医药/汽车"
                },
                {
                    recName: "珠江帝景花园",
                    city: "广州",
                    origin: "海珠区",
                    buildType: "高端住宅",
                    houseNum: "600",
                    buildPrice: "￥30,000",
                    mediaName: "广州市中山大道",
                    buildNum: "12",
                    schedules: "2017.08.30-2017.09.30",
                    businessOrigin: "白云万达广场",
                    assetID: "GZ201871024",
                    liveYear: "1999年",
                    adLimit: "地产/医药/汽车"
                },
                {
                    recName: "珠江帝景花园",
                    city: "广州",
                    origin: "海珠区",
                    buildType: "高端住宅",
                    houseNum: "600",
                    buildPrice: "￥30,000",
                    mediaName: "广州市中山大道",
                    buildNum: "12",
                    schedules: "2017.08.30-2017.09.30",
                    businessOrigin: "白云万达广场",
                    assetID: "GZ201871024",
                    liveYear: "1999年",
                    adLimit: "地产/医药/汽车"
                },
                {
                    recName: "珠江帝景花园",
                    city: "广州",
                    origin: "海珠区",
                    buildType: "高端住宅",
                    houseNum: "600",
                    buildPrice: "￥30,000",
                    mediaName: "广州市中山大道",
                    buildNum: "12",
                    schedules: "2017.08.30-2017.09.30",
                    businessOrigin: "白云万达广场",
                    assetID: "GZ201871024",
                    liveYear: "1999年",
                    adLimit: "地产/医药/汽车"
                },
                {
                    recName: "珠江帝景花园",
                    city: "广州",
                    origin: "海珠区",
                    buildType: "高端住宅",
                    houseNum: "600",
                    buildPrice: "￥30,000",
                    mediaName: "广州市中山大道",
                    buildNum: "12",
                    schedules: "2017.08.30-2017.09.30",
                    businessOrigin: "白云万达广场",
                    assetID: "GZ201871024",
                    liveYear: "1999年",
                    adLimit: "地产/医药/汽车"
                },
                {
                    recName: "珠江帝景花园",
                    city: "广州",
                    origin: "海珠区",
                    buildType: "高端住宅",
                    houseNum: "600",
                    buildPrice: "￥30,000",
                    mediaName: "广州市中山大道",
                    buildNum: "12",
                    schedules: "2017.08.30-2017.09.30",
                    businessOrigin: "白云万达广场",
                    assetID: "GZ201871024",
                    liveYear: "1999年",
                    adLimit: "地产/医药/汽车"
                },
                {
                    recName: "珠江帝景花园",
                    city: "广州",
                    origin: "海珠区",
                    buildType: "高端住宅",
                    houseNum: "600",
                    buildPrice: "￥30,000",
                    mediaName: "广州市中山大道",
                    buildNum: "12",
                    schedules: "2017.08.30-2017.09.30",
                    businessOrigin: "白云万达广场",
                    assetID: "GZ201871024",
                    liveYear: "1999年",
                    adLimit: "地产/医药/汽车"
                }
            ],
            //按钮
            usableBtn: false,
            //发送报告
            sendReportchecked: false,
            //上传照片
            dialogImageUrl: "",
            dialogVisible: false,
            //监播备注
            remark: "",
            changeRemark: false,
            //选点排期标题
            showTitle: false,
            //选点排期按钮
            showBtn: true,
            //更换点位取消终止按钮
            cancelbtnShow: false,
            //选点排期操作
            showHandel: false
        };
    },
    created() {
        if(this.isChangePoint()){
            this.changePoint();
        }
        // 根据角色判断是否有修改合同编号的权限
        this.getRole();
        // 获取订单详情的上面公司的信息
        this.getInitData();
        // 选点排期
        this.getSetPoint();
        // 报价单
        this.getPriceData();
    },
    computed: {
        // 现投放面数
        nowPointNum() {
            if (this.setpointArr.length) {
                let num = 0;
                for (let data of this.setpointArr) {
                    if (data.lState != 2) {
                        num++;
                    }
                }
                return num;
            }
        },
        // 中止投放面数
        stopPointNum() {
            if (this.setpointArr.length) {
                let num = 0;
                for (let data of this.setpointArr) {
                    if (data.lState == 2) {
                        num++;
                    }
                }
                return num;
            }
        },
        // 上刊报告进度条
        currUpNum() {
            // let num = this.currUpReportArr.length;
            if (this.upReportArr.length) {
                let num = 0;
                for (let data of this.upReportArr) {
                    if (data.upImgArr.length) {
                        num++;
                    }
                }
                this.upImgPercent = Math.ceil(
                    num / this.upReportArr.length * 100
                );
                return num;
            }
        },
        // 下刊报告进度条
        currDownNum() {
            // let num = this.currDownReportArr.length;
            if (this.downReportArr.length) {
                let num = 0;
                for (let data of this.downReportArr) {
                    if (data.downImgArr.length) {
                        num++;
                    }
                }
                this.downImgPercent = Math.ceil(
                    num / this.downReportArr.length * 100
                );
                return num;
            }
        }
    },
    methods: {
        isChangePoint(){
            let isChange = sessionStorage.getItem('change_point');
            if(isChange == 'yes'){
                return true;
            }
            return false;
        },
        // 获取角色
        getRole() {
            this.role = JSON.parse(
                sessionStorage.getItem("session_data")
            ).uType;
        },
        // 页数大小改变
        sizeChange(pageVal) {
            console.log("pageVal", pageVal);
            if (this.planPanel == "forth") {
                this.pageUpSize = pageVal;
            } else if (this.planPanel == "fifth") {
                this.pageDownSize = pageVal;
            }
            this.changePage(1);
        },
        // 分页功能
        changePage(page) {
            console.log("page-------", page);
            let pageSize = "";
            let arr = [];
            let resultArr = [];

            if (this.planPanel == "forth") {
                this.currUpPage = page;
                pageSize = this.pageUpSize;
                arr = this.currUpReportArr;
            } else if (this.planPanel == "fifth") {
                this.currDownPage = page;
                pageSize = this.pageDownSize;
                arr = this.currDownReportArr;
            }

            let total = arr.length;
            for (
                let i = (page - 1) * pageSize;
                i < (page * pageSize < total ? page * pageSize : total);
                i++
            ) {
                resultArr.push(arr[i]);
            }
            if (this.planPanel == "forth") {
                this.pageUpReportArr = resultArr;
            } else if (this.planPanel == "fifth") {
                this.pageDownReportArr = resultArr;
            }
        },
        // tab点击
        handleClick() {
            if (this.planPanel == "first") {
                this.getSetPoint();
            }
            if (this.planPanel == "second") {
                this.getPriceData();
            }
            if (this.planPanel == "third") {
                // 物料信息
                this.getMaterialInfo(this.copyAsidArr);
                // this.materialInfo = this.getMaterialInfo(this.copyAsidArr);
                console.log("materialInfo", this.materialInfo);
            }
            if (this.planPanel == "forth") {
                // this.currUpPage = 1;
                this.getUpImgInfo();
            }
            if (this.planPanel == "fifth") {
                // this.currDownPage = 1;
                this.getDownImgInfo();
            }
        },
        //返回列表
        goBack() {
            let isChange = sessionStorage.getItem('change_point');
            if(isChange =='yes'){
                sessionStorage.setItem('change_point', 'no');
                // location.reload();
                this.usableBtn = false;
                $(window).scrollTop(0);
                this.showTitle = false;
                this.showBtn = true;
                this.showHandel = false;
            }else{
                this.$router.push("./orderList");
            }
        },
        // 去重城市
        filter(val) {
            let res = "";
            if (val) {
                for (let data of val.split(",")) {
                    if (!res.includes(data)) {
                        res = data + "," + res;
                    }
                }
                res = res.toString().substring(0, res.toString().length - 1);
                console.log(res);
            }
            return res;
        },
        // 获取选点排期列表数据
        getInitData() {
            // 真实数据
            let uid = JSON.parse(sessionStorage.getItem("session_data")).uID;
            let apid = sessionStorage.getItem("order_apid");
            let info = {
                uid: uid,
                apid: apid
            };
            // uid         int【必填】     当前账户UserID
            // apid        int             公司对应方案apID
            api
                .getApi("/GetFanganInfo", info)
                .then(res => {
                    console.log(res.data);
                    if (!res.data.SysCode) {
                        let info = res.data;
                        // if (info.apTotal) {
                        //     info.apTotal = this.priceFormat(info.apTotal / 100);
                        // }
                        this.orderDetail = info;
                        this.apQC = this.orderDetail.apQC
                            ? this.orderDetail.apQC
                            : this.getContractNo(this.orderDetail.rID);
                    } else if (res.data.SysCode == 100302) {
                        this.loginTimeout();
                    } else {
                        Message.warning(res.data.MSG);
                    }
                })
                .catch(res => {
                    console.log(res);
                });
        },
        // 获取选点排期
        getSetPoint() {
            if (this.setpointArr.length) {
                return;
            }
            // 真实数据
            let uid = JSON.parse(sessionStorage.getItem("session_data")).uID;
            let apid = sessionStorage.getItem("order_apid");
            let info = {
                uid: uid,
                apid: apid
            };
            // uid         int【必填】     当前账户UserID
            // apid        int             公司对应方案apID
            // api.getApi('/GetADB', info).then(res =>{
            api
                .getApi("/GetAdLaunch", info)
                .then(res => {
                    console.log(res.data);
                    if (!res.data.SysCode) {
                        let result = res.data;
                        for (let data of result) {
                            // 城市中文名称
                            data.city = areaToText.toTextCity(data.rID);
                            let time =
                                this.formatTime(data.lStar) +
                                "-" +
                                this.formatTime(data.lEnd);
                            data.timeRange = time;
                        }
                        // 选点排期
                        this.copyAsidArr = JSON.parse(JSON.stringify(result));
                        this.setpointArr = result;
                        this.currentSetpoint = this.setpointArr;
                        // // 物料信息
                        // this.materialInfo = this.getMaterialInfo(result);
                        // console.log("materialInfo", this.materialInfo);
                        // 城市筛选过滤
                        this.filterCityData = filterFormat(result, "city");
                        this.filtersArea = filterFormat(result, "rName");
                        this.filtersData = filterFormat(result, "timeRange");
                        this.allResource = filterFormat(result, "resName");
                        this.loading = false;
                    } else if (res.data.SysCode == 100302) {
                        this.loginTimeout();
                    } else {
                        Message.warning(res.data.MSG);
                    }
                })
                .catch(res => {
                    this.loading = false;
                    console.log(res);
                });
        },
        // 获取上刊图片数据
        getUpImgInfo() {
            if (this.upLoadImg.length) {
                this.citySelect[0] = "全部";
                // this.currUpPage = 1;
                this.searchImg();
                return;
            }
            let uid = JSON.parse(sessionStorage.getItem("session_data")).uID;
            let upinfo = {
                uid: uid,
                ptype: "SK",
                ptp: sessionStorage.getItem("order_apid")
            };

            api
                .postApi("/GetImg", upinfo)
                .then(res => {
                    if (!res.data.SysCode) {
                        console.log(res.data);
                        let result = this.copyAsidArr;
                        // 初始图片
                        this.upLoadImg = res.data;
                        // 上刊数据(组合图片)
                        result = this.constructImg(
                            result,
                            this.upLoadImg,
                            "SK"
                        );
                        this.upReportArr = result;
                        this.currUpReportArr = JSON.parse(
                            JSON.stringify(this.upReportArr)
                        );
                        this.citySelect[0] = "全部";
                        // this.currUpPage = 1;
                        this.searchImg();
                        // this.changeUpPage(1);
                        console.log("upimginfo", this.upReportArr);

                        // 区域二级联动
                        this.citys = this.getCitys(result);
                        this.citys.unshift({
                            value: "全部",
                            label: "全部"
                        });
                        this.UpReportLoading = false;
                    } else if (res.data.SysCode == 100302) {
                        this.loginTimeout();
                    } else {
                        Message.warning(res.data.MSG);
                    }
                })
                .catch(res => {
                    this.UpReportLoading = false;
                    console.log(res);
                });
        },
        // 获取下刊图片数据
        getDownImgInfo() {
            if (this.downImg.length) {
                this.citySelect[0] = "全部";
                // this.currDownPage = 1;
                this.searchImg();
                return;
            }
            let uid = JSON.parse(sessionStorage.getItem("session_data")).uID;
            let downinfo = {
                uid: uid,
                ptype: "XK",
                ptp: sessionStorage.getItem("order_apid")
            };
            api
                .postApi("/GetImg", downinfo)
                .then(res => {
                    if (!res.data.SysCode) {
                        console.log(res.data);
                        let result = this.copyAsidArr;
                        this.downImg = res.data;
                        // 下刊数据(组合图片)
                        result = this.constructImg(result, this.downImg, "XK");
                        this.downReportArr = result;
                        this.currDownReportArr = JSON.parse(
                            JSON.stringify(this.downReportArr)
                        );
                        this.citySelect[0] = "全部";
                        // this.currDownPage = 1;
                        this.searchImg();
                        // this.changeDownPage(1);
                        console.log("downimginfo", this.downReportArr);

                        // 区域二级联动
                        this.citys = this.getCitys(result);
                        this.citys.unshift({
                            value: "全部",
                            label: "全部"
                        });
                        this.DownReportLoading = false;
                    } else if (res.data.SysCode == 100302) {
                        this.loginTimeout();
                    } else {
                        Message.warning(res.data.MSG);
                    }
                })
                .catch(res => {
                    this.DownReportLoading = false;
                    console.log(res);
                });
        },
        // 组装成物料信息数据
        getMaterialInfo(info) {
            if (this.materialInfo.length) {
                return;
            }
            let result = [];
            for (let data of info) {
                let door = 1;
                for (let res of result) {
                    if (
                        res.adSize == data.adSize &&
                        res.adViewSize == data.adViewSize
                    ) {
                        door = 0;
                    }
                }
                if (door) {
                    result.push(data);
                }
            }
            console.log("reuslt-------", result);
            for (let res of result) {
                let pointNum = 0;
                for (let init of info) {
                    if (
                        res.adSize == init.adSize &&
                        res.adViewSize == init.adViewSize
                    ) {
                        if (pointNum == 0) {
                            pointNum = 1;
                        } else {
                            pointNum++;
                        }
                    }
                }
                res.pointNum = pointNum;
                res.resolution = "150dpi";
                res.colorMode = "CMYK";
                res.photoFormat = "JPG/TIF/AI/PSD/CDR";
            }
            console.log("reuslt222-------", result);
            this.materialInfo = result;
            return result;
        },
        // 区域二级联动
        getCitys(arr) {
            let cityArr = [];
            for (let data of arr) {
                let obj = {
                    value: data.city,
                    label: data.city,
                    children: []
                };
                if (
                    JSON.stringify(cityArr).indexOf(JSON.stringify(obj)) === -1
                ) {
                    cityArr.push(obj);
                }
            }
            for (let item of cityArr) {
                for (let data of arr) {
                    let areaObj = {
                        value: data.rName,
                        label: data.rName
                    };
                    if (data.city == item.value) {
                        // 去重
                        if (
                            JSON.stringify(item.children).indexOf(
                                JSON.stringify(areaObj)
                            ) === -1
                        ) {
                            item.children.push(areaObj);
                        }
                    }
                }
            }
            console.log("cityArr---------------fda", cityArr);
            return cityArr;
        },
        // 组合上下刊图片数据
        constructImg(arr, imgArr, type) {
            // this.upLoadData.ptid = row.asID;
            // this.upLoadData.palt = row.city+"-"+row.rName+"-"+row.resName+"-"+row.mTitle+"-"+row.asLab;
            // this.upLoadData.ptp = sessionStorage.getItem('order_apid');
            for (let data of arr) {
                let upimg = [];
                let downimg = [];
                for (let item of imgArr) {
                    if (data.asID == item.ptID) {
                        if (type == "SK") {
                            // uid         int【必填】         当前账户UserID
                            // pid         int【必填】         图库pID
                            // palt        String              图片标题
                            // ptype       String              关联类型
                            // ptid        int                 关联类型对应唯一ID
                            // ptp         String              关联类型区分属性
                            upimg.push({
                                name: item.pID + ".png",
                                url: item.pURL,
                                uid: item.puID,
                                pid: item.pID,
                                palt: item.pAlt,
                                ptype: item.pType,
                                ptid: item.ptID,
                                ptp: item.ptP
                            });
                        }
                        if (type == "XK") {
                            downimg.push({
                                name: item.pID + ".png",
                                url: item.pURL,
                                uid: item.puID,
                                pid: item.pID,
                                palt: item.pAlt,
                                ptype: item.pType,
                                ptid: item.ptID,
                                ptp: item.ptP
                            });
                        }
                    }
                }
                if (type == "SK") {
                    data.upImgArr = upimg;
                    data.upImg = {
                        one: upimg[0] ? [upimg[0]] : [],
                        two: upimg[1] ? [upimg[1]] : [],
                        three: upimg[2] ? [upimg[2]] : [],
                        four: upimg[3] ? [upimg[3]] : []
                    };
                }
                if (type == "XK") {
                    data.downImgArr = downimg;
                    data.downImg = {
                        one: downimg[0] ? [downimg[0]] : [],
                        two: downimg[1] ? [downimg[1]] : [],
                        three: downimg[2] ? [downimg[2]] : [],
                        four: downimg[3] ? [downimg[3]] : []
                    };
                }
            }
            return arr;
        },
        // 获取三个费用价格(报价单)
        getPriceData() {
            if (this.priceSheet.length) {
                return;
            }
            // 真实数据
            let uid = JSON.parse(sessionStorage.getItem("session_data")).uID;
            let apid = sessionStorage.getItem("order_apid");
            let info = {
                uid: uid,
                apid: apid
            };
            // 获取各个城市的刊例价
            // uid         int【必填】     当前账户UserID
            api
                .getApi("/GetAdPrice", { uid: uid })
                .then(res => {
                    console.log(res.data);
                    let adPrice = res.data;
                    // uid         int【必填】     当前账户UserID
                    // apid        int             公司对应方案apID
                    api
                        .getApi("/GetAPD", info)
                        .then(res => {
                            console.log(res.data);
                            if (!res.data.SysCode) {
                                let plandata = res.data;
                                let pdTotal = 0;
                                let pdSendFee = 0;
                                let pdOtherFee = 0;
                                let arr = [];
                                let city = '';
                                for (let price of plandata) {
                                    pdTotal += price.pdTotal;
                                    pdSendFee += price.pdSendFee;
                                    pdOtherFee += price.pdOtherFee;

                                    let obj = {
                                        pdID: price.pdID,
                                        apID: price.apID,
                                        rID: price.rID,
                                        city: "",
                                        muID: price.muID,
                                        adPrice: 0,
                                        // 投放量
                                        pdDays: price.pdDays,
                                        pdStar: price.pdStar,
                                        pdEnd: price.pdEnd,
                                        // 赠送
                                        pdFreeNum: price.pdFreeNum,
                                        // 广告费用
                                        pdAdFee: price.pdAdFee / 100,
                                        // 广告画数量
                                        pdNum: price.pdNum,
                                        // 制作费
                                        pdAdMake: price.pdAdMake / 100,
                                        // 现金结算
                                        pdTotal: price.pdTotal / 100,
                                        // 资源置换
                                        pdSendFee: price.pdSendFee / 100,
                                        // 其他费用
                                        pdOtherFee: price.pdOtherFee / 100,
                                        allprice: 0,
                                        pdRemark: price.pdRemark
                                    };
                                    obj.allprice = (price.pdTotal + price.pdSendFee + price.pdOtherFee) / 100;
                                    obj.city = areaToText.toTextCity(obj.rID);
                                    city = obj.city+','+city;
                                    arr.push(obj);
                                }
                                this.$set(this.orderDetail, "rIDs", city);
                                let total = pdTotal + pdSendFee + pdOtherFee;
                                this.$set(this.orderDetail, "Total",this.priceFormat(total / 100));
                                this.$set(this.orderDetail, "pdTotal", this.priceFormat(pdTotal / 100));
                                this.$set(this.orderDetail, "pdSendFee", this.priceFormat(pdSendFee / 100));
                                this.$set(this.orderDetail, "pdOtherFee", this.priceFormat(pdOtherFee / 100));
                                // 为每一条添加刊例价,广告费折扣百分比，制作费折扣百分比
                                for (let ta of arr) {
                                    for (let ad of adPrice) {
                                        if (ad.rID == ta.rID) {
                                            ta.adPrice = ad.adPrice / (100 * 2); // 刊例价(面/周)
                                            let onedayPrice = ta.adPrice / 7;
                                            let discount = Math.round(ta.pdAdFee / (onedayPrice * ta.pdDays) * 10000) / 100;
                                            let ADMakeDiscount = Math.round(ta.pdAdMake / (100 * ta.pdNum) * 10000 ) / 100;
                                            ta.discount = isNaN(discount)? 0 : discount; // 广告费折扣百分比
                                            ta.ADMakeDiscount = isNaN(ADMakeDiscount) ? 0 : ADMakeDiscount; // 制作费折扣百分比
                                            break;
                                        }
                                    }
                                }
                                // 整合排期信息
                                let asidRes = this.getSchedules(
                                    this.copyAsidArr
                                );
                                // 整合排期信息并且渲染页面
                                this.priceSheet = this.setSchedules(
                                    arr,
                                    asidRes
                                );
                                // this.loading = false;
                            } else if (res.data.SysCode == 100302) {
                                this.loginTimeout();
                            } else {
                                Message.warning(res.data.MSG);
                            }
                        })
                        .catch(res => {
                            // this.loading = false;
                            console.log(res);
                        });
                })
                .catch(res => {
                    console.log(res);
                });
        },
        // 整合排期信息
        setSchedules(arr, asidRes) {
            for (let arrData of arr) {
                let schedules = "";
                for (let asid of asidRes) {
                    let arrDataRID = arrData.rID.toString().substring(0, 4);
                    let dataRID = asid.rID.toString().substring(0, 4);
                    let ds = dateFormat.toDate(asid.ds, ".");
                    let de = dateFormat.toDate(asid.de, ".");
                    if (arrDataRID == dataRID) {
                        if (schedules == "") {
                            schedules = ds + "-" + de + "(" + asid.mNum + "面)";
                        } else {
                            schedules = schedules +" " + ds + "-" + de +"(" + asid.mNum +"面)";
                        }
                    }
                }
                console.log("schedules----------", schedules);
                arrData.schedules = schedules;
            }
            console.log("arrschedules--------------", arr);
            return arr;
        },
        // 获取过滤选点排期以便在报价单一栏显示排期信息
        getSchedules(asidArr) {
            // 组装数据
            let result = [];
            if (!result.length) {
                let obj = {
                    rID: asidArr[0].rID,
                    ds: dateFormat.toDate(asidArr[0].lStar),
                    de: dateFormat.toDate(asidArr[0].lEnd),
                    asidlist: "",
                    mNum: ""
                };
                result.push(obj);
            }
            // 组合asid
            for (let res of result) {
                let asIDs = "";
                let mNum = 0;
                for (let init of asidArr) {
                    let resRID = res.rID.toString().substring(0, 4);
                    let dataRID = init.rID.toString().substring(0, 4);
                    let start = dateFormat.toDate(init.lStar);
                    let end = dateFormat.toDate(init.lEnd);
                    let resObj = {
                        rID: init.rID,
                        ds: start,
                        de: end,
                        asidlist: "",
                        mNum: ""
                    };
                    if (resRID == dataRID && res.ds == start && res.de == end) {
                        if (asIDs === "") {
                            asIDs = init.asID.toString();
                            mNum = 1;
                        } else {
                            asIDs = asIDs + "," + init.asID;
                            mNum++;
                        }
                    } else {
                        let door = 1;
                        for (let data of result) {
                            let dataR = data.rID.toString().substring(0, 4);
                            let initR = init.rID.toString().substring(0, 4);
                            if (
                                dataR == initR &&
                                data.ds == start &&
                                data.de == end
                            ) {
                                door = 0;
                            }
                        }
                        if (door) {
                            result.push(resObj);
                        }
                    }
                }
                res.asidlist = asIDs;
                res.mNum = mNum;

                console.log("asidS", asIDs);
            }
            console.log("result-------------", result);
            return result;
        },
        // 状态转换成文本
        stateToText(val) {
            let state = [
                { text: "已完成", state: 0 },
                { text: "进行中", state: 1 },
                { text: "未投放", state: 2 },
                { text: "投放中", state: 3 },
                { text: "强制结束", state: 5 }
            ];
            for (let data of state) {
                if (val == data.state) {
                    return data.text;
                }
            }
        },
        // 时间格式规范
        formatTime(val) {
            return dateFormat.toDate(val, ".");
        },
        // 价格加上逗号
        priceFormat(price) {
            // console.log('price', price);
            return commaFormat.init(price);
        },
        // 随机生成合同编号
        getContractNo(rid) {
            let date = new Date();
            let result = "QC";
            result = result + dateFormat.toDate(date, "");
            result = result + rid.toString().substring(0, 4);
            result = result + "00" + Math.round(Math.random() * 10);
            // console.log(result);
            return result;
        },
        // 根据输入转变合同编号
        setApQC() {
            this.orderDetail.apQC = apQC;
        },
        // 当搜索框为空的时候进行重置显示
        init() {
            if (!this.keyword) {
                this.currentSetpoint = this.setpointArr;
            }
        },
        // 搜索
        search() {
            // 账号，姓名
            console.log(this.selectRecName);
            console.log(this.keyword);
            let select = this.selectRecName;
            let keyword = this.keyword;
            if (this.keyword) {
                let arr = [];
                for (let data of this.setpointArr) {
                    if (data.resName) {
                        if (select == "1" && data.resName.includes(keyword)) {
                            arr.push(data);
                        }
                    }
                }
                this.currentSetpoint = arr;
                return;
            }
            this.currentSetpoint = this.setpointArr;
        },
        searchImgChange(){
            let citySelect = this.citySelect;
            if(citySelect[0] == "全部"){
                this.allPic = '';
                this.allhouse ='';
            }
            this.searchImg();
        },
        // 上下刊搜索图片
        searchImg() {
            console.log("citySelect", this.citySelect);
            console.log("allhouse", this.allhouse);
            console.log("allPic", this.allPic);
            let citySelect = this.citySelect;
            let allhouse = this.allhouse;
            let allPic = this.allPic;
            let arr = [];
            let imgArr = [];
            let type = "";
            if (this.planPanel == "forth") {
                imgArr = this.upReportArr;
                type = "upImgArr";
            } else {
                imgArr = this.downReportArr;
                type = "downImgArr";
            }
            if (citySelect[0] == "全部") {
                if(!allhouse && !allPic){
                    arr = imgArr;
                }else{
                    for (let data of imgArr) {
                        if(allhouse && allPic){
                            if(data.resName == allhouse){
                                if (allPic == "1") {
                                    arr.push(data);
                                }
                                if (allPic == "2" && data[type].length) {
                                    arr.push(data);
                                }
                                if (allPic == "3" && !data[type].length) {
                                    arr.push(data);
                                }
                            }
                        } else if (allhouse) {
                            if (data.resName == allhouse) {
                                arr.push(data);
                            }
                        } else if (allPic) {
                            if (allPic == "1") {
                                arr.push(data);
                            }
                            if (allPic == "2" && data[type].length) {
                                arr.push(data);
                            }
                            if (allPic == "3" && !data[type].length) {
                                arr.push(data);
                            }
                        }
                    }
                }
            }else{
                for (let data of imgArr) {
                    if (citySelect.length && allhouse && allPic) {
                        if (
                            data.city == citySelect[0] &&
                            data.rName == citySelect[1] &&
                            data.resName == allhouse
                        ) {
                            if (allPic == "1") {
                                arr.push(data);
                            }
                            if (allPic == "2" && data[type].length) {
                                arr.push(data);
                            }
                            if (allPic == "3" && !data[type].length) {
                                arr.push(data);
                            }
                        }
                    } else if (citySelect.length) {
                        if (
                            data.city == citySelect[0] &&
                            data.rName == citySelect[1]
                        ) {
                            if (allhouse) {
                                if (data.resName == allhouse) {
                                    arr.push(data);
                                }
                            } else if (allPic) {
                                if (allPic == "1") {
                                    arr.push(data);
                                }
                                if (allPic == "2" && data[type].length) {
                                    arr.push(data);
                                }
                                if (allPic == "3" && !data[type].length) {
                                    arr.push(data);
                                }
                            } else {
                                arr.push(data);
                            }
                        }
                    } else if (allhouse) {
                        if (data.resName == allhouse) {
                            if (citySelect.length) {
                                if (
                                    data.city == citySelect[0] &&
                                    data.rName == citySelect[1]
                                ) {
                                    arr.push(data);
                                }
                            } else if (allPic) {
                                if (allPic == "1") {
                                    arr.push(data);
                                }
                                if (allPic == "2" && data[type].length) {
                                    arr.push(data);
                                }
                                if (allPic == "3" && !data[type].length) {
                                    arr.push(data);
                                }
                            } else {
                                arr.push(data);
                            }
                        }
                    } else if (allPic) {
                        if (allPic == "1") {
                            if (
                                citySelect.length &&
                                data.city == citySelect[0] &&
                                data.rName == citySelect[1]
                            ) {
                                arr.push(data);
                            } else if (allhouse) {
                                if (data.resName == allhouse) {
                                    arr.push(data);
                                }
                            } else {
                                arr.push(data);
                            }
                        }
                        if (allPic == "2" && data[type].length) {
                            if (
                                citySelect.length &&
                                data.city == citySelect[0] &&
                                data.rName == citySelect[1]
                            ) {
                                arr.push(data);
                            } else if (allhouse) {
                                if (data.resName == allhouse) {
                                    arr.push(data);
                                }
                            } else {
                                arr.push(data);
                            }
                        }
                        if (allPic == "3" && !data[type].length) {
                            if (
                                citySelect.length &&
                                data.city == citySelect[0] &&
                                data.rName == citySelect[1]
                            ) {
                                arr.push(data);
                            } else if (allhouse) {
                                if (data.resName == allhouse) {
                                    arr.push(data);
                                }
                            } else {
                                arr.push(data);
                            }
                        }
                    }
                }
            }
            console.log("searchImg", arr);
            if (this.planPanel == "forth") {
                this.currUpReportArr = arr;
                this.changePage(1);
            } else {
                this.currDownReportArr = arr;
                this.changePage(1);
            }
            if (!arr.length) {
                Message.warning("查询数据为空");
            }
        },
        // 城市筛选
        filterCity(value, row) {
            return row.city === value;
        },
        // 地区筛选
        filterRName(value, row) {
            return row.rName === value;
        },
        // 排期筛选
        filterTimeRange(value, row) {
            return row.timeRange === value;
        },
        // 点击上传图片按钮之时进行储存所需数据(asid, ptp等)
        saveId(row, order) {
            console.log("row------, order----", row, order);
            this.upLoadData.ptid = row.asID;
            this.imgOrder = order;
            let account = JSON.parse(sessionStorage.getItem("session_data"))
                .username;
            let username = JSON.parse(sessionStorage.getItem("session_data"))
                .realName;
            let alt = {
                plan: this.orderDetail.apName ? this.orderDetail.apName : "",
                res: row.resName ? row.resName : "",
                media: row.mTitle ? row.mTitle : "",
                city: row.city ? row.city : "",
                area: row.rName ? row.rName : "",
                asLab: row.asLab ? row.asLab : "",
                lstart: row.lStar ? row.lStar : "",
                lend: row.lEnd ? row.lEnd : "",
                assettag: row.assetTag ? row.assetTag : "",
                brand: this.orderDetail.bTitle ? this.orderDetail.bTitle : "",
                account: account ? account : "",
                username: username ? username : "",
                resid: row.resID ? row.resID : "",
                address: row.resAddress ? row.resAddress : ""
            };
            this.upLoadData.palt = JSON.stringify(alt);
            this.upLoadData.ptp = sessionStorage.getItem("order_apid");
        },
        // 限制只能上传png,jpeg格式的照片
        beforeAvatarUpload(file) {
            const isIMAGE =
                file.type === "image/jpeg" || file.type === "image/png";
            const isLt1M = file.size / 1024 / 1024 < 2;

            if (!isIMAGE) {
                Message.error("只能上传jpg/png图片!");
                // return false;
            }
            if (!isLt1M) {
                Message.error("上传文件大小不能超过 2MB!");
                // return false;
            }
            return isIMAGE&&isLt1M;
        },
        // 上传上刊图片并关联
        handleUpSuccess(res, file, fileList) {
            console.log("res ------------", res);
            console.log("upfile-----------", file);
            // uid         int【必填】         当前账户UserID
            // pid         int【必填】         图库pID
            // palt        String              图片标题
            // ptype       String              关联类型
            // ptid        int                 关联类型对应唯一ID
            // ptp         String              关联类型区分属性
            this.upLoadData.pid = res.pID;
            this.upLoadData.ptype = "SK";
            console.log("uploaddata", this.upLoadData);

            let info = this.upLoadData;
            api
                .postApi("/SetImg", info)
                .then(res => {
                    console.log(res.data);
                    if (res.data.SysCode == 400200) {
                        Message.success(res.data.MSG);
                        // 实时更新进度条
                        for (let data of this.upReportArr) {
                            if (data.asID == this.upLoadData.ptid) {
                                let item = file.response;
                                let obj = {
                                    name: info.pid + ".png",
                                    url: item.pURL,
                                    uid: info.uid,
                                    pid: info.pid,
                                    palt: info.palt,
                                    ptype: info.ptype,
                                    ptid: info.ptid,
                                    ptp: info.ptp
                                };
                                data.upImgArr.push(obj);
                                data.upImg[this.imgOrder] = [obj];
                            }
                        }
                        this.upReportArr.push();
                        // this.changePage(this.currUpPage);
                    } else if (res.data.SysCode == 100302) {
                        this.loginTimeout();
                    } else {
                        Message.warning(res.data.MSG);
                    }
                })
                .catch(res => {
                    console.log(res);
                });
        },
        // 上传下刊图片并关联
        handleDownSuccess(res, file) {
            console.log("file--------------", file);
            // uid         int【必填】         当前账户UserID
            // pid         int【必填】         图库pID
            // palt        String              图片标题
            // ptype       String              关联类型
            // ptid        int                 关联类型对应唯一ID
            // ptp         String              关联类型区分属性
            this.upLoadData.pid = res.pID;
            this.upLoadData.ptype = "XK";
            console.log("uploaddata", this.upLoadData);

            let info = this.upLoadData;
            api
                .postApi("/SetImg", info)
                .then(res => {
                    console.log(res.data);
                    if (res.data.SysCode == 400200) {
                        Message.success(res.data.MSG);
                        // 实时更新进度条
                        for (let data of this.downReportArr) {
                            if (data.asID == this.upLoadData.ptid) {
                                let item = file.response;
                                let obj = {
                                    name: info.pid + ".png",
                                    url: item.pURL,
                                    uid: info.uid,
                                    pid: info.pid,
                                    palt: info.palt,
                                    ptype: info.ptype,
                                    ptid: info.ptid,
                                    ptp: info.ptp
                                };
                                data.downImgArr.push(obj);
                                data.downImg[this.imgOrder] = [obj];
                            }
                        }
                        this.downReportArr.push();
                        // this.changePage(this.currDownPage);
                    } else if (res.data.SysCode == 100302) {
                        this.loginTimeout();
                    } else {
                        Message.warning(res.data.MSG);
                    }
                })
                .catch(res => {
                    console.log(res);
                });
        },
        //删除照片
        handleRemove(file, fileList) {
            let type = file.ptype;
            let info = file;
            file.ptype = "del";

            console.log("type--file", type, file);

            api
                .postApi("/SetImg", info)
                .then(res => {
                    console.log(res.data);
                    // 实时更新进度条
                    if (res.data.SysCode == 400200) {
                        Message.success(res.data.MSG);
                        if (type == "SK") {
                            for (let i = 0; i < this.upReportArr.length; i++) {
                                if (this.upReportArr[i].asID == file.ptid) {
                                    if (
                                        this.upReportArr[i].upImgArr.length == 1
                                    ) {
                                        this.upReportArr[i].upImgArr = [];
                                        this.upReportArr.push();
                                        break;
                                    } else {
                                        this.upReportArr[i].upImgArr.splice(
                                            i,
                                            1
                                        );
                                        this.upReportArr.push();
                                    }
                                }
                            }
                        } else {
                            for (
                                let i = 0;
                                i < this.downReportArr.length;
                                i++
                            ) {
                                if (this.downReportArr[i].asID == file.ptid) {
                                    if (
                                        this.downReportArr[i].downImgArr
                                            .length == 1
                                    ) {
                                        this.downReportArr[i].downImgArr = [];
                                        this.downReportArr.push();
                                        break;
                                    } else {
                                        this.downReportArr[i].downImgArr.splice(
                                            i,
                                            1
                                        );
                                        this.downReportArr.push();
                                    }
                                }
                            }
                        }
                    } else if (res.data.SysCode == 100302) {
                        // this.loginTimeout();
                    } else {
                        // Message.warning(res.data.MSG);
                    }
                })
                .catch(res => {
                    console.log(res);
                });
            console.log(file, fileList);
        },
        // 查看预览图片
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        downloadUp() {
            Message.warning("该功能尚未完善");
        },
        downloadDown() {
            Message.warning("该功能尚未完善");
        },
        // 查看h5上刊报告按钮
        showH5Up() {
            // getReport
            // this.$router.push("/upReport");
            // window.open(window.location.origin + "/upReport");
            // window.open(window.location.origin + "/Report?SK="+'4564641');
            let apid = sessionStorage.getItem('order_apid');
            api.getApi('/EncryptNo', {num: apid}).then(res =>{
                console.log(res.data);
                window.open(window.location.origin + "/Report?SK="+res.data.EncryptCode);
            }).catch(res =>{
                console.log(res);
            });
        },
        //查看h5下刊报告按钮
        showH5Down() {
            // this.$router.push("/downReport");
            // window.open(window.location.origin + "/downReport");
            let apid = sessionStorage.getItem('order_apid');
            api.getApi('/EncryptNo', {num: apid}).then(res =>{
                console.log(res.data);
                window.open(window.location.origin + "/Report?XK="+res.data.EncryptCode);
            }).catch(res =>{
                console.log(res);
            });
        },
        // 取消修改合同编号
        cancelChangeID() {
            this.changeCID = false;
            Message.info("取消修改合同编号");
        },
        // 修改合同编号
        confirmChangeID() {
            let reg = /^[^\u4e00-\u9fa5]{0,}$/;
            if (!reg.test(this.apQC)) {
                Message.warning("只能输入字母、数字、符号");
                return;
            }
            let qc = this.apQC;
            let apid = this.orderDetail.apID;
            let uid = JSON.parse(sessionStorage.getItem("session_data")).uID;
            // uid         int【必填】     当前账户UserID
            // apid        int【必填】     方案apID
            // qc          String【必填】  方案合同编号
            let info = {
                uid: uid,
                apid: apid,
                qc: qc
            };
            api
                .postApi("/SetAdPlan", info)
                .then(res => {
                    console.log(res);
                    if (res.data.SysCode == 300200) {
                        // this.orderDetail.apQC = qc;
                        this.$set(this.orderDetail, "apQC", qc);
                        Message.success(res.data.MSG);
                    } else if (res.data.SysCode == 100302) {
                        this.loginTimeout();
                    } else {
                        Message.warning(res.data.MSG);
                    }
                })
                .catch(res => {
                    console.log(res);
                });
            this.changeCID = false;
        },
        loginTimeout() {
            Message.warning("登录超时,请重新登录");
            this.$router.push("/login");
        },
        //终止操作确认操作对话框
        disContinue(row) {
            console.log(row);
            let uwho = JSON.parse(sessionStorage.getItem('session_data')).uWho;
            let rid = row.rID.toString().substring(0,4)+'00';
            console.log('uwho------', uwho);
            if((uwho == '0')  || uwho.includes(rid) ){
                let info = {
                    uid: JSON.parse(sessionStorage.getItem("session_data")).uID,
                    lid: row.lID
                };
                this.$confirm(
                    `是否终止 ${row.resName + row.mTitle + row.asLab}面在 ${
                        row.timeRange
                    } 的投放？\n`,
                    "提示",
                    {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning"
                    }
                )
                    .then(() => {
                        api
                            .postApi("/StopADS", info)
                            .then(res => {
                                console.log(res.data);
                                if (!res.data.SysCode) {
                                    this.$set(row, "lState", res.data.lState);
                                    this.$set(row, "lSetTime", res.data.lSetTime);
                                    Message.success("终止成功");
                                } else if (res.data.SysCode == 100302) {
                                    this.loginTimeout();
                                } else {
                                    Message.warning(res.data.MSG);
                                }
                            })
                            .catch(res => {
                                console.log(res);
                            });
                    })
                    .catch(() => {
                        Message.info("已取消操作");
                    });
            }else{
                Message.warning('您没有权限终止点位');
            }
        },

        cancelChangeRemark() {
            this.changeRemark = false;
            Message.info("取消修改监播备注");
        },
        confirmChangeRemark() {
            this.changeRemark = false;
            Message.success("修改监播备注成功");
        },
        //点击换点
        changePoint() {
            // Message.warning("该功能尚未完善");
            sessionStorage.setItem('change_point', 'yes');
            this.usableBtn = true;
            $(window).scrollTop(288);
            this.showTitle = true;
            this.showBtn = false;
            this.showHandel = true;
        },
        //保存更换点位
        saveChangePoint() {
            this.usableBtn = false;
            this.showTitle = false;
            this.showBtn = true;
            this.showHandel = false;
        },
        //取消更换点位
        cancelChangePoint() {
            this.usableBtn = false;
            this.showTitle = false;
            this.showBtn = true;
            this.showHandel = false;
        },
        //添加点位对话框确认按钮
        confirmAddPoint() {
            this.dialogAddPoint = false;
            Message.success("操作成功");
        },
        //添加点位对话框取消按钮
        cancelAddPoint() {
            this.dialogAddPoint = false;
            Message.info("已取消操作");
        }
    },
    mounted: function() {
        $(function() {
            //事件委托
            $(".content_top_wrap").on("click", "dd", function() {
                if ($(this).hasClass("active")) {
                    $(this).removeClass("active");
                } else {
                    $(this).addClass("active");
                }
            });
            //筛选输入框
            $(".content_top_wrap")
                .on("focus", ".input", function() {
                    $(this)
                        .parents(".input-wrap")
                        .addClass("focus");
                    $(this)
                        .siblings("button")
                        .show();
                })
                .on("blur", ".input", function() {
                    $(this)
                        .parents(".input-wrap")
                        .removeClass("focus");
                    $(this)
                        .siblings("button")
                        .hide();
                });

            // $(".content_top_wrap").on("click", ".close-tags", function() {
            //     $(this)
            //         .parents(".tags")
            //         .hide();
            // });
            // $(".content_top_wrap").on("click", ".clear-filter", function() {
            //     $(this)
            //         .parents(".filter-tags")
            //         .hide();
            // });
        });
    }
};
</script>

<style scoped>
/*修改合同号*/
.changeCID {
    color: #1890ff;
    cursor: pointer;
    font-size: 16px;
}

/*tabbar*/
/deep/ .el-textarea__inner {
    resize: vertical;
}

/deep/ .el-tabs__nav-wrap::after {
    background-color: transparent;
}

.box-wrap {
    border: 1px solid #e6e7e9;
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

/deep/ .el-table__row td:nth-child(8),
/deep/ .el-table__row td:nth-child(9),
/deep/ .has-gutter th:nth-child(8),
/deep/ .has-gutter th:nth-child(9) {
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
    padding: 0 46px;
    background-color: #f7f7f7;
}

/deep/ .el-table__expanded-cell[class*="cell"] .el-form {
    height: 44px;
    line-height: 44px;
}

/deep/ .el-table th,
.el-table tr {
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

.first-wrap /deep/ .el-button span,
.first-wrap /deep/ .el-button i {
    /*position: relative;*/
    /*!*top: -2px;*!*/
    left: -23px;
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
    border-bottom: 1px dashed #d8d8d8;
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
    background: #fafafa;
}

/deep/ .el-table__body-wrapper::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/

    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #c1c1c1;
    border-radius: 4px;
}

/deep/ .el-table th > .cell {
    font-weight: bold;
}

/*详情头部*/
.content_top_wrap {
    padding: 34px 28px;
    background: #ffffff;
    border: 1px solid #dedede;
    height: 205px;
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

.plan-title .el-input__inner {
    width: 100%;
}

.plan-detail {
    font-size: 14px;
    color: #333333;
    padding-left: 41px;
}

.plan-detail-left {
    float: left;
    width: 78%;
}

.plan-detail-left ul {
    width: 100%;
    float: left;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    text-align: left;
}

.plan-detail-left ul li {
    float: left;
    width: 280px;
    margin-bottom: 12px;
}

/*.plan-detail-left ul li:nth-child(3n-2) {*/
/*width: 350px;*/
/*}*/

/*.plan-detail-left ul li:nth-child(3n-1) {*/
/*width: 248px;*/
/*}*/

.plan-detail-left ul li em {
    font-size: 14px;
    color: #666666;
}

.plan-detail-right {
    width: 20%;
    float: right;
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
    cursor: pointer;
}

/deep/ .up-loader-header .el-input__inner {
    height: 34px;
    width: 180px;
}

.moreimgs {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
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
    margin-right: 2px;
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
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}

.upload-img {
    position: relative;
    display: inline-block;
    /* margin-left: 10px; */
    width: 144px;
    overflow: hidden;
    height: 192px;
    padding-top: 20px;
    /*margin-left: 20px;*/
}

/*.upload-img + .upload-img {*/
/*margin-left: 32px;*/
/*}*/

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

/deep/ .el-button--default:focus,
.el-button--default:hover {
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
/deep/ .el-table td,
.el-table th {
    padding: 4px 0;
    height: 48px;
}

/*添加点位对话框*/
.first-wrap /deep/ .el-dialog {
    width: 87% !important;
}

/deep/ .el-dialog {
  width: 42%;
}

/*选择点位*/
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

.searchInput /deep/ .el-input__inner,
.searchInput {
    width: 224px !important;
    position: relative;
    left: -7px;
    top: 0;
    height: 34px;
    border-left: none !important;
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
}

/deep/ .date-select.el-input__inner {
    width: 237px;
    position: relative;
    /*top: 3px;*/
    left: 1px;
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
    border: 1px solid #c2c2c2;
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
    height: 34px;
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
    border: 1px solid #d8d8d8;
    margin-top: 8px;
    padding: 10px 18px 0 18px;
}

.dw-panel dl {
    border-bottom: 2px dashed #d8d8d8;
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

/deep/ .buildType .el-input,
/deep/ .buildType .el-input__inner {
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
/* .filter-tags {
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
        } */

/*表格*/
/deep/ .el-table th,
.el-table tr {
    background: #f7f7f7;
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

/deep/ .el-table__expanded-cell[class*="cell"] {
    padding: 0 44px;
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

/deep/ .el-table_3_column_26,
/deep/ .el-table_3_column_27,
/deep/ .el-table_1_column_9,
.el-table_1_column_18,
/deep/ .el-table_2_column_19 {
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

/deep/ .el-table__row td:nth-child(2) .cell span {
    width: 225px;
}

/deep/ .plan-select .el-input__inner {
    width: 180px;
    margin-left: -13px;
    height: 34px;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
}

/deep/ .el-date-editor .el-range__icon {
    position: relative;
    top: -2px;
    left: -3px;
}

/deep/ .search-wrap > span {
    float: left;
    margin-left: 2px;
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

/deep/ .el-dialog__body {
    padding: 30px 20px 0;

}
.imgPreview /deep/ .el-dialog__body{
  height: 640px;
}
.imgPreview /deep/ .el-dialog {
  height: 750px;
}


/deep/ .el-dialog__body img{
  width: 100%;
  height: 640px;
}

/deep/ .el-dialog__footer {
    padding: 20px 20px 20px;
}

/deep/ .el-dialog /deep/ .el-input__inner {
    width: 100%;
}

/deep/ .el-pagination .el-select .el-input .el-input__inner {
    width: 100px;
}

/deep/ .el-pagination__editor.el-input .el-input__inner {
    width: 50px;
}

/*1440*/
@media all and (min-width: 1420px) {
    .tab-info .price h4 {
        width: 92%;
    }

    .panel {
        padding: 20px 30px;
    }

    .upload-img {
        /*margin-left: 33px;*/
    }

    .up-loader-Imgpanel {
        margin-right: 18px;
    }
}

/*1920*/
@media all and (min-width: 1900px) {
    .tab-info .price h4 {
        width: 94%;
    }

    /*.plan-detail-left ul li:nth-child(3n-2) {*/
    /*width: 500px;*/
    /*}*/
    /*.plan-detail-left ul li:nth-child(3n-1) {*/
    /*width: 400px;*/
    /*}*/
    /*.up-loader-Imgpanel + .up-loader-Imgpanel {
            margin-left: 54px;
        }*/
    /*.up-loader-Imgpanel:nth-child(5) {
            margin-left: 0;
        }*/
    .plan-title .handleBtn {
        position: absolute;
        /*right: 135px;*/
        top: 30px;
    }

    .up-loader-Imgpanel {
        width: 445px;
        margin-top: 13px;
      margin-right: 67px;
      margin-left: 61px;
        /*margin-left: 37px;*/
    }

    .plan-detail-right {
        width: 15%;
    }

    .plan-detail-left ul li {
        float: left;
        width: 400px;
        margin-bottom: 12px;
    }
}


</style>
