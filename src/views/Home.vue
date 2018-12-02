<template>
  <div class="home" :class="$mq">
    <div class="grid-container">
      <div class="grid-item font-noto" v-for="cell in grid" 
        :key="cell.id" 
        :class="[$mq, !cell.character ? 'light-border' : null, cell.highlight ? 'hover': null]"
        :id="cell.id"
        @mouseover="mouseover(cell)"
        @click="handleClick(cell)"
        @mouseout="mouseout(cell)"
      >  
        {{ cell.character }}
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store';

function isTouchEnabled() {
  // return "ontouchstart" in document.documentElement;
  const prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
  const mq = function(query) {
    return window.matchMedia(query).matches;
  };

  if (('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch) {
    return true;
  }

  // include the 'heartz' as a way to have a non matching MQ to help terminate the join
  // https://git.io/vznFH
  const query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
  return mq(query);
}


export default {
  name: 'home',
  data() {
    return {
      grid: store._state.grid
    };
  },

  methods: {
    handleClick(cell) {
      console.log('handleClick');
      store.resetRowHighlight(cell.row);
      store.setCurrentRow(cell);
    },

    mouseover(cell) {
      if (isTouchEnabled()) {
        return;
      }
      store.setCurrentRow(cell);
    },

    mouseout(cell) {
      if (isTouchEnabled()) {
        return;
      }
      const { row } = cell;
      store.resetRowHighlight(row);
    }
  }
};
</script>

<style lang="less" scoped>
@import '../styles/variables.less';

.home {
  .grid-container {
    display: grid;
    // grid-template-columns: auto auto auto;
    grid-template-rows: repeat(5, 1fr);
    grid-template-columns: repeat(9, 1fr);
    grid-gap: 3px;
    width: 100vw;
    height: 100vh;
  
    .grid-item {
      transition: background-color ease-in .2s;
      border: 1px solid @border-color;
      color: @character-color;
      display: flex;
      justify-content: center;
      font-size: 95px;
      align-items: center;
      transition: all 300ms;

      &.font-plus {
        font-family: 'M PLUS 1p', sans-serif;
      }

      &.font-noto {
        font-weight: 200;
        font-family: 'Noto Serif JP', sans-serif;
      }

      &.light-border {
        border: 1px dashed lighten(@border-color, 15%);
      }

      &.sm {
        font-size: 21px;
        font-weight: bold;
      }
      
      &.hover {
        background-color: lighten(@cell-hover-background-color, 40%);
        border: 1px solid @cell-hover-background-color;
        color: @cell-hover-text-color;
      };
    }
  }
}

</style>

