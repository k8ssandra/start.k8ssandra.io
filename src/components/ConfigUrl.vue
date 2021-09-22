<template>
    <div>
        <h2>Share This URL</h2>
        <div>
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