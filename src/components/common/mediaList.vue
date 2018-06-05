<template>
  <div class="ad_mediaDetail_wrap clearfix">
    <div class="ad_mediaDetail_nav ">
      <p><a href="#" style="color: #666">媒体管理</a></p>
    </div>
    <div class="mediaList_wrap">
      <div class="mediaList_head">
        <h2>媒体列表</h2>
      </div>
      <div class="mediaList_container">
        <el-row>
          <div class="mediaList_handel">
            <!--<el-input v-model="input" placeholder="资源名称、商圈"></el-input>-->
            <div style="display:inline-block">
              <el-input placeholder="请输入内容" v-model="inputInfo" class="input-with-select">
                <el-select v-model="selectInfo" slot="prepend" placeholder="请选择">
                  <el-option v-for="item in SelOptions"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>
              </el-input>
            </div>
            <span><el-button type="primary" icon="el-icon-search" @click="searchFun">搜索</el-button></span>
            <span><el-button plain @click="newMedia" v-if="showNewBtn">新建</el-button></span>
            <!--<span><el-button plain>导入</el-button></span>
            <span><el-button plain>导出</el-button></span>-->
          </div>
        </el-row>
        <div class="table_wrap">
          <el-table
            border
            :data="planList"
            style="width: 100%"
            :default-sort="{prop: 'resName', order: 'descending'}"
          >
            <el-table-column
              label="资源名称"
              min-width="10.2%"
            >
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" :content="scope.row.resName" placement="bottom">
                  <span @click="mediaDetail(scope.row)" v-if="haveDetail" style="color: #1890ff;cursor: pointer">
                   <!-- <router-link :to="{path:'/'+rootPath+'/mediaDetail'}" class="nav_fast">{{scope.row.resName}}
                    </router-link>-->
                    {{scope.row.resName}}
                  </span>
                  <span v-else>{{scope.row.resName}}</span>
                </el-tooltip>

              </template>
            </el-table-column>
            <el-table-column
              prop="rtName"
              label="资源类型"
              min-width="7%"
              :filters="[
              { text: '社区', value: '社区' },
              { text: '写字楼', value: '写字楼' },
              ]"
              :filter-method="filterRecType"
              :filter-multiple="true"
            >
            </el-table-column>
            <el-table-column
              prop="city"
              label="城市"
              min-width="5%"
              :filters="filtersCity"
              :filter-method="filterCity"
              :filter-multiple="false"
            ><!--[
              { text: '石家庄', value: '石家庄' },
              { text: '广州', value: '广州' },
              { text: '上海', value: '上海' },
              { text: '北京', value: '北京' },
              { text: '深圳', value: '深圳' }
              ]-->
            </el-table-column>
            <el-table-column
              prop="rName"
              label="区域"
              min-width="6.1%"
              :filters="filtersRName"
              :filter-method="filterRegion"
              :filter-multiple="false"
            ><!--[
              { text: '天河区', value: '天河区' },
              { text: '越秀区', value: '越秀区' },
              { text: '海珠区', value: '海珠区' },
              { text: '黄浦区', value: '黄浦区' },
              { text: '白云区', value: '白云区' }
              ]-->
            </el-table-column>
            <el-table-column
              prop="tradingArea"
              label="商圈"
              min-width="10.2%"
            >
            </el-table-column>
            <el-table-column
              prop="mVehicle"
              label="媒体类型"
              min-width="7.4%"
              :filters="[
              { text: '广告门', value: '广告门' },
              { text: '社区门', value: '社区门' }
              ]"
              :filter-method="filterMediaType"
              :filter-multiple="true"
            >
            </el-table-column>
            <el-table-column
              prop="mTitle"
              label="媒体名称"
              min-width="8.2%"
            >
            </el-table-column>
            <el-table-column
              prop="assetTag"
              label="资产编号"
              min-width="12.7%"
            >
            </el-table-column>
            <el-table-column
              prop="pNum"
              label="可投面数"
              min-width="6.1%"
              class="tar"
            >
            </el-table-column>
            <el-table-column
              prop="mState"
              label="媒体状态"
              min-width="7.7%"
              :filters="[
              { text: '待维修', value: '待维修' },
              { text: '待安装', value: '待安装' },
              { text: '正常', value: '正常' },
              { text: '禁止', value: '禁止' },
              ]"
              :filter-method="filterPTStatus"
              :filter-multiple="false"
            >
            </el-table-column>
            <el-table-column
              label="操作"
              min-width="7.4%"
            >
              <template slot-scope="scope">
                <el-dropdown size="small" split-button class="handel_btn" trigger="click" :hide-on-click="true">
                  操作
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native.prevent="confirmBox($event,scope.$index, scope.row)">待安装
                    </el-dropdown-item>
                    <el-dropdown-item @click.native.prevent="confirmBox($event,scope.$index, scope.row)">正常
                    </el-dropdown-item>
                    <el-dropdown-item @click.native.prevent="confirmBox($event,scope.$index, scope.row)">待维修
                    </el-dropdown-item>
                    <el-dropdown-item @click.native.prevent="confirmBox($event,scope.$index, scope.row)">禁用
                    </el-dropdown-item>
                    <!-- <el-dropdown-item @click.native.prevent="confirmBox($event,scope.$index, scope.row)">删除</el-dropdown-item>-->
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    Form,
    FormItem,
    Table,
    TableColumn,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Input,
    Row,
    Button,
    Tooltip,
    MessageBox,
    Message,
    Select,
    Option
  } from 'element-ui';
  import api from '../../api/api'
  import areaToText from '../../commonFun/areaToText.js';

  export default {
    name: "mediaList",
    components: {
      elForm: Form,
      elFormItem: FormItem,
      elTable: Table,
      elTableColumn: TableColumn,
      elDropdown: Dropdown,
      elDropdownMenu: DropdownMenu,
      elDropdownItem: DropdownItem,
      elInput: Input,
      elRow: Row,
      elButton: Button,
      elTooltip: Tooltip,
      elSelect: Select,
      elOption: Option,
    },
    data() {
      return {
        rootPath: '',
        showNewBtn: true,   // 新建按钮
        haveDetail: true,
        //搜索框和下拉列表
        inputInfo: '',
        selectInfo: '1',
        SelOptions: [
          {
            value: '1',
            label: '资源名称'
          }, {
            value: '2',
            label: '商圈'
          }
        ],
        //表格
        /* planList: [
           {
             city: '石家庄',
             business: '白云万达商业广场',
             mediaType: '广告门',
             mediaName: '西街大道东门',
             assetID: '005B2018D3GZ-X446',
             usableNum: '2',
             ptStatus: '正常'
           }, {
             city: '石家庄',
             business: '白云万达商业广场',
             mediaType: '广告门',
             mediaName: '西街大道东门',
             assetID: '005B2018D3GZ-X446',
             usableNum: '2',
             ptStatus: '正常'
           }, {
             city: '石家庄',
             business: '白云万达商业广场',
             mediaType: '广告门',
             mediaName: '西街大道东门',
             assetID: '005B2018D3GZ-X446',
             usableNum: '2',
             ptStatus: '正常'
           }]*/
        planList: [],
        currentPlan: [],
        filtersCity: [],    // 城市头部筛选
        filtersRName: [], // 区域头部筛选
      }
    },
    mounted: function () {
      let path = this.$route.path.split('/')[1];
      if (path != 'media' && path != 'superOperate') {
        this.showNewBtn = false;
      }

      let nowPath = this.$route.path; // /media/mediaList

      if (nowPath.indexOf('/operate/') !== -1) {
        this.haveDetail = false
      }
      $(function () {
        $('body').on('.el-tooltip__popper.is-light').css({
          'color': '#666666'
        })
      });

      this.getData();
    },
    methods: {
      //新建跳转
      newMedia() {
        this.$router.push('./mediaInput');
      },

      //筛选
      filterRecType(value, row) {
        return row.rtName === value;
        /*return row.rtName.value.includes(value);*/
        /* if(value =='全国'){
           return true;
         }
         return row.uWhoArr.includes(value);*/
      },
      filterCity(value, row) {
        return row.city === value;
      },
      filterRegion(value, row) {
        return row.rName === value;
      },
      filterMediaType(value, row) {
        return row.mVehicle === value;
      },
      filterPTStatus(value, row) {
        return row.mState === value;
      },
      //确认框
      confirmBox(e, index, rows) {
        let Status = e.target.innerText;
        let mstate = ''
        console.log('状态', Status)
        console.log('行内容', rows)//mState
        if (rows.mState == Status) {
          Message({
            type: 'warning',
            message: '当前状态已是' + Status
          });
        } else if (rows.mState === '正常' && Status === '待安装') {
          Message({
            type: 'warning',
            message: '请按正常流程走，当前媒体已安装'
          });
        } else if (rows.mState === '待安装') {
          if (Status === '正常') {
            Message({
              type: 'warning',
              message: '请完善资产编号'
            });
          } else {
            Message({
              type: 'warning',
              message: '需先完成每天安装任务'
            });
          }
        } else if (Status === '待安装') {
          Message({
            type: 'warning',
            message: '请按正常流程走，当前媒体已安装'
          });
        } else {
          if (Status == '正常') {
            mstate = '1'
          } else if (Status == '禁用') {
            mstate = '0'
          } else if (Status == '待安装') {
            mstate = '2'
          } else if (Status == '待维修') {
            mstate = '3'
          }
          let uid = JSON.parse(sessionStorage.getItem('session_data')).uID
          let mid = rows.mID

          api.postApi('/CtrlMedia', {uid: uid, mid: mid, mstate: mstate}).then(res => {
            console.log('修改状态：', res)
            MessageBox.confirm('<p>你确定更改媒体状态为<b>' + Status + '</b>吗？</p>', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              dangerouslyUseHTMLString: true,
              type: 'warning'
            }).then(() => {
              //确定
              Message({
                type: 'success',
                message: '成功更改状态'
              });
              this.planList[index].mState = Status;
            }).catch(() => {
              Message({
                type: 'info',
                message: '已取消操作'
              })
            })
          })
        }

      },
      submitForm() {
        this.$http({})
      },

      //删除
      deleteRow(index, rows) {
        console.log()
        MessageBox.confirm('你确定删除这条数据吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          Message({
            type: 'success',
            message: '删除成功！'
          });
          //删除
          rows.splice(index, 1);
        }).catch(() => {
          Message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      getData() {
        // let reclist =  [
        //   {resID: 1,rID: 440106,rName: "越秀区",resName: "帝景山庄1",tradingArea: "山泉1",rtName: "社区",mID: 440106000001,mVehicle: "广告门",mTitle: "帝景1门",assetTag: "201707GZ-1316",pNum: 2,mState: "1"},
        //   {resID: 2,rID: 110101,rName: "东城区",resName: "帝景山庄2",tradingArea: "山泉2",rtName: "写字楼",mID: 440106000002,mVehicle: "广告门",mTitle: "帝景2门",assetTag: "201707GZ-1324",pNum: 2,mState: "2"},
        //   {resID: 3,rID: 440106,rName: "越秀区",resName: "帝景山庄1",tradingArea: "山泉3",rtName: "社区",mID: 440106000003,mVehicle: "广告门",mTitle: "帝景3门",assetTag: "201707GZ-1329",pNum: 2,mState: "0"},
        //   {resID: 17,rID: 440303,rName: "南山区",resName: "帝景山庄4",tradingArea: "山泉4",rtName: "写字楼",mID: 440106000003,mVehicle: "广告门",mTitle: "帝景3门",assetTag: "201707GZ-1329",pNum: 2,mState: "3"},]
        // this.planList = reclist
        // for(let i=0;i<this.planList.length;i++){
        //   let rName = {
        //     text: this.planList[i].rName,
        //     value: this.planList[i].rName
        //   }
        //   let rCity = {
        //     text: this.planList[i].city,
        //     value: this.planList[i].city
        //   }
        //   //  this.filtersRName.push(rName)
        //   if(JSON.stringify(this.filtersRName).indexOf(rName.value) === -1){
        //     this.filtersRName.push(rName)
        //   }
        //   if(JSON.stringify(this.filtersCity).indexOf(rCity.value) === -1){
        //     this.filtersCity.push(rCity)
        //   }
        // }
        //请求
        let dataArr = []
        let uid = JSON.parse(sessionStorage.getItem('session_data')).uID
        api.getApi('/GetRMList', {uid: uid}).then(res => {
          // console.log('资源媒体列表：', res.data)
          let RMList = res.data
          if (!RMList.SysCode) {
            // let RMList = reclist
            if (RMList) {
              console.log('资源媒体列表：', res.data)
              for (let i = 0; i < RMList.length; i++) {
                if (RMList[i].mState == '1') {
                  RMList[i].mState = '正常'
                } else if (RMList[i].mState == '0') {
                  RMList[i].mState = '禁止'
                } else if (RMList[i].mState == '2') {
                  RMList[i].mState = '待安装'
                } else if (RMList[i].mState == '3') {
                  RMList[i].mState = '待维修'
                }
                areaToText.toTextCity(data => {
                  // console.log('公司信息所在城市', data);
                  // RMList[i].city = data.city
                  // RMList[i].city = data
                  this.$set(RMList[i], 'city', data);
                  if (i >= RMList.length - 1) {
                    this.planList = RMList
                    console.log('planList', this.planList)
                    for (let j = 0; j < this.planList.length; j++) {    // 表头区域和城市选项
                      let rName = {
                        text: this.planList[j].rName,
                        value: this.planList[j].rName
                      }
                      let rCity = {
                        text: this.planList[j].city,
                        value: this.planList[j].city
                      }
                      //  this.filtersRName.push(rName)
                      if (JSON.stringify(this.filtersRName).indexOf(rName.value) === -1) {
                        this.filtersRName.push(rName)
                      }
                      if (JSON.stringify(this.filtersCity).indexOf(rCity.value) === -1) {
                        this.filtersCity.push(rCity)
                      }
                    }
                  }
                }, RMList[i].rID);
              }
            } else {
              Message({
                type: 'warning',
                message: '数据为空'
              });
            }
          } else {
            Message({
              type: 'warning',
              message: RMList.MSG
            });
          }
        })
        /*  let dataArr = [];
          api.getApi('/GetMediaList', {resid: 1}).then(res => {
            for (let i = 0; i < res.data.length; i++) {
              //  console.log(this.planList);
              if (res.data[i].mState === 1) {
                res.data[i].mState = '正常'
                //缺少待维修，待安装，禁用
              }
              //数据放入数组
              dataArr.push(res.data[i]);
            }
            api.getApi('/GetResCT', {resid: 1, info: 'y'}).then(res => {
              for (let j = 0; j < dataArr.length; j++) {
                dataArr[j].cType = res.data.cType;
                dataArr[j].resName = res.data.resName;
                dataArr[j].tradingArea = res.data.tradingArea;
              }
              this.planList = dataArr;
            }).catch(err => {
              console.log(err);
            });
          }).catch(err => {
            console.log(err);
          });*/
      },
      // 跳转到媒体详情界面
      mediaDetail(data) {
        this.$router.push('./mediaDetail');
        sessionStorage.setItem("resID", data.resID);
      },
      // 搜索按钮
      searchFun() {
        console.log('selectInfo', this.selectInfo)
        console.log('inputInfo', this.inputInfo)
        let planList = this.planList
        // let tempPlanList = this.planList
        let planArr = []
        if (this.selectInfo === '1') {    // 资源名称
          for (let i = 0; i < planList.length; i++) {
            if (planList[i].resName === this.inputInfo) {
              // planArr.push(planList[i])
            }
          }
          // this.planList = planArr
        } else if (this.selectInfo === '2') {    // 商圈
          for (let i = 0; i < planList.length; i++) {

          }
        }
      },
    }
  }

