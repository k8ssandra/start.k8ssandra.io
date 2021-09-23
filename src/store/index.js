import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    settings: {
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
            additionalSeeds: [],
          },
          heap: {
            size: "1G",
            newGenSize: "1G",
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
          cpuLimMillicores: 200,
        },
        reaper: {
          enabled: true,
        },
        medusa: {
          enabled: false,
          storage: "",
          storage_properties: {},
          bucketName: "",
          storageSecret: ""
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
        heap_number: 1,
        additionalSeeds: [],
      },
    },
    encodestore: "",
  },
  mutations: {
    LandingPage(state) {
      state.settings.k8_config.landpage = false;
    },
    updateName(state, txt) {
      state.settings.config.cassandra.clusterName = txt;
    },
    updateDescription(state, txt) {
      state.settings.k8_config.description = txt;
    },
    updateVersion(state, txt) {
      state.settings.config.cassandra.version = txt;
    },
    updateAuthentication(state, txt) {
      state.settings.config.cassandra.auth.enabled = txt;
    },
    updateDataCenterName(state, txt) {
      state.settings.config.cassandra.datacenters[0].name = txt;
    },
    addRack(state, txt) {
      let rack = {
        name: txt,
        affinityLabels: {},
      };
      state.settings.config.cassandra.datacenters[0].racks.push(rack);
    },
    addRacks(state, txt) {
      state.settings.config.cassandra.datacenters[0].racks = txt;
    },
    removeRack(state, num) {
      state.settings.config.cassandra.datacenters[0].racks.splice(num, 1);
    },
    addNode(state, values) {
      let rack = values.num;
      let nodeKey = values.nodeLabel;
      let nodeValue = values.nodeValue;
      state.settings.config.cassandra.datacenters[0].racks[rack].affinityLabels = {
        ...state.settings.config.cassandra.datacenters[0].racks[rack].affinityLabels,
        [nodeKey]: nodeValue,
      };
    },
    removeNode(state, values) {
      let node = values.node;
      Vue.delete(
        state.settings.config.cassandra.datacenters[0].racks[values.rack].affinityLabels,
        node
      );
    },
    updateClusterSize(state, txt) {
      state.settings.k8_config.cluster_size_per = txt;
    },
    updateTotalClusterSize(state) {
      let numOfRacks = state.settings.config.cassandra.datacenters[0].racks.length;
      let SizePer = state.settings.k8_config.cluster_size_per;
      let totalSize = numOfRacks * parseInt(SizePer);
      state.settings.config.cassandra.datacenters[0].size = totalSize;
    },
    updateCpuCoresAmount(state, txt) {
      state.settings.k8_config.cpu_cores = txt;
      let displayedCpuAmount = state.settings.k8_config.cpu_cores + "m";
      // let parsed = JSON.parse(displayedCpuAmount);
      state.settings.config.cassandra.resources.requests.cpu = displayedCpuAmount;
      state.settings.config.cassandra.resources.limits.cpu = displayedCpuAmount;
    },
    updateRamCoresAmount(state, txt) {
      state.settings.k8_config.ram_cores = txt;
      let displayedRamAmount = state.settings.k8_config.ram_cores + "Gi";
      state.settings.config.cassandra.resources.requests.memory = displayedRamAmount;
      state.settings.config.cassandra.resources.limits.memory = displayedRamAmount;
    },
    updateHeapAmount(state, txt) {
      state.settings.k8_config.heap_number = txt;
      let displayedHeapAmount = state.settings.k8_config.heap_number + "G";
      state.settings.config.cassandra.heap.size = displayedHeapAmount;
      state.settings.config.cassandra.heap.newGenSize = displayedHeapAmount;
    },
    addAddSeed(state, txt) {
      state.settings.config.cassandra.cassandraLibDirVolume.additionalSeeds.push(txt);
    },
    removeSeed(state, num) {
      state.settings.config.cassandra.cassandraLibDirVolume.additionalSeeds.splice(num, 1);
    },
    updateStorageClass(state, txt) {
      state.settings.config.cassandra.cassandraLibDirVolume.storageClass = txt;
    },
    updateStorageAmount(state, txt) {
      state.settings.k8_config.storage_amount = txt;
      let displayedStorageAmount = state.settings.k8_config.storage_amount + "Gi";
      state.settings.config.cassandra.cassandraLibDirVolume.size = displayedStorageAmount;
    },
    updateStorageUnit(state, txt) {
      state.settings.k8_config.storage.unit = txt;
    },
    updateStargateEnabled(state, txt) {
      state.settings.config.stargate.enabled = txt;
    },
    updateStargateSize(state, txt) {
      state.settings.config.stargate.replicas = txt;
    },
    updateStargateCpuAmount(state, txt) {
      state.settings.config.stargate.cpuReqMillicores = txt;
      state.settings.config.stargate.cpuLimMillicores = txt;
    },
    updateStargateCpuUnit(state, txt) {
      state.settings.config.stargate.heapMB = txt;
    },
    updateStargateHeapMb(state, txt) {
      state.settings.config.stargate.heapMB = txt;
    },
    updateReaperEnabled(state, txt) {
      state.settings.config.reaper.enabled = txt;
    },
    updateMedusaEnabled(state, txt) {
      state.settings.config.medusa.enabled = txt;
    },
    updateMedusaProvider(state, txt) {
      state.settings.config.medusa.storage = txt;
    },
    updateMedusaBucketName(state, txt) {
      state.settings.config.medusa.bucketName = txt;
    },
    updateMedusaStorageSecret(state, txt) {
      state.settings.config.medusa.storageSecret = txt;
    },
    updateMedusaS3Region(state, txt) {
      state.settings.config.medusa.storage_properties = {
        ...state.settings.config.medusa.storage_properties,
        region: txt,
      }
    },
    updateMedusaS3CompatibleHost(state, txt) {
      state.settings.config.medusa.storage_properties = {
        ...state.settings.config.medusa.storage_properties,
        host: txt,
      }
    },
    updateMedusaS3CompatiblePort(state, txt) {
      state.settings.config.medusa.storage_properties = {
        ...state.settings.config.medusa.storage_properties,
        port: txt,
      }
        },
    updateMedusaS3CompatibleSecure(state, txt) {
      state.settings.config.medusa.storage_properties = {
        ...state.settings.config.medusa.storage_properties,
        secure: txt,
      }
        },
    updateMedusaLocalClass(state, txt) {
      state.settings.config.medusa = {
        ...state.settings.config.medusa,
        storageClass: txt,
      }
    },
    updateMedusaLocalSize(state, txt) {
      state.settings.config.medusa = {
        ...state.settings.config.medusa,
        size: txt,
      }
    },
    updateMedusaLocalUnit(state, txt) {
      state.settings.k8_config.medusa.provider_local.config.unit = txt;
    },
    updateMonitoringKubePrometheus(state, txt) {
      state.settings.config.kubeprometheusstack.enabled = txt;
    },
    updateMonitoringServiceMonitors(state, txt) {
      state.settings.config.monitoring.serviceMonitors.namespace = txt; //not sure about the boolean on this.
    },
    updateMonitoringDashboards(state, txt) {
      state.settings.config.monitoring.prometheus.provision_service_monitors = txt;
    },
    endcodeSave(state, txt) {
      state.encodestore = txt;
    },
    buildSettings(state, txt) {
      state.settings = txt;
    },
  },
  actions: {},
  modules: {},
});
