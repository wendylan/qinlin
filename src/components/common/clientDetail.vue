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
						<li><em>联系人：</em>{{userInfo.realName}}</li>
						<li><em>邮箱：</em>{{userInfo.email}}</li>
						<li><em>手机号码：</em>{{userInfo.phone }}</li>
						<li><em>职位：</em>{{userInfo.position }}</li>
						<li><em>固定电话：</em>{{userInfo.telephone }}</li>
						<li><em>所在地：</em>{{userInfo.rName }}</li>
						<li><em>事业部：</em>{{userInfo.division}}</li>
						<li><em>所有人：</em>{{userInfo.puName}}</li>
					</ul>
				</div>
				<div class="companyInfo">
					<h4>公司信息</h4>
					<div class="infobox">
						<ul>
							<li><em>公司名称：</em>{{companyInfo.cName}}</li>
							<li><em>公司地址：</em>{{companyInfo.cAddress}}</li>
							<li><em>公司品牌：</em>{{companyInfo.cBrand}}</li>
							<li><em>所在城市：</em>{{companyInfo.rName}}</li>
						</ul>
						<div class="remarkBox">
							<p>
								<em>备注：</em>{{companyInfo.cRemark}}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="content_bottom_btn">
			<el-button type="primary">编辑</el-button>
			<el-button @click="goBack">返回</el-button>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
export default {
	name: "clientDetail",
	data() {
		return {
			userInfo: {},
			companyInfo: {},
		}
	},
	created(){
		this.getInitData();
	},
	methods: {
		// 返回
		goBack(){
			this.$router.push('./clientList');
		},
		getInitData(){
			let initdata = JSON.parse(sessionStorage.getItem('data'));
			this.userInfo = initdata;
			axios({
				method: 'get',
				baseURL: '/api',
				url: '/GetCompanyInfo',
				params:{
					cid: initdata.uWho,
					uid: initdata.uID
				}
			}).then(res => {
				console.log(res.data);
				this.companyInfo = res.data;
			}).catch(res => {
				console.log(res);
			});
		},
	},
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
		height: 130px;
	}

	.clientInfo, .companyInfo{
		clear: both;
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
		margin-top: 30px;
		text-align: center;
	}

	.content_bottom_btn button{
		margin: 20px;
	}

/*1440*/
@media screen and (min-width: 1440px) {
	.ad_mediaInfo,.ad_ad{
		width: 1320px;
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
}

</style>


