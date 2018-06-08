<template>
	<div class="ad_mediaDetail_wrap clearfix">
		<div class="ad_mediaDetail_nav ">
			<p class="clearfix"><a href="#" style="color: #999">方案管理</a></p>
		</div>
		<div class="mediaList_wrap">
			<div class="mediaList_head">
				<h2>方案列表</h2>
			</div>
			<div class="mediaList_container">
				<el-row>
					<div class="mediaList_handel">
						<span>
							<div style="display:inline-block">
								<el-input placeholder="请输入内容" v-model="keyword" class="input-with-select" @change="initData">
									<el-select v-model="select" slot="prepend" placeholder="请选择">
									<el-option label="方案名称" value="1"></el-option>
									<el-option label="客户名称" value="2"></el-option>
									<el-option label="品牌名称" value="3"></el-option>
									</el-select>
								</el-input>
							</div>
						</span>
						<span>
							<div class="block">
								<el-date-picker
									v-model="rangeDate"
									type="daterange"
									range-separator="-"
									start-placeholder="创建日期"
									end-placeholder="创建日期">
								</el-date-picker>
							</div>
						</span>
						<span>
							<el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
						</span>
						<span>
							<el-button plain v-if="showNewBtn" @click="addOne">新建</el-button>
						</span>
					</div>
				</el-row>
				<div class="table_wrap">
					<el-table
						border
						:data="currentPlan"
						style="width: 100%"
						:default-sort="{prop: 'date', order: 'descending'}"
					>
						<el-table-column
							label="方案名称"
							min-width="14.9%"
						>
							<template slot-scope="scope">
								<a href="javascript:void(0);" @click="ToDetail(scope.row.apID)">{{scope.row.apName}}</a>
							</template>
						</el-table-column>
						<el-table-column
							prop="cName"
							label="客户名称"
							min-width="12.6%"
						>
							<template slot-scope="scope">
								<el-tooltip class="item" effect="dark" :content="scope.row.cName" placement="bottom">
									<span title="">{{scope.row.cName}}</span>
								</el-tooltip>
							</template>
						</el-table-column>
						<el-table-column
							prop="bTitle"
							label="品牌名称"
							min-width="6.6%"
						>
						</el-table-column>
						<el-table-column
							label="方案价格"
							sortable
							class="tar"
							min-width="8.3%"
						>
							<template slot-scope="scope">
								<span>{{priceFormat(scope.row.apTotal)}}</span>
							</template>
						</el-table-column>
						<el-table-column
							prop="realName"
							label="所有人"
							min-width="6.1%"
						>
						</el-table-column>
						<el-table-column
							label="投放城市(点位面数,排期)"
							min-width="23.6%"
						>
							<template slot-scope="scope">
								<p v-for="(item, index) of scope.row.cityArea" :key="index">{{item}}<i class="fa fa-lock fa-lg" style="color:#999;"></i></p>
							</template>
						</el-table-column>
						<el-table-column
							label="创建日期"
							min-width="7.3%"
						>
							<template slot-scope="scope">
								<span>{{formatTime(scope.row.apcTime)}}</span>
							</template>
						</el-table-column>
						<el-table-column
							class="tac"
							prop="apState"
							label="状态"
							min-width="6.1%"
							:filters="[
								{ text: '已完成', value: 0 },
								{ text: '进行中', value: 1 },
								{ text: '未投放', value: 2 },
								{ text: '投放中', value: 3 },
								{ text: '强制结束', value: 5 }
							]"
							:filter-method="filterStatus"
							:filter-multiple="false"
						>
							<template slot-scope="scope">
								<span>{{ stateToText(scope.row.apState) }}</span>
							</template>
						</el-table-column>
						<el-table-column
							label="操作"
							min-width="8.4%"
						>
							<template slot-scope="scope">
								<el-dropdown size="small" split-button trigger="click">操作
									<el-dropdown-menu slot="dropdown">
										<el-dropdown-item @click.native.prevent="preload">预锁</el-dropdown-item>
										<el-dropdown-item @click.native.prevent="release(scope.row)">发布</el-dropdown-item>
										<el-dropdown-item disabled="disabled">解除预锁</el-dropdown-item>
										<el-dropdown-item @click="deleteOne(scope.row)">删除</el-dropdown-item>
									</el-dropdown-menu>
								</el-dropdown>
							</template>
						</el-table-column>
					</el-table>
				</div>

				<el-dialog
					title="请选择预锁城市"
					:visible.sync="dialogVisible"
					width="30%"
				>
					<el-checkbox-group v-model="cityChoose">
						<el-checkbox label="广州市" checked border></el-checkbox>
						<el-checkbox label="深圳市" border></el-checkbox>
					</el-checkbox-group>
					<span slot="footer" class="dialog-footer">
						<el-button @click="cancelLock">取 消</el-button>
						<el-button type="primary" @click="confirmLock">确 定</el-button>
					</span>
				</el-dialog>
			</div>
		</div>
	</div>
