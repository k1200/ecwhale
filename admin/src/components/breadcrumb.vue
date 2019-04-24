<template>
    <el-breadcrumb id="breadcrumb" style="line-height: 38px;" separator-class="el-icon-arrow-right">
        <span class="el-icon-menu" @click="$emit('updateCollapse')"></span>
        <el-breadcrumb-item v-for="item in menu" :key="item.path"> {{ item.path }} </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
    import { mapState } from 'vuex';
    export default {
        name: 'breadcrumb',
        data() {
            return {

            }
        },
        computed: {
            ...mapState([
                'menu'
            ])
        },
        methods: {

        },
        watch: {
            '$route' (newVal, oldVal) {

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