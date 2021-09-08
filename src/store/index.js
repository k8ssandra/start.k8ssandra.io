import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cassandra: {
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
        class: "standard",
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
        amt: 1,
        unit: " ",
        heap_in_mb: 0,
      },
      reaper: {
        active: false,
      },
      medusa: {
        active: false,
        provider: "S3",
        provider_s3: {
          name: "S3",
          config: {
            region: "region1",
            bucket_name: "",
            secret: "",
          },
        },
        provider_s3_compatible: {
          name: "S3 Compatible",
          config: {
            region: "",
            host: "",
            port: 0,
            secure: false,
            bucket_name: "",
            secret: "",
          },
        },
        provider_gcs: {
          name: "Google Cloud Storage",
          config: {
            bucket_name: "",
            secret: "",
          },
        },
        provider_abs: {
          name: "Azure Blob Storage",
          config: {
            bucket_name: "adfs",
            secret: "asfd",
          },
        },
        provider_local: {
          name: "Local Configuration",
          config: {
            storage_class: "",
            size: 1,
            unit: "MB",
          },
        },
      },
      monitoring: {
        active: false,
        config: {
          kube_prometheus_stack: false,
          service_monitors: false,
          dashboards: false,
        },
      },
    },
  },
  mutations: {
    updateName(state, txt) {
      state.cassandra.name = txt;
    },
    updateDescription(state, txt) {
      state.cassandra.description = txt;
    },
    updateVersion(state, txt) {
      state.cassandra.version = txt;
    },
    updateAuthentication(state, txt) {
      state.cassandra.authentication = txt;
    },
    updateClusterSize(state, txt) {
      state.cassandra.cluster_size = txt;
    },
    updateDataCenterName(state, txt) {
      state.cassandra.datacenters[0].name = txt;
    },
    updateCpuCoresAmount(state, txt) {
      state.cassandra.cpu_cores.amt = txt;
    },
    updateCpuCoresUnit(state, txt) {
      state.cassandra.cpu_cores.unit = txt;
    },
    updateRamCoresAmount(state, txt) {
      state.cassandra.ram_cores.amt = txt;
    },
    updateRamCoresUnit(state, txt) {
      state.cassandra.ram_cores.unit = txt;
    },
    updateStorageClass(state, txt) {
      state.cassandra.storage.class = txt;
    },
    updateStorageAmount(state, txt) {
      state.cassandra.storage.amt = txt;
    },
    updateStorageUnit(state, txt) {
      state.cassandra.storage.unit = txt;
    },
    updateStargateEnabled(state, txt) {
      state.cassandra.stargate.active = txt;
    },
    updateStargateSize(state, txt) {
      state.cassandra.stargate.size = txt;
    },
    updateStargateCpuAmount(state, txt) {
      state.cassandra.stargate.amt = txt;
    },
    updateStargateCpuUnit(state, txt) {
      state.cassandra.stargate.unit = txt;
    },
    updateStargateHeapMb(state, txt) {
      state.cassandra.stargate.heap_in_mb = txt;
    },
    updateReaperEnabled(state, txt) {
      state.cassandra.reaper.active = txt;
    },
    updateMedusaEnabled(state, txt) {
      state.cassandra.medusa.active = txt;
    },
    updateMedusaProvider(state, txt) {
      state.cassandra.medusa.provider = txt;
    },
    updateMedusaS3Region(state, txt) {
      state.cassandra.medusa.provider_s3.config.region = txt;
    },
    updateMedusaS3Name(state, txt) {
      state.cassandra.medusa.provider_s3.config.bucket_name = txt;
    },
    updateMedusaS3StorageSecret(state, txt) {
      state.cassandra.medusa.provider_s3.config.secret = txt;
    },
    updateMedusaS3CompatibleRegion(state, txt) {
      state.cassandra.medusa.provider_s3_compatible.config.region = txt;
    },
    updateMedusaS3CompatibleHost(state, txt) {
      state.cassandra.medusa.provider_s3_compatible.config.host = txt;
    },
    updateMedusaS3CompatiblePort(state, txt) {
      state.cassandra.medusa.provider_s3_compatible.config.port = txt;
    },
    updateMedusaS3CompatibleSecure(state, txt) {
      state.cassandra.medusa.provider_s3_compatible.config.secure = txt;
    },
    updateMedusaS3CompatibleName(state, txt) {
      state.cassandra.medusa.provider_s3_compatible.config.bucket_name = txt;
    },
    updateMedusaS3CompatibleStorageSecret(state, txt) {
      state.cassandra.medusa.provider_s3_compatible.config.secret = txt;
    },
    updateMedusaGCSName(state, txt) {
      state.cassandra.medusa.provider_gcs.config.bucket_name = txt;
    },
    updateMedusaGCSStorageSecret(state, txt) {
      state.cassandra.medusa.provider_gcs.config.secret = txt;
    },
    updateMedusaABSName(state, txt) {
      state.cassandra.medusa.provider_abs.config.bucket_name = txt;
    },
    updateMedusaABSStorageSecret(state, txt) {
      state.cassandra.medusa.provider_abs.config.secret = txt;
    },
    updateMedusaLocalClass(state, txt) {
      state.cassandra.medusa.provider_local.config.storage_class = txt;
    },
    updateMedusaLocalSize(state, txt) {
      state.cassandra.medusa.provider_local.config.size = txt;
    },
    updateMedusaLocalUnit(state, txt) {
      state.cassandra.medusa.provider_local.config.unit = txt;
    },
    updateMonitoringEnabled(state, txt) {
      state.cassandra.monitoring.active = txt;
    },
    updateMonitoringKubePrometheus(state, txt) {
      state.cassandra.monitoring.config.kube_prometheus_stack = txt;
    },
    updateMonitoringServiceMonitors(state, txt) {
      state.cassandra.monitoring.config.service_monitors = txt;
    },
    updateMonitoringDashboards(state, txt) {
      state.cassandra.monitoring.config.dashboards = txt;
    },
  },
  actions: {},
  modules: {},
});
