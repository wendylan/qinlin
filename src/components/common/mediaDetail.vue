<template>
    <div>
      <div class="ad_mediaDetail_wrap clearfix">
        <div class="ad_mediaDetail_nav clearfix">
          <p><a href="#">媒体管理</a><em> / </em><a href="#">媒体详情</a></p>
        </div>

        <!--媒体信息-->
        <div class="ad_mediaInfo">
          <div class="ad_mediaInfo_head">
            <h2>媒体信息</h2>
          </div>
          <div class="ad_mediaInfoPanel" v-model="obj">
            <el-row type="flex" class="row-bg">
              <el-col :span="8">
                <ul>
                  <li>资源名称：<span>{{obj.resName}}</span></li>
                  <li>资源类型：<span>{{obj.cType}}</span></li>
                  <li>所在城市：<span>{{obj.city}}</span></li>
                  <li>所在区域：<span>{{obj.cityArea}}</span></li>
                  <li>所属商圈：<span>{{obj.tradingArea}}</span></li>
                </ul>
              </el-col>
              <el-col :span="8">
                <ul class="">
                  <li>楼盘类型：<span>{{obj.houseType}}</span></li>
                  <li>出入口数：<span>{{obj.EntryExitNum}}</span></li>
                  <li>住户数量：<span>{{obj.HouseNum}}</span></li>
                  <li>楼盘价格：<span>{{obj.housePrice}}</span></li>
                  <li>入住时间：<span>{{obj.joinTime}}</span></li>
                </ul>
              </el-col>
              <el-col :span="8">
                <ul class="">
                 <li> 具体地址：<span>{{obj.resAddress}}</span></li>
                  <li>经纬度：<span>{{obj.latLng}}</span></li>
                 <li> 小区备注：<span>{{obj.remark}}</span></li>
                 <li> 小区全貌：<a href="#" style="color: #108EE9">查看</a></li>
                </ul>
              </el-col>
            </el-row>
          </div>
        </div>

        <!--社区广告门-->
        <div class="ad_ad">
          <div class="ad_adHeader">
            <ul class="ad_tab">
              <li class="curr_ad">社区广告门</li>
              <li style="margin-left: 36px">电梯广告</li>
            </ul>
          </div>
          <div class="ad_adPanel">
            <div class="table_wrap">
              <el-table
                border
                :data="mediaList"
                style="width: 100%"
              >
                <el-table-column
                  prop="mTitle"
                  label="媒体名称"
                  min-width="8%"
                >
                </el-table-column>
                <el-table-column
                  prop="mType"
                  label="门体类型"
                  min-width="7%"
                >
                </el-table-column>
                <el-table-column
                  prop="mState"
                  label="状态"
                  min-width="7%"
                >
                </el-table-column>
                <el-table-column
                  prop="assetTag"
                  label="资产编号"
                  min-width="10.2%"
                >
                </el-table-column>
                <el-table-column
                  prop="adSize"
                  label="广告尺寸"
                  min-width="8%"
                >
                </el-table-column>
                <el-table-column
                  prop="adviewsize"
                  label="可视画面"
                  min-width="8%"
                >
                </el-table-column>
                <el-table-column
                  prop="notPush"
                  label="广告限制"
                  min-width="8%"
                  class="tar"
                >
                </el-table-column>
                <el-table-column
                  prop="mrk"
                  label="备注"
                  min-width="12%"

                >
                </el-table-column>
                <el-table-column
                  label="门禁图片"
                  min-width="6%"
                >
                  <template slot-scope="scope">
                     <div style="color: #0077D6;cursor: pointer;">查看</div>
                  </template>
                </el-table-column>
              </el-table>
             <!-- <table class="adPanel_table" cellpadding="0" cellspacing="0">
                <tr>
                  <th style=" border-top-left-radius: 4px;">媒体名称</th>
                  <th>门体类型</th>
                  <th>状态</th>
                  <th>资产编号</th>
                  <th>广告尺寸</th>
                  <th>可视画面</th>
                  <th>广告限制</th>
                  <th>备注</th>
                  <th style="border-right: none;border-top-right-radius: 4px">门禁照片</th>
                </tr>
                <tr>
                  <td>江南大道东门</td>
                  <td>钣金门</td>
                  <td><span class="dot"></span>待维修</td>
                  <td>005B201710GZ-X250</td>
                  <td>840*1180</td>
                  <td>840*1160</td>

                  <td>地产/汽车/医疗</td>
                  <td>灯光晚上不亮并且白天也不亮灯光晚上不亮并且白天也不亮灯光晚上不亮并且</td>
                  <td style="color: #0077D6;cursor: pointer;border-right: none">查看</td>
                </tr>
                <tr>
                  <td>江南大道东门</td>
                  <td>钣金门</td>
                  <td><span class="dot"></span>待维修</td>
                  <td>005B201710GZ-X250</td>
                  <td>840*1180</td>
                  <td>840*1160</td>

                  <td>地产/汽车/医疗</td>
                  <td>灯光晚上不亮并且白天也不亮灯光晚上不亮并且白天也不亮</td>
                  <td style="color: #0077D6;cursor: pointer;border-right: none">查看</td>
                </tr>
                <tr>
                  <td>江南大道东门</td>
                  <td>钣金门</td>
                  <td><span class="dot"></span>待维修</td>
                  <td>005B201710GZ-X250</td>
                  <td>840*1180</td>
                  <td>840*1160</td>

                  <td>地产/汽车/医疗</td>
                  <td>灯光晚上不亮并且白天也不亮</td>
                  <td style="color: #0077D6;cursor: pointer;border-right: none">查看</td>
                </tr>
                <tr>
                  <td>江南大道东门</td>
                  <td>钣金门</td>
                  <td><span class="dot"></span>待维修</td>
                  <td>005B201710GZ-X250</td>
                  <td>840*1180</td>
                  <td>840*1160</td>
                  <td>地产/汽车/医疗</td>
                  <td>灯光晚上不亮并且白天也不亮</td>
                  <td style="color: #0077D6;cursor: pointer;border-right: none">查看</td>
                </tr>
              </table>-->
            </div>

          </div>
        </div>

        <div class="content_bottom_btn">
          <button class="create">编辑</button>
          <button class="cancel">
            <router-link :to="{path:'/superOperate/mediaList'}">返回</router-link>
          </button>
        </div>
      </div>
    </div>
