<template>
  <div>
    <div>
      <div class="ad_mediaMana_wrap">
        <div class="ad_mediaMana_nav clearfix">
          <p><a href="#">媒体管理</a><em> / </em><a href="#">创建客户</a></p>
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
                <el-form-item label="联系人:" prop="contacts">
                  <el-input v-model="clientForm.contacts" placeholder="请输入联系人姓名"></el-input>
                </el-form-item>
                <el-form-item label="职位:" prop="position">
                  <el-input v-model="clientForm.position" placeholder="请输入联系人职位"></el-input>
                </el-form-item>
                <el-form-item label="手机号码:" prop="phone">
                  <el-input v-model.number="clientForm.phone" placeholder="请输入联系人手机号码"></el-input>
                </el-form-item>
                <el-form-item label="所在地:" prop="location">
                  <el-select v-model="clientForm.location" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="邮箱:" prop="email">
                  <el-input v-model="clientForm.email" placeholder="请输入联系人邮箱"></el-input>
                </el-form-item>
                <el-form-item label="固定电话:" prop="telephone">
                  <el-input v-model.number="clientForm.telephone" placeholder="请输入联系人固定电话"></el-input>
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
                <el-form-item label="公司名称:" prop="companyName">
                  <el-input v-model="companyForm.companyName" placeholder="请输入公司名称"></el-input>
                </el-form-item>
                <el-form-item label="事业部:" prop="companyBU">
                  <el-input v-model="companyForm.companyBU" placeholder="请输入联系人所属事业部"></el-input>
                </el-form-item>
                <el-form-item label="公司品牌:" prop="companyBrand" class="tags">
                  <el-tag
                    :key="tag"
                    v-for="tag in companyTags"
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
                <el-form-item label="行业分类:" prop="tradeClassify">
                  <el-cascader
                    placeholder="试试搜索：互联网"
                    :options="options"
                    filterable
                    change-on-select
                  ></el-cascader>
                </el-form-item>
                <el-form-item label="公司地址:" prop="companyAddress">
                  <el-input v-model="companyForm.companyAddress" placeholder="请输入公司具体地址"></el-input>
                </el-form-item>
                <el-form-item label="所在城市:" prop="companyCity">
                  <el-select v-model="companyForm.companyCity" placeholder="请选择公司所在城市">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="备注:" prop="companyRemark">
                  <el-input type="textarea" v-model="companyForm.companyRemark" placeholder="请填写备注信息"></el-input>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div class="content_bottom_btn">
            <button class="create">创建</button>
            <button class="cancel">取消</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "createClient",
    data() {
      var validateEmail=(rule, value, callback)=>{
        var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
        if (!reg.test(value)){
          callback(new Error('邮箱格式有误'));
        }else{
          callback();
        }
      };

      return {
        //行业分类
        options: [{
          value: 'hulianwang',
          label: '互联网',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
          }],
        }, {
          value: 'fuwu',
          label: '服务业',
          children: [{
            value: 'chushi',
            label: '厨师',
          }, {
            value: 'fuwuyuan',
            label: '服务员',
          }],
        }, {
          value: 'fangdichan',
          label: '房地产',
          children: [{
            value: 'yi',
            label: '一二三',
          }],
        }],
        //tags
        companyTags: ['亲邻团购'],
        inputVisible: false,
        inputValue: '',
        //表单
        clientForm: {
          contacts: '',
          position: '',
          phone: '',
          location: '',
          email: '',
          telephone: ''
        },
        companyForm: {
          companyName: '',
          companyBU: '',
          companyBrand: '',
          companyAddress:'',
          companyCity:'',
          companyRemark:'',
          tradeClassify:''
        },
        clientRules: {
          contacts: [
            {required: true, message: '联系人不能为空', trigger: 'blur'},
            { max: 30, message: '最多只能输入30个字节', trigger: 'blur' }
          ],
          position: [
            {required: true, message: '职位不能为空', trigger: 'blur'},
            { max: 30, message: '最多只能输入30个字节', trigger: 'blur' }
          ],
          phone: [
            {required: true, message: '电话号码不能为空', trigger: 'blur'},
            { type:'number', message:'只能输入数字', trigger:'blur'},
          ],
          location: [],
          email: [
            { validator: validateEmail, trigger:'blur'},
          ],
          telephone: [
            { type:'number', message:'只能输入数字', trigger:'change'},
          ]
        },
        companyRules: {
          companyName: [
            {required: true, message: '公司名称不能为空', trigger: 'blur'},
            { max: 50, message: '最多只能输入40个字节', trigger: 'blur' }
          ],
          companyBU: [
            { max: 40, message: '最多只能输入40个字节', trigger: 'change' }
          ],
         /* companyBrand: [
            {required: true ,trigger:'blur'},
            { max: 40, message: '最多只能输入40个字节', trigger: 'blur' }
          ],*/
          companyAddress:[
            {required: true, message:'公司地址不能为空', trigger:'blur'},
            { max: 200, message: '最多只能输入200个字节', trigger: 'blur' }
          ],
          companyCity:[
            {required:true, message:'公司所在城市不能为空', trigger:'blur'}
          ],
          companyRemark:[
            { max: 200, message: '最多只能输入200个字符', trigger: 'change' }
          ],
          tradeClassify:[
            {required:true, message:'请选择行业分类', trigger:'blur'}
          ]
        }
      }
    },
    methods: {
      //删除/显示/添加tags
      handleClose(tag) {
        this.companyTags.splice(this.companyTags.indexOf(tag), 1);
      },
      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        })
      },
      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.companyTags.push(inputValue);
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
   .tags::before{
     position: absolute;
     left: 18px;
     top: 9px;
     content: '*';
     color:#f56c6c;

   }

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
    /*height: 830px;*/
    padding-top: 3px;
    height: 220px;
  }
   .content_bottom_wrap.companyInfo{
     height: 330px;
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
    font-family: PingFangSC-Semibold;
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
