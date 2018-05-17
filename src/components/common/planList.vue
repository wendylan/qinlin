<template>
  <div class="ad_mediaDetail_wrap clearfix">
    <div class="ad_mediaDetail_nav ">
      <p class="clearfix"><a href="#">方案管理</a></p>
    </div>
    <div class="mediaList_wrap">
      <div class="mediaList_head">
        <h2>方案列表</h2>
      </div>
      <div class="mediaList_container">
        <el-row>
          <div class="mediaList_handel">
            <el-input  v-model="search" placeholder="客户/品牌/创建人/方案名"></el-input>
            <div class="block">
              <el-date-picker
                v-model="cDate"
                type="daterange"
                range-separator="-"
                start-placeholder="创建日期"
                end-placeholder="创建日期">
              </el-date-picker>
            </div>
            <el-button type="primary" icon="el-icon-search" @click="searchDate">搜索</el-button>
            <el-button plain>新建</el-button>
          </div>
        </el-row>
        <div class="table_wrap">
          <!--<ul>
            <li>方案名称</li>
            <li>客户名称</li>
            <li>方案价格</li>
            <li>手机号码</li>
            <li>公司名称</li>
            <li class="Csaixuan">所在城市
              <img  src="../../assets/mediaMana/ld.png" alt="">
              <div class="typeBox">
                <div class="ckboxH">
                  <el-checkbox label="">超级运营</el-checkbox>
                </div>
                <div class="ckboxH">
                  <el-checkbox label="">复选框 A</el-checkbox>
                </div>
                <div class="ckboxH">
                  <el-checkbox label="">复选框 A</el-checkbox>
                </div>
                <div class="ckboxH">
                  <el-checkbox label="">复选框 A</el-checkbox>
                </div>
                <div class="ckboxH">
                  <el-checkbox label="">复选框 A</el-checkbox>
                </div>
                <p><span class="rec_typeYes">清除</span><span class="rec_typeNo">确认</span></p>
              </div>
            </li>
            <li>公司品牌</li>
            <li>所有人</li>
            <li>创建日期</li>
            <li style="border-right: none;border-top-right-radius: 4px">
              操作
            </li>
          </ul>
          <div class="tr_wrap">
            <table class="adPanel_table" cellpadding="0" cellspacing="0">
              <tr>
                <td>成吉思汗</td>
                <td>成都</td>
                <td>城市总经理</td>
                <td>075586070000</td>
                <td>深圳市亲邻科技有限公司广州分公司</td>
                <td>广州</td>
                <td>亲邻团购/社区门禁</td>
                <td>欧阳震华</td>
                <td >2018.03.08</td>
                <td style="position: relative">
                  <a href="#" style="color: #0077D6">查看</a>
                </td>
              </tr>
              <tr>
                <td>成吉思汗</td>
                <td>成都</td>
                <td>城市总经理</td>
                <td>075586070000</td>
                <td>深圳市亲邻科技有限公司广州分公司</td>
                <td>广州</td>
                <td>亲邻团购/社区门禁</td>
                <td>欧阳震华</td>
                <td >2018.03.08</td>
                <td style="position: relative">
                  <a href="#" style="color: #0077D6">查看</a>
                </td>
              </tr>
              <tr>
                <td>成吉思汗</td>
                <td>成都</td>
                <td>城市总经理</td>
                <td>075586070000</td>
                <td>深圳市亲邻科技有限公司广州分公司</td>
                <td>广州</td>
                <td>亲邻团购/社区门禁</td>
                <td>欧阳震华</td>
                <td >2018.03.08</td>
                <td style="position: relative">
                  <a href="#" style="color: #0077D6">查看</a>
                </td>
              </tr>
              <tr>
                <td>成吉思汗</td>
                <td>成都</td>
                <td>城市总经理</td>
                <td>075586070000</td>
                <td>深圳市亲邻科技有限公司广州分公司</td>
                <td>广州</td>
                <td>亲邻团购/社区门禁</td>
                <td>欧阳震华</td>
                <td >2018.03.08</td>
                <td style="position: relative">
                  <a href="#" style="color: #0077D6">查看</a>
                </td>
              </tr>
              <tr>
                <td>成吉思汗</td>
                <td>成都</td>
                <td>城市总经理</td>
                <td>075586070000</td>
                <td>深圳市亲邻科技有限公司广州分公司</td>
                <td>广州</td>
                <td>亲邻团购/社区门禁</td>
                <td>欧阳震华</td>
                <td >2018.03.08</td>
                <td style="position: relative">
                  <a href="#" style="color: #0077D6">查看</a>
                </td>
              </tr>
              <tr>
                <td>成吉思汗</td>
                <td>成都</td>
                <td>城市总经理</td>
                <td>075586070000</td>
                <td>深圳市亲邻科技有限公司广州分公司</td>
                <td>广州</td>
                <td>亲邻团购/社区门禁</td>
                <td>欧阳震华</td>
                <td >2018.03.08</td>
                <td style="position: relative">
                  <a href="#" style="color: #0077D6">查看</a>
                </td>
              </tr>
              <tr>
                <td>成吉思汗</td>
                <td>成都</td>
                <td>城市总经理</td>
                <td>075586070000</td>
                <td>深圳市亲邻科技有限公司广州分公司</td>
                <td>广州</td>
                <td>亲邻团购/社区门禁</td>
                <td>欧阳震华</td>
                <td >2018.03.08</td>
                <td style="position: relative">
                  <a href="#" style="color: #0077D6">查看</a>
                </td>
              </tr>
              <tr>
                <td>成吉思汗</td>
                <td>成都</td>
                <td>城市总经理</td>
                <td>075586070000</td>
                <td>深圳市亲邻科技有限公司广州分公司</td>
                <td>广州</td>
                <td>亲邻团购/社区门禁</td>
                <td>欧阳震华</td>
                <td >2018.03.08</td>
                <td style="position: relative">
                  <a href="#" style="color: #0077D6">查看</a>
                </td>
              </tr>
              <tr>
                <td>成吉思汗</td>
                <td>成都</td>
                <td>城市总经理</td>
                <td>075586070000</td>
                <td>深圳市亲邻科技有限公司广州分公司</td>
                <td>广州</td>
                <td>亲邻团购/社区门禁</td>
                <td>欧阳震华</td>
                <td >2018.03.08</td>
                <td style="position: relative">
                  <a href="#" style="color: #0077D6">查看</a>
                </td>
              </tr>
              <tr>
                <td>成吉思汗</td>
                <td>成都</td>
                <td>城市总经理</td>
                <td>075586070000</td>
                <td>深圳市亲邻科技有限公司广州分公司</td>
                <td>广州</td>
                <td>亲邻团购/社区门禁</td>
                <td>欧阳震华</td>
                <td >2018.03.08</td>
                <td style="position: relative">
                  <a href="#" style="color: #0077D6">查看</a>
                </td>
              </tr>
              <tr>
                <td>成吉思汗</td>
                <td>成都</td>
                <td>城市总经理</td>
                <td>075586070000</td>
                <td>深圳市亲邻科技有限公司广州分公司</td>
                <td>广州</td>
                <td>亲邻团购/社区门禁</td>
                <td>欧阳震华</td>
                <td >2018.03.08</td>
                <td style="position: relative">
                  <a href="#" style="color: #0077D6">查看</a>
                </td>
              </tr>
              <tr>
                <td>成吉思汗</td>
                <td>成都</td>
                <td>城市总经理</td>
                <td>075586070000</td>
                <td>深圳市亲邻科技有限公司广州分公司</td>
                <td>广州</td>
                <td>亲邻团购/社区门禁</td>
                <td>欧阳震华</td>
                <td >2018.03.08</td>
                <td style="position: relative">
                  <a href="#" style="color: #0077D6">查看</a>
                </td>
              </tr>
              <tr>
                <td>成吉思汗</td>
                <td>成都</td>
                <td>城市总经理</td>
                <td>075586070000</td>
                <td>深圳市亲邻科技有限公司广州分公司</td>
                <td>广州</td>
                <td>亲邻团购/社区门禁</td>
                <td>欧阳震华</td>
                <td >2018.03.08</td>
                <td style="position: relative">
                  <a href="#" style="color: #0077D6">查看</a>
                </td>
              </tr>
              <tr>
                <td>成吉思汗</td>
                <td>成都</td>
                <td>城市总经理</td>
                <td>075586070000</td>
                <td>深圳市亲邻科技有限公司广州分公司</td>
                <td>广州</td>
                <td>亲邻团购/社区门禁</td>
                <td>欧阳震华</td>
                <td >2018.03.08</td>
                <td style="position: relative">
                  <a href="#" style="color: #0077D6">查看</a>
                </td>
              </tr>
              <tr>
                <td>成吉思汗</td>
                <td>成都</td>
                <td>城市总经理</td>
                <td>075586070000</td>
                <td>深圳市亲邻科技有限公司广州分公司</td>
                <td>广州</td>
                <td>亲邻团购/社区门禁</td>
                <td>欧阳震华</td>
                <td >2018.03.08</td>
                <td style="position: relative">
                  <a href="#" style="color: #0077D6">查看</a>
                </td>
              </tr>
              <tr>
                <td>成吉思汗</td>
                <td>成都</td>
                <td>城市总经理</td>
                <td>075586070000</td>
                <td>深圳市亲邻科技有限公司广州分公司</td>
                <td>广州</td>
                <td>亲邻团购/社区门禁</td>
                <td>欧阳震华</td>
                <td >2018.03.08</td>
                <td style="position: relative">
                  <a href="#" style="color: #0077D6">查看</a>
                </td>
              </tr>
              <tr>
                <td>成吉思汗</td>
                <td>成都</td>
                <td>城市总经理</td>
                <td>075586070000</td>
                <td>深圳市亲邻科技有限公司广州分公司</td>
                <td>广州</td>
                <td>亲邻团购/社区门禁</td>
                <td>欧阳震华</td>
                <td >2018.03.08</td>
                <td style="position: relative">
                  <a href="#" style="color: #0077D6">查看</a>
                </td>
              </tr>
              <tr>
                <td>成吉思汗</td>
                <td>成都</td>
                <td>城市总经理</td>
                <td>075586070000</td>
                <td>深圳市亲邻科技有限公司广州分公司</td>
                <td>广州</td>
                <td>亲邻团购/社区门禁</td>
                <td>欧阳震华</td>
                <td >2018.03.08</td>
                <td style="position: relative">
                  <a href="#" style="color: #0077D6">查看</a>
                </td>
              </tr>
              <tr>
                <td>成吉思汗</td>
                <td>成都</td>
                <td>城市总经理</td>
                <td>075586070000</td>
                <td>深圳市亲邻科技有限公司广州分公司</td>
                <td>广州</td>
                <td>亲邻团购/社区门禁</td>
                <td>欧阳震华</td>
                <td >2018.03.08</td>
                <td style="position: relative">
                  <a href="#" style="color: #0077D6">查看</a>
                </td>
              </tr>
              <tr>
                <td>成吉思汗</td>
                <td>成都</td>
                <td>城市总经理</td>
                <td>075586070000</td>
                <td>深圳市亲邻科技有限公司广州分公司</td>
                <td>广州</td>
                <td>亲邻团购/社区门禁</td>
                <td>欧阳震华</td>
                <td >2018.03.08</td>
                <td style="position: relative">
                  <a href="#" style="color: #0077D6">查看</a>
                </td>
              </tr>
            </table>
          </div>-->
          <el-table
            border
            :data="planList"
            style="width: 100%"
            :default-sort = "{prop: 'date', order: 'descending'}"
          >
            <el-table-column
              prop="planName"
              label="方案名称"
              min-width="14.9%"
            >
            </el-table-column>
            <el-table-column
              prop="clientName"
              label="客户名称" 
              min-width="12.6%"
            >
				<template slot-scope="scope">
					<el-tooltip class="item" effect="dark" :content="scope.row.clientName" placement="bottom">
						<span title="">{{scope.row.clientName}}</span>
					</el-tooltip>
              </template>
            </el-table-column>
			<el-table-column
              prop="brandName"
              label="品牌名称"
              min-width="6.6%"
            >
            </el-table-column>
            <el-table-column
              prop="planPrice"
              label="方案价格"
              sortable

              class="tar"
              min-width="8.3%"
            >
            </el-table-column>
            <el-table-column
              prop="owner"
              label="所有人"
              min-width="6.1%"
            >
            </el-table-column>
            <el-table-column
              label="投放城市(点位面数，周期，排期)"
              min-width="23.6%"
            >
                <template slot-scope="scope">
                    <p>{{scope.row.city.split(':')[0]}} </p>
                    <!-- <p>{{scope.row.city.split(':')[1]}} <img class="img_box"src="../../assets/mediaMana/lock.png" alt=""></p> -->
                    <p>{{scope.row.city.split(':')[1]}} <i class="fa fa-lock fa-lg" style="color:#999;"></i></p>
                </template>
            </el-table-column>
            <el-table-column
              prop="createDate"
              label="创建日期"
              sortable
              min-width="7.3%"
            >
            </el-table-column>
            <el-table-column
              class="tac"
              prop="Status"
              label="状态"
              min-width="6.1%"
              :filters="[
              { text: '进行中', value: '进行中' },
              { text: '预锁中', value: '预锁中' },
              { text: '已完成', value: '已完成' },
              { text: '未投放', value: '未投放' },
              { text: '强制停止', value: '强制停止' }
              ]"
              :filter-method="filterStatus"
              :filter-multiple="false"
            >
            </el-table-column>
            <el-table-column
              label="操作"
              min-width="8.4%"
            >
              <template slot-scope="scope">
                <el-dropdown size="small" split-button trigger="click" @click="showStatus">
                  操作
                  <el-dropdown-menu slot="dropdown" >
                    <el-dropdown-item @click.native.prevent="preload">预锁</el-dropdown-item>
                    <el-dropdown-item>发布</el-dropdown-item>
                    <el-dropdown-item disabled="disabled">解除预锁</el-dropdown-item>
                    <el-dropdown-item>删除</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
          </el-table>
        </div>
        
        <el-dialog
            title="请选择预锁城市"
            :visible.sync="dialogVisible"
            width="30%"
            >
            <el-checkbox-group v-model="cityChoose">
                <el-checkbox label="广州市" checked border></el-checkbox>
                <el-checkbox label="深圳市" border></el-checkbox>
            </el-checkbox-group>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelLock">取 消</el-button>
                <el-button type="primary" @click="confirmLock">确 定</el-button>
            </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { Button, CheckboxGroup, Checkbox, Input, Dropdown, DropdownItem, DropdownMenu, Row, Table, TableColumn, DatePicker,Tooltip, Dialog } from 'element-ui';