</template>

<script>
    import api from '../../api/api'
    import commentFun from '../../js/commentFun'
    export default {
        name: "mediaDetail",
        data(){
          return{
            obj:{
              /*resName: '尚东峰景',
              cType: '社区',
              city: '广州',
              cityArea: '海珠区',
              tradingArea: '江南西',

              houseType: '高档小区',
              EntryExitNum: 100,
              HouseNum: 20,
              housePrice:'23333元/平方米',
              joinTime: '2002年9月',

              resAddress: '广州市海珠区工业大道北尚峰路79-81号',
              latLng: '116.307629;116.307629',
              remark: '小区的物业小哥很凶',*/
              resName: '',
              cType: '',
              city: '',
              cityArea: '',
              tradingArea: '',

              houseType: '',
              EntryExitNum: '',
              HouseNum: 1,
              housePrice: 0,
              joinTime: '',

              resAddress: '',
              latLng: '',
              remark: '',
            //  Panorama:'查看',
            },
            mediaList: [
              /*{
                mTitle: '江南大道东门1',
                mType: '钣金门',
                mState: '待维修',
                assetTag: '005B201710GZ-X250',
                adSize: '840*1180',
                adviewsize: '840*1160',
                notPush: '地产/汽车/医疗',
                mrk: '灯光晚上不亮并且白天也不亮',
              },
              {
                mTitle: '江南大道东门2',
                mType: '钣金门',
                mState: '待维修',
                assetTag: '005B201710GZ-X250',
                adSize: '840*1180',
                adviewsize: '840*1160',
                notPush: '地产/汽车/医疗',
                mrk: '灯光晚上不亮并且白天也不亮',
              },
              {
                mTitle: '江南大道东门3',
                mType: '钣金门',
                mState: '待维修',
                assetTag: '005B201710GZ-X250',
                adSize: '840*1180',
                adviewsize: '840*1160',
                notPush: '地产/汽车/医疗',
                mrk: '灯光晚上不亮并且白天也不亮',
              },*/
            ],
          }
        },
      mounted(){
        this.getDataFun()
      },
      methods:{
        getDataFun(){
          let resID = sessionStorage.getItem('resID')
          api.getApi('/GetResCT',{resid:resID,info:'y'}).then(res=>{
            console.log('mediaDetail res.data',res.data) //fNum楼栋数量 dNum出入数量 hNum住户数量
            this.obj.cType = res.data.cType
            this.obj.housePrice = res.data.hPrice + '元/平方米'
            this.obj.joinTime = commentFun.spliceFun(res.data.joinTime)
            this.obj.resAddress = res.data.resAddress
            this.obj.latLng = res.data.latLng
            this.obj.tradingArea = res.data.tradingArea
            this.obj.resName = res.data.resName
            this.obj.HouseNum = res.data.hNum
            this.obj.EntryExitNum = res.data.dNum
            if(res.data.rID.toString().indexOf('4401') === 0){
              this.obj.city = '广州'
            }
            if(res.data.rID.toString().indexOf('106') > 0){
              this.obj.cityArea = '天河区'
            }
            console.log('this.obj',this.obj)
          }).catch(err=>{
            console.log(err);
          });
          api.getApi('/GetMediaList',{resid:1}).then(res=>{
            console.log('res.data',res.data)
            let MediaList = res.data
          //  this.mediaList = MediaList
            for(let i=0; i<MediaList.length; i++){
             /* this.mediaList[i].mTitle = MediaList[i].mTitle
              this.mediaList[i].mType = MediaList[i].mType
              this.mediaList[i].assetTag = MediaList[i].assetTag
              this.mediaList[i].notPush = MediaList[i].notPush
              this.mediaList[i].adSize = MediaList[i].adSize
              this.mediaList[i].mrk = MediaList[i].mrk
              this.mediaList[i].adviewsize = MediaList[i].adviewsize
              if(MediaList[i].mState === 1){
                this.mediaList[i].mState = '正常'
              }*/
              if(MediaList[i].mState === 1){
                MediaList[i].mState = '正常'
              }
            //  this.mediaList[i] = MediaList[i]
              this.mediaList.push(MediaList[i])
            }
          //  console.log(this.mediaList)
          }).catch(err=>{
            console.log(err);
          });
        }
      },
    }
    $(function () {
      $('.ad_tab').find('li').click(function () {
        console.log(123);
        $(this).addClass('curr_ad').siblings().removeClass('curr_ad');
      })
    })
