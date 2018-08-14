<template>
	<div class="ad_mediaDetail_wrap clearfix">
		<leftbar active_number="costPreferences"></leftbar>
		<div class="right-content-wrap">
			<div class="right-title">
				<h1>消费偏好
					<i>2018/04/12-2018/09/12</i>
				</h1>
				<div class="houseAttr">
					<span>住户属性：</span>
					<span>
						<el-radio-group size="mini" v-model="houseAttr">
							<el-radio-button label="人流"></el-radio-button>
							<el-radio-button label="社区人流"></el-radio-button>
							<el-radio-button label="居民"></el-radio-button>
							<el-radio-button label="访客"></el-radio-button>
						</el-radio-group>
					</span>
				</div>
				<div class="costType">
					<span>消费分类：</span>
					<span>
						<el-radio-group size="mini" v-model="costType">
							<el-radio-button v-for="type in costOptions" :label="type" :key="type"></el-radio-button>
						</el-radio-group>
					</span>
				</div>
			</div>
			<div class="right-content">
				<!--汽车行业-->
				<div class="style1-wrap">
					<div class="box box1">
						<h1>购车阶段</h1>
						<div class="pies buyCarPie" ref="buyCarPie"></div>
					</div>
					<div class="box box2">
						<h1>汽车档次偏好</h1>
						<div class="pies carLikePie" ref="carLikePie"></div>
					</div>
					<div class="box box3">
						<div class="box3-top">
							<h1>购买二手车需求</h1>
							<div class="box3-top-content">
								<p>
									有
									<img src="../../assets/images/car1.png" alt="">
									<span>38.6% : 61.4%</span>
									<img src="../../assets/images/car2.png" alt=""> 无
								</p>
							</div>
						</div>
						<div class="box3-bottom">
							<h1>车贷需求</h1>
							<div class="box3-top-content">
								<p>
									有
									<img src="../../assets/images/car3.png" alt="">
									<span>38.6% : 61.4%</span>
									<img src="../../assets/images/car4.png" alt=""> 无
								</p>
							</div>
						</div>
					</div>
				</div>
				<!--样式2(列表) 通用零售/餐饮/电影/母婴/美妆/App分类/服饰/酒店-->
				<div class="style2-wrap" v-if="false">
					<div class="right-charts-table">
						<div class="right-charts-left-title">
							<h1>服装品牌</h1>
						</div>
						<div class="right-charts-left-list">
							<template>
								<el-table :data="HotRecData" style="width: 100%">
									<el-table-column prop="rank" label="排名" min-width="15%">
										<template slot-scope="scope">
											<span v-if="scope.row.rank == 1"><img src="../../assets/images/top1.png" alt=""></span>
											<span v-else-if="scope.row.rank == 2"><img src="../../assets/images/top2.png" alt=""></span>
											<span v-else-if="scope.row.rank == 3"><img src="../../assets/images/top3.png" alt=""></span>
											<span v-else>{{scope.row.rank}}</span>
										</template>
									</el-table-column>
									<el-table-column prop="industry" label="行业" min-width="50%">
									</el-table-column>
									<el-table-column label="占比" min-width="35%">
										<template slot-scope="scope">
											<div style="display: flex;justify-content: space-between">
												<span style="margin-right: 7px">{{scope.row.percent}}%</span>
												<el-progress :percentage="scope.row.percent" text-inside="true" color="#1890FF" style="width: 55px;line-height: 21px"></el-progress>
											</div>
										</template>
									</el-table-column>
								</el-table>
							</template>
						</div>
					</div>
					<div class="right-charts-table">
						<div class="right-charts-left-title">
							<h1>鞋子品牌</h1>
						</div>
						<div class="right-charts-left-list">
							<template>
								<el-table :data="HotRecData" style="width: 100%">
									<el-table-column prop="rank" label="排名" min-width="15%">
										<template slot-scope="scope">
											<span v-if="scope.row.rank == 1"><img src="../../assets/images/top1.png" alt=""></span>
											<span v-else-if="scope.row.rank == 2"><img src="../../assets/images/top2.png" alt=""></span>
											<span v-else-if="scope.row.rank == 3"><img src="../../assets/images/top3.png" alt=""></span>
											<span v-else>{{scope.row.rank}}</span>
										</template>
									</el-table-column>
									<el-table-column prop="industry" label="行业" min-width="50%">
									</el-table-column>
									<el-table-column label="占比" min-width="35%">
										<template slot-scope="scope">
											<div style="display: flex;justify-content: space-between">
												<span style="margin-right: 7px">{{scope.row.percent}}%</span>
												<el-progress :percentage="scope.row.percent" text-inside="true" color="#1890FF" style="width: 55px;line-height: 21px"></el-progress>
											</div>
										</template>
									</el-table-column>
								</el-table>
							</template>
						</div>
					</div>
					<div class="right-charts-table">
						<div class="right-charts-left-title">
							<h1>服饰品牌</h1>
						</div>
						<div class="right-charts-left-list">
							<template>
								<el-table :data="HotRecData" style="width: 100%">
									<el-table-column prop="rank" label="排名" min-width="15%">
										<template slot-scope="scope">
											<span v-if="scope.row.rank == 1"><img src="../../assets/images/top1.png" alt=""></span>
											<span v-else-if="scope.row.rank == 2"><img src="../../assets/images/top2.png" alt=""></span>
											<span v-else-if="scope.row.rank == 3"><img src="../../assets/images/top3.png" alt=""></span>
											<span v-else>{{scope.row.rank}}</span>
										</template>
									</el-table-column>
									<el-table-column prop="industry" label="行业" min-width="50%">
									</el-table-column>
									<el-table-column label="占比" min-width="35%">
										<template slot-scope="scope">
											<div style="display: flex;justify-content: space-between">
												<span style="margin-right: 7px">{{scope.row.percent}}%</span>
												<el-progress :percentage="scope.row.percent" text-inside="true" color="#1890FF" style="width: 55px;line-height: 21px"></el-progress>
											</div>
										</template>
									</el-table-column>
								</el-table>
							</template>
						</div>
					</div>
					<div class="right-charts-table">
						<div class="right-charts-left-title">
							<h1>箱包品牌</h1>
						</div>
						<div class="right-charts-left-list">
							<template>
								<el-table :data="HotRecData" style="width: 100%">
									<el-table-column prop="rank" label="排名" min-width="15%">
										<template slot-scope="scope">
											<span v-if="scope.row.rank == 1"><img src="../../assets/images/top1.png" alt=""></span>
											<span v-else-if="scope.row.rank == 2"><img src="../../assets/images/top2.png" alt=""></span>
											<span v-else-if="scope.row.rank == 3"><img src="../../assets/images/top3.png" alt=""></span>
											<span v-else>{{scope.row.rank}}</span>
										</template>
									</el-table-column>
									<el-table-column prop="industry" label="行业" min-width="50%">
									</el-table-column>
									<el-table-column label="占比" min-width="35%">
										<template slot-scope="scope">
											<div style="display: flex;justify-content: space-between">
												<span style="margin-right: 7px">{{scope.row.percent}}%</span>
												<el-progress :percentage="scope.row.percent" text-inside="true" color="#1890FF" style="width: 55px;line-height: 21px"></el-progress>
											</div>
										</template>
									</el-table-column>
								</el-table>
							</template>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import leftbar from "./ADqinlinzk.vue";