export default {
	name: "projectList",
	components:{
		elButton: Button,
		elCheckboxGroup: CheckboxGroup,
		elCheckbox: Checkbox,
		elInput: Input,
		elDropdown: Dropdown,
		elDropdownItem: DropdownItem,
		elDropdownMenu: DropdownMenu,
		elRow: Row,
		elTable: Table,
		elTableColumn: TableColumn,
		elDatePicker: DatePicker,
		elTooltip: Tooltip,
		elDialog: Dialog,
	},
	data() {
		return {
			dialogVisible: false,
			cityChoose:[],
			cDate: '',
			search: '',
			//表格
			planList: [{
				planName: '新世界百货二月投放方案2.0',
				clientName: '北京通瑞万华置业北京通瑞万华置业',
				brandName: '亲邻科技',
				planPrice: '￥3,2000,000',
				owner:'李总大人',
				city:'广州市(300面,12周10天,2017.09.10-2017.10.1):深圳市(300面,12周10天,2017.09.10-2017.10.1)',
				createDate:'2018.08.30',
				Status:'进行中',
			}, {
				planName: '新世界百货一月投放方案1.0',
				clientName: '北京通瑞万华置业北京通瑞万华置业',
				brandName: '亲邻科技',
				planPrice: '￥3,2000,000',
				owner:'李总大人',
				city:'广州市(300面,12周10天,2017.09.10-2017.10.1)',
				createDate:'2018.08.30',
				Status:'未投放',
			}, {
				planName: '新世界百货二月投放方案2.0',
				clientName: '北京通瑞万华置业北京通瑞万华置业',
				brandName: '亲邻科技',
				planPrice: '￥3,2000,000',
				owner:'李总大人',
				city:'广州市(300面,12周10天,2017.09.10-2017.10.1)',
				createDate:'2018.08.30',
				Status:'进行中',
			}, {
				planName: '新世界百货二月投放方案2.0',
				clientName: '北京通瑞万华置业北京通瑞万华置业',
				brandName: '亲邻科技',
				planPrice: '￥3,2000,000',
				owner:'李总大人',
				city:'广州市(300面,12周10天,2017.09.10-2017.10.1)',
				createDate:'2018.08.30',
				Status:'预锁中',
			}, {
				planName: '新世界百货二月投放方案2.0',
				clientName: '北京通瑞万华置业北京通瑞万华置业',
				brandName: '亲邻科技',
				planPrice: '￥3,2000,000',
				owner:'李总大人',
				city:'广州市(300面,12周10天,2017.09.10-2017.10.1)',
				createDate:'2018.08.30',
				Status:'未投放',
			}, {
				planName: '新世界百货二月投放方案2.0',
				clientName: '北京通瑞万华置业北京通瑞万华置业',
				brandName: '亲邻科技',
				planPrice: '￥3,2000,000',
				owner:'李总大人',
				city:'广州市(300面,12周10天,2017.09.10-2017.10.1)',
				createDate:'2018.08.30',
				Status:'进行中',
			}, {
				planName: '新世界百货二月投放方案2.0',
				clientName: '北京通瑞万华置业北京通瑞万华置业',
				brandName: '亲邻科技',
				planPrice: '￥3,2000,000',
				owner:'李总大人',
				city:'广州市(300面,12周10天,2017.09.10-2017.10.1)',
				createDate:'2018.08.30',
				Status:'进行中',
			}, {
				planName: '新世界百货二月投放方案2.0',
				clientName: '北京通瑞万华置业北京通瑞万华置业',
				brandName: '亲邻科技',
				planPrice: '￥3,2000,000',
				owner:'李总大人',
				city:'广州市(300面,12周10天,2017.09.10-2017.10.1)',
				createDate:'2018.08.30',
				Status:'进行中',
			}, {
				planName: '新世界百货二月投放方案2.0',
				clientName: '北京通瑞万华置业北京通瑞万华置业',
				brandName: '亲邻科技',
				planPrice: '￥3,2000,000',
				owner:'李总大人',
				city:'广州市(300面,12周10天,2017.09.10-2017.10.1)',
				createDate:'2018.08.30',
				Status:'进行中',
			}, {
				planName: '新世界百货二月投放方案2.0',
				clientName: '北京通瑞万华置业北京通瑞万华置业',
				brandName: '亲邻科技',
				planPrice: '￥3,2000,000',
				owner:'李总大人',
				city:'广州市(300面,12周10天,2017.09.10-2017.10.1)',
				createDate:'2018.08.30',
				Status:'进行中',
			}]
		}
	},
	methods: {
		//筛选
		filterStatus(value, row) {
			return row.Status === value;
		},
		//状态
		showStatus(){
			console.log(this.planList.Status);
		},
		//确认框
		preload(e) {
			this.dialogVisible = true;
			// var Status = e.target.innerText;

			// this.$confirm(`<el-checkbox-group v-model="cityChoose">
			//                   <el-checkbox label="广州市" border></el-checkbox>
			//                   <el-checkbox label="深圳市" border></el-checkbox>
			//               </el-checkbox-group>`, '提示', {
			//   confirmButtonText: '确定',
			//   cancelButtonText: '取消',
			//   dangerouslyUseHTMLString: true,
			//   type: 'warning'
			// }).then(() => {
			//   //确定
			//   this.$message({
			//     type: 'success',
			//     message: '成功更改状态'
			//   });
			// }).catch(() => {
			//   this.$message({
			//     type: 'info',
			//     message: '已取消操作'
			//   })
			// })
		},
		cancelLock(){
			this.dialogVisible = false;
			this.$message({
				type: 'info',
				message: '已取消操作'
			});
		},
		confirmLock(){
			this.dialogVisible = false;
			this.$message({
				type: 'success',
				message: '成功更改状态'
			});
		},
	},
	//实时计算  数据发生变化时执行相应函数
	computed:{
		searchDate:function () {
			//输入框传入的值
			var search = this.search;
			if(search){
				//filter  数组的方法，返回回调函数中满足条件的值
				return this.planList.filter(function (plan) {
					//Object.keys(car) 返回一个数组，如果传入对象，返回对象的属性名集合
					//some() 数组的方法 用于检测数组中的元素是否满足指定条件，参数必需是函数。
					return Object.keys(plan).some(function (key) {
						//String 把对象的值转化成字符串
						//toLowerCase()字符串转换成小写
						//indexOf(search)>-1 输入框里输入的筛选内容存在符合条件的数据
						return String(plan[key]).toLowerCase().indexOf(search) > -1
					})
				})
			}
			return this.planList;
		}
	}
}

