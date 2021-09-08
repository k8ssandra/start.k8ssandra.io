<template>
    <div class="node_config">
        <h2>Node Config</h2>
        <div>
            <label>CPU Cores</label><br />
            <input v-model.number="cpu_number" type="number">
            <select v-model="cpu_unit">
            <option v-for="(item, key) in cpu_units" :key="key" >
                {{ item }}
            </option>
            </select> 
        </div>
        <div>
            <label>RAM Cores</label><br />
            <input v-model.number="ram_number" type="number">
            <select v-model="ram_unit">
            <option v-for="(item, key) in byte_units" :key="key" >
                {{ item }}
            </option>
            </select> 
        </div>
        <div>
          <h5>Storage</h5>
            <label>Storage Class</label><br />
            <select v-model="storage_class">
            <option v-for="(item, key) in storage_classes" :key="key" >
                {{ item }}
            </option>
            </select> 
        </div>
        <div>
            <label>Storage Amount</label><br />
            <input v-model.number="storage_number" type="number">
            <select v-model="storage_unit">
            <option v-for="(item, key) in byte_units" :key="key" >
                {{ item }}
            </option>
            </select> 
        </div>
    </div>
</template>

<script>
export default {
  name: "NodeConfig",
  data() {
    return {
      cpu_units: [" ", "m"],
      byte_units: ["MB", "GB", "TB"],
      storage_classes: ["standard", "Storage Class 2", "Storage Class 3"],
    };
  },
  computed: {
    cpu_number: {
      get() {
        return this.$store.state.cassandra.cpu_cores.amt;
      },
      set(value) {
        this.$store.commit("updateCpuCoresAmount", value);
      },
    },
    cpu_unit: {
      get() {
        return this.$store.state.cassandra.cpu_cores.unit;
      },
      set(value) {
        this.$store.commit("updateCpuCoresUnit", value);
      },
    },
    ram_number: {
      get() {
        return this.$store.state.cassandra.ram_cores.amt;
      },
      set(value) {
        this.$store.commit("updateRamCoresAmount", value);
      },
    },
    ram_unit: {
      get() {
        return this.$store.state.cassandra.ram_cores.unit;
      },
      set(value) {
        this.$store.commit("updateRamCoresUnit", value);
      },
    },
    storage_class: {
      get() {
        return this.$store.state.cassandra.storage.class;
      },
      set(value) {
        this.$store.commit("updateStorageClass", value);
      },
    },
    storage_number: {
      get() {
        return this.$store.state.cassandra.storage.amt;
      },
      set(value) {
        this.$store.commit("updateStorageAmount", value);
      },
    },
    storage_unit: {
      get() {
        return this.$store.state.cassandra.storage.unit;
      },
      set(value) {
        this.$store.commit("updateStorageUnit", value);
      },
    },
  },
};
</script>