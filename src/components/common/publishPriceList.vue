<template>
	<div class="ad_mediaDetail_wrap clearfix">
		<div class="ad_mediaDetail_nav ">
			<p class="clearfix"><a href="#" style="color: #999">刊例价</a></p>
		</div>
		<div class="mediaList_wrap">
			<div class="mediaList_head">
				<h2>刊例价列表</h2>
			</div>
			<div class="mediaList_container">
				<div class="table_wrap">
					<el-table
						border
						:data="publishPriceList"
						style="width: 100%"
            v-loading="loading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"

					>
						<el-table-column
							prop="rName"
							label="城市"
							min-width="31.3%"
							:filters="filtCity"
							:filter-method="filterCity"
							:filter-multiple="false"
						>
							<template slot-scope="scope">
								<span class="data" v-if="!scope.row.showInput">{{scope.row.rName}}</span>
								<!-- <el-select v-model="scope.row.cityUpdate" placeholder="请选择城市"  v-if="scope.row.showInput">
									<el-option label="北京" value="北京"></el-option>
									<el-option label="上海" value="上海"></el-option>
									<el-option label="深圳" value="深圳"></el-option>
									<el-option label="广州" value="广州"></el-option>
									<el-option label="成都" value="成都"></el-option>
								</el-select> -->
								<el-cascader
									v-if="scope.row.showInput"
									:options="allProvince"
									v-model="scope.row.cityArr"
									separator="-"
									:show-all-levels="false"
									@change="seleProClient(scope.row)"
									@active-item-change="handleItemChange"
								></el-cascader>
							</template>
						</el-table-column>
						<el-table-column
							label="媒体"
							min-width="62.2%"
							:filters="[
								{ text: '广告门', value: '广告门' }
							]"
							:filter-method="filterMedia"
							:filter-multiple="false"
						>
							<template slot-scope="scope">
								<span class="data" v-if="!scope.row.showInput">{{scope.row.mVehicle}}</span>
								<el-select v-model="scope.row.mediaUpdate" placeholder="请选择媒体"  v-if="scope.row.showInput">
									<!-- <el-option label="社区门" value="社区门"></el-option> -->
									<el-option label="广告门" value="广告门"></el-option>
									<!-- <el-option label="什么门" value="什么门"></el-option> -->
									<!-- <el-option label="电梯门" value="电梯门"></el-option> -->
								</el-select>
							</template>
						</el-table-column>
						<el-table-column
							class="tar"
							prop="publicPrice"
							label="刊例价"
							min-width="34.3%"
						>
							<template slot-scope="scope">
								<span class="data" v-if="!scope.row.showInput">{{scope.row.adPrice/100}}</span>
								<el-input type="number" v-model="scope.row.priceUpdate"  placeholder="请输入刊例价" class=" tar" v-if="scope.row.showInput"></el-input>
							</template>
						</el-table-column>
						<el-table-column
							v-if="role=='SM'"
							label="操作"
							min-width="22.6%"
						>
							<template slot-scope="scope">
								<div v-if="!scope.row.changeBtn">
									<el-button type="text" size="small" @click.native.prevent="editPP(scope.row, scope.$index)">编辑</el-button>
									<el-button type="text" size="small" @click.native.prevent="deleteRow(scope.row, scope.$index)">删除</el-button>
								</div>
								<div v-if="scope.row.changeBtn">
									<el-button type="text" size="small" class="savePP" @click.native.prevent="savePP(scope.row, scope.$index)">保存</el-button>
									<el-button type="text" size="small" class="cancelPP" @click.native.prevent="cancelPP(scope.row, scope.$index)">取消</el-button>
								</div>
							</template>
						</el-table-column>
					</el-table>
					<div v-if="role=='SM'">
						<div class="addPublishPrice" @click="addPriceFun()">+ 新增刊例价</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import api from '../../api/api.js';
