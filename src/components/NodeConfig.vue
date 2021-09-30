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
            <label>RAM</label><br />
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
            <label>
                Storage Class*
                <v-tooltip right>
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon
                            v-bind="attrs"
                            v-on="on"
                        >
                            fa-question-circle
                        </v-icon>
                    </template>
                    <span>K8ssandra recommends a storage class with the VolumeBindingMode set to WaitForFirstConsumer. If you need to check this consider running `kubectl get storageclasses` against your cluster.</span>
                </v-tooltip>
            </label><br />
            <v-combobox
                v-model="storage_class"
                :items="storage_classes"
                dense
                minlength=3 type="text"
                append-icon="fa-chevron-down"
            ></v-combobox>
        </div>
        <div>
            <label>
                Storage Amount
                <v-tooltip right>
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon
                            v-bind="attrs"
                            v-on="on"
                        >
                            fa-question-circle
                        </v-icon>
                    </template>
                    <span>Generally you want to target 1-2 TB of active data per node with additional capacity for overhead purposes.</span>
                </v-tooltip>
            </label><br />
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
            <label>
                Heap Amount
                <v-tooltip right>
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon
                            v-bind="attrs"
                            v-on="on"
                        >
                            fa-question-circle
                        </v-icon>
                    </template>
                    <span>Heap is a portion of the total ram dedicated to each node. There are a number of off-heap objects and cache which may lead to instability if this field is set too high. Additionally more heap tends to lead to longer garbage collections.</span>
                </v-tooltip>
            </label><br />
            <v-slider
                min="1"
                :max='max_heap'
                v-model.number="heap_number"
                thumb-label="always"
                track-color="#b2becd"
                hint="Max value based on 50% of RAM. 25% of total RAM is recommended."
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