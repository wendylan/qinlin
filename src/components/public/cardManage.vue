<template>
	<div>
		<div class="ad_index_container">
            <!-- 超级管理员 -->
            <ul class="ad_index_panel clearfix"   v-if="role=='super'">
				<li v-for="(item, index) in containData" :key="index" style="height:117px;">
					<router-link :to="{path: item.path}" class="mask" style="height:146px;"></router-link>
					<div class="panel_top">
						<div class="panel_top_icon_wrap" :class="item.classPar">
							<div class="panel_top_icon" :class="item.class">
							</div>
						</div>
						<div class="panel_top_right">
							<h1>{{item.name}}</h1>
							<span>{{item.smallOpera}}
								<i class="fa fa-angle-right fa-lg"></i>
							</span>
						</div>
					</div>
				</li>
			</ul>
            <!-- 非超级管理员 -->
			<ul class="ad_index_panel clearfix" v-else>
				<li v-for="(item, index) in containData" :key="index">
					<router-link :to="{path: item.path}" class="mask"></router-link>
					<div class="panel_top">
						<div class="panel_top_icon_wrap" :class="item.classPar">
							<div class="panel_top_icon" :class="item.class">
							</div>
						</div>
						<div class="panel_top_right">
							<h1>{{item.name}}</h1>
							<span>{{item.smallOpera}}
								<i class="fa fa-angle-right fa-lg"></i>
							</span>
						</div>
					</div>
					<div class="panel_bottom">
						<p>
							<router-link :to="{path: item.operationPath}">{{item.operationName}}</router-link>
						</p>
					</div>
				</li>
			</ul>
            
		</div>
	</div>
</template>
<script>
export default {
    props: {
        containData: {
            type: Array,
            default: function() {
                return [];
            }
        },
        role: {
            type: String,
            default: ''
        }
    },
    data() {
        return {};
    },
    methods: {}
};
</script>
<style>
/* 背景图片 */
.group {
    background: #ffd04d url("../../assets/home/group.png") no-repeat center
        center;
}
.media {
    background: #61a1f8 url("../../assets/home/media.png") no-repeat center
        center;
}
.editor {
    background: #98ed8d url("../../assets/home/editor.png") no-repeat center
        center;
}
.order {
    background: #ef818c url("../../assets/home/order.png") no-repeat center
        center;
}
.group_box {
    border: 8px solid rgba(255, 208, 77, 0.3);
    margin-left: 50px;
    margin-top: 20px;
    display: inline-block;
}
.media_box {
    border: 8px solid rgba(97, 161, 248, 0.3);
    margin-left: 50px;
    margin-top: 20px;
    display: inline-block;
}
.editor_box {
    border: 8px solid rgba(152, 237, 141, 0.3);
    margin-left: 50px;
    margin-top: 20px;
    display: inline-block;
}
.order_box {
    border: 8px solid rgba(239, 129, 140, 0.3);
    margin-left: 50px;
    margin-top: 20px;
    display: inline-block;
}

/*内容*/

.ad_index_panel {
    margin-top: 40px;
    padding-left: 61px;
}

.ad_index_panel li {
    width: 295px;
    height: 166px;
    margin-left: 21px;
    float: left;
    position: relative;
    background: #ffffff;
    box-shadow: 0 2px 8px 1px rgba(0, 0, 0, 0.08);
    border-radius: 4px;
}

.ad_index_panel li:nth-child(1) {
    margin-left: 0;
}

.ad_index_panel .mask {
    position: absolute;
    width: 100%;
    height: 118px;
    z-index: 2;
}

.panel_top {
    border-bottom: 1px solid #ececec;
    height: 117px;
}

.panel_top_icon_wrap,
.panel_top_icon {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-bottom: 29px;
    text-align: center;
}

.panel_top_right {
    display: inline-block;
    position: absolute;
    width: 200px;
    text-align: center;
    top: 31px;
    right: 0;
}

.panel_top_right h1 {
    font-family: PingFangSC-Semibold;
    font-size: 24px;
    color: #666666;
    letter-spacing: 0;
    margin-bottom: 2px;
}

.panel_top_right span {
    font-family: PingFangSC-Medium;
    font-size: 14px;
    color: #949090;
    line-height: 24px;
    position: relative;
    width: 38px;
    height: 24px;
    /* display: inline-block; */
    margin-left: -10px;
}

.panel_top_right span i {
    position: absolute;
    top: 3px;
    right: -15px;
}

.panel_bottom {
    font-family: PingFangSC-Regular;
    font-size: 12px;
    height: 50px;
    position: relative;
}

.panel_bottom p {
    width: 100%;
    height: 100%;
    z-index: 3;
}

.panel_bottom p a {
    color: #8a8a8a;
    display: inline-block;
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 50px;
}

.panel_bottom p a:hover {
    color: #108ee9;
}

/*1366*/
@media screen and (min-width: 1366px) {
    .ad_index_panel li {
        width: 295px;
        height: 166px;
        margin-left: 21px;
        float: left;
        position: relative;
        background: #ffffff;
        box-shadow: 0 2px 8px 1px rgba(0, 0, 0, 0.08);
        border-radius: 4px;
    }
}

/*1440*/
@media screen and (min-width: 1440px) {
    .ad_index_panel li {
        width: 295px;
        height: 166px;
        margin-left: 46px;
        float: left;
        position: relative;
        background: #ffffff;
        box-shadow: 0 2px 8px 1px rgba(0, 0, 0, 0.08);
        border-radius: 4px;
    }
}

/*1920*/
@media screen and (min-width: 1920px) {
    .ad_index_panel li {
        width: 295px;
        height: 166px;
        margin-left: 45px;
        float: left;
        position: relative;
        background: #ffffff;
        box-shadow: 0 2px 8px 1px rgba(0, 0, 0, 0.08);
        border-radius: 4px;
    }
}
</style>