// 二级城市选择
import region from '../../commonFun/areaPackage.js';
// 筛选过滤
import filterFormat from '../../commonFun/filterTableData.js';
import { Table, TableColumn, Input, Button, MessageBox, Message, Select, Option, Cascader } from 'element-ui';
// import areaToText from '../../commonFun/areaToText.js';
import areaToText from '../../commonFun/areaToText_new.js';
export default {
	name: "publishPriceList",
	components: {
		elTable: Table,
		elTableColumn: TableColumn,
		elInput: Input,
		elButton: Button,
		elSelect: Select,
		elOption: Option,
		elCascader: Cascader
	},
	data(){
		return {
		  //加载中
      loading:true,
			role: '',
			// 所有区域
			allProvince: [],
			// 过滤去重后的城市
			filtCity: [],
			publishPriceList:[
				{
					amID: 2,
					rID: 110100,
					rName: "北京市",
					mVehicle: "广告门",
					adPrice: 380000,
					cityUpdate:'',
					rNameUpdate: '',
					mediaUpdate:'',
					priceUpdate:'',
					showInput:false,
					changeBtn:false,
					cityArr: []
				}
			]
		}
	},
	created(){
		this.role = JSON.parse(sessionStorage.getItem('session_data')).uType;
		this.getInitData();
		this.getAreaData();
	},
	methods:{
		// 刊例价列表
		getInitData(){
			let uid = JSON.parse(sessionStorage.getItem('session_data')).uID;
			api.getApi('/GetAdPrice', {uid: uid}).then(res =>{
        this.loading = false
				if(!res.data.SysCode){
					this.publishPriceList = res.data;
					this.filtCity = filterFormat(this.publishPriceList, 'rName');
					// this.filtCity.unshift({
					// 	text: '全部',
					// 	value: '全部'
					// });
					for(let data of this.publishPriceList){
						data.showInput = false;
						data.changeBtn = false;
						data.cityUpdate = '';
						data.mediaUpdate = '';
						data.priceUpdate = '';
						data.cityArr = [];
					}
				}else{
					Message.warning(res.data.MSG);
				}
			}).catch(res =>{
				console.log(res);
			});
		},
		// 获取所有区域信息
		getAreaData(){
			region.province(data =>{
				this.allProvince = data.province;
			});
		},
		// 点击省级去显示其对应市级
		handleItemChange(val){
			console.log('select', val);
			region.cityArea(data => {
				console.log(data);
			}, val[0], this.allProvince);
		},
		// 添加一行
		addPriceFun(){
			let obj = {
				rID:'',
				mVehicle:'',
				adPrice:'',
				cityUpdate:'',
				mediaUpdate:'',
				priceUpdate:'',
				showInput:true,
				changeBtn:true,
				cityArr: []
			};
			this.publishPriceList.push(obj)
		},
		filterCity(value, row) {
			console.log(value, row);
			// if(value =='全部'){
			// 	return true;
			// }
			return row.rName === value;
		},
		filterMedia(value, row){
			return row.mVehicle === value;
		},
		seleProClient(rows){
			console.log(rows);
			// this.$set(rows, 'rID', rows.cityArr[1]);
			this.$set(rows, 'cityUpdate', rows.cityArr[1]);
			// areaToText.toTextCity(data=>{
			// 	console.log(data);
			// 	this.$set(rows, 'rNameUpdate', data);
			// }, rows.cityUpdate);
			this.$set(rows, 'rNameUpdate', areaToText.toText(rows.cityUpdate).city);
		},
		//删除
		deleteRow(rows, index){
			this.$confirm('确定要删除这条数据吗？','提示',{
				confirmButtonText:'确定',
				cancelButtonText:'取消',
				type:'warning'
			}).then(()=>{
				// uid     int【必填】     UserID
				// amid    int【必填】     刊例价amID
				let info = {};
				info.uid = JSON.parse(sessionStorage.getItem('session_data')).uID;
				info.amid = rows.amID;

				// 删除接口
				api.postApi('/DelAdPrice', info).then(res =>{
					console.log(res.data);
					if(res.data.SysCode ==200200){
						this.publishPriceList.splice(index, 1);
						Message.success(res.data.MSG);
					}else{
						Message.warning(res.data.MSG);
					}
				});
			}).catch(()=>{
				Message.info('已取消删除');
			})
		},
		//编辑
		editPP(rows, index){
			console.log(rows.showInput);
			// this.$set(rows, 'typeUpdate', rows.nTitle);
			// 如果有市区id则cascader显示出对应的市区
			let parStr = Number(rows.rID.toString().substr(0, 2)+'0000');
			let result = [parStr, rows.rID];
			this.handleItemChange([parStr]);

			this.$set(rows, 'rNameUpdate', rows.rName);
			this.$set(rows, 'cityUpdate', rows.rID);
			this.$set(rows, 'mediaUpdate', rows.mVehicle);
			this.$set(rows, 'cityArr', result);
			this.$set(rows, 'priceUpdate', rows.adPrice/100);
			this.$set(rows, 'showInput', !rows.showInput);
			this.$set(rows, 'changeBtn', !rows.changeBtn);
			this.publishPriceList.push();
			console.log(rows);
		},
		//保存
		savePP(rows, index){
			if(rows.rNameUpdate === '' || rows.mediaUpdate === '' || rows.priceUpdate === ''){
				Message.warning('请选择城市,媒体，填写价格之后再保存');
				return;
			}
			if(!rows.amID){
				// 新增刊例价
				// uid     int【必填】     UserID
				// rid     int【必填】     城市rID
				// mv      String【必填】  媒体（媒介载体）
				// am      int【必填】     报价(以分为单位整数)
				console.log('addRows', rows);
				let info = {};
				info.uid = JSON.parse(sessionStorage.getItem('session_data')).uID;
				info.rid = rows.cityUpdate;
				info.mv = rows.mediaUpdate;
				info.am = rows.priceUpdate*100;
				console.log('addinfo', info);

				api.postApi('/AddPrice', info).then(res => {

					console.log(res);
					if(res.data.SysCode){
						Message.success('该城市已存在刊例价，请勿重复添加');
					}else{
						if(res.data){
							location.reload();

							// this.$set(rows, 'amID', res.data.amID);
							// this.$set(rows, 'rID', rows.cityUpdate);
							// this.$set(rows, 'rName', rows.rNameUpdate);

							// this.$set(rows, 'mVehicle', rows.mediaUpdate);
							// this.$set(rows, 'adPrice', rows.priceUpdate*100);
							// this.$set(rows, 'showInput', !rows.showInput);
							// this.$set(rows, 'changeBtn', !rows.changeBtn);
							// console.log(rows);
							// this.publishPriceList.push();
							Message.warning('添加成功');
						}else{
							Message.success('该城市已存在刊例价，请勿重复添加');
						}
					}
				}).catch(res =>{
					console.log(res);
				});
			}else{
				console.log('editRows', rows);
				// 修改广告限制
				// uid     int【必填】     UserID
				// amid    int【必填】     刊例价amID
				// rid     int             城市rID
				// mv      String          媒体（媒介载体）
				// am      int             报价(以分为单位整数)
				let info = {};
				info.uid = JSON.parse(sessionStorage.getItem('session_data')).uID;
				info.amid = rows.amID;
				info.rid = rows.cityUpdate;
				info.mv = rows.mediaUpdate;
				info.am = rows.priceUpdate*100;

				console.log('editinfo', info);
				api.postApi('/SetAdPrice', info).then(res =>{

					console.log(res);
					if(res.data.SysCode ==200200){
						Message.success(res.data.MSG);
						this.$set(rows, 'rID', rows.cityUpdate);
						this.$set(rows, 'rName', rows.rNameUpdate);
						this.$set(rows, 'mVehicle', rows.mediaUpdate);
						this.$set(rows, 'adPrice', rows.priceUpdate*100);
						this.$set(rows, 'showInput', !rows.showInput);
						this.$set(rows, 'changeBtn', !rows.changeBtn);
						this.publishPriceList.push();
					}else{
						Message.warning(res.data.MSG);
					}
				}).catch(res =>{
					console.log(res);
				});
			}
		},
		//取消
		cancelPP(rows, index){
			if(!rows.amID){
				this.publishPriceList.splice(index, 1);
			}else{
				this.$set(rows, 'rID', rows.rID);
				this.$set(rows, 'rName', rows.rName);
				this.$set(rows, 'mVehicle', rows.mVehicle);
				this.$set(rows, 'adPrice', rows.adPrice);
				this.$set(rows, 'showInput', !rows.showInput);
				this.$set(rows, 'changeBtn', !rows.changeBtn);
				this.publishPriceList.push();
			}
		}
	}
}


