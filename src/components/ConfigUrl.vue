<template>
    <div>
        <h3>Share your configuration</h3>
        <span>Use this link to share the current configuration.</span>
        <div class="configurl__wrapper">
          <input id="configurl" v-model="uriendcoded">
          <button @click.prevent="grabEncode">
              Copy
              <transition name="fade">
                <span class="copy-tooltip" v-show="showUrlCopied">Link Copied!</span>
              </transition>
          </button>
        </div>
    </div>
</template>

<script>

export default {
  name: "ConfigUrl",
  data () {
    return {
      showUrlCopied: false
    }
  },
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
      this.showUrlCopied = true;
      setTimeout(() => this.showUrlCopied = false, 2000);
    },
  }
};
</script>

<style lang="scss" scoped>
  .configurl__wrapper {
    margin-top: 24px;
    display: flex;
    flex-wrap: nowrap;

    @media screen and (max-width: 480px) {
      flex-wrap: wrap;
    }
  }

  h3 {
    margin: 14px auto;
  }

  .modal div > span:not(.copy-tooltip) {
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

    @media screen and (max-width: 480px) {
      margin: 0 0 10px;
    }
  }

  button {
    margin: 0;
    padding: 8px 20px;

    @media screen and (max-width: 480px) {
      width: 100%;
    }
  }
</style>