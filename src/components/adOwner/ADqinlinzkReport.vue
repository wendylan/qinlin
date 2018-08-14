<template>
	<div class="ad_mediaDetail_wrap clearfix">
		<div class="ad_mediaDetail_nav ">
			<p class="clearfix">
				<a href="#" style="color: #999">亲邻知客</a>
			</p>
		</div>
		<div class="mediaList_wrap">
			<div class="banner">
				<div class="banner-txt">
					<h1>亲邻知客</h1>
					<p>可视化数据报告提供全面人流管理，包含人流趋势、停留时段、人群特征与偏好等多维筛选分析， 基于地理位置数据，可视化呈现商圈人群分布
					</p>
				</div>
				<div class="banner-img">
					<img src="../../assets/images/qlzk_banner.png" alt="">
				</div>
			</div>
			<div class="tabs">
				<el-tabs v-model="activeName" @tab-click="handleClick">
					<el-tab-pane label="全部报告" name="first">
						<div class="cards">
							<el-card class="box-card" shadow="hover">
								<div class="text item">
									<router-link :to="{path:'/adOwner/ADqinlinzk'}">
									</router-link>
									<div class="card-top">
										<div class="card-top-title">
											<img src="../../assets/images/qlzk_icon.png" alt="">
											<h3>新世界百货二月广州投放方案</h3>
										</div>
										<div class="card-top-data">
											<ul>
												<li style="font-size: 12px">开通社区</li>
												<li>27
													<span style="font-size: 14px">个</span>
												</li>
											</ul>
											<ul>
												<li style="font-size: 12px">总人流量</li>
												<li style="color: rgba(0,0,0,0.65);">24,345</li>
											</ul>
										</div>
									</div>
									<div class="card-bottom">
										<p v-if="status=='已通过'">状态：
											<span class="green">已通过</span>
										</p>
										<p v-if="status=='审核中'">状态：
											<span class="blue">审核中</span>
										</p>
										<p v-if="status=='已拒绝'">状态：
											<span class="red">已拒绝</span>
										</p>
										<p>2018.07.08 13:45:21</p>
									</div>
								</div>
							</el-card>
							<el-card class="box-card" shadow="hover">
								<div class="text item">
									<router-link :to="{path:'/adOwner/ADqinlinzk'}">
									</router-link>
									<div class="card-top">
										<div class="card-top-title">
											<img src="../../assets/images/qlzk_icon.png" alt="">
											<h3>新世界百货二月广州投放方案</h3>
										</div>
										<div class="card-top-data">
											<ul>
												<li style="font-size: 12px">开通社区</li>
												<li>27
													<span style="font-size: 14px">个</span>
												</li>
											</ul>
											<ul>
												<li style="font-size: 12px">总人流量</li>
												<li style="color: rgba(0,0,0,0.65);">24,345</li>
											</ul>
										</div>
									</div>
									<div class="card-bottom">
										<p v-if="status=='已通过'">状态：
											<span class="green">已通过</span>
										</p>
										<p v-if="status=='审核中'">状态：
											<span class="blue">审核中</span>
										</p>
										<p v-if="status=='已拒绝'">状态：
											<span class="red">已拒绝</span>
										</p>
										<p>2018.07.08 13:45:21</p>
									</div>
								</div>
							</el-card>
							<el-card class="box-card" shadow="hover">
								<div class="text item">
									<router-link :to="{path:'/adOwner/ADqinlinzk'}">
									</router-link>
									<div class="card-top">
										<div class="card-top-title">
											<img src="../../assets/images/qlzk_icon.png" alt="">
											<h3>新世界百货二月广州投放方案</h3>
										</div>
										<div class="card-top-data">
											<ul>
												<li style="font-size: 12px">开通社区</li>
												<li>27
													<span style="font-size: 14px">个</span>
												</li>
											</ul>
											<ul>
												<li style="font-size: 12px">总人流量</li>
												<li style="color: rgba(0,0,0,0.65);">24,345</li>
											</ul>
										</div>
									</div>
									<div class="card-bottom">
										<p v-if="status=='已通过'">状态：
											<span class="green">已通过</span>
										</p>
										<p v-if="status=='审核中'">状态：
											<span class="blue">审核中</span>
										</p>
										<p v-if="status=='已拒绝'">状态：
											<span class="red">已拒绝</span>
										</p>
										<p>2018.07.08 13:45:21</p>
									</div>
								</div>
							</el-card>
							<el-card class="box-card" shadow="hover">
								<div class="text item">
									<router-link :to="{path:'/adOwner/ADqinlinzk'}">
									</router-link>
									<div class="card-top">
										<div class="card-top-title">
											<img src="../../assets/images/qlzk_icon.png" alt="">
											<h3>新世界百货二月广州投放方案</h3>
										</div>
										<div class="card-top-data">
											<ul>
												<li style="font-size: 12px">开通社区</li>
												<li>27
													<span style="font-size: 14px">个</span>
												</li>
											</ul>
											<ul>
												<li style="font-size: 12px">总人流量</li>
												<li style="color: rgba(0,0,0,0.65);">24,345</li>
											</ul>
										</div>
									</div>
									<div class="card-bottom">
										<p v-if="status=='已通过'">状态：
											<span class="green">已通过</span>
										</p>
										<p v-if="status=='审核中'">状态：
											<span class="blue">审核中</span>
										</p>
										<p v-if="status=='已拒绝'">状态：
											<span class="red">已拒绝</span>
										</p>
										<p>2018.07.08 13:45:21</p>
									</div>
								</div>
							</el-card>
							<el-card class="box-card" shadow="hover">
								<div class="text item">
									<router-link :to="{path:'/adOwner/ADqinlinzk'}">
									</router-link>
									<div class="card-top">
										<div class="card-top-title">
											<img src="../../assets/images/qlzk_icon.png" alt="">
											<h3>新世界百货二月广州投放方案</h3>
										</div>
										<div class="card-top-data">
											<ul>
												<li style="font-size: 12px">开通社区</li>
												<li>27
													<span style="font-size: 14px">个</span>
												</li>
											</ul>
											<ul>
												<li style="font-size: 12px">总人流量</li>
												<li style="color: rgba(0,0,0,0.65);">24,345</li>
											</ul>
										</div>
									</div>
									<div class="card-bottom">
										<p>状态：
											<span :class="state">已通过</span>
										</p>
										<p>2018.07.08 13:45:21</p>
									</div>
								</div>
							</el-card>
							<el-card class="box-card" shadow="hover">
								<div class="text item">
									<router-link :to="{path:'/adOwner/ADqinlinzk'}">
									</router-link>
									<div class="card-top">
										<div class="card-top-title">
											<img src="../../assets/images/qlzk_icon.png" alt="">
											<h3>新世界百货二月广州投放方案</h3>
										</div>
										<div class="card-top-data">
											<ul>
												<li style="font-size: 12px">开通社区</li>
												<li>27
													<span style="font-size: 14px">个</span>
												</li>
											</ul>
											<ul>
												<li style="font-size: 12px">总人流量</li>
												<li style="color: rgba(0,0,0,0.65);">24,345</li>
											</ul>
										</div>
									</div>
									<div class="card-bottom">
										<p>状态：
											<span :class="state">已通过</span>
										</p>
										<p>2018.07.08 13:45:21</p>
									</div>
								</div>
							</el-card>
							<el-card class="box-card" shadow="hover">
								<div class="text item">
									<router-link :to="{path:'/adOwner/ADqinlinzk'}">
									</router-link>
									<div class="card-top">
										<div class="card-top-title">
											<img src="../../assets/images/qlzk_icon.png" alt="">
											<h3>新世界百货二月广州投放方案</h3>
										</div>
										<div class="card-top-data">
											<ul>
												<li style="font-size: 12px">开通社区</li>
												<li>27
													<span style="font-size: 14px">个</span>
												</li>
											</ul>
											<ul>
												<li style="font-size: 12px">总人流量</li>
												<li style="color: rgba(0,0,0,0.65);">24,345</li>
											</ul>
										</div>
									</div>
									<div class="card-bottom">
										<p>状态：
											<span :class="state">已通过</span>
										</p>
										<p>2018.07.08 13:45:21</p>
									</div>
								</div>
							</el-card>
							<el-card class="box-card" shadow="hover">
								<div class="text item">
									<router-link :to="{path:'/adOwner/ADqinlinzk'}">
									</router-link>
									<div class="card-top">
										<div class="card-top-title">
											<img src="../../assets/images/qlzk_icon.png" alt="">
											<h3>新世界百货二月广州投放方案</h3>
										</div>
										<div class="card-top-data">
											<ul>
												<li style="font-size: 12px">开通社区</li>
												<li>27
													<span style="font-size: 14px">个</span>
												</li>
											</ul>
											<ul>
												<li style="font-size: 12px">总人流量</li>
												<li style="color: rgba(0,0,0,0.65);">24,345</li>
											</ul>
										</div>
									</div>
									<div class="card-bottom">
										<p>状态：
											<span :class="state">已通过</span>
										</p>
										<p>2018.07.08 13:45:21</p>
									</div>
								</div>
							</el-card>
						</div>
					</el-tab-pane>
					<el-tab-pane label="已通过" name="second">已通过</el-tab-pane>
					<el-tab-pane label="待审核" name="third">待审核</el-tab-pane>
					<el-tab-pane label="被拒绝" name="fourth">被拒绝</el-tab-pane>
				</el-tabs>
			</div>
		</div>
	</div>
