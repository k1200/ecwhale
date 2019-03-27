<template>
    <div id="login">
        <header class="header main-width ec-color">
      <span v-if="dataList.logo">
        <img :src="dataList.logo">
      </span>
            <span class="shop-name" v-else>{{ dataList.name }}</span>
            <span class="partition">欢迎登录</span>
        </header>
        <article class="article">
            <div class="main-width">
                <el-form :model="login_form"
                         status-icon :rules="rule_form"
                         ref="login_form"
                         class="login-form right">
                    <p class="title">欢迎登录</p>
                    <el-form-item class="login-input" label="" prop="username">
                        <el-input type="text"
                                  v-model="login_form.username"
                                  autocomplete="off"
                                  :placeholder="rule_form.username.message"
                                  clearable>
                            <img slot="prefix" style="margin-top: 8px" src="../../assets/user.png">
                        </el-input>
                    </el-form-item>
                    <el-form-item class="login-input" label="" prop="password">
                        <el-input class="login-input"
                                  type="password"
                                  v-model="login_form.password"
                                  autocomplete="off"
                                  :placeholder="rule_form.password.message"
                                  clearable>
                            <img slot="prefix" style="margin-top: 10px" src="../../assets/password.png">
                        </el-input>
                    </el-form-item>
                    <!--<el-form-item class="login-input">-->
                    <!--<verify type="points"-->
                    <!--v-bind="pointProps"-->
                    <!--@success="verifySuccess"-->
                    <!--@reset-verify="resetVerify"-->
                    <!--@point-over="pointOver"-->
                    <!--@point-out="pointOut"-->
                    <!--@point-move="pointMove">-->
                    <!--&lt;!&ndash;<template #tip><span>{{ tip }}</span></template>&ndash;&gt;-->
                    <!--&lt;!&ndash;<div style="border-radius: 50%;height: 100%;border: 1px solid #dadada; background-color: #fff" :style="{ color: pointColor }">{{ point }}</div>&ndash;&gt;-->
                    <!--</verify>-->
                    <!--</el-form-item>-->

                    <el-form-item class="login-input">
                        <verify type="points"
                                v-bind="pointProps"
                                @success="verifySuccess"
                                @reset-verify="resetVerify"
                                @point-over="pointOver"
                                @point-out="pointOut"
                                @point-move="pointMove">
                        </verify>
                    </el-form-item>

                    <!--<el-form-item class="login-input" prop="aritRes" :show-message="showMsg" :error="error">-->
                    <!--<verify type="code"-->
                    <!--v-bind="codeProps"-->
                    <!--@success="verifySuccess"-->
                    <!--@reset-verify="resetVerify">-->
                    <!--&lt;!&ndash;<template #question="{ question }"><p>{{ question }}</p></template>&ndash;&gt;-->
                    <!--</verify>-->
                    <!--</el-form-item>-->

                    <el-form-item>
                        <button class="login-btn" type="button" @click="submitForm('login_form')">登&nbsp;&nbsp;&nbsp;&nbsp;录</button>
                    </el-form-item>
                    <el-form-item>
                        <div class="flex-row-between">
                            <router-link to="/" style="color: #666">忘记密码</router-link>
                            <router-link class="ec-link" to="/">立即注册»</router-link>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
        </article>
        <!--<footer class="footer main-width">-->
            <!--{{ dataList.aq }}-->
        <!--</footer>-->
    </div>
</template>

<script>
    import verify from '../../components/verify.vue';
    import { mapMutations } from 'vuex'
    import { onGetShopInfo, onLogin } from "../../service/getData";

    export default {
        data() {
            return {
                dataList: {
                    logo: '',
                    name: '壹仟贰·SHOP',
                    aq: '版权所有©2018-2022XX有限公司  粤ICP12345678号-1'
                },
                login_form: {
                    username: '13590372112',
                    password: 'GD123456'
                },
                rule_form: {
                    username: {required: true, message: '请输入用户名', trigger: 'blur'},
                    password: {required: true, message: '请输入密码', trigger: 'blur'},
                    aritRes: {required: true, message: '验证码输入错误或未输入验证码', trigger: 'blur'}
                },

                codeProps: {
                    figure: 1,
                    style: {
                        height: '38px',
                        borderRadius: '20px',
                        border: '',
                        backgroundColor: ''
                    }
                },

                point: '▶',
                tip: '向右滑动验证码',
                pointColor: '#999',
                pointProps: {
                    // pointBg: '#fff',
                    // successColor: '#ff4e68',
                    // chunkBg: '',
                    // height: '40px'
                },

                showMsg: true,
                error: ''
            };
        },
        created() {
            onGetShopInfo().then(res => {
                this.dataList.name = res.shop_name;
                this.RECORD_SHOPINFO(res);
            });
        },
        components: {
            verify
        },
        computed: {},
        methods: {
            ...mapMutations([
                'RECORD_USERINFO',
                'RECORD_SHOPINFO'
            ]),
            verifySuccess(options) {
                if (options) {
                    this.login_form.aritRes = '1200';
                    this.tip = '验证通过';
                    this.point = '↻';
                } else {
                    this.login_form.aritRes = '';
                    this.error = '验证码输入错误或未输入验证码';
                }
            },
            resetVerify() {
                this.tip = '向右滑动验证码';
                this.point = '▶';
            },

            pointOver() {
                this.pointColor = '#ff4e68';
            },
            pointOut() {
                this.pointColor = '#999';
            },
            pointMove() {
                console.log('pointMove');
            },

            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        onLogin(this.login_form).then(res => {
                            this.RECORD_USERINFO(res);
                            this.$router.go(-1);
                        });
                    } else {
                        console.log('error submit!!')
                        return false;
                    }
                });
            },
            resetForm() {

            }
        },
        watch: {
            'login_form.aritRes': function (newVal) {
                this.showMsg = newVal ? false : true;
            }
        }
    };
</script>

<style>
    .login-input input {
        border-radius: 20px;
    }

    .login-input .el-form-item__error {
        padding-left: 30px;
    }
</style>
<style lang="scss" scoped>
    @import "../../style/variate";
    #login {
        margin-bottom: 80px;
    }
    header {
        height: 88px;
        line-height: 88px;
        span {
            vertical-align: middle;
        }
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

    article {
        height: 650px;
        background: url("../../assets/login.jpg") center;
        min-width: $width
    }

    .title {
        font-size: 20px;
        margin: 18px 0 30px;
        position: relative;
        font-weight: bold;
        line-height: 30px;
        &::after {
            content: '';
            position: absolute;
            width: 20px;
            height: 1px;
            background-color: #C61936;
            bottom: -4px;
            left: 0;
            right: 0;
            margin: auto;
        }
    }

    .login-form {
        width: 350px;
        height: 385px;
        padding: 12px 24px;
        margin-top: 118px;
        text-align: center;
        background-color: rgba(255, 255, 255, 0.9);
        box-shadow: 0px 3px 12px 1px rgba(169, 112, 70, 0.29);
        border-radius: 10px
    }

    .login-btn {
        width: 100%;
        border-radius: 20px;
        background-color: $color;
        height: 40px;
        line-height: 40px;
        color: #fff;
        cursor: pointer;
    }
</style>
