<template>
    <div>
        <managebox :contain-data="containData"></managebox>
        <div class="showData">
            <ul class="numbers">
                <li>
                    <p>社区数量</p>
                    <h2>62,132</h2>
                    <div class="scale">
                    <span>日环比&nbsp; <i class="el-icon-back"></i><em>12.25%</em></span>
                    <span>周环比&nbsp; <i class="el-icon-back"></i><em>13.33%</em></span>
                    </div>
                </li>
                <li>
                    <p>广告门数量</p>
                    <h2>62,132</h2>
                    <div class="scale">
                    <span>日环比&nbsp; <i class="el-icon-back"></i><em>12.25%</em></span>
                    <span>周环比&nbsp; <i class="el-icon-back"></i><em>13.33%</em></span>
                    </div>
                </li>
                <li>
                    <p>订单数量</p>
                    <h2>62,132</h2>
                    <div class="scale">
                    <span>日环比&nbsp; <i class="el-icon-back"></i><em>12.25%</em></span>
                    <span>周环比&nbsp; <i class="el-icon-back"></i><em>13.33%</em></span>
                    </div>
                </li>
                <li>
                    <p>广告主数量</p>
                    <h2>62,132</h2>
                    <div class="scale">
                    <span>日环比&nbsp; <i class="el-icon-back"></i><em>12.25%</em></span>
                    <span>周环比&nbsp; <i class="el-icon-back"></i><em>13.33%</em></span>
                    </div>
                </li>
            </ul>
            <div class="echarts-box">
                <!--社区及广告门增长趋势-->
                <div class="box box1">
                    <h3>社区及广告门增长趋势</h3>
                    <div class="tabs">
                    <button class="active" @click="box1Change">小区</button>
                    <button @click="box1Change">广告门</button>
                    </div>
                    <div class="charts charts1">
                    <div id="houseCharts" style="width:600px;height:400px" ref="houseCharts" v-show="isActive1"></div>
                    <div id="ADdoorCharts" style="width:600px;height:400px" ref="adDoorCharts" v-show="!isActive1"></div>
                    </div>
                </div>
                <!--订单数量分布情况-->
                <div class="box box2">
                    <h3>订单数量分布情况</h3>
                    <div class="charts charts2">
                    <div id="orderCharts" style="width:600px;height:430px" ref="orderCharts"></div>
                    </div>
                </div>
            </div>
            <div class="echarts-box">
                <!--订单数量分布情况-->
                <div class="box box3">
                    <h3>客户行业分布情况</h3>
                    <div class="tabs">
                    <button class="active" @click="box2change">订单金额</button>
                    <button  @click="box2change">订单数量</button>
                    </div>
                    <div class="charts charts3">
                    <div id="priceCharts" style="width:600px;height:400px" ref="priceCharts" v-show="isActive2" ></div>
                    <div id="numberCharts" style="width:600px;height:400px" ref="numberCharts" v-show="!isActive2" ></div>
                    </div>
                </div>
                <!--广告主方案数情况-->
                <div class="box box4">
                    <h3>广告主方案数情况</h3>
                    <div class="charts charts4">
                    <div class="table-wrap">
                        <el-table
                        :data="planNum"
                        style="width: 100%">
                        <el-table-column
                            prop="rank"
                            label="排名"
                            width="50">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="姓名"
                            width="100">
                        </el-table-column>
                        <el-table-column
                            prop="price"
                            label="销售金额"
                            width="130">
                        </el-table-column>
                        <el-table-column
                            prop="percent"
                            label="比率">
                            <template slot-scope="scope">
                            <el-progress :percentage="70"></el-progress>
                            </template>
                        </el-table-column>
                        </el-table>
                    </div>
                    </div>
                </div>
            </div>
      </div>
    </div>
</template>

