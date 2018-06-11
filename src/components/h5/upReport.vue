<template>
	<div>
		<div class="ad_mediaMana_wrap">
			<div class="mediaMana_content_top">
				<div class="content_top_wrap">
					<div class="title">
						<h1>亲邻科技上刊报告</h1>
						<h3>广州探鱼 &nbsp;&nbsp;2017/11/11-2017/12/12</h3>
					</div>
					<div class="detail">
						<p>
							<em>公司名称：</em><i>深圳市亲邻科技有限公司</i>
							<em>投放城市：</em><i>广州、深圳</i>
							<em>投放面数：</em><i>300面</i>
						</p>
					</div>
				</div>
			</div>
			<div class="plan-panel">
				<el-tabs v-model="planPanel">
					<el-tab-pane label="投放详情" name="first">
						<div class="first-wrap box-wrap">
							<h4>投放详情</h4>
							<div class="search-wrap">
								<span>
									<el-select v-model="select" placeholder="请选择" class="type-select">
										<el-option v-for="item in typeSelect" :key="item.value" :label="item.label" :value="item.value"></el-option>
									</el-select>
									<el-input v-model="keyword" placeholder="请输入要搜索的内容" class="searchInput" @change="initData"></el-input>
								</span>
								<span>
									<el-button type="primary" icon="el-icon-search" class="searchBtn" @click="search()">搜索</el-button>
								</span>
							</div>
							<div class="table_wrap">
								<el-table
									border
									:data="currPutDetail"
									style="width: 100%"
									:default-sort="{prop: 'recName', order: 'descending'}"
								>
									<el-table-column type="expand">
										<template slot-scope="props">
											<el-form label-position="left" inline class="demo-table-expand">
												<el-form-item label="商圈：">
													<span>{{ props.row.tradingArea}}</span>
												</el-form-item>
												<el-form-item label="楼栋数量：">
													<span>{{ props.row.fNum }}</span>
												</el-form-item>
												<el-form-item label="资产编号：">
													<span>{{ props.row.assetTag }}</span>
												</el-form-item>
												<el-form-item label="入住年份：">
													<span>{{ props.row.chDay }}</span>
												</el-form-item>
												<el-form-item label="广告限制：">
													<span>{{ props.row.notPush }}</span>
												</el-form-item>
											</el-form>
										</template>
									</el-table-column>
									<el-table-column
										prop="city"
										label="城市"
										min-width="6.7%"
										:filters="filterCityData"
										:filter-method="filterCity"
									>
									</el-table-column>
									<el-table-column
										prop="rName"
										label="区域"
										min-width="6.7%"
										:filters="filtersArea"
										:filter-method="filterRName"
									>
									</el-table-column>
									<el-table-column
										prop="resName"
										label="资源名称"
										min-width="11.9%"
										class="tar"
									>
									</el-table-column>
									<el-table-column
										prop="address"
										label="地址"
										min-width="19.5%"
									>
									</el-table-column>
									<el-table-column
										prop="cType"
										label="楼盘类型"
										min-width="6.1%"
									>
									</el-table-column>
									<el-table-column
										prop="chDay"
										label="入住时间"
										min-width="6.1%"
										class="tar"
									>
									</el-table-column>
									<el-table-column
										label="楼盘价格"
										min-width="7.6%"
									>
										<template slot-scope="scope">
											<span>{{priceFormat(scope.row.hPrice/100)}}</span>
										</template>
									</el-table-column>
									<el-table-column
										prop="hNum"
										label="户数"
										min-width="5.6%"
									>
									</el-table-column>
									<el-table-column
										prop="mediaNum"
										label="媒体数量"
										min-width="6.1%"
									>
									</el-table-column>
									<el-table-column
										label="操作"
										min-width="6.1%"
									>
										<template slot-scope="scope">
											<el-button type="text">查看监播</el-button>
										</template>
									</el-table-column>
								</el-table>
							</div>
						</div>
					</el-tab-pane>
					<el-tab-pane label="地图展示" name="second">
						<div class="sec-wrap box-wrap">
							<h4>地图展示</h4>
							<div class="map">

							</div>
						</div>
					</el-tab-pane>
					<el-tab-pane label="监播图片" name="third">
						<div class="sec-wrap box-wrap">
							<h4>监播图片</h4>
							<div class="tabs">
								<button class="active" @click="box1Change">按资源分</button>
								<button @click="box1Change">按图片分</button>
							</div>
							<div class="typeOfRec" v-if="isActive1">
								<div>
									<div class="picBox">
									<el-carousel :autoplay="false" trigger="click">
										<el-carousel-item v-for="item in 4" :key="item" >
										<!--<h3>{{item}}</h3>-->
										<img :src=dialogImageUrl alt="">
										</el-carousel-item>
									</el-carousel>
									<!--缩略图-->
									<div class="mask-btn">
										<i class="el-icon-search" @click="handlePictureCardPreview"></i>
									</div>
									<div class="pic-title">珠江新城小区</div>
									</div>
									<div class="picBox">
									<el-carousel :autoplay="false" trigger="click">
										<el-carousel-item v-for="item in 4" :key="item" >
										<!--<h3>{{item}}</h3>-->
										<img :src=dialogImageUrl alt="">
										</el-carousel-item>
									</el-carousel>
									<!--缩略图-->
									<div class="mask-btn">
										<i class="el-icon-search" @click="handlePictureCardPreview"></i>
									</div>
									<div class="pic-title">珠江新城小区</div>
									</div>
									<div class="picBox">
									<el-carousel :autoplay="false" trigger="click">
										<el-carousel-item v-for="item in 4" :key="item" >
										<!--<h3>{{item}}</h3>-->
										<img :src=dialogImageUrl alt="">
										</el-carousel-item>
									</el-carousel>
									<!--缩略图-->
									<div class="mask-btn">
										<i class="el-icon-search" @click="handlePictureCardPreview"></i>
									</div>
									<div class="pic-title">珠江新城小区</div>
									</div>
									<div class="picBox">
									<el-carousel :autoplay="false" trigger="click">
										<el-carousel-item v-for="item in 4" :key="item" >
										<!--<h3>{{item}}</h3>-->
										<img :src=dialogImageUrl alt="">
										</el-carousel-item>
									</el-carousel>
									<!--缩略图-->
									<div class="mask-btn">
										<i class="el-icon-search" @click="handlePictureCardPreview"></i>
									</div>
									<div class="pic-title">珠江新城小区</div>
									</div>
									<div class="picBox">
									<el-carousel :autoplay="false" trigger="click">
										<el-carousel-item v-for="item in 4" :key="item" >
										<!--<h3>{{item}}</h3>-->
										<img :src=dialogImageUrl alt="">
										</el-carousel-item>
									</el-carousel>
									<!--缩略图-->
									<div class="mask-btn">
										<i class="el-icon-search" @click="handlePictureCardPreview"></i>
									</div>
									<div class="pic-title">珠江新城小区</div>
									</div>
								</div>
							<div>
								<div class="picBox">
									<el-carousel :autoplay="false" trigger="click">
										<el-carousel-item v-for="item in 4" :key="item" >
										<!--<h3>{{item}}</h3>-->
										<img :src=dialogImageUrl alt="">
										</el-carousel-item>
									</el-carousel>
									<!--缩略图-->
									<div class="mask-btn">
										<i class="el-icon-search" @click="handlePictureCardPreview"></i>
									</div>
									<div class="pic-title">珠江新城小区</div>
								</div>
								<div class="picBox">
									<el-carousel :autoplay="false" trigger="click">
										<el-carousel-item v-for="item in 4" :key="item" >
										<!--<h3>{{item}}</h3>-->
										<img :src=dialogImageUrl alt="">
										</el-carousel-item>
									</el-carousel>
									<!--缩略图-->
									<div class="mask-btn">
										<i class="el-icon-search" @click="handlePictureCardPreview"></i>
									</div>
									<div class="pic-title">珠江新城小区</div>
								</div>
								<div class="picBox">
									<el-carousel :autoplay="false" trigger="click">
										<el-carousel-item v-for="item in 4" :key="item" >
										<!--<h3>{{item}}</h3>-->
										<img :src=dialogImageUrl alt="">
										</el-carousel-item>
									</el-carousel>
									<!--缩略图-->
									<div class="mask-btn">
										<i class="el-icon-search" @click="handlePictureCardPreview"></i>
									</div>
									<div class="pic-title">珠江新城小区</div>
								</div>
								<div class="picBox">
									<el-carousel :autoplay="false" trigger="click">
										<el-carousel-item v-for="item in 4" :key="item" >
										<!--<h3>{{item}}</h3>-->
										<img :src=dialogImageUrl alt="">
										</el-carousel-item>
									</el-carousel>
									<!--缩略图-->
									<div class="mask-btn">
										<i class="el-icon-search" @click="handlePictureCardPreview"></i>
									</div>
									<div class="pic-title">珠江新城小区</div>
								</div>
								<div class="picBox">
									<el-carousel :autoplay="false" trigger="click">
										<el-carousel-item v-for="item in 4" :key="item" >
										<!--<h3>{{item}}</h3>-->
										<img :src=dialogImageUrl alt="">
										</el-carousel-item>
									</el-carousel>
									<!--缩略图-->
									<div class="mask-btn">
										<i class="el-icon-search" @click="handlePictureCardPreview"></i>
									</div>
									<div class="pic-title">珠江新城小区</div>
								</div>
							</div>
							<div class="pager">
								<el-pagination
									small
									background
									@size-change="handleSizeChange"
									@current-change="handleCurrentChange"
									:current-page="1"
									:page-sizes="[5, 10]"
									:page-size="5"
									layout=" sizes, prev, pager, next, jumper"
									:total="30">
								</el-pagination>
							</div>
							</div>
							<div class="typeOfPic" v-if="!isActive1">
								<div>
									<div class="picBox">
										<el-carousel :autoplay="false" trigger="click">
											<el-carousel-item v-for="item in 4" :key="item" >
											<!--<h3>{{item}}</h3>-->
											<img :src=dialogImageUrl alt="">
											</el-carousel-item>
										</el-carousel>
										<!--缩略图-->
										<div class="mask-btn">
											<i class="el-icon-search" @click="handlePictureCardPreview"></i>
										</div>
										<div class="pic-title">珠江新城小区</div>
									</div>
									<div class="picBox">
										<el-carousel :autoplay="false" trigger="click">
											<el-carousel-item v-for="item in 4" :key="item" >
											<!--<h3>{{item}}</h3>-->
											<img :src=dialogImageUrl alt="">
											</el-carousel-item>
										</el-carousel>
										<!--缩略图-->
										<div class="mask-btn">
											<i class="el-icon-search" @click="handlePictureCardPreview"></i>
										</div>
										<div class="pic-title">珠江新城小区</div>
									</div>
									<div class="picBox">
										<el-carousel :autoplay="false" trigger="click">
											<el-carousel-item v-for="item in 4" :key="item" >
											<!--<h3>{{item}}</h3>-->
											<img :src=dialogImageUrl alt="">
											</el-carousel-item>
										</el-carousel>
										<!--缩略图-->
										<div class="mask-btn">
											<i class="el-icon-search" @click="handlePictureCardPreview"></i>
										</div>
										<div class="pic-title">珠江新城小区</div>
									</div>
									<div class="picBox">
										<el-carousel :autoplay="false" trigger="click">
											<el-carousel-item v-for="item in 4" :key="item" >
											<!--<h3>{{item}}</h3>-->
											<img :src=dialogImageUrl alt="">
											</el-carousel-item>
										</el-carousel>
										<!--缩略图-->
										<div class="mask-btn">
											<i class="el-icon-search" @click="handlePictureCardPreview"></i>
										</div>
										<div class="pic-title">珠江新城小区</div>
									</div>
									<div class="picBox">
										<el-carousel :autoplay="false" trigger="click">
											<el-carousel-item v-for="item in 4" :key="item" >
											<!--<h3>{{item}}</h3>-->
											<img :src=dialogImageUrl alt="">
											</el-carousel-item>
										</el-carousel>
										<!--缩略图-->
										<div class="mask-btn">
											<i class="el-icon-search" @click="handlePictureCardPreview"></i>
										</div>
										<div class="pic-title">珠江新城小区</div>
									</div>
								</div>
								<div>
									<div class="picBox">
										<el-carousel :autoplay="false" trigger="click">
											<el-carousel-item v-for="item in 4" :key="item" >
											<!--<h3>{{item}}</h3>-->
											<img :src=dialogImageUrl alt="">
											</el-carousel-item>
										</el-carousel>
										<!--缩略图-->
										<div class="mask-btn">
											<i class="el-icon-search" @click="handlePictureCardPreview"></i>
										</div>
										<div class="pic-title">珠江新城小区</div>
									</div>
									<div class="picBox">
										<el-carousel :autoplay="false" trigger="click">
											<el-carousel-item v-for="item in 4" :key="item" >
											<!--<h3>{{item}}</h3>-->
											<img :src=dialogImageUrl alt="">
											</el-carousel-item>
										</el-carousel>
										<!--缩略图-->
										<div class="mask-btn">
											<i class="el-icon-search" @click="handlePictureCardPreview"></i>
										</div>
										<div class="pic-title">珠江新城小区</div>
									</div>
									<div class="picBox">
										<el-carousel :autoplay="false" trigger="click">
											<el-carousel-item v-for="item in 4" :key="item" >
											<!--<h3>{{item}}</h3>-->
											<img :src=dialogImageUrl alt="">
											</el-carousel-item>
										</el-carousel>
										<!--缩略图-->
										<div class="mask-btn">
											<i class="el-icon-search" @click="handlePictureCardPreview"></i>
										</div>
										<div class="pic-title">珠江新城小区</div>
									</div>
									<div class="picBox">
										<el-carousel :autoplay="false" trigger="click">
											<el-carousel-item v-for="item in 4" :key="item" >
											<!--<h3>{{item}}</h3>-->
											<img :src=dialogImageUrl alt="">
											</el-carousel-item>
										</el-carousel>
										<!--缩略图-->
										<div class="mask-btn">
											<i class="el-icon-search" @click="handlePictureCardPreview"></i>
										</div>
										<div class="pic-title">珠江新城小区</div>
									</div>
									<div class="picBox">
										<el-carousel :autoplay="false" trigger="click">
											<el-carousel-item v-for="item in 4" :key="item" >
											<!--<h3>{{item}}</h3>-->
											<img :src=dialogImageUrl alt="">
											</el-carousel-item>
										</el-carousel>
										<!--缩略图-->
										<div class="mask-btn">
											<i class="el-icon-search" @click="handlePictureCardPreview"></i>
										</div>
										<div class="pic-title">珠江新城小区</div>
									</div>
								</div>
								<div class="pager">
									<el-pagination
										small
										background
										@size-change="handleSizeChange"
										@current-change="handleCurrentChange"
										:current-page="1"
										:page-sizes="[5, 10]"
										:page-size="5"
										layout=" sizes, prev, pager, next, jumper"
										:total="30">
									</el-pagination>
								</div>
							</div>
						</div>
					</el-tab-pane>
					<el-tab-pane label="发布情况" name="forth">
						<div class="forth-wrap box-wrap">
							<h4>发布情况</h4>
							<div class="table_wrap">
								<el-table
									border
									:data="postDetail"
									style="width: 100%"
									:default-sort="{prop: 'recName', order: 'descending'}"
								>
									<el-table-column
										prop="city"
										label="城市"
										min-width="10.3%"
									>
									</el-table-column>
									<el-table-column
										prop="planNum"
										label="计划点位数"
										min-width="18.6%"
									>
									</el-table-column>
									<el-table-column
										prop="realNum"
										label="实际执行点位数"
										min-width="18.8%"
										class="tar"
									>
									</el-table-column>
									<el-table-column
										prop="wrongNum"
										label="问题点位数"
										min-width="19.3%"
									>
									</el-table-column>
									<el-table-column
										prop="resolveNum"
										label="问题解决数"
										min-width="19.8%"
									>
									</el-table-column>
								</el-table>
							</div>
						</div>
					</el-tab-pane>
				</el-tabs>
				<!--缩略图对话框-->
				<el-dialog :visible.sync="dialogVisible">
					<img style="width: 100%;height: 100%" :src="dialogImageUrl" alt="">
				</el-dialog>
			</div>
			<div class="ad_index_footer clearfix">
				<p>
					Copyright &copy;2018 亲邻科技线上产品部
				</p>
			</div>
		</div>
	</div>

