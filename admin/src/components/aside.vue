<template>
    <div class="aside">
        <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                :router="true"
                :collapse="collapse">

            <template v-for="menus in menuList">
                <el-submenu v-if="menus.children" :index="menus.label.path">
                    <template slot="title">
                        <i :class="menus.label.icon"></i>
                        <span>{{ menus.label.name }}</span>
                    </template>

                    <template v-for="menu in menus.children">
                        <el-submenu v-if="menu.children" :index="menu.label.path">
                            <template slot="title">
                                <i :class="menu.label.icon"></i>
                                <span>{{ menu.label.name }}</span>
                            </template>
                        </el-submenu>
                        <el-menu-item v-else :index="menu.label.path">
                            <i :class="menu.label.icon"></i>
                            <span slot="title">{{ menu.label.name }}</span>
                        </el-menu-item>
                    </template>

                </el-submenu>
                <el-menu-item v-else :index="menus.label.path">
                    <i :class="menus.label.icon"></i>
                    <span slot="title">{{ menus.label.name }}</span>
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import {mapMutations} from 'vuex';

    export default {
        name: 'pageAside',
        data() {
            return {
                menuList: [
                    {label: {path: '1', icon: '', name: '系统首页'}},
                    {
                        label: {path: '2', icon: 'el-icon-goods', name: '商品管理'},
                        children: [
                            {label: {path: '/addGoods', icon: '', name: '添加商品'}},
                            {label: {path: '2-2', icon: '', name: '商品列表'}},
                            {label: {path: '2-3', icon: '', name: '添加活动'}},
                            {label: {path: '2-4', icon: '', name: '活动商品'}},
                            {label: {path: '2-5', icon: '', name: '优惠券'}},
                            {label: {path: '2-6', icon: '', name: '商品品牌'}}
                        ]
                    },
                    {
                        label: {path: '3', icon: '', name: '订单管理'},
                        children: [
                            {label: {path: '3-1', icon: '', name: '所有订单'}},
                            {label: {path: '3-2', icon: '', name: '活动订单'}},
                            {label: {path: '3-3', icon: '', name: '订单售后'}},
                            {label: {path: '3-4', icon: '', name: '评价管理'}}
                        ]
                    },
                    {
                        label: {path: '4', icon: '', name: '用户管理'},
                        children: [
                            {label: {path: '4-1', icon: '', name: '正常用户'}},
                            {label: {path: '4-2', icon: '', name: '待审核用户'}},
                            {label: {path: '4-3', icon: '', name: '审核失败'}}
                        ]
                    },
                    {label: {path: '5', icon: 'el-icon-document', name: '商城流水'}},
                    {label: {path: '6', icon: 'el-icon-setting', name: '系统设置'}}
                ]
            }
        },
        components: {
            menuList: (function () {
                return {
                    name: 'menuList',
                    props: ['menuList'],
                    template: `<template v-for="menus in menuList">
                                    <el-submenu v-if="menus.children" :index="menus.label.path">
                                        <template slot="title">
                                            <i :class="menus.label.icon"></i>
                                            <span>{{ menus.label.name }}</span>
                                        </template>
                                        <menuList :menuList="menus.children"></menuList>
                                    </el-submenu>
                                    <el-menu-item v-else :index="menus.label.path">
                                        <i :class="menus.label.icon"></i>
                                        <span slot="title">{{ menus.label.name }}</span>
                                    </el-menu-item>
                                </template>`
                }
            }())
        },
        computed: {},
        methods: {
            ...mapMutations([
                'updateMenu'
            ]),
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            handleUpdateMenu() {

            }
        },
        props: {
            collapse: { // 导航展开/收缩
                type: Boolean,
                default: false
            }
        }
    };
</script>

<style scoped lang="scss">
    .aside {
        min-height: 100%;
        border-right: 1px solid #eee;
    }

    .el-menu {
        height: 100%;
        border: none;
    }

</style>
