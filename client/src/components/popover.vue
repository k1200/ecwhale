<template>
    <div id="popover" v-if="visiblyPopover">
        <div class="shade">

        </div>
        <div class="content">
            <i class="el-icon-error" @click="close"></i>
            <div class="poppver-title">
                <slot name="title"> 温馨提示 </slot>
            </div>
            <div class="popvoer-body">
                <slot></slot>
            </div>
            <div class="popvoer-btns">
                <button type="button" class="btn-confirm" @click="confirm">{{ confirmTxt }}</button>
                <button v-if="visiblyCancel" type="button" class="btn-cancel" @click="cancel">{{ cancelTxt }}</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'popover',
        data() {
            return {}
        },
        computed: {

        },
        methods: {
            confirm () {
                this.$emit('confirm');
            },
            cancel () {
                this.$emit('cancel');
            },
            close () {
                this.$emit('close');
            }
        },
        watch: {
            visiblyCancel (newVal, oldVal) {
                if (typeof newVal === 'boolean') {
                    newVal ? this.$emit('visibly') : this.$emit('close');
                }
            }
        },
        props: {
            visiblyPopover: {
                type: Boolean,
                default: false
            },
            visiblyCancel: {
                type: Boolean,
                default: true
            },
            shade: {
                type: Boolean,
                default: true
            },
            confirmTxt: {
                type: String,
                default: '确定'
            },
            cancelTxt: {
                type: String,
                default: '取消'
            }
        }
    };
</script>

<style scoped lang="scss">
    @import "../style/variate";
    .shade {
        position: fixed;
        width: 100%;
        height: 100%;
        z-index: 9999;
        background:rgba(58, 58, 58, 0.25);
        top: 0;
        left: 0;
    }
    .content {
        position: fixed;
        width: 550px;
        top: 30%;
        left: 0;
        right: 0;
        margin: auto;
        padding: 32px 40px;
        z-index: 99999;
        border-radius: 4px;
        text-align: center;
        background-color: #fff;
        box-shadow: 0 6px 10px 0 rgba(128,19,19,0.2);
    }
    .el-icon-error {
        position: absolute;
        color: #fff;
        font-size: 22px;
        top: -80px;
        right: 40px;
        cursor: pointer;
        &::after {
            content: '';
            width: 1px;
            height: 65px;
            display: block;
            background: #fff;
            margin: auto;
        }
    }
    .poppver-title {
        font-size: 20px;
        font-weight: bold;
    }
    .popvoer-body {
        margin: 35px 0;
    }
    .popvoer-btns {
        button {
            height: 32px;
            line-height: 32px;
            border-radius: 3px;
            padding: 0 20px;
            font-size: 16px;
            margin: 0 10px;
            cursor: pointer;
        }
        .btn-confirm {
            background-color: $btn-color;
            color: #fff;
        }
        .btn-cancel {
            color: $minor_color;
        }
    }
</style>