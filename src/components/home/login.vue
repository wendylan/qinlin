<template>
  <div class="login_wrap">
    <div class="loginBox">
      <div class="logo">
        <img src="../../assets/home/login_logo.png" alt="">
        <p>致力于成为中国最有效的社区营销服务商</p>
      </div>
      <div class="login">
        <ul class="loginType">
          <li v-bind:class="{active:isActive}"
              @click="loginType"
          >密码登录
          </li>
          <li v-bind:class="{active:!isActive}"
              @click="loginType">扫码登录
          </li>
        </ul>
        <div class="loginInput" v-if="isActive">
          <!--<el-form label-width="80px" :model="loginForm" :rules="loginRules">
            <el-form-item prop="username">
              <div class="username">
                <input type="text" placeholder="账户" v-model="loginForm.username">
                <img src="../../assets/home/usericon.png" alt="">
              </div>
              &lt;!&ndash; <el-input v-model="loginForm.username"></el-input>
               <img src="../../assets/home/usericon.png" alt="">&ndash;&gt;
            </el-form-item>
            <el-form-item prop="password">
              <div class="password">
                <input type="password" placeholder="密码" v-model="loginForm.password">
                <img src="../../assets/home/passicon.png" alt="">
              </div>
            </el-form-item>
          </el-form>-->
          <div class="username">
            <input type="text" placeholder="账户" v-model="username">
            <!-- <img src="../../assets/home/usericon.png" alt=""> -->
			<i class="fa fa-user-o"></i>
          </div>
          <div class="password">
            <input type="password" placeholder="密码" v-model="password" @keyup ="show($event)">
            <!-- <img src="../../assets/home/passicon.png" alt=""> -->
			<i class="fa fa-lock"></i>
          </div>
          <div class="remeberUser">
            <el-checkbox v-model="remeAccount">记住账号</el-checkbox>
          </div>
          <div class="loginBtn">
            <button id="login" @click="doLogin()">登&nbsp;录</button>
          </div>
        </div>
        <div class="weixinLogin" v-if="!isActive">
          <div class="weixinCode">
            <img src="../../assets/home/code.jpg" alt="">
            <p>打开微信扫一扫登录</p>
          </div>
        </div>
        <div class="tip">
          <p>温馨提示：加盟城市请(<a href="ApplicationForm.doc" download="申请表">点击并下载申请表</a>)，申请平台账号</p>
        </div>
      </div>
    </div>
    <div class="footer">
      <p>copyright &copy; 2017 Qinlin technology. All rights reserved. 粤ICP备15007183号</p>
    </div>
  </div>
</template>

<script>
  import  utils from '../../utils.js';
  import axios from 'axios';
  export default {
    name: "login",
    data() {

      return {
        loading: false,
        isActive: true,
        remeAccount: false,
        username: '',
        password: '',
        realName:''
      }
    },
    mounted: function () {
      // this.postData()
      //页面加载调用获取cookie值
      this.username = utils.getCookie('username');
      this.password = utils.getCookie('password');

    },
    methods: {
      //键盘
      show:function(ev){
        if(ev.keyCode===13){
          this.doLogin();
        }
      },
      //登录
      doLogin: function () {

        let name = this.username;
        let pass = this.password;
        if (name === '' || name == null) {
          alert('请输入正确的用户名');
          return;
        } else if (pass === '' || pass == null) {
          alert('请输入正确的密码');
          return;
        }
        //判断复选框是否勾选，勾选则调用配置cookie方法
        if (this.remeAccount === true) {
          utils.setCookie('username', name, 7);
          utils.setCookie('password', pass, 7);
        } else {
          utils.clearCookie();
        }

        //接口

        // this.$http.post(url,data)
        //   .then(res => {

        //   })
        //   .catch(err => {

        //   });

            // login登录api
            // axios({
            //   method: 'post',
            //   baseURL: '/api',
            //   url: '/Login',
            //   data:{
            //     username: name,
            //     pwd: pass 
            //   }
            // }).then(res => {
            //     console.log("返回：",res);
            //   }
            // ).catch(
            //   err => {
            //     console.log(err);
            //   }
            // );
            
          // 社区媒体列表api
            axios({
				method: 'get',
				baseURL: '/api',
				url: '/GetMediaList',
				params:{
					resid:1
				}
            }).then(res => {
					console.log("返回：", res);
				}
            ).catch(err => {
					console.log(err);
				}
            );


      },
      loginType() {
        this.isActive = !this.isActive;
      },

    },

  }


</script>

<style scoped>

  /deep/ .el-form-item__content {
    margin-left: 0 !important;
  }

  .login_wrap {
    position: fixed;
    width: 100%;
    height: 100%;
    background: url("../../assets/home/loginBg.png") no-repeat;
    background-size: cover;
  }

  .logo {
    text-align: center;
    margin-top: 125px;
    margin-bottom: 34px;
  }

  .logo img {
    width: 245px;
    margin-bottom: 10px;
  }

  .logo p {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
  }

  .login {
    position: relative;
    width: 100%;
    /*display: flex;
    justify-content: center;
    align-items: center;*/
  }

  .login .loginType {
    width: 100%;
    text-align: center;
  }

  .loginType li {
    display: inline-block;
    width: 100px;
    height: 40px;
    text-align: center;
    margin-bottom: 24px;
    cursor: pointer;
    margin-right: 40px;
    margin-left: 40px;
  }

  /*选中*/
  .active {
    border-bottom: 2px solid #1890FF;
    color: #1890FF;
  }

  .username input, .password input {
    border: 1px solid #D9D9D9 !important;
    border-radius: 4px;
    width: 368px;
    height: 38px;
    outline: none;
    position: relative;
    padding-left: 30px;
    font-size: 16px;
    box-sizing: border-box;
  }

  .username, .password, .remeberUser, .loginBtn {
    width: 368px;
    margin: 0 auto;
    text-align: center;
    position: relative;
  }

  .password {
    margin-top: 24px;
    margin-bottom: 24px;
  }
	.loginInput i {
		position: absolute;
		left: 10px;
		top: 13px;
		width: 12px;
		color: #999999;
	}
  input::placeholder {
    color: rgba(0, 0, 0, 0.25);
  }

  .remeberUser {
    font-size: 14px;
    text-align: left;
    margin-bottom: 24px;
  }

  /deep/ .el-checkbox {
    color: #666;
  }

  /deep/ .el-checkbox__input.is-checked + .el-checkbox__label {
    color: #1890FF;
  }

  .loginBtn button {
    width: 100%;
    height: 40px;
    color: #ffffff;
    font-size: 16px;
    border: none;
    background-color: #1890FF;
    outline: none;
    cursor: pointer;
    border-radius: 4px;
  }

  .tip {
    margin: 25px auto;
    width: 100%;
  }

  .tip p {
    text-align: center;
    font-size: 12px;
    color: #999999;
  }

  .tip p a {
    font-size: 12px;
    color: #1890FF;
  }

  /*扫码登录*/
  .weixinLogin {
    width: 100%;
    text-align: center;
  }

  .weixinLogin img {
    margin-bottom: 10px;
  }

  .footer {
    width: 100%;
    text-align: center;
    position: absolute;
    bottom: 42px;
    left: 0;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.45);
  }


</style>