</script>

<style scoped>
  a {
    color: #409EFF;
  }

  /deep/ .el-table th > .cell.highlight {
    color: #409EFF !important;
  }

  /deep/ .el-tooltip__popper.is-light {
    color: #666666 !important;
    border: 1px solid #666666 !important;
  }

  /*面包屑导航*/
  .ad_mediaDetail_wrap {
    position: relative;
    /*height: 768px;*/
  }

  .ad_mediaDetail_nav p {
    padding-left: 57px;
    position: absolute;
    left: 0;
    top: 12px;
    font-size: 14px;
    line-height: 18px;
  }

  .ad_mediaDetail_nav p a {
    color: #666;
  }

  .ad_mediaDetail_nav {
    height: 42px;
    position: relative;
  }

  .ad_mediaMana_nav p a:nth-of-type(1) {
    color: #999;
  }

  /*媒体列表*/
  .mediaList_wrap {
    width: 1246px;
    background: #FFFFFF;
    border: 1px solid #E6E7E9;
    margin: 0 auto;
    margin-bottom: 26px;
  }

  .mediaList_wrap .mediaList_head {
    width: 100%;
    height: 24px;
    padding: 12px 0;
    border-bottom: 1px solid #E6E7E9;
  }

  .mediaList_wrap .mediaList_head h2 {
    font-size: 16px;
    color: #2C313C;
    height: 24px;

    padding-left: 14px;
    font-weight: bold;
  }

  .mediaList_wrap .mediaList_container {
    width: 100%;
    padding: 18px 18px 31px 18px;
  }

  /*下拉搜索框*/
  /deep/ .el-input-group__prepend {
    width: 64px;
    position: relative;
    background-color: #fff;
    /*   border-top-right-radius: 4px;
       border-bottom-right-radius: 4px;*/
  }

  /deep/ .el-input-group--prepend .el-select {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;

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

  .el-button {
    width: 76px;
    height: 34px;
    text-align: center;
    /*line-height: 34px;*/
    padding: 0;
    margin-left: 2px
  }

  .mediaList_wrap .mediaList_container .table_wrap {
    width: 1210px;
    margin: 10px 0 0 0;

    border-radius: 4px;;
  }

  .table_wrap {
    width: 1210px;
    border-radius: 4px;

    margin: 0 auto;
    margin-top: 20px;
  }

  /*表格*/
  /deep/ .el-date-editor .el-range-separator {
    line-height: 26px;
  }

  /deep/ .el-table th, .el-table tr {
    height: 44px;
    padding: 0;
    background-color: #f7f7f7;

  }

  /deep/ .el-table td {
    padding: 8px 0;
    overflow-x: hidden;
    text-overflow: ellipsis;
  }

  /deep/ .el-table--border {
    border-radius: 4px;
  }

  /deep/ .el-table th > .cell {
    font-size: 14px;
    color: #666666;
    font-weight: bold;
  }

  /deep/ .el-table .caret-wrapper {
    width: 22px;
  }

  /deep/ .el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: #ecf5ff;
  }

  /*滚动条*/
  /deep/ .el-table__body-wrapper {
    height: 405px;
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

  /*超出省略*/
  /deep/ .el-table .cell {
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /*筛选*/
  /deep/ .el-table__column-filter-trigger {
    margin-left: 10px;
  }

  /deep/ .el-table th > .cell.highlight {
    color: #409EFF !important;
  }

  /deep/ div.el-table-filter {
    left: 1106px !important;
  }

  /*操作*/
  /deep/ .el-button--mini, .el-button--small {
    font-size: 14px !important;
  }

  /deep/ .el-button .el-button--primary .el-button--mini {
    width: 51px;
  }

  /deep/ .el-dropdown-menu--mini .el-dropdown-menu__item {
    width: 65px;
  }

  /deep/ button.el-button.el-button--default.el-button--small:hover {
    color: #666;
    border-color: #d8d8d8;
    background-color: #fff;
  }

  .tar {
    text-align: right !important;
    padding-right: 10px;
  }

  /deep/ .el-table_1_column_9 {
    text-align: right;
  }

  /*提示框*/
  /deep/ .el-message {
    top: 65px;
    padding: 7px 15px 7px 20px;
  }

  /*操作*/
  /deep/ .el-dropdown .el-button-group .el-button {
    height: 28px;
    width: 54px;
    font-size: 14px;
    padding: 0;
  }

  /deep/ .el-dropdown .el-button-group .el-button:last-child {
    width: 30px;
  }

  /deep/ .popper__arrow {
    display: none;
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

  .handel_btn {
    position: relative;
  }

  /*1440*/
  @media screen and (min-width: 1440px) {

    .ad_mediaDetail_nav p {
      padding-left: 60px;
    }

    .mediaList_wrap {
      width: 1321.3px !important;
      margin-bottom: 165px !important;
    }

    .mediaList_wrap .mediaList_container .table_wrap {
      width: 1284px;
    }

  }

  /*1920*/
  @media screen and (min-width: 1920px) {

    .mediaList_wrap {
      width: 1800px !important;
      margin-bottom: 176px !important;
    }

    .mediaList_wrap .mediaList_container .table_wrap {
      width: 1764px;
    }

  }


</style>
