<template>
    <div id="headerTop">
        <div class="main-width flex-row-between">
            <div>
                <span>您好 {{ username }}，欢迎来到 {{ shop_name }}</span>
                <template v-if="username">
                    <button type="button" class="btn-logout hover-cursor" @click="logout"> 【退出】 </button>
                </template>
                <template v-else>
                    <router-link to="login" class="link-login hover-cursor"> 登录 </router-link>
                    <router-link to="/" class="link-regist hover-cursor"> 免费注册 </router-link>
                </template>
            </div>
            <div class="header-left">
                <span> 首页 </span> <span> 购物车 </span> <span> 个人中心 </span> <span> 关于我们 </span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'headerTop',
    data() {
        return {
            username: '',
            shop_name: '壹壹仟壹仟贰'
        }
    },
    methods: {
        logout () {
            console.log('logout');
        }
    }
};
</script>

<style scoped lang="scss">
    #headerTop {
        background-color: #f4f4f4;
        font-size: 12px;
        height: 36px;
        line-height: 36px
    }
    .hover-cursor {
        cursor: pointer;
        color: #333;
        &:hover {
            color: #23527c
        }
    }
    .btn-logout, .link-login {
        margin: 0 12px
    }
    .header-left {
        span {
            @extend .hover-cursor
        }
        span:not(:last-child) {
            position: relative;
            margin-right: 10px;
            &::after {
                content: '';
                position: absolute;
                width: 1px;
                height: 100%;
                top: 0;
                right: -3px;
                background-color: #bbb
            }
        }
    }

</style>