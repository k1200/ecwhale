<template>
    <div class="home">
        <HeaderTop/>
        <HeaderMain :basicGoods="basicGoods"/>
        <el-carousel indicator-position="none" :autoplay="false">
            <el-carousel-item v-for="item in 4" :key="item">
                <img src="../../assets/banner.png" width="100%" height="100%" alt="">
            </el-carousel-item>
        </el-carousel>
        <div class="activity-hot">
            <div class="decorate">
                <img class="decorate-img decorate-left-img" src="../../assets/decorate-01.png" width="475" alt="decorate-01">
                <img class="decorate-img decorate-right-img" src="../../assets/decorate-02.png" width="285" alt="decorate-02">
                <div class="decorate-side">
                    <div class="activity-list">
                        <div class="activity-info">
                            <p class="activity-title"> {{ activityList.ac_title }} </p>
                            <img src="../../assets/japan.png" width="228" height="157" alt="japan">
                            <p class="activity-time">
                                <span>01</span>天<span>05</span>时<span>25</span>分<span>45</span>秒
                            </p>
                        </div>
                        <div class="activity-goods">
                            <el-carousel class="activity-goods-carousel" indicator-position="outside" arrow="always" :autoplay="false">
                                <el-carousel-item class="goods-side" v-for="index in activityLoop">
                                    <router-link to="/" class="goods" v-for="goods in activityList.goodsList.slice(loopStart(index), loopEnd(index))" :key="goods.goods_id">
                                        <div class="goods-img"><img :src="goods.goods_img_url" width="100%" height="auto" alt=""></div>
                                        <div class="goods-title text-ellipsis"> {{ goods.ec_goods_name }} </div>
                                        <div class="goods-price"> <span> ¥{{ goods.ag_price }} </span> <del> ¥{{ goods.ec_sales_price }} </del> <button type="button" class="right btn-addcar-activity">
                                            <img src="../../assets/tocart.png" width="100%" alt=""></button></div>
                                    </router-link>
                                </el-carousel-item>
                            </el-carousel>
                        </div>
                    </div>
                    <div class="hot-list flex-row-between">
                        <router-link to="/" class="goods" v-for="goods in hotList" :key="goods.goods_id"><img :src="goods.pc_accessory_url" width="100%" height="100%" alt="" class="goods-img"></router-link>
                    </div>
                </div>
            </div>
        </div>
        <div class="floor-goods">
            <div class="floor-goods-list main-width" v-for="goodsList in basicGoods" :key="goodsList.id" v-if="goodsList.allGoods">
                <div class="category">
                    <span class="category-title"> {{ goodsList.category_name }} </span>
                    <p class="category-child right">
                        <router-link to="/"> 全部 </router-link>
                        <router-link v-for="category in goodsList.child" :key="category.id" to="/"> {{ category.category_name }} </router-link>
                    </p>
                </div>

                <div class="goods-groups">
                    <div v-if="goodsList.hotGoods" class="hot-goods"><img :src="goodsList.hotGoods.pc_accessory_url" width="100%" height="283" alt=""> </div>
                    <div class="goods" v-for="goods in goodsList.allGoods" :key="goods.goods_id">
                        <div class="goods-img"><router-link to="/"><img class="position-center" :src="goods.goods_img_url" alt=""></router-link></div>
                        <div class="goods-info">
                            <div class="goods-title text-ellipsis"> <router-link to="/"> {{ goods.ec_goods_name }} </router-link></div>
                            <div class="goods-price"> <span class="price"> ¥{{ goods.ec_sales_price }} </span> <span class="right deliver-area"> {{ goods.deliver_area == "0" ? "保税区发货" : "日本直邮" }} </span> </div>
                            <button type="button" class="right btn-addcar-goods"> <img src="../../assets/tocart.png" alt=""></button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    // @ is an alias to /src
    import HeaderTop from '@c/headerTop.vue';
    import HeaderMain from '@c/headerMain.vue';
    import { onGetHomeData } from "../../service/getData";

    export default {
        name: 'home',
        data () {
            return {
                basicGoods: null,
                activityList: { goodsList: [] },
                hotList: null,

            }
        },
        components: {
            HeaderTop,
            HeaderMain
        },
        created() {
            onGetHomeData().then(res => {
                this.basicGoods = res.basicGoodsList;
                this.activityList = res.activeGoodsList;
                this.hotList = res.hotGoodsList;
            });
        },
        computed: {
            activityLoop () {
                return Math.ceil(this.activityList.goodsList.length / 4);
            }
        },
        methods: {
            loopStart (index) {
                if (index > 1) {
                    return +index - 1 + 3;
                } else {
                    return +index - 1;
                }
            },
            loopEnd (index) {
                return +index * 4;
            }
        }
    }
</script>
<style lang="scss">
    .activity-goods {
        .el-carousel__container {
            height: 210px;
        }
        .el-carousel__arrow--right {
            width: 18px;
            height: 18px;
            right: -25px;
        }
        .el-carousel__arrow--left {
            width: 18px;
            height: 18px;
            left: -25px
        }
        .el-carousel__arrow:hover {
            background: rgba(255, 255, 255, 0.55);
        }
        .el-carousel__button {
            width: 3px;
            height: 3px;
            border-radius: 50%;
        }
        .el-carousel__indicators--outside button {
            opacity: 1;
        }
        .el-carousel__indicator.is-active button {
            background-color: #e4b023;
        }
    }
