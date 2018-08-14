<template>
	<div class="ad_mediaDetail_wrap clearfix">
		<el-tabs v-model="activeName" @tab-click="handleClick" tab-position="left" class="tabs">
			<el-tab-pane label="总览" name="first" class="tab-pane">
				<el-menu default-openeds="['1','2','3','4']" :default-active="nowIndex" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#444444" text-color="#BBBBBB" active-text-color="#FFFFFF" unique-opened>
					<template v-for="(val, index) in navList">
						<el-menu-item v-if="!val.childs" :index="val.index" :key="index" class="fir-item">
							<i :class="val.icon"></i>
							<a :href="val.link">{{ val.name }}</a>
						</el-menu-item>
						<el-submenu v-else :index="index.toString()" :key="index">
							<template slot="title">
								<i :class="val.icon"></i>{{ val.name }}
							</template>
							<template v-for="(value, key) in val.childs">
								<el-menu-item :index="value.index" :key="key" class="sec-item">
									<i :class="value.icon"></i>
									<a :href="value.link">{{ value.name }}</a>
								</el-menu-item>
							</template>
						</el-submenu>
					</template>
				</el-menu>

				<!-- <el-menu default-openeds="['1','2','3','4']" default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#444444" text-color="#BBBBBB" active-text-color="#FFFFFF">
                    <el-menu-item index="1">
                        <i class="el-icon-document"></i>
                        <span slot="title">整体概览</span>
                    </el-menu-item>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span slot="title">人流管理</span>
                        </template>
                        <el-menu-item index="2-1" class="sec-item">
                            <a href="/adOwner/totalView">人流趋势</a>
                        </el-menu-item>
                        <el-menu-item index="2-2" class="sec-item">居民访客</el-menu-item>
                        <el-menu-item index="2-3" class="sec-item">访问时段</el-menu-item>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span slot="title">住户洞察</span>
                        </template>
                        <el-menu-item index="3-1" class="sec-item">住户属性</el-menu-item>
                        <el-menu-item index="3-2" class="sec-item">消费偏好</el-menu-item>
                    </el-submenu>
                </el-menu> -->
			</el-tab-pane>
			<el-tab-pane label="社区" name="second" class="tab-pane community-tab">
				<el-menu default-openeds="['1','2','3','4']" :default-active="nowIndex" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#444444" text-color="#BBBBBB" active-text-color="#FFFFFF" unique-opened>
					<template v-for="(val, index) in navList">
						<el-menu-item v-if="!val.childs" :index="val.index" :key="index" class="fir-item community">
							<el-select v-model="community" filterable placeholder="请选择">
								<el-option-group v-for="group in communityChooes" :key="group.label" :label="group.label">
									<el-option v-for="item in group.communitys" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-option-group>
							</el-select>
						</el-menu-item>
						<el-menu-item v-if="!val.childs" :index="val.index" :key="index" class="fir-item">
							<i :class="val.icon"></i>
							<a :href="val.link">{{ val.name }}</a>
						</el-menu-item>
						<el-submenu v-else :index="index.toString()" :key="index">
							<template slot="title">
								<i :class="val.icon"></i>{{ val.name }}
							</template>
							<template v-for="(value, key) in val.childs">
								<el-menu-item :index="value.index" :key="key" class="sec-item">
									<i :class="value.icon"></i>
									<a :href="value.link">{{ value.name }}</a>
								</el-menu-item>
							</template>
						</el-submenu>
					</template>
				</el-menu>
				<!-- <el-menu default-openeds="['1','2','3','4']" default-active="2-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#444444" text-color="#BBBBBB" active-text-color="#FFFFFF">
                    <el-menu-item index="1">
                        <i class="el-icon-document"></i>
                        <span slot="title">整体概览</span>
                    </el-menu-item>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span slot="title">人流管理</span>
                        </template>
                        <el-menu-item index="2-1" class="sec-item">人流趋势</el-menu-item>
                        <el-menu-item index="2-2" class="sec-item">居民访客</el-menu-item>
                        <el-menu-item index="2-3" class="sec-item">访问时段</el-menu-item>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span slot="title">住户洞察</span>
                        </template>
                        <el-menu-item index="3-1" class="sec-item">住户属性</el-menu-item>
                        <el-menu-item index="3-2" class="sec-item">消费偏好</el-menu-item>
                    </el-submenu>

                </el-menu> -->
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
export default {
    name: "qinlinzk",
    props: {
        active_number: {
            type: String,
            default: "totalview"
        }
    },
    data() {
        return {
            activeName: "first",
            nowIndex: null,
            navList: [
                {
                    name: "整体概览",
                    link: "/superOperate/totalview",
                    index: "totalview",
                    icon: "el-icon-document"
                },
                {
                    name: "人流管理",
                    childs: [
                        {
                            name: "人流趋势",
                            link: "/superOperate/trafficTrend",
                            index: "trafficTrend"
                        },
                        {
                            name: "居民访客",
                            link: "/superOperate/resVisitors",
                            index: "resVisitors"
                        },
                        {
                            name: "访问时段",
                            link: "/superOperate/accessPeriod",
                            index: "accessPeriod"
                        }
                    ],
                    icon: "el-icon-location"
                },
                {
                    name: "住户洞察",
                    childs: [
                        {
                            name: "住户属性",
                            link: "/superOperate/residentAttr",
                            index: "residentAttr"
                        },
                        {
                            name: "消费偏好",
                            link: "/superOperate/costPreferences",
                            index: "costPreferences"
                        }
                    ],
                    icon: "el-icon-location"
                }
            ],
            //社区选择
            communityChooes: [
                {
                    label: "可直接搜索小区名哦",
                    communitys: [
                        {
                            value: "选项1",
                            label: "尚东峰景雅苑"
                        },
                        {
                            value: "选项2",
                            label: "东华苑"
                        },
                        {
                            value: "选项3",
                            label: "保利紫薇花园"
                        },
                        {
                            value: "选项4",
                            label: "华南碧桂园"
                        },
                        {
                            value: "选项5",
                            label: "东兴小区"
                        },
                        {
                            value: "选项1",
                            label: "尚东峰景雅苑"
                        },
                        {
                            value: "选项2",
                            label: "东华苑"
                        },
                        {
                            value: "选项3",
                            label: "保利紫薇花园"
                        },
                        {
                            value: "选项4",
                            label: "华南碧桂园"
                        },
                        {
                            value: "选项5",
                            label: "东兴小区"
                        }
                    ]
                }
            ],
            community: "尚东峰景雅苑"
        };
    },
    created() {
        this.showSelect();
    },
    methods: {
        showSelect() {
            this.nowIndex = this.active_number;
        },
        handleClick() {
            console.log(this.activeName);
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    }
};
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    /*position: fixed;*/
    /*left: 42px;*/
    /*top: 60px;*/
    height: 100%;
    min-width: 146px;
}

