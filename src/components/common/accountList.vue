<template>
  <div class="ad_mediaDetail_wrap clearfix">
    <div class="ad_mediaDetail_nav ">
      <p class="clearfix"><a href="#">账号管理</a></p>
    </div>
    <div class="mediaList_wrap">
      <div class="mediaList_head">
        <h2>账号列表</h2>
      </div>
      <div class="mediaList_container">
        <el-row>
          <div class="mediaList_handel">
            <el-input  v-model="input" placeholder="公司名称、公司品牌"></el-input>
            <div class="block">
              <el-button type="primary" icon="el-icon-search">搜索</el-button>
              <el-button plain>新建</el-button>
            </div>

          </div>
        </el-row>
        <div class="table_wrap">
          <!--<ul>
            <li>联系人</li>
            <li>所在地</li>
            <li>职位</li>
            <li>手机号码</li>
            <li>公司名称</li>
            <li class="Csaixuan">所在城市
              <img  src="../../assets/mediaMana/ld.png" alt="">
              <div class="typeBox">
                <div class="ckboxH">
                  <el-checkbox label="">超级运营</el-checkbox>
                </div>
                <div class="ckboxH">
                  <el-checkbox label="">复选框 A</el-checkbox>
                </div>
                <div class="ckboxH">
                  <el-checkbox label="">复选框 A</el-checkbox>
                </div>
                <div class="ckboxH">
                  <el-checkbox label="">复选框 A</el-checkbox>
                </div>
                <div class="ckboxH">
                  <el-checkbox label="">复选框 A</el-checkbox>
                </div>
                <p><span class="rec_typeYes">清除</span><span class="rec_typeNo">确认</span></p>
              </div>
            </li>
            <li>公司品牌</li>
            <li>所有人</li>
            <li>创建日期</li>
            <li style="border-right: none;border-top-right-radius: 4px">
              操作
            </li>
          </ul>
          <div class="tr_wrap">
            <table class="adPanel_table" cellpadding="0" cellspacing="0">
              <tr>
                <td>成吉思汗</td>
                <td>成都</td>
                <td>城市总经理</td>
                <td>075586070000</td>
                <td>深圳市亲邻科技有限公司广州分公司</td>
                <td>广州</td>
                <td>亲邻团购/社区门禁</td>
                <td>欧阳震华</td>
                <td >2018.03.08</td>
                <td style="position: relative">
                  <a href="#" style="color: #0077D6">查看</a>
                </td>
              </tr>
              <tr>
                <td>成吉思汗</td>
                <td>成都</td>
                <td>城市总经理</td>
                <td>075586070000</td>
                <td>深圳市亲邻科技有限公司广州分公司</td>
                <td>广州</td>
                <td>亲邻团购/社区门禁</td>
                <td>欧阳震华</td>
                <td >2018.03.08</td>
                <td style="position: relative">
                  <a href="#" style="color: #0077D6">查看</a>
                </td>
              </tr>
              <tr>
                <td>成吉思汗</td>
                <td>成都</td>
                <td>城市总经理</td>
                <td>075586070000</td>
                <td>深圳市亲邻科技有限公司广州分公司</td>
                <td>广州</td>
                <td>亲邻团购/社区门禁</td>
                <td>欧阳震华</td>
                <td >2018.03.08</td>
                <td style="position: relative">
                  <a href="#" style="color: #0077D6">查看</a>
                </td>
              </tr>
              <tr>
                <td>成吉思汗</td>
                <td>成都</td>
                <td>城市总经理</td>
                <td>075586070000</td>
                <td>深圳市亲邻科技有限公司广州分公司</td>
                <td>广州</td>
                <td>亲邻团购/社区门禁</td>
                <td>欧阳震华</td>
                <td >2018.03.08</td>
                <td style="position: relative">
                  <a href="#" style="color: #0077D6">查看</a>
                </td>
              </tr>
              <tr>
                <td>成吉思汗</td>
                <td>成都</td>
                <td>城市总经理</td>
                <td>075586070000</td>
                <td>深圳市亲邻科技有限公司广州分公司</td>
                <td>广州</td>
                <td>亲邻团购/社区门禁</td>
                <td>欧阳震华</td>
                <td >2018.03.08</td>
                <td style="position: relative">
                  <a href="#" style="color: #0077D6">查看</a>
                </td>
              </tr>
              <tr>
                <td>成吉思汗</td>
                <td>成都</td>
                <td>城市总经理</td>
                <td>075586070000</td>
                <td>深圳市亲邻科技有限公司广州分公司</td>
                <td>广州</td>
                <td>亲邻团购/社区门禁</td>
                <td>欧阳震华</td>
                <td >2018.03.08</td>
                <td style="position: relative">
                  <a href="#" style="color: #0077D6">查看</a>
                </td>
              </tr>
              <tr>
                <td>成吉思汗</td>
                <td>成都</td>
                <td>城市总经理</td>
                <td>075586070000</td>
                <td>深圳市亲邻科技有限公司广州分公司</td>
                <td>广州</td>
                <td>亲邻团购/社区门禁</td>
                <td>欧阳震华</td>
                <td >2018.03.08</td>
                <td style="position: relative">
                  <a href="#" style="color: #0077D6">查看</a>
                </td>
              </tr>
              <tr>
                <td>成吉思汗</td>
                <td>成都</td>
                <td>城市总经理</td>
                <td>075586070000</td>
                <td>深圳市亲邻科技有限公司广州分公司</td>
                <td>广州</td>
                <td>亲邻团购/社区门禁</td>
                <td>欧阳震华</td>
                <td >2018.03.08</td>
                <td style="position: relative">
                  <a href="#" style="color: #0077D6">查看</a>
                </td>
              </tr>
              <tr>
                <td>成吉思汗</td>
                <td>成都</td>
                <td>城市总经理</td>
                <td>075586070000</td>
                <td>深圳市亲邻科技有限公司广州分公司</td>
                <td>广州</td>
                <td>亲邻团购/社区门禁</td>
                <td>欧阳震华</td>
                <td >2018.03.08</td>
                <td style="position: relative">
                  <a href="#" style="color: #0077D6">查看</a>
                </td>
              </tr>
              <tr>
                <td>成吉思汗</td>
                <td>成都</td>
                <td>城市总经理</td>
                <td>075586070000</td>
                <td>深圳市亲邻科技有限公司广州分公司</td>
                <td>广州</td>
                <td>亲邻团购/社区门禁</td>
                <td>欧阳震华</td>
                <td >2018.03.08</td>
                <td style="position: relative">
                  <a href="#" style="color: #0077D6">查看</a>
                </td>
              </tr>
              <tr>
                <td>成吉思汗</td>
                <td>成都</td>
                <td>城市总经理</td>
                <td>075586070000</td>
                <td>深圳市亲邻科技有限公司广州分公司</td>
                <td>广州</td>
                <td>亲邻团购/社区门禁</td>
                <td>欧阳震华</td>
                <td >2018.03.08</td>
                <td style="position: relative">
                  <a href="#" style="color: #0077D6">查看</a>
                </td>
              </tr>
              <tr>
                <td>成吉思汗</td>
                <td>成都</td>
                <td>城市总经理</td>
                <td>075586070000</td>
                <td>深圳市亲邻科技有限公司广州分公司</td>
                <td>广州</td>
                <td>亲邻团购/社区门禁</td>
                <td>欧阳震华</td>
                <td >2018.03.08</td>
                <td style="position: relative">
                  <a href="#" style="color: #0077D6">查看</a>
                </td>
              </tr>
              <tr>
                <td>成吉思汗</td>
                <td>成都</td>
                <td>城市总经理</td>
                <td>075586070000</td>
                <td>深圳市亲邻科技有限公司广州分公司</td>
                <td>广州</td>
                <td>亲邻团购/社区门禁</td>
                <td>欧阳震华</td>
                <td >2018.03.08</td>
                <td style="position: relative">
                  <a href="#" style="color: #0077D6">查看</a>
                </td>
              </tr>
              <tr>
                <td>成吉思汗</td>
                <td>成都</td>
                <td>城市总经理</td>
                <td>075586070000</td>
                <td>深圳市亲邻科技有限公司广州分公司</td>
                <td>广州</td>
                <td>亲邻团购/社区门禁</td>
                <td>欧阳震华</td>
                <td >2018.03.08</td>
                <td style="position: relative">
                  <a href="#" style="color: #0077D6">查看</a>
                </td>
              </tr>
              <tr>
                <td>成吉思汗</td>
                <td>成都</td>
                <td>城市总经理</td>
                <td>075586070000</td>
                <td>深圳市亲邻科技有限公司广州分公司</td>
                <td>广州</td>
                <td>亲邻团购/社区门禁</td>
                <td>欧阳震华</td>
                <td >2018.03.08</td>
                <td style="position: relative">
                  <a href="#" style="color: #0077D6">查看</a>
                </td>
              </tr>
              <tr>
                <td>成吉思汗</td>
                <td>成都</td>
                <td>城市总经理</td>
                <td>075586070000</td>
                <td>深圳市亲邻科技有限公司广州分公司</td>
                <td>广州</td>
                <td>亲邻团购/社区门禁</td>
                <td>欧阳震华</td>
                <td >2018.03.08</td>
                <td style="position: relative">
                  <a href="#" style="color: #0077D6">查看</a>
                </td>
              </tr>
              <tr>
                <td>成吉思汗</td>
                <td>成都</td>
                <td>城市总经理</td>
                <td>075586070000</td>
                <td>深圳市亲邻科技有限公司广州分公司</td>
                <td>广州</td>
                <td>亲邻团购/社区门禁</td>
                <td>欧阳震华</td>
                <td >2018.03.08</td>
                <td style="position: relative">
                  <a href="#" style="color: #0077D6">查看</a>
                </td>
              </tr>
              <tr>
                <td>成吉思汗</td>
                <td>成都</td>
                <td>城市总经理</td>
                <td>075586070000</td>
                <td>深圳市亲邻科技有限公司广州分公司</td>
                <td>广州</td>
                <td>亲邻团购/社区门禁</td>
                <td>欧阳震华</td>
                <td >2018.03.08</td>
                <td style="position: relative">
                  <a href="#" style="color: #0077D6">查看</a>
                </td>
              </tr>
              <tr>
                <td>成吉思汗</td>
                <td>成都</td>
                <td>城市总经理</td>
                <td>075586070000</td>
                <td>深圳市亲邻科技有限公司广州分公司</td>
                <td>广州</td>
                <td>亲邻团购/社区门禁</td>
                <td>欧阳震华</td>
                <td >2018.03.08</td>
                <td style="position: relative">
                  <a href="#" style="color: #0077D6">查看</a>
                </td>
              </tr>
              <tr>
                <td>成吉思汗</td>
                <td>成都</td>
                <td>城市总经理</td>
                <td>075586070000</td>
                <td>深圳市亲邻科技有限公司广州分公司</td>
                <td>广州</td>
                <td>亲邻团购/社区门禁</td>
                <td>欧阳震华</td>
                <td >2018.03.08</td>
                <td style="position: relative">
                  <a href="#" style="color: #0077D6">查看</a>
                </td>
              </tr>
            </table>
          </div>-->
          <el-table
            border
            :data="accountList"
            style="width: 100%"
            :default-sort = "{prop: 'date', order: 'descending'}"
          >
            <el-table-column
              prop="account"
              label="账号"
              min-width="11.8%"
            >
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              min-width="7.8%"
            >
            </el-table-column>
            <el-table-column
              prop="PermissionCity"
              label="权限城市"
              class="tar"
              min-width="14.2%"
            >
            </el-table-column>
            <el-table-column
              prop="role"
              label="账号角色"
              min-width="8.1%"
            >
            </el-table-column>
            <el-table-column
              prop="boss"
              label="上级"
              min-width="7.8%"
            >
            </el-table-column>
            <el-table-column
              prop="username"
              label="创建者账号"
              min-width="11.8%"

            >
            </el-table-column>
              <el-table-column
                prop="cDate"
                label="创建日期"
                sortable
                min-width="9.8%"
              >
              </el-table-column>
            <el-table-column
              prop="Status"
              label="状态"
              min-width="8.9%"
              :filters="[
              { text: '正常', value: '正常' },
              { text: '禁用', value: '禁用' },

              ]"
              :filter-method="filterCity"
              :filter-multiple="false"
            >
            </el-table-column>

            <el-table-column
              label="操作"
              min-width="7.1%"
            >
              <template slot-scope="scope">
                <a href="#" style="color: #108EE9">权限</a>
                <a href="#" style="color: #108EE9">禁用</a>
              </template>
            </el-table-column>
          </el-table>
        </div>

      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: "customList",
    data() {
      return {
        input: '',
        //表格
        accountList: [{
          account: '13621370000',
          name: '王玉敏',
          PermissionCity: '广州亲邻/深圳亲邻/成都亲邻/北京亲邻',
          role:'运营',
          boss:'曾俊超',
          username:'liudehua123',
          cDate:'2018.03.08',
          Status:'正常',

        }, {
          account: '13621370000',
          name: '王玉敏',
          PermissionCity: '广州亲邻/深圳亲邻/成都亲邻/北京亲邻',
          role:'运营',
          boss:'曾俊超',
          username:'liudehua123',
          cDate:'2018.03.08',
          Status:'正常',

        },  {
          account: '13621370000',
          name: '王玉敏',
          PermissionCity: '广州亲邻/深圳亲邻/成都亲邻/北京亲邻',
          role:'运营',
          boss:'曾俊超',
          username:'liudehua123',
          cDate:'2018.03.08',
          Status:'正常',

        }, {
          account: '13621370000',
          name: '王玉敏',
          PermissionCity: '广州亲邻/深圳亲邻/成都亲邻/北京亲邻',
          role:'运营',
          boss:'曾俊超',
          username:'liudehua123',
          cDate:'2018.03.08',
          Status:'正常',

        }, {
          account: '13621370000',
          name: '王玉敏',
          PermissionCity: '广州亲邻/深圳亲邻/成都亲邻/北京亲邻',
          role:'运营',
          boss:'曾俊超',
          username:'liudehua123',
          cDate:'2018.03.08',
          Status:'正常',

        }, {
          account: '13621370000',
          name: '王玉敏',
          PermissionCity: '广州亲邻/深圳亲邻/成都亲邻/北京亲邻',
          role:'运营',
          boss:'曾俊超',
          username:'liudehua123',
          cDate:'2018.03.08',
          Status:'正常',

        }, {
          account: '13621370000',
          name: '王玉敏',
          PermissionCity: '广州亲邻/深圳亲邻/成都亲邻/北京亲邻',
          role:'运营',
          boss:'曾俊超',
          username:'liudehua123',
          cDate:'2018.03.08',
          Status:'正常',

        }, {
          account: '13621370000',
          name: '王玉敏',
          PermissionCity: '广州亲邻/深圳亲邻/成都亲邻/北京亲邻',
          role:'运营',
          boss:'曾俊超',
          username:'liudehua123',
          cDate:'2018.03.08',
          Status:'正常',

        }, {
          account: '13621370000',
          name: '王玉敏',
          PermissionCity: '广州亲邻/深圳亲邻/成都亲邻/北京亲邻',
          role:'运营',
          boss:'曾俊超',
          username:'liudehua123',
          cDate:'2018.03.08',
          Status:'正常',

        }, {
          account: '13621370000',
          name: '王玉敏',
          PermissionCity: '广州亲邻/深圳亲邻/成都亲邻/北京亲邻',
          role:'运营',
          boss:'曾俊超',
          username:'liudehua123',
          cDate:'2018.03.08',
          Status:'正常',

        }, {
          account: '13621370000',
          name: '王玉敏',
          PermissionCity: '广州亲邻/深圳亲邻/成都亲邻/北京亲邻',
          role:'运营',
          boss:'曾俊超',
          username:'liudehua123',
          cDate:'2018.03.08',
          Status:'正常',

        }, {
          account: '13621370000',
          name: '王玉敏',
          PermissionCity: '广州亲邻/深圳亲邻/成都亲邻/北京亲邻',
          role:'运营',
          boss:'曾俊超',
          username:'liudehua123',
          cDate:'2018.03.08',
          Status:'正常',

        }, {
          account: '13621370000',
          name: '王玉敏',
          PermissionCity: '广州亲邻/深圳亲邻/成都亲邻/北京亲邻',
          role:'运营',
          boss:'曾俊超',
          username:'liudehua123',
          cDate:'2018.03.08',
          Status:'正常',

        }, {
          account: '13621370000',
          name: '王玉敏',
          PermissionCity: '广州亲邻/深圳亲邻/成都亲邻/北京亲邻',
          role:'运营',
          boss:'曾俊超',
          username:'liudehua123',
          cDate:'2018.03.08',
          Status:'正常',

        }, {
          account: '13621370000',
          name: '王玉敏',
          PermissionCity: '广州亲邻/深圳亲邻/成都亲邻/北京亲邻',
          role:'运营',
          boss:'曾俊超',
          username:'liudehua123',
          cDate:'2018.03.08',
          Status:'正常',

        }, ]
      }
    },
    methods: {
      //筛选
      filterCity(value, row) {
        return row.city === value;
      },

    }

  }

