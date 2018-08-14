<template>
	<div class="ad_mediaDetail_wrap clearfix">
		<div class="ad_mediaDetail_nav ">
			<p class="clearfix">
				<a href="#" style="color: #999">亲邻知客</a>
			</p>
		</div>
		<div class="mediaList_wrap">
			<el-card class="box-card" shadow="never">
				<div slot="header" class="clearfix">
					<span class="qlzk-title">画像申请</span>
					<div class="qlzk-title-button">
						<span style="float: left;margin-right: 37px">
							<el-button v-for="(item,index) in buttons" :key="index" :class="{active:index == num}" type="text">{{item}}</el-button>
						</span>
						<span style="float: left">
							<div class="block">
								<el-date-picker v-model="titleDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
								</el-date-picker>
							</div>
						</span>
					</div>
				</div>
				<div class="list">
					<ul>
						<li class="list-item">
							<span>
								<img src="../../assets/images/qlzk_icon.png" alt="">
							</span>
							<span style="margin-left: 16px">
								<div class="item-content">
									<p>周兆杰 对
										<span>珠江帝景地产单月投放</span>申请 尚东峰景、东华苑...等
										<i @click="houselistDialog = true">100</i>个 社区画像，费用为¥29,000</p>
									<em class="times">3分钟前</em>
								</div>
							</span>
							<span style="float: right">
								<el-button type="primary" @click="openPicDialog = true">通过</el-button>
								<el-button type="danger">拒绝</el-button>
							</span>
						</li>
						<li class="list-item">
							<span>
								<img src="../../assets/images/qlzk_icon.png" alt="">
							</span>
							<span style="margin-left: 16px">
								<div class="item-content">
									<p>周兆杰 对
										<span>珠江帝景地产单月投放</span>申请 尚东峰景、东华苑...等
										<i @click="houselistDialog = true">100</i>个 社区画像，费用为¥29,000</p>
									<em class="times">3分钟前</em>
								</div>
							</span>
							<span style="float: right">
								<el-button type="primary" @click="openPicDialog = true">通过</el-button>
								<el-button type="danger">拒绝</el-button>
							</span>
						</li>
						<li class="list-item">
							<span>
								<img src="../../assets/images/qlzk_icon.png" alt="">
							</span>
							<span style="margin-left: 16px">
								<div class="item-content">
									<p>周兆杰 对
										<span>珠江帝景地产单月投放</span>申请 尚东峰景、东华苑...等
										<i @click="houselistDialog = true">100</i>个 社区画像，费用为¥29,000</p>
									<em class="times">3分钟前</em>
								</div>
							</span>
							<span style="float: right">
								<el-button type="primary" @click="openPicDialog = true">通过</el-button>
								<el-button type="danger">拒绝</el-button>
							</span>
						</li>
						<li class="list-item">
							<span>
								<img src="../../assets/images/qlzk_icon.png" alt="">
							</span>
							<span style="margin-left: 16px">
								<div class="item-content">
									<p>周兆杰 对
										<span>珠江帝景地产单月投放</span>申请 尚东峰景、东华苑...等
										<i @click="houselistDialog = true">100</i>个 社区画像，费用为¥29,000</p>
									<em class="times">3分钟前</em>
								</div>
							</span>
							<span style="float: right">
								<el-button type="primary" @click="openPicDialog = true">通过</el-button>
								<el-button type="danger">拒绝</el-button>
							</span>
						</li>
						<li class="list-item">
							<span>
								<img src="../../assets/images/qlzk_icon.png" alt="">
							</span>
							<span style="margin-left: 16px">
								<div class="item-content">
									<p>周兆杰 对
										<span>珠江帝景地产单月投放</span>申请 尚东峰景 的社区画像，费用为¥29,000</p>
									<em class="times">3分钟前</em>
								</div>
							</span>
							<span style="float: right">
								<el-button type="danger" plain disabled>已拒绝</el-button>
							</span>
						</li>
						<li class="list-item">
							<span>
								<img src="../../assets/images/qlzk_icon.png" alt="">
							</span>
							<span style="margin-left: 16px">
								<div class="item-content">
									<p>周兆杰 对
										<span>珠江帝景地产单月投放</span>申请 尚东峰景 的社区画像，费用为¥29,000</p>
									<em class="times">3分钟前</em>
								</div>
							</span>
							<span style="float: right">
								<el-button type="primary" disabled>已通过</el-button>
							</span>
						</li>
						<li class="list-item">
							<span>
								<img src="../../assets/images/qlzk_icon.png" alt="">
							</span>
							<span style="margin-left: 16px">
								<div class="item-content">
									<p>周兆杰 对
										<span>珠江帝景地产单月投放</span>申请 尚东峰景 的社区画像，费用为¥29,000</p>
									<em class="times">3分钟前</em>
								</div>
							</span>
							<span style="float: right">
								<el-button type="primary" disabled>已通过</el-button>
							</span>
						</li>
						<li class="list-item">
							<span>
								<img src="../../assets/images/qlzk_icon.png" alt="">
							</span>
							<span style="margin-left: 16px">
								<div class="item-content">
									<p>周兆杰 对
										<span>珠江帝景地产单月投放</span>申请 尚东峰景 的社区画像，费用为¥29,000</p>
									<em class="times">3分钟前</em>
								</div>
							</span>
							<span style="float: right">
								<el-button type="primary" disabled>已通过</el-button>
							</span>
						</li>
						<li class="list-item">
							<span>
								<img src="../../assets/images/qlzk_icon.png" alt="">
							</span>
							<span style="margin-left: 16px">
								<div class="item-content">
									<p>周兆杰 对
										<span>珠江帝景地产单月投放</span>申请 尚东峰景 的社区画像，费用为¥29,000</p>
									<em class="times">3分钟前</em>
								</div>
							</span>
							<span style="float: right">
								<el-button type="primary" disabled>已通过</el-button>
							</span>
						</li>
						<li class="list-item">
							<span>
								<img src="../../assets/images/qlzk_icon.png" alt="">
							</span>
							<span style="margin-left: 16px">
								<div class="item-content">
									<p>周兆杰 对
										<span>珠江帝景地产单月投放</span>申请 尚东峰景 的社区画像，费用为¥29,000</p>
									<em class="times">3分钟前</em>
								</div>
							</span>
							<span style="float: right">
								<el-button type="primary" disabled>已通过</el-button>
							</span>
						</li>
					</ul>
					<el-dialog title="开通社区画像" :visible.sync="openPicDialog" width="30%" :before-close="handleClose">
						<p style="margin-bottom: 6px">选择消费偏好</p>
						<span>
							<el-select v-model="value1" multiple placeholder="请选择">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</span>
						<span slot="footer" class="dialog-footer">
							<el-button @click="openPicDialog = false">取 消</el-button>
							<el-button type="primary" @click="openPicDialog = false">确 定</el-button>
						</span>
					</el-dialog>
					<el-dialog title="申请开通的社区(100个)" :visible.sync="houselistDialog" width="50%" class="houselistDialog" :before-close="handleClose">
						<span>
							<ul class="houseList-wrap">
								<li v-for="o in 10" :key="o">
									<span>广州市</span>
									<span>越秀区</span>
									<span>尚东峰景雅苑</span>
									<el-tooltip class="item" effect="dark" content="2018/02/01-2018/03/01、2018/02/01-2018/03/01" placement="right-start">
										<span>2018/02/01-2018/03/01、2018/02/01-2018/03/01</span>
									</el-tooltip>

								</li>
							</ul>
							<p class="total-count">
								<i class="el-icon-info" style="margin-right: 2px;color: #999"></i>总计：
								<span>￥299.00</span>
							</p>
						</span>

					</el-dialog>
				</div>
			</el-card>
		</div>
	</div>
