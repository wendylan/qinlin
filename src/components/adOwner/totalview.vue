<template>
	<div class="ad_mediaDetail_wrap clearfix">
		<leftbar></leftbar>
		<div class="right-content-wrap">
			<div class="right-title">
				<h1>整体概览</h1>
			</div>
			<div class="right-data">
				<ul class="right-data-wrap">
					<li>
						<span>人流量</span>
						<p>262,132</p>
					</li>
					<li>
						<span>社区人流</span>
						<p>262,132</p>
					</li>
					<li>
						<span>社区人流占比</span>
						<p>47.85%</p>
					</li>
					<li>
						<span>居民</span>
						<p>70%</p>
					</li>
					<li>
						<span>访客</span>
						<p>30%</p>
					</li>
					<li>
						<span>平均停留时长</span>
						<p>3:37</p>
					</li>
				</ul>
			</div>
			<div class="right-charts">
				<div class="right-charts-left">
					<div class="right-charts-left-title">
						<h1>商圈覆盖</h1>
					</div>
					<div class="right-charts-left-echarts">
						<div style="display: flex;align-items: center">
							<div>
								<span style="color: #525151;">住户属性：</span>
								<span>
									<el-checkbox-group size="mini" v-model="houseAttr">
										<el-checkbox-button label="人流"></el-checkbox-button>
										<el-checkbox-button label="社区人流"></el-checkbox-button>
										<el-checkbox-button label="居民"></el-checkbox-button>
										<el-checkbox-button label="访客"></el-checkbox-button>
									</el-checkbox-group>
								</span>
							</div>
							<div>
								<span style="color: #525151; margin-left: 15px">性别：</span>
								<span>
									<el-checkbox-group size="mini" v-model="sexCheck">
										<el-checkbox label="男"></el-checkbox>
										<el-checkbox label="女"></el-checkbox>
									</el-checkbox-group>
								</span>
							</div>
							<div>
								<span style="color: #525151; margin-left: 25px">来源类型：</span>
								<span>
									<el-checkbox-group size="mini" v-model="sourceCheck">
										<el-checkbox label="居住地"></el-checkbox>
										<el-checkbox label="办公地"></el-checkbox>
									</el-checkbox-group>
								</span>
							</div>
						</div>
						<div style="margin-top: 10px">
							<span>年龄：</span>
							<el-checkbox-group size="mini" v-model="ageCheck">
								<el-checkbox label="18岁以下"></el-checkbox>
								<el-checkbox label="18-24岁"></el-checkbox>
								<el-checkbox label="25-34岁"></el-checkbox>
								<el-checkbox label="35-44岁"></el-checkbox>
								<el-checkbox label="45-54岁"></el-checkbox>
								<el-checkbox label="55-64岁"></el-checkbox>
								<el-checkbox label="≥65岁"></el-checkbox>
							</el-checkbox-group>
						</div>
						<div>
							<!--<div class="charts" id="areaMap" ref="areaMap"></div>-->
							<div class="charts">
								<img src="../../assets/images/ppp.png" alt="">
							</div>
						</div>
					</div>
				</div>
				<div class="right-charts-table">
					<div class="right-charts-left-title">
						<h1>热门来源</h1>
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
								<el-table-column prop="industry" label="热门来源" min-width="50%">
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
</template>

<script>
import leftbar from "./ADqinlinzk.vue";

