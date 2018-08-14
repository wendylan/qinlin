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
            progress:30,
        }
    },
    methods:{
        changeDate(date){
            console.log(date);
        },
        setTrend(){
            let ageTrend = echarts.init(this.$refs.ageTrend);
            let dataAxis = ['18岁以下', '18-24岁', '25-34岁', '35-44岁', '45-54岁', '55-64岁', '65岁以上'];
            let data1 = [12, 16, 36, 28, 20, 11, 9];
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
                        axisLabel: {  
                            show: true,  
                            interval: 'auto',  
                            formatter: '{value} %'  
                        }, 
                        splitLine: {
                            lineStyle: {
                                color: "#E8E8E8",
                                type: "dashed"
                            }
                        }
                    }
                ],
                series : [
                    {
                        name:'社区人流',
                        type:'bar',
                        barWidth: '16%',
                        yAxis: 1, 
                        itemStyle:{normal:{color:'#4AA6FC'}},
                        data:data1
                    }
                ]
            };
            ageTrend.setOption(option);
            window.addEventListener("resize", function () {
                ageTrend.resize();
            });
        },
        professTrend(){
            let professTrend = echarts.init(this.$refs.professTrend);
            let dataAxis = ['生产操作人员', '文职人员', '专业技术人员', '管理者和企业主', '个体经营者', '服务人员'];
            let data1 = [12, 16, 36, 28, 20, 11];
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
                        axisLabel: {  
                            show: true,  
                            interval: 'auto',  
                            formatter: '{value} %'  
                        }, 
                        splitLine: {
                            lineStyle: {
                                color: "#E8E8E8",
                                type: "dashed"
                            }
                        }
                    }
                ],
                series : [
                    {
                        name:'社区人流',
                        type:'bar',
                        barWidth: '16%',
                        yAxis: 1, 
                        itemStyle:{normal:{color:'#4AA6FC'}},
                        data:data1
                    }
                ]
            };
            professTrend.setOption(option);
            window.addEventListener("resize", function () {
                professTrend.resize();
            });
        },
        educationTrend(){
            let education = echarts.init(this.$refs.education);
            let option = {
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    x: 'left',
                    data:[]
                    // data:['本科及以上', '大专', '高中及以下', '其他']
                },
                series: [
                    {
                        name:'访问来源',
                        type:'pie',
                        radius: ['40%', '55%'],
                        color: [
                            "#1890FF",
                            "#13C2C2",
                            "#2FC25B",
                            "#F04864"
                        ],
                        // label: {
                        //     normal: {
                        //         formatter: '{c}\n{b|{b}}',
                        //         rich: {
                        //             b: {
                        //                 fontSize: 12,
                        //                 lineHeight: 23,
                        //             },
                        //         }
                        //     }
                        // },
                        label: {
                            normal: {
                            show: true,
                            formatter: function (params) {
                                return params.name + '\n' + '(' + params.percent + '%)'
                            },
                            color: '#2C313C',
                            align: 'center',
                            verticalAlign: 'bottom'
                            },
                            emphasis: {
                            show: true,
                            },
                        },
                        labelLine: {
                            normal: {
                                show: true,
                                lineStyle: {
                                    color: '#d3d3d3'
                                }
                            },
                        },
                        data:[
                            {value:310, name:'本科及以上'},
                            {value:335, name:'大专'},
                            {value:234, name:'高中及以下'},
                            {value:135, name:'其他'}
                        ]
                    }
                ]
            };
            
            education.setOption(option);
            window.addEventListener("resize", function () {
                education.resize();
            });
        },
        expenseTrend(){
            let expense = echarts.init(this.$refs.expense);
            let option = {
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    x: 'left',
                    data: [],
                    // data:['高', '中', '低']
                },
                series: [
                    {
                        name:'访问来源',
                        type:'pie',
                        radius: ['40%', '55%'],
                        color: [
                            "#1890FF",
                            // "#13C2C2",
                            "#2FC25B",
                            "#F04864"
                        ],
                        // label: {
                        //     normal: {
                        //         formatter: '{c}\n{b|{b}}',
                        //         rich: {
                        //             b: {
                        //                 fontSize: 12,
                        //                 lineHeight: 23,
                        //             },
                        //         }
                        //     }
                        // },
                        label: {
                            normal: {
                            show: true,
                            formatter: function (params) {
                                return params.name + '\n' + '(' + params.percent + '%)'
                            },
                            color: '#2C313C',
                            align: 'center',
                            verticalAlign: 'middle'
                            },
                            emphasis: {
                            show: true,
                            },
                        },
                        labelLine: {
                            normal: {
                                show: true,
                                lineStyle: {
                                    color: '#d3d3d3'
                                }
                            },
                        },
                        data:[
                            {value:335, name:'高'   },
                            {value:310, name:'中'},
                            {value:234, name:'低'},
                        ]
                    }
                ]
            };
            expense.setOption(option);
            window.addEventListener("resize", function () {
                expense.resize();
            });
        },
    },
    mounted(){
        this.setTrend();
        this.professTrend();
        this.educationTrend();
        this.expenseTrend();
    },
}
</script>
<template>
    <div>
        <leftbar active_number="residentAttr"></leftbar>
        <div class="top">
            <h2>住户属性：<span class="date">2018/04/12-2018/09/12</span>
                <span class="types">
                    <b>住户属性：</b>
                    <span class="isActive" >人流</span>
                    <span>社区人流</span>
                    <span>居民</span>
                    <span>访客</span>
                </span>
            </h2>
            <!-- <h2>住户属性：
                <el-date-picker size="small" v-model="date" type="daterange" range-separator="-" format="yyyy/MM/dd" value-format="yyyy/MM/dd" @change="changeDate">
                </el-date-picker>
            </h2> -->
        </div>
        <div class="contain">
            <!-- 头部 -->
            <div class="contain_top">
                <div class="con_left">
                    <h2>性别比例</h2>
                    <div class="percent">
                        <p class="img_box"><span>男</span><img src="../../assets/images/boy.png" alt="" ></p>
                        <div class="progressContainer">
                            <div class="progress" :style="{width:progress+'%'}">
                                <b :style="{left:progress+'%'}">{{progress}}%</b>
                            </div>
                        </div>
                        <p class="img_box girl"><img src="../../assets/images/girl.png" alt="" ><span>女</span></p>
                    </div>
                </div>
                <div class="con_right">
                    <h2>私家车拥有情况</h2>
                    <div class="car_info">
                        <p class="car_box"><img src="../../assets/images/car_1.png" alt="" ></p>
                        <p class="text_box"><span>38.6%</span> : <span>61.4%</span></p>
                        <p class="car_box car1"><img src="../../assets/images/car_2.png" alt="" ></p>
                    </div>
                </div>
            </div>
            <!-- 中部 -->
            <div class="contain_mid">
                <div class="con_left">
                    <h2>年龄分布</h2>
                    <div id="ageTrend" ref="ageTrend" style="width: 100%;height: 280px;padding:10px 0px;"></div>
                </div>
                <div class="con_right">
                    <h2>学历分布</h2>
                    <div id="education" ref="education" style="width: 100%;height: 280px;padding:10px 0px;"></div>
                </div>
            </div>
            <!-- 尾部 -->
            <div class="contain_foot">
                <div class="con_left">
                    <h2>职业分布</h2>
                    <div id="professTrend" ref="professTrend" style="width: 100%;height: 280px;padding:10px 0px;"></div>
                </div>
                <div class="con_right">
                    <h2>消费水平</h2>
                    <div id="expense" ref="expense" style="width: 100%;height: 280px;padding:10px 0px;"></div>
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
.top h2{
    color: #2C313C;
    font-size: 16px;
    font-weight: bold;
}
.top .date{
    font-size: 12px;
    color: #A3A3A3;
    letter-spacing: 0;
    font-weight: normal;
}
.types{
    margin-left: 20px;
}
.types b{
    color: #525151;
    font-size: 14px;
}
.types span{
    color: #A3A3A3;
    letter-spacing: 0;
    font-weight: normal;
    display: inline-block;
    margin-left: 4px;
    padding: 0px 8px;
    height: 24px;
    line-height: 24px;
    font-size: 14px;
    
}
.types .isActive{
    border-radius: 2px;
    padding: 0px 8px;
    color: #4AA6FC;
    border: 1px solid #4AA6FC;
}
.contain{
    margin-left: 210px;
    /* width: 80%; */
    margin-right: 30px;
}
.contain_top{
    height: 156px;
    /* margin-top: 20px; */
    margin: 30px auto;
    display: flex;
}
.con_left{
    width: 65%;
    height: 100%;
    margin-right: 30px;
    overflow: hidden;
    background: #fff;
    border: 1px solid #dedede;
}
.con_left h2, .con_right h2{
    width: 100%;
    height: 40px;
    line-height: 40px;
    padding-left: 20px;
    border-bottom: 1px solid #dedede;
    color: #2C313C;
    font-size: 16px;
    font-weight: bold;
}
.con_right{
    width: 33%;
    height: 100%;
    overflow: hidden;
    background: #fff;
    border: 1px solid #dedede;
}
.contain_mid, .contain_foot{
    height: 336px;
    /* border: 1px solid #dedede; */
    margin: 30px auto;
    display: flex;
    /* background: #fff; */
}

