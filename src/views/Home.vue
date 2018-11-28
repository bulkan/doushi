<template>
  <div class="home" :class="$mq">
    <div class="grid-container">
      <div class="grid-item font-noto" v-for="cell in grid" 
        :key="cell.id" 
        :class="[$mq, !cell.character ? 'light-border' : null, cell.highlight ? 'hover': null]"
        :id="cell.id"
        @mouseover="mouseover(cell)"
        @mouseout="mouseout(cell)"
      >  
        <transition name="slide-fade" mode="out-in">
          <div :key="cell.character">
            {{ cell.character }}
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store';


export default {
  name: 'home',
  data() {
    return {
      grid: store._state.grid
    }
  },

  methods: {
    mouseover(cell) {
      store.setCurrentRow(cell);
    },

    mouseout(cell) {
      const { row } = cell;
      store.resetRowHighlight(row);
    }
  }
}
</script>

<style lang="less" scoped>
@import '../styles/variables.less';

.slide-fade-enter-active {
  transition: all .3s ease-in;
}
.slide-fade-leave-active {
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateY(10px);
  opacity: 0;
}

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

