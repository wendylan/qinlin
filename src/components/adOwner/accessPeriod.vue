<script>
import echarts from 'echarts';
import leftbar from './ADqinlinzk.vue';
export default {
    components:{
        leftbar,
    },
    data(){
        return{
            date: '',
            allTrendData:[
                {Tid: 1, time: '00:00',  human_tra: 4545, community_tra: 12454, proportion_count: 12.26, visitor: 456, resident:456},
                {Tid: 2, time: '01:00',  human_tra: 12315, community_tra: 4569, proportion_count: 78.26, visitor: 786, resident:87},
                {Tid: 3, time: '02:00',  human_tra: 7845, community_tra: 7894, proportion_count: 89.26, visitor: 87, resident:875},
                {Tid: 4, time: '03:00',  human_tra: 7956, community_tra: 11564, proportion_count: 1.26, visitor: 875, resident:78},
                {Tid: 5, time: '04:00',  human_tra: 79646, community_tra: 8487, proportion_count: 59.26, visitor: 8785, resident:1445},
                {Tid: 6, time: '05:00',  human_tra: 4545, community_tra: 12454, proportion_count: 12.26, visitor: 456, resident:456},
                {Tid: 7, time: '06:00',  human_tra: 12315, community_tra: 4569, proportion_count: 78.26, visitor: 786, resident:87},
                {Tid: 8, time: '07:00',  human_tra: 7845, community_tra: 7894, proportion_count: 89.26, visitor: 87, resident:875},
                {Tid: 9, time: '08:00',  human_tra: 7956, community_tra: 11564, proportion_count: 1.26, visitor: 875, resident:78},
                {Tid: 10, time: '09:00',  human_tra: 79646, community_tra: 8487, proportion_count: 59.26, visitor: 8785, resident:1445},
                {Tid: 11, time: '10:00',  human_tra: 79646, community_tra: 8487, proportion_count: 59.26, visitor: 8785, resident:1445},
                {Tid: 12, time: '11:00',  human_tra: 12315, community_tra: 4569, proportion_count: 78.26, visitor: 786, resident:87},
                {Tid: 13, time: '12:00',  human_tra: 7845, community_tra: 7894, proportion_count: 89.26, visitor: 87, resident:875},
                {Tid: 14, time: '13:00',  human_tra: 7956, community_tra: 11564, proportion_count: 1.26, visitor: 875, resident:78},
                {Tid: 15, time: '14:00',  human_tra: 79646, community_tra: 8487, proportion_count: 59.26, visitor: 8785, resident:1445},
                {Tid: 16, time: '15:00',  human_tra: 4545, community_tra: 12454, proportion_count: 12.26, visitor: 456, resident:456},
                {Tid: 17, time: '16:00',  human_tra: 12315, community_tra: 4569, proportion_count: 78.26, visitor: 786, resident:87},
                {Tid: 18, time: '17:00',  human_tra: 7845, community_tra: 7894, proportion_count: 89.26, visitor: 87, resident:875},
                {Tid: 19, time: '18:00',  human_tra: 7956, community_tra: 11564, proportion_count: 1.26, visitor: 875, resident:78},
                {Tid: 20, time: '19:00',  human_tra: 79646, community_tra: 8487, proportion_count: 59.26, visitor: 8785, resident:1445},
                {Tid: 21, time: '20:00',  human_tra: 79646, community_tra: 8487, proportion_count: 59.26, visitor: 8785, resident:1445},
                {Tid: 22, time: '21:00',  human_tra: 79646, community_tra: 8487, proportion_count: 59.26, visitor: 8785, resident:1445},
                {Tid: 23, time: '22:00',  human_tra: 79646, community_tra: 8487, proportion_count: 59.26, visitor: 8785, resident:1445},
                {Tid: 24, time: '23:00',  human_tra: 79646, community_tra: 8487, proportion_count: 59.26, visitor: 8785, resident:1445},
            ],
        }
    },
    methods:{
        changeDate(date){
            console.log(date);
        },
        setTrend(){
            let accessPeriod = echarts.init(this.$refs.accessPeriod);
            let dataAxis = ['00-01','01-02','02-03','03-04', '04-05', '05-06', '06-07', '07-08', '08-09', '09-10', '10-11','11-12','12-13','13-14', '14-15', '15-16', '16-17', '17-18', '18-19', '19-20', '20-21', '21-22', '22-23', '23-24'];
            let data1 = [120, 132, 101, 134, 90, 230, 210, 452, 451, 78, 45, 123, 47, 45, 454, 26, 78, 59,45, 296, 78, 185, 235, 234];
            let data2 = [220, 182, 191, 234, 290, 330, 310];
            let option = {
                color: ['#3398DB'],
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    },
                    formatter: function (params) {
                        // console.log(params[0]);
                        let title = '';
                        let arr = [];
                        let Hstyle = 'background-color:#F4F6F6;font-size: 12px; width: 200px;height: 30px; display: flex; justify-content: space-between;padding: 0px 10px; align-items: center;box-sizing: border-box;margin-bottom: -20px;';
                        let bStyle = "display: flex; justify-content: space-between;padding: 0px 10px; box-sizing: border-box; align-items: center; font-size: 12px;color: #2C313C;height: 25px;";
                        let sstyle = "display: inline-block;width: 6px; height: 6px; border-radius: 50%;margin-right: 5px;";
                        for (let i = 0; i < params.length; i++) {
                            title = `<p style="${Hstyle}"><span>数据(${params[i].name})</span><span>数量</span></p><br/>`;
                            let data = `<p style="${bStyle}"><span><i style="${sstyle};background:${params[i].color}" ></i>${params[i].seriesName}</span>${params[i].value}</p>`;
                            arr.push(data);
                        }
                        let tooltip = arr.join('');
                        return title+tooltip
                    },
                    backgroundColor: '#FFFFFF',
                    textStyle: {
                        color: '#2C313C'
                    },
                    borderColor: '#dedede',
                    borderWidth: 1,
                    padding: 0,
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true,
                },
                xAxis : [
                    {
                        type : 'category',
                        data : dataAxis,
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        splitLine: {
                            lineStyle: {
                                color: "#E8E8E8",
                                type: "dashed"
                            }
                        }
                    },
                    // {
                    //     type : 'value'
                    // }
                ],
                series : [
                    {
                        name:'社区人流',
                        type:'bar',
                        barWidth: '45%',
                        yAxis: 1, 
                        itemStyle:{normal:{color:'#4AA6FC'}},
                        data:data1
                    },
                    // {
                    //     name:'社区人流占比',
                    //     type:'bar',
                    //     yAxisIndex: 1,
                    //     itemStyle:{normal:{color:'#F5A623'}},
                    //     data:data2
                    // }
                ]
            };
            accessPeriod.setOption(option);
            window.addEventListener("resize", function () {
                accessPeriod.resize();
            });
        },
    },
    mounted(){
        this.setTrend();
    },
}
</script>
<template>
    <div>
        <leftbar active_number="accessPeriod"></leftbar>
        <div class="top">
            <h2>访问时段：<span>2018/04/12-2018/09/12</span></h2>
            <!-- <h2>访问时段：
                <el-date-picker size="small" v-model="date" type="daterange" range-separator="-" format="yyyy/MM/dd" value-format="yyyy/MM/dd" @change="changeDate">
                </el-date-picker>
            </h2> -->
        </div>
        <div class="contain">
            <div class="trend_con">
                <div class="trend_top">
                    <h2>趋势图</h2>
                </div>
                <div id="accessPeriod" ref="accessPeriod" style="width: 100%;height: 380px;padding:10px 0px;"></div>
            </div>
            <div class="detail_data">
                <div class="detail_top">
                    <h2>详细数据</h2>
                </div>
                <div class="table_box">
                    <el-table :data="allTrendData" show-summary style="width: 100%">
                        <el-table-column prop="time" label="时间">
                        </el-table-column>
                        <el-table-column prop="human_tra" label="人流量" sortable>
                        </el-table-column>
                        <el-table-column prop="community_tra" label="社区流量" sortable>
                        </el-table-column>
                        <el-table-column prop="proportion_count" label="社区人流占比" sortable>
                            <template slot-scope="scope">
                                <span>{{scope.row.proportion_count}}%</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="visitor" label="访客" sortable>
                        </el-table-column>
                        <el-table-column prop="resident" label="居民" sortable>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.top:after {
    clear: both;
    content: " ";
    display: table;
}
.top {
    padding-left: 210px;
    background: #fff;
    height: 44px;
    line-height: 44px;
    /* margin-top: 60px; */
    border-bottom: 1px solid #dedede;
}
.top h2, .trend_top h2, .detail_top h2{
    color: #2C313C;
    font-size: 16px;
    font-weight: bold;
}
.top h2 span{
    font-size: 12px;
    color: #A3A3A3;
    letter-spacing: 0;
    font-weight: normal;
}
.contain{
    margin-left: 210px;
    /* width: 80%; */
    margin-right: 30px;
}
.trend_con{
    margin: 20px auto;
    /* padding: 20px auto; */
    background: #fff;
    border: 1px solid #dedede;
}
.detail_data{
    margin: 20px auto;
    /* padding: 20px; */
    background: #fff;
    border: 1px solid #dedede;
}
.trend_top, .detail_top{
    padding-left: 20px;
    border-bottom: 1px solid #dedede;
}
.trend_top h2, .detail_top h2{
    height: 40px;
    line-height: 40px;
}
.table_box{
    padding: 20px;
}
/*表格*/
/deep/ .el-table th,
.el-table tr {
    height: 44px;
    padding: 0;
    background-color: #f7f7f7;
}

/deep/ .el-table td {
    padding: 8px 0;
    overflow-x: hidden;
    text-overflow: ellipsis;
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

/deep/ .el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: #ecf5ff;
}

/*滚动条*/
/deep/ .el-table__body-wrapper {
    height: 320px;
    overflow-y: scroll;
    overflow-x: hidden;
}

/deep/ .el-table__body-wrapper::-webkit-scrollbar {
    width: 4px;
    background: #fafafa;
}

/deep/ .el-table__body-wrapper::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #c1c1c1;
    border-radius: 4px;
}

/*超出省略*/
/deep/ .el-table .cell {
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
/*筛选*/
/deep/ .el-table__column-filter-trigger {
    margin-left: 10px;
}

/deep/ .el-table th > .cell.highlight {
    color: #409eff !important;
}

/deep/ div.el-table-filter {
    left: 1106px !important;
}
</style>

