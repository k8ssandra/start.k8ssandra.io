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
          <label>Instances Per Rack</label>
          <v-slider
              min="0"
              max="10"
              v-model.number="size"
              thumb-label="always"
              track-color="#b2becd"
          >
            <template v-slot:prepend>
              0
            </template>

            <template v-slot:append>
              10
            </template>
          </v-slider>
        </div>
        <span>Total Instances {{totalInstances}}</span>
        <div>
          <label>CPU</label>
          <v-slider
              min="0"
              max="4000"
              v-model.number="cpu_number"
              thumb-label="always"
              track-color="#b2becd"
          >
            <template v-slot:prepend>
              0 milliCPU
            </template>

            <template v-slot:append>
              4000 milliCPU
            </template>
          </v-slider>
        </div>

        <div>
            <label>Heap in MB(max amt: {{max_heap}})</label>
            <v-slider
                min="1"
                :max='max_heap'
                v-model.number="heap_mb"
                thumb-label="always"
                track-color="#b2becd"
                hint="25% of total RAM is recommended"
                persistent-hint
            >
            </v-slider>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Stargate",
  computed: {
    max_heap() {
      let heapMax = (Math.pow(2,this.$store.state.settings.k8_config.ram_cores)) / 2;
      return heapMax;
    },
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
        return this.$store.state.settings.k8_config.stargate_instance_per;
      },
      set(value) {
        this.$store.commit("updateStargateSize", value);
        this.$store.commit("updateTotalStargateSize");
      },
    },
    totalInstances: {
      get() {
        return this.$store.state.settings.config.stargate.replicas;
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

  span {
    font-size: 12px;
    line-height: 1.5;
    color: #6F7A87;
  }
</style>