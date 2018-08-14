<template>
	<div id="app">
		<!--头部-->
		<div class="ad_index_header">
			<div class="logo">
				<img src="../../assets/images/logo.png" alt="">
			</div>
			<ul class="ad_index_nav">
				<li>
					<router-link :to="{path:'/adOwner'}" class="nav_fast" id="Home">首页</router-link>
				</li>
				<li>
					<router-link :to="{path:'/adOwner/ADplanDetail'}" class="nav_fast" id="planMana">方案管理</router-link>
				</li>
				<li>
					<router-link :to="{path:'/adOwner/ADorderDetail'}" class="nav_fast" id="orderMana">订单管理</router-link>
				</li>
				<li>
					<router-link :to="{path:'/adOwner/totalview'}" id="qinlinzk">亲邻知客
					</router-link>
				</li>
			</ul>
			<div class="handle clearfix">
				<el-popover placement="bottom-end" width="242" trigger="click">
					<template>
						<el-tabs v-model="activeMess" @tab-click="handleClick" class="adOwner-message">
							<el-tab-pane label="全部(15)" name="first">
								<ul class="message-list">
									<li>
										<div class="read-mask"></div>
										<router-link :to="{path:'/adOwner/planDetail'}"></router-link>
										<img src="../../assets/images/message.png" alt="">
										<div class="txt">
											<p>新世界百货二月投放方案 的用户画像申请
												<span :class="status==1?'pass':'refused'">已通过</span>
											</p>
											<p>3分钟前</p>
										</div>
									</li>
									<li>
										<img src="../../assets/images/message.png" alt="">
										<div class="txt">
											<p>新世界百货二月投放方案 的用户画像申请
												<span :class="status==1?'pass':'refused'">已通过</span>
											</p>
											<p>3分钟前</p>
										</div>
									</li>
									<li>
										<img src="../../assets/images/message.png" alt="">
										<div class="txt">
											<p>新世界百货二月投放方案 的用户画像申请
												<span :class="status==1?'pass':'refused'">被拒绝</span>
											</p>
											<p>3分钟前</p>
										</div>
									</li>
									<li>
										<img src="../../assets/images/message.png" alt="">
										<div class="txt">
											<p>新世界百货二月投放方案 的用户画像申请
												<span :class="status==1?'pass':'refused'">已通过</span>
											</p>
											<p>3分钟前</p>
										</div>
									</li>
									<li>
										<div class="read-mask"></div>
										<img src="../../assets/images/message.png" alt="">
										<div class="txt">
											<p>新世界百货二月投放方案 的用户画像申请
												<span :class="status==1?'pass':'refused'">已通过</span>
											</p>
											<p>3分钟前</p>
										</div>
									</li>
									<li>
										<img src="../../assets/images/message.png" alt="">
										<div class="txt">
											<p>新世界百货二月投放方案 的用户画像申请
												<span :class="status==1?'pass':'refused'">被拒绝</span>
											</p>
											<p>3分钟前</p>
										</div>
									</li>
								</ul>
								<div class="clear-message">
									清空消息
								</div>
							</el-tab-pane>
							<el-tab-pane label="未阅(10)" name="second">未阅</el-tab-pane>
							<el-tab-pane label="已阅(5)" name="third">已阅</el-tab-pane>
						</el-tabs>
					</template>
					<el-badge :value="8" class="item" slot="reference">
						<i class="el-icon-bell"></i>
					</el-badge>
				</el-popover>

				<a href="#" class="ad_index_user">
					<!-- <em>销售</em>  -->
					<!--<i class="uname">{{userName}}</i>-->
					<i class="uname">广告主</i>
					<img src="../../assets/images/downArr.png" alt="">
				</a>
				<div class="user_handel_list">
					<ul>
						<li>
							<a href="#" @click="openWxBox1 = true">微信授权</a>
						</li>
						<li>
							<router-link :to="{path:'/sale/changePwd'}">修改密码
							</router-link>
						</li>
						<li>
							<router-link :to="{path:'/login'}">退出登陆</router-link>
						</li>
					</ul>
				</div>
			</div>
			<!--微信授权弹框-->
			<div>
				<!--扫码授权-->
				<el-dialog title="微信授权" :visible.sync="openWxBox1" width="30%">
					<div class="wx-authority">
						<div class="wx-code-box">
							<img src="../../assets/images/code.jpg" alt="">
						</div>
						<div class="wx-authority-box">
							<p>想扫码登录平台？</p>
							<p>请使用微信扫描二维码进行授权</p>
						</div>
					</div>
				</el-dialog>
				<!--授权成功-->
				<el-dialog title="微信授权" :visible.sync="openWxBox2" width="30%">
					<div class="wx-authority">
						<div class="wx-authority-success">
							<img src="../../assets/images/createSuccess.png" alt="">
							<h2>授权成功</h2>
							<p>以后可以使用微信扫码登录平台了哦</p>
						</div>
						<div class="wx-authority-success-box">
							<el-button type="primary" round @click="openWxBox2 = false">确定</el-button>
						</div>
					</div>
				</el-dialog>
				<!--已授权-->
				<el-dialog title="微信授权" :visible.sync="openWxBox3" width="30%">
					<div class="wx-authority">
						<div class="wx-authority-success">
							<img src="../../assets/images/alreadyLock.png" alt="">
							<h2>已授权</h2>
							<p>点击立即解绑可以更换绑定微信哦</p>
						</div>
						<div class="wx-authority-success-box">
							<el-button type="danger" round @click="openWxBox4 = true;openWxBox3 = false">立即解绑</el-button>
						</div>
					</div>
				</el-dialog>
				<!--解除绑定-->
				<el-dialog title="微信授权" :visible.sync="openWxBox4" width="30%">
					<div class="wx-authority">
						<div class="wx-code-box">
							<img src="../../assets/images/code.jpg" alt="">
						</div>
						<div class="wx-authority-box">
							<p style="line-height: 40px">请使用微信扫描二维码解除绑定</p>
						</div>
					</div>
				</el-dialog>
				<!--解绑成功-->
				<el-dialog title="微信授权" :visible.sync="openWxBox5" width="30%">
					<div class="wx-authority">
						<div class="wx-authority-success">
							<img src="../../assets/images/createSuccess.png" alt="">
							<h2>解绑成功</h2>
							<p>使用新的微信账号登录请重新授权</p>
						</div>
						<div class="wx-remove-success-box">
							<el-button type="primary" round>确定</el-button>
							<el-button round>绑定新账号</el-button>
						</div>
					</div>
				</el-dialog>
			</div>
		</div>

		<router-view></router-view>

		<!--尾部-->
		<div class="ad_index_footer clearfix">
			<p><img src="../../assets/images/home_icon.png" alt="">
				<router-link to="/sale"> 回到首页</router-link>
				| Copyright &copy;2018 亲邻科技线上产品部
			</p>
		</div>

	</div>
