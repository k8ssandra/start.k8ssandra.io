<template>
<div class="module stargate">
    <div class="module__heading">
      <h3>Stargate</h3>
      <div>
        <!--        <input type="checkbox" id="checkbox" v-model="enabled">-->
        <!--        <label for="checkbox"> {{ enabled }}</label>-->
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

<style lang="scss" scoped>
  .settings > div {
    margin-top: 20px;
  }
</style>