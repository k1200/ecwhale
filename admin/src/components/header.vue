<template>
    <el-row class="header" type="flex" justify="space-between">
        <el-col :span="4" style="width: 200px">
            <div class="title-content"> {{ admin.name || 'xxx后台管理' }} </div>
        </el-col>
        <el-col :span="14">
            <div class="notification-content" ref="notificationContent">
                <div class="notification-list">
                    <div class="notification-animation" :style="animation" ref="notification">
                        <div v-for="notification in notifications">
                            <router-link tag="p"
                                         v-for="(item, index) in notification"
                                         class="notification text-ellipsis pointer" to="/">
                                <span>{{ index + 1 }}、{{ item }}</span>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="right-content">
                <span> {{ greetings }}{{ admin.user.username }} </span>
                <el-dropdown @command="handleCommand">
                    <span class="el-dropdown-link">
                        设置<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>修改密码</el-dropdown-item>
                        <el-dropdown-item>个人信息</el-dropdown-item>
                        <el-dropdown-item divided command="logout">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </el-col>
    </el-row>
</template>

<script>
    import { getDateTime } from "@/config/utils";

    export default {
        name: 'pageHeader',
        data() {
            return {
                admin: {
                    name: '壹仟贰',
                    user: {username: '壹壹仟壹仟贰'}
                },
                greetings: '',
                notifications: [
                    [
                        'Notification 提供设置偏移量的功能',
                        '通过设置 offset 字段，可以使弹出的消息',
                        '距屏幕边缘偏移一段距离。注意在同一时刻，所有的 Notification 实例应当具有一个',
                        '相同的偏移量',
                        'Notification 提供设置偏移量的功能，通过设置 offset 字段'
                    ]
                ],
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
                let date = getDateTime();
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
                let minHeight = parseInt(this.$refs.notificationContent.offsetHeight);
                let time = parseInt(this.$refs.notification.offsetHeight);
                if (minHeight < time) {
                    this.notifications = [this.notifications[0], this.notifications[0]];
                    this.animation = { animation: `notification ${time / 20}s linear infinite` }
                }
            },
            handleCommand (command) {
                switch (command) {
                    case 'logout':
                        this.$router.push('/login');
                        break;
                    default:
                        console.log(command);
                        break;
                }
            }
        }
    };
</script>

<style lang="scss">
    @keyframes notification {
        from { transform: translateY(0%) }
        to { transform: translateY(-50%) }
    }
</style>
<style scoped lang="scss">
    @import "../style/_variate";
    .header {
        background-color: $color;
        margin: 0 -20px;
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
            &:hover .notification-animation {
                animation-play-state: paused !important;
            }
        }
        .notification {
            margin: 0;
        }
    }
</style>