export default {
    name: "costPreferences",
    components: {
        leftbar
    },
    data() {
        return {
            houseAttr: "人流",
            costType: "汽车行业",
            costOptions: [
                "汽车行业",
                "电影行业",
                "餐饮行业",
                "通用零售",
                "酒店行业"
            ],
            HotRecData: [
                {
                    rank: 1,
                    industry: "万达广场(白云店)",
                    percent: "98"
                },
                {
                    rank: 2,
                    industry: "万达广场(白云店)",
                    percent: "78"
                },
                {
                    rank: 3,
                    industry: "万达广场(白云店)",
                    percent: "68"
                },
                {
                    rank: 4,
                    industry: "万达广场(白云店)",
                    percent: "58"
                },
                {
                    rank: 5,
                    industry: "万达广场(白云店)",
                    percent: "48"
                },
                {
                    rank: 6,
                    industry: "万达广场(白云店)",
                    percent: "38"
                },
                {
                    rank: 7,
                    industry: "万达广场(白云店)",
                    percent: "28"
                },
                {
                    rank: 8,
                    industry: "万达广场(白云店)",
                    percent: "18"
                },
                {
                    rank: 9,
                    industry: "万达广场(白云店)",
                    percent: "8"
                },
                {
                    rank: 10,
                    industry: "万达广场(白云店)",
                    percent: "4"
                }
            ]
        };
    },
    mounted() {
        this.buyCarPie();
        this.carLikePie();
    },
    methods: {
        buyCarPie() {
            let buyCarPie = this.$echarts.init(this.$refs.buyCarPie);
            buyCarPie.setOption({
                tooltip: {
                    trigger: "item",
                    formatter: "{b} : {c} ({d}%)"
                },

                series: [
                    {
                        name: "购车阶段",
                        color: [
                            "#F04864",
                            "#1890FF",
                            "#13C2C2 ",
                            "#2FC25B",
                            "#F0B148"
                        ],
                        type: "pie",
                        radius: ["40%", "55%"],
                        center: ["50%", "50%"],
                        label: {
                            normal: {
                                show: true,
                                formatter: function(params) {
                                    return (
                                        params.name +
                                        "\n" +
                                        "(" +
                                        params.percent +
                                        "%)"
                                    );
                                },
                                color: "#2C313C",
                                align: "center",
                                verticalAlign: "bottom"
                            },
                            emphasis: {
                                show: true
                            }
                        },

                        labelLine: {
                            normal: {
                                show: true,
                                lineStyle: {
                                    color: "#d3d3d3"
                                }
                            }
                        },
                        data: [
                            { value: 335, name: "买车调研" },
                            { value: 310, name: "试驾测评" },
                            { value: 234, name: "学车" },
                            { value: 135, name: "考驾照" },
                            { value: 548, name: "摇号" }
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: "rgba(0, 0, 0, 0.5)"
                            }
                        }
                    }
                ]
            });
            window.addEventListener("resize", function() {
                buyCarPie.resize();
            });
        },
        carLikePie() {
            let carLikePie = this.$echarts.init(this.$refs.carLikePie);
            carLikePie.setOption({
                tooltip: {
                    trigger: "item",
                    formatter: "{b} : {c} ({d}%)"
                },
                series: [
                    {
                        name: "汽车档次偏好",
                        color: ["#F04864", "#1890FF", "#13C2C2"],
                        type: "pie",
                        radius: ["40%", "55%"],
                        center: ["50%", "50%"],
                        label: {
                            normal: {
                                show: true,
                                formatter: function(params) {
                                    return (
                                        params.name +
                                        "\n" +
                                        "(" +
                                        params.percent +
                                        "%)"
                                    );
                                },
                                color: "#2C313C",
                                align: "center",
                                verticalAlign: "bottom"
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        labelLine: {
                            normal: {
                                show: true,
                                lineStyle: {
                                    color: "#d3d3d3"
                                }
                            }
                        },
                        data: [
                            { value: 335, name: "中档汽车" },
                            { value: 310, name: "低档汽车" },
                            { value: 234, name: "高档汽车" }
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: "rgba(0, 0, 0, 0.5)"
                            }
                        }
                    }
                ]
            });
            window.addEventListener("resize", function() {
                carLikePie.resize();
            });
        }
    }
};
</script>

