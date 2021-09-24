<template>
<div class="module stargate">
    <h2>Stargate</h2>
    <div>
        Enabled:
        <input type="checkbox" id="checkbox" v-model="enabled">
        <label for="checkbox"> {{ enabled }}</label>
    </div>
    <div v-if="enabled" class="settings">
        <h5>Stargate Settings</h5>
        <div>
          <label>Size</label><br />
          <input v-model.number="size" type="number">
        </div>
        <div>
          <label>CPU</label><br />
          <input v-model.number="cpu_number" type="number">
        </div>
        <div>
          <label>Heap in MB</label><br />
          <input v-model.number="heap_mb" type="number">
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