</template>

<script>
import { api } from '../../api/api';
// 城市区域变成中文
import areaToText from '../../commonFun/areaToText_new.js';
// 价格格式化
import commaFormat from '../../commonFun/commaFormat.js';
// 筛选过滤
import filterFormat from '../../commonFun/filterTableData.js';
// 时间格式化
import dateFormat  from '../../commonFun/timeFormat.js';
import { Dialog, Tabs, TabPane, Table, TableColumn, Input, Button, Upload, Select, Option, Checkbox, Card, Progress, Cascader, Pagination, MessageBox, Message, Form, FormItem, Carousel, CarouselItem } from 'element-ui';
export default {
	name: "upReport",
	components: {
		elDialog: Dialog,
		elTabs: Tabs,
		elTabPane: TabPane,
		elTable: Table,
		elTableColumn: TableColumn,
		elInput: Input,
		elButton: Button,
		elUpload: Upload,
		elSelect: Select,
		elOption: Option,
		elCheckbox: Checkbox,
		elCard: Card,
		elProgress: Progress,
		elCascader: Cascader,
		elPagination: Pagination,
		elForm: Form,
		elFormItem: FormItem,
		elCarousel:Carousel,
		elCarouselItem:CarouselItem
	},
	data() {
		return {
			//投放详情
			putDetail: [],
			currPutDetail: [],
			// 城市过滤
			filterCityData: [],
			// 区域过滤
			filtersArea: [],
			//搜索类型
			typeSelect: [
				{value: 1,label: '资源名称'},
				{value: 2,label: '商圈'}
			],
			//搜索框
			keyword: '',
			select: 1,
			// tab选项
			planPanel: 'first',
			//发布情况
			postDetail:[],

			//监播图片内容
			isActive1: true,
			//缩略图对话框
			dialogVisible:false,
			dialogImageUrl: '../../../static/images/testPic.png',
		}
	},
	created(){
		// 投放城市
		this.getInitData();
		//发布情况
		this.getPostDetail();
	},
	methods: {
		// 投放详情
		getInitData(){
			// 测试数据
			let tempADList = [
				{resName: "尚东3",mTitle: "尚东3东门",rID: 440104,rName: "荔湾区",address: '广东省广州市越秀区越秀公园',mediaNum:12,cType: "一般住宅",hNum: 100,hPrice: 56000,asIDs: "7",asLabs: "A",asStates: "1",tradingArea: "三里屯",fNum: 3,assetTag: "201805GZ-1324",notPush: ""},
				{resName: "帝景山庄改1",mTitle: "帝景1门",rID: 440104,rName: "越秀区",address: '广东省广州市越秀区越秀公园',mediaNum:12,cType: "高端住宅",hNum: 120,hPrice: 6100000,asIDs: "1,2",asLabs: "A,B",asStates: "1,1",tradingArea: "山泉1",fNum: 9,assetTag: "201707GZ-13161",chDay: "2013",notPush: "美容"},
				{resName: "帝景山庄改1",mTitle: "帝景2门2",rID: 440104,rName: "越秀区",address: '广东省广州市越秀区越秀公园',mediaNum:12,cType: "高端住宅",hNum: 170,hPrice: 6600000,asIDs: "4,3",asLabs: "B,A",asStates: "1,1",tradingArea: "山泉1",fNum: 12,assetTag: "201707GZ-1324",chDay: "2013",notPush: "地产"},
				{resName: "帝景山庄改1",mTitle: "帝景3门3",rID: 440104,rName: "越秀区",address: '广东省广州市越秀区越秀公园',mediaNum:12,cType: "高端住宅",hNum: 150,hPrice: 5100000,asIDs: "5,6",asLabs: "A,B",asStates: "1,1",tradingArea: "山泉1",fNum: 22,assetTag: "201707GZ-1329",chDay: "2013",notPush: "医学"},
				{resName: "帝景山庄",mTitle: "帝景门",rID: 440104,rName: "白云区",address: '广东省广州市越秀区越秀公园',mediaNum:12,cType: "别墅",hNum: 171,hPrice: 4600000,asIDs: "7,8",asLabs: "A,B",asStates: "1,1", tradingArea: "山泉",fNum: 15,assetTag: "201707GZ-1328",chDay: "2014",notPush: "医学"},
				{resName: "尚东",mTitle: "尚东一号",rID: 440104,rName: "天河区",address: '广东省广州市越秀区越秀公园',mediaNum:12,cType: "别墅",hNum: 210,hPrice: 7600000,asIDs: "9,10",asLabs: "A,B",asStates: "1,1",tradingArea: "山泉",fNum: 30,assetTag: "201707GZ-1329",chDay: "2015",notPush: "汽车"},
			];
			
			for(let temp of tempADList){
				temp.city = areaToText.toText(temp.rID).city;
			}
			this.filterCityData = filterFormat(tempADList, 'city');
			this.filtersArea = filterFormat(tempADList, 'rName');
			this.putDetail = tempADList;
			this.currPutDetail = this.putDetail;
			// 真实数据
			let uid = JSON.parse(sessionStorage.getItem('session_data')).uID;
			let info = {
				uid: uid,
				apid: 2
			};
			// uid         int【必填】     当前账户UserID
            // apid        int             公司对应方案apID
			// api.postApi('/GetADB', info).then(res => {
			// 	console.log(res.data);
			// 	if(!res.data.SysCode){
			// 		this.putDetail = res.data;
			// 	}else{
			// 		Message.warning(res.data.MSG);
			// 	}
			// }).catch(res =>{
			// 	console.log(res);
			// });
		},
		//发布情况
		getPostDetail(){
			// 测试数据
			let tmp = [
				{city:'广州',planNum:200,realNum:200,wrongNum:0,resolveNum:0},
				{city:'深圳',planNum:200,realNum:200,wrongNum:0,resolveNum:0}
			];
			this.postDetail = tmp;

			// 真实数据
			// let uid = JSON.parse(sessionStorage.getItem('session_data')).uID;
			// let info = {
			// 	uid: uid,
			// 	apid: 2
			// };
			// api.getApi('/GetADB', info).then(res=>{
			// 	console.log(res);
			// 	if(!res.data.SysCode){
			// 		this.postDetail = res.data;
			// 	}else{
			// 		Message.warning(res.data.MSG);
			// 	}
			// }).catch(res =>{
			// 	console.log(res);
			// });
		},
		// 当搜索框为空的时候进行重置显示
		initData(){
			if(!this.keyword){
				this.currPutDetail = this.putDetail;
			}
		},
		// 搜索
		search(){
			// 账号，姓名
			console.log(this.select);
			console.log(this.keyword);
			let select = this.select;
			let keyword = this.keyword;
			if(this.keyword){
				let arr = [];
				for(let data of this.putDetail){
					if(data.resName){
						if((select=='1') && data.resName.includes(keyword)){
							arr.push(data);
						}
					}
					if(data.tradingArea){
						if((select =='2') && data.tradingArea.includes(keyword)){
							arr.push(data);
						}
					}
				}
				this.currPutDetail = arr;
				return;
			}
			this.currPutDetail = this.putDetail;
		},
		// 城市转换为中文
		cityToText(rid){
			return areaToText.toText(rid).city;
		},
		// 时间格式规范
		formatTime(val){
			return dateFormat.toDate(val, '.');
		},
		// 价格加上逗号
		priceFormat(price){
			// console.log('price', price);
			return commaFormat.init(price);
		},
		filterCity(value, row) {
			return row.city === value;
		},
		filterRName(value, row) {
			return row.rName === value;
		},


		box1Change() {
			this.isActive1 = !this.isActive1;
		},
		//页码
		handleSizeChange(val) {
			console.log(`每页 ${val} 条`);
		},
		handleCurrentChange(val) {
			console.log(`当前页: ${val}`);
		},
		//缩略图
		handlePictureCardPreview(){
			this.dialogVisible = true;
		}
	},
	mounted() {
		$(function () {
			$('.tabs').find('button').click(function () {
				$(this).addClass('active').siblings().removeClass('active');
			});
			$('.picBox').mouseenter(function () {
				$(this).find('.mask-btn').show()
			}).mouseleave(function () {
				$(this).find('.mask-btn').hide()
			})
		});
	},
}
</script>

