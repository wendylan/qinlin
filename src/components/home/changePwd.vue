<template>
    <div style="flex: 1">
        <h4>修改密码</h4>
        <div class="changePwd-box">
            <el-form :model="formChangePwd" status-icon :rules="ChangePwdRule" ref="formChangePwd" label-width="100px" class="demo-ruleForm">
                <el-form-item label="" prop="currPwd">
                    <el-input type="password" v-model.trim="formChangePwd.currPwd" auto-complete="off" maxlength="16" minlength="6" placeholder="请输入当前密码"></el-input>
                </el-form-item>
                <el-form-item label="" prop="newPwd">
                    <el-input type="password" v-model.trim="formChangePwd.newPwd" auto-complete="off" maxlength="16" minlength="6" placeholder="请输入新的密码"></el-input>
                </el-form-item>
                <el-form-item label="" prop="confirmPwd">
                    <el-input type="password" v-model.trim="formChangePwd.confirmPwd" maxlength="16" minlength="6" placeholder="请再次输入密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('formChangePwd')">确定</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="changePwd-btn">
            <el-button type="text" @click="goBack">取消</el-button>
        </div>
    </div>
</template>

<script>
import api from "../../api/api.js";
import { Form, FormItem, Button, Input, MessageBox, Message } from "element-ui";
export default {
    name: "changePwd",
    components: {
        elForm: Form,
        elFormItem: FormItem,
        elButton: Button,
        elInput: Input
    },
    data() {
        let checkCurrPwd = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("当前密码不能为空"));
            } else {
                callback();
            }
        };
        let validatePass = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入新的密码"));
            } else {
                if (this.formChangePwd.confirmPwd !== "") {
                    this.$refs.formChangePwd.validateField("confirmPwd");
                }
                callback();
            }
        };
        let validatePass2 = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请再次输入密码"));
            } else if (value !== this.formChangePwd.newPwd) {
                callback(new Error("两次输入密码不一致!"));
            } else {
                callback();
            }
        };
        return {
            formChangePwd: {
                currPwd: "",
                newPwd: "",
                confirmPwd: ""
            },
            //规则
            ChangePwdRule: {
                currPwd: [
                    { min: 6, message: "至少输入6个字节", trigger: "blur" },
                    { max: 16, message: "最多输入16个字节", trigger: "blur" },
                    { validator: checkCurrPwd, trigger: "blur" }
                ],
                newPwd: [
                    { min: 6, message: "至少输入6个字节", trigger: "blur" },
                    { max: 16, message: "最多输入16个字节", trigger: "blur" },
                    { validator: validatePass, trigger: "blur" }
                ],
                confirmPwd: [
                    { min: 6, message: "至少输入6个字节", trigger: "blur" },
                    { max: 16, message: "最多输入16个字节", trigger: "blur" },
                    { validator: validatePass2, trigger: "blur" }
                ]
            }
        };
    },
    methods: {
        // 修改密码
        submitForm(formName) {
            console.log(formName);
            this.$refs[formName].validate(valid => {
                console.log(valid);
                if (valid) {
                    // uid     int【必填】     UserID
                    // pwd     String【必填】  旧密码
                    // newpwd  String【必填】  新设置的密码
                    let userInfo = {
                        uid: JSON.parse(sessionStorage.getItem("session_data"))
                            .uID,
                        pwd: this.formChangePwd.currPwd,
                        newpwd: this.formChangePwd.newPwd
                    };
                    console.log(userInfo);
                    api
                        .postApi("/SetPasswd", userInfo)
                        .then(res => {
                            console.log(res);
                            let result = res.data;
                            if (res.data.SysCode == 100200) {
                                MessageBox.alert(
                                    "修改成功，请重新登录",
                                    "提示",
                                    {
                                        confirmButtonText: "确定",
                                        showClose: false,
                                        callback: action => {
                                            this.$router.push("/login");
                                        }
                                    }
                                );
                            } else if (result.SysCode == 100302) {
                                Message.warning("登录超时,请重新登录");
                                this.$router.push("/login");
                            } else {
                                Message.warning(result.MSG);
                            }
                        })
                        .catch(res => {
                            console.log(res);
                        });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        // 返回
        goBack() {
            this.$router.go(-1);
        }
    }
};
</script>

<style scoped>
h4 {
    font-size: 20px;
    color: #666666;
    width: 100%;
    margin-top: 20px;
    text-align: center;
}
.changePwd-box {
    width: 310px;
    margin: 30px auto;
    background: #ffffff;
    border: 1px solid #e8e8e8;
    border-radius: 4px;
    text-align: center;
    padding: 29px 0 7px;
    box-sizing: border-box;
}
/deep/ .el-form-item__content {
    margin-left: 0 !important;
}

/deep/ .el-form-item.el-form-item--feedback {
    text-align: center;
}

/deep/.el-input,
/deep/ .el-input__inner {
    width: 240px;
    height: 34px;
}
/deep/ .el-form-item__error {
    left: 35px;
}

/deep/ .el-form-item__content .el-button {
    width: 240px;
    height: 34px;
}

.changePwd-btn {
    text-align: center;
}

/deep/ .ad_index_footer {
    position: fixed;
    bottom: 26px;
    left: 0;
}
</style>
