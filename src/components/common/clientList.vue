<template>
	<div class="ad_mediaDetail_wrap clearfix">
		<div class="ad_mediaDetail_nav ">
			<p class="clearfix"><a href="#">客户管理</a></p>
		</div>
		<div class="mediaList_wrap">
			<div class="mediaList_head">
				<h2>客户列表</h2>
			</div>
			<div class="mediaList_container">
				<el-row>
					<div class="mediaList_handel">
						<el-input  v-model="input" placeholder="公司名称、公司品牌"></el-input>
						<div class="block">
							<el-date-picker
							v-model="value6"
							type="daterange"
							range-separator="-"
							start-placeholder="创建日期"
							end-placeholder="创建日期">
							</el-date-picker>
						</div>
						<el-button type="primary" icon="el-icon-search">搜索</el-button>
						<el-button plain>新建</el-button>
					</div>
				</el-row>
				<div class="table_wrap">
					<el-table
						border
						:data="planList"
						style="width: 100%"
						:default-sort = "{prop: 'date', order: 'descending'}"
					>
						<el-table-column
							prop="contacts"
							label="联系人"
							min-width="6%"
						>
						</el-table-column>
						<el-table-column
							prop="place"
							label="所在地"
							min-width="7.2%"
						>
						</el-table-column>
						<el-table-column
							prop="position"
							label="职位"
							class="tar"
							min-width="7.2%"
						>
						</el-table-column>
						<el-table-column
							prop="phone"
							label="手机号码"
							min-width="9.5%"
						>
						</el-table-column>
						<el-table-column
							prop="companyName"
							label="公司名称"
							min-width="18.4%"
						>
						</el-table-column>
						<el-table-column
							prop="city"
							label="所在城市"
							min-width="8%"
							:filters="[
							{ text: '广州', value: '广州' },
							{ text: '上海', value: '上海' },
							{ text: '深圳', value: '深圳' },
							{ text: '北京', value: '北京' },
							{ text: '成都', value: '成都' }
							]"
							:filter-method="filterCity"
							:filter-multiple="false"
						>
						</el-table-column>
						<el-table-column
							prop="brand"
							label="公司品牌"
							min-width="12.1%"
						>
						</el-table-column>
						<el-table-column
							prop="owner"
							label="所有人"
							min-width="6.1%"
						>
						</el-table-column>
						<el-table-column
							prop="cDate"
							label="创建日期"
							min-width="8.3%"
						>
						</el-table-column>
						<el-table-column
							label="操作"
							min-width="4.1%"
						>
							<template slot-scope="scope">
								<a href="#" style="color: #108EE9">查看</a>
							</template>
						</el-table-column>
					</el-table>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