$(function (){
	window.onresize = function(){
		if($(window.width>=1366)){
			$('.el-table-filter').css({
				left:'1145'
			})
		}
	};
})
</script>

<style scoped>
  /*筛选*/
  .el-checkbox+.el-checkbox{
    margin-left: 0;
  }
  .Csaixuan{
    position: relative;
    cursor: pointer;
  }
  .Csaixuan .typeBox{
    width: 100px;
    height: 150px;
    border: 1px solid #108EE9;
    background-color: #ffffff;
    position: absolute;
    z-index: 999;
    border-radius: 4px;
    top: 36px;
    left: 56px;
    display: none;
  }

  .typeBox p{
    height: 30px;
    font-size: 12px;
    text-align: center;
    line-height: 30px;
    border-top: 1px solid #cccccc;
  }

  .rec_typeYes,.rec_typeNo{
    display: inline-block;
    width: 50px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    cursor: pointer;
    font-weight: normal;
    color: #108EE9;
  }

  .ckboxH{
    height: 24px;
    font-size: 14px;
    line-height: 23px;
    padding-left: 8px;

  }
  /deep/ .el-checkbox__label{
    font-size: 10px;
    color: #8A8A8A;
  }


  /*日期控件*/
  .block{
    display: inline-block;
    position: relative;
    top: 0px;
    margin-left: 63px;
  }
  /deep/ .el-input__inner{
    width: 237px;
    height: 34px;
  }


  /deep/ .el-date-editor .el-range__icon{
    position: absolute;
    right: 10px;
    top: 0;
  }


  /*面包屑导航*/
  .ad_mediaDetail_wrap{
    position: relative;

  }

  .ad_mediaDetail_nav p {
    padding-left: 57px;
    position: absolute;
    left: 0;
    top: 12px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    line-height: 18px;
  }


  .ad_mediaDetail_nav p a{
    color: #666;
  }

  .ad_mediaDetail_nav{
    height: 42px;
    position: relative;
  }

  /*wrap*/
  .mediaList_wrap{
    width: 1246px;
    background: #FFFFFF;
    border: 1px solid #E6E7E9;
    margin: 0 auto;
    margin-bottom: 46px;
  }

  .mediaList_wrap .mediaList_head{
    width: 100%;
    height: 24px;
    padding: 12px 0;
    border-bottom: 1px solid #E6E7E9;
  }

  .mediaList_wrap .mediaList_head h2{
    font-size: 16px;
    color: #2C313C;
    height: 24px;
    border-left: 2px solid #465D89;
    padding-left: 14px;
    font-weight: bold;
  }
  .mediaList_wrap .mediaList_container{
    width: 100%;
    padding: 18px;
  }

  .el-input{
    width: 180px;
    height: 34px!important;
    border-radius: 4px;
  }

  .el-button--primary{
    background-color: #108EE9;
  }

  .el-button{
    width: 76px;
    height: 34px;
    text-align: center;
    line-height: 34px;
    padding: 0;
    margin-left: 6px;
    position: relative;
    top: 1px;
    left: 0;
  }
  .mediaList_wrap .mediaList_container .table_wrap{
    width: 1210px;
    margin: 10px 0 0 0;
    border-radius: 4px;

  }
    /* .img_box{
        display: inline-block;
        width: 12px;
        height: 12px;
    } */

  /*表格*/
  /deep/.el-date-editor .el-range-separator{
    line-height: 26px;
  }

  /deep/.el-table th, .el-table tr{
    height: 44px;
    padding: 0;
    background-color: #f7f7f7;

  }
  /deep/ .el-table td{
    padding: 8px 0;
    overflow-x: hidden;
    text-overflow: ellipsis;
  }
 /deep/.el-table--border{
   border-radius: 4px;
 }

  /deep/ .el-table th>.cell{
    font-size: 14px;
    color: #666666;
    font-weight: bold;
  }
  /deep/ .el-table .caret-wrapper{
    width: 22px;
  }

  /deep/ .el-table_1_column_3 {
    text-align: right !important;
  }

  /deep/.el-table--enable-row-hover .el-table__body tr:hover>td{
    background-color: #ecf5ff;
  }

    /*滚动条*/
  /deep/ .el-table__body-wrapper{
    height: 405px;
    overflow-y: scroll;
    overflow-x: hidden;
  }
  /deep/ .el-table__body-wrapper::-webkit-scrollbar{
    width: 4px;
    background: #FAFAFA;

  }
  /deep/ .el-table__body-wrapper::-webkit-scrollbar-thumb {/*滚动条里面小方块*/

    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: #C1C1C1;
    border-radius: 4px;
  }
  /*超出省略*/
  /deep/ .el-table .cell{
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  /*筛选*/
  /deep/  .el-table__column-filter-trigger{
    margin-left: 10px;
  }
  /deep/.el-table th>.cell.highlight{
    color: #409EFF !important;
  }

  /deep/ div.el-table-filter{
    left: 1106px !important;
  }
  /*操作*/
  /deep/.el-button--mini, .el-button--small{
    font-size: 14px !important;
  }

  /deep/.el-button .el-button--primary .el-button--mini{
    width: 51px;
  }
  /deep/.el-dropdown-menu--mini .el-dropdown-menu__item{
    width: 65px;
  }


 /* .table_wrap{
    width:1210px;
    border-radius: 4px;
    border: 1px solid #E2E2E2;
    margin: 0 auto;
    margin-top: 20px;
  }

  .table_wrap .tr_wrap{
    width: 1208px;
    height: 409px;
    overflow-x:hidden;
    overflow-y: auto;
    position: relative;
    !* 隐藏上下箭头 *!

  }
  .tr_wrap::-webkit-scrollbar{
    width: 4px;
    background: #FAFAFA;

  }
  .tr_wrap::-webkit-scrollbar-thumb {!*滚动条里面小方块*!

    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: #C1C1C1;
    border-radius: 4px;
  }

  .adPanel_table{
    !*去掉间距*!
    !*   border-collapse: collapse;*!
    height: 40px;
    line-height: 40px;
    text-align: center;
    width:1210px;
    font-size: 14px;
    color: #666666;
    margin: 0 auto;
    border-radius: 4px;
    !*允许设置列宽*!
    table-layout: fixed;

  }

  .adPanel_table th{
    background-color: #f8f8f8;
    border-bottom: 1px solid #E2E2E2;
    border-right: 1px solid #E2E2E2;
    font-size: 14px;
    color: #666666;
    font-weight: bold;
    text-indent: 14px;
    box-sizing: border-box;
  }
  .table_wrap ul{
    width: 1210px;
    height: 42px;
  }
  .table_wrap ul li{
    float: left;
    font-size: 14px;
    color: #666666;
    font-weight: bold;
    height: 42px;
    background: #F7F7F7;
    text-align: left;
    line-height: 42px;
    padding-left: 14px;
    box-sizing: border-box;
    border-right: 1px solid #E9E9E9;
    border-bottom: 1px solid #e9e9e9;
  }

  .table_wrap ul li img{
    width: 10px;
    height: 10px;
    margin-left: 1px;
  }

  .table_wrap ul li:nth-child(1){
    width: 84px;
  }
  .table_wrap ul li:nth-child(2){
    width: 100px;
  }
  .table_wrap ul li:nth-child(3){
    width: 101px;
  }
  .table_wrap ul li:nth-child(4){
    width: 133px;
  }
  .table_wrap ul li:nth-child(5){
    width: 256px;
  }
  .table_wrap ul li:nth-child(6){
    width: 126px;
  }
  .table_wrap ul li:nth-child(7){
    width: 167px;
  }
  .table_wrap ul li:nth-child(8){
    width: 85px;
  }
  .table_wrap ul li:nth-child(9){
    width: 101px;
  }
  .table_wrap ul li:nth-child(10){
    width: 57px;
  }


  .adPanel_table tr td:nth-child(1){
    width: 82px;
  }
  .adPanel_table tr td:nth-child(2){
    width: 98px;
  }
  .adPanel_table tr td:nth-child(3){
    width: 99px;
  }
  .adPanel_table tr td:nth-child(4){
    width: 130px;
  }
  .adPanel_table tr td:nth-child(5){
    width: 252px;
  }
  .adPanel_table tr td:nth-child(6){
    width: 123px;
  }
  .adPanel_table tr td:nth-child(7){
    width: 165px;
  }
  .adPanel_table tr td:nth-child(8){
    width: 84px;
  }
  .adPanel_table tr td:nth-child(9){
    width: 100px;
  }
  .adPanel_table tr td:nth-child(10){
    width: 56px;
  }


  .adPanel_table td{
    border-right: 1px solid #E2E2E2;
    text-indent: 14px;
    text-align: left;

    border-bottom: 1px solid #E2E2E2;
  }
  .adPanel_table tr:last-child td{
    border-bottom:  none;
  }
*/

  .tar{
    text-align: right!important;
    padding-right: 10px;
  }

  /deep/ .el-dropdown .el-button-group .el-button{
    height: 28px;
    width: 54px;
    font-size: 14px;
    padding: 0;
  }
  /deep/.el-dropdown .el-button-group .el-button:last-child{
    width: 30px;
  }
  /deep/ .popper__arrow{
    display: none;
  }

  /deep/ .el-button:focus, /deep/ .el-button:hover{
    border: 1px solid #409eff;
    color: #409EFF;
    background-color: #ffffff;

  }




  /*1440*/
  @media screen and (min-width: 1440px) {
    /*.table_wrap ul li:nth-child(1){
      width: 84px;
    }
    .table_wrap ul li:nth-child(2){
      width: 100px;
    }
    .table_wrap ul li:nth-child(3){
      width: 101px;
    }
    .table_wrap ul li:nth-child(4){
      width: 133px;
    }
    .table_wrap ul li:nth-child(5){
      width: 316px;
    }
    .table_wrap ul li:nth-child(6){
      width: 126px;
    }
    .table_wrap ul li:nth-child(7){
      width: 181px;
    }
    .table_wrap ul li:nth-child(8){
      width: 85px;
    }
    .table_wrap ul li:nth-child(9){
      width: 101px;
    }
    .table_wrap ul li:nth-child(10){
      width: 57px;
    }


    .adPanel_table tr td:nth-child(1){
      width: 82px;
    }
    .adPanel_table tr td:nth-child(2){
      width: 98px;
    }
    .adPanel_table tr td:nth-child(3){
      width: 99px;
    }
    .adPanel_table tr td:nth-child(4){
      width: 130px;
    }
    .adPanel_table tr td:nth-child(5){
      width: 312px;
    }
    .adPanel_table tr td:nth-child(6){
      width: 123px;
    }
    .adPanel_table tr td:nth-child(7){
      width: 179px;
    }
    .adPanel_table tr td:nth-child(8){
      width: 84px;
    }
    .adPanel_table tr td:nth-child(9){
      width: 100px;
    }
    .adPanel_table tr td:nth-child(10){
      width: 56px;
    }*/


    .ad_mediaDetail_nav p {
      padding-left: 60px;
    }
    .mediaList_wrap{
      width: 1321.3px!important;
      margin-bottom: 177px!important;
    }

    .mediaList_wrap .mediaList_container .table_wrap{
      width: 1284px;
    }

   /* .table_wrap ul,.table_wrap .tr_wrap,.adPanel_table{
      width: 1284px;
    }*/
  }


  /*1920*/
  @media screen and (min-width: 1920px) {

    .mediaList_wrap{
      width: 1800px!important;
      margin-bottom: 250px!important;
    }

    .mediaList_wrap .mediaList_container .table_wrap{
      width: 1764px!important;
    }

 /*   .table_wrap ul,.table_wrap .tr_wrap,.adPanel_table{
      width: 1764px;
    }

    .table_wrap .tr_wrap{
      height: 450px;}*/

  }


</style>
