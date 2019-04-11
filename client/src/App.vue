<template>
    <div id="app" class="min-width">
        <Header/>
        <router-view/>
        <Footer/>
    </div>
</template>

<script>
    import Header from "./components/headerTop";
    import Footer from "./components/footerMin";
    export default {
        name: 'app',
        components: {
            Header,
            Footer
        }
    };
</script>

<style lang="scss">
    @import './style/common.scss';
    #app {
        min-height: 100%;
        position: relative;
    }
</style>
