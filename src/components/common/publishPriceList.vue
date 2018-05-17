<template>
  <div class="ad_mediaDetail_wrap clearfix">
    <div class="ad_mediaDetail_nav ">
      <p class="clearfix"><a href="#">刊例价</a></p>
    </div>
    <div class="mediaList_wrap">
      <div class="mediaList_head">
        <h2>刊例价列表</h2>
      </div>
      <div class="mediaList_container">
        <div class="table_wrap">
          <el-table
            border
            :data="publishPriceList"
            style="width: 100%"
            :default-sort = "{prop: 'date', order: 'descending'}"
          >
            <el-table-column
              label="城市"
              min-width="31.3%"
              :filters="[
              { text: '北京', value: '北京' },
              { text: '上海', value: '上海' },
              { text: '深圳', value: '深圳' },
              { text: '成都', value: '成都' },
              ]"
              :filter-method="filterCity"
              :filter-multiple="false"
            >
              <template slot-scope="scope">
                <span class="data" v-model="scope.row.city" v-if="!scope.row.showInput">{{scope.row.city}}</span>
                <el-select v-model="scope.row.cityUpdate" placeholder=""  v-if="scope.row.showInput">
                  <el-option label="北京" value="北京"></el-option>
                  <el-option label="上海" value="上海"></el-option>
                  <el-option label="深圳" value="深圳"></el-option>
                  <el-option label="广州" value="广州"></el-option>
                  <el-option label="成都" value="成都"></el-option>
                </el-select>
              </template>

            </el-table-column>
            <el-table-column
              label="媒体"
              min-width="62.2%"
              :filters="[
              { text: '社区广告门', value: '社区广告门' },
              { text: '电梯广告', value: '电梯广告' },
              { text: '待维修', value: '待维修' },
              { text: '禁用', value: '禁用' },
              ]"
              :filter-method="filterMedia"
              :filter-multiple="false"
            >
              <template slot-scope="scope">
                <span class="data" v-model="scope.row.media" v-if="!scope.row.showInput">{{scope.row.media}}</span>
                <el-select v-model="scope.row.mediaUpdate" placeholder=""  v-if="scope.row.showInput">
                  <el-option label="社区门" value="社区门"></el-option>
                  <el-option label="广告门" value="广告门"></el-option>
                  <el-option label="什么门" value="什么门"></el-option>
                  <el-option label="电梯门" value="电梯门"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              class="tar"
              prop="publicPrice"
              label="刊例价"
              min-width="34.3%"
            >
              <template slot-scope="scope">
                <span class="data" v-model="scope.row.publicPrice" v-if="!scope.row.showInput">{{scope.row.publicPrice}}</span>
                <el-input v-model="scope.row.priceUpdate"  placeholder="请输入内容" class=" tar" v-if="scope.row.showInput"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              min-width="22.6%"
            >
              <template slot-scope="scope">
                <div v-if="!scope.row.changeBtn">
                  <el-button type="text" size="small" @click.native.prevent="editPP(scope.$index, publishPriceList)">编辑</el-button>
                  <el-button type="text" size="small" @click.native.prevent="deleteRow(scope.$index, publishPriceList)">删除</el-button>
                </div>
                <div v-if="scope.row.changeBtn">
                  <el-button type="text" size="small" class="savePP" @click.native.prevent="savePP(scope.$index, publishPriceList)">保存</el-button>
                  <el-button type="text" size="small" class="cancelPP" @click.native.prevent="cancelPP(scope.$index, publishPriceList)">取消</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div>
            <div class="addPublishPrice">+ 新增刊例价</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Button, Select, Option, Input, Table, TableColumn, MessageBox, Message} from 'element-ui';
