<template>
    <div id="footer">
        <div class="footer-top-side">
            <ul class="main-width flex-row-between">
                <li><img src="../assets/quality.png" width="32" height="32" alt="quality"><span>原装正品</span></li>
                <li><img src="../assets/supply.png" width="32" height="32" alt="supply"><span>日本直供</span></li>
                <li><img src="../assets/expressage.png" width="32" height="32" alt="expressage"><span>快递运达</span></li>
                <li><img src="../assets/adequate.png" width="32" height="32" alt="adequate"><span>多仓备货</span></li>
                <li><img src="../assets/trustworthy.png" width="32" height="32" alt="trustworthy"><span>售后无忧</span></li>
            </ul>
        </div>
        <ul class="footer-nav-side main-width flex-row-between">
            <li><span> {{ shopInfo.shop_name }}</span></li>
            <li class="guide">
                <p>海外保证</p>
                <p>正品保证</p>
                <p>日本直供</p>
            </li>
            <li class="guide">
                <p>购物指南</p>
                <p>支付方式</p>
                <p>常见问题</p>
            </li>
            <li class="guide">
                <p>售后服务</p>
                <p>税费政策</p>
                <p>退货政策</p>
            </li>
            <li>
                <p><img src="../assets/qr.jpg" alt="" width="70" height="70"></p>
                <p>微信公众号</p>
            </li>
        </ul>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        name: 'footer',
        data() {
            return {}
        },
        computed: {
            ...mapState([
                'shopInfo'
            ])
        },
        methods: {}
    };
</script>

<style scoped lang="scss">
    @import "@s/_variate.scss";
    #footer {
        background-color: #f5f5f5;
        padding-top: 50px;
    }
    .footer-top-side {
        background-color: #7e7e7e;
        height: 80px;
        line-height: 80px;
        img {
            vertical-align: middle;
        }
        span {
            font-size: 18px;
            margin-left: 5px;
            vertical-align: middle;
            color: #fff;
            cursor: default;
        }
    }
    .footer-nav-side {
        text-align: center;
        padding: 28px 0;
        align-items: center;
        .guide p:not(:first-child) {
            color: #666;
            line-height: 20px;
            cursor: pointer;
            &:hover {
                color: #3161CF;
            }
        }
        .guide p:first-child {
            font-size: 16px;
            line-height: 28px;
            cursor: default;
        }
        li:first-child {
            color: $color;
            font-size: 20px;
        }
        li:last-child {
            font-size: 12px;
            color: #777;
        }
    }
</style>