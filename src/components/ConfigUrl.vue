<template>
    <div>
        <h2>Share This URL</h2>
        {{ base64endcoded }}
        </div>
        
</template>

<script>
export default {
  name: "ConfigUrl",
  computed: {
    base64endcoded() {
    //   const path = this.$store.state;
      
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
};
</script>