<style scoped>
@font-face {
    font-family: DINPro-Medium;
    src: url("fonts/DINPro-Medium.otf"), url("fonts/DINPro-Medium.ttf");
}

@font-face {
    font-family: DINPro-Regular;
    src: url("fonts/DINPro-Regular.otf");
}
@font-face {
    font-family: DINCond-Bold;
    src: url("fonts/DINCond-Bold.otf");
}

.right-content-wrap {
    padding-left: 178px;
    /* padding-top: 62px; */
}

.right-content-wrap .right-title {
    height: 44px;
    width: 100%;
    background-color: #fff;
    display: flex;
    padding: 12px 36px;
    border-bottom: 1px solid #dedede;
    box-sizing: border-box;
    line-height: 18px;
}

.right-content-wrap h1 {
    font-weight: bold;
}

.right-content-wrap i {
    font-size: 12px;
    color: #a3a3a3;
    font-weight: normal;
    font-style: normal;
    margin-left: 10px;
}

.houseAttr {
    display: flex;
    margin-left: 50px;
    align-items: center;
    border-right: 1px solid #d8d8d8;
    padding-right: 20px;
}

.houseAttr span,
.costType span {
    font-size: 14px;
    color: #525151;
    float: left;
}

.costType {
    border-right: none;
    margin-left: 35px;
}

/deep/ .el-radio-button,
.el-radio-button__inner {
    width: inherit;
}

