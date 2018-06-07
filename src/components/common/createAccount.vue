<template >
	<div class="bottom">
		<div class="ad_mediaMana_wrap">
			<div class="ad_mediaMana_nav clearfix">
				<p>
					<a href="#">账号管理</a><em> / </em>
					<a href="#" v-if="!isEdit">创建账号</a>
					<a href="#" v-else>修改账号</a>
				</p>
			</div>
			<!--客户信息-->
			<div class="mediaMana_content_top">
				<div class="content_top_wrap">
					<div class="content_top_head">
						<h2>账号信息</h2>
					</div>
					<div class="content_top_form_wrap">
						<el-form :model="accountForm" status-icon :rules="accountRules" ref="accountForm" label-width="100px" class="demo-ruleForm">
							<el-form-item label="账号:" prop="account">
								<el-input v-model="accountForm.account" placeholder="请输入账号" :disabled="isEdit"></el-input>
							</el-form-item>
							<el-form-item label="姓名:" prop="realName">
								<el-input v-model="accountForm.realName" placeholder="请输入真实姓名"></el-input>
							</el-form-item>
							<el-form-item label="角色" prop="role">
								<el-select v-model="accountForm.role" placeholder="请选择角色" :disabled="isEdit">
									<el-option label="超级管理员" value="SM"></el-option>
									<el-option label="媒介" value="MD"></el-option>
									<el-option label="销售" value="BD"></el-option>
									<el-option label="运营" value="OP"></el-option>
									<el-option label="工程人员" value="EP"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="权限城市:" prop="PermissionCity">
								<el-select v-model="accountForm.PermissionCity" multiple placeholder="请选择权限城市(多选)">
									<el-option
									v-for="item in throwCity"
									:key="item.value"
									:label="item.label"
									:value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="部门:" prop="division">
								<el-input v-model="accountForm.division" placeholder="请输入部门"></el-input>
							</el-form-item>
							<el-form-item label="上级:" prop="boss" v-if="!isEdit">
								<el-autocomplete
									v-model="accountForm.boss"
									:fetch-suggestions="querySearchAsync"
									placeholder="请输入账号"
									@select="handleSelect"
									>
								</el-autocomplete>
							</el-form-item>
							<el-form-item label="上级:" v-if="isEdit">
								<el-input disabled="disabled" :value="accountForm.boss"></el-input>
							</el-form-item>
							<el-form-item label="职务:" prop="position">
								<el-input v-model="accountForm.position" placeholder="请输入职务"></el-input>
							</el-form-item>
							<el-form-item label="手机号码:" prop="phone">
								<el-input v-model="accountForm.phone" placeholder="请输入手机号码"></el-input>
							</el-form-item>
							<el-form-item label="邮箱:" prop="email">
								<el-input v-model="accountForm.email" placeholder="请输入邮箱" type="email"></el-input>
							</el-form-item>
						</el-form>
					</div>
				</div>
			</div>
			<div class="content_bottom_btn">
				<el-button  @click="submitForm('accountForm')">{{isEdit?'保存':'创建'}}</el-button>
				<el-button type="default" @click="resetForm()">取消</el-button>
			</div>
		</div>
	</div>
</template>

