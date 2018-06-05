<template>
  <div>
    <div>
      <div class="ad_mediaMana_wrap">
        <div class="mediaMana_content_top">
          <div class="content_top_wrap">
            <div class="title">
              <h1>亲邻科技上刊报告</h1>
            </div>
            <div class="detail">
              <p>
                <em>订单名称：</em><i>广州探鱼2期</i>
                <em>任务类型：</em><i>上刊</i>
                <em>点位数量：</em><i>100</i>
              </p>
            </div>
          </div>
        </div>
        <div class="plan-panel">
          <div class="sec-wrap box-wrap">
            <h4>监播图片</h4>
            <div class="tabs">
              <button class="active" @click="box1Change">按资源分</button>
              <button @click="box1Change">按图片分</button>
            </div>
            <div class="typeOfPic">
              <div>
                <div class="picBox">
                  <el-carousel :autoplay="false" trigger="click">
                    <el-carousel-item v-for="item in 2" :key="item" >
                      <!--<h3>{{item}}</h3>-->
                      <img :src=dialogImageUrl alt="">
                    </el-carousel-item>
                  </el-carousel>
                  <!--缩略图-->
                  <div class="mask-btn">
                    <i class="el-icon-search" @click="handlePictureCardPreview"></i>
                  </div>
                  <div class="pic-title">
                    <p>小区名称：线上</p>
                    <p>门禁名称：大门B</p>
                    <p>资产编号：NSZ-0180</p>
                  </div>
                </div>
                <div class="picBox">
                  <el-carousel :autoplay="false" trigger="click">
                    <el-carousel-item v-for="item in 2" :key="item" >
                      <!--<h3>{{item}}</h3>-->
                      <img :src=dialogImageUrl alt="">
                    </el-carousel-item>
                  </el-carousel>
                  <!--缩略图-->
                  <div class="mask-btn">
                    <i class="el-icon-search" @click="handlePictureCardPreview"></i>
                  </div>
                  <div class="pic-title">
                    <p>小区名称：线上</p>
                    <p>门禁名称：大门B</p>
                    <p>资产编号：NSZ-0180</p>
                  </div>
                </div>
                <div class="picBox">
                  <el-carousel :autoplay="false" trigger="click">
                    <el-carousel-item v-for="item in 2" :key="item" >
                      <!--<h3>{{item}}</h3>-->
                      <img :src=dialogImageUrl alt="">
                    </el-carousel-item>
                  </el-carousel>
                  <!--缩略图-->
                  <div class="mask-btn">
                    <i class="el-icon-search" @click="handlePictureCardPreview"></i>
                  </div>
                  <div class="pic-title">
                    <p>小区名称：线上</p>
                    <p>门禁名称：大门B</p>
                    <p>资产编号：NSZ-0180</p>
                  </div>
                </div>
                <div class="picBox">
                  <el-carousel :autoplay="false" trigger="click">
                    <el-carousel-item v-for="item in 2" :key="item" >
                      <!--<h3>{{item}}</h3>-->
                      <img :src=dialogImageUrl alt="">
                    </el-carousel-item>
                  </el-carousel>
                  <!--缩略图-->
                  <div class="mask-btn">
                    <i class="el-icon-search" @click="handlePictureCardPreview"></i>
                  </div>
                  <div class="pic-title">
                    <p>小区名称：线上</p>
                    <p>门禁名称：大门B</p>
                    <p>资产编号：NSZ-0180</p>
                  </div>
                </div>
                <div class="picBox">
                  <el-carousel :autoplay="false" trigger="click">
                    <el-carousel-item v-for="item in 2" :key="item" >
                      <!--<h3>{{item}}</h3>-->
                      <img :src=dialogImageUrl alt="">
                    </el-carousel-item>
                  </el-carousel>
                  <!--缩略图-->
                  <div class="mask-btn">
                    <i class="el-icon-search" @click="handlePictureCardPreview"></i>
                  </div>
                  <div class="pic-title">
                    <p>小区名称：线上</p>
                    <p>门禁名称：大门B</p>
                    <p>资产编号：NSZ-0180</p>
                  </div>
                </div>
              </div>
              <div>
                <div class="picBox">
                  <el-carousel :autoplay="false" trigger="click">
                    <el-carousel-item v-for="item in 2" :key="item" >
                      <!--<h3>{{item}}</h3>-->
                      <img :src=dialogImageUrl alt="">
                    </el-carousel-item>
                  </el-carousel>
                  <!--缩略图-->
                  <div class="mask-btn">
                    <i class="el-icon-search" @click="handlePictureCardPreview"></i>
                  </div>
                  <div class="pic-title">
                    <p>小区名称：线上</p>
                    <p>门禁名称：大门B</p>
                    <p>资产编号：NSZ-0180</p>
                  </div>
                </div>
                <div class="picBox">
                  <el-carousel :autoplay="false" trigger="click">
                    <el-carousel-item v-for="item in 2" :key="item" >
                      <!--<h3>{{item}}</h3>-->
                      <img :src=dialogImageUrl alt="">
                    </el-carousel-item>
                  </el-carousel>
                  <!--缩略图-->
                  <div class="mask-btn">
                    <i class="el-icon-search" @click="handlePictureCardPreview"></i>
                  </div>
                  <div class="pic-title">
                    <p>小区名称：线上</p>
                    <p>门禁名称：大门B</p>
                    <p>资产编号：NSZ-0180</p>
                  </div>
                </div>
                <div class="picBox">
                  <el-carousel :autoplay="false" trigger="click">
                    <el-carousel-item v-for="item in 2" :key="item" >
                      <!--<h3>{{item}}</h3>-->
                      <img :src=dialogImageUrl alt="">
                    </el-carousel-item>
                  </el-carousel>
                  <!--缩略图-->
                  <div class="mask-btn">
                    <i class="el-icon-search" @click="handlePictureCardPreview"></i>
                  </div>
                  <div class="pic-title">
                    <p>小区名称：线上</p>
                    <p>门禁名称：大门B</p>
                    <p>资产编号：NSZ-0180</p>
                  </div>
                </div>
                <div class="picBox">
                  <el-carousel :autoplay="false" trigger="click">
                    <el-carousel-item v-for="item in 2" :key="item" >
                      <!--<h3>{{item}}</h3>-->
                      <img :src=dialogImageUrl alt="">
                    </el-carousel-item>
                  </el-carousel>
                  <!--缩略图-->
                  <div class="mask-btn">
                    <i class="el-icon-search" @click="handlePictureCardPreview"></i>
                  </div>
                  <div class="pic-title">
                    <p>小区名称：线上</p>
                    <p>门禁名称：大门B</p>
                    <p>资产编号：NSZ-0180</p>
                  </div>
                </div>
                <div class="picBox">
                  <el-carousel :autoplay="false" trigger="click">
                    <el-carousel-item v-for="item in 2" :key="item" >
                      <!--<h3>{{item}}</h3>-->
                      <img :src=dialogImageUrl alt="">
                    </el-carousel-item>
                  </el-carousel>
                  <!--缩略图-->
                  <div class="mask-btn">
                    <i class="el-icon-search" @click="handlePictureCardPreview"></i>
                  </div>
                  <div class="pic-title">
                    <p>小区名称：线上</p>
                    <p>门禁名称：大门B</p>
                    <p>资产编号：NSZ-0180</p>
                  </div>
                </div>
              </div>
              <div class="pager">
                <el-pagination
                  small
                  background
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="1"
                  :page-sizes="[10, 20]"
                  :page-size="5"
                  layout=" sizes, prev, pager, next, jumper"
                  :total="30">
                </el-pagination>
              </div>
            </div>
            <!--缩略图对话框-->
            <el-dialog :visible.sync="dialogVisible">
              <img style="width: 100%;height: 100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import {
    Dialog,
    Tabs,
    TabPane,
    Table,
    TableColumn,
    Input,
    Button,
    Upload,
    Select,
    Option,
    Checkbox,
    Card,
    Progress,
    Cascader,
    Pagination,
    MessageBox,
    Message,
    Form,
    FormItem,
    Carousel,
    CarouselItem
  } from 'element-ui';
  export default {
    name: "ludanReport",
    components: {
      elDialog: Dialog,
      elTabs: Tabs,
      elTabPane: TabPane,
      elTable: Table,
      elTableColumn: TableColumn,
      elInput: Input,
      elButton: Button,
      elUpload: Upload,
      elSelect: Select,
      elOption: Option,
      elCheckbox: Checkbox,
      elCard: Card,
      elProgress: Progress,
      elCascader: Cascader,
      elPagination: Pagination,
      elForm: Form,
      elFormItem: FormItem,
      elCarousel:Carousel,
      elCarouselItem:CarouselItem
    },
    data() {
      return {
        planPanel: 'first',
        //搜索框
        searchInput: '',
        planSelect: '',
        //监播图片内容
        isActive1: true,
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
        //投放详情
        putDetail: [
          {
            recName: '珠江帝景花园二期',
            city: '广州',
            origin: '海珠区',
            address: '广州市天河区中山大道西109号',
            buildType: '高端住宅',
            houseNum: '600',
            buildPrice: '￥30,000',
            mediaName: '广州市中山大道',
            buildNum: '12',
            businessOrigin: '白云万达广场',
            assetID: 'GZ201871024',
            liveYear: '1999年',
            adLimit: '地产/医药/汽车',
            mediaNum: 1,
            liveTime: '2006'
          },
          {
            recName: '珠江帝景花园二期',
            city: '广州',
            origin: '海珠区',
            address: '广州市天河区中山大道西109号',
            buildType: '高端住宅',
            houseNum: '600',
            buildPrice: '￥30,000',
            mediaName: '广州市中山大道',
            buildNum: '12',
            businessOrigin: '白云万达广场',
            assetID: 'GZ201871024',
            liveYear: '1999年',
            adLimit: '地产/医药/汽车',
            mediaNum: 1,
            liveTime: '2006'
          },
          {
            recName: '珠江帝景花园二期',
            city: '广州',
            origin: '海珠区',
            address: '广州市天河区中山大道西109号',
            buildType: '高端住宅',
            houseNum: '600',
            buildPrice: '￥30,000',
            mediaName: '广州市中山大道',
            buildNum: '12',
            businessOrigin: '白云万达广场',
            assetID: 'GZ201871024',
            liveYear: '1999年',
            adLimit: '地产/医药/汽车',
            mediaNum: 1,
            liveTime: '2006'
          },
          {
            recName: '珠江帝景花园二期',
            city: '广州',
            origin: '海珠区',
            address: '广州市天河区中山大道西109号',
            buildType: '高端住宅',
            houseNum: '600',
            buildPrice: '￥30,000',
            mediaName: '广州市中山大道',
            buildNum: '12',
            businessOrigin: '白云万达广场',
            assetID: 'GZ201871024',
            liveYear: '1999年',
            adLimit: '地产/医药/汽车',
            mediaNum: 1,
            liveTime: '2006'
          },
          {
            recName: '珠江帝景花园二期',
            city: '广州',
            origin: '海珠区',
            address: '广州市天河区中山大道西109号',
            buildType: '高端住宅',
            houseNum: '600',
            buildPrice: '￥30,000',
            mediaName: '广州市中山大道',
            buildNum: '12',
            businessOrigin: '白云万达广场',
            assetID: 'GZ201871024',
            liveYear: '1999年',
            adLimit: '地产/医药/汽车',
            mediaNum: 1,
            liveTime: '2006'
          },
          {
            recName: '珠江帝景花园二期',
            city: '广州',
            origin: '海珠区',
            address: '广州市天河区中山大道西109号',
            buildType: '高端住宅',
            houseNum: '600',
            buildPrice: '￥30,000',
            mediaName: '广州市中山大道',
            buildNum: '12',
            businessOrigin: '白云万达广场',
            assetID: 'GZ201871024',
            liveYear: '1999年',
            adLimit: '地产/医药/汽车',
            mediaNum: 1,
            liveTime: '2006'
          },
          {
            recName: '珠江帝景花园二期',
            city: '广州',
            origin: '海珠区',
            address: '广州市天河区中山大道西109号',
            buildType: '高端住宅',
            houseNum: '600',
            buildPrice: '￥30,000',
            mediaName: '广州市中山大道',
            buildNum: '12',
            businessOrigin: '白云万达广场',
            assetID: 'GZ201871024',
            liveYear: '1999年',
            adLimit: '地产/医药/汽车',
            mediaNum: 1,
            liveTime: '2006'
          },
          {
            recName: '珠江帝景花园二期',
            city: '广州',
            origin: '海珠区',
            address: '广州市天河区中山大道西109号',
            buildType: '高端住宅',
            houseNum: '600',
            buildPrice: '￥30,000',
            mediaName: '广州市中山大道',
            buildNum: '12',
            businessOrigin: '白云万达广场',
            assetID: 'GZ201871024',
            liveYear: '1999年',
            adLimit: '地产/医药/汽车',
            mediaNum: 1,
            liveTime: '2006'
          },
          {
            recName: '珠江帝景花园二期',
            city: '广州',
            origin: '海珠区',
            address: '广州市天河区中山大道西109号',
            buildType: '高端住宅',
            houseNum: '600',
            buildPrice: '￥30,000',
            mediaName: '广州市中山大道',
            buildNum: '12',
            businessOrigin: '白云万达广场',
            assetID: 'GZ201871024',
            liveYear: '1999年',
            adLimit: '地产/医药/汽车',
            mediaNum: 1,
            liveTime: '2006'
          },
          {
            recName: '珠江帝景花园二期',
            city: '广州',
            origin: '海珠区',
            address: '广州市天河区中山大道西109号',
            buildType: '高端住宅',
            houseNum: '600',
            buildPrice: '￥30,000',
            mediaName: '广州市中山大道',
            buildNum: '12',
            businessOrigin: '白云万达广场',
            assetID: 'GZ201871024',
            liveYear: '1999年',
            adLimit: '地产/医药/汽车',
            mediaNum: 1,
            liveTime: '2006'
          },
          {
            recName: '珠江帝景花园二期',
            city: '广州',
            origin: '海珠区',
            address: '广州市天河区中山大道西109号',
            buildType: '高端住宅',
            houseNum: '600',
            buildPrice: '￥30,000',
            mediaName: '广州市中山大道',
            buildNum: '12',
            businessOrigin: '白云万达广场',
            assetID: 'GZ201871024',
            liveYear: '1999年',
            adLimit: '地产/医药/汽车',
            mediaNum: 1,
            liveTime: '2006'
          },
          {
            recName: '珠江帝景花园二期',
            city: '广州',
            origin: '海珠区',
            address: '广州市天河区中山大道西109号',
            buildType: '高端住宅',
            houseNum: '600',
            buildPrice: '￥30,000',
            mediaName: '广州市中山大道',
            buildNum: '12',
            businessOrigin: '白云万达广场',
            assetID: 'GZ201871024',
            liveYear: '1999年',
            adLimit: '地产/医药/汽车',
            mediaNum: 1,
            liveTime: '2006'
          },
          {
            recName: '珠江帝景花园二期',
            city: '广州',
            origin: '海珠区',
            address: '广州市天河区中山大道西109号',
            buildType: '高端住宅',
            houseNum: '600',
            buildPrice: '￥30,000',
            mediaName: '广州市中山大道',
            buildNum: '12',
            businessOrigin: '白云万达广场',
            assetID: 'GZ201871024',
            liveYear: '1999年',
            adLimit: '地产/医药/汽车',
            mediaNum: 1,
            liveTime: '2006'
          },
          {
            recName: '珠江帝景花园二期',
            city: '广州',
            origin: '海珠区',
            address: '广州市天河区中山大道西109号',
            buildType: '高端住宅',
            houseNum: '600',
            buildPrice: '￥30,000',
            mediaName: '广州市中山大道',
            buildNum: '12',
            businessOrigin: '白云万达广场',
            assetID: 'GZ201871024',
            liveYear: '1999年',
            adLimit: '地产/医药/汽车',
            mediaNum: 1,
            liveTime: '2006'
          },

        ],
        //发布情况
        postDetail:[
          {
            city:'广州',
            planNum:200,
            realNum:200,
            wrongNum:0,
            resolveNum:0,
          },
          {
            city:'深圳',
            planNum:200,
            realNum:200,
            wrongNum:0,
            resolveNum:0,
          },
        ],
        //缩略图对话框
        dialogVisible:false,
        dialogImageUrl: '../../../static/images/testPic.png',
      }
    },
    mounted() {
      $(function () {
        $('.tabs').find('button').click(function () {
          $(this).addClass('active').siblings().removeClass('active');
        });
        $('.picBox').mouseenter(function () {
          $(this).find('.mask-btn').show()
        }).mouseleave(function () {
          $(this).find('.mask-btn').hide()
        })

      });
    },
    methods: {
      box1Change() {
        this.isActive1 = !this.isActive1;
      },
      filterCity(value, row) {
        return row.city === value;
      },
      filterOrigin(value, row) {
        return row.origin === value;
      },
      //页码
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      //缩略图
      handlePictureCardPreview(){
        this.dialogVisible = true;
      }
    }
  }