<script>
import managebox from '../public/cardManage.vue';
export default {
    name: "admin_index",
    data(){
        return {
            containData:[
                {path: '/superOperate/clientList', name: '客户管理', smallOpera: '查看', operationName: '创建客户', operationPath: 'admin/createClient'},
                {path: '/superOperate/mediaList', name: '媒体管理', smallOpera:'查看', operationName: '录入媒体', operationPath: '/superOperate/mediaInput'},
                {path: '/superOperate/planList', name: '方案管理', smallOpera:'查看', operationName: '创建方案', operationPath: 'admin/createPlan'},
                {path: '/superOperate/orderList', name: '订单管理', smallOpera:'查看', operationName: '', operationPath: ''},
            ],
            isActive1: true,
            isActive2: true,
            //广告主方案数情况
            planNum: [{
                rank:'1',
                price: '¥ 21,234,544',
                name: '欧阳震华',
            }, {
                rank:'2',
                price: '¥ 21,234,544',
                name: '欧阳震华',
            },{
                rank:'3',
                price: '¥ 21,234,544',
                name: '欧阳震华',
            },{
                rank:'4',
                price: '¥ 21,234,544',
                name: '欧阳震华',
            }],
            //社区及广告门增长趋势
            data1: ['2017/08/15', '2017/09/15', '2017/10/15', '2017/11/15', '2017/12/15', '2018/01/15'],
            //订单数量分布情况
            data2: ['2017/08', '2017/09', '2017/10', '2017/11', '2017/12', '2018/01'],
            //客户行业分布情况
            data3: ['医美', '房地产', '汽车', '本地生活', '餐饮美食', '其他']
            }
    },
    components: {
        managebox
    },
    mounted() {
        $(function () {
            $('.box1').find('button').click(function () {
                $(this).addClass('active').siblings().removeClass('active');
            });
            $('.box3').find('button').click(function () {
                $(this).addClass('active').siblings().removeClass('active');
            })

        });
        this.houseChart();
        this.ADdoorChart();
        this.orderChart();
        this.priceChart();
        this.numberChart();
    },
    methods: {
        box1Change(){
            this.isActive1 = !this.isActive1;
        },
        box2change(){
            this.isActive2 = !this.isActive2;
        },
        houseChart() {
            let houseCharts = this.$echarts.init(this.$refs.houseCharts);
            /*// 请求获取数据
            this.axios.get('/url').then((data) => {
            this.chart.setOption({

            })
            });*/
            houseCharts.setOption({
                tooltip: {  //提示框
                    trigger: 'axis',  //触发类型(坐标轴触发)
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '14%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,//坐标的刻度是否在中间
                    data: this.data1,
                    axisLine: {//坐标轴线条相关设置(颜色等)
                        lineStyle: {
                            color: '#E8E8E8'
                        }
                    },
                    axisLabel: { //坐标轴刻度标签
                    margin: 7, //刻度标签与轴线之间的距离
                    textStyle: {
                        color: " rgba(0,0,0,0.65)",  //坐标轴刻度文字的颜色

                    }
                    },

                },
                yAxis: {
                    type: 'value',
                    axisLine: {//坐标轴线条相关设置(颜色等)
                    lineStyle: {
                        color: '#E8E8E8'
                    }
                    },
                    axisLabel: { //坐标轴刻度标签
                    margin: 7, //刻度标签与轴线之间的距离
                    textStyle: {
                        color: " rgba(0,0,0,0.65)",  //坐标轴刻度文字的颜色
                    }
                    },
                    splitLine: {
                    lineStyle: {
                        color: '#E8E8E8',
                        type: 'dashed'
                    }
                    },
                },
                dataZoom: [{
                    type: 'inside',
                    start: 20,
                    end: 80
                }, {
                    start: this.data1[0],
                    end: this.data1[5],
                    handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                    handleSize: '80%',
                    handleStyle: {
                    color: '#fff',
                    shadowBlur: 3,
                    shadowColor: 'rgba(0, 0, 0, 0.7)',
                    shadowOffsetX: 2,
                    shadowOffsetY: 2
                    }
                }],
                series: [{
                    data: [420, 532, 301, 634, 890, 930, 1020],
                    type: 'line',
                    color: 'rgba(58,160,255,0.3)',
                    smooth: true,
                    areaStyle: {},//区域填充样式
                    itemStyle: {
                    normal: {
                        lineStyle: {
                        width: 2,//折线宽度
                        color: "#1890ff"//折线颜色
                        }
                    }
                    },
                }]
            })
        },
        ADdoorChart() {
            let adDoorCharts = this.$echarts.init(this.$refs.adDoorCharts);
            /*// 请求获取数据
            this.axios.get('/url').then((data) => {
            this.chart.setOption({

            })
            });*/
            adDoorCharts.setOption({
            tooltip: {  //提示框
                trigger: 'axis',  //触发类型(坐标轴触发)
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '14%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,//坐标的刻度是否在中间
                data: this.data1,
                axisLine: {//坐标轴线条相关设置(颜色等)
                lineStyle: {
                    color: '#E8E8E8'
                }
                },
                axisLabel: { //坐标轴刻度标签
                margin: 7, //刻度标签与轴线之间的距离
                textStyle: {
                    color: " rgba(0,0,0,0.65)",  //坐标轴刻度文字的颜色
                }
                },
            },
            yAxis: {
                type: 'value',
                axisLine: {//坐标轴线条相关设置(颜色等)
                lineStyle: {
                    color: '#E8E8E8'
                }
                },
                axisLabel: { //坐标轴刻度标签
                margin: 7, //刻度标签与轴线之间的距离
                textStyle: {
                    color: " rgba(0,0,0,0.65)",  //坐标轴刻度文字的颜色
                }
                },
                splitLine: {
                lineStyle: {
                    color: '#E8E8E8',
                    type: 'dashed'
                }
                },
            },
            dataZoom: [{
                type: 'inside',
                start: 0,
                end: 80
            }, {
                start: this.data1[0],
                end: this.data1[5],
                handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                handleSize: '80%',
                handleStyle: {
                color: '#fff',
                shadowBlur: 3,
                shadowColor: 'rgba(0, 0, 0, 0.7)',
                shadowOffsetX: 2,
                shadowOffsetY: 2
                }
            }],
            series: [{
                data: [320, 732, 501, 734, 890, 930, 1120],
                type: 'line',
                color: 'rgba(58,160,255,0.3)',
                smooth: true,
                areaStyle: {},//区域填充样式
                itemStyle: {
                normal: {
                    lineStyle: {
                    width: 2,//折线宽度
                    color: "#1890ff"//折线颜色
                    }
                }
                },
            }]
            })
        },
        orderChart() {
            let orderCharts = this.$echarts.init(this.$refs.orderCharts);
            /*// 请求获取数据
            this.axios.get('/url').then((data) => {
            this.chart.setOption({

            })
            });*/
            orderCharts.setOption({
            color: ['#3398DB'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'line'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '14%',
                containLabel: true
            },
            xAxis: [
                {
                type: 'category',
                data: this.data2,
                axisTick: {
                    alignWithLabel: true
                },
                axisLine: {//坐标轴线条相关设置(颜色等)
                    lineStyle: {
                    color: '#E8E8E8',
                    }
                },

                axisLabel: { //坐标轴刻度标签
                    margin: 7, //刻度标签与轴线之间的距离
                    textStyle: {
                    color: " rgba(0,0,0,0.65)",  //坐标轴刻度文字的颜色
                    }
                },
                }
            ],
            yAxis: [
                {
                type: 'value',
                axisLine: {//坐标轴线条相关设置(颜色等)
                    lineStyle: {
                    color: '#E8E8E8'
                    }
                },
                splitLine: {
                    lineStyle: {
                    color: '#E8E8E8',
                    type: 'dashed'
                    }
                },
                axisLabel: { //坐标轴刻度标签
                    margin: 7, //刻度标签与轴线之间的距离
                    textStyle: {
                    color: " rgba(0,0,0,0.65)",  //坐标轴刻度文字的颜色
                    }
                },
                }
            ],
            dataZoom: [{
                type: 'inside',
                start: 0,
                end: 100
            }, {
                start: this.data1[0],
                end: this.data1[5],
                handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                handleSize: '80%',
                handleStyle: {
                color: '#fff',
                shadowBlur: 3,
                shadowColor: 'rgba(0, 0, 0, 0.7)',
                shadowOffsetX: 2,
                shadowOffsetY: 2
                }
            }],
            series: [{
                data: [320, 732, 501, 734, 890, 1930],
                type: 'bar',
                barWidth: '40%',
                color: '#1890FF',
                smooth: true,
                areaStyle: {},//区域填充样式
            }]
            })
        },
        priceChart() {
            let priceCharts = this.$echarts.init(this.$refs.priceCharts);
            /*// 请求获取数据
            this.axios.get('/url').then((data) => {
            this.chart.setOption({

            })
            });*/
            let option =  {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                icon: 'circle',
                itemWidth: 8,
                itemHeight: 8,
                padding: 18,
                itemGap: 25,
                align: 'left',
                orient: 'vertical',
                right: 10,
                top: 60,
                bottom: 20,
                x: 'right',
                data: this.data3,
                formatter: function (params) {
                console.log(params);

                for (var i = 0; i < option.series[0].data.length; i++) {
                    if (option.series[0].data[i].name == params) {
                    return params +":"+"￥"+ option.series[0].data[i].value;
                    }
                }
                }
            },

            series: [
                {
                name: '订单总金额',
                type: 'pie',

                radius: ['50%', '70%'],
                color: ['#8543E0', '#1890FF', '#13C2C2', '#2FC25B', '#FACC14', '#F04864', '#8543E0'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                    show: false,
                    position: 'center',
                    formatter: "{a}\n{b}: ￥{c}"
                    },
                    emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '20',
                        fontWeight: 'bold',
                        color:'#000'
                    }
                    }
                },
                labelLine: {
                    normal: {
                    show: false
                    }
                },
                data: [
                    {value: 5335, name: '医美'},
                    {value: 3410, name: '房地产'},
                    {value: 2734, name: '汽车'},
                    {value: 1035, name: '本地生活'},
                    {value: 1548, name: '餐饮美食'},
                    {value: 1548, name: '其他'},
                ]
                }
            ]
            };
            priceCharts.setOption(option);
        },
        numberChart() {
            let numberCharts = this.$echarts.init(this.$refs.numberCharts);
            /*// 请求获取数据
            this.axios.get('/url').then((data) => {
            this.chart.setOption({

            })
            });*/
            let option =  {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                icon: 'circle',
                itemWidth: 8,
                itemHeight: 8,
                padding: 18,
                itemGap: 25,
                align: 'left',
                orient: 'vertical',
                right: 10,
                top: 60,
                bottom: 20,
                x: 'right',
                data: this.data3,
                formatter: function (params) {
                for (var i = 0; i < option.series[0].data.length; i++) {
                    if (option.series[0].data[i].name === params) {
                    return params +":"+"￥"+ option.series[0].data[i].value;
                    }
                }
                }
            },

            series: [
                {
                name: '订单总金额',
                type: 'pie',

                radius: ['50%', '70%'],
                color: ['#13C2C2', '#8543E0', '#1890FF', '#2FC25B', '#FACC14', '#F04864', '#8543E0'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                    show: false,
                    position: 'center',
                    formatter: "{a}\n{b}: ￥{c}"
                    },
                    emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '20',
                        fontWeight: 'bold',
                        color:'#000'
                    }
                    }
                },
                labelLine: {
                    normal: {
                    show: false
                    }
                },
                data: [
                    {value: 2335, name: '医美'},
                    {value: 3410, name: '房地产'},
                    {value: 2734, name: '汽车'},
                    {value: 5035, name: '本地生活'},
                    {value: 3548, name: '餐饮美食'},
                    {value: 1548, name: '其他'},
                ]
                }
            ]
            };
            numberCharts.setOption(option);
        }
    }
}
</script>

