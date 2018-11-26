<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="less">
html, body {
  height: 100%;
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