<style scoped>

  .ad_mediaMana_wrap {
    width: 100%;
    box-sizing: border-box;
    padding: 40px 60px;
    position: relative;
  }

  .mediaMana_content_top {
    padding: 28px 31px 60px;
    width: 1247px;
    box-sizing: border-box;
    background: #fff url("../../assets/images/upReportBg.png") right no-repeat;
    /*height: 100px;*/
  }

  .title {
    border-bottom: 1px solid #D8D8D8;
    margin-right: 200px;
  }

  .title h1 {
    font-size: 28px;
    margin-bottom: 8px;
    color: rgba(0, 0, 0, 0.85);
    font-weight: bold;
  }

  .title h3 {
    font-size: 20px;
    color: #333333;
    font-weight: bold;
    margin-bottom: 12px;
  }

  .detail p {
    margin-top: 12px;

  }

  .detail p em {
    font-size: 14px;
    color: #333333;
    margin-left: 24px;
  }

  .detail p em:nth-of-type(1) {
    margin-left: 0;
  }

  .detail p i {
    font-size: 14px;
    color: #2a2a2a;
    font-style: normal;
  }

  .plan-panel {
    width: 1247px;
    position: relative;
    top: -40px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  /* /deep/ .el-tabs__item {
     width: 88px;
     padding: 0;
     text-align: center;
   }

   /deep/ .el-tabs__active-bar {
     width: 88px !important;
     !*transform: translateX(88px) !important;*!
   }*/

  /deep/ .el-tabs__nav-wrap::after {
    background-color: transparent;
  }

  /deep/ .el-tabs__nav-scroll {
    padding-left: 30px;
  }

  /*投放详情*/
  .searchBtn {
    background: #1890FF;
    border-radius: 4px;
    width: 76px;
    height: 34px;
    position: relative;
    left: 16px;
    /*top: 3px;*/
    padding: 0;
  }

  .search-wrap span {
    float: left;
    margin-left: 2px;
    margin-bottom: 30px;
  }

  .first-wrap /deep/ .el-select .el-input .el-select__caret {
    position: relative;
    left: 0;
    top: 2px;
  }

  /*超出省略*/
  /deep/ .el-table .cell {
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .el-input {
    width: 300px;
    height: 34px;
  }

  /deep/ .el-table td, .el-table th {
    padding: 2px 0;
  }

  /deep/ .type-select .el-input, /deep/ .type-select .el-input__inner {
    width: 95px;
    position: relative;
    top: 2px;
    left: 10px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    padding-right: 0;
    padding-left: 10px;
    height: 34px;
  }

  .searchInput /deep/ .el-input__inner, .searchInput {
    width: 224px !important;
    position: relative;
    left: 7px;
    top: 0;
    height: 34px;
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
  }

  /deep/ .el-input__suffix {
    right: -6px;
  }

  .box-wrap {
    border: 1px solid #E6E7E9;
    background-color: #ffffff;
    width: 100%;
    box-sizing: border-box;
    border-radius: 4px;
  }

  .box-wrap > h4 {
    margin-bottom: 16px;
    height: 55px;
    padding-left: 28px;
    border-bottom: 1px solid #e6e7e9;
    font-size: 16px;
    color: rgba(51, 51, 51, 0.85);
    line-height: 55px;
    font-weight: bold;
  }

  /deep/ .el-table__column-filter-trigger {
    position: relative;
    left: 5px;
  }

  /deep/ .el-table th, .el-table tr {
    background: #F7F7F7;
    padding: 4px 0;
  }

  /deep/ .el-table th > .cell {
    color: #666666;
    line-height: 14px;
    font-weight: bold;
  }

  /deep/ .el-table__expanded-cell[class*=cell] {
    padding: 0 45px;
    background-color: #F7F7F7;;
  }

  /deep/ .el-table__expanded-cell[class*=cell] .el-form {
    height: 44px;
    line-height: 44px;
  }

  /deep/ .el-form-item__label {
    padding: 0 0 0 12px;
  }

  /deep/ .el-form-item__content {
    line-height: 46px;
  }

  /deep/ .el-table_1_column_9, /deep/ .el-table_1_column_10 {
    text-align: right !important;
  }

  /*滚动条*/
  /deep/ .el-table__body-wrapper {
    height: 450px;
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

  .el-table {
    border-radius: 4px;
  }

  .table_wrap {
    padding: 10px 29px 29px;
  }

  /deep/ .el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: #ecf5ff;
  }

  /deep/ .el-tabs__item.is-active {
    font-weight: bold;
  }

  .ad_index_footer {
    font-size: 14px;
    color: #8A8A8A;
    text-align: center;
  }

  /*地图展示*/
  .sec-wrap .map {
    width: 1246px;
    height: 527px;
    padding: 21px 29px;
  }

  /*监播图片*/
  .tabs {
    padding-left: 24px;
    margin-bottom: 12px;
    height: 34px;
  }

  .tabs button {
    width: 88px;
    height: 32px;
    outline: none;
    border: 1px solid #D9D9D9;
    border-radius: 4px 0 0 4px;
    background-color: #fff;
    cursor: pointer;
    float: left;
  }

  .tabs button + button {
    /*margin-left: 1px;*/
    border-radius: 0 4px 4px 0;
  }

  .tabs button.active {
    border: 1px solid #1890FF;
    font-weight: bold;
    color: #1890ff;
  }

  /*图片切换*/
  .typeOfRec, .typeOfPic {
    padding: 0 24px 30px;
  }

  .picBox {
    width: 220px;
    height: 326px;
    padding: 4px;
    box-sizing: border-box;
    border: 1px solid #E9E9E9;
    border-radius: 2px;
    display: inline-block;
    margin-bottom: 22px;
    position: relative;
  }

  .picBox + .picBox {
    margin-left: 19px;
  }

  .picBox img {
    width: 210px;
    height: 280px;
    margin-bottom: 4px;
    border-bottom: 1px solid #e9e9e9;
  }

  .picBox .pic-title {
    font-size: 14px;
    color: #666666;
    text-align: center;
    line-height: 4px;
  }

  /deep/ .el-carousel__button {
    width: 18px;
  }

  /deep/ .el-carousel__indicators {
    bottom: 28px;
  }

  /*发布情况*/
  .forth-wrap /deep/ .el-table th, .el-table tr {
    padding: 6px 0;
  }

  .forth-wrap /deep/ .el-table .cell {
    padding: 9px 14px;
  }

  /deep/ .el-table_2_column_13, /deep/ .el-table_2_column_14, /deep/ .el-table_2_column_15 {
    text-align: right;
  }

  .mask-btn {
    display: none;
  }

  .mask-btn .el-icon-search {
    position: absolute;
    left: 43%;
    top: 43%;
    font-size: 30px;
    color: #fff;
    cursor: pointer;
    z-index: 2;
  }

  /*页码*/
  .pager {
    position: relative;
    height: 32px;
    margin-top: 18px;
    top: -22px;
    right: 0px;
  }

  /deep/ .el-select .el-input .el-select__caret {
    position: relative;
    left: -9px;
  }

  /deep/ .el-select {
    top: -4px;
  }

  /deep/ .btn-prev {
    position: relative;
    top: -4px !important;
  }

  /deep/ .el-pagination {
    position: absolute;
    right: 0;
    top: 10px;
  }

  /deep/ .el-pagination.is-background .el-pager li {
    font-weight: normal;
    font-size: 13px;
    background-color: transparent;
  }

  /deep/ .el-pagination button, .el-pagination span:not([class*=suffix]) {
    position: relative;
    top: 0px !important;
    background-color: transparent !important;
  }

  /deep/ .el-pagination__jump {
    margin-left: 13px;
    position: relative;
    top: -4px;
  }

  /*1440*/
  @media all and (min-width: 1420px) {
    .mediaMana_content_top, .plan-panel {
      width: 1320px;
    }

    .picBox + .picBox {
      margin-left: 37px;
    }
  }

  /*1920*/
  @media all and (min-width: 1900px) {
    .mediaMana_content_top, .plan-panel {
      width: 1800px;
    }

    .picBox + .picBox[data-v-74e3f71e] {
      margin-left: 118px;
    }

    .typeOfRec[data-v-74e3f71e], .typeOfPic[data-v-74e3f71e] {
      padding: 0 103px 30px;
    }

  }
</style>