</template>

<script>
export default {
    name: "qinlinzk",
    data() {
        return {
            num: 0,
            buttons: ["全部", "待审核", "已通过", "已拒绝"],
            titleDate: "",
            //开通社区画像
            options: [
                {
                    value: "选项1",
                    label: "通用零售"
                },
                {
                    value: "选项2",
                    label: "APP分类"
                },
                {
                    value: "选项3",
                    label: "APP安装量"
                },
                {
                    value: "选项4",
                    label: "龙须面"
                },
                {
                    value: "选项5",
                    label: "北京烤鸭"
                }
            ],
            value1: [],
            houselistDialog: false,
            openPicDialog: false
        };
    },
    methods: {
        //开通社区画像
        openPic() {}
    }
};
</script>

<style scoped>
/*面包屑导航*/
.ad_mediaDetail_wrap {
    position: relative;
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
    height: 581px;
    background: #ffffff;
    border: 1px solid #e6e7e9;
    border-radius: 4px;
    margin: 0 auto;
}

/deep/ .el-card {
    border: none;
}

/deep/ .el-card__header {
    padding: 9px 20px;
    line-height: 32px;
}

/deep/ .el-card__header span:first-child {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.65);
    font-weight: normal;
}

/deep/ .el-card__body {
    padding: 0 20px 20px 20px;
    height: 466px;
    overflow-y: scroll;
}

