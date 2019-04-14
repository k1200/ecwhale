<template>
    <div class="uedito">
        <div id="editor" type="text/plain" :style="size"></div>
    </div>
</template>

<script>
    import "../../public/ueditor/ueditor.config";
    import "../../public/ueditor/ueditor.all";
    import "../../public/ueditor/lang/zh-cn/zh-cn"
    export default {
        name: "ueditor",
        data () {
            return {
                UE: null
            }
        },
        computed: {
          UEConfig () {
              return this.conf ? this.conf : {};
          }
        },
        mounted () {
            this.createUE();
        },
        methods: {
            createUE () {
                this.UE = window.UE.getEditor('editor', this.UEConfig);
                this.content && this.UE.setContent(this.content);
            }
        },
        props: {
            size: {
                type: Object,
                default () {
                    return { width: '680px', height: '500px' }
                }
            },
            conf: {
                type: Object
            },
            content: String
        },
        destroyed () {
            this.UE.destroy()
        }
    }
</script>

<style scoped>

</style>