</script>

<style scoped>

  .ad_mediaMana_wrap {
    width: 100%;
    box-sizing: border-box;
    padding: 0 60px;
    position: relative;
  }

  .mediaMana_content_top {
    padding: 28px 31px 60px;
    background-color: #fff;
    width: 1247px;
    box-sizing: border-box;
    /*height: 100px;*/
  }

  .title {
    margin-right: 200px;
  }

  .title h1 {
    font-size: 28px;
    margin-bottom: 8px;
    color: rgba(0, 0, 0, 0.85);
    font-weight: bold;
  }

  .title h3 {
    font-size: 20px;
    color: #333333;
    font-weight: bold;
    margin-bottom: 12px;
  }

 /* .detail{
    border-bottom: 1px solid #D8D8D8;
    padding-bottom: 20px;
  }*/

  .detail p {
    margin-top: 12px;
  }

  .detail p em {
    font-size: 14px;
    color: #333333;
    margin-left: 24px;
  }

  .detail p em:nth-of-type(1) {
    margin-left: 0;
  }

  .detail p i {
    font-size: 14px;
    color: #2a2a2a;
    font-style: normal;
  }

  .plan-panel {
    width: 1247px;
    position: relative;

    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin-top: 10px;
  }


  /*监播图片*/
  .box-wrap > h4 {
    height: 55px;
    padding-left: 28px;
    border-bottom: 1px solid #e6e7e9;
    font-size: 16px;
    color: rgba(51, 51, 51, 0.85);
    line-height: 55px;
    font-weight: bold;
    background-color: #fff;
  }
  .tabs {
    padding-left: 24px;
    height: 34px;
    padding-top: 10px;
    background-color: #FFFFFF;
  }
  .tabs button {
    width: 88px;
    height: 32px;
    outline: none;
    border: 1px solid #D9D9D9;
    border-radius: 4px 0 0 4px;
    background-color: #fff;
    cursor: pointer;
    float: left;
  }
  .tabs button + button {
    /*margin-left: 1px;*/
    border-radius: 0 4px 4px 0;
  }
  .tabs button.active {
    border: 1px solid #1890FF;
    font-weight: bold;
    color: #1890ff;
  }
  /*图片*/
  .box-wrap{
    border: 1px solid #e9e9e9;
    border-radius: 4px;
  }
  .typeOfRec,.typeOfPic{
    padding: 15px 24px 30px ;
    background: #fff;
  }
  .picBox{
    width: 220px;
    /*height: 326px;*/
    padding: 4px;
    box-sizing: border-box;
    border: 1px solid #E9E9E9;
    border-radius: 2px;
    display: inline-block;
    margin-bottom: 22px;
    position: relative;
  }
  .picBox + .picBox{
    margin-left: 19px;
  }
  .picBox img{
    width: 210px;
    height: 280px;
    margin-bottom: 4px;
    border-bottom: 1px solid #e9e9e9;
  }
  .picBox .pic-title{
    font-size: 14px;
    color: #666666;
    /*text-align: center;*/
    margin-top: -12px;
    padding-left: 5px;
    /*line-height: 4px;*/
  }
  /deep/ .el-carousel__button{
    width: 18px ;
  }
  /deep/ .el-carousel__indicators{
    bottom: 28px;
  }
  /*发布情况*/
  .forth-wrap /deep/ .el-table th, .el-table tr{
    padding: 6px 0;
  }
  .forth-wrap /deep/ .el-table .cell{
    padding: 9px 14px;
  }
  /deep/ .el-table_2_column_13,/deep/ .el-table_2_column_14, /deep/ .el-table_2_column_15 {
    text-align: right;
  }
  .mask-btn{
    display: none;
  }
  .mask-btn .el-icon-search{
    position: absolute;
    left: 43%;
    top: 40%;
    font-size: 30px;
    color: #fff;
    cursor: pointer;
    z-index: 2;
  }

  /*页码*/
  .pager {
    position: relative;
    height: 32px;
    margin-top: 18px;
    top: -22px;
    right: 0px;
  }
  /deep/ .el-select .el-input .el-select__caret{
    position: relative;
    left: -9px;
  }
  /deep/ .el-select{
    top: -4px;
  }

  /deep/ .btn-prev{
    position: relative;
    top: -4px !important;
  }
  /deep/ .el-pagination {
    position: absolute;
    right: 0;
    top: 10px;
  }

  /deep/ .el-pagination.is-background .el-pager li {
    font-weight: normal;
    font-size: 13px;
    background-color: transparent ;
  }
  /deep/ .el-pagination button, .el-pagination span:not([class*=suffix]){
    position: relative;
    top: 0px !important;
    background-color: transparent !important;
  }
  /deep/ .el-pagination__jump{
    margin-left: 13px;
    position: relative;
    top: -4px;
  }




  /*1440*/
  @media all and (min-width: 1440px) {
    .mediaMana_content_top,.plan-panel{
      width: 1320px;
    }
    .picBox + .picBox{
      margin-left: 37px;
    }
  }

  /*1920*/
  @media all and (min-width: 1920px) {
    .mediaMana_content_top,.plan-panel{
      width: 1800px;
    }
    .picBox + .picBox[data-v-74e3f71e] {
      margin-left: 118px;
    }
    .typeOfRec[data-v-74e3f71e], .typeOfPic[data-v-74e3f71e] {
      padding: 0 103px 30px;
    }

  }
</style>
