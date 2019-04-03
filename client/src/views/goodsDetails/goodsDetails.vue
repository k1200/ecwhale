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
            <div class="goods-basic flex-row-between">
                <div class="goods-img">
                    <img :src="goods.goods_main_photo_urls" alt="" width="452" height="452">
                </div>
                <div class="goods-other">
                    <div class="goods-title text-ellipsis"> {{ goods.ec_goods_name }} </div>
                    <div class="goods-cost">
                        <div class="goods-price">
                            <span>价格：</span>
                            <span class="price">¥<b>{{ goods.ec_sales_price }}</b></span> </div>
                        <div class="goods-cost-item">
                            <span>税费：</span>
                            <span> {{ goods.fax != 1 ? '预计' + +goods.tax + '¥' : '免税' }} </span>
                            <span class="tip-point">税费政策 <b class="el-icon-question"></b></span>
                            <span class="tip">
                                1.跨境电商综合税需按一般贸易增值税及消费税税额的70%征收，商城代征代缴，税费以提交订单时的金额为准。<br/>
		                        2、依据《关于完善跨境电子商务零售进口税收政策的通知》，跨境电子商务零售进口商品的单次交易限值为人民币5000元，个人年度交易限值为人民币26000元。
                            </span>
                        </div>
                        <div class="goods-cost-item">
                            <span>运费：</span>
                            <span> {{ goods.free_ship != 1 ? +goods.first_amount + '¥' : '包邮' }} </span>
                            <span class="tip-point">满88包邮 <b class="el-icon-question"></b></span>
                            <span class="tip">保税区发货：首重13元，续重3元；<br/>日本直邮商品：首重60元，续重20元</span>
                        </div>
                        <div class="goods-cost-item">
                            <span>订单要求：</span>
                            <span class="tip-point">身份证号 <b class="el-icon-question"></b> </span>
                            <span class="tip">
                                海关总署令第147号（《海关总署关于修改〈中华人民共和国海关对进出境快件监管办法〉的决定》）<br/>
                                第二十二条　个人物品类进出境快件报关时，运营人应当向海关提交《中华人民共和国海关进出境快件个人物品申报单》（见附件二）、每一进出境快件的分运单、进境快件收件人或出境快件发件人身份证件影印件和海关需要的其它单证。
                                <a class="ec_link" href="http://www.customs.gov.cn/publish/portal0/tab517/info265077.htm" target="_blank">查看详细</a>
                            </span>
                        </div>
                        <div class="goods-code">
                            <p style="padding: 3px;background-color: #fff"><img :src="goods.ec_qr_code_img" alt="" width="106" height="106"></p>
                            <p style="color: #999;margin-top: 5px">扫一扫，转发商品</p>
                        </div>
                    </div>
                    <div class="goods-count">
                        <span>数量：</span>
                        <div style="display: inline-block" class="number-count">
                            <el-input-number v-model="count" @change="handleChange" :min="1" :max="10"></el-input-number>
                        </div>
                    </div>

                    <div class="goods-options">
                        <button type="button" class="btn-buy">立即购买</button>
                        <button type="button" class="btn-addCart" @click="addCart"><img style="vertical-align: sub" src="../../assets/tocart.png" alt="" width="30">加入购物车</button>
                        <button type="button" class="btn-collect">
                            <img src="../../assets/collect.png" alt="" width="18" height="16">
                            <span>收藏</span>
                        </button>
                    </div>
                    <div style="margin-top: 20px;color: #666">温馨提醒：商城所有商品均为进口商品，不支持换货、不支持无理由退货</div>
                </div>
            </div>
            <div class="goods-details">
                <div class="details">
                    <p class="title">商品详情</p>
                    <div class="goods-infor">
                        <p><span class="tip">商品名称：</span>{{ goods.ec_goods_name }}</p>
                        <p><span class="tip">商品编码：</span>{{ goods.goods_jan_code }}</p>
                        <p><span class="tip">品牌：</span>{{ goods.brandName }}</p>
                        <p><span class="tip">商品毛重：</span>{{ goods.rough_weight }} KG</p>
                        <p><span class="tip">商品规格：</span>{{ goods.goods_spec }}{{ goods.goods_spec_unit }}{{ goods.goods_unit }}</p>
                        <p><span class="tip">发货方式：</span>{{ goods.deliverArea }}</p>
                    </div>
                    <div v-html="goods.goods_info"></div>
                </div>
                <div class="similarity-goods right">
                    <p class="title">相关商品</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import HeaderMain from '@c/headerMain.vue';
    import { onGetGoodsDetails, onAddCart } from "../../service/getData";
    import { mapState } from "vuex";

    export default {
        name: 'goodsDetails',
        data() {
            return {
                goods: {},
                count: 1,
                category: ''
            }
        },
        components: {
            HeaderMain
        },
        computed: {
            ...mapState([
                'categories'
            ])
        },
        created () {
            onGetGoodsDetails(this.$route.params.id).then(res => {
                this.goods = res;
                this.setCategory()
            }).catch(err => {
                console.log(err)
            })
        },
        methods: {
            handleChange (e) {
                console.log(e);
            },
            setCategory () {
                for (let item of this.categories) {
                    for (let value of item.child) {
                        if (value.id === this.goods.goods_category_id) {
                            this.category = value.category_name;
                            break;
                        }
                        if (this.category) break;
                    }
                }
            },
            addCart () {
                onAddCart({ goods_id: this.goods.goods_id, ec_goods_id: this.goods.id, count: this.count }).then(res => {
                    this.$notify({
                        title: '提示：',
                        message: '成功加入购物车！',
                        type: 'success'
                    });
                }).catch(error => console.log(error))
            }
        }
    };
