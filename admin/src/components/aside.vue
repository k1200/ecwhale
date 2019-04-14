<template>
    <div class="aside">
        <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                :router="true"
                :collapse="isCollapse">
            <template v-for="menus in menuList">
                <el-submenu v-if="menus[1]" :index="menus[0].id">
                    <template slot="title">
                        <i :class="menus[0].icon"></i>
                        <span>{{ menus[0].name }}</span>
                    </template>
                    <el-menu-item v-for="menu in menus[1]" :index="menu.id">{{ menu.name }}</el-menu-item>
                </el-submenu>

                <el-menu-item v-else :index="menus[0].id">
                    <i :class="menus[0].icon"></i>
                    <span slot="title">{{ menus[0].name }}</span>
                </el-menu-item>

            </template>

            <!--<el-submenu index="1">-->
                <!--<template slot="title">-->
                    <!--<i class="el-icon-location"></i>-->
                    <!--<span>导航一</span>-->
                <!--</template>-->
                <!--<el-menu-item-group>-->
                    <!--<template slot="title">分组一</template>-->
                    <!--<el-menu-item index="1-1">选项1</el-menu-item>-->
                    <!--<el-menu-item index="1-2">选项2</el-menu-item>-->
                <!--</el-menu-item-group>-->
                <!--<el-menu-item-group title="分组2">-->
                    <!--<el-menu-item index="1-3">选项3</el-menu-item>-->
                <!--</el-menu-item-group>-->
                <!--<el-submenu index="1-4">-->
                    <!--<template slot="title">选项4</template>-->
                    <!--<el-menu-item index="1-4-1">选项1</el-menu-item>-->
                <!--</el-submenu>-->
            <!--</el-submenu>-->
            <!--<el-menu-item index="2">-->
                <!--<i class="el-icon-menu"></i>-->
                <!--<span slot="title">导航二</span>-->
            <!--</el-menu-item>-->
            <!--<el-menu-item index="3" disabled>-->
                <!--<i class="el-icon-document"></i>-->
                <!--<span slot="title">导航三</span>-->
            <!--</el-menu-item>-->
            <!--<el-menu-item index="4">-->
                <!--<i class="el-icon-setting"></i>-->
                <!--<span slot="title">导航四</span>-->
            <!--</el-menu-item>-->
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: 'pageAside',
        data() {
            return {
                isCollapse: false, // 导航展开/收缩
                menuList: [
                    [{ id: '1', icon: '', name: '系统首页' }],
                    [{ id: '2', icon: 'el-icon-goods', name: '商品管理' }, [
                        { id: '/addGoods', icon: '', name: '添加商品' },
                        { id: '2-2', icon: '', name: '商品列表' },
                        { id: '2-3', icon: '', name: '添加活动' },
                        { id: '2-4', icon: '', name: '活动商品' },
                        { id: '2-5', icon: '', name: '优惠券' },
                        { id: '2-6', icon: '', name: '商品品牌' }
                    ]],
                    [{ id: '3', icon: '', name: '订单管理'}, [
                        { id: '3-1', icon: '', name: '所有订单' },
                        { id: '3-2', icon: '', name: '活动订单' },
                        { id: '3-3', icon: '', name: '订单售后' },
                        { id: '3-4', icon: '', name: '评价管理'}
                    ]],
                    [{ id: '4', icon: '', name: '用户管理'}, [
                        { id: '4-1', icon: '', name: '正常用户' },
                        { id: '4-2', icon: '', name: '待审核用户' },
                        { id: '4-3', icon: '', name: '审核失败' }
                    ]],
                    [{ id: '5', icon: 'el-icon-document', name: '商城流水' }],
                    [{ id: '6', icon: 'el-icon-setting', name: '系统设置'}]
                ]
            }
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
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
