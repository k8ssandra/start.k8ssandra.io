<template>
    <div class="export">
        <a class="button" href @click.prevent="exportConfig">Export the config</a>
    </div>
</template>

<script>
const download = require("downloadjs");
const YAML = require("json-to-pretty-yaml");

export default {
  name: "ExportConfig",
  methods: {
    exportConfig() {
      const json = this.$store.state.cassandra;
      let fileName = json.name + ".values.yml";

      const data = YAML.stringify(json);

      download(data, fileName, "text/yaml");
    },
  },
};
</script>

<style lang="scss" scoped>
.export {
  display: flex;
  align-items: center;
  justify-content: center;
  height: auto;
  padding-bottom: 0;
  a.button {
    background: rgb(34, 193, 195);
    background: linear-gradient(
      45deg,
      rgba(34, 193, 195, 1) 0%,
      rgba(2, 62, 150, 1) 71%
    );
    color: white;
    text-decoration: none;
    font-weight: bold;
    font-size: 20px;
    letter-spacing: -0.5px;
    border: none;
    border-radius: 5px;
    padding: 10px 30px;
    margin-bottom: 0;
    &:hover {
      border: 1px solid rgba(2, 62, 150, 1);
    }
  }
}
</style>