</script>
<style lang="scss">
    @import "@s/_variate.scss";
    .number-count {
        .el-input__inner:focus, .el-input-number__decrease:hover:not(.is-disabled)~.el-input .el-input__inner:not(.is-disabled), .el-input-number__increase:hover:not(.is-disabled)~.el-input .el-input__inner:not(.is-disabled) {
            border-color: $btn-color;
        }
        .el-input-number__decrease:hover, .el-input-number__increase:hover {
            color: $btn-color;
        }
    }
</style>
<style scoped lang="scss">
    @import "@s/_variate.scss";
    .el-breadcrumb {
        line-height: 40px;
    }
    .goods-img {
        border: 1px solid #eee;
    }
    .goods-title {
        font-size: 18px;
        margin-bottom: 22px;
    }
    .goods-cost {
        width: 568px;
        padding: 20px;
        line-height: 34px;
        background-color: #f7f7f7;
        color: $minor_color;
        position: relative;
        .goods-cost-item {
            position: relative;
        }
        .goods-price {
            .price {
                color: $color;
                font-weight: bold;
            }
            b {
                font-size: 24px;
            }
        }
        .tip-point {
            cursor: pointer;
            margin-left: 5px;
        }
        .el-icon-question {
            font-size: 18px;
            color: #7497dc;
            vertical-align: text-bottom;
        }
        .tip {
            display: none;
            position: absolute;
            line-height: 20px;
            background: #fff;
            padding: 12px;
            z-index: 9;
            border: 1px solid #eee;
            border-radius: 3px;
            max-width: 380px;
        }
        .goods-code {
            position: absolute;
            right: 35px;
            text-align: center;
            line-height: 1;
            top: 50%;
            transform: translateY(-50%);
        }
        .tip-point:hover+.tip {
            display: block;
        }
    }
    .goods-count {
        height: 50px;
        margin-top: 20px;
    }
    .goods-options {
        margin-top: 32px;
        button {
            width: 168px;
            height: 50px;
            line-height: 50px;
            border-radius: 4px;
            font-size: 22px;
            text-align: center;
            cursor: pointer;
            vertical-align: middle;
        }
        .btn-buy {
            background-color: $btn-color;
            color: #fff;
        }
        .btn-addCart {
            border: 1px solid $btn-color;
            color: $btn-color;
            margin: 0 12px;
        }
        .btn-collect {
            width: 50px;
            font-size: 12px;
            color: $minor_color;
            border: 1px solid #ccc;
            line-height: 1;
            span {
                display: block;

            }
        }
    }
    .goods-details {
        margin-top: 66px;
        .title {
            line-height: 40px;
            text-align: center;
            background-color: #f7f7f7;
            border: 1px solid #eee;
            color: $minor_color;
            font-size: 16px;
            margin-bottom: 20px;
        }
    }
    .details {
        width: 750px;
        display: inline-block;
        .goods-infor {
            line-height: 28px;
            padding: 0 18px;
            color: $minor_color;
            margin-bottom: 20px;
            .tip {
                color: #333;
            }
            p:not(:first-child) {
                display: inline-block;
                width: 50%;
            }
        }
    }
    .similarity-goods {
        width: 300px;
    }
</style>