<template>
<div class="module reaper">
    <h2>Reaper</h2>
    <div>
        Enabled**:
        <input type="checkbox" id="checkbox" v-model="enabled">
        <label for="checkbox"> {{ enabled }}</label>
    </div>
  </div>
</template>

<script>
export default {
  name: "Reaper",
  computed: {
    enabled: {
      get() {
        return this.$store.state.settings.config.reaper.enabled;
      },
      set(value) {
        this.$store.commit("updateReaperEnabled", value);
      },
    },
  },
};
</script>