/deep/ .el-tabs__item {
    padding: 0 8px;
}

/deep/ .el-tabs__active-bar {
    background-color: #ffffff;
}

/deep/ .el-tabs__item.is-active {
    color: #ffffff;
    background-color: #3a3a3a !important;
}

/deep/ .el-tabs__item {
    color: #bbbbbb;
}

/deep/ .el-tabs__nav-scroll {
    border-right: 1px solid #616161;
}

/deep/ .el-menu-item,
/deep/ .el-submenu__title {
    height: 40px;
    line-height: 38px;
}

/deep/ .el-menu-item.is-active {
    background-color: #3a3a3a !important;
}
/deep/ li.el-menu-item.fir-item.is-active a {
    color: #fff;
}

/deep/ li.el-menu-item,
/deep/ .el-submenu__title {
    padding-left: 8px !important;
    font-size: 14px;
}

/deep/ li.el-menu-item.sec-item {
    padding-left: 37px !important;
    font-size: 12px;
    height: 36px;
    line-height: 36px;
}

/deep/ li.el-menu-item.fir-item {
    padding-left: 9px !important;
}

/deep/ li.el-menu-item.fir-item a {
    font-size: 14px;
    color: #bbbbbb;
}

/deep/ li.el-menu-item.sec-item a {
    font-size: 12px;
    color: #bbbbbb;
}

