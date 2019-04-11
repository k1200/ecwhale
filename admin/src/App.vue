<template>
    <div id="app">
        <el-container>
            <el-header> <pageHeader/> </el-header>
            <el-container>
                <el-aside width="200px"><pageAside/></el-aside>
                <el-container>
                    <el-main><router-view/></el-main>
                    <el-footer> <pageFooter/> </el-footer>
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>
<script>
    import pageHeader from "./components/header";
    import pageAside from "./components/aside";
    import pageFooter from "./components/footer";
    export default {
        components: {
            pageHeader,
            pageAside,
            pageFooter
        }
    }
</script>
<style lang="scss">
    @import "style/common";
    #app, .el-container {
        height: 100%;
    }
    .el-main {
        padding-left: 60px !important;
    }
    .el-footer {
        height: auto !important;
    }
</style>
