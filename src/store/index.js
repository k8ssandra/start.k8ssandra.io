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
        cassandraLibDirVolume: {
          storageClass: "standard",
          size: "5Gi",
        },
        heap: {
          size: ".25G",
          newGenSize: ".25G",
        },
        resources: {
          requests: {
            cpu: "7000m",
            memory: "60Gi",
          },
          limits: {
            cpu: "7000m",
            memory: "60Gi",
          },
        },
        datacenters: [
          {
            name: "dc1",
            size: 0,
            racks: [],
          },
        ],
      },
      stargate: {
        enabled: true,
        replicas: 1,
        heapMB: 256,
        cpuReqMillicores: 200,
      },
      reaper: {
        enabled: true,
      },
      medusa: {
        enabled: false,
        storage: "",
        storage_properties: {},
      },
      monitoring: {
        prometheus: {
          provision_service_monitors: true,
        },
        serviceMonitors: {
          namespace: "",
        },
      },
      kubeprometheusstack: {
        enabled: true,
      },
    },
    k8_config: {
      landpage: true,
      description: "",
      cluster_size_per: 1,
      storage_amount: 5,
      cpu_cores: 1,
      ram_cores: 1,
      heap_number: 0.25,
      additional_seeds: [],
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
    LandingPage(state) {
      state.k8_config.landpage = false;
    },
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
    addRack(state, txt) {
      let rack = {
        name: txt,
        affinityLabels: []
      };
      state.config.cassandra.datacenters[0].racks.push(rack);
    },
    removeRack(state, num) {
      state.config.cassandra.datacenters[0].racks.splice(num, 1);
    },
    addNode(state, values) {
      let rack = values.num;
      let nodeKey = values.nodeLabel;
      let nodeValue = values.nodeValue;
      let node = { [nodeKey]: nodeValue };
      state.config.cassandra.datacenters[0].racks[rack].affinityLabels.push(node);
    },
    removeNode(state, values) {
      state.config.cassandra.datacenters[0].racks[values.rack].affinityLabels.splice(values.node, 1);
    },
    updateClusterSize(state, txt) {
      state.k8_config.cluster_size_per = txt;
    },
    updateTotalClusterSize(state) {
      let numOfRacks = state.config.cassandra.datacenters[0].racks.length;
      let SizePer = state.k8_config.cluster_size_per;
      let totalSize = numOfRacks * parseInt(SizePer);
      state.config.cassandra.datacenters[0].size = totalSize;
    },
    updateCpuCoresAmount(state, txt) {
      state.k8_config.cpu_cores = txt;
      let displayedCpuAmount = state.k8_config.cpu_cores + "m";
      let parsed = JSON.parse(displayedCpuAmount);
      state.config.cassandra.resources.requests.cpu = parsed;
      state.config.cassandra.resources.limits.cpu = displayedCpuAmount;
    },
    updateRamCoresAmount(state, txt) {
      state.k8_config.ram_cores = txt;
      let displayedRamAmount = state.k8_config.ram_cores + "Gi";
      state.config.cassandra.resources.requests.memory = displayedRamAmount;
      state.config.cassandra.resources.limits.memory = displayedRamAmount;
    },
    updateHeapAmount(state, txt) {
      state.k8_config.heap_number = txt;
      let displayedHeapAmount = state.k8_config.heap_number + "G";
      state.config.cassandra.heap.size = displayedHeapAmount;
      state.config.cassandra.heap.newGenSize = displayedHeapAmount;
    },
    updateStorageClass(state, txt) {
      state.config.cassandra.cassandraLibDirVolume.storageClass = txt;
    },
    updateStorageAmount(state, txt) {
      state.k8_config.storage_amount = txt;
      let displayedStorageAmount = state.k8_config.storage_amount + "Gi";
      state.config.cassandra.cassandraLibDirVolume.size = displayedStorageAmount;
    },
    updateStorageUnit(state, txt) {
      state.k8_config.storage.unit = txt;
    },
    updateStargateEnabled(state, txt) {
      state.config.stargate.enabled = txt;
    },
    updateStargateSize(state, txt) {
      state.config.stargate.replicas = txt;
    },
    updateStargateCpuAmount(state, txt) {
      state.config.stargate.cpuReqMillicores = txt;
    },
    updateStargateCpuUnit(state, txt) {
      state.config.stargate.heapMB = txt;
    },
    updateStargateHeapMb(state, txt) {
      state.k8_config.stargate.heap_in_mb = txt;
    },
    updateReaperEnabled(state, txt) {
      state.config.reaper.enabled = txt;
    },
    updateMedusaEnabled(state, txt) {
      state.config.medusa.enabled = txt;
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
    updateMonitoringKubePrometheus(state, txt) {
      state.config.kubeprometheusstack.enabled = txt;
    },
    updateMonitoringServiceMonitors(state, txt) {
      state.config.monitoring.serviceMonitors.namespace = txt; //not sure about the boolean on this.
    },
    updateMonitoringDashboards(state, txt) {
      state.config.monitoring.prometheus.provision_service_monitors = txt;
    },
  },
  actions: {},
  modules: {},
});
