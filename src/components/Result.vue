<template>
<div class="result__container">
  <div class="result__block">
  <div class="result">
      <h2>Result</h2>
      <textarea id="config_preview" readonly v-model="cassandra_output" name="config_preview" cols="50">
        </textarea>
  </div>
  <div class="helm__container">
    <h3>Helm Install</h3>
    <div><input id="helm__install" v-model="helmInstall"><button @click.prevent="grabHelm">Copy</button></div>
  </div>
  <div class="button_ctas">
    <div class="copy__config">
        <a class="button" href @click.prevent="grabConfig">Copy Config</a>
    </div>
    <div class="export">
        <a class="button" href @click.prevent="exportConfig">Export Config</a>
    </div>    
    <ShareUrl />
      </div>
      </div>
</div>
</template>

<script>
const download = require("downloadjs");
const YAML = require("json-to-pretty-yaml");

import ShareUrl from "@/components/ShareUrl.vue";
const slugify = require("slugify");

export default {
  components: {
    ShareUrl,
  },
  computed: {
    cassandra_output() {
      let config = this.yamlizeData(this.$store.state.settings.config);
      return config;
    },
    filename() {
      let fileTitle = this.$store.state.settings.config.cassandra.clusterName;
      if (fileTitle) {
        fileTitle = slugify(fileTitle);
      } else {
        fileTitle = "k8ssandra-config";
      }
      return fileTitle;
    },
    helmInstall() {
      let code =
        "helm install -f " +
        this.filename +
        ".yaml k8ssandra k8ssandra/k8ssandra";
      return code;
    },
  },
  methods: {
    yamlizeData(data) {
      //sanitize yaml to pull out disabled systems.
      // let translatedData = {...data};
      let translatedData = JSON.parse(JSON.stringify(data));

      if (data.cassandra.auth.enabled !== true) {
        delete translatedData.cassandra.auth;
      }
      if (data.stargate.enabled !== true) {
        delete translatedData["stargate"];
      }
      if (data.reaper.enabled !== true) {
        delete translatedData["reaper"];
      }
      if (data.medusa.storage === "local") {
        delete translatedData.medusa.bucketName;
        delete translatedData.medusa.storageSecret;
      }
      if (data.medusa.storage !== "local") {
        delete translatedData.medusa.storageClass;
        delete translatedData.medusa.size;
      }
      if (data.medusa.storage !== "s3_compatible") {
        delete translatedData.medusa.storage_properties;
      }
      if (data.medusa.enabled !== true) {
        delete translatedData["medusa"];
      }
      if (data.monitoring.prometheus.provision_service_monitors !== true) {
        delete translatedData.monitoring.prometheus;
      }
      if (data.monitoring.grafana.provision_dashboards !== true) {
        delete translatedData.monitoring.grafana;
      }
      if (
        data.monitoring.grafana.provision_dashboards !== true &&
        data.monitoring.prometheus.provision_service_monitors !== true
      ) {
        delete translatedData.monitoring;
      }
      if (data["kube-prometheus-stack"].enabled !== true) {
        delete translatedData["kube-prometheus-stack"];
      }
      if (data.cassandra.cassandraLibDirVolume.additionalSeeds.length === 0) {
        delete translatedData.cassandra.cassandraLibDirVolume.additionalSeeds;
      }
      if (data.cassandra.datacenters[0].name.length === 0) {
        delete translatedData.cassandra.datacenters;
      }
      let output = YAML.stringify(translatedData);
      //built this in to replace the issue with json to yaml - check for options
      // output = output.replace("kubeprometheusstack", "kube-prometheus-stack");

      // data = data.replace(/["]+/g, '');
      return output;
    },
    exportConfig() {
      let data = this.yamlizeData(this.$store.state.settings.config);
      let fileName = this.filename + ".yaml";
      download(data, fileName, "text/yaml");
    },
    grabHelm() {
      document.getElementById("helm__install").select();
      document.execCommand("copy");
    },
    grabConfig() {
      document.getElementById("config_preview").select();
      document.execCommand("copy");
    },
  },
};
</script>

<style lang="scss" scoped>
.result__container {
  color: var(--color-brand-dark-blue);
  margin-left: 30px;
  flex-grow: 1;

  > div {
    background: var(--color-brand-dark-blue);
  }
}

.result__block {
  height: calc(100vh - 146px);
  display: flex;
  flex-flow: column nowrap;
  position: fixed;
  @media screen and (min-width: 1056px) {
    width: 626px;
  }
}

.result {
  border-radius: 10px 10px 0 0;
  margin: 0 auto;
  flex-grow: 1;
  width: 100%;

  h2 {
    margin: 0;
    padding: 20px 30px;
    color: var(--color-white);
    border-bottom: 1px solid var(--color-brand-light-blue);
  }

  textarea {
    max-width: 500px;
    margin: 25px 30px;
    background-color: var(--color-brand-dark-blue);
    border: 0;
    color: var(--color-grey-medium);
    font-size: 12px;
    font-family: monospace;
  }

  ::-webkit-scrollbar {
    width: 0; /* Remove scrollbar space */
    background: transparent; /* Optional: just make scrollbar invisible */
  }
}
pre {
  margin: 30px 100px;
  text-align: left;
}

.helm__container {
  padding: 30px;
  border-top: 1px solid var(--color-brand-light-blue);

  > div {
    display: flex;
  }
}

button {
  padding: 10px 20px;
  margin-left: 5px;
  background: var(--color-grey-medium);
  border: 1px solid var(--color-grey-medium);
  color: var(--color-grey-dark);
  font-size: 14px;
  font-weight: 700;
}

.button_ctas {
  display: flex;
}

textarea#config_preview {
  height: calc(100% - 120px);
}

.export {
  display: flex;
  align-items: center;
  justify-content: center;
  height: auto;
  padding-bottom: 0;
}
.copy__config {
  display: flex;
  align-items: center;
  justify-content: center;
  height: auto;
  padding-bottom: 0;
}
</style>