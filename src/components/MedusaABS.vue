<template>
    <div>
        <h5>Medusa Google Cloud Storage</h5>
        <div>
            <label>Name</label><br />
            <input v-model="name" placeholder="Bucket Name">
        </div>
        <div>
            <label>Storage Secret</label><br />
            <input v-model="storage_secret" placeholder="must follow k8s naming rules">
        </div>
    </div>
</template>

<script>
export default {
  name: "MedusaABS",
  computed: {
    name: {
      get() {
        return this.$store.state.k8_config.medusa.provider_abs.config.bucket_name;
      },
      set(value) {
        this.$store.commit("updateMedusaABSName", value);
      },
    },
    storage_secret: {
      get() {
        return this.$store.state.k8_config.medusa.provider_abs.config.secret;
      },
      set(value) {
        this.$store.commit("updateMedusaABSStorageSecret", value);
      },
    },
  },
};
</script>