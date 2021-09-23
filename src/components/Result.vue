<template>
<div class="result__container">
  <div class="result">
      <h1>Result</h1>
      <textarea id="config_preview" readonly v-model="cassandra_output" name="config_preview" rows="20" cols="50">
        </textarea>
  </div>
  <div class="helm__container">
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
      let translatedData = JSON.parse(JSON.stringify(data))

      if (data.cassandra.auth.enabled !== true) {
        delete translatedData.cassandra.auth;
      }
      if (data.stargate.enabled !== true) {
        delete translatedData["stargate"]
      }
      if (data.reaper.enabled !== true) {
        delete translatedData["reaper"]
      }
      if (data.medusa.enabled !== true) {
        delete translatedData["medusa"]
      }
      if (data.medusa.storage === "local") {
        delete translatedData.medusa.bucketName
        delete translatedData.medusa.storageSecret
      } 
      if (data.medusa.storage !== "local") {
        delete translatedData.medusa.storageClass
        delete translatedData.medusa.size
      }
      if (data.medusa.storage !== "s3_compatible") {
        delete translatedData.medusa.storage_properties
      }
      if (data.monitoring.prometheus.provision_service_monitors !== true) {
        delete translatedData.monitoring.prometheus
      }
      if (data.monitoring.grafana.provision_dashboards !== true) {
        delete translatedData.monitoring.grafana
      }
      if (data.monitoring.grafana.provision_dashboards !== true && data.monitoring.prometheus.provision_service_monitors !== true) {
        delete translatedData.monitoring
      }
      if (data["kube-prometheus-stack"].enabled !== true) {
        delete translatedData["kube-prometheus-stack"]
      }
      if (data.cassandra.cassandraLibDirVolume.additionalSeeds.length === 0) {
        delete translatedData.cassandra.cassandraLibDirVolume.additionalSeeds
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
.result {
  max-width: 500px;
  margin: 0 auto;
}
pre {
  margin: 30px 100px;
  text-align: left;
}

.button_ctas {
  display: flex;
}

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
    margin: 20px;
    white-space: nowrap;
    &:hover {
      border: 1px solid rgba(2, 62, 150, 1);
    }
  }
}
.copy__config {
  display: flex;
  align-items: center;
  justify-content: center;
  height: auto;
  padding-bottom: 0;
  a.button {
    background: rgb(146, 200, 20);
    background: linear-gradient(
      45deg,
      rgba(146, 200, 20, 1) 0%,
      rgba(34, 193, 195, 1) 71%
    );
    color: white;
    text-decoration: none;
    font-weight: bold;
    font-size: 20px;
    letter-spacing: -0.5px;
    border: none;
    border-radius: 5px;
    padding: 10px 30px;
    margin: 20px;
    white-space: nowrap;
    &:hover {
      border: 1px solid rgba(2, 62, 150, 1);
    }
  }
}
</style>