export default {
    name: "totalview",
    components: {
        leftbar
    },
    data() {
        return {
            houseAttr: ["人流"],
            sexCheck: ["男"],
            sourceCheck: ["居住地"],
            ageCheck: [
                "18岁以下",
                "18-24岁",
                "25-34岁",
                "35-44岁",
                "45-54岁",
                "55-64岁",
                "≥65岁"
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
        this.areaMap();
        // this.setGradient()
    },
    methods: {
        areaMap() {
            let map = new BMap.Map("areaMap"); // 创建地图实例
            let point = new BMap.Point(116.418261, 39.921984);
            map.centerAndZoom(point, 15); // 初始化地图，设置中心点坐标和地图级别
            map.enableScrollWheelZoom(); // 允许滚轮缩放

            let points = [
                { lng: 116.418261, lat: 39.921984, count: 50 },
                { lng: 116.423332, lat: 39.916532, count: 51 },
                { lng: 116.419787, lat: 39.930658, count: 15 },
                { lng: 116.418455, lat: 39.920921, count: 40 },
                { lng: 116.418843, lat: 39.915516, count: 100 },
                { lng: 116.42546, lat: 39.918503, count: 6 },
                { lng: 116.423289, lat: 39.919989, count: 18 },
                { lng: 116.418162, lat: 39.915051, count: 80 },
                { lng: 116.422039, lat: 39.91782, count: 11 },
                { lng: 116.41387, lat: 39.917253, count: 7 },
                { lng: 116.41773, lat: 39.919426, count: 42 },
                { lng: 116.421107, lat: 39.916445, count: 4 },
                { lng: 116.417521, lat: 39.917943, count: 27 },
                { lng: 116.419812, lat: 39.920836, count: 23 },
                { lng: 116.420682, lat: 39.91463, count: 60 },
                { lng: 116.415424, lat: 39.924675, count: 8 },
                { lng: 116.419242, lat: 39.914509, count: 15 },
                { lng: 116.422766, lat: 39.921408, count: 25 },
                { lng: 116.421674, lat: 39.924396, count: 21 },
                { lng: 116.427268, lat: 39.92267, count: 1 },
                { lng: 116.417721, lat: 39.920034, count: 51 },
                { lng: 116.412456, lat: 39.92667, count: 7 },
                { lng: 116.420432, lat: 39.919114, count: 11 },
                { lng: 116.425013, lat: 39.921611, count: 35 },
                { lng: 116.418733, lat: 39.931037, count: 22 },
                { lng: 116.419336, lat: 39.931134, count: 4 },
                { lng: 116.413557, lat: 39.923254, count: 5 },
                { lng: 116.418367, lat: 39.92943, count: 3 },
                { lng: 116.424312, lat: 39.919621, count: 100 },
                { lng: 116.423874, lat: 39.919447, count: 87 },
                { lng: 116.424225, lat: 39.923091, count: 32 },
                { lng: 116.417801, lat: 39.921854, count: 44 },
                { lng: 116.417129, lat: 39.928227, count: 21 },
                { lng: 116.426426, lat: 39.922286, count: 80 },
                { lng: 116.421597, lat: 39.91948, count: 32 },
                { lng: 116.423895, lat: 39.920787, count: 26 },
                { lng: 116.423563, lat: 39.921197, count: 17 },
                { lng: 116.417982, lat: 39.922547, count: 17 },
                { lng: 116.426126, lat: 39.921938, count: 25 },
                { lng: 116.42326, lat: 39.915782, count: 100 },
                { lng: 116.419239, lat: 39.916759, count: 39 },
                { lng: 116.417185, lat: 39.929123, count: 11 },
                { lng: 116.417237, lat: 39.927518, count: 9 },
                { lng: 116.417784, lat: 39.915754, count: 47 },
                { lng: 116.420193, lat: 39.917061, count: 52 },
                { lng: 116.422735, lat: 39.915619, count: 100 },
                { lng: 116.418495, lat: 39.915958, count: 46 },
                { lng: 116.416292, lat: 39.931166, count: 9 },
                { lng: 116.419916, lat: 39.924055, count: 8 },
                { lng: 116.42189, lat: 39.921308, count: 11 },
                { lng: 116.413765, lat: 39.929376, count: 3 },
                { lng: 116.418232, lat: 39.920348, count: 50 },
                { lng: 116.417554, lat: 39.930511, count: 15 },
                { lng: 116.418568, lat: 39.918161, count: 23 },
                { lng: 116.413461, lat: 39.926306, count: 3 },
                { lng: 116.42232, lat: 39.92161, count: 13 },
                { lng: 116.4174, lat: 39.928616, count: 6 },
                { lng: 116.424679, lat: 39.915499, count: 21 },
                { lng: 116.42171, lat: 39.915738, count: 29 },
                { lng: 116.417836, lat: 39.916998, count: 99 },
                { lng: 116.420755, lat: 39.928001, count: 10 },
                { lng: 116.414077, lat: 39.930655, count: 14 },
                { lng: 116.426092, lat: 39.922995, count: 16 },
                { lng: 116.41535, lat: 39.931054, count: 15 },
                { lng: 116.413022, lat: 39.921895, count: 13 },
                { lng: 116.415551, lat: 39.913373, count: 17 },
                { lng: 116.421191, lat: 39.926572, count: 1 },
                { lng: 116.419612, lat: 39.917119, count: 9 },
                { lng: 116.418237, lat: 39.921337, count: 54 },
                { lng: 116.423776, lat: 39.921919, count: 26 },
                { lng: 116.417694, lat: 39.92536, count: 17 },
                { lng: 116.415377, lat: 39.914137, count: 19 },
                { lng: 116.417434, lat: 39.914394, count: 43 },
                { lng: 116.42588, lat: 39.922622, count: 27 },
                { lng: 116.418345, lat: 39.919467, count: 8 },
                { lng: 116.426883, lat: 39.917171, count: 3 },
                { lng: 116.423877, lat: 39.916659, count: 34 },
                { lng: 116.415712, lat: 39.915613, count: 14 },
                { lng: 116.419869, lat: 39.931416, count: 12 },
                { lng: 116.416956, lat: 39.925377, count: 11 },
                { lng: 116.42066, lat: 39.925017, count: 38 },
                { lng: 116.416244, lat: 39.920215, count: 91 },
                { lng: 116.41929, lat: 39.915908, count: 54 },
                { lng: 116.422116, lat: 39.919658, count: 21 },
                { lng: 116.4183, lat: 39.925015, count: 15 },
                { lng: 116.421969, lat: 39.913527, count: 3 },
                { lng: 116.422936, lat: 39.921854, count: 24 },
                { lng: 116.41905, lat: 39.929217, count: 12 },
                { lng: 116.424579, lat: 39.914987, count: 57 },
                { lng: 116.42076, lat: 39.915251, count: 70 },
                { lng: 116.425867, lat: 39.918989, count: 8 }
            ];

            if (!this.isSupportCanvas()) {
                alert(
                    "热力图目前只支持有canvas支持的浏览器,您所使用的浏览器不能使用热力图功能~"
                );
            }
            let heatmapOverlay = new BMapLib.HeatmapOverlay({ radius: 15 });
            map.addOverlay(heatmapOverlay);
            heatmapOverlay.setDataSet({ data: points, max: 100 });
        },
        setGradient() {
            /*格式如下所示:
         {
               0:'rgb(102, 255, 0)',
               .5:'rgb(255, 170, 0)',
               1:'rgb(255, 0, 0)'
         }*/
            var gradient = {};
            var colors = ["blue", "blue", "green", "yellow", "red"];
            colors.forEach(function(ele) {
                gradient[ele.getAttribute("data-key")] = ele.value;
            });
            heatmapOverlay.setOptions({ gradient: gradient });
        },
        //判断浏览区是否支持canvas
        isSupportCanvas() {
            var elem = document.createElement("canvas");
            return !!(elem.getContext && elem.getContext("2d"));
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

.right-content-wrap {
    padding-left: 178px;
    /*padding-top: 62px;*/
}

.right-content-wrap .right-title {
    height: 44px;
    width: 100%;
    background-color: #fff;
    border-bottom: 1px solid #dedede;
}

.right-content-wrap h1 {
    height: 44px;
    line-height: 44px;
    font-weight: bold;
    padding-left: 24px;
}

.right-data {
    width: 100%;
    margin-top: 24px;
    padding: 0 24px;
    box-sizing: border-box;
}

.right-data .right-data-wrap {
    display: flex;
    justify-content: space-around;
    background-color: #ffffff;
    border: 1px solid #dedede;
    padding: 27px 0 27px 20px;
}

.right-data .right-data-wrap li {
    border-right: 1px solid #e8e8e8;
    /*padding-right: 70px;*/
    width: 16.6%;
    padding-left: 20px;
    box-sizing: border-box;
}

.right-data .right-data-wrap li:last-child {
    border-right: none;
}

.right-data .right-data-wrap li span {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
}

.right-data .right-data-wrap li p {
    margin-top: 10px;
    font-family: DINPro-Medium;
    font-size: 26px;
    color: rgba(0, 0, 0, 0.85);
}

.charts {
    width: 665px;
    height: 428px;
    margin-top: 20px;
}
.charts img {
    width: 665px;
    height: 428px;
}

.right-charts {
    width: 100%;
    margin-top: 24px;
    padding: 0 24px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
}

.right-charts-left {
    width: 65%;
    box-sizing: border-box;
    background-color: #ffffff;
    border: 1px solid #dedede;
}

.right-charts-left-title h1 {
    border-bottom: 1px solid #dedede;
}

.right-charts-left-echarts {
    padding: 12px 24px;
}

.right-charts-left-echarts span {
    font-size: 14px;
    color: #525151;
    float: left;
}

/*热门来源*/
.right-charts-table {
    width: 34%;
    /*padding: 0 24px;*/
    box-sizing: border-box;
    background-color: #ffffff;
    border: 1px solid #dedede;
}

.right-charts-left-title h1 {
    border-bottom: 1px solid #dedede;
}

.right-charts-left-list {
    padding: 0 24px;
}

/*1440*/
@media all and (min-width: 1420px) {
    .charts {
        width: 748px;
    }
}
/*1920*/
@media all and (min-width: 1900px) {
    .charts {
        width: 1038px;
    }
}
</style>
<style>
.right-charts-left-echarts .el-checkbox-button,
.el-checkbox-button__inner {
    width: inherit;
}

.right-charts-left-echarts .el-checkbox-button__inner {
    border: none;
}

.right-charts-left-echarts
    .el-checkbox-button--mini
    .el-checkbox-button__inner {
    padding: 5px 12px;
    color: #979797;
}

.right-charts-left-echarts .el-checkbox__label {
    color: #979797;
    font-size: 12px;
}

.right-charts-left-echarts
    .el-checkbox-button:first-child
    .el-checkbox-button__inner {
    border-left: none;
}

.right-charts-left-echarts
    .el-checkbox-button.is-checked
    .el-checkbox-button__inner {
    background-color: #ffffff;
    color: #4aa6fc;
    border: 1px solid #4aa6fc;
}

.right-charts-left-echarts .el-checkbox + .el-checkbox {
    margin-left: 14px;
}

.right-charts-left-list .el-progress-bar__innerText {
    display: none;
}

.right-charts-left-list .el-table .cell {
    text-align: center;
}

.right-charts-left-list .el-table .cell img {
    width: 18px;
    height: 24px;
}
</style>
