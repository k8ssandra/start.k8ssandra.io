<template>
    <div>
        <h2>Share This URL</h2>
        <div><input id="configurl" v-model="uriendcoded"><button @click.prevent="grabEncode">Copy</button></div>
        </div>
        
</template>

<script>
export default {
  name: "ConfigUrl",
  computed: {
    uriendcoded() {   
      let buildPathConnect = {
          name: this.$store.state.config.cassandra.clusterName,
          description: this.$store.state.k8_config.description
      };

      let builtPath = window.location.origin + "?"
    
      for (let stone in buildPathConnect) {
        let val = encodeURIComponent(buildPathConnect[stone]);
         builtPath = builtPath + stone + "=" + val + "&";
      }

      return builtPath;
    },
  },
  methods: {
    grabEncode() {
      document.getElementById('configurl').select();
      document.execCommand("copy");
    },
  }
};
</script>