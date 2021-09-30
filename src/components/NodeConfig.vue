<template>
    <div class="node_config">
        <h4>Node Config</h4>
        <div>
            <label>CPU Cores*</label><br />
            <v-text-field
                v-model.number="cpu_number"
                suffix="milliCPU"
                hint="1000n = 1vCPU; Integers only"
                persistent-hint
            ></v-text-field>
        </div>
        <div>
            <label>RAM Cores*</label><br />
            <v-slider
                min="1"
                max="10"
                v-model.number="ram_number"
                thumb-label="always"
                track-color="#b2becd"
            >
          <template v-slot:thumb-label="{ value }">
            {{ Math.pow(2, value) }}
          </template>
            </v-slider>
        </div>
        <div>
            <label>Storage Class*</label><br />
<!--            <select v-model="storage_class">-->
<!--            <option v-for="(item, key) in storage_classes" :key="key" >-->
<!--                {{ item }}-->
<!--            </option>-->
<!--            </select>-->
            <v-select
                v-model="storage_class"
                :items="storage_classes"
                single-line
                append-icon="fa-chevron-down"
            ></v-select>
        </div>
        <div>
            <label>Storage Amount</label><br />
            <v-text-field
                v-model.number="storage_number"
                suffix="GB"
                hint="Max 4000GB; Integers only"
                persistent-hint
            ></v-text-field>
        </div>
        <div class="separator"></div>
        <h4>Advanced Settings</h4>
        <div>
            <label>Heap Number(max amt: {{max_heap}})</label><br />
            <v-slider
                min="1"
                :max='max_heap'
                v-model.number="heap_number"
                thumb-label="always"
                track-color="#b2becd"
                hint="25% of total RAM is recommended"
                persistent-hint
            >

            </v-slider> 
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
      ramLabel: [ 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024 ],
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
      let heapMax = (Math.pow(2,this.$store.state.settings.k8_config.ram_cores)) / 2;
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

<style lang="scss" scoped>
  .node_config > div {
    margin-top: 20px;
  }
</style>