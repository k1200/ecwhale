<template>
    <div id="produts">
        <div class="main-width category-sort">
            <div class="category"></div>
            <div class="sort"></div>
        </div>
        <div class="main-width"></div>
    </div>
</template>

<script>
    import { onGetHomeData } from "../../service/getData";
    import { getIntervalTime } from "../../config/utils";
    import GoodsList from '@c/goodsList.vue';
    export default {
        name: "products",
        comments: {
            GoodsList
        }
    }
</script>

<style scoped lang="scss">
    #produts {
        background-color: #f6f3ee;
    }
</style>
