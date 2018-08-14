<script>
import {
    Select,
    Option,
    Table,
    TableColumn,
    DatePicker,
    Button
} from "element-ui";
export default {
    components: {
        elSelect: Select,
        elOption: Option,
        elTable: Table,
        elTableColumn: TableColumn,
        elDatePicker: DatePicker,
        elButton: Button
    },
    data() {
        return {
            photoData: {
                hoppyType: [],
                resData: []
            },
            allHoppy: [
                { hId: 1, name: "通宵零售" },
                { hId: 2, name: "APP分类" },
                { hId: 3, name: "APP安装量" },
                { hId: 4, name: "房地产" },
                { hId: 5, name: "保险行业" },
                { hId: 6, name: "服装行业" }
            ],
            allResData: [
                {
                    resid: 1,
                    city: "广州市",
                    area: "越秀区",
                    resName: "越秀公园",
                    schedules: ["2018/06/06", "2018/06/09"]
                },
                {
                    resid: 2,
                    city: "广州市",
                    area: "天河区",
                    resName: "天河公园",
                    schedules: ["2018/06/08", "2018/06/09"]
                },
                {
                    resid: 3,
                    city: "广州市",
                    area: "海珠区",
                    resName: "海珠湖",
                    schedules: ["2018/06/07", "2018/06/09"]
                },
                {
                    resid: 4,
                    city: "珠海市",
                    area: "香洲区",
                    resName: "香洲公园",
                    schedules: ["2018/06/06", "2018/06/09"]
                },
                {
                    resid: 5,
                    city: "广州市",
                    area: "越秀区",
                    resName: "越秀公园",
                    schedules: ["2018/06/08", "2018/06/09"]
                },
                {
                    resid: 6,
                    city: "广州市",
                    area: "越秀区",
                    resName: "越秀公园",
                    schedules: ["2018/06/08", "2018/06/09"]
                },
                {
                    resid: 7,
                    city: "广州市",
                    area: "越秀区",
                    resName: "越秀公园",
                    schedules: ["2018/06/08", "2018/06/09"]
                },
                {
                    resid: 8,
                    city: "广州市",
                    area: "越秀区",
                    resName: "越秀公园",
                    schedules: ["2018/06/08", "2018/06/09"]
                },
                {
                    resid: 9,
                    city: "广州市",
                    area: "越秀区",
                    resName: "越秀公园",
                    schedules: ["2018/06/08", "2018/06/09"]
                },
                {
                    resid: 10,
                    city: "广州市",
                    area: "越秀区",
                    resName: "越秀公园",
                    schedules: ["2018/06/08", "2018/06/09"]
                },
                {
                    resid: 11,
                    city: "广州市",
                    area: "越秀区",
                    resName: "越秀公园",
                    schedules: ["2018/06/08", "2018/06/09"]
                }
            ],
            keyword: "",
            date: ""
        };
    },
    methods: {
        cancel() {
            this.$emit("cancel");
        },
        apply() {
            let data = this.allResData;
            this.$emit("apply", data);
        },
        changeHoppy() {
            console.log("改变了消费偏好");
        },
        changeDate(date) {
            console.log(date);
        }
    }
};
</script>
<template>
	<div>
		<div>
			<div>
				<p>选择消费偏好</p>
				<el-select v-model="photoData.hoppyType" multiple placeholder="请选择消费偏好" @change="changeHoppy" size="mini" class="hoppy">
					<el-option v-for="item in allHoppy" :key="item.hId" :label="item.name" :value="item.hId">
					</el-option>
				</el-select>
			</div>

			<div class="search">
				<span style="display:inline-block;width:50%">
					<el-input placeholder="请输入社区名称" v-model="keyword" class="input_box"></el-input>
				</span>
				<span style="display:inline-block;width:49%;">
					<el-date-picker class="input_box date" v-model="date" type="daterange" range-separator="-" format="yyyy/MM/dd" value-format="yyyy/MM/dd" start-placeholder="创建日期" end-placeholder="创建日期">
					</el-date-picker>
				</span>
			</div>
			<div class="table_content">
				<p>选择开通社区（1/300）</p>
				<el-table :data="allResData" style="width: 100%" border>
					<el-table-column type="selection" width="35">
					</el-table-column>
					<el-table-column prop="city" label="城市" width="100">
					</el-table-column>
					<el-table-column prop="area" label="区域" width="100">
					</el-table-column>
					<el-table-column prop="resName" label="社区名称" width="120">
					</el-table-column>
					<el-table-column label="">
						<template slot-scope="scope">
							<el-date-picker v-model="scope.row.schedules" type="daterange" range-separator="-" format="yyyy/MM/dd" value-format="yyyy/MM/dd" @change="changeDate(scope.row)">
							</el-date-picker>
						</template>
					</el-table-column>
				</el-table>
				<p class="priceInfo">
					<i class="fa fa-info-circle"></i> 总计：
					<span>￥</span>
					<span>299.00</span>
				</p>
			</div>
		</div>
		<span slot="footer" class="dialog-footer">
			<el-button @click="cancel()" size="mini">取消</el-button>
			<el-button type="primary" @click="apply" size="mini">确 定</el-button>
		</span>
	</div>
</template>
<style scoped>
/* .el-dialog__body{
      padding: 10px 20px;
  } */
.hoppy {
    width: 50%;
}
/deep/ .hoppy .el-input__inner {
    width: 100%;
    min-height: 34px;
}
.search {
    margin-top: 10px;
}
.input_box /deep/ .el-input__inner {
    /* font-size: 14px; */
    height: 34px;
    vertical-align: middle;
    width: 100%;
}
.date {
    width: 100%;
    /* margin-top: 8px;  */
}
/deep/.dialog-footer {
    display: block;
    text-align: right;
    margin-top: 20px;
}
.table_content {
    margin-top: 10px;
}
.search /deep/.el-date-editor {
    margin-top: 8px;
}
/deep/ .el-range-editor .el-range-input {
    width: 100px;
}
.priceInfo {
    text-align: right;
    margin-top: 18px;
}
.priceInfo span {
    font-size: 24px;
    font-weight: bold;
}
</style>