export default {
	name: "publishPriceList",
	components:{
		elButton: Button,
		elSelect: Select,
		elOption: Option,
		elInput: Input,
		elTable: Table,
		elTableColumn: TableColumn,
	},
	data(){
		return {
			publishPriceList:[{
				city:'北京',
				media:'社区广告门',
				publicPrice:'￥3800',
				cityUpdate:'',
				mediaUpdate:'',
				priceUpdate:'',
				showInput:false,
				changeBtn:false,
			}, {
				city:'广州',
				media:'社区广告门',
				publicPrice:'￥3800',
				cityUpdate:'',
				mediaUpdate:'',
				priceUpdate:'',
				showInput:false,
				changeBtn:false,
			}, {
				city:'上海222',
				media:'电梯门',
				publicPrice:'￥3800',
				cityUpdate:'',
				mediaUpdate:'',
				priceUpdate:'',
				showInput:false,
				changeBtn:false,
			}, {
				city:'深圳',
				media:'社区广告门',
				publicPrice:'￥3800',
				cityUpdate:'',
				mediaUpdate:'',
				priceUpdate:'',
				showInput:false,
				changeBtn:false,
			}, {
				city:'重庆',
				media:'电梯门',
				publicPrice:'￥3800',
				cityUpdate:'',
				mediaUpdate:'',
				priceUpdate:'',
				showInput:false,
				changeBtn:false,
			}, {
				city:'成都',
				media:'社区广告门',
				publicPrice:'￥3800',
				cityUpdate:'',
				mediaUpdate:'',
				priceUpdate:'',
				showInput:false,
				changeBtn:false,
			}, {
				city:'上海上海',
				media:'社区广告门',
				publicPrice:'￥3800',
				cityUpdate:'',
				mediaUpdate:'',
				priceUpdate:'',
				showInput:false,
				changeBtn:false,
			}]
		}
	},
	methods:{
		filterCity(value, row) {
			return row.city === value;
		},
		filterMedia(value, row){
			return row.media === value;
		},
		//删除
		deleteRow(index, rows){
			MessageBox.confirm('确定要删除这条数据吗？', '提示', {
				confirmButtonText:'确定',
				cancelButtonText:'取消',
				type:'warning'
			}).then(()=>{
				//请求？
				rows.splice(index, 1);
				Message({
					type:'success',
					message:'删除成功！'
				});
			}).catch(()=>{
				Message({
					type:'info',
					message:'已取消删除'
				})
			})
		},
		//编辑
		editPP(index){
			this.publishPriceList[index].cityUpdate = this.publishPriceList[index].city;
			this.publishPriceList[index].mediaUpdate = this.publishPriceList[index].media;
			this.publishPriceList[index].priceUpdate = this.publishPriceList[index].publicPrice;
			//切换输入框和操作类型的显示
			this.publishPriceList[index].showInput = !this.publishPriceList[index].showInput;
			this.publishPriceList[index].changeBtn = !this.publishPriceList[index].changeBtn;
		},
		//保存
		savePP(index){
			//数据保存到后台然后重新渲染
			/* this.$http.get('/user?ID=12345')
				.then(function(res){
				console.log(res);
				})
				.catch(function(err){
				console.log(err);
				});*/

			//前端显示
			this.publishPriceList[index].city = this.publishPriceList[index].cityUpdate;
			this.publishPriceList[index].media = this.publishPriceList[index].mediaUpdate;
			this.publishPriceList[index].publicPrice = this.publishPriceList[index].priceUpdate;

			//切换输入框和操作类型的显示
			this.publishPriceList[index].showInput = !this.publishPriceList[index].showInput;
			this.publishPriceList[index].changeBtn = !this.publishPriceList[index].changeBtn;
		},
		//取消
		cancelPP(index){
			//切换输入框和操作类型的显示
			this.publishPriceList[index].showInput = !this.publishPriceList[index].showInput;
			this.publishPriceList[index].changeBtn = !this.publishPriceList[index].changeBtn;
		}
	}
}

/*$(function() {
	//编辑
	$(".editPP").click(function() {
	/!*var span = $(this).parents("div").find("span");
	var input = $(this).parents('div').find('input');
	for(var i = 0; i < span.length; i++) {
		var val = $(span).eq(i).text();
		input.eq(i).val(val);
	}
	input.show();*!/

	$(this).parents('tr').find('.data').hide();
	$(this).parents('tr').find('.changeInput').show();
	//显示保存取消
	$(this).parent('div').hide().siblings('div').show();
	});
	//取消PP
	$('.cancelPP').click(function () {
	//显示编辑
	$(this).parent('div').hide().siblings().show();
	//  隐藏下拉框
	$(this).parents('tr').find('.data').show();
	$(this).parents('tr').find('.changeInput').hide();

	});

	//保存PP

	//删除

	//添加
	$('.addAD').click(function () {
	console.log(123);
	})
})*/
</script>
<style scoped>

  .changeInput{
    width: 150px;
    display: none;
  }


    /*筛选*/
  .el-checkbox+.el-checkbox{
    margin-left: 0;
  }



  .typeBox p{
    height: 30px;
    font-size: 12px;
    text-align: center;
    line-height: 30px;
    border-top: 1px solid #cccccc;
  }

  /deep/ .el-checkbox__label{
    font-size: 10px;
    color: #8A8A8A;
  }



  /deep/ .el-input__inner{
    width: 100%;
    height: 30px;

  }

  /deep/.tar .el-input__inner{
    text-align: right;
  }


/deep/ .el-popper[x-placement^=bottom]{
  min-width: 9.6% !important;
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
    margin-bottom: 90px;
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

  .mediaList_wrap .mediaList_container .table_wrap{
    width: 1210px;
    margin: 10px 0 0 0;
    border-radius: 4px;
  }


  .table_wrap{
    width:1210px;
    border-radius: 4px;
    margin: 0 auto;
    margin-top: 20px;
  }



  /*表格*/
  /*select选中*/
  /deep/.el-select-dropdown__item.selected{
    color: #666666;
    font-weight: normal;
  }


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
    text-align: right;
  }

  /deep/.el-input{
    width: 150px;
    float: right;
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
  .tar /deep/ .el-table .cell{
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    float: right;
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



  .tar{
    text-align: right!important;
    padding-right: 10px;
  }

  /deep/ .el-dropdown .el-button-group .el-button{
    height: 28px;

  }

  /*新增刊例价*/
  .addPublishPrice{
    box-sizing: border-box;
    width: 100%;
    height: 32px;
    border: 1px dashed #D9D9D9;
    border-radius: 4px;
    text-align: center;
    line-height: 32px;
    cursor: pointer;
    margin-top: 10px;
    font-size: 14px;
    color: rgba(0,0,0,0.65)
  }


  /*1440*/
  @media screen and (min-width: 1440px) {

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

  }


  /*1920*/
  @media screen and (min-width: 1920px) {

    .mediaList_wrap{
      width: 1800px!important;
      margin-bottom: 211px!important;
    }

    .mediaList_wrap .mediaList_container .table_wrap{
      width: 1764px!important;
    }


  }


</style>

