<template>
    <div class="home">
        <HeaderTop/>
        <HeaderMain/>
        <img alt="Vue logo" src="../assets/logo.png">
        <HelloWorld msg="Welcome to Your Vue.js App"/>
    </div>
</template>

<script>
// @ is an alias to /src
import HeaderTop from '@c/headerTop.vue';
import HeaderMain from '@c/headerMain.vue';
import HelloWorld from '@c/HelloWorld.vue';

export default {
    name: 'home',
    components: {
        HeaderTop,
        HeaderMain,
        HelloWorld
    },
    created() {
        this.$axios.get('api/getHomeData')
            .then(res => {
                console.log(res.data);
                if (res.data.success) {
                    this.dataList.name = res.data.result.shop_name
                } else {

                }

            });
    }
}
</script>
