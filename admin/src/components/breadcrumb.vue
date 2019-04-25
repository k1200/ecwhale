<template>
    <el-breadcrumb id="breadcrumb" style="line-height: 38px;" separator-class="el-icon-arrow-right">
        <span class="el-icon-menu" @click="$emit('updateCollapse')"></span>
        <el-breadcrumb-item v-for="item in menu" :key="item.path"> {{ item.label }} </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
    export default {
        name: 'breadcrumb',
        data() {
            return {
                menu: []
            }
        },
        created () {
            this.updateMenu(this.$route);
        },
        computed: {

        },
        methods: {
            updateMenu (router) {
                let matched = router.matched;
                let menu = [];
                for (let item of matched) {
                    menu.push({label: item.meta.title, path: item.path});
                }
                this.menu = menu;
            }
        },
        watch: {
            '$route' (newVal) {
                this.updateMenu(newVal)
            }
        }
    };
</script>

<style scoped lang="scss">
    .el-icon-menu {
        float: left;
        font-size: 24px;
        margin-right: 15px;
        line-height: 38px;
        cursor: pointer;
        color: #409EFF;
    }
</style>