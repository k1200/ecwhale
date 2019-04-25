<template>
    <div class="uedito">
        <div id="editor" type="text/plain" :style="size" name="details"></div>
    </div>
</template>

<script>
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
            require('../../public/ueditor/ueditor.config');
            require('../../public/ueditor/ueditor.all');
            require('../../public/ueditor/lang/zh-cn/zh-cn');
            this.createUE();
        },
        methods: {
            createUE () {
                let $this = this;
                this.UE = window.UE.getEditor('editor', this.UEConfig);
                this.UE.ready(function() {
                    $this.content && $this.UE.setContent($this.content);
                    $this.$emit('getUeditor', $this.UE);
                });
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
