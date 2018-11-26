<template>
  <div class="home">
    <div class="grid-container">
      <div class="grid-item" v-for="item in grid" :key="item.id" :class="$mq"
        @mouseover="mouseover(item)"
      >
        {{item.character}}
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
    mouseover(item) {
      item.hover = true;
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
  font-size: 100px;
  align-items: center;
  transition: all 300ms;

  &.sm {
    font-size: 21px;
  }
   
  &:hover {
    background-color: @cell-hover-background-color;
    color: white;
  };
}

</style>