<script>
import { Form, FormItem, Select, Option, Input, Button, MessageBox, Message, Autocomplete } from 'element-ui';
import areaToText from '../../commonFun/areaToText.js';
import api from '../../api/api'
export default {
	name: "createClient",
	components:{
		elForm: Form,
		elFormItem: FormItem,
		elSelect: Select,
		elOption: Option,
		elInput: Input,
		elButton: Button,
		elAutocomplete: Autocomplete,
	},
	data() {
		var validateAccount=(rule,value,callback)=>{
			let  reg = /^[^\u4e00-\u9fa5]{0,}$/;
			if (!(reg.test(value))) {
				callback(new Error('只能输入字母、数字、符号'));
			} else {
				callback();
			}
		};
		var validateAssetId = (rule, value, callback) => {
			let szReg= /^1[34578]\d{9}$/;
			if (!(szReg.test(value))) {
				callback(new Error('请输入正确的手机号码'));
			} else {
				callback();
			}
		};
		var validateBoss=(rule, value, callback)=>{
			if(value){
				if (!this.accountForm.puID){
					callback(new Error('请输入正确的账号并进行选择'));
				}else{
					callback();
				}
			}else{
				callback();
			}
		};
		return {
			timeout:  null,
			isEdit: false, //新建/修改
			//表单
			accountForm: {
				account: '',
				realName: '',
				role: '',
				PermissionCity: '',
				boss: '',
				position:'',
				phone: '',
				division: '',
				email:'',
			},
			throwCity: [
			/* {
				value: '0',
				label: '全国'
				},
				{
				value: '440100',
				label: '广州'
					}, {
				value: '310100',
				label: '上海'
					}, {
				value: '110100',
				label: '北京'
					}, {
				value: '440300',
				label: '深圳'
					}*/],
			accountRules: {
				account: [
					{required: true, message: '账号不能为空', trigger: 'blur'},
					{ max: 50, message: '最多只能输入50个字节', trigger: 'blur' },
					{validator: validateAccount, trigger: 'blur'}
				],
				realName: [
					{required: true, message: '职位不能为空', trigger: 'blur'},
					{ max: 30, message: '最多只能输入30个字节', trigger: 'blur' }
				],
				role: [
					{required: true, message: '角色不能为空', trigger: 'blur'},
					// { type:'number',message:'只能输入数字',trigger:'blur'},
				],
				PermissionCity: [
					{required: true, message: '请选择权限城市', trigger:'blur'},
				],
				position: [
					{ max: 20, message: '最多只能输入20个字节', trigger: 'blur' }
				],
				division: [
					{ max: 20, message: '最多只能输入20个字节', trigger: 'blur' }
				],
				phone:[
					{required: true, message: '请输入手机号码',trigger:'blur'},
					{validator: validateAssetId, trigger: 'blur'}
				],
				email:[
					{type:'email',message:'请输入正确的邮箱地址',trigger:'blur'}
				],
				boss:[
					{ validator: validateBoss, trigger:'blur'},
				],
			},
		}
	},
	mounted(){
		//  this.ShowRegion()
		this.getUhwo();
		this.getInitEditInfo();
	},
	methods: {
		// 输入获取公司信息(远程搜索)
		querySearchAsync(queryString, callback) {
			let uid = JSON.parse(sessionStorage.getItem('session_data')).uID;
			if(queryString){
				api.postApi('/CheckUserName', {uid: uid, sname: queryString}).then(res => {
					if(res.data){
						res.data.value  = res.data.realName;
						this.accountForm.boss = res.data.realName;
						this.accountForm.puID = res.data.uID;
						var results = [res.data];
						clearTimeout(this.timeout);
						this.timeout = setTimeout(() => {
							callback(results);
						}, 3000 * Math.random());
					}
				});
			}
		},
		handleSelect(item){
			console.log(item);
		},
		// 根据登录用户的权限设置创建新帐号的权限
		getUhwo(){
			let sessionData = JSON.parse(sessionStorage.getItem('session_data'))
			let uWho = sessionData.uWho // ['440100','110100']
			// let uWho =  '440100,110100'
			if(uWho == '0'){
				this.throwCity = [
				{ value: '0',label: '全国' },
				{ value: '440100', label: '广州'},
				{value: '310100',label: '上海'},
				{value: '110100',label: '北京'},
				{value: '440300',label: '深圳'}
				]
			}else{
				let uWhoArr = uWho.split(',') // ['440100','110100']
				let cityList = []
				console.log()
				for (let j = 0; j < uWhoArr.length; j++) {
				console.log('公司uWho', uWhoArr[j])
				areaToText.toText(data => {
					console.log('用户权限城市', data);
					let cityObj = {
					label: data.city,
					value: uWhoArr[j],
					}
					console.log('cityObj', cityObj)
					cityList.push(cityObj);
					if (j >= uWhoArr.length - 1) {
					console.log('cityListcityList玩玩', cityList)
					this.throwCity = cityList
					}
				}, uWhoArr[j]);
				}
			}
		},
		//根据登录用户的权限设置创建新帐号的上级
		submitForm(formName){
			console.log('item',formName)
			this.$refs[formName].validate((valid) => {
				if (valid) {
					if(this.isEdit){
						this.postEditInfo();
					}else{
						this.createFun()
					}
				} else {
					console.log('error submit!!');
					return false;
				}
			});

			/*    // 手机号码验证
					let szReg=/^[A-Za-zd]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/;
				//  console.log('this.accountForm.phone',this.accountForm.phone)
				if(this.accountForm.phone != '' && this.accountForm.phone != null){
					if(!(/^1[34578]\d{9}$/.test(this.accountForm.phone))){
						Message({
						message: '手机号码有误，请重填！',
						type: 'warning'
						})
					//  return false;
					}else{
						b2 = true
					}
				}
					//邮箱验证
					if(this.accountForm.email != '' && this.accountForm.email != null){
					console.log('邮箱',this.accountForm.email)
					if(szReg.test(this.accountForm.email)){
						Message({
						message: '邮箱格式不正确，请修改！',
						type: 'warning'
						})
					//  return false;
					}else{
						b2 = true
					}
					}
					if(b1&&b2&&b3){
					this.createFun()
					}*/
		},
		// 修改账户信息接口
		postEditInfo(){
			// uid         int【必填】     当前用户UserID
            // toid        int【必填】     被操作的UserID
            // rn          String          真实姓名
            // uwho        String          城市权限:110100,440100
            // phone       String          移动电话
            // telephone   String          固定电话
            // email       String          电子邮箱
            // position    String          职务
            // division    String          所属部门
			let accForm = this.accountForm;
			let account = {
				uid: JSON.parse(sessionStorage.getItem('session_data')).uID,
				toid: accForm.uID,
				rn: accForm.realName,
				uwho: accForm.PermissionCity.join(','),
				phone: accForm.phone,
				email: accForm.email,
				position: accForm.position,
				division: accForm.division
			};
			console.log(account);
			api.postApi('/SetUserInfo', account).then(res=>{
				console.log(res)
				let data = res.data;
				MessageBox.alert(data.MSG+'<br>', '修改用户', {
					showClose: false,
					dangerouslyUseHTMLString: true,
					confirmButtonText: '确定',
				}).then(res =>{
					// accountList
					this.$router.push('./accountList');
				});
			}).catch(err=>{
				console.log(err)
			})
		},
		//注册接口
		createFun(){
			console.log('accountForm',this.accountForm)
			let actFrom = this.accountForm
			/*realname    String【必填】      用户真实姓名
				sname       String【必填】      账户名
				phone       int【必填】         用户手机号码
				telphone    String【选填】      固定电话
				email       String【选填】      电子邮箱
				position    String【选填】      职务
				division    String【选填】      部门
				rid         int【选填】         地区ID
				utype       String【选填】      用户类型：SM、OP、BD、MD、AD
				uwho        String【选填】      所属公司ID，新增客户这里必填
				puid        int                 所属所属销售uID，当utype是AD时必填
		accountForm: {account: '',realName: '',role: '',PermissionCity: '',boss: '',position:'',phone: '',division: '',email:'',},*/
			let account = {realname:'',sname:'',utype:'',uwho:'', division:'',position:'',phone:'',email:'',rID: 440100,puid:''}
			account.realname = actFrom.realName                 // 姓名
			account.sname = actFrom.account
			account.utype = actFrom.role                        // 用户类型：SM、OP、BD、MD、AD
			account.uwho = actFrom.PermissionCity.join(',')   // 所属公司ID，新增客户这里必填
			account.division = actFrom.division               // 职务
			account.position = actFrom.position               // 部门
			account.phone = actFrom.phone
			account.email = actFrom.email
			if(actFrom.puID){
				account.puid = actFrom.puID
			}
			console.log(account)
			api.postApi('/RegUser',account).then(res=>{
				console.log(res)
				let data = res.data
				this.resetForm()
				MessageBox.alert(data.MSG+'<br>'+'用户ID：'+data.uID, '注册用户', {
					showClose: false,
					dangerouslyUseHTMLString: true,
					confirmButtonText: '确定',
				});
				// accountList
				this.$router.push('./accountList')
			}).catch(err=>{
				console.log(err)
			})
		},
		//重置表单
		resetForm() {
			if(this.isEdit){
				this.$router.push('./accountList');
			}else{
				this.$refs['accountForm'].resetFields();
				window.history.go(-1);
			}
		},
		// 获取修改账户初始信息
		getInitEditInfo(){
			let inputPath = this.$route.fullPath //this.$route.path
			//    console.log(inputPath)
			if (inputPath.indexOf('edit=y') !== -1) {
				let accountInfo = JSON.parse(sessionStorage.getItem('account_detail'));
				console.log(accountInfo);
				if(accountInfo){
					// account: '',
					// realName: '',
					// role: '',
					// PermissionCity: '',
					// boss: '',
					// position:'',
					// phone: '',
					// division: '',
					// email:'',
					this.isEdit = true;
					let editInfo = {
						uID: accountInfo.uID,
						account: accountInfo.sName,
						realName: accountInfo.realName,
						role: accountInfo.uType,
						PermissionCity: accountInfo.uWho.split(','),
						boss: accountInfo.puName?accountInfo.puName: '',
						position: accountInfo.position? accountInfo.position: '',
						phone: accountInfo.phone,
						division: accountInfo.division?accountInfo.division: '',
						email: accountInfo.email? accountInfo.email: ''
					};
					this.accountForm = editInfo;
				}else{
					this.$router.push('./createAccount');
					this.isEdit = false;
				}
			}else{
				this.isEdit = false;
				sessionStorage.removeItem('account_detail');
			}
		},
    }
}
</script>