<style scoped>

  /*数据展示*/
  .showData {
    width: 100%;
  }

  .numbers {
    /*width: 92%;*/
    width: 1245px;
    overflow: hidden;
    background-color: #fff;
    margin: 20px 60px 0 60px;
    border: 1px solid #DEDEDE;
    border-radius: 2px;
    /*box-shadow: 0 2px 8px 1px rgba(0, 0, 0, 0.08);*/
  }

  .numbers li {
    float: left;
    padding: 0 28px;
    border-right: 1px solid #E8E8E8;
    margin-top: 20px;
    margin-bottom: 20px;

    box-sizing: border-box;
  }

  .numbers li:last-child {
    border-right: none;
  }

  .numbers li p {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
  }

  .numbers li h2 {
    font-size: 30px;
    color: rgba(0, 0, 0, 0.85);
    margin-top: 10px;
    margin-bottom: 14px;
  }

  .numbers li .scale {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.65);
  }

  .scale span + span {
    margin-left: 25px;
  }

  .numbers li .scale i {
    font-style: normal;
    color: #DE1010;
    transform: rotateZ(90deg);
    font-size: 13px;
    font-weight: bold;
  }

  .scale em {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.85);
  }

  /*echarts*/
  .echarts-box {
    width: 100%;
    padding: 0 60px;
    overflow: hidden;
  }

  .echarts-box .box + .box {
    margin-left: 17px;
  }

  .echarts-box .box3 {
    margin-left: 0 !important;
  }

  .box {
    float: left;
    border: 1px solid #DEDEDE;
    border-radius: 2px;
    width: 613px;
    background-color: #fff;
    margin-top: 20px;
    /*height: 443px;*/
  }

  .box h3 {
    font-size: 16px;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.85);
    padding-left: 24px;
    padding-top: 10px;
  }

  /*社区及广告门增长趋势*/
  .box .tabs {
    padding-left: 24px;
    padding-top: 10px;
  }

  .box button {
    width: 88px;
    height: 32px;
    outline: none;
    border: 1px solid #D9D9D9;
    border-radius: 4px 0 0 4px;
    background-color: #fff;
    cursor: pointer;
  }

  .box button + button {
    margin-left: -5px;
    border-radius: 0 4px 4px 0;
  }

  .box button.active {
    border: 1px solid #1890FF;
  }

  .charts {
    border-top: 1px solid #E8E8E8;
    margin-top: 10px;
    margin-bottom: 20px;
  }

  /*订单数量分布情况*/
  .box2 h3 {
    font-size: 16px;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.85);
    padding: 16px 24px 6px 24px;
  }

  .box4{
    height: 504px;
  }

  .box4 h3 {
    font-size: 16px;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.85);
    padding: 16px 24px 6px 24px;
  }

  /*广告方案数*/
  .table-wrap{
    padding: 20px;
  }
  /deep/ .el-table thead{
    background:  #FAFAFA;
  }
  /deep/ .el-table th{
    font-size: 14px;
    color: rgba(0,0,0,0.65);
  }


  html,body {
    overflow: hidden;
  }



  .ad_index_container {
    height: 1888px;
  }

  .ad_index_panel li {
    height: 146px;
  }

  .ad_index_panel li + li {
    margin-left: 22px;
  }

  .panel_top {
    border-bottom: none;
    height: 146px;
  }

  .ad_index_panel .mask {
    height: 146px;
  }

  .panel_top_right {
    top: 44px;
  }

  .ad_index_panel li .panel_top_icon_wrap {
    margin-top: 34px;
    margin-left: 50px;
    display: inline-block;
  }

  .ad_index_panel li:nth-child(1) .panel_top_icon_wrap {
    border: 8px solid rgba(255, 208, 77, 0.3);
  }

  .ad_index_panel li:nth-child(1) .panel_top_icon {
    background: #FFD04D url("../../assets/images/group.png") no-repeat center center;
  }

  .ad_index_panel li:nth-child(2) .panel_top_icon_wrap {
    border: 8px solid rgba(97, 161, 248, 0.30);;

  }

  .ad_index_panel li:nth-child(2) .panel_top_icon {
    background: #61A1F8 url("../../assets/images/media.png") no-repeat center center;
  }

  .ad_index_panel li:nth-child(3) .panel_top_icon_wrap {
    border: 8px solid rgba(152, 237, 141, 0.30);

  }

  .ad_index_panel li:nth-child(3) .panel_top_icon {
    background: #98ED8D url("../../assets/images/editor.png") no-repeat center center;
  }

  .ad_index_panel li:nth-child(4) .panel_top_icon_wrap {
    border: 8px solid rgba(239, 129, 140, 0.30);

  }

  .ad_index_panel li:nth-child(4) .panel_top_icon {
    background: #EF818C url("../../assets/images/order.png") no-repeat center center;
  }

  /*1440*/
  @media screen and (min-width: 1440px) {
    .ad_index_panel li {
      width: 310px;
    }

    .ad_index_container {
      height: 1441px;
    }

    .ad_index_panel li + li {
      margin-left: 22px;
    }

    .numbers {
      /*width: 92%;*/
      width: 1306px;
    }

    .echarts-box .box + .box {
      margin-left: 22px;
    }
    .box {
      float: left;
      border: 1px solid #DEDEDE;
      border-radius: 2px;
      width: 45%;
      background-color: #fff;
      margin-top: 20px;
      /*height: 443px;*/
    }


  }

  /*1920*/
  @media screen and (min-width: 1920px) {

    .numbers li {
      float: left;
      padding: 0 97px;
    }

    .ad_index_panel li + li {
      margin-left: 22px;
    }

    .numbers {
      /*width: 92%;*/
      width: 1800px;
    }

    .box {
      float: left;
      border: 1px solid #DEDEDE;
      border-radius: 2px;
      width: 46.7%;
      background-color: #fff;
      margin-top: 20px;
      /*height: 443px;*/
    }
  }

</style>