/deep/ .el-menu-item.is-active a {
    color: #ffffff;
    font-size: 14px;
}

/deep/ li.el-menu-item.sec-item.is-active a {
    color: #ffffff;
    font-size: 12px;
}

/deep/ .el-menu-item [class^="el-icon-"] {
    margin-right: 0;
}

/deep/ .el-submenu .el-menu-item {
    min-width: 136px;
}

.tabs {
    width: 189px;
    position: absolute;
    left: 0px;
    top: 60px;
    background: #444;
    height: 100%;
}
/deep/ .el-tabs--left .el-tabs__header.is-left {
    margin-right: 0;
}
/deep/ .el-tabs__nav-wrap:after {
    background-color: #444 !important;
}

/*小区选择*/
.community-tab /deep/ .el-input--suffix .el-input__inner,
/deep/ .el-menu-item.is-active /deep/ .el-input--suffix .el-input__inner {
    width: 135px;
    height: 40px;
    padding-right: 30px;
    background: #444444;
    border: none;
    color: #ffffff;
    border-bottom: 1px dashed #585858;
    padding-bottom: 1px;
}
/deep/ li.el-menu-item.fir-item.community {
    padding: 0px !important;
}
/deep/ li.el-menu-item.community.is-active {
    background-color: #444;
}
/deep/ .el-select-group__title {
    padding: 0 10px;
}

/*1440*/
@media all and (min-width: 1420px) {
}

/*1920*/
@media all and (min-width: 1900px) {
}
</style>

<style>
.tab-pane .el-tabs__item {
    padding: 0 8px;
}

.tab-pane .el-tabs__active-bar {
    background-color: #ffffff;
}

.tab-pane .el-tabs__item.is-active {
    color: #ffffff;
    background-color: #3a3a3a !important;
}

.tab-pane .el-tabs__item {
    color: #bbbbbb;
}

.tab-pane .el-tabs__nav-scroll {
    border-right: 1px solid #616161;
}

.tab-pane .el-menu-item,
.tab-pane .el-submenu__title {
    height: 40px;
    line-height: 38px;
}

.tab-pane .el-menu-item.is-active {
    background-color: #3a3a3a !important;
}
.tab-pane li.el-menu-item.fir-item.is-active a {
    color: #fff;
}

.tab-pane li.el-menu-item,
.tab-pane .el-submenu__title {
    padding-left: 8px !important;
    font-size: 14px;
}

.tab-pane li.el-menu-item.sec-item {
    padding-left: 37px !important;
    font-size: 12px;
    height: 36px;
    line-height: 36px;
}

.tab-pane li.el-menu-item.fir-item {
    padding-left: 9px !important;
}

.tab-pane li.el-menu-item.fir-item a {
    font-size: 14px;
    color: #bbbbbb;
    width: 100px;
    height: 41px;
    position: absolute;
    top: 0px;
    left: 0px;
    padding-left: 36px;
}

.tab-pane li.el-menu-item.sec-item a {
    font-size: 12px;
    color: #bbbbbb;
    width: 100px;
    height: 41px;
    position: absolute;
    top: 0px;
    left: 0px;
    padding-left: 36px;
}

.tab-pane .el-menu-item.is-active a {
    color: #ffffff;
    font-size: 14px;
}

.tab-pane li.el-menu-item.sec-item.is-active a {
    color: #ffffff;
    font-size: 12px;
}

.tab-pane .el-menu-item [class^="el-icon-"] {
    margin-right: 0;
}

.tab-pane .el-submenu .el-menu-item {
    min-width: 136px;
}

.community-tab .el-input--suffix .el-input__inner,
.el-menu-item.is-active .el-input--suffix .el-input__inner {
    width: 135px;
    height: 40px;
    padding-right: 30px;
    background: #444444;
    border: none;
    color: #ffffff;
    border-bottom: 1px dashed #585858;
    padding-bottom: 1px;
}
.community-tab li.el-menu-item.fir-item.community {
    padding: 0px !important;
}
.community-tab li.el-menu-item.community.is-active {
    background-color: #444;
}
.community-tab .el-select-group__title {
    padding: 0 10px;
}
</style>
