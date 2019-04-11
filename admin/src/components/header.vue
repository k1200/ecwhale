<template>
    <el-row class="header" type="flex" justify="space-between">
        <el-col :span="4">
            <div class="title-content"> {{ admin.name || 'xxx后台管理' }} </div>
        </el-col>
        <el-col :span="14">
            <div class="notification-content">
                <div class="notification-list">
                    <div :style="animation" ref="notification">
                        <p class="notification">Notification 提供设置偏移量的功能</p>
                        <p class="notification">通过设置 offset 字段，可以使弹出的消息</p>
                        <p class="notification">距屏幕边缘偏移一段距离。注意在同一时刻，所有的 Notification 实例应当具有一个</p>
                        <p class="notification">相同的偏移量</p>
                        <p class="notification">Notification 提供设置偏移量的功能，通过设置 offset 字段</p>
                    </div>
                </div>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="right-content">
                <span> {{ greetings }}{{ admin.user.username }} </span>
                <el-dropdown>
                    <span class="el-dropdown-link">
                        设置<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>修改密码</el-dropdown-item>
                        <el-dropdown-item>个人信息</el-dropdown-item>
                        <el-dropdown-item divided>退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </el-col>
    </el-row>
</template>

<script>
    import { getTimeInfo, getStyle } from "@/config/utils";

    export default {
        name: 'pageHeader',
        data() {
            return {
                admin: {
                    name: '壹仟贰',
                    user: {username: '壹壹仟壹仟贰'}
                },
                greetings: '',
                animation: null
            }
        },
        created() {
            this.greetings = this.getGreetings()
        },
        computed: {

        },
        mounted () {
            this.setAnimation();
        },
        methods: {
            getGreetings () {
                let date = getTimeInfo();
                let h = parseInt(date.h);
                if (h < 9) {
                    return '早上好！';
                } else if (h >= 9 && h < 12) {
                    return '上午好！';
                } else if (h >= 12 && h < 13) {
                    return '中午好！';
                } else if (h >= 13 && h < 18) {
                    return '下午好！';
                } else if (h >= 18) {
                    return '晚上好！';
                }
            },
            setAnimation () {
                let time = parseInt(this.$refs.notification.offsetHeight);
                this.animation = { animation: `notification ${time / 20}s linear infinite` }
            }
        }
    };
</script>

<style lang="scss">
    @keyframes notification {
        from { transform: translateY(0%) }
        to { transform: translateY(-100%) }
    }
</style>
<style scoped lang="scss">
    @import "../style/_variate";
    .header {
        background-color: $color;
        margin: 0 -20px;
        padding: 0 0 0 20px;
        color: #fff;
        height: 100%;
        line-height: 60px;
        overflow: hidden;
    }
    .title-content {
        font-size: 20px;
        font-weight: bold;
        text-align: right;
        padding-right: 20px;
    }
    .right-content {
        text-align: right;
    }
    .el-dropdown {
        background-color: #3a8ee6;
        margin-left: 12px;
        color: #fff;
        width: 120px;
        text-align: center;
        .el-dropdown-link {
            display: block;
            cursor: pointer;
        }
    }
    .notification-content {
        line-height: 24px;
        font-size: 12px;
        height: 100%;
        padding: 5px 20px;
        .notification-list {
            height: 100%;
            overflow: hidden;
        }
        .notification {
            margin: 0;
        }
    }
</style>