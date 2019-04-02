<template>
    <div id="goodsDetail">
        <HeaderMain/>
        <div class="main-width">
            <div class="breadcrumb">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
                    <el-breadcrumb-item> {{ category }} </el-breadcrumb-item>
                    <el-breadcrumb-item> {{ goods.ec_goods_name }} </el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="goods-basic">
                <div class="goods-img">
                    <img :src="goods.img_url" alt="">
                </div>
                <div class="goods-other">
                    <div class="goods-title"> {{ goods.ec_goods_name }} </div>
                    <div class="goods-cost"></div>
                    <div class="goods-specifications"> {{  }} </div>
                    <div class="goods-count"></div>
                    <div class="goods-options"></div>
                </div>
            </div>
            <div class="goods-details">
                <div class="details">
                    <p>商品详情</p>
                    <div v-html="goods.goods_info"></div>
                </div>
                <div class="similarity-goods"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import HeaderMain from '@c/headerMain.vue';
    import { onGetGoodsDetails } from "../../service/getData";

    export default {
        name: 'goodsDetails',
        data() {
            return {
                goods: {},
                category: ''
            }
        },
        components: {
            HeaderMain
        },
        created () {
            console.log(this.$route);
            onGetGoodsDetails(this.$route.params.id).then(res => {
                console.log(res);
                this.goods = res.goodsDetails;
            }).catch(err => {
                console.log(err)
            })
        },
        methods: {}
    };
</script>

<style scoped lang="scss">

</style>