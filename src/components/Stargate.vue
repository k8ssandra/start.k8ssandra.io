<template>
<div class="stargate">
    <h2>Stargate</h2>
    <div>
        Enabled:
        <input type="checkbox" id="checkbox" v-model="enabled">
        <label for="checkbox"> {{ enabled }}</label>
    </div>
    <div v-if="enabled" class="settings">
        Stargate Settings
    </div>
  </div>
</template>

<script>
export default {
  name: "Stargate",
  computed: {
    enabled: {
      get() {
        return this.$store.state.k8_config.stargate.active;
      },
      set(value) {
        this.$store.commit("updateStargateEnabled", value);
      },
    },
  }
};
</script>