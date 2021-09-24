<template>
  <div id="app">
    <div id="header">
      <h1>K8ssandra Configurator</h1>
    </div>
    <router-view/>
  </div>
</template>

<script>

export default {
  name: "app",
}
</script>

<style lang="scss">
body {
  margin: 0 8px;
  background-color:#0097FF;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  padding-bottom:0;
  overflow: hidden;
}

#header {
  padding: 10px;
}

div {
  padding-bottom: 20px;
}
</style>
