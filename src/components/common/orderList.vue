<template>
  <div class="ad_mediaDetail_wrap clearfix">
    <div class="ad_mediaDetail_nav ">
      <p class="clearfix"><a href="#">订单管理</a></p>
    </div>
    <div class="mediaList_wrap">
      <div class="mediaList_head">
        <h2>订单列表</h2>
      </div>
      <div class="mediaList_container">
        <el-row>
          <div class="mediaList_handel">
            <el-input v-model="search" placeholder="订单名/客户名/合同编号"></el-input>
            <div class="block">
              <el-date-picker
                v-model="cDate"
                type="daterange"
                range-separator="-"
                start-placeholder="发布日期"
                end-placeholder="发布日期">
              </el-date-picker>
            </div>
            <el-button type="primary" icon="el-icon-search">搜索</el-button>
          </div>
        </el-row>
        <div class="table_wrap">
          <el-table
            border
            :data="orderList"
            style="width: 100%"
            :default-sort="{prop: 'date', order: 'descending'}"
          >
            <el-table-column
              label="订单名称"
              min-width="13.6%"
            >
              <template slot-scope="scope">
                <a href="#">{{scope.row.orderName}}</a>
              </template>
            </el-table-column>
            <el-table-column
              prop="clientName"
              label="客户名称"
              min-width="11.4%"
            >
            </el-table-column>
            <el-table-column
              prop="contractID"
              label="合同编号"
              class="tar"
              min-width="8.9%"
            >
            </el-table-column>
            <el-table-column
              prop="orderPrice"
              sortable
              label="订单总价"
              min-width="7.5%"
            >
            </el-table-column>
            <el-table-column
              prop="city"
              label="投放城市(点位面数，周期，排期)"
              min-width="23.6%"
            >
            </el-table-column>
            <el-table-column
              prop="createDate"
              label="发布日期"
              sortable
              min-width="7.3%"
            >
            </el-table-column>
            <el-table-column
              class="Status"
              prop="Status"
              label="状态"
              min-width="6.1%"
              :filters="[
              { text: '已完成', value: '已完成' },
              { text: '未投放', value: '未投放' },
              { text: '强制停止', value: '强制停止' }
              ]"
              :filter-method="filterStatus"
              :filter-multiple="false"
            >
            </el-table-column>
            <el-table-column
              label="操作"
              min-width="8.4%"
            >
              <template slot-scope="scope">
                <el-dropdown size="small" split-button trigger="click">
                  操作
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item  @click.native.prevent="confirmBox1" class="finish">结束订单</el-dropdown-item>
                    <el-dropdown-item class="update">更换点位</el-dropdown-item>
                    <el-dropdown-item @click.native.prevent="inputBox1" class="watch">监控备注</el-dropdown-item>
                    <el-dropdown-item disabled="disabled" class="push">推送任务</el-dropdown-item>
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
	export default {
		name: "projectList",
		data() {
			return {
				cDate: '',
				search: '',
				//表格
				orderList: [{
					orderName: '新世界百货二月投放方案2.0',
					clientName: '北京通瑞万华置业北京通瑞万华置业',
					contractID: 'GZ201809890',
					orderPrice: '￥3,720,000',
					city: '广州市(300面,12周10天,2017.09.10-2017.10.01)',
					createDate: '2018.08.30',
					Status: '未投放',
				}, {
					orderName: '新世界百货二月投放方案2.0',
					clientName: '北京通瑞万华置业北京通瑞万华置业',
					contractID: 'GZ201809890',
					orderPrice: '￥3,720,000',
					city: '广州市(300面,12周10天,2017.09.10-2017.10.01)',
					createDate: '2018.08.30',
					Status: '强制完成',
				}, {
					orderName: '新世界百货二月投放方案2.0',
					clientName: '北京通瑞万华置业北京通瑞万华置业',
					contractID: 'GZ201809890',
					orderPrice: '￥3,720,000',
					city: '广州市(300面,12周10天,2017.09.10-2017.10.01)',
					createDate: '2018.08.30',
					Status: '已完成',
				}, {
					orderName: '新世界百货二月投放方案2.0',
					clientName: '北京通瑞万华置业北京通瑞万华置业',
					contractID: 'GZ201809890',
					orderPrice: '￥3,720,000',
					city: '广州市(300面,12周10天,2017.09.10-2017.10.01)',
					createDate: '2018.08.30',
					Status: '已完成',
				}, {
					orderName: '新世界百货二月投放方案2.0',
					clientName: '北京通瑞万华置业北京通瑞万华置业',
					contractID: 'GZ201809890',
					orderPrice: '￥3,720,000',
					city: '广州市(300面,12周10天,2017.09.10-2017.10.01)',
					createDate: '2018.08.30',
					Status: '已完成',
				}, {
					orderName: '新世界百货二月投放方案2.0',
					clientName: '北京通瑞万华置业北京通瑞万华置业',
					contractID: 'GZ201809890',
					orderPrice: '￥3,720,000',
					city: '广州市(300面,12周10天,2017.09.10-2017.10.01)',
					createDate: '2018.08.30',
					Status: '未投放',
				}, {
					orderName: '新世界百货二月投放方案2.0',
					clientName: '北京通瑞万华置业北京通瑞万华置业',
					contractID: 'GZ201809890',
					orderPrice: '￥3,720,000',
					city: '广州市(300面,12周10天,2017.09.10-2017.10.01)',
					createDate: '2018.08.30',
					Status: '未投放',
				}, {
					orderName: '新世界百货二月投放方案2.0',
					clientName: '北京通瑞万华置业北京通瑞万华置业',
					contractID: 'GZ201809890',
					orderPrice: '￥3,720,000',
					city: '广州市(300面,12周10天,2017.09.10-2017.10.01)',
					createDate: '2018.08.30',
					Status: '进行中',
				}, {
					orderName: '新世界百货二月投放方案2.0',
					clientName: '北京通瑞万华置业北京通瑞万华置业',
					contractID: 'GZ201809890',
					orderPrice: '￥3,720,000',
					city: '广州市(300面,12周10天,2017.09.10-2017.10.01)',
					createDate: '2018.08.30',
					Status: '进行中',
				}, {
					orderName: '新世界百货二月投放方案2.0',
					clientName: '北京通瑞万华置业北京通瑞万华置业',
					contractID: 'GZ201809890',
					orderPrice: '￥3,720,000',
					city: '广州市(300面,12周10天,2017.09.10-2017.10.01)',
					createDate: '2018.08.30',
					Status: '进行中',
				}]
			}
		},

		methods: {
			//提示框
			inputBox1(){
				this.$prompt('请输入监控备注', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					inputType:'textarea',
					inputPattern:  /^.{1,100}$/,
					inputErrorMessage: '监控备注超过100字,请缩减'
				}).then(() => {
					this.$message({
						type: 'success',
						message: '监控备注输入成功'
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消输入'
					});
				});
			},

			confirmBox1(){
				console.log(this);
				this.$confirm('是否结束<b>'+this.orderList[0].orderName+'</b>订单投放？', '提示', {
					confirmButtonText:'是',
					cancelButtonText:'否',
					dangerouslyUseHTMLString: true,
					type:'warning'
				}).then(()=>{
					//确定
					this.$message({
						type:'success',
						message:'操作成功'
					});
				}).catch(()=>{
					this.$message({
						type:'info',
						message:'已取消操作'
					})
				});
			},
			//筛选
			filterStatus(value, row) {
				return row.Status === value;
			},
			//状态

		},
	}

	$(function () {
		/*window.onresize = function () {
			if ($(window.width >= 1366)) {
				$('.el-table-filter').css({
					left: '1145'
				})
			}
		};*/
		var Status = $('.el-table__row').find('td').text();
		if(Status === '已完成'){
			$('.watch').attr('disabled', 'disabled')
		}

	})
