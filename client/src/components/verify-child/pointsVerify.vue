<template>
  <div id="pointsVerify" ref="point" :style="pointStyle">
    <p class="moverBg" :style="{ left: offsetLeft}"><slot name="move"><span></span></slot></p>
    <div class="point" ref="chunk"
         @mousedown="mousedown"
         @mouseover="mouseover"
         :style="chunkStyle">
      <slot><div class="pointChunk" :style="{color: pointColor}">{{ point }}</div></slot>
    </div>
    <p><slot name="tip">{{ tip }}</slot></p>
  </div>
</template>

<script>
export default {
  name: 'pointsVerify',
  inheritAttrs: false,
  data () {
    return {
      point: '▶',
      tip: '向右滑动验证码',
      pointColor: '#bfbfbf',
      width: 0,
      chunk: 0,
      startCoord: 0,
      endCoord: 0,
      nextCoord: 0,
      offsetX: -1,
      down: false,
      result: false
    };
  },
  created () {
    console.log(this.$attrs);
  },
  computed: {
    pointStyle () {
      return {
        height: this.$attrs.height || '',
        lineHeight: this.$attrs.height || ''
      };
    },
    chunkStyle () {
      return {
        left: `${this.offsetX}px`,
        height: this.$attrs.height || '',
        width: this.$attrs.height || ''
      };
    },
    offsetWidth () {
      return this.width - this.chunk;
    },
    offsetLeft () {
      return `${this.chunk / 2 - this.width + this.offsetX}px`;
    }
  },
  mounted () {
    this.width = this.$refs.point.offsetWidth;
    this.chunk = this.$refs.chunk.offsetWidth;
  },
  methods: {
    mouseover () {
      this.pointColor = '#ff4e68';
      this.$emit('point-over');
    },
    mousedown (event) {
      let that = this;
      if (this.offsetX === -1) {
        this.startCoord = event.pageX;
        this.down = true;
        window.addEventListener('mousemove', that.pointMove);
        window.addEventListener('mouseup', that.mouseup);
      } else {
        this.reset();
      }
    },
    pointMove (event) {
      if (this.down) {
        this.offsetX = event.pageX - this.startCoord;
        this.nextCoord = event.pageX;
        if (this.offsetX >= this.offsetWidth) {
          this.offsetX = this.offsetWidth;
        } else if (this.offsetX <= -1) {
          this.offsetX = -1;
        } else {
          this.$emit('point-move');
        }
      }
    },
    mouseup () {
      let that = this;
      this.pointColor = '#bfbfbf';
      if (this.offsetX >= this.offsetWidth) {
        if (this.down) {
          this.success();
        }
      } else {
        this.reset();
      }
      this.$emit('point-out');
      this.down = false;
      window.removeEventListener('mousemove', that.pointMove);
      window.removeEventListener('mouseup', that.mouseup);
    },
    reset () {
      this.startCoord = 0;
      this.nextCoord = 0;
      this.offsetX = -1;
      this.point = '▶';
      this.tip = '向右滑动验证码';
      this.result = false;
      this.pointColor = '#bfbfbf';
      this.$emit('reset-verify', true);
    },
    success () {
      this.offsetX = this.offsetWidth;
      this.point = '↻';
      this.tip = '验证通过';
      this.result = true;
      this.$emit('success', true);
    },
    fail () {

    }
  },
  watcher: {

  }
};
</script>

<style scoped lang="scss">
  #pointsVerify {
    height: 40px;
    line-height: 40px;
    border-radius: 3px;
    border: 1px solid #dadada;
    text-align: center;
    position: relative;
    color: #999;
    cursor: default;
    -webkit-user-select:none;
    user-select:none;
    overflow: hidden
  }
  .moverBg {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: -100%;
    background-color: #ff4e68;
    opacity: 0.5;
  }
  .point {
    position: absolute;
    height: 40px;
    width: 40px;
    top: -1px;
    left: -1px;
    cursor: pointer;
    z-index: 2;
  }
  .pointChunk {
    border-radius: 3px;
    height: 100%;
    border: 1px solid #dadada;
    font-size: 16px;
    color: #bfbfbf;
    background-color: #fff;
  }
</style>
