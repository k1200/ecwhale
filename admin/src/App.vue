<template>
    <div id="app">
        <el-container>
            <el-header> <pageHeader/> </el-header>
            <el-container>
                <el-aside width="208px"><pageAside/></el-aside>
                <el-container>
                    <el-header style="height: 38px;border-bottom:1px solid #eee;">
                        <el-breadcrumb style="line-height: 38px;" separator-class="el-icon-arrow-right">
                            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                            <el-breadcrumb-item>活动管理</el-breadcrumb-item>
                            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
                            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
                        </el-breadcrumb>
                    </el-header>
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
    /*
    ::-webkit-scrollbar //滚动条整体部分，其中的属性有width,height,background,border（就和一个块级元素一样）等。（位置1）
    ::-webkit-scrollbar-button //滚动条两端的按钮。可以用display:none让其不显示，也可以添加背景图片，颜色改变显示效果。（位置2）
    ::-webkit-scrollbar-track  // 外层轨道。可以用display:none让其不显示，也可以添加背景图片，颜色改变显示效果（位置3）
    ::-webkit-scrollbar-track-piece  //内层轨道，滚动条中间部分（位置4）
    ::-webkit-scrollbar-thumb //滚动条里面可以拖动的那部分（位置5）
    ::-webkit-scrollbar-corner //边角（位置6）
    ::-webkit-resizer //定义右下角拖动块的样式（位置7）*/
    #app {
        min-width: 1200px;
        max-width: 1600px;
        margin: auto;
    }
    #app, .el-container {
        height: 100%;
    }
    .el-main {
        padding-left: 60px !important;
    }
    .el-footer {
        height: auto !important;
        padding: 0 !important;
    }
    .el-aside::-webkit-scrollbar {
        width: 8px;
        display: none;
    }
    .el-aside:hover::-webkit-scrollbar {
        display: block;
    }
    .el-aside::-webkit-scrollbar-track {
        background-color: #eee;
        border-radius: 3px;
    }
    .el-aside::-webkit-scrollbar-thumb {
        background: rgba(64, 158, 255, 0.5);
        border-radius: 3px;
    }
</style>
