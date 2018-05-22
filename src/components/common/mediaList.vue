<template>
  <div class="ad_mediaDetail_wrap clearfix">
    <div class="ad_mediaDetail_nav ">
      <p><a href="#" style="color: #999">媒体管理</a><em> / </em><a href="#">媒体列表</a></p>
    </div>
    <div class="mediaList_wrap">
      <div class="mediaList_head">
        <h2>媒体列表</h2>
      </div>
      <div class="mediaList_container">
        <el-row>
          <div class="mediaList_handel">
            <el-input v-model="keyword" placeholder="资源名称、商圈" @change="initData"></el-input>
            <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
            <el-button plain @click="create">新建</el-button>
            <el-button plain>导入</el-button>
            <el-button plain>导出</el-button>
          </div>
        </el-row>
        <div class="table_wrap">
          <el-table
            border
            :data="currentPlan"
            style="width: 100%"
            :default-sort="{prop: 'resName', order: 'descending'}"
          >
            <el-table-column
              label="资源名称"
              min-width="10.2%"
            >
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" :content="scope.row.resName" placement="bottom">
                  <a href="#" @click="mediaDetail(scope.row)"  v-if="haveDetail">
                    <router-link :to="{path:'/superOperate/mediaDetail'}" class="nav_fast">{{scope.row.resName}}</router-link>
                  </a>
                  <span v-else>{{scope.row.resName}}</span>
                </el-tooltip>

              </template>
            </el-table-column>
            <el-table-column
              prop="cType"
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
              :filters="[
              { text: '石家庄', value: '石家庄' },
              { text: '广州', value: '广州' },
              { text: '上海', value: '上海' },
              { text: '北京', value: '北京' },
              { text: '深圳', value: '深圳' }
              ]"
              :filter-method="filterCity"
              :filter-multiple="false"
            >
            </el-table-column>
            <el-table-column
              prop="region"
              label="区域"
              min-width="6.1%"
              :filters="[
              { text: '天河区', value: '天河区' },
              { text: '越秀区', value: '越秀区' },
              { text: '海珠区', value: '海珠区' },
              { text: '黄浦区', value: '黄浦区' },
              { text: '白云区', value: '白云区' }
              ]"
              :filter-method="filterRegion"
              :filter-multiple="false"
            >
            </el-table-column>
            <el-table-column
              prop="tradingArea"
              label="商圈"
              min-width="10.2%"
            >
            </el-table-column>
            <el-table-column
              prop="mType"
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
              label="点位状态"
              min-width="7.7%"
              :filters="[
              { text: '待安装', value: '待安装' },
              { text: '正常', value: '正常' },
              { text: '待维修', value: '待维修' },
              { text: '禁用', value: '禁用' },
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
                    <el-dropdown-item @click.native.prevent="confirmBox">待安装</el-dropdown-item>
                    <el-dropdown-item @click.native.prevent="confirmBox">正常</el-dropdown-item>
                    <el-dropdown-item @click.native.prevent="confirmBox">待维修</el-dropdown-item>
                    <el-dropdown-item @click.native.prevent="confirmBox">禁用</el-dropdown-item>
                    <el-dropdown-item @click.native.prevent="deleteRow(scope.$index, planList)">删除</el-dropdown-item>
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
import { Form, FormItem, Table, TableColumn, Dropdown, DropdownMenu, DropdownItem, Input, Row, Button, Tooltip, MessageBox, Message } from 'element-ui';
  import api from '../../api/api'
  export default {
	name: "mediaList",
	components:{
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
	},
    data() {
      return {
        haveDetail:true,
        keyword: '',
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
      }
    },
    mounted: function () {
      let nowPath = this.$route.path // /media/mediaList
      console.log(nowPath)
      console.log(nowPath.indexOf('/media/'))
      if(nowPath.indexOf('/media/') !== -1){
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
		// 当搜索框为空的时候进行重置显示
		initData(){
			if(!this.keyword ){
				this.currentPlan = this.planList;
			}
		},
		// 搜索
		search(){
			let arr = [];
			if(this.keyword){
				for(let data of this.planList){
					if(data.tradingArea.includes(this.keyword) || data.cType.includes(this.keyword)){
						arr.push(data);
					}
				}
				console.log('arr',arr)
				this.currentPlan = arr;
				return;
			}
			this.currentPlan = this.planList;
		},
		// 新建媒体
		create(){
			this.$router.push('./mediaInput');
		},

      //筛选
      filterRecType(value, row) {
        return row.recType === value;
      },
      filterCity(value, row) {
        return row.city === value;
      },
      filterRegion(value, row) {
        return row.region === value;
      },
      filterMediaType(value, row) {
        return row.mediaType === value;
      },
      filterPTStatus(value, row) {
        return row.ptStatus === value;
      },
      //确认框
      confirmBox(e) {
        let Status = e.target.innerText;
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
        }).catch(() => {
          Message({
            type: 'info',
            message: '已取消操作'
          })
        })
      },
      submitForm() {
        this.$http({})
      },

      //删除
      deleteRow(index, rows) {
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
        //请求
        let dataArr = [];
        let uid = JSON.parse(sessionStorage.getItem('session_data')).uID
        api.postApi('/GetResList',{uid:uid}).then(res=>{
          let resList = [
            {
              resID: 1,
              rID: 440106,
              resName: "帝景山庄",
              resAddress: "广东省广州市天河区东圃镇悦景路11号",
              latLng: "113.428473;23.154321",
              tradingArea: "山泉",
              joinTime: "2018-04-03 16:21:45.0",
              resType: 1
            },
            {
              resID: 2,
              rID: 440103,
              resName: "周门小区",
              resAddress: "广州市荔湾区周门路",
              joinTime: "2018-05-03 19:07:34.0",
              resType: 1
            }
          ]
        //  let resList = res.data
          for(let i=0;i<resList.length;i++){
              this.getResInfo(resList[i].resID)
          }
          console.log('resList:',resList)
        })
        /*api.getApi('/GetMediaList', {resid: 1}).then(res => {
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
              if(res.data.rID.toString().indexOf('4401') === 0){
                dataArr[j].city = '广州'
              }
              if(res.data.rID.toString().indexOf('106') > 0){
                dataArr[j].region = '天河区'
              }
            }
            this.planList = dataArr;
            console.log('planList',this.planList)
            this.currentPlan = this.planList;
          }).catch(err => {
            console.log(err);
          });
        }).catch(err => {
          console.log(err);
        });*/
      },
      getResInfo(rid){
        let dataArr = [];
        console.log('rid',rid)
        api.getApi('/GetMediaList', {resid: rid}).then(res => {
          for (let i = 0; i < res.data.length; i++) {
            //  console.log(this.planList);
            if (res.data[i].mState === 1) {
              res.data[i].mState = '正常'
              //缺少待维修，待安装，禁用
            }
            //数据放入数组
            dataArr.push(res.data[i]);
          }
          api.getApi('/GetResCT', {resid: rid, info: 'y'}).then(res => {
            for (let j = 0; j < dataArr.length; j++) {
              dataArr[j].cType = res.data.cType;
              dataArr[j].resName = res.data.resName;
              dataArr[j].tradingArea = res.data.tradingArea;
              if(res.data.rID.toString().indexOf('4401') === 0){
                dataArr[j].city = '广州'
              }
              if(res.data.rID.toString().indexOf('106') > 0){
                dataArr[j].region = '天河区'
              }
            }
            for(let t=0;t<dataArr.length;t++){
              this.planList.push(dataArr[t])
            }
          //  this.planList = dataArr;
            console.log('planList',this.planList)
            this.currentPlan = this.planList;
          }).catch(err => {
            console.log(err);
          })
        }).catch(err => {
          console.log(err);
        })
      },
      mediaDetail(data){
        console.log(data.resID)
        sessionStorage.setItem("resID", data.resID);
      }
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
    border-left: 2px solid #465D89;
    padding-left: 14px;
    font-weight: bold;
  }

  .mediaList_wrap .mediaList_container {
    width: 100%;
    padding: 18px 18px 31px 18px;
  }

  .el-input {
    width: 180px;
    height: 34px !important;
    border-radius: 4px;
  }

  /deep/ .el-input__inner {
    height: 34px;
    position: relative;
    top: -1px;
  }

  .el-button--primary {
    background: #108EE9;
    border-radius: 4px;
  }

  .el-button {
    width: 76px;
    height: 34px;
    text-align: center;
    line-height: 34px;
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

  .tar {
    text-align: right !important;
    padding-right: 10px;
  }

  /deep/ .el-table_1_column_9 {
    text-align: right;
  }

  /*
    /deep/ .el-dropdown .el-button-group .el-button{
      height: 28px;
    }*/

  /deep/ .el-button:focus, /deep/ .el-button:hover {
    border: 1px solid #409eff;
    color: #409EFF;
    background-color: #ffffff;

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

  /deep/ .el-button:focus, /deep/ .el-button:hover {
    border: 1px solid #409eff;
    color: #409EFF;
    background-color: #ffffff;

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
