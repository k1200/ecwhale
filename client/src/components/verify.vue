<template>
  <my-verify class="bindVerify" v-bind="$attrs" v-on="$listeners">
    <template #tip><slot name="tip"></slot></template>
    <template #default><slot></slot></template>

    <template #question="{ question }"><slot :question="question" name="question"></slot></template>
    <template #answer><slot name="answer"></slot></template>
    <template #reset><slot name="reset"></slot></template>
  </my-verify>
</template>

<script>
let child = 'Verify';
export default {
  name: 'verify',
  inheritAttrs: false,
  created () {
    child = this.type + child;
  },
  computed: {

  },
  components: {
    'my-verify': () => import(`./verify-child/${child}.vue`)
  },
  props: {
    type: {
      type: String,
      default: 'code'
    }
  }
};
</script>

<style scoped>

</style>
