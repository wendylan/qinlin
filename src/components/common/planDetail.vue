<template>
  <div>
    <div class="ad_mediaMana_wrap">
      <div class="ad_mediaMana_nav clearfix">
        <p><a href="#">方案管理</a><em> / </em><a href="#">方案详情</a></p>
        <div class="tip">该方案由 shanqi 创建于 2018.04.26 10:37:48</div>
      </div>
      <!--资源信息-->
      <div class="mediaMana_content_top">
        <div class="content_top_wrap">
          <div class="plan-title">
            <h4>
              <img src="../../assets/home/orderlogo.png" alt="">珠江帝景地产三月投放
              <!--<p>{{cid}}<img src="../../assets/home/bi.png" alt="" @click="changeCID = true"></p>-->
            </h4>
            <div class="handleBtn">
              <el-button plain>导出</el-button>
              <el-button type="primary">编辑</el-button>
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
            <div class="plan-panel">
              <el-tabs v-model="planPanel">
                <el-tab-pane label="选点排期" name="first">
                  <div class="first-wrap box-wrap">
                    <h4>选点排期</h4>
                    <div class="table_wrap">
                      <el-table
                        border
                        :data="planList"
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
                      </el-table>
                    </div>
                  </div>
                  <div class="content_bottom_btn">
                    <button class="cancel">返回</button>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="报价单" name="second">
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
                  <div class="content_bottom_btn">
                    <button class="cancel">返回</button>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
        </div>
      </div>
      <div class="mediaMana_content_bottom clearfix">
        <div class="content_bottom_wrap">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Tabs, TabPane, Button, Table, TableColumn, Form, FormItem } from 'element-ui';
  export default {
	name: "planDetail",
	components:{
		elTabs: Tabs,
		elTabPane: TabPane,
		elButton: Button,
		elTable: Table,
		elTableColumn: TableColumn,
		elForm: Form,
		elFormItem: FormItem,
	},
    data() {
      return {
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
        planList: [
          {
            recName: '珠江帝景花园',
            city: '广州',
            origin: '海珠区',
            putAB:'A面',
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
            putAB:'A面',
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
            putAB:'A面',
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
            putAB:'A面',
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
            putAB:'A面',
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
            putAB:'A面',
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
            putAB:'A面',
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
            putAB:'A面',
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
            putAB:'A面',
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
            putAB:'A面',
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
            putAB:'A面',
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
            putAB:'A面',
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
            putAB:'A面',
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
            putAB:'A面',
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
            putAB:'A面',
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
      };
    },
    methods:{
      filterCity(value, row) {
        return row.city === value;
      },
      filterOrigin(value, row) {
        return row.origin === value;
      },
      filterSchedules(value, row) {
        return row.schedules === value;
      },
      tableRowClassName({row, rowIndex}) {
        //状态行 根据状态判断
        if (rowIndex === 0) {
          //添加类名
          return 'warning-row'
        }
        return '';
      }

    }
  }

</script>

<style scoped>

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

  .plan-panel {
    position: absolute;
    top: 190px;
    width: 100%;
    left: 0;
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
    margin-bottom: 109px;
    position: relative;
  }

  .ad_mediaMana_nav p a:nth-of-type(1) {
    color: #999;
  }
  /*资源信息*/
  .mediaMana_content_top {
    padding: 42px 60px 0 60px;
  }

  .mediaMana_content_bottom {
    padding: 11px 60px;
  }

  .content_bottom_wrap {
    height: 612px;
    margin-top: 178px;
  }

  /*按钮*/
  .content_bottom_btn {
    margin-top: 20px;
    width: 100%;
    text-align: center;
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

  /*1440*/
  @media screen and (min-width: 1440px) {
    .tab-info .price h4 {
      width: 92%;
    }
    .up-loader-Imgpanel+.up-loader-Imgpanel{
      margin-left: 39px;
    }
    .up-loader-Imgpanel:nth-child(4){
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
    .up-loader-Imgpanel+.up-loader-Imgpanel{
      margin-left: 54px;
    }
    .up-loader-Imgpanel:nth-child(5){
      margin-left: 0;
    }

  }

</style>
