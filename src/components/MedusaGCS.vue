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
  name: "MedusaGCS",
  computed: {
    name: {
      get() {
        return this.$store.state.cassandra.medusa.provider_gcs.config.bucket_name;
      },
      set(value) {
        this.$store.commit("updateMedusaGCSName", value);
      },
    },
    storage_secret: {
      get() {
        return this.$store.state.cassandra.medusa.provider_gcs.config.secret;
      },
      set(value) {
        this.$store.commit("updateMedusaGCSStorageSecret", value);
      },
    },
  },
};
</script>