<template>
  <div>
    <div>
      <div class="ad_mediaMana_wrap">
        <div class="ad_mediaMana_nav clearfix">
          <p><a href="#">客户管理</a><em> / </em><a href="#">创建客户</a></p>
        </div>
        <!--客户信息-->
        <div class="mediaMana_content_top">
          <div class="content_top_wrap">
            <div class="content_top_head">
              <h2>客户信息</h2>
            </div>
            <div class="content_top_form_wrap">
              <el-form :model="clientForm" status-icon :rules="clientRules" ref="clientForm" label-width="100px"
                       class="demo-ruleForm">
                <el-form-item label="联系人:" prop="realname">
                  <el-input v-model="clientForm.realname" placeholder="请输入联系人姓名"></el-input>
                </el-form-item>
                <el-form-item label="账户名:" prop="sname">
                  <el-input v-model="clientForm.sname" placeholder="请输入账户名"></el-input>
                </el-form-item>
                <el-form-item label="职位:" prop="position">
                  <el-input v-model="clientForm.position" placeholder="请输入联系人职位"></el-input>
                </el-form-item>
                <el-form-item label="手机号码:" prop="phone">
                  <el-input v-model.number="clientForm.phone" maxlength="11" minlength="11" placeholder="请输入联系人手机号码"></el-input>
                </el-form-item>
                <el-form-item label="所在地:" prop="cityArr">
					<!-- <el-select v-model="clientForm.rid" placeholder="请选择活动区域">
						<el-option :label="item.rName" :value="item.rID" v-for="item of allProvince" :key="item.rID"></el-option>
					</el-select> -->
					<el-cascader
						:options="allProvince"
						v-model="clientForm.cityArr"
						separator="-"
						:show-all-levels="false"
						@change="seleProClient"
						@active-item-change="handleItemChange"
					></el-cascader>
				</el-form-item>
                <el-form-item label="邮箱:" prop="email">
                  <el-input v-model="clientForm.email" placeholder="请输入联系人邮箱"></el-input>
                </el-form-item>
                <el-form-item label="固定电话:" prop="telphone">
                  <el-input v-model="clientForm.telphone" placeholder="请输入联系人固定电话"></el-input>
                </el-form-item>
                <el-form-item label="事业部:" prop="division">
                  <el-input v-model="clientForm.division" placeholder="请输入联系人所属事业部"></el-input>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
        <!--公司信息-->
        <div class="mediaMana_content_bottom clearfix">
          <div class="content_bottom_wrap companyInfo">
            <div class="content_bottom_head">
              <h2>公司信息</h2>
            </div>
            <div class="content_bottom_form_wrap">
              <el-form :model="companyForm" status-icon :rules="companyRules" ref="companyForm" label-width="100px"
                       class="demo-ruleForm">
                <el-form-item label="公司名称:" prop="cName">
					<span v-if="isFill">{{companyForm.cName}} <el-button @click="selectAnother" size="mini">重选</el-button></span>
					<el-autocomplete
						v-else
						v-model="companyForm.cName"
						:fetch-suggestions="querySearchAsync"
						placeholder="请输入内容"
						@select="handleSelect"
						>
					</el-autocomplete>
				</el-form-item>
                <el-form-item label="公司品牌:" prop="cBrand" class="tags">
                  <el-tag
						v-for="tag in oldBrandTags"
						:key="tag.bID">
						{{tag.bTitle}}
                  </el-tag>
                  <el-tag
						v-for="(tag, index) in companyTags"
						:key="index"
						closable
						:disable-transitions="false"
						@close="handleClose(tag)">
						{{tag}}
                  </el-tag>
                  <el-input
						style="width: 90px"
						class="input-new-tag"
						v-if="inputVisible"
						v-model="inputValue"
						ref="saveTagInput"
						size="small"
						@keyup.enter.native="handleInputConfirm"
						@blur="handleInputConfirm"
                  >
                  </el-input>
                  <el-button v-else class="button-new-tag" size="small" @click="showInput">新增品牌</el-button>
                </el-form-item>
                <el-form-item label="行业分类:" prop="industryIdArr">
					<span v-if="isFill">{{companyForm.iName}}</span>
					<el-cascader v-else
						placeholder="试试搜索：互联网"
						:options="bussiness"
						v-model="companyForm.industryIdArr"
						filterable
						change-on-select
						@change="handleChange"
					></el-cascader>
				</el-form-item>
                <el-form-item label="公司地址:" prop="cAddress">
					<span v-if="isFill">{{companyForm.cAddress}}</span>
					<el-input v-else v-model="companyForm.cAddress" placeholder="请输入公司具体地址"></el-input>
				</el-form-item>
                <el-form-item label="所在城市:" prop="cityArr">
					<span v-if="isFill">{{companyForm.rName}}</span>
					<!-- <el-select v-else v-model="companyForm.rID" placeholder="请选择公司所在城市">
						<el-option :label="item.rName" :value="item.rID" v-for="item of allProvince" :key="item.rID"></el-option>
					</el-select> -->
					<el-cascader v-else
						:options="allProvince"
						v-model="companyForm.cityArr"
						separator="-"
						:show-all-levels="false"
						@change="seleProCom"
						@active-item-change="handleItemChange"
					></el-cascader>
				</el-form-item>
				<el-form-item label="备注:" prop="cRemark">
					<span v-if="isFill">{{companyForm.cRemark}}</span>
					<el-input v-else type="textarea" v-model="companyForm.cRemark" placeholder="请填写备注信息"></el-input>
				</el-form-item>
              </el-form>
            </div>
          </div>
          <div class="content_bottom_btn">
				<!-- <el-button type="primary" @click="submitData" :disabled="isAdd">创建</el-button> -->
				<el-button type="primary" @click="submitData">创建</el-button>
				<el-button @click="goBack">取消</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import api from '../../api/api.js';