</script>

<style scoped>
  a {
    color: #108EE9;
  }

/deep/.el-textarea__inner{
  height: 134px !important;
  resize: none;
}

  /*筛选*/
  .el-checkbox + .el-checkbox {
    margin-left: 0;
  }


  /deep/ .el-checkbox__label {
    font-size: 10px;
    color: #8A8A8A;
  }

  /*日期控件*/
  .block {
    display: inline-block;
    position: relative;
    top: 0px;
    margin-left: 63px;
  }

  /deep/ .el-input__inner {
    width: 237px;
    height: 34px;
  }

  /deep/ .el-date-editor .el-range__icon {
    position: absolute;
    right: 10px;
    top: 0;
  }

  /*面包屑导航*/
  .ad_mediaDetail_wrap {
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

  .ad_mediaDetail_nav p a {
    color: #666;
  }

  .ad_mediaDetail_nav {
    height: 42px;
    position: relative;
  }

  /*wrap*/
  .mediaList_wrap {
    width: 1246px;
    background: #FFFFFF;
    border: 1px solid #E6E7E9;
    margin: 0 auto;
    margin-bottom: 46px;
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
    padding: 18px;
  }

  .el-input {
    width: 180px;
    height: 34px !important;
    border-radius: 4px;
  }

  .el-button--primary {
    background-color: #108EE9;
  }

  .el-button {
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

  .mediaList_wrap .mediaList_container .table_wrap {
    width: 1210px;
    margin: 10px 0 0 0;

    border-radius: 4px;

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

  /deep/ .el-table_1_column_3 {
    text-align: right !important;
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

  /*1440*/
  @media screen and (min-width: 1440px) {

    .ad_mediaDetail_nav p {
      padding-left: 60px;
    }

    .mediaList_wrap {
      width: 1321.3px !important;
      margin-bottom: 177px !important;
    }

    .mediaList_wrap .mediaList_container .table_wrap {
      width: 1284px;
    }

  }

  /*1920*/
  @media screen and (min-width: 1920px) {

    .mediaList_wrap {
      width: 1800px !important;
      margin-bottom: 250px !important;
    }

    .mediaList_wrap .mediaList_container .table_wrap {
      width: 1764px !important;
    }

    /*   .table_wrap ul,.table_wrap .tr_wrap,.adPanel_table{
         width: 1764px;
       }

       .table_wrap .tr_wrap{
         height: 450px;}*/

  }


</style>
