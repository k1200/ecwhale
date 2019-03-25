<template>
    <div id="headerMain">
        <div class="main-width flex-row-between search-side">
            <div class="shop-name"> {{ shopName }}</div>
            <div class="search-options">
                <el-input placeholder="搜索您需要的商品 品牌" v-model="keywords" class="input-with-btn">
                    <el-button slot="append" icon="el-icon-search" class="btn-search"></el-button>
                </el-input>
            </div>
            <button type="button" class="to-car" :data-count="carCount">
                <img src="../assets/cart.png" alt="" width="100%">
            </button>
        </div>
        <div class="category-side">
            <div class="category">
                <div class="main-width">
                    <div class="category-item"><span class="first-category">首页</span></div>
                    <div class="category-item" v-for="category in basicGoods" :key="category.id">
                        <span class="first-category"> {{ category.category_name }}</span>
                        <div class="category-child">
                            <div class="main-width">
                                <span v-for="child in category.child" :key="child.id"> {{ child.category_name }} </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'headerMain',
        data() {
            return {
                shopName: '壹壹仟壹仟贰',
                carCount: 0,
                keywords: ''
            }
        },
        methods: {},
        props: ['basicGoods']
    };
</script>

<style lang="scss">
    @import "@s/_variate.scss";
    .input-with-btn {
        .el-input__inner {
            height: 50px;
            line-height: 50px;
        }
        .el-input__inner:hover, .el-input__inner:focus {
            border-color: $color;
        }
        .el-input-group__append {
            color: #fff;
            background-color: $color;
            border-color: $color;
            font-size: 24px;
        }
    }
</style>
<style scoped lang="scss">
    @import "@s/_variate.scss";
    .search-side {
        height: 136px;
        align-items: center;
    }
    .shop-name {
        font-size: 26px
    }
    .search-options {
        width: 680px;
    }
    .to-car {
        width: 50px;
        height: 50px;
        padding: 10px;
        background-color: #333;
        border-radius: 6px;
        position: relative;
        cursor: pointer;
        &::after {
            content: attr(data-count);
            padding: 1px 5px;
            border-radius: 50%;
            background-color: $color;
            color: #fff;
            position: absolute;
            top: 5px;
            right: 5px;
        }
    }
    .category-side {
        position: relative;
    }
    .category {
        height: 32px;
        background-color: #333;
        text-align: center;
    }
    .category-child {
        display: none;
        position: absolute;
        width: 100%;
        top: 32px;
        left: 0;
        height: 66px;
        line-height: 66px;
        background-color: rgba(252, 236, 236, 0.8);
        color: #666;
        box-shadow: 0 3px 6px rgba(252, 236, 236, 0.16);
        z-index: 9;
        span {
            cursor: pointer;
            margin: 0 30px;
        }
    }
    .category-item {
        display: inline-block;
        .first-category {
            line-height: 32px;
            color: #fff;
            cursor: pointer;
            display: inline-block;
            padding: 0 30px;
            &::after {
                content: '';
                height: 2px;
                background-color: #fff;
                width: 85%;
                margin: -5px auto 0;
                display: none;
            }
        }
        &:hover .category-child, &:hover .first-category::after {
            display: block;
        }
    }
</style>