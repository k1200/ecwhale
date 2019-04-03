<template>
    <div id="register">
        <header class="header ec-color">
            <div class="main-width">
                <span v-if="shopInfo.logo">
                    <img :src="shopInfo.logo">
                </span>
                <span class="shop-name" v-else>{{ shopInfo.shop_name }}</span>
                <span class="partition">欢迎注册</span>
            </div>
        </header>

        <article class="article">
            <div class="main-width register-form">
                <el-form :model="form"
                         status-icon :rules="rule"
                         ref="form">
                    <p class="title">欢迎注册</p>
                    <el-form-item class="register-input" label="手机号码：" prop="tel">
                        <el-input type="text"
                                  v-model="form.tel"
                                  autocomplete="off"
                                  :placeholder="rule.tel.message"
                                  clearable>
                        </el-input>
                    </el-form-item>
                    <el-form-item class="register-input" label="手机验证码：" prop="tel_code">
                        <el-input type="text"
                                  v-model="form.tel_code"
                                  autocomplete="off"
                                  :placeholder="rule.tel_code.message"
                                  clearable>
                        </el-input>
                    </el-form-item>
                    <el-form-item class="register-input" label="初始密码：" prop="password">
                        <el-input type="password"
                                  v-model="form.password"
                                  autocomplete="off"
                                  :placeholder="rule.password.message"
                                  clearable>
                        </el-input>
                    </el-form-item>
                    <el-form-item class="register-input" label="确认密码：" prop="password_again">
                        <el-input type="password"
                                  v-model="password_again"
                                  autocomplete="off"
                                  :placeholder="rule.password_again.message"
                                  clearable>
                        </el-input>
                    </el-form-item>
                    <el-form-item class="register-input" label="验证码：" prop="code">
                        <el-input type="text"
                                  v-model="code"
                                  autocomplete="off"
                                  :placeholder="rule.code.message"
                                  clearable>
                        </el-input>
                    </el-form-item>
                </el-form>
            </div>
        </article>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex';
    export default {
        name: 'register',
        data () {
            let rule = {
                tel: { required: true, message: '请输入用户名', trigger: 'blur' },
                tel_code: { required: true, message: '请输入手机验证码', trigger: 'blur' },
                password: { required: true, message: '请输入密码', trigger: 'blur' },
                password_again: {  required: true, message: '请确认密码', trigger: 'blur' },
                code: { required: true, message: '请输入验证码', trigger: 'blur' }
            };
            return {
                form: {
                    tel: '',
                    tel_code: '',
                    password: '',
                    code: ''
                },
                password_again: '',
                rule
            }
        },
        computed:{
            ...mapState([
                'shopInfo'
            ])
        },
        created () {
            this.getShopInfo();
        },
        methods: {
            ...mapActions([
                'getShopInfo'
            ])
        }
    };
</script>

<style lang="scss">
    #app {
        background-color: #fafafa;
    }
    .register-input {
        label {
            float: none;
        }
        .el-form-item__content {
            width: 302px;
            display: inline-block;
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
        box-shadow:0px 0px 9px 0px rgba(0, 0, 0, 0.11);
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
    }
    .header {
        background-color: #fff;
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
    .register-input {
        margin-bottom: 25px;
    }

</style>