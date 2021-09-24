<template>
  <div id="app">
    <div id="nav">
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
  :root {
    --color-blue: #0097ff;
    --color-blue-dark: #153d71;
    --color-red: #f9305d;
    --color-yellow: #fcf067;
    --color-grey-light: #f4f6f8;
    --color-grey-medium: #b2becd;
    --color-grey-dark: #6f7a87;
    --color-black: #02070d;
    --color-white: #fff;
  }

  body {
    margin: 0;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    background-color: var(--color-blue);
  }

  #nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
</style>