</template>

<script>
export default {
    name: "ADqinlinzkReport",
    data() {
        return {
            activeName: "first",
            status: "已通过"
        };
    },
    created() {
        console.log("this is a test");
    },
    methods: {
        handleClick() {
            console.log(this.activeName);
        }
        //开通社区画像
    }
};
</script>

<style scoped>
/*面包屑导航*/
.ad_mediaDetail_wrap {
    position: relative;
    padding-top: 60px;
}

.ad_mediaDetail_nav p {
    padding-left: 65px;
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

.mediaList_wrap {
    width: 90%;
    /*height: 581px;*/
    border-radius: 4px;
    margin: 0 auto;
}

/*内容*/
.banner {
    display: flex;
    justify-content: space-between;
    padding: 27px 70px 47px 27px;
    background: #ffffff;
    border: 1px solid #e6e7e9;
}
.banner-txt {
    width: 55%;
}
.banner-txt h1 {
    font-size: 20px;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.85);
    margin-bottom: 16px;
}
.banner-txt p {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.65);
}

/*tabs*/
.tabs {
    position: relative;
    top: -41px;
}
.tabs /deep/ .el-tabs__header {
    padding-left: 44px;
}
.tabs /deep/ .el-tabs__nav-wrap::after {
    height: 0;
}
.cards {
    display: flex;
    justify-content: space-between;

    flex-wrap: wrap;
}
.cards .box-card {
    width: 294px;
    height: 174px;
    margin-bottom: 25px;
}
.box-card .card-top {
    border-bottom: 1px solid #e8e8e8;
    padding: 20px 20px 16px 20px;
}
.box-card .card-top-title {
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.box-card .card-top-title img {
    width: 32px;
    height: 32px;
}
.box-card .card-top-title h3 {
    font-size: 16px;
    color: #000000;
    font-weight: bold;
}
/deep/ .el-card__body {
    padding: 0;
}

.box-card .card-top-data {
    display: flex;
    justify-content: space-around;
    margin-top: 12px;
}
.box-card .card-top-data li:last-child {
    font-size: 24px;
    color: #000000;
    margin-top: 4px;
}
.card-bottom {
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 12px;
    height: 40px;
    color: #9b9b9b;
}
.card-bottom .green {
    color: #30bb5a;
}
.card-bottom .blue {
    color: #2a98fe;
}
.card-bottom .red {
    color: #ff7373;
}

/*1440*/
@media all and (min-width: 1420px) {
    .ad_mediaDetail_nav p {
        padding-left: 70px;
    }
}

/*1920*/
@media all and (min-width: 1900px) {
    .ad_mediaDetail_nav p {
        padding-left: 95px;
    }
}
</style>
