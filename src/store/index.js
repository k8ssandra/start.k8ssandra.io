import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    k8_config: {
      name: "",
      description: "",
      version: "4.0.0",
      authentication: "true",
      cluster_size: 1,
      datacenters: [
        {
          name: "",
          racks: [],
        },
      ],
      cpu_cores: {
        amt: 1,
        unit: " ",
      },
      ram_cores: {
        amt: 1,
        unit: "MB",
      },
      storage: {
        class: "",
        amt: 1,
        unit: "MB",
      },
      heap: {
        amt: 0.25,
        suffix: "MB",
      },
      additional_seeds: [],
      stargate: {
        active: false,
        size: 1,
        cpu: 1,
        unit: "",
        heap_in_mb: 0,
      },
      reaper: {
        active: false,
      },
      medusa: {
        active: false,
        provider: [
          {
            name: "S3",
            config: {
              region: "",
              bucket_name: "",
              secret: "",
            },
          },
          {
            name: "S3 Compatible",
            config: {
              region: "",
              host: "",
              port: 0,
              secure: false,
              bucketname: "",
              secret: "",
            },
          },
          {
            name: "Google Cloud Storage",
            config: {
              bucketname: "",
              secret: ""
            }
          },
          {
            name: "Azure Blob Configuration",
            config: {
              bucketname: "",
              secret: ""
            }
          },
          {
            name: "Local Configuration",
            config: {
              storage_class: "",
              size: 1,
              unit: "MB"
            }
          },
        ],
      },
      monitoring: {
        active: false,
        config: {
          kube_prometheus_stack: false,
          service_monitors: false,
          dashboards: false
        }
      }
    },
  },
  mutations: {
    updateName(state, txt) {
      state.k8_config.name = txt;
    },
    updateDescription(state, txt) {
      state.k8_config.description = txt;
    },
    updateVersion(state, txt) {
      state.k8_config.version = txt;
    },
    updateAuthentication(state, txt) {
      state.k8_config.authentication = txt;
    },
    updateClusterSize(state, txt) {
      state.k8_config.cluster_size = txt;
    },
    updateDataCenterName(state, txt) {
      state.k8_config.datacenters[0].name = txt;
    },
    updateCpuCoresAmount(state, txt) {
      state.k8_config.cpu_cores.amt = txt;
    },
    updateCpuCoresUnit(state, txt) {
      state.k8_config.cpu_cores.unit = txt;
    },
    updateRamCoresAmount(state, txt) {
      state.k8_config.ram_cores.amt = txt;
    },
    updateRamCoresUnit(state, txt) {
      state.k8_config.ram_cores.unit = txt;
    },
    updateStorageClass(state, txt) {
      state.k8_config.storage.class = txt;
    },
    updateStorageAmount(state, txt) {
      state.k8_config.storage.amt = txt;
    },
    updateStorageUnit(state, txt) {
      state.k8_config.storage.unit = txt;
    },
    updateStargateEnabled(state, txt) {
      state.k8_config.stargate.active = txt;
    },
  },
  actions: {},
  modules: {},
});
