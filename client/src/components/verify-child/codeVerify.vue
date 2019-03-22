<template>
  <div id="codeVerify">
    <slot name="question" :question="question"><div class="question" :style="userStyle"> {{ question }} </div></slot>
    <input class="answer" v-model="answer" :placeholder="placeholder" :style="userStyle" @blur="confirm"/>
    <button class="resetBtn" type="button" @click="reset"><slot name="reset">换一题</slot></button>
  </div>
</template>

<script>
export default {
  name: 'codeVerify',
  data () {
    return {
      answer: '',
      question: '',
      result: ''
    };
  },
  inheritAttrs: false,
  created () {
    this.createArit();
  },
  computed: {
    childProps () {
      return this.$attrs;
    },
    userStyle () {
      return { ...this.$attrs.style };
    },
    placeholder () {
      return this.$attrs.templateStyle || '验证码';
    }
  },
  methods: {
    createArit () {
      if (this.childProps.figure <= 0) {
        this.createArit = this.codeChars;
      } else {
        this.createArit = this.codeArit;
      }
      this.createArit();
    },
    codeChars () {
      const code = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
      ];
      const len = 6;
      const codeLen = code.length;
      let chars = '';
      for (let i = len; i > 0; i--) {
        chars += code[Math.floor(Math.random() * codeLen)];
      }
      this.question = this.result = chars;
    },
    codeArit () {
      const figure = this.childProps.figure === 1 ? 10 : 100;
      const firstNum = Math.floor(Math.random() * figure);
      const lastNum = Math.floor(Math.random() * figure);
      const arith = Math.floor(Math.random() * 3);
      switch (arith) {
        case 0:
          this.question = `${firstNum} + ${lastNum} = `;
          this.result = firstNum + lastNum;
          break;
        case 1:
          this.question = `${firstNum} - ${lastNum} = `;
          this.result = firstNum - lastNum;
          break;
        case 2:
          this.question = `${firstNum} * ${lastNum} = `;
          this.result = firstNum * lastNum;
          break;
        default:
          break;
      }
    },
    reset () {
      this.createArit();
      this.answer = '';
    },
    confirm () {
      if (this.result == this.answer) {
        this.$emit('success', true);
      } else {
        this.$emit('success', false);
      }
    },
    success () {

    },
    fail () {

    }
  },
  watcher: {
    'childProps.reset': function (newVal) {
      if (newVal) {
        this.reset();
      }
    }
  }
};
</script>

<style scoped lang="scss">
  ._style {
    padding-left: 8px;
    height: 38px;
    line-height: 38px;
    border: 1px solid #dadada;
    border-radius: 3px;
    background-color: #fff;
  }
  #codeVerify {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .question {
    @extend ._style;
    text-align: left;
    padding: 0 15px;
    font-size: 16px;
    letter-spacing: 3px;
    min-width: 125px;
  }
  .answer {
    outline: none;
    margin-right: 15px;
    width: 100px;
    @extend ._style
  }
  button.resetBtn {
    background: none;
    outline: none;
    cursor: pointer;
    color: #477bad
  }
</style>
