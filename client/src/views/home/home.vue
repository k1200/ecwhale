<template>
    <div class="home">
        <HeaderMain/>
        <el-carousel indicator-position="none" :autoplay="false">
            <el-carousel-item v-for="item in 4" :key="item">
                <img src="../../assets/banner.png" width="100%" height="auto"alt="">
            </el-carousel-item>
        </el-carousel>
        <div class="activity-hot">
            <div class="decorate">
                <img class="decorate-img decorate-left-img" src="../../assets/decorate-01.png" width="475" alt="decorate-01">
                <img class="decorate-img decorate-right-img" src="../../assets/decorate-02.png" width="285" alt="decorate-02">
                <div class="decorate-side">
                    <div v-if="activityList" class="activity-list">
                        <div class="activity-info">
                            <p class="activity-title"> {{ activityList.title }} </p>
                            <img src="../../assets/japan.png" width="228" height="157" alt="japan">
                            <p class="activity-time">
                                <span>{{ activityTime.d }}</span>天<span>{{ activityTime.h }}</span>时<span>{{ activityTime.min }}</span>分<span>{{ activityTime.s }}</span>秒
                            </p>
                        </div>
                        <div class="activity-goods">
                            <el-carousel class="activity-goods-carousel" indicator-position="outside" arrow="always" :autoplay="false">
                                <el-carousel-item class="goods-side" v-for="index in activityLoop">
                                    <router-link :to="'/goodsDetails/' + goods.id" class="goods" v-for="goods in activityList.goods.slice(loopStart(index), loopEnd(index))" :key="goods.ag_id">
                                        <div class="goods-img">
                                            <img v-if="+goods.inventory === 0" class="position-center stockup" src="../../assets/stockup.png" alt="已售罄">
                                            <img :src="goods.list_images" width="100%" height="auto" alt="">
                                        </div>
                                        <div class="goods-title text-ellipsis"> {{ goods.name }} </div>
                                        <div class="goods-price"> <span> ¥{{ goods.ag_price }} </span> <del> ¥{{ goods.price }} </del> <button type="button" class="right btn-addcar-activity">
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
        <div class="floor-goods" v-if="basicGoods">
            <div class="floor-goods-list main-width" v-for="category in categories" :key="category[0]" v-if="visiblyFloor(category[0])">
                <div class="category">
                    <span class="category-title"> {{ category[1].name }} </span>
                    <p class="category-child right">
                        <router-link :to="'/products/' + category[0]"> 全部 </router-link>
                        <router-link v-for="child in category[1].child" :key="child[0]" :to="'/products/' + child[0]"> {{ child[1].name }} </router-link>
                    </p>
                </div>

                <GoodsList :goodsList="basicGoods.get(category[0]).slice(1, 7)" class="goods-groups">
                    <template #goodsList-header>
                        <router-link tag="div" :to="'/goods/' + basicGoods.get(category[0])[0].id" class="hot-goods"> <img :src=" basicGoods.get(category[0])[0].list_images" width="100%" height="283" alt=""> </router-link>
                    </template>
                </GoodsList>
            </div>

            <div class="floor-goods-list main-width" >
                <div class="category">
                    <span class="category-title"> 猜你喜欢 </span>
                    <p class="category-child right"> <router-link to="/"> 换一换 </router-link> </p>
                </div>
                <div class="pageView"> <GoodsList :goodsList="likeGoodsList"/> </div>
            </div>
        </div>
        <FooterMain/>
    </div>
</template>

<script>
    // @ is an alias to /src
    import HeaderMain from '@c/headerMain.vue';
    import FooterMain from '@c/footerMain.vue';
    import GoodsList from '@c/goodsList.vue';
    import { onGetHomeData } from "../../service/getData";
    import { getIntervalTime } from "../../config/utils";
    import { mapState } from "vuex";

    export default {
        name: 'home',
        data () {
            return {
                basicGoods: null,
                activityList: null,
                hotList: null,
                likeGoodsList: null,
                activityTime: {}
            }
        },
        components: {
            HeaderMain,
            GoodsList,
            FooterMain
        },
        created() {
            this.getData();
        },
        computed: {
            ...mapState([
               'categories'
            ]),
            activityLoop () {
                if (this.activityList) {
                    return Math.ceil(this.activityList.goods.length / 4);
                }
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
            },
            visiblyFloor (category) {
              return !!(this.basicGoods && this.basicGoods.get(category) && this.basicGoods.get(category).length > 0);
            },
            async getData () {
                await onGetHomeData().then(res => {
                    res.activeGoodsList.goods = res.activeGoodsList.goods.slice(0, 9);
                    this.basicGoods = new Map(res.basicGoodsList);
                    this.activityList = res.activeGoodsList;
                    this.hotList = res.hotGoodsList;
                    this.likeGoodsList = res.likeGoodsList;
                });
                if (!this.activityList) return false;
                let intervalTime = getIntervalTime((res) => {
                    this.activityTime = res;
                }, this.activityList.end_time);
                intervalTime.pending = true;
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
    .goods-groups {
        .goods {
            &:nth-child(4n + 1) {
                margin-left: 10px;
            }
            &:nth-child(1), &:nth-child(4) {
                margin: 0;
            }
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
        padding: 70px 0 0;
    }
    .decorate {
        position: relative;
        width: 1420px;
        margin: 0 auto;
        background: url('../../assets/decorate-bg.png') no-repeat;
        background-size: 1360px auto;
        background-position-x: 60px;
        padding: 44px 0 60px;

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
                .stockup {
                    z-index: 3;
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
        .floor-goods-list:not(:last-child) {
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
        .hot-goods {
            width: 535px;
        }
    }

</style>
