<template>
    <div class="footer"><i>版权所有© {{ year }} {{ company }}  {{ icp }}</i></div>
</template>

<script>
    import { getDateTime } from "@/config/utils";
    export default {
        name: 'pageFooter',
        data() {
            return {
                year: getDateTime().year,
                company: '株式会社索島',
                icp: '粤ICP备 12345678号-1'
            }
        },
        methods: {}
    };
</script>

<style scoped lang="scss">
    .footer {
        text-align: center;
        color: #666;
        padding: 6px 0;
        border-top: 1px solid #eee;
        font-size: 12px;
    }
</style>
