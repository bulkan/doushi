<template>
  <div class="home">
    <div class="grid-container">
      <div class="grid-item font-noto" v-for="cell in grid" 
        :key="cell.id" 
        :class="[$mq, !cell.character ? 'light-border' : null]"
        :id="cell.id"
        @mouseover="mouseover(cell)"
      >
        {{cell.character}}
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
      console.log(cell.id);
    }
  }
}
</script>

<style lang="less" scoped>
@import '../styles/variables.less';

.grid-container {
  display: grid;
  grid-template-columns: auto auto auto;
  padding: 10px;
  grid-template-rows: repeat(5, 1fr);
  grid-template-columns: repeat(9, 1fr);
  grid-gap: 10px;
  width: 100vw;
  height: 100vh;
}

.grid-item {
  transition: background-color ease-in .2s;
  border: 1px solid @border-color;
  color: @character-color;
  display: flex;
  justify-content: center;
  // font-family: 'M PLUS 1p', sans-serif;
  font-size: 100px;
  align-items: center;
  transition: background-color 300ms;

  &.font-noto {
    font-weight: 200;
    font-family: 'Noto Serif JP', sans-serif;
  }

  &.light-border {
    border: 1px dotted lighten(@border-color, 10%);
  }

  &.sm {
    font-size: 21px;
  }
   
  &:hover {
    background-color: @cell-hover-background-color;
    color: white;
  };
}

</style>

