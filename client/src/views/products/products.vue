<template>
    <div id="produts" v-if="categoryGoods">
        <HeaderMain class="head-category"/>
        <div class="main-width category-sort">
            <div class="category">
                <span class="category-item">分类</span>
                <span class="category-item" v-for="child in categoryGoods[0].child" :key="child.id"> {{ child.category_name }}</span>
            </div>
            <div class="sort">
                <span class="sort-item">排序</span>
                <span class="sort-item" v-for="item in sort" :key="item.type"> {{ item.name }} </span>
                <p class="right total-count">共 {{ categoryGoods[0].allGoods.length }} 件商品  <span style="color: #ff4e68;margin: 0">{{ Math.ceil(categoryGoods[0].allGoods.length / 8) }}</span>/{{ Math.ceil(categoryGoods[0].allGoods.length / 8) }} </p>
            </div>
        </div>
        <div class="main-width goodsList">
            <GoodsList :goodsList="categoryGoods[0].allGoods"/>
            <ul class="page">
                <li class="page-item"><span></span></li>
            </ul>
        </div>
    </div>
</template>

<script>
    import { onGetHomeData } from "../../service/getData";
    import HeaderMain from '@c/headerMain.vue';
    import GoodsList from '@c/goodsList.vue';
    export default {
        name: "products",
        data () {
          return {
              categoryGoods: null,
              sort: [
                  { type: 0, name: '默认' },
                  { type: 1, name: '价格' },
                  { type: 2, name: '销量' },
                  { type: 3, name: '库存' }
              ]
          }
        },
        components: {
            HeaderMain,
            GoodsList
        },
        created () {
            onGetHomeData().then(res => {
                this.categoryGoods = res.basicGoodsList
            }).catch(err => console.log(err));
        }
    }
</script>

<style scoped lang="scss">
    @import "@s/_variate.scss";
    #produts {
        background-color: #f6f3ee;
    }
    .head-category {
        background-color: #fff;
    }
    .category-sort {
        background-color: #fff;
        line-height: 46px;
        margin: 15px auto;
        span {
            margin-left: 15px;
            &:not(:first-child) {
                color: $minor_color;
                margin-left: 20px;
                cursor: pointer;
            }
        }
    }
    .category::after {
        content: '';
        display: block;
        width: 100%;
        border-top: 1px dashed #e2e2e2;
        margin-top: -1px;
    }
    .total-count {
        color: $weak_color;
        margin-right: 20px;
        font-size: 12px;
    }
    .goodsList {
        min-height: 600px;
    }
</style>
