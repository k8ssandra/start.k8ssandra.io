<template>
    <div>
        <h5>Medusa Local</h5>
        <div>
            <label>Storage Class</label><br />
            <input v-model="storage_class" placeholder="Storage Class">
        </div>
        <div>
            <label>Size</label><br />
            <input v-model.number="size_number" type="number">
            <select v-model="size_unit">
            <option v-for="(item, key) in byte_units" :key="key" >
                {{ item }}
            </option>
            </select> 
        </div>
    </div>
</template>

<script>
export default {
  name: "MedusaABS",
  data() {
    return {
      byte_units: ["MB", "GB", "TB"],
    };
  },
  computed: {
    storage_class: {
      get() {
        return this.$store.state.settings.k8_config.medusa.provider_local.config
          .storage_class;
      },
      set(value) {
        this.$store.commit("updateMedusaLocalClass", value);
      },
    },
    size_number: {
      get() {
        return this.$store.state.settings.k8_config.medusa.provider_local.config.size;
      },
      set(value) {
        this.$store.commit("updateMedusaLocalSize", value);
      },
    },
    size_unit: {
      get() {
        return this.$store.state.settings.k8_config.medusa.provider_local.config.unit;
      },
      set(value) {
        this.$store.commit("updateMedusaLocalUnit", value);
      },
    },
  },
};
</script>