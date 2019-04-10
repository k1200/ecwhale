<template>
    <div id="forgetPassword">
        <header class="header ec-color">
            <div class="main-width">
                <router-link tag="span" to="/home" v-if="shopInfo.logo">
                    <img :src="shopInfo.logo">
                </router-link>
                <router-link tag="span" to="/home" class="shop-name" v-else>{{ shopInfo.shop_name }}</router-link>
                <span class="partition">找回密码</span>
                <p class="right"><router-link tag="span" to="/login" replace style="cursor: pointer">去登录<i class="el-icon-sort-down"></i></router-link></p>
            </div>
        </header>

        <article class="article">
            <div class="main-width forgetPassword-form">
                <p class="title">找回密码</p>

                <div class="active-step">
                    <el-steps :active="step" align-center>
                        <el-step title="填写信息" description=""></el-step>
                        <el-step title="设置密码" description=""></el-step>
                        <el-step title="完成" description=""></el-step>
                    </el-steps>
                </div>
                <el-form v-show="step === 1" :model="step_a"
                         status-icon :rules="rule"
                         ref="step_a">
                    <el-form-item class="forgetPassword-input" label="手机号码：" prop="tel" :error="showError.tel">
                        <el-input type="text"
                                  v-model="step_a.tel"
                                  autocomplete="off"
                                  :placeholder="rule.tel[0].message"
                                  clearable>
                        </el-input>
                    </el-form-item>
                    <el-form-item class="forgetPassword-input forgetPassword-code" label="验证码：" prop="code" :error="showError.code">
                        <el-input type="text"
                                  v-model="step_a.code"
                                  autocomplete="off"
                                  :placeholder="rule.code.message"
                                  clearable>
                        </el-input>
                        <span><img class="code-image" src="" alt="" width="90" height="38"><button type="button" class="el-icon-refresh" @click="getImgCode"></button></span>
                    </el-form-item>
                    <el-form-item class="forgetPassword-input forgetPassword-options">
                        <button type="button" class="btn-forgetPassword" @click="getTelCode"> 下一步 </button>
                    </el-form-item>
                </el-form>

                <el-form v-show="step === 2" :model="step_b"
                         status-icon :rules="rule"
                         ref="step_b">
                    <el-form-item class="forgetPassword-input" label="手机验证码：" prop="tel_code" :error="showError.tel_code">
                        <el-input type="text"
                                  v-model="step_b.tel_code"
                                  autocomplete="off"
                                  :placeholder="rule.tel_code.message"
                                  clearable>
                        </el-input>
                    </el-form-item>
                    <el-form-item class="forgetPassword-input" label="新密码：" prop="password" :error="showError.password">
                        <el-input type="password"
                                  v-model="step_b.password"
                                  autocomplete="off"
                                  :placeholder="rule.password.message"
                                  clearable>
                        </el-input>
                    </el-form-item>
                    <el-form-item class="forgetPassword-input" label="确认密码：" prop="password_again" :error="showError.password_again">
                        <el-input type="password"
                                  v-model="step_b.password_again"
                                  autocomplete="off"
                                  :placeholder="rule.password_again[0].message"
                                  clearable>
                        </el-input>
                    </el-form-item>
                    <el-form-item class="forgetPassword-input forgetPassword-options">
                        <button type="button" class="btn-forgetPassword" @click="forgetPassword"> 下一步 </button>
                    </el-form-item>
                </el-form>

                <div v-show="step === 3" class="getPassword">
                    <p><i class="el-icon-circle-check-outline"></i>恭喜您，密码找回成功，马上去登录吧~</p>
                    <button type="button" class="btn-forgetPassword" @click="$router.replace('/login')"> 确定 </button>
                </div>
            </div>
        </article>

        <Popover :visiblyPopover="visiblyPopover"
                 :visiblyBtns="visiblyBtns"
                 @close="close">
            <template #title><p style="text-align: left">提示</p></template>
            <template>
                <p class="forgetPassword-suc"><i class="el-icon-circle-check-outline"></i> 验证码已发出，2分钟内有效，请轻快完成验证！</p>
            </template>
        </Popover>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import { onGetTelCode, onGetImgCode, onForgetPassword } from "../../service/getData";
    import { isTel } from "../../config/utils";
    import Popover from "@c/popover.vue";

    export default {
        name: 'forgetPassword',
        data () {
            let regTel = (rule, value, callback) => isTel(value) ? callback() : callback(new Error('请输入正确的手机号'));
            let regPassword = (rule, value, callback) => {
                if (value !== this.step_b.password) {
                    callback(new Error('两次密码输入不一致，请重新输入！'))
                } else {
                    callback()
                }
            };
            let rule = {
                tel: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { validator: regTel, trigger: 'blur' }
                ],
                tel_code: { required: true, message: '请输入手机验证码', trigger: 'blur' },
                password: { required: true, message: '请输入密码', trigger: 'blur' },
                password_again: [
                    { required: true, message: '请确认密码', trigger: 'blur' },
                    { validator: regPassword, trigger: 'blur' }
                ],
                code: { required: true, message: '请输入验证码', trigger: 'blur' }
            };
            return {
                step_a: {
                    tel: '',
                    code: ''
                },
                step_b: {
                    tel_code: '',
                    password: '',
                    password_again: '',
                },
                showError: {
                    tel: '',
                    tel_code: '',
                    password: '',
                    password_again: '',
                    code: ''
                },
                rule,
                visiblyPopover: false,
                visiblyBtns: false,
                step: 1
            }
        },
        components: {
            Popover
        },
        computed:{
            ...mapState([
                'shopInfo'
            ])
        },
        methods: {
            getTelCode () {
                this.$refs.step_a.validate(valid => {
                    if (valid) {
                        this.showError = {
                            tel: '',
                            tel_code: '',
                            password: '',
                            password_again: '',
                            code: ''
                        };
                        onGetTelCode(this.step_a.tel).then(() => {
                            this.visiblyPopover = true;
                            this.step = 2;
                        });
                    } else {
                        console.log(valid);
                        return false;
                    }
                });
            },
            getImgCode () {
                onGetImgCode().then(res => {

                }).catch(error => console.log(error));
            },
            forgetPassword () {
                this.$refs.step_b.validate( valid => {
                    if (valid) {
                        this.showError = {
                            tel: '',
                            tel_code: '',
                            password: '',
                            password_again: '',
                            code: ''
                        };
                        this.step = 3;
                        onForgetPassword(this.step_b).then(res => {
                            if (res.userId) {
                                this.step = 3;
                            } else if (res.error) {
                                for(let item of res.error) {
                                    this.showError[item.name] = item.message;
                                }
                            }
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            confirm () {
                this.visiblyPopover = false;
                this.$router.replace('/login');
            },
            close () {
                this.visiblyPopover = false;
            }
        }
    };
</script>

<style lang="scss">
    @import "../../style/variate";
    #app {
        background-color: #fafafa;
    }
    .active-step {
        .el-step__title {
            font-size: 12px;
        }
    }
    .forgetPassword-input {
        label {
            float: none;
            display: inline-block;
            width: 115px;
        }
        .el-form-item__content {
            width: 302px;
            display: inline-block;
        }
        .el-input-group__append {
            background-color: $btn-color;
            cursor: pointer;
            border: none
        }
    }
</style>
<style scoped lang="scss">
    /*@import "@s/variate";*/
    @import "../../style/variate";
    #forgetPassword {
        margin-bottom: 80px;
    }

    header {
        height: 88px;
        line-height: 88px;
        margin-bottom: 20px;
        box-shadow:0 0 9px 0 rgba(0, 0, 0, 0.11);
        background-color: #fff;
        span {
            vertical-align: middle;
        }
        .shop-name {
            font-size: 26px;
            font-weight: bold
        }

        .partition {
            font-size: 22px;
            position: relative;
            margin-left: 5px;
            padding-left: 5px;
            &::after {
                content: "";
                position: absolute;
                left: 0;
                top: 0;
                width: 1px;
                height: 100%;
                background-color: $color
            }
        }
        .el-icon-sort-down {
            transform: rotate(-90deg);
            font-size: 18px;
        }
    }
    .forgetPassword-form {
        background-color: #fff;
        text-align: center;
        height: 600px;
        padding: 38px 0;
        .title {
            font-size: 20px;
            margin: 18px 0 30px;
            position: relative;
            font-weight: bold;
            line-height: 30px;
        }
    }
    .active-step {
        width: 80%;
        margin: auto;
        padding: 60px 0 32px;
    }
    .forgetPassword-input {
        margin-bottom: 25px;
    }
    .forgetPassword-options {
        margin-left: 115px;
        margin-top: 42px;
    }
    .btn-forgetPassword {
        width: 100%;
        height: 36px;
        line-height: 36px;
        border-radius: 4px;
        background-color: $btn-color;
        color: #fff;
        font-size: 16px;
        cursor: pointer;
    }
    .protocol {
        font-size: 12px;
        color: $minor_color;
    }
    .btn-protocol {
        color: #477bad;
    }
    .forgetPassword-code .el-input {
        width: 182px;
    }
    .code-image {
        display: inline-block;
        border: 1px solid #eee;
        vertical-align: middle;
        margin: 0 4px;
        border-radius: 4px;
    }
    .el-icon-refresh {
        font-size: 20px;
        color: $weak_color;
        vertical-align: middle;
        cursor: pointer;
        &:hover {
            color: $color;
        }
    }
    .forgetPassword-suc, .getPassword {
        color: $color;
        .el-icon-circle-check-outline {
            font-size: 18px;
            vertical-align: bottom;
            margin-right: 3px;
        }
    }
    .getPassword .btn-forgetPassword {
        width: 180px;
        margin-top: 42px;
    }

</style>
