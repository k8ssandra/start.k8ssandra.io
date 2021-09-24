<template>
  <v-app>
    <div id="app">
      <div id="nav">
      </div>
      <router-view/>
    </div>
  </v-app>
</template>

<script>

export default {
  name: "app",
}
</script>

<style lang="scss">
  // Base styles.
  :root {
    --color-brand-light-blue: #0097ff;
    --color-brand-dark-blue: #153d71;
    --color-brand-red: #f9305d;
    --color-brand-yellow: #fcf067;
    --color-brand-black: #02070d;
    --color-grey-light: #f4f6f8;
    --color-grey-medium: #b2becd;
    --color-grey-dark: #6f7a87;
    --color-white: #fff;

    --ff-usual: 'usual', sans-serif;
    --ff-museoSans: 'museo-sans', sans-serif;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
  }

  // Typography.
  @font-face {
    font-family:"museo-sans";
    src: url("assets/fonts/MuseoSans_700-webfont.woff2");
    src: url("assets/fonts/MuseoSans_700-webfont.woff2") format("woff2"),
    url("assets/fonts/MuseoSans_700-webfont.woff") format("woff");
    font-display:swap;
    font-style:normal;
    font-weight:700;
  }

  @font-face {
    font-family:"usual";
    src: url("assets/fonts/usual-regular-webfont.woff2");
    src: url("assets/fonts/usual-regular-webfont.woff2") format("woff2"),
    url("assets/fonts/usual-regular-webfont.woff") format("woff");
    font-display:swap;
    font-style:normal;
    font-weight:400;
  }

  @font-face {
    font-family:"usual";
    src: url("assets/fonts/usual-bold-webfont.woff2");
    src: url("assets/fonts/usual-bold-webfont.woff2") format("woff2"),
    url("assets/fonts/usual-bold-webfont.woff") format("woff");
    font-display:swap;
    font-style:normal;
    font-weight:700;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: var(--ff-museoSans);
    font-weight: 700;
    letter-spacing: -1px;
  }

  h1 {
    font-size: 66px;
    line-height: 79px;
  }

  h2 {
    font-size: 36px;
    line-height: 43px;
  }

  h3 {
    font-size: 28px;
    line-height: 34px;
  }

  h4 {
    font-size: 22px;
    line-height: 26px;
    letter-spacing: -1.1px;
  }

  h5 {
    font-size: 18px;
    line-height: 22px;
    letter-spacing: -0.9px;
  }

  // Elements re-used across components.
  input[type="submit"],
  .landing-page button {
    display: inline-block;
    position: relative;
    margin-top: 2px; // match half word-spacing
    margin-bottom: 2px; // match half word-spacing
    padding: 12px 24px;
    color: var(--color-brand-black);
    border: 1px solid transparent;
    border-radius: 3px;
    box-shadow: 4px 4px 0 0 var(--color-brand-black);
    text-align: center;
    text-decoration: none;
    font-weight: 700;
    font-size: 14px;
    line-height: 28px;
    background-color: var(--color-brand-red);
    transition:
      background-color 0.4s,
      border-color 0.4s,
      color 0.4s;

    &:hover {
      background-color: var(--color-brand-yellow);
      text-decoration: underline;
      transition:
        background-color 0.2s,
        border-color 0.2s,
        color 0.2s;
    }
  }

  // App.
  #app {
    font-family: var(--ff-usual);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: var(--color-brand-light-blue);
    color: var(--color-brand-black);
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