// import areaToText from '../../commonFun/areaToText.js';
import areaToText from '../../commonFun/areaToText_new.js';
import region from '../../commonFun/areaPackage.js';
import industryToText from '../../commonFun/industryToText.js';
import { Form, FormItem, Input, Button, Cascader, Select, Option, Autocomplete, Tag, Message, MessageBox } from 'element-ui';
export default {
	name: "createClient",
	components:{
		elForm: Form,
		elFormItem: FormItem,
		elInput: Input,
		elButton: Button,
		elCascader: Cascader,
		elSelect: Select,
		elOption: Option,
		elAutocomplete: Autocomplete,
		elTag: Tag,
		elMessage: Message,
	},
	data() {
		var validateEmail=(rule, value, callback)=>{
			// var reg = new RegExp("^[a-zA-Z0-9]+([._\\-]*[a-zA-Z0-9])*@([a-zA-Z0-9]+[-a-zA-Z0-9]*[a-zA-Z0-9]+.){1,63}[a-zA-Z0-9]+$");
			// var reg = new RegExp("^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$");
			var reg = new RegExp("^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$");
			if(value){
				if (!reg.test(value)){
					callback(new Error('邮箱格式有误'));
				}else{
					callback();
				}
			}else{
				callback();
			}
		};
		var validateFixphone=(rule, value, callback)=>{
			var reg = new RegExp("^[0-9-]*$");
			if(value){
				if (!reg.test(value)){
					callback(new Error('只能输入"-",数字'));
				}else{
					callback();
				}
			}else{
				callback();
			}
		};
		var validatePhone = (rule, value, callback) => {
			let szReg= /^1[34578]\d{9}$/;
			if (!(szReg.test(value))) {
				callback(new Error('请输入正确的手机号码'));
			} else {
				callback();
			}
		};
		var validatesSname = (rule, value, callback) => {
			let szReg= /^[^\u4e00-\u9fa5]{0,}$/;
			if (!(szReg.test(value))) {
				callback(new Error('只能输入字母,数字,符号'));
			} else {
				callback();
			}
		};
		return {
			// 所有区域
			allProvince: [],
			// 是否有公司
			isFill: false,
			timeout:  null,
			//行业分类
			bussiness: [],
			// 搜索后获得到的公司
			allCompany: [],
			// 公司所对应的原来的品牌
			oldBrandTags: [],
			isAdd: false,
			//tags
			companyTags: [],
			inputVisible: false,
			inputValue: '',
			//表单
			clientForm: {
				// 选中之后的区域组合
				cityArr: [],
				realname: '',
				sname: '',
				position: '',
				phone: '',
				email: '',
				telphone: '',
				division: '',
				utype: 'AD',
				uwho: '',
				puid: ''
			},
			companyForm: {
				uid: '',
				cityArr: [],
				// 选中之后的行业组合
				industryIdArr: [],
				cName: '',
				cAddress: '',
				rName: '',
				cRemark: '',
				// 地区id
				rID: '',
				// 行业id
				iID: '',
				// 公司id
				cID: '',
				iName: ''
			},
			clientRules: {
				realname: [
					{required: true, message: '联系人不能为空', trigger: 'blur'},
					{ max: 30, message: '最多只能输入30个字节', trigger: 'blur' }
				],
				sname: [
					{required: true, message: '账户名不能为空', trigger: 'blur'},
					{ max: 50, message: '最多只能输入50个字节', trigger: 'blur' },
					{validator: validatesSname, trigger: 'blur'}
				],
				position: [
					{required: true, message: '职位不能为空', trigger: 'blur'},
					{ max: 30, message: '最多只能输入30个字节', trigger: 'blur' }
				],
				phone: [
					{required: true, message: '手机号码不能为空', trigger: 'blur'},
					{ type:'number', message:'只能输入数字', trigger:'blur'},
					{validator: validatePhone, trigger: 'blur'}
				],
				email: [
					// {required: false, trigger: 'blur'},
					{ validator: validateEmail, trigger:'blur'},
					{ type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
				],
				// cityArr :[
				// 	{required:true, message:'请选择所在地', trigger:'blur'}
				// ]
				telphone: [
					{ validator: validateFixphone, trigger:'blur'},
				],
				division: [
					{ max: 40, message: '最多只能输入40个字节', trigger: 'blur' }
				],
			},
			companyRules: {
				cName: [
					{required: true, message: '公司名称不能为空', trigger: 'blur'},
					{ max: 50, message: '最多只能输入50个字节', trigger: 'blur' }
				],
				cAddress:[
					// {required: true, message:'公司地址不能为空', trigger:'blur'},
					{ max: 200, message: '最多只能输入200个字节', trigger: 'blur' }
				],
				cRemark:[
					{ max: 200, message: '最多只能输入200个字符', trigger: 'blur' }
				],
				industryIdArr :[
					{required:true, message:'请选择行业分类', trigger:'blur'}
				],
				cityArr :[
					{required:true, message:'请选择所在城市', trigger:'blur'}
				]
			}
		}
	},
	created() {
		this.getIndustry();
		this.getAreaData();
	},
	methods: {
		handleChange(val){
			this.companyForm.industryIdArr = val;
		},
		seleProCom(val){
			this.companyForm.cityArr = val;
		},
		seleProClient(val){
			this.clientForm.cityArr = val;
		},
		// 获取所有行业信息
		getIndustry(){
			this.bussiness = industryToText.cascader();
		},
		// 获取所有区域信息
		getAreaData(){
			region.province(data =>{
				this.allProvince = data.province;
			});
		},
		// 点击省级去显示其对应市级
		handleItemChange(val){
			console.log('select', val);
			region.cityArea(data => {
				console.log(data);
			}, val[0], this.allProvince);
		},
		// 输入获取公司信息(远程搜索)
		querySearchAsync(queryString, callback) {
			if(queryString){
				api.postApi('/GetCompanyInfo', {cn: queryString}).then(res => {
					if(res.data){
						for(let i of res.data){  
							i.value = i.cName;  //将CUSTOMER_NAME作为value  
						}  
						this.allCompany = res.data;
						var results = this.allCompany;
						clearTimeout(this.timeout);
						this.timeout = setTimeout(() => {
							callback(results);
						}, 3000 * Math.random());
					}
				});
			}  
		},
		handleSelect(item) {
			console.log(item);
			this.companyForm.cName = item.cName;
			this.companyForm.cAddress = item.cAddress;
			this.companyForm.cRemark = item.cRemark;

			// 获取公司所在地的中文名称
			// areaToText.toTextCity(data=>{
			// 	console.log(data);
			// 	this.companyForm.rName = data;
			// }, item.rID);
			this.companyForm.rName = areaToText.toText(item.rID).city;

			// 获取公司原有的品牌信息
			api.getApi('/GetBrand', {cid: item.cID}).then(res => {
				console.log(res.data);
				this.oldBrandTags = res.data;
			});

			// 公司信息所在行业
			let text = industryToText.getText(item.iID);
			this.$set(this.companyForm, 'iName', text);

			// 保存cID以便在创建客户的时候进行使用
			this.companyForm.cID = item.cID;
			this.$refs['companyForm'].clearValidate();
			this.isFill = true;
		},
		selectAnother(){
			this.isFill = false;
		},
		// 创建
		submitData(){
			let client_bool = false;
			this.$refs['clientForm'].validate((valid) => {
				if (valid) {
					client_bool = true;
				}else{
					return false;
				}
			});
			// 邮箱变成小写
			this.clientForm.email = this.clientForm.email.toLowerCase();
			console.log(this.companyForm.cID);
			// 先搜索公司，如果有则不添加，没有则提交信息添加公司
			if(this.companyForm.cID){
				// 如果有新填入品牌则新增品牌
				if(this.companyTags.length){
					for(let brand of this.companyTags){
						api.getApi('/AddBrand', {bt: brand, cid: this.companyForm.cID}).then(res => {
							this.oldBrandTags.push(res.data);
						});
					}
					this.companyTags = [];
				}
				console.log('comCli', client_bool);
				// console.log('clientForm', this.validateForm('clientForm'));
				if(client_bool){
					// this.isAdd = true;
					// 注册用户
					let puid = JSON.parse(sessionStorage.getItem('session_data')).uID;
					let cid = this.companyForm.cID;
					this.regUser(puid, cid);
				}
			}else{
				let company_bool = false;
				this.$refs['companyForm'].validate((valid) => {
					if (valid) {
						company_bool = true;
					}else{
						return false;
					}
				});
				console.log('nocom', company_bool, client_bool);
				if(client_bool && company_bool){
					// this.isAdd = true;
					// 创建公司和用户
					this.createCompany();
				}
			}
		},
		// 新增品牌
		addBrand(arr, cID){
			for(let brand of arr){
				api.getApi('/AddBrand', {bt: brand, cid: cID}).then(res => {
					console.log(res.data);
				});
			}
		},
		// 创建公司
		createCompany(){
			// uid         int【必填】     当前账户UserID
            // cname       String【必填】  公司名称
            // iid         int【必填】     公司所属行业ID
            // rid         int【必填】     公司所在地区ID
            // cbrand      String          公司旗下品牌，多个品牌用半角分号,隔开
            // caddr       String          公司通讯地址
			// cremark     String          公司备注信息
			let cForm = this.companyForm;
			let companyInfo = {
				uid: JSON.parse(sessionStorage.getItem('session_data')).uID,
				cname: cForm.cName,
				iid: cForm.industryIdArr[1],
				rid: cForm.cityArr[1],
				cbrand: this.companyTags.join(','),
				caddr: cForm.cAddress,
				cremark: cForm.cRemark,
			};
			// let companyInfo ={};
			// companyInfo.uid = JSON.parse(sessionStorage.getItem('session_data')).uID;
			// companyInfo.cname = this.companyForm.cName;
			// companyInfo.iid = this.companyForm.industryIdArr[1];
			// companyInfo.rid = this.companyForm.cityArr[1];
			// companyInfo.cbrand = this.companyTags.join(',');
			// companyInfo.caddr = this.companyForm.cAddress;
			// companyInfo.cremark = this.companyForm.cRemark;
			console.log(companyInfo);
			// 注册公司
			api.getApi('/AddCom', companyInfo).then(res => {
				console.log(res.data);
				
				let userMsg = res.data;
				if (!userMsg.SysCode) {
					// 新增品牌
					if(this.companyTags.length){
						this.addBrand(this.companyTags, res.data.cID);
					}
					// 注册客户
					let puid = JSON.parse(sessionStorage.getItem('session_data')).uID;
					let cid = res.data.cID;
					this.regUser(puid, cid);
				}
			}).catch(res => {
				console.log(res);
			});
		},
		// 注册用户
		regUser(puid, cid){
			// realname    String【必填】      用户真实姓名
            // sname       String【必填】      账户名
            // phone       int【必填】         用户手机号码
            // telphone    String【选填】      固定电话
            // email       String【选填】      电子邮箱
            // position    String【选填】      职务
            // division    String【选填】      部门
            // rid         int【选填】         地区ID
            // utype       String【选填】      用户类型：SM、OP、BD、MD、AD
            // uwho        String【选填】      所属公司ID，新增客户这里必填
			// puid        int                 所属所属销售uID，当utype是AD时必填
			let form = this.clientForm;
			let clientInfo = {
				realname: form.realname,
				sname: form.sname,
				phone: form.phone,
				telphone: form.telphone,
				email: form.email,
				position: form.position,
				division: form.division,
				rid: form.cityArr[1]?form.cityArr[1]:'',
				utype: 'AD',
				uwho: cid,
				puid: puid
			};
			// this.clientForm.puid = puid;
			// this.clientForm.uwho = cid;
			// if(this.clientForm.cityArr[1]){
			// 	this.clientForm.rid = this.clientForm.cityArr[1];
			// }
			api.postApi('/RegUser', clientInfo).then(res => {
				console.log(res);
				let userMsg = res.data;
				if (!userMsg.SysCode) {
					this.resetForm()
					MessageBox.confirm(`创建成功,是否跳转到列表页面`, '提示', {
						showClose: false,
						confirmButtonText: '确定',
						type: 'warning'
					}).then(() => {
						this.$router.push('./clientList');
					});
				}
			}).catch(res =>{
				console.log(res);
			});
		},
		//重置表单
		resetForm() {
			this.$refs['companyForm'].resetFields();
			this.$refs['clientForm'].resetFields();
		},
		// 取消返回
		goBack(){
			this.$router.push('./clientList');
		},
		//删除/显示/添加tags
		handleClose(tag) {
			this.companyTags.splice(this.companyTags.indexOf(tag), 1);
		},
		showInput() {
			this.inputVisible = true;
			this.$nextTick(() => {
				this.$refs.saveTagInput.$refs.input.focus();
			})
		},
		handleInputConfirm() {
			let inputValue = this.inputValue;
			if (inputValue) {
				let temp = [];
				for(let item of this.oldBrandTags){
					temp.push(item.bTitle);
				}
				let comBol = this.companyTags.includes(inputValue);
				let tempBol = temp.includes(inputValue);
				if( (!comBol)&& (!tempBol)){
					this.companyTags.push(inputValue);
				}
			}
			this.inputVisible = false;
			this.inputValue = '';
		}
	}
}
</script>

<style scoped>
  /*tags*/
  .tags{
    position: relative;
  }
  /*.tags::before{
        position: absolute;
        left: 18px;
        top: 9px;
        content: '*';
        color:#f56c6c;
    }*/

  /*面包屑导航*/
  .ad_mediaMana_nav {
    position: relative;
    height: 0;
  }

  .ad_mediaMana_nav p {
    padding-left: 57px;
    position: absolute;
    left: 0;
    top: 12px;
    font-size: 14px;
    line-height: 18px;
  }

  .ad_mediaMana_nav p em {
    font-size: 14px;
    color: #D9D9D9;
    line-height: 18px;
  }

  .ad_mediaMana_nav p a {
    color: #666;
  }

  .ad_mediaMana_nav p a:nth-of-type(1) {
    color: #999;
  }

  .ad_mediaMana_wrap {
    margin-bottom: 109px;
    position: relative;
  }

  /*wrap*/
  .mediaMana_content_top {
    padding: 42px 60px 0 60px;
  }

  .mediaMana_content_bottom {
    padding: 11px 60px;
  }

  .content_top_wrap, .content_bottom_wrap {
    background: #FFFFFF;
    border: 1px solid #DEDEDE;
    padding-top: 3px;
    height: 280px;
  }
  .content_bottom_wrap.companyInfo{
    height: 280px;
  }

  .content_top_wrap .content_top_head {
    width: 100%;
    height: 35px;
    border-bottom: 1px solid #DEDEDE;
  }

  .content_bottom_wrap .content_bottom_head {
    width: 100%;
    height: 35px;
    border-bottom: 1px solid #DEDEDE;
  }

  .content_top_wrap .content_top_head h2, .content_bottom_wrap .content_bottom_head h2 {
    font-size: 16px;
    color: #2C313C;
    font-weight: bold;
    padding-left: 16px;
    height: 24px;
    border-left: 2px solid #465D89;
    margin-top: 8px;
  }

  .content_top_wrap .content_top_form_wrap, .content_bottom_wrap .content_bottom_form_wrap {
    padding: 18px;
  }

  /*按钮*/
  .mediaMana_content_bottom .content_bottom_btn {
    position: absolute;
    bottom: -66px;
    margin-bottom: 22px;
    left: 45.3%;
  }

  .mediaMana_content_bottom .content_bottom_btn button {
    width: 80px;
    height: 34px;
    outline: none;
    cursor: pointer;
  }

  .mediaMana_content_bottom .content_bottom_btn button.create {
    background: #108EE9;
    border-radius: 2px;
    font-size: 14px;
    border: none;
    color: #ffffff;

  }

  .mediaMana_content_bottom .content_bottom_btn button.cancel {
    background: #F5F6FA;
    border: none;
    font-size: 14px;
    color: #979797;
  }

  /*tags样式*/
  .el-tag + .el-tag {
    margin-left: 5px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px!important;
    margin-left: 10px!important;
    vertical-align: bottom;
  }
  /deep/ .input-new-tag .el-input__inner {
    width: 90px!important;
    height: 34px;
    position: relative;
    top: -5px;
    left: -9px;
  }
  /deep/ .input-new-tag .el-input__suffix {
    top: -4px;
    right: 14px;
  }

  /deep/.button-new-tag{
    margin-left: 0;
    position: relative;
    top: -1px;
  }

  /deep/ .tags .el-form-item__error{
    display: none;
  }

  /deep/ .tags .el-input {
    width: 90px!important;
    height: 34px;
  }

  /deep/ .el-tag{
    height: 34px;
    line-height: 32px;
  }
  /deep/ .button-new-tag{
    height: 34px;
    line-height: 32px;
  }

  /*表单*/
  /deep/.el-form.demo-ruleForm{
    /*display: flex;
        !*justify-content: space-between;*!
        flex-wrap: wrap;*/
  }

  /*客户信息表单*/
  .el-input {
    width: 240px;
    height: 34px;
  }

  /deep/ .el-input__inner {
    width: 240px;
    height: 34px;
  }

  .lngNlat {
    display: inline-block;
  }

  /deep/ .RlngNlat .el-form-item__content {
    margin-left: -1px !important;
  }

  /deep/ .lngNlat .el-input__inner {
    width: 118px;
  }

  /deep/ .rmb .el-input__inner {
    padding-left: 30px;
  }

  /deep/ .lngNlat .el-input {
    width: 118px;
  }

  /deep/ .el-form-item {
    margin-bottom: 32px;
    min-width: 33.33%;
    max-width: 33.33%;
    float: left;
  }

  /deep/ .el-popper[x-placement^=bottom] {
    margin-top: 3px !important;
  }

  /deep/ .el-textarea__inner {
    width: 240px;
    height: 76px !important;
    resize: none;
    position: relative;
    top: 3px;
  }

  /deep/ .el-form-item__error {
    top: 95%;
    width: 200px;
  }

  /deep/ .el-popper[x-placement^=bottom] {
    margin-top: 3px !important;
    top: 200px !important;
  }
  /*按钮*/
  /deep/ .el-button--default:focus, .el-button--default:hover{
    color: #606266;
    border-color: #dcdfe6;
    background-color: #fcfcfc;
  }
  .content_bottom_btn /deep/ .el-button span{
    position: relative;
    top: -2px;
  }

  /*1440*/
  @media screen and (min-width: 1440px) {

  }

  /*1920*/
  @media screen and (min-width: 1920px) {
    .mediaMana_content_bottom .content_bottom_btn {
      position: absolute;
      bottom: -66px;
      left: 896px;
    }
    /deep/ .el-form-item {
      margin-bottom: 32px;
      min-width: 25%;
      max-width: 25%;
    }

  }
</style>
