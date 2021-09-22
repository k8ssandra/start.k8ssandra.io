<template>
    <div>
        <h2>Share This URL</h2>
        <div><input id="configurl" v-model="uriendcoded"><button @click.prevent="grabEncode">Copy</button></div>
        
        <div><button @click.prevent="encodeData">encode</button></div>
        </div>
        
</template>

<script>

const codec = require('json-url')('lzw');



export default {
  name: "ConfigUrl",
  computed: {
    uriendcoded() {   

      // CDnotes - This is where the URL is built - it goes through and grabs each field and adds it to the querystring
      //This willneed built out and the objects need fixed - right now they aren't coming through
      
      // let buildPathConnect = {
      //     name: this.$store.state.config.cassandra.clusterName,
      //     description: this.$store.state.k8_config.description,
      //     v: this.$store.state.config.cassandra.version,
      //     auth: this.$store.state.config.cassandra.auth.enabled,
      //     dc: this.$store.state.config.cassandra.datacenters[0].name,
      //     racks: this.$store.state.config.cassandra.datacenters[0].racks,

      // };

      // let builtPath = window.location.origin + "?"
    
      // for (let stone in buildPathConnect) {
      //   let val = encodeURIComponent(buildPathConnect[stone]);
      //    builtPath = builtPath + stone + "=" + val + "&";
      // }
      let builtPath = window.location.origin + "?"
      let path = this.encodeData;
      builtPath = builtPath + path;


      return builtPath;
    },
  },
  methods: {
    grabEncode() {
      document.getElementById('configurl').select();
      document.execCommand("copy");
    },
    encodeData() {
      let data = this.$store.state;
      let resp = '';
      codec.compress(data).then(result => (resp = result));

    return resp;
    }
  }
};
</script>