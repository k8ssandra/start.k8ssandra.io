import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    config: {
      cassandra: {
        enabled: true,
        version: "4.0.0",
        clusterName: "",
        auth: {
          enabled: true,
        },
        datacenters: [
          {
            name: "dc1",
            size: 0,
            racks: [
              {
                name: "rack1",
                affinityLabels: {
                  foo: "bar",
                },
              },
            ],
          },
        ],
      },
    },
    k8_config: {
      description: "",
      cluster_size: 1,
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
      state.config.cassandra.clusterName = txt;
    },
    updateDescription(state, txt) {
      state.k8_config.description = txt;
    },
    updateVersion(state, txt) {
      state.config.cassandra.version = txt;
    },
    updateAuthentication(state, txt) {
      state.config.cassandra.auth.enabled = txt;
    },
    updateDataCenterName(state, txt) {
      state.config.cassandra.datacenters[0].name = txt;
    },
    updateClusterSize(state, txt) {
      // Will have to calculate based on racks number here.
      state.config.cassandra.datacenters.size = txt;
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
    updateStargateSize(state, txt) {
      state.k8_config.stargate.size = txt;
    },
    updateStargateCpuAmount(state, txt) {
      state.k8_config.stargate.amt = txt;
    },
    updateStargateCpuUnit(state, txt) {
      state.k8_config.stargate.unit = txt;
    },
    updateStargateHeapMb(state, txt) {
      state.k8_config.stargate.heap_in_mb = txt;
    },
    updateReaperEnabled(state, txt) {
      state.k8_config.reaper.active = txt;
    },
    updateMedusaEnabled(state, txt) {
      state.k8_config.medusa.active = txt;
    },
    updateMedusaProvider(state, txt) {
      state.k8_config.medusa.provider = txt;
    },
    updateMedusaS3Region(state, txt) {
      state.k8_config.medusa.provider_s3.config.region = txt;
    },
    updateMedusaS3Name(state, txt) {
      state.k8_config.medusa.provider_s3.config.bucket_name = txt;
    },
    updateMedusaS3StorageSecret(state, txt) {
      state.k8_config.medusa.provider_s3.config.secret = txt;
    },
    updateMedusaS3CompatibleRegion(state, txt) {
      state.k8_config.medusa.provider_s3_compatible.config.region = txt;
    },
    updateMedusaS3CompatibleHost(state, txt) {
      state.k8_config.medusa.provider_s3_compatible.config.host = txt;
    },
    updateMedusaS3CompatiblePort(state, txt) {
      state.k8_config.medusa.provider_s3_compatible.config.port = txt;
    },
    updateMedusaS3CompatibleSecure(state, txt) {
      state.k8_config.medusa.provider_s3_compatible.config.secure = txt;
    },
    updateMedusaS3CompatibleName(state, txt) {
      state.k8_config.medusa.provider_s3_compatible.config.bucket_name = txt;
    },
    updateMedusaS3CompatibleStorageSecret(state, txt) {
      state.k8_config.medusa.provider_s3_compatible.config.secret = txt;
    },
    updateMedusaGCSName(state, txt) {
      state.k8_config.medusa.provider_gcs.config.bucket_name = txt;
    },
    updateMedusaGCSStorageSecret(state, txt) {
      state.k8_config.medusa.provider_gcs.config.secret = txt;
    },
    updateMedusaABSName(state, txt) {
      state.k8_config.medusa.provider_abs.config.bucket_name = txt;
    },
    updateMedusaABSStorageSecret(state, txt) {
      state.k8_config.medusa.provider_abs.config.secret = txt;
    },
    updateMedusaLocalClass(state, txt) {
      state.k8_config.medusa.provider_local.config.storage_class = txt;
    },
    updateMedusaLocalSize(state, txt) {
      state.k8_config.medusa.provider_local.config.size = txt;
    },
    updateMedusaLocalUnit(state, txt) {
      state.k8_config.medusa.provider_local.config.unit = txt;
    },
    updateMonitoringEnabled(state, txt) {
      state.k8_config.monitoring.active = txt;
    },
    updateMonitoringKubePrometheus(state, txt) {
      state.k8_config.monitoring.config.kube_prometheus_stack = txt;
    },
    updateMonitoringServiceMonitors(state, txt) {
      state.k8_config.monitoring.config.service_monitors = txt;
    },
    updateMonitoringDashboards(state, txt) {
      state.k8_config.monitoring.config.dashboards = txt;
    },
  },
  actions: {},
  modules: {},
});
