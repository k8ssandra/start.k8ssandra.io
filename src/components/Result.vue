<template>
<div class="result__container">
  <div class="result__block">
    <div class="result">
      <div class="result__heading">
        <h2>Output</h2>
        <div class="button_ctas">
          <div class="copy__config">
            <a class="button" href @click.prevent="grabConfig">
              <v-icon
              >
                fa-copy
              </v-icon>
              <span>Copy</span>
              <transition name="fade">
                <span class="copy-tooltip" v-show="showConfigCopied">Link Copied!</span>
              </transition>
            </a>
          </div>
          <ShareUrl />
        </div>
      </div>
        <textarea id="config_preview" readonly v-model="cassandra_output" name="config_preview" cols="50">
          </textarea>
    </div>
    <div class="helm__container">
      <h3>
        Helm Install
        <v-tooltip right>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
                v-bind="attrs"
                v-on="on"
            >
              fa-question
            </v-icon>
          </template>
          <span>Helm install tooltip text</span>
        </v-tooltip>
      </h3>
      <div class="export">
        <a class="button" href @click.prevent="exportConfig">Download YAML File</a>
      </div>
      <div>
        <input id="helm__install" v-model="helmInstall">
        <button @click.prevent="grabHelm">
          Copy
          <transition name="fade">
            <span class="copy-tooltip" v-show="showHelmCopied">Copied!</span>
          </transition>
        </button>
      </div>
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
  data () {
    return {
      showConfigCopied: false,
      showHelmCopied: false
    }
  },
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
      this.showHelmCopied = true;
      setTimeout(() => this.showHelmCopied = false, 2000);
    },
    grabConfig() {
      document.getElementById("config_preview").select();
      document.execCommand("copy");
      this.showConfigCopied = true;
      setTimeout(() => this.showConfigCopied = false, 2000);
    },
  },
};
</script>

<style lang="scss" scoped>
.result__container {
  color: var(--color-brand-dark-blue);
  margin-left: 30px;
  flex-grow: 1;
  z-index: 2;

  @media screen and (max-width: 992px) {
    margin-left: 0;
    margin-bottom: 20px;
    overflow: hidden;
    z-index: 1;
  }
  
  > div {
    background: var(--color-brand-dark-blue);
    border-radius: 10px;
  }
}

.result__block {
  height: calc(100vh - 295px);
  display: flex;
  flex-flow: column nowrap;
  position: fixed;

  @media screen and (max-width: 1220px) {
    width: 470px;
  }

  @media screen and (min-width: 1221px) {
    width: 626px;
  }

  @media screen and (max-width: 992px) {
    width: 600px;
    max-width: 100%;
    height: auto;
    position: relative;
    margin: 0 auto;
  }
}

.result__heading {
  padding: 20px 30px;
  border-bottom: 1px solid var(--color-brand-light-blue);
  display: flex;

  @media screen and (max-width: 768px) {
    padding: 20px;
  }
}

.result {
  border-radius: 10px 10px 0 0;
  margin: 0 auto;
  flex-grow: 1;
  width: 100%;

  h2 {
    margin: 0;
    color: var(--color-white);
  }

  textarea {
    max-width: 500px;
    margin: 25px 30px;
    background-color: var(--color-brand-dark-blue);
    border: 0;
    color: var(--color-grey-medium);
    font-size: 12px;
    font-family: monospace;
    resize: none;
    outline: none;

    @media screen and (max-width: 768px) {
      display: none;
      margin: 20px;
    }
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

h3 {
  display: flex;
  color: var(--color-white);

  .v-tooltip + .v-icon.v-icon {
    margin-left: 10px;
  }
}

.helm__container {
  padding: 30px;
  border-top: 1px solid var(--color-brand-light-blue);

  @media screen and (max-width: 768px) {
    padding: 20px;
    border: 0;
  }

  > div {
    display: flex;
    margin-top: 5px;

    @media screen and (max-width: 768px) {
      flex-direction: column;
    }

    input {
      height: 45px;
      padding: 7px 14px;
      flex-grow: 1;
      background: var(--color-grey-light);
      border: 1px solid var(--color-grey-medium);
      color: var(--color-brand-black);
      font-size: 14px;
      line-height: 24px;
      outline: none;
    }
  }
}

button {
  height: 45px;
  padding: 7px 20px;
  margin-top: 0;
  margin-left: 5px;
  font-size: 14px;
  line-height: 28px;
  font-weight: 700;
  text-decoration: none;

  @media screen and (max-width: 768px) {
    margin: 5px 0 0;
  }
}

.export .button {
  margin: 0;
  width: 100%;
  text-align: center;
  box-shadow: none;
}

.button_ctas {
  display: flex;
  margin-left: auto;

  &::v-deep {
    span:not(.copy-tooltip) {
      text-decoration: underline;
    }

    a {
      position: relative;
      margin-left: 20px;
      color: var(--color-white);
      font-size: 10px;
      line-height: 1;
      text-transform: uppercase;
      text-decoration: none;

      @media screen and (max-width: 768px) {
        margin-left: 10px;
      }
    }

    .v-icon {
      margin-right: 10px;
      font-size: 16px;
      color: var(--color-white);
    }
  }
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