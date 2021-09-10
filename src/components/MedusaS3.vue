<template>
    <div>
        <h5>Medusa s3</h5>
        <div>
          <label>Region</label><br />
          <select v-model="region">
            <option v-for="(item, key) in regions" :key="key" >
                {{ item }}
            </option>
          </select> 
        </div>
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
  name: "MedusaS3",
  data() {
    return {
      regions: ["region1", "region2", "region3", "region4"],
    };
  },
  computed: {
    region: {
      get() {
        return this.$store.state.k8_config.medusa.provider_s3.config.region;
      },
      set(value) {
        this.$store.commit("updateMedusaS3Region", value);
      },
    },
    name: {
      get() {
        return this.$store.state.k8_config.medusa.provider_s3.config.bucket_name;
      },
      set(value) {
        this.$store.commit("updateMedusaS3Name", value);
      },
    },
    storage_secret: {
      get() {
        return this.$store.state.k8_config.medusa.provider_s3.config.secret;
      },
      set(value) {
        this.$store.commit("updateMedusaS3StorageSecret", value);
      },
    },
  },
};
</script>