/deep/ .el-radio-button__inner {
    border: none;
}

/deep/ .el-radio-button--mini .el-radio-button__inner {
    padding: 5px 12px;
    border-left: none;
    /*color: #979797;*/
}

/deep/ .el-radio__label {
    color: #979797;
    font-size: 12px;
}

/deep/ .el-radio-button.is-checked .el-radio-button__inner {
    background-color: #ffffff;
    color: #4aa6fc;
    border: 1px solid #4aa6fc;
}

/*滚动条*/
/*/deep/ .costType .el-radio-group {*/
/*font-size: 0;*/
/*display: flex;*/
/*overflow-x: scroll;*/
/*width: 383px;*/
/*padding-bottom: 6px;*/
/*position: relative;*/
/*top: -3px;*/
/*}*/

/*/deep/ .costType .el-radio-group::-webkit-scrollbar {*/
/*width: 40px;*/
/*height: 4px;*/
/*background: #FAFAFA;*/
/*}*/

/*/deep/ .costType .el-radio-group::-webkit-scrollbar-thumb { !*滚动条里面小方块*!*/
/*-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);*/
/*background: #C1C1C1;*/
/*border-radius: 4px;*/
/*}*/

/*样式一内容*/
.style1-wrap {
    display: flex;
    justify-content: space-between;
    padding: 24px;
}

.style1-wrap .box {
    width: 33%;
    height: 400px;
    background-color: #ffffff;
    border: 1px solid #dedede;
}

.style1-wrap .box h1 {
    padding-left: 24px;
    height: 48px;
    border-bottom: 1px solid #dedede;
    line-height: 48px;
}

.style1-wrap .box.box3 {
    background-color: #f5f7fa;
    border: none;
}

.box3 > div {
    border: 1px solid #dedede;
    height: 187px;
    background-color: #ffffff;
}

.box3 .box3-top {
    margin-bottom: 24px;
}

.box3-top-content p {
    text-align: center;
    line-height: 150px;
    height: 150px;
    font-size: 14px;
    color: #2c313c;
    display: flex;
    align-items: center;
    justify-content: space-around;
}

.box3-top-content p span {
    font-size: 30px;
    color: #515151;
    font-family: DINCond-Bold;
}
.box3-top-content img:first-of-type {
    width: 54px;
    height: 44px;
}
.box3-top-content img:last-of-type {
    width: 60px;
    height: 60px;
}

.pies {
    width: 365px;
    height: 350px;
}

/*列表样式*/
.style2-wrap {
    padding: 24px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
.right-charts-table {
    width: 33%;
    margin-bottom: 24px;
    box-sizing: border-box;
    background-color: #ffffff;
    border: 1px solid #dedede;
}

.right-charts-left-title h1 {
    border-bottom: 1px solid #dedede;
    height: 48px;
    line-height: 48px;
    padding-left: 24px;
}

.right-charts-left-list {
    padding: 0 24px;
}

/deep/ .el-progress-bar__innerText {
    display: none;
}

/deep/ .el-table .cell {
    text-align: center;
}

/deep/ .el-table .cell img {
    width: 18px;
    height: 24px;
}

/*1440*/
@media all and (min-width: 1420px) {
}

/*1920*/
@media all and (min-width: 1900px) {
    .pies {
        width: 550px;
        height: 290px;
    }

    .costType .el-radio-group {
        width: 750px;
    }
}
</style>

<style>
.right-title .el-radio-button__orig-radio:checked + .el-radio-button__inner {
    color: #409eff;
    background-color: #ffffff;
    border: 1px solid #409eff;
    /*border-left: none;*/
}
.right-title .el-radio-button:first-child .el-radio-button__inner {
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    /*border-left: 1px solid #409eff;*/
}
.right-title .el-radio-button:last-child .el-radio-button__inner {
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
    border-left: 1px solid #409eff;
}
.right-title .el-radio-button + .el-radio-button .el-radio-button__inner {
    border-left: none;
}

.costType .el-radio-group {
    font-size: 0;
    display: flex;
    /*overflow-x: scroll;*/
    width: 383px;
    padding-bottom: 6px;
    position: relative;
    top: -3px;
}

.costType .el-radio-group::-webkit-scrollbar {
    width: 40px;
    height: 4px;
    background: #fafafa;
}

.costType .el-radio-group::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #c1c1c1;
    border-radius: 4px;
}
</style>
