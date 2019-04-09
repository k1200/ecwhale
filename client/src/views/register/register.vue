<template>
    <div id="register">
        <header class="header ec-color">
            <div class="main-width">
                <router-link tag="span" to="/home" v-if="shopInfo.logo">
                    <img :src="shopInfo.logo">
                </router-link>
                <router-link tag="span" to="/home" class="shop-name" v-else>{{ shopInfo.shop_name }}</router-link>
                <span class="partition">欢迎注册</span>
                <p class="right"><span style="color: #666">已有账号？ </span> <router-link tag="span" to="/login" replace style="cursor: pointer">去登录<i class="el-icon-sort-down"></i></router-link></p>
            </div>
        </header>

        <article class="article">
            <div class="main-width register-form">
                <el-form :model="form"
                         status-icon :rules="rule"
                         ref="form">
                    <p class="title">欢迎注册XX账号</p>
                    <el-form-item class="register-input" label="手机号码：" prop="tel" :error="showError.tel">
                        <el-input type="text"
                                  v-model="form.tel"
                                  autocomplete="off"
                                  :placeholder="rule.tel.message"
                                  clearable>
                        </el-input>
                    </el-form-item>
                    <el-form-item class="register-input" label="手机验证码：" prop="tel_code" :error="showError.tel_code">
                        <el-input type="text"
                                  v-model="form.tel_code"
                                  autocomplete="off"
                                  :placeholder="rule.tel_code.message"
                                  clearable>
                            <button type="button" slot="append" class="getTelCode" :disabled="waitTime" @click="getTelCode">{{ telcode_text }}</button>
                        </el-input>
                    </el-form-item>
                    <el-form-item class="register-input" label="初始密码：" prop="password" :error="showError.password">
                        <el-input type="password"
                                  v-model="form.password"
                                  autocomplete="off"
                                  :placeholder="rule.password.message"
                                  clearable>
                        </el-input>
                    </el-form-item>
                    <el-form-item class="register-input" label="确认密码：" prop="password_again" :error="showError.password_again">
                        <el-input type="password"
                                  v-model="form.password_again"
                                  autocomplete="off"
                                  :placeholder="rule.password_again.message"
                                  clearable>
                        </el-input>
                    </el-form-item>
                    <el-form-item class="register-input register-code" label="验证码：" prop="code" :error="showError.code">
                        <el-input type="text"
                                  v-model="form.code"
                                  autocomplete="off"
                                  :placeholder="rule.code.message"
                                  clearable>
                        </el-input>
                        <span><img class="code-image" src="" alt="" width="90" height="38"><button type="button" class="el-icon-refresh" @click="getImgCode"></button></span>
                    </el-form-item>
                    <el-form-item class="register-input register-options">
                        <button type="button" class="btn-register" @click="register"> 立即注册 </button>
                        <p class="protocol">点击立即注册，即表示您同意<button type="button" class="btn-protocol">《XXX商城服务平台》</button></p>
                    </el-form-item>
                </el-form>
            </div>
        </article>

        <Popover :visiblyPopover="visiblyPopover"
                 :visiblyCancel="visiblyCancel"
                 :confirmTxt="confirmTxt"
                 @confirm="confirm"
                 @close="close">
            <template #title>恭喜您，注册成功！</template>
            <template>
                <p class="register-suc"><i class="el-icon-circle-check-outline"/>您已注册成功，可以下单购买了，百分百原装日货等着您!</p>
            </template>
        </Popover>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import { onGetTelCode, onGetImgCode, onRegister } from "../../service/getData";
    import { isTel, getIntervalTime } from "../../config/utils";
    import Popover from "@c/popover.vue";

    export default {
        name: 'register',
        data () {
            let regTel = (rule, value, callback) => isTel(value) ? callback() : callback(new Error('请输入正确的手机号'));
            let regPassword = (rule, value, callback) => {
                if (value !== this.form.password) {
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
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
                password_again: [
                    { required: true, message: '请确认密码', trigger: 'blur' },
                    { validator: regPassword, trigger: 'blur' }
                ],
                code: { required: true, message: '请输入验证码', trigger: 'blur' }
            };
            return {
                form: {
                    tel: '',
                    tel_code: '',
                    password: '',
                    password_again: '',
                    code: ''
                },
                showError: {
                    tel: '',
                    tel_code: '',
                    password: '',
                    password_again: '',
                    code: ''
                },
                rule,
                telcode_text: '获取验证码',
                visiblyPopover: false,
                visiblyCancel: false,
                confirmTxt: '去登录',
                waitTime: false
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
                this.waitTime = true;
                this.$refs.form.validateField('tel', async valid => {
                    if (!valid) {
                        let res = await onGetTelCode(this.form.tel);
                        let intervalTime = getIntervalTime(time => {
                            if (time.intervalTime > 0) {
                                this.telcode_text = `${time.intervalTime / 1000}s后,重新获取`;
                            } else {
                                this.telcode_text = `获取验证码`;
                                this.waitTime = false;
                            }
                        }, 0, res.time);
                        intervalTime.pending = true;
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
            register () {
                this.$refs.form.validate( valid => {
                    if (valid) {
                        this.showError = {
                            tel: '',
                                tel_code: '',
                                password: '',
                                password_again: '',
                                code: ''
                        };
                        onRegister(this.form).then(res => {
                            if (res.userId) {
                                this.$refs.form.resetFields();
                                this.visiblyPopover = true;
                            } else if (res.error) {
                                for(let item of res.error) {
                                    this.showError[item.name] = item.message;
                                }
                            }
                        });
                    } else {
                        console.log('error submit!!')
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
    .register-input {
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
    #register {
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
    .register-form {
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
    .getTelCode {
        color: #fff;
        font-size: 12px;
        cursor: pointer;
        margin: -10px -20px;
        padding: 12px 20px;
        display: inline-block;
    }
    .register-input {
        margin-bottom: 25px;
    }
    .register-options {
        margin-left: 115px;
        margin-top: 42px;
    }
    .btn-register {
        width: 100%;
        height: 36px;
        line-height: 36px;
        border-radius: 4px;
        background-color: $btn-color;
        color: #fff;
        font-size: 16px;
    }
    .protocol {
        font-size: 12px;
        color: $minor_color;
    }
    .btn-protocol {
        color: #477bad;
    }
    .register-code .el-input {
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
    .register-suc {
        color: $color;
        .el-icon-circle-check-outline {
            font-size: 18px;
            vertical-align: bottom;
            margin-right: 3px;
        }
    }

</style>
