<template>
    <div class="node_config">
        <h4>Node Config</h4>
        <div>
            <v-text-field
                v-model.number="cpu_number"
                :rules="[rules.required, rules.integers]"
                suffix="milliCPU"
                hint="1000m = 1vCPU; Integers only"
                persistent-hint
            >
                <template v-slot:prepend>
                    <label>CPU Cores*</label>
                </template>
            </v-text-field>
        </div>
        <div>
            <label>RAM</label>
            <v-slider
                min="1"
                max="256"
                v-model.number="ram_number"
                thumb-label="always"
                track-color="#b2becd"
            >
                <template v-slot:prepend>
                    1 GB
                </template>

                <template v-slot:append>
                    256 GB
                </template>
            </v-slider>
        </div>
        <div>
            <v-combobox
                v-model="storage_class"
                :items="storage_classes"
                dense
                minlength=3 type="text"
                append-icon="fa-chevron-down"
            >
                <template v-slot:prepend>
                    <label>
                        Storage Class*
                        <v-tooltip right>
                            <template v-slot:activator="{ on, attrs }">
                                <v-icon
                                    v-bind="attrs"
                                    v-on="on"
                                >
                                    far fa-question-circle
                                </v-icon>
                            </template>
                            <span>K8ssandra recommends a storage class with the VolumeBindingMode set to WaitForFirstConsumer. If you need to check this consider running `kubectl get storageclasses` against your cluster.</span>
                        </v-tooltip>
                    </label>
                </template>
            </v-combobox>
        </div>
        <div>
            <v-text-field
                v-model.number="storage_number"
                suffix="GB"
                :rules="[rules.integers]"
                hint="Max 4000GB; Integers only"
                persistent-hint
            >
                <template v-slot:prepend>
                    <label>
                        Storage Amount
                        <v-tooltip right>
                            <template v-slot:activator="{ on, attrs }">
                                <v-icon
                                    v-bind="attrs"
                                    v-on="on"
                                >
                                    far fa-question-circle
                                </v-icon>
                            </template>
                            <span>Generally you want to target 1-2 TB of active data per node with additional capacity for overhead purposes.</span>
                        </v-tooltip>
                    </label>
                </template>
            </v-text-field>
        </div>
        <div class="separator"></div>
        <h4>Advanced Settings</h4>
        <div class="advanced">
            <label>
                Heap Amount
                <v-tooltip right>
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon
                            v-bind="attrs"
                            v-on="on"
                        >
                            far fa-question-circle
                        </v-icon>
                    </template>
                    <span>Heap is a portion of the total ram dedicated to each node. There are a number of off-heap objects and cache which may lead to instability if this field is set too high. Additionally more heap tends to lead to longer garbage collections.</span>
                </v-tooltip>
            </label>
            <v-slider
                min="1"
                :max='max_heap'
                v-model.number="heap_number"
                thumb-label="always"
                track-color="#b2becd"
            >
                <template v-slot:prepend>
                    1 GB
                </template>

                <template v-slot:append>
                    {{ max_heap }} GB
                </template>
            </v-slider>
            <span>Max value based on 50% of RAM. 25% of total RAM is recommended.</span>
        </div>
        <div>
          <additionalSeeds />
        </div>
    </div>
</template>

<script>
import additionalSeeds from "./AdditionalSeeds.vue";
export default {
  name: "NodeConfig",
  components: {
    additionalSeeds,
  },
  data() {
    return {
      rules: {
          required: (value) => !!value || "Required.",
          integers: (value) => {
          const pattern = /^[0-9]*$/;
          return (
            pattern.test(value) ||
            "Must only contain integers"
          );
        },
      },
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
      let heapMax =
        Math.floor(
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

<style lang="scss" scoped>
.node_config > div:not(.separator) {
  margin-top: 30px;

  &:first-of-type {
    margin-top: 20px;
  }
}

.advanced > span {
  display: inline-block;
  margin-top: 10px;
  font-size: 12px;
  line-height: 16px;
  color: #6F7A87;
}
</style>