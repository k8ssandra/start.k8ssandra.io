<template>
    <div class="node_config">
        <h2>Node Config</h2>
        <div>
            <label>CPU Cores*</label><br />
            <input v-model.number="cpu_number" type="number">
        </div>
        <div>
            <label>RAM Cores*</label><br />
            <input v-model.number="ram_number" type="number">
          <v-slider
              min="0"
              max="100"
              v-model.number="ram_number"
              thumb-label="always"
              track-color="#b2becd"
          >
            <template v-slot:prepend>
              0 GB
            </template>

            <template v-slot:append>
              100 GB
            </template>
          </v-slider>
        </div>
        <div>
          <h5>Storage</h5>
            <label>Storage Class*</label><br />
            <select v-model="storage_class">
            <option v-for="(item, key) in storage_classes" :key="key" >
                {{ item }}
            </option>
            </select> 
        </div>
        <div>
            <label>Storage Amount</label><br />
            <input v-model.number="storage_number" type="number">
        </div>
        <div>
            <label>Heap Number(max amt: {{max_heap}})</label><br />
            <input v-model.number="heap_number" min=1 :max='max_heap' type="number">

        </div>
        <div>
          <additionalSeeds />
        </div>
    </div>
</template>

<script>

import additionalSeeds from './AdditionalSeeds.vue'
export default {
  name: "NodeConfig",
  components: {
    additionalSeeds
  },
  data() {
    return {
      storage_classes: [
        "standard",
        "managed-premium",
        "gp2",
        "standard-rwo",
        "do-block-storage-wait",
        "local-path",
      ],
    };
  },
  computed: {
    max_heap() {
      let heapMax = Math.floor(
        this.$store.state.settings.k8_config.ram_cores / 2
      );
      return heapMax;
    },
    cpu_number: {
      get() {
        return this.$store.state.settings.k8_config.cpu_cores;
      },
      set(value) {
        this.$store.commit("updateCpuCoresAmount", value);
      },
    },
    ram_number: {
      get() {
        return this.$store.state.settings.k8_config.ram_cores;
      },
      set(value) {
        this.$store.commit("updateRamCoresAmount", value);
      },
    },
    heap_number: {
      get() {
        return this.$store.state.settings.k8_config.heap_number;
      },
      set(value) {
        this.$store.commit("updateHeapAmount", value);
      },
    },
    storage_class: {
      get() {
        return this.$store.state.settings.config.cassandra.cassandraLibDirVolume
          .storageClass;
      },
      set(value) {
        this.$store.commit("updateStorageClass", value);
      },
    },
    storage_number: {
      get() {
        return this.$store.state.settings.k8_config.storage_amount;
      },
      set(value) {
        this.$store.commit("updateStorageAmount", value);
      },
    },
  },
};
</script>