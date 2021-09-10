<template>
<div class="result">
    <h1>Result</h1>
        <pre>{{ cassandra_output }}
        </pre>
</div>
</template>

<script>
const YAML = require("json-to-pretty-yaml");

export default {
  computed: {
    cassandra_output() {
      let json = this.$store.state.config;
      const data = YAML.stringify(json);
      return data;
    },
  },
};
</script>

<style lang="scss" scoped>
.result {
    max-width: 500px;  
    margin: 0 auto;
}
pre {
margin: 100px;

    text-align: left;
}
</style>