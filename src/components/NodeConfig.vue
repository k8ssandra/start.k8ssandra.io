<template>
    <div class="node_config">
        <h2>Node Config</h2>
        <div>
            <label>CPU Cores**</label><br />
            <input v-model.number="cpu_number" type="number">
        </div>
        <div>
            <label>RAM Cores**</label><br />
            <input v-model.number="ram_number" type="number">
        </div>
        <div>
          <h5>Storage</h5>
            <label>Storage Class**</label><br />
            <select v-model="storage_class">
            <option v-for="(item, key) in storage_classes" :key="key" >
                {{ item }}
            </option>
            </select> 
        </div>
        <div>
            <label>Storage Amount**</label><br />
            <input v-model.number="storage_number" type="number">
        </div>
        <div>
            <label>Heap Number**</label><br />
            <input v-model.number="heap_number" type="number">
        </div>
    </div>
</template>

<script>
export default {
  name: "NodeConfig",
  data() {
    return {
      storage_classes: ["standard", "managed-premium", "standard-rwo", "do-block-storage-wait", "local-path"],
    };
  },
  computed: {
    cpu_number: {
      get() {
        return this.$store.state.k8_config.cpu_cores;
      },
      set(value) {
        this.$store.commit("updateCpuCoresAmount", value);
      },
    },
    ram_number: {
      get() {
        return this.$store.state.k8_config.ram_cores;
      },
      set(value) {
        this.$store.commit("updateRamCoresAmount", value);
      },
    },
    heap_number: {
      get() {
        return this.$store.state.k8_config.heap_number;
      },
      set(value) {
        this.$store.commit("updateHeapAmount", value);
      },
    },
    storage_class: {
      get() {
        return this.$store.state.config.cassandra.cassandraLibDirVolume.storageClass;
      },
      set(value) {
        this.$store.commit("updateStorageClass", value);
      },
    },
    storage_number: {
      get() {
        return this.$store.state.k8_config.storage_amount;
      },
      set(value) {
        this.$store.commit("updateStorageAmount", value);
      },
    },
  },
};
</script>