</template>

<script>
import api  from '../../api/api.js';
import dateFormat  from '../../commonFun/timeFormat.js';
import commaFormat  from '../../commonFun/commaFormat.js';
import { Button, CheckboxGroup, Checkbox, Input, Dropdown, DropdownItem, DropdownMenu, Row, Table, TableColumn, DatePicker,Tooltip, Dialog, MessageBox, Message, Select, Option } from 'element-ui';
export default {
    name: "projectList",
	components:{
		elButton: Button,
		elCheckboxGroup: CheckboxGroup,
		elCheckbox: Checkbox,
		elInput: Input,
		elDropdown: Dropdown,
		elDropdownItem: DropdownItem,
		elDropdownMenu: DropdownMenu,
		elRow: Row,
		elTable: Table,
		elTableColumn: TableColumn,
		elDatePicker: DatePicker,
		elTooltip: Tooltip,
		elDialog: Dialog,
		elSelect: Select,
		elOption: Option
	},
	created(){
		this.getPlanListData();
		this.getRole();
	},
    data() {
		return {
			dialogVisible: false,
			cityChoose: [],
			rangeDate: '',
			keyword: '',
			showNewBtn:true,
			select: '1',
			// 表格数据
			currentPlan: [
				{
				apID: 1,
				apName: "第一个投放方案",
				cName: "新光百货",
				bTitle: "新光百货",
				apTotal: 465200,
				realName: "黄启炜",
				rIDs: "重庆市(6面2018-05-19至2018-05-25),广州市(4面2018-05-19至2018-05-25),北京市(6面2018-05-19至2018-05-25)",
				apcTime: "2018-05-09 18:29:47.0",
				apState: 1
				}
			],
			//所有数据
			planList: [
				{
				apID: 1,
				apName: "第一个投放方案",
				cName: "新光百货",
				bTitle: "新光百货",
				apTotal: 465200,
				realName: "黄启炜",
				rIDs: "重庆市(6面2018-05-19至2018-05-25),广州市(4面2018-05-19至2018-05-25),北京市(6面2018-05-19至2018-05-25)",
				apcTime: "2018-05-09 18:29:47.0",
				apState: 1
				}
			]
		}
    },
    methods: {
		// 判断角色是否有新建按钮(媒介和销售有)
		getRole(){
			let role = JSON.parse(sessionStorage.getItem('session_data')).uType;
			console.log(role);
			if(role != 'BD' && role != 'MD'){
				this.showNewBtn = false;
			}
		},
		// 获取方案列表初始数据
		getPlanListData(){
			// 本地测试
			// for(let item of this.planList){
			// 	item.cityArea = item.rIDs.split(',');
			// 	console.log(item.cityArea);
			// }

			let uid = JSON.parse(sessionStorage.getItem('session_data')).uID;
			// console.log(uid);
			api.getApi('./GetFangan', { uid: uid }).then(res => {
				console.log(res.data);
				let info = res.data;
				if(!info.SysCode){
					this.planList = info;
					for(let item of this.planList){
						if(item.rIDs){
							item.cityArea = item.rIDs.split(',');
						}
						console.log(item.cityArea);
					}
					this.currentPlan = this.planList;
				}else{
					Message.warning(info.MSG);
				}
			}).catch(res => {
				console.log(res);
			});
		},
		// 状态转换成文本
		stateToText(val){
			let state = [
				{text: '已完成', value: 0},
				{text: '进行中', value: 1},
				{text: '未投放', value: 2},
				{text: '投放中', value: 3},
				{text: '强行结束', value: 5}
			];
			for(let data of state ){
				if(val == data.value){
					return data.text;
				}
			}
		},
		// 时间格式规范
		formatTime(val){
			return dateFormat.toDate(val);
		},
		// 价格加上逗号
		priceFormat(price){
			return commaFormat.format(price);
		},
		// 新建方案
		addOne(){
			this.$router.push('./createPlan');
		},
		// 当搜索框为空的时候进行重置显示
		initData(){
			if((!this.rangeDate) && (!this.keyword) ){
				this.currentPlan = this.planList;
			}
		},
		// 搜索方案
		search(){
			let range = this.rangeDate;
			let arr = [];
			let select = this.select;
			let keyword = this.keyword;
			if(range || this.keyword){
				for(let data of this.planList){
					if(range && keyword){
						if(
							dateFormat.toDate(data.apcTime) >= range[0] &&
							dateFormat.toDate(data.apcTime) <= range[1]
						){
							if(data.apName){
								if((select == '1') && data.apName.includes(keyword) ){
									arr.push(data);
								}
							}
							if(data.cName){
								if((select == '2') && data.cName.includes(keyword)){
									arr.push(data);
								}
							}
							if(data.bTitle){
								if((select == '3') && data.bTitle.includes(keyword)){
									arr.push(data);
								}
							}
						}
					}else if(range){
						if(
							dateFormat.toDate(data.apcTime) >= range[0] &&
							dateFormat.toDate(data.apcTime) <= range[1]
						){
							arr.push(data);
						}
					}else if(keyword){
						if(data.apName){
							if((select == '1') && data.apName.includes(keyword) ){
								arr.push(data);
							}
						}
						if(data.cName){
							if((select == '2') && data.cName.includes(keyword)){
								arr.push(data);
							}
						}
						if(data.bTitle){
							if((select == '3') && data.bTitle.includes(keyword)){
								arr.push(data);
							}
						}
					}
				}
				this.currentPlan = arr;
				console.log(arr);
				return;
			}
			this.currentPlan = this.planList;
		},
		//筛选
		filterStatus(value, row) {
			return row.apState === value;
		},
		// 删除
		deleteOne(row){
			console.log(row);
		},
		// 随机生成合同编号
		getContractNo(rid){
			let date = new Date();
			let result = 'QC';
			result = result+dateFormat.toDate(date, '');
			result = result+rid.toString().substring(0, 4);
			result = result+'00'+Math.round(Math.random()*10);
			console.log(result);
			return result;
		},
		// 发布
		release(row){
			console.log(row);
			// // 测试数据
			// let pdidArr = [
			// 	{pdID: 1,apID: 1,rID: 440100,muID: 0,pdDays: 7,pdStar: "2018-05-19",pdEnd: "2018-05-25",pdFreeNum: 0,pdAdFee: 0,pdNum: 4,pdAdMake: 40000,pdTotal: 760000,pdSendFee: 0,pdOtherFee: 0},
			// 	{pdID: 2,apID: 1,rID: 110100,muID: 0,pdDays: 7,pdStar: "2018-05-19",pdEnd: "2018-05-25",pdFreeNum: 0,pdAdFee: 0,pdNum: 6,pdAdMake: 60000,pdTotal: 1140000,pdSendFee: 0,pdOtherFee: 0},
			// 	{pdID: 3,apID: 1,rID: 500100,muID: 0,pdDays: 7,pdStar: "2018-05-19",pdEnd: "2018-05-25",pdFreeNum: 0,pdAdFee: 0,pdNum: 6,pdAdMake: 60000,pdTotal: 1140000,pdSendFee: 0,pdOtherFee: 0},
			// 	{pdID: 3,apID: 1,rID: 500100,muID: 0,pdDays: 7,pdStar: "2018-05-20",pdEnd: "2018-05-25",pdFreeNum: 0,pdAdFee: 0,pdNum: 6,pdAdMake: 60000,pdTotal: 1140000,pdSendFee: 0,pdOtherFee: 0}
			// ];
			// let asid = [
			// 	{asID: 1,cType: "高端住宅",tradingArea: "山泉1",adSize: "1181*841",assetTag: "201707GZ-13161",rID: 440104,notPush: "美容",hNum: 170,pbStar: "May 19, 2018",fNum: 12,resName: "帝景山庄改1",chDay: "2013",hPrice: 6100000,rName: "越秀区",asLab: "A",pbID: 1,adViewSize: "118*84",mTitle: "帝景1门",pbEnd: "May 25, 2018"},
			// 	{asID: 2,cType: "高端住宅",tradingArea: "山泉1",adSize: "1181*841",assetTag: "201707GZ-13161",rID: 110104,notPush: "美容",hNum: 170,pbStar: "May 19, 2018",fNum: 12,resName: "帝景山庄改1",chDay: "2013",hPrice: 6100000,rName: "越秀区",asLab: "B",pbID: 6,adViewSize: "118*84",mTitle: "帝景1门",pbEnd: "May 25, 2018"},
			// 	{asID: 2,cType: "高端住宅",tradingArea: "山泉1",adSize: "1181*841",assetTag: "201707GZ-13161",rID: 440104,notPush: "美容",hNum: 170,pbStar: "May 19, 2018",fNum: 12,resName: "帝景山庄改1",chDay: "2013",hPrice: 6100000,rName: "越秀区",asLab: "B",pbID: 6,adViewSize: "118*84",mTitle: "帝景1门",pbEnd: "May 25, 2018"},
			// 	{asID: 2,cType: "高端住宅",tradingArea: "山泉1",adSize: "1181*841",assetTag: "201707GZ-13161",rID: 500100,notPush: "美容",hNum: 170,pbStar: "May 19, 2018",fNum: 12,resName: "帝景山庄改1",chDay: "2013",hPrice: 6100000,rName: "越秀区",asLab: "B",pbID: 6,adViewSize: "118*84",mTitle: "帝景1门",pbEnd: "May 25, 2018"},
			// 	{asID: 2,cType: "高端住宅",tradingArea: "山泉1",adSize: "1181*841",assetTag: "201707GZ-13161",rID: 500100,notPush: "美容",hNum: 170,pbStar: "May 20, 2018",fNum: 12,resName: "帝景山庄改1",chDay: "2013",hPrice: 6100000,rName: "越秀区",asLab: "B",pbID: 6,adViewSize: "118*84",mTitle: "帝景1门",pbEnd: "May 25, 2018"},
			// ];
			// // 组装数据
			// let arr = [];
			// for(let pdData of pdidArr){
			// 	if(!arr.length){
			// 		arr.push({
			// 			uid: uid,
			// 			act: 'R',
			// 			pdid: pdData.pdID,
			// 			rID: pdData.rID,
			// 			ds: pdData.pdStar,
			// 			de: pdData.pdEnd,
			// 			asidlist: ''
			// 		});
			// 	}else{
			// 		for(let test of arr){
			// 			if((pdData.pdID != test.pdid) || (pdData.pdStar != test.ds) || (pdData.pdEnd != test.de)){
			// 				arr.push({
			// 					uid: uid,
			// 					act: 'R',
			// 					pdid: pdData.pdID,
			// 					rID: pdData.rID,
			// 					ds: pdData.pdStar,
			// 					de: pdData.pdEnd,
			// 					asidlist: ''
			// 				});
			// 				break;
			// 			}
			// 		}
			// 	}
			// }
			// console.log('arr', arr);
			// // 获取asid
			// for(let result of arr){
			// 	let as = '';
			// 	for(let res of asid){
			// 		let resultRID = result.rID.toString().substring(0, 4);
			// 		let resRID = res.rID.toString().substring(0, 4);
			// 		let start = dateFormat.toDate(res.pbStar);
			// 		let end = dateFormat.toDate(res.pbEnd);
			// 		// console.log(resultRID ==resRID, start == result.ds, end == result.de);
			// 		if((resultRID ==resRID) && (start == result.ds) && (end == result.de)){
			// 			as=res.asID+','+as;
			// 		}
			// 	}
			// 	console.log('asid', as);
			// 	result.asidlist = as;
			// }
			// console.log('resultArr', arr);

			// 真实数据
			let uid = JSON.parse(sessionStorage.getItem('session_data')).uID;
			let apid = row.apID;
			let info = {
				uid: uid,
				apid: apid
			};
			// uid         int【必填】     当前账户UserID
            // apid        int             公司对应方案apID
			api.postApi('/GetFanganInfo', info).then(res =>{
				console.log(res.data);
				if(!res.data.SysCode){
					let text = res.data;
					let QCinfo = this.getContractNo(text.rID);
					console.log(QCinfo);
					MessageBox.prompt('合同编号:', {
						confirmButtonText: '是',
						cancelButtonText: '否',
						inputValue: QCinfo
					}).then(() => {
						// 获取pdid
						api.getApi('/GetAPD', info).then(res=>{
							console.log(res.data);
							let pdidArr = res.data;
							// 获取asid列表GetADB
							api.getApi('/GetADB', info).then(res=>{
								console.log(res.data);
								let asid = res.data;
								// 组装数据
								let arr = [];
								// 组装pdid
								for(let pdData of pdidArr){
									if(!arr.length){
										arr.push({
											uid: uid,
											act: 'R',
											pdid: pdData.pdID,
											rID: pdData.rID,
											ds: pdData.pdStar,
											de: pdData.pdEnd,
											asidlist: ''
										});
									}else{
										for(let test of arr){
											if((pdData.pdID != test.pdid) || (pdData.pdStar != test.ds) || (pdData.pdEnd != test.de)){
												arr.push({
													uid: uid,
													act: 'R',
													pdid: pdData.pdID,
													rID: pdData.rID,
													ds: pdData.pdStar,
													de: pdData.pdEnd,
													asidlist: ''
												});
												break;
											}
										}
									}
								}
								console.log('arr', arr);
								// 组装asid
								for(let result of arr){
									let as = '';
									for(let res of asid){
										let resultRID = result.rID.toString().substring(0, 4);
										let resRID = res.rID.toString().substring(0, 4);
										let start = dateFormat.toDate(res.pbStar);
										let end = dateFormat.toDate(res.pbEnd);
										// console.log(resultRID ==resRID, start == result.ds, end == result.de);
										if((resultRID ==resRID) && (start == result.ds) && (end == result.de)){
											as=res.asID+','+as;
										}
									}
									console.log('asid', as);
									result.asidlist = as;
								}
								console.log('resultArr', arr);
								// 循环发布
								this.ctrlFangan(arr);
								
							}).catch(res=>{
								console.log(res);
							});
						}).catch(res=>{
							console.log(res);
						});
						
					}).catch(() => {
						Message({
							type: 'info',
							message: '已取消操作'
						})
					})

				}else{
					Message.warning(res.data.MSG);
				}
			}).catch(res => {
				console.log(res);
			});

		},
		// 循环发布
		ctrlFangan(arr){
			// uid         int【必填】         当前账户UserID
			// act         String【必填】      事务类型：L锁点；R发布
			// pdid        int【必填】         选择方案投放pdID
			// ds          String【必填】      广告开始投放日期
			// de          String【必填】      广告投放结束日期
			// asidlist    String【必填】      选择的广告点位asID组合，以","逗号组合
			// 发布接口
			for(let upInfo of arr){
				api.postApi('/CtrlFangan', upInfo).then(res =>{
					console.log(res.data);
				}).catch(res =>{
					console.log(res);
				});
			}
		},
		// 跳转到详情页面
		ToDetail(apid){
			console.log(apid);
			sessionStorage.setItem('plan_apid', apid);
			this.$router.push('./planDetail');
		},
		//确认框
		preload(e) {
			this.dialogVisible = true;
			// var Status = e.target.innerText;

			// MessageBox.confirm(`<el-checkbox-group v-model="cityChoose">
			//                   <el-checkbox label="广州市" border></el-checkbox>
			//                   <el-checkbox label="深圳市" border></el-checkbox>
			//               </el-checkbox-group>`, '提示', {
			//   confirmButtonText: '确定',
			//   cancelButtonText: '取消',
			//   dangerouslyUseHTMLString: true,
			//   type: 'warning'
			// }).then(() => {
			//   //确定
			//   Message({
			//     type: 'success',
			//     message: '成功更改状态'
			//   });
			// }).catch(() => {
			//   Message({
			//     type: 'info',
			//     message: '已取消操作'
			//   })
			// })
		},
		cancelLock() {
			this.dialogVisible = false;
			Message.info('已取消操作');
		},
		confirmLock() {
			this.dialogVisible = false;
			Message.success('成功更改状态');
		},
	},
    //实时计算  数据发生变化时执行相应函数
    /*computed: {
      searchDate: function () {
        //输入框传入的值
        var search = this.keyword;
        if (search) {
          //filter  数组的方法，返回回调函数中满足条件的值
          return this.planList.filter(function (plan) {
            //Object.keys(car) 返回一个数组，如果传入对象，返回对象的属性名集合
            //some() 数组的方法 用于检测数组中的元素是否满足指定条件，参数必需是函数。
            return Object.keys(plan).some(function (key) {
              //String 把对象的值转化成字符串
              //toLowerCase()字符串转换成小写
              //indexOf(search)>-1 输入框里输入的筛选内容存在符合条件的数据
              return String(plan[key]).toLowerCase().indexOf(search) > -1
            })
          })
        }
        return this.planList;
      }
    }*/
}

