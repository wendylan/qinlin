<template >
  <div class="bottom">
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
              <el-form :model="accountForm" status-icon :rules="accountRules" ref="accountForm" label-width="100px"
                       class="demo-ruleForm">
                <el-form-item label="账号:" prop="account">
                  <el-input v-model="accountForm.account" placeholder="请输入账号"></el-input>
                </el-form-item>
                <el-form-item label="姓名:" prop="realName">
                  <el-input v-model="accountForm.realName" placeholder="请输入真实姓名"></el-input>
                </el-form-item>
                <el-form-item label="角色" prop="role">
                  <el-select v-model="accountForm.role" placeholder="请选择角色">
                    <el-option label="管理员" value="admin"></el-option>
                    <el-option label="媒介" value="media"></el-option>
                    <el-option label="销售" value="sale"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="权限城市:" prop="PermissionCity">
                  <el-select v-model="accountForm.PermissionCity" multiple placeholder="请选择权限城市(多选)">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="上级:" prop="boss">
                  <el-select v-model="accountForm.boss" placeholder="请选择上级">
                    <el-option label="管理员" value="admin"></el-option>
                    <el-option label="媒介" value="media"></el-option>
                    <el-option label="销售" value="sale"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
        <div class="content_bottom_btn">
          <button class="create">创建</button>
          <button class="cancel">取消</button>
        </div>
      </div>
  </div>
</template>

<script>
  export default {
    name: "createClient",
    data() {
      var validateBoss=(rule, value, callback)=>{

      };

      return {
        //表单
        accountForm: {
          account: '',
          realName: '',
          role: '',
          PermissionCity: '',
          boss: ''
        },
        options: [{
          value: '选项1',
          label: '广州'
        }, {
          value: '选项2',
          label: '上海'
        }, {
          value: '选项3',
          label: '北京'
        }, {
          value: '选项4',
          label: '深圳'
        }, {
          value: '选项5',
          label: '成都'
        }],

        accountRules: {
          account: [
            {required: true, message: '账号不能为空', trigger: 'blur'},
            // { max: 30, message: '最多只能输入30个字节', trigger: 'blur' }
          ],
          realName: [
            {required: true, message: '职位不能为空', trigger: 'blur'},
            // { max: 30, message: '最多只能输入30个字节', trigger: 'blur' }
          ],
          role: [
            {required: true, message: '角色不能为空', trigger: 'blur'},
            // { type:'number',message:'只能输入数字',trigger:'blur'},
          ],
          PermissionCity: [
            {required: true, message: '请选择权限城市', trigger:'blur'},
          ],

          boss: [
            { validator: validateBoss, trigger:'blur'},
          ]
        },

      }
    },
    methods: {

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
  @media screen and (min-width: 1440px) {
    .bottom{
      height: 802px;
    }
  }

  /*1920*/
  @media screen and (min-width: 1920px) {
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