/deep/ .el-card__body::-webkit-scrollbar {
    width: 4px;
    background: #ffffff;
}

/*定义滑块 内阴影+圆角*/
/deep/ .el-card__body::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background: #c1c1c1;
}

.qlzk-title {
    font-size: 16px;
    color: rgba(0, 0, 0, 0.85);
    font-weight: bold;
}

.qlzk-title-button {
    float: right;
    line-height: 32px;
}

.qlzk-title-button button {
    padding: 3px 0;
    color: rgba(0, 0, 0, 0.65);
}

.qlzk-title-button /deep/ .el-button + .el-button {
    margin-left: 24px;
}

.qlzk-title-button button.active span {
    color: #1890ff !important;
}

.qlzk-title-button /deep/ .el-range-editor.el-input__inner {
    width: 256px;
    height: 32px;
    line-height: 32px;
    color: rgba(0, 0, 0, 0.65);
}

.qlzk-title-button /deep/ .el-date-editor .el-range-separator {
    line-height: 26px;
    font-size: 14px;
}

.qlzk-title-button /deep/ .el-date-editor .el-range__icon {
    line-height: 26px;
}

.list .list-item img {
    width: 32px;
    height: 32px;
}

.list .list-item {
    border-bottom: 1px solid #e8e8e8;
    height: 79px;
    padding-top: 16px;
    box-sizing: border-box;
}

.list .list-item > span {
    float: left;
}

.list .list-item .item-content p {
    margin-bottom: 4px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.65);
}

.list .list-item em {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
}

.list .list-item .item-content span {
    color: #108ee9;
}

.list .list-item .item-content i {
    color: #108ee9;
    text-decoration: underline;
    font-style: normal;
    cursor: pointer;
}

.list .list-item button {
    width: 74px;
    height: 32px;
    line-height: 8px;
}

.list .list-item /deep/ button.is-disabled span {
    position: relative;
    left: -4px;
}

/*开通社区群像*/
/deep/ .el-dialog .el-select .el-input__inner {
    width: 392px;
}

/*申请开通的社区*/
.houselistDialog /deep/ .el-dialog__body {
    padding: 10px 20px 30px;
}

.houseList-wrap {
    border: 1px solid #c2c2c2;
    border-radius: 4px;
}

.houseList-wrap li {
    display: flex;
    height: 43px;
    align-items: center;
    border-bottom: 1px solid #e9e9e9;
    justify-content: space-around;
    font-size: 14px;
    color: #666666;
}

.houseList-wrap li span:last-child {
    width: 180px;
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.total-count {
    text-align: right;
}

.total-count span {
    font-size: 24px;
    color: #353130;
}

/*滚动条*/
/deep/ .houseList-wrap {
    height: 300px;
    overflow-y: scroll;
    overflow-x: hidden;
    margin-bottom: 20px;
}

/deep/ .houseList-wrap::-webkit-scrollbar {
    width: 4px;
    background: #fafafa;
}

/deep/ .houseList-wrap::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #c1c1c1;
    border-radius: 4px;
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
