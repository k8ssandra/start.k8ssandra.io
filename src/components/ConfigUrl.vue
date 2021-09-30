<template>
    <div>
        <h3>Share your configuration</h3>
        <span>Use this link to share the current configuration.</span>
        <div class="configurl__wrapper">
          <input id="configurl" v-model="uriendcoded"><button @click.prevent="grabEncode">Copy</button></div>
        </div>
</template>

<script>

export default {
  name: "ConfigUrl",
  computed: {
    uriendcoded() {   
      let builtPath = window.location.origin + "?data="
      builtPath = builtPath + this.encodedJson;
      return builtPath;
    },
     encodedJson: {
      get() {
        return this.$store.state.encodestore;
      },
    }
  },
  methods: {
    grabEncode() {
      document.getElementById('configurl').select();
      document.execCommand("copy");
    },
  }
};
</script>

<style lang="scss" scoped>
  .configurl__wrapper {
    margin-top: 24px;
    display: flex;
    flex-wrap: nowrap;
  }

  h3 {
    margin: 14px auto;
  }

  .modal div > span {
    margin: 0 15px;
    text-decoration: none;
  }

  input {
    margin-right: 5px;
    padding: 9px 14px;
    background: var(--color-white);
    font-size: 14px;
    line-height: 24px;
    border: 2px solid var(--color-grey-medium);
    flex-grow: 1;
    outline: none;
  }

  button {
    margin: 0;
    padding: 8px 20px;
  }
</style>