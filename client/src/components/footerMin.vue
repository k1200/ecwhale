<template>
  <div id="footerMin" class="footer main-width"> <i>版权所有©2018-2022洋鲸贸易有限公司 {{ shopInfo.icp_number }}</i></div>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        name: 'footerMin',
        computed: {
            ...mapState([
                'shopInfo'
            ])
        }
    };
</script>

<style scoped lang="scss">
  @import "@s/_variate.scss";
  .footer {
    text-align: center;
    color: $minor_color;
    line-height: 50px;
    position: relative;
    &::after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 1px;
      background-color: #f5f5f5
    }
  }
</style>