</script>

<style scoped>


  /*面包屑导航*/
  .ad_mediaDetail_nav{
    position: relative;
    height:30px;
  }

  .ad_mediaDetail_nav p {
    padding-left: 57px;
    position: absolute;
    left: 0;
    top: 12px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    line-height: 18px;
  }

  .ad_mediaDetail_nav p em{
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #D9D9D9;
    line-height: 18px;
  }

  .ad_mediaDetail_nav p a{
    color: #666;
  }

  .ad_mediaDetail_nav p a:nth-of-type(1){
    color: #999;
  }

  .ad_mediaDetail_wrap{
    margin-bottom: 80px;
    position: relative;
  }


  /*媒体信息*/
  .ad_mediaInfo{
    width: 1246px;
    height: 266px;
    background: #FFFFFF;
    border: 1px solid #E6E7E9;
    margin: 10px auto;
  }

  .ad_mediaInfo_head{
    width: 100%;
    padding: 12px 0;
    border-bottom: 1px solid #DEDEDE;
  }

  .ad_mediaInfo_head h2{
    font-size: 16px;
    color: #2C313C;
    font-weight: bold;
    padding-left: 16px;
    height: 24px;
    border-left: 2px solid #465D89;

  }

  .ad_mediaInfo .ad_mediaInfoPanel{
    margin-left:28px;
   /* display: flex;
    justify-content: space-between;*/
    padding-right: 100px;
  }

  .ad_mediaInfo .ad_mediaInfoPanel h4{
    font-size: 16px;
    color: #666666;
  }

  .ad_mediaInfo .ad_mediaInfoPanel ul{
    margin-top: 8px;
    float: left;

  }
  .ad_mediaInfo .ad_mediaInfoPanel ul.ml157{
    margin-left: 23%;
  }

  .ad_mediaInfo .ad_mediaInfoPanel ul li{
    font-size: 14px;
    color: #666666;
    margin-top: 16px;
  }


  /*广告*/
  .ad_ad{
    width: 1246px;
    padding-bottom: 30px;
    background: #FFFFFF;
    border: 1px solid #E6E7E9;
    margin: 0 auto;
    margin-bottom: 178px;
  }

  .ad_ad .ad_adHeader{
    width: 100%;
    height: 24px;
    border-bottom: 1px solid #DEDEDE;
    width: 100%;
    padding: 12px 0;
  }
  .ad_ad .ad_adHeader .ad_tab{
    padding-left: 16px;
    height: 24px;
    border-left: 2px solid #465D89;
  }
  .ad_ad .ad_adHeader .ad_tab .curr_ad{
    color:#108DE7 ;
    border-bottom: 3px solid #108DE7;
  }

  .ad_ad .ad_adHeader .ad_tab li{
    float: left;
    height: 33px;
    line-height: 24px;
    font-size: 16px;
    color: #999999;
    cursor: pointer;
    /*border-bottom: 3px solid #108DE7;*/
  }
  .ad_ad .ad_adPanel .table_wrap{
    width:1210px;
    border-radius: 4px;
    border: 1px solid #E2E2E2;
    margin: 0 auto;
    margin-top: 20px;
  }

  .ad_ad .ad_adPanel .adPanel_table{
    /*去掉间距*/
    /*   border-collapse: collapse;*/
    height: 40px;
    line-height: 40px;
    text-align: center;
    width:1210px;
    font-size: 14px;
    color: #666666;
    margin: 0 auto;
    border-radius: 4px;
    /*允许设置列宽*/
    table-layout: fixed;

  }

  .ad_ad .ad_adPanel .adPanel_table th{
    background-color: #f8f8f8;
    border-bottom: 1px solid #E2E2E2;
    border-right: 1px solid #E2E2E2;
    font-size: 14px;
    color: #666666;
    font-weight: bold;
    text-indent: 14px;
    box-sizing: border-box;


  }

  .ad_ad .ad_adPanel .adPanel_table tr th:nth-child(1){
    width: 114px;
  }
  .ad_ad .ad_adPanel .adPanel_table tr th:nth-child(2){
    width: 97px;
  }
  .ad_ad .ad_adPanel .adPanel_table tr th:nth-child(3){
    width: 82px;
  }
  .ad_ad .ad_adPanel .adPanel_table tr th:nth-child(4){
    width: 169px;
  }
  .ad_ad .ad_adPanel .adPanel_table tr th:nth-child(5){
    width: 89px;
  }
  .ad_ad .ad_adPanel .adPanel_table tr th:nth-child(6){
    width: 89px;
  }
  .ad_ad .ad_adPanel .adPanel_table tr th:nth-child(7){
    width: 152px;
  }
  .ad_ad .ad_adPanel .adPanel_table tr th:nth-child(8){
    width: 322px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .ad_ad .ad_adPanel .adPanel_table tr th:nth-child(9){
    width: 84px;
  }

  .ad_ad .ad_adPanel .adPanel_table td{

    border-right: 1px solid #E2E2E2;
    text-indent: 14px;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    border-bottom: 1px solid #E2E2E2;
  }
  .ad_ad .ad_adPanel .adPanel_table tr:last-child td{
    border-bottom:  none;
  }

  .ad_ad .ad_adPanel .adPanel_table td .dot{
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #FE7A38;
    margin-right: 6px;
  }


  /*按钮*/
  .content_bottom_btn{
    position: absolute;
    bottom: -10.3%;
    left: 45.3%;
  }

  .content_bottom_btn button{
    width: 80px;
    height: 34px;
    outline: none;
    cursor: pointer;
  }

  .content_bottom_btn button.create{
    background: #108EE9;
    border-radius: 2px;
    font-size: 14px;
    border: none;
    color: #ffffff;

  }

  .content_bottom_btn button.cancel{
    background: #F5F6FA;
    border: none;
    font-size: 14px;
    color: #979797;
  }

  .ad_index_footer{
    bottom: -140px;
  }

  /*1440*/
  @media screen and (min-width: 1440px) {
    .ad_mediaInfo,.ad_ad{
      width: 1320px;
    }
    .ad_ad .ad_adPanel .adPanel_table{
      width: 1284px;
    }

    .ad_ad .ad_adPanel .adPanel_table tr th:nth-child(10){
      width: 230px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .ad_ad .ad_adPanel .table_wrap{
      width:1284px;
    }

    .content_bottom_btn{
      position: absolute;
      bottom: -66px;
      left: 45.6%;
    }
    .ad_mediaDetail_wrap{
      margin-bottom: 216px;
      position: relative;
    }

  }


  /*1920*/
  @media screen and (min-width: 1920px) {
    .ad_mediaInfo,.ad_ad{
      width: 1800px;
    }
    .ad_ad .ad_adPanel .adPanel_table tr th:nth-child(1){
      width: 154px;
    }
    .ad_ad .ad_adPanel .adPanel_table tr th:nth-child(2){
      width: 137px;
    }
    .ad_ad .ad_adPanel .adPanel_table tr th:nth-child(3){
      width: 122px;
    }
    .ad_ad .ad_adPanel .adPanel_table tr th:nth-child(4){
      width: 189px;
    }
    .ad_ad .ad_adPanel .adPanel_table tr th:nth-child(5){
      width: 109px;
    }
    .ad_ad .ad_adPanel .adPanel_table tr th:nth-child(6){
      width: 109px;
    }
    .ad_ad .ad_adPanel .adPanel_table tr th:nth-child(7){
      width: 211px;
    }
    .ad_ad .ad_adPanel .adPanel_table tr th:nth-child(8){
      width: 639px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .ad_ad .ad_adPanel .adPanel_table tr th:nth-child(9){
      width: 84px;
    }

    .ad_ad .ad_adPanel .adPanel_table{
      width: 1764px;
    }
    .ad_ad .ad_adPanel .table_wrap{
      width:1764px;
    }
    .content_bottom_btn{
      position: absolute;
      bottom: -80px;
      left: 46.7%;
    }

  }


</style>
