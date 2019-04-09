<template>
    <div id="headerTop" v-if="visible">
        <div class="main-width flex-row-between">
            <div>
                <span>您好 {{ userInfo.username }}，欢迎来到 {{ shopInfo.shop_name }}</span>
                <template v-if="login">
                    <button type="button" class="btn-logout hover-cursor" @click="logout"> 【退出】 </button>
                </template>
                <template v-else>
                    <router-link to="login" class="link-login hover-cursor"> 登录 </router-link>
                    <router-link to="/register" class="link-regist hover-cursor"> 免费注册 </router-link>
                </template>
            </div>
            <div class="header-left">
                <router-link to="/home" class="header-nav"> 首页 </router-link> <span class="header-nav"> 购物车 </span> <span class="header-nav"> 个人中心 </span> <span class="header-nav"> 关于我们 </span>
            </div>
        </div>
    </div>
</template>

<script>
    import { onLogout } from '../service/getData';
    import { mapState, mapActions, mapMutations } from 'vuex';
    export default {
        name: 'headerTop',
        data () {
          return {
              visible: true,
              visibleArray: ['/login', '/register', '/forgetPassword']
          }
        },
        created () {
            this.visible = !this.visibleArray.includes(this.$route.path);
            // this.getUserInfo();
            this.getShopDetails();
            // this.getShopInfo();
        },
        computed: {
            ...mapState([
                'shopInfo',
                'userInfo',
                'login'
            ])
        },
        methods: {
            ...mapActions([
                'getUserInfo',
                'getShopDetails'
            ]),
            ...mapMutations([
               'GET_USERINFO'
            ]),
            logout () {
                console.log('logout');
                onLogout().then(() => this.GET_USERINFO())
            }
        },
        watch: {
            '$route' (to, from) {
                this.visible = !this.visibleArray.includes(to.path);
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
        .header-nav {
            @extend .hover-cursor
        }
        .header-nav:not(:last-child) {
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
