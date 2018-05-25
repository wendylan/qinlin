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
						<el-input  v-model="keyword" placeholder="公司名称、公司品牌"></el-input>
						<div class="block">
							<el-button type="primary" icon="el-icon-search" @click="search()">搜索</el-button>
							<el-button plain @click="addAccount()">新建</el-button>
						</div>
					</div>
				</el-row>
				<div class="table_wrap">
					<el-table
						border
						:data="accountList"
						style="width: 100%"
						:default-sort = "{prop: 'date', order: 'descending'}"
					>
						<el-table-column
							prop="sName"
							label="账号"
							min-width="11.8%"
						>
						</el-table-column>
						<el-table-column
							prop="realName"
							label="姓名"
							min-width="7.8%"
						>
						</el-table-column>
						<el-table-column
							prop="uWho"
							label="权限城市"
							class="tar"
							min-width="14.2%"
						>
						</el-table-column>
						<el-table-column
							prop="uType"
							label="账号角色"
							min-width="8.1%"
						>
						</el-table-column>
						<el-table-column
							prop="puid"
							label="上级"
							min-width="7.8%"
						>
						</el-table-column>
						<el-table-column
							prop="puID"
							label="创建者账号"
							min-width="11.8%"
						>
						</el-table-column>
						<el-table-column
							label="创建日期"
							sortable
							min-width="9.8%"
						>
							<template slot-scope="scope">
								<span>{{formatTime(scope.row.joinTime)}}</span>
							</template>
						</el-table-column>
						<el-table-column
							prop="uStatus"
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
import { Row, Input, Button, Table, TableColumn } from 'element-ui';
import { api } from '../../api/api';
// 时间控件格式化
import dateFormat from '../../commonFun/timeFormat.js';
export default {
	name: "customList",
	components:{
		elRow: Row,
		elInput: Input,
		elButton: Button,
		elTable: Table,
		elTableColumn: TableColumn,
	},
	data() {
		return {
			keyword: '',
			//表格
			accountList: []
		}
	},
	created(){
		this.getAccountList();
	},
	methods: {
		// 初始数据
		getAccountList(){
			let uid = JSON.parse(sessionStorage.getItem('session_data')).uID;
			api.postApi('/GetUserList', { uid: uid}).then(res => {
				console.log(res.data);
				let mes = res.data;
				if(!mes.SysCode){
					this.accountList = res.data;
				}
			}).catch( res => {
				console.log(res);
			});
		},
		// 时间格式化
		formatTime(time){
			return dateFormat.date(time);
		},
		// 搜索
		search(){
			console.log('search');
		},
		// 新建
		addAccount(){
			this.$router.push('./createAccount');
		},
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