export default {
	name: "customList",
	data() {
		return {
			input: '',
			value6: '',
			//表格
			planList: [{
				contacts: '成吉思汗',
				place: '成都',
				position: '城市总经理',
				phone:'0775586070000',
				companyName:'深圳市亲邻科技有限公司广州分公司',
				city:'广州',
				brand:'亲邻团购/社区门禁',
				owner:'欧阳震华',
				cDate:'2018.03.08'
			}, {
				contacts: '成吉思汗',
				place: '成都',
				position: '城市总经理',
				phone:'0775586070000',
				companyName:'深圳市亲邻科技有限公司广州分公司',
				city:'广州',
				brand:'亲邻团购/社区门禁',
				owner:'欧阳震华',
				cDate:'2018.03.08'
			}, {
				contacts: '成吉思汗',
				place: '成都',
				position: '城市总经理',
				phone:'0775586070000',
				companyName:'深圳市亲邻科技有限公司广州分公司',
				city:'广州',
				brand:'亲邻团购/社区门禁',
				owner:'欧阳震华',
				cDate:'2018.03.08'
			}, {
				contacts: '成吉思汗',
				place: '成都',
				position: '城市总经理',
				phone:'0775586070000',
				companyName:'深圳市亲邻科技有限公司广州分公司',
				city:'广州',
				brand:'亲邻团购/社区门禁',
				owner:'欧阳震华',
				cDate:'2018.03.08'
			}, {
				contacts: '成吉思汗',
				place: '成都',
				position: '城市总经理',
				phone:'0775586070000',
				companyName:'深圳市亲邻科技有限公司广州分公司',
				city:'广州',
				brand:'亲邻团购/社区门禁',
				owner:'欧阳震华',
				cDate:'2018.03.08'
			}, {
				contacts: '成吉思汗',
				place: '成都',
				position: '城市总经理',
				phone:'0775586070000',
				companyName:'深圳市亲邻科技有限公司广州分公司',
				city:'广州',
				brand:'亲邻团购/社区门禁',
				owner:'欧阳震华',
				cDate:'2018.03.08'
			}, {
				contacts: '成吉思汗',
				place: '成都',
				position: '城市总经理',
				phone:'0775586070000',
				companyName:'深圳市亲邻科技有限公司广州分公司',
				city:'广州',
				brand:'亲邻团购/社区门禁',
				owner:'欧阳震华',
				cDate:'2018.03.08'
			}, {
				contacts: '成吉思汗',
				place: '成都',
				position: '城市总经理',
				phone:'0775586070000',
				companyName:'深圳市亲邻科技有限公司广州分公司',
				city:'广州',
				brand:'亲邻团购/社区门禁',
				owner:'欧阳震华',
				cDate:'2018.03.08'
			}, {
				contacts: '成吉思汗',
				place: '成都',
				position: '城市总经理',
				phone:'0775586070000',
				companyName:'深圳市亲邻科技有限公司广州分公司',
				city:'广州',
				brand:'亲邻团购/社区门禁',
				owner:'欧阳震华',
				cDate:'2018.03.08'
			}, {
				contacts: '成吉思汗',
				place: '成都',
				position: '城市总经理',
				phone:'0775586070000',
				companyName:'深圳市亲邻科技有限公司广州分公司',
				city:'广州',
				brand:'亲邻团购/社区门禁',
				owner:'欧阳震华',
				cDate:'2018.03.08'
			}, {
				contacts: '成吉思汗',
				place: '成都',
				position: '城市总经理',
				phone:'0775586070000',
				companyName:'深圳市亲邻科技有限公司广州分公司',
				city:'广州',
				brand:'亲邻团购/社区门禁',
				owner:'欧阳震华',
				cDate:'2018.03.08'
			}, {
				contacts: '成吉思汗',
				place: '成都',
				position: '城市总经理',
				phone:'0775586070000',
				companyName:'深圳市亲邻科技有限公司广州分公司',
				city:'广州',
				brand:'亲邻团购/社区门禁',
				owner:'欧阳震华',
				cDate:'2018.03.08'
			}, {
				contacts: '成吉思汗',
				place: '成都',
				position: '城市总经理',
				phone:'0775586070000',
				companyName:'深圳市亲邻科技有限公司广州分公司',
				city:'广州',
				brand:'亲邻团购/社区门禁',
				owner:'欧阳震华',
				cDate:'2018.03.08'
			}, ]
		}
	},
	mounted:function(){
		// 社区媒体列表api
			axios({
				method: 'get',
				baseURL: '/api',
				url: '/MyCustomer',
				// url: '/GetCustomer',
				params:{
					uid:6
				}
			}).then(res => {
				console.log("返回：", res);
			}).catch(err => {
				console.log(err);
			});
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

  .typeBox p{
    height: 30px;
    font-size: 12px;
    text-align: center;
    line-height: 30px;
    border-top: 1px solid #cccccc;
  }

  /deep/ .el-checkbox__label{
    font-size: 10px;
    color: #8A8A8A;
  }

  /*日期控件*/
  .block{
    display: inline-block;
    position: relative;
    top: 0px;
    margin-left: 63px;
  }
   /deep/ .el-input__inner{
    width: 237px;
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
    padding: 18px;
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
    border: 1px solid #E9E9E9;
    border-radius: 4px;

  }

  /deep/.el-date-editor .el-range-separator{
    line-height: 26px;
  }

  .table_wrap{
    width:1210px;
    border-radius: 4px;
    border: 1px solid #E2E2E2;
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