</script>
<style scoped>



  /*下拉框*/
  /deep/ .el-table-filter{
    height: 176px;
    /* overflow: hidden; */
    overflow-x: hidden;
    overflow-y: scroll;
  }
  /deep/ .el-table-filter__list{
   /*修改源代码*/
  }

  /deep/ .el-table-filter__list::-webkit-scrollbar{
    width: 4px;
    background: #FAFAFA;

  }
  /deep/ .el-table-filter__list::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: #C1C1C1;
    border-radius: 4px;
  }


  .changeInput{
    width: 150px;
    display: none;
  }

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

  /deep/ .el-input__inner{
    width: 100%;
    height: 30px;

  }

/deep/ .el-popper[x-placement^=bottom]{
  min-width: 9.6% !important;
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
    margin-bottom: 90px;
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
    padding-left: 14px;
    font-weight: bold;
  }
  .mediaList_wrap .mediaList_container{
    width: 100%;
    padding: 18px;
  }

  .mediaList_wrap .mediaList_container .table_wrap{
    width: 1210px;
    margin: 10px 0 0 0;
    border-radius: 4px;
  }

  .table_wrap{
    width:1210px;
    border-radius: 4px;
    margin: 0 auto;
    margin-top: 20px;
  }

  /*表格*/
  /*select选中*/
  /deep/.el-select-dropdown__item.selected{
    color: #666666;
    font-weight: normal;
  }


  /deep/.el-date-editor .el-range-separator{
    line-height: 26px;
  }

  /deep/.el-table th, .el-table tr{
    height: 44px;
    padding: 0;
    background-color: #f7f7f7;

  }
  /deep/ .el-table td{
    padding: 5px 0;
    overflow-x: hidden;
    text-overflow: ellipsis;
  }
  /deep/ .el-table--border{
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

  /deep/.el-input{
    width: 150px;
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
  .tar /deep/ .el-table .cell{
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    float: right;
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


  /deep/ .el-dropdown .el-button-group .el-button{
    height: 28px;

  }

  /*新增刊例价*/
  .addPublishPrice{
    box-sizing: border-box;
    width: 100%;
    height: 32px;
    border: 1px dashed #D9D9D9;
    border-radius: 4px;
    text-align: center;
    line-height: 32px;
    cursor: pointer;
    margin-top: 10px;
    font-size: 14px;
    color: rgba(0,0,0,0.65)
  }

  /*1440*/
  @media all and (min-width: 1420px) {

    .ad_mediaDetail_nav p {
      padding-left: 60px;
    }
    .mediaList_wrap{
      width: 1321.3px!important;
      /*margin-bottom: 177px!important;*/
    }

    .mediaList_wrap .mediaList_container .table_wrap{
      width: 1284px;
    }

  }

  /*1920*/
  @media all and (min-width: 1900px) {

    .mediaList_wrap{
      width: 1800px!important;
      /*margin-bottom: 211px!important;*/
    }

    .mediaList_wrap .mediaList_container .table_wrap{
      width: 1764px!important;
    }
  }

</style>

