<template>
  <div class="ad_mediaDetail_wrap clearfix">
    <div class="ad_mediaDetail_nav clearfix">
      <p><a href="#">客户管理</a><em> / </em><a href="#">客户详情</a></p>
    </div>

    <!--媒体信息-->
    <div class="ad_mediaInfo">
      <div class="ad_mediaInfo_head">
        <h2>客户详情</h2>
      </div>
      <div class="ad_mediaInfoPanel">
        <div class="clientInfo">
          <h4>客户信息</h4>
          <ul>
            <li><em>联系人：</em>欧阳震华</li>
            <li><em>邮箱：</em>444094173@gmail.com</li>
            <li><em>手机号码：</em>13631277777</li>
            <li><em>职位：</em>城市总经理</li>
            <li><em>固定电话：</em>020-3789543</li>
            <li><em>所在地：</em>广州</li>
          </ul>
        </div>
        <div class="companyInfo">
          <h4>公司信息</h4>
          <div class="infobox">
            <ul>
              <li><em>公司名称：</em>广州市试穿传媒文化传播有限公司</li>
              <li><em>公司地址：</em>广州市越秀区广州大道中289号</li>
              <li><em>公司品牌：</em>亲邻团购、亲邻优选、亲邻在线</li>
              <li><em>所在城市：</em>广州</li>
              <li><em>事业部：</em>市场部</li>
              <li><em>所有人：</em>王玉敏</li>
            </ul>
            <div class="remarkBox">
              <p>
                <em>备注：</em>这是一段很长很长很长的文5555555555字这是一段很长很长很长的文字这是一段很长很长很长的文字这是一段很长很长很长的文字段很长很长很长的文字这是一段很长很长很长的文字这是一段很长很长很长的文字
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>

    <div class="content_bottom_btn">
      <button class="create">编辑</button>
      <button class="cancel">返回</button>
    </div>
  </div>
</template>

<script>
    export default {
        name: "clientDetail"
    }
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
    margin-bottom: 278px;
    position: relative;
  }


  /*客户信息*/
  .ad_mediaInfo{
    width: 1246px;
    height: 346px;
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
    padding: 18px 24px;

  }

  .ad_mediaInfo .ad_mediaInfoPanel h4{
    font-size: 14px;
    color: #333333;
    font-weight: bold;
  }

  .ad_mediaInfo .ad_mediaInfoPanel ul{
    margin-top: 8px;

  }
  .ad_mediaInfo .ad_mediaInfoPanel ul.ml157{
    margin-left: 20%;
  }

  .ad_mediaInfo .ad_mediaInfoPanel ul li{
    width: 33.2%;
    font-size: 14px;
    color: #666666;
    margin-top: 16px;
  }

  .clientInfo{
    margin-bottom: 24px;
    height: 100px;
  }
  .clientInfo ul li, .companyInfo ul li{
    float: left;
    /*display: flex;
    justify-content: space-between;
    flex-wrap: wrap;*/
  }
  .infobox{
    /*display: flex;
    justify-content: space-between;*/
  }
  .infobox ul{
    width: 79%;
    /*display: flex;
    justify-content: space-between;*/
  }
  .infobox ul li{
    min-width: 42% !important;
    max-width: 42% !important;
  }
  .infobox .remarkBox{
    /*width: 34%;*/
  }

  .ad_mediaInfoPanel ul li,.remarkBox p{
    font-size: 14px;

  }
  .ad_mediaInfoPanel ul li em,.remarkBox em{
    color: #333333;
  }

  /*按钮*/
  .content_bottom_btn{
    position: absolute;
    bottom: -18.3%;
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



  /*1440*/
  @media screen and (min-width: 1440px) {
    .ad_mediaInfo,.ad_ad{
      width: 1320px;
    }
    .content_bottom_btn{
      position: absolute;
      bottom: -66px;
      left: 45.6%;
    }
    .ad_mediaDetail_wrap{
      margin-bottom: 273px;
      position: relative;
    }


  }


  /*1920*/
  @media screen and (min-width: 1920px) {
    .ad_mediaInfo,.ad_ad{
      width: 1800px;
    }
    .content_bottom_btn{
      position: absolute;
      bottom: -80px;
      left: 46.7%;
    }


  }


</style>


