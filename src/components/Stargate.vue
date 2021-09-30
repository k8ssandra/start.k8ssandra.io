<template>
<div class="module stargate">
    <div class="module__heading">
      <h3>
        Stargate
        <v-tooltip right>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
                v-bind="attrs"
                v-on="on"
            >
              fa-question
            </v-icon>
          </template>
          <span>Stargate provides an independently scalable API layer for K8ssandra. It supports interacting with your cluster over REST, Document, GraphQL, and CQL interfaces. While not required it may rapidly accelerate your application development lifecycle.</span>
        </v-tooltip>
      </h3>
      <div>
        <v-switch
            v-model="enabled"
            inset
        >
          <template v-slot:prepend>
            False
          </template>
          <template v-slot:append>
            True
          </template>
        </v-switch>
      </div>
    </div>
    <div v-if="enabled" class="settings">
        <div>
          <label>Size</label><br />
<!--          <input v-model.number="size" type="number">-->
          <v-slider
              min="0"
              max="100"
              v-model.number="size"
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
          <label>CPU</label><br />
<!--          <input v-model.number="cpu_number" type="number">-->
          <v-slider
              min="0"
              max="100"
              v-model.number="cpu_number"
              thumb-label="always"
              track-color="#b2becd"
          >
            <template v-slot:prepend>
              0 milliCPU
            </template>

            <template v-slot:append>
              100 milliCPU
            </template>
          </v-slider>
        </div>
        <div>
          <label>Heap in MB</label><br />
<!--          <input v-model.number="heap_mb" type="number">-->
          <v-text-field
              v-model.number="heap_mb"
              suffix="GB"
              hint="25% of Total RAM"
              persistent-hint
          ></v-text-field>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Stargate",
  computed: {
    enabled: {
      get() {
        return this.$store.state.settings.config.stargate.enabled;
      },
      set(value) {
        this.$store.commit("updateStargateEnabled", value);
      },
    },
    size: {
      get() {
        return this.$store.state.settings.config.stargate.replicas;
      },
      set(value) {
        this.$store.commit("updateStargateSize", value);
      },
    },
    cpu_number: {
      get() {
        return this.$store.state.settings.config.stargate.cpuReqMillicores;
      },
      set(value) {
        this.$store.commit("updateStargateCpuAmount", value);
      },
    },
    heap_mb: {
      get() {
        return this.$store.state.settings.config.stargate.heapMB;
      },
      set(value) {
        this.$store.commit("updateStargateHeapMb", value);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
  .settings > div {
    margin-top: 20px;
  }
</style>