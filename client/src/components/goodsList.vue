<template>
    <div id="goodsList">
        <slot name="goodsList-header"></slot>
        <div class="goods" v-for="goods in goodsList" :key="goods.goods_id">
            <div class="goods-img">
                <router-link to="/">
                    <img v-if="+goods.sale_inventory === 0" class="position-center stockup" src="../assets/stockup.png" alt="已售罄">
                    <img class="position-center" :src="goods.goods_img_url" alt="">
                </router-link>
            </div>
            <div class="goods-info">
                <div class="goods-title text-ellipsis">
                    <router-link to="/"> {{ goods.ec_goods_name }}</router-link>
                </div>
                <div class="goods-price">
                    <span class="price"> ¥{{ goods.ec_sales_price }} </span>
                    <span class="right deliver-area"> {{ goods.deliver_area == "0" ? "保税区发货" : "日本直邮" }} </span>
                </div>
                <button type="button" class="right btn-addcar-goods" @click="addCart(goods)">
                    <img src="../assets/tocart.png" alt="">
                </button>
            </div>
        </div>
        <slot name="goodsList-footer"></slot>
    </div>
</template>

<script>
    import { onAddCart } from "../service/getData";
    export default {
        name: 'goodsList',
        methods: {
            addCart (item) {
                onAddCart({ goods_id: item.goods_id, ec_goods_id: item.id }).then(res => {
                    console.log(res);
                }).catch(err => {
                    console.error(err);
                })

            }
        },
        props: ['goodsList']
    };
</script>

<style scoped lang="scss">
    @import "@s/_variate.scss";
    #goodsList {
        display: flex;
        flex-wrap: wrap;
    }
    .goods {
        width: 262.5px;
        margin-left: 10px;
        background-color: #fff;
        padding: 12px 12px 5px;
        height: 283px;
        margin-bottom: 10px;
        &:nth-child(4n + 1) {
            margin: 0;
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
        .stockup {
            z-index: 3;
        }
    }
    .goods-info {
        position: relative;
        line-height: 24px;
        padding: 5px 40px 5px 0;
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
        .deliver-area {
            color: #bfbfbf;
            font-size: 10px;
            margin-right: 12px;
        }
    }
</style>