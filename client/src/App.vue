<template>
    <div id="app" class="min-width">
        <router-view name="header"/>
        <router-view name="default"/>
        <router-view name="footer"/>
    </div>
</template>

<script>
    export default {
        name: 'app'
    };
</script>

<style lang="scss">
    @import './style/common.scss';
    #app {
        min-height: 100%;
        position: relative;
    }
</style>
