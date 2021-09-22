<template>
    <div>
        <h5>Medusa Local</h5>
        <div>
            <label>Storage Class</label><br />
            <input v-model="storage_class" placeholder="Storage Class">
        </div>
        <div>
            <label>Size</label><br />
            <input v-model.number="size" type="number">
        </div>
    </div>
</template>

<script>
export default {
  name: "MedusaLocal",
  computed: {
    storage_class: {
      get() {
        return this.$store.state.settings.config.medusa.storageClass;
      },
      set(value) {
        this.$store.commit("updateMedusaLocalClass", value);
      },
    },
    size: {
      get() {
        return this.$store.state.settings.config.medusa.size;
      },
      set(value) {
        this.$store.commit("updateMedusaLocalSize", value);
      },
    },
  },
};
</script>