</script>

<style scoped>

  /*筛选*/
  .el-checkbox+.el-checkbox{
    margin-left: 0;
  }
  .Csaixuan{
    position: relative;
    cursor: pointer;
  }
  .Csaixuan .typeBox{
    width: 100px;
    height: 150px;
    border: 1px solid #108EE9;
    background-color: #ffffff;
    position: absolute;
    z-index: 999;
    border-radius: 4px;
    top: 36px;
    left: 56px;
    display: none;
  }

  .typeBox p{
    height: 30px;
    font-size: 12px;
    text-align: center;
    line-height: 30px;
    border-top: 1px solid #cccccc;
  }

  .rec_typeYes,.rec_typeNo{
    display: inline-block;
    width: 50px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    cursor: pointer;
    font-weight: normal;
    color: #108EE9;
  }

  .ckboxH{
    height: 24px;
    font-size: 14px;
    line-height: 23px;
    padding-left: 8px;

  }
  /deep/ .el-checkbox__label{
    font-size: 10px;
    color: #8A8A8A;
  }


  /*日期控件*/
  .block{
    display: inline-block;
    position: relative;
    top: 0;
  }
  /deep/ .el-input__inner{
    width: 180px;
    height: 34px;
  }


  /deep/ .el-date-editor .el-range__icon{
    position: absolute;
    right: 10px;
    top: 0;
  }
  /deep/.el-picker-panel .el-date-range-picker .el-popper{
    left: 335px !important;
  }


  /*面包屑导航*/
  .ad_mediaDetail_wrap{
    position: relative;

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


  .ad_mediaDetail_nav p a{
    color: #666;
  }

  .ad_mediaDetail_nav{
    height: 42px;
    position: relative;
  }


  /*wrap*/
  .mediaList_wrap{
    width: 1246px;
    background: #FFFFFF;
    border: 1px solid #E6E7E9;
    margin: 0 auto;
    margin-bottom: 46px;
  }

  .mediaList_wrap .mediaList_head{
    width: 100%;
    height: 24px;
    padding: 12px 0;
    border-bottom: 1px solid #E6E7E9;
  }

  .mediaList_wrap .mediaList_head h2{
    font-size: 16px;
    color: #2C313C;
    height: 24px;
    border-left: 2px solid #465D89;
    padding-left: 14px;
    font-weight: bold;
  }
  .mediaList_wrap .mediaList_container{
    width: 100%;
    padding: 18px 18px 28px 18px;
  }

  .el-input{
    width: 180px;
    height: 34px!important;
    border-radius: 4px;
  }

  .el-button--primary{
    background-color: #108EE9;
  }

  .el-button{
    width: 76px;
    height: 34px;
    text-align: center;
    line-height: 34px;
    padding: 0;
    margin-left: 6px;
    position: relative;
    top: 1px;
    left: 0;
  }
  .mediaList_wrap .mediaList_container .table_wrap{
    width: 1210px;
    margin: 10px 0 0 0;
    border-radius: 4px;

  }

  /deep/.el-date-editor .el-range-separator{
    line-height: 26px;
  }


  .table_wrap{
    width:1210px;
    border-radius: 4px;
    margin: 0 auto;
    margin-top: 20px;
  }

  /*表格*/


  /deep/.el-date-editor .el-range-separator{
    line-height: 26px;
  }

  /deep/.el-table th, .el-table tr{
    height: 44px;
    padding: 0;
    background-color: #f7f7f7;

  }
  /deep/ .el-table td{
    padding: 8px 0;
    overflow-x: hidden;
    text-overflow: ellipsis;
  }
  /deep/.el-table--border{
    border-radius: 4px;
    height: 445px;
  }

  /deep/ .el-table th>.cell{
    font-size: 14px;
    color: #666666;
    font-weight: bold;
  }
  /deep/ .el-table .caret-wrapper{
    width: 22px;
  }

  /deep/ .el-table_1_column_3 {
    text-align: right;
  }

  /deep/.el-table--enable-row-hover .el-table__body tr:hover>td{
    background-color: #ecf5ff;
  }

  /*滚动条*/
  /deep/ .el-table__body-wrapper{
    height: 405px;
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
  /*超出省略*/
  /deep/ .el-table .cell{
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  /*筛选*/
  /deep/  .el-table__column-filter-trigger{
    margin-left: 10px;
  }
  /deep/.el-table th>.cell.highlight{
    color: #409EFF !important;
  }

  /deep/ div.el-table-filter{
    left: 1106px !important;
  }
  /*操作*/
  /deep/.el-button--mini, .el-button--small{
    font-size: 14px !important;
  }

  /deep/.el-button .el-button--primary .el-button--mini{
    width: 51px;
  }
  /deep/.el-dropdown-menu--mini .el-dropdown-menu__item{
    width: 65px;
  }


  /* .table_wrap .tr_wrap{
     width: 1208px;
     height: 409px;
     overflow-x:hidden;
     overflow-y: auto;
     position: relative;
     !* 隐藏上下箭头 *!

   }
   .tr_wrap::-webkit-scrollbar{
     width: 4px;
     background: #FAFAFA;

   }
   .tr_wrap::-webkit-scrollbar-thumb {!*滚动条里面小方块*!

     -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
     background: #C1C1C1;
     border-radius: 4px;
   }

   .adPanel_table{
     !*去掉间距*!
     !*   border-collapse: collapse;*!
     height: 40px;
     line-height: 40px;
     text-align: center;
     width:1210px;
     font-size: 14px;
     color: #666666;
     margin: 0 auto;
     border-radius: 4px;
     !*允许设置列宽*!
     table-layout: fixed;

   }

   .adPanel_table th{
     background-color: #f8f8f8;
     border-bottom: 1px solid #E2E2E2;
     border-right: 1px solid #E2E2E2;
     font-size: 14px;
     color: #666666;
     font-weight: bold;
     text-indent: 14px;
     box-sizing: border-box;
   }
   .table_wrap ul{
     width: 1210px;
     height: 42px;
   }
   .table_wrap ul li{
     float: left;
     font-size: 14px;
     color: #666666;
     font-weight: bold;
     height: 42px;
     background: #F7F7F7;
     text-align: left;
     line-height: 42px;
     padding-left: 14px;
     box-sizing: border-box;
     border-right: 1px solid #E9E9E9;
     border-bottom: 1px solid #e9e9e9;
   }

   .table_wrap ul li img{
     width: 10px;
     height: 10px;
     margin-left: 1px;
   }

   .table_wrap ul li:nth-child(1){
     width: 84px;
   }
   .table_wrap ul li:nth-child(2){
     width: 100px;
   }
   .table_wrap ul li:nth-child(3){
     width: 101px;
   }
   .table_wrap ul li:nth-child(4){
     width: 133px;
   }
   .table_wrap ul li:nth-child(5){
     width: 256px;
   }
   .table_wrap ul li:nth-child(6){
     width: 126px;
   }
   .table_wrap ul li:nth-child(7){
     width: 167px;
   }
   .table_wrap ul li:nth-child(8){
     width: 85px;
   }
   .table_wrap ul li:nth-child(9){
     width: 101px;
   }
   .table_wrap ul li:nth-child(10){
     width: 57px;
   }


   .adPanel_table tr td:nth-child(1){
     width: 82px;
   }
   .adPanel_table tr td:nth-child(2){
     width: 98px;
   }
   .adPanel_table tr td:nth-child(3){
     width: 99px;
   }
   .adPanel_table tr td:nth-child(4){
     width: 130px;
   }
   .adPanel_table tr td:nth-child(5){
     width: 252px;
   }
   .adPanel_table tr td:nth-child(6){
     width: 123px;
   }
   .adPanel_table tr td:nth-child(7){
     width: 165px;
   }
   .adPanel_table tr td:nth-child(8){
     width: 84px;
   }
   .adPanel_table tr td:nth-child(9){
     width: 100px;
   }
   .adPanel_table tr td:nth-child(10){
     width: 56px;
   }


   .adPanel_table td{
     border-right: 1px solid #E2E2E2;
     text-indent: 14px;
     text-align: left;

     border-bottom: 1px solid #E2E2E2;
   }
   .adPanel_table tr:last-child td{
     border-bottom:  none;
   }
 */

  .tar{
    text-align: right!important;
    padding-right: 10px;
  }

  /deep/ .el-dropdown .el-button-group .el-button{
    height: 28px;

  }

  /deep/ .el-button:focus, /deep/ .el-button:hover{
    border: 1px solid #409eff;
    color: #409EFF;
    background-color: #ffffff;

  }




  /*1440*/
  @media screen and (min-width: 1440px) {



    .ad_mediaDetail_nav p {
      padding-left: 60px;
    }
    .mediaList_wrap{
      width: 1321.3px!important;
      margin-bottom: 177px!important;
    }

    .mediaList_wrap .mediaList_container .table_wrap{
      width: 1284px;
    }




  }


  /*1920*/
  @media screen and (min-width: 1920px) {


    .mediaList_wrap{
      width: 1800px!important;
      margin-bottom: 211px!important;
    }

    .mediaList_wrap .mediaList_container .table_wrap{
      width: 1764px!important;
    }


  }


</style>