.percent{
    height: 116px;
    line-height: 116px;
    margin: 0 40px;
    display: flex;
}
.img_box{
    margin: 0;
    padding: 0;
}
.img_box span{
    margin-right: 10px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #2C313C;
    letter-spacing: 0;
}
.img_box img{
    width: 22px;
    height: 45px;
    vertical-align: middle;
}
.girl{
    margin-left: 10px;
}
.girl span{
    margin-left: 10px;
}
/* 进度条 */
div.progressContainer{
    position: relative;
    height: 6px;
    width: 80%;
    border-radius: 2px;
    background-color: #32C06C;
    margin-left: 2%;
    margin-top: 60px;
}
div.progress{
    background-color: #70C1FF;
    border-radius: 2px;
    height:6px;
    line-height: 6px;
}
.progress b{
    /* color:#70C1FF; */
    font-weight: 100;
    font-size: 12px;
    position: absolute;
    /* left:40%;  */
    top: -15px;
    font-size: 12px;
    color: #2C313C;
}
/* 私家车拥有情况 */
.car_info{
    height: 116px;
    line-height: 116px;
    /* margin: 0 20px; */
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: space-around;
}
.car_box{
    margin: 0;
    padding: 0;
}
.car_box img{
    width: 55px;
    height: 45px;
    vertical-align: middle;
    display: inline-block;
}
.car1 img{
    width: 60px;
    height: 60px;
}
.text_box{
    font-family: DINCondensed-Bold;
    font-size: 24px;
    color: #515151;
    letter-spacing: 0;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: space-around;
}
.text_box span{
    font-size: 28px;
    margin: 0 10px;
}
</style>