<style scoped>
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



  .content_top_wrap, .content_bottom_wrap {
    background: #FFFFFF;
    border: 1px solid #DEDEDE;
    /*height: 830px;*/
    padding-top: 3px;
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
    margin-top: 8px;
  }

  .content_top_wrap .content_top_form_wrap, .content_bottom_wrap .content_bottom_form_wrap {
    padding: 18px;
    /*display: flex;*/
    /*justify-content: center;*/
    /*align-content: center;*/

  }

  /deep/.el-form.demo-ruleForm{
    width: 342px;
    margin:  0 auto;
  }
  /*按钮*/
  .content_bottom_btn {
    position: absolute;
    bottom: -100px;
    margin-bottom: 22px;
    left: 45.3%;
  }

.content_bottom_btn button {
    width: 80px;
    height: 34px;
    outline: none;
    cursor: pointer;
  }

.content_bottom_btn button.create {
    background: #108EE9;
    border-radius: 2px;
    font-size: 14px;
    border: none;
    color: #ffffff;

  }

.content_bottom_btn button.cancel {
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

  /*客户信息表单*/
  .el-input {
    width: 240px;
    height: 34px;
  }

  /deep/ .el-input__inner {
    width: 240px;
    height: 34px;
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
    margin-bottom: 2px;
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
    top: 22%;
    left: 255px;
    width: 200px;
  }

  /deep/ .el-popper[x-placement^=bottom] {
    margin-top: 3px !important;
    top: 200px !important;
  }

  .bottom{
    height: 672px;
  }
  /*1440*/
  @media all and (min-width: 1440px) {
    .bottom{
      height: 802px;
    }
  }

  /*1920*/
  @media all and (min-width: 1920px) {
    .mediaMana_content_bottom .content_bottom_btn {
      position: absolute;
      bottom: -66px;
      left: 896px;
    }

    .bottom{
      height: 875px;
    }

  }
</style>

