<script>
export default {
    props:{
        detail:{
            type: Object,
            default: {}
        },
        isorder:{
            type: Boolean,
            default: false
        },
    },
    data(){
        return{
            
        }
    },
    methods:{
        // 去重城市
        filter(val) {
            let res = "";
            if (val) {
                for (let data of val.split(",")) {
                    if (!res.includes(data)) {
                        res = data + "," + res;
                    }
                }
                console.log(res);
                res = res.toString().substring(0, res.toString().length - 1);
            }
            return res;
        },
        // 状态转换成文本
        stateToText(val) {
            let state = [
                { text: "已完成", state: 0 },
                { text: "进行中", state: 1 },
                { text: "未投放", state: 2 },
                { text: "投放中", state: 3 },
                { text: "强制结束", state: 5 }
            ];
            for (let data of state) {
                if (val == data.state) {
                    return data.text;
                }
            }
        },
    },
}
</script>
<template>
    <div>
        <div class="plan-detail">
            <div class="plan-detail-left">
                <ul>
                    <li>
                        <span>公司名称：</span>
                        <em>{{detail.cName}}</em>
                    </li>
                    <li>
                        <span>联系人：</span>
                        <em>{{detail.cuName}}</em>
                    </li>
                    <li>
                        <span>现金结算：</span>
                        <em>¥ {{detail.pdTotal}}</em>
                    </li>
                    <li>
                        <span>公司品牌：</span>
                        <em>{{detail.bTitle}}</em>
                    </li>
                    <li>
                        <span>投放城市：</span>
                        <em>{{filter(detail.rIDs)}}</em>
                    </li>
                    <li>
                        <span>资源置换：</span>
                        <em>¥ {{detail.pdSendFee}}</em>
                    </li>
                    <li>
                        <span>所属销售：</span>
                        <em>{{detail.realName}}</em>
                    </li>
                    <!-- <li>
                        <span>方案备注：</span>
                        <em>{{detail.apRemark}}</em>
                    </li> -->
                    <li>
                        <span>其他费用：</span>
                        <em>¥ {{detail.pdOtherFee}}</em>
                    </li>
                </ul>
            </div>
            <div class="plan-detail-right">
                <dl>
                    <dt>状态</dt>
                    <dd>{{stateToText(detail.apState)}}</dd>
                </dl>
                <dl>
                    <dt>方案金额</dt>
                    <dd>¥ {{detail.Total}}</dd>
                </dl>
            </div>
        </div>
    </div>
</template>
<style scoped>
.plan-detail {
    font-size: 14px;
    color: #333333;
    padding-left: 41px;
}

.plan-detail-left {
    float: left;
    width: 78%;
}

.plan-detail-left ul {
    width: 100%;
    float: left;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.plan-detail-left ul li {
    float: left;
    width: 280px;
    margin-bottom: 12px;
}

.plan-detail-left ul li:nth-child(3n-2) {
    /*width: 350px;*/
}

.plan-detail-left ul li:nth-child(3n-1) {
    /*width: 248px;*/
}

.plan-detail-left ul li em {
    font-size: 14px;
    color: #666666;
}

.plan-detail-right {
    display: flex;
    justify-content: space-between;
    width: 21%;
    float: right;
}

.plan-detail-right dl {
    float: left;
    text-align: right;
}

.plan-detail-right dt {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
}

.plan-detail-right dd {
    margin-top: 4px;
    display: inline-block;
    font-size: 20px;
    color: rgba(0, 0, 0, 0.85);
    font-weight: bold;
}
/*1920*/
@media all and (min-width: 1900px) {
    .plan-detail-left ul li {
        width: 400px;
    }

    .plan-detail-right {
        width: 15%;
    }
}
</style>