</template>

<script>
import uTypeToText from "../../commonFun/uTypeToText.js";

export default {
    name: "images",
    data() {
        return {
            userName: "",
            showMore: false,
            //扫码授权
            openWxBox1: false,
            //授权成功
            openWxBox2: false,
            //已授权
            openWxBox3: false,
            //解除绑定
            openWxBox4: false,
            //解绑成功
            openWxBox5: false,

            //消息
            activeMess: "first"
        };
    },
    methods: {
        // 获取用户名称和角色
        getUserName() {
            let data = JSON.parse(sessionStorage.getItem("session_data"));
            let utype = data.uType;
            this.userName = uTypeToText.toText(utype) + "-" + data.realName;
            console.log(this.userName);
        },
        routerNav: function(path) {
            // this.$router.push({ path: path })
            this.$router.push(path);
        },
        //操作指引
        Notdeveloped() {
            this.$message({
                type: "warning",
                message: "该功能暂未开放",
                duration: 1500
            });
        },
        navActive() {
            //刷新保持选中导航条
            let ind = this.$route.path.lastIndexOf("/");
            let path1 = this.$route.path.substr(ind + 1);
            console.log(path1);
            switch (path1) {
                case "sale":
                    $("#Home")
                        .css({
                            color: "#fff",
                            "border-bottom": "3px solid #fff"
                        })
                        .parents()
                        .siblings()
                        .children("a")
                        .css({
                            color: "#999",
                            "border-bottom": "none"
                        });
                    break;
                case "ADplanList" || "planDetail" || "createPlan":
                    $("#planMana")
                        .css({
                            color: "#fff",
                            "border-bottom": "3px solid #fff"
                        })
                        .parents()
                        .siblings()
                        .children("a")
                        .css({
                            color: "#999",
                            "border-bottom": "none"
                        });
                    break;

                case "ADorderList" || "orderList":
                    $("#orderMana")
                        .css({
                            color: "#fff",
                            "border-bottom": "3px solid #fff"
                        })
                        .parents()
                        .siblings()
                        .children("a")
                        .css({
                            color: "#999",
                            "border-bottom": "none"
                        });
                    break;
                case "ADqinlinzk":
                    $("#qinlinzk")
                        .css({
                            color: "#fff",
                            "border-bottom": "3px solid #fff"
                        })
                        .parents()
                        .siblings()
                        .children("a")
                        .css({
                            color: "#999",
                            "border-bottom": "none"
                        });
            }
        }
    },
    mounted: function() {
        this.getUserName();
        // this.name = sessionStorage.getItem("real_name");
        $(function() {
            $(".ad_index_nav")
                .children("li")
                .click(function() {
                    $(this)
                        .children("a")
                        .css({
                            color: "#fff",
                            "border-bottom": "3px solid #fff"
                        })
                        .parents()
                        .siblings()
                        .children("a")
                        .css({
                            color: "#999",
                            "border-bottom": "none"
                        });
                });
            //修改密码
            $(".handle").hover(
                function() {
                    $(".user_handel_list").show();
                },
                function() {
                    $(".user_handel_list").hide();
                }
            );
            $(".user_handel_list")
                .find("a")
                .click(function() {
                    $(this)
                        .parents(".user_handel_list")
                        .hide();
                });
        });

        this.navActive();
    },
    watch: {
        $route: "navActive"
    }
};
</script>


