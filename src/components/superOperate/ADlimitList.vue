<template>
  <div class="ad_mediaDetail_wrap clearfix">
    <div class="ad_mediaDetail_nav ">
      <p class="clearfix"><a href="#">广告限制</a></p>
    </div>
    <div class="mediaList_wrap">
      <div class="mediaList_head">
        <h2>广告限制列表</h2>
      </div>
      <div class="mediaList_container">
        <div class="table_wrap">
          <el-table
            border
            :data="ADlist"
            style="width: 100%"
            :default-sort = "{prop: 'date', order: 'descending'}"
          >
            <el-table-column
              label="限制类型"
              min-width="11.6%"
            >
              <template slot-scope="scope">
                <span class="data" v-model="scope.row.limitType" v-if="!scope.row.showInput">{{scope.row.limitType}}</span>
                <el-input v-model="scope.row.typeUpdate" placeholder="请输入内容" v-if="scope.row.showInput"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              label="描述"
              min-width="62.2%"
            >
              <template slot-scope="scope">
                <span class="data" v-model="scope.row.detail" v-if="!scope.row.showInput">{{scope.row.detail}}</span>
                <el-input v-model="scope.row.detailUpdate" placeholder="请输入内容" class=" longText" v-if="scope.row.showInput"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="createDate"
              label="创建日期"
              min-width="7.4%"
            >
            </el-table-column>
            <el-table-column
              label="操作"
              min-width="7.1%"
            >
              <template slot-scope="scope">
                <div v-if="!scope.row.changeBtn">
                  <el-button type="text" size="small" class="editAD" @click.native.prevent="editAD(scope.$index, ADlist)">编辑</el-button>
                  <el-button type="text" size="small" @click.native.prevent="deleteRow(scope.$index, ADlist)" >删除</el-button>
                </div>
                <div v-if="scope.row.changeBtn">
                  <el-button type="text" size="small" class="saveAD"  @click.native.prevent="saveAD(scope.$index, ADlist)">保存</el-button>
                  <el-button type="text" size="small" class="cancelAD" @click.native.prevent="cancelAD(scope.$index, ADlist)">取消</el-button>
                </div>

              </template>
            </el-table-column>
          </el-table>
          <div>
            <div class="addAdlimit">+ 新增广告类型</div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { Table, TableColumn, Input, Button, MessageBox, Message } from 'element-ui';
export default {
	name: "ADlimit",
	components: {
		elTable: Table,
		elTableColumn: TableColumn,
		elInput: Input,
		elButton: Button,
	},
	data() {
		return {
			/*showInput:false,
			changeBtn:false,
			typeUpdate:'',
			detailUpdate:'',*/
			//表格
			ADlist: [{
				limitType: '地产',
				detail: '地产指在一定的土地所有制关系下作为财产的土地。简单的说，就是在法律上有明确的权属关系的土地财产',
				createDate: '2017.09.09',
				showInput:false,
				changeBtn:false,
				typeUpdate:'',
				detailUpdate:'',
			}, {
				limitType: '医疗',
				detail: '地产指在一定的土地所有制关系下作为财产的土地。简单的说，就是在法律上有明确的权属关系的土地财产',
				createDate: '2017.09.09',
				showInput:false,
				changeBtn:false,
				typeUpdate:'',
				detailUpdate:'',

			}, {
				limitType: '美容',
				detail: '地产指在一定的土地所有制关系下作为财产的土地。简单的说，就是在法律上有明确的权属关系的土地财产',
				createDate: '2017.09.09',
				showInput:false,
				changeBtn:false,
				typeUpdate:'',
				detailUpdate:'',

			}, {
				limitType: '餐饮',
				detail: '地产指在一定的土地所有制关系下作为财产的土地。简单的说，就是在法律上有明确的权属关系的土地财产',
				createDate: '2017.09.09',
				showInput:false,
				changeBtn:false,
				typeUpdate:'',
				detailUpdate:'',

			}, {
				limitType: '食品',
				detail: '地产指在一定的土地所有制关系下作为财产的土地。简单的说，就是在法律上有明确的权属关系的土地财产',
				createDate: '2017.09.09',
				showInput:false,
				changeBtn:false,
				typeUpdate:'',
				detailUpdate:'',

			}, {
				limitType: '金融',
				detail: '地产指在一定的土地所有制关系下作为财产的土地。简单的说，就是在法律上有明确的权属关系的土地财产',
				createDate: '2017.09.09',
				showInput:false,
				changeBtn:false,
				typeUpdate:'',
				detailUpdate:'',

			}, {
				limitType: '汽车',
				detail: '地产指在一定的土地所有制关系下作为财产的土地。简单的说，就是在法律上有明确的权属关系的土地财产',
				createDate: '2017.09.09',
				showInput:false,
				changeBtn:false,
				typeUpdate:'',
				detailUpdate:'',

			}]
		}
	},
	methods:{
		//删除
		deleteRow(index, rows){
			MessageBox.confirm('确定要删除这条数据吗？', '提示', {
				confirmButtonText:'确定',
				cancelButtonText:'取消',
				type:'warning'
			}).then(()=>{
				//后台
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
		editAD(index){
			this.ADlist[index].typeUpdate = this.ADlist[index].limitType;
			this.ADlist[index].detailUpdate = this.ADlist[index].detail;
			//切换输入框和操作类型的显示
			this.ADlist[index].showInput = !this.ADlist[index].showInput;
			this.ADlist[index].changeBtn = !this.ADlist[index].changeBtn;
		},
		//保存
		saveAD(index){
			//数据保存到后台然后重新渲染
			/* this.$http.get('/user?ID=12345')
			.then(function(res){
				console.log(res);
			})
			.catch(function(err){
				console.log(err);
			});*/

			//前端显示
			this.ADlist[index].limitType = this.ADlist[index].typeUpdate;
			this.ADlist[index].detail = this.ADlist[index].detailUpdate;

			//切换输入框和操作类型的显示
			this.ADlist[index].showInput = !this.ADlist[index].showInput;
			this.ADlist[index].changeBtn = !this.ADlist[index].changeBtn;
		},
		//取消
		cancelAD(index){
			//切换输入框和操作类型的显示
			this.ADlist[index].showInput = !this.ADlist[index].showInput;
			this.ADlist[index].changeBtn = !this.ADlist[index].changeBtn;
		}

	}
}

/* $(function () {
	//编辑
	$(".editAD").click(function() {
	$(this).parents('tr').find('.data').hide();
	$(this).parents('tr').find('.changeInput').show();
	//显示保存取消
	$(this).parent('div').hide().siblings('div').show();
	});
	//取消PP
	$('.cancelAD').click(function () {
	//显示编辑
	$(this).parent('div').hide().siblings().show();
	//  隐藏下拉框
	$(this).parents('tr').find('.data').show();
	$(this).parents('tr').find('.changeInput').hide();
	});

})*/
</script>

<style scoped>
	.changeInput{
		width: 95%;
		display: none;
	}

	/*筛选*/
	.el-checkbox+.el-checkbox{
		margin-left: 0;
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
		width: 100%;
		height: 30px;

	}



	/deep/ .el-date-editor .el-range__icon{
		position: absolute;
		right: 10px;
		top: 0;
	}
	/deep/.el-picker-panel .el-date-range-picker .el-popper{
		left: 335px !important;
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

	.tar{
		text-align: right!important;
		padding-right: 10px;
	}

	/deep/ .el-dropdown .el-button-group .el-button{
		height: 28px;

	}

	/*新增刊例价*/
	.addAdlimit{
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