</script>

<style scoped>
  a{
    color: #108EE9;
  }
  /*筛选*/
  .el-checkbox + .el-checkbox {
    margin-left: 0;
  }


  .typeBox p {
    height: 30px;
    font-size: 12px;
    text-align: center;
    line-height: 30px;
    border-top: 1px solid #cccccc;
  }

  /deep/ .el-checkbox__label {
    font-size: 10px;
    color: #8A8A8A;
  }


  /*下拉搜索框*/
  /deep/ .el-input-group__prepend {
    width: 64px;
    background-color: #fff;
  }

  /deep/ .el-input-group--prepend .el-select .el-input__inner {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;

    width: 104px;
  }

  /deep/ .el-input-group--prepend .el-input__inner {
    width: 185px;
  }

  .el-input {

    height: 34px !important;
    border-radius: 4px;
  }



  /*面包屑导航*/
  .ad_mediaDetail_wrap {
    position: relative;

  }

  .ad_mediaDetail_nav p {
    padding-left: 58px;
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

  /deep/ .el-dialog__body {
    text-align: center;
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

  /deep/ .el-button {
    width: 76px;
    height: 34px;
    text-align: center;
    padding: 0;
    position: relative;
    /*top: 1px;*/
    left: 0;
    margin-left: 2px;
  }

  /deep/ .el-button + .el-button {
    margin-left: 0;
  }

  .mediaList_wrap .mediaList_container .table_wrap {
    width: 1210px;
    margin: 10px 0 0 0;
    border-radius: 4px;

  }

  .input-with-select /deep/ .el-input__inner{
    font-size: 14px;
    /*padding: 10px 10px;*/
    height: 34px;
    /*line-height: 14px;*/
    vertical-align: middle;
  }
  /deep/ .el-date-editor .el-range-separator {
    font-size: 14px;
    /*height: 34px;*/
  }


  /*日期控件*/
  .block {
    display: inline-block;
    margin-left: 2px;
    position: relative;
    /*top: 3px;*/
  }


  /deep/ .el-date-editor .el-range__icon {
    position: relative;
    top: -3px;
    margin-right: 2px;
  }
  /deep/ .el-range-separator{
    position: relative;
    top: -2px;
  }
  /deep/ .el-input__inner {
    width: 260px;
    height: 34px;
    line-height: 34px;
  }
  /deep/ .el-date-editor i, /deep/ .el-date-editor input, /deep/ .el-date-editor span {
    float: left;
    position: relative;
  }


  /*表格*/
  /deep/ .el-table th, .el-table tr {
    height: 44px;
    padding: 0;
    background-color: #f7f7f7;

  }

  /deep/ .el-table td {
    padding: 6px 0;
    overflow-x: hidden;
    text-overflow: ellipsis;
  }
  /deep/ .el-table td .cell{
    display: flex;
    flex-direction: column;
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

  /deep/ .el-table_1_column_4 {
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

  /deep/ .el-table-filter__list-item {
    color: rgb(102, 102, 102);
  }

  /*超出省略*/
  /deep/ .el-table .cell {
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  /deep/ .el-table__row td:nth-child(7)  .cell {
    width: 80px;
  }
  /deep/ .el-table__row td:nth-child(3)  .cell {
    width: 70px;
  }

  /deep/ .el-table__row td:nth-child(2)  .cell {
    width: 156px;
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

  /*锁*/
  .fa.fa-lock.fa-lg {
    font-size: 16px;
    color: #d8d8d8 !important;
    position: relative;
    top: -1px;
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

  /deep/ .el-dropdown .el-button-group .el-button {
    height: 28px;
    width: 48px;
    font-size: 14px;
    padding: 0;
  }
  /*/deep/ .el-button-group .el-button:not(:last-child){*/
    /*margin-top: -1px;*/
  /*}*/

  /deep/ .el-button-group button{
    float: left !important;
  }

  /deep/ .el-dropdown .el-button-group .el-button:last-child {
    width: 30px;
    /*position: relative;*/
    /*top: -1px;*/
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

  .mediaList_container span{
    float: left !important;
    margin-left: 2px;
  }

  /*1440*/
  @media all and (min-width: 1420px) {

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
  @media all and (min-width: 1900px) {

    .mediaList_wrap {
      width: 1800px !important;
      margin-bottom: 250px !important;
    }

    .mediaList_wrap .mediaList_container .table_wrap {
      width: 1764px !important;
    }
    /deep/ .el-table__row td:nth-child(7)  .cell {
      width: 126px;
    }
    /deep/ .el-table__row td:nth-child(3)  .cell {
      width: 70px;
    }

    /deep/ .el-table__row td:nth-child(2)  .cell {
      width: 156px;
    }
  }


</style>