<style scoped>
/*消息*/
.ad_index_header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
}

i.el-icon-bell {
    font-size: 20px !important;
    color: #ffffff;
    margin-right: 20px;
    cursor: pointer;
}

.item /deep/ .el-badge__content.is-fixed {
    right: 30px;
    width: 10px !important;
    height: 10px !important;
    line-height: 11px;
    cursor: pointer;
}

.message-list {
    height: 267px;
    overflow-x: hidden;
    overflow-y: scroll;
}
.message-list::-webkit-scrollbar {
    width: 4px;
    background: #fafafa;
}

.message-list::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #c1c1c1;
    border-radius: 4px;
}

.message-list li {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #e8e8e8;
    padding: 15px 4px;
    box-sizing: border-box;
    position: relative;
}
.message-list li .read-mask {
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.5);
    position: absolute;
    top: 0;
    left: 0;
}
.message-list li a {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
}
.message-list li img {
    width: 44px;
    height: 44px;
    margin-right: 14px;
}
.message-list li .txt {
    font-size: 14px;
    color: #525253;
}
.message-list li .txt .pass {
    color: #108ee9;
}
.message-list li .txt .refused {
    color: #ff7373;
}
.message-list li .txt p:last-child {
    font-size: 12px;
    color: rgba(0, 0, 0, 0.45);
    margin-top: 4px;
}
.clear-message {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    color: #525253;
    text-align: center;
    cursor: pointer;
}

/*绑定账号*/
.wx-authority {
    text-align: center;
}

.wx-code-box {
    display: inline-block;
    width: 200px;
    height: 200px;
    border: 1px solid #e0e0e0;
    margin-bottom: 17px;
    position: relative;
}

.wx-code-box img {
    width: 200px;
    height: 200px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
}

.wx-authority-box {
    width: 280px;
    height: 60px;
    display: inline-block;
    border-radius: 100px;
    background-color: #e8e8e8;
    line-height: 20px;
    padding: 10px;
    box-sizing: border-box;
    font-size: 14px;
    color: #303133;
}

/*授权成功*/
.wx-authority-success img {
    width: 72px;
    height: 72px;
}

.wx-authority-success h2 {
    font-size: 24px;
    color: #333333;
    margin-bottom: 8px;
    margin-top: 24px;
}

.wx-authority-success p {
    font-size: 14px;
    color: #999999;
}

.wx-authority-success-box,
.wx-remove-success-box {
    margin-top: 60px;
}

.wx-authority-success-box button {
    width: 210px;
    height: 42px;
}

/*解绑成功*/
.wx-remove-success-box button {
    width: 140px;
    height: 42px;
}

.wx-remove-success-box .el-button--default:hover {
    color: #606266;
    border-color: #dcdfe6;
    background-color: #fcfcfc;
}
</style>
<style>
.adOwner-message .el-tabs__header {
    margin-bottom: 0 !important;
}
.adOwner-message .el-badge {
    margin-right: 12px;
}
.adOwner-message .el-tabs__item {
    color: #525253;
}
.el-popper[x-placement^="bottom"] {
    padding-bottom: 0;
}
</style>
