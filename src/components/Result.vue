<template>
<div class="result__container">
  <div class="result">
      <h1>Result</h1>
          <pre>{{ cassandra_output }}
          </pre>
  </div>
  <div class="button_ctas">
    <ExportConfig />
    <ShareUrl />
  </div>
</div>
</template>

<script>
import ExportConfig from "../components/ExportConfig.vue";
import ShareUrl from "../components/ShareUrl.vue";

const YAML = require("json-to-pretty-yaml");

export default {
  components: {
    ExportConfig,
    ShareUrl,
  },
  computed: {
    cassandra_output() {
      let json = this.$store.state.config;
      let data = YAML.stringify(json);

      // data = data.replace(/["]+/g, '');
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

.button_ctas {
  display:flex;
}
</style>