</style>
<style scoped lang="scss">
    @import "@s/_variate.scss";
    .home {
        min-width: 1366px;
        overflow: hidden;
    }
    .activity-hot {
        background-color: #fcecec;
        padding: 70px 0 60px;
    }
    .decorate {
        position: relative;
        width: 1420px;
        margin: 0 auto;
        background: url('../../assets/decorate-bg.png') no-repeat center;
        background-size: 1360px auto;
        background-position-x: 60px;
        padding: 44px 0 8px;

        height: 842px;

        .decorate-img {
            position: absolute;
        }
        .decorate-left-img {
            left: 195px;
            top: -38px;
        }
        .decorate-right-img {
            top: -50px;
            right: 200px;
        }
    }
    .decorate-side {
        width: 1046px;
        margin: 0 auto;
        border: 8px solid #b5404b;
        border-radius: 6px;
        border-top-width: 32px;

        height: 790px;
    }
    .activity-list {
        background-color: #b5404b;
        padding-left: 50px;
        .activity-info {
            display: inline-block;
            width: 228px;
            text-align: center;
            vertical-align: top;
            .activity-title {
                font-size: 24px;
                color: #fff;
            }
            .activity-time {
                color: #fff;
                margin-top: -12px;
            }
            .activity-time span {
                display: inline-block;
                width: 30px;
                height: 30px;
                color: #b5404b;
                font-size: 20px;
                font-weight: bold;
                line-height: 30px;
                background-color: #fff;
                border-radius: 4px;
                vertical-align: middle;
                margin: 0 6px;
            }
        }
        .activity-goods {
            display: inline-block;
            width: 750px;
        }
        .activity-goods-carousel {
            padding: 0 25px 0 25px;
        }
        .goods-side {
            display: flex;
            width: 700px;
        }
        .goods {
            background-color: #fff;
            border-radius: 8px;
            width: 160px;
            height: 210px;
            text-align: center;
            &:not(:last-child) {
                margin-right: 20px;
            }
            .goods-img {
                height: 160px;
                padding: 12px;
                img {
                    display: block;
                    max-width: 100%;
                    max-height: 100%;
                }
            }
            .goods-title {
                font-weight: bold;
                font-size: 12px;
                padding: 0 8px;
                line-height: 20px;
                color: #333;
            }
            .goods-price {
                line-height: 20px;
                font-size: 10px;
                color: $color;
                padding: 0 8px;
                span, button {
                    vertical-align: middle;
                    font-weight: bold;
                }
                del {
                    color: $weak_color;
                    margin-left: 3px;
                }
            }
            .btn-addcar-activity {
                width: 16px;
                height: 16px;
                border: 1px solid rgb(255, 78, 104);
                border-radius: 50%;
                cursor: pointer;
                margin-top: 2px;
            }

        }
    }
    .hot-list {
        flex-wrap: wrap;
        .goods {
            margin-top: 10px;
        }
        .goods:nth-child(4n - 3), .goods:nth-child(4n) {
            width: 575px;
            height: 250px;
        }
        .goods:nth-child(4n - 1), .goods:nth-child(4n - 2) {
            width: 445px;
            height: 250px;
        }
        .goods:first-child, .goods:first-child+.goods {
            margin-top: 0;
        }
    }
    .floor-goods {
        background-color: #f5f5f5;
        padding-top: 60px;
        .floor-goods-list {
            margin-bottom: 36px;
        }
        .category {
            line-height: 40px;
        }
        .category-title {
            font-weight: bold;
            font-size: 20px;
        }
        .category-child a {
            color: $minor_color;
            &:not(:first-child) {
                &::before {
                    content: "/";
                }
            }
            &:hover {
                color: #3161CF;
            }
        }
    }
    .goods-groups {

        display: flex;
        flex-wrap: wrap;
        .hot-goods {
            width: 535px;
        }
        .goods {
            width: 262.5px;
            margin-left: 10px;
            background-color: #fff;
            padding: 12px 12px 5px;
            height: 283px;
            margin-bottom: 10px;
            &:nth-child(1), &:nth-child(4) {
                margin: 0;
            }
            .goods-info {
                position: relative;
                line-height: 24px;
                padding: 5px 40px 5px 0;
            }
            button {
                position: absolute;
                right: 0;
                top: 8px;
                width: 40px;
                height: 40px;
                border: 2px solid $color;
                border-radius: 50%;
                padding: 3px;
                cursor: pointer;
            }
            .deliver-area {
                color: #bfbfbf;
                font-size: 10px;
                margin-right: 12px;
            }
        }
        .goods-title a {
            color: #333;
        }
        .goods-price {
            font-size: 12px;
            .price {
                color: $color;
                font-weight: bold;
            }
        }
        .goods-img {
            a {
                display: block;
                width: 208px;
                height: 208px;
                margin: auto;
                position: relative;
            }
            img {
                max-width: 100%;
                max-height: 100%;
            }